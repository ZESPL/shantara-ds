The **editorial** hero: words lead, no full photograph (deck slide 2). A large Light h1 placed low on Merino or Stone, closed by a hairline with an optional meta row — and, for presence, a Stone ground and/or a small side image.

```jsx
<HeroStatement
  breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/en/" }, "Conditions"]} />}
  title="Conditions we commonly see"
  sub="Our doctors see guests with a range of long-standing conditions. Programmes are planned after consultation and assessment."
  meta={["Reviewed by Dr. Bahja Janu, Medical Director", "Updated August 2026"]}
/>

<HeroStatement ground="stone" title="About Shantara" sub="…"
  src="/assets/photos/courtyard.jpg" alt="The courtyard" />
```

**Use** for index and inner pages that do not need a big picture — conditions, programmes index, about, journal index, contact. For a single article use `ArticleHeader`; for an offer page with a photograph use `HeroSplit`.

**Presence (no eyebrow).** Pick one or two. The hero takes no rosette band; on the website the pattern lives in `BandStatement`.
- `ground="stone"` — a quiet change of room from the Merino page below.
- `rule` (default on) + `meta` — the closing hairline with facts beneath: "Reviewed by … · Updated …", "12 conditions · 4 categories".
- `src` / `aside` — a small 4:5 image or two or three plain facts in a side column. Never a form or a second heading.

**Content.** One full-sentence title, no label above it. `sub` is one line.

**One job.** One title stating the page's one idea, one line beneath it, and at most one primary action ([rule of one](../../docs/rule-of-one.md)). The ground, side image or meta row add presence, never a second message.

**Responsive.** Phone: crumbs → title → sub → actions → image/aside → hairline → meta; fluid top padding clears the header. `tall` (default) keeps a 440–760px floor and sits the text low. From 760px a side image/aside takes a 4-column column beside the title (7/4), bottom-aligned. The headline wraps at 22ch.

## Choosing a hero (exactly three)

| Hero | Purpose | Use on |
| --- | --- | --- |
| `HeroFullBleed` | Immersive — the place carries the message | Home (`height="full"`), Experience, one flagship inner page (`tall`) |
| `HeroSplit` | Offer — a photograph beside the title, facts and the action | Programme and condition detail pages, Tariffs, Book a Consultation |
| `HeroStatement` | Editorial — words lead, no photograph needed | Conditions and Programmes indexes, About, Journal index, Contact, legal pages (`ArticleHeader` for single articles) |

One hero per page, always first. None of them takes a label above the title: place, category or duration go in `meta`, below it.

**Variation — `variant="utility"`.** For legal pages, the 404 page, confirmation and the editorial policy: short (no 440px floor), no side image; the closing rule shows only when there is `meta` ("Updated 20 August 2026"). Pair it with `ArticleLayout` for the page body.
