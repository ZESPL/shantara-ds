A statement beside one to three large Light numerals, each standing on a hairline (deck slide 8).

```jsx
<Section ground="stone">
  <NumeralsSplit
    title="Doctor-led naturopathy, planned around your assessment."
    numerals={[{ value: "13", label: "therapies" }]}
  />
</Section>
```

**Content.** Figures come only from `content/site.json`, with their labels as written there. Today that is one figure — `therapies_count` — so one numeral is the normal case and has its own layout; do not pad it with a second figure. `rooms_count` is never a stat. Three at most — a fourth is dropped. Never a rate, an outcome, a percentage, or a guest total tied to a year. The practice history is not a numeral.

**One job.** The figures support the one statement beside them ([rule of one](../../docs/rule-of-one.md)); they are not a second message.

**Responsive.** Phone: the statement first, then the figures on their hairlines, side by side in equal columns while they fit; a figure never shrinks below its own width, so a long value moves to its own row rather than colliding with its neighbour. From 1000px: one figure — statement 7 of 12 columns, figure 5; two or three — statement 5, figures 7; bottom-aligned. One or two figures set at the top of the type scale (84px) from 1000px. A `footnote` spans the full width underneath.
