Replaces the white card on linen: photograph and text sit directly on the ground, with no border, shadow or radius. Order: photograph → title → **meta row** → text.

```jsx
<Tile src={photo} alt="A balcony over the valley" title="Stress Management"
  meta={["Mind", "7–14 nights"]}
  text="Doctor-led routines, therapies and rest…" href="/en/programs/stress-management" />

{/* icon-led meta, for article lists and anywhere the row is scanned */}
<Tile src={photo} alt="" title="How meals are planned during a stay"
  meta={[{ icon: "tag", label: "Food & Recipes" }, { icon: "clock", label: "4 min read" }]} href="/en/journal/how-meals-are-planned" />
```

**Use for** programmes, rooms, articles, experiences: every listing on the website. `Card` stays for forms and dialogs only.

**Meta.** Category and duration go in `meta`, **below** the title, in caption type and normal case, never an uppercase label above the title. Strings are joined with a middot; items with `icon` (core Icon / Lucide names: `clock`, `calendar-days`, `tag`, `moon`) lead with a 14px glyph. Two or three items.

**Interaction.** The whole tile is one link. Hover (fine pointers): photograph scales to 1.02 inside its frame, title takes a hairline underline. No lift, no shadow.

**Content.** One photograph per job. Do not reuse a frame that already appears on the page.

**Responsive.** Stacks everywhere; `layout="row"` sits side by side from 760px. Put tiles in `TileGrid`, which never leaves an uneven last row.
