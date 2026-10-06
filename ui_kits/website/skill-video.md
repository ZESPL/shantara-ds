# Video

Back to the [website skill](SKILL.md).

Video files must be uploaded to Cloudflare R2 and served via Cloudflare CDN. Never commit video files to the repository. Every video must also be included in the site’s video sitemap.

This file is the video standard for the design system and for shantara.life. Component docs, page implementations and reviews follow it. Example URLs below are absolute R2/CDN addresses. Replace `<r2-cdn-host>` with the live Cloudflare CDN hostname. Never use a local or relative path.

## Core rules

1. Never commit video files (`.mp4`, `.webm`, `.mov`, and any other video or large media asset) to any repository.
2. All videos must be hosted exclusively on **Cloudflare R2 + Cloudflare CDN**.
3. Use native HTML5 `<video>` only. No third-party players, iframes, or embeds. YouTube, Vimeo, Cloudflare Stream, Mux and similar services are forbidden.
4. Every public video must be fully optimized for both traditional search engines and AI systems.

A footer or social-profile link to Shantara’s own YouTube channel is not a video embed. It does not satisfy this standard and it does not replace a native `<video>`.

## Hosting

- Upload compressed videos to a Cloudflare R2 bucket.
- Serve them through Cloudflare CDN (custom domain preferred).
- Poster images and captions/transcripts must also live on R2/CDN.
- Never reference local or relative video paths in components or pages.

The transcript string is also stored on the content record so it is present in the first HTML response. A caption file (WebVTT) is a separate R2/CDN URL. Poster files are R2/CDN URLs, not photographs in `src/assets/images/` ([skill-images.md](skill-images.md) covers every other image).

## Component requirements

### Native video element

- Always use the native `<video>` element.
- Provide both WebM and MP4 sources whenever possible.
- Required attributes by default:
  - `preload="metadata"`
  - `playsinline`
  - `controls` (can be controlled via props)
- Never autoplay unless the video is muted and looping (background use case only).
- Always supply a high-quality poster image.

Hero video, when used, stays short (10 to 15 seconds), muted, looped and compressed, with the poster loading first. Art direction: [skill-premium.md](skill-premium.md). Hosting, schema and the sitemap still follow this file.

### Required props / data

Every Video component or page implementation must accept and use:

- `src` or `sources` (R2/CDN URLs only)
- `poster` (R2/CDN URL)
- `title`
- `description`
- `uploadDate` (ISO 8601)
- `duration` (ISO 8601, for example `"PT3M45S"`)
- Optional but strongly recommended: `transcript`, `captions`, `chapters`, `creator`

Keystatic stores these as URL and text fields on the English master. Translated files do not carry a second video. Field placement: [skill-content.md](skill-content.md).

## SEO and structured data

### VideoObject schema

Automatically output complete JSON-LD `VideoObject` with at least:

- `name`, `description`, `thumbnailUrl`, `uploadDate`, `duration`, `contentUrl`
- Include `transcript` when available
- Include `creator` / `author` (Person or Organization) when available
- Support optional `Clip` entries for chapters/key moments

On shantara.life this node is added by the single JSON-LD generator (`buildSchemaGraph`), inside the page’s one `@graph` (DATA-02, SCHEMA-01, SCHEMA-02). Page components and Markdoc do not write a second `application/ld+json` script. The fields and the shape below are mandatory; only the emission point changes. The node is in the prerendered HTML.

### Video sitemap

Every video that appears on a public page must be added to the site’s video sitemap with:

- `thumbnail_loc`, `title`, `description`, `content_loc`, `publication_date`, `duration` (in seconds)

`duration` in the sitemap is seconds (`PT3M45S` → `225`). `publication_date` is the `uploadDate`. `thumbnail_loc` is the poster. `content_loc` is the MP4 `contentUrl`.

### Social markup

Automatically output:

- Open Graph video tags (`og:type=video.other`, `og:video`, `og:image`, and the rest of the set below)
- Twitter player card tags when appropriate

These tags are emitted by the existing metadata generator, in `<head>`, in the first HTML response. They are not `<meta>` elements inside the figure.

When the video is the subject of the page, `og:type` is `video.other`. When the page already has a type from [skill-og-images.md](skill-og-images.md) (an article, a programme, the default page), keep that `og:type` and still emit `og:video`, `og:video:secure_url` and `og:video:type`. `og:image` stays the generated share image. The poster remains `thumbnailUrl`.

Twitter stays `summary_large_image` (SOCIAL-03) on ordinary pages. When the video is the subject, also emit `twitter:player:stream` (the MP4) and `twitter:player:stream:content_type` (`video/mp4`). Do not add an iframe player URL to satisfy a Twitter player card.

## Performance

- Compress videos before uploading to R2:
  - 1080p → target 2–4 MB per minute
  - 720p → target 1–2.5 MB per minute
  - Always use `-movflags +faststart` for MP4
- Lazy-load all below-the-fold videos.
- Treat the poster image as the LCP element when the video is above the fold. Give that poster explicit width and height and `fetchpriority="high"`. Do not lazy-load it.
- Prefer dual sources (WebM + MP4).

## AI visibility

- Provide a full, accurate transcript whenever possible. This is critical for AI Overviews, Perplexity, ChatGPT and similar systems.
- Keep all important video metadata in the initial HTML. Do not rely on client-side JavaScript to inject schema or core information.
- Ensure the surrounding page has meaningful text content that gives context to the video.
- Use clear, descriptive titles and descriptions.

## How a site collects sitemap metadata

The build reads every published page’s video fields and writes one video entry per public video. Drafts and `noindex` pages contribute nothing.

| Sitemap field | Source |
| --- | --- |
| `thumbnail_loc` | `poster` |
| `title` | `title` |
| `description` | `description` |
| `content_loc` | MP4 `src` (or the MP4 item in `sources`) |
| `publication_date` | `uploadDate` |
| `duration` | `duration` converted from ISO 8601 to seconds |

`@astrojs/sitemap` remains the page sitemap (CRAWL-06). Extend its `serialize` hook, or emit a video sitemap next to it and list that file from `robots.txt`. Either way, each public video appears once, on the canonical URL of the page that shows it. A background loop that is not a distinct public video (no title, no description) is still hosted on R2; it is omitted from the video sitemap.

## Enforcement

- Refuse any code that imports or references local video files.
- Refuse any suggestion to use YouTube, Vimeo, Cloudflare Stream, or other embedding services.
- Always generate the native `<video>` plus full VideoObject schema plus social meta tags, emitted as described above.
- Always remind developers that the video must also be added to the video sitemap.

## Default implementation pattern

The `<video>` markup lives in the component. On shantara.life, move the JSON-LD object into the schema generator and the `<meta>` tags into the metadata generator. Keep every field.

```astro
---
interface Props {
  src: string;
  sources?: { src: string; type: string }[];
  poster: string;
  title: string;
  description: string;
  uploadDate: string;
  duration: string;
  transcript?: string;
  creator?: { name: string; url?: string };
  captions?: string;
  chapters?: { name: string; startOffset: number; endOffset?: number }[];
  class?: string;
}

const { src, sources, poster, title, description, uploadDate, duration, transcript, captions, creator, chapters, class: className } = Astro.props;
---

<figure class={className}>
  <video
    controls
    preload="metadata"
    playsinline
    poster={poster}
    class="w-full rounded-lg"
  >
    {sources
      ? sources.map((s) => <source src={s.src} type={s.type} />)
      : <source src={src} type="video/mp4" />}
    {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
  </video>
  {transcript && <figcaption class="sr-only">{transcript}</figcaption>}
</figure>
```

`captions` is the optional WebVTT URL.

VideoObject shape (schema generator):

```js
{
  "@type": "VideoObject",
  name: title,
  description,
  thumbnailUrl: poster,
  uploadDate,
  duration,
  contentUrl: src,
  ...(transcript && { transcript }),
  ...(creator && { creator: { "@type": "Person", name: creator.name, url: creator.url } }),
  ...(chapters && {
    hasPart: chapters.map((c) => ({
      "@type": "Clip",
      name: c.name,
      startOffset: c.startOffset,
      endOffset: c.endOffset,
      url: `${src}#t=${c.startOffset}`
    }))
  })
}
```

Open Graph (metadata generator, in `<head>`):

```html
<meta property="og:video" content="{src}" />
<meta property="og:video:secure_url" content="{src}" />
<meta property="og:video:type" content="video/mp4" />
```

Add `og:type` `video.other` only when the video is the page subject. `og:title`, `og:description` and `og:image` already come from the metadata generator.

## Example

```astro
<Video
  src="https://<r2-cdn-host>/videos/a-day-at-shantara.mp4"
  sources={[
    { src: "https://<r2-cdn-host>/videos/a-day-at-shantara.webm", type: "video/webm" },
    { src: "https://<r2-cdn-host>/videos/a-day-at-shantara.mp4", type: "video/mp4" }
  ]}
  poster="https://<r2-cdn-host>/videos/a-day-at-shantara-poster.jpg"
  title="A day at Shantara"
  description="How a stay moves from consultation to the day’s therapies, meals and rest."
  uploadDate="2026-10-06T00:00:00+05:30"
  duration="PT3M45S"
  captions="https://<r2-cdn-host>/videos/a-day-at-shantara.vtt"
  transcript="Full transcript text, also stored on the content record."
/>
```

That page’s video sitemap entry uses thumbnail `…-poster.jpg`, the title and description above, content location `…mp4`, publication date `2026-10-06T00:00:00+05:30`, and duration `225`.
