const fs = require('fs');
let code = fs.readFileSync('playlist-ui.js', 'utf8');

// 1. Add markKeyExhausted method
const exhaustionLogic = `
  getActiveApiKey() {
    if (!this.apiKeys) return null;
    return this.apiKeys.primary || this.apiKeys.fallback || this.apiKeys.fallback2;
  }

  markKeyExhausted(exhaustedKey) {
    if (!this.apiKeys) return;
    if (this.apiKeys.primary === exhaustedKey) {
      console.warn("[YouTube API] Primary key exhausted. Switching to fallback.");
      this.apiKeys.primary = null;
    } else if (this.apiKeys.fallback === exhaustedKey) {
      console.warn("[YouTube API] Fallback key exhausted. Switching to fallback2.");
      this.apiKeys.fallback = null;
    } else if (this.apiKeys.fallback2 === exhaustedKey) {
      console.warn("[YouTube API] ALL keys exhausted!");
      this.apiKeys.fallback2 = null;
    }
  }

  async fetchYoutubeApi(urlBuilder) {
    while (true) {
      const key = this.getActiveApiKey();
      if (!key || key.includes("REPLACE_ME")) return { error: { message: "No valid API keys available." } };
      
      const res = await fetch(urlBuilder(key));
      const data = await res.json();
      
      if (data.error && data.error.code === 429) {
        this.markKeyExhausted(key);
        continue;
      }
      return data;
    }
  }
`;

code = code.replace(/  getActiveApiKey\(\) {[\s\S]*?}/, exhaustionLogic.trim());

// 2. Patch setupGlobalSearch
const searchReplacement = `
        try {
          const data = await this.fetchYoutubeApi(key => \`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=\${encodeURIComponent(query)}&key=\${key}\`);
          
          if (data.error) {
            resultsContainer.innerHTML = \`<div class="search-msg" style="color:#ff5555;">\${data.error.message || "Quota exhausted"}</div>\`;
            return;
          }
          
          if (!data.items || data.items.length === 0) {
`;

code = code.replace(/        try \{\s*const res = await fetch\(\`https:\/\/www\.googleapis\.com\/youtube\/v3\/search\?part=snippet&type=video&maxResults=5&q=\\?\$\{encodeURIComponent\(query\)\}&key=\\?\$\{key\}\`\);\s*const data = await res\.json\(\);\s*if \(!data\.items \|\| data\.items\.length === 0\) \{/, searchReplacement.trim());


// 3. Patch fetchVideoDetails
const videoDetailsReplacement = `
    let results = [];
    for (let i = 0; i < videoIds.length; i += 50) {
      const chunk = videoIds.slice(i, i + 50).join(",");
      try {
        const data = await this.fetchYoutubeApi(key => \`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=\${chunk}&key=\${key}\`);
        if (data.error) { console.error("YT API error", data.error); break; }
`;

code = code.replace(/    let results = \[\];\s*for \(let i = 0; i < videoIds\.length; i \+= 50\) \{\s*const chunk = videoIds\.slice\(i, i \+ 50\)\.join\(","\);\s*try \{\s*const res = await fetch\(\`https:\/\/www\.googleapis\.com\/youtube\/v3\/videos\?part=snippet&id=\\?\$\{chunk\}&key=\\?\$\{key\}\`\);\s*const data = await res\.json\(\);\s*if \(data\.error\) \{ console\.error\("YT API error", data\.error\); break; \}/, videoDetailsReplacement.trim());


// 4. Patch fetchByPlaylistId
const fetchByPlaylistIdReplacement = `
    let results = [], pageToken = "";
    do {
      try {
        const data = await this.fetchYoutubeApi(key => {
            let url = \`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=\${playlistId}&key=\${key}\`;
            if (pageToken) url += \`&pageToken=\${pageToken}\`;
            return url;
        });
        if (data.error) { console.error("YT API error", data.error); break; }
`;

code = code.replace(/    let results = \[\], pageToken = "";\s*do \{\s*try \{\s*let url = \`https:\/\/www\.googleapis\.com\/youtube\/v3\/playlistItems\?part=snippet&maxResults=50&playlistId=\\?\$\{playlistId\}&key=\\?\$\{key\}\`;\s*if \(pageToken\) url \+= \`&pageToken=\\?\$\{pageToken\}\`;\s*const res = await fetch\(url\);\s*const data = await res\.json\(\);\s*if \(data\.error\) \{ console\.error\("YT API error", data\.error\); break; \}/, fetchByPlaylistIdReplacement.trim());

// We also need to remove the top level key check in those methods since fetchYoutubeApi does it
code = code.replace(/    const key = this\.getActiveApiKey\(\);\s*if \(!key \|\| key\.includes\("REPLACE_ME"\)\) return \[\];\s*let results = \[\];\s*for \(let i = 0; i < videoIds\.length; i \+= 50\)/, `    let results = [];\n    for (let i = 0; i < videoIds.length; i += 50)`);

code = code.replace(/    const key = this\.getActiveApiKey\(\);\s*if \(!key \|\| key\.includes\("REPLACE_ME"\)\) return \[\];\s*let results = \[\], pageToken = "";/, `    let results = [], pageToken = "";`);


fs.writeFileSync('playlist-ui.js', code, 'utf8');
console.log("Successfully patched key fallback logic!");
