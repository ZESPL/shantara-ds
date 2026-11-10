Plain text in columns, with no bullets, icons or ticks.

```jsx
<PlainList columns={2} items={["Food and nutrition", "Yoga and breathing", "Rest and sleep"]} />
<PlainList columns={2} items={[{ title: "Hydrotherapy", text: "Water at controlled temperatures…" }]} />
```

Replaces leaf-icon lists and round bullets on the website. **Responsive:** one column under 520px, two from 520px, three from 1000px.

**Variation: `marker="numeral"`.** One item per row, each led by its number (01, 02…) in Light display type, between hairlines; the item in item size. For a short fixed set that is read in order and stands as the section's body, such as the six principles on Naturopathy. Not for steps the guest takes (that is `NumberedSteps`) and not for more than eight items. `columns` is ignored.

```jsx
<PlainList marker="numeral" items={principles} />
```
