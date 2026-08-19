class PlaylistUI {
  constructor() {
    this.apiKeys = null;
    this.currentPlaylistId = null;
    this.tracks = [];
    this.init();
  }

  async init() {
    await this.fetchKeys();
    this.injectStyles();
    this.injectButton();
  }

  async fetchKeys() {
    try {
      const res = await fetch("https://ashish827-2999a-default-rtdb.firebaseio.com/youtube_api_keys.json");
      this.apiKeys = await res.json();
    } catch (e) {
      console.error("Failed to fetch YouTube API keys", e);
    }
  }

  getActiveApiKey() {
    if (!this.apiKeys) return null;
    return this.apiKeys.primary || this.apiKeys.fallback || this.apiKeys.fallback2;
  }

  getCurrentStation() {
    if (!window.appConfig) return null;
    const nameEl = document.querySelector(".tuner__name");
    if (!nameEl) return null;
    const name = nameEl.innerText.trim().toLowerCase();
    return window.appConfig.STATIONS.find(s => s.name.toLowerCase() === name);
  }

  async fetchPlaylistTracks(playlistId) {
    const key = this.getActiveApiKey();
    if (!key || key.includes("REPLACE_ME")) {
      alert("YouTube API Key is missing or invalid in Firebase!");
      return [];
    }

    let allItems = [];
    let nextPageToken = "";
    
    try {
      const subtitle = document.getElementById("playlistSubtitle");
      if (subtitle) subtitle.innerText = "Fetching tracks (this might take a moment)...";
      
      do {
        let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}`;
        if (nextPageToken) {
          url += `&pageToken=${nextPageToken}`;
        }
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.error) {
          console.error("YouTube API Error:", data.error);
          if (allItems.length === 0) alert("YouTube API Error: " + data.error.message);
          break;
        }
        
        allItems = allItems.concat(data.items || []);
        nextPageToken = data.nextPageToken;
        
      } while (nextPageToken && allItems.length < 500);

      return allItems;
    } catch (e) {
      console.error("Failed to fetch tracks", e);
      return allItems;
    }
  }

  injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      .panel__card { position: relative; }
      .playlist-toggle-btn {
        position: absolute;
        top: 24px;
        right: 24px;
        background: rgba(0,0,0,0.3);
        color: rgba(255,255,255,0.8);
        border: 1px solid rgba(255,255,255,0.15);
        padding: 6px 12px;
        border-radius: 20px;
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
      }
      .playlist-toggle-btn:hover {
        background: rgba(255,255,255,0.1);
        color: white;
      }
      .playlist-modal-overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
      }
      .playlist-modal-overlay.active {
        display: flex;
      }
      .playlist-modal {
        background: #18181b;
        width: 90%;
        max-width: 500px;
        max-height: 85vh;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        color: white;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      }
      .playlist-header {
        padding: 20px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        display: flex;
        flex-direction: column;
      }
      .playlist-header-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .playlist-header h2 {
        margin: 0;
        font-size: 20px;
      }
      .playlist-header p {
        margin: 4px 0 12px 0;
        font-size: 14px;
        color: rgba(255,255,255,0.5);
      }
      .playlist-search {
        padding: 10px 14px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.05);
        color: white;
        width: 100%;
        box-sizing: border-box;
        font-family: inherit;
        font-size: 14px;
        outline: none;
      }
      .playlist-search:focus {
        border-color: rgba(255,255,255,0.3);
        background: rgba(255,255,255,0.1);
      }
      .close-btn {
        background: rgba(255,255,255,0.1);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .close-btn:hover {
        background: rgba(255,255,255,0.2);
      }
      .playlist-tracks {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
      }
      .track-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s;
        gap: 12px;
      }
      .track-item:hover {
        background: rgba(255,255,255,0.05);
      }
      .track-item.active-track {
        background: rgba(255, 255, 255, 0.1);
        border-left: 3px solid #ffcc00;
      }
      .track-item.active-track .track-index {
        color: #ffcc00;
        font-weight: bold;
      }
      .track-item.active-track .track-title {
        color: #ffcc00;
      }
      .track-index {
        width: 24px;
        text-align: center;
        color: rgba(255,255,255,0.5);
        font-size: 14px;
      }
      .track-thumb {
        width: 48px;
        height: 48px;
        border-radius: 6px;
        object-fit: cover;
      }
      .track-info {
        flex: 1;
        overflow: hidden;
      }
      .track-title {
        margin: 0;
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .track-author {
        margin: 4px 0 0 0;
        font-size: 13px;
        color: rgba(255,255,255,0.5);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .track-play-icon {
        opacity: 0.3;
      }
      .track-item:hover .track-play-icon {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  injectButton() {
    const btn = document.createElement("button");
    btn.className = "playlist-toggle-btn";
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> Playlist`;
    btn.onclick = () => this.openModal();
    
    const mountButton = () => {
      const panel = document.querySelector('.panel__card');
      if (panel && !panel.querySelector('.playlist-toggle-btn')) {
        panel.appendChild(btn);
      }
    };
    mountButton();
    const observer = new MutationObserver(mountButton);
    observer.observe(document.body, { childList: true, subtree: true });

    const overlay = document.createElement("div");
    overlay.className = "playlist-modal-overlay";
    overlay.id = "playlistModalOverlay";
    overlay.onclick = (e) => {
      if (e.target === overlay) this.closeModal();
    };

    overlay.innerHTML = `
      <div class="playlist-modal">
        <div class="playlist-header">
          <div class="playlist-header-top">
            <div>
              <h2 id="playlistTitle">Playlist</h2>
              <p id="playlistSubtitle">Loading tracks...</p>
            </div>
            <button class="close-btn" id="playlistCloseBtn">✕</button>
          </div>
          <input type="text" id="playlistSearch" class="playlist-search" placeholder="Search songs or artists..." autocomplete="off" />
        </div>
        <div class="playlist-tracks" id="playlistTracks"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById("playlistCloseBtn").onclick = () => this.closeModal();
  }

  async openModal() {
    const overlay = document.getElementById("playlistModalOverlay");
    overlay.classList.add("active");

    const station = this.getCurrentStation();
    if (!station) {
      document.getElementById("playlistSubtitle").innerText = "No active station found.";
      return;
    }

    document.getElementById("playlistTitle").innerText = station.name + " Playlist";
    document.getElementById("playlistSubtitle").innerText = "Fetching tracks...";
    document.getElementById("playlistSearch").value = "";
    
    const tracksContainer = document.getElementById("playlistTracks");
    tracksContainer.innerHTML = "";

    if (this.currentPlaylistId !== station.playlist || this.tracks.length === 0) {
      this.currentPlaylistId = station.playlist;
      this.tracks = await this.fetchPlaylistTracks(station.playlist);
    }

    if (this.tracks.length === 0) {
      document.getElementById("playlistSubtitle").innerText = "Could not load tracks. (Check API Key)";
      return;
    }

    document.getElementById("playlistSubtitle").innerText = `${this.tracks.length} tracks`;

    const currentIndex = (window.ytPlayer && window.ytPlayer.getPlaylistIndex) ? window.ytPlayer.getPlaylistIndex() : -1;

    this.tracks.forEach((track, index) => {
      const item = document.createElement("div");
      item.className = "track-item";
      if (index === currentIndex) {
        item.classList.add("active-track");
      }
      
      const thumb = track.snippet.thumbnails?.default?.url || "";
      const title = track.snippet.title;
      const author = track.snippet.videoOwnerChannelTitle || "";

      item.innerHTML = `
        <div class="track-index">${index + 1}</div>
        <img src="${thumb}" class="track-thumb" />
        <div class="track-info">
          <h4 class="track-title">${title}</h4>
          <p class="track-author">${author}</p>
        </div>
        <div class="track-play-icon">▶</div>
      `;

      item.onclick = () => {
        if (window.ytPlayer && window.ytPlayer.playVideoAt) {
          window.ytPlayer.playVideoAt(index);
          this.closeModal();
        } else {
          alert("YouTube Player is not ready yet!");
        }
      };

      tracksContainer.appendChild(item);
    });

    // Search functionality
    const searchInput = document.getElementById("playlistSearch");
    searchInput.oninput = (e) => {
      const query = e.target.value.toLowerCase();
      const items = tracksContainer.querySelectorAll(".track-item");
      items.forEach(el => {
        const title = el.querySelector(".track-title").innerText.toLowerCase();
        const author = el.querySelector(".track-author").innerText.toLowerCase();
        if (title.includes(query) || author.includes(query)) {
          el.style.display = "flex";
        } else {
          el.style.display = "none";
        }
      });
    };

    // Auto-scroll to active track
    setTimeout(() => {
      const activeItem = tracksContainer.querySelector(".active-track");
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  }

  closeModal() {
    document.getElementById("playlistModalOverlay").classList.remove("active");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new PlaylistUI());
} else {
  new PlaylistUI();
}
