# Technical: analytics, SEO, schema, performance, accessibility

Back to the [website skill](SKILL.md).

## Analytics: OpenPanel + GA4

Use one internal tracking abstraction.

Application code should call:

```js
track("event_name", properties)
```

Use `ShantaraLocales.track()` so `locale` is attached centrally. The abstraction may forward to OpenPanel and GA4. Do not create locale-suffixed event names.

Do not scatter `gtag(...)` and `openpanel.track(...)` across components.

### Automatic / basic tracking

Use platform/native tracking where available for: page_view; scroll; outbound clicks; file downloads.

Do not recreate automatically captured events unless required.

### Custom events

Keep the launch event model small.

#### `consultation_cta_click`

Fire when the Book a Consultation CTA is clicked.

Properties: `page_type`; `content_id`; `content_name`; `cta_location`; `locale` (added centrally).

Allowed `cta_location` values should remain controlled, for example: header; hero; inline; bottom; sticky.

#### `form_start`

Fire when the consultation form is genuinely started.

Properties: `form_id`; `page_type`; `locale` (added centrally).

#### `generate_lead`

This is the primary conversion.

Fire **only after the form destination confirms successful submission**.

Properties: `form_id`; `page_type`; `source_page`; `locale` (added centrally).

Do not treat a button click as a successful lead.

#### `question_submitted`

Fire when the Ask the Doctor form confirms a successful submission.

Properties: `page_type`; `source_page`; `locale` (added centrally).

This is user-generated content, not a lead. Never fire `generate_lead` for it, and never send the question text to analytics.

#### `contact_click`

Use one event for alternate contact channels.

Properties: `contact_method` (`whatsapp` | `phone` | `email`); `page_type`; `cta_location`; `locale` (added centrally).

### Optional events

Only implement if a clear business question exists: `video_start`; `video_complete`.

Avoid tracking every FAQ open, menu open, card hover, image click, navigation click, or doctor card click.

Page paths and standard analytics already answer many of these questions.

### Privacy

Never send to GA4 or OpenPanel: name; email; phone; consultation free text; diagnosis; symptoms; medication; medical history; other health information.

If identity linkage is ever required, use opaque internal identifiers.

Analytics is not the CRM.

ICP and overlay fields (`primary_icp`, `country`, `landing_page`, and the rest of the taxonomy in [`docs/icp.md`](../../docs/icp.md)) belong in CRM or a carefully designed reporting layer. Do not automatically push need-state or health detail into ad platforms. Do not add extra pixel events at launch just to record ICP. Infer ICP from landing page and campaign where possible.

### Initial funnel

Primary funnel:

```text
Page View
→ Consultation CTA Click
→ Form Start
→ Generate Lead
```

Secondary action reporting:

```text
Contact Click
→ WhatsApp / Phone / Email
```

Do not add CRM lifecycle events until a real need exists to measure lead quality or booking revenue.

### Analytics-aware component design

Components that create meaningful business actions must expose consistent analytics context.

**CTA** should know: page type; content ID; CTA location.

**Consultation form** should know: source page; page type; content context.

**Contact links** should know: method; location.

Do not make analytics code part of every visual component if a shared abstraction can handle it.

## Technical SEO

Implement SEO as part of the page system, not as manual aftercare.

The checkable version of this section and the schema section, with rule IDs, priorities, owners and checks, is [search-visibility/overview.md](search-visibility/overview.md). Open only the section file your task needs.

### Every indexable page

Support: unique SEO title; meta description; **self-referencing** canonical URL for that locale; Open Graph title; Open Graph description; Open Graph image; index/noindex setting; correct H1; crawlable internal links in the current locale; `hreflang` alternates only for published equivalents, plus `x-default`.

Do not canonicalize a translation to English. Do not emit `hreflang` for a locale or page that is not published. Root `/` must not compete with `/en/` as an indexable English document.

### Global site identity (titles and Open Graph)

Frozen public Organization / NAP name: **Shantara Naturopathy Retreat**.

- Use that string for `og:site_name`, default title brand segment, and Organization schema `name`.
- Do **not** use **Shantara Life Naturopathy** (or “Shantara Life”) in titles, `og:site_name`, schema `name`, or other global metadata.
- Page titles may read `{Page} | Shantara Naturopathy Retreat` (or an approved short equivalent that still says Naturopathy Retreat). Do not invent a parallel brand line for SEO.
- Open Graph images, the metadata that feeds them and the full tag list are in [skill-og-images.md](skill-og-images.md).

### URL principles

Use short, stable, human-readable URLs.

Prefer `/en/conditions/diabetes` and `/en/programs/weight-management`.

Do not create ICP-named hubs or synonym doorway pages. Keyword and landing-page architecture for agencies is specified in [`docs/icp.md`](../../docs/icp.md); it does not override these URL rules.

Avoid unnecessary hierarchy and keyword repetition.

Do not create multiple pages targeting trivial keyword variations.

### XML sitemap

Generate automatically from **published localized** URLs only.

Include alternate-language relationships for locales that actually have that page.

Use accurate modification dates. Do not generate seven empty sitemap trees for unpublished languages.

Do not update `lastmod` on every build unless the page actually changed.

### robots.txt

Keep simple.

Do not accidentally block important content, CSS/JS required for rendering, or images that should be discoverable.

### Redirects

When URLs or brand naming change: use permanent redirects where appropriate; do not leave duplicate indexable legacy URLs; preserve inbound equity.

Do not guess legacy URL mappings. Inspect the actual existing site before migration.

### Internal linking

Create meaningful relationships: Condition → relevant Program; Program → Condition; Program → Therapy; Clinical Guide → Condition/Program; Doctor Answer → deeper Guide; Article → relevant core page.

Editors set each link once, in `related_pages`; the build generates the reverse links. Therapy and room links point to their section on the single `/en/therapies` or `/en/rooms` page.

Do not insert links solely for keyword density.

### Search tools

Connect: Google Search Console; Bing Webmaster Tools; IndexNow where appropriate.

### SEO-aware component design

Sections should render crawlable semantic HTML.

- headings use actual heading levels;
- tabs/accordions must not hide content from initial HTML when SEO-critical;
- links use anchors rather than click handlers;
- images use meaningful alt/caption fields;
- structured content remains available without client-side-only fetching where possible.

Do not build SEO-critical text as canvas, image, or animation-only content.

## Structured data / schema

Generate schema automatically from the actual page/entity data.

Schema must match visible content.

Do not add invisible claims or data solely for search engines.

Do not ask editors to manually write JSON-LD.

### Site / business entity

Use one Organization with a stable canonical `@id` across every locale.

- **`name`:** `Shantara Naturopathy Retreat` (same as the frozen NAP / `og:site_name`).
- **Primary type:** `MedicalClinic`, plus lodging / residential-stay facts that match visible content (rooms, residential programme, address). Prefer additional typed properties or a clearly related lodging representation over inventing a second competing Organization. Exact lodging companion (`Hotel` vs other lodging properties) is still TBD — do not invent a second competing Organization while that choice is open.
- **Do not use** `Hospital`, spa types, or `HealthAndBeautyBusiness` — those mis-state the entity (hospital is the wrong local entity; spa framing is paid-exclusion territory).
- Do not choose a medical schema type merely because it sounds advantageous; `MedicalClinic` is allowed here because the offer is a doctor-led residential clinic stay, not a beauty business.

Localized web pages have a locale-specific `url` and `inLanguage`. Doctor and program identities stay on the same `@id` when their names are translated.

Typical data: name; URL; logo; telephone; email; address; geo; opening hours; sameAs; contactPoint; lodging-relevant facts only when they appear on the site.

### Condition content

Where appropriate: `MedicalWebPage`; `MedicalCondition`; `BreadcrumbList`; reviewer/author relationships; `lastReviewed`.

### Programs

Where appropriate: `WebPage`; `Service`; `Offer` only where real visible commercial information exists; `BreadcrumbList`.

Visible commercial figures exist only on the production tariff page, read from the Keystatic tariff. Do not emit `Offer` amounts anywhere else. Each `Offer` uses the exact amount and ISO currency code as entered; never convert or round. This design system holds no rates.

### Doctors

Use `Person` for an individual doctor. Schema.org defines `Physician` as a medical business type, so do not use it for a person. See SCHEMA-09 in [search-visibility/schema.md](search-visibility/schema.md).

Reference the same doctor entity consistently across pages.

### Articles / Guides

Use: `Article` or `BlogPosting`; headline; description; image; datePublished; dateModified; author; publisher.

### Breadcrumbs

Generate `BreadcrumbList` from the logical user path.

Do not invent extra hub pages just to deepen breadcrumbs.

### FAQ

FAQ content is useful.

Do not make FAQ rich-result eligibility the reason for creating FAQ content.

## AEO and GEO

Do not create separate “AEO pages” or “GEO pages”.

Use one high-quality content system.

### Answer-first structure

When a page contains a real question, answer it clearly before expanding.

Example:

```text
Can I continue my medication during a naturopathy stay?

[Concise clinically reviewed answer.]

[Detailed explanation.]
```

### Make facts explicit

Prefer:

> The 14-night program includes an initial doctor consultation, accommodation, prescribed therapies, meals according to the program plan, yoga sessions, and periodic review.

over:

> Experience our holistic journey to total wellness.

Specific information is more useful to visitors, search engines, answer engines, and generative systems.

Do not invent the facts in that example if they have not been verified.

### Prioritize first-party information

Strong content includes: actual program structure; actual clinicians; actual therapies; actual equipment; real sample schedules; real room categories; real dietary practices; real guest journeys; real travel information.

Avoid generic AI-written wellness content that could belong to any retreat.

### Entity consistency

Use consistent names for: **Shantara Naturopathy Retreat** (Organization); doctors; programs; therapies; locations; credentials.

Do not rename the same program or doctor differently across pages without reason.

Do not reintroduce legacy or parallel product strings (“Shantara Life Naturopathy”, “naturopathy and wellness retreat”, sanctuary / clinical-wellness product labels) in metadata or schema.

### Avoid pseudo-GEO hacks

Do not prioritize: special “AI versions” of pages; dozens of micro-Q&A pages; artificial content chunking; keyword-generated location pages; `llms.txt` as a major SEO project.

Build a clear, crawlable, trustworthy website first.

## Performance and rendering

This is a marketing site. Keep the technology stack simple. **Locked choices** (Astro, Tailwind, Keystatic, Netlify, OpenPanel, Web3Forms, Playwright smoke only, no UI kits / Motion / DB): [skill-stack.md](skill-stack.md).

### Rendering

Prefer: static generation; prerendering (Astro). SSR/SSG hybrid only where useful.

Do not introduce a persistent application backend unless a real requirement needs it.

Analytics can run client-side after a prerendered page loads.

### JavaScript

Minimize client-side JavaScript.

Use hydration only where necessary for: form interactions; navigation; gallery; accordion; modal/drawer; analytics; video controls.

Static content should remain static.

### Images

In production, use **Astro Image**. Where files go, how to compress them and which widths to generate: [skill-images.md](skill-images.md). In all surfaces:

- use responsive sizes;
- modern formats;
- explicit width/height;
- lazy-load below-fold imagery;
- preload only truly important hero media;
- avoid uploading unnecessarily huge files.

### Fonts

- keep families/weights limited;
- preload only required files;
- use sensible fallbacks;
- avoid layout shift.

This system ships Diodrum Cyrillic for Latin and Cyrillic. IBM Plex Sans Arabic is the Arabic counterpart under `[dir=rtl]` — not a second display face for English. Do not add further families.

### Third-party scripts

Every third-party script must justify: business value; performance cost; privacy cost.

Do not install multiple overlapping analytics/heatmap/chat tools without a clear reason.

## Accessibility

Accessibility is a baseline requirement.

Ensure:

- semantic headings;
- keyboard access;
- visible focus states;
- meaningful alt text;
- decorative images marked appropriately;
- accessible form labels;
- error messages associated with fields;
- sufficient contrast — including type on photography judged against the scrimmed photograph (solid Merino on a shorter bottom `--scrim-bottom`; Gold text only on flat dark grounds; no double scrims);
- pick the right media ratio: **4:3** listing tiles, **16:9** wide editorial, **4:5** doctor portraits, **3:4** tall architecture, **21:9** desktop panorama with a `mobileRatio`; page heroes use a height (not a ratio);
- accordions open with a `.sh-acc-clip` wrapper (`aria-hidden` / `inert`, not `hidden`) — kit loads `_ds_bundle.js`, so sync after editing `components/navigation/Accordion.jsx`;
- type never on the rosette; drop the band below ~880px;
- touch targets large enough;
- reduced-motion support where appropriate — keep colour and opacity, drop movement; use the design-system motion tokens (`--ease-out`, `--ease-drawer`, `--duration-*`) rather than local curves;
- accordions/dialogs use correct ARIA patterns;
- videos have captions/transcripts when needed;
- `html` `lang` and `dir` match the locale;
- the language selector is named, keyboard-accessible, and announces the current locale;
- passages in another language are annotated;
- optional in-page text size via `html[data-text-size]` → `--text-scale` (Default / Large / Larger). Browser zoom to 200% remains the WCAG 1.4.4 path.

Do not rely on color alone to communicate state.

This design system’s live audit is `guidelines/accessibility.html`. Active nav uses `aria-current="page"` plus an underline. Interactive cards take a button role when they have `onClick`.

## Managing technical growth

Before introducing a service or dependency, ask:

1. What current problem does it solve?
2. Can an existing service solve it?
3. Does it add persistent operational work?
4. Does it hurt performance/privacy?
5. Can it be deferred?

For this site, default toward fewer services.
