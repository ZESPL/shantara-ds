# Sources

The original brand pack lives in `uploads/`. Claude Design read it, curated what the system needs into `assets/`, and left working extracts in `scraps/` / `docs/`. This page is the inventory. The raw pack is gitignored and not published; if you are browsing this folder locally, the probes below show what is still on disk.

## Brand pack (`uploads/`)

| Source | What it is | What the system took |
| --- | --- | --- |
| `uploads/Compressed/Frame 1–5.jpg` | Five photographed guideline spreads | Voice, pattern, palette, type, colourways, print, imagery — written into `readme.md` and the guideline cards |
| `uploads/Shantara_Brand Guidelines HQ.pdf` | Full guideline PDF | Not parsed. The Frame images superseded it |
| `uploads/Compressed/TRD*.jpg` | Property shoot, 45 frames | Merged into flat `assets/photos/` (kit slugs + descriptive alternates, ~2880px long edge) |
| `uploads/Primary Colors.jpg` | Primary colour board | Himalaya, Gold Crayola |
| `uploads/colors secondary.jpg` | Neutral board | Pine Tree through Merino |
| `uploads/accent colors.jpg` | Accent board | Sand, Ocean, Clay, Forest, Sky, Lavender — three hexes sampled, not read |
| `uploads/Shantara - Full logo / Icon / wordmark` | SVG ×4 each, plus PDF | Recoloured into `assets/` lockups |
| `uploads/Pattern Single Tile.png` | Single rosette motif | `assets/pattern-motif.png` — ornament only, never tiled |
| `uploads/Pattern Seamless_SCALE ACCORDINGLY.png` | Seamless repeat | Measured; `assets/pattern-unit.png` is the 530×530 cell |
| `uploads/pattern LOW Q White/Black.png` | Low-resolution pattern proofs | Reference only |
| `uploads/DiodrumCyrillic-*.ttf` | Six weights | `assets/fonts/` as shipped |

On this machine the pack was about **575MB**, almost all of it the raw `TRD` frames.

## Working extracts (`scraps/`)

| File | What it is |
| --- | --- |
| `scraps/handbook.txt` | Superseded plain-text dump. The staff handbook is `docs/handbook.txt` plus one file per section in `docs/handbook/` |
| `scraps/accessibility-contract-src.html` | Earlier contract card. Now folded into `guidelines/accessibility.html` |

## Photos (`assets/photos/`)

Flat folder — see [`assets/photos/README.md`](../assets/photos/README.md).

**Kit defaults:** `arrival-dusk` · `valley` · `courtyard` · `treatment` · `room-premium` · `room-twin` · `balcony` · `dining` · `water-wall` · `library` · `grounds` · `lobby` · `exterior-day` · `reception` · `corridor` · `lounge`

Plus descriptive alternates (rooms, dining, exteriors, treatments, etc.) and doctor photos (`doctor-*-portrait` full; `doctor-*-profile` square close-up). Prefer frames without `-guest` for public marketing. No room numbers.

## Parent hospital mark

Hygiene Nature Cure Hospital does not have a vector logo in the brand pack. The files in `assets/hnch/` were traced on 17 October 2026 from the rasters wrapped as SVG on [hygienecure.com](https://www.hygienecure.com/): the header and footer lockup (`/frontend/images/logo.svg`) and the mark (`/frontend/images/logo-icon.svg`). The published artwork is white. `dark`, `green` and `current` are placement fills of that same drawing. The card is [`guidelines/hnch-logo.html`](../guidelines/hnch-logo.html). This is not the Shantara lockup.

## Still open

- Ocean / Clay / Lavender hexes were sampled because the accent board printed the same value for all three.
- Handbook items still marked `[TO CONFIRM]`.
- `Welnez Pattern.ai` was named in an earlier brief and is not on disk.
