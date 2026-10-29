The **offer** hero: a photograph on one side, running to the screen edge and the full hero height; the title, meta row, one line, the action and optional facts on the other.

```jsx
<HeroSplit
  src="/assets/photos/water-wall.jpg" alt="The water wall court"
  breadcrumbs={<Breadcrumbs items={[{ label: "Programmes", href: "/en/programs" }, "Detox"]} />}
  title="Detox"
  meta={[{ icon: "leaf", label: "Metabolic" }, { icon: "moon", label: "7–21 nights" }]}
  sub="Your doctor may recommend a meal plan or supervised fasting based on your assessment."
  actions={<><Button size="lg">Book a Consultation</Button><TextLink href="#programme">What the programme includes</TextLink></>}
  facts={<PlainList columns={2} size="sm" items={["Doctor review each morning", "Meals planned for you"]} />}
/>
```

**Use** on programme detail pages (and condition detail, tariffs, book-a-consultation) — pages that make an offer and need the photograph and the action visible together. Not for the home page (`HeroFullBleed`) or index pages (`HeroStatement`).

**Content.** Title is the programme or page name; category and duration go in `meta` below it, never in a label above. One primary button. `facts`: 2–4 plain items, no rates (rates live on the tariff surface only).

**Ground.** Merino by default; `stone` for a quieter page; `himalaya`/`pine` when the photograph is light and the page needs weight (Gold primary button re-points automatically).

**Responsive.** `facts` in two columns drop to one while the text column is narrower than about 480px (1000–1279px screens), so items never wrap into ragged half-lines. ≥1000px: two columns (50/50; `split="40"` gives the photo 40%, `"60"` gives it 60%), at least 600px / 88svh tall, the text column aligned to the page container on its outer edge and vertically centred, breadcrumbs at its top. <1000px: breadcrumbs, title, meta, sub, actions (full width under 520px), facts — then the photograph full-bleed at `mobileRatio` (4:3). `mobileMediaFirst` puts the photo on top when the picture is the point.

**Variation — `bleed={false}`.** From 1000px the photograph stays inside the page container (1240px), starting below the header, with the same split and height. Both columns then line up with the header's logo and controls. Use it on inner offer pages that follow a page with a bleeding hero, or when the page has another full-bleed photograph further down. Under 1000px nothing changes. See "Full bleed and boxed" in `ui_kits/website/skill-sections.md`.

## Choosing a hero (exactly three)

| Hero | Purpose | Use on |
| --- | --- | --- |
| `HeroFullBleed` | Immersive — the place carries the message | Home (`height="full"`), Experience, one flagship inner page (`tall`) |
| `HeroSplit` | Offer — a photograph beside the title, facts and the action | Programme and condition detail pages, Tariffs, Book a Consultation |
| `HeroStatement` | Editorial — words lead, no photograph needed | Conditions and Programmes indexes, About, Journal index, Contact, legal pages (`ArticleHeader` for single articles) |

One hero per page, always first. None of them takes a label above the title: place, category or duration go in `meta`, below it.

**Variation — `video`.** `video={{ sources, poster, title }}` puts a short muted loop (editorial/Video, mode "loop") in the photograph's place, with a pause button; it never autoplays for visitors who prefer reduced motion. R2 + CDN only (skill-video.md).
