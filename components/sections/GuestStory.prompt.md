A guest's own words: one story with an optional photograph of the place, or two or three short quotes.

```jsx
<Section>
  <GuestStory story={{ quote: story.quote, name: story.consented_name, context: "Detox · 14 nights", src: "/assets/photos/balcony-lounge-infinity-edge-valley.jpg", alt: "The balcony lounge" }} />
</Section>
<GuestStory title="Guests in their own words" stories={[…]} />
```

**Use** when `content/guest-stories` or `content/testimonials` holds consented records — both are empty today, so nothing ships yet. The specimen shows marked placeholders.

**Content.** Real words with written consent; a name only when the guest agreed, otherwise an initial and the context of the stay. Never a health result or a claim the clinical team would not make. The photograph shows the place, never the guest in therapy.

**Responsive.** `story`: quote above the photograph on phones; 7 / 5 from 1000px. `stories`: stacked, then side by side from 1000px. No carousel.
