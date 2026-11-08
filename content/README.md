# Content: entity source of truth

JSON records matching [`ui_kits/website/skill-content.md`](../ui_kits/website/skill-content.md). English only. Relationships use stable IDs, not URLs.

## How to read

1. Prefer these files over inventing programmes, rooms or NAP in kit screens or consumer apps.
2. `status`: `published` | `draft`. Anything unconfirmed stays `draft`. There is no `to_confirm` flag.
3. `source`: `handbook` | `kit` | `gap` | `rate-control-sheet` | `resume` (doctor records built from the doctor's own resume; the full background is in handbook §4) | `client` (the programme list Shantara approved on 8 November 2026, and conditions from it and from the previous site) | `owner` (programmes the owner added on 8 November 2026).
4. `doctors/` holds practising doctors only. The founder and chairman, P.A. Kareem, is not a doctor. His record is [`leadership/pa-kareem.json`](leadership/pa-kareem.json), with `source` `handbook` (handbook §3). The unique media register is [`docs/media-kareem.md`](../docs/media-kareem.md); his profile lists only the press and talks from that file. Never add him to `doctors/`, a doctor list, a clinician field or a medical reviewer field.
5. Shared fields follow the content model: `featured_image` (`src` is a filename in `assets/photos/` without `.jpg`, plus `alt`), `featured`, `related_pages` (`{type, id}`; the reverse links are generated), `external_references` (`{title, url}`), `faqs`.
6. Empty directories (`guest-stories/`, `events/`, `testimonials/`) mean the entity is **not ready**. Do not invent consent, quotes, or events. Six guest films are filed in `assets/videos/testimonials/` and indexed in [`assets/videos/README.md`](../assets/videos/README.md). They are not records.
7. Conditions are data, not detail pages (website D-203, D-214): `id`, `slug`, `name` and `synonyms` only. Each programme lists its conditions in order in `conditions`; that list is the only link between them. Programmes have no `focus`; `durations` is a list of nights and `order` is the listing order.
8. **No rates here.** [`tariff.json`](tariff.json) holds only the tariff structure: includes, excludes, supplement names, payment terms, cancellation and public notes. Rates, currencies and validity dates live only in the production Keystatic tariff. Room specs are in `rooms/` without prices.
9. The general FAQ page is [`faq.json`](faq.json), grouped by category. Condition and programme FAQs sit inside those records.
10. Records carry no ICP IDs and no translation review fields.
11. Never quote handbook §15 as public copy.

## Generate the kit script

```
node scripts/write-content-kit.mjs
```

Writes [`kit.js`](kit.js) as `window.ShantaraContent`. JSON stays the source; regenerate after editing JSON.

## What is not invented

- Clinical article bodies, guest stories, testimonials, or doctor bios marked `[TO CONFIRM]` in the handbook.
- Outcome-shaped public copy (“improved blood sugar regulation”). Public fields follow kit-compliant language.
