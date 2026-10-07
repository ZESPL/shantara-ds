# Workflow, QA, and what not to build

Back to the [website skill](SKILL.md).

## Page creation workflow

When adding or rebuilding a page, follow this sequence.

### Step 1 — Define the page job

Write down: audience (the health need, using the IDs in [SKILL.md §5](SKILL.md#section-5) — planning labels, not stored on records); search/user intent; one primary action; page type; main proof needed.

Do not treat a programme name as the audience.

### Step 2 — Check existing components

Use existing semantic sections first.

Do not create a new component just because a design mockup looks slightly different.

### Step 3 — Decide content order

Work backward from the visitor’s decision.

Ask: What must they understand first? What must they trust before the CTA? What objections remain?

### Step 4 — Build content

Use real, verified Shantara information.

Flag missing facts instead of inventing them.

### Step 5 — Add medical governance if required

For health/condition content ensure: reviewer; date; evidence; safe claims; author where appropriate.

### Step 6 — Add SEO metadata

Check: title; description; canonical; H1; OG; internal links. Rule IDs and checks: [search-visibility/overview.md](search-visibility/overview.md).

### Step 7 — Verify schema

Validate that generated schema: matches visible content; references correct entities; contains no invented values.

### Step 8 — Verify analytics

Only meaningful interactions should fire custom events.

### Step 9 — QA

Complete the checklists below.

## Scope

Match the checks to the change. A new or rebuilt page runs every checklist below that applies to it. A smaller change — a copy edit, one component, a style fix — runs only the items that change could affect: a copy edit checks copy, claims, naming and rates, not viewport layout or schema. Viewport checks (390 / 390 xl / 1440) apply when layout, chrome or type changed.

## QA Checklist — Every page

Before publishing a new or rebuilt page:

- [ ] Page has a clear purpose.
- [ ] Exactly one dominant next action is obvious.
- [ ] H1 is unique and descriptive.
- [ ] Hero variant fits the page job.
- [ ] First screen communicates useful information.
- [ ] Copy contains no invented Shantara facts.
- [ ] Images are real/relevant where possible.
- [ ] Layout works at mobile, tablet, and desktop widths.
- [ ] Heading hierarchy is logical.
- [ ] Links are crawlable anchors.
- [ ] No unnecessary component or decorative clutter.
- [ ] Primary CTA uses the unified enquiry flow and a visitor-facing label from skill-copy.md.
- [ ] Copy follows [skill-copy.md](skill-copy.md): no architecture notes, invented policies, scattered prices, or promised outcomes.
- [ ] Analytics context is correct.
- [ ] SEO title/meta/canonical are set for **this locale**.
- [ ] `hreflang` lists only published equivalents, plus `x-default`.
- [ ] Internal links stay in the current locale.
- [ ] `html` `lang` and `dir` match the locale.
- [ ] Language selector always renders (unavailable locales disabled, "Coming soon"); header from 1000px, menu sheet below; accessible; omits missing translations.
- [ ] Header fits at 390px with text size xl (lays out at 312px); every page has no horizontal overflow at 390 / 390 xl / 1440.
- [ ] Share image comes from the page's template (or an allowed override) and passes the checks in [skill-og-images.md](skill-og-images.md#9-checks).
- [ ] Schema matches visible content.
- [ ] Page is keyboard accessible.
- [ ] Images have correct alt behavior.
- [ ] Image files pass the checks in [skill-images.md](skill-images.md#7-checks): masters under 1 MB and 2560px, no photographs in `public/`.
- [ ] Performance has not materially regressed.
- [ ] No console errors.
- [ ] No broken links.
- [ ] No legacy “Welnez” branding remains accidentally.
- [ ] No rates, “from …” amounts, or stay totals appear except on a dedicated tariff surface.
- [ ] Photographs are square-cut and go through `Media`. Listing tiles 4:3; wide editorial 16:9; doctors 4:5; tall architecture 3:4; 21:9 only via `PanoramaCaption` with `mobileRatio`. Heroes use a height, not a ratio. Tiles hover with a 1.02 media scale and title underline — no lift, no shadow. Design and responsive checks: [skill-premium.md](skill-premium.md#review-checklist).
- [ ] Type on photography sits inside `--scrim-hero`, which covers the whole text block, in solid Merino — photo still readable above the type; no faded Merino mixes, no double scrims.
- [ ] Accordions expand with visible body (Programme “What to expect”, Home FAQ). After editing `components/**`, rebuild `_ds_bundle.js` with `node scripts/build-bundle.mjs` (components only — never kit copy). After editing entity facts, edit `content/` and run `node scripts/write-content-kit.mjs`. Run `node scripts/check-bundle.mjs` before shipping.
- [ ] At most one `BandStatement` (Himalaya + rosette band) per page. Other large grounds are Merino or Stone; Pine for `ClosingCTA` without a photograph and the footer.
- [ ] Type never sits on the rosette band; narrow surfaces drop the band.
- [ ] CTAs are short; no decorative Badge/Tag pills next to actions; no 2xs helper essays.
- [ ] Text-size control (if present) works at Larger without breaking layout.

## QA Checklist — Medical / condition content

Additionally verify:

- [ ] Medical reviewer is real and linked correctly.
- [ ] Qualifications are accurate.
- [ ] Last medically reviewed date is present.
- [ ] Material claims are supported by appropriate references.
- [ ] No unsupported cure/reversal guarantee exists.
- [ ] Medication advice is clinically safe and appropriately qualified.
- [ ] Testimonials are not presented as clinical proof.
- [ ] Relevant sources are displayed.
- [ ] Schema correctly links reviewer/condition/page.
- [ ] Content is educational, not disguised advertising.

## QA Checklist — Program pages

Verify:

- [ ] What the program is is immediately clear.
- [ ] Intended audience is clear.
- [ ] Audience is a health need where relevant, not only a programme name.
- [ ] Duration/options are clear.
- [ ] Inclusions are clear.
- [ ] Pricing is clear if the business has chosen to publish it — **via the tariff card, not copied onto the program page**.
- [ ] Clinical oversight is explained.
- [ ] Stay/experience is tangible.
- [ ] Relevant conditions/therapies are linked appropriately.
- [ ] FAQs address real booking concerns.
- [ ] Book a Consultation is the primary action.
- [ ] No clinical result is guaranteed.

## QA Checklist — Lead capture

Verify:

- [ ] Same consultation fields are used everywhere.
- [ ] Form does not ask unnecessary medical questions.
- [ ] Source page/context and locale are captured automatically.
- [ ] Field keys stay `full_name`, `phone`, `email`, `country`, `notes`.
- [ ] Form success is confirmed before `generate_lead`.
- [ ] OpenPanel receives the form's keyed fields and identifies a profile (`profileId` is the email, otherwise the phone).
- [ ] GA4 receives no name, email, or phone, and no free text or written answers.
- [ ] Neither OpenPanel nor GA4 receives diagnosis, symptoms, medication, medical history, or other health information.
- [ ] CTA click is not counted as a successful lead.
- [ ] WhatsApp/phone/email use `contact_click`.
- [ ] Success state tells the visitor what happens next.
- [ ] No stay totals are calculated on the form.

## QA Checklist — Analytics

Verify event naming exactly:

```text
consultation_cta_click
form_start
generate_lead
contact_click
```

Verify controlled properties, including `locale` added centrally.

Do not create `consultation_cta_click_ar` or send translated medical free text.

Do not create new event names unless the event will answer a real business question.

## QA Checklist — Publishing

Before publishing recurring content:

- [ ] Why does this content deserve to exist?
- [ ] Is it original to Shantara or its experts?
- [ ] Is the author/reviewer appropriate?
- [ ] Does it add first-hand experience, expertise, or authority?
- [ ] Is it more useful than a generic search result?
- [ ] Are claims supported?
- [ ] Does it connect to a relevant core page?
- [ ] Does it have an appropriate next action?
- [ ] Is there a reason to keep it updated?

If the answer is mostly “we need more SEO content”, do not publish it.

## What not to build

Do not introduce these without a demonstrated need:

- rigid page templates for every content family;
- condition-category SEO hubs;
- ICP-named category URLs or one landing page per ICP name;
- individual therapy pages by default;
- individual room pages by default;
- multiple consultation forms;
- multiple synonymous primary CTAs;
- generic drag-and-drop rows/columns/spacers;
- one universal card with dozens of props;
- one universal hero with dozens of props;
- 10+ hero variants;
- separate AEO/GEO content systems;
- separate analytics implementations for GA4 and OpenPanel;
- CRM lifecycle analytics at launch;
- custom backend only for analytics;
- excessive tracking events;
- fake E-E-A-T badges;
- fake review schema;
- unsupported medical claims;
- automatically refreshed content dates;
- hundreds of generic AI-written articles;
- keyword-variation landing pages;
- complex personalization before sufficient traffic exists;
- a complete production website inside this design-system kit;
- a translation platform, runtime MT, IP geolocation, a second Arabic frontend, or placeholder pages for unpublished locales;
- stack substitutes forbidden in [skill-stack.md](skill-stack.md): third-party component libraries; Motion/GSAP by default; Redux/Zustand; Postgres/Supabase/Prisma or a separate API; custom forms backend instead of Web3Forms; GitHub Actions that deploy (Netlify owns deploy);
- video files in the repository, local video paths, or YouTube, Vimeo, Cloudflare Stream, Mux or iframe players — native `<video>` on Cloudflare R2 only ([skill-video.md](skill-video.md));
- motion or “premium” chrome that breaks [skill-premium.md](skill-premium.md): preloaders, homepage carousels, scroll hijacking, letter-scramble text, animation on every section.

## Migration / legacy brand rules

Because Welnez is the former name:

- use Shantara in all new visible copy;
- inspect legacy URLs before changing them;
- preserve valuable inbound URLs with permanent redirects;
- update canonical tags;
- update Organization/entity references;
- update sitemap and social metadata;
- update business listings where part of the migration plan;
- do not mass-delete old URLs without checking traffic/backlinks;
- do not leave both brands as competing page titles unless there is a deliberate transitional requirement.

## Definition of done

A website change is complete only when, for everything it touches, it is:

- visually integrated with the design system;
- mobile-responsive;
- accessible;
- performant;
- content-complete;
- SEO-complete;
- schema-correct where relevant;
- analytics-aware where relevant;
- privacy-safe;
- medically governed where relevant;
- locale-correct (`lang`/`dir`, prefixed URLs, no mixed-language page);
- tested;
- not unnecessarily complex.

“Code compiles” is not the definition of done. Verify only what the change could affect; see [Scope](#scope).

Agent behaviour rules live in [SKILL.md §13](SKILL.md#section-13).
