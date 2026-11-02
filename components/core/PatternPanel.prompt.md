Rosette **band** on one edge of a surface, the only way the pattern is used. Not a wash behind content, not a texture inside cards. One band per screen or slide, and its inner edge is always ruled with a 1px hairline.

```jsx
<PatternPanel tone="pearl" edge="right" band="288px" style={{ padding: "var(--space-13)" }}>
  <h2>Three things we left out, on purpose</h2>
</PatternPanel>
```

- `edge`: `right` (default), `left`, `top`, `bottom`, plus logical `start` / `end`. `left` and `right` stay physical; `start` and `end` follow `dir`. The band bleeds off on its three outer sides; the inner side carries the hairline.
- `band`: width for vertical bands (22–38% of the surface), height for horizontal strips (8–18%). A strip's cell is measured off its height, so a strip needs ~260px to clear the floor.
- `scale`: **proportional, not a free choice: cell = band / 2**, so two rosettes read across the band at any surface size (usable range band/1.5 → band/3). Given `band` as an absolute length, the default computes this for you; a percentage band must pass `scale` explicitly. 1440 page → band 432 → cell 216. 1280 slide → band 380 → cell 199. 1440×1800 post, strip 15% → strip 270 → cell 135. 960 panel → band 288 → cell 144. Floor 130px, which makes ~880px the smallest patterned surface. **Below that drop the band rather than shrink it** (`reserve` stays on so content padding remains). Always a single square value.
- `tone="none"` lays the band over photography (white line at 0.5). Set it on a wrapper that already holds the image.
- `reserve` (default true) pads the content clear of the band. Only switch it off when the children are absolutely positioned away from that edge. Type, cards and controls never sit in the band. The rosette is not a field behind headlines or body copy.
- `ink` / `rule` override the line and hairline colours.

**Hard rule.** If the surface is narrower than ~880px, omit the pattern band. PatternPanel now does this for you with a container query on its own width: under 880px the band disappears and the padding it reserved returns to the content, so one component works from phone to desktop. Do not put long Merino headings beside a wide patterned edge and call it “reserved.”

**Motion.** None. The rosette is a still band. The only looping motion in the system is the Spinner. Never give the pattern a drift, pulse or fade.
