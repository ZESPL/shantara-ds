Name, figure, attributes: no borders, the accent column in olive (deck slide 13).

```jsx
<SpecTable caption="Room categories"
  columns={[{ key: "name", label: "Room" }, { key: "size", label: "Size", accent: true }, { key: "occ", label: "Occupancy" }]}
  rows={rooms} />
```

A real `<table>` for screen readers. **Responsive:** under 520px each row becomes a block, with the name on its own line and the other cells inline beneath it (set `mobileLabel` to prefix a cell with its column label).

**Rates.** Only the tariff screen passes rupee figures. Nowhere else.
