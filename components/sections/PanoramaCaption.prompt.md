A full-width photograph with a short caption bottom-left and no button — the pause between dense sections (deck slide 5).

```jsx
<PanoramaCaption
  src="/assets/photos/valley.jpg" alt="The Chennamangallur valley from the hilltop"
  title="Overlooking the Chennamangallur valley"
/>
```

**Use** once or twice on a long page, between sections of text. It carries no action and no paragraph — if it needs a sentence of explanation, use `SplitSection` instead.

**Content.** A place or a moment, in a few words. Only frames with no identifiable guests.

**Responsive.** The frame keeps its ratio, but a caption that wraps taller than the frame (narrow tablet, large guest text) grows the frame instead of being clipped; the caption carries its own scrim on top of the frame's. Desktop and tablet (≥760px): 21:9, full width, the caption inside a bottom scrim and aligned to the page container; the title is statement size from 1000px, title size below. Phone (<760px): the frame switches to 4:5 so it keeps its height instead of becoming a sliver — pass `mobilePosition` to choose which part of the panorama survives the crop.

**Variation — `video`.** `video={{ sources, poster, title }}` — a 10–15 second muted loop under the same scrim, with a pause button; no autoplay for reduced motion. A background loop with no title or description stays out of the video sitemap (skill-video.md).
