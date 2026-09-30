The closing call to action (deck slide 18). **Use ClosingCTA only on pages that otherwise have no CTA** — if the page already has a hero action, a form or a booking block, end it without one. At most one per page, always last before the footer.

```jsx
<ClosingCTA
  src="/assets/photos/exterior-entrance-dusk-lit-canopy.jpg" alt="The entrance at dusk"
  title="A stay is confirmed after a doctor has spoken with you."
  sub="Share your name and a number we can reach. Our team will contact you to arrange a consultation."
  action={<Button size="lg">Book a Consultation</Button>}
  secondaryAction={<TextLink href="/en/programs">View programmes</TextLink>}
  contact={[
    { icon: "phone", label: "+91 9553 600 100", href: "tel:+919553600100" },
    { icon: "mail", label: "heal@shantara.life", href: "mailto:heal@shantara.life" },
    { icon: "map-pin", label: "Chennamangallur, Kozhikode, Keralam, India - 673602" },
  ]}
/>

<ClosingCTA variant="compact" ground="stone" title="Questions about a programme?"
  action={<Button>Book a Consultation</Button>} />
```

**Variants.**
- `photo` — immersive end for long marketing pages (home, experience). Dark, quiet frame; 72svh.
- `ground` — `pine` (default), `himalaya` or `stone`; for pages that already carry several photographs.
- `compact` — a single band: title (h3 size) and optional sub on the left, actions on the right; for articles, the journal index, legal and utility pages.

**Content.** No eyebrow. One primary button labelled with the site's primary CTA (“Book a Consultation”); `secondaryAction` optional and quieter. `sub` optional. Contact is optional and comes from `content/site.json`: the call number (`phone`, first item) and the WhatsApp number (`whatsapp`), both currently +91 9553 600 100, heal@shantara.life, the place. No rates.

**Contact row.** Pass items, not loose inline elements: every item is the same 44px inline-flex box, so links and plain text share a baseline; icons are optional per item (all or none). One row on wide screens, wrapping as needed; one per line under 520px.

**Responsive.** Photo: content height with a 520px floor on phones, 72svh (520–860px) on desktop, statement bottom-left inside a full scrim. Ground: content height, section padding. Compact: stacks under 760px (actions full width under 520px), one row from 760px.
