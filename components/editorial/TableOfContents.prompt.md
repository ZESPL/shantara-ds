"On this page" for articles with four or more h2 sections.

```jsx
<div className="article-grid">{/* ≥1000px: body 8 cols (start) | TOC 3 cols (end) */}
  <Prose html={body} />
  <TableOfContents items={[
    { id: "how-meals-are-planned", label: "How meals are planned" },
    { id: "supervised-fasting", label: "Supervised fasting" },
    { id: "dietary-requirements", label: "Dietary requirements" },
  ]} />
</div>
```

**Variants.** Pick one per site section and keep it; do not mix variants on one page.

| `variant` | Looks like | Use for |
| --- | --- | --- |
| `rail` (default) | A list on a hairline rail; the current section takes a 2px brand bar and medium weight. | Journal articles and guides. |
| `numbered` | Each entry led by its two-digit numeral, entries divided by rules. | Ordered reading: what to expect, step-by-step guides, policies with sections that build on each other. |
| `panel` | The list in a raised box, entries divided by rules, each with a down arrow. | Long reference pages (FAQ, policies) where the contents should read as a destination of its own. |

```jsx
<TableOfContents variant="numbered" items={toc} />
<TableOfContents variant="panel" items={toc} />
```

**Desktop (≥1000px).** A sticky list on a hairline rail in the side column (start side, 3 of 12 columns, or end side after the body). The section in view is marked (brand bar, numeral or colour, by variant); `track` follows the scroll with IntersectionObserver, or pass `activeId`.

**Smooth scroll — implement it on the page.** The component renders plain `#id` links and does not scroll by itself. The page must scroll smoothly to the heading, through `onNavigate`:

```jsx
<TableOfContents items={toc} onNavigate={(id, e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", "#" + id);
}} />
```

Or set `html{scroll-behavior:smooth}` site-wide. Either way, keep reduced motion: `tokens/motion.css` already sets `scroll-behavior:auto` under `prefers-reduced-motion`; with `scrollIntoView`, pass `behavior: "auto"` when `matchMedia("(prefers-reduced-motion: reduce)").matches`. `Prose` gives h2 and h3 a `scroll-margin-top` so headings clear the sticky header.

**Phones and tablets.** A collapsed "On this page" row with a chevron, placed between `ArticleHeader` and the body (render it first in the DOM on phones, or render two instances and hide one per breakpoint); tapping opens the list in place. Not sticky.

**Content.** Labels are the h2 texts, shortened if long. Level 3 only when a section is long. Skip the TOC for articles under ~800 words.
