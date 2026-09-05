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

### Shared Listening Rooms & Social Layer

- Users can start a room or join one with a display name.
- The app can generate an invite message and copy it to the clipboard.
- Room members hear the same song in perfect sync.
- One listener can take control with `Take aux` / `You're DJ`.
- DJ mode locks playback control for everyone else.
- Live online count in the top bar and active user roster in rooms.
- Screen-floating emoji reactions mapped to shortcuts `1-6`.

### 💬 Live Room Chat (Recently Added!)
- **Floating Chat UI**: A responsive, slide-out chat interface seamlessly integrated into shared rooms.
- **Desktop Notifications**: Browser push notifications for new messages, users joining/leaving, and message reactions, ensuring you never miss a beat even if the tab is in the background.
- **WhatsApp-Style Reactions**: A Quick React bar (👍, ❤️, 😂, 😮, 😢, 🙏) to instantly react to individual chat messages.
- **Inline Editing & Deletion**: Edit your sent messages seamlessly inline, or delete them to remove them for everyone.
- **Emoji Picker Integration**: A full-featured emoji picker built right into the chat input form.
- **Auto-Cleanup**: Chat history automatically cleans itself up when the room is empty to maintain a pristine database.

### Keyboard And Accessibility Features

Built-in keyboard shortcuts are exposed in a dedicated help modal:

- `Space` - play / pause
- `Left / Right` - previous / next track
- `Up / Down` - volume
- `M` - mute
- `T` - next station
- `L` - love current song
- `X` - ban current song
- `1-6` - screen react in a room
- `?` - open keyboard shortcut list

## Visual / UX Highlights

- Strong thematic branding around a rainy, atmospheric vibe.
- Animated background video (served via raw GitHub URL) with a fallback poster.
- Vinyl-inspired rotating artwork disc.
- Responsive layout with a mobile-friendly bottom sheet player.
- Idle mode that hides UI chrome after inactivity for a more ambient experience.

## Technology

- React 18 production build
- Static single-page frontend (deployed via Firebase Hosting to `viberoom.web.app`)
- YouTube iframe/player integration
- Supabase & Firebase Realtime Database for presence, rooms, and live chat sync
- Vanilla JS ESM module injections for modular feature extensions (like `chat-ui.js`)

## Configuration

The application requires a YouTube Data API v3 key to fetch playlist tracks.
To configure this:
1. Go to Firebase Console → Realtime Database.
2. Create a node named `youtube_api_keys`.
3. Add your real YouTube Data API v3 key as a string (or an array/object if your schema requires it). The UI will gracefully notify you if this is missing.

---

## 🚀 Future Feature Ideas

Looking to expand Vibe Room further? Here are some suggested features for the roadmap:

1. **Live Typing Indicators**: Show *"Ashish is typing..."* in the chat when a room member is drafting a message.
2. **Spotify/Apple Music Integration**: Allow users to link premium music accounts for high-fidelity audio playback instead of relying on YouTube iframes.
3. **Push-to-Talk (Voice Chat)**: A simple WebRTC-powered *"Hold to Speak"* button so room members can talk over the music like a real radio host.
4. **Custom Room Themes**: Allow the current DJ to change the background video (e.g., from rainy car drive to lofi bedroom or cyberpunk city) for everyone in the room.
5. **Persistent Clubs**: Add the option to save a room permanently with a custom URL (e.g., `viberoom.web.app/chill`) where chat history is preserved.
6. **Chat Mentions & Replies**: Allow users to `@mention` specific people or swipe to reply directly to a specific message in the chat.
