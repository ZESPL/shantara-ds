# Shantara — website kit

Builder notes and thin samples for the public marketing website. **Not a production site.** Content in the samples comes from the Property Handbook (draft, July 2026). Photography is the property shoot.

## Skills (canonical)

| File | Role |
| --- | --- |
| [`SKILL.md`](SKILL.md) | Agent skill — how to build and review the marketing website |
| [`skill-stack.md`](skill-stack.md) | Production stack for shantara.life (Astro, Keystatic, Netlify, …) |
| [`skill-images.md`](skill-images.md) | Image storage, compression, widths and checks for shantara.life |
| [`skill-og-images.md`](skill-og-images.md) | Share images (Open Graph): templates, metadata, build-time generation, checks |
| [`skill-premium.md`](skill-premium.md) | Premium design, deck-derived design-system rules, responsive rules, motion |
| [`skill-ia.md`](skill-ia.md) | Nav, URL families, page inventory |
| [`skill-sections.md`](skill-sections.md) | Heroes, semantic sections → components, tiles |
| [`skill-content.md`](skill-content.md) | CMS, publishing, leads, E-E-A-T |
| [`skill-copy.md`](skill-copy.md) | Public-facing language |
| [`skill-technical.md`](skill-technical.md) | Analytics, SEO, schema, a11y |
| [`skill-qa.md`](skill-qa.md) | Workflow and QA |
| [`special-pages.md`](special-pages.md) | Special pages sent by link, with no kit sample. Hosted visits is the first. |

Internal ICP and marketing-audience strategy: [`docs/icp.md`](../../docs/icp.md). Need-led, not programme-led. Do not copy that file onto the public site.

In the catalog, open `index.html` for the sample, then the Website kit cards for the skills above.

Welnez is the former name. Use **Shantara** in all new public copy.

Primary visitor-facing action: **Book a Consultation**. This kit holds no rates, currencies or validity dates. [`content/tariff.json`](../../content/tariff.json) holds the tariff structure, and the tariff card (`screens/TariffScreen.js`) shows it with “—”. Production rates live only in the Keystatic tariff.

Entity facts for kit screens: [`content/`](../../content/) (load `content/kit.js` → `window.ShantaraContent`). After editing facts, edit `content/` only. Screens compose `components/sections/` and `components/editorial/`. After editing `components/**`, rebuild `_ds_bundle.js` with `node scripts/build-bundle.mjs` (components only — never for copy).

## Sample file map

```text
../../content/          ← entity JSON + generated kit.js
index.html
README.md
SKILL.md
skill-*.md
locales.js              ← central locale architecture (root locales.js is a shim)
chrome/Photo.js
chrome/SiteChrome.js
screens/*Screen.js
rtl-fixture.html
```

| File | Surface |
| --- | --- |
| `chrome/SiteChrome.js` | Header over every page: logo, five centred nav items (Programmes, Conditions, Experience, About, Journal), LanguageSelector, phone dropdown (Call / WhatsApp / Email; call and WhatsApp numbers are separate fields, both currently +91 9553 600 100), Book a Consultation; menu sheet under 1000px holds the nav, contact lines and LanguageSelector. Breakpoints are container queries so text size lg/xl (html `zoom`) re-lays the header. Footer: Pine Tree ground, rosette strip, brand + NAP "Shantara Naturopathy Retreat" and social profile links, three link columns (accordions under 760px), bottom bar with the copyright (legal entity, Metropolis Forward LLP), the Privacy and Terms links and the short location line. The text-size control is optional; the kit shows one, the production footer does not include it. `PageSlot` wraps every page section with `data-ds-id="page/<view>/<slot>"` |
| `chrome/Photo.js` | Adapter over the `Media` primitive for `assets/photos/*` (square-cut, ratio, `mobileRatio`, scrim) |
| `screens/HomeScreen.js` | Full-bleed hero, approach, doctors, programme tiles + index, therapies, rooms, journal, FAQ (no ClosingCTA — the hero carries the CTA) |
| `screens/ConditionsScreen.js` | Condition listing — visual groups only |
| `screens/ProgrammeScreen.js` | Detox programme sample |
| `screens/ExperienceScreen.js` | What a stay includes |
| `screens/AboutScreen.js` | Story, approach, doctors, policy |
| `screens/JournalScreen.js` | Journal index — Tabs, 3-up Tile grid, Pagination |
| `screens/ArticleScreen.js` | One Journal article at `#/en/journal/<slug>` (ArticleHeader, Prose, TableOfContents, ReviewedBy, ShareBar, AuthorCard, RelatedArticles, compact ClosingCTA). The body and reviewer are kit samples, marked in code |
| `screens/ContactScreen.js` | Location and directions |
| `screens/ConsultationScreen.js` | One short consultation form |
| `screens/TariffScreen.js` | Dedicated tariff card — only surface that quotes rates |

Locale config: `locales.js` (`window.ShantaraLocales`). Shared UI strings: root `i18n.js`. Sample routing uses locale-prefixed hashes (`#/en/`, `#/en/programs`).

**Deliberately not built in this kit:** individual condition pages; therapy and room pages (production has one page each for all therapies and all rooms); Keystatic/Astro app wiring; production analytics/SEO endpoints; multiple forms; stay-total calculators; translated AR/DE/FR/RU/HI/ML website content. Production stack lives in [`skill-stack.md`](skill-stack.md).

## Confirm before any real use

The tariff sample holds no rates, currencies or validity dates — production rates live only in the Keystatic tariff. Also confirm the Monday-intake convention and monthly cap presentation, programme durations (indicative), and journal copy written for this kit rather than supplied.

The programme name “Diabetes Reversal” is approved for catalogue use; do not present reversal as a guaranteed outcome or invent rates.
