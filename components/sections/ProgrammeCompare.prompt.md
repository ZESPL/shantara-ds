Programmes side by side in a real table — focus, who it is for, typical length — with cards on phones.

```jsx
<Section>
  <ProgrammeCompare title="Programmes at a glance"
    programmes={programs.map((p) => ({ name: p.name, href: `/en/programs/${p.slug}`, focus: p.focus, forWhom: p.proposition, durations: p.durations }))}
    action={<TextLink href="/en/tariffs">Current rates are on the tariff page</TextLink>} />
</Section>
```

**Use** on the Programmes index, under the hero or after the TileGrid.

**Content.** From `content/programs/`. Never a rate or "from" column — link to the tariff page. A programme without `durations` shows an empty cell rather than an invented length.

**Responsive.** Phones (<760px): each row becomes a card — the linked name, then labelled lines — so nothing scrolls sideways. From 760px: the table with a header row, rows ruled, names linked with an arrow (44px targets).
