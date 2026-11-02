Icon-only circular button for toolbars, cards and media overlays.

```jsx
<IconButton label="Save to wishlist" variant="glass"><Icon name="heart" /></IconButton>
```

`glass` is for controls over photography (Merino at 72% + 16px blur). `inverse` for Pine Tree surfaces. Always pass `label`, because the component has no visible text.

**Motion.** Same contract as `Button`: 160ms colour shift on fine pointers, press `scale(var(--press-scale))` (`0.96`), Himalaya focus ring. `glass` does not change its blur on hover.

**RTL.** The control is symmetric. A directional child (`chevron-left` for back) flips under `dir="rtl"`. Keep the same slug.
