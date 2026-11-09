Name, figure, attributes: no borders, the accent column in olive (deck slide 13).

```jsx
<SpecTable caption="Room categories"
  columns={[{ key: "name", label: "Room" }, { key: "size", label: "Size", accent: true }, { key: "occ", label: "Occupancy" }]}
  rows={rooms} />
```

A real `<table>` for screen readers. **Responsive:** under 520px each row becomes a block, with the name on its own line and the other cells inline beneath it (set `mobileLabel` to prefix a cell with its column label).

**Rates.** Only the tariff screen passes rupee figures. Nowhere else.

**Variation: `variant="contrast"`.** Two columns of short sentences set against each other, such as Naturopathy's At home / At Shantara. Equal columns that wrap, every cell in body size (one type size per table), a hairline between rows; the `accent` column sits on a raised ground under a gold rule and the row-header column in secondary ink. Pass `showHeader`. Under 520px each row becomes a stacked pair, each cell led by its column label, the accent cell ruled in gold on its start edge. Two columns only; not for figures.

```jsx
<SpecTable variant="contrast" showHeader caption="Naturopathy at home and at Shantara"
  columns={[{ key: "home", label: "At home" }, { key: "shantara", label: "At Shantara", accent: true }]}
  rows={rows} />
```
