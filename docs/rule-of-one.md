# Rule of one

Every Shantara surface has **one reader, one idea, one focal point and one next step.** Everything else on it supports that one thing, or moves somewhere else.

This applies to anything this design system produces: website pages and sections, heroes, share images, decks and slides, posters, print ads, brochures, guest documents, stationery, emails, WhatsApp messages, social posts, video, app screens and forms. It is the composition rule behind several rules that already exist here (one primary button per view, one rosette band per view, one idea per slide, one consultation form). This file is the single place it is stated. Other files link here and keep only their own medium's specifics.

## Why this matters for Shantara

A prospective guest is weighing a health decision and a costly stay, often on a phone. A surface that says one thing clearly reads as clinical confidence. A surface that says five things reads as a sales pitch, which is the opposite of the calm, factual register in [`ui_kits/website/skill-copy.md`](../ui_kits/website/skill-copy.md). The rule of one also keeps the system small: when every block has one job, fewer components, variants and exceptions are needed.

## The four ones

| One | Question to answer before designing | Fails when |
| --- | --- | --- |
| **Reader** | Who is this for, and what are they trying to decide? | The surface tries to speak to guests, agents and investors at once. |
| **Idea** | What is the one thing they should believe or understand afterwards? Write it as one plain sentence. | The sentence needs "and" to join two unrelated points. |
| **Focal point** | What does the eye land on first? | Two images, two large headlines or two filled buttons compete. |
| **Next step** | What is the one action that follows? | Two actions carry equal weight, or there is no action at all where one is needed. |

The idea sentence is a **planning note, not copy**. Do not paste it onto the page; the headline is written from it under the copy rules.

## The one-sentence brief

Before building any page, section, deck, poster, document or message, write these five lines. If a line cannot be written, the surface is not ready to design.

```text
Reader:      who it is for and what they are deciding
Idea:        the one sentence they should come away with
Proof:       what must be shown for them to believe it
Next step:   the one action (for the website, Book a Consultation unless the surface has another job)
Not here:    what was cut or moved, and where it went
```

On the website this is the "page job" in [`ui_kits/website/SKILL.md` §11](../ui_kits/website/SKILL.md#section-11) and [`skill-qa.md` step 1](../ui_kits/website/skill-qa.md#step-1--define-the-page-job), with the idea line added. Audience is described by need and intent; internal ICP labels from `docs/icp.md` may appear in a planning brief but never on the surface or on a content record.

## Levels

The rule applies at every scale. Each level serves the level above it.

### 1. Brand: one positioning

Every public surface is a version of the same positioning: a doctor-led naturopathy retreat where care is drug-free and planned after consultation and assessment (root [`SKILL.md`](../SKILL.md), rule 1). A surface may lead with the place, the doctors, a programme or a stay, but it never introduces a competing claim about what Shantara is. Public wording comes from [`skill-copy.md`](../ui_kits/website/skill-copy.md); internal phrases such as "clinical hotel" stay internal.

### 2. Surface: one job

A page, deck, poster, brochure, email or message has one job and one reader. If it has two jobs, it is two surfaces.

- A programme page helps someone decide whether the programme fits their need. A rooms page helps them picture the stay. Neither tries to do the other's job; they link.
- A consultation confirmation confirms. It does not sell (see [`ConfirmationSection`](../components/sections/ConfirmationSection.prompt.md) and [`skill-content.md`](../ui_kits/website/skill-content.md)).
- An investor deck produces trust in the numbers. A guest programme presentation produces reassurance. Do not merge them into one deck.

### 3. Section or slide: one point

Each section, slide, spread or brochure page makes one point, with one heading, one photograph (or one row of tiles with one photograph each) and at most one action.

- **The "and" test.** If the heading needs "and" to join two unrelated ideas, split it into two sections.
- **The cover test.** Cover everything but the heading: the point should still be clear. Cover the heading: the body should still be about one thing.
- A section is not required to carry an action. The page's one next step lives in the hero and the close; middle sections earn it.

### 4. View: one focal point

A view is whatever is visible at once: a screen at the current scroll position, a slide, a poster, a page spread, a share image.

- One dominant element: one Display or Statement headline, or one hero photograph, never two at the same weight.
- One primary button. Other actions are `secondary` or a `TextLink` ([`skill-premium.md`](../ui_kits/website/skill-premium.md#buttons)).
- One rosette band (root `SKILL.md`, rule 2), and on the website at most one `BandStatement` per page.
- One accent. Where the brand rules allow an accent (Gold on dark grounds, a highlighted bar in a chart), it marks the single most important thing in the view. It is never spread across several elements to make each look important, and this rule never widens where accents may be used (`guidelines/colors.html`, `guidelines/brand-applications.html`).

### 5. Element: one name for one thing

- One label per action everywhere: **Book a Consultation**, not a different synonym on each page ([`page-copy-patterns.md`](../ui_kits/website/copy/page-copy-patterns.md#calls-to-action)).
- One name per programme, room category, service and person, taken from `content/` and the glossary. No synonyms for variety.
- A button describes one action. A caption carries one fact. A list item states one thing.

## By medium

Use this table to apply the rule; the linked file holds the full rules for that medium.

| Medium | One reader / job | One focal point | One next step | Full rules |
| --- | --- | --- | --- | --- |
| Website page | One page job (need, intent, page type) | One hero, first, with one headline | One primary action, usually Book a Consultation | [`ui_kits/website/SKILL.md`](../ui_kits/website/SKILL.md), [`skill-sections.md`](../ui_kits/website/skill-sections.md) |
| Website section | One point | One photograph or one tile row | At most one action; often none | [`skill-premium.md`](../ui_kits/website/skill-premium.md#layout-and-whitespace) |
| Hero | The page's idea, as one full-sentence headline | One photograph or one statement | One primary button; a second action is a `TextLink` | Hero `*.prompt.md` files |
| Share image | The page's hero, reduced | The title, in Diodrum Light | None on the image | [`skill-og-images.md`](../ui_kits/website/skill-og-images.md) |
| Deck | One audience and one goal | — | One clear next step on the last slide | [Presentations skill](../.cursor/skills/shantara-premium-presentations/SKILL.md) |
| Slide | One idea, stated in the headline | One visual, one chart or one number | — | Presentations skill |
| Poster, print ad, signage | One message | One photograph from the shortlist | One way to respond: a short URL or a QR code, not both plus phone, email and handles | This file, [`guidelines/brand-applications.html`](../guidelines/brand-applications.html) |
| Brochure, guest guide, printed document | One purpose for the whole document | One topic per page or spread | One contact block, in one place | This file, [`docs/handbook.txt`](handbook.txt) for facts |
| Stationery | One identity, no message | The mark or the name | Contact details once, at the foot | `guidelines/brand-applications.html` |
| Email | One reason for writing | One message above the fold | One link or button | This file |
| WhatsApp or SMS | One reason for writing | — | One link, or one question to reply to | This file |
| Social post | One message per post | One photograph; never a collage | One link | This file, [`assets/photos/README.md`](../assets/photos/README.md) |
| Video | One subject per film | One subject per shot | Any action belongs on the page around the video, not burned into it | [`skill-video.md`](../ui_kits/website/skill-video.md) |
| App screen | One task per screen | One current item | One primary action per screen | [`ui_kits/app/README.md`](../ui_kits/app/README.md) |
| Form | One form for one purpose | — | One submit button | The one consultation form, [`FormSplit`](../components/sections/FormSplit.prompt.md) |

### Posters, print ads and signage

A poster is read in a few seconds, often from a distance.

- One headline. No competing subhead; at most one short supporting line.
- One photograph, chosen from the shortlist in `assets/photos/README.md` (public pieces use **Yes** frames only).
- One lockup. Co-branded pieces follow `guidelines/cobrand-lockups.html`.
- One way to respond. A short URL or a QR code, not both, and not a block of every contact channel.
- No feature lists, no rates, no badges.

### Brochures, guest guides and printed documents

- The cover states what the document is for. A pre-arrival guide prepares the guest for the stay; it does not sell programmes.
- One topic per page or spread, with a heading that states it.
- Contact details appear once, in one place, not in every footer.
- Facts come from `content/` and the handbook; never invent amenities, services or policies to fill a spread.

### Email and messages

- One reason for writing, stated in the subject line or the first sentence.
- One link or one button. Secondary links, if any, sit below the message and look secondary.
- A confirmation confirms. It does not add a promotion, a survey and a newsletter sign-up.
- Messages never carry rates (link to the tariff page) and never carry health information beyond what the guest sent.

## What the rule does not mean

- **Not one item.** A `TileGrid` of programmes, a `KeyFacts` list or a credentials strip is one job with several items. The rule limits jobs, not items.
- **Not for reference surfaces.** The tariff, FAQ, policies, a programme comparison and the handbook exist to hold many facts. Their rule is one purpose per surface (help someone check or compare), with one topic per section.
- **Not for navigation and the footer.** The header and footer list many links by design. They are the frame, not a view's focal point. The header's Book a Consultation button is the one exception to "one primary button per view" and does not count against the page.
- **Proof can be plural.** Several facts, figures or credentials may support the one idea, as long as all of them support it.
- **Not an excuse to remove required information.** Medical review, references, consent, legal text and accessibility requirements stay, even when they add elements.

## When two things compete

1. Go back to the reader's decision (website priority order in [`SKILL.md` §13](../ui_kits/website/SKILL.md#section-13): clinical safety, then clarity, then conversion). The thing that serves it more stays.
2. Move the other thing; do not squeeze it in. Move it to its own section, its own page, a deck appendix, or the destination page behind a link.
3. If it must stay in the view, demote it: a filled button becomes a `TextLink`, a second photograph goes, a second headline becomes body text or a meta row.
4. If nothing can be removed, the surface has two jobs. Split it.

## Checklist

Run this on any surface before calling it done. Each medium's own checklist links back here.

- [ ] The reader and the one idea can each be stated in one sentence.
- [ ] Every section, slide, spread or block serves that idea. Anything that does not was cut or moved.
- [ ] Each section or slide makes one point; no heading joins two unrelated ideas with "and".
- [ ] Each view has one focal point: one dominant headline or image, one primary button, one rosette band, one accent.
- [ ] There is exactly one next step, and it is the most visible action.
- [ ] One label per action and one name per thing, matching `content/` and the copy skill.
- [ ] Required information (medical review, consent, legal, accessibility) is still present.

## Where it is already enforced

| Rule | File |
| --- | --- |
| One primary action per page | [`ui_kits/website/SKILL.md` §11](../ui_kits/website/SKILL.md#section-11), [`skill-qa.md`](../ui_kits/website/skill-qa.md) |
| One primary button per view; one photograph per job | [`skill-premium.md`](../ui_kits/website/skill-premium.md) |
| One hero per page, always first | [`HeroStatement.prompt.md`](../components/sections/HeroStatement.prompt.md) |
| One `BandStatement` per page; one rosette band per view | `skill-premium.md`, root [`SKILL.md`](../SKILL.md) |
| One consultation form, one primary CTA label | [`ui_kits/website/SKILL.md` §1–2](../ui_kits/website/SKILL.md), [`page-copy-patterns.md`](../ui_kits/website/copy/page-copy-patterns.md) |
| One idea per slide; one chart, one message; one accent; one next step | [Presentations skill](../.cursor/skills/shantara-premium-presentations/SKILL.md) |
| Wordmark, title and one supporting line on a share image | [`skill-og-images.md`](../ui_kits/website/skill-og-images.md) |
