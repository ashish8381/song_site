const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

const targetWatcher = /if \(currentVideoId && currentVideoId !== window\.customActiveTrack\.id\) \{\s*window\.customActiveTrack = null;\s*\}/;

const replacementWatcher = `if (currentVideoId && currentVideoId !== window.customActiveTrack.id) {
             window.customActiveTrack = null;
             const titleEl = document.querySelector(".panel__title");
             const authorEl = document.querySelector(".panel__author");
             try {
               const ytData = window.ytPlayer.getVideoData();
               if (titleEl && ytData.title) titleEl.innerText = ytData.title;
               if (authorEl && ytData.author) authorEl.innerText = ytData.author;
             } catch(e) {}
          }`;

if (code.match(targetWatcher)) {
    code = code.replace(targetWatcher, replacementWatcher);
    fs.writeFileSync('playlist-ui.js', code, 'utf8');
    console.log("Patched station watcher to repair DOM!");
} else {
    console.log("Could not find target watcher block");
}
