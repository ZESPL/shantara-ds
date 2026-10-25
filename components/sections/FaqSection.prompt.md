Questions and answers: a statement on the left, the questions as an accordion on the right, with optional FAQPage structured data.

```jsx
<Section>
  <FaqSection schema
    groups={faq.categories}            // content/faq.json → [{ name, faqs: [{ question, answer }] }]
    action={<TextLink href="/en/faq">All questions</TextLink>} />
</Section>
```

**Use** on condition, programme, Experience, Contact and Tariff pages. One per page. `items` for a single list, `groups` for named groups.

**Content.** Questions and answers come from `content/faq.json` or the page's own record, as written — never composed here. No promised outcomes. `schema` emits FAQPage JSON-LD from plain-text answers; use it once per page and only for questions visible on that page.

**Responsive.** Under 1000px the statement sits above the questions. From 1000px: 4 / 8 columns, the statement sticky while the questions scroll (windows at least 800px tall). Each question is a 44px-plus button; answers keep the body measure.
