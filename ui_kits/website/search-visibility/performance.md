# 16. Performance (PERF)

Part of the [search and AI visibility rules](overview.md). Priorities, owner tags and recorded decisions are in the overview.

- **PERF-01 (P1) [Build]** Core Web Vitals on mobile at the 75th percentile: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1. **Check:** PageSpeed Insights before launch. After launch, CrUX field data once the site has enough traffic to appear there.
- **PERF-02 (P0) [Infra]** Netlify's CDN serves every page and file with Brotli or gzip compression over HTTP/2 or HTTP/3. Hashed `/_astro/` files and fonts are cached as immutable. HTML is cached briefly so a deploy shows at once. Server response time for cached pages is under 200 milliseconds. **Check:** response headers and PageSpeed Insights TTFB on a programme page.
- **PERF-03 (P1) [Build]** Preload every Diodrum weight the site uses (currently Light, Regular, Medium and Semibold) and no other font file, with `font-display: swap`, so no text changes font after first paint. OpenPanel and Google Tag load deferred, after the page is usable. **Check:** Lighthouse shows no render-blocking resources.
- **PERF-04 (P1) [Build]** No full-screen pop-ups on entry: no consultation modal, WhatsApp takeover or newsletter prompt. A cookie notice, if needed, is a banner that does not cover the content. **Check:** load a programme page on mobile. The content is visible without closing anything.
- **PERF-05 (P2) [Build]** Pages work with the browser's back/forward cache: no `unload` handlers and no `Cache-Control: no-store` on public pages. **Check:** Lighthouse back/forward cache audit.
- **PERF-06 (P2) [Build]** Astro's link prefetch may prefetch internal pages. It never prefetches the form endpoint or Keystatic routes. **Check:** Chrome DevTools network panel while hovering links.
