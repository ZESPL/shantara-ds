# `assets/photos/` — agent index

Every photograph in this folder has been looked at and described, so you can choose one **without opening the image**. Logos, lockups and the rosette pattern are indexed in [`../README.md`](../README.md).

## How to use this index

1. Start with [Pick by job](#pick-by-job). It shortlists frames for common jobs, all cleared for public use.
2. To compare more frames, scan the [Index](#index): one row per photo, grouped by subject, with its shape, public-use status, setting and light.
3. For the full entry on one photo, search [`CATALOGUE.md`](CATALOGUE.md) for `#### <filename>`. Do not read the whole catalogue: it is large. Each entry gives what the frame shows, who is in it, the light and palette, where the subject sits, **where text can go and whether it needs a scrim**, which crops hold (with an `object-position`), mood, best uses, cautions such as signage or near-duplicates, and which `content/` records use it.
4. Open the image itself only to check a detail the entry flags as uncertain.

Describe a photo in alt text and copy from what it shows, not from its filename. Several filenames are wrong ([Known issues](#known-issues)).

## Passing a photo in code

Flat folder, no subfolders. `Photo` and content `photo` / `featured_image.src` fields take the **filename without `.jpg`**. For any other extension (`.jpeg`, `.png`, `.webp`), pass the full filename including the extension. The index and catalogue show the exact value to pass in backticks.

Property frames are 2880px on the long edge. Activity and lifestyle frames are 2880×1920 (`-landscape-3x2`) or 2880×4320 (`-portrait-2x3`). The catalogue lists the real size of every file. Smaller files are listed under [Known issues](#known-issues).

## Public use

Every entry carries one status, set from the privacy rules (root [`SKILL.md`](../../SKILL.md) §3, [`guidelines/brand-imagery.html`](../../guidelines/brand-imagery.html)): guests are never identifiable, no faces in therapy, no room numbers, imagery never shows treatment in progress.

| Status | Meaning | Count |
| --- | --- | --- |
| **Yes** | No identifiable guest and no treatment in progress. Fine for the website, decks and social. Doctor and board portraits are **Yes** for their own person. | 102 |
| **Check** | An identifiable face (guest, model or staff), or a detail such as possible room numbers. Use only once a signed release is confirmed or the detail is cropped out. Otherwise pick a **Yes** frame. | 39 |
| **Avoid** | Treatment in progress (massage, acupuncture, physiotherapy). Not for public marketing. Internal or training material only. | 20 |

"`-guest`" in a filename means a person appears, not that the face can be seen. Many `-guest` frames are **Yes** (back to camera, distant, face out of frame). Some frames without `-guest` are **Check** or **Avoid**. Go by the status, not the filename.

## Pick by job

All frames here are **Yes**. Read the catalogue entry before placing type, so the text lands in the frame's calm area.

| Job | First choice | Alternatives | Notes |
| --- | --- | --- | --- |
| Home or page hero, landscape | `exterior-entrance-dusk-lit-canopy` | `arrival-dusk`, `lounge-double-height-valley-guest`, `balcony-lounge-stump-table-valley`, `terrace-cafe-wave-ceiling-valley` | Dusk frames suit a dark ground. `terrace-cafe-wave-ceiling-valley` has a full-height plain wall on the left for type |
| Hero, portrait or mobile crop | `valley` | `exterior-cobblestone-patio-valley-guest`, `balcony-lounge-infinity-edge-valley`, `room-premium`, `grounds-garden-wall-wide-textured-wall-guest-portrait-2x3` | Each has sky or a plain wall in the upper half |
| Large calm area for a headline | `grounds-garden-wall-wide-textured-wall-guest-portrait-2x3` (wall) | `exterior-entrance-dusk-suv` (sky; a parked SUV at right), `grounds` (sky, upper left), `dining-table-two-chairs` (wall), `leisure-water-wall-lounge-golden-hour-reading-guest-landscape-3x2` (dark wall, upper left) | Type over photography still sits inside `--scrim-hero` or a glass capsule |
| Arrival, getting here | `exterior-day` | `exterior-entrance-dusk-driveway`, `arrival-dusk`, `lobby`, `reception-desk-small-window` | `exterior-day` and the dusk frames show the SHANTARA sign |
| Rooms | `room-bedroom-forest-view-armchair` | `room-bedroom-balcony-open-book`, `room-bedroom-desk-balcony-view`, `room-premium`, `room-twin` | `room-twin` shows one double bed, not twin beds. Match the frame to the room type it really shows |
| Suites | `suite-living-balcony-empty` | `suite-living-balcony-guest-looking-out` | The pair are near-duplicates. Use one per page |
| Balconies and views | `balcony-lounge-stump-table-valley` | `balcony-lounge-infinity-edge-valley`, `balcony`, `valley` | `valley` is the lounge window, not an outdoor view |
| Restaurant | `dining-restaurant-valley-window` | `dining`, `dining-table-set-detail`, `dining-table-two-chairs`, `terrace-cafe-wave-ceiling-valley`, `terrace-cafe-fabric-ceiling-wide` | `dining` needs a scrim. The ceiling is busy |
| Food, grid of single plates | The `food-*-restaurant-portrait-2x3` set | — | Eight frames shot the same way (one plate, white table corner, green chairs), so they sit well together in a 3-up or 4-up grid |
| Food, one wide image | `food-spread-five-plates-restaurant-wide-landscape-3x2` | `food-spread-red-rice-soup-garden-wide-landscape-3x2`, `food-spread-three-plates-garden-wide-landscape-3x2` | Never turn a filename into a dish name or health claim. Meals are planned by the doctor (handbook §11) |
| Therapy pages | `treatment` (empty room) | `treatment-bath-corridor-cubicles`, `treatment-waiting-nook-lockers`, `activity-hall-yoga-studio-empty` | Show rooms, not treatment. `treatment-bath-corridor-cubicles` shows "Hip bath" door signs |
| Yoga | `yoga-asana-balasana-childs-pose-studio-guest-landscape-3x2` | `yoga-meditation-aerial-cobblestone-circle-cross-legged-guest-landscape-3x2`, `activity-hall-yoga-studio-empty`, `detail-uniform-kurta-logo-embroidery-portrait-2x3` | Most other yoga frames show a face, so they are **Check** |
| Grounds and nature | `grounds` | `courtyard-pond-architecture`, `grounds-hillside-path-walking-guest-landscape-3x2`, `grounds-pebble-path-barefoot-walking-landscape-3x2`, `water-wall`, `leisure-pergola-terrace-reading-guest-landscape-3x2` | `grounds-pond-building-path` shows a neighbouring building and power lines |
| Doctor avatar, card, byline, share image | `doctor-*-passport.jpeg` (`photo_profile`) | `doctor-*-portrait-cropped.jpeg` for a square grid | See [Doctors](#doctors). The founder is not a doctor: his `founder-*` photographs never go in a doctors row ([Board](#board)) |
| Doctor profile page | `doctor-*-portrait` (`photo`) | — | Seated, grey studio backdrop, room for type beside the figure |
| Share-image background | `exterior-entrance-dusk-lit-canopy` | `balcony-lounge-stump-table-valley`, `lounge-double-height-valley-guest`, `terrace-cafe-wave-ceiling-valley` | Share images are generated from the page hero ([`skill-og-images.md`](../../ui_kits/website/skill-og-images.md)) |

**One photo per job, and no near-duplicates on one page.** Catalogue entries name each frame's near-duplicates under Cautions.

## Known issues

These were found by looking at every frame. Trust the catalogue over the filename.

| File | Issue |
| --- | --- |
| `library.jpg` | No library. It shows a waiting corner (wooden armchair and bench, framed print) beside bath cubicles labelled "Special bath". It is the same nook as `treatment-waiting-nook-lockers.jpg`. Used as the featured image of `programs/executive-wellness`. It is also 1600×1067, smaller than the rest |
| `treatment-waiting-nook-lockers.jpg` | The white units are bath cubicles with door labels, not lockers |
| `room-twin.jpg` | One double bed, not twin beds. Used by `rooms/premium-room` and `rooms/standard-room` |
| `valley.jpg` | An interior lounge looking through a window at the valley, not an open landscape |
| `yoga-meditation-aerial-cobblestone-circle-knees-up-guest-landscape-3x2.jpg` | The person sits hugging her knees. It is not a meditation posture |
| `food-*-overhead-*` | Several are a high angle, not true top-down |
| `founder-pa-kareem-portrait.jpg`, `founder-pa-kareem-portrait-cropped.jpeg` | 1086×1448 and 903×903. Keep to card or column size, not a full-bleed hero. He is the founder and chairman, not a doctor, so he wears a white shirt, not a coat and stethoscope. His passport photo is a different sitting (white backdrop, suit) |
| `board-abdulla-aboobacker.jpeg` | 1014×1280, office backdrop. Does not match the grey studio set |
| Legible brand names | `treatment.jpg` (a tissue box), `consultation-doctor-at-desk-with-guest-landscape-3x2.jpg` (a monitor logo), `physiotherapy-electrotherapy-session-treatment-table-guest-landscape-3x2.jpg` (a gel bottle label). Crop or avoid in large use |

## Kit defaults (keep these for samples)

`arrival-dusk` · `balcony` · `corridor` · `courtyard` · `dining` · `exterior-day` · `grounds` · `library` · `lobby` · `lounge` · `reception` · `room-premium` · `room-twin` · `treatment` · `valley` · `water-wall`

Most kit defaults are short slugs. Extra frames use longer descriptive names. The catalogue marks kit defaults.

## Doctors

Full seated studio shots (`*-portrait.jpg`) and matching square close-ups (`*-portrait-cropped.jpeg`, head and shoulders, same crop for every doctor). Most portraits are 1920×2880 and most close-ups 1280×1280. Names, roles and credentials come from `content/doctors/` and the glossary ([`docs/handbook/glossary.md`](../../docs/handbook/glossary.md)), never from these files.

| Portrait (full) | Close-up (square) | Passport (`photo_profile`) | Content record |
| --- | --- | --- | --- |
| `doctor-bahja-janu-portrait` | `doctor-bahja-janu-portrait-cropped.jpeg` | `doctor-bahja-janu-passport.jpeg` | `doctors/bahja-janu` |
| `doctor-gangrei-gangmei-portrait` | `doctor-gangrei-gangmei-portrait-cropped.jpeg` | `doctor-gangrei-gangmei-passport.jpeg` | `doctors/gangrei-gangmei` |
| `doctor-keerthana-portrait` | `doctor-keerthana-portrait-cropped.jpeg` | `doctor-keerthana-passport.jpeg` | `doctors/keerthana-v-s` |
| `doctor-sara-portrait` | `doctor-sara-portrait-cropped.jpeg` | `doctor-sara-passport.jpeg` | `doctors/sara-shanti-alen` |

Use `photo` for editorial or full portraits. Use `photo_profile` for avatars, team grids, doctor pages and share images.

Every doctor has a passport headshot (`doctor-*-passport.jpeg`, 1072×1280, head and shoulders, face centred, top of head about 5% from the top edge). It is the public profile photo. Each is cropped from the seated studio portrait, so they keep the grey studio backdrop.

## Board

The founder and chairman's portraits (`founder-*`) and board portraits (`board-*.jpeg`, extension kept). Names and roles come from handbook §3 ([Founder & Ownership](../../docs/handbook/founder.md)). The founder, P.A. Kareem, is not a doctor; his record is `content/leadership/pa-kareem.json`. There is no content record for the other board members.

| Portrait | Who |
| --- | --- |
| `founder-pa-kareem-passport.jpeg` (`photo_profile`), `founder-pa-kareem-portrait` (`featured_image`), `founder-pa-kareem-portrait-cropped.jpeg` | P.A. Kareem, Founder and Chairman. `leadership/pa-kareem`. Smaller files (see [Known issues](#known-issues)) |
| `board-abdulla-aboobacker.jpeg` | Abdulla Aboobacker, Board Member |

## Filenames

### Property frames, by prefix

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

### Activity and lifestyle frames, by prefix

Names follow `category-subject-setting-variant-orientation-ratio`. Every file ends in either `-landscape-3x2` (2880×1920) or `-portrait-2x3` (2880×4320), so pick by suffix when a layout needs a fixed crop. Near-duplicate frames differ by a framing word (`wide`, `medium`, `tight`, `close-up`, `overhead`, `dark-frame`), not a number.

| Prefix | Use for | Therapy page (`content/therapies/`) |
| --- | --- | --- |
| `yoga-asana-*` | Postures: cobra, child's pose, kneeling and standing stretches | `yoga-therapy` |
| `yoga-pranayama-*` | Breathing, incl. alternate-nostril; studio and courtyard pond | `yoga-therapy` |
| `yoga-meditation-*` | Seated / kneeling meditation; studio, courtyard pond, aerial cobblestone | `yoga-therapy`, `mind-body-therapy` |
| `massage-head-*` / `massage-face-*` / `massage-foot-reflexology-*` | Head, face and foot massage | `massage-therapy` |
| `acupuncture-*` | Facial acupuncture | `acupuncture` |
| `physiotherapy-*` | Mobility assessment, electrotherapy | `physiotherapy` |
| `food-*` | Plated meals and juice: single dishes and table spreads in the restaurant (white table, green chairs), on the wood slab table and in the garden | `diet-therapy` |
| `consultation-*` | Doctor consultation at a desk | — |
| `grounds-*` | Walks, garden paths, textured walls, courtyard deck, pebble path | — |
| `leisure-*` | Balcony valley view, pergola terrace, garden swing, water-wall lounge | — |
| `detail-*` | Uniform and brand details | — |

Every `massage-*`, `acupuncture-*` and `physiotherapy-*` frame is **Avoid** for public use, because each shows treatment in progress. For those therapy pages, use the empty rooms under [Pick by job](#pick-by-job).

`grounds-*` also covers the older property frame `grounds-pond-building-path`, which has no orientation suffix.

`food-*` names describe what is on the plate, not a menu: `salad-apple-lettuce`, `salad-beetroot-carrot`, `salad-sprouts-cucumber`, `vegetable-crescent`, `fruit-ring`, `soup-golden`, `juice-purple`, `red-rice-curry-plate`, and `spread-*` for several plates together. Settings are `restaurant`, `wood-table`, `stone-table` and `garden`. Do not turn a filename into a dish name, ingredient or health claim in copy. Meals are planned by the doctor (handbook §11).

## Adding or replacing a photo

1. Name it by the patterns above. Never put a health claim in a filename.
2. Look at it, then add an entry to `CATALOGUE.md` under the right heading, using the same fields as the entries around it, and a row to the [Index](#index) here.
3. If it changes a shortlist, update [Pick by job](#pick-by-job).
4. Production preparation (size, compression, metadata) is in [`ui_kits/website/skill-images.md`](../../ui_kits/website/skill-images.md).

## Index

Shape is the file's own orientation and ratio. Public is the status explained [above](#public-use). Best for lists the first two uses from the catalogue entry.

### Arrival and exterior

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `arrival-dusk` | landscape 3:2 | Yes | exterior / entrance and lobby | dusk with interior lamps, warm against a cool blue sky | full-bleed hero, arrival or location section |
| `exterior-cobblestone-patio-valley-guest` | portrait 2:3 | Yes | exterior (cobblestone viewing patio, valley view) | overcast daylight, cool to neutral | portrait hero on mobile, split-section half |
| `exterior-day` | landscape 3:2 | Yes | exterior (entrance and driveway) | overcast daylight, neutral to cool | arrival or how-to-reach-us section, location page figure |
| `exterior-entrance-dusk-driveway` | landscape 3:2 | Yes | exterior (entrance and driveway) | dusk (blue hour) with interior and path lamps, cool sky and warm lamps | full-bleed hero, arrival section background |
| `exterior-entrance-dusk-lit-canopy` | landscape 3:2 | Yes | exterior (entrance and driveway) | dusk (blue hour) with lamps and uplights, cool sky and warm lamps | full-bleed hero, homepage arrival band |
| `exterior-entrance-dusk-suv` | landscape 3:2 | Yes | exterior (entrance and driveway, road) | dusk (blue hour) with lamps, cool | wide hero with headline over the sky, arrival section |
| `exterior-facade-cobblestone-guest` | landscape 3:2 | Yes | exterior (building facade and cobblestone patio) | overcast daylight, neutral to cool | full-bleed hero, architecture or about section |

### Lobby, reception and lounges

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `library` | landscape 3:2 | Yes | covered seating or waiting corner near cubicles (not a library) | daylight through the block screen and slatted roof, neutral to warm | internal facility documentation, article figure about common spaces |
| `lobby-waiting-bench-guest` | landscape 3:2 | Check | lobby / waiting area | overcast daylight plus warm cove ceiling light, neutral-warm | split-section half, article figure |
| `lobby` | landscape 3:2 | Yes | lobby / reception | overcast daylight from the windows plus warm pendant lamps, neutral with deep shadows | full-bleed hero (light text on the floor), arrival or "the house" section |
| `lounge-double-height-valley-guest` | landscape 3:2 | Yes | lounge | overcast daylight, cool-neutral | full-bleed hero, share-image background |
| `lounge-valley-view-seated-guest` | portrait 5:7 | Yes | lounge | overcast daylight plus warm pendants, neutral-warm | mobile hero, portrait split-section half |
| `lounge` | landscape 3:2 | Yes | lounge / retail nook | daylight plus warm pendants and wall sconces, warm | full-bleed hero, "the house" or common-spaces section |
| `reception-desk-small-window` | landscape 3:2 | Yes | reception (secondary) | interior lamps (linear pendant and drum shade) with dim daylight, neutral-warm | article figure, 3-up tile |
| `reception` | landscape 3:2 | Check | lobby / reception | daylight plus warm linear pendant and logo glow, warm | full-bleed hero, arrival section |

### Rooms and suites

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `room-bedroom-balcony-open-book` | landscape 3:2 | Yes | guest room | overcast daylight, neutral-cool | rooms page hero, split-section half |
| `room-bedroom-desk-balcony-view` | landscape 3:2 | Yes | guest room | overcast daylight, neutral | rooms page card, split-section half |
| `room-bedroom-forest-view-armchair` | landscape 3:2 | Yes | guest room | overcast daylight, cool-neutral | rooms page hero, full-bleed section |
| `room-premium` | portrait 2:3 | Yes | guest room | overcast daylight, neutral | mobile hero for the rooms page, portrait split-section half |
| `room-twin` | landscape 3:2 | Yes | guest room | overcast daylight, cool-neutral | rooms page card, split-section half |
| `suite-living-balcony-empty` | landscape 3:2 | Yes | suite living room | overcast daylight, neutral-warm | suites page hero or card, split-section half |
| `suite-living-balcony-guest-looking-out` | landscape 3:2 | Yes | suite living room + balcony | overcast daylight, neutral | suites page hero, split-section half |

### Restaurant and café terrace

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `dining-restaurant-valley-window` | landscape 3:2 | Yes | restaurant | daylight from the windows plus warm pendants, neutral | dining section, full-bleed hero |
| `dining-table-set-detail` | landscape 3:2 | Yes | restaurant | daylight and interior lamps, warm-neutral | dining section detail, 3-up tile |
| `dining-table-two-chairs` | portrait 2:3 | Yes | restaurant | soft window daylight plus one warm pendant, cool-neutral | portrait hero on mobile, split-section half |
| `dining` | landscape 3:2 | Yes | restaurant | daylight plus warm pendants, neutral | dining section hero, full-bleed hero with scrim |
| `terrace-cafe-fabric-ceiling-wide` | portrait 5:7 | Yes | terrace café | overcast daylight, neutral-cool | mobile hero, portrait split-section half |
| `terrace-cafe-wave-ceiling-valley` | landscape 3:2 | Yes | terrace café | overcast daylight, neutral-cool | full-bleed hero with text on the left wall, restaurant or café section |

### Balconies

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `balcony-lounge-infinity-edge-valley` | portrait 5:7 | Yes | balcony lounge (interior-exterior) | overcast daylight, neutral to cool | portrait hero on mobile, split-section half |
| `balcony-lounge-stump-table-valley` | landscape 3:2 | Yes | balcony | overcast daylight, neutral | full-bleed hero, room or stay section |
| `balcony` | portrait 5:7 | Yes | balcony / terrace | overcast daylight, neutral to cool | portrait hero on mobile, split-section half |

### Courtyard, water wall and patio

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `courtyard-pond-architecture` | portrait 2:3 | Yes | courtyard pond | overcast daylight, neutral | portrait hero on mobile, campus section |
| `courtyard` | landscape 3:2 | Yes | courtyard pond (indoor-outdoor edge) | overcast daylight, neutral to cool | split-section half, campus section |
| `patio-covered-pond-seating` | landscape 3:2 | Yes | courtyard pond / patio | overcast daylight, cool-neutral | split-section half, article figure |
| `water-wall-seated-guest` | landscape 3:2 | Check | water wall terrace / courtyard pond | soft overcast daylight, neutral-cool | full-bleed hero, split-section half |
| `water-wall-seating-foliage-frame` | landscape 3:2 | Yes | water wall terrace / courtyard pond | overcast daylight, dim, cool-neutral | background texture with scrim, 3-up tile |
| `water-wall-standing-guest-foliage` | landscape 3:2 | Yes | water wall terrace / courtyard pond | overcast daylight, dim, cool-neutral | full-bleed hero with scrim, share-image background |
| `water-wall` | portrait 2:3 | Yes | interior seating by water wall (lobby/landing) | daylight from above, cool-neutral | portrait split-section half, social vertical |

### Treatment spaces and halls

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `activity-hall-yoga-studio-empty` | landscape 16:9 | Yes | activity hall / yoga studio (interior) | interior cove lamps plus some daylight from the left doors, warm | facilities section, split-section half |
| `corridor` | landscape 3:2 | Check | room-wing corridor (interior) | interior lamps, neutral to warm against cool grey walls | rooms or stay section, slide background |
| `treatment-bath-corridor-cubicles` | landscape 3:2 | Yes | treatment bath area | daylight through slatted gables plus interior light, warm | article figure, facilities or treatments explainer |
| `treatment-waiting-nook-lockers` | landscape 3:2 | Yes | treatment bath area / waiting nook | daylight through the block screen and glazing, neutral-warm | article figure, 3-up tile |
| `treatment` | landscape 3:2 | Yes | treatment room | interior downlights, neutral-warm | treatments section split-half, article figure |

### Landscape

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `valley` | portrait 2:3 | Yes | lounge with valley view (interior) | overcast daylight, cool-neutral | portrait hero on mobile, split-section half |

### Doctors

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `doctor-bahja-janu-passport.jpeg` | portrait 5:6 | Yes | studio backdrop (grey) | soft studio light, neutral | avatar, doctor card |
| `doctor-bahja-janu-portrait-cropped.jpeg` | square 1:1 | Yes | studio backdrop (grey gradient) | soft studio light, neutral | doctor card, team grid |
| `doctor-bahja-janu-portrait` | portrait 2:3 | Yes | studio backdrop (grey gradient) | soft studio light, neutral | doctor profile page, split-section half |
| `doctor-gangrei-gangmei-passport.jpeg` | portrait 5:6 | Yes | studio backdrop (grey) | soft studio light, neutral | avatar, doctor card |
| `doctor-gangrei-gangmei-portrait-cropped.jpeg` | square 1:1 | Yes | studio backdrop (grey gradient) | soft studio light, neutral | doctor card, team grid |
| `doctor-gangrei-gangmei-portrait` | portrait 2:3 | Yes | studio backdrop (grey gradient) | soft studio light, neutral | doctor profile page, split-section half |
| `doctor-keerthana-passport.jpeg` | portrait 5:6 | Yes | studio backdrop (grey) | soft studio light, neutral | avatar, doctor card |
| `doctor-keerthana-portrait-cropped.jpeg` | square 1:1 | Yes | studio backdrop (grey gradient) | soft studio light, neutral | doctor card, team grid |
| `doctor-keerthana-portrait` | portrait 2:3 | Yes | studio backdrop (grey gradient) | soft studio light, neutral | doctor profile page, split-section half |
| `doctor-sara-passport.jpeg` | portrait 5:6 | Yes | studio backdrop (plain grey) | soft studio light, neutral | avatar, doctor card thumbnail |
| `doctor-sara-portrait-cropped.jpeg` | square 1:1 | Yes | studio backdrop (plain grey), dark chair back visible at the right | soft studio light, neutral | doctor profile header, team grid tile |
| `doctor-sara-portrait` | portrait 2:3 | Yes | studio backdrop (plain grey) | soft studio light, neutral | doctor profile page hero (portrait column), about-page team section |

### Board

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `founder-pa-kareem-passport.jpeg` | portrait 5:6 | Yes | studio backdrop (plain white) | flat frontal light, neutral to cool | avatar, credential or document use |
| `founder-pa-kareem-portrait-cropped.jpeg` | square 1:1 | Yes | studio backdrop (grey gradient) | soft studio light, neutral | board row, avatar |
| `founder-pa-kareem-portrait` | portrait 3:4 | Yes | studio backdrop (grey gradient) | soft studio light, neutral | the founder's profile page, split-section half |
| `board-abdulla-aboobacker.jpeg` | portrait 4:5 | Yes | office interior (corporate portrait) | bright window daylight, neutral to cool | board row on the About page, avatar |

### Consultation

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `consultation-doctor-at-desk-with-guest-landscape-3x2` | landscape 3:2 | Check | consultation room | soft daylight, warm-neutral | consultation or "how it works" section, split-section half |

### Yoga: asana

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `yoga-asana-balasana-childs-pose-studio-guest-landscape-3x2` | landscape 3:2 | Yes | yoga studio | warm daylight through sheer curtains, warm | full-bleed hero with text left, split-section half |
| `yoga-asana-bhujangasana-cobra-studio-guest-landscape-3x2` | landscape 3:2 | Check | yoga studio | warm daylight through curtains, warm | yoga section split-half, 3-up tile |
| `yoga-asana-bhujangasana-cobra-studio-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | warm daylight, warm | portrait split-half, mobile hero |
| `yoga-asana-kneeling-arms-raised-studio-guest-landscape-3x2` | landscape 3:2 | Check | yoga studio | warm daylight, warm | split-section half, yoga programme card |
| `yoga-asana-kneeling-arms-raised-studio-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | warm daylight, warm | mobile hero, social vertical with headline above |
| `yoga-asana-standing-arm-raise-diagonal-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | strong backlight through curtains, warm | pose demonstration figure, how-to article step |
| `yoga-asana-standing-arm-raise-sideways-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | strong backlight, warm | pose demonstration figure, how-to step sequence |
| `yoga-asana-standing-side-bend-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | strong backlight, warm | pose demonstration figure, how-to step sequence |

### Yoga: pranayama

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `yoga-pranayama-alternate-nostril-close-up-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | soft daylight, warm-neutral | breathing/pranayama article figure, programme card |
| `yoga-pranayama-alternate-nostril-courtyard-pond-guest-landscape-3x2` | landscape 3:2 | Check | courtyard pond | overcast daylight, neutral-cool | full-bleed hero, pranayama section split-half |
| `yoga-pranayama-alternate-nostril-courtyard-pond-guest-portrait-2x3` | portrait 2:3 | Check | courtyard pond | overcast daylight, neutral-cool | portrait split-half, social vertical |
| `yoga-pranayama-alternate-nostril-studio-wide-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | strong backlight, warm | social vertical with caption below, mobile hero |
| `yoga-pranayama-instructor-guiding-guest-studio-landscape-3x2` | landscape 3:2 | Check | yoga studio | backlit daylight through curtains, warm, slightly dim interior | split-section half on guided practice, programme detail figure |

### Yoga: meditation

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `yoga-meditation-aerial-cobblestone-circle-cross-legged-guest-landscape-3x2` | landscape 3:2 | Yes | paved courtyard / exterior | soft daylight, neutral-warm | full-bleed hero with text right, share-image background |
| `yoga-meditation-aerial-cobblestone-circle-knees-up-guest-landscape-3x2` | landscape 3:2 | Yes | paved courtyard / exterior | soft daylight, neutral-warm | full-bleed hero, share-image background |
| `yoga-meditation-courtyard-pond-deck-medium-guest-landscape-3x2` | landscape 3:2 | Check | courtyard pond | overcast daylight, neutral-cool | split-section half, meditation programme card |
| `yoga-meditation-courtyard-pond-deck-wide-guest-landscape-3x2` | landscape 3:2 | Check | courtyard pond | overcast daylight, neutral-cool | full-bleed hero, share-image background |
| `yoga-meditation-cross-legged-studio-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | soft daylight from curtains, warm-neutral | portrait split-half, meditation programme card |
| `yoga-meditation-cross-legged-studio-window-centred-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | backlit daylight, warm | portrait hero on mobile, meditation card |
| `yoga-meditation-cross-legged-studio-window-wide-guest-landscape-3x2` | landscape 3:2 | Check | yoga studio | backlit daylight, warm | full-bleed hero, slide background |
| `yoga-meditation-eyes-closed-close-up-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | soft diffused daylight, neutral-cool | article figure, testimonial-style portrait tile |
| `yoga-meditation-vajrasana-kneeling-studio-guest-landscape-3x2` | landscape 3:2 | Check | yoga studio | warm daylight, warm | full-bleed hero, split-section half |
| `yoga-meditation-vajrasana-kneeling-studio-guest-portrait-2x3` | portrait 2:3 | Check | yoga studio | warm daylight, warm | mobile hero, social vertical with headline above |

### Massage

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `massage-face-eyes-temples-close-up-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | low warm lamp light, warm | article figure, portrait split-section half for a treatments page |
| `massage-face-forehead-close-up-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | low warm lamp light, warm | article figure, portrait split-section half |
| `massage-foot-reflexology-over-shoulder-portrait-2x3` | portrait 2:3 | Avoid | treatment room | low warm lamp light, warm | article figure, portrait split-section half |
| `massage-foot-reflexology-sole-close-up-portrait-2x3` | portrait 2:3 | Avoid | treatment room | warm lamp light, warm | 3-up tile, article figure |
| `massage-foot-reflexology-therapist-side-view-landscape-3x2` | landscape 3:2 | Avoid | treatment room | daylight from the glass blocks plus warm ambient light, neutral-warm | split-section half, article figure |
| `massage-foot-reflexology-toes-close-up-landscape-3x2` | landscape 3:2 | Avoid | treatment room | warm lamp light, warm | 3-up tile, card image |
| `massage-head-guest-face-therapist-behind-portrait-2x3` | portrait 2:3 | Avoid | treatment room | low warm lamp light, warm | portrait split-section half, article figure |
| `massage-head-scalp-close-up-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | low warm lamp light, warm | article figure, 3-up tile |
| `massage-head-scalp-overhead-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | low warm lamp light, warm | article figure, portrait split-section half |
| `massage-head-therapist-beside-table-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | warm lamp light, warm | portrait split-section half, team or practice section (with consent) |
| `massage-head-therapist-hands-in-hair-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | low warm lamp light, warm, slightly dimmer than its pair | portrait split-section half, article figure |

### Acupuncture

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `acupuncture-facial-needle-placement-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | soft daylight, neutral to warm | therapy detail page figure, article figure |
| `acupuncture-facial-needles-gloved-hands-medium-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | soft daylight, neutral | therapy detail figure, article figure |
| `acupuncture-facial-needles-gloved-hands-tight-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | soft daylight, neutral | therapy detail figure, article figure |
| `acupuncture-facial-needles-resting-close-up-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | soft daylight, neutral | therapy detail figure, article figure |
| `acupuncture-practitioner-over-shoulder-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | soft daylight, neutral to cool | therapy detail figure, split-section half |
| `acupuncture-practitioner-preparing-guest-portrait-2x3` | portrait 2:3 | Avoid | treatment room | soft daylight, warm-neutral | therapy detail page, care team section |

### Physiotherapy

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `physiotherapy-electrotherapy-electrode-knee-close-up-portrait-2x3` | portrait 2:3 | Avoid | physiotherapy room | daylight, neutral-cool | article figure, card image for a physiotherapy service |
| `physiotherapy-electrotherapy-session-treatment-table-guest-landscape-3x2` | landscape 3:2 | Avoid | physiotherapy room | daylight, neutral | split-section half for physiotherapy, article figure |
| `physiotherapy-shoulder-mobility-assessment-guest-landscape-3x2` | landscape 3:2 | Avoid | physiotherapy room | daylight, neutral | split-section half, article figure |

### Food

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `food-fruit-ring-restaurant-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral | 3-up tile, menu or food section card |
| `food-fruit-ring-wood-table-close-up-portrait-2x3` | portrait 2:3 | Yes | garden (wood table among plants) | soft daylight, warm | food gallery tile, vertical social post |
| `food-juice-purple-restaurant-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight with a diagonal shadow on the table, neutral | 3-up tile, menu card |
| `food-juice-purple-wood-table-close-up-portrait-2x3` | portrait 2:3 | Yes | garden (wood table) | soft daylight, warm | vertical social post, food gallery tile |
| `food-red-rice-curry-plate-restaurant-overhead-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral | food section tile, article figure |
| `food-red-rice-curry-plate-restaurant-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral | 3-up tile, food or menu card |
| `food-salad-apple-lettuce-restaurant-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral | 3-up tile, food card |
| `food-salad-apple-lettuce-stone-table-portrait-2x3` | portrait 2:3 | Yes | garden or courtyard edge (dark stone table) | soft daylight, cool | vertical social post, food tile |
| `food-salad-apple-lettuce-wood-table-medium-portrait-2x3` | portrait 2:3 | Yes | restaurant edge or terrace (wood table) | daylight, neutral | food tile, vertical social post |
| `food-salad-apple-lettuce-wood-table-overhead-portrait-2x3` | portrait 2:3 | Yes | garden (wood table among plants) | soft daylight, neutral | vertical social post, food gallery tile |
| `food-salad-apple-lettuce-wood-table-tight-portrait-2x3` | portrait 2:3 | Yes | restaurant edge or terrace (wood table) | daylight, neutral | food tile, vertical social post |
| `food-salad-beetroot-carrot-restaurant-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral | 3-up tile, menu card |
| `food-salad-sprouts-cucumber-restaurant-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral | 3-up tile, food card |
| `food-salad-sprouts-cucumber-wood-table-close-up-portrait-2x3` | portrait 2:3 | Yes | garden (wood table) | soft daylight, warm | vertical social post, food gallery tile |
| `food-soup-golden-restaurant-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral | 3-up tile, menu card |
| `food-soup-salad-restaurant-spoon-guest-landscape-3x2` | landscape 3:2 | Yes | restaurant | soft daylight, neutral | split-section half, dining section image |
| `food-spread-five-plates-restaurant-wide-landscape-3x2` | landscape 3:2 | Yes | restaurant | soft daylight, neutral | dining section hero, split-section half |
| `food-spread-red-rice-beetroot-restaurant-landscape-3x2` | landscape 3:2 | Yes | restaurant | soft daylight, neutral | split-section half, food band |
| `food-spread-red-rice-garden-medium-portrait-2x3` | portrait 2:3 | Yes | garden (indoor planter or courtyard corner) | soft daylight, warm | vertical social post, story background |
| `food-spread-red-rice-restaurant-overhead-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral | menu overview figure, food gallery tile |
| `food-spread-red-rice-soup-garden-overhead-portrait-2x3` | portrait 2:3 | Yes | garden (indoor planter or courtyard corner) | soft daylight, warm | vertical social post, story background |
| `food-spread-red-rice-soup-garden-wide-landscape-3x2` | landscape 3:2 | Yes | garden (indoor pebble garden) | soft daylight, neutral to warm | dining section hero, split-section half |
| `food-spread-red-rice-soup-wood-table-landscape-3x2` | landscape 3:2 | Yes | garden (wood table) | soft daylight, warm | split-section half, food band |
| `food-spread-red-rice-wood-table-tight-portrait-2x3` | portrait 2:3 | Yes | garden (wood table among plants) | soft daylight, warm | vertical social post, food gallery tile |
| `food-spread-three-plates-garden-wide-landscape-3x2` | landscape 3:2 | Yes | garden / outdoor dining corner with pebble bed | soft daylight, neutral to slightly cool | food section split-half, restaurant 3-up tile |
| `food-spread-three-plates-juice-garden-portrait-2x3` | portrait 2:3 | Yes | garden / outdoor dining corner with pebble bed | soft daylight, neutral | mobile hero for a food page, portrait social post |
| `food-spread-three-plates-wood-table-overhead-landscape-3x2` | landscape 3:2 | Yes | garden dining table (pebbles and a leaf just visible at top right) | soft daylight, neutral | food section band, 3-up tile |
| `food-spread-two-plates-wood-table-overhead-landscape-3x2` | landscape 3:2 | Yes | garden dining table (pebbles and a leaf at bottom right) | soft daylight, neutral | food section split-half, 3-up tile |
| `food-vegetable-crescent-restaurant-overhead-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft diffused daylight, neutral | menu or food article figure, portrait social post |
| `food-vegetable-crescent-restaurant-portrait-2x3` | portrait 2:3 | Yes | restaurant | soft daylight, neutral to cool | restaurant split-section half, portrait social post |

### Grounds and walks

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `grounds-courtyard-deck-standing-guest-portrait-2x3` | portrait 2:3 | Check | courtyard pond deck | warm low-angle sunlight with soft shadows, warm | tall split-section half, portrait social post |
| `grounds-courtyard-deck-walking-guest-portrait-2x3` | portrait 2:3 | Check | courtyard pond deck | warm late sun, warm | portrait social post, mobile hero |
| `grounds-garden-boardwalk-railing-guest-landscape-3x2` | landscape 3:2 | Check | garden boardwalk | soft shaded daylight, neutral | grounds split-section half, 16:9 slide |
| `grounds-garden-boardwalk-railing-guest-portrait-2x3` | portrait 2:3 | Check | garden boardwalk | soft shaded daylight, neutral | portrait social post, mobile hero |
| `grounds-garden-planters-standing-guest-landscape-3x2` | landscape 3:2 | Check | garden / building exterior | soft daylight, warm-green | full-bleed hero with text on the right, wide banner |
| `grounds-garden-planters-walking-guest-landscape-3x2` | landscape 3:2 | Check | garden / building exterior | soft daylight, warm-green | full-bleed hero with text on the right, wide banner |
| `grounds-garden-wall-touching-leaves-dark-frame-guest-portrait-2x3` | portrait 2:3 | Yes | garden path beside a textured wall | low warm sun, warm | portrait social post, tall split-section half |
| `grounds-garden-wall-touching-leaves-guest-portrait-2x3` | portrait 2:3 | Yes | garden path beside a textured wall | low warm sun, warm | portrait social post, mobile hero |
| `grounds-garden-wall-wide-textured-wall-guest-portrait-2x3` | portrait 2:3 | Yes | garden path beside a textured wall | low warm sun, warm | portrait social post with headline, mobile hero |
| `grounds-hillside-path-walking-guest-landscape-3x2` | landscape 3:2 | Yes | hillside path / exterior grounds | warm late-afternoon sun, warm | grounds split-section half, 16:9 slide |
| `grounds-hillside-path-walking-guest-portrait-2x3` | portrait 2:3 | Yes | hillside path / exterior grounds | warm late sun, warm | portrait social post, mobile hero |
| `grounds-pebble-path-barefoot-walking-landscape-3x2` | landscape 3:2 | Yes | garden pebble path | soft daylight, warm | 3-up tile, article figure |
| `grounds-pond-building-path` | landscape 3:2 | Yes | courtyard pond / exterior | overcast after rain, cool | architecture article figure, 16:9 slide |
| `grounds-textured-wall-eyes-closed-negative-space-guest-portrait-2x3` | portrait 2:3 | Check | garden wall | warm low sun with leaf shadows on the wall, warm | portrait social post with headline, mobile hero |
| `grounds-textured-wall-profile-banana-leaf-guest-portrait-2x3` | portrait 2:3 | Check | garden wall | warm low sun, warm | portrait social post, mobile hero |
| `grounds` | landscape 3:2 | Yes | exterior / grounds | overcast daylight, cool to neutral | about or location page split-section half, 16:9 slide |

### Leisure

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `leisure-balcony-profile-eyes-closed-guest-landscape-3x2` | landscape 3:2 | Check | balcony with valley view | soft hazy daylight, neutral to cool | full-bleed hero with headline at top left, share-image background |
| `leisure-balcony-valley-view-guest-landscape-3x2` | landscape 3:2 | Check | balcony with valley view | soft hazy daylight, neutral | full-bleed hero with text on the left, split-section half |
| `leisure-garden-swing-looking-up-guest-landscape-3x2` | landscape 3:2 | Check | garden / terrace swing | soft shaded daylight, neutral | leisure split-section half, 3-up tile |
| `leisure-garden-swing-reading-guest-landscape-3x2` | landscape 3:2 | Yes | garden / terrace swing | soft shaded daylight, neutral | leisure split-section half, 3-up tile |
| `leisure-pergola-terrace-reading-guest-landscape-3x2` | landscape 3:2 | Yes | pergola terrace / garden | warm late-afternoon sun, warm | full-bleed hero, split-section half |
| `leisure-pergola-terrace-reading-guest-portrait-2x3` | portrait 2:3 | Check | pergola terrace | warm late sun, warm | portrait social post, mobile hero |
| `leisure-pergola-terrace-resting-guest-landscape-3x2` | landscape 3:2 | Check | pergola terrace / garden | warm late-afternoon sun, warm | full-bleed hero, split-section half |
| `leisure-water-wall-lounge-golden-hour-lantern-guest-portrait-2x3` | portrait 2:3 | Yes | water-wall lounge beside a pool | golden hour with a glowing pendant, warm | portrait social post, mobile hero |
| `leisure-water-wall-lounge-golden-hour-reading-guest-landscape-3x2` | landscape 3:2 | Yes | water-wall lounge beside a pool | golden hour with low raking sun, warm | full-bleed hero with text at the upper left, wide banner |
| `leisure-water-wall-lounge-golden-hour-seated-guest-landscape-3x2` | landscape 3:2 | Check | water-wall lounge beside a pool | golden hour, warm | full-bleed hero, wide banner |

### Details

| Name | Shape | Public | Setting | Light | Best for |
| --- | --- | --- | --- | --- | --- |
| `detail-uniform-kurta-logo-embroidery-portrait-2x3` | portrait 2:3 | Yes | yoga studio | soft daylight, warm-neutral | brand or uniform detail, 3-up tile |
