Long-form entry — guest notes, health intake, journal reflections.

```jsx
<Textarea label="Anything we should know?" hint="Allergies, injuries, preferences." maxLength={280} value={notes} onChange={e => setNotes(e.target.value)} />
```

Same field contract as `Input` (label, hint, error, required, optional, disabled). Minimum 136px (4 rows), 14px/16px padding, resizes vertically only.

**Motion.** Same field contract as `Input`: hover hairline, focus halo, 160ms. The character count is still — it does not pulse as it approaches the limit.

**English only.** Same rule as `Input`. A note in another script is removed, and the hint becomes “Please write in English.” The control is `lang="en"` and left to right.

**RTL.** The counter sits at the inline end of the footer; hint and error stay at the start. The typed note stays left to right.
