import { ref, push, onChildAdded, onValue, set, serverTimestamp, remove, onDisconnect, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
console.log("Chat UI script loaded!");




function sendNotification(title, body) {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
        new Notification(title, { body: body, icon: "/assets/poster.png" });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body: body, icon: "/assets/poster.png" });
            }
        });
    }
}

function getStandaloneRoom() {
    if (window.currentVibeRoom && window.currentVibeRoom.active) {
        return window.currentVibeRoom;
    }
    try {
        const roomKey = sessionStorage.getItem("vibe-room-fm:room");
        if (!roomKey) return null;
        
        let nameStr = localStorage.getItem("vibe-room-fm:name");
        let name = "Anonymous";
        if (nameStr) {
            try { name = JSON.parse(nameStr); } catch(e) { name = nameStr; }
        }
        
        let selfId = sessionStorage.getItem("vibe-room-fm:chat-self-id");
        if (!selfId) {
            selfId = Math.random().toString(36).substring(2, 11);
            sessionStorage.setItem("vibe-room-fm:chat-self-id", selfId);
        }
        
        return { active: true, roomKey: roomKey, name: name, selfId: selfId };
    } catch(e) {
        console.error("Storage error:", e);
        return null;
    }
}


let chatContainer = null;
let toggleBtn = null;
let currentRoomKey = null;
let chatUnsubscribe = null;
let presenceUnsubscribe = null;

function initChatUI() {
    if (chatContainer) return;

    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
    chatContainer = document.createElement('div');
    chatContainer.id = "vibe-chat-container";
    chatContainer.style.position = "fixed";
    chatContainer.style.right = "0";
    chatContainer.style.top = "0";
    chatContainer.style.width = "320px";
    chatContainer.style.height = "100vh";
    chatContainer.style.background = "rgba(15,15,15,0.95)";
    chatContainer.style.borderLeft = "1px solid rgba(255,255,255,0.1)";
    chatContainer.style.display = "flex";
    chatContainer.style.flexDirection = "column";
    chatContainer.style.zIndex = "9998";
    chatContainer.style.backdropFilter = "blur(15px)";
    chatContainer.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    chatContainer.style.transform = "translateX(100%)";
    chatContainer.style.boxShadow = "-5px 0 30px rgba(0,0,0,0.5)";
    
    chatContainer.innerHTML = `
        <div style="padding:20px; border-bottom:1px solid rgba(255,255,255,0.1); font-weight:bold; color:white; display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03);">
            <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:16px;">Room Chat</span>
            </div>
            <button id="vibe-chat-close" style="background:transparent; color:rgba(255,255,255,0.5); border:none; cursor:pointer; font-size:24px; line-height:1; padding:0; outline:none; transition:color 0.2s;">&times;</button>
        </div>
        <div id="vibe-chat-messages" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; scroll-behavior:smooth;"></div>
        <form id="vibe-chat-form" style="padding:16px; border-top:1px solid rgba(255,255,255,0.1); display:flex; gap:8px; background:rgba(0,0,0,0.2);">
            <input type="text" id="vibe-chat-input" placeholder="Say something..." style="flex:1; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); padding:10px 14px; border-radius:20px; color:white; outline:none; font-family:inherit; font-size:14px; transition:border-color 0.2s;" autocomplete="off" required />
            <button type="submit" style="background:rgba(255,204,0,0.9); color:black; border:none; padding:10px 18px; border-radius:20px; cursor:pointer; font-weight:bold; font-family:inherit; font-size:14px; transition:background 0.2s; box-shadow:0 2px 10px rgba(255,204,0,0.2);">Send</button>
        </form>
    `;
    document.body.appendChild(chatContainer);
    
    const style = document.createElement('style');
    style.innerHTML = `
        #vibe-chat-input:focus { border-color: rgba(255,255,255,0.3) !important; }
        #vibe-chat-close:hover { color: white !important; }
        .chat-msg { background: rgba(255,255,255,0.05); padding: 10px 14px; border-radius: 12px; border-top-left-radius: 2px; width: fit-content; max-width: 90%; word-break: break-word; }
        .chat-msg.self { background: rgba(255,204,0,0.15); border-radius: 12px; border-top-right-radius: 2px; align-self: flex-end; }
        .chat-name { font-size: 11px; color: rgba(255,255,255,0.4); margin-bottom: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .chat-text { font-size: 14px; color: rgba(255,255,255,0.9); line-height: 1.4; }
    `;
    document.head.appendChild(style);
    
    toggleBtn = document.createElement('button');
    toggleBtn.id = "vibe-chat-open-btn";
    toggleBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> Chat`;
    toggleBtn.style.position = "fixed";
    toggleBtn.style.right = "24px";
    toggleBtn.style.bottom = "24px";
    toggleBtn.style.background = "rgba(255,204,0,0.9)";
    toggleBtn.style.color = "black";
    toggleBtn.style.border = "none";
    toggleBtn.style.padding = "12px 20px";
    toggleBtn.style.borderRadius = "24px";
    toggleBtn.style.fontWeight = "bold";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.style.zIndex = "9997";
    toggleBtn.style.display = "none";
    toggleBtn.style.boxShadow = "0 4px 16px rgba(0,0,0,0.4)";
    toggleBtn.style.alignItems = "center";
    toggleBtn.style.gap = "8px";
    toggleBtn.style.fontFamily = "inherit";
    toggleBtn.style.fontSize = "15px";
    toggleBtn.style.transition = "transform 0.2s, background 0.2s";
    
    toggleBtn.onmouseenter = () => toggleBtn.style.transform = "scale(1.05)";
    toggleBtn.onmouseleave = () => toggleBtn.style.transform = "scale(1)";
    
    document.body.appendChild(toggleBtn);
    
    toggleBtn.onclick = () => {
        chatContainer.style.transform = "translateX(0)";
        toggleBtn.style.display = "none";
    };
    
    document.getElementById("vibe-chat-close").onclick = () => {
        chatContainer.style.transform = "translateX(100%)";
        toggleBtn.style.display = "flex";
    };
    
    document.getElementById("vibe-chat-form").onsubmit = async (e) => {
        e.preventDefault();
        const input = document.getElementById("vibe-chat-input");
        const text = input.value.trim();
        if (!text || !currentRoomKey) return;
        
        const db = window.firebaseDatabase;
        if (!db) return;
        
        const room = getStandaloneRoom();
        const msgRef = push(ref(db, `_rooms/listening-room:${currentRoomKey}/chat`));
        onDisconnect(msgRef).remove(); await set(msgRef, {
            text: text,
            senderName: room.name || "Anonymous",
            senderId: room.selfId,
            timestamp: serverTimestamp()
        });
        
        input.value = "";
    };
}

let initialMessagesLoaded = false;
function appendMessage(msg) {
    const messagesDiv = document.getElementById("vibe-chat-messages");
    if (!messagesDiv) return;
    
    const room = getStandaloneRoom() || {};
    const isSelf = msg.senderId === room.selfId;
    if (!isSelf && initialMessagesLoaded) {
        if (document.hidden || (chatContainer && chatContainer.style.transform !== "translateX(0px)" && chatContainer.style.transform !== "translateX(0)")) {
            sendNotification("New message from " + (msg.senderName || "Someone"), msg.text);
        }
    }
    
    const el = document.createElement("div");
    el.className = "chat-msg" + (isSelf ? " self" : "");
    el.innerHTML = `
        ${!isSelf ? `<div class="chat-name">${msg.senderName}</div>` : ''}
        <div class="chat-text">${msg.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    `;
    
    messagesDiv.appendChild(el);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function startChatSession(roomKey) {
    const db = window.firebaseDatabase;
    if (!db) return;
    
    if (chatUnsubscribe) chatUnsubscribe();
    if (presenceUnsubscribe) presenceUnsubscribe();
    
    document.getElementById("vibe-chat-messages").innerHTML = "";
    initialMessagesLoaded = false;
    setTimeout(() => { initialMessagesLoaded = true; }, 1000);
    currentRoomKey = roomKey;
    
    const chatRef = ref(db, `_rooms/listening-room:${roomKey}/chat`);
    chatUnsubscribe = onChildAdded(chatRef, (snapshot) => {
        appendMessage(snapshot.val());
    });
    
    // Auto-delete chat when room is completely empty
    const presenceRef = ref(db, `_rooms/listening-room:${roomKey}/presence`);
    let activeMembers = new Set();
    
    const valueUnsub = onValue(presenceRef, (snapshot) => {
        if (!snapshot.exists() || Object.keys(snapshot.val()).length === 0) {
            remove(chatRef).catch(()=>console.log("Failed to clean up chat or already clean"));
        }
    });
    
    const joinUnsub = onChildAdded(presenceRef, (snapshot) => {
        const key = snapshot.key;
        const val = snapshot.val();
        const name = val && val.name ? val.name : "Someone";
        const room = getStandaloneRoom();
        
        if (!activeMembers.has(key)) {
            activeMembers.add(key);
            if (window.__vibeInitialPresenceLoaded && (!room || key !== room.selfId)) {
                sendNotification(name + " joined the room", "Say hi!");
            }
        }
    });
    
    const leaveUnsub = onChildRemoved(presenceRef, (snapshot) => {
        const key = snapshot.key;
        const val = snapshot.val();
        const name = val && val.name ? val.name : "Someone";
        const room = getStandaloneRoom();
        
        if (activeMembers.has(key)) {
            activeMembers.delete(key);
            if (window.__vibeInitialPresenceLoaded && (!room || key !== room.selfId)) {
                sendNotification(name + " left the room", "They have disconnected.");
            }
        }
    });
    
    if (window.__vibePresenceTimeout) clearTimeout(window.__vibePresenceTimeout);
    window.__vibeInitialPresenceLoaded = false;
    window.__vibePresenceTimeout = setTimeout(() => { window.__vibeInitialPresenceLoaded = true; }, 2500);
    
    presenceUnsubscribe = () => {
        valueUnsub();
        joinUnsub();
        leaveUnsub();
    };
}

setInterval(() => {
    const __r = getStandaloneRoom();
    // console.log("Chat tick, room:", __r);
    const room = getStandaloneRoom();
    if (room && room.active) {
        initChatUI();
        if (currentRoomKey !== room.roomKey) {
            startChatSession(room.roomKey);
            toggleBtn.style.display = "flex";
            chatContainer.style.transform = "translateX(100%)";
        }
    } else {
        if (chatContainer) {
            chatContainer.style.transform = "translateX(100%)";
            toggleBtn.style.display = "none";
        }
        if (currentRoomKey) {
            if (chatUnsubscribe) chatUnsubscribe();
            if (presenceUnsubscribe) presenceUnsubscribe();
            currentRoomKey = null;
        }
    }
}, 1000);





