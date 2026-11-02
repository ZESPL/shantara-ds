Flat status label for state and category: one or two words, sentence case.

```jsx
<Badge tone="brand">Prescribed</Badge>
<Badge tone="success" dot>Confirmed</Badge>
<Badge tone="outline">Waitlist</Badge>
```

A Badge must never read as a button: 20px tall (a control is 44px+), 2px radius, a soft tint with no border, no pill, no uppercase tracking, no hover, no press, `cursor: default`. `outline` drops the box entirely and shows a dot plus text. If it can be clicked it is not a Badge. Use `Tag` with `onClick` (a chip) or a `Button`.

Tones: `neutral` (default), `brand`, `accent`, `success`, `info`, `warning`, `danger`, `outline`. Do not put Badges next to CTAs as decoration; write a sentence instead.

**Motion.** Status, not a control. Tone changes cross-fade at 160ms. No hover, no press, no entrance loop.
