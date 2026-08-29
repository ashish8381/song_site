const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

const targetWatcher = /    setInterval\(\(\) => \{[\s\S]*?    \}, 200\);/;

const replacementWatcher = `    setInterval(() => {
      const panelMeta = document.querySelector(".panel__meta");
      const artContainer = document.querySelector(".art");
      
      if (window.customActiveTrack && window.ytPlayer) {
        try {
          const currentVideoId = window.ytPlayer.getVideoData()?.video_id;
          if (currentVideoId && currentVideoId !== window.customActiveTrack.id) {
             window.customActiveTrack = null;
          } else {
             // 1. Hide React's title and author
             const titleEl = document.querySelector(".panel__title");
             const authorEl = document.querySelector(".panel__author");
             if (titleEl) titleEl.style.display = "none";
             if (authorEl) authorEl.style.display = "none";
             
             // 2. Inject or update our own Title/Author
             if (panelMeta) {
                 let customTitle = document.getElementById("queueCustomTitle");
                 let customAuthor = document.getElementById("queueCustomAuthor");
                 
                 if (!customTitle) {
                     customTitle = document.createElement("h2");
                     customTitle.id = "queueCustomTitle";
                     customTitle.className = "panel__title";
                     panelMeta.insertBefore(customTitle, authorEl);
                 }
                 if (!customAuthor) {
                     customAuthor = document.createElement("p");
                     customAuthor.id = "queueCustomAuthor";
                     customAuthor.className = "panel__author";
                     panelMeta.insertBefore(customAuthor, authorEl ? authorEl.nextSibling : null);
                 }
                 
                 if (customTitle.innerText !== window.customActiveTrack.title) customTitle.innerText = window.customActiveTrack.title;
                 if (customAuthor.innerText !== window.customActiveTrack.author) customAuthor.innerText = window.customActiveTrack.author;
             }

             // 3. Hide React's Thumbnail and inject our own
             const reactThumb = document.querySelector(".art__img:not(#queueCustomThumb)");
             if (reactThumb) reactThumb.style.display = "none";
             
             if (artContainer) {
                 let customThumb = document.getElementById("queueCustomThumb");
                 if (!customThumb) {
                     customThumb = document.createElement("img");
                     customThumb.id = "queueCustomThumb";
                     customThumb.className = "art__img";
                     artContainer.appendChild(customThumb);
                 }
                 if (customThumb.src !== window.customActiveTrack.thumb) customThumb.src = window.customActiveTrack.thumb;
             }
          }
        } catch(e) {}
      } 
      
      // If no custom track is playing, clean up our elements and unhide React's!
      if (!window.customActiveTrack) {
          const customTitle = document.getElementById("queueCustomTitle");
          const customAuthor = document.getElementById("queueCustomAuthor");
          const customThumb = document.getElementById("queueCustomThumb");
          
          if (customTitle) customTitle.remove();
          if (customAuthor) customAuthor.remove();
          if (customThumb) customThumb.remove();
          
          const titleEl = document.querySelector(".panel__title");
          const authorEl = document.querySelector(".panel__author");
          const reactThumb = document.querySelector(".art__img:not(#queueCustomThumb)");
          
          if (titleEl) titleEl.style.display = "";
          if (authorEl) authorEl.style.display = "";
          if (reactThumb) reactThumb.style.display = "";
      }
    }, 200);`;

code = code.replace(targetWatcher, replacementWatcher);
fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Safely patched DOM manipulation to avoid breaking React!");
