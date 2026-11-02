Name, figure, attributes: no borders, the accent column in olive (deck slide 13).

```jsx
<SpecTable caption="Room categories"
  columns={[{ key: "name", label: "Room" }, { key: "size", label: "Size", accent: true }, { key: "occ", label: "Occupancy" }]}
  rows={rooms} />
```

A real `<table>` for screen readers.

**One type size.** Header, names, values and figures are all body size; the accent column changes colour, never size. Mixing sizes in one table (a larger name, a title-size figure, a smaller header or note) reads as amateur, so there is no `size` prop. A row holds one record; a room's size and features belong on its tile, not under its name in a rate table.

**Responsive:** from 520px a value cell keeps to one line ("Per person, per night" never breaks) and the name column wraps. Under 520px each row becomes a block: the name, then each other cell on its own line (set `mobileLabel` to prefix a cell with its column label), never two values side by side.

**Rates.** Only the tariff screen passes rupee figures. Nowhere else.
