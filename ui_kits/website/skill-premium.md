# Shantara Premium Design Rules

Back to the [website skill](SKILL.md).

Design and motion rules for the Shantara public marketing website (Astro + Tailwind). Use this whenever building, styling, reviewing, or changing any page, component, layout, image treatment, typography, animation, hover state, transition, or “premium feel.” Also use it when anyone asks to make the site feel more premium, luxurious, polished, or high-end, or suggests adding an animation library, UI component library, scroll effect, parallax, carousel, or preloader. Apply it even if the request only mentions one small component.

Shantara is a **52-room naturopathy retreat** — a doctor-led residential clinic guests stay at in Kozhikode. Visitors are deciding whether to trust Shantara with their health and a costly stay, often from the Gulf and often on a phone. The site must feel calm, confident, and trustworthy before it feels impressive.

**Wellness** is a discovery gloss in some markets; it is not the product type. Public naming follows [skill-copy.md](skill-copy.md). Do not describe the product as a “wellness retreat” in heroes, titles, or schema.

Stack locks (Astro, Tailwind, no Motion/GSAP, no UI kits): [skill-stack.md](skill-stack.md). Brand tokens, type, and accessibility live in the design system (`tokens/`, root `SKILL.md`).

## Core principle

> Premium = restraint + confidence + sensory quality. It does not come from more interface behaviour.

Premium feel is a product of five things working together:

Photography × Typography × Layout × Copy × Performance

If any one of these is weak, the whole site feels cheap. Motion cannot fix a weak one. Copy and information structure matter as much as visuals here, because visitors are judging a health-related stay, not just a pretty resort.

## Build order (project rule)

Work in this order. Do not start a later step while an earlier one is still undecided.

1. Content architecture (pages, collections, hierarchy, what each page must answer)
2. Photography and video (selection, cropping, art direction)
3. Typography (typefaces, scale, line height, measure)
4. Layout and whitespace
5. Colour and material language
6. Responsive behaviour
7. Performance
8. Motion

**Motion comes last.** Do not add reveal effects, scroll animations, or transitions while typography, content hierarchy, or image treatment are still being decided. If asked to add motion early, say so and point back to this order.

## Stack constraints

- Use CSS, Tailwind transitions, and native browser features first.
- Use Astro View Transitions for page changes.
- Do not add Motion, GSAP, Framer Motion, Lenis, AOS, or any animation library.
- Do not add SmoothUI, Amicro, Bencho, MUI, Chakra, shadcn, or any UI component library.
- Do not introduce React for ordinary UI. React islands only when an interaction genuinely requires it.
- An animation library may be proposed only when a specific, named interaction cannot be built cleanly without one. Write down the interaction, why CSS fails, and the added bundle size before adding it.

Why: adding one small dependency later is trivial. Removing an animation ecosystem after it has spread across 40 components is not.

Full stack table: [skill-stack.md](skill-stack.md).

## Photography and video

- Real property, treatments, food, people, and landscape. Avoid generic stock wellness imagery.
- Prefer frames without identifiable guests where public marketing allows; never show faces in therapy or room numbers (guest privacy — root `SKILL.md`).
- One strong image per section beats a grid of weak ones.
- Always use Astro Image with correct `sizes`, width and height set, and modern formats. Storage and compression rules: [skill-images.md](skill-images.md).
- Hero video: optional, short (10 to 15 seconds), muted, looped, compressed, with a still poster image that loads first. Never autoplay audio. Hosting, the native `<video>` element, schema and the video sitemap: [skill-video.md](skill-video.md).
- The LCP image (usually the hero) must not be lazy-loaded and should be prioritised.

## Typography

Shantara ships **one typeface for Latin/Cyrillic: Diodrum** (weights via design-system tokens). Display and body are the same family at different sizes and weights — do **not** introduce a separate “premium serif” for headings.

- Self-host fonts. Subset them. Use `font-display: swap` (already set on Diodrum faces).
- Generous heading sizes, body line height 1.6, body measure `--measure-body` (62ch), headlines `--measure-statement` (30ch).
- Use type tokens (`--type-display`, `--type-statement`, `--type-body`, …) and the spacing/type scale — no one-off font stacks in components. Voices and weights: [Design system rules](#design-system-rules-from-the-brand-deck).
- Arabic: **IBM Plex Sans Arabic** pairing under `[dir=rtl]` (see `tokens/rtl.css`). Do not use a system fallback as the Arabic display face.

## Layout and whitespace

- Fewer elements per section: typically one image, one heading, a short paragraph, one action.
- Use whitespace to create pacing. Do not fill space because it is empty.
- Keep a consistent spacing scale from design tokens / Tailwind mapped to those tokens. No one-off magic numbers.
- Build every layout to work in right-to-left for `/ar/` using logical properties and Tailwind `rtl:` variants.
- Heroes: full-bleed dominant image plane; brand-first; no card chrome in the hero; no floating badges on media. Composition rules in [skill-sections.md](skill-sections.md) and the website skill.

## Colour and material

- Use the design-system palette: deep olive / gold primary pair, stone and linen neutrals, landscape accents — defined once as tokens. No hard-coded hex values in components.
- The rosette is a **band on one edge**, never a page wash (root `SKILL.md`).
- Subtle texture is allowed only if it does not hurt contrast or performance.
- Meet WCAG AA contrast for all text. Type on photography sits inside a scrim that covers the whole text block (`--scrim-hero`) and is set in solid Merino — see accessibility guidelines.

## Design system rules (from the brand deck)

The website is the brand deck carried to a scrolling page. The deck rules that apply to the website are restated in this section; the presentations skill is for decks only. Tokens live in `tokens/`; components in `components/editorial/` and `components/sections/`. Read the `.prompt.md` beside each component before using it.

### Type: five voices, one weight rule

| Voice | Token | Size (360 → 1440) | Weight | Use |
| --- | --- | --- | --- | --- |
| Display | `--type-display` | 40 → 84 | Light | Full-bleed hero headline only |
| Statement | `--type-h1` / `--type-statement` (= h2) | 34 → 64 / 28 → 48 | Light | Page title / section headline, a full sentence |
| Title | `--type-title` (= h3) | 24 → 30 | Light | Tile and sub-section titles |
| Item | `--type-item` (= h4) | 20 | Medium | Step, list and table item titles |
| Numeral | `--type-numeral` | 48 → 84 | Light | Two or three figures in `NumeralsSplit` |

- **The Light rule:** every heading at 24px or larger is Diodrum Light. Medium is only for item titles at 20px or smaller. Body is Regular 17/1.6 — never Light.
- `--type-lead` is deprecated. Use body, or a `Statement` with a `sub` line.
- Headlines are left-aligned and wrap at `--measure-statement` (30ch). Body wraps at `--measure-body` (62ch).

### Grounds

A section paints one of five grounds with `data-ground` (use `Section`; nothing else paints its own background):

| Ground | Use |
| --- | --- |
| `merino` | Default. Most sections. |
| `stone` | Alternate light ground to separate two adjacent sections. |
| `himalaya` | `BandStatement` only. At most one per page. |
| `pine` | `ClosingCTA` without a photograph, footer. |
| `photo` | Heroes, `PanoramaCaption`, `ClosingCTA` with a photograph. |

Dark grounds re-point the ink tokens. Inside `himalaya`, `pine` and `photo` the primary button becomes Gold with Pine ink, text becomes Merino, Do not pass tone props or hard-code colours to get this.

### Shape

- Photographs are square-cut (`--radius-media: 0`). No rounded images anywhere on the website.
- Buttons and inputs are near-square (`--radius-control` / `--radius-input`: 2px).
- `--radius-card` (4px) is for forms and dialogs only.
- Pills survive only on small chips (`Tag`, `Badge`).

### Buttons

- `Button` has three variants: `primary`, `secondary`, `link`. `accent`, `ghost` and `inverse` are deprecated aliases kept for the app kit. Do not use them on the website.
- One primary button per view. On light grounds it is Himalaya; on dark grounds it is Gold automatically.
- "More" links are `TextLink` (hairline and arrow), aligned to the grid — not a second button.
- Sizes 36 / 44 / 52px (`--control-sm/md/lg`). Every size reaches 44px on touch.

### Tiles, not cards

- Marketing listings use `Tile`: photograph and text directly on the ground. No border, shadow, radius or white card on linen.
- `Card` is for forms and dialogs only.
- Tile hover: photograph scales to 1.02 inside its frame, title takes a hairline underline. No lift.
- Listing ratio 4:3. A list too long for photographs becomes an `IndexList`.

### Photographs

- One photograph per job. A section has one photograph, or a row of tiles with one photograph each. No collages, no thumbnail strips.
- Every photograph goes through `Media` (the kit's `chrome/Photo.js` is an adapter over it).
- Ratios: 4:3 listing (default), 16:9 wide, 4:5 portrait (doctors, tall split media), 3:4 tall architecture, 21:9 panorama (desktop only, through `PanoramaCaption`, with `mobileRatio`).
- Heroes use a height (100svh, or 72svh with `height="tall"`), not a ratio.

### No eyebrows

- Owner decision: no small uppercase tracked label above a hero, section, card or column title — anywhere. The `Eyebrow` component is deleted.
- Category, duration, place or date goes in a caption meta row **below** the title, in normal case (`meta` prop on heroes, `Statement`, `Tile`; `MetaRow` elsewhere).

### Component map

| Job | Use |
| --- | --- |
| Home or immersive page opening | `HeroFullBleed` |
| Programme / tariffs page opening | `HeroSplit` + booking panel below |
| Inner page opening without a full photograph | `HeroStatement` with `pattern` or a side image |
| Section heading block | `Statement` (headline → optional meta row → one line) |
| Text beside a photograph | `SplitSection` |
| The page's single accent statement | `BandStatement` (Himalaya + rosette band) |
| A pause between dense sections | `PanoramaCaption` |
| Doctors | `PeopleRow` (uses `PortraitFrame`) |
| Two or three proof figures | `NumeralsSplit` (uses `Numeral`) |
| Programmes, rooms, articles with photographs | `TileGrid` (uses `Tile`) |
| A long list without photographs | `IndexList` |
| Process | `NumberedSteps` |
| Schedule / a day | `TimeTable` |
| Comparison or specification | `SpecTable` |
| Short lists | `PlainList`, `GroupedList` |
| Quote with facts | `QuoteBlock` |
| Questions | `Accordion` |
| Page end (only when the page has no other CTA) | `ClosingCTA` (`photo` / `ground` / `compact`) |
| Consultation form | `FormSplit` |

Section-level mapping from the CMS library: [skill-sections.md](skill-sections.md).

### Responsive rules

- **Mobile first.** Styles start at a 360px phone and add columns with `min-width` queries.
- **Breakpoints:** 520 (large phone), 760 (tablet, two columns start), 1000 (split layouts and full nav start; menu sheet below), 1280 (desktop). Use these literals; do not invent others. The grid is 4 / 8 / 12 columns.
- **Fluid tokens:** type, `--layout-gutter` (20 → 48), `--grid-gap`, `--section-y` (80 → 160), `--section-y-sm` (56 → 96), `--stack-lg` / `--stack-md` scale between 360 and 1440. Do not add breakpoint overrides for sizes the tokens already scale.
- **Stacking order:** on phones the photograph comes first, then the text (`SplitSection`, `TileGrid`). `FormSplit` is the exception: the form comes first.
- **Taps:** every interactive target is at least 44px (`--tap-min`).
- **No horizontal scroll** at any width from 360 to 1440. Test 360, 390, 768, 1024, 1280, 1440.
- **Pattern floor:** the rosette band disappears on surfaces under ~880px (`PatternPanel` container query). Do not force it back.
- **Panoramas:** 21:9 only on desktop. Pass `mobileRatio` (`PanoramaCaption` defaults to 4:5) so the frame keeps its height on a phone.
- **Tables:** under 520px `SpecTable` rows become blocks (name on its own line, other cells labelled beneath). `TimeTable` puts the time above the title under 760px.
- **Tile grids:** never an uneven last row. Keep counts to multiples of the column count.

## Copy

Headings, labels, navigation, and buttons are direct and literal. A visitor scanning only the headings should understand the page.

- Good: “Our treatment programmes”, “Book a consultation”, “Plan your stay”
- Avoid: “Where healing begins”, “A journey within”, “Discover more”

Calm, specific, factual tone. No hype.

**All public-facing language follows [skill-copy.md](skill-copy.md).** Do not invent parallel voice rules here. Health content must not claim cures or guaranteed outcomes; prefer careful wording such as “supports” or “may help”; flag medical pages for human review before publishing. India’s Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 applies. The programme name **Diabetes Reversal** is approved for catalogue use — do not present reversal as a guaranteed outcome.

## Motion vocabulary

Motion should make Shantara feel calm, continuous, and intentional. It must never be the first thing a visitor notices.

Not every section animates. Use only this vocabulary:

- **Hero:** one subtle entrance on first load (for example, a gentle fade and small upward settle of the heading). Once only.
- **Major editorial images:** an occasional reveal as they enter the viewport (`--duration-reveal`, 640 ms). Not every image. At most one or two per page.
- **Buttons, links and tiles:** subtle hover and focus states (colour, underline). A `Tile` scales its photograph to 1.02 inside the frame (`--tile-media-scale`) and underlines its title. Nothing lifts or gains a shadow on marketing pages.
- **Page changes:** a restrained Astro View Transition. Shared-element transitions (for example, a programme card image becoming the programme page hero) are allowed where they help continuity.
- **Long-form, programme, therapy and clinical content:** mostly static. Reading pages should not move.

Prefer design-system motion tokens (`--ease-out`, `--ease-drawer`, `--duration-*`) over local curves.

### Timing

- Hover and focus: 150 to 250 ms
- Normal UI transitions (menus, accordions, tabs): 250 to 400 ms
- Large image or editorial reveals: 500 to 800 ms
- Page transitions: about 400 to 700 ms
- Easing: gentle ease-out curves. No bounce, spring, or elastic effects.

Calm does not mean slow. Interactions must still feel responsive.

### Reduced motion (required)

Every animation must respect the user’s reduced-motion setting:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Content must be fully visible with motion disabled. Never hide content with `opacity: 0` in a way that depends on JavaScript to reveal it. Prefer keeping colour and opacity changes; drop movement.

## Do not use

- Smooth-scroll hijacking or custom scroll libraries
- Parallax on multiple sections (one restrained use at most, only if it performs well on mobile)
- Loading screens or preloaders
- Homepage image carousels or auto-rotating sliders
- Custom cursors
- Scroll-triggered animation on every section
- Text that types, scrambles, or splits letter by letter
- Autoplaying audio

## Performance guardrail

- The site must pass Core Web Vitals on mobile (LCP, INP, CLS) while keeping visual quality.
- Test on a mid-range Android phone over 4G, not only on a desktop.
- Premium visuals are not an excuse for slow pages. If a visual choice breaks Core Web Vitals, change the visual choice.

More performance detail: [skill-technical.md](skill-technical.md).

## Business measure

Visual quality serves one journey:

Programme exploration → Enquiry / WhatsApp / Booking intent

Primary visitor-facing CTA remains **Book a Consultation**. When choosing between two design options, prefer the one that makes this journey clearer.

## Review checklist

Before marking any page or component done, check the items the change could affect. The viewport widths apply when layout, type or chrome changed; a new or rebuilt page runs the whole list.

- [ ] The build order was followed. Motion was not added before layout and typography were settled.
- [ ] No new animation or UI component library was added.
- [ ] Headings and buttons are direct and literal ([skill-copy.md](skill-copy.md)).
- [ ] No health claim says “cure” or guarantees an outcome. Health pages are flagged for review.
- [ ] Images use Astro Image with correct sizes. The hero image is not lazy-loaded.
- [ ] Motion uses only the vocabulary above, with the stated timings.
- [ ] Reduced-motion is respected, and content is visible without JavaScript.
- [ ] Layout works in right-to-left.
- [ ] Text contrast meets WCAG AA.
- [ ] Mobile Core Web Vitals still pass.
- [ ] Every heading 24px or larger is Light; item titles are Medium; body is Regular.
- [ ] Each section uses one ground via `Section` / `data-ground`; at most one `BandStatement` per page.
- [ ] Photographs are square-cut and go through `Media`; one photograph per job.
- [ ] Listings use `Tile`, not `Card`; no hover lift or shadow.
- [ ] Buttons are `primary`, `secondary` or `link`; one primary per view.
- [ ] No eyebrows: nothing small and uppercase above a title; facts sit in a meta row below it.
- [ ] No horizontal scroll at 360, 390, 768, 1024, 1280, 1440.
- [ ] Phones: photograph before text; every tap target at least 44px.
- [ ] Panoramas pass `mobileRatio`; tables read as blocks under 520px; no rosette band under ~880px.
- [ ] No rates or “from …” amounts except on a dedicated tariff surface.
