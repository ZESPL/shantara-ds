Numbered sources under a clinical article or condition page, with the medical-review line.

```jsx
<Section space="sm">
  <ReferencesSection items={article.references} reviewer={{ name: "Dr. Bahja Janu", role: "Medical Director", date: "20 August 2026" }} />
</Section>
```

**Use** at the end of clinical articles and condition pages. The text cites `[1]` linking to `#ref-1`.

**Content.** Each reference names the work, its journal or publisher and year, and links to the source. Every reference supports something the page says — never decorative. The specimen uses marked placeholders; production entries come from the article record. Reviewer names follow `docs/handbook/glossary.md`.

**Responsive.** One column at every size, capped at the body measure; long addresses wrap. A targeted reference is tinted.
