Hairline-ruled disclosure list. The plus/minus sign rotates rather than flipping a chevron.

```jsx
<Accordion items={[
  { title: "What should I bring?", content: "Only yourself. Robes, slippers and linen are provided." },
  { title: "Can I move my booking?", content: "Yes, up to 48 hours before arrival." },
]} />
```

**Motion.** The panel opens on `grid-template-rows: 0fr → 1fr` over `--duration-base` (240ms). Height is layout work, so it stays short. The plus becomes a minus by rotating the vertical stroke out. Closed panels stay `inert` so their content leaves the tab order without `display: none` killing the transition.

**RTL.** The title aligns start; the plus/minus stays at the inline end. The plus itself does not flip.
