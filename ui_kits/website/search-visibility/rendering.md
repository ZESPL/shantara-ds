# 2. Rendering (REN)

Part of the [search and AI visibility rules](overview.md). Priorities, owner tags and recorded decisions are in the overview.

- **REN-01 (P0) [Build]** Every public page is prerendered by Astro. Text inside accordions, tabs and galleries is in the first HTML response (accordions hide content with `aria-hidden` or `inert`, not by leaving it out). React islands are used only where [skill-stack.md](../skill-stack.md) allows them. **Check:** load a condition page, a programme page, an article and the tariff page with JavaScript turned off. The H1, body copy, FAQ answers, medical reviewer line and rates (on the tariff page) are all visible.
- **REN-02 (P0) [Build]** The title, meta description, canonical, robots tag, hreflang links and JSON-LD are in the first HTML response. JavaScript never adds, changes or removes them. **Check:** compare `curl` output with the rendered DOM. The canonical, robots and hreflang tags match.
- **REN-03 (P1) [Build]** The 404 and 410 pages are static HTML with the site header, a link to `/en` and the contact options. Google does not render JavaScript on error pages. **Check:** request a URL that never existed. It returns 404 with the message visible and JavaScript turned off.
- **REN-04 (P1) [Build]** Every page's HTML is below 2 MB uncompressed. Googlebot stops reading after the first 2 MB. Watch inline SVG (the rosette) and props serialised into islands. **Check:** a build step measures every HTML file in `dist/` and fails on any file of 2 MB or more.
- **REN-05 (P1) [Build]** One `<h1>` per page. Headings follow order (H2 under H1, H3 under H2). Section components take a heading level instead of hard-coding one. **Check:** an automated test on each page type.
