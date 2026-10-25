A filterable listing for the Journal: category chips, article tiles, pagination and an empty state.

```jsx
<Section>
  <ListingSection title="Journal"
    categories={[{ id: "clinical", label: "Clinical Guides", href: "/en/journal/category/clinical-guides" }, …]}
    category="clinical" page={2} pageCount={4} hrefFor={(n) => `/en/journal/page/${n}`}>
    {articles.map((a) => <Tile key={a.slug} … />)}
  </ListingSection>
</Section>
```

**Use** on the Journal index and its category pages. Give categories an `href` for crawlable category URLs; `onCategory` filters in place instead.

**Content.** Categories and articles from `content/articles/`. A category with nothing yet shows the empty line, never a padded grid.

**Responsive.** Phones: chips scroll sideways in one row (44px tall on touch), tiles stack. From 760px chips wrap; tiles 2 across, 3 from 1000px (TileGrid, uniform rows). Pagination centred under the tiles.
