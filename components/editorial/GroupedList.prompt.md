Short items gathered under group headings: therapies by kind, or conditions A to Z on the programmes index (Find a programme by condition).

```jsx
<GroupedList columns={3} headingLevel={3} groups={[
  { label: "A", items: [{ label: "Acne", text: "Skin Health Restoration", href: "/en/programmes/skin-health-restoration", terms: "acne|pimples|hormonal acne" }] },
  { label: "T", items: [{ label: "Type 2 diabetes", text: "Metabolic Reversal, Senior Vitality & Geriatric Wellness", href: "/en/programmes/metabolic-reversal" }] },
]} />
```

**Look.** Each group heading is a small Medium heading in normal case (item size), never an uppercase overline. Items are one per line on hairlines (`rules={false}` for a plain spaced list); an item with `href` gets a trailing arrow; an item with `text` gets one secondary line. Never run items together with middots.

**Content.** 1–6 items per group, 2–6 groups. Longer lists with descriptions belong in `IndexList`. The A to Z condition list is the exception: one group per initial letter, as many as the conditions need, each item one condition linking to its primary programme with every programme that lists it as `text`. `terms` (pipe-separated name and synonyms) goes to `data-filter-terms` for the page's filter script.

**Responsive.** Groups stack on phones, two columns from 760px, `columns` (up to 3) from 1000px.
