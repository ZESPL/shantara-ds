# Production folder structure

Back to the [website skill](SKILL.md).

This file sets the folder layout, routes and data sources for the **shantara.life** Astro repository. The stack itself is locked in [skill-stack.md](skill-stack.md). This design system is not the Astro app. Build this structure in the website repository.

**Status: decided 2026-09-25.** [skill-ia.md](skill-ia.md), [skill-content.md](skill-content.md), [skill-stack.md](skill-stack.md) and the [search visibility rules](search-visibility/overview.md) match this file. If you find a conflict, this file wins; fix the other file in the same change.

## Decisions

| # | Decision | What it means in the code |
| --- | --- | --- |
| 1 | **No page builder, ever** | Page structure, section order, intro copy and SEO for fixed pages are written in code. Keystatic holds entities only. There is no `pages` collection and no block lists. |
| 2 | **Articles and Doctor Answers live under `/en/journal`** | The listing is `/en/journal`. Pagination is `/en/journal/2`. Entries are `/en/journal/{slug}`. Articles and Doctor Answers share one slug space. |
| 3 | **FAQs are split in two** | Conditions and programmes keep their own `faqs` field. General FAQs sit in the `faq/en.json` singleton and render on `/en/faq`. |
| 4 | **Therapies and rooms get one page each** | Both are flat files (`therapies.astro`, `rooms.astro`). A CI check fails the build if a `therapies/` or `rooms/` route folder appears. |
| 5 | **Keystatic is the only schema. There is no Zod** | `keystatic.config.ts` defines every field. Pages read content through the Keystatic reader, which is typed from that config. There is no `content.config.ts`, no Astro Content Collections and no Zod. Staff do not edit in Keystatic, so it runs in `local` mode and the `/keystatic` admin loads only in development. Medical categories are not modelled. |
| 6 | **Authors and testimonials are added now** | Add `authors/en/` and `testimonials/en/`. Testimonials publish only when `consent_status` is `recorded`. |
| 7 | **Keys and analytics IDs are environment variables** | Keys and IDs never go in `src/content/`. Keep them in Netlify environment variables and document them in `.env.example`. |
| 8 | **Singletons are per language** | Singletons use `site/{locale}.json`, `tariff/{locale}.json` and `faq/{locale}.json`. English is the master copy. |
| 9 | **Doctors are `Person` nodes, and pages carry a `BreadcrumbList`** | Use `Person`, never `Physician`, which Schema.org defines as a medical business ([SCHEMA-09](search-visibility/schema.md)). Programmes use `Service` with no `offers` ([SCHEMA-10](search-visibility/schema.md)). |
| 10 | **Code says `program`, copy says programme** | Folder names, URLs, collection names, `related_pages` types, TypeScript types and schema `@id` values all use `program`. Only visible copy says "programme". |
| 11 | **One page lists all doctors, and only two doctors get a profile page** | `/en/our-doctors` lists every doctor, each with an anchor section. Only Dr. P.A. Kareem (`/en/doctors/pa-kareem`) and Dr. Bahja Janu (`/en/doctors/bahja-janu`) have a profile page. The allowlist `DOCTOR_PROFILES` in `lib/routes.ts` controls this. No other doctor gets a page. |

## Folder tree

```text
astro.config.mjs              ← i18n (en), sitemap, markdoc; keystatic() only when DEV
keystatic.config.ts           ← THE schema: every collection and singleton, per locale; storage: local
.env.example                  ← names of every env var, no values
src/
  content/                    ← entity data, read through the Keystatic reader
    conditions/en/{slug}.mdoc     ← frontmatter fields + clinical body
    programs/en/{slug}.json
    therapies/en/{slug}.json
    rooms/en/{slug}.json
    doctors/en/{slug}.mdoc        ← frontmatter fields + biography
    authors/en/{slug}.json
    articles/en/{slug}.mdoc
    doctor-answers/en/{slug}.mdoc
    testimonials/en/{id}.json
    site/en.json                  ← singleton: name, NAP, social, map, CTA labels, schema defaults, share defaults
    tariff/en.json                ← singleton: the ONLY place rates live
    faq/en.json                   ← singleton: general FAQ, grouped by category
  copy/en/                    ← fixed-page copy, written in code, typed, not in Keystatic
    home.ts
    therapies.ts  rooms.ts  amenities-activities.ts  farm-dining.ts  a-day-at-shantara.ts
    our-story.ts  our-approach.ts  our-doctors.ts
    conditions.ts  programs.ts  journal.ts  faq.ts  tariff.ts  contact.ts  book-consultation.ts
    policies/
      resident-policies.md  privacy-policy.md  terms-of-service.md
  components/
    ui/          Button, Badge, Tag, Icon, Logo, Divider, PatternPanel
    editorial/   Prose, QuoteBlock, ArticleFigure, SpecTable, TimeTable, NumberedSteps,
                 GroupedList, ReviewedBy, AuthorCard, TableOfContents, Pagination
    sections/    HeroSplit, HeroStatement, TileGrid, PeopleRow, ClosingCTA, FormSplit,
                 IndexList, RelatedArticles
    chrome/      Header, Footer, Breadcrumbs, LanguageSelector
    forms/       ConsultationForm.astro       ← the single Web3Forms form
    seo/         Head.astro                   ← every head tag, from PageMeta
                 jsonld/Graph.astro           ← one @graph per page
                 jsonld/{MedicalClinic,WebSite,WebPage,BreadcrumbList,Person,
                         Service,MedicalCondition,Article,ItemList}.astro
    islands/     only what must hydrate: Accordion, Dialog, Gallery, MobileNav, Video
  layouts/       BaseLayout.astro, ArticleLayout.astro, PolicyLayout.astro
  pages/
    index.astro                  ← redirects to /en/ (root is never an indexable duplicate)
    [locale]/                    ← see the route table; nothing else may sit beside it
    open-graph/[...route].ts     ← share images, built from lib/seo/pages.ts (skill-og-images.md)

  lib/
    content.ts        createReader(); typed queries, English fallback for non-text fields, reverse links
    images.ts         stored image path → Astro ImageMetadata; throws on a missing file
    routes.ts         the only place URLs are built: (type, id, locale) → path or anchor; DOCTOR_PROFILES
    i18n.ts           locale list, dictionary lookup (labels stay in locales.js)
    schema.ts         @id builders (#doctor-{id}, #program-{id}, …)
    track.ts          the one analytics abstraction (OpenPanel + Google Tag)
    lead-context.ts   locale, page type, content ID, UTMs → hidden form fields
    seo/meta.ts       PageMeta → title, canonical, robots, Open Graph (one resolver)
    seo/pages.ts      one PageMeta generator per page type; feeds getStaticPaths and share images
    seo/og/           og-image.mjs (copied from the design system), its fonts and marks
  markdoc/       config.ts (tags and nodes) + Renderer.astro (maps them to editorial/*.astro)
  styles/        global.css: design-system tokens/*.css + Tailwind @theme
scripts/
  check-routes.mjs    fails on pages outside [locale]/ and on forbidden route folders
  check-content.ts    reads every entry with the Keystatic reader, then cross-entry rules
  check-og.mjs        after the build: every indexable page has its share image and tags
tests/                Playwright: 4–5 smoke tests only
```

### Naming rules

- **Collections** use `{collection}/{locale}/{slug}.{json|mdoc}`. The filename is the entry ID, so the same filename in `ar/` is the same entry.
- **Singletons** use `{singleton}/{locale}.json`.
- **File format.** An entry with a long-form Markdoc body is `.mdoc`, with its other fields in frontmatter. Everything else is `.json`. Field names match the design-system records in [`content/`](../../content/).
- **English is the master.** A translated file holds only translatable text. Images, video, related pages, featured flags and every price come from English ([Languages](skill-content.md#languages)). This covers `tariff/{locale}.json` too: a translation may carry labels, terms and notes, never amounts.
- **`related_pages` types** are `condition`, `program`, `therapy`, `room`, `doctor`, `article`, `doctor_answer` and `page`. A `page` ID is a fixed-route key from `lib/routes.ts`, such as `our-approach`.

## Route table

Every URL carries a locale prefix, and `check-routes.mjs` enforces it ([Build checks](#build-checks)). Until a localisation project starts, only `/en/` exists.

| URL | File under `src/pages/[locale]/` | Data | Schema nodes (plus `WebSite` and the organisation reference) |
| --- | --- | --- | --- |
| `/en/` | `index.astro` | `copy/en/home.ts` and `featured` entities | Full `MedicalClinic` + `WebPage` |
| `/en/conditions` | `conditions/index.astro` | conditions | `CollectionPage` + `ItemList` + `BreadcrumbList` |
| `/en/conditions/{slug}` | `conditions/[slug].astro` | condition | `MedicalWebPage` + `MedicalCondition` + `BreadcrumbList`, `reviewedBy` pointing to the doctor's `Person` `@id` |
| `/en/programs` | `programs/index.astro` | programs | `CollectionPage` + `ItemList` + `BreadcrumbList` |
| `/en/programs/{slug}` | `programs/[slug].astro` | program | `WebPage` + `Service` + `BreadcrumbList` (no `offers`) |
| `/en/therapies` | `therapies.astro` | therapies, one section per therapy with `id="{slug}"` | `WebPage` + `BreadcrumbList` |
| `/en/rooms` | `rooms.astro` | rooms, one section each plus a comparison `SpecTable` | `WebPage` + `BreadcrumbList` |
| `/en/amenities-activities` | `amenities-activities.astro` | `copy/en/amenities-activities.ts` | `WebPage` + `BreadcrumbList` |
| `/en/farm-dining` | `farm-dining.astro` | `copy/en/farm-dining.ts` | `WebPage` + `BreadcrumbList` |
| `/en/a-day-at-shantara` | `a-day-at-shantara.astro` | `copy/en/a-day-at-shantara.ts` shown in a `TimeTable` | `WebPage` + `BreadcrumbList` |
| `/en/our-story` | `our-story.astro` | copy and the founder's doctor record | `AboutPage` + `BreadcrumbList` |
| `/en/our-approach` | `our-approach.astro` | copy, with the guest journey shown in `NumberedSteps` | `AboutPage` + `BreadcrumbList` |
| `/en/our-doctors` | `our-doctors.astro` | all doctors, one section each with `id="{slug}"` | `AboutPage` + `ItemList` + `BreadcrumbList`. A full `Person` node for each doctor without a profile; an `@id` reference for the two with one |
| `/en/doctors/pa-kareem` and `/en/doctors/bahja-janu` | `doctors/[slug].astro`, whose paths come from `DOCTOR_PROFILES` only | doctor, plus their answers, reviewed articles and programmes | `ProfilePage` + `Person` + `BreadcrumbList` |
| `/en/journal` and `/en/journal/{n}` | `journal/[...page].astro` | articles and doctor answers, newest first | `CollectionPage` + `ItemList` + `BreadcrumbList` |
| `/en/journal/{slug}` | `journal/[slug].astro` | article or doctor answer | `Article` + `BreadcrumbList`, with `MedicalWebPage` fields when medical |
| `/en/tariff` | `tariff.astro` | `tariff/en.json` | `WebPage` + `BreadcrumbList`, with `Offer` only for visible rates |
| `/en/faq` | `faq.astro` | `faq/en.json` | `WebPage` + `BreadcrumbList` (`FAQPage` optional) |
| `/en/contact` | `contact.astro` | `site/en.json` | `ContactPage` |
| `/en/book-consultation` | `book-consultation.astro` | `ConsultationForm` | `WebPage` only |
| `/en/resident-policies` | `resident-policies.astro` | `copy/en/policies/resident-policies.md` | `WebPage` only |
| `/en/cancellation-policy` | `cancellation-policy.astro` | `tariff/en.json` → `cancellation`, `payment_terms` | `WebPage` only |
| `/en/privacy-policy` | `privacy-policy.astro` | `copy/en/policies/privacy-policy.md` | `WebPage` only |
| `/en/terms-of-service` | `terms-of-service.astro` | `copy/en/policies/terms-of-service.md` | `WebPage` only |

The cancellation policy has no copy file of its own. It renders from the tariff singleton, so the policy and the tariff page can never disagree.

### Links to things with or without a page

`lib/routes.ts` turns a `{type, id}` into a URL. Nothing else builds a URL by hand.

| Type | Resolves to |
| --- | --- |
| `therapy` | `/en/therapies#{slug}` |
| `room` | `/en/rooms#{slug}` |
| `doctor` | `/en/doctors/{slug}` for the two doctors in `DOCTOR_PROFILES`, otherwise `/en/our-doctors#{slug}`. This covers `ReviewedBy` and author links too |
| `author` (not a doctor) | No link. Show the name and role only |
| `testimonial` | No link |

## Fixed pages: where the facts come from

The copy for these pages is written in code (`src/copy/en/`). Facts come from the handbook and the `content/` records. If a fact is marked `[TO CONFIRM]` in the handbook, leave it out of the page until it is confirmed.

| Page | Facts from | Rules |
| --- | --- | --- |
| Therapies | `content/therapies/` (13 records) | Show one section per therapy. Never add a `therapies/[slug]` route. |
| Rooms & Suites | `content/rooms/` (5 records) | Show one section per room and one comparison table. Link to `/en/tariff` and never show rates on this page. |
| Amenities & Activities | Handbook §10, "Facilities & amenities" | Use the handbook names (it says "Yoga Hall", not "Yoga Pavilion"). The jogging track, conference room and indoor/outdoor games are not in the handbook, so keep them off the page until they are confirmed. |
| Organic Farm & Dining | Handbook §11 | The handbook says meals are part of treatment and "not a restaurant menu". Show "An example day of meals" and say that the doctor prescribes each guest's diet. Meal timings are `[TO CONFIRM]`. |
| A Day at Shantara | Handbook §11 and §13 | Present it as an example day, because each guest's schedule is prescribed. Timings are `[TO CONFIRM]`. The name follows Shantara, never Welnez. |
| Our Story | Handbook §2–3 | Hygiene Nature Cure Hospital (2000) → Shantara. The founder is Dr. P.A. Kareem. Mention Welnez only as the former name, and only if the history needs it. |
| Our Approach | Handbook, naturopathy principles and the guest journey | Describe the journey as enquiry → consultation → stay → going home. Do not use hospital words such as "discharge" or "patients". [AGENTS.md](../../AGENTS.md) bans "patients" on public pages. |
| Our Doctors | `content/doctors/` | Each doctor gets a photo, name, qualification, areas of practice and a **Book a Consultation** button. Dr. Kareem and Dr. Bahja also link to their profile pages. Show only public, visible credentials. |
| Policies | Handbook §13 (house rules) and §8 (privacy), plus the tariff for cancellation | Use plain language with a visible "last updated" date. |

## Reading content

There is one schema, `keystatic.config.ts`. Everything reads through it.

```ts
// src/lib/content.ts
import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export const reader = createReader(process.cwd(), config);
// reader.collections.programs_en.all(), reader.singletons.tariff_en.read(), …
```

- **Collections per language.** One helper builds each collection once per locale (`programs_en`, later `programs_ar`) with the path `src/content/programs/{locale}/*`. Singletons follow the same pattern with the path `src/content/tariff/{locale}`, which Keystatic writes as `tariff/{locale}.json`.
- **Types** come from the config (`Entry<typeof config.collections.programs_en>`). `astro check` covers them.
- **Validation.** The reader parses each entry against its field definitions (required fields, selects, images) and throws on invalid data, so a bad file stops the build. Confirm this in the first spike: hand-edit an entry to remove a required field, and check that `astro build` fails.
- **References.** `doctor`, `author` and `medical reviewer` use `fields.relationship`. `related_pages` stays `{type, id}`. Keystatic checks neither at build time, because nobody uses its admin, so `check-content.ts` does.
- **Markdoc.** Long-form fields use `fields.markdoc`. `await entry.body()` returns a Markdoc node. `markdoc/config.ts` transforms it, and `markdoc/Renderer.astro` walks the result and maps each tag to an `editorial/*.astro` component. The `@astrojs/markdoc` integration is not used, because it only renders Content Collections.
- **Images.** A stored path becomes an Astro image through `lib/images.ts` ([skill-images.md](skill-images.md#keystatic-image-fields)).

## Keystatic scope

- **Storage.** Keystatic runs in `local` mode. Register the `keystatic()` integration only when `import.meta.env.DEV` is true, so production has no `/keystatic` route and no admin bundle. The reader (`@keystatic/core/reader`) still runs at build time.
- **Not modelled:** medical categories, fixed-page copy, UI labels, analytics IDs and API keys.

## Environment variables

| Variable | Used by |
| --- | --- |
| `PUBLIC_OPENPANEL_CLIENT_ID` | `lib/track.ts` |
| `PUBLIC_GTAG_ID` | `lib/track.ts` (Google Tag / Ads) |
| `PUBLIC_WEB3FORMS_KEY` | `forms/ConsultationForm.astro` (public by design) |

Set these in Netlify. `.env.example` lists the names with no values.

## Build checks

`scripts/check-routes.mjs` and `scripts/check-content.ts` run in GitHub Actions next to Astro Check. `check-content.ts` imports `keystatic.config.ts`, so it runs on Node 24, which runs TypeScript files directly.

- **Locale route invariant.** No public page may sit directly under `src/pages/` except `index.astro`, the root redirect. Every public route lives beneath `src/pages/[locale]/`. Any other `.astro`, `.md` or `.mdx` file, or any other route directory, directly beneath `src/pages/` fails the build. The one exception is `src/pages/open-graph/`, which may hold only `[...route].ts`: it builds share images, not pages.
- **Share images.** `scripts/check-og.mjs` runs after `astro build` ([skill-og-images.md § 10](skill-og-images.md#10-checks)).
- **Route guard.** The build fails if `src/pages/[locale]/` contains a `therapies/`, `rooms/`, `our-doctors/` or `insights/` folder, or if `doctors/` holds anything other than `[slug].astro`. It also fails if `src/content/pages/` or `src/content.config.ts` exists.
- **Doctor profiles.** `DOCTOR_PROFILES` is exactly `pa-kareem` and `bahja-janu`, and both entries are published.
- **Slugs.** Slugs are lowercase with hyphens. They are unique across articles and doctor answers (they share `/en/journal/`), and they are never purely numeric, which keeps them clear of pagination.
- **Entries.** Every entry in every collection and singleton reads without error.
- **References.** Every `related_pages`, `author`, `doctor` and `medical reviewer` ID resolves. No published entry links to a draft.
- **Tariff.** The rules come from [skill-content.md § Tariff](skill-content.md#tariff): every row has a price for every currency, every published room has rates, `valid_to` has not passed, and translated tariff files carry no amounts.
- **Consent.** A testimonial publishes only when `consent_status` is `recorded`.
- **No keys in content.** Anything under `src/content/` that looks like a key or ID pattern (`G-`, `AW-`, a UUID in a `*_id`/`*_key` field) fails the check.
