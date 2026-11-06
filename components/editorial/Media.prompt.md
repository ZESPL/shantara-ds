Every photograph on the website: square-cut, cover-fit, lazy by default, with an optional scrim for type on top.

```jsx
<Media src="/assets/photos/open-deck.jpg" alt="The open deck" ratio="4:3" />
<Media src={hero} alt="Arrival at dusk" ratio="fill" scrim="hero" priority />
<Media src={pano} alt="The grounds" ratio="21:9" mobileRatio="4:3" />
```

**Shape.** `--radius-media` is 0. The deck never rounds a photograph. **Ratios** come from tokens: 4:3 listings, 16:9 wide, 4:5 portraits, 3:4 tall architecture, 21:9 panoramas (desktop only; always pair with `mobileRatio`).

**Responsive.** `mobileRatio` and `mobilePosition` switch under 760px, so one crop decision per breakpoint and never a sliver on a phone. Pass `srcSet` + `sizes` in production (Astro Image does this).

**Performance.** Only the hero sets `priority`. Everything else lazy-loads.

**Privacy.** No identifiable guests, no faces in therapy, no room numbers.
