How to reach Shantara: call, WhatsApp, email, the address, a photograph of the arrival with an "Open in Maps" link, and directions.

```jsx
<Section>
  <ContactLocation
    ways={[
      { icon: "phone", label: "Call", value: "+91 9553 600 100", href: "tel:+919553600100" },
      { icon: "message-circle", label: "WhatsApp", value: "+91 9553 600 100", href: "https://wa.me/919553600100" },
      { icon: "mail", label: "Email", value: "heal@shantara.life", href: "mailto:heal@shantara.life" },
    ]}
    address={["Shantara", "Chennamangallur, Kozhikode", "Keralam 673602, India"]}
    directions={[{ icon: "plane", title: "From Calicut International Airport", text: "About 25 km, roughly 45 minutes." }]}
    src="/assets/photos/exterior-entrance-dusk-lit-canopy.jpg" alt="The entrance at dusk"
    map={{ href: "https://maps.google.com/?q=…" }} />
</Section>
```

**Use** on Contact, Hosted visits and confirmation pages.

**Content.** Numbers, email and address from `content/site.json`; distances and the transfer from handbook §12 (complimentary shared transfer; share flight or train details 48 hours ahead). No embedded map — it is heavy, tracks visitors and is hard to use with a keyboard; link out instead.

**Responsive.** Phones: ways to get in touch (44px rows) → address → directions → photograph. From 760px the contact rows sit two across. From 1000px: details 7 columns, photograph 5 (4:5).
