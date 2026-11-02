Short-lived confirmation, Pine Tree by default.

```jsx
<Toast fixed tone="success" title="Booking confirmed" message="Thursday, 9:30am with Anya." onClose={dismiss} />
```

One toast at a time, 4–6 seconds, past tense, no exclamation marks.

The dismiss control (`onClose`) is a 44×44 target with a 20px ×, never a bare glyph.

**Motion.** Enters from its own height (`translateY(100%)`) over 420ms with `ease`, via `@starting-style`, so rapid toasts retarget instead of restarting. Exit uses the same path. The dismiss control fades to full opacity on hover. Do not stack a slide from the side or a bounce.

**RTL.** Icon, copy and dismiss reverse into reading order. The toast still rises; it does not slide in from a side.
