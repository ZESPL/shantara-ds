---
name: shantara-video
description: >
  Shantara video for the design system and the shantara.life website. Use
  whenever adding, changing, reviewing or embedding video, a video player,
  a poster, captions, a transcript, VideoObject schema, a video sitemap,
  og:video, or when someone mentions YouTube, Vimeo, Cloudflare Stream, Mux,
  R2, mp4, webm, or autoplay.
---

# Shantara video

Canonical standard: **`ui_kits/website/skill-video.md`**. Read it before any change. This skill only lists the refusals and the required output; it does not repeat the rules.

Video files must be uploaded to Cloudflare R2 and served via Cloudflare CDN. Never commit video files to the repository. Every video must also be included in the site’s video sitemap.

1. Refuse local or relative video paths, video imports, and any commit of `.mp4`, `.webm`, `.mov` or other video files. Host the file, the poster and the caption/transcript file on Cloudflare R2, served through Cloudflare CDN.
2. Refuse YouTube, Vimeo, Cloudflare Stream, Mux, iframes and any third-party player. A channel link in the footer is not an embed and does not count as the video.
3. Render a native `<video>` with `preload="metadata"`, `playsinline`, `controls` (unless the prop turns them off), a poster, and WebM plus MP4 sources when both exist. Autoplay only when the video is muted and looping.
4. Require `src` or `sources`, `poster`, `title`, `description`, `uploadDate` (ISO 8601) and `duration` (ISO 8601). Prefer `transcript`, `captions`, `chapters` and `creator`.
5. Emit a complete `VideoObject` (name, description, thumbnailUrl, uploadDate, duration, contentUrl, plus transcript, creator and Clip chapters when present) from the single JSON-LD generator, in the prerendered HTML. Do not add a second script in the component.
6. Emit Open Graph video tags from the metadata generator in `<head>`. Use `og:type=video.other` only when the video is the page subject. Twitter keeps `summary_large_image`; add `twitter:player:stream` when the video is the subject. Do not build an iframe player.
7. Add every public video to the video sitemap: thumbnail_loc, title, description, content_loc, publication_date, duration in seconds.
8. Put the transcript and the surrounding explanation in the first HTML. Lazy-load below-the-fold video. When the video is above the fold, the poster is the LCP image.

Rates rule: `.cursor/rules/no-scattered-pricing.mdc`. Guest privacy still applies to every frame.
