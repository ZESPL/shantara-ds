# Icons (favicon, touch icon and web manifest)

Back to the [website skill](SKILL.md).

This file is the one standard for the icons a browser or phone shows for shantara.life: the browser-tab icon, the iOS and Android home-screen icons, the web manifest and the browser theme colour. It covers which files ship, what they look like, the tags in `<head>`, the manifest, how to rebuild the files and how to check them.

To see every icon as browsers and phones show it, with download links and the code, open the **Icons** card in the catalog (Website kit → Icons, [`ui_kits/website/icons.card.html`](icons.card.html)).

The checkable rule is FILE-02 in [search-visibility/files.md](search-visibility/files.md). It points here for the detail. The reference build is [`templates/icons/`](../../templates/icons/README.md); it implements this file, and when the two disagree this file wins and the build is corrected.

| Rule already recorded | Where |
| --- | --- |
| The frangipani mark, its colourways and clear space | [`guidelines/logo.html`](../../guidelines/logo.html) |
| Colour values (Himalaya `#495213`, Gold Crayola `#DFC985`, Merino `#F4F0E6`, Pine Tree `#2D2926`) | [`tokens/colors.css`](../../tokens/colors.css) |
| What may sit in the website's `public/` folder | [skill-images.md](skill-images.md) |
| Every head tag comes from one component | [skill-structure.md](skill-structure.md) (`seo/Head.astro`) |

## 1. The icon set

Seven files, all in the website's `public/` folder, all built from `assets/icon-current.svg`. Nothing else ships.

| File | Size | Who uses it |
| --- | --- | --- |
| `favicon.svg` | Vector, square | Browser tabs, bookmarks and history in browsers that read SVG favicons: Chrome, Edge, Firefox, and Safari 26 or later. Himalaya on light tabs, Gold Crayola on dark tabs where the browser supports it (section 2). |
| `favicon.ico` | 32 × 32 | Safari 18 and earlier, older browsers, feed readers, and any tool that asks for `/favicon.ico` without reading the page. It must exist at the root. |
| `apple-touch-icon.png` | 180 × 180 | The iOS and iPadOS home-screen icon when someone adds the site. |
| `icon-192.png` | 192 × 192 | The Android home-screen shortcut when a visitor adds the site from the browser menu, through the manifest. |
| `icon-512.png` | 512 × 512 | The large Android icon, through the manifest. Kept so the manifest is complete; with `display: "browser"` there is no splash screen or app-drawer entry (section 4). |
| `icon-mask.png` | 512 × 512 | Android launchers that crop icons into a circle, squircle or rounded square (`purpose: "maskable"`). |
| `manifest.webmanifest` | — | Names the site and lists the Android icons and colours. |

Google Search shows a site icon next to results. Google chooses which declared icon to use, applies its own size rules, and refreshes it on its own crawl schedule, so the result can lag behind a change or use a different file from the browser tab. No extra file is added for Google; check the live search results once after launch (section 8).

## 2. How the icons look

- **The mark only, never the wordmark or the full lockup.** Text is unreadable at tab size.
- **Browser tab: the bare mark in Himalaya on a transparent background, with no tile or background shape.** Himalaya on a white tab has a contrast ratio of about 8 : 1.
- **Dark tabs: the same `favicon.svg` switches to a Gold Crayola mark** through a `prefers-color-scheme: dark` style inside the file. Himalaya on a dark tab is about 1.5 : 1 and almost disappears; Gold Crayola is about 7.5 : 1, and matches the `gold` colourway the logo guideline sets for dark grounds. Chrome and Edge follow the switch.
- **Known limit: Safari in dark mode shows the faint Himalaya mark.** Safari 26 and later read `favicon.svg` but ignore the dark-mode style inside it. Safari 18 and earlier do not read SVG favicons and use `favicon.ico`, which cannot switch. Either way, a Safari user with a dark tab bar sees Himalaya at about 1.5 : 1. This is accepted to keep the approved transparent Himalaya mark. If the post-launch check (section 8) shows the icon is unreadable there, the fix is a design decision, such as a thin Gold Crayola outline around the mark, approved by a designer. No mid-tone colour reads on both light and dark tabs.
- **Home-screen icons: a Gold Crayola mark on solid Himalaya**, the `gold` colourway on Himalaya in [`guidelines/logo.html`](../../guidelines/logo.html). These files must be fully opaque, because iOS fills transparency with black and Android with white, so the transparent tab icon cannot be reused.
- **Mark size inside the square:** 64% of the width for the touch icon and the two Android icons, and 54% for the maskable icon. At 54% the whole mark stays inside the central circle (80% of the width) that every Android mask keeps.
- **No rounded corners in the home-screen files.** iOS and Android round the corners themselves, and a file with its own corners gets a second, mismatched curve.
- **Minimum size exception.** The logo guideline sets 24px as the smallest mark. Browser tabs show icons at 16px, so the mark may appear at 16px **only as a browser icon built by `templates/icons/`**. The 16, 24 and 32px renders are in [`templates/icons/samples/preview.png`](../../templates/icons/samples/preview.png). Everywhere else the 24px minimum still applies.
- **No other colours and no rosette pattern.** No Pine Tree, Merino or accent colours in the browser tab; gold only as its dark-mode colour. At these sizes the pattern turns to noise.
- **Previewing the tab icon:** `favicon.svg` follows the viewer's operating-system setting, not the colour of the page it sits on. On a computer in dark mode it draws a gold mark even on a white mock-up. Previews and mock-ups use `assets/icon-olive.svg` (light) and `assets/icon-gold.svg` (dark) instead.

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
  "background_color": "#495213",
  "theme_color": "#F4F0E6",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icon-mask.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

- **`display: "browser"`.** shantara.life is a marketing site, not an app. Browsers do not treat a site with `browser` as installable: there is no install prompt, no splash screen and no app-drawer entry. A visitor can still add a home-screen shortcut from the browser menu; it uses the manifest icons and opens the site in the normal browser, with the address bar. Do not change it to `standalone` without an offline and navigation plan.
- **`start_url` is `/en/`**, not `/`, so a launch does not go through the root redirect. There is one manifest for every language. Do not add per-language manifests; the visitor's language comes from the URL they choose.
- **The maskable icon is its own entry.** `"purpose": "any maskable"` on one file makes the normal icon look shrunken everywhere.
- **`background_color` is Himalaya**, the icon's ground. Browsers use it only for the splash screen of an installed app, so it has no effect with `browser`; it is set so the manifest is complete and correct if `display` ever changes. **`theme_color` is Merino**, the page colour, as in the `theme-color` tag.
- **No `description`, `screenshots`, `shortcuts` or service worker.** They exist for installable apps and add nothing here.

## 5. Website setup

1. Copy every file from `templates/icons/public/` into the website's `public/`, unchanged.
2. Add the tags from section 3 to `Head.astro`.
3. Add the PNGs to `PUBLIC_ALLOWED` in `scripts/check-images.mjs` ([skill-images.md](skill-images.md)). They are icons, not photographs, and are already the right size.
4. Copy `templates/icons/check-icons.mjs` into the website's `scripts/` and run it in CI after `astro build` as `node scripts/check-icons.mjs public dist` (section 8).

Netlify serves `.webmanifest` as `application/manifest+json` and `.ico` as `image/x-icon` without extra headers. Do not add a long `Cache-Control` to icon files: they keep fixed names, so they must revalidate.

## 6. Changing the icons

Only when the mark or the Himalaya, Gold Crayola or Merino tokens change.

1. In `templates/icons/`, run `npm install` and `npm run build`. The build reads the mark from `assets/icon-current.svg` and the colours from `tokens/colors.css`, so it never needs hand edits for a palette change.
2. Open `samples/preview.png`. Check that the mark still reads as a five-petal flower at 16px on both the light and the dark tab, and that the maskable icon is not cropped.
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
- `favicon.svg` is over 3 KB, has metadata or editor markup, has a background shape, has no dark-mode colour, or has a viewBox that is not square;
- `favicon.ico` has no 32 × 32 image;
- a PNG has the wrong size or any transparent pixel;
- any part of the mark in `icon-mask.png` falls outside the safe zone;
- the manifest is invalid, misses a required field, points at a missing file, has no 192 or 512 icon, has no maskable icon, or combines `any maskable`;
- given the built site folder as a second argument (`dist`), any built page is missing one of the six tags in section 3, has a tag with a different path, type, size or colour, or declares an icon, touch icon, manifest or theme colour more than once. This catches a tag removed from `Head.astro` or a page that bypasses it, which the file checks alone would pass.

After deploy, check by hand:

1. `curl -I https://shantara.life/favicon.ico` and the same for the other six files return `200` with the content types above.
2. Chrome DevTools → Application → Manifest shows the name, the icons and the maskable preview. An installability warning about `display` is expected, because the site is deliberately not installable; any other warning is a fault.
3. The tab icon is Himalaya in a light Chrome window and Gold Crayola in a dark one.
4. Safari on a Mac in dark mode: note whether the Himalaya tab icon is still recognisable (section 2, known limit). Report it to design if it is not.
5. On an iPhone, Share → Add to Home Screen shows the gold mark on Himalaya.
6. A few weeks after launch, search for Shantara on Google and confirm the result shows the frangipani mark, not a generic globe.

## 9. Still open

- **Safari dark tabs.** See the known limit in section 2; decide after the post-launch check.
- **Designer sign-off at 16px.** The mark reads as a flower at 16px in `samples/preview.png`, but its thin outlines are faint at that size. A designer should confirm it. If they prefer, draw a heavier small-size version of the mark and point the build at it; nothing else changes.
