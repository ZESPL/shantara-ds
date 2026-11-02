Loading state as three dots breathing in sequence: a calm wave, never a rotating ring.

```jsx
<Spinner />
<Spinner size="lg" label="Checking availability" showLabel />
<Spinner size="sm" color="var(--color-merino)" />   {/* inside a primary button */}
```

Sizes `sm` (5px dots, inside buttons), `md` (7px, default), `lg` (10px, page sections). `label` is always announced (`role="status"`, `aria-live="polite"`); `showLabel` also prints it beside the dots. Do not show a loader for waits under ~400ms.

**Motion.** The only looping animation in the system: each dot swells from 0.6 to 1 and brightens on a 1400ms `--ease-breath` wave, staggered by a third of a cycle. `prefers-reduced-motion: reduce` stops the loop and holds the dots at three stepped opacities; the label still announces.
