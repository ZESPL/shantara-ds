Solid Himalaya with the rosette band on one edge, and a Merino Light statement (no label above it) — the page's one accent (deck slide 3).

```jsx
<BandStatement>
  <Statement sub="The clinical team plans your programme and adjusts it where necessary during your stay.">
    Your programme is planned after consultation and assessment.
  </Statement>
  <PlainList items={["Consultation and assessment", "A plan for you", "Therapies and daily routines", "Progress reviewed during your stay"]} />
</BandStatement>
```

**Use** at most once per page. It is the only place the rosette appears on the website; do not add a second pattern band anywhere else on the page.

**Content.** The text turns Merino and rules re-point automatically (`data-ground="himalaya"`). A `PlainList` is fine; buttons are not — this is a statement, not a call to action.

**Responsive.** From about 880px of section width the band takes 30% of the surface on `edge` (default `end`, the right in LTR) with its cell at 15% of the width (never under 130px), and the text keeps to the page container's left edge, capped at 52rem. Under 880px the band disappears (PatternPanel's container query) and the text takes the full width inside the normal gutter. Padding is the fluid section rhythm (80→160px).

**Variation — `quote`.** `quote={{ quote, cite, role }}` — the page's one accent as a doctor's or the founder's own words (QuoteBlock in Merino on Himalaya), instead of a statement. Real, approved words only; never a guest testimonial here.
