# Icons (favicon, touch icon and web manifest)

Back to the [website skill](SKILL.md).

This file is the one standard for the icons a browser or phone shows for shantara.life: the browser-tab icon, the iOS home-screen icon, the Android install icons, the web manifest and the browser theme colour. It covers which files ship, what they look like, the tags in `<head>`, the manifest, how to rebuild the files and how to check them.

The checkable rule is FILE-02 in [search-visibility/files.md](search-visibility/files.md). It points here for the detail. The reference build is [`templates/icons/`](../../templates/icons/README.md); it implements this file, and when the two disagree this file wins and the build is corrected.

| Rule already recorded | Where |
| --- | --- |
| The frangipani mark, its colourways and clear space | [`guidelines/logo.html`](../../guidelines/logo.html) |
| Colour values (Pine Tree `#2D2926`, Merino `#F4F0E6`) | [`tokens/colors.css`](../../tokens/colors.css) |
| What may sit in the website's `public/` folder | [skill-images.md](skill-images.md) |
| Every head tag comes from one component | [skill-structure.md](skill-structure.md) (`seo/Head.astro`) |

## 1. The icon set

Seven files, all in the website's `public/` folder, all built from `assets/icon-current.svg`. Nothing else ships.

| File | Size | Who uses it |
| --- | --- | --- |
| `favicon.svg` | Vector, square | Browser tabs, bookmarks and history in every current browser. Switches colour with the visitor's light or dark setting. |
| `favicon.ico` | 32 × 32 | Older browsers, feed readers, and any tool that asks for `/favicon.ico` without reading the page. It must exist at the root. |
| `apple-touch-icon.png` | 180 × 180 | The iOS and iPadOS home-screen icon when someone adds the site. |
| `icon-192.png` | 192 × 192 | Android home screen and install prompts, through the manifest. |
| `icon-512.png` | 512 × 512 | Android splash screen and app drawer, through the manifest. |
| `icon-mask.png` | 512 × 512 | Android launchers that crop icons into a circle, squircle or rounded square (`purpose: "maskable"`). |
| `manifest.webmanifest` | — | Names the site and lists the Android icons and colours. |

Google Search shows the browser-tab icon next to results. It reads `favicon.svg` from the home page, so no extra file is needed.

## 2. How the icons look

- **The mark only, never the wordmark or the full lockup.** Text is unreadable at tab size.
- **Browser tab:** Pine Tree mark on a transparent background. In dark mode the SVG switches to a Merino mark. `favicon.ico` cannot switch, so it stays Pine Tree.
- **Home-screen and install icons:** Merino mark on solid Pine Tree, the same pairing as the `cream` colourway in [`guidelines/logo.html`](../../guidelines/logo.html). These files are fully opaque, because iOS fills transparency with black and Android with white.
- **Mark size inside the square:** 64% of the width for the touch icon and the two install icons, and 54% for the maskable icon. At 54% the whole mark stays inside the central circle (80% of the width) that every Android mask keeps.
- **No rounded corners in the files.** iOS and Android round the corners themselves. A file with its own corners gets a second, mismatched curve.
- **Minimum size exception.** The logo guideline sets 24px as the smallest mark. Browser tabs show icons at 16px, so the mark may appear at 16px **only as a browser icon built by `templates/icons/`**. The 16, 24 and 32px renders are in [`templates/icons/samples/preview.png`](../../templates/icons/samples/preview.png). Everywhere else the 24px minimum still applies.
- **No gold, olive or accent colours, and no rosette pattern.** At these sizes, Gold Crayola disappears on light browser chrome and the pattern turns to noise.

## 3. Tags in `<head>`

The tags are the same on every page and every language, so they sit at the top of `src/components/seo/Head.astro`, after the charset and viewport tags and before the page's own title and Open Graph tags ([skill-og-images.md](skill-og-images.md), section 8):

```astro
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F0E6" />
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#2D2926" />
```

- **`sizes="32x32"` on the ICO, not `sizes="any"`.** With `any`, Chrome picks the ICO over the SVG.
- **The ICO comes first and the SVG second.** Browsers that read SVG use the last matching icon they support.
- **Root-relative paths, not absolute URLs.** The icons belong to whichever host serves the page, including deploy previews.
- **`theme-color`** tints the address bar on Android and Safari. Merino matches the header in light mode and Pine Tree matches dark browser chrome. It is a browser colour, not a page ground; it does not change `data-ground`.

## 4. The web manifest

```json
{
  "name": "Shantara",
  "short_name": "Shantara",
  "start_url": "/en/",
  "scope": "/",
  "display": "browser",
  "background_color": "#F4F0E6",
  "theme_color": "#F4F0E6",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-mask.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

- **`display: "browser"`.** shantara.life is a marketing site, not an app. An added home-screen icon opens the site in the normal browser, with the address bar. Do not change it to `standalone` without an offline and navigation plan.
- **`start_url` is `/en/`**, not `/`, so a launch does not go through the root redirect. There is one manifest for every language. Do not add per-language manifests; the visitor's language comes from the URL they choose.
- **The maskable icon is its own entry.** `"purpose": "any maskable"` on one file makes the normal icon look shrunken everywhere.
- **No `description`, `screenshots`, `shortcuts` or service worker.** They exist for installable apps and add nothing here.

## 5. Website setup

1. Copy every file from `templates/icons/public/` into the website's `public/`, unchanged.
2. Add the tags from section 3 to `Head.astro`.
3. Add the PNGs to `PUBLIC_ALLOWED` in `scripts/check-images.mjs` ([skill-images.md](skill-images.md)). They are icons, not photographs, and are already the right size.
4. Copy `templates/icons/check-icons.mjs` into the website's `scripts/` and run it in CI as `node scripts/check-icons.mjs public` (section 8).

Netlify serves `.webmanifest` as `application/manifest+json` and `.ico` as `image/x-icon` without extra headers. Do not add a long `Cache-Control` to icon files: they keep fixed names, so they must revalidate.

## 6. Changing the icons

Only when the mark or the Pine Tree or Merino tokens change.

1. In `templates/icons/`, run `npm install` and `npm run build`. The build reads the mark from `assets/icon-current.svg` and the colours from `tokens/colors.css`, so it never needs hand edits for a palette change.
2. Open `samples/preview.png`. Check that the mark still reads as a five-petal flower at 16px on both light and dark chrome, and that the maskable icon is not cropped.
3. Run `npm run check`.
4. Copy the new `public/` files into the website and deploy.
5. Browsers keep favicons in a separate cache that ignores normal reloads. After a real redesign, add `?v=2` (then `?v=3`) to the four `href` values in `Head.astro` so returning visitors see the new icon.

## 7. Never

- No generator output from favicon websites. They add files this standard drops.
- No `browserconfig.xml`, `msapplication-*` meta tags, `<link rel="mask-icon">`, `apple-touch-icon-precomposed`, or extra PNG sizes (16, 57, 72, 96, 114, 144 and so on). Current browsers do not use them.
- No icon tag in a page or layout other than `Head.astro`.
- No per-language, per-page or seasonal icons.
- No raw `assets/icon*.svg` as the favicon. Those files carry about 8 KB of C2PA metadata; the build strips it to about 1.5 KB.
- No photograph, wordmark or text inside any icon.

## 8. Checks

`check-icons.mjs` fails the build when:

- a file from section 1 is missing;
- `favicon.svg` is over 3 KB, has metadata or editor markup, has no dark-mode colour, or has a viewBox that is not square;
- `favicon.ico` has no 32 × 32 image;
- a PNG has the wrong size or any transparent pixel;
- any part of the mark in `icon-mask.png` falls outside the safe zone;
- the manifest is invalid, misses a required field, points at a missing file, has no 192 or 512 icon, has no maskable icon, or combines `any maskable`.

After deploy, check by hand:

1. `curl -I https://shantara.life/favicon.ico` and the same for the other six files return `200` with the content types above.
2. Chrome DevTools → Application → Manifest shows the name, both icons and the maskable preview with no warnings.
3. The tab icon switches when the operating system switches between light and dark mode.
4. On an iPhone, Share → Add to Home Screen shows the Pine Tree icon with the Merino mark.

## 9. Still open

- **Designer sign-off at 16px.** The mark reads as a flower at 16px in `samples/preview.png`, but its thin outlines turn light grey on a dark tab. If a designer prefers, draw a heavier small-size version of the mark and point the build at it; nothing else changes.
- **ICO on dark browser chrome.** Older browsers that use the ICO in dark mode show a Pine Tree mark on a dark tab. This affects few visitors and is accepted for now.
