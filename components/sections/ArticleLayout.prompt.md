The body of a long read: the text in 8 columns and a sticky "On this page" list in the last 3.

```jsx
<Section>
  <ArticleLayout toc={[{ id: "how-meals-are-planned", label: "How meals are planned" }, …]}
    aside={<ReviewedBy name="Dr. Bahja Janu" role="Medical Director" date="20 August 2026" />}>
    <Prose html={article.body_html} />
  </ArticleLayout>
</Section>
```

**Use** after `ArticleHeader` on Journal articles, and on legal pages and the editorial policy (after `HeroStatement variant="utility"`).

**Content.** `toc` comes from the article's h2s; each h2 carries the matching `id`. `aside` holds one block (ReviewedBy, ShareBar).

**Responsive.** Under 1000px the list collapses into one "On this page" row above the text, and `aside` follows the text. From 1000px: text 8 columns at the start, list and aside 3 columns at the end, sticky in windows at least 720px tall. Headings inside the text clear the sticky header when jumped to.
