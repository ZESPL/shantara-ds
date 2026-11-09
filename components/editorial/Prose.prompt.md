Long-form article text at the body measure (`--measure-body`, 65ch). Styles the plain HTML a CMS or Markdown renderer produces, with no classes needed in the content.

```jsx
<Prose html={article.bodyHtml} />
<Prose>
  <p>…</p>
  <h2 id="how-meals-are-planned">How meals are planned</h2>
  <ul><li>…</li></ul>
  <blockquote><p>…</p><footer>Dr. Bahja Janu, Medical Director</footer></blockquote>
</Prose>
```

**Covers** h2 (h3 size, 30 Medium), h3 (h4 size, 24 Medium), h4, p, ul/ol (olive markers), blockquote (hairline, Light lead size), figure + figcaption (or use `ArticleFigure`), table (scrolls sideways on phones), hr, links (underlined, always), strong/em, code.

**Rules.** Give every h2 an `id` so `TableOfContents` can link to it (headings have scroll-margin for the sticky header). No h1 inside Prose. The title belongs to `ArticleHeader`. Start with a paragraph, not a heading. Medical claims only as written by the author and reviewed by the medical reviewer.

**Wide items.** An element with `data-width="wide"` (a figure or table) breaks out of the measure from 1000px, only when the parent is a container (`container-type:inline-size`).

**Responsive.** One column; the measure caps line length on large screens, tables scroll inside themselves on phones.
