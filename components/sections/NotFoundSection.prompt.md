The 404 page body: a plain title, one line, a site search and a few useful links.

```jsx
<Section>
  <NotFoundSection links={[
    { label: "Programmes", href: "/en/programs" }, { label: "Conditions", href: "/en/conditions" },
    { label: "Book a Consultation", href: "/en/book-consultation" }, { label: "Contact", href: "/en/contact" },
  ]} />
</Section>
```

**Use** on the production 404 page, which still returns HTTP 404.

**Content.** Plain words, no jokes or illustration. The search posts `q` to `searchAction`.

**Responsive.** One column at every width, held to a 36rem measure: statement, then search, then links one per row. The field and the Search button stay in one row and share the 52px control height (Input `md`, Button `lg`); keep them paired at those sizes.
