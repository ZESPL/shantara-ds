A native video: a player with controls and captions, or a short muted background loop with a pause button.

```jsx
<Video
  sources={[{ src: "https://<r2-cdn-host>/videos/a-day.webm", type: "video/webm" }, { src: "https://<r2-cdn-host>/videos/a-day.mp4", type: "video/mp4" }]}
  poster="https://<r2-cdn-host>/videos/a-day-poster.jpg"
  title="A day at Shantara" captions="https://<r2-cdn-host>/videos/a-day.vtt" />

<Video mode="loop" ratio="4:5" poster="…" sources={[…]} title="The water wall" />
```

**Use** inside VideoFeature, SplitSection `video`, HeroSplit `video`, PanoramaCaption `video` and ArticleHeader `video`. Hosting, schema and the sitemap follow `ui_kits/website/skill-video.md`: R2 + CDN only, no committed files, no third-party players.

**Content.** `player` (default): never autoplays; preload none; `captions` required when there is speech; `transcript` is kept visually hidden for the page. `loop`: 10–15 seconds, muted, autoplays only without a reduced-motion preference, always with a pause / play button.

**Responsive.** Keeps `ratio` (and `mobileRatio` under 760px) like Media; `fill` covers its parent. The pause button is 44px.
