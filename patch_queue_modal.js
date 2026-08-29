const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

const targetCss = /\.playlist-toggle-btn \{[\s\S]*?transform: scale\(1\.05\); \}/;
const replacementCss = `
      .action-buttons-container {
        position: absolute; bottom: 20px; right: 20px;
        display: flex; gap: 10px; z-index: 100;
      }
      .action-btn {
        background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);
        color: white; border-radius: 20px; padding: 8px 16px;
        font-family: inherit; font-size: 14px; font-weight: 500;
        cursor: pointer; display: flex; align-items: center; gap: 8px;
        backdrop-filter: blur(10px); transition: all 0.2s;
      }
      .action-btn:hover { background: rgba(255, 255, 255, 0.2); transform: scale(1.05); }
      .panel__title { max-width: calc(100% - 220px) !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;
code = code.replace(targetCss, replacementCss.trim());

const targetInject = /  injectButton\(\) \{[\s\S]*?document\.getElementById\("playlistCloseBtn"\)\.addEventListener\("click", \(\) => this\.closeModal\(\)\);\s*\}/;

const replacementInject = `
  injectButton() {
    const mount = () => {
      const panel = document.querySelector(".panel__card");
      if (panel && !panel.querySelector(".action-buttons-container")) {
        const container = document.createElement("div");
        container.className = "action-buttons-container";
        
        const queueBtn = document.createElement("button");
        queueBtn.className = "action-btn queue-toggle-btn";
        queueBtn.innerHTML = \`🎵 Queue\`;
        queueBtn.onclick = () => this.openQueueModal();

        const playlistBtn = document.createElement("button");
        playlistBtn.className = "action-btn playlist-toggle-btn";
        playlistBtn.innerHTML = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> Playlist\`;
        playlistBtn.onclick = () => this.openModal();

        container.appendChild(queueBtn);
        container.appendChild(playlistBtn);
        panel.appendChild(container);
      }
    };
    mount();
    new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });

    // Playlist Modal
    const overlay = document.createElement("div");
    overlay.className = "playlist-modal-overlay";
    overlay.id = "playlistModalOverlay";
    overlay.addEventListener("click", e => { if (e.target === overlay) this.closeModal(); });
    overlay.innerHTML = \`
      <div class="playlist-modal">
        <div class="playlist-header">
          <div class="playlist-header-top">
            <div><h2 id="playlistTitle">Playlist</h2><p id="playlistSubtitle">Loading...</p></div>
            <button class="close-btn" id="playlistCloseBtn">✕</button>
          </div>
          <input type="text" id="playlistSearch" class="playlist-search" placeholder="Search songs or artists..." autocomplete="off" />
        </div>
        <div class="playlist-tracks" id="playlistTracks"></div>
      </div>
    \`;
    document.body.appendChild(overlay);
    document.getElementById("playlistCloseBtn").addEventListener("click", () => this.closeModal());

    // Queue Modal
    const queueOverlay = document.createElement("div");
    queueOverlay.className = "playlist-modal-overlay";
    queueOverlay.id = "queueModalOverlay";
    queueOverlay.addEventListener("click", e => { if (e.target === queueOverlay) this.closeQueueModal(); });
    queueOverlay.innerHTML = \`
      <div class="playlist-modal">
        <div class="playlist-header">
          <div class="playlist-header-top">
            <div><h2 id="queueTitle">Up Next</h2><p id="queueSubtitle">Your custom queue</p></div>
            <button class="close-btn" id="queueCloseBtn">✕</button>
          </div>
        </div>
        <div class="playlist-tracks" id="queueTracks"></div>
      </div>
    \`;
    document.body.appendChild(queueOverlay);
    document.getElementById("queueCloseBtn").addEventListener("click", () => this.closeQueueModal());
  }

  openQueueModal() {
    const overlay = document.getElementById("queueModalOverlay");
    overlay.classList.add("active");
    this.renderQueue();
  }

  closeQueueModal() {
    document.getElementById("queueModalOverlay").classList.remove("active");
  }

  renderQueue() {
    const tracksEl = document.getElementById("queueTracks");
    window.customQueue = window.customQueue || [];
    
    if (window.customQueue.length === 0) {
      tracksEl.innerHTML = \`<div class="playlist-loading">Your queue is empty.</div>\`;
      document.getElementById("queueSubtitle").innerText = "0 tracks";
      return;
    }

    document.getElementById("queueSubtitle").innerText = \`\${window.customQueue.length} tracks\`;
    tracksEl.innerHTML = "";
    
    window.customQueue.forEach((track, index) => {
      const item = document.createElement("div");
      item.className = "track-item";
      item.innerHTML = \`
        <div class="track-index">\${index + 1}</div>
        <img src="\${track.thumb}" class="track-thumb" loading="lazy" />
        <div class="track-info">
          <h4 class="track-title">\${track.title}</h4>
          <p class="track-author">\${track.author}</p>
        </div>
        <div class="search-actions playlist-item-actions" style="opacity: 1;">
          <button class="search-btn remove-btn" title="Remove from Queue">❌</button>
        </div>
      \`;
      
      const removeBtn = item.querySelector(".remove-btn");
      removeBtn.onclick = (e) => {
        e.stopPropagation();
        window.customQueue.splice(index, 1);
        this.renderQueue(); // Re-render
      };

      item.onclick = () => {
        if (window.ytPlayer) {
          try { 
            window.ytPlayer.loadVideoById(track.id); 
            window.customActiveTrack = {
                id: track.id,
                title: track.title,
                author: track.author,
                thumb: track.thumb
            };
            window.customQueue.splice(0, index + 1);
          } catch (err) {}
        }
        this.closeQueueModal();
      };

      tracksEl.appendChild(item);
    });
  }
`;

code = code.replace(targetInject, replacementInject.trim());

fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully patched playlist and queue modals!");
