# Icons (favicon and web manifest)

Builds the website's icon set from the frangipani mark: favicon, iOS touch icon, Android install icons and web manifest.

**The standard is [`ui_kits/website/skill-icons.md`](../../ui_kits/website/skill-icons.md).** It sets which files ship, how they look, the `<head>` tags, the manifest and the checks. This folder implements it and does not repeat it.

| File | What it is |
| --- | --- |
| `build-icons.mjs` | Reads `assets/icon-current.svg` and `tokens/colors.css`, writes `public/` and `samples/preview.png`. `npm run build` |
| `check-icons.mjs` | Checks an icon set. `npm run check`. Copied to the website as `scripts/check-icons.mjs` and run on its `public/` |
| `public/` | The seven files. Copied unchanged into the website's `public/` |
| `samples/preview.png` | The tab icon at 16, 24 and 32px on a light and a dark tab (1× and enlarged), the touch icon, and the maskable icon under a circle mask |

Rebuild after any change to the mark or to the Himalaya, Gold Crayola or Merino tokens, then check:

```
cd templates/icons
npm install
npm run build
npm run check
```

`node_modules/` is not committed or published.
