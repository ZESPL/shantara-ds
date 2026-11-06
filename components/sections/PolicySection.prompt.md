Terms a guest agrees to (payment, cancellation, companions) as headed clauses that open one at a time.

```jsx
<Section>
  <PolicySection title="Payment and cancellation" clauses={[
    { title: "Payment", columns: [{ key: "when", label: "Booked" }, { key: "now", label: "At confirmation" }, { key: "rest", label: "Balance" }],
      rows: tariff.paymentTerms.map((t) => ({ when: t.bookedBefore, now: t.atConfirmation, rest: t.balance })) },
    { title: "Companions", text: "A companion staying in a separate room is charged separately. Our team confirms the amount." },
  ]} />
</Section>
```

**Use** on the Tariff page and legal pages.

**Content.** Structure from `content/tariff.json` (`paymentTerms`, `cancellation`, `postponement`) and the handbook policies, as written. The design system holds no amounts, percentages or windows (`tariff.json` shows “—”); the site supplies real terms from its published policies. Never a rate figure, charge, percentage or currency here.

**Responsive.** One column at every size, capped at 52rem. Clause tables become labelled rows on phones (SpecTable).
