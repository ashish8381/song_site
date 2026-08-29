const fs = require('fs');
let content = fs.readFileSync('assets/index-Cg1B1NDe.js', 'utf8');

const target = "case Ce.ENDED: if (window.customQueue && window.customQueue.length > 0) { const nextTrack = window.customQueue.shift(); window.customActiveTrack = nextTrack; setTimeout(() => { fe.target.loadVideoById(nextTrack.id); }, 50); window.dispatchEvent(new CustomEvent('customQueueChanged')); break; } (y(!0), a.current ? a.current() : (De = l.current) == null || De.call(l)); break;";

const replacement = "case Ce.ENDED: if (window.customQueue && window.customQueue.length > 0) { const nextTrack = window.customQueue.shift(); window.customActiveTrack = nextTrack; setTimeout(() => { fe.target.loadVideoById(nextTrack.id); }, 50); window.dispatchEvent(new CustomEvent('customQueueChanged')); break; } window.customActiveTrack = null; window.dispatchEvent(new CustomEvent('customQueueEnded')); (y(!0), a.current ? a.current() : (De = l.current) == null || De.call(l)); break;";

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('assets/index-Cg1B1NDe.js', content, 'utf8');
    console.log("Patched Ce.ENDED to clear customActiveTrack!");
} else {
    console.log("Could not find Ce.ENDED block");
}
