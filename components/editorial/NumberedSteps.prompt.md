Numbered steps: muted 01–04 numerals, a Medium item title and one line, from the deck's process slide.

```jsx
<NumberedSteps columns={4} items={[{ title: "Consultation and assessment", text: "Our doctors consider your medical history…" }]} />
<NumberedSteps orientation="vertical" items={steps} />
```

**Alignment.** The numeral sits in a fixed-width column and on the title's baseline, so every title and description starts on the same vertical line whatever the number (01 or 12).

**Orientation.** `horizontal` (default) for 3–4 short steps in a row (the care model). `vertical` for a sequence the reader follows down the page, such as what happens from enquiry to arrival, a stay day by day: numerals in hairline circles joined by a 1px line, content to the right, max 44rem wide. Use one orientation per page.

**Responsive.** Horizontal: one column on phones, two from 760px, `columns` from 1000px (at 4 the number sits above the title). Vertical: the same on every width; circles shrink from 44px to 36px under 520px. Numbers are decorative (`aria-hidden`); the `<ol>` carries order for screen readers.
