const fs = require('fs');
let content = fs.readFileSync('assets/index-Cg1B1NDe.js', 'utf8');

// The broken string
const broken = "case Ce.ENDED: if (window.customQueue && window.customQueue.length > 0) { const nextTrack = window.customQueue.shift(); window.customActiveTrack = nextTrack; setTimeout(() => { fe.target.loadVideoById(nextTrack.id); }, 50); // Dispatch an event to update queue UI if needed window.dispatchEvent(new CustomEvent('customQueueChanged')); break; } (y(!0), a.current ? a.current() : (De = l.current) == null || De.call(l)); break;";

// The fixed string (removed the // comment)
const fixed = "case Ce.ENDED: if (window.customQueue && window.customQueue.length > 0) { const nextTrack = window.customQueue.shift(); window.customActiveTrack = nextTrack; setTimeout(() => { fe.target.loadVideoById(nextTrack.id); }, 50); window.dispatchEvent(new CustomEvent('customQueueChanged')); break; } (y(!0), a.current ? a.current() : (De = l.current) == null || De.call(l)); break;";

if (content.includes(broken)) {
    content = content.replace(broken, fixed);
    fs.writeFileSync('assets/index-Cg1B1NDe.js', content, 'utf8');
    console.log("Successfully fixed syntax error!");
} else {
    console.log("Broken string not found.");
}
