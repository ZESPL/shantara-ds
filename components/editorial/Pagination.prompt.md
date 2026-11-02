Previous / numbered pages / next, under the article grid on the Journal index.

```jsx
<Pagination page={2} pageCount={8} hrefFor={(n) => (n === 1 ? "/en/journal" : `/en/journal/${n}`)} />
```

**Use** with `hrefFor` on the website so every page is a real, crawlable URL (Astro static paths). `onChange` alone only for client-side filtering inside a page. Hide the component when `pageCount` is 1.

**Responsive.** Numbers collapse with an ellipsis around the current page; under 520px they give way to "Page 2 of 8" between two arrow buttons (labels kept for screen readers). Every target is 44px.

## Journal index recipe (CategoryFilter)

There is no separate filter component. Use **`Tabs`** (navigation) as the category filter:

```jsx
<Tabs items={["All", "Clinical Guides", "Food & Recipes", "Doctor Answers", "Life at Shantara"]} value={cat} onChange={setCat} />
<TileGrid layout="3">{articles.map((a) => <Tile key={a.slug} src={a.photo} alt={a.alt} title={a.title} meta={[a.category, a.readTime]} href={a.href} />)}</TileGrid>
<Pagination page={page} pageCount={count} hrefFor={pageHref} />
```

- Categories come from `content/articles/*.category`; "All" first; at most 6 tabs (Tabs scrolls sideways on phones; never wrap to two lines).
- On the static site each tab is a link to its own URL (`/en/journal/category/clinical-guides`), so `value` is the current category and `onChange` navigates.
- Tabs sit directly above the grid, below the page's `HeroStatement`; no heading between them. Reset to page 1 when the category changes.
