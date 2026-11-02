Multi-select rows: add-ons, consents, preferences.

```jsx
<Checkbox label="I will upload my medical records" description="Reports from the last 12 months" defaultChecked />
<Checkbox label="I agree to be contacted about my consultation" required error="Please tick this box so our team can contact you." />
```

20px box, 2px radius, 1.5px border; checked fills Himalaya. The tick is an inline SVG centred with `place-items:center`, never positioned with offsets. The row is a 44px target at 17px text. `error` shows a Clay message under the row (e.g. an unticked required consent); `required` adds the Himalaya `*`. Disabled: Pearl Bush box, muted label.

**Motion.** The box press-scales. The tick scales in from 0.6 over 160ms `--ease-out`; the indeterminate dash fades. No bounce.

**RTL.** The box stays before the label in reading order. The tick is a convention, not a letter, so it does not flip.
