A statement beside two or three large Light numerals (deck slide 8).

```jsx
<NumeralsSplit
  title="Doctor-led naturopathy, planned around your assessment."
  numerals={[{ value: "13", label: "therapies" }]}
/>
```

**Content.** Figures come only from `content/site.json`, with their labels as written there. Three at most — a fourth is dropped. Never a rate, an outcome, a percentage, or a guest total tied to a year. The practice history is not a numeral.

**Responsive.** Phone: the statement first, then the numerals side by side in equal columns while they fit; a figure never shrinks below its own width, so a long value moves to its own row rather than colliding with its neighbour. Three numerals sit in one row once there is room (about 760px). From 1000px the statement takes 5 of 12 columns and the numerals 7, bottom-aligned. A `footnote` spans the full width underneath.
