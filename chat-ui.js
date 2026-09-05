import { ref, push, onChildAdded, onValue, set, serverTimestamp, remove, onDisconnect, onChildRemoved, onChildChanged, update } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
console.log("Chat UI script loaded!");

let localAudioStream = null;
const peerConnections = new Map();
let webrtcUnsub = null;
const rtcConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

let isSpeaking = false;
function bindVoiceButton() {
    const voiceBtn = document.getElementById("vibe-voice-btn");
    if (!voiceBtn) return;
    
    // Remove old listeners by cloning
    const newBtn = voiceBtn.cloneNode(true);
    voiceBtn.parentNode.replaceChild(newBtn, voiceBtn);
    
    const startSpeaking = async (e) => {
        if (e.type !== 'mousedown' && e.type !== 'touchstart') return; // ignore other events mapping here
        e.preventDefault();
        if (isSpeaking) return;
        isSpeaking = true;
        try {
            localAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (!isSpeaking) {
                // User released the button while the permission prompt was open
                localAudioStream.getTracks().forEach(t => t.stop());
                localAudioStream = null;
                return;
            }
            peerConnections.forEach(pc => {
                const senders = pc.getSenders();
                const audioSender = senders.find(s => s.track === null || (s.track && s.track.kind === 'audio'));
                if (audioSender) {
                    audioSender.replaceTrack(localAudioStream.getAudioTracks()[0]).catch(err => console.log(err));
                }
            });
            newBtn.style.filter = "grayscale(0)";
            newBtn.style.transform = "scale(1.2)";
        } catch(err) {
            console.error("Mic access denied", err);
            isSpeaking = false;
        }
    };
    
    const stopSpeaking = (e) => {
        e.preventDefault();
        isSpeaking = false;
        if (localAudioStream) {
            localAudioStream.getTracks().forEach(t => t.stop());
            localAudioStream = null;
        }
        newBtn.style.filter = "grayscale(1)";
        newBtn.style.transform = "scale(1)";
    };

    newBtn.addEventListener('mousedown', startSpeaking);
    newBtn.addEventListener('mouseup', stopSpeaking);
    newBtn.addEventListener('mouseleave', stopSpeaking);
    newBtn.addEventListener('touchstart', startSpeaking, {passive: false});
    newBtn.addEventListener('touchend', stopSpeaking);
    newBtn.addEventListener('touchcancel', stopSpeaking);
}


function createPeerConnection(peerId, roomKey, myId) {
    console.log("🔌 Vibe Voice: Creating Peer Connection to", peerId);
    const pc = new RTCPeerConnection(rtcConfig);
    pc.candidateQueue = [];
    pc.remoteDescriptionSet = false;
    peerConnections.set(peerId, pc);
    
    if (localAudioStream) {
        localAudioStream.getTracks().forEach(track => pc.addTrack(track, localAudioStream));
    }
    
    pc.onicecandidate = (e) => {
        if (e.candidate) {
            console.log("❄️ Vibe Voice: Sending ICE candidate to", peerId);
            push(ref(window.firebaseDatabase, `_rooms/listening-room:${roomKey}/webrtc/${peerId}`), {
                senderId: myId,
                type: 'candidate',
                candidate: JSON.stringify(e.candidate)
            });
        }
    };
    
    pc.ontrack = (e) => {
        console.log("🔊 Vibe Voice: Receiving audio track from", peerId);
        let audioEl = document.getElementById('vibe-audio-' + peerId);
        if (!audioEl) {
            audioEl = document.createElement('audio');
            audioEl.id = 'vibe-audio-' + peerId;
            audioEl.autoplay = true;
            document.body.appendChild(audioEl);
        }
        audioEl.srcObject = e.streams[0];
    };
    
    pc.oniceconnectionstatechange = () => {
        console.log("📶 Vibe Voice: Connection state with", peerId, "changed to:", pc.iceConnectionState);
        if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'closed') {
            pc.close();
            peerConnections.delete(peerId);
            const audioEl = document.getElementById('vibe-audio-' + peerId);
            if (audioEl) audioEl.remove();
        }
    };
    
    return pc;
}

let audioInitPromise = null;

function checkAndSendOffer(peerId, roomKey, myId) {
        if (peerId > myId && !peerConnections.has(peerId) && currentRoomKey === roomKey) {
        const pc = createPeerConnection(peerId, roomKey, myId);
        pc.createOffer().then(offer => {
            return pc.setLocalDescription(offer).then(() => {
                console.log("📤 Vibe Voice: Sending OFFER to", peerId);
                push(ref(window.firebaseDatabase, `_rooms/listening-room:${roomKey}/webrtc/${peerId}`), {
                    senderId: myId,
                    type: 'offer',
                    sdp: JSON.stringify(offer)
                });
            });
        }).catch(e => console.error("Offer error", e));
        }
}





function sendNotification(title, body) {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
        new Notification(title, { body: body, icon: "https://raw.githubusercontent.com/ashish8381/Projects-Details/refs/heads/main/posterrrrr.png" });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body: body, icon: "https://raw.githubusercontent.com/ashish8381/Projects-Details/refs/heads/main/posterrrrr.png" });
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
        <form id="vibe-chat-form" style="padding:16px; border-top:1px solid rgba(255,255,255,0.1); display:flex; gap:8px; background:rgba(0,0,0,0.2); position:relative;">
            <button type="button" id="vibe-emoji-btn" style="background:transparent; border:none; cursor:pointer; font-size:20px; padding:0 4px; filter:grayscale(0.5); transition:filter 0.2s;">😀</button>
            
            <button type="button" id="vibe-voice-btn" style="background:transparent; border:none; cursor:pointer; font-size:20px; padding:0 4px; transition:all 0.2s; filter:grayscale(1); outline:none; user-select:none; -webkit-user-select:none; -webkit-touch-callout:none;" title="Hold to Speak">🎙️</button>
            <input type="text" id="vibe-chat-input" placeholder="Say something..." style="flex:1; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); padding:10px 14px; border-radius:20px; color:white; outline:none; font-family:inherit; font-size:14px; transition:border-color 0.2s;" autocomplete="off" required />
            <button type="submit" style="background:rgba(255,204,0,0.9); color:black; border:none; padding:10px 18px; border-radius:20px; cursor:pointer; font-weight:bold; font-family:inherit; font-size:14px; transition:background 0.2s; box-shadow:0 2px 10px rgba(255,204,0,0.2);">Send</button>
            <div id="vibe-emoji-picker-container" style="display:none; position:absolute; bottom:60px; left:10px; z-index:10000; box-shadow:0 10px 30px rgba(0,0,0,0.5); border-radius:8px; overflow:hidden;"></div>
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
        emoji-picker { --num-columns: 6; --emoji-size: 1.2rem; --indicator-color: #ffcc00; width: 100%; max-height: 300px; }
    `;
    document.head.appendChild(style);

    const emojiScript = document.createElement('script');
    emojiScript.type = "module";
    emojiScript.src = "https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js";
    document.head.appendChild(emojiScript);
    
    setTimeout(() => {
        const pickerContainer = document.getElementById("vibe-emoji-picker-container");
        const emojiBtn = document.getElementById("vibe-emoji-btn");
        const input = document.getElementById("vibe-chat-input");
        
        const picker = document.createElement('emoji-picker');
        picker.classList.add('light'); // or dark depending on theme, vibe is dark so let's set dark
        picker.style.setProperty('--background', '#1f1f1f');
        picker.style.setProperty('--border-color', 'rgba(255,255,255,0.1)');
        pickerContainer.appendChild(picker);
        
        emojiBtn.onclick = (e) => {
            e.preventDefault();
            pickerContainer.style.display = pickerContainer.style.display === 'none' ? 'block' : 'none';
            emojiBtn.style.filter = pickerContainer.style.display === 'none' ? 'grayscale(0.5)' : 'grayscale(0)';
        };
        
        picker.addEventListener('emoji-click', event => {
            input.value += event.detail.unicode;
            pickerContainer.style.display = 'none';
            emojiBtn.style.filter = 'grayscale(0.5)';
            input.focus();
        });
        
        document.addEventListener('click', (e) => {
            if (!pickerContainer.contains(e.target) && e.target !== emojiBtn) {
                pickerContainer.style.display = 'none';
                emojiBtn.style.filter = 'grayscale(0.5)';
            }
        });
    }, 500);

    
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
    
    const input = document.getElementById("vibe-chat-input");
    const submitBtn = document.querySelector("#vibe-chat-form button[type='submit']");
    
    // Listen for Escape to cancel edit
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && window.vibeEditingMessageKey) {
            window.vibeEditingMessageKey = null;
            input.value = "";
            submitBtn.innerText = "Send";
        }
    });
    
    document.getElementById("vibe-chat-form").onsubmit = async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text || !currentRoomKey) return;
        
        const db = window.firebaseDatabase;
        if (!db) return;
        
        const room = getStandaloneRoom();
        
        if (window.vibeEditingMessageKey) {
            update(ref(db, `_rooms/listening-room:${currentRoomKey}/chat/${window.vibeEditingMessageKey}`), { text: text });
            window.vibeEditingMessageKey = null;
            submitBtn.innerText = "Send";
        } else {
            const msgRef = push(ref(db, `_rooms/listening-room:${currentRoomKey}/chat`));
            onDisconnect(msgRef).remove(); 
            await set(msgRef, {
                text: text,
                senderName: room.name || "Anonymous",
                senderId: room.selfId,
                timestamp: serverTimestamp()
            });
        }
        
        input.value = "";
    };
}

let initialMessagesLoaded = false;
function formatTime(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    let h = d.getHours();
    let m = d.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; 
    m = m < 10 ? '0'+m : m;
    return h + ':' + m + ' ' + ampm;
}

function appendMessage(key, msg) {
    const messagesDiv = document.getElementById("vibe-chat-messages");
    if (!messagesDiv) return;
    
    const room = getStandaloneRoom() || {};
    const isSelf = msg.senderId === room.selfId;
    if (!isSelf && initialMessagesLoaded && !document.getElementById('chat-msg-' + key)) {
        if (document.hidden || (chatContainer && chatContainer.style.transform !== "translateX(0px)" && chatContainer.style.transform !== "translateX(0)")) {
            sendNotification("New message from " + (msg.senderName || "Someone"), msg.text);
        }
    }
    
    let existingEl = document.getElementById('chat-msg-' + key);
    
    // Check for new reactions on our own messages to send notifications
    if (existingEl && initialMessagesLoaded && isSelf) {
        const oldReactionsStr = existingEl.getAttribute('data-reactions') || "{}";
        const newReactionsStr = msg.reactions ? JSON.stringify(msg.reactions) : "{}";
        
        if (oldReactionsStr !== newReactionsStr) {
            try {
                const oldR = JSON.parse(oldReactionsStr);
                const newR = msg.reactions || {};
                for (const [rKey, rObj] of Object.entries(newR)) {
                    if (!oldR[rKey] && rObj.senderId !== room.selfId) {
                        if (document.hidden || (chatContainer && chatContainer.style.transform !== "translateX(0px)" && chatContainer.style.transform !== "translateX(0)")) {
                            sendNotification((rObj.senderName || "Someone") + " reacted " + rObj.emoji, msg.text);
                        }
                    }
                }
            } catch (e) {}
        }
    }
    
    const el = existingEl || document.createElement("div");
    el.id = 'chat-msg-' + key;
    el.className = "chat-msg" + (isSelf ? " self" : "");
    el.style.position = "relative";
    el.setAttribute('data-reactions', msg.reactions ? JSON.stringify(msg.reactions) : "{}");
    
    const timeStr = formatTime(msg.timestamp);
    const safeText = msg.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    let reactMenuHtml = `<div id="react-menu-${key}" class="quick-react-menu" style="display:none; position:absolute; ${isSelf ? 'right:0;' : 'left:0;'} top:-35px; background:#222; padding:6px 10px; border-radius:20px; box-shadow:0 4px 12px rgba(0,0,0,0.5); z-index:100; gap:10px; border:1px solid rgba(255,255,255,0.1);">`;
    const emojis = ['👍','❤️','😂','😮','😢','🙏'];
    emojis.forEach(e => {
        reactMenuHtml += `<span class="quick-react-emoji" data-msg="${key}" data-emoji="${e}" style="cursor:pointer; font-size:18px; transition:transform 0.2s;">${e}</span>`;
    });
    reactMenuHtml += `</div>`;
    
    let html = reactMenuHtml;
    html += `${!isSelf ? `<div class="chat-name">${msg.senderName}</div>` : ''}`;
    html += `<div class="chat-text" id="chat-text-${key}">${safeText}</div>`;
    
    let reactionHtml = '<div class="reactions-container" style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">';
    if (msg.reactions) {
        const counts = {};
        const userReactions = {};
        Object.entries(msg.reactions).forEach(([rKey, rObj]) => {
            counts[rObj.emoji] = (counts[rObj.emoji] || 0) + 1;
            if (rObj.senderId === room.selfId) userReactions[rObj.emoji] = rKey;
        });
        Object.entries(counts).forEach(([emoji, count]) => {
            const hasReacted = !!userReactions[emoji];
            const bg = hasReacted ? 'rgba(255,204,0,0.3)' : 'rgba(255,255,255,0.05)';
            const br = hasReacted ? '1px solid rgba(255,204,0,0.5)' : '1px solid rgba(255,255,255,0.1)';
            reactionHtml += `<div class="reaction-pill" data-msg="${key}" data-emoji="${emoji}" data-rkey="${userReactions[emoji] || ''}" style="background:${bg}; border:${br}; padding:2px 6px; border-radius:12px; font-size:11px; cursor:pointer; display:flex; align-items:center; gap:4px; transition:background 0.2s;">${emoji} <span style="font-size:10px; opacity:0.8;">${count}</span></div>`;
        });
    }
    reactionHtml += '</div>';
    html += reactionHtml;
    
    html += `<div style="display:flex; justify-content:${isSelf ? 'flex-end' : 'flex-start'}; align-items:center; gap:8px; margin-top:4px;">`;
    html += `<span class="chat-time" style="font-size:10px; color:rgba(255,255,255,0.3);">${timeStr}</span>`;
    
    html += `<button class="vibe-chat-react" data-key="${key}" style="background:transparent; border:none; color:rgba(255,255,255,0.4); cursor:pointer; padding:0; outline:none; transition:color 0.2s; font-size:12px;" title="React">😀<span style="font-size:8px">+</span></button>`;
    
    if (isSelf) {
        html += `
            <button class="vibe-chat-edit" data-key="${key}" style="background:transparent; border:none; color:rgba(255,255,255,0.4); cursor:pointer; padding:0; outline:none; transition:color 0.2s;" title="Edit">✎</button>
            <button class="vibe-chat-del" data-key="${key}" style="background:transparent; border:none; color:rgba(255,255,255,0.4); cursor:pointer; padding:0; outline:none; transition:color 0.2s;" title="Delete">🗑</button>
        `;
    }
    html += `</div>`;
    
    el.innerHTML = html;
    
    if (!existingEl) {
        messagesDiv.appendChild(el);
    }
    
    setTimeout(() => {
        const reactBtn = el.querySelector('.vibe-chat-react');
        if (reactBtn) {
            reactBtn.onclick = () => {
                const menu = document.getElementById('react-menu-' + key);
                document.querySelectorAll('.quick-react-menu').forEach(m => {
                    if (m !== menu) m.style.display = 'none';
                });
                menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
            };
            reactBtn.onmouseenter = () => reactBtn.style.color = "white";
            reactBtn.onmouseleave = () => reactBtn.style.color = "rgba(255,255,255,0.4)";
        }
        
        el.querySelectorAll('.quick-react-emoji').forEach(span => {
            span.onclick = () => {
                const emoji = span.getAttribute('data-emoji');
                const db = window.firebaseDatabase;
                const msgRef = ref(db, `_rooms/listening-room:${currentRoomKey}/chat/${key}/reactions`);
                push(msgRef).then(newRef => {
                    set(newRef, { emoji: emoji, senderName: room.name || "Anonymous", senderId: room.selfId });
                });
                document.getElementById('react-menu-' + key).style.display = 'none';
            };
            span.onmouseenter = () => span.style.transform = 'scale(1.2)';
            span.onmouseleave = () => span.style.transform = 'scale(1)';
        });
        
        el.querySelectorAll('.reaction-pill').forEach(pill => {
            pill.onclick = () => {
                const rkey = pill.getAttribute('data-rkey');
                const emoji = pill.getAttribute('data-emoji');
                const db = window.firebaseDatabase;
                if (rkey) {
                    remove(ref(db, `_rooms/listening-room:${currentRoomKey}/chat/${key}/reactions/${rkey}`));
                } else {
                    const msgRef = ref(db, `_rooms/listening-room:${currentRoomKey}/chat/${key}/reactions`);
                    push(msgRef).then(newRef => {
                        set(newRef, { emoji: emoji, senderName: room.name || "Anonymous", senderId: room.selfId });
                    });
                }
            };
        });
        
        if (isSelf) {
            const editBtn = el.querySelector('.vibe-chat-edit');
            const delBtn = el.querySelector('.vibe-chat-del');
            if (editBtn) {
                editBtn.onclick = () => {
                    const currentText = document.getElementById('chat-text-' + key).innerText;
                    const input = document.getElementById("vibe-chat-input");
                    const submitBtn = document.querySelector("#vibe-chat-form button[type='submit']");
                    input.value = currentText;
                    input.focus();
                    submitBtn.innerText = "Save";
                    window.vibeEditingMessageKey = key;
                };
                editBtn.onmouseenter = () => editBtn.style.color = "white";
                editBtn.onmouseleave = () => editBtn.style.color = "rgba(255,255,255,0.4)";
            }
            if (delBtn) {
                delBtn.onclick = () => {
                    if (confirm("Delete this message?")) {
                        const db = window.firebaseDatabase;
                        remove(ref(db, `_rooms/listening-room:${currentRoomKey}/chat/${key}`));
                    }
                };
                delBtn.onmouseenter = () => delBtn.style.color = "#ff4444";
                delBtn.onmouseleave = () => delBtn.style.color = "rgba(255,255,255,0.4)";
            }
        }
    }, 10);
    
    if (!existingEl) {
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
}

function startChatSession(roomKey) {
    const db = window.firebaseDatabase;
    if (!db) return;
    
    if (chatUnsubscribe) chatUnsubscribe();
    if (presenceUnsubscribe) presenceUnsubscribe();
    
    document.getElementById("vibe-chat-messages").innerHTML = "";
    
    // WebRTC Setup
    const myId = getStandaloneRoom() ? getStandaloneRoom().selfId : null;
    bindVoiceButton();
    if (!myId) return;
        if (webrtcUnsub) webrtcUnsub();
        const sigRef = ref(db, `_rooms/listening-room:${roomKey}/webrtc/${myId}`);
        webrtcUnsub = onChildAdded(sigRef, async (snapshot) => {
            const msg = snapshot.val();
            const peerId = msg.senderId;
            const msgKey = snapshot.key;
            
            remove(ref(db, `_rooms/listening-room:${roomKey}/webrtc/${myId}/${msgKey}`));
            
            if (msg.type === 'offer') {
                console.log("📥 Vibe Voice: Received OFFER from", peerId);
                let pc = peerConnections.get(peerId);
                if (!pc) pc = createPeerConnection(peerId, roomKey, myId);
                await pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg.sdp)));
                pc.remoteDescriptionSet = true;
                pc.candidateQueue.forEach(c => pc.addIceCandidate(new RTCIceCandidate(c)).catch(e=>console.log(e)));
                pc.candidateQueue = [];
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                console.log("📤 Vibe Voice: Sending ANSWER to", peerId);
                push(ref(db, `_rooms/listening-room:${roomKey}/webrtc/${peerId}`), {
                    senderId: myId,
                    type: 'answer',
                    sdp: JSON.stringify(answer)
                });
            } else if (msg.type === 'answer') {
                console.log("📥 Vibe Voice: Received ANSWER from", peerId);
                const pc = peerConnections.get(peerId);
                if (pc) {
                    await pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(msg.sdp)));
                    pc.remoteDescriptionSet = true;
                    pc.candidateQueue.forEach(c => pc.addIceCandidate(new RTCIceCandidate(c)).catch(e=>console.log(e)));
                    pc.candidateQueue = [];
                }
            } else if (msg.type === 'candidate') {
                console.log("❄️ Vibe Voice: Received ICE candidate from", peerId);
                const pc = peerConnections.get(peerId);
                if (pc) {
                    if (pc.remoteDescriptionSet) {
                        pc.addIceCandidate(new RTCIceCandidate(JSON.parse(msg.candidate))).catch(e=>console.log(e));
                    } else {
                        pc.candidateQueue.push(JSON.parse(msg.candidate));
                    }
                }
            }
        });
    initialMessagesLoaded = false;
    setTimeout(() => { initialMessagesLoaded = true; }, 1000);
    currentRoomKey = roomKey;
    
    
    const chatRef = ref(db, `_rooms/listening-room:${roomKey}/chat`);
    const addedUnsub = onChildAdded(chatRef, (snapshot) => {
        appendMessage(snapshot.key, snapshot.val());
    });
    const changedUnsub = onChildChanged(chatRef, (snapshot) => {
        appendMessage(snapshot.key, snapshot.val());
    });
    const removedUnsub = onChildRemoved(chatRef, (snapshot) => {
        const el = document.getElementById('chat-msg-' + snapshot.key);
        if (el) el.remove();
    });
    
    chatUnsubscribe = () => {
        addedUnsub();
        changedUnsub();
        removedUnsub();
    };

    
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
            checkAndSendOffer(key, roomKey, room ? room.selfId : null);
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
            if (webrtcUnsub) webrtcUnsub();
            peerConnections.forEach(pc => pc.close());
            peerConnections.clear();
            if (localAudioStream) {
                localAudioStream.getTracks().forEach(t => t.stop());
                localAudioStream = null;
            }
            currentRoomKey = null;
        }
    }
}, 1000);





