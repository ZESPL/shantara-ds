Modal for confirmations and short focused tasks. Returns `null` when `open` is false.

```jsx
<Dialog open={open} onClose={close} title="Move your booking?"
  description="Your practitioner and room stay the same."
  footer={<><Button variant="secondary" onClick={close}>Keep it</Button><Button onClick={confirm}>Move booking</Button></>} />
```

Merino surface, 4px corners (`--radius-card`), 28→48px padding, `--shadow-xl`. Title is Light 30px (`h2`), description is body text in `--text-secondary`, `children` sit 24px below. Footer actions are right-aligned with the primary last; under 520px they stack full width with the primary on top. The close control is a 44×44 target with a 20px ×. The scrim is `--surface-overlay`. Focus moves to the panel on open (Tab then enters its controls), Tab is trapped, Escape and a scrim click close it, and focus returns to the trigger.

Never stack dialogs. Destructive confirmations use a `Button` with `variant="primary"` and Clay-toned copy, not a red button, because the brand has no red.

**Motion.** The scrim fades over 240ms. The panel rises 8px from `scale(0.98)` over `--duration-slow` (420ms) `--ease-out`, never from `scale(0)`, never from a trigger. Exit is faster (`--duration-fast`). Reduced motion keeps the fade and drops the scale. No bounce.

**RTL.** Close sits at the inline end. Footer actions stay at the end of the reading order (primary last).
