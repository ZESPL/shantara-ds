A sticky "On this page" bar of jump links that marks the section in view.

```jsx
<InPageNav items={[
  { id: "overview", label: "Overview" },
  { id: "includes", label: "What's included" },
  { id: "day", label: "A typical day" },
  { id: "faq", label: "Questions" },
]} />
```

**Use** on long pages — programme detail, Therapies, Rooms, legal pages — directly after the hero. Every target needs an `id`; `CatalogueSection` entries and `SplitSection id` already reserve the header offset (`scroll-margin-top`). For a single article use `ArticleLayout` (side table of contents) instead.

**Content.** Labels are the section headings, shortened to two or three words. Four to seven links.

**Responsive.** Sticky under the site header (`--header-h`). Phones: one row that scrolls sideways (the label is hidden, the current link scrolls into view). From 760px the "On this page" label shows; from 1000px the links wrap instead of scrolling. Links are 44px tall.
