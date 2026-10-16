# Content — entity source of truth

JSON records matching [`ui_kits/website/skill-content.md`](../ui_kits/website/skill-content.md). English only. Relationships use stable IDs, not URLs.

## How to read

1. Prefer these files over inventing programmes, rooms or NAP in kit screens or consumer apps.
2. `status`: `published` | `draft`. Anything unconfirmed stays `draft`. There is no `to_confirm` flag.
3. `source`: `handbook` | `kit` | `gap` | `rate-control-sheet` | `resume` (doctor records built from the doctor's own resume; the full background is in handbook §4. Dr. P.A. Kareem's record stays `handbook`, with resume details added).
4. Shared fields follow the content model: `featured_image` (`src` is a filename in `assets/photos/` without `.jpg`, plus `alt`), `featured`, `related_pages` (`{type, id}`; the reverse links are generated), `external_references` (`{title, url}`), `faqs`.
5. Empty directories (`guest-stories/`, `events/`, `testimonials/`) mean the entity is **not ready**. Do not invent consent, quotes, or events.
6. Draft conditions have empty `clinical` / `faqs` — listing summaries only until medical review.
7. **No rates here.** [`tariff.json`](tariff.json) holds only the tariff structure: includes, excludes, supplement names, payment terms, cancellation and public notes. Rates, currencies and validity dates live only in the production Keystatic tariff. Room specs are in `rooms/` without prices.
8. The general FAQ page is [`faq.json`](faq.json), grouped by category. Condition and programme FAQs sit inside those records.
9. Records carry no ICP IDs and no translation review fields.
10. Never quote handbook §15 as public copy.

## Generate the kit script

```
node scripts/write-content-kit.mjs
```

Writes [`kit.js`](kit.js) as `window.ShantaraContent`. JSON stays the source; regenerate after editing JSON.

## What is not invented

- Clinical article bodies, guest stories, testimonials, or doctor bios marked `[TO CONFIRM]` in the handbook.
- Outcome-shaped public copy (“improved blood sugar regulation”) — public fields follow kit-compliant language.
