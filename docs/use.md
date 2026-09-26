# Use it both ways

This folder is the design system. Serve it and browse it. Copy it into another repo and build with it. Same files, both jobs.

## Browse it

From this folder:

```
npx --yes serve -l 4173
```

Open `http://localhost:4173`. The catalog lists every guideline card, component family, UI kit, the brand deck, and these notes.

Cards also open as their own pages — `guidelines/colors.html`, `ui_kits/website/index.html`, `docs/readme.html`. Opening the folder as a `file://` path will not work; the catalog and the markdown notes need http.

Netlify publishes a `dist/` copy. Raw `uploads/` (boards, handbook `.docx`, full shoot) stay off the public site because they are large and internal. They remain in this folder locally; the [Sources](sources.html) page lists them and links any file that is present.

## Add it to another repo

Copy the folder when you need the full skill + kits + content model. Prefer the take/leave table below over “copy everything blindly” or inventing a thinner subset that breaks relative paths.

### As a Cursor skill

Copy the folder to:

```
.cursor/skills/shantara-design/
```

Cursor will load `SKILL.md` and `AGENTS.md`. Agents then read `content/`, the component `*.prompt.md` files, and the kits. That is the intended path for “design something in this brand.”

You can also keep the folder at the repo root (as it is here) and treat `SKILL.md` as the project skill.

### As production code

1. Link the single CSS entry. Paths inside it are relative, so keep `styles.css`, `tokens/` and `assets/` together.

```html
<link rel="stylesheet" href="vendor/shantara-design/styles.css">
```

2. Copy or import the components you need from `components/` (`*.jsx` + `*.d.ts`). Read the matching `*.prompt.md` before using a control.
3. Use `assets/` as shipped — logos, pattern cell, fonts, photos under `assets/photos/` (flat; kit slugs plus descriptive alternates — see that folder’s README). Do not retile `pattern-motif.png`. Do not invent a new icon set without replacing Lucide on purpose.
4. For entity facts (programmes, rooms, NAP, tariff structure), load [`content/`](../content/) or generated `content/kit.js`. Do not keep local `PROGRAMMES` / rate arrays in app code. This folder holds no rates.
5. For a marketing page, start from `ui_kits/website/`. Read `ui_kits/website/SKILL.md` before composing pages, forms, or SEO. For an in-stay surface, start from `ui_kits/app/`. Both kits are extrapolations; read their READMEs.

### Take / leave

| Take | Leave unless you need it |
| --- | --- |
| `styles.css`, `tokens/` (including `tokens/layout.css` — grounds, container, grid), `assets/` | `uploads/` (raw boards and shoot) |
| `components/` — including `components/editorial/` and `components/sections/` for website pages | `catalog.js`, `index.html` (browse-only chrome) |
| `content/` (entity facts; generate `kit.js` via `scripts/write-content-kit.mjs`) | `_ds_bundle.js` for copy, programmes, or rates (components only) |
| `AGENTS.md`, `SKILL.md`, `readme.md`, `*.prompt.md`, `ui_kits/website/SKILL.md`, `ui_kits/website/skill-copy.md`, `.cursor/skills/shantara-premium-presentations/SKILL.md` | |
| `ui_kits/` if you are shipping those surfaces | `scraps/`, `dist/`, `.netlify/` |
| `templates/brand-deck/` if you are building decks | |
| `templates/og-images/og-image.mjs` and `samples/og-default.jpg` if you are building the website's share images | `templates/og-images/node_modules/` |
| `scripts/build-bundle.mjs` if you edit components and need `_ds_bundle.js` rebuilt | |
| `docs/handbook.txt` for policies and `[TO CONFIRM]` | Handbook §15 as public copy; inventing clinical bodies |

## Where this lives

| Fact | Canonical file | Do not restate in |
| --- | --- | --- |
| Entity records (programmes, rooms, conditions, NAP) | [`content/`](../content/) | local arrays in kit screens |
| Rates, currencies, validity dates | The shantara.life Keystatic tariff only. [`content/tariff.json`](../content/tariff.json) holds structure, not rates | anywhere in this design system or its docs |
| Voice / public language | [`ui_kits/website/skill-copy.md`](../ui_kits/website/skill-copy.md) (browsed as [`docs/website-copy.html`](website-copy.html)) | long essays in `readme.md`; do not keep a second brand-copy card |
| Colour, type, logo, pattern | the matching `guidelines/*.html` card | |
| Contrast | [`guidelines/accessibility.html`](../guidelines/accessibility.html) | a11y changelog in `readme.md` |
| How to consume | `docs/use.md` | |
| Website IA / CMS / QA | `ui_kits/website/skill-*.md` | overlapping `README.md` chapters |
| Share images (Open Graph) | [`ui_kits/website/skill-og-images.md`](../ui_kits/website/skill-og-images.md) | `skill-images.md`, `search-visibility/social.md` (they point to it) |
| Audience | `docs/icp.md` (internal) | public page copy |
| Policies / `[TO CONFIRM]` | `docs/handbook.txt` | hero copy; never quote §15 publicly |

## What an agent should read

1. `AGENTS.md` — short index and bans
2. `SKILL.md` — the five non-obvious rules
3. `content/` — entity facts before inventing programmes, rooms, or contact
4. `readme.md` — orientation, file map, caveats, on-record corrections
5. `ui_kits/website/SKILL.md` when the work is the public marketing website
6. `.cursor/skills/shantara-premium-presentations/SKILL.md` when the work is any presentation or deck (HTML brand deck: `templates/brand-deck/`)
7. The `*.prompt.md` next to the component being used (or the catalog component page)
8. `docs/handbook.txt` for policies, conflicts, and `[TO CONFIRM]` — not for inventing public copy
9. `docs/icp.md` when the work is audience, SEO, campaigns, CRM, or content strategy — internal only; do not paste ICP names into public copy
10. `guidelines/accessibility.html` before changing a colour token

## What this folder is not

It is not an npm package and not a Figma library. There is no install command beyond copying the folder. There is no product codebase behind the kits.

Rates, currencies and validity dates are not stored in this design system or its documentation. Production rates live only in the shantara.life Keystatic tariff. Everywhere else, link to the tariff page and never quote a rate.
