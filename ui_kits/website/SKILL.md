---
name: shantara-website
description: >
  Build, extend, review, and manage Shantara's public marketing website.
  Use when working on information architecture, page composition, design-system
  sections, CMS modeling, content publishing, lead capture, analytics, SEO,
  schema, AEO/GEO, E-E-A-T, accessibility, performance, video, or website QA.
---

# Shantara Website Skill

This is the website-building skill. The Website Kit (`ui_kits/website/`) is the place humans and agents read it. Sample screens here illustrate composition — they are **not** a production website.

Entity facts for programmes, rooms, conditions, NAP, and tariff live in [`content/`](../../content/). Prefer those records over inventing local arrays. Use [`docs/handbook.txt`](../../docs/handbook.txt) for policies and `[TO CONFIRM]` flags — not for hero copy. Never quote handbook §15 as public language. Start from root [`AGENTS.md`](../../AGENTS.md).

Read this file first. Open a sibling reference only when the task needs that inventory:

- [Production stack](skill-stack.md) — Astro, Keystatic, Tailwind, Netlify, analytics/SEO services; locked defaults for shantara.life
- [Folder structure](skill-structure.md) — folder layout, route table, data sources, Keystatic scope and build checks for the shantara.life Astro repo
- [Images](skill-images.md) — where image files go in the Astro repo, preparing files before commit, widths and formats, build checks
- [Share images](skill-og-images.md) — Open Graph and Twitter card images: three templates, page metadata and fallbacks, Astro build-time generation, manual overrides, checks
- [Icons](skill-icons.md) — favicon, iOS touch icon, Android home-screen icons, web manifest and browser theme colour: the seven files, `<head>` tags, rebuild and checks
- [Video](skill-video.md) — Cloudflare R2 + CDN only, native `<video>`, VideoObject, video sitemap, no committed files and no third-party players
- [Premium design](skill-premium.md) — build order, design-system rules from the brand deck (type voices, grounds, shape, buttons, tiles, component map, responsive rules), motion vocabulary
- [Information architecture](skill-ia.md) — nav, URLs, page inventory, publishing families
- [Sections and composition](skill-sections.md) — heroes, section library → components, tiles, example pages
- [Content and leads](skill-content.md) — CMS entities, publishing, E-E-A-T, consultation form
- [Language and copywriting](skill-copy.md) — public-facing website language
- [Technical](skill-technical.md) — analytics, SEO, schema, AEO/GEO, performance, accessibility
- [Search and AI visibility rules](search-visibility/overview.md) — checkable rules with IDs, priorities and owners for SEO, AI answers, schema, languages and accessibility; read the overview, then only the section file you need
- [QA and workflow](skill-qa.md) — page workflow, checklists, what not to build, agent rules

Internal audience strategy (need-led ICPs, CRM IDs, agency requirements) lives in [`docs/icp.md`](../../docs/icp.md). Do not duplicate those definitions here. Do not use internal ICP names as website headings or keywords unless search research supports that language.

The brand rules in the root `SKILL.md` apply here too. Check them before inventing visual or clinical language.

**Multilingual is architectural for the public website.** Central config: `locales.js`. Planned languages: English (`en`, source, currently published), Arabic (`ar`, first future localisation, RTL ready now), then German, French, Russian, Hindi, Malayalam. Malayalam is conditional — see [`docs/icp.md`](../../docs/icp.md). Do not translate the site in this kit. The design-system catalog, guidelines, and component docs stay English — do not localise them. Read [§15 Multilingual Architecture](#section-15) before adding a route, string, or content type.

## 1. Purpose

Shantara is a **naturopathy retreat** — a doctor-led residential clinic guests stay at in Kozhikode. Internally, treat it as a **clinical hotel**: a good hotel that has a clinic, not a hospital. That phrase is not a public product name. Do not describe the product line as a “naturopathy and wellness retreat.” **Wellness** is a discovery gloss only (how some markets type intent); it is not the product type. Public naming: [skill-copy.md](skill-copy.md). Schema / titles: [skill-technical.md](skill-technical.md).

**Welnez is the former name; use Shantara as the current brand name.** Do not introduce "Welnez" into new public-facing copy unless the task explicitly concerns legacy content, redirects, historical references, or migration.

The website is a **marketing, trust, education, and lead-generation website**, not a web application. Production technology is fixed in [skill-stack.md](skill-stack.md) (Astro + TypeScript + Tailwind + Keystatic on Netlify for **shantara.life**). Do not introduce alternate frameworks, UI kits, databases, or animation libraries without updating that file.

Prospective guests should answer, with minimum friction:

1. What is Shantara?
2. Can Shantara help with my need or condition?
3. What program or experience is relevant to me?
4. What actually happens during a stay?
5. Who is responsible for the clinical guidance?
6. Why should I trust Shantara?
7. What is included, how long does it take, and what may it cost?
8. What should I do next?

Primary business action, in visitor-facing language:

> **Book a Consultation**

Form chrome may use **Send your details**. Make the action easy without becoming aggressive, cluttered, or sales-heavy. Do not invent parallel primary CTAs. Do not use **Enquire about a stay** or **Request a consultation** as visitor-facing primary CTAs.

Rates, currency amounts, “from …” figures, and stay totals appear **only** on the production tariff page, read from the Keystatic tariff. This design system and its documentation hold no rates, currencies or validity dates — the kit tariff screen and brand-deck tariff slides show the structure with “—”. Program, condition, enquiry, and home pages **link** to the tariff page. Do not invent prices.

## 2. Operating principles

1. **Keep the architecture simple.** No generic page builder, no large backend for a marketing site, no CRM “just in case”, no dozens of analytics events, no hundreds of SEO landing pages, no parallel lead-capture flows, no one-component-per-page, no universal component with dozens of switches.
2. **Page type describes meaning, not layout.** Types: home, condition, program, experience, doctor, about, article, contact, consultation, policy. Use them for CMS, schema, analytics, breadcrumbs, indexing — not to force a fixed template. A Diabetes page and an Arthritis page may use different sections.
3. **Flexible pages, constrained sections.** Editors pick semantic sections (Process, FAQ, Expert, Gallery, Pricing, Feature Grid, Timeline) — not Spacer, Row, Column, Heading, Paragraph, Button, or 50/50 layout.
4. **One system wherever possible.** One consultation form, one lead entity, one analytics abstraction, one SEO metadata system, one schema generator, one type system, one spacing system, one section library, **one locale architecture**. Same components, sections, content models, tokens, analytics, schema, and lead form for every locale. Do not create `HomeEn` / `HomeAr`.
5. **Evidence close to claims.** Medical claim → expert + source. Clinical process → doctor explanation. Program claim → inclusions/process. Guest experience → real photography/testimonial. Accreditation → exact credential. Facility claim → real facility photography.

## 3. Mental model

The site must not become a collection of page templates or a generic visual page builder.

It should become **a flexible publishing system built from a small, deliberate library of semantic components, with one lead journey, one content truth, and strong clinical trust.**

When uncertain, choose the simpler implementation that preserves that model.

Three layers:

```text
UI primitives  →  Semantic reusable sections  →  Flexible pages
```

Primitives are developer-level (Container, Heading, Button, Form Field, Accordion…). Sections are CMS-level and semantic. Pages assemble sections; they are not fixed templates.

## 4. Information architecture

Top-level navigation — **five items, no more**, centred between the logo and the actions on desktop:

- Programmes
- Conditions
- Experience
- About
- Journal

Header actions: `LanguageSelector` (desktop; inside the menu sheet under 1000px), a **phone button** that opens a dropdown (Call +91 9553 600 100 · WhatsApp · Email heal@shantara.life), and **Book a Consultation** (primary CTA). Contact is reached from the phone dropdown and the footer, not the main nav. The call number (`phone`) and the WhatsApp number (`whatsapp`) are separate fields in `content/site.json`; both are currently **+91 9553 600 100**.

Do not create a mega-menu unless live page count genuinely requires it.

URL families are **locale-prefixed for every language, including English**:

```text
/en/conditions
/en/conditions/diabetes
/en/programs
/en/programs/[program-slug]
```

Root `/` is the x-default entry and redirects to `/en/` (or a remembered enabled locale). Do not force locale by IP. Do not leave `/` and `/en/` both indexable. Only a published localized URL is canonical.

Do not invent condition-category SEO hubs (`/en/conditions/metabolic-lifestyle/diabetes`). Group visually on `/en/conditions` without creating indexable category pages.

Create a condition page only when Shantara can provide original content, a legitimate clinical perspective, a relevant program, medical review, and useful answers. Do not pre-build dozens of thin condition pages.

Experience pages (typical, not mandatory as individual URLs): Therapies, Rooms & Suites, Amenities & Activities, Farm & Dining, A Day at Shantara. Do not create a page per therapy or room category by default.

About: Our Story, Our Approach, Our Doctors, Medical Editorial Policy.

Utility: Book a Consultation, Contact, Resident Policies, Cancellation Policy, Privacy Policy, Terms of Service.

Full inventory, publishing families, and URL rules: [skill-ia.md](skill-ia.md).

## 5. Compose a page

Every flexible content page conceptually contains title, slug, `page_type`, navigation metadata, SEO/social metadata, medical/editorial metadata when applicable, and `sections[]`.

Before composing:

1. Audience — when the page is for a health need, name the need: `weight_metabolic`, `pain_mobility`, `stress_sleep_burnout`, `digestive_inflammatory`, `hormonal_vitality`, `healthy_ageing_longevity`, or secondary `short_reset`. Audience is the need, not the programme name. These IDs are planning labels only — never stored on content records or shown on the page. Open [`docs/icp.md`](../../docs/icp.md) only for audience-strategy work.
2. Intent
3. Primary action
4. Proof required
5. Objections
6. Information priority

Then choose sections. Do not start by copying another page’s layout.

Heroes are a **family**, not one universal Hero with 30 props, and not 12 variants:

| Hero | Job | Typical uses | Component |
| --- | --- | --- | --- |
| Immersive | Place, emotion, photography | Home, Experience | `HeroFullBleed` |
| Offer | Commercial page, high intent | Programme pages, Rooms and tariffs (duration/options, suitability, Book a Consultation — **no invented price**) | `HeroSplit` + booking panel |
| Editorial / utility | Topic + readability | Conditions, About, Journal, Contact, Book a Consultation | `HeroStatement` with a rosette band (`pattern`) or a side image — never "naked" |
| Article | One Journal article | `/en/journal/<slug>` | `ArticleHeader` |

No eyebrows anywhere: no small uppercase label above a hero, section or card title. Category, duration or place goes in a caption meta row **below** the title (`meta` prop / `MetaRow`).

`ClosingCTA` only on pages that otherwise have no CTA (not Home, Programme, Tariffs or Book a Consultation). Vary its variants (`photo` / `ground` / `compact`) across pages.

Section library and example compositions: [skill-sections.md](skill-sections.md).

Sections are built from `components/sections/` (inside `Section`, which sets one of five grounds) and `components/editorial/`. Listings use `Tile`, not `Card` (`Card` is forms and dialogs only). Semantic cards — `ConditionCard`, `ProgramCard`, `TherapyCard`, `RoomCard`, `DoctorCard`, `ArticleCard`, `GuestStoryCard`, `EventCard` — are `Tile` configurations sharing type, square-cut photographs, hover and focus. Do not make one component with dozens of conditional fields.

Visual direction: calm, premium, natural, clinically credible, spacious, human, restrained. Prefer real Shantara photography. Avoid crowded cards, excessive badges/gradients, decorative animation, wellness clichés, unrelated stock, and oversized “premium” chrome. Full premium / motion rules: [skill-premium.md](skill-premium.md).

## 6. Lead capture

**One** consultation form. The visitor-facing primary CTA is **Book a Consultation**.

Form chrome may use **Send your details**. Avoid parallel CTAs (Enquire about a stay, Request a consultation, Enquire Now, Request Callback, Know More, Get Quote, Start Journey, Begin your transformation) unless a genuinely different action exists. Visitor-facing labels follow [skill-copy.md](skill-copy.md).

Recommended fields:

- Name
- Mobile / WhatsApp number
- Email — optional
- Country
- Anything you'd like us to know? — optional

Do not turn first contact into a medical intake. Do not ask questions merely because a CRM has fields. Do not calculate stay totals on this form.

Automatically attach locale, source URL, page type, content id/name, program/condition context, landing page, referrer, UTMs, timestamp. If the visitor submits from `/en/conditions/diabetes`, do not ask “Which condition?”. Field **keys** stay `full_name`, `phone`, `email`, `country`, `notes` in every language — labels translate, keys do not.

Same form may appear as `/en/book-consultation`, modal, drawer, or inline panel. WhatsApp is a secondary channel, not a second lead architecture.

Success copy:

> Consultation request received. Our team will contact you to understand your requirements and guide you on the appropriate next step.

Fire `generate_lead` **only after** the destination confirms success. A button click is not a lead.

## 7. Analytics

One internal `track("event_name", properties)` abstraction. May forward to OpenPanel and GA4. Do not scatter `gtag` / `openpanel.track` in components.

Launch custom events only:

| Event | When | Properties |
| --- | --- | --- |
| `consultation_cta_click` | Book Consultation CTA clicked | `page_type`, `content_id`, `content_name`, `cta_location` (`header` / `hero` / `inline` / `bottom` / `sticky`), `locale` |
| `form_start` | Form genuinely started | `form_id`, `page_type`, `locale` |
| `generate_lead` | Submission confirmed | `form_id`, `page_type`, `source_page`, `locale` |
| `contact_click` | WhatsApp / phone / email | `contact_method`, `page_type`, `cta_location`, `locale` |

`locale` is attached centrally by `ShantaraLocales.track()`. Do not create `consultation_cta_click_ar`. Do not send translated user-entered medical data to analytics.

Never send name, email, phone, free text, diagnosis, symptoms, medication, or medical history to GA4 or OpenPanel.

Primary funnel: Page View → Consultation CTA Click → Form Start → Generate Lead.

## 8. SEO, schema, AEO

SEO is part of the page system. Every **published localized** page: own URL, localized title/description/OG, self-referencing canonical, `hreflang` (only for locales that actually have that page), `inLanguage`, crawlable internal links in the current locale.

Prefer `/en/conditions/diabetes` and `/en/programs/weight-management`. Avoid keyword-variation pages and invented hub depth. Do not canonicalize a translation back to English.

Generate schema from visible entity data. One Shantara organization `@id` across locales. Doctor and program identities stay stable; names may translate. Do not add invisible claims. Do not ask editors to write JSON-LD. `Offer` only where real visible commercial information exists — in this repo, that means the tariff card, not invented program prices.

Do not create separate “AEO pages” or “GEO pages”. Answer real questions first, then expand. Prefer first-party facts over generic wellness copy. Do not treat `llms.txt` as a major SEO project.

Details: [skill-technical.md](skill-technical.md).

## 9. E-E-A-T and copy

Health content is an architectural requirement, not a badge.

- Identify author/reviewer, qualifications, last medically reviewed date, and references on medical pages. English medical review does **not** make a translation trustworthy. A translated page must not imply that the English medical reviewer reviewed the translation unless that is true.
- Maintain a public Medical Editorial Policy.
- Do not fake freshness by changing dates on every deploy.
- Testimonials describe experience, stay, food, service, how the guest felt — never clinical efficacy.
- Avoid “cures diabetes”, “guarantees reversal”, “eliminates hypertension”, “permanent cure”, guaranteed detox claims. The programme name **Diabetes Reversal** is approved for catalogue use; do not present reversal as a guaranteed outcome or invent rates.

**All public-facing language follows [skill-copy.md](skill-copy.md).** Clarity first, warmth second, brand expression third. Write for a prospective guest. Do not narrate information architecture, invent booking restrictions or site-wide minimum stays, scatter prices, or convert design rationale into page copy.

Do not invent content, credentials, prices, medical facts, or program details. Flag missing facts.

## 10. Performance and accessibility

Marketing site: prefer static generation / prerendering. Minimize client JS. Hydrate only forms, navigation, gallery, accordion, modal/drawer, analytics, video.

Accessibility is baseline: semantic headings, keyboard access, visible focus, meaningful alt, labelled fields, associated errors, contrast, 44px touch targets, reduced-motion, correct ARIA on accordion/dialog, captions/transcripts when needed. Set `html` `lang` and `dir` from the locale. Language selector must have an accessible name, current-locale state, keyboard support, and visible focus. Annotate passages in another language. Do not rely on color alone.

This kit follows the design-system accessibility contract in `guidelines/accessibility.html`.

## 11. Page workflow

1. Define the page job (audience, intent, one primary action, page type, proof). When the page serves a health need, name the need (IDs in §5). Do not organise the sitemap as one URL per ICP.
2. Reuse existing semantic sections.
3. Order content from the visitor’s decision backward.
4. Use real, verified Shantara information; flag gaps.
5. Add medical governance if the page is health/condition content.
6. Add SEO metadata.
7. Verify schema matches visible content.
8. Verify only meaningful analytics events fire.
9. Run the QA checklists in [skill-qa.md](skill-qa.md).

## 12. What not to build

Do not introduce without a demonstrated need: rigid templates per content family; condition-category SEO hubs; ICP-named category URLs; individual therapy/room pages by default; multiple consultation forms or synonymous primary CTAs; drag-and-drop spacers/rows; one universal card or hero with dozens of props; 10+ hero variants; separate AEO/GEO systems; separate GA4 and OpenPanel implementations; CRM lifecycle analytics at launch; custom backend only for analytics; excessive events; fake E-E-A-T badges or review schema; unsupported medical claims; automatically refreshed dates; hundreds of generic AI articles; keyword-variation landers; complex personalization before traffic exists; a translation platform, translation SaaS, runtime machine translation, IP geolocation, a second Arabic frontend, duplicated content types, or placeholder DE/FR/RU/HI/ML pages; stack substitutes listed as **None** in [skill-stack.md](skill-stack.md) (component libraries, Motion/GSAP, Redux/Zustand, databases/APIs, CI deploy).

Do not build the entire production website inside this kit. Samples stay thin.

## 13. Agent behavior

When asked to modify Shantara’s website:

1. Inspect the existing implementation before changing architecture.
2. Preserve working patterns unless there is a clear reason to replace them.
3. Make the least invasive change that solves the task.
4. Reuse existing sections/components.
5. Do not invent content, credentials, prices, medical facts, or program details. Prefer `content/`; empty folders and `draft` records mean do not fabricate.
6. Flag missing information explicitly.
7. Do not introduce dependencies casually.
8. Do not redesign unrelated pages.
9. Do not create a new abstraction for a one-off case unless it is clearly reusable.
10. Preserve accessibility, SEO, analytics, and schema behavior during changes.
11. Test responsive behavior when layout, chrome or type changed.
12. Verify no health/PII data is sent to analytics.
13. Prefer clear implementation over clever implementation.
14. If requirements conflict, prioritize: factual/clinical safety → user clarity → conversion simplicity → maintainability → design consistency → implementation elegance.

Definition of done and how far to verify: [skill-qa.md](skill-qa.md#definition-of-done). Scale the checks to the change — a copy edit is not a full page audit. “Code compiles” is not done.

## 14. Sample kit map

These files are **previews** of the skill, not the live site:

| Sample | Skill page type | Notes |
| --- | --- | --- |
| `screens/HomeScreen.js` | home | `HeroFullBleed`, approach, doctors, programme tiles + roomy index, therapies, rooms, journal, FAQ |
| `screens/ConditionsScreen.js` | condition listing | Visual grouping only — no category URLs |
| `screens/ProgrammeScreen.js` | program | `HeroSplit` + booking panel; tariff link, no rates |
| `screens/ExperienceScreen.js` | experience hub | Therapies, rooms, farm, a day — not one page per room |
| `screens/AboutScreen.js` | about hub | Story, approach, doctors, editorial policy |
| `screens/JournalScreen.js` | article listing | `HeroStatement` → `Tabs` → `TileGrid` → `Pagination` |
| `screens/ArticleScreen.js` | article | `#/en/journal/<slug>`: `ArticleHeader`, `Prose`, `TableOfContents`, `ReviewedBy`, `ShareBar`, `AuthorCard`, `RelatedArticles` (kit body is a marked sample) |
| `screens/ContactScreen.js` | contact | `HeroStatement` + NAP (Shantara Naturopathy Retreat), distances, call / WhatsApp / email |
| `screens/ConsultationScreen.js` | consultation | One short form |
| `screens/TariffScreen.js` | pricing surface | Structure only: currency selector, room × occupancy table, supplements, payment terms and cancellation, with “—” in place of every rate |
| `chrome/SiteChrome.js` | chrome | Header overlays every page: logo, five centred nav items, LanguageSelector, phone dropdown, Book a Consultation; menu sheet (with the LanguageSelector) under 1000px; compact wordmark / frangipani mark at narrow or zoomed widths. Footer: Pine Tree ground, rosette strip on top, brand column (NAP and social profile links) + three link columns (accordions under 760px); the bottom bar carries the copyright (legal entity, Metropolis Forward LLP), the Privacy and Terms links and the short location line. The text-size control is optional; the kit shows one, the production footer does not include it. Also `PageSlot` (`data-ds-id="page/<view>/<slot>"` on every section) |
| `chrome/Photo.js` | chrome | Adapter over `Media` for `assets/photos/*` |

Kit notes for humans: [README.md](README.md).

## 15. Multilingual Architecture

This is one website, one component system, one content architecture, one lead system, one analytics system. Localisation is additive. Do not restructure the site to add a language.

### Planned languages

Approved marketing-localisation order lives in [`docs/icp.md`](../../docs/icp.md) (Geography × Language). Do not duplicate ICP strategy here. Do not treat this list as a geo-spend ranking.

| Code | Native name | Direction | Role now |
| --- | --- | --- | --- |
| `en` | English | LTR | **Source.** Currently published. The only enabled locale. |
| `ar` | العربية | RTL | **First future localisation.** Website architecture must already support Arabic, including RTL. Do not translate the full site now. |
| `de` | Deutsch | LTR | Planned. Separate future project. |
| `fr` | Français | LTR | Planned. Separate future project. |
| `ru` | Русский | LTR | Planned. Separate future project. |
| `hi` | हिन्दी | LTR | Planned. Separate future project. Do not write public Hindi copy in this kit. |
| `ml` | മലയാളം | LTR | Planned, **conditional** (meaningful local Kerala/local acquisition). Do not write public Malayalam copy in this kit. |

Italian (`it`) and Spanish (`es`) are not current marketing-localisation priorities and are not planned codes.

Build English first. Additional languages are introduced without restructuring. Each additional language is its own content and review project. Architecture is ready for all seven from the beginning.

The **design-system catalog, guidelines, and component documentation stay English.** Do not localise them. Do not add locale-prefixed catalog URLs, translated guideline cards, or multilingual DS documentation. Multilingual architecture applies to the public website only.

Central config: **`locales.js`** (`window.ShantaraLocales`). `SUPPORTED` = all seven. `ENABLED` / published = only `en` until a localisation project turns another `enabled: true`. Do not duplicate this table.

### English first; Arabic next

English is the source of truth. Do not machine-translate pages. Do not invent DE/FR/RU/HI/ML content. Catalog RTL toggles are development fixtures for component layout, not published website copy.

Arabic is the first language to localise later. When that project starts: enable `ar` in `locales.js`, translate UI strings and editorial records separately, run language review, and run localized clinical review where required. Do not stand up a second frontend or a second deployment.

### URLs, slugs, root

Every published URL is locale-prefixed, including English: `/en/`, `/en/programs`, later `/ar/…`.

- `/` is x-default. It may redirect to `/en/` or a remembered **enabled** locale. It is not a second indexable English homepage.
- `/en` normalises to `/en/`. Other paths drop a trailing slash.
- `/ar` and `/ar/` are not published while `ar` is disabled.
- Do not force locale by IP. `Accept-Language` may **suggest** once; an explicit choice is remembered (`shantara-locale`). The suggestion is never irreversible.
- Content identity uses stable internal IDs, not translated slugs. Relationships reference IDs. Localized slugs are allowed later; until then English slugs may be reused under the locale prefix (`/ar/programs/detox`). Document the reuse; do not make identity depend on the slug.

### Language selector

`LanguageSelector` is a reusable control the website consumes (`components/navigation/LanguageSelector.jsx`). Desktop and mobile nav. Keyboard and screen-reader accessible. Native names in the list; compact `EN AR DE FR RU HI ML` on the trigger. **No flags.** Its catalog prompt stays English.

It always renders (globe + current code + chevron); planned locales that are not enabled are listed disabled with "Coming soon". In the kit it sits in the header actions from 1000px and inside the menu sheet below that. It only links to enabled locales. For a given page it only links to a **published equivalent** of that page. Prefer omit if that page is not translated. Do not dump the visitor on the homepage unless the UI makes the gap obvious.

### Content model

Page / entity → source record → localized records per locale. Same section composition. Only English is populated initially.

Each language is a folder of files with the same filenames as English, holding only the translatable text. The only publishing field is `status` (`draft` / `published`). There are no translation review fields: the build warns when the English file was committed after its translation. A translation publishes independently — it must not block English. Full model: [skill-content.md](skill-content.md#languages).

**Medical workflow (documented, not a workflow engine):** English source → clinical/medical review of the source → translation → language review → medical terminology / localized clinical review where required → localized publication.

Distinguish: medical review of the English source; language/translation review; localized clinical review. Schema and bylines must not claim the English reviewer signed off the translation unless they did. E-E-A-T applies independently per translation. Do not strengthen or weaken claims, change certainty, medication, terminology, or contraindications in translation.

UI strings (nav, buttons, form labels, validation, statuses) live in a locale dictionary. Editorial content (heroes, programs, clinical, FAQs, testimonials, articles) lives on the entity. Not one massive file. Do not embed marketing sentences in presentation components.

### Fallback and collections

Never silently mix languages on one page. Never render an English body under an `/ar/` URL. If a translated page does not exist, do not fabricate it. Omit the link, or explicitly offer English. Related programs on an Arabic page return Arabic records where available. Do not expose untranslated drafts.

Internal links are generated centrally (`localePath`). Stay in the current locale when the equivalent exists.

### RTL, type, formatting

`html` `dir` comes from the locale. One stylesheet. Logical CSS (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start`). Directional icons may flip; logos, media, phone numbers, emails, URLs, and numerals do not auto-mirror. Mixed-script runs use `dir=auto` or `.shantara-dir-ltr` / `.shantara-dir-rtl`.

Diodrum covers Latin and Cyrillic. **IBM Plex Sans Arabic** is the Arabic counterpart (weights 300–600). Do not add extra families until a localisation project needs them. Hindi and Malayalam use Indic scripts; choose and load a type pairing when those projects start. Arabic uses more line-height; headings must not clip; buttons and cards grow with copy. No English-length fixed heights.

**Locale is not currency.** Arabic does not imply AED. English does not imply INR. Format currency only with an explicit ISO code, and only on a tariff surface. Dates, numbers, and lists go through `Intl` helpers on `ShantaraLocales`.

### SEO, schema, analytics

Each published localized page has its own URL, localized metadata, self-canonical, and reciprocal `hreflang` (enabled locales that actually have that page) plus `x-default`. XML sitemap lists only published localized URLs. Do not generate seven empty trees.

Schema: one Organization `@id`. WebPage `url` and `inLanguage` follow the locale. Doctor and program `@id`s stay stable across locales.

`track(name, props)` adds `locale` centrally. Event names stay English.

### This kit vs production

Sample screens illustrate the skill. They are not a production website. The kit uses hash routes (`#/en/`, `#/en/programs`) that map to the production URL families above. Catalog LTR/RTL and `ui_kits/website/?fixture=rtl` are **development fixtures** for visual QA — they are not published Arabic pages.

Initial build in this system: English samples, locale-aware routing, central config, LanguageSelector (always rendered; other locales "Coming soon"), RTL-ready components, Arabic type tokens, localized metadata helpers, hreflang/sitemap/schema/analytics helpers, documentation. Not a translated website.

