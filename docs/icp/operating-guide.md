Back to the [ICP index](../icp.md).

## 15. Marketing funnel

ICP-aware, not channel-aware. Vanity reach is not a stage.

| Stage | Job | Notes |
| --- | --- | --- |
| 1. Authority and discovery | Earn **qualified** attention from people with a real need | Measure qualified visits by ICP and geo, not impressions alone |
| 2. Problem-led consideration | Help them understand the problem and whether a residential stay is a serious option | Condition pages, doctor answers, guides. Not programme spam |
| 3. Trust and qualification | Consultation or enquiry more than instant booking | Doctors, method, eligibility, tariff link, editorial policy |
| 4. Consultation and decision | Human conversation + clinical review | Track **lead quality**, not only lead volume |
| 5. Assisted conversion | Remarketing, email, WhatsApp as secondary | No artificial urgency, no fake scarcity, no countdown fear |
| 6. Post-stay relationship | Follow-up, possible return, possible longer residency from a short reset | CRM, not ad-platform health data |

Primary site funnel remains: Page view → Consultation CTA click → Form start → Generate lead. See [skill-technical.md](../../ui_kits/website/skill-technical.md). ICP fields are CRM and reporting attributes, not a reason to invent extra pixel events at launch.

---
## 16. What a marketing agency must do

This document is a **starting point**. It is not permission to copy its assumptions into campaigns, ads, or landing pages without validation.

Required work, per engagement:

1. **Market validation per ICP × country.** Demand, willingness to travel to Kozhikode, competitive alternatives, cultural fit. No blended “international” slide.
2. **Keyword research** covering problem, symptom, condition, solution, comparison, brand, consultation, questions, and negatives. Where the tool allows, capture volume, trend, CPC, competition, difficulty, SERP composition, country, and language. **Do not merge countries.** Do not paste this document’s seed terms into a media plan as if they were validated.
3. **Search-intent mapping** onto the stages in each profile’s section J.
4. **Landing-page architecture** that does not create thin pages, doorway pages, duplicates, cannibalisation, or geo spam. Condition pages still require original content and medical review ([skill-ia.md](../../ui_kits/website/skill-ia.md)).
5. **Content strategy** mapped to ICP + intent, using the publishing families already specified (doctor answers, clinical guides, evidence notes, guest stories). See [skill-content.md](../../ui_kits/website/skill-content.md).
6. **Paid acquisition briefs** that specify ICP + need + geo + audience + intent + message + creative + landing page + CTA + exclusions + metric. “General wellness audience” is insufficient. Apply the [operational paid exclusions](overlays.md#operational-paid-exclusions) unless a comparison ad is explicitly briefed.
7. **Reporting** toward qualified visits, enquiries, consultations, bookings, revenue, and CPA by ICP / geo / channel. If a measurement does not exist yet, mark it as a **future requirement**. Do not substitute bounce rate or follower count.
8. **Comparison and stay explainers** for GCC / West discovery: resource one medically reviewed Ayurveda-vs-naturopathy article/guide, and Experience + FAQ copy that clarifies a residential Keralam stay is not a US ND clinic — inside existing URL families only ([skill-ia.md](../../ui_kits/website/skill-ia.md)).

Agencies must also follow public language rules, claim governance, and the no-scattered-pricing rule. Internal ICP names stay out of H1s unless research shows customers actually use that phrase.

---
## 17. Prioritisation

Only three labels: {Core} · {Secondary} · {Experimental}.

Criteria to apply when evidence exists (do not invent scores):

| Criterion | Meaning |
| --- | --- |
| Demand | Real need in a reachable population |
| Search | Demonstrable search or discovery behaviour |
| Commercial intent | Willingness to consider a paid residential stay |
| Travel willingness | Will they come to Kozhikode |
| Stay duration | Fit with clinical work that actually takes time |
| Capability | Can Shantara serve this need safely |
| Evidence strength | What can be said honestly |
| Economics | Value of a stay vs cost to acquire (rates live on the tariff card) |
| Competitive intensity | SERP and market crowding |
| Historical conversion | Shantara’s own enquiry and stay data |

**Initial classification (provisional, not scored):**

| Audience | Class | Why this is only provisional |
| --- | --- | --- |
| ICP 01–06 | {Core} {Provisional} | Defined as the strategic audience set. Do not reorder cores. India money-slug publish order (obesity → pcos → diabetes) is page sequencing only. |
| Short Health Reset | {Secondary} | Useful acquisition path; must not become the brand. |
| Handbook categories without an ICP (renal, dermatological, hematologic, fertility-as-primary) | Not classified as ICPs | Capability. Promote only with a separate decision. |
| Corporate Retreats | Channel | May contain ICP 03. Not an ICP. |

Do not reorder this table into a fake ranking to satisfy a quarterly plan.

---
## 18. Geography, language, and intent

The investigation unit is **ICP × Geography × Language × Intent**.

- English is the source website and the source of this document. Do not translate this ICP document into the languages below.
- Do not machine-translate health keywords and treat them as native demand. Native keyword research is required per language. Do not assume English search translates.
- Planned website languages follow the approved list below. Enabling a locale is a publishing project. It does not by itself make that country an acquisition priority.
- Locale is not currency. Arabic does not imply AED. English does not imply INR.
- Geography market funding (India / GCC / UK / DACH / France) remains unranked unless separately decided. Language order is not country-spend priority.
- When a localisation is commissioned, run native keyword research and localised clinical review. An English medical review does not validate translated health copy.
- Do not write public website copy in Hindi or Malayalam in this kit.

### Language priority {Approved} (management)

Marketing / localisation sequence. English remains the source implementation.

| Order | Language | Code | Why it belongs |
| --- | --- | --- | --- |
| 1 | English | `en` | Primary/source language; India + international |
| 2 | Arabic | `ar` | GCC and Middle East |
| 3 | German | `de` | Planned European localisation. Category noun **Naturheilkunde** measured **3,600**/mo (Germany 2276, `languageCode` de, 20 Sep 2026). “Strong fit for European wellness/naturopathy” as a Shantara acquisition claim remains {Hypothesis} — category volume ≠ proven Keralam-stay demand. Also measured: `wellness retreat` 590; `burnout retreat` 50 (DE). |
| 4 | French | `fr` | France, francophone Europe, Réunion/Mauritius and parts of Africa |
| 5 | Russian | `ru` | Relevant international wellness/medical-travel audience |
| 6 | Hindi | `hi` | Large domestic Indian market |
| 7 | Malayalam | `ml` | Keralam/local market, **if** Shantara wants meaningful local acquisition |

Malayalam is **conditional**. Do not treat `ml` as a committed localisation project until Shantara confirms it wants meaningful local acquisition.

Italian (`it`) and Spanish (`es`) are **not** current marketing-localisation priorities. Architecture in `locales.js` follows this list, not `it` / `es`.

**Arabic glossary warning (when `ar` is commissioned):** In Arabic, “naturopathy” often collapses into physiotherapy via *al-ilaj al-tabi'i* (العلاج الطبيعي). Require a CMS glossary and native clinical review for key terms. Do **not** rename the English ICP list to fix this, and do **not** ship a second Arabic front-end. Localisation brief + ICP brief must call this out explicitly.

See [Website skill §15](website-skill.html#section-15) and `locales.js`.

---
## 19. CRM and analytics taxonomy

Stable IDs. Do not rename them in dashboards.

| ID | Audience |
| --- | --- |
| `weight_metabolic` | ICP 01 |
| `pain_mobility` | ICP 02 |
| `stress_sleep_burnout` | ICP 03 |
| `digestive_inflammatory` | ICP 04 |
| `hormonal_vitality` | ICP 05 |
| `healthy_ageing_longevity` | ICP 06 |
| `short_reset` | Short Health Reset (secondary) |

Related fields (marketing attributes, not a medical record):

| Field | Use |
| --- | --- |
| `primary_icp` | One of the IDs above |
| `secondary_icp` | Optional second ID |
| `primary_need_state` | Short internal slug or phrase for the need (e.g. `prediabetes`, `chronic_back_pain`). Prefer values inferred from the landing page, not from a medical form. |
| `country` | ISO country of the enquirer, not assumed from language |
| `language` | Locale / language of the visit or conversation |
| `travel_unit` | `solo` · `couple` · `guest_companion` · `family_supported` |
| `stay_commitment` | `3_7` · `8_14` · `15_21` · `22_28_plus` |
| `acquisition_channel` | Paid / organic / referral / direct / PR / etc. |
| `campaign` | Campaign identifier |
| `landing_page` | URL or content id |
| `lead_stage` | Enquiry → consultation → assessment → booked → stayed → follow-up |

**Privacy**

- Do not collect unnecessary medical information for marketing analytics.
- Keep health data in the clinical / CRM operational system, separate from ordinary marketing attributes.
- Do not automatically push diagnoses, symptoms, medication, or free-text health notes into GA4, OpenPanel, Meta, Google Ads, or similar. Website skill already forbids sending that data to analytics. This taxonomy does not create an exception.
- Field keys on the public form stay `full_name`, `phone`, `email`, `country`, `notes`. Do not add ICP radio buttons to first contact unless there is a demonstrated need.

Assign `primary_icp` in CRM from context (landing page, conversation) after the lead exists. Do not ask the visitor to self-diagnose into an ICP.

**Filing rule (plain language):** `primary_icp` is a **marketing ops tag** (`weight_metabolic`, `pain_mobility`, and so on) inferred from the landing page or the conversation after the person writes in. Website / marketing ops set it. Doctors do not use it as a diagnosis. Diagnoses stay in the clinical record and never go to GA4, ads, or OpenPanel. There is no CRM product in this repo — this is a filing rule only.

---
## 20. Validation status

Mark significant statements with one of:

| Status | Meaning |
| --- | --- |
| {Hypothesis} | Internal reasoning. Not established. |
| {Agency validated} | An agency has evidenced it for a specified country and date. |
| {Customer-data validated} | Shantara enquiry, stay, or survey data supports it. |
| {Clinically validated} | Clinical leadership has accepted it as medically accurate. |
| {Approved} | Cleared for use in the named channel (often after legal / clinical review). |

Most of this document is {Hypothesis}. That is visible on purpose. Do not “complete” a cell with a guess.

Working-area research status is separate: {Not researched} · {In progress} · {Validated} · {Not applicable}.

---
## 21. Anti-patterns

Do not:

- Create one ICP per programme, or one ICP per condition
- Use HNI as a substitute for an ICP (HNI is an affordability overlay only)
- Treat age + income + geography as an ICP
- Create an “all international” or “all Indian” ICP
- Use internal labels as SEO keywords, ad headlines, or website H1s without search evidence
- Make unsupported cure, reversal, or “without medicine” claims
- Promise outcomes, kilograms, or biomarker targets
- Invent statistics, volumes, or behaviour
- Let current programmes dictate content architecture or URL inventory
- Optimise for generic wellness tourists
- Reduce Shantara to spa, weekend, beauty, or massage
- Hunt tulåh-style sanctuary / WELL / longevity-medicine audiences with matching public language
- Add a Wellness, Ayurveda hub, geo doorway, or ICP hub to the public sitemap
- Use aggressive scarcity, fear, or fake urgency
- Prefer complex clinical language when customers use simpler words
- Store sensitive medical data in ad analytics
- Duplicate this strategy across decks and docs instead of linking here
- Argue with visitors in public copy (“this is not a spa”)
- Scatter prices off the tariff card
- Build thin condition-category hubs named after ICPs (`/en/conditions/weight-metabolic-health`)
- Reorder ICP 01–06 or invent wellness / HNI / international ICPs from venue-word research alone

---
## 22. Programme catalogue relationship

Current handbook and kit programmes are **examples of capability**, not the audience model.

Capability currently illustrated in source material includes: metabolic health, pain rehabilitation, inflammation, women’s health, weight management, gut health, Men’s Vitality (named wellness programme under ICP 05), autoimmune-related support where appropriate, respiratory health, healthy ageing, Longevity (named wellness programme under ICP 06), cardiac recovery for medically stable guests, executive stress, shorter reset / rejuvenation.

**The ICP system must not be limited by the current catalogue.** If Shantara adds a programme, map it to ICPs in section M and in [Need states and programme areas](messaging-map.md#section-5). If it withdraws one, the ICP remains.

Content records in the CMS do **not** carry ICP IDs. Map a lead to an ICP in CRM from the page it came from (for example, a condition page). Do not rename ICPs to match slugs.

The programme name **Diabetes Reversal** is approved for public catalogue use. Do not write that it guarantees reversal, cures diabetes, or invents clinical rates. The name is not a numeric promise.

---
## 23. Content and E-E-A-T

SEO demand must not determine clinical truth.

Connect this ICP system to existing content rules rather than replacing them:

- Public language: [skill-copy.md](../../ui_kits/website/skill-copy.md) (browsed as [Voice & copywriting](website-copy.html))
- Publishing families and medical governance: [skill-content.md](../../ui_kits/website/skill-content.md)
- Page inventory: [skill-ia.md](../../ui_kits/website/skill-ia.md)
- Analytics, SEO, schema: [skill-technical.md](../../ui_kits/website/skill-technical.md)

Each ICP’s section K should be resourced with a mix, as evidence allows: expert-authored pages; medically reviewed condition content; clinician credentials; methodology; original research or outcomes **where they exist**; external evidence; programme information; eligibility and safety; facility; authentic guest experience; visible authorship and review dates.

Do not manufacture authority. Do not fake freshness. Testimonials describe the stay, not efficacy. English medical review does not validate a translation.

Condition pages still require original content, a legitimate clinical perspective, a relevant approach, medical review, and useful answers. An ICP with search demand is not a sufficient reason to publish a thin page.

---
## 25. Related documents

Canonical ICP definitions live **only** here (`docs/icp.md`, browsed as `docs/icp.html`).

| Document | Relationship |
| --- | --- |
| [Property handbook](handbook.html) | Clinical eligibility, programme catalogue, house rules. Admission lists are not ICPs. |
| [Website skill](website-skill.html) | How to build the public site. Page-job “audience” should cite an ICP ID. |
| [Information architecture](website-ia.html) | Conditions and programmes as visitor IA, not as ICP architecture. |
| [Content and leads](website-content.html) | CMS entities, E-E-A-T, one form. No ICP IDs on entities. |
| [Voice & copywriting](website-copy.html) | Public voice, register, taglines, headings, and CTAs. Internal ICP language stays out. |
| [Technical](website-technical.html) | Analytics privacy; SEO. Taxonomy above does not add health pixels. |
| [QA](website-qa.html) | Page job includes audience; map it to an ICP when relevant. |
| `locales.js` | Planned languages (`en ar de fr ru hi ml`). Not a geo-priority list. |

---
