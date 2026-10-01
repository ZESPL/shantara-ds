---
name: shantara-icons
description: >
  Shantara favicon, touch icon and web manifest for the shantara.life website.
  Use whenever creating, changing, reviewing or debugging the favicon,
  favicon.ico, favicon.svg, apple-touch-icon, Android home-screen icons,
  maskable icons, manifest.webmanifest, the browser theme-color, or the icon
  shown next to Google search results.
---

# Shantara icons

Canonical standard: **`ui_kits/website/skill-icons.md`**. Read it before any change. This skill only lists the steps; it does not repeat the rules.

1. The site ships exactly seven files: `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-mask.png`, `manifest.webmanifest`. Never add browserconfig, mask-icon, msapplication tags or extra PNG sizes.
2. Never draw or export icons by hand, and never use a favicon generator website. Run `npm run build` in `templates/icons/`. It reads the mark from `assets/icon-current.svg` and the colours from `tokens/colors.css`.
3. Mark only, never the wordmark. Tab icon: the bare Himalaya mark on a transparent background, switching to Gold Crayola in dark mode in Chrome and Edge (Safari ignores the switch and keeps Himalaya, an accepted known limit); no tile, no gold. Home-screen icons: a Gold Crayola mark on a solid Himalaya square, no transparency, no rounded corners.
4. The 16px mark is allowed only as a browser icon from this build. The 24px minimum in `guidelines/logo.html` applies everywhere else.
5. Icon tags live only in `src/components/seo/Head.astro`, as listed in section 3 of the canonical doc.
6. The manifest keeps `display: "browser"` and `start_url: "/en/"`, with one manifest for every language and the maskable icon as its own entry.
7. Review `templates/icons/samples/preview.png`, then run `npm run check`. In the website, CI runs `node scripts/check-icons.mjs public dist` after `astro build`, which also checks every built page's head tags.
8. `display: "browser"` means the site is not installable: no install prompt, splash screen or app-drawer entry. A DevTools installability warning about `display` is expected. Do not describe the icons as install or splash icons.
9. After a real redesign, add `?v=N` to the icon `href` values so returning visitors see the change.
