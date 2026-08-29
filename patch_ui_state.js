const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

const uiOverrideLogic = `
  startStationWatcher() {
    let lastPid = null;
    
    // Start the enforcement loop for custom track UI
    setInterval(() => {
      if (window.customActiveTrack && window.ytPlayer) {
        try {
          const currentVideoId = window.ytPlayer.getVideoData()?.video_id;
          // If the player has moved on to a different song, clear our override
          if (currentVideoId && currentVideoId !== window.customActiveTrack.id) {
             window.customActiveTrack = null;
          } else {
             // Enforce UI
             const titleEl = document.querySelector(".panel__title");
             const authorEl = document.querySelector(".panel__author");
             const thumbEl = document.querySelector(".art__img");
             
             if (titleEl && titleEl.innerText !== window.customActiveTrack.title) {
                 titleEl.innerText = window.customActiveTrack.title;
             }
             if (authorEl && authorEl.innerText !== window.customActiveTrack.author) {
                 authorEl.innerText = window.customActiveTrack.author;
             }
             if (thumbEl && thumbEl.src !== window.customActiveTrack.thumb) {
                 thumbEl.src = window.customActiveTrack.thumb;
             }
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
        console.log(\`[Station Watcher] Now playing: "\${name}" | Playlist ID: \${currentPid}\`);
`;

code = code.replace(/  startStationWatcher\(\) \{\s*let lastPid = null;\s*setInterval\(\(\) => \{\s*const currentPid = this\.getStationPlaylistId\(\);\s*if \(currentPid && currentPid !== lastPid\) \{\s*lastPid = currentPid;\s*const name = this\.getActiveStationName\(\);\s*console\.log\(\`\[Station Watcher\] Now playing: "\\\$\{name\}" \| Playlist ID: \\\$\{currentPid\}\`\);/, uiOverrideLogic.trim());

const searchClickReplacement = `
            el.onclick = () => {
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
`;

code = code.replace(/            el\.onclick = \(\) => \{\s*if \(window\.ytPlayer\) \{\s*try \{ \s*window\.ytPlayer\.loadVideoById\(item\.id\.videoId\); \s*\} catch \(err\) \{\}\s*\}\s*input\.value = "";\s*resultsContainer\.style\.display = "none";\s*\};/, searchClickReplacement.trim());

fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully patched UI state enforcement!");
