An "at a glance" panel of 3–6 facts beside a programme's or condition's opening text.

```jsx
<Section>
  <KeyFacts title="Detox" facts={[
    { label: "Focus", value: "Metabolic" },
    { label: "Typical length", value: "7–21 nights" },
    { label: "Begins with", value: "Consultation and assessment" },
  ]}>
    <p>Your doctor may recommend a meal plan or supervised fasting based on your assessment.</p>
  </KeyFacts>
</Section>
```

**Use** directly after the hero on programme and condition pages.

**Content.** Facts from the content record only (`focus`, `durations`, …). Short values; no rates, no outcomes.

**Responsive.** Phones: intro, then the Stone panel (label and value side by side, stacked under 400px). From 1000px: intro 7 columns, panel 5.
