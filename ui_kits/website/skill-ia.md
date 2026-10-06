# Information architecture

Back to the [website skill](SKILL.md).

The site architecture should remain simple and expandable.

Locale architecture, enabled vs planned languages, and hreflang live in the [website skill §15](SKILL.md#section-15) and `locales.js`. This file only records IA.

## Primary navigation

Recommended top-level structure:

- Conditions
- Programmes
- Experience
- About
- Journal (articles and Doctor Answers)
- Contact
- Book a Consultation

The primary visitor-facing CTA is **Book a Consultation**. Form chrome may use **Send your details**. Do not use **Enquire about a stay** or **Request a consultation** as primary CTAs. See [skill-copy.md](skill-copy.md).

Do not create a mega-menu unless the number of live pages genuinely makes normal navigation difficult.

Do **not** add a **Wellness** nav item, an Ayurveda hub, geo doorways, ICP hubs, or duplicate venue URLs (`/naturopathy-centre` vs `/naturopathy-retreat`). Nav stays the families above.

## Content jobs inside existing families

OpenSEO (20 Sep 2026) clarified **how** to resource discovery and comparison. It does **not** justify new URL families. Map jobs onto what already exists:

| Job | Existing family / surface | Notes |
| --- | --- | --- |
| What Shantara is (entity) | Home + About | Lead with the positive entity sentence before atmospheric copy. HNCH / Hygiene Nature Cure Hospital relationship → **About only**. |
| Ayurveda vs naturopathy | One medically reviewed **article / Clinical Guide** under Journal | Required GCC/West interception path. Not a fake Ayurveda service page. Not a nav item. |
| What a residential stay is | Experience hub + FAQ | Fixes US/UK “ND clinic” misread. Not a new `/stay` family. |
| Named conditions | `/en/conditions/{slug}` only | Original clinical content; India commercial spine. Do not invent ICP-named hubs. |
| HNCH parent history | About | Keep hospital out of audience framing elsewhere. |

### Condition launch inventory (status 20 Sep 2026 · Phase B + Phase C)

Ranked from **India English** (`locationCode` 2356) residential / travel-intent metrics only. Existing `/en/conditions/{slug}` candidates. Do **not** reorder ICP 01–06 from this table. Do **not** invent volumes. Countries stay unmerged.

| Publish order | Slug | India evidence (monthly volume) | Notes |
| --- | --- | --- | --- |
| 1 | `obesity` | `naturopathy for weight loss` / `weight loss naturopathy` 210; `weight loss retreat india` 140; `weight loss retreat` 110; Keralam variants 30 | Clearest residential-stay signal among the three money slugs. |
| 2 | `pcos` | `pcos treatment holistic` 480; `pcos treatment india` 30; `pcos retreat` / `pcos naturopathy` unmeasured or — | Holistic-treatment demand may be local clinic, not a Keralam stay. Publish when original content exists; do not treat 480 as proven retreat intent. |
| 3 | `diabetes` | `diabetes retreat india` 10; `diabetes naturopathy` / treatment compounds —; Phase C `diabetes reversal` / `diabetes reversal india` — | Floor-level retreat signal. Programme name Diabetes Reversal is approved; do not invent rates or guarantee copy. Resource when clinical content is ready, not because volume is high. |

**Operational India stay-intent sequence** (comparable stay compounds for pages/spend; does **not** reorder ICP 01–06 IDs): (1) ICP 01 weight/metabolic stay — strongest; (2) ICP 04 digestive stay — thin (`naturopathy for ibs` 20, `ibs retreat` 10); (3) ICP 05 / 06 floor (`men's health retreat` / `longevity retreat` 10); (4) ICP 02 pain stay — Phase C compounds —; (5) ICP 03 India stay weak vs UK spa burnout; (6) Short Health Reset — secondary; do not lead with weekend wellness. Full write-up: [`docs/icp.md`](../../docs/icp.md) §26.

Other named needs (`fatty-liver`, `back-pain`, `menopause`, and similar) remain unranked for India money-slug launch ahead of the three above. Phase C closed pain stay compounds as —; IBS stay language is thin but measured — publish `/en/conditions/ibs` only when the content bar is met, not as a volume chase.

**Structure reference:** Prakriti Shakti–style named condition cards (homepage cards, conditions-treated listing, treatment-programmes) are a useful pattern for how condition pages sit next to programmes. Copy structure, not copy, NAP scatter, or a holistic-wellness ICP.

**Publish rule (unchanged):** a condition page only when original content, clinical perspective, relevant programme, medical review, and useful answers exist. Metrics rank which ready pages to ship first; they do not waive the content bar.

**GCC / West content jobs** (no new URL families):

- Comparison article — medically reviewed Ayurveda vs naturopathy under Journal (IN comparison cluster measurable; UAE/UK comparison seeds ~10/mo each — still resource for interception)
- Experience hub + FAQ — what a residential stay is (UK `naturopathy uk` SERP is ND college/clinic; UAE `naturopathy dubai` SERP is day clinic)
- About — entity sentence + HNCH / parent history only
- Do **not** buy UK `weight loss retreat` / `burnout retreat` or UAE `naturopathy dubai` as primary paid keywords for Shantara — SERPs are spa / fitness / local clinic

## Conditions

Use locale-prefixed URLs, including English:

```text
/en/conditions
/en/conditions/diabetes
/en/conditions/obesity
/en/conditions/pcos
...
```

Do not create condition-category hub pages solely for SEO such as:

```text
/en/conditions/metabolic-lifestyle/diabetes
```

Do not create ICP-named category URLs such as `/en/conditions/weight-metabolic-health`. ICPs organise strategy and CRM; they are not a public IA layer. Canonical ICP definitions: [`docs/icp.md`](../../docs/icp.md).

Conditions may be visually grouped on `/en/conditions` without creating indexable category pages.

Create a condition page only when Shantara can provide:

- meaningful original content;
- a legitimate clinical perspective;
- a relevant program or approach;
- medical review;
- useful answers to prospective guests.

Do not create dozens of thin condition pages in advance.

## Programs

Use:

```text
/en/programs
/en/programs/[program-slug]
```

Program pages are commercially important and should explain:

- what the program is;
- who it is intended for;
- duration/options;
- inclusions;
- clinical supervision;
- experience;
- a link to the tariff page — **never quote, invent or copy rates**; rates live only in the production Keystatic tariff;
- next step.

## Experience

Pages:

```text
/en/therapies
/en/rooms
/en/amenities-activities
/en/farm-dining
/en/a-day-at-shantara
```

Therapies and rooms each have **one page**. Do not create individual pages for a therapy or a room category. Links to a single therapy or room point to its section on that page (for example `/en/therapies#hijama`).

## About

Pages:

```text
/en/our-story
/en/our-approach
/en/our-doctors
/en/doctors/pa-kareem
/en/doctors/bahja-janu
```

Medical Editorial Policy also sits under About.

`/en/our-doctors` lists every doctor with a photo, name, qualification, areas of practice and a **Book a Consultation** button. Only Dr. P.A. Kareem and Dr. Bahja Janu have a profile page. Each profile lists the doctor's answers, the articles they reviewed and their programmes automatically. Do not create a profile page for any other doctor; link to their section on `/en/our-doctors` instead (for example `/en/our-doctors#{slug}`).

Entity and parent history (including Hygiene Nature Cure Hospital / HNCH) belong here — not on condition or programme pages, and not as a hospital product pitch.
## Publishing families

Articles and Doctor Answers publish under one Journal family:

```text
/en/journal
/en/journal/2
/en/journal/[slug]
```

Traditional blog articles may continue to exist, but do not make generic blog production the center of the content strategy.

### Clinical Knowledge

- Doctor Answers
- Clinical Guides
- Evidence Notes

### Real Shantara Experience

- Guest Stories
- Clinical Journeys
- Food & Recipes

### Authority

- Doctor Talks
- Events
- Research/publications
- Media coverage
- Accreditations/milestones

## Utility pages

- Book a Consultation (`/en/book-consultation`)
- Contact (`/en/contact`)
- Frequently asked questions (`/en/faq`, grouped by category)
- Resident Policies (`/en/resident-policies`)
- Cancellation Policy (`/en/cancellation-policy`, rendered from the tariff's cancellation terms)
- Privacy Policy (`/en/privacy-policy`)
- Terms of Service (`/en/terms-of-service`)

## Page types

A page may be classified as:

- home
- condition
- program
- experience
- doctor
- about
- article
- contact
- consultation
- policy

This classification may control CMS organization, schema, analytics context, breadcrumbs, search indexing behavior, and editorial requirements.

It must **not** force a fixed page layout.

## URL principles

Use short, stable, human-readable URLs.

Prefer:

```text
/en/conditions/diabetes
/en/programs/weight-management
```

Every language uses the same families under its prefix (`/ar/conditions/diabetes` when that page is published). Root `/` is not an indexable duplicate of `/en/`. Until localized slugs exist, English slugs may be reused under another prefix. Identity is the internal ID, not the slug.

Avoid unnecessary hierarchy and keyword repetition.

Do not create multiple pages targeting trivial keyword variations.

When URLs or brand naming change:

- use permanent redirects where appropriate;
- do not leave duplicate indexable legacy URLs;
- preserve inbound equity.

Do not guess legacy URL mappings. Inspect the actual existing site before migration.

## Internal linking

Create meaningful relationships:

- Condition → relevant Program
- Program → Condition
- Program → Therapy
- Clinical Guide → Condition/Program
- Doctor Answer → deeper Guide
- Article → relevant core page

Links are stored once, in `related_pages`, and the reverse direction is generated — see [skill-content.md](skill-content.md#shared-fields). Content records carry no ICP IDs.

Do not insert links solely for keyword density.

## Kit samples

The Website Kit shows **one thin sample per family**, not every URL above.

| Skill URL family | Kit sample |
| --- | --- |
| `/en/` | `HomeScreen.js` |
| `/en/conditions` | `ConditionsScreen.js` |
| `/en/programs/[slug]` | `ProgrammeScreen.js` (Detox) |
| Experience hub | `ExperienceScreen.js` |
| About hub | `AboutScreen.js` |
| Journal listing | `JournalScreen.js` |
| `/en/contact` | `ContactScreen.js` |
| `/en/book-consultation` | `ConsultationScreen.js` |
| Tariff / pricing | `TariffScreen.js` |

The kit maps those families to hash routes (`#/en/`, `#/en/programs`). Production uses the real prefixed paths. Navigation labels come from the locale dictionary — do not hard-code English in reusable nav. Footer contact data (phone, email, place) is globally stable; only the labels translate. Breadcrumb URLs stay in the current locale.

Do not expand the kit into the full production sitemap.
