The top of a single Journal article: breadcrumbs → h1 → dek → meta row (category · date · read time) → byline on a hairline (author with a small portrait; "Medically reviewed by …" and "Updated …" beneath) with an optional share slot → optional lead photograph with caption. **No eyebrow** — the category is the first item of the meta row, below the title.

```jsx
<ArticleHeader
  breadcrumbs={<Breadcrumbs items={[{ label: "Journal", href: "/en/journal" }, "Food & Recipes"]} />}
  title="How meals are planned during a stay"
  dek="How meals are planned around your programme and dietary requirements."
  category={{ label: "Food & Recipes", href: "/en/journal/category/food-recipes" }}
  date="12 August 2026" dateTime="2026-08-12" readTime="4 min read"
  author={{ name: "Dr. Bahja Janu", role: "Medical Director", src: portrait, href: "/en/about#doctors" }}
  share={<ShareBar compact label="" title="How meals are planned during a stay" />}
  src="/assets/photos/dining.jpg" alt="The dining room by the valley window"
  caption="Meals are served in the dining room."
/>
```

**Article page recipe.** `ArticleHeader` → (phones: collapsed `TableOfContents`) → a two-column grid from 1000px: `Prose` (8 of 12 columns, start) + sticky `TableOfContents` (3 columns, end) → `ReviewedBy boxed` (clinical articles) → `ShareBar` → `AuthorCard` → `RelatedArticles` → `ClosingCTA variant="compact"` (the article has no other CTA).

**Content.** Title as a plain statement or question. Dek is the article's `lead`. Author and reviewer only from `content/doctors/` and only when the article record names them (`author`, `medical_reviewer` are null on kit samples — leave the byline out rather than invent one). Date in "12 August 2026" form.

**One job.** An article answers one question or makes one point, and the title states it ([rule of one](../../docs/rule-of-one.md)). If the title needs "and", it is two articles.

**Responsive.** One column; the text block caps at 52rem and the title at 24ch. The byline wraps; `share` drops under the names on phones. The photograph is full-bleed under 760px (4:3), container width above (16:9).

**Variation — `video`.** A video article: `video={{ sources, poster, title, captions, transcript }}` puts the player (editorial/Video) in the lead photograph's place, same ratios. Captions and a transcript are required when the video has speech; the read time becomes a watch time ("3 min watch").
