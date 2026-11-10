# Search and AI visibility rules

Back to the [website skill](../SKILL.md).

Version 1.24. Updated 10 November 2026. Adapted for **shantara.life** from the Zarnik Marketplace checklist "Search and AI Visibility" version 6.2.

This is the checkable rule list for search engines, AI answer engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews), AI browsing agents and accessibility on Shantara's public website. The reasoning and the locked decisions stay in [skill-technical.md](../skill-technical.md), [skill-ia.md](../skill-ia.md), [SKILL.md §15](../SKILL.md#section-15) and [skill-stack.md](../skill-stack.md). These files turn them into rules with IDs and checks. They do not replace them.

## How to use these rules

- Read this overview first, then open only the section file your task needs. Each section file stands alone.
- Every rule has a stable ID, such as `REN-01`. Use the ID in pull requests, tickets and AI prompts. The IDs belong to Shantara. `REN-01` here is not Zarnik's `REN-01`.
- **P0** is a launch blocker. A rule is P0 when missing it would lose traffic or leads from the current site, break the consultation form, publish wrong medical, rate or contact information, expose personal or health data, cause a serious accessibility failure, stop Google from indexing the site, or be expensive to change after launch (URLs, locale structure, schema `@id` values).
- **P1** is done within 30 days of launch. **P2** is done once P0 and P1 are stable.
- Owner tags say who builds or maintains the rule. **[Build]** is the Astro website code: templates, metadata and JSON-LD generators, sitemap, robots.txt, redirect file and tests. **[Infra]** is Netlify and DNS: domains, HTTPS, headers and deploy contexts. **[Content]** is Keystatic records, copy, photography and alt text. **[Clinical]** is a named Shantara doctor who reviews medical content. **[Ops]** is Search Console, Bing Webmaster Tools, Google Business Profile, OpenPanel, Google Tag and OpenSEO.
- Every rule ends with a **Check**. A rule without a way to check it is not finished.
- Shantara has no backend, no shop, no cart and no product feed. Rules that only exist because of those were left out. Site search runs in the browser on a static index built after the site (Pagefind), and the results page `/en/search` is noindex. The only code that runs per request is one edge function that chooses between build outputs (AI-15).
- Change a rule only when a real problem on the site, or a documented change by Google, Bing or a browser, requires it. Record every change in the [change log](#change-log).

## Decisions

Recorded on 25 September 2026 and 23 October 2026. The rules below already follow them. The website records each deviation from these rules, and the decision on it, in its own `docs/ds-decisions.md`. A deviation approved there is written into these rules in the same piece of work.

| Decision | Outcome |
| --- | --- |
| Canonical host | `https://shantara.life`. Every other host and protocol 301s to it. `content/site.json` updated to match. |
| Organisation schema type | `MedicalClinic`. `content/site.json` and the kit's schema helper in `locales.js` updated to match. |
| Organisation type | `["MedicalClinic", "Resort"]` on the one organisation node. `MedicalClinic` comes first. `Resort` is the lodging companion and carries the rooms, check-in times and amenities. Decided 23 October 2026. |
| AI crawlers, including training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) | Allowed. robots.txt has no named groups that block any AI crawler. |
| Tax on rates | Tariff rates include all taxes. The page says so once; no tax is broken out. |
| OpenPanel address | `https://openpanel.zescloud.net/`. [skill-stack.md](../skill-stack.md) updated. |
| Google Business Profile | Shantara has its own profile, linked only to Shantara. It is not merged with, or managed as part of, the Hygiene Nature Cure Hospital listing. |
| Page size | Every page's HTML stays below 2 MB. |
| FAQ rich results | Google removed FAQ rich results in May 2026. `FAQPage` markup brings no Google benefit. |
| Trailing slash | No page URL ends in a slash, including the locale home: `/en`, not `/en/`. Decided 23 October 2026. |
| Sitemap index | `/sitemap.xml`. `/sitemap-index.xml` 301s to it. The video sitemap is listed in the index only. Decided 23 October 2026. |
| Organisation graph | The full organisation graph (the clinic, its parent hospital, and the doctors' and leaders' `Person` nodes) is on every page. Decided 23 October 2026. |
| Programme type | `["Service", "MedicalTherapy"]`. Shantara practises clinical naturopathy, and `relevantSpecialty` is valid only on `MedicalTherapy`. Decided 23 October 2026. |
| `priceRange` and `numberOfRooms` | Allowed on the organisation node on every page. `priceRange` is an indicative range, not a rate, and `numberOfRooms` is structured data, not copy. Exact rates stay on the tariff page. Decided 23 October 2026. |
| Font preload | Every Diodrum weight the site uses is preloaded, so no text changes font after first paint. Decided 23 October 2026. |
| Founder | P.A. Kareem is the founder and chairman, not a doctor. His `Person` node is `https://shantara.life/#person-pa-kareem`, the organisation's `founder` points to it, his profile is `/en/pa-kareem`, and he is not listed on Our Doctors or in `employee`. Decided 23 October 2026. |
| Policy breadcrumbs | Policy pages, like Make an Inquiry, emit `WebPage` + `BreadcrumbList`, because they show a breadcrumb (SCHEMA-07). Decided 23 October 2026. |

### Still open

| Decision | Why it matters |
| --- | --- |
| Former web addresses | Migration (MIG-01) needs the full list of old domains, for example any Welnez domain, and a decision on whether any Hygiene Nature Cure Hospital pages move. |

## Section files

| File | Rules | Covers |
| --- | --- | --- |
| [One content truth (DATA)](data.md) | DATA-01 to DATA-05 | One content source, one JSON-LD generator, one metadata generator, business facts, rebuild on publish |
| [Rendering (REN)](rendering.md) | REN-01 to REN-05 | Prerendering, head tags in the first HTML, error pages, 2 MB page limit, heading order |
| [Crawling and sitemaps (CRAWL)](crawling.md) | CRAWL-01 to CRAWL-10 | robots.txt, Keystatic and confirmation pages, deploy previews, AI crawlers, sitemaps, IndexNow, video sitemap |
| [Languages (LANG)](languages.md) | LANG-01 to LANG-05 | Locale prefixes, root redirect, hreflang, disabled locales, translation canonicals and review |
| [URLs (URL)](urls.md) | URL-01 to URL-06 | Slugs, trailing slashes, canonicals, real 404s, Journal pagination, internal links |
| [Redirects and retired pages (REDIR)](redirects.md) | REDIR-01 to REDIR-05 | Slug-change redirects, single-hop 301s, host clean-up, query strings, retired pages |
| [Migration from the current site (MIG)](migration.md) | MIG-01 to MIG-05 | Crawl of the old site, legacy redirects, top pages, external listings, post-launch checks |
| [Pages (PAGE)](pages.md) | PAGE-01 to PAGE-08 | Titles and descriptions, breadcrumbs, orphan pages, internal-only facts, original copy, trust pages |
| [Medical content (MED)](medical.md) | MED-01 to MED-05 | Doctor review, sources, claim words in metadata, testimonials, honest dates |
| [Rates (RATE)](rates.md) | RATE-01 to RATE-05 | Rates only on the per-currency tariff pages, currency labels, the `/en/tariff` redirect, Offer schema, no rate-sheet internals |
| [Structured data (SCHEMA)](schema.md) | SCHEMA-01 to SCHEMA-16 | JSON-LD graph, `@id` values, MedicalClinic, page nodes, doctors, programmes, articles, FAQ, VideoObject, schema map |
| [Link previews (SOCIAL)](social.md) | SOCIAL-01 to SOCIAL-04 | Open Graph tags, share images, Twitter card |
| [Images (IMG)](images.md) | IMG-01 to IMG-06 | Astro Image, hero loading, lazy loading, alt text, filenames, real photography |
| [Files (FILE)](files.md) | FILE-01 to FILE-02 | PDFs, favicon and web manifest |
| [Accessibility (ACC)](accessibility.md) | ACC-01 to ACC-21 | Native HTML, landmarks, keyboard, dialogs, forms, tables, contrast, zoom, motion, time limits, link text, CAPTCHA, media, axe tests |
| [Performance (PERF)](performance.md) | PERF-01 to PERF-06 | Core Web Vitals, CDN, fonts, pop-ups, back/forward cache, prefetch |
| [Security and hosts (SEC)](security.md) | SEC-01 to SEC-04 | HTTPS, HSTS, exposed files, Content-Security-Policy |
| [AI answers, AI agents and local presence (AI)](ai.md) | AI-01 to AI-16 | Answer-first writing, facts, name and address consistency, Google Business Profile, AI agents, llms.txt, Content-Signal, Markdown twins, `Accept` negotiation, AI access log |
| [Measurement (MEAS)](measurement.md) | MEAS-01 to MEAS-07 | Search Console, Bing, launch events, analytics privacy, AI assistant referrals, alerts |
| [Do not do this](do-not.md) | — | Outdated or wrong SEO advice to ignore |

## Change log

- **1.24, 10 November 2026.** RATE-02, adopted from the website's D-79: the currency is named once per money column, in its title in brackets, not in each cell; every amount shows two decimal places.
- **1.23, 10 November 2026.** Tariff pages, adopted from the website's D-62 to D-73. The tariff is one page per currency at `/en/tariff/{code}`; `/en/tariff` is a redirect by cookie, then country, then the default (RATE-03 changed); RATE-01's check matches codes, symbols and `Offer` nodes outside `/en/tariff/*`, not bare figures, and skips the `llms.txt` links to each currency's Markdown twin; RATE-04 Offers are per room and occupancy. DATA-04 and skill-content.md list the renamed Site settings stay fields, the ages and `paymentAccepted`. skill-content.md, skill-ia.md and skill-structure.md describe the Tariffs, Room Categories, Supplements and Therapies collections and the Tariff terms singleton; validity dates are dropped.
- **1.22, 9 November 2026.** Adopted from the website's D-222. The photo ClosingCTA's title is set at the H1 size, like a hero's title. No schema or URL change.
- **1.21, 9 November 2026.** Adopted from the website's D-223. No doctor has a profile page; `/en/doctors/bahja-janu` is removed and every doctor link is the doctor's section on `/en/our-doctors`. Doctor `Person.url` points there. Only the founder keeps a profile page.
- **1.20, 9 November 2026.** Adopted from the website's D-222. One closing CTA on every page that ends on one: the photo variant, the owner's title and lead (the lead in lead type), one enquiry button and no contact row. No schema or URL change.
- **1.19, 9 November 2026.** Adopted from the website's D-221. Naturopathy is photo-led with the same order of ideas: `PlainList marker="numeral"`, `SpecTable variant="contrast"`, the `data-reveal` editorial image reveal (two per page at most) and `screens/NaturopathyScreen.js`. No schema or URL change.
- **1.18, 9 November 2026.** Adopted from the website's D-218 to D-220. Naturopathy (`/en/naturopathy`) is the first nav item and replaces `/en/our-approach`, which is deleted; `/en/our-doctors` is built. The handbook "Our approach" section holds the six principles and the herbal-medicine and supplements line. No schema change: Naturopathy is an `AboutPage`.
- **1.17, 8 November 2026.** Adopted from the website's D-217. The programmes index is the hero, a centred condition search and the catalogue, with nothing after it; the same search sits on `/en/conditions`. The footer link reads "Conditions A to Z". No schema change.
- **1.16, 8 November 2026.** Adopted from the website's D-216. `/en/conditions` is a plain A to Z index with a search field and a compact hero, linked from the footer, not the nav. No schema change.
- **1.15, 8 November 2026.** Adopted from the website's D-214 and D-215. `/en/conditions` is one A to Z page that links each condition to its primary programme; there are still no condition detail pages, and Conditions is back in the nav. The programmes index is a catalogue of rows with a small thumbnail and condition tags. No schema change.
- **1.14, 8 November 2026.** Programmes only, adopted from the website's D-202 to D-212. There are no condition pages for now; conditions are data (name, slug, synonyms) that programmes list. SCHEMA-05 and SCHEMA-10: a programme page emits one `MedicalCondition` per listed condition with `possibleTreatment` → the programme, and its page node's `about` names them. Retired programme and condition URLs from the previous site 301 to the closest programme. SKILL.md, skill-ia.md, skill-content.md and skill-sections.md say the same.
- **1.13, 2 November 2026.** Stay times, adopted from the website's D-61. DATA-04 and the Site settings list in skill-content.md: check-in and check-out times, the early check-in and late check-out window and its policy statement are stored once in the site record, and no page, copy file or policy body types them. The handbook (stay.md) points to it.
- **1.12, 2 November 2026.** Agent access, adopted from the website's D-60. AI-12: `Content-Signal: search=yes, ai-input=yes, ai-train=yes` in the robots.txt `*` group (CRAWL-04 points to it). AI-13: every indexable page has a Markdown twin at its path plus `.md`, converted from the built `<main>`. AI-14: `<link>` and `Link` headers name each representation from the other, with `Vary: Accept`. AI-15: one Netlify Edge Function serves HTML or Markdown by `Accept` q-values, with 406 when neither is acceptable. AI-16: the same function writes the AI access log. AI-08: `llms.txt` and `llms-full.txt` are generated from the twins. skill-stack.md lists the edge function, skill-technical.md says a twin is not an "AI version", and do-not.md refuses User-Agent switching and AI-only files and tags.
- **1.11, 30 October 2026.** The minimum stay for any programme is 7 nights, and it is mandatory (website D-55). The handbook, copy/health-claims-and-compliance.md, both SKILL.md files, the efficacy report spec and the ICP notes now say so. A shorter stay appears only on hosted-stays pages.
- **1.10, 29 October 2026.** The site has site search: a Pagefind index of every indexable page, queried in the browser on `/en/search`, which is noindex. The 404 page's search field sends `q` there. SCHEMA-04 still declares no `SearchAction`.
- **1.9, 23 October 2026.** Brought into line with the website's recorded decisions. URL-02, LANG-01 and every `/en/` home reference: the locale home is `/en`, with no trailing slash. CRAWL-01, CRAWL-06 and CRAWL-10: the sitemap index is `/sitemap.xml`, and the video sitemap is listed in the index only. SCHEMA-03: the organisation is `["MedicalClinic", "Resort"]`, which settles the lodging companion, and its full graph is on every page, with `priceRange` and `numberOfRooms` allowed. SCHEMA-05: only `AboutPage` and `ContactPage` carry `about` pointing to the organisation. SCHEMA-06 and the schema map: Make an Inquiry also emits `BreadcrumbList`. SCHEMA-09: doctors' `Person` nodes are part of the organisation graph. SCHEMA-10: programmes are `["Service", "MedicalTherapy"]`. RATE-01 and PAGE-04 exempt the organisation's `priceRange` and `numberOfRooms`. PERF-03: preload every Diodrum weight the site uses. SCHEMA-02, SCHEMA-03, SCHEMA-09 and URL-01: P.A. Kareem is the founder (`#person-pa-kareem`, profile at `/en/pa-kareem`), not one of the doctors. Schema map: policy pages also emit `BreadcrumbList`. The cancellation policy is `/en/cancellation`.
- **1.8, 17 October 2026.** PAGE-01: the document title is the one template in skill-technical.md. ACC-03, ACC-04, ACC-06 and ACC-12 to ACC-14 take in reading order, hover, error text, colour, type size, line spacing and flashing. ACC-18 to ACC-21 add time limits, link text, consistent navigation, CAPTCHA and media.
- **1.7, 7 October 2026.** MEAS-03: OpenPanel receives keyed form fields and identifies a profile. Name, email, and phone stay out of GA4. Health data stays out of both.
- **1.6, 6 October 2026.** Video: native `<video>` on Cloudflare R2 + CDN only. SCHEMA-16 adds `VideoObject` to the one `@graph`. CRAWL-10 adds the video sitemap. The standard is [skill-video.md](../skill-video.md). YouTube, Vimeo, Cloudflare Stream and Mux embeds are refused.
- **1.5, 25 September 2026.** Share images: generated at build time from three templates instead of a plain crop of the hero photograph (SOCIAL-02), with `og:image` dimensions and alt text (SOCIAL-01), `twitter:image` (SOCIAL-03), and the default image for noindex and uncovered pages (SOCIAL-04). The standard is [skill-og-images.md](../skill-og-images.md).
- **1.4, 25 September 2026.** Rates: any number of currencies from the production Keystatic tariff, exact amounts, no tax breakdown (RATE-02), same default currency for everyone (RATE-03), new RATE-05 keeps rate-sheet internals off the site. This design system holds no rates.
- **1.3, 25 September 2026.** Split into one file per section, with this overview holding priorities, owners and decisions. Removed the table that mapped each Zarnik rule. No rule text changed.
- **1.2, 25 September 2026.** MEAS-06 now gives the Search Console menu path: Settings > Search generative AI, or Settings > AI Controls.
- **1.1, 25 September 2026.** Recorded the decisions: canonical host `https://shantara.life`, `MedicalClinic`, all AI crawlers allowed, rates include GST, OpenPanel over HTTPS, Shantara's own Google Business Profile, pages below 2 MB, FAQ rich results removed in May 2026, and the Search Console Help source for MEAS-06. Changed CRAWL-04, REN-04 (now P1 with a build check), REDIR-03, RATE-02, RATE-04, SCHEMA-13, SEC-02, AI-06 and MEAS-06.
- **1.0, 25 September 2026.** First version. Adapted from Zarnik "Search and AI Visibility" version 6.2.
