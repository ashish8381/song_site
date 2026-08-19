# Baarish Vibe

Baarish Vibe is a mood-driven web radio experience built around 90s and 2000s Bollywood music. The site presents itself like a late-night in-auto radio: listeners can tune between stations, start playback instantly, and optionally create shared listening rooms where everyone hears the same song at the same timestamp.

This README is based on the built project available in `/Users/ashish/Downloads/Song Site/`. The folder appears to contain the production build, not the original source code, so the documentation below reflects observed behavior from the shipped HTML, CSS, and JavaScript bundle.

## What The Site Does

- Plays Bollywood music in a radio-style interface rather than a traditional playlist UI.
- Uses multiple themed stations that map to curated YouTube playlists.
- Shows the currently playing song title, artist, progress, and artwork derived from YouTube thumbnails.
- Lets listeners play, pause, skip forward, go to the previous track, seek within the current track, mute, and adjust volume.
- Opens the current song directly on YouTube from the now-playing title.
- Uses an immersive animated background, glassmorphism player panel, subtle motion, and an idle mode that hides chrome after inactivity.
- Displays live listener presence when the backend is available.

## Current Station Setup

The build currently ships with these stations:

- `98.3` - `Baati-Chokha`
- `101.7` - `Bangers`
- `108.7` - `Patiala`

Listeners can change stations through the tuner dial. The UI also hints that a station change applies to the next track rather than interrupting the current song immediately.

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
- Emoji reactions with four mapped shortcuts.
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
- `1-4` - react in a room
- `?` - open keyboard shortcut list

Additional accessibility-oriented behavior observed in the build:

- Focus-visible states for interactive controls
- `aria-label` usage on buttons and controls
- Reduced-motion fallbacks
- Screen-reader-only live announcements for some reactions/status updates

## Visual / UX Highlights

- Strong thematic branding around a nighttime auto-rickshaw ride.
- Animated background with Ken Burns motion, grain, warmth, and vignette layers.
- Vinyl-inspired rotating artwork disc.
- Responsive layout with a mobile-friendly bottom sheet player.
- Idle mode that hides UI chrome after inactivity for a more ambient experience.

## Technology Observed In This Build

- React 18 production build
- Static single-page frontend
- YouTube iframe/player integration
- YouTube thumbnail usage for art
- Supabase-backed realtime/presence features for online count and rooms
- Browser `localStorage` persistence for user preferences

The saved HTML also references a hosted build from `baarish-vibe-26925.web.app`, which suggests static hosting was likely used for deployment at least once.

## Project Structure In The Provided Folder

```text
Song Site/
├── index.html
└── assets/
    ├── bg.jpg
    ├── index-BIRrILsA.css
    ├── index-Cg1B1NDe.js
    └── invoice-ORD-20260817-0007.pdf
```

Notes:

- This is a production output folder, not a source repository.
- No `package.json`, source files, environment file, tests, or build scripts were included.
- The presence of `invoice-ORD-20260817-0007.pdf` inside public assets looks accidental and should probably not ship with the app.

## What The Site Offers To Users

- Passive listening with a distinctive visual identity
- Quick station surfing instead of manual song selection
- Local personalization through favourites and banished songs
- Shared “listen together” rooms
- Lightweight social interaction through live reactions
- Keyboard-friendly controls for repeat listeners
- Direct path from discovery to YouTube playback context

## Gaps / Work Still Needed

Because only the compiled build is available, the product is functional but not yet well-packaged as a maintainable project. The next work should focus on both engineering hygiene and product maturity.

### High-Priority Next Steps

- Recover or add the original source repository with:
  - `package.json`
  - source files
  - environment variable handling
  - README setup instructions
  - deployment instructions
- Document how stations/playlists are configured.
- Document how Supabase is set up for presence, rooms, and realtime sync.
- Add a favicon and app icons.
- Replace relative `og:image` / `twitter:image` paths with absolute deployed URLs.
- Remove unrelated files from shipped assets, especially the invoice PDF.

### Product Improvements

- Add recent history, queue preview, or station schedule visibility.
- Add explicit favourite list management rather than only counters/state.
- Add banished-song management UI beyond `Un-banish all`.
- Add reconnect messaging when Supabase or YouTube connectivity drops.
- Add room host moderation features if multi-user rooms will grow.
- Add a lightweight onboarding tooltip for first-time users.
- Consider a “resume last station and volume” flow if not already present in source.

### Engineering Improvements

- Add source maps for debugging in non-production environments only.
- Add linting, formatting, and test coverage.
- Add error monitoring.
- Add analytics only if product goals require it.
- Add CI/CD and a reproducible deployment process.

## Optimization Review

Yes, there are optimization opportunities.

### 1. Bundle And Asset Cleanup

- `assets/index-Cg1B1NDe.js` is about `399 KB` minified, which is reasonable for a feature-rich SPA but still worth trimming if possible.
- `assets/bg.jpg` is about `460 KB` at `2502x1268`; this background should be evaluated for further compression or modern formats like WebP/AVIF.
- `assets/invoice-ORD-20260817-0007.pdf` is about `858 KB` and appears unrelated to runtime. It should be removed from public assets.

### 2. Metadata / SEO Fixes

- Open Graph and Twitter images use relative paths. Social scrapers typically require absolute URLs.
- The HTML comments explicitly mention the missing favicon; that should be restored before shipping.
- If SEO matters, add stronger structured metadata and a canonical URL.

### 3. Runtime / UX Performance

- The page uses multiple full-screen visual effects: blur, grain animation, backdrop filters, gradients, and blended overlays. These are visually strong, but can be expensive on low-power mobile devices.
- Consider reducing blur intensity or layering on lower-end devices.
- Consider lazy-starting non-essential visual effects after first interaction.
- The idle mode is good for focus, but performance on mobile Safari should be verified carefully.

### 4. Third-Party Dependency Risk

- Playback depends on YouTube iframe/API availability. If blocked by network, browser policy, or region, the experience degrades.
- Presence and room sync depend on Supabase availability and correct realtime configuration.
- Add observable fallback states and operational monitoring around both dependencies.

### 5. Shipping / Maintainability

- Since only build artifacts are present, the project is currently hard to maintain, debug, or extend safely.
- The biggest optimization is operational: restore the source project and deployment pipeline.

## Suggested Priority Order

1. Recover the source repo and add proper project documentation.
2. Remove accidental public assets and fix metadata/favicons.
3. Audit performance on mobile, especially blur and animation layers.
4. Document backend setup for Supabase rooms/presence.
5. Add tests, monitoring, and deployment automation.

## Final Assessment

Baarish Vibe already delivers a memorable and differentiated listening experience. It is more than a basic music player: it combines internet radio styling, social listening rooms, lightweight realtime presence, and a polished visual atmosphere.

The main shortcomings are not product concept or design quality. They are maintainability, deployment hygiene, metadata completeness, and a few performance/asset issues. With the original source restored and a small round of cleanup, this could be documented and maintained like a proper production-ready project.
