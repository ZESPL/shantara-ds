Single-choice picker for lists of 6+ options; use `Radio` below that.

```jsx
<Select label="Treatment room" placeholder="No preference" options={["Garden pavilion", "Cedar suite", "Water room"]} />
```

Native `<select>` in Input's chrome (same 52px, label, hint, error, required, disabled). The chevron is a 16px inline SVG centred on the field's midline, 16px from the inline end. The placeholder option shows in muted text until a value is chosen. There is no free text. Prefer an English `value` when the team will read the choice; a translated label can sit on `{ value, label }`.

**Motion.** Same hover / focus halo as `Input`. The chevron takes Himalaya on `:focus-within` — it does not spin or flip.

**RTL.** The caret sits at the inline end. Do not add a second physical `right` offset.
