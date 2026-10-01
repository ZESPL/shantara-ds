Places the real Shantara mark. Use this rather than typing the name — the wordmark's tracking and the frangipani mark are fixed brand artwork.

```jsx
<Logo mark="full" tone="cream" height={48} />
<Logo mark="icon" tone="olive" height={32} />
```

Clear space: at least the height of the frangipani mark on every side. Minimum sizes: full lockup 120px wide, icon 24px. The one exception is the browser icon built by `templates/icons/`, which may show the mark at 16px (`ui_kits/website/skill-icons.md`). Only the four supplied colourways; `cream` and `gold` for Pine Tree / Himalaya backgrounds, `dark` and `olive` for Merino / Pearl Bush.

**Motion.** The mark does not animate, hover-scale or fade. A wrapping link may change colour around it; the artwork stays still.
