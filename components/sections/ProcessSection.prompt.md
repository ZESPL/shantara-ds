The guest's own path in 3 to 5 numbered steps.

```jsx
<Section ground="stone">
  <ProcessSection title="How a stay begins" steps={[
    { title: "Send your details", text: "Share your name and a number we can reach." },
    { title: "A call from our team", text: "A member of the team calls to understand what you need." },
    { title: "A doctor reviews", text: "A doctor reviews whether a stay is the right next step." },
    { title: "Your stay is confirmed", text: "A stay is confirmed after a doctor has spoken with you." },
  ]} />
</Section>
```

**Use** on Home, programme pages and Book a Consultation — once per page.

**Content.** Only steps the guest takes or sees. Never internal process ("we log your details"), never a response time that is not confirmed. A fifth step and beyond is dropped.

**Responsive.** Phones: one column, the number beside each step. From 760px: two columns. From 1000px: one row, as many columns as steps, numbers above a hairline.
