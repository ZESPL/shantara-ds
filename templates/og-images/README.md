# Share images (Open Graph)

Reference renderer and samples for the three Shantara share-image templates: `default`, `programme` and `editorial`.

**The standard is [`ui_kits/website/skill-og-images.md`](../../ui_kits/website/skill-og-images.md).** It sets the design rules, the page metadata, the Astro setup and the checks. This folder implements it and does not repeat it.

| File | What it is |
| --- | --- |
| `og-image.mjs` | `renderOgImage()` — copied unchanged into the website's `src/lib/seo/og/` |
| `render-samples.mjs` | Renders `samples/` from `content/` records and `assets/` |
| `samples/` | Design references. `og-default.jpg` is also the website's `public/og-default.jpg` |
| `share-copy.mjs` | Picture headlines, supporting lines and `auditSharePage` |
| `check-og.mjs` | Copy audit and JPEG checks. `npm run check`. Copied to the website as `scripts/check-og.mjs` |
| `samples/rtl-test/` | Right-to-left rendering tests with Arabic type-specimen pangrams, not copy. Arabic is disabled until these pass ([§ 12](../../ui_kits/website/skill-og-images.md#12-still-open)) |

The renderer reads Diodrum and, for `dir: "rtl"` only, IBM Plex Sans Arabic from `assets/fonts/`.

Regenerate the samples after any change to `og-image.mjs` or `share-copy.mjs`, then run the check:

```
cd templates/og-images
npm install
npm run samples
npm run check
```

`node_modules/` is not committed or published.
