A photograph running to the edge of the screen on one side and a bottom-aligned text column on the other (deck slides 4, 6 and 13).

```jsx
<SplitSection src="/assets/photos/balcony.jpg" alt="A balcony over the valley" mediaSide="start">
  <Statement meta={["Mind", "7–14 nights"]} sub="Doctor-led routines, therapies and rest for guests managing sustained stress, poor sleep or fatigue.">
    Stress Management
  </Statement>
  <TextLink href="/en/programs/stress-management">Read about the programme</TextLink>
</SplitSection>
```

**Use** for one idea with one photograph: a programme, the rooms, the dining room. Alternate `mediaSide` down a page. `split="40"` gives the text more room when it carries a `SpecTable` or `PlainList` (deck slide 13); `bleed={false}` keeps the photo inside the container (at every width) — the default choice for every split after the page's first full-bleed photograph (see "Full bleed and boxed" in `ui_kits/website/skill-sections.md`).

**Content.** A `Statement`, then at most one list and one link. No buttons beyond one `TextLink` — the page's primary action lives in the hero and the closing section.

**One job.** One point, one photograph (or one video), at most one `TextLink` ([rule of one](../../docs/rule-of-one.md)). If the text needs a second heading, it is a second split.

**Responsive.** Under 1000px the photograph always comes first, full width and edge to edge at `mobileRatio` (default 4:3), and the text follows with the normal gutter. From 1000px: two columns (50/50, or 40/60 with `split`), the photograph fills its column's full height (row floor `clamp(560px, 48vw, 820px)`, change with `minHeight`), and the text column lines up with the page container on its outer edge and sits at the bottom (`align`). `mediaSide` only reorders from 1000px.

**Variations.** `id` — the section's anchor clears the sticky header and an InPageNav (`scroll-margin-top`), so `/en/therapies#hijama` lands on the heading. `video={{ sources, poster, title, captions }}` — a player (editorial/Video) in the photograph's place. `stack` — the text above the photograph at every width, inside the container, the photograph at 16:9 from 1000px: for a short statement beside a very wide frame, where a tall split would leave an empty column.
