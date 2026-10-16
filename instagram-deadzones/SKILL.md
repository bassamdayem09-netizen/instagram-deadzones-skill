---
name: instagram-deadzones
description: Design Instagram Reels, Stories, covers and carousels so no text, logo or CTA lands under Instagram's UI (dead zones). Use whenever you build or review a 9:16 reel/story, a profile-grid cover, or a 3:4 / 4:5 post with Claude, HTML, Canva or video tools.
---

# Instagram dead zones

Dead zones are the parts of a post that Instagram's own interface covers or crops: the top bar, the caption and buttons at the bottom, the action column on the right, and the profile-grid crop. Anything important placed there gets hidden or cut off.

Numbers below are the widely used working values. Instagram changes its UI from time to time, so treat them as safe margins, not exact limits, and test on a real phone before publishing.

## Reels and Stories: 1080 x 1920 (9:16)

| Zone | Keep clear | Why |
|---|---|---|
| Top | first 250 px | profile/camera icons, "Reels" label, story progress bar |
| Bottom | last 420 px (nothing below y = 1500) | username, caption, audio bar, "Send message" bar on Stories |
| Right | last 120 px | like, comment, share and more buttons (worst between y = 900 and y = 1600) |
| Left/right edges | 70 px minimum margin | rounded corners and phone bezels |

Safe area for text and logos: x 70 to 960, y 250 to 1500.

Background and decoration may run edge to edge. Only text, faces, logos, product shots and calls to action need to stay inside the safe area.

## Profile grid and cover
The grid shows a center crop at 3:4. For a 1080 x 1920 cover, keep the title and subject inside the center 1080 x 1440 band (y 240 to 1680). Put the cover title in the middle third.

## Carousels and feed posts
- 3:4 (1080 x 1440) or 4:5 (1080 x 1350): keep a 70 px margin on all sides. Keep text 100 px from the right edge on slide 1, where the swipe cue sits.
- 1:1 posts get center-cropped in some views. Keep the subject in the middle 80 percent.

## Rules to follow when designing
1. Set the canvas first (1080 x 1920 for reels), then draw the safe-area rectangle and build only inside it.
2. Hook text: y 300 to 700. CTA (comment keyword, "follow", handle): y 1100 to 1450, never lower.
3. Big words first. Minimum 60 px for headlines and 36 px for supporting lines on a 1080-wide canvas. Thick, bold weights read best.
4. Subtitles and captions go in the lower-middle of the safe area (around y 1250 to 1450), not at the very bottom.
5. Screen recordings and mockups: keep the important UI in the middle band and let the edges be decoration.
6. Never put a button-looking element (like, send, follow) where Instagram's real buttons sit.
7. Check the first frame separately: it becomes the preview in many places.

## Checking your work
- Overlay: paste `scripts/overlay.html` styles into your page to show the red dead zones while you design. Remove before export.
- Automated audit (HTML or Hyperframes-style compositions): `node scripts/audit.mjs page.html 1080 1920`. It lists every visible text element that touches a dead zone, and samples a timeline every 0.5 s if `window.__timelines.main` exists. Needs `npm i playwright`.
- Final check: export a frame at the busiest moments (hook, steps, CTA), put the overlay on top, and look at it. Then watch the real post on your phone once as a draft.

## If something lands in a dead zone
Move it into the safe area. If it can't move, shrink the surrounding content, not the text. If it is only decoration, it may stay.
