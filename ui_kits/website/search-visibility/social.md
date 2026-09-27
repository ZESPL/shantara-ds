# 12. Link previews (SOCIAL)

Part of the [search and AI visibility rules](overview.md). Priorities, owner tags and recorded decisions are in the overview.

Shantara pages are shared on WhatsApp, Instagram, Facebook, LinkedIn and email. These tags control how the preview looks. What the image looks like, how it is generated and how to check it are in [skill-og-images.md](../skill-og-images.md).

- **SOCIAL-01 (P1) [Build]** Every public page has `og:title`, `og:description`, `og:url` (the canonical URL), `og:type`, `og:site_name` ("Shantara Naturopathy Retreat"), `og:locale`, `og:image`, `og:image:width`, `og:image:height` and `og:image:alt`, all from the metadata generator. `og:locale:alternate` lists only locales where the same page is published. `og:description` is omitted only on noindex pages waiting for approved copy. **Check:** paste a programme URL into WhatsApp. The preview shows the right title and image.
- **SOCIAL-02 (P1) [Build]** `og:image` is generated at build time from the page's template (default, programme or editorial), using the page's own hero photograph and title. It is a 1200 × 630 JPEG of 300 KB or less, because some apps skip large preview images. **Check:** `scripts/check-og.mjs` passes on the build, including the share-copy audit (headline length, supporting line, claims and rates).
- **SOCIAL-03 (P1) [Build]** `twitter:card` is `summary_large_image`, and `twitter:image` matches `og:image`. **Check:** view the page source.
- **SOCIAL-04 (P1) [Content]** Pages that are not indexed (thank-you, 404) and pages the generator does not cover use one approved default share image, `og-default.jpg`. **Check:** paste the thank-you URL into WhatsApp.
