# Share images (Open Graph)

Back to the [website skill](SKILL.md).

This file is the one standard for Shantara share images: the picture that appears when a page is shared on WhatsApp, LinkedIn, Facebook, X, iMessage or email. It covers what the image looks like, what it may contain, the three templates, the page metadata that feeds them, how Astro generates them at build time, when a manual image is allowed, and how to check the result.

The checkable rules are SOCIAL-01 to SOCIAL-04 in [search-visibility/social.md](search-visibility/social.md). They point here for the detail. The reference renderer is [`templates/og-images/og-image.mjs`](../../templates/og-images/og-image.mjs); it implements this file, and when the two disagree this file wins and the renderer is corrected.

| Rule already recorded | Where |
| --- | --- |
| One metadata generator per page type (DATA-03) | [search-visibility/data.md](search-visibility/data.md) |
| `og:site_name` is "Shantara Naturopathy Retreat" | [skill-technical.md](skill-technical.md#global-site-identity-titles-and-open-graph) |
| Three heroes and where each is used | [`HeroFullBleed.prompt.md`](../../components/sections/HeroFullBleed.prompt.md) |
| Diodrum, the Light rule, no eyebrows | [skill-premium.md](skill-premium.md#design-system-rules-from-the-brand-deck) |
| Logo colourways, never on bare photography | [`guidelines/logo.html`](../../guidelines/logo.html) |
| Rosette band proportions | [`tokens/pattern.css`](../../tokens/pattern.css) |
| Guest privacy in photographs | Root [`SKILL.md`](../../SKILL.md) |
| Where photographs are stored and what may sit in `public/` | [skill-images.md](skill-images.md) |
| Claim words banned in Open Graph text (MED-03) | [search-visibility/medical.md](search-visibility/medical.md) |
| No rates outside the tariff page | [search-visibility/rates.md](search-visibility/rates.md) |

## 1. What a Shantara share image is

**A share image is the page's hero, reduced to 1200 × 630.** The website has exactly three heroes, so there are exactly three share templates. Each uses the same ground, photograph, type and marks as its hero. There is no separate social-media style.

Every share image carries the same three things, and nothing else:

1. The Shantara wordmark, top left.
2. The page title, large, in Diodrum Light. It is the dominant element.
3. One supporting line, only when it fits whole.

The text sits on the bottom of the safe area in all three templates, so a feed of Shantara links reads as one family.

## 2. The three templates

| Template | Mirrors | Ground | Used for |
| --- | --- | --- | --- |
| `default` | `HeroFullBleed` | Full-bleed photograph, `--scrim-hero` behind the text, `--scrim-header` behind the wordmark | Home, Experience, the flagship inner page, and any page that sets no template |
| `programme` | `HeroSplit` | Merino text column, photograph on the right at 40% of the width | Programme and condition detail pages, Tariffs, Book a Consultation |
| `editorial` | `HeroStatement`, `ArticleHeader` | Merino, rosette band on the right edge | Conditions and Programmes indexes, About, Journal index, Contact, legal pages, articles, Clinical Guides, Doctor Answers |

**The template follows the page's hero.** A page type not listed here uses the template that matches its hero. Do not add a fourth template; a page that seems to need one uses the closest of the three.

![Default template: the home page](../../templates/og-images/samples/home.jpg)

![Programme template: Stress Management](../../templates/og-images/samples/programme.jpg)

![Editorial template: a Clinical Guide](../../templates/og-images/samples/editorial.jpg)

![Editorial template: a long Doctor Answer title on three lines, supporting line dropped](../../templates/og-images/samples/long-title.jpg)

![The global default share image](../../templates/og-images/samples/og-default.jpg)

The samples are generated from `content/` records by [`templates/og-images/render-samples.mjs`](../../templates/og-images/render-samples.mjs). `og-default.jpg` is the approved global default and is copied to the website unchanged.

## 3. Layout, type and colour

All values are design-system tokens. The renderer resolves them to literals because it cannot read CSS; the token names sit beside each value in `og-image.mjs`.

| Element | Value |
| --- | --- |
| Canvas | 1200 × 630 px |
| Safe area | 64 px inset on all four sides (`--space-11`). The wordmark and all text stay inside it. Photographs and the rosette band bleed to the edges. |
| Wordmark | `wordmark-cream.svg` on the photograph, `wordmark-dark.svg` on Merino. 216 px wide, top left of the safe area. Never the full lockup or the mark alone. |
| Title | Diodrum Light 300, line height 1.06 (`--leading-tight`), balanced wrapping, left-aligned. 64 px up to 32 characters, 56 px up to 60, 48 px above that (`--text-5xl` → `--text-4xl`). |
| Supporting line | Diodrum Regular 400, 24 px (`--text-xl`), line height 1.45, 24 px below the title (`--space-7`). |
| Ink on photograph | Solid Merino for title and line. Never Gold, never a faded Merino mix. |
| Ink on Merino | Pine Tree title (about 12.7:1). `--text-secondary` line (about 7.5:1). |
| Programme photograph | 480 × 630, square-cut, no scrim. Text column 600 px wide. |
| Editorial band | 360 px (30%, `--pattern-band-md`) on the right edge. Cell 180 px (band ÷ 2). Cotton Seed ink at 0.9 and a 1 px Cotton Seed hairline on the inner edge. Text column 712 px wide. |

### Fitting the copy

Share previews are small: a 1200 px image is often shown about 500 px wide. Nothing on the image is smaller than 24 px, and the copy is kept short rather than shrunk.

| Template | Longest title (three lines) | Supporting line shown when it is at most |
| --- | --- | --- |
| `default` | 90 characters | 110 characters (two lines) |
| `programme` | 60 characters | 140 characters (three lines) |
| `editorial` | 72 characters | 100 characters (two lines) |

- A title over the limit **fails the build** with a message naming the page. Set a shorter `og.title`; never let the renderer truncate.
- The supporting line is shown whole or not at all. It is never cut with an ellipsis.
- A title longer than 60 characters takes the space, so its supporting line is dropped (see the long-title sample).

## 4. Photography

- **Use the page's own photograph.** Fixed pages use their hero. Entries use `featured_image`, which is already the photograph editors choose for the page ([skill-content.md](skill-content.md#shared-fields)). Pages with no photograph use `site/valley.jpg`.
- **Guest privacy applies unchanged.** Prefer frames without `-guest` in the name ([`assets/photos/README.md`](../../assets/photos/README.md)). Never treatment in progress, faces in therapy or room numbers.
- **For the `default` template, choose a frame whose lower left is quiet and fairly dark.** The scrim protects contrast, but a bright sky or white wall behind the title still reads badly at preview size.
- The crop is centred. If the subject falls out of a 1.9:1 or 0.76:1 crop, choose another frame.
- Real Shantara photography only. No stock, no filters or colour grades, and no AI-generated images of the place, rooms, food, therapies, guests or doctors (IMG-06).
- The rosette band appears only on the `editorial` template, on Merino. Never put it over a photograph in a share image.

## 5. Never on a share image

- A URL or domain name. The platform prints it beside the image.
- A button, "Book now", "Learn more" or any other call to action.
- Rates, prices, "from …", offers or discounts. Rates appear only on the tariff page.
- Durations, dates, author or reviewer names. The page shows them where they can be read and checked (MED-01, MED-05).
- An eyebrow, label or category above the title.
- Badges, icons, emoji, a phone number or a second logo.
- Accent colours, Gold text, drop shadows, gradients other than the two scrims, or rounded corners.
- Health claims. MED-03 already covers Open Graph text, and the image repeats that text.

## 6. Page metadata

Share images are generated from the page metadata the site already builds for `<title>`, the meta description and the canonical URL (DATA-03). There is no second set of titles to maintain. Keystatic holds no share-image fields: editors control the image through the title, meta description and featured image they already edit.

```ts
type PageMeta = {
  path: string;          // canonical route: '/en/', '/en/programs/stress-management'
  title: string;         // page title without the brand suffix
  description: string;   // meta description
  noindex?: boolean;
  og?: {
    title?: string;       // defaults to title
    description?: string; // defaults to description
    template?: 'default' | 'programme' | 'editorial'; // defaults to 'default'
    photo?: string;       // project-relative JPEG, e.g. 'src/assets/images/site/arrival-dusk.jpg'
    image?: string;       // manual override in public/, e.g. '/og/monsoon-2027.jpg' (section 8)
    imageAlt?: string;    // required with image
  };
};
```

**Copy falls back to the page:**

```text
share title        = og.title       ?? title
share description  = og.description ?? description
```

`<title>`, `og:title`, `og:description` and the text on the image all come from these values. X reads `og:title` and `og:description`, so the site writes no `twitter:title` or `twitter:description`.

**The image falls back in three steps:**

```text
og.image set              → that file (a manual override)
indexable page            → /open-graph/<path>.jpg, generated at build
noindex page, or anything
the generator does not    → /og-default.jpg
cover
```

**Set an `og` field only for a reason.** The per-type generator sets `template` and `photo`. `og.title` is for a page title that reads badly as a picture caption, for example one carrying a search qualifier. `og.description` is for a short line when the meta description is too long to show. Neither is set by default.

## 7. Astro implementation

### How it works

```text
page metadata (PageMeta, one generator per page type)
      │
      ├── <Seo meta> in <head>: title, description, canonical,
      │   og:*, og:image:*, twitter:card, twitter:image
      │
      └── src/pages/open-graph/[...route].ts
            getStaticPaths() lists every indexable page
            GET renders one JPEG per page with og-image.mjs
                  ↓
astro build → dist/*.html + dist/open-graph/**/*.jpg → Netlify CDN
```

Everything is rendered once, during `astro build`. There is no server, function or edge code for share images, and the site stays fully static. Pages change only on deploy, so runtime rendering would add cost and cold starts for nothing.

### Libraries

| Option | Decision |
| --- | --- |
| **satori + sharp** | **Used.** satori lays out the template (flexbox, balanced wrapping, CSS masks) with the Diodrum TTFs and returns SVG. sharp, which Astro already installs for its image pipeline, crops the photograph and writes the JPEG. satori is the only new dependency. |
| astro-og-canvas | Not used. Its layout is fixed: a raster logo, then title and description stacked from the top. It cannot draw a scrim over the photograph, a split layout or the rosette band, so every page would get a generic blog card. |
| `@vercel/og`, a Netlify Function or an Edge Function | Not used. These render on request. Shantara has no data that changes between deploys. |
| A plain 1200 × 630 crop of the hero with `getImage()` | Replaced. It carried no title or brand, so shares of different pages looked alike. |

Verified with Astro 7.3, satori 0.33 and sharp 0.35: `astro check` and `astro build` pass, and the check in section 9 passes. When building on a newer release, check `getStaticPaths`, `import.meta.env.SITE` and `entry.filePath` against the installed version before copying the code below.

### Files

```text
src/
  components/Seo.astro             ← the only place share tags are written
  lib/seo/
    meta.ts                        ← PageMeta, resolveMeta(), ogImagePath(), featuredPhoto()
    pages.ts                       ← FIXED_PAGES, one xxxMeta() per page type, getAllPageMeta()
    og/
      og-image.mjs                 ← copied unchanged from templates/og-images/
      DiodrumCyrillic-Light.ttf    ← from assets/fonts/ (satori cannot read WOFF2)
      DiodrumCyrillic-Regular.ttf
      wordmark-cream.svg, wordmark-dark.svg, pattern-unit.png   ← from assets/
  pages/open-graph/[...route].ts   ← one JPEG per indexable page
public/
  og-default.jpg                   ← templates/og-images/samples/og-default.jpg
  og/                              ← manual overrides only (section 8)
scripts/check-og.mjs               ← section 9
```

Add `satori` to `dependencies`, and `@types/node` to `devDependencies` if the project does not have it. `astro.config.mjs` sets `site: 'https://shantara.life'`; nothing else in the code base writes the domain.

### `src/lib/seo/meta.ts`

```ts
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

export type OgTemplate = 'default' | 'programme' | 'editorial';

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  og?: {
    title?: string;
    description?: string;
    template?: OgTemplate;
    photo?: string;
    image?: string;
    imageAlt?: string;
  };
};

export const SITE_NAME = 'Shantara Naturopathy Retreat';
export const OG_DEFAULT_IMAGE = '/og-default.jpg';
export const OG_DEFAULT_PHOTO = 'src/assets/images/site/valley.jpg';

export const ogImagePath = (path: string) => `/open-graph/${path.replace(/^\/|\/$/g, '') || 'index'}.jpg`;

/** Project-relative path of an entry's featured image. Keystatic stores it relative to the entry file. */
export function featuredPhoto(entry: { filePath?: string }): string | undefined {
  if (!entry.filePath) return undefined;
  const src = JSON.parse(readFileSync(entry.filePath, 'utf8')).featured_image?.src;
  return src ? join(dirname(entry.filePath), src) : undefined;
}

export function resolveMeta(page: PageMeta, site: URL) {
  const { og = {} } = page;
  if (og.image && !og.imageAlt) throw new Error(`${page.path}: og.image needs og.imageAlt`);
  const title = og.title ?? page.title;
  const description = og.description ?? page.description;
  const generated = !og.image && !page.noindex;
  const image = og.image ?? (generated ? ogImagePath(page.path) : OG_DEFAULT_IMAGE);
  return {
    documentTitle: page.title === SITE_NAME ? SITE_NAME : `${page.title} | ${SITE_NAME}`,
    description: page.description,
    canonical: new URL(page.path, site).href,
    noindex: page.noindex ?? false,
    og: {
      title,
      description,
      generated,
      template: og.template ?? 'default',
      photo: og.photo ?? OG_DEFAULT_PHOTO,
      image: new URL(image, site).href,
      imageAlt: og.imageAlt ?? (generated ? title : SITE_NAME),
    },
  };
}
```

`featuredPhoto()` reads the path Keystatic wrote rather than `featured_image.src`, because after `image()` that value is a URL, not a file.

### `src/lib/seo/pages.ts`

One list feeds both the pages and the image route, so a page cannot have a share tag without an image.

```ts
import { getCollection, type CollectionEntry } from 'astro:content';
import { featuredPhoto, type PageMeta } from './meta';

export const FIXED_PAGES = {
  home: {
    path: '/en/',
    title: 'A doctor-led naturopathy retreat in Kerala',
    description: "Every stay begins with a doctor's consultation.",
    og: { template: 'default', photo: 'src/assets/images/site/arrival-dusk.jpg' },
  },
  conditions: {
    path: '/en/conditions',
    title: 'Conditions we commonly see',
    description: 'Programmes are planned after consultation and assessment.',
    og: { template: 'editorial' },
  },
} satisfies Record<string, PageMeta>;

export const programmeMeta = (entry: CollectionEntry<'programmes'>): PageMeta => ({
  path: `/en/programs/${entry.data.slug}`,
  title: entry.data.meta_title ?? entry.data.name,
  description: entry.data.meta_description ?? entry.data.proposition,
  og: { template: 'programme', photo: featuredPhoto(entry) },
});

export async function getAllPageMeta(): Promise<PageMeta[]> {
  const programmes = await getCollection('programmes', (e) => e.data.status === 'published');
  return [...Object.values(FIXED_PAGES), ...programmes.map(programmeMeta)];
}
```

Add one `xxxMeta()` per page type (conditions, doctors, articles, doctor answers) and add its entries to `getAllPageMeta()`. A page uses its generator directly: `<Layout meta={programmeMeta(entry)}>`.

### `src/pages/open-graph/[...route].ts`

```ts
import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from 'astro';
import { getAllPageMeta } from '../../lib/seo/pages';
import { ogImagePath, resolveMeta } from '../../lib/seo/meta';
import { loadOgAssets, renderOgImage } from '../../lib/seo/og/og-image.mjs';

const dir = 'src/lib/seo/og';
const assets = loadOgAssets({
  fontLight: `${dir}/DiodrumCyrillic-Light.ttf`,
  fontRegular: `${dir}/DiodrumCyrillic-Regular.ttf`,
  wordmarkCream: `${dir}/wordmark-cream.svg`,
  wordmarkDark: `${dir}/wordmark-dark.svg`,
  patternUnit: `${dir}/pattern-unit.png`,
});

export const getStaticPaths = (async () => {
  const site = new URL(import.meta.env.SITE);
  const pages = await getAllPageMeta();
  return pages
    .map((page) => resolveMeta(page, site))
    .filter((meta) => meta.og.generated)
    .map((meta) => ({
      params: { route: ogImagePath(new URL(meta.canonical).pathname).replace('/open-graph/', '') },
      props: { og: meta.og },
    }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { og } = props as InferGetStaticPropsType<typeof getStaticPaths>;
  const jpeg = await renderOgImage({ ...og, assets: await assets });
  return new Response(new Uint8Array(jpeg), { headers: { 'Content-Type': 'image/jpeg' } });
};
```

`getStaticPaths` receives no `site`, so the route reads `import.meta.env.SITE`. Paths are relative to the project root, where `astro build` runs. Each image takes about 0.1 to 0.35 seconds, so a hundred pages add well under a minute to the build.

### `src/components/Seo.astro`

```astro
---
import { resolveMeta, SITE_NAME, type PageMeta } from '../lib/seo/meta';

interface Props {
  meta: PageMeta;
}

const m = resolveMeta(Astro.props.meta, Astro.site!);
---

<title>{m.documentTitle}</title>
<meta name="description" content={m.description} />
<link rel="canonical" href={m.canonical} />
{m.noindex && <meta name="robots" content="noindex" />}
<meta property="og:type" content="website" />
<meta property="og:site_name" content={SITE_NAME} />
<meta property="og:url" content={m.canonical} />
<meta property="og:title" content={m.og.title} />
<meta property="og:description" content={m.og.description} />
<meta property="og:image" content={m.og.image} />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content={m.og.imageAlt} />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={m.og.image} />
<meta name="twitter:image:alt" content={m.og.imageAlt} />
```

Output on a programme page:

```html
<meta property="og:image" content="https://shantara.life/open-graph/en/programs/stress-management.jpg">
<meta property="og:image:alt" content="Stress Management">
```

`og:locale` and `hreflang` come from the locale config in the same component (SOCIAL-01, LANG-04); they are left out here because they do not affect the image. Every URL is absolute and built from `site`. On a deploy preview the image URLs still point at production, so test share previews after the production deploy and test the build locally with section 9.

### Output format

JPEG, quality 82, progressive, sRGB. A photographic share image as PNG is over 1 MB, and some apps skip preview images over about 300 KB (SOCIAL-02). The samples weigh 60 to 125 KB.

## 8. Manual overrides

Almost every "special" share image is a different photograph or a shorter line. That is `og.photo`, `og.title` or `og.description`, and the template still draws it.

A manual image is allowed only for:

- a major campaign or launch page,
- a page that is art-directed as a whole, or
- a page the three templates genuinely cannot represent.

Ordinary pages never get one, even when the generated image looks plain.

```ts
og: { image: '/og/monsoon-2027.jpg', imageAlt: 'Rain over the valley below Shantara' }
```

- The file goes in `public/og/`: a 1200 × 630 JPEG, 300 KB or less.
- It follows sections 3 to 5: the wordmark, Diodrum, the brand palette, the safe area, and no URL, button or rate.
- `imageAlt` is required. The build fails without it.
- Delete the file and the override when the campaign ends.

## 9. Checks

Run after `astro build`, in GitHub Actions next to Astro Check. It uses the `sharp` that Astro installs.

```js
// scripts/check-og.mjs — run after `astro build`. Fails when an indexable page lacks share tags or its image is wrong.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const DIST = 'dist';
const SITE = 'https://shantara.life';
const MAX_BYTES = 300 * 1024;
const REQUIRED = ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:image'];

async function* html(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* html(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

const meta = (doc, key) => doc.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`))?.[1];
const errors = [];
const checked = new Map();
let pages = 0;

for await (const file of html(DIST)) {
  const doc = await readFile(file, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/.test(doc) || file.endsWith('404.html')) continue;
  pages += 1;
  for (const key of REQUIRED) if (!meta(doc, key)) errors.push(`${file}: missing ${key}`);
  if (meta(doc, 'twitter:card') !== 'summary_large_image') errors.push(`${file}: twitter:card is not summary_large_image`);
  const url = meta(doc, 'og:image');
  if (!url) continue;
  if (!url.startsWith(`${SITE}/`)) { errors.push(`${file}: og:image is not an absolute ${SITE} URL: ${url}`); continue; }
  if (meta(doc, 'twitter:image') !== url) errors.push(`${file}: twitter:image differs from og:image`);
  if (checked.has(url)) continue;
  const img = join(DIST, decodeURIComponent(new URL(url).pathname));
  try {
    const [{ size }, { width, height, format }] = await Promise.all([stat(img), sharp(img).metadata()]);
    if (width !== 1200 || height !== 630) errors.push(`${img}: ${width}×${height}, expected 1200×630`);
    if (format !== 'jpeg') errors.push(`${img}: ${format}, expected jpeg`);
    if (size > MAX_BYTES) errors.push(`${img}: ${(size / 1024).toFixed(0)} KB, max 300 KB`);
  } catch {
    errors.push(`${file}: og:image ${url} is not in ${DIST}/`);
  }
  checked.set(url, true);
}

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Share tags OK on ${pages} indexable pages, ${checked.size} images checked.`);
```

This covers every indexable page, the absolute URL, the file in `dist/`, the size and the weight, including manual overrides and `og-default.jpg`. Title limits are enforced earlier, by the renderer during the build.

If a Playwright smoke test already opens a programme page, one extra assertion is enough. Do not add a test only for share images.

```ts
const image = await page.locator('meta[property="og:image"]').getAttribute('content');
expect(image).toMatch(/^https:\/\/shantara\.life\/open-graph\/.+\.jpg$/);
```

After a production deploy, paste a programme URL into WhatsApp (SOCIAL-01), and check one page in the LinkedIn Post Inspector and the Facebook Sharing Debugger. Platforms cache images by URL: after changing a title, use "Scrape again" in the debugger.

## 10. Changing the templates

1. Edit [`templates/og-images/og-image.mjs`](../../templates/og-images/og-image.mjs) in this design system, never the copy in the website repo.
2. Run `npm install` and then `npm run samples` in `templates/og-images/`, and review all five samples, including the long title.
3. Update this file in the same change if a rule or value moved.
4. Copy `og-image.mjs` into the website's `src/lib/seo/og/`, and `samples/og-default.jpg` to its `public/` if it changed.

When a colour, scrim or pattern token changes, update the matching literal at the top of `og-image.mjs`.

## 11. Still open

| Question | What to do |
| --- | --- |
| Arabic and other right-to-left locales | Only `/en/` exists. Before `/ar/` launches, render samples with IBM Plex Sans Arabic, check satori's Arabic shaping, and mirror the layout: wordmark top right, text right-aligned, band on the left edge. |
| Platform image caches | Images keep their URL when a title changes, so platforms can show the old one until re-scraped. Add a content hash to the file name only if this becomes a real problem. |
| Photograph position | Crops are centred. Add a position option only when a real page's photograph cannot be replaced by a better-framed one. |
