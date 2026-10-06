Back to the [copy index](../skill-copy.md).

# Naming and NAP

## OpenSEO naming layers (20 Sep 2026)

Use three layers. Do not flatten them into one slogan or one H1 pattern.

### Layer 1 — Entity (lead with this)

What Shantara **is**, in public language:

> Shantara is a doctor-led residential naturopathy clinic you stay at in Kozhikode.

Short forms that remain accurate: **naturopathy retreat**; **doctor-led residential clinic**. Organization display name for NAP / schema / `og:site_name`: **Shantara Naturopathy Retreat** (see [skill-technical.md](../skill-technical.md)).

Public pages lead with this positive clause. Do not open heroes with “not a spa,” “not a hospital,” “not a wellness brand,” or “clinical hotel.”

Hospitality leads the brand half of the voice. Belonging follows. Rejuvenation is not a voice word.

### Layer 2 — Need language

What people come for: validated condition, symptom, and stay language from research — not internal ICP names as H1s. Condition URLs and copy stay need-led (`diabetes`, `PCOS`, and so on). See [`docs/icp.md`](../../../docs/icp.md).

**How a stay works** (care model — explain when the page job is the stay or programme path; not a slogan or hero tagline):

> Assessment → personalised plan → therapies and routines → measurable reassessment.

Public copy may describe that loop in plain language (consultation and assessment, a plan for this guest, treatments and daily routines, then reviewing progress). Do not turn it into a campaign slogan, a seventh audience, or a promise of specific clinical numbers.

### Layer 3 — Comparison / interception (GCC and West)

In UAE, UK, and US discovery, people often type Ayurveda, wellness retreat, or yoga retreat. Intercept that intent with an honest medically reviewed **Ayurveda vs naturopathy** article/guide and Experience / FAQ copy that explains a residential Keralam stay. Do **not** become an Ayurveda resort, wellness resort, or US ND clinic to win the query.

---

## Business name (NAP)

The business (trading) name is **Shantara Naturopathy Retreat**. Use it in full in NAP fields, schema `name` / `og:site_name`, and anywhere a formal business name is expected.

* **Shantara** alone is fine standalone, in running copy, headings, and casual references.
* Never use **“Shantara Naturopathy”** on its own as the name — either say **Shantara**, or say the full **Shantara Naturopathy Retreat**. “Shantara Naturopathy” without “Retreat” is not a valid form of the name.
* Do not invent other short forms (no “Shantara Retreat”, no “Shantara Clinic” as the business name).

**Legal entity.** **Metropolis Forward LLP** is the registered legal entity (`legal_name` in `content/site.json`, schema `legalName`). Use it only for the copyright line (“© {year} Metropolis Forward LLP”) and legal notices such as the privacy policy and terms. Never use it as the trading name.

## Address

Write the full address exactly as:

> Chennamangallur, Kozhikode, Keralam, India - 673602

The fields in `content/site.json` `place` are `street` (Chennamangallur), `locality` (Kozhikode), `region` (Keralam), `postal_code` (673602) and `country` (IN). Never add “Calicut” in brackets after Kozhikode. The short location line, for the footer bar and deck covers, is **Kozhikode · Keralam · India**. “Calicut” appears only inside proper names such as Calicut International Airport.

## Site (hilltop, not acreage)

Never write **“four acres”**, **“4 acres”**, or **“four hilltop acres”**, in any form, anywhere on the website or in marketing copy. **“Hilltop”** alone is fine, for example: *a hilltop above the Chennamangallur valley*. Do not restate a specific acreage figure unless Shantara has explicitly confirmed a new one for publication.

## Rooms

Shantara has 52 rooms across five accommodation categories. **“52 rooms” may be stated at most once on the whole website**, and never prominently — no stat tile, no numeral treatment, no heading, no hero. If it appears, it belongs in ordinary body copy on the accommodation page.

## One contact number

The site stores the call number and the WhatsApp number as separate fields: `phone` (an array whose first item is the public number) and `whatsapp`. Both are currently **+91 9553 600 100** (E.164 `+919553600100`). Do not publish any other number (including old or regional variants) on the website, in schema, or in the footer. The public email is **heal@shantara.life**.

## Organisation and ownership

Avoid awkward headings such as:

> Who operates Shantara

unless the purpose of the page is specifically corporate or regulatory.

For most visitors, use:

> About Shantara

> Our story

> Our team

> Meet our doctors

> Leadership

If legal ownership needs to be disclosed, state it plainly within the relevant legal or company information.

---

## Former names and internal migration notes

Do not publish content migration instructions.

Never write public copy such as:

> Welnez is the former name. Do not use it in new public copy.

That is an internal editorial rule.

Internally:

* Use Shantara in all new public-facing copy.
* Replace legacy Welnez references where appropriate.
* Preserve the old name only where there is a legitimate historical, legal, SEO migration or citation reason.

Public visitors should not see editorial instructions.
