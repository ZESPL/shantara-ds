The medical-review strip: who reviewed the article, their role, and when.

```jsx
<ReviewedBy name="Dr. Bahja Janu" role="Medical Director" href="/en/about#doctors"
  date="12 August 2026" dateTime="2026-08-12"
  note="General information, not a diagnosis. Speak to a doctor about your own health." />
```

**Use** on every clinical or condition article (Clinical Guides, Doctor Answers): once near the top (ArticleHeader's `reviewer` renders the short form) and/or `boxed` at the end of the body. Omit entirely until a real reviewer and date exist. `medical_reviewer` in `content/articles/` is null for kit samples; never invent one for a live page.

**Content.** Name as in `content/doctors/`. Date in "12 August 2026" form with an ISO `dateTime`. The note is one caption line, plain.

**Responsive.** Glyph left, text wraps beside it at every width; max 68ch.
