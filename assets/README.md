# `assets/` — agent index

Every image file in this design system, and which one to pick, without opening it. Photographs have their own catalogue in [`photos/README.md`](photos/README.md), with one entry per frame. Fonts are in `fonts/` and are not described here.

| Folder | What | Pick by |
| --- | --- | --- |
| `photos/` | 161 property, doctor, activity and food photographs | [`photos/README.md`](photos/README.md) |
| `./` (root) | Shantara wordmark, flower mark, rosette pattern | This file, [Logo](#shantara-logo) and [Pattern](#rosette-pattern) |
| `lockups/` | Shantara with Hygiene Nature Cure | This file, [Lockups](#lockups-with-hygiene-nature-cure) |
| `hnch/` | Hygiene Nature Cure Hospital's own mark | This file, [HNCH](#hygiene-nature-cure-hospital-hnch) |

Images elsewhere in the repo are generated or are not assets. Do not use them as source artwork:

- `templates/og-images/samples/*.jpg`: rendered share-image references (1200 × 630). `og-default.jpg` is the one that ships, as the website's `public/og-default.jpg`. `rtl-test/` is a rendering test, not copy. See [`templates/og-images/README.md`](../templates/og-images/README.md).
- `templates/icons/public/`: favicon, touch and maskable icons built from `icon-current.svg`. Copy them as they are. See [`templates/icons/README.md`](../templates/icons/README.md).
- `scraps/`, `temp/`, `uploads/`: working files, resumes and the raw shoot. Never use them on a page.

## Colour names in filenames

Every logo, lockup and pattern file uses one flat colour. The suffix names it:

| Suffix | Fill | Token | Put it on |
| --- | --- | --- | --- |
| `-dark` | `#2D2926` | Pine Tree | Merino, Pearl Bush, white |
| `-olive` | `#495213` | Himalaya | Merino, Pearl Bush, white |
| `-cream` | `#F4F0E6` | Merino | Pine Tree, Himalaya |
| `-gold` | `#DFC985` | Gold Crayola | Pine Tree, Himalaya |
| `-current` | `currentColor` | inherits | Inline SVG or CSS mask only. An `<img>` does not inherit colour |
| *(none)* | `#2D2926` | Pine Tree | Same artwork as `-dark`, kept for older references |

Never place a logo straight on a photograph or on an accent colour ([`guidelines/logo.html`](../guidelines/logo.html)).

## Shantara logo

Two forms, used apart and **never stacked**. Rules in [`components/core/Logo.prompt.md`](../components/core/Logo.prompt.md). In code, use `<Logo mark tone height>`, not a raw file.

| File | Shape | Use for | Minimum |
| --- | --- | --- | --- |
| `wordmark-{dark,olive,cream,gold,current}.svg` | "SHANTARA" in capitals, wide (664.59 × 86.07, about 7.7 : 1) | Default. Headers, footers, cover slides, documents, anywhere the name must read | 96px wide |
| `icon-{dark,olive,cream,gold,current}.svg` | The eight-petal flower mark, near-square (105.58 × 100.62) | Where the name already reads nearby: compact nav, avatars, social profile image, stamps, section ornaments | 24px (16px only for browser icons) |

Clear space on every side equals the height of the artwork.

## Lockups with Hygiene Nature Cure

Ready-made pairings. Never put `Logo` and `HnchLogo` side by side by hand. Rules in [`guidelines/cobrand-lockups.html`](../guidelines/cobrand-lockups.html) and [`components/core/HnchLogo.prompt.md`](../components/core/HnchLogo.prompt.md). Rebuild with `python scripts/build-lockups.py`.

| File | Shape | Use for |
| --- | --- | --- |
| `lockups/endorsed-horizontal-{dark,olive,cream,gold,current}.svg` | Wordmark with "A sister concern of Hygiene Nature Cure" on two lines beside it (1184.80 × 86.07) | Footers, letterheads, wide slots. All documents use an endorsed lockup |
| `lockups/endorsed-stacked-{dark,olive,cream,gold,current}.svg` | Wordmark with the same line set in one line below it (664.59 × 152.50) | Narrow or centred slots: cover pages, mobile footers, signatures |
| `lockups/cobrand-{dark,olive,cream,current}.svg` | Shantara wordmark and the Hygiene lockup without its Nature Cure line (1224.84 × 100.05) | Joint material from both organisations only. Never documents. The Hygiene half stays in its own black (`#1C1A1D`) or white |

## Hygiene Nature Cure Hospital (HNCH)

The parent hospital's own mark, traced from hygienecure.com ([`docs/sources.md`](../docs/sources.md)). Use it only where that hospital's logo is required. It never replaces the Shantara wordmark and is never recoloured to Himalaya or Gold. Component: `<HnchLogo>`.

| File | Shape |
| --- | --- |
| `hnch/logo-{light,dark,green,current}.svg` | Full lockup with the Nature Cure line (1946 × 680) |
| `hnch/hygiene-{light,dark,green,current}.svg` | Same lockup without the Nature Cure line (1946 × 454) |
| `hnch/icon-{light,dark,green,current}.svg` | Symbol only, square (305 × 305) |

`light` is white (`#FFFFFF`) for dark grounds. `dark` is `#1C1A1D` for light grounds. `green` is `#0A481E`, the hospital's own green, for light grounds.

## Rosette pattern

The rosette is a **band on one edge of a surface, never a wash**. Rules are in root [`SKILL.md`](../SKILL.md) §2, [`tokens/pattern.css`](../tokens/pattern.css) and [`guidelines/brand-pattern.html`](../guidelines/brand-pattern.html). Use `PatternPanel` or `.shantara-pattern-band`. Do not hand-place these files.

| File | What it is | Use |
| --- | --- | --- |
| `pattern-unit.png` | 530 × 530 seamless repeat cell: eight-petal rosettes and crossed squares, black line on transparent | The CSS mask behind every band (`--pattern-unit`). The colour comes from `--pattern-ink`, not from the file. Size it square at half the band's cross-axis |
| `pattern-unit-light.png` | Same cell drawn in Merino line on transparent | `--pattern-unit-light`, where a background image is needed instead of a mask, on dark grounds or over photography |
| `pattern-motif.png` | One rosette inside a diamond, 534 × 534, dark line on transparent | A single ornament (stamp, divider, end mark). **Never tile it.** It is not the repeat unit |
| `pattern-seamless.png` | The original brand-guideline swatch, 4008 × 1258, dark line on transparent | `--pattern-swatch` for showing the pattern in guidelines. Do not use it to build bands |
