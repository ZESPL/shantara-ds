Name, figure, attributes: no borders, the accent column in olive (deck slide 13).

```jsx
<SpecTable caption="Room categories"
  columns={[{ key: "name", label: "Room" }, { key: "size", label: "Size", accent: true }, { key: "occ", label: "Occupancy" }]}
  rows={rooms} />
```

A real `<table>` for screen readers.

**One type size.** Header, names, values and figures are all body size; the accent column changes colour, never size. Mixing sizes in one table (a larger name, a title-size figure, a smaller header or note) reads as amateur, so there is no `size` prop. A row holds one record; a room's size and features belong on its tile, not under its name in a rate table.

**Responsive:** from 520px a value cell and its column title keep to one line ("Per person, per night" and "Amount (INR)" never break); money columns are `accent` and `align: "end"` and the name column wraps. Under 520px each row becomes a block: the name, then each other cell on its own line (set `mobileLabel` to prefix a cell with its column label), never two values side by side.

**Rates.** Only the tariff screen passes rupee figures. Nowhere else.

**Variation: `variant="contrast"`.** Two columns of short sentences set against each other, such as Naturopathy's At home / At Shantara. Equal columns that wrap, every cell in body size (one type size per table), a hairline between rows; the `accent` column sits on a raised ground under a gold rule and the row-header column in secondary ink. Pass `showHeader`. Under 520px each row becomes a stacked pair, each cell led by its column label, the accent cell ruled in gold on its start edge. Two columns only; not for figures.

```jsx
<SpecTable variant="contrast" showHeader caption="Naturopathy at home and at Shantara"
  columns={[{ key: "home", label: "At home" }, { key: "shantara", label: "At Shantara", accent: true }]}
  rows={rows} />
```
