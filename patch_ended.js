const fs = require('fs');
let content = fs.readFileSync('assets/index-Cg1B1NDe.js', 'utf8');

const target = /case Ce\.ENDED:\s*\(y\(!0\),\s*a\.current\s*\?\s*a\.current\(\)\s*:\s*\(De = l\.current\) == null \|\| De\.call\(l\)\);\s*break;/;
const replacement = `case Ce.ENDED:
  if (window.customQueue && window.customQueue.length > 0) {
    const nextTrack = window.customQueue.shift();
    window.customActiveTrack = nextTrack;
    setTimeout(() => { fe.target.loadVideoById(nextTrack.id); }, 50);
    // Dispatch an event to update queue UI if needed
    window.dispatchEvent(new CustomEvent('customQueueChanged'));
    break;
  }
  (y(!0), a.current ? a.current() : (De = l.current) == null || De.call(l));
  break;`;

if (target.test(content)) {
    // Minify replacement string a bit to avoid weird line break issues
    const minReplacement = replacement.replace(/\n/g, '').replace(/\s{2,}/g, ' ');
    content = content.replace(target, minReplacement);
    fs.writeFileSync('assets/index-Cg1B1NDe.js', content, 'utf8');
    console.log("Successfully patched ENDED logic!");
} else {
    console.log("Target Ce.ENDED not found.");
}
