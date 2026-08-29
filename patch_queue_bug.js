const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

// 1. Add customQueueChanged event listener to init()
const initReplacement = `
  async init() {
    window.addEventListener('customQueueChanged', () => {
      const overlay = document.getElementById("queueModalOverlay");
      if (overlay && overlay.classList.contains("active")) {
        this.renderQueue();
      }
    });
    await this.fetchKeys();
`;
code = code.replace(/  async init\(\) \{\s*await this\.fetchKeys\(\);/, initReplacement.trim());


// 2. Fix the drag-and-drop index binding
const dragDropReplacement = `
      // HTML5 Drag and Drop Events
      item.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", index.toString());
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
        const dragStartIndex = parseInt(e.dataTransfer.getData("text/plain") || "-1", 10);
        if (index !== dragStartIndex) item.classList.add("drag-over");
      });
      
      item.addEventListener("dragleave", (e) => {
        item.classList.remove("drag-over");
      });
      
      item.addEventListener("drop", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const dragStartIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
        const dragEndIndex = index;
        
        if (!isNaN(dragStartIndex) && dragStartIndex !== dragEndIndex && dragStartIndex >= 0 && dragStartIndex < window.customQueue.length) {
          const draggedItem = window.customQueue[dragStartIndex];
          window.customQueue.splice(dragStartIndex, 1);
          window.customQueue.splice(dragEndIndex, 0, draggedItem);
          this.renderQueue(); // Re-render in new order
        }
      });
`;

const targetDragDrop = /\/\/ HTML5 Drag and Drop Events[\s\S]*?\}\);\s*tracksEl\.appendChild\(item\);/

code = code.replace(targetDragDrop, dragDropReplacement.trim() + "\n\n      tracksEl.appendChild(item);");

// Also remove `let dragStartIndex = -1;` from renderQueue since we now use dataTransfer
code = code.replace(/    let dragStartIndex = -1;\s*/, "");


fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully patched queue bug!");
