class PlaylistUI {
  constructor() {
    this.apiKeys = null;
    this.cachedStationName = null;
    this.cachedTracks = [];      // { id, title, author, thumb }
    this.usingPlayerOrder = false; // true = tracks match player's shuffled index
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

  getActiveStationName() {
    const el = document.querySelector(".tuner__name");
    return el ? el.innerText.trim() : null;
  }

  getStationPlaylistId() {
    if (!window.appConfig) return null;
    const name = this.getActiveStationName();
    if (!name) return null;
    const s = window.appConfig.STATIONS.find(s => s.name.toLowerCase() === name.toLowerCase());
    return s ? s.playlist : null;
  }

  // Fetch video details by video IDs (preserving order)
  async fetchByVideoIds(videoIds) {
    const key = this.getActiveApiKey();
    if (!key || key.includes("REPLACE_ME")) return [];
    let results = [];
    for (let i = 0; i < videoIds.length; i += 50) {
      const chunk = videoIds.slice(i, i + 50).join(",");
      try {
        const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${chunk}&key=${key}`);
        const data = await res.json();
        if (data.error) { console.error("YT API error", data.error); break; }
        const map = {};
        (data.items || []).forEach(v => { map[v.id] = v; });
        videoIds.slice(i, i + 50).forEach(id => {
          const v = map[id];
          results.push({
            id,
            title: v?.snippet?.title || "Unknown Track",
            author: v?.snippet?.channelTitle || "",
            thumb: v?.snippet?.thumbnails?.medium?.url || v?.snippet?.thumbnails?.default?.url || "",
          });
        });
      } catch (e) { console.error(e); break; }
    }
    return results;
  }

  // Fetch from playlist API (for radio mixes / fallback)
  async fetchByPlaylistId(playlistId) {
    const key = this.getActiveApiKey();
    if (!key || key.includes("REPLACE_ME")) return [];
    let results = [], pageToken = "";
    do {
      try {
        let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}`;
        if (pageToken) url += `&pageToken=${pageToken}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.error) { console.error("YT API error", data.error); break; }
        (data.items || []).forEach(item => {
          results.push({
            id: item.snippet?.resourceId?.videoId,
            title: item.snippet?.title || "Unknown Track",
            author: item.snippet?.videoOwnerChannelTitle || item.snippet?.channelTitle || "",
            thumb: item.snippet?.thumbnails?.medium?.url || item.snippet?.thumbnails?.default?.url || "",
          });
        });
        pageToken = data.nextPageToken;
      } catch (e) { console.error(e); break; }
    } while (pageToken && results.length < 500);
    return results;
  }

  injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      .panel__card { position: relative; }
      .playlist-toggle-btn {
        position: absolute; top: 24px; right: 24px;
        background: rgba(0,0,0,0.3); color: rgba(255,255,255,0.8);
        border: 1px solid rgba(255,255,255,0.15);
        padding: 6px 12px; border-radius: 20px;
        font-family: inherit; font-size: 13px; font-weight: 600;
        cursor: pointer; z-index: 100;
        display: flex; align-items: center; gap: 6px; transition: all 0.2s;
      }
      .playlist-toggle-btn:hover { background: rgba(255,255,255,0.15); color: white; }
      .playlist-modal-overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.6);
        z-index: 9999; display: none; align-items: center;
        justify-content: center; backdrop-filter: blur(5px);
      }
      .playlist-modal-overlay.active { display: flex; }
      .playlist-modal {
        background: #18181b; width: 90%; max-width: 500px; max-height: 85vh;
        border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
        color: white; box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      }
      .playlist-header {
        padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
        display: flex; flex-direction: column; gap: 12px;
      }
      .playlist-header-top { display: flex; justify-content: space-between; align-items: flex-start; }
      .playlist-header h2 { margin: 0; font-size: 20px; }
      .playlist-header p  { margin: 4px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.5); }
      .playlist-search {
        padding: 10px 14px; border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05);
        color: white; width: 100%; box-sizing: border-box;
        font-family: inherit; font-size: 14px; outline: none;
      }
      .playlist-search::placeholder { color: rgba(255,255,255,0.35); }
      .playlist-search:focus { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); }
      .close-btn {
        background: rgba(255,255,255,0.1); border: none; color: white;
        width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
        font-size: 16px; flex-shrink: 0;
      }
      .close-btn:hover { background: rgba(255,255,255,0.2); }
      .playlist-tracks { flex: 1; overflow-y: auto; padding: 10px; }
      .track-item {
        display: flex; align-items: center; padding: 10px; border-radius: 8px;
        cursor: pointer; transition: background 0.2s; gap: 12px;
        border-left: 3px solid transparent;
      }
      .track-item:hover { background: rgba(255,255,255,0.05); }
      .track-item.active-track { background: rgba(255,204,0,0.08); border-left-color: #ffcc00; }
      .track-item.active-track .track-index { color: #ffcc00; font-weight: bold; }
      .track-item.active-track .track-title { color: #ffcc00; }
      .track-index { width: 28px; text-align: center; color: rgba(255,255,255,0.4); font-size: 13px; flex-shrink: 0; }
      .track-thumb { width: 48px; height: 48px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
      .track-info { flex: 1; overflow: hidden; }
      .track-title { margin: 0; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .track-author { margin: 4px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .track-play-icon { opacity: 0; transition: opacity 0.15s; flex-shrink: 0; }
      .track-item:hover .track-play-icon { opacity: 1; }
      .playlist-loading { text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.4); font-size: 14px; }
    `;
    document.head.appendChild(style);
  }

  injectButton() {
    const btn = document.createElement("button");
    btn.className = "playlist-toggle-btn";
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> Playlist`;
    btn.onclick = () => this.openModal();

    const mount = () => {
      const panel = document.querySelector(".panel__card");
      if (panel && !panel.querySelector(".playlist-toggle-btn")) panel.appendChild(btn);
    };
    mount();
    new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });

    const overlay = document.createElement("div");
    overlay.className = "playlist-modal-overlay";
    overlay.id = "playlistModalOverlay";
    overlay.addEventListener("click", e => { if (e.target === overlay) this.closeModal(); });
    overlay.innerHTML = `
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
    `;
    document.body.appendChild(overlay);
    document.getElementById("playlistCloseBtn").addEventListener("click", () => this.closeModal());
  }

  async openModal() {
    const overlay = document.getElementById("playlistModalOverlay");
    overlay.classList.add("active");

    const tracksEl    = document.getElementById("playlistTracks");
    const titleEl     = document.getElementById("playlistTitle");
    const subtitleEl  = document.getElementById("playlistSubtitle");
    const searchEl    = document.getElementById("playlistSearch");

    searchEl.value = "";
    tracksEl.innerHTML = `<div class="playlist-loading">Loading tracks...</div>`;

    const stationName = this.getActiveStationName();
    titleEl.innerText = stationName || "Playlist";

    // Invalidate cache whenever station changes
    if (this.cachedStationName !== stationName) {
      this.cachedStationName = stationName;
      this.cachedTracks = [];
      this.usingPlayerOrder = false;
    }

    if (this.cachedTracks.length === 0) {
      subtitleEl.innerText = "Fetching tracks...";

      // Strategy 1: use ytPlayer.getPlaylist() — order matches player's shuffle
      const playerIds = (window.ytPlayer && window.ytPlayer.getPlaylist)
        ? (window.ytPlayer.getPlaylist() || [])
        : [];

      if (playerIds.length > 0) {
        this.cachedTracks = await this.fetchByVideoIds(playerIds);
        this.usingPlayerOrder = true; // indexes are in sync with player
      }

      // Strategy 2: fallback via playlistItems API (radio mixes / timing issues)
      if (this.cachedTracks.length === 0) {
        const pid = this.getStationPlaylistId();
        if (pid) {
          this.cachedTracks = await this.fetchByPlaylistId(pid);
          this.usingPlayerOrder = false; // indexes NOT in sync — must use videoId
        }
      }
    }

    if (this.cachedTracks.length === 0) {
      tracksEl.innerHTML = `<div class="playlist-loading">Could not load tracks.<br/>Make sure your YouTube API Key is set in Firebase.</div>`;
      return;
    }

    subtitleEl.innerText = `${this.cachedTracks.length} tracks`;

    // Determine currently playing track for highlight
    const currentPlayerIndex = (window.ytPlayer && window.ytPlayer.getPlaylistIndex)
      ? window.ytPlayer.getPlaylistIndex() : -1;
    const currentVideoId = (window.ytPlayer && window.ytPlayer.getVideoData)
      ? (window.ytPlayer.getVideoData()?.video_id || null) : null;

    tracksEl.innerHTML = "";
    this.cachedTracks.forEach((track, index) => {
      const isActive = this.usingPlayerOrder
        ? index === currentPlayerIndex
        : (currentVideoId && track.id === currentVideoId);

      const item = document.createElement("div");
      item.className = "track-item" + (isActive ? " active-track" : "");
      item.innerHTML = `
        <div class="track-index">${index + 1}</div>
        <img src="${track.thumb}" class="track-thumb" loading="lazy" />
        <div class="track-info">
          <h4 class="track-title">${track.title}</h4>
          <p class="track-author">${track.author}</p>
        </div>
        <div class="track-play-icon">▶</div>
      `;

      item.addEventListener("click", () => {
        if (!window.ytPlayer) return;
        if (this.usingPlayerOrder) {
          // Indexes match player order — safe to use playVideoAt
          window.ytPlayer.playVideoAt(index);
        } else {
          // Indexes differ (shuffled) — jump by video ID instead
          window.ytPlayer.loadVideoById(track.id);
        }
        this.closeModal();
      });

      tracksEl.appendChild(item);
    });

    // Search filter
    searchEl.oninput = () => {
      const q = searchEl.value.toLowerCase();
      tracksEl.querySelectorAll(".track-item").forEach(el => {
        const t = el.querySelector(".track-title").innerText.toLowerCase();
        const a = el.querySelector(".track-author").innerText.toLowerCase();
        el.style.display = (!q || t.includes(q) || a.includes(q)) ? "flex" : "none";
      });
    };

    // Auto-scroll to active track
    requestAnimationFrame(() => {
      const active = tracksEl.querySelector(".active-track");
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
