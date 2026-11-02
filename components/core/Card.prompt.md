**Scope (2026 refactor).** Card is for forms, dialogs and in-stay app surfaces only. Marketing pages do not use white cards on linen. Use `Tile` (image and text directly on the ground, no border, shadow or radius) and the section components in `components/sections/`. Radius is `--radius-card` (4px); padding is fluid (`md` 20→28px, `lg` 24→40px).

The in-stay content container for treatments, retreats, journal entries, booking summaries.

```jsx
<Card media="/assets/photos/treatment.jpg" mediaAlt="Therapy room" interactive onClick={open}>
  <h4>Mud therapy</h4>
  <p>Prescribed therapy · 45 minutes · daily, 10:30</p>
</Card>
```

Tones: `default` (white on Merino pages), `raised` (Pearl Bush, no shadow, for grouped panels), `sunken` (Sand), `outline`, `brand` (Himalaya), `inverse` (Pine Tree). `interactive` adds a 4px lift and the large shadow; never combine it with an interactive child button.

`interactive` + `onClick` makes the whole card a button: it gets `role="button"`, enters the tab order, and fires on Enter and Space. Give `media` a real `mediaAlt` unless the image is decorative.

Listing photography is flush to the card (`media`), 8px radius, default aspect `4/3` (`--card-media-ratio` / `--media-ratio`). Do not drop a small inset `Photo` inside the body. Pass `mediaHeight` only when a listing must break the ratio.

**Motion.** Interactive cards lift 4px (`--lift-hover`) into `--shadow-lg` over `--duration-base` (240ms), only on fine pointers. The card itself never scales. Media does not zoom on hover. Raised, sunken and brand tones do not lift.

**RTL.** Type inside the card starts from the inline start. Photography does not mirror.
