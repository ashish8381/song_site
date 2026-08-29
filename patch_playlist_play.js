const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

const targetHtml = /<div class="search-actions playlist-item-actions">\s*<button class="search-btn queue-btn" title="Add to Queue">➕<\/button>\s*<\/div>/;

const replacementHtml = `<div class="search-actions playlist-item-actions">
          <button class="search-btn play-btn" title="Play Now">▶️</button>
          <button class="search-btn queue-btn" title="Add to Queue">➕</button>
        </div>`;

code = code.replace(targetHtml, replacementHtml);

// And we need to add the playBtn logic!
// In `openModal()`, right after `const queueBtn = item.querySelector(".queue-btn");`
const targetLogic = /const queueBtn = item\.querySelector\("\.queue-btn"\);\s*queueBtn\.addEventListener\("click", \(e\) => \{/;

const replacementLogic = `const queueBtn = item.querySelector(".queue-btn");
      const playBtn = item.querySelector(".play-btn");

      playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!window.ytPlayer) return;
        const p = window.ytPlayer;
        if (this.usingPlayerOrder) {
          try { p.playVideoAt(index); } catch (e) {}
          setTimeout(() => { if (p.getPlayerState() !== 1) p.playVideo(); }, 200);
        } else {
          try { 
            p.loadVideoById(track.id); 
            window.customActiveTrack = { id: track.id, title: track.title, author: track.author, thumb: track.thumb };
          } catch (e) {}
        }
        this.closeModal();
      });

      queueBtn.addEventListener("click", (e) => {`;

code = code.replace(targetLogic, replacementLogic);

// Ensure the row itself no longer triggers play if they click the row body, OR keep it so the whole row plays?
// If we have a play button, the row click is redundant but convenient. We can leave item.addEventListener("click"...) intact as a fallback.

fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully added play button to playlist modal!");
