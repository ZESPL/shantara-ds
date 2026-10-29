# Content model, publishing, and lead capture

Back to the [website skill](SKILL.md).

## CMS / content model

**Production CMS:** Keystatic (git-based) with Markdoc for long-form. `keystatic.config.ts` is the only schema, and pages read it through the Keystatic reader — see [skill-stack.md](skill-stack.md) and [skill-structure.md](skill-structure.md). Staff do not edit in Keystatic.

This model is instantiated in [`content/`](../../content/) for the design-system kit. Empty folders (`guest-stories/`, `events/`, `testimonials/`) mean the entity is not ready. Do not invent records to fill them. Stub conditions stay `draft` with empty clinical bodies until medical review exists.

Model business/content entities, not layout hacks. There is **no page builder and no composed pages**. Fixed pages (home, rooms, therapies, FAQ, tariff) keep their intro copy and SEO in code; Keystatic holds the entities they list.

### Shared fields

Define each group once and reuse it.

| Group | Fields | Used on |
| --- | --- | --- |
| Status | `status`: `draft` or `published` | Every entry |
| Featured image | `featured_image`: image and required `alt` | Conditions, programmes, therapies, rooms, doctors, articles, doctor answers. It is also the photograph in the page's share image ([skill-og-images.md](skill-og-images.md)). Authors and testimonials use `photo`. |
| Featured | `featured`: true or false | Programmes, therapies, rooms, articles, doctor answers, testimonials |
| Video | `video`: R2/CDN URLs only — `sources` (WebM and MP4), `poster`, optional `captions`; text `title`, `description`, `uploadDate`, `duration` (both ISO 8601), `transcript`; optional `chapters`, `creator`. Standard: [skill-video.md](skill-video.md). | Conditions, programmes, doctor answers, testimonials. Store links, never the file. No YouTube, Vimeo, Cloudflare Stream or Mux. |
| External references | `external_references`: list of `{title, url}` | Optional on conditions, programmes, therapies, articles, doctor answers |
| Related pages | `related_pages`: list of `{type, id}` | Conditions, programmes, therapies, articles, doctor answers, doctors |
| FAQs | `faqs`: list of `{question, answer}` | Conditions, programmes |
| SEO | Meta title, meta description | Conditions, programmes, doctors, articles, doctor answers |

**Related pages.** `type` is a fixed list in the Keystatic config: `condition`, `program`, `therapy`, `room`, `doctor`, `article`, `doctor_answer`, `page`. It is not an editable collection. Link in one direction only; the site generates the reverse links at build time (a programme page lists every condition that points to it). Page templates group items by type, so a condition page renders its `program` items as "Programmes for …". Relationships use stable IDs, never URLs. Therapy and room links point to their section on the single therapies or rooms page. Doctor links go to the doctor's profile page when one exists, otherwise to their section on `/en/our-doctors`.

Attribution is not a related page: an article's author and a doctor answer's doctor keep their own fields.

### Singletons

| Singleton | Fields |
| --- | --- |
| Site settings | See [Site settings](#site-settings) |
| Tariff | Structure only in this design system: `includes`, `excludes`, `supplements` (`label`, `basis`), `payment_terms`, `cancellation`, `public_notes`. See [Tariff](#tariff). |
| General FAQ | `categories`: list of `{name, faqs: [{question, answer}]}`. Editors can add categories. |

Each singleton is one file per language: `site/{locale}.json`, `tariff/{locale}.json`, `faq/{locale}.json`. English is the master. A translated tariff carries labels, terms and notes, never amounts.

Medical categories ([`content/medical-categories.json`](../../content/medical-categories.json)) stay in this design system as a staff routing aid. They are not modelled in Keystatic and are not public IA.

### Collections

| Collection | Its own fields | Page |
| --- | --- | --- |
| Condition | name; slug; category; summary; clinical body (Markdoc); medical reviewer (doctor); last medically reviewed | `/en/conditions/[slug]` |
| Programme | name; slug; focus; proposition; durations; suitability; inclusions; clinicians (doctors). **No prices.** | `/en/programs/[slug]` |
| Therapy | name; slug; description; purpose; how it is used at Shantara | One `/en/therapies` page for all therapies. No page per therapy. |
| Room | name; slug; summary; size; specification (`spec_line`); occupancy; balcony; amenities; gallery. **No prices.** | One `/en/rooms` page for all room categories. No page per room. |
| Doctor | full name; slug; role; `photo_profile`; qualification; licences (issuing body only, never a registration number or joining date); years in practice; biography (Markdoc); areas of practice; professional memberships; publications; press; talks; videos; social posts; external profiles | Every doctor is listed on `/en/our-doctors`. Only Dr. Bahja Janu has a profile page (`/en/doctors/[slug]`), which lists her answers, reviewed articles, programmes, press, talks, videos and social posts. No other doctor gets one. |
| Leadership | full name; slug; role; `photo_profile`; qualification; years in practice; biography (Markdoc); publications; press; talks; videos; social posts; external profiles | The founder and chairman, P.A. Kareem, only (`/en/pa-kareem`). He is not a doctor: never put him in Doctor, a clinician field, a doctor answer or a medical reviewer field. Source: handbook §3. |
| Author | name; slug; role; photo; short bio; optional link to a doctor | No page |
| Article / Clinical Guide | title; slug; category; lead; body (Markdoc); read minutes; date published; date modified; author (required); medical reviewer (doctor, required for clinical content) | `/en/journal/[slug]` |
| Doctor Answer | question; slug; short answer; detailed answer (Markdoc); category; read minutes; reviewed date; doctor (required) | `/en/journal/[slug]` |
| Testimonial | quote; display name; country; anonymised; photo; stay month and year; programme; `consent_status` (`recorded`, `pending`, `withdrawn`); `consent_date` | No page. Publish only when consent is `recorded`. |

Deferred until real records exist: Guest Story, Event.

Unconfirmed facts stay out of published records: keep the entry `draft` until Shantara confirms it. There is no `to_confirm` flag and no ICP field. ICPs stay in [`docs/icp.md`](../../docs/icp.md) for strategy and CRM.

**Doctor photographs.** `photo_profile` is the public profile photograph: avatars, team grids, the doctor page and the share image. Every doctor's is the passport headshot `doctor-*-passport.jpeg` (extension kept). The file index is [`assets/photos/README.md`](../../assets/photos/README.md).

**BNYS.** A doctor who holds a Bachelor of Naturopathy and Yogic Sciences, and who is legally entitled to "Dr.", is identified as "Dr. [Full Name], BNYS" or "Dr. [Full Name]". The qualification field may spell the degree in full. Written form: [`docs/handbook/glossary.md`](../../docs/handbook/glossary.md).

**Doctor press and talks.** Optional lists on a doctor record. Omit the list when it is empty.

- `press`: `{outlet, title, date, url}`. `date` is ISO 8601. `title` is the link text on the profile. When an outlet headline states a cure or another outcome, use a plain description instead and keep the headline in handbook §4.
- `talks`: `{title, url, publisher, date}`. `date` is optional, ISO 8601. Outbound links only. Never an embed. YouTube, Vimeo and other players stay off the page ([skill-video.md](skill-video.md)).
- `videos`: `{publisher, title, date, url}`. Other third-party films. Same outbound-link rule as talks.
- `social_posts`: `{source, date, url}`. Outbound links only.

Notes that are not page copy — one lecture carried by several outlets, a sponsored placement, a title the recording gets wrong — stay in handbook §4 (for the founder, §3). The founder's Leadership record uses the same press, talks, videos and social posts lists. The unique list for P.A. Kareem is [`docs/media-kareem.md`](../../docs/media-kareem.md). His profile lists that register.

### Tariff

Rates, currencies and validity dates are **not stored in this design system or its documentation**. They live only in the production Keystatic tariff, entered as exact, fixed numbers from Shantara's current rate sheet. The site never converts, rounds, derives or calculates a rate.

Production tariff fields:

- `valid_from`, `valid_to`
- `currencies`: list of `{code, label}` — any number, in any order; the first is the default in the currency selector
- `room_rates`: list of `{room, occupancy, prices: [{currency, amount}]}` — occupancy is a row, so new occupancies need no schema change
- `supplements`: list of `{label, basis, prices: [{currency, amount}]}`
- `includes`, `excludes`, `payment_terms`, `cancellation`, `public_notes`

Show amounts exactly as entered, next to their ISO code. Build checks confirm completeness only: every rate and supplement row has a price for every listed currency, every code is valid, every published room has rates, and `valid_to` has not passed.

Internal rate-sheet content never enters Keystatic, the design system, documentation or the front end — anything Shantara's rate sheet marks internal, and its internal controls. Only the public all-inclusive rates, supplements, inclusions, exclusions, payment terms and cancellation policy are published.

### Languages

Keystatic has no built-in multilingual support, so the language comes from the folder.

```
src/content/conditions/en/diabetes.json   ← master: every field
src/content/conditions/ar/diabetes.json   ← only the text fields
```

- Each language is its own section in the Keystatic sidebar ("Conditions · English", "Conditions · العربية"). Translators edit in the same admin.
- The same filename is the same entry. A translated file holds only translatable text (name, summary, body, FAQs, SEO). Images, video, related pages, featured flags and prices always come from English.
- A translated page publishes only when its file is `published`. No translated file means no page and no hreflang for that language.
- The build warns when the English file was committed after the translation. There are no translation review fields.
- Only `/en` exists until a localisation project. Button and navigation labels stay in the code dictionary (`locales.js`), not in Keystatic.

## Site settings

Centralize, one file per language (`site/{locale}.json`): business name; contact information; physical address; social links; Google Maps/location data; primary CTA labels; consultation form settings; global SEO defaults; Organization/LocalBusiness schema data. Share images have no settings here: the default image and templates live in code ([skill-og-images.md](skill-og-images.md)).

Analytics IDs and service keys are not content. They live in Netlify environment variables ([skill-structure.md](skill-structure.md#environment-variables)).

## Unified lead capture

Shantara should have **one lead-capture system**. In production, submit via **Web3Forms** — no custom forms backend ([skill-stack.md](skill-stack.md)).

The Ask the Doctor question form is not lead capture and sits outside this rule — see [Doctor Answers](#doctor-answers).

### Privacy consent on forms

Every form collects consent before it can be sent. The control is a checkbox that starts unchecked. Its label links to the Privacy Policy (`/en/privacy-policy`). Validation fails when it is empty.

The consultation form and Ask the Doctor use the field key `privacy_consent`. The hosted-visits form uses its existing `privacy` key for this same control. This is separate from consent to publish a question or a testimonial.

Primary visitor-facing CTA:

> **Book a Consultation**

Form chrome may use **Send your details**. Do not list **Enquire about a stay** or **Request a consultation** as equivalent primary CTAs. Visitor-facing language follows [skill-copy.md](skill-copy.md).

Avoid multiple equivalent CTAs such as Enquire Now, Request Callback, Know More, Get Quote, Start Journey unless a genuinely different action exists.

### Consultation form

Start simple.

Recommended fields:

- Name
- Mobile / WhatsApp number
- Email — optional
- Country
- Anything you'd like us to know? — optional

Do not turn first contact into a full medical intake form.

Do not ask questions merely because the CRM has fields for them.

Do not calculate stay totals on this form or on program pages.

### Capture context automatically

The visitor should not repeatedly select information the site already knows.

Automatically attach: **locale**; source page URL; page type; content ID/name; program/condition context where relevant; landing page; referrer; UTM source; UTM medium; UTM campaign; timestamp.

Visitor-facing labels translate. Internal field keys stay `full_name`, `phone`, `email`, `country`, `notes`.

Example: if a visitor submits from `/en/conditions/diabetes`, the lead context should reflect that without asking “Which condition are you interested in?”

### Presentation options

The same underlying form may appear as: dedicated `/en/book-consultation` page; modal; drawer; inline panel.

Do not maintain separate forms or separate field definitions for the consultation.

The hosted-visits request is the other exception, with Ask the Doctor. It is specified in [special-pages/hosted-stays.md](special-pages/hosted-stays.md). It is not a guest lead, and it fires `press_request_submitted`, never `generate_lead`.

### WhatsApp

WhatsApp is a secondary communication channel, not a separate lead architecture.

Track WhatsApp clicks, but keep Book a Consultation as the main structured lead path.

### Backend simplicity

Do not build a custom application backend purely because the marketing site has a form.

Use the simplest reliable submission destination available to the project: form service; serverless function; lightweight API; existing CRM endpoint.

The browser only needs a success/failure response.

### Validation and success

- validate clearly;
- preserve entered data after a validation error;
- show a meaningful success state;
- do not fire `generate_lead` before confirmed success.

Recommended success copy:

> Consultation request received. Our team will contact you to understand your requirements and guide you on the appropriate next step.

A secondary WhatsApp action may be offered after lead capture. The full success state is specified under [Confirmation screens](#confirmation-screens).

### Confirmation screens

A visitor who has just sent a form is at their most interested. The confirmation must not be a dead end. Every form ends on `ConfirmationSection`, rendered in place of the form, and it always answers four things in this order:

1. **It arrived.** The title names what was received.
2. **What happens next.** Two or three plain sentences. Never internal process, never a response time that is not confirmed.
3. **How to reach us sooner.** The channels the matrix below allows, from `content/site.json`.
4. **One way back.** **Back to home**, or back to the page the form was sent from.

Then, under a rule, a **Keep exploring** row of three cards (`explore`): photograph, title, a short category line and one sentence. A card can lead to another page, something to read (a Journal article, Doctor Answer or Clinical Guide), or an outside link such as a Doctor Talk recording. Always three cards; never more, never one alone.

#### Choosing the cards

The form already captures its context (source page, page type, content id). Use that same context to pick the cards, so a visitor who sent the form from the diabetes page reads about diabetes next, not the homepage. Link only to published pages. When a page in a slot is not published, use the general set's card for that slot instead. Each card's photograph is one that does not already appear on the page. Never ask the visitor what they want to read next.

| Form · sent from | Title | Contact | Keep exploring cards (in order) | Way back |
| --- | --- | --- | --- | --- |
| Consultation · `/en/book-consultation`, home, header, any page without its own row | Consultation request received | Call, WhatsApp, email | A day at Shantara · Our doctors · Tariff page | Back to home |
| Consultation · a programme page | Consultation request received | Call, WhatsApp, email | The doctors on that programme (`/en/our-doctors#{slug}`) · A day at Shantara · Tariff page | Back to the programme |
| Consultation · a condition page | Consultation request received | Call, WhatsApp, email | The programme for that condition · A Doctor Answer or Clinical Guide on that condition · Our approach | Back to the condition |
| Consultation · a doctor profile or Our doctors | Consultation request received | Call, WhatsApp, email | That doctor's answers (Journal) · A day at Shantara · Tariff page | Back to the doctor |
| Consultation · a Journal article or Doctor Answer | Consultation request received | Call, WhatsApp, email | The programme or condition the article is about · Our doctors · A day at Shantara | Back to the article |
| Ask the Doctor (popup) | Question received | Email | More Doctor Answers (`/en/journal`) · The doctor's profile or section · Book a Consultation, as the last card only | Close, back to the page |
| Hosted visits (`/en/hosted-stays`) | Request received | Email | Our story · Farm dining · A day at Shantara | Back to home |

What happens next, by form:

- **Consultation.** A member of the team will call you to understand what you need. A doctor then reviews whether a stay is the right next step. A stay is confirmed after a doctor has spoken with you.
- **Ask the Doctor.** A doctor replies by email. If the question is chosen for the Journal, it is published without your name.
- **Hosted visits.** We read each request and reply when we can host the visit. (The page's own words; see [special-pages/hosted-stays.md](special-pages/hosted-stays.md).)

#### WhatsApp on the confirmation

Offer WhatsApp on every consultation confirmation, between the call and the email. Link to `https://wa.me/` with the `whatsapp` number from `content/site.json` and this pre-filled line, translated with the page:

> Hello, I have just sent my details on the Shantara website.

The pre-filled line never repeats anything the visitor typed: no name, no condition, no notes. Do not offer WhatsApp after Ask the Doctor or a hosted-visits request; those replies come by email.

#### Rules for every confirmation

- In a modal, drawer or inline panel, the confirmation replaces the form inside the same container (`headingLevel={2}`, `exploreLayout="list"` so the cards become rows), and closing it returns the visitor to the page they were reading.
- Do not repeat Book a Consultation on a consultation confirmation. Do not add a second form, a newsletter sign-up, a share bar, social follow buttons, testimonials, a countdown, a promotion or an autoplaying video.
- Never echo health information the visitor typed, on screen or in a URL.
- No separate thank-you URL. The confirmation is a state of the page that holds the form. Conversion is the event, fired only after the destination confirms success.
- Hosted visits keep their page rules: no tariff link and no Book a Consultation on the confirmation.
- Analytics: WhatsApp, call and email taps fire `contact_click` with `cta_location` `confirmation`. Do not add an event for card clicks; page views with the referrer already answer that.

## Publishing strategy

Do not measure success by article volume.

Prioritize content that exposes Shantara’s actual expertise and experience.

Map publishing effort to need-led ICPs and intent stages in [`docs/icp.md`](../../docs/icp.md). Do not build a content calendar around programme names. SEO demand must not determine clinical truth.

### Doctor Answers

High-priority recurring format.

Examples:

- Can I continue my existing medication during a naturopathy stay?
- How long should a residential weight-management program be?
- What happens in the first naturopathy consultation?

Recommended structure: question; short answer; detailed answer; doctor; credentials; sources where required; reviewed/updated date; related program/guide.

**Ask the Doctor.** Doctor Answers may also start from guest questions. An "Ask the doctor" button opens a popup with its own small form: name, email, question, and consent to publish the question anonymised. Web3Forms emails the team; the doctor replies by email. An editor publishes approved answers as Doctor Answer entries, never with the guest's identity. This is user-generated content, not a lead journey: it is a separate form from the consultation form, and it fires `question_submitted`, never `generate_lead`.

### Clinical Guides

Longer evergreen resources.

Examples:

- Understanding Insulin Resistance
- Managing PCOS Through Lifestyle Change
- What Happens During a Naturopathy Assessment?
- Therapeutic Fasting: What Patients Should Know

Must prioritize education over promotion.

### Evidence Notes

Short expert interpretation of new research, guidelines, or relevant medical developments.

Prefer expert commentary over generic SEO summarization.

### Guest Stories

Strong first-hand Experience signal.

May include: why guest came; arrival; stay; food; therapies; environment; what surprised them; follow-up experience.

Do not imply guaranteed clinical outcomes.

### Clinical Journeys

Potentially strong E-E-A-T content if handled carefully.

Examples: how a 21-day stay is structured; assessment → plan → stay → review → discharge.

Use consent/anonymization appropriately.

### Food & Recipes

Use real Shantara dishes and practice.

Include: real photography; ingredients; method; when/how served; nutrition notes from qualified team members where appropriate.

Avoid generic recipe SEO filler.

### Events / Doctor Talks

Before event: information; speaker; date; registration.

After event: photos; recording; key takeaways; related guides/answers.

Do not discard event pages immediately after the event if they can become useful authority content.

### Media / Authority

Publish: legitimate press coverage; interviews; conference participation; publications; accreditation milestones.

Do not manufacture news solely to appear active.

## E-E-A-T and medical content governance

Health-related content must meet a higher standard.

Treat E-E-A-T as an architectural/content requirement, not a badge. It applies independently to each translation. An English medical review does not make a poor translation trustworthy. Translations must not strengthen or weaken claims, change certainty, medication, terminology, or contraindications.

### Experience

Show first-hand Shantara reality: real facility photography; real therapy spaces; actual program process; actual food; actual rooms; actual day schedule; real clinicians; real guest stories.

### Expertise

Medical/health content should identify: author where relevant; medical reviewer; qualifications; last medically reviewed date; references.

The doctor's profile should make their background verifiable.

### Authority

Support authority with real-world evidence: legitimate professional credentials; accreditations; medical registrations; professional memberships; publications; talks; media coverage; institutional history.

Do not manufacture authority.

### Trust

Trust is the highest priority.

Clearly expose: about Shantara; contact details; real physical location; clinical team; policies; pricing/inclusions where possible (**via the tariff card**); relationship to associated organizations if relevant; terms/cancellation rules; privacy practices. Do not use internal labels such as “trust pages” or “who operates Shantara” in public copy.

### Medical claims

Avoid unsupported language such as: cures diabetes; guarantees reversal; eliminates hypertension; permanent cure; guaranteed detoxification claims.

Any significant clinical claim must have evidence, appropriate qualification, and clinical review.

The programme name **Diabetes Reversal** is approved for catalogue use. Do not present reversal as guaranteed efficacy or invent clinical rates.

### References

Preferred sources may include, as appropriate: government health bodies; Ministry of AYUSH; WHO; ICMR; recognized clinical guidelines; peer-reviewed research; relevant professional bodies.

Use the source that actually supports the statement.

### Testimonials

Testimonials may describe: experience; stay; food; service; how the guest felt; the journey.

Do not use a guest testimonial as proof of clinical efficacy.

Maintain consent internally.

### Medical Editorial Policy

Maintain a public Medical Editorial Policy explaining: who writes health content; who reviews it; acceptable sources; how claims are checked; review/update cycle; corrections; how AI is used; that AI-generated medical content is not published without qualified human review.

### Content dates

Support: Published; Updated; Medically Reviewed; internal next-review date.

Do not fake freshness by automatically changing dates on every deployment.

## Content writing standards

**All public-facing language follows [skill-copy.md](skill-copy.md).** That file is the writing skill. This section only records CMS and publishing constraints.

### Tone

Use language that is: calm; clear; warm; specific; clinically responsible; human.

Avoid: exaggerated luxury copy; mystical language; medical certainty; corporate jargon; generic AI phrasing; excessive adjectives; information-architecture commentary; invented booking or duration rules.

Clarity first, warmth second, brand expression third. Marketing copy never promises a clinical outcome.

### Prefer concrete details

Weak:

> A transformative holistic wellness experience.

Better:

> Your programme is planned by our doctors based on your assessment, health history and goals.

Use only facts Shantara can verify.

### Separate education from selling

A clinical guide should educate.

A program page should explain Shantara’s offering.

Link them rather than disguising a sales page as neutral medical information.

### Keep page introductions useful

The first screen should quickly establish: what the page is; why it matters; what the visitor can do next.

Do not waste the hero on vague slogans. Do not use the hero to explain how the website is organised.

## Schema-aware CMS

Do not ask editors to manually write JSON-LD.

Generate structured data from fields already required for the visible site.

Medical review fields (`medical_reviewer`, `last_medically_reviewed`) should generate visible attribution and the appropriate schema relationship.

Program pricing fields should power both visible pricing and `Offer` data where appropriate — **one source of truth, and in this repo that source is the tariff card.**
