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
    this.injectGlobalSearch();
    this.injectButton();
    this.startStationWatcher();
  }

  startStationWatcher() {
    let lastPid = null;

    setInterval(() => {
      if (window.customActiveTrack && window.ytPlayer) {
        try {
          const currentVideoId = window.ytPlayer.getVideoData()?.video_id;
          if (currentVideoId && currentVideoId !== window.customActiveTrack.id) {
             window.customActiveTrack = null;
          } else {
             const titleEl = document.querySelector(".panel__title");
             const authorEl = document.querySelector(".panel__author");
             const thumbEl = document.querySelector(".art__img");
             if (titleEl && titleEl.innerText !== window.customActiveTrack.title) titleEl.innerText = window.customActiveTrack.title;
             if (authorEl && authorEl.innerText !== window.customActiveTrack.author) authorEl.innerText = window.customActiveTrack.author;
             if (thumbEl && thumbEl.src !== window.customActiveTrack.thumb) thumbEl.src = window.customActiveTrack.thumb;
          }
        } catch(e) {}
      }
    }, 200);

    setInterval(() => {
      const currentPid = this.getStationPlaylistId();
      if (currentPid && currentPid !== lastPid) {
        lastPid = currentPid;
        window.customActiveTrack = null; // Clear on station change
        const name = this.getActiveStationName();
        console.log(`[Station Watcher] Now playing: "${name}" | Playlist ID: ${currentPid}`);

        // Pre-fetch the playlist in the background for instant UI load
        if (this.apiKeys) {
          console.log("[Station Watcher] Pre-fetching tracks in background...");
          this.fetchByPlaylistId(currentPid).then(tracks => {
            // Only cache if the user hasn't changed stations again while we were fetching
            if (this.getStationPlaylistId() === currentPid) {
              this.cachedPlaylistId = currentPid;
              this.cachedTracks = tracks;
              this.usingPlayerOrder = false;
              console.log(`[Station Watcher] Pre-fetch complete: ${tracks.length} tracks ready.`);
              
              // If modal is open right now, refresh it to show the new tracks
              const overlay = document.getElementById("playlistModalOverlay");
              if (overlay && overlay.classList.contains("active")) {
                this.openModal();
              }
            }
          }).catch(e => console.error("Pre-fetch failed", e));
        }
      }
    }, 1000);
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

  markKeyExhausted(exhaustedKey) {
    if (!this.apiKeys) return;
    if (this.apiKeys.primary === exhaustedKey) {
      console.warn("[YouTube API] Primary key exhausted. Switching to fallback.");
      this.apiKeys.primary = null;
    } else if (this.apiKeys.fallback === exhaustedKey) {
      console.warn("[YouTube API] Fallback key exhausted. Switching to fallback2.");
      this.apiKeys.fallback = null;
    } else if (this.apiKeys.fallback2 === exhaustedKey) {
      console.warn("[YouTube API] ALL keys exhausted!");
      this.apiKeys.fallback2 = null;
    }
  }

  async fetchYoutubeApi(urlBuilder) {
    while (true) {
      const key = this.getActiveApiKey();
      if (!key || key.includes("REPLACE_ME")) return { error: { message: "No valid API keys available." } };
      
      const res = await fetch(urlBuilder(key));
      const data = await res.json();
      
      if (data.error && data.error.code === 429) {
        this.markKeyExhausted(key);
        continue;
      }
      return data;
    }
  }

  getStationPlaylistId() {
    try {
      const stored = localStorage.getItem("vibe-room-fm:station");
      if (stored) {
        // Remove the extra quotes from JSON.stringify
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Failed to read station from localStorage", e);
    }
    
    // Fallback to initial default station on first load if localStorage is empty
    if (window.appConfig && window.appConfig.STATIONS && window.appConfig.STATIONS.length > 0) {
      return window.appConfig.STATIONS[0].playlist;
    }
    return null;
  }

  getActiveStationName() {
    const pid = this.getStationPlaylistId();
    if (!pid || !window.appConfig) return "Playlist";
    const s = window.appConfig.STATIONS.find(st => st.playlist === pid);
    return s ? s.name : "Playlist";
  }

  // Fetch video details by video IDs (preserving order)
  async fetchByVideoIds(videoIds) {
    let results = [];
    for (let i = 0; i < videoIds.length; i += 50) {
      const chunk = videoIds.slice(i, i + 50).join(",");
      try {
        const data = await this.fetchYoutubeApi(key => `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${chunk}&key=${key}`);
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
    let results = [], pageToken = "";
    do {
      try {
        const data = await this.fetchYoutubeApi(key => {
            let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}`;
            if (pageToken) url += `&pageToken=${pageToken}`;
            return url;
        });
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
        cursor: pointer; z-index: 9999;
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
      
      .global-search-container { margin: 10px 16px 20px; position: relative; z-index: 9999; }
      .search-input-wrapper { position: relative; }
      #globalTrackSearch {
        width: 100%; padding: 12px 14px; background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px;
        color: white; font-size: 14px; outline: none; transition: background 0.2s;
        box-sizing: border-box;
      }
      #globalTrackSearch:focus { background: rgba(255, 255, 255, 0.12); border-color: rgba(255,255,255,0.3); }
      #globalTrackSearch::placeholder { color: rgba(255,255,255,0.4); }
      .search-results-dropdown {
        position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
        background: rgba(20, 20, 20, 0.95); border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px; max-height: 250px; overflow-y: auto; display: none;
        flex-direction: column; backdrop-filter: blur(10px); box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      }
      .search-result-item { display: flex; align-items: center; padding: 10px; cursor: pointer; border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.2s; }
      .search-result-item:last-child { border-bottom: none; }
      .search-result-item:hover { background: rgba(255, 255, 255, 0.15); }
      .search-thumb { width: 40px; height: 40px; border-radius: 4px; object-fit: cover; margin-right: 12px; flex-shrink: 0; }
      .search-info { flex: 1; overflow: hidden; }
      .search-title { margin: 0; font-size: 14px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500; }
      .search-author { margin: 4px 0 0 0; font-size: 12px; color: rgba(255, 255, 255, 0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .search-msg { padding: 12px; color: rgba(255,255,255,0.5); font-size: 13px; text-align: center; }
      
      .search-actions { display: flex; gap: 8px; flex-shrink: 0; }
      .search-btn { 
        background: rgba(255,255,255,0.1); border: none; border-radius: 6px; 
        width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background 0.2s; font-size: 14px;
      }
      .search-btn:hover { background: rgba(255,255,255,0.25); }

      .playlist-loading { text-align: center; padding: 40px 20px; color: rgba(255,255,255,0.4); font-size: 14px; }
    `;
    document.head.appendChild(style);
  }

  injectGlobalSearch() {
    const mountSearch = () => {
      const tuner = document.querySelector(".tuner");
      if (tuner && tuner.parentNode && !tuner.parentNode.querySelector(".global-search-container")) {
        const container = document.createElement("div");
        container.className = "global-search-container";
        container.innerHTML = `
          <div class="search-input-wrapper">
            <input type="text" id="globalTrackSearch" placeholder="Search YouTube to play..." autocomplete="off" />
            <div id="searchResults" class="search-results-dropdown"></div>
          </div>
        `;
        tuner.parentNode.insertBefore(container, tuner);
        this.setupGlobalSearch();
      }
    };
    mountSearch();
    new MutationObserver(mountSearch).observe(document.body, { childList: true, subtree: true });
  }

  setupGlobalSearch() {
    const input = document.getElementById("globalTrackSearch");
    const resultsContainer = document.getElementById("searchResults");
    let debounceTimer;

    input.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim();
      if (!query) {
        resultsContainer.style.display = "none";
        return;
      }

      debounceTimer = setTimeout(async () => {
        const key = this.getActiveApiKey();
        if (!key || key.includes("REPLACE_ME")) {
            resultsContainer.innerHTML = '<div class="search-msg">YouTube API Key missing in Firebase</div>';
            resultsContainer.style.display = "flex";
            return;
        }
        
        resultsContainer.innerHTML = '<div class="search-msg">Searching...</div>';
        resultsContainer.style.display = "flex";

try {
          const data = await this.fetchYoutubeApi(key => `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=5&q=${encodeURIComponent(query)}&key=${key}`);
          
          if (data.error) {
            resultsContainer.innerHTML = `<div class="search-msg" style="color:#ff5555;">${data.error.message || "Quota exhausted"}</div>`;
            return;
          }
          
          if (!data.items || data.items.length === 0) {
            resultsContainer.innerHTML = '<div class="search-msg">No results found</div>';
            return;
          }

          resultsContainer.innerHTML = "";
          data.items.forEach(item => {
            const el = document.createElement("div");
            el.className = "search-result-item";
            
            const title = item.snippet?.title || "Unknown Title";
            const author = item.snippet?.channelTitle || "Unknown Artist";
            const thumb = item.snippet?.thumbnails?.default?.url || "";

            el.innerHTML = `
              <img src="${thumb}" class="search-thumb" />
              <div class="search-info">
                <p class="search-title">${title}</p>
                <p class="search-author">${author}</p>
              </div>
              <div class="search-actions">
                <button class="search-btn play-btn" title="Play Now">▶️</button>
                <button class="search-btn queue-btn" title="Add to Queue">➕</button>
              </div>
            `;
            
            const playBtn = el.querySelector(".play-btn");
            const queueBtn = el.querySelector(".queue-btn");
            
            playBtn.onclick = (e) => {
              e.stopPropagation();
              if (window.ytPlayer) {
                try { 
                  window.ytPlayer.loadVideoById(item.id.videoId); 
                  window.customActiveTrack = {
                      id: item.id.videoId,
                      title: title,
                      author: author,
                      thumb: thumb
                  };
                } catch (err) {}
              }
              input.value = "";
              resultsContainer.style.display = "none";
            };
            
            queueBtn.onclick = (e) => {
              e.stopPropagation();
              window.customQueue = window.customQueue || [];
              window.customQueue.push({
                  id: item.id.videoId,
                  title: title,
                  author: author,
                  thumb: thumb
              });
              
              queueBtn.innerHTML = "✅";
              setTimeout(() => { queueBtn.innerHTML = "➕"; }, 1000);
            };

            resultsContainer.appendChild(el);
          });
        } catch (err) {
          resultsContainer.innerHTML = '<div class="search-msg" style="color:#ff5555;">Error searching</div>';
        }
      }, 500);
    });

    document.addEventListener("click", (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.style.display = "none";
      }
    });
    
    input.addEventListener("focus", () => {
      if (input.value.trim() && resultsContainer.innerHTML !== "") {
        resultsContainer.style.display = "flex";
      }
    });
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
    tracksEl.innerHTML = `<div class="playlist-loading">Opening playlist...</div>`;

    const stationName = this.getActiveStationName();
    const currentPid = this.getStationPlaylistId();
    titleEl.innerText = stationName || "Playlist";

    // If the playlist ID is different, clear the songs list
    if (this.cachedPlaylistId !== currentPid) {
      this.cachedPlaylistId = currentPid;
      this.cachedTracks = [];
      this.usingPlayerOrder = false;
    }

    if (this.cachedTracks.length === 0) {
      // Step 1: check API key
      const key = this.getActiveApiKey();
      if (!key) {
        tracksEl.innerHTML = `<div class="playlist-loading">⚠️ Could not load YouTube API keys from Firebase.<br/><br/>Make sure Firebase Realtime Database is accessible.</div>`;
        return;
      }
      if (key.includes("REPLACE_ME")) {
        tracksEl.innerHTML = `<div class="playlist-loading">🔑 YouTube API Key is not set yet.<br/><br/>Go to Firebase Console → Realtime Database → <b>youtube_api_keys</b> and replace the dummy values with a real YouTube Data API v3 key.</div>`;
        return;
      }

      // Step 2: Fetch directly from Playlist API using the station's playlist ID
      console.log("[PlaylistUI] Fetching tracks for playlist ID:", currentPid);
      if (currentPid) {
        subtitleEl.innerText = "Fetching playlist from YouTube API...";
        this.cachedTracks = await this.fetchByPlaylistId(currentPid);
        this.usingPlayerOrder = false; // Always use loadVideoById since order isn't shuffled
        console.log("[PlaylistUI] API result:", this.cachedTracks.length, "tracks");
      } else {
        console.warn("[PlaylistUI] No playlist ID found in appConfig. appConfig:", window.appConfig);
      }
    }

    if (this.cachedTracks.length === 0) {
      tracksEl.innerHTML = `<div class="playlist-loading">❌ Could not load tracks.<br/><br/>Open DevTools Console (F12) and check for errors.</div>`;
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
        const p = window.ytPlayer;

        if (this.usingPlayerOrder) {
          // Strategy 1: indexes match player order
          try { p.playVideoAt(index); } catch (e) {}
          // playVideoAt switches track but may not auto-play — force it
          setTimeout(() => { try { p.playVideo(); } catch(e){} }, 150);
        } else {
          // Strategy 2: radio mixes — find real index or use loadVideoById
          const playerIds = p.getPlaylist ? (p.getPlaylist() || []) : [];
          const playerIdx = playerIds.indexOf(track.id);
          if (playerIdx !== -1) {
            try { p.playVideoAt(playerIdx); } catch (e) {}
            setTimeout(() => { try { p.playVideo(); } catch(e){} }, 150);
          } else {
            try { p.loadVideoById({ videoId: track.id, startSeconds: 0 }); } catch (e) {
              try { p.loadVideoById(track.id); } catch (e2) {}
            }
          }
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
