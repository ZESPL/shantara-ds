# `assets/photos/` — agent index

Flat folder. No subfolders. `Photo` / content `photo` fields use the **filename without `.jpg`**. For any other extension (`.jpeg`, `.png`, `.webp`), pass the full filename including the extension.

Most kit defaults are short slugs (`lobby`, `dining`, `arrival-dusk`, …). Extra frames use longer descriptive names. Prefer short slugs unless you need a specific alternate angle.

Web size: property shoot frames are **2880px on the long edge** (retina-ready). Activity & lifestyle frames are **2880px wide** in both orientations (portraits are 2880×4320). `library.jpg` remains the earlier 1600px kit frame (no replacement in the new shoot).

## Kit defaults (keep these for samples)

`arrival-dusk` · `balcony` · `corridor` · `courtyard` · `dining` · `exterior-day` · `grounds` · `library` · `lobby` · `lounge` · `reception` · `room-premium` · `room-twin` · `treatment` · `valley` · `water-wall`

## Doctors

Full seated studio shots (`*-portrait.jpg`, 1920×2880) and matching square close-ups (`*-portrait-cropped.jpeg`, 1280×1280, head-and-shoulders, same crop for every doctor).

| Portrait (full) | Close-up (square) | Who |
| --- | --- | --- |
| `doctor-bahja-janu-portrait` | `doctor-bahja-janu-portrait-cropped.jpeg` | Dr. Bahja Janu (Medical Director; content id `bahja-janu`) |
| `doctor-pa-kareem-portrait` | `doctor-pa-kareem-portrait-cropped.jpeg` | P.A. Kareem (Founder; content id `pa-kareem`). |
| `doctor-gangrei-gangmei-portrait` | `doctor-gangrei-gangmei-portrait-cropped.jpeg` | Dr. Gangrei Gangmei |
| `doctor-keerthana-portrait` | `doctor-keerthana-portrait-cropped.jpeg` | Dr. Keerthana |
| `doctor-sara-portrait` | `doctor-sara-portrait-cropped.jpeg` | Dr. Sara |

Use `photo` for editorial / full portraits; use `photo_profile` for avatars, team grids, doctor pages and share images. `photo_profile` names the passport headshot and keeps the `.jpeg` extension (e.g. `doctor-bahja-janu-passport.jpeg`).

Every doctor has a passport headshot (`doctor-*-passport.jpeg`, 1072×1280, head and shoulders, face centred, top of head about 5% from the top edge). It is the public profile photo. P.A. Kareem's is a separate white-background sitting. The other four are cropped from the seated studio portrait, so they keep the grey studio backdrop. The square studio crops remain in the folder for the seated portrait series.

| Passport (`photo_profile`) | Who |
| --- | --- |
| `doctor-bahja-janu-passport.jpeg` | Dr. Bahja Janu |
| `doctor-pa-kareem-passport.jpeg` | P.A. Kareem |
| `doctor-gangrei-gangmei-passport.jpeg` | Dr. Gangrei Gangmei |
| `doctor-keerthana-passport.jpeg` | Dr. Keerthana (content id `keerthana-v-s`) |
| `doctor-sara-passport.jpeg` | Dr. Sara (content id `sara-shanti-alen`) |

## Board

Board portraits (`board-*.jpeg`, extension kept). Names and roles come from handbook §3 ([Founder & Ownership](../../docs/handbook/founder.md)); there is no content record for the board.

| Portrait | Who |
| --- | --- |
| `board-abdulla-aboobacker.jpeg` | Abdulla Aboobacker, Board Member (1014×1280, waist-up, blurred office backdrop) |

## Extra property frames (by prefix)

| Prefix | Use for |
| --- | --- |
| `room-bedroom-*` | Alternate bedroom angles |
| `suite-living-*` | Suite living + balcony |
| `dining-*` | Restaurant alternates / table detail |
| `reception-*` / `lobby-*` | Reception & waiting |
| `lounge-*` | Lounge alternates |
| `balcony-*` / `terrace-*` | Balcony / café terrace |
| `courtyard-*` / `water-wall-*` / `grounds-*` / `patio-*` | Courtyard, water, grounds |
| `exterior-*` | Façade & dusk arrival alternates |
| `treatment-*` | Therapy / bath corridor / waiting |
| `activity-hall-*` | Yoga / multi-purpose hall |

## Activity & lifestyle frames (by prefix)

Names follow `category-subject-setting-variant-orientation-ratio`. Every file ends in either `-landscape-3x2` (2880×1920) or `-portrait-2x3` (2880×4320), so pick by suffix when a layout needs a fixed crop. Near-duplicate frames differ by a framing word (`wide`, `medium`, `tight`, `close-up`, `overhead`, `dark-frame`), not a number.

| Prefix | Use for | Therapy page (`content/therapies/`) |
| --- | --- | --- |
| `yoga-asana-*` | Postures: cobra, child's pose, kneeling and standing stretches | `yoga-therapy` |
| `yoga-pranayama-*` | Breathing, incl. alternate-nostril; studio and courtyard pond | `yoga-therapy` |
| `yoga-meditation-*` | Seated / kneeling meditation; studio, courtyard pond, aerial cobblestone | `yoga-therapy`, `mind-body-therapy` |
| `massage-head-*` / `massage-face-*` / `massage-foot-reflexology-*` | Head, face and foot massage | `massage-therapy` |
| `acupuncture-*` | Facial acupuncture | `acupuncture` |
| `physiotherapy-*` | Mobility assessment, electrotherapy | `physiotherapy` |
| `consultation-*` | Doctor consultation at a desk | — |
| `grounds-*` | Walks, garden paths, textured walls, courtyard deck, pebble path | — |
| `leisure-*` | Balcony valley view, pergola terrace, garden swing, water-wall lounge | — |
| `detail-*` | Uniform and brand details | — |

`grounds-*` also covers the older property frame `grounds-pond-building-path`, which has no orientation suffix.

## Privacy

Prefer frames **without** `-guest` for public marketing. Doctor portraits are intentional for About / Meet the doctors. See handbook guest-privacy rules and `ui_kits/website/chrome/Photo.js`.

Almost every activity & lifestyle frame carries `-guest`. The exceptions are hands-and-feet close-ups (`massage-foot-reflexology-*`, `physiotherapy-electrotherapy-electrode-*`), `grounds-pebble-path-*` and `detail-*`.
