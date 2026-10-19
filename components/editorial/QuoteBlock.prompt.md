A large Light quote, left-aligned, closed by an attribution line (short brand rule · speaker in Medium · role) and optional labelled facts on a hairline beneath.

```jsx
<QuoteBlock
  quote="Naturopathy treats the causes of a condition through diet, activity, therapies and rest rather than through medication."
  cite="Shantara Naturopathy Retreat" role="Our approach to care"
  facts={[{ label: "The setting", text: "A hilltop above the Chennamangallur valley." }]} />
```

**Content rule.** Only consented, recorded words, or the organisation's own stated position attributed to the organisation. `content/testimonials/` is empty, so the kit uses this block for brand statements only — never a composed testimonial, never words put in a doctor's mouth. Always give an attribution; a quote without one looks unfinished.

**Facts.** 1–3; the label is a short normal-case phrase (Medium), never an uppercase overline.

**Responsive.** Facts stack on phones and sit in one row (up to 3 columns) from 760px. `size="md"` for a half-width column.
