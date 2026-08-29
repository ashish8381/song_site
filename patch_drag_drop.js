const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

const targetMethod = /  renderQueue\(\) \{[\s\S]*?    \}\);\s*\}/;

const replacementMethod = `  renderQueue() {
    const tracksEl = document.getElementById("queueTracks");
    window.customQueue = window.customQueue || [];
    
    if (window.customQueue.length === 0) {
      tracksEl.innerHTML = \`<div class="playlist-loading">Your queue is empty.</div>\`;
      document.getElementById("queueSubtitle").innerText = "0 tracks";
      return;
    }

    document.getElementById("queueSubtitle").innerText = \`\${window.customQueue.length} tracks (drag to reorder)\`;
    tracksEl.innerHTML = "";
    
    let dragStartIndex = -1;

    window.customQueue.forEach((track, index) => {
      const item = document.createElement("div");
      item.className = "track-item";
      item.draggable = true;
      
      item.innerHTML = \`
        <div class="track-index" style="cursor: grab;">\${index + 1}</div>
        <img src="\${track.thumb}" class="track-thumb" loading="lazy" style="pointer-events: none;" />
        <div class="track-info" style="pointer-events: none;">
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
        this.renderQueue(); 
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

      // HTML5 Drag and Drop Events
      item.addEventListener("dragstart", (e) => {
        dragStartIndex = index;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index);
        setTimeout(() => item.classList.add("dragging"), 0);
      });
      
      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        tracksEl.querySelectorAll(".track-item").forEach(el => el.classList.remove("drag-over"));
      });
      
      item.addEventListener("dragover", (e) => {
        e.preventDefault(); // Necessary to allow dropping
        e.dataTransfer.dropEffect = "move";
      });
      
      item.addEventListener("dragenter", (e) => {
        e.preventDefault();
        if (index !== dragStartIndex) item.classList.add("drag-over");
      });
      
      item.addEventListener("dragleave", (e) => {
        item.classList.remove("drag-over");
      });
      
      item.addEventListener("drop", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const dragEndIndex = index;
        if (dragStartIndex !== -1 && dragStartIndex !== dragEndIndex) {
          const draggedItem = window.customQueue.splice(dragStartIndex, 1)[0];
          window.customQueue.splice(dragEndIndex, 0, draggedItem);
          this.renderQueue(); // Re-render in new order
        }
      });

      tracksEl.appendChild(item);
    });
  }`;

code = code.replace(targetMethod, replacementMethod.trim());

// Add drag/drop CSS
const cssToAdd = \`
      .track-item.dragging { opacity: 0.4; background: rgba(255,255,255,0.05); }
      .track-item.drag-over { border-top: 2px solid rgba(255,255,255,0.8); background: rgba(255,255,255,0.1); }
\`;
code = code.replace(".playlist-loading {", cssToAdd + "\\n      .playlist-loading {");

fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully patched renderQueue with drag and drop!");
