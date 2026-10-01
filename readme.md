# Shantara Design System

**Shantara Naturopathy Retreat** is a clinical naturopathy retreat on a hilltop above the Chennamangallur valley in Kozhikode, Kerala. It is the evolution of Hygiene Nature Cure Hospital, which has treated more than 25,000 people since 2000. Treatment is drug-free, doctor-guided and planned after consultation and assessment. Programme duration depends on the programme and the guest. Do not treat a single night count as a site-wide public policy unless Shantara has confirmed it for that programme.

The identity is built from one typeface (Diodrum Cyrillic), a deep olive/gold primary pair, a warm neutral field of stone and linen tones, six landscape accents, and a single ornamental asset: a sacred-geometry rosette pattern derived from the plumeria mark.

Foundations (colour, type, logo, pattern, voice, imagery, print) are **verbatim from the brand guidelines**. Components and UI kits are **extrapolations** in the brand's language — no product code, Figma file or live site was supplied — but all *content* in them now comes from the Property Handbook rather than invention.

## Sources given

| Source | Notes |
| --- | --- |
| `uploads/Compressed/Frame 1–5.jpg` | The five brand-guideline pages as images. **Read** — logo story, pattern structure, colour palette, tone of voice, typography, logo colourways, print rules, product applications, imagery direction. |
| `uploads/Compressed/TRD*.jpg` (45 frames) | The property shoot. Organised in flat `assets/photos/` (kit slugs + descriptive frames, retina-sized). |
| `uploads/Primary Colors.jpg`, `colors secondary.jpg`, `accent colors.jpg` | Colour boards. Hexes read from the labels; three mislabels corrected by sampling (below). |
| `uploads/Shantara - Full logo / Icon / wordmark` (.svg ×4 each, .pdf) | The numbered SVG copies are byte-identical monochrome artwork with no fill declared. Copied in and re-coloured programmatically into four brand tones. |
| `uploads/Pattern Single Tile.png`, `Pattern Seamless_SCALE ACCORDINGLY.png`, `pattern LOW Q White/Black.png` | Rosette artwork. The repeat cell was measured out of the seamless file — see the pattern guideline card. |
| `uploads/DiodrumCyrillic-*.ttf` (6 weights) | Shipped as-is in `assets/fonts/`. No substitution needed. |
| `uploads/Shantara_Brand Guidelines HQ.pdf` | Superseded by the page images. Not parsed. |

## On-record corrections

Keep these here so they are not buried only in guideline cards:

- **Ocean / Clay / Lavender.** The guideline deck printed `#3B6B7B` under Ocean, Clay **and** Lavender. Sampled from artwork instead: Ocean `#A0B1BB`, Clay `#E0A198`, Lavender `#C6C2D1`.
- **Icon set.** The brand package ships **no icon set**. Stand-in: **Lucide** (`lucide-static@0.544.0`), flagged for review. Render through `Icon` as CSS masks. **No emoji.**
- **`[TO CONFIRM]`.** Timings and the built-up area in the handbook stay marked until Azhar / Dr. P.A. Kareem / Dr. Bahja Janu confirm them. The handbook is evergreen and carries no rates; [`docs/handbook.txt`](docs/handbook.txt) is the canonical handbook text.
- **Clear-space and minimum-size numbers** in `guidelines/logo.html` are conventions consistent with the guideline artwork, not quoted brand law.

Voice, colour, type, pattern, motion, corners, cards, imagery, print, and accessibility live on the matching **Brand** and **Foundations** catalog cards. Public website language has one source: `ui_kits/website/skill-copy.md`, browsed as `docs/website-copy.html`. Do not restate those chapters here. Live contrast audit: `guidelines/accessibility.html`.

## Two ways to use this

Browse it. Copy it into another repo. Full walkthrough: `docs/use.md` (also a card in the catalog).

```
npx --yes serve -l 4173
```

Then open `http://localhost:4173`. Netlify publishes a `dist/` copy; raw `uploads/` stay local. Copy this entire folder to `.cursor/skills/shantara-design/` (or keep it at the repo root) when using it as a skill — do not pick files out.

## File map

```
styles.css              → the single entry point consumers link (imports only)
tokens/                 → fonts, colors, typography, spacing, radius, elevation, motion, pattern, base; layout.css (grounds, container, grid, section rhythm)
assets/                 → logo / icon / wordmark in 4 colourways each, pattern cell + motif, Diodrum TTFs
assets/photos/          → property + doctor photos (flat; see assets/photos/README.md)
guidelines/             → specimen cards (Brand, Foundations)
components/             → core, forms, navigation, feedback, editorial, sections — jsx, d.ts, prompt.md; catalog pages via docs/component.html?c=
scripts/build-bundle.mjs → rebuilds _ds_bundle.js from components/ (see its header for Babel)
docs/                   → use, orientation, skill wrappers, handbook, ICP, sources
scraps/                 → working extracts (not published)
uploads/                → original boards, handbook .docx, raw shoot (local; not published)
ui_kits/website/        → marketing site kit + website skill (`SKILL.md`) and copy skill (`skill-copy.md`); locales.js
ui_kits/app/            → in-stay guest companion kit
templates/brand-deck/   → presentation template
templates/og-images/    → share-image (Open Graph) renderer and samples
templates/icons/        → favicon, touch icon, install icons and web manifest build
thumbnail.html          → homepage tile
SKILL.md                → Agent-Skills wrapper — drop this folder into another repo
```

### Components

**core** — `Button`, `IconButton`, `Icon`, `Logo`, `Card`, `Badge`, `Tag`, `Divider`, `PatternPanel`
**forms** — `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`
**navigation** — `Tabs`, `Breadcrumbs`, `Accordion`, `LanguageSelector`
**feedback** — `Dialog`, `Toast`, `Tooltip`, `Spinner`
**editorial** — `Media`, `Eyebrow`, `Statement`, `Numeral`, `TextLink`, `Tile`, `NumberedSteps`, `PlainList`, `GroupedList`, `SpecTable`, `TimeTable`, `QuoteBlock`, `PortraitFrame`
**sections** — `Section`, `HeroFullBleed`, `HeroStatement`, `SplitSection`, `BandStatement`, `PanoramaCaption`, `PeopleRow`, `NumeralsSplit`, `TileGrid`, `IndexList`, `ClosingCTA`, `FormSplit`

Each directory holds `<Name>.jsx`, `<Name>.d.ts` (props contract) and `<Name>.prompt.md`, plus one `@dsCard` HTML showing the family's states. Editorial and sections are the website's building blocks, drawn from the brand deck; `Card` is for forms and dialogs only. Rules: `ui_kits/website/skill-premium.md`. Per-component catalog pages: `docs/component.html?c=Button`.

**Intentional additions.** The brand package defines no component inventory, so this is a standard set sized to the brand's needs. Brand-specific entries: `Icon` (Lucide stand-in), `PatternPanel` (only sanctioned rosette placement), `LanguageSelector` (website locale control; hidden while only `en` is enabled), and `Spinner` (breathing three-dot, not a rotating ring).

### UI kits

- `ui_kits/website/` — builder skill plus thin samples. Primary CTA is *Book a Consultation*. Public copy follows `skill-copy.md`. The tariff sample shows structure only; this folder holds no rates. Locale architecture: `ui_kits/website/locales.js` (root `locales.js` is a shim).
- `ui_kits/app/` — in-stay guest companion, 390×844.

### Templates

- `templates/brand-deck/` — presentation template in the guideline-deck style. Deck design rules: `.cursor/skills/shantara-premium-presentations/SKILL.md`.
- `templates/og-images/` — reference renderer and samples for the three website share-image templates. Standard: `ui_kits/website/skill-og-images.md`.
- `templates/icons/` — builds the website's favicon, touch icon, Android install icons and web manifest from the frangipani mark. Standard: `ui_kits/website/skill-icons.md`.

## Caveats

1. **No product UI or copy deck was supplied.** Both kits are extrapolations. The handbook never mentions a guest app; if there is no app, that kit is a proposal.
2. **Rates are not stored here.** Rates, currencies and validity dates live only in the shantara.life Keystatic tariff. When a rate changes, nothing in this folder changes. Timings in the handbook stay marked `[TO CONFIRM]` until confirmed.
3. **Ocean / Clay / Lavender hexes were sampled**, not read, because the source printed the same value for all three.
4. **Programme durations in the kits are indicative.** Do not present a single night count as a site-wide public policy.
5. **Journal copy is written for these kits**, not supplied.
6. **Lucide stands in for a real icon set.**
7. **Clear-space and minimum-size numbers** in `guidelines/logo.html` are conventions — confirm or correct.
8. `Welnez Pattern.ai` was named in an earlier brief but is not on disk; the name suggests a sibling brand ("Welnez") — unexplored.
