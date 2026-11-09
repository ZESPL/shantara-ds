The closing call to action (deck slide 18). **Use ClosingCTA only on pages that otherwise have no CTA**. If the page already has a hero action, a form or a booking block, end it without one. At most one per page, always last before the footer.

```jsx
<ClosingCTA
  src="/assets/photos/porch-dusk-lit-canopy.jpg" alt="The porch at dusk"
  title="Plan your stay with our doctors."
  sub="Share your name and a number we can reach. Our team will contact you to discuss the next step."
  action={<Button size="lg">Make an Inquiry</Button>}
  secondaryAction={<TextLink href="/en/programmes">View programmes</TextLink>}
  contact={[
    { icon: "phone", label: "+91 9553 600 100", href: "tel:+919553600100" },
    { icon: "mail", label: "heal@shantara.life", href: "mailto:heal@shantara.life" },
    { icon: "map-pin", label: "Chennamangallur, Kozhikode, Keralam, India - 673602" },
  ]}
/>

<ClosingCTA variant="compact" ground="stone" title="Questions about a programme?"
  action={<Button>Make an Inquiry</Button>} />
```

**Variants.**
- `photo`: immersive end for long marketing pages (home, experience). Dark, quiet frame; 72svh.
- `ground`: `pine` (default), `himalaya` or `stone`; for pages that already carry several photographs.
- `compact`: a single band: title (h3 size) and optional sub on the left, actions on the right; for articles, the journal index, legal and utility pages.

**Content.** No eyebrow. One primary button labelled with the site's primary CTA (“Make an Inquiry”); `secondaryAction` optional and quieter. `sub` optional. Contact is optional and comes from `content/site.json`: the call number (`phone`, first item) and the WhatsApp number (`whatsapp`), both currently +91 9553 600 100, heal@shantara.life, the place. No rates.

**Contact row.** Pass items, not loose inline elements: every item is the same 44px inline-flex box, so links and plain text share a baseline; icons are optional per item (all or none). One row on wide screens, wrapping as needed; one per line under 520px.

**Photo variant type.** The title is set at the H1 size (`--type-h1`) and the `sub` in the lead type (`--type-lead`), like a hero's title and lead (website D-222). The title keeps its `h2` element.

**Photo variant ink.** Over the photograph every line (sub, contact text and contact icons) is solid Merino (no faded Merino, no Gold), and the text block carries its own scrim so a headline that wraps high on a phone is never left on bright sky.

**One job.** The page's one next step, stated once ([rule of one](../../docs/rule-of-one.md)). One primary button; the secondary action and contact row are quieter. One `ClosingCTA` per page, and only when the page has no other CTA.

**Responsive.** Photo: content height with a 520px floor on phones, 72svh (520–860px) on desktop, statement bottom-left inside a full scrim. Ground: content height, section padding. Compact: stacks under 760px (actions full width under 520px), one row from 760px.

**Boxed photo: `bleed={false}`.** Variant `photo` only. From 1000px the dark photograph sits inside the page container (1240px) on a `surround` ground (`merino` by default, or `stone`), so its edges line up with the header and with the footer's content below it. Same height, scrim and ink. Use it when the page already opens with a full-bleed hero. Under 1000px nothing changes.

**Variations.** `variant="whatsapp"`: the ground layout with "Message us on WhatsApp" as the primary action and a call as the second; pass `whatsapp` (a wa.me URL) and `phone` (a tel: URL) from content/site.json, and `phoneLabel`. `variant="tariff"`: a compact Stone band, "Current rates and what a stay includes", with one link to the tariff page (`tariffHref`): the commercial close for programme and room pages, which never quote a rate.

**On the website** every page that ends on a closing CTA uses one shared close (website D-222, `EnquiryClosing`): the photo variant on the enquiry frame, the title "Begin your transformation with Shantara", the owner's lead, one "Make an Enquiry" button and no contact row.
