Facilities at a glance: an icon, a short label and one line, in a grid.

```jsx
<Section>
  <FeatureGrid title="Around the retreat" items={[
    { icon: "sun", title: "Yoga Hall", text: "Guided yoga practice, breathing sessions and meditation." },
    { icon: "book-open", title: "Library", text: "A quiet space for reading and reflection." },
  ]} />
</Section>
```

**Use** on Amenities & Activities and Rooms.

**Content.** Only amenities in the handbook amenities section (`docs/handbook/property.md`) — never add one. Leave the designated workstations out of a marketing grid (they are the exception to the device policy). 24-hour nursing care is the included nursing team, never the personal attendant. Icons from the curated registry (`core/Icon`).

**One job.** One grid answers one question (what the rooms have, what there is to do) under one heading ([rule of one](../../docs/rule-of-one.md)).

**Responsive.** Phones: one column, icon beside the text. From 520px: two columns. From 1000px: `columns` (3 or 4), icon above the text.
