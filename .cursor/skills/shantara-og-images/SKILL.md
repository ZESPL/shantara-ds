---
name: shantara-og-images
description: >
  Shantara share images for the shantara.life website. Use whenever creating,
  changing, reviewing or debugging Open Graph images, og:image or twitter:image
  tags, Twitter/X cards, social share images, link previews (WhatsApp, LinkedIn,
  Facebook, iMessage), the /open-graph/ endpoint, page SEO metadata that feeds
  them, or the og-default image. Also use it when someone asks for a "social
  card", a campaign share image, or a new share template.
---

# Shantara share images

Canonical standard: **`ui_kits/website/skill-og-images.md`**. Read it before any change. This skill only lists the steps; it does not repeat the rules.

1. Pick the template from the page's hero: `default` (`HeroFullBleed`), `programme` (`HeroSplit`, which includes doctor profiles) or `editorial` (`HeroStatement`, `ArticleHeader`, which includes every Journal entry). Never add a fourth template or a separate social style.
2. Search text stays `title` / `meta_title` and `description` / `meta_description`. The picture uses `og.title` and `og.description` from section 2 of the canonical doc. Never add Keystatic fields for share images.
3. Image fallback: `og.image` override, then the generated `/open-graph/<path>.jpg`, then the locale's default (`/og-default.jpg` for English). Noindex pages, including Journal pagination, use the default.
4. The image carries the wordmark, the title and at most one supporting line. No URL, CTA, rates, dates, authors, eyebrows, badges, icons or health claims. Doctor Answers carry no supporting line (`og.line: false`). `og:description` says a doctor answers on the page.
5. Languages: metadata and images exist only for translations that are published, with a published English master. Photographs come from English. Only English is enabled. Arabic rendering is implemented (`dir: "rtl"`) but failed its test, and Hindi and Malayalam have no typeface; do not enable them or generate their images until section 12 of the canonical doc says they pass.
6. Titles that exceed the template limit fail the build. A picture headline over 32 characters needs an explicit `og.title`. Shorten that headline so it stays one line. Do not truncate.
7. Photographs come from the page's `featured_image` (doctors: `photo_profile`) or `og.photo`, and follow guest privacy in `assets/photos/README.md`.
8. Generation is build time only: `satori` + `sharp` in a prerendered Astro endpoint. No runtime function, no SSR, no `@vercel/og`.
9. Meta tags use absolute URLs from Astro `site`, with width, height, alt, `og:locale` and `twitter:card` `summary_large_image` (SOCIAL-01 to SOCIAL-04 in `ui_kits/website/search-visibility/social.md`).
10. Manual overrides only for campaigns, art-directed pages or pages no template can represent: `public/og/`, 1200 × 630 JPEG, 300 KB or less, `imageAlt` required.
11. To change a template, edit `templates/og-images/og-image.mjs`, run `npm run samples` in that folder, check every sample (including `samples/rtl-test/`), update the canonical doc, then copy the file into the website.
12. Before merging, run `astro check`, the build and `scripts/check-og.mjs` from the canonical doc.

Visual rules the templates inherit: `ui_kits/website/skill-premium.md`, `guidelines/logo.html`, `tokens/`. Rates rule: `.cursor/rules/no-scattered-pricing.mdc`.
