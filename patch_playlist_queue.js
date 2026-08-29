const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

const targetItemHtml = /item\.innerHTML = \`[\s\S]*?<div class="track-play-icon">▶<\/div>\s*\`;\s*item\.addEventListener\("click", \(\) => \{/;

const replacementHtml = `item.innerHTML = \`
        <div class="track-index">\${index + 1}</div>
        <img src="\${track.thumb}" class="track-thumb" loading="lazy" />
        <div class="track-info">
          <h4 class="track-title">\${track.title}</h4>
          <p class="track-author">\${track.author}</p>
        </div>
        <div class="search-actions playlist-item-actions">
          <button class="search-btn queue-btn" title="Add to Queue">➕</button>
        </div>
      \`;

      const queueBtn = item.querySelector(".queue-btn");
      queueBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.customQueue = window.customQueue || [];
        window.customQueue.push({
            id: track.id,
            title: track.title,
            author: track.author,
            thumb: track.thumb
        });
        queueBtn.innerHTML = "✅";
        setTimeout(() => { queueBtn.innerHTML = "➕"; }, 1000);
      });

      item.addEventListener("click", () => {`;

code = code.replace(targetItemHtml, replacementHtml);

code = code.replace(".track-play-icon { opacity: 0; transition: opacity 0.15s; flex-shrink: 0; }", ".playlist-item-actions { opacity: 0; transition: opacity 0.15s; }");
code = code.replace(".track-item:hover .track-play-icon { opacity: 1; }", ".track-item:hover .playlist-item-actions { opacity: 1; }");

fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully patched playlist modal for queue feature!");
