# Share images (Open Graph)

Reference renderer and samples for the three Shantara share-image templates: `default`, `programme` and `editorial`.

**The standard is [`ui_kits/website/skill-og-images.md`](../../ui_kits/website/skill-og-images.md).** It sets the design rules, the page metadata, the Astro setup and the checks. This folder implements it and does not repeat it.

| File | What it is |
| --- | --- |
| `og-image.mjs` | `renderOgImage()` — copied unchanged into the website's `src/lib/seo/og/` |
| `render-samples.mjs` | Renders `samples/` from `content/` records and `assets/` |
| `samples/` | Design references. `og-default.jpg` is also the website's `public/og-default.jpg` |

Regenerate the samples after any change to `og-image.mjs`:

```
cd templates/og-images
npm install
npm run samples
```

`node_modules/` is not committed or published.
