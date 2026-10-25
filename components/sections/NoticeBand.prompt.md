A note the reader must not miss — a clinical note, a caution, a policy or a booking condition.

```jsx
<NoticeBand title="Continue your medication">
  Do not stop or change any medication before you arrive. Your doctor reviews it with you at your consultation.
</NoticeBand>
<NoticeBand tone="caution" layout="band" title="A stay is confirmed after a doctor has spoken with you"
  action={<TextLink href="/en/book-consultation">Book a Consultation</TextLink>}>Share your health assessment and records first.</NoticeBand>
```

**Use** sparingly: one per screen at most, inside a section or within an article. `inline` sits in the flow with a brand rule on its leading edge; `band` spans the container between hairlines.

**Content.** One title and one or two sentences. Never an outcome claim, never marketing. Wording from the handbook (policies, protocols).

**Responsive.** Icon beside the text at every size. `band`: the action sits under the text on phones and at the end of the row from 760px.
