A film with its context: a statement and a native video player, full width or beside the text.

```jsx
<Section>
  <VideoFeature title="A day at Shantara" video={{
    sources: [{ src: "https://<r2-cdn-host>/videos/a-day.webm", type: "video/webm" }, { src: "https://<r2-cdn-host>/videos/a-day.mp4", type: "video/mp4" }],
    poster: "https://<r2-cdn-host>/videos/a-day-poster.jpg",
    title: "A day at Shantara", captions: "https://<r2-cdn-host>/videos/a-day.vtt",
  }} />
</Section>
<VideoFeature layout="split" ground="stone" title="Inside the yoga hall" video={…} />
```

**Use** on Home, Experience and Therapies. Follow `ui_kits/website/skill-video.md`: R2 + CDN only, never YouTube, Vimeo, Stream or Mux; never commit a video file; add every public video to the video sitemap.

**Content.** A player never autoplays. Video with speech needs `captions` (WebVTT) and a `transcript`. The poster is a real frame; specimens here show only the poster because the design system has no R2 host.

**Responsive.** `full`: the frame across the container at 16:9, 4:5 on phones. `split`: a SplitSection — frame 4:5 beside the statement from 1000px, 16:9 above it on phones.
