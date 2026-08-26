# Vibe Room

Vibe Room is a mood-driven web radio experience built around 90s and 2000s Bollywood music. The site presents itself like a late-night rainy drive: listeners can tune between stations, start playback instantly, and optionally create shared listening rooms where everyone hears the same song at the same timestamp.

## Main Features

### Playback Experience

- Radio-style playback with a prominent central play button.
- Previous and next track controls.
- Seekable progress bar with current time and total duration.
- Volume slider and mute toggle.
- Loading and buffering states.
- Graceful error messages for cases like:
  - no station configured
  - nothing playable in the feed
  - YouTube not reachable or blocked
- Uninterrupted background playback capability (use Desktop Mode on mobile browsers).

### Music Curation Controls

- `Love this song` saves a track to favourites.
- `Never play this again` banishes a track from future playback.
- Loved and banished counts are surfaced in the keyboard help sheet.
- Banished tracks can be cleared with `Un-banish all`.
- Saved preferences are stored in the browser, so they persist locally per device/browser.

### Shared Listening Rooms

- Users can start a room or join one.
- Joining includes a display name.
- The app can generate an invite message and copy it to the clipboard.
- Room members hear the same song in sync.
- A people counter shows who is in the room.
- A roster panel can show member names.
- One listener can take control with `Take aux` / `You're DJ`.
- DJ mode can lock playback control for everyone else.
- Reactions are available in rooms and float visibly on screen.

### Presence And Social Layer

- Live online count in the top bar.
- Shared room presence and roster.
- Emoji reactions with six mapped shortcuts.
- Clipboard-based invite sharing.

### Keyboard And Accessibility Features

Built-in keyboard shortcuts are exposed in a dedicated help modal:

- `Space` - play / pause
- `Left / Right` - previous / next track
- `Up / Down` - volume
- `M` - mute
- `T` - next station
- `L` - love current song
- `X` - ban current song
- `1-6` - react in a room
- `?` - open keyboard shortcut list

## Visual / UX Highlights

- Strong thematic branding around a rainy, atmospheric vibe.
- Animated background video (`bg2.mp4`) with a fallback poster (`poster.png`).
- Vinyl-inspired rotating artwork disc.
- Responsive layout with a mobile-friendly bottom sheet player.
- Idle mode that hides UI chrome after inactivity for a more ambient experience.

## Technology

- React 18 production build
- Static single-page frontend (deployed via Firebase Hosting to `viberoom.web.app`)
- YouTube iframe/player integration
- Supabase-backed realtime/presence features for online count and rooms
- Browser `localStorage` persistence for user preferences
- Firebase Realtime Database for dynamic YouTube API key management

## Configuration

The application requires a YouTube Data API v3 key to fetch playlist tracks.
To configure this:
1. Go to Firebase Console → Realtime Database.
2. Create a node named `youtube_api_keys`.
3. Add your real YouTube Data API v3 key as a string (or an array/object if your schema requires it). The UI will gracefully notify you if this is missing.

## Project Structure

```text
.
├── index.html
├── firebase.json
└── assets/
    ├── bg.jpg
    ├── bg2.mp4
    ├── bg3.mp4
    ├── poster.png
    ├── index-BIRrILsA.css
    └── index-Cg1B1NDe.js
```

## Final Assessment

Vibe Room delivers a memorable and differentiated listening experience. It combines internet radio styling, social listening rooms, lightweight realtime presence, and a polished visual atmosphere.
