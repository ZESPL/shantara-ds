Terms a guest agrees to — payment, cancellation, companions — as headed clauses that open one at a time.

```jsx
<Section>
  <PolicySection title="Payment and cancellation" clauses={[
    { title: "Payment", columns: [{ key: "when", label: "Booked" }, { key: "now", label: "At confirmation" }, { key: "rest", label: "Balance" }],
      rows: tariff.payment_terms.map((t) => ({ when: t.booked_before, now: t.at_confirmation, rest: t.balance })) },
    { title: "Companions", text: "A companion staying in a separate room is charged separately. Our team confirms the amount." },
  ]} />
</Section>
```

**Use** on the Tariff page and legal pages.

**Content.** Structure from `content/tariff.json` (`payment_terms`, `cancellation`) and the handbook policies, as written. Percentages of a booking are terms, not rates; never a rate figure or currency.

**Responsive.** One column at every size, capped at 52rem. Clause tables become labelled rows on phones (SpecTable).
