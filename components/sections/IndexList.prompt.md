A text-only index for lists too long for photographs: a group label on the left and hairline rows with a title, one line and an arrow.

```jsx
<IndexList groups={[
  { label: "Metabolic", items: [
    { title: "Diabetes", text: "Residential programmes planned around blood-sugar control, meals and daily doctor review.", href: "/en/conditions/diabetes" },
    { title: "Weight management", text: "Meals, activity and therapies, with weight and vitals reviewed each morning.", href: "/en/conditions/weight-management" },
  ] },
  { label: "Hormonal", items: [
    { title: "PCOS", text: "A programme may be planned around hormonal health, meals, activity and rest, following assessment.", href: "/en/conditions/pcos" },
  ] },
]} />
```

**Use** for conditions and the full programme list — anywhere photographs would repeat. Group labels come from content (a condition's `category`); never invent a taxonomy. Rows without `href` or `onClick` render as plain text with no arrow.

**Content.** A row's line is the record's `summary` or `proposition`. Conditions still in `draft` without a summary show the name only, or are left out, until medical review.

**Responsive.** Phone: the group label sits above its rows, one column of rows, each row at least 44px tall. From 760px `columns={2}` puts rows in two columns. From 1000px the label takes 3 of 12 columns on the left and the rows take the other 9. The arrow nudges 3px on hover (fine pointers) and flips under `dir="rtl"`.

**Variations.** `anchors` — rows link to sections on the same page (`items[].id` → `#id`) and show no arrow: the index at the top of Therapies or Rooms. `counts` — the number of rows beside each group label.
