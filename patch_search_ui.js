const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

// The block to replace:
// el.innerHTML = `
//   <img src="${thumb}" class="search-thumb" />
//   <div class="search-info">
//     <p class="search-title">${title}</p>
//     <p class="search-author">${author}</p>
//   </div>
// `;
// el.onclick = () => {

// Let's replace the whole data.items.forEach block cleanly.
const targetBlockRegex = /data\.items\.forEach\(item => \{[\s\S]*?resultsContainer\.appendChild\(el\);\s*\}\);/;

const replacementBlock = `data.items.forEach(item => {
            const el = document.createElement("div");
            el.className = "search-result-item";
            
            const title = item.snippet?.title || "Unknown Title";
            const author = item.snippet?.channelTitle || "Unknown Artist";
            const thumb = item.snippet?.thumbnails?.default?.url || "";

            el.innerHTML = \`
              <img src="\${thumb}" class="search-thumb" />
              <div class="search-info">
                <p class="search-title">\${title}</p>
                <p class="search-author">\${author}</p>
              </div>
              <div class="search-actions">
                <button class="search-btn play-btn" title="Play Now">▶️</button>
                <button class="search-btn queue-btn" title="Add to Queue">➕</button>
              </div>
            \`;
            
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
              
              // Visual feedback
              queueBtn.innerHTML = "✅";
              setTimeout(() => { queueBtn.innerHTML = "➕"; }, 1000);
            };

            resultsContainer.appendChild(el);
          });`;

code = code.replace(targetBlockRegex, replacementBlock);

// Now append CSS for the new buttons
const cssToAdd = \`
      .search-actions { display: flex; gap: 8px; flex-shrink: 0; }
      .search-btn { 
        background: rgba(255,255,255,0.1); border: none; border-radius: 6px; 
        width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
        cursor: pointer; transition: background 0.2s; font-size: 14px;
      }
      .search-btn:hover { background: rgba(255,255,255,0.25); }
\`;
code = code.replace(".playlist-loading {", cssToAdd + "\\n      .playlist-loading {");

fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully patched search UI for queue feature!");
