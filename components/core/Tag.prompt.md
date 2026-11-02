Filter chip or static label. The look is decided by behaviour so a non-interactive tag can never pass for a button.

```jsx
<Tag selected={on} onClick={toggle}>Yoga therapy</Tag>   {/* interactive chip */}
<Tag>Type 2 diabetes</Tag>                                 {/* flat label */}
<Tag onRemove={() => drop("No dairy")}>No dairy</Tag>      {/* flat label + remove */}
```

- **Interactive** (`onClick`): pill outline chip, 36px (44px on touch), sentence case. Selected fills Himalaya and shows a small tick. `role="button"` + `aria-pressed`; Enter and Space toggle.
- **Static** (no `onClick`): 24px flat tint, 2px radius, no border, no hover, no press, `cursor: default`. `selected` on a static tag only tints it brand-soft.
- `onRemove` adds a 24px × control at the inline end (name via `removeLabel`).

For read-only status (Confirmed, Waitlist) prefer `Badge`. Do not use static Tags as decorative pills next to CTAs. Write a sentence instead.

**Motion.** Interactive chips: hover darkens the outline at 160ms on fine pointers; press is `scale(var(--press-scale))`. Static tags do not move.

**RTL.** The remove control sits at the inline end. Label and optional icon stay in reading order.
