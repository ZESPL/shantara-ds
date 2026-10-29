The shell every website section sits in: one ground, the fluid section rhythm and the centred container with a 20→48px gutter.

```jsx
<Section ground="stone">
  <Statement sub="The clinical team plans your programme and adjusts it where necessary during your stay.">
    Your programme is planned after consultation and assessment.
  </Statement>
</Section>
<Section ground="pine" space="sm" width="narrow">…</Section>
<Section space="none" bleed><PanoramaCaption … /></Section>
```

**Grounds.** `merino` (the page), `stone` (a quiet change of room), `himalaya` and `pine` (dark, at most one or two per page), `photo` (set by the photographic sections themselves). A dark ground re-points `--text-primary`, `--rule-color` and the button tokens for everything inside it, so nothing inside takes a tone prop. Never alternate grounds on every section — let two Merino sections run together when the content allows.

**Rule.** Nothing on a page paints its own background or side padding. If a block needs a colour or a margin, it needs a `Section`.

**One job.** One section makes one point that serves the page's one idea ([rule of one](../../docs/rule-of-one.md)). If its heading needs "and" to join two unrelated ideas, use two sections.

**Responsive.** No breakpoints of its own: vertical padding is fluid (`md` 80→160px, `sm` 56→96px) and the gutter is fluid (20px on a 360px phone, 48px from about 1200px). The container caps at 1240px (`wide` 1440, `narrow` 720); `width="full"` and `bleed` drop the gutter for edge-to-edge children.
