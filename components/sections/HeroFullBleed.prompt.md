Full-screen photographic hero with the statement bottom-left inside a scrim and one Gold primary button (deck slide 1). The **immersive** hero.

```jsx
<HeroFullBleed
  src="/assets/photos/arrival-dusk.jpg" alt="Shantara at dusk"
  title="A doctor-led naturopathy retreat in Keralam"
  sub="Drug-free naturopathy on a hilltop above the Chennamangallur valley. Every stay begins with a consultation, and your programme is planned by our doctors."
  actions={<>
    <Button size="lg">Book a Consultation</Button>
    <TextLink>View programmes</TextLink>
  </>}
  meta={["Kozhikode, Keralam", "Since 2000"]}
/>
```

**Use** once per page, first. `height="full"` for the home page (display-size headline); `height="tall"` for inner pages that earn a photograph (experience) with an h1-size headline; `short` for secondary pages. The transparent site header sits over it.

**Content.** No eyebrow. The headline is one sentence and leads with what Shantara is — never “not a spa” or “wellness retreat”. Place and since-year, if wanted, go in `meta` below the actions. One primary button; a second action is a `TextLink`, not a second filled button. The photograph is the LCP image, so the hero passes `priority` for you; choose a frame with dark, quiet space bottom-left.

**Responsive.** Phone (<520px): at least 560px tall (100svh up to 1080px), the headline wraps at 20ch in the fluid display size, actions stack full width. Tablet: same layout, the scrim still covers the whole text block. Desktop: the statement caps at 44rem inside the container, bottom-left. Pass `mobilePosition` when the subject of the photograph moves out of a portrait crop.

## Choosing a hero (exactly three)

| Hero | Purpose | Use on |
| --- | --- | --- |
| `HeroFullBleed` | Immersive — the place carries the message | Home (`height="full"`), the Experience pages (Therapies, Rooms, Amenities & Activities, Farm & Dining, A Day at Shantara), one flagship inner page (`tall`) |
| `HeroSplit` | Offer — a photograph beside the title, facts and the action | Programme and condition detail pages, doctor profiles, Tariffs, Book a Consultation |
| `HeroStatement` | Editorial — words lead, no photograph needed | Conditions and Programmes indexes, About, Journal index, Contact, legal pages (`ArticleHeader` for single articles) |

One hero per page, always first. None of them takes a label above the title: place, category or duration go in `meta`, below it.
