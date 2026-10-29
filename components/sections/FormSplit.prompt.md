The consultation form on Merino beside a Stone panel — a photograph of the place, then what happens next.

```jsx
<FormSplit onSubmit={handleSubmit} src="/assets/photos/reception.jpg" alt="The reception desk" aside={<>
  <Statement as="h3" size="title"
    sub="A member of the team will call you to understand what you need. A doctor then reviews whether a stay is the right next step.">
    We'll be in touch
  </Statement>
</>}>
  <Statement as="h2" size="title">Send your details</Statement>
  <Input label="Name" name="full_name" autoComplete="name" required />
  <Input label="Mobile / WhatsApp number" name="phone" type="tel" autoComplete="tel" placeholder="+91" required />
  <Button size="lg" type="submit">Send your details</Button>
</FormSplit>
```

**A real form.** The left column renders a `<form>`: pass `onSubmit` (and `action` / `method` if it posts), give the button `type="submit"`, and mark required fields `required`. Enter in a field submits, the browser checks required fields before `onSubmit` runs (pass `noValidate` when the page validates itself), and assistive technology announces a form. Do not wire submission to the button's `onClick`.

**Content.** Fields follow `content/site.json` `form_field_keys`; the button reads “Send your details”. The panel says in plain sentences what happens next, as the consultation screen does; a doctor it names comes from `content/doctors/`. Do not narrate internal process as a numbered list (“1. We receive your details…”), and never promise a response time that is not confirmed.

**One job.** One form, one purpose, one submit button ([rule of one](../../docs/rule-of-one.md)). The panel reassures; it carries no second button or competing action.

**Responsive.** Under 1000px the form comes first at full width and the Stone panel follows it. From 1000px the form takes 7 of 12 columns and the panel 5. The panel is sticky below the header while the form scrolls only when the window is at least 800px tall; in a shorter window (a 720px laptop, or large guest text) it stays in the flow so its lower half is never hidden. The panel's padding is fluid (24→48px).

**Panel photograph.** `src` / `alt` (or `media`) — a photograph of the place across the top of the Stone panel at 4:3, edge to edge: `reception.jpg` in the demos (the reception desk, no guests). Never a doctor thumbnail; a doctor named in the panel copy comes from content/doctors/.

**Variation — `compact`.** The same form without the panel, capped at 44rem, name and phone side by side from 760px — for Hosted visits or the end of a condition page. It is still the site's one consultation form, never a second form with other fields.
