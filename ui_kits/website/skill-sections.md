# Sections, heroes, and cards

Back to the [website skill](SKILL.md).

## Design-system layers

```text
UI primitives
    ↓
Semantic reusable sections
    ↓
Flexible pages
```

### UI primitives

Developer-level components, not CMS sections. Recommended:

- Container
- Section shell
- Stack
- Cluster / inline layout
- Heading
- Text
- Link
- Button
- Badge
- Icon
- Image
- Video
- Divider
- Breadcrumb
- Form Field
- Select
- Textarea
- Checkbox
- Dialog / Drawer
- Accordion primitives

Keep design tokens centralized: color, typography, spacing, width, radius, shadows, borders, animation, breakpoints.

Do not use arbitrary spacing or one-off styling on individual pages. In this repo, primitives live in `components/` (editorial building blocks in `components/editorial/`) and tokens in `tokens/`. Semantic sections are built from `components/sections/`. Every section sits in `Section`, which sets one ground, the section rhythm and the container. Design rules and the component map: [skill-premium.md](skill-premium.md#design-system-rules-from-the-brand-deck).

### Visual direction

Shantara should feel: calm, premium, natural, clinically credible, spacious, human, restrained.

Avoid: crowded cards; excessive badges; excessive gradients; decorative animations that slow reading; wellness clichés that undermine clinical credibility; stock photography that looks unrelated to the actual retreat; excessive text on top of imagery; oversized components simply because they look “premium”.

Real Shantara photography should be preferred wherever possible.

## Page composition model

Every flexible content page should conceptually contain:

```text
Page
├── title
├── slug
├── page_type
├── navigation metadata
├── SEO/social metadata (localized with the page)
├── medical/editorial metadata when applicable
├── locale + translation metadata
└── sections[]
```

The `sections[]` array is flexible.

Do not make fixed condition/program/experience/story/contact templates.

### Before composing any page

Determine:

1. **Audience:** Who is this page for? When it serves a health need, name the need using the IDs in [SKILL.md §5](SKILL.md#section-5) — planning labels, not stored on records. Do not use a programme name as the audience.
2. **Intent:** What are they trying to understand or decide?
3. **Primary action:** What should they do next?
4. **Proof:** What must they see before trusting the page?
5. **Objections/questions:** What may stop them?
6. **Information priority:** What must appear before they scroll far?

Then choose sections. Do not start by copying another page layout.

## Hero component family

Do not force every page into one universal hero.

Build multiple intentionally designed hero components. These should be separate purposeful components or strongly separated variants with distinct schemas.

Do not create a single Hero with 30 props. Do not create 12 hero variants.

| Hero | Component |
| --- | --- |
| Immersive (Home, Experience) | `HeroFullBleed` (Display headline, one primary button, `meta` caption row) |
| Offer (Programme, Tariffs) | `HeroSplit` (photo one side, title + meta + one line + button) + a booking panel directly below |
| Editorial / Utility (Conditions, About, Journal, Contact, Book a Consultation) | `HeroStatement` with a rosette band (`pattern`) or a side image — never a bare statement |
| Article | `ArticleHeader` |

The header overlays every page. On `HeroStatement` it sits on the Merino/Stone ground.

### Immersive Hero

Purpose: emotion; sense of place; brand positioning; strong photography/video.

Typical uses: Home; Our Story; Farm & Dining; A Day at Shantara; possibly Rooms & Suites.

Typical fields: title; meta row below the title (optional); supporting text (short); primary CTA (optional); secondary CTA (optional); image/video; optional short trust cue.

Do not overload it with program tables, long copy, or multiple data points.

### Editorial Hero

Purpose: establish topic clearly; support educational/medical content; prioritize readability.

Typical uses: Conditions; Therapies; Our Approach; Clinical Guides; Doctor Answers; Articles.

Typical fields: title; category in the meta row below it; summary; optional image; optional author/reviewer metadata; optional updated/reviewed date.

### Program Hero

Purpose: immediately explain a commercial program; communicate high-intent information.

Typical fields: program title; concise proposition; optional image; duration/options; optional starting price (**only if already published on the tariff card — never invent**); short suitability statement; Book a Consultation CTA.

Do not require every field if it is not relevant.

### Compact / Utility Hero

Purpose: establish page context with minimal vertical space.

Typical uses: Contact; Policies; Blog listing; utility pages; simple directory/listing pages.

Typical fields: title; optional short description; optional breadcrumb.

## Reusable section library

Build a curated library. Add a new section only when a recurring need cannot be met cleanly by the existing library.

Good CMS sections: Process; FAQ; Expert; Gallery; Pricing; Feature Grid; Timeline.

Bad CMS sections: Spacer; Row; Column; Heading; Paragraph; Button; 50/50 layout.

Editors should select **what the section means**, not manually recreate layout mechanics.

### Library → components

| Section | Component |
| --- | --- |
| Section Intro | `Statement` inside `Section` |
| Media + Content | `SplitSection` |
| Full-width Media | `PanoramaCaption` |
| Statement band | `BandStatement` — at most one per page |
| Card Collection | `TileGrid` / `Tile` |
| A listing too long for photographs | `IndexList` |
| Feature Grid, Key Facts | `PlainList`, `GroupedList` |
| Stats / Proof Strip | `NumeralsSplit` |
| Process / Steps | `NumberedSteps` |
| Timeline | `TimeTable` |
| Table | `SpecTable` |
| Expert / Doctor | `PeopleRow` / `PortraitFrame` |
| Expert Quote, Testimonial | `QuoteBlock` |
| FAQ | `Accordion` |
| Lead / Consultation CTA | `ClosingCTA` (page end), `FormSplit` (the form) |

### Section Intro

Heading; short introduction (no eyebrow). Do not use it as a substitute for long content.

### Rich Content

Long-form text; headings; lists; quotes; inline links; simple inline media. Must support good editorial typography. Do not allow arbitrary visual layout construction inside the rich text editor.

### Media + Content

When text and media need equal emphasis. Limited variants: media at **inline start**; media at **inline end**; media top on mobile. Do not invent a second Media+Content component per language. Cards, heroes, process, timeline, tables, galleries, FAQs, doctor blocks, and CTAs are locale-aware — they reflow and follow `dir`, they are not duplicated.

Fields: title; optional meta row; content; image/video; optional CTA.

Component: `SplitSection`. From 1000px the photograph runs to the screen edge on one side (`mediaSide` start or end; `split` 50/50 or 40/60). Under 1000px the photograph goes first, full width at `mobileRatio`, then the text.

### Full-width Media

Retreat photography; facility visual; landscape; meaningful video. May optionally include a short caption.

Component: `PanoramaCaption`. 21:9 on desktop, `mobileRatio` (default 4:5) on phones. Caption bottom-left inside a scrim. No button.

### Card Collection

Collections of entities: conditions; programs; therapies; rooms; doctors; articles; guest stories.

The section controls heading, introduction, selected items or a controlled query, and layout. Entity-specific cards remain separate configurations of `Tile`.

Component: `TileGrid` — layout `3` (three across from 1000px), `2`, or `feature` (one large tile beside the rest). Choose the layout by count, not by page type. When the list is too long for a photograph per item (all conditions, the full programme list), use `IndexList`.

### Feature Grid

Program inclusions; facilities; amenities; principles; benefits; capabilities. Keep individual items short. Do not place paragraphs inside every feature tile.

### Key Facts

3–6 scannable data points. Examples: program duration; consultation type; room occupancy; supervision; meal plan; typical stay. Use for facts, not promotional slogans.

### Stats / Proof Strip

Concrete, verifiable numbers or credentials. Do not use invented or unverified metrics.

Component: `NumeralsSplit` — a statement beside two (at most three) `Numeral`s. Never four.

### Process / Steps

Sequential processes: inquiry → consultation → assessment → plan → stay → follow-up; arrival process; booking process. Keep steps concise.

Component: `NumberedSteps` — muted 01–04 numerals, a Medium item title and one line each.

### Timeline

Chronological content: A Day at Shantara; company history; guest journey; program schedule. Do not build a separate schedule component when Timeline can do the job.

Component: `TimeTable` — time column in olive, then a title and a line. Under 760px the time sits above the title.

### Table

One general controlled table section for: room comparison; program comparison; sample menu; schedule; package comparison.

Display modes may include: standard; comparison; schedule. Do not create a new component for every table use case.

Component: `SpecTable` — no borders, accent column in olive, a real `<table>`. Under 520px each row becomes a block. Schedules use `TimeTable`.

### Pricing / Package Options

Use when commercial options need stronger presentation than a generic table.

Typical fields: package/duration; price or “from” price; inclusions summary; occupancy/room assumptions if necessary; CTA.

Prices must match visible commercial information and current policy. **Figures appear only on the production tariff page, read from the Keystatic tariff.** This design system holds no rates. Elsewhere, link to the tariff page.

### Gallery

Rooms; therapies; food; retreat environment; facilities. Prefer real photography. Support captions only when useful.

One photograph per job: a gallery is a `TileGrid` of captioned photographs or a sequence of `SplitSection` / `PanoramaCaption`. Do not build a main image with a thumbnail strip.

### Expert / Doctor Section

Full doctor/expert profile within a page. Typical fields: photo; name; qualifications; role; area of practice; short biography; relevant link/CTA.

Component: `PeopleRow` for 2–4 doctors; `PortraitFrame` for one. Every doctor uses the same 4:5 framing and crop.

### Medical Reviewer

A compact attribution component, kept separate from a full doctor profile.

Typical output:

```text
Medically reviewed by Dr. X, BNYS
Last medically reviewed: 12 September 2026
```

### Expert Quote

Concise clinician commentary embedded near a relevant claim. The quote must be attributable to a real expert.

### Accreditation / Credential Strip

Use only for legitimate, current credentials. Prefer exact credential name; issuing organization; registration/accreditation number where appropriate; validity when relevant.

Do not show logos without context if the visitor cannot understand what they mean.

### Testimonial

One significant guest story/testimonial. Support: real name when consented; anonymized presentation when required; photo/video when consented; context of stay; quote/story.

Do not turn testimonials into unsupported medical efficacy claims.

### Testimonial Collection

A set of shorter testimonials. Do not overload pages with large carousels.

### Evidence / References

Clinical sources; research references; guidelines; authoritative health references. Prefer direct source links where appropriate. Do not add references decoratively. Every reference should support actual content.

### FAQ

Contextual FAQs. Good examples: How long should I stay?; Can a companion stay with me?; What happens before arrival?; Should I bring my existing medicines?; What is included in the program?

Do not create a separate giant FAQ architecture unless needed.

Component: `Accordion`.

### Related Content

Connect: condition → relevant program; program → relevant condition/therapy; article → condition/program; doctor answer → deeper clinical guide.

Keep relevance high. Do not use random “you may also like” content.

### Callout

Use sparingly for: important clinical note; caution; policy; important takeaway; critical booking condition.

### Contact / Location

Address; map; travel directions; telephone; email; WhatsApp; airport/railway directions.

### Lead / Consultation CTA

A unified CTA system. May render as: CTA banner; inline CTA panel; modal/drawer trigger; sticky mobile CTA.

All should lead to the same underlying consultation mechanism.

Components: `ClosingCTA` ends a page **only when the page has no other CTA** (variants `photo` / `ground` / `compact`; vary them), one Gold primary button, contact lines. `FormSplit` holds the one consultation form (form first on phones).

## Card component family (Tile)

Marketing listings do not use cards. Each semantic card is a configuration of `Tile` (`components/editorial/Tile.jsx`): photograph and text directly on the ground, no border, shadow, radius or white card on linen. `Card` is for forms and dialogs only.

Semantic cards (configurations, not separate visual systems):

- ConditionCard
- ProgramCard
- TherapyCard
- RoomCard
- DoctorCard (uses `PortraitFrame`, 4:5)
- ArticleCard
- GuestStoryCard
- EventCard

Do not create one component with dozens of conditional fields. Each configuration picks the fields its entity needs.

All tiles share: typography (Light title, Regular body); square-cut photographs; hover (photograph scales to 1.02 inside its frame, `--tile-media-scale`, and the title takes a hairline underline — no lift, no shadow); focus ring; the whole tile is one link.

Ratios: listing tiles **4:3** (`--card-media-ratio`). Wide editorial frames **16:9**; doctors **4:5**; tall architecture **3:4**. **21:9** only through `PanoramaCaption`, with `mobileRatio` for phones. Heroes use a height (100svh / 72svh), not a ratio. `layout="row"` puts the photograph beside the text from 760px — for lists of articles or rooms.

**Grids:** `TileGrid` layout follows the count — 3 across, 2 across, or `feature` (one large, the rest beside it). Never an uneven last row. A listing too long for a photograph per item uses `IndexList`.

**Grounds:** large content grounds are Merino or Stone. At most **one** `BandStatement` (Himalaya + rosette band) per page — it is the page's accent. Pine is for `ClosingCTA` without a photograph and the footer. Photography grounds are heroes, `PanoramaCaption` and `ClosingCTA`.

Condition listing tiles: title + supporting sentence only. Do not repeat the group heading as a Badge, and do not add nights or decorative chips on that listing. Programme tiles may carry one focus label and a duration when those are not duplicated by a group heading.

Each tile presents information appropriate to its entity.

Example ProgramCard:

```text
photograph (4:3)
program name
one-line proposition
duration
```

Example DoctorCard:

```text
photo (4:5)
name
qualification
area of practice
```

In this kit, tiles are samples of the semantic jobs, not a production card library.

## Example page compositions

These are examples, not templates.

### Diabetes

```text
Editorial Hero
Rich Content
Expert Quote
Media + Content
Feature Grid
Related Program
Medical Reviewer
FAQ
Evidence / References
Related Content
Consultation CTA
```

### Arthritis

```text
Editorial Hero
Key Facts
Rich Content
Media + Content
Therapy Card Collection
Expert Section
FAQ
Evidence / References
Consultation CTA
```

The Arthritis page does not need to copy Diabetes.

### Weight Management Program

```text
Program Hero
Key Facts
Rich Content: Who This Is For
Feature Grid: Inclusions
Package / Pricing Options   ← link to tariff card; do not invent rates
Process
Timeline: Typical Day
Therapy Card Collection
Doctor / Expert Section
Gallery
Testimonials
FAQ
Consultation CTA
```

### Executive Wellness

```text
Program Hero
Rich Content
Feature Grid
Package Table               ← tariff card if figures are required
Media + Content
FAQ
Consultation CTA
```

### Therapies

```text
Editorial Hero
Rich Content
Therapy Card Collection
Media + Content
FAQ
Consultation CTA
```

### Rooms & Suites

```text
Immersive or Editorial Hero
Room Card Collection
Comparison Table
Gallery
Feature Grid
Consultation CTA
```

### Farm & Dining

```text
Immersive Hero
Media + Content
Feature Grid
Full-width Media
Table: Sample Menu
Gallery
FAQ
Consultation CTA
```

### A Day at Shantara

```text
Immersive Hero
Rich Content
Timeline
Gallery
Consultation CTA
```

### Our Story

```text
Immersive Hero
Media + Content
Timeline
Stats / Proof
Gallery
Rich Content
Consultation CTA
```

### Our Approach

```text
Editorial Hero
Rich Content
Feature Grid
Process
Media + Content
Expert Section
FAQ
Consultation CTA
```

### Book a Consultation

```text
Compact or Conversion-focused Hero
Rich Content
Consultation Form
Process: What Happens Next
Trust / Credentials
FAQ
```

### Contact

```text
Compact Hero
Contact / Location
Directions
Media + Content if useful
FAQ
Consultation CTA
```

### Policy

```text
Compact Hero
Rich Content
optional Table/Callout
```

## Managing design-system growth

When a new design requirement appears:

1. Try an existing section unchanged.
2. Try a small, broadly useful variant.
3. Only then create a new section.

Create a new section when the semantic job is genuinely different, it will likely recur, and forcing it into an existing section creates confusing fields or conditionals.

Do not create a new section when spacing is slightly different, one page wants an image on the opposite side, the heading is shorter, or one designer wants a novel decorative treatment.
