Renders one Lucide glyph, colour-inheriting, for use inside any Shantara control.

```jsx
<Icon name="leaf" size={24} />
<Button startIcon={<Icon name="calendar-days" size={18} />}>Book a Consultation</Button>
<Icon name="message-circle" label="WhatsApp" />
```

**Registry.** Use a name from `ICON_NAMES` (grouped in `ICON_GROUPS`). If a new glyph is needed, add it to the registry in `Icon.jsx` first.

| Group | Names |
|---|---|
| contact | phone, message-circle (WhatsApp stand-in), mail, map-pin, globe, languages, share-2, external-link |
| stay | calendar-days, clock, bed-double, utensils, wifi, car, plane, train-front |
| care | stethoscope, heart-pulse, user-round, users, shield-check, award, leaf, sprout |
| nature | sun, moon, droplets, wind, mountain |
| content | book-open, file-text, quote, bookmark, download, filter, sliders-horizontal, search |
| status | info, alert-circle, check-circle-2, check, x |
| direction | arrow-right/left/up/down, chevron-right/left/up/down, plus, minus, menu |
| social | instagram, facebook, linkedin, youtube, x-social (the X logo; `x` stays the close glyph) |

Substitution note: Shantara's brand package contains no icon library, so Lucide (`lucide-static@0.544.0`, CDN) stands in. Glyphs are CSS masks painted in `currentColor`. Sizes: 16 inline with small text, 20 default, 24 in feature lists.

Second substitution note: Lucide has deprecated its brand icons and has no X logo, so the `social` group comes from Simple Icons (`simple-icons@9.21.0`, CC0 1.0). The paths are inlined in `Icon.jsx` because later Simple Icons releases dropped LinkedIn. They are filled marks, not 2px strokes, and are painted through the same mask, so they still inherit `currentColor`. Never reuse the slug `x` for the X logo; it is the close glyph.

**Social glyphs.** Use them only on links to Shantara's own profiles (the footer, a share bar), with an accessible name on the link. Never as decoration, and never for another brand. Decorative by default (`aria-hidden`); pass `label` when the icon carries meaning alone.

**Motion.** Icons inherit `currentColor`, so they ride the parent control's 160ms colour shift. They do not bounce, spin or swap on their own.

**RTL.** Directional slugs (`arrow-*`, `chevron-left` / `chevron-right`) flip with `scaleX(-1)` under `dir="rtl"`. Symmetric marks — leaf, plus, heart, search — do not.
