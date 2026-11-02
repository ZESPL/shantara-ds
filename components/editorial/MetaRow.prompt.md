The caption-size facts row that sits **below** a title: category, duration, date, read time. It replaces the eyebrow: the system has no small uppercase labels above headings.

```jsx
<MetaRow items={["Metabolic", "7–21 nights"]} />
<MetaRow items={[{ icon: "tag", label: "Food & Recipes" }, { icon: "calendar-days", label: "12 August 2026", dateTime: "2026-08-12" }, { icon: "clock", label: "4 min read" }]} />
```

**Use** under a Tile title, a hero title (HeroSplit, HeroStatement), an ArticleHeader, a ReviewedBy strip. Two to four items; the most useful fact first.

**Content.** Normal sentence case, no trailing full stop. Plain items are joined by a middot; if any item has an `icon`, every item leads with its glyph and the middots go. Use icons only where the row is scanned (article lists, programme heroes), not in every tile.

**Responsive.** Wraps; a middot never starts a line.
