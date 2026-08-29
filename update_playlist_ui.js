const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

const searchMethods = `
  injectGlobalSearch() {
    const mountSearch = () => {
      const panelCard = document.querySelector(".panel__card");
      if (panelCard && !panelCard.querySelector(".global-search-container")) {
        const container = document.createElement("div");
        container.className = "global-search-container";
        container.innerHTML = \`
          <div class="search-input-wrapper">
            <input type="text" id="globalTrackSearch" placeholder="Search YouTube to play..." autocomplete="off" />
            <div id="searchResults" class="search-results-dropdown"></div>
          </div>
        \`;
        const tuner = panelCard.querySelector(".tuner");
        if (tuner) {
          panelCard.insertBefore(container, tuner);
        } else {
          panelCard.appendChild(container);
        }
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
          const res = await fetch(\`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=\${encodeURIComponent(query)}&key=\${key}\`);
          const data = await res.json();
          
          if (!data.items || data.items.length === 0) {
            resultsContainer.innerHTML = '<div class="search-msg">No results found</div>';
            return;
          }

          resultsContainer.innerHTML = "";
          data.items.forEach(item => {
            const el = document.createElement("div");
            el.className = "search-result-item";
            
            // Handle missing snippet data gracefully
            const title = item.snippet?.title || "Unknown Title";
            const author = item.snippet?.channelTitle || "Unknown Artist";
            const thumb = item.snippet?.thumbnails?.default?.url || "";

            el.innerHTML = \`
              <img src="\${thumb}" class="search-thumb" />
              <div class="search-info">
                <p class="search-title">\${title}</p>
                <p class="search-author">\${author}</p>
              </div>
            \`;
            el.onclick = () => {
              if (window.ytPlayer) {
                try { 
                  window.ytPlayer.loadVideoById(item.id.videoId); 
                } catch (err) {}
              }
              input.value = "";
              resultsContainer.style.display = "none";
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
`;

// Insert the new methods into the class
code = code.replace("injectButton() {", searchMethods + "\n  injectButton() {");

// Add injectGlobalSearch() to the init() method
code = code.replace("this.injectButton();", "this.injectGlobalSearch();\n    this.injectButton();");

// Add CSS to injectStyles()
const cssToAdd = \`
      .global-search-container { margin: 10px 16px 20px; position: relative; z-index: 100; }
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
\`;

code = code.replace(".playlist-loading {", cssToAdd + "\n      .playlist-loading {");

fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully patched playlist-ui.js!");
