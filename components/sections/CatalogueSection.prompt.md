One page, many entries — each with its own anchor — for Therapies, Rooms and Farm & Dining.

```jsx
<InPageNav items={therapies.map((t) => ({ id: t.slug, label: t.name }))} />
<Section>
  <CatalogueSection entries={therapies.map((t) => ({
    id: t.slug, title: t.name, text: t.description,
    src: photoFor(t), alt: altFor(t),
  }))} />
</Section>
```

**Use** where the IA gives a family one page: links to a single therapy or room point to `/en/therapies#hijama`, never to a page of its own. Pair it with `InPageNav` (or an `IndexList anchors`).

**Content.** Names and one-line descriptions from `content/therapies/`, `content/rooms/`; facts (a `SpecTable` or `PlainList`) from the same record. Photographs without guests' faces in therapy — hands, rooms, equipment. No rates.

**Responsive.** Phones: photograph first, edge to edge, then the text. From 1000px: photograph and text side by side (5 / 7, or `media="half"`), sides alternating (`alternate`), entries ruled apart. Each anchor clears the sticky header and an InPageNav; the targeted entry's title is underlined.
