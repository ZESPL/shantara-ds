# Images: storage, compression and delivery

Back to the [website skill](SKILL.md).

This file tells you where image files go in the **shantara.life** Astro repository, how to prepare them before they are committed, and how to render them. Use it whenever you add, upload, replace or render a photograph, poster, portrait, logo or share image on the production website.

It gathers rules that already exist elsewhere and adds the missing storage and compression rules. When this file and another file disagree, the checkable rule IDs in [search-visibility/images.md](search-visibility/images.md) and [search-visibility/social.md](search-visibility/social.md) win, and this file should be corrected.

| Rule already recorded | Where |
| --- | --- |
| Astro Image is the image pipeline | [skill-stack.md](skill-stack.md) |
| AVIF or WebP, `srcset`, width and height (IMG-01) | [search-visibility/images.md](search-visibility/images.md) |
| Hero is eager with `fetchpriority="high"`, everything else lazy (IMG-02, IMG-03) | [search-visibility/images.md](search-visibility/images.md) |
| Alt text, descriptive filenames, real photography, AI image metadata (IMG-04 to IMG-06) | [search-visibility/images.md](search-visibility/images.md) |
| Share images: templates, generation, overrides, 1200 × 630 JPEG, 300 KB or less (SOCIAL-01 to SOCIAL-04) | [skill-og-images.md](skill-og-images.md) |
| Ratio tokens, mobile crops, square corners | [`components/editorial/Media.prompt.md`](../../components/editorial/Media.prompt.md), [skill-premium.md](skill-premium.md) |
| No identifiable guests, no treatment in progress | Root [`SKILL.md`](../../SKILL.md) |

## 1. Where files go

**Rule:** photographs live in `src/assets/images/`, so Astro can resize and convert them. `public/` is only for files that must keep a fixed URL and must not be processed.

```
src/assets/images/
  site/             ← home, about, contact, section photos not tied to one entry
  conditions/       ← Keystatic writes one folder per entry: conditions/diabetes/…
  programmes/
  therapies/
  rooms/
  doctors/
  articles/
  doctor-answers/
  authors/
  testimonials/
public/
  favicon.svg, favicon.ico, apple-touch-icon.png
  og-default.jpg    ← the approved default share image (SOCIAL-04); a locale's og-default-{locale}.jpg
                      is added, and listed in PUBLIC_ALLOWED, only when that locale is enabled
  og/               ← manual share-image overrides only (skill-og-images.md §9)
  logo.png          ← the logo URL used in Organization JSON-LD
```

- **Never put a photograph in `public/`.** Files there are copied as they are: no resizing, no AVIF or WebP, no width and height.
- **Never link to a photograph in this design system** (`assets/photos/`) or any other remote host from production. Copy the file into the website repo and run it through the preparation steps in section 3.
- **Video files never go in the repo.** `video.url` is a YouTube or Vimeo link ([skill-content.md](skill-content.md)). The `video.poster` is an ordinary image and follows this file.
- **Images come only from the English entry.** Translated files carry text only ([skill-content.md](skill-content.md#languages)), so there is one image folder per entry, never one per language.

### Keystatic image fields

Point every Keystatic image field at `src/assets/images/<collection>/` and store the path from the project root. There is no Zod schema: pages read entries through the Keystatic reader ([skill-structure.md](skill-structure.md#reading-content)), and `lib/images.ts` turns each stored path into an Astro image.

```ts
// keystatic.config.ts — one shared field, reused by every collection
const featuredImage = (collection: string) =>
  fields.object({
    src: fields.image({
      label: 'Image',
      directory: `src/assets/images/${collection}`,
      publicPath: `/src/assets/images/${collection}/`,
      validation: { isRequired: true },
    }),
    alt: fields.text({ label: 'Alt text', validation: { isRequired: true } }),
  }, { label: 'Featured image' });
```

```ts
// src/lib/images.ts — every stored path must resolve, or the build stops
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png}', { eager: true });

export function image(path: string): ImageMetadata {
  const file = files[path];
  if (!file) throw new Error(`Missing image: ${path}`);
  return file.default;
}
```

- Pass the result of `image()` to `<Picture>` or `<Image>`. The build fails when a file is missing, and every image gets its width and height. Never pass the stored path string straight to an `<img>`.
- Markdoc body images in articles use the same `directory` and `publicPath` pattern, and the Markdoc renderer maps the `image` node to a component that calls `image()` and Astro's `<Picture>`. A plain `<img>` in Markdoc output skips optimisation.
- **Check the filename Keystatic writes on the first upload.** If it names the file after the field (for example `src.jpg`) rather than the uploaded name, the published file will not have a descriptive name, which is what IMG-05 asks for. Record the result in [Still open](#8-still-open).

## 2. File types

| Content | Format to commit | Notes |
| --- | --- | --- |
| Photographs, portraits, posters | JPEG | Astro produces AVIF and WebP from it. Do not commit WebP or AVIF masters. |
| Graphics that need transparency | PNG | Rare on this site. Never use PNG for a photograph. |
| Logo, rosette, icons | SVG | Not passed through Astro Image. Run through SVGO. The rosette's inline size counts towards the 2 MB HTML budget (REN-04). |
| Share images | JPEG | Generated at build (section 5). Only `og-default.jpg` and approved overrides in `public/og/` are committed. |

## 3. Preparing a file before commit

Every photograph is prepared once, before it enters the repo. Astro makes the smaller versions; the master only needs to be big enough for the largest one.

| Setting | Value | Why |
| --- | --- | --- |
| Long edge | **2560px maximum** | Covers a full-bleed hero on a 1280px-wide screen at 2× density. The design-system masters are 2880px, so resize them. |
| Doctor square close-ups | 1280 × 1280 | Already that size in `assets/photos/`. |
| Colour | sRGB | Other profiles shift colour in browsers. Convert, do not just re-tag. |
| JPEG quality | 82, progressive, 4:2:0 | Good enough to re-encode from without visible loss. |
| File size | **Target 700 KB or less, never more than 1 MB** | Keeps the repo and build fast. A larger file usually means the long edge or quality was not set. |
| Metadata | Strip camera, GPS and personal metadata | GPS reveals where staff and guests live or travel. Keep only what IMG-06 requires on AI-generated images. |
| Orientation | Apply EXIF rotation, then strip it | Otherwise the photo can appear sideways after stripping. |
| Filename | Descriptive, lowercase, hyphenated, no health claims | `hydrotherapy-room.jpg`, not `TRD0142.jpg` or `cure-diabetes-room.jpg` (IMG-05, MED-03). |

One command does all of it, with ImageMagick 7:

```bash
magick in.jpg -auto-orient -colorspace sRGB -resize '2560x2560>' \
  -strip -quality 82 -sampling-factor 4:2:0 -interlace JPEG out.jpg
```

`-strip` also removes the IPTC `DigitalSourceType` that IMG-06 requires on AI-generated images. For those images only, write it back afterwards:

```bash
exiftool -XMP-iptcExt:DigitalSourceType="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia" out.jpg
```

Editors uploading through Keystatic cannot run this. The build check in section 7 catches oversize uploads so a developer can fix them in the same pull request.

## 4. Rendering

Use one wrapper component in the website repo, `Media.astro`, that mirrors the design-system `Media` props (`ratio`, `mobileRatio`, `position`, `mobilePosition`, `priority`, `scrim`). Inside, it renders Astro's `<Picture>`. Pages never call `<Picture>` or `<Image>` directly, so formats, quality and widths are set in one place.

**Defaults inside `Media.astro`:**

- `formats={['avif', 'webp']}` with a JPEG fallback.
- `quality={70}`. Check it once on skin tones, foliage and the dusk frames. Raise it only if banding shows.
- Explicit `widths` and `sizes` from the table below. Do not let Astro generate its full default width list: each extra width is another AVIF and WebP file for every photograph, which slows the build.
- Width and height always come from the imported file or from the ratio, so the layout never jumps (IMG-01).
- `priority` sets `loading="eager"` and `fetchpriority="high"`. Only the hero sets it, one per page (IMG-02). Everything else is `loading="lazy"` and `decoding="async"` (IMG-03).
- Crops that change the shape a lot (21:9 panoramas, 4:5 portraits) pass the ratio's width and height to Astro so the crop happens at build, instead of sending a 3:2 file and hiding most of it with CSS.

**Widths and sizes by layout.** The page container is 1240px (`--layout-max`), the wide container 1440px (`--layout-wide`), and the mobile switch is 760px.

| Where the image sits | `widths` | `sizes` |
| --- | --- | --- |
| Full-bleed hero, `HeroFullBleed`, `PanoramaCaption` | 640, 960, 1280, 1920, 2560 | `100vw` |
| Split hero or `SplitSection` half | 480, 768, 1080, 1440, 1920 | `(min-width: 1000px) 50vw, 100vw` |
| Container-width image | 640, 960, 1280, 1920, 2480 | `(min-width: 1336px) 1240px, 100vw` |
| `TileGrid` tile (three across) | 400, 640, 800, 1200 | `(min-width: 1000px) 33vw, (min-width: 760px) 50vw, 100vw` |
| `HeroStatement` side image, article figure | 400, 640, 960, 1280 | `(min-width: 1000px) 40vw, 100vw` |
| Doctor close-up, author, testimonial photo | 160, 320, 480 | the rendered size in px, for example `160px` |

If a layout is not in this table, add a row here rather than inventing widths on the page.

**Do not:**

- Add `<link rel="preload">` for the hero when it already has `fetchpriority="high"`. A preload cannot follow the AVIF or WebP choice inside `<picture>`, so the browser can download the hero twice.
- Lazy-load the hero (IMG-02).
- Round a photograph's corners (`--radius-media` is 0).
- Put text that matters into an image (PAGE-07).

## 5. Share images

Share images are generated at build from three templates that use the page's hero photograph and title. The design, the page metadata, the Astro endpoint, manual overrides and the checks are all in [skill-og-images.md](skill-og-images.md). Do not make a plain crop of the hero with `getImage` instead.

## 6. Where images are processed

**Default:** Astro processes images at build time with `sharp`, and Netlify serves the output as static files. This keeps the site fully static, works the same in preview deploys, and adds no runtime service.

Switch to the Netlify Image CDN (the `@astrojs/netlify` adapter's `imageCDN` option) only if image processing makes Netlify builds too slow. Treat "too slow" as a full build over 10 minutes. Record the switch in [skill-stack.md](skill-stack.md) under Change control.

## 7. Checks

| Check | How | Budget |
| --- | --- | --- |
| No oversize masters | A script in CI that fails if any file in `src/assets/images/` is over 1 MB or over 2560px on the long edge | 1 MB, 2560px |
| No photographs in `public/` | The same script fails on any `.jpg`, `.jpeg`, `.png` or `.webp` in `public/` other than the listed exceptions | — |
| Hero weight on a phone | PageSpeed Insights, mobile, on the home page and one programme page | Hero 150 KB or less |
| Total images on first load | Chrome DevTools network panel, mobile, filtered to images | 500 KB or less |
| Layout shift and sizing | Lighthouse | No image-size or layout-shift warnings (IMG-01) |
| LCP element | Lighthouse | The hero image, not lazy-loaded (IMG-02) |

A starting point for the CI script, using the `sharp` that Astro already installs:

```js
// scripts/check-images.mjs
import { readdir, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import sharp from 'sharp';

const MAX_BYTES = 1024 * 1024;
const MAX_EDGE = 2560;
const PHOTO = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const PUBLIC_ALLOWED = new Set(['og-default.jpg', 'logo.png', 'apple-touch-icon.png']);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const errors = [];
for await (const f of walk('src/assets/images')) {
  if (!PHOTO.has(extname(f).toLowerCase())) continue;
  const { size } = await stat(f);
  const { width, height } = await sharp(f).metadata();
  if (size > MAX_BYTES) errors.push(`${f}: ${(size / 1024).toFixed(0)} KB (max 1024 KB)`);
  if (Math.max(width, height) > MAX_EDGE) errors.push(`${f}: ${width}×${height} (max ${MAX_EDGE}px long edge)`);
}
for await (const f of walk('public')) {
  const name = f.split('/').pop();
  const override = dirname(f) === join('public', 'og');
  if (PHOTO.has(extname(f).toLowerCase()) && !PUBLIC_ALLOWED.has(name) && !override) {
    errors.push(`${f}: photographs belong in src/assets/images/`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
```

Run it in GitHub Actions next to Astro Check. CI still does not deploy ([skill-stack.md](skill-stack.md)).

## 8. Still open

| Question | What to do |
| --- | --- |
| The filename Keystatic writes for uploads | Upload one image in the Keystatic admin and look at the file it commits. If the name is not descriptive, decide whether IMG-05 is met by renaming in the pull request or accepted as a known limit. |
| `quality={70}` | Confirm on real pages before launch. |
| Build-time processing time | Measure the first full Netlify build with all photographs in place. Switch to the Netlify Image CDN only if it is over 10 minutes. |

When building on a newer Astro release, check the `astro:assets` API (`<Picture>`, `widths`, `layout`, `fit`, `position`) against the installed version before copying the snippets above.
