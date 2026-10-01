# Search and AI visibility rules

Back to the [website skill](../SKILL.md).

Version 1.5. Updated 25 September 2026. Adapted for **shantara.life** from the Zarnik Marketplace checklist "Search and AI Visibility" version 6.2.

This is the checkable rule list for search engines, AI answer engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews), AI browsing agents and accessibility on Shantara's public website. The reasoning and the locked decisions stay in [skill-technical.md](../skill-technical.md), [skill-ia.md](../skill-ia.md), [SKILL.md §15](../SKILL.md#section-15) and [skill-stack.md](../skill-stack.md). These files turn them into rules with IDs and checks. They do not replace them.

## How to use these rules

- Read this overview first, then open only the section file your task needs. Each section file stands alone.
- Every rule has a stable ID, such as `REN-01`. Use the ID in pull requests, tickets and AI prompts. The IDs belong to Shantara. `REN-01` here is not Zarnik's `REN-01`.
- **P0** is a launch blocker. A rule is P0 when missing it would lose traffic or leads from the current site, break the consultation form, publish wrong medical, rate or contact information, expose personal or health data, cause a serious accessibility failure, stop Google from indexing the site, or be expensive to change after launch (URLs, locale structure, schema `@id` values).
- **P1** is done within 30 days of launch. **P2** is done once P0 and P1 are stable.
- Owner tags say who builds or maintains the rule. **[Build]** is the Astro website code: templates, metadata and JSON-LD generators, sitemap, robots.txt, redirect file and tests. **[Infra]** is Netlify and DNS: domains, HTTPS, headers and deploy contexts. **[Content]** is Keystatic records, copy, photography and alt text. **[Clinical]** is a named Shantara doctor who reviews medical content. **[Ops]** is Search Console, Bing Webmaster Tools, Google Business Profile, OpenPanel, Google Tag and OpenSEO.
- Every rule ends with a **Check**. A rule without a way to check it is not finished.
- Shantara has no backend, no shop, no cart, no site search and no product feed. Rules that only exist because of those were left out.
- Change a rule only when a real problem on the site, or a documented change by Google, Bing or a browser, requires it. Record every change in the [change log](#change-log).

## Decisions

Recorded on 25 September 2026. The rules below already follow them.

| Decision | Outcome |
| --- | --- |
| Canonical host | `https://shantara.life`. Every other host and protocol 301s to it. `content/site.json` updated to match. |
| Organisation schema type | `MedicalClinic`. `content/site.json` and the kit's schema helper in `locales.js` updated to match. |
| Lodging companion type | Still open in [skill-technical.md](../skill-technical.md). Emit `MedicalClinic` only until it is decided. |
| AI crawlers, including training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) | Allowed. robots.txt has no named groups that block any AI crawler. |
| Tax on rates | Tariff rates include all taxes. The page says so once; no tax is broken out. |
| OpenPanel address | `https://openpanel.zescloud.net/`. [skill-stack.md](../skill-stack.md) updated. |
| Google Business Profile | Shantara has its own profile, linked only to Shantara. It is not merged with, or managed as part of, the Hygiene Nature Cure Hospital listing. |
| Page size | Every page's HTML stays below 2 MB. |
| FAQ rich results | Google removed FAQ rich results in May 2026. `FAQPage` markup brings no Google benefit. |

### Still open

| Decision | Why it matters |
| --- | --- |
| Former web addresses | Migration (MIG-01) needs the full list of old domains, for example any Welnez domain, and a decision on whether any Hygiene Nature Cure Hospital pages move. |

## Section files

| File | Rules | Covers |
| --- | --- | --- |
| [One content truth (DATA)](data.md) | DATA-01 to DATA-05 | One content source, one JSON-LD generator, one metadata generator, business facts, rebuild on publish |
| [Rendering (REN)](rendering.md) | REN-01 to REN-05 | Prerendering, head tags in the first HTML, error pages, 2 MB page limit, heading order |
| [Crawling and sitemaps (CRAWL)](crawling.md) | CRAWL-01 to CRAWL-09 | robots.txt, Keystatic and confirmation pages, deploy previews, AI crawlers, sitemaps, IndexNow |
| [Languages (LANG)](languages.md) | LANG-01 to LANG-05 | Locale prefixes, root redirect, hreflang, disabled locales, translation canonicals and review |
| [URLs (URL)](urls.md) | URL-01 to URL-06 | Slugs, trailing slashes, canonicals, real 404s, Journal pagination, internal links |
| [Redirects and retired pages (REDIR)](redirects.md) | REDIR-01 to REDIR-05 | Slug-change redirects, single-hop 301s, host clean-up, query strings, retired pages |
| [Migration from the current site (MIG)](migration.md) | MIG-01 to MIG-05 | Crawl of the old site, legacy redirects, top pages, external listings, post-launch checks |
| [Pages (PAGE)](pages.md) | PAGE-01 to PAGE-08 | Titles and descriptions, breadcrumbs, orphan pages, internal-only facts, original copy, trust pages |
| [Medical content (MED)](medical.md) | MED-01 to MED-05 | Doctor review, sources, claim words in metadata, testimonials, honest dates |
| [Rates (RATE)](rates.md) | RATE-01 to RATE-05 | Rates only on the tariff page, currency labels, same default for everyone, Offer schema, no rate-sheet internals |
| [Structured data (SCHEMA)](schema.md) | SCHEMA-01 to SCHEMA-15 | JSON-LD graph, `@id` values, MedicalClinic, page nodes, doctors, programmes, articles, FAQ, schema map |
| [Link previews (SOCIAL)](social.md) | SOCIAL-01 to SOCIAL-04 | Open Graph tags, share images, Twitter card |
| [Images (IMG)](images.md) | IMG-01 to IMG-06 | Astro Image, hero loading, lazy loading, alt text, filenames, real photography |
| [Files (FILE)](files.md) | FILE-01 to FILE-02 | PDFs, favicon and web manifest |
| [Accessibility (ACC)](accessibility.md) | ACC-01 to ACC-17 | Native HTML, landmarks, keyboard, dialogs, forms, tables, contrast, zoom, motion, axe tests |
| [Performance (PERF)](performance.md) | PERF-01 to PERF-06 | Core Web Vitals, CDN, fonts, pop-ups, back/forward cache, prefetch |
| [Security and hosts (SEC)](security.md) | SEC-01 to SEC-04 | HTTPS, HSTS, exposed files, Content-Security-Policy |
| [AI answers, AI agents and local presence (AI)](ai.md) | AI-01 to AI-11 | Answer-first writing, facts, name and address consistency, Google Business Profile, AI agents, llms.txt |
| [Measurement (MEAS)](measurement.md) | MEAS-01 to MEAS-07 | Search Console, Bing, launch events, health data privacy, AI assistant referrals, alerts |
| [Do not do this](do-not.md) | — | Outdated or wrong SEO advice to ignore |

## Change log

- **1.5, 25 September 2026.** Share images: generated at build time from three templates instead of a plain crop of the hero photograph (SOCIAL-02), with `og:image` dimensions and alt text (SOCIAL-01), `twitter:image` (SOCIAL-03), and the default image for noindex and uncovered pages (SOCIAL-04). The standard is [skill-og-images.md](../skill-og-images.md).
- **1.4, 25 September 2026.** Rates: any number of currencies from the production Keystatic tariff, exact amounts, no tax breakdown (RATE-02), same default currency for everyone (RATE-03), new RATE-05 keeps rate-sheet internals off the site. This design system holds no rates.
- **1.3, 25 September 2026.** Split into one file per section, with this overview holding priorities, owners and decisions. Removed the table that mapped each Zarnik rule. No rule text changed.
- **1.2, 25 September 2026.** MEAS-06 now gives the Search Console menu path: Settings > Search generative AI, or Settings > AI Controls.
- **1.1, 25 September 2026.** Recorded the decisions: canonical host `https://shantara.life`, `MedicalClinic`, all AI crawlers allowed, rates include GST, OpenPanel over HTTPS, Shantara's own Google Business Profile, pages below 2 MB, FAQ rich results removed in May 2026, and the Search Console Help source for MEAS-06. Changed CRAWL-04, REN-04 (now P1 with a build check), REDIR-03, RATE-02, RATE-04, SCHEMA-13, SEC-02, AI-06 and MEAS-06.
- **1.0, 25 September 2026.** First version. Adapted from Zarnik "Search and AI Visibility" version 6.2.
