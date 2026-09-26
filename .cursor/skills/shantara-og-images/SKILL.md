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

1. Pick the template from the page's hero: `default` (`HeroFullBleed`), `programme` (`HeroSplit`) or `editorial` (`HeroStatement`, `ArticleHeader`). Never add a fourth template or a separate social style.
2. Take copy from the page metadata: `og.title ?? title`, `og.description ?? description`. Never write a second title set, never add Keystatic fields for share images.
3. Image fallback: `og.image` override, then the generated `/open-graph/<path>.jpg`, then `/og-default.jpg`. Noindex pages use the default.
4. The image carries the wordmark, the title and at most one supporting line. No URL, CTA, rates, dates, authors, eyebrows, badges, icons or health claims.
5. Titles that exceed the template limit fail the build. Shorten the title or set `og.title`; do not truncate.
6. Photographs come from the page's `featured_image` or `og.photo`, and follow guest privacy in `assets/photos/README.md`.
7. Generation is build time only: `satori` + `sharp` in a prerendered Astro endpoint. No runtime function, no SSR, no `@vercel/og`.
8. Meta tags use absolute URLs from Astro `site`, with width, height, alt and `twitter:card` `summary_large_image` (SOCIAL-01 to SOCIAL-04 in `ui_kits/website/search-visibility/social.md`).
9. Manual overrides only for campaigns, art-directed pages or pages no template can represent: `public/og/`, 1200 × 630 JPEG, 300 KB or less, `imageAlt` required.
10. To change a template, edit `templates/og-images/og-image.mjs`, run `npm run samples` in that folder, check the samples, update the canonical doc, then copy the file into the website.
11. Before merging, run `astro check`, the build and `scripts/check-og.mjs` from the canonical doc.

Visual rules the templates inherit: `ui_kits/website/skill-premium.md`, `guidelines/logo.html`, `tokens/`. Rates rule: `.cursor/rules/no-scattered-pricing.mdc`.
