What a visitor sees after sending a form: it arrived, what happens next, how to reach us (call, WhatsApp, email), a way back, and three cards to keep exploring.

```jsx
<Section>
  <ConfirmationSection sub="Thank you. We have your details."
    next={["A member of the team will call you to understand what you need.", "A doctor then reviews whether a stay is the right next step."]}
    contact={[
      { icon: "phone", label: "+91 9553 600 100", href: "tel:+919553600100" },
      { icon: "message-circle", label: "WhatsApp", href: "https://wa.me/919553600100?text=Hello%2C%20I%20have%20just%20sent%20my%20details%20on%20the%20Shantara%20website." },
      { icon: "mail", label: "heal@shantara.life", href: "mailto:heal@shantara.life" },
    ]}
    explore={[
      { src: "/assets/photos/dining-restaurant-valley-window.jpg", alt: "The dining room above the valley", title: "A day at Shantara", meta: ["Experience"], text: "From the first consultation to lights out.", href: "/en/a-day-at-shantara" },
      { src: "/assets/photos/consultation-doctor-at-desk-with-guest-landscape-3x2.jpg", alt: "A doctor in consultation with a guest", title: "Meet the doctors", meta: ["About"], text: "Who you will speak with before a stay.", href: "/en/our-doctors" },
      { src: "/assets/photos/balcony.jpg", alt: "A balcony over the valley", title: "Current rates and what a stay includes", meta: ["Tariff"], text: "Rooms, inclusions, payment and cancellation.", href: "/en/tariffs" },
    ]}
    actions={<Button variant="secondary" href="/en/">Back to home</Button>} />
</Section>
```

**Use** in place of the form after a successful submit (Book a Consultation, Ask the Doctor, Hosted visits). It moves focus to its title (`autoFocus`) and scrolls into view, and is a live status region.

**Content.** Which form, and the page it was sent from, decide the title, the steps, the contact and the `explore` links. Follow the matrix in [skill-content.md › Confirmation screens](../../ui_kits/website/skill-content.md#confirmation-screens). Plain sentences on what happens next — never internal process, never a response time that is not confirmed. Contact from `content/site.json`: call (`phone`), WhatsApp (`whatsapp`, as a `wa.me` link with the standard pre-filled line) and email. The pre-filled WhatsApp line never repeats anything the visitor typed.

**Explore cards.** Below the message, under a rule, a "Keep exploring" heading (`exploreLabel`) and up to three `Tile` cards in a `TileGrid`: photograph (3:2), title, meta, one line of text. Only the first three render. Use three; never one alone. Each card can point to a page on the site, a Journal article or Doctor Answer to read, or an outside link (an `http(s)` href opens in a new tab). A card is never a second form, and never Book a Consultation on a consultation confirmation. Choose the cards from the form and the page it was sent from. Each photograph is one not already used on the page. One action button at most in the message (`Back to home`, or back to the page they came from).

**Responsive.** The message is one column capped at 44rem; the cards use the full container. Desktop (≥1000px): three cards across. Tablet (760–999px): the first card spans both columns, two below. Phone: actions stack full width, contact items one per line (44px tall), cards stack. In a modal or drawer, pass `exploreLayout="list"` so the cards become rows with the photograph beside the text.
