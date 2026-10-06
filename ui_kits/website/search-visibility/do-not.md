# 20. Do not do this

Part of the [search and AI visibility rules](overview.md). Priorities, owner tags and recorded decisions are in the overview.

Some SEO tools and older guides still recommend these. Do not follow them.

- Do not create separate "AI versions" of pages, micro-Q&A pages, or pages chopped into fragments for AI. Google treats this as scaled content abuse.
- Do not create keyword-variation pages, location doorway pages, ICP-named hubs or condition-category hubs.
- Do not canonicalise a translation to English, or emit hreflang for a page that is not published.
- Do not leave both `/` and `/en/` indexable.
- Do not canonicalise page 2 of a listing to page 1, and do not use `rel="next"` or `rel="prev"`.
- Do not change a slug without a redirect, reuse a retired slug, or send visitors through more than one redirect.
- Do not redirect a retired page to the homepage, a listing hub or a merely similar page.
- Do not use robots.txt to keep pages out of the index. It controls crawling only, and Google cannot read a `noindex` tag on a blocked page.
- Do not block AI search crawlers by accident when blocking training crawlers. Blocking GPTBot or ClaudeBot does not stop ChatGPT or Claude search citations. OAI-SearchBot and Claude-SearchBot control those.
- Do not add `SearchAction`, `Review` or `AggregateRating` for Shantara itself, `HowTo`, `Hospital`, spa types or `HealthAndBeautyBusiness`.
- Do not use bare `#fragment` values as `@id`, or put a locale inside an entity `@id`.
- Do not write JSON-LD by hand in page components or Markdoc.
- Do not commit video files, reference a local video path, or embed YouTube, Vimeo, Cloudflare Stream, Mux or any iframe player. Videos are native `<video>` files on Cloudflare R2. See [skill-video.md](../skill-video.md).
- Do not add FAQ content to chase rich results.
- Do not show rates outside the tariff page, or change rates by location, locale or device.
- Do not put health claims in titles, meta descriptions, alt text or schema.
- Do not change published, modified or reviewed dates on a deploy.
- Do not inject canonical, robots, hreflang or JSON-LD with client-side JavaScript.
- Do not lazy-load the hero image.
- Do not use `<div>` or `<span>` as buttons, or `role="menu"` for site navigation.
- Do not treat `llms.txt` as an SEO or AI citation lever.
- Do not set word-count targets.
