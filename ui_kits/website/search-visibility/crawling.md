# 3. Crawling and sitemaps (CRAWL)

Part of the [search and AI visibility rules](overview.md). Priorities, owner tags and recorded decisions are in the overview.

- **CRAWL-01 (P0) [Build]** robots.txt is short. It allows every public page, CSS, JavaScript, image and font. It disallows only the Keystatic admin and any API routes, if they are deployed, and it lists the sitemap index. **Check:** test `/en/`, a condition page, a programme page and a `/_astro/` CSS file in Search Console's robots.txt report. All are allowed.

```
User-agent: *
Disallow: /keystatic
Disallow: /api/

Sitemap: https://shantara.life/sitemap-index.xml
```

- **CRAWL-02 (P0) [Build]** Private or utility-only pages are protected by login or `noindex`, not by robots.txt. The Keystatic admin requires a GitHub login. A separate form confirmation page, if one exists, is `noindex` and left out of the sitemap. **Check:** open `/keystatic` logged out and get a login screen. The confirmation page source shows `noindex`.
- **CRAWL-03 (P0) [Infra]** Only the production domain is indexable. Deploy previews, branch deploys and the `*.netlify.app` address either 301 to the canonical host or send `X-Robots-Tag: noindex`. **Check:** `curl -I` a deploy preview URL and the site's `netlify.app` address.
- **CRAWL-04 (P0) [Build]** Every crawler reaches public pages through the `User-agent: *` group, including Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot and Claude-User. Training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot) are allowed too, so robots.txt has no named groups. If a named group is ever added, repeat every shared rule inside it, because a crawler with its own group ignores the `*` group. **Check:** robots.txt contains only the `*` group, and no rule blocks any AI crawler.
- **CRAWL-05 (P1) [Infra]** robots.txt always returns 200, and no Netlify firewall, bot or rate-limit rule blocks or challenges verified search and AI crawlers on public pages. A 5xx on robots.txt makes crawlers treat the whole site as blocked. **Check:** an uptime monitor on `/robots.txt`, and a review of any Netlify traffic rules in the first week after launch.
- **CRAWL-06 (P0) [Build]** `@astrojs/sitemap` generates the sitemap at build time. The sitemap index is listed in robots.txt. It lists only published, canonical, indexable URLs that return 200, in enabled locales. It never lists drafts, `noindex` pages, redirected URLs, the confirmation page, the root `/` or URLs in a disabled locale. Alternate-language entries appear only for published equivalents. **Check:** an automated script requests every sitemap URL and fails on any non-200, redirect, query string or `noindex`.
- **CRAWL-07 (P1) [Build]** Each sitemap `lastmod` comes from the content record's real modified date, not the build time. **Check:** two builds with no content change produce identical `lastmod` values.
- **CRAWL-08 (P2) [Build]** After each production deploy, a small post-deploy script submits the URLs whose content changed to IndexNow. Bing uses it, and Bing is one of the search providers behind ChatGPT search. No backend is needed. **Check:** deploy a content change. The build log shows the IndexNow submission.
- **CRAWL-09 (P2) [Infra]** Non-HTML files that should stay out of search get the `X-Robots-Tag: noindex` header through `netlify.toml`. **Check:** `curl -I` on the file.
- **CRAWL-10 (P1) [Build]** Every public video is in the video sitemap, on the canonical URL of the page that shows it, with `thumbnail_loc`, `title`, `description`, `content_loc`, `publication_date` and `duration` in seconds. Drafts, `noindex` pages and muted background loops with no title are omitted. The file is listed from `robots.txt`. Field sources: [skill-video.md](../skill-video.md). **Check:** each published video URL appears once, and its `content_loc` is an R2/CDN address.
