Shantara's action control: three variants, one near-square shape (`--radius-control`, 2px), taken from the brand deck's closing slide.

```jsx
<Button size="lg">Make an Inquiry</Button>
<Button variant="secondary">View programmes</Button>
<Button variant="link" endIcon={<Icon name="arrow-right" size={16} />}>View conditions</Button>
```

**Variants.** `primary` is the one commit action per view. `secondary` is a 1px outline for a second, weaker action. `link` is text with a hairline underline and an arrow; it has zero inline padding so its left edge sits on the grid, and it still keeps a 44px tap height. `accent`, `ghost` and `inverse` are deprecated aliases kept so the app kit keeps working (`ghost` now renders as `link`). Do not use them on the website.

**Ground-aware colour.** Buttons never take a tone prop. Inside `data-ground="himalaya" | "pine" | "photo"` the primary turns Gold with Pine ink and the secondary and link turn Merino (tokens/layout.css). On Merino and Stone the primary is Himalaya olive.

**Sizes.** `md` (44px) and `lg` (52px) on the website; `sm` (36px) only in dense chrome, and it grows to 44px on touch screens.

**Responsive.** Under 520px labels may wrap instead of overflowing. Put button rows in `.sh-actions`. Add `data-stack="mobile"` to stack them full width on phones.

Labels stay short: about one action, roughly 20 characters in English.

**Motion.** Hover is a one-step fill or hairline shift at `--duration-fast`, fine pointers only; the link arrow moves 3px. Press is `scale(var(--press-scale))`, except `link`, which does not move. Focus is the 2+2px ring (Gold on dark grounds).

**RTL.** `startIcon` / `endIcon` follow reading direction. Arrow icons flip under `dir="rtl"`.
