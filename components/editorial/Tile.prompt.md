Replaces the white card on linen: photograph and text sit directly on the ground, with no border, shadow or radius. Order: photograph → title → **meta row** → text.

```jsx
<Tile src={photo} alt="The open deck" title="Stress Management"
  meta={["Mind", "7–14 nights"]}
  text="Doctor-led routines, therapies and rest…" href="/en/programmes/stress-management" />

{/* icon-led meta, for article lists and anywhere the row is scanned */}
<Tile src={photo} alt="" title="How meals are planned during a stay"
  meta={[{ icon: "tag", label: "Food & Recipes" }, { icon: "clock", label: "4 min read" }]} href="/en/journal/how-meals-are-planned" />
```

**Use for** programmes, rooms, articles, experiences: every listing on the website. `Card` stays for forms and dialogs only.

**Meta.** Category and duration go in `meta`, **below** the title, in caption type and normal case, never an uppercase label above the title. Strings are joined with a middot; items with `icon` (core Icon / Lucide names: `clock`, `calendar-days`, `tag`, `moon`) lead with a 14px glyph. Two or three items.

**Interaction.** The whole tile is one link. Hover (fine pointers): photograph scales to 1.02 inside its frame, title takes a hairline underline. No lift, no shadow.

**Content.** One photograph per job. Do not reuse a frame that already appears on the page.

**Catalogue rows.** The programmes index is one full-width column of `layout="thumb"` `size="lg"` tiles, one per programme: a small thumbnail, the name, the audience summary as `text`, and every condition it lists as `tags` (static Tags, never chips). A long tag wraps onto a second line. No group title.

```jsx
<Tile layout="thumb" size="lg" headingLevel={2} src={photo} alt="…" title="Metabolic Reversal"
  text="For type 2 diabetes, prediabetes, fatty liver, high cholesterol and weight at the middle."
  tags={["Type 2 diabetes", "Prediabetes and insulin resistance", "Fatty liver (NAFLD)"]}
  href="/en/programmes/metabolic-reversal" />
```

**Responsive.** Stacks everywhere; `layout="row"` sits side by side from 760px; `layout="thumb"` keeps a 112px thumbnail beside the text on phones and 220px from 760px. Put tiles in `TileGrid`, which never leaves an uneven last row.
