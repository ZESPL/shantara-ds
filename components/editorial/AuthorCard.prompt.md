The author's byline card at the end of an article: 4:5 portrait (initials until a photograph exists), "Written by", name, role, an optional short bio and a link to the doctor's profile.

```jsx
<AuthorCard name="Dr. Bahja Janu" role="Medical Director" src={portrait}
  href="/en/about#doctors" action={<TextLink href="/en/about#doctors">About our doctors</TextLink>} />
```

**Use** once per article, after the body and before `RelatedArticles`. The byline at the top lives in `ArticleHeader`; the medical reviewer gets `ReviewedBy`.

**Content.** Bio only from confirmed fields in `content/doctors/` (qualifications and biographies are still `[TO CONFIRM]`, so leave `bio` out until they exist). Never a stock face.

**Responsive.** Portrait beside the text at every width (84px on a phone → 128px on desktop), hairlines above and below, max 68ch to match `Prose`.
