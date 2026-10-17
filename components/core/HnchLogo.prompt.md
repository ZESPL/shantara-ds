Places the Hygiene Nature Cure mark, the parent hospital of Shantara. Use it only where that hospital’s own logo is required. Shantara lockups stay on `Logo`.

```jsx
<HnchLogo mark="full" tone="dark" height={56} />
<HnchLogo mark="hygiene" tone="dark" height={37} />
<HnchLogo mark="icon" tone="light" height={40} />
<HnchLogo mark="full" tone="green" height={48} />
```

`hygiene` is the full lockup with the Nature Cure line removed. The symbol still stands in for the I. Its default height matches the letter size of `full` at 56.

The artwork is a single colour. `light` is the white lockup published on hygienecure.com. `dark` (`#1C1A1D`) is for Merino, white and other light grounds. `green` (`#0A481E`) is the hospital’s site secondary, for a light ground when the mark should read in their green. `current` is `currentColor` for an inlined SVG or a CSS mask; an `<img>` does not inherit colour, so use `light`, `dark` or `green` there.

Do not recolour it into Himalaya or Gold Crayola, and do not put it in place of the Shantara wordmark.
