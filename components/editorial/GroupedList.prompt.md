Short items gathered under group headings: programmes by focus, therapies by kind.

```jsx
<GroupedList columns={3} groups={[
  { label: "Metabolic", items: ["Detox", { label: "Weight Management", href: "/en/programs/weight-management" }] },
  { label: "Mind", items: ["Stress Management"] },
]} />
```

**Look.** Each group heading is a small Medium heading in normal case (item size), never an uppercase overline. Items are one per line on hairlines (`rules={false}` for a plain spaced list); an item with `href` gets a trailing arrow; an item with `text` gets one secondary line. Never run items together with middots.

**Content.** 1–6 items per group, 2–6 groups. Longer lists with descriptions belong in `IndexList`.

**Responsive.** Groups stack on phones, two columns from 760px, `columns` (up to 3) from 1000px.
