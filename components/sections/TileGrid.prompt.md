A heading row with one text link on the right, then tiles in a grid that never leaves an uneven last row (deck slide 11).

```jsx
<TileGrid title="Naturopathy programmes"
  action={<TextLink href="/en/programs">All programmes</TextLink>}>
  <Tile src="/assets/photos/balcony.jpg" alt="" title="Stress Management" meta={["Mind", "7–14 nights"]}
    text="Doctor-led routines, therapies and rest for guests managing sustained stress, poor sleep or fatigue." href="/en/programs/stress-management" />
  <Tile src="/assets/photos/water-wall.jpg" alt="" title="Detox" meta={["Metabolic", "7–21 nights"]} … />
  <Tile src="/assets/photos/grounds.jpg" alt="" title="Weight Management" meta={["Metabolic", "14–21 nights"]} … />
</TileGrid>
```

**Layouts.** `3` (default) three across; `2` two across; `feature` one large tile (pass `size="lg"`) beside the others stacked. Keep counts to multiples of the column count — three or six for `3`, two or four for `2`, three for `feature`.

**Uniform tiles.** From 760px the tiles in a row share four rows — photograph, title, meta, text — so a two-line title or a longer description never pushes a neighbour's meta or text out of line. Nothing is truncated; the row is as tall as its longest tile. `RelatedArticles` inherits this.

**Content.** Programme names, focus and durations from `content/programs/`; one photograph per job, never repeated on the same page. No prices on tiles.

**One job.** One grid lists one kind of thing (programmes, rooms, articles) under one heading, with at most one link ([rule of one](../../docs/rule-of-one.md)). Mixed kinds are two grids or two sections.

**Responsive.** Phone (<760px): tiles stack in one column and the link sits under the heading. Tablet (760–999px): two columns with the link right of the heading; an odd count makes the first tile span both columns so the last row is never half empty. Desktop (≥1000px): `3` goes three across, `feature` becomes 7/5 columns with the first tile spanning the height of the stack beside it.

**Variations.** `layout="4"` — four across from 1000px (two from 760px) for small items: therapies, amenities. `layout="list"` — one tile per row with the photograph beside the text from 760px (each Tile is switched to `layout="row"`), ruled apart: article and room lists.
