# Production stack

Back to the [website skill](SKILL.md).

This file is the **final technology stack** for Shantara’s public marketing website at **shantara.life**. Treat it as locked defaults. Do not substitute libraries, hosts, or backends without an explicit product decision.

This design-system Website Kit (`ui_kits/website/`) remains a composition preview. It is **not** the Astro app. Production implementation belongs in the website repository; agents use this skill when building, reviewing, or extending that site.

## Stack table

| Area | Final choice | Role / rule |
| --- | --- | --- |
| **Framework** | **Astro** | Static-first marketing website; pre-render pages wherever possible |
| **Language** | **TypeScript** | Use throughout the codebase |
| **Styling** | **Tailwind CSS** | Implement the Shantara design system; avoid separate UI frameworks |
| **CMS** | **Keystatic** | Git-based content schema and typed reader. Local mode; the admin runs in development only |
| **Rich content** | **Markdoc** | Long-form editorial content within Keystatic |
| **Content architecture** | **Keystatic reader API** | Typed reads from `keystatic.config.ts` for programmes, therapies, conditions, articles, etc. No Astro Content Collections, no Zod: one schema, not two |
| **Interactivity** | **Astro first; React only if genuinely required** | Do not introduce React for ordinary UI components |
| **Animation** | **CSS / Tailwind transitions** | Default and primary animation mechanism |
| **Page transitions** | **Astro View Transitions** | Restrained navigation transitions |
| **Images** | **Astro Image** | Responsive images, sizing and optimization. Storage, compression and widths: [skill-images.md](skill-images.md) |
| **Multilingual** | **Astro native i18n** | Architecture ready for `/en/`, `/ar/`, etc. |
| **Forms** | **Web3Forms** | Contact, enquiry and lead forms; no custom forms backend |
| **Analytics** | **OpenPanel** | Behaviour, events, funnels and site analytics |
| **Google measurement** | **Google Tag / Google Ads conversion tracking** | Marketing attribution and conversion measurement where required |
| **Search performance** | **Google Search Console** | Indexing, queries, search performance and technical search issues |
| **SEO monitoring** | **OpenSEO** | SEO auditing, monitoring and opportunity identification |
| **Technical SEO** | **Native Astro implementation** | Metadata, canonical URLs, hreflang, robots, internal linking, redirects, etc. remain in code |
| **Structured data** | **Custom JSON-LD components** | Schema.org markup appropriate to Shantara's actual content |
| **Sitemap** | **`@astrojs/sitemap`** | Generate sitemap(s), including multilingual URLs |
| **Share images** | **`satori` + `sharp` at build** | Open Graph JPEGs from three templates in a static endpoint; no runtime function — see [skill-og-images.md](skill-og-images.md) |
| **Testing** | **Playwright** | Only ~4–5 critical smoke tests |
| **Static/type checking** | **Astro Check + TypeScript** | Required before merging |
| **Source control** | **GitHub** | Repository and pull-request workflow |
| **CI checks** | **GitHub Actions** | Run checks/tests only; **do not deploy** |
| **Deployment** | **Netlify Git integration** | Netlify builds and deploys directly from GitHub |
| **Hosting/CDN** | **Netlify** | Production hosting, previews and CDN |
| **Component libraries** | **None** | No SmoothUI, Amicro, Bencho, MUI, Chakra, etc. |
| **Advanced animation** | **None initially** | No Motion or GSAP until a concrete requirement justifies it |
| **State management** | **None** | No Redux/Zustand |
| **Database/backend** | **None** | No PostgreSQL, Supabase, Prisma or separate API |

## Service endpoints and properties

| Service | Where | Notes |
| --- | --- | --- |
| **Production site** | `https://shantara.life` | Public marketing domain |
| **OpenPanel** | `https://openpanel.zescloud.net/` | Product analytics; use the shared `track()` abstraction — see [skill-technical.md](skill-technical.md) |
| **OpenSEO** | `https://openseo.zescloud.net/` | SEO audit and opportunity monitoring; not runtime page code |
| **DataForSEO** | Research tooling (API / MCP) | Keyword and SERP research for SEO work; not a site dependency |
| **Google Analytics / Tag** | Via Google Tag / GA4 | Attribution and Ads conversion; forward through the same `track()` abstraction |
| **Google Search Console** | Google property for `shantara.life` | Indexing and query performance |
| **Netlify** | Git-connected site | Builds, preview deploys, CDN; production deploy authority |
| **Keystatic** | Git-backed schema in the website repo | Content is committed as files. Staff do not edit in Keystatic; no headless SaaS CMS |

## Rules of engagement

1. **Static-first.** Prefer Astro prerender. Hydrate only forms, navigation, gallery, accordion, modal/drawer, analytics, and video — same bar as [skill-technical.md](skill-technical.md).
2. **No UI kit besides Shantara + Tailwind.** Tokens and components come from this design system. Do not add MUI, Chakra, shadcn-as-product-UI, SmoothUI, or similar.
3. **React is exceptional.** Ordinary sections and chrome stay Astro/HTML. Introduce a React island only when interactivity cannot be done with Astro + light client script.
4. **Content path.** `keystatic.config.ts` is the only content schema. Pages read entries through the Keystatic reader (`createReader`); long-form fields are Markdoc, rendered by the site's own Markdoc renderer. Folder layout and routes: [skill-structure.md](skill-structure.md). The Keystatic singletons, collections, shared fields and language folders are defined in [skill-content.md](skill-content.md#cms--content-model). No page builder. Keep entity facts aligned with [`content/`](../../content/) in this repo where records already exist. Rates are entered only in the production Keystatic tariff.
5. **One lead path.** Web3Forms for consultation/contact. No custom forms API, no database for leads.
6. **One analytics path.** OpenPanel + Google Tag via one internal `track()`. Event inventory stays in [skill-technical.md](skill-technical.md).
7. **SEO stays in code.** Metadata, canonicals, hreflang, robots, redirects, JSON-LD, and `@astrojs/sitemap` are developer-owned. OpenSEO and DataForSEO inform work; they do not replace implementation.
8. **CI does not deploy.** GitHub Actions runs Astro Check, TypeScript, and Playwright smoke tests. Netlify deploys from GitHub.
9. **Motion stays CSS.** Tailwind/CSS transitions and restrained Astro View Transitions. No Motion, GSAP, or animation SaaS until a named requirement exists. Build order and motion vocabulary: [skill-premium.md](skill-premium.md).
10. **No app stack.** No Redux/Zustand, no Postgres/Supabase/Prisma, no separate API server for the marketing site.

## What this kit vs production means

| This kit (`ui_kits/website/`) | Production website |
| --- | --- |
| Catalog samples, hash routes (`#/en/…`) | Astro routes (`/en/…`) |
| Illustrates IA, sections, copy rules | Implements them with the stack above |
| May use design-system React components in demos | Prefer Astro; React only when required |
| No Keystatic / Netlify / production analytics wired | Keystatic, Netlify, OpenPanel, Google Tag live |

Do not rewrite this kit into Astro “because the stack says so.” Implement production in the website app; keep the kit as the skill + samples surface.

## Change control

**2026-09-25:** Content architecture changed from Astro Content Collections with Zod to the Keystatic reader API. Reason: staff do not use the Keystatic admin, so one schema (Keystatic) replaces two that had to be kept in sync.

To change a row in the stack table: record the reason, confirm it does not fight [§2 Operating principles](SKILL.md#section-2) or [What not to build](skill-qa.md#what-not-to-build), then update this file in the same change that introduces the dependency.
