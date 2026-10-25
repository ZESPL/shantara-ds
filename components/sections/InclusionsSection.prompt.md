What a stay includes, what it does not, and the supplements — from the tariff structure, never with a figure.

```jsx
<Section>
  <InclusionsSection
    includes={tariff.includes} excludes={tariff.excludes} supplements={tariff.supplements}
    action={<TextLink href="/en/tariffs">View the tariff</TextLink>} />
</Section>
```

**Use** on programme pages, the Tariff page and Rooms.

**Content.** Lists come from `content/tariff.json` as written. Supplements show their label and basis ("Per person, per night") — never an amount, a currency or a "from" price. The one link goes to the tariff page, where rates live (Keystatic tariff in production).

**Responsive.** Phones: one column. From 760px: Included beside Not included, supplements across both. From 1000px: the statement takes 4 columns, the lists 8.
