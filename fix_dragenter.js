const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

code = code.replace('window.customQueue.forEach((track, index) => {', 'let dragStartIndex = -1;\n    window.customQueue.forEach((track, index) => {');

const replaceDragStart = `item.addEventListener("dragstart", (e) => {
        dragStartIndex = index;
        e.dataTransfer.effectAllowed = "move";`;

code = code.replace(/item\.addEventListener\("dragstart", \(e\) => \{\s*e\.dataTransfer\.effectAllowed = "move";/, replaceDragStart);

const replaceDragEnter = `item.addEventListener("dragenter", (e) => {
        e.preventDefault();
        if (index !== dragStartIndex) item.classList.add("drag-over");
      });`;

code = code.replace(/item\.addEventListener\("dragenter", \(e\) => \{[\s\S]*?\}\);/, replaceDragEnter);

fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Fixed dragenter highlight logic!");
