class PlaylistUI {
  constructor() {
    this.apiKeys = null;
    this.cachedStationName = null;
    this.cachedVideoIds = [];
    this.cachedTracks = [];
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

  // Get the currently tuned station name from the UI
  getActiveStationName() {
    const nameEl = document.querySelector(".tuner__name");
    return nameEl ? nameEl.innerText.trim() : null;
  }

  async fetchTracksByVideoIds(videoIds) {
    const key = this.getActiveApiKey();
    if (!key || key.includes("REPLACE_ME")) {
      alert("YouTube API Key is missing or invalid in Firebase!\n\nPlease update it in Firebase Console under Realtime Database > youtube_api_keys.");
      return [];
    }

    let allItems = [];

    try {
      for (let i = 0; i < videoIds.length; i += 50) {
        const chunk = videoIds.slice(i, i + 50).join(",");
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${chunk}&key=${key}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
          console.error("YouTube API Error:", data.error);
          if (allItems.length === 0) alert("YouTube API Error: " + data.error.message);
          break;
        }

        // Preserve exact playlist order by mapping API response back to videoIds order
        const idToItem = {};
        (data.items || []).forEach(item => { idToItem[item.id] = item; });

        videoIds.slice(i, i + 50).forEach(id => {
          allItems.push(idToItem[id] || { id, snippet: { title: "Unknown / Deleted Track", channelTitle: "", thumbnails: {} } });
        });
      }

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
        background: rgba(255,255,255,0.15);
        color: white;
      }

      .playlist-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);
      }
      .playlist-modal-overlay.active { display: flex; }

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
        gap: 12px;
      }
      .playlist-header-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .playlist-header h2 { margin: 0; font-size: 20px; }
      .playlist-header p  { margin: 4px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.5); }

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
      .playlist-search::placeholder { color: rgba(255,255,255,0.35); }
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
        font-size: 16px;
        line-height: 1;
        flex-shrink: 0;
      }
      .close-btn:hover { background: rgba(255,255,255,0.2); }

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
        border-left: 3px solid transparent;
      }
      .track-item:hover { background: rgba(255,255,255,0.05); }

      .track-item.active-track {
        background: rgba(255,204,0,0.08);
        border-left-color: #ffcc00;
      }
      .track-item.active-track .track-index { color: #ffcc00; font-weight: bold; }
      .track-item.active-track .track-title { color: #ffcc00; }

      .track-index { width: 28px; text-align: center; color: rgba(255,255,255,0.4); font-size: 13px; flex-shrink: 0; }
      .track-thumb { width: 48px; height: 48px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
      .track-info { flex: 1; overflow: hidden; }
      .track-title { margin: 0; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .track-author { margin: 4px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .track-play-icon { opacity: 0; transition: opacity 0.15s; flex-shrink: 0; }
      .track-item:hover .track-play-icon { opacity: 1; }

      .playlist-loading {
        text-align: center;
        padding: 40px 20px;
        color: rgba(255,255,255,0.4);
        font-size: 14px;
      }
    `;
    document.head.appendChild(style);
  }

  injectButton() {
    const btn = document.createElement("button");
    btn.className = "playlist-toggle-btn";
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> Playlist`;
    btn.onclick = () => this.openModal();

    // Mount inside .panel__card, retry if not yet rendered
    const mount = () => {
      const panel = document.querySelector(".panel__card");
      if (panel && !panel.querySelector(".playlist-toggle-btn")) {
        panel.appendChild(btn);
      }
    };
    mount();
    new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });

    // Build modal overlay
    const overlay = document.createElement("div");
    overlay.className = "playlist-modal-overlay";
    overlay.id = "playlistModalOverlay";
    overlay.addEventListener("click", e => { if (e.target === overlay) this.closeModal(); });
    overlay.innerHTML = `
      <div class="playlist-modal">
        <div class="playlist-header">
          <div class="playlist-header-top">
            <div>
              <h2 id="playlistTitle">Playlist</h2>
              <p id="playlistSubtitle">Loading...</p>
            </div>
            <button class="close-btn" id="playlistCloseBtn">✕</button>
          </div>
          <input type="text" id="playlistSearch" class="playlist-search" placeholder="Search songs or artists..." autocomplete="off" />
        </div>
        <div class="playlist-tracks" id="playlistTracks"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById("playlistCloseBtn").addEventListener("click", () => this.closeModal());
  }

  // Get current station's playlist ID from app config
  getStationPlaylistId() {
    if (!window.appConfig) return null;
    const stationName = this.getActiveStationName();
    if (!stationName) return null;
    const station = window.appConfig.STATIONS.find(
      s => s.name.toLowerCase() === stationName.toLowerCase()
    );
    return station ? station.playlist : null;
  }

  async fetchPlaylistItemsByListId(playlistId) {
    const key = this.getActiveApiKey();
    if (!key || key.includes("REPLACE_ME")) {
      alert("YouTube API Key is missing or invalid in Firebase!\n\nPlease update it in Firebase Console under Realtime Database > youtube_api_keys.");
      return [];
    }

    let allItems = [];
    let nextPageToken = "";

    try {
      do {
        let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}`;
        if (nextPageToken) url += `&pageToken=${nextPageToken}`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
          console.error("YouTube API Error:", data.error);
          break;
        }

        allItems = allItems.concat(data.items || []);
        nextPageToken = data.nextPageToken;
      } while (nextPageToken && allItems.length < 500);

      return allItems;
    } catch (e) {
      console.error("fetchPlaylistItemsByListId error:", e);
      return allItems;
    }
  }

  async openModal() {
    const overlay = document.getElementById("playlistModalOverlay");
    overlay.classList.add("active");

    const tracksContainer = document.getElementById("playlistTracks");
    const titleEl = document.getElementById("playlistTitle");
    const subtitleEl = document.getElementById("playlistSubtitle");
    const searchEl = document.getElementById("playlistSearch");

    // Reset search
    searchEl.value = "";

    // Show loading state
    tracksContainer.innerHTML = `<div class="playlist-loading">Loading tracks...</div>`;

    // Get active station name from UI
    const stationName = this.getActiveStationName();
    titleEl.innerText = stationName || "Playlist";

    // Invalidate cache when station changes
    if (this.cachedStationName !== stationName) {
      this.cachedStationName = stationName;
      this.cachedVideoIds = [];
      this.cachedTracks = [];
    }

    // Use cached tracks if available for this station
    if (this.cachedTracks.length > 0) {
      this.renderTracks(tracksContainer, subtitleEl);
      return;
    }

    subtitleEl.innerText = "Fetching track details...";

    // Strategy 1: try getPlaylist() from the YouTube player (works for PL... playlists)
    const videoIds = (window.ytPlayer && window.ytPlayer.getPlaylist) 
      ? (window.ytPlayer.getPlaylist() || []) 
      : [];

    if (videoIds.length > 0) {
      this.cachedVideoIds = videoIds;
      this.cachedTracks = await this.fetchTracksByVideoIds(videoIds);
    }

    // Strategy 2: fallback — fetch via playlistItems API using station's playlist ID
    // This handles RDCLAK radio mixes and timing issues
    if (this.cachedTracks.length === 0) {
      const playlistId = this.getStationPlaylistId();
      if (playlistId) {
        const items = await this.fetchPlaylistItemsByListId(playlistId);
        // Map playlistItems response to same shape as videos response
        this.cachedTracks = items.map(item => ({
          id: item.snippet?.resourceId?.videoId,
          snippet: {
            title: item.snippet?.title || "Unknown Track",
            channelTitle: item.snippet?.videoOwnerChannelTitle || item.snippet?.channelTitle || "",
            thumbnails: item.snippet?.thumbnails || {},
          }
        }));
      }
    }

    if (this.cachedTracks.length === 0) {
      tracksContainer.innerHTML = `<div class="playlist-loading">Could not load tracks.<br/>Check your YouTube API Key in Firebase.</div>`;
      return;
    }

    this.renderTracks(tracksContainer, subtitleEl);
  }

  renderTracks(tracksContainer, subtitleEl) {
    const tracks = this.cachedTracks;
    subtitleEl.innerText = `${tracks.length} tracks`;
    tracksContainer.innerHTML = "";

    const currentIndex = (window.ytPlayer && window.ytPlayer.getPlaylistIndex)
      ? window.ytPlayer.getPlaylistIndex()
      : -1;

    this.cachedTracks.forEach((track, index) => {
      const item = document.createElement("div");
      item.className = "track-item" + (index === currentIndex ? " active-track" : "");

      const thumb = track.snippet?.thumbnails?.medium?.url || track.snippet?.thumbnails?.default?.url || "";
      const title = track.snippet?.title || "Unknown Track";
      const author = track.snippet?.channelTitle || "";

      item.innerHTML = `
        <div class="track-index">${index + 1}</div>
        <img src="${thumb}" class="track-thumb" loading="lazy" />
        <div class="track-info">
          <h4 class="track-title">${title}</h4>
          <p class="track-author">${author}</p>
        </div>
        <div class="track-play-icon">▶</div>
      `;

      // Click to play: use playVideoAt for playlist items
      item.addEventListener("click", () => {
        if (!window.ytPlayer) return;
        try {
          window.ytPlayer.playVideoAt(index);
          // Some players need an explicit play call after seek
          setTimeout(() => {
            if (window.ytPlayer.getPlayerState && window.ytPlayer.getPlayerState() !== 1) {
              window.ytPlayer.playVideo();
            }
          }, 300);
        } catch (err) {
          console.error("playVideoAt error:", err);
        }
        this.closeModal();
      });

      tracksContainer.appendChild(item);
    });

    // Search filter
    searchEl.oninput = () => {
      const q = searchEl.value.toLowerCase();
      tracksContainer.querySelectorAll(".track-item").forEach(el => {
        const t = el.querySelector(".track-title").innerText.toLowerCase();
        const a = el.querySelector(".track-author").innerText.toLowerCase();
        el.style.display = (!q || t.includes(q) || a.includes(q)) ? "flex" : "none";
      });
    };

    // Auto-scroll to currently playing track
    requestAnimationFrame(() => {
      const active = tracksContainer.querySelector(".active-track");
      if (active) active.scrollIntoView({ behavior: "smooth", block: "center" });
    });
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
