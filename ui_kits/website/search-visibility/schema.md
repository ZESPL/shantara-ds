# 11. Structured data (SCHEMA)

Part of the [search and AI visibility rules](overview.md). Priorities, owner tags and recorded decisions are in the overview.

- **SCHEMA-01 (P0) [Build]** All JSON-LD is in the prerendered HTML, never added by client-side JavaScript. **Check:** JSON-LD is present in `curl` output.
- **SCHEMA-02 (P0) [Build]** Every page outputs one connected `@graph` (DATA-02). Nodes refer to each other by absolute `@id` values. Never use a bare fragment such as `#organization`. Entity `@id` values do not contain a locale, so the same doctor or programme keeps one identity in every language. **Check:** Schema Markup Validator shows one graph and no duplicate Shantara entities.

```
https://shantara.life/#organization
https://shantara.life/#website
https://shantara.life/#doctor-{internal-id}
https://shantara.life/#person-{slug}   (the founder and the leadership)
https://shantara.life/#program-{internal-id}
https://shantara.life/#condition-{internal-id}
{page URL}#webpage   and   {page URL}#breadcrumb
```

- **SCHEMA-03 (P1) [Build]** Shantara is one organisation typed `["MedicalClinic", "Resort"]`, in that order, and named "Shantara Naturopathy Retreat". `Resort` is the lodging companion. Never use `Hospital`, spa types or `HealthAndBeautyBusiness`. The full node is on every page, in the same `@graph` as the page's own nodes, together with the parent hospital and the founder's, doctors' and leaders' `Person` nodes it links to. It carries name, legalName ("Metropolis Forward LLP", omitted when empty), url, logo, image, description, telephone, email, address, geo, sameAs and contactPoint from DATA-04. The address is a `PostalAddress` with streetAddress "Chennamangallur", addressLocality "Kozhikode", addressRegion "Keralam", postalCode "673602" and addressCountry "IN". From the site record it may also carry `numberOfRooms`, `checkinTime`, `checkoutTime`, `amenityFeature`, `priceRange` and `currenciesAccepted`. `priceRange` is an indicative range, not a rate (RATE-01). Every other node refers to the organisation by `@id`. **Check:** Rich Results Test on `/en` and on one policy page. Each shows the organisation node exactly once.
- **SCHEMA-04 (P1) [Build]** A `WebSite` node on every page has `@id`, `url`, `name`, `inLanguage` and `publisher` pointing to the organisation. No `SearchAction`: Google retired the sitelinks search box in November 2024, so the site search is not declared. **Check:** no `potentialAction` in the WebSite node.
- **SCHEMA-05 (P1) [Build]** Every indexable page has a page node of the most specific type in the [schema map](#schema-map-by-page-type), with `url`, `inLanguage`, `isPartOf` pointing to the website and `breadcrumb` pointing to its BreadcrumbList. Only `AboutPage` and `ContactPage` nodes carry `about` pointing to the organisation. Condition pages point `about` to their `MedicalCondition` (SCHEMA-08). Other page nodes have no `about`. **Check:** an automated test on each page type.
- **SCHEMA-06 (P0) [Build]** Structured data describes only what is visible and public. Never put form data, health information or a guest's identity in JSON-LD unless the guest consented and the details are visible on the page. **Check:** code review of the generator. The consultation page emits only `WebPage` and `BreadcrumbList`, besides the shared organisation graph.
- **SCHEMA-07 (P1) [Build]** A `BreadcrumbList` appears on every page that shows breadcrumbs and matches the visible trail. **Check:** Rich Results Test.
- **SCHEMA-08 (P1) [Build]** Medical pages use `MedicalWebPage` with `about` pointing to a `MedicalCondition` (name and only what is visible), `reviewedBy` pointing to the doctor's `@id`, and `lastReviewed` equal to the visible date. **Check:** Schema Markup Validator on one condition page.
- **SCHEMA-09 (P1) [Build]** Doctors are `Person` nodes with name, jobTitle, image, `worksFor` pointing to the organisation, and qualifications and `sameAs` links only when they are public and visible. A profile page is `ProfilePage` with `mainEntity` pointing to that Person. Two people have one: Dr. Bahja Janu at `/en/doctors/bahja-janu`, the only doctor profile, and the founder and chairman, P.A. Kareem, at `/en/pa-kareem`. P.A. Kareem is not a doctor. His `Person` node is `https://shantara.life/#person-pa-kareem`, with jobTitle "Founder and Chairman" and his qualifications; the organisation's `founder` points to it, and he is in neither `employee` nor the Our Doctors `ItemList`, and never a `reviewedBy` or author-doctor. Every `Person` node is part of the organisation graph on every page (SCHEMA-03), so other nodes refer to it by `@id`. Do not use `Physician` for an individual: Schema.org defines `Physician` as a medical business type, not a person. **Check:** the generator outputs `ProfilePage` only on `/en/doctors/bahja-janu` and `/en/pa-kareem`.
- **SCHEMA-10 (P1) [Build]** Programme pages use one node typed `["Service", "MedicalTherapy"]` with name, description, `provider` pointing to the organisation, and `relevantSpecialty` when the programme has one. Shantara practises clinical naturopathy, and `relevantSpecialty` is valid only on `MedicalTherapy`. No `offers` on programme pages (RATE-04). **Check:** Schema Markup Validator on one programme page.
- **SCHEMA-11 (P1) [Build]** Listing pages (`/en/conditions`, `/en/programs`, `/en/journal`) use `CollectionPage` with an `ItemList` of the URLs shown. Condition and programme nodes live only on their own pages. **Check:** Schema Markup Validator shows no `Service` or `MedicalCondition` nodes on listing pages.
- **SCHEMA-12 (P1) [Build]** Articles use `Article` or `BlogPosting` with headline, image, datePublished, dateModified, `author` pointing to a doctor's or writer's Person `@id`, and `publisher` pointing to the organisation. Medical articles also follow SCHEMA-08. **Check:** Rich Results Test.
- **SCHEMA-13 (P2) [Build]** `FAQPage` markup is optional and used only when the questions and answers are visible on the page. Google removed FAQ rich results in May 2026, so the markup brings no Google benefit. Never use `HowTo`. **Check:** none needed.
- **SCHEMA-14 (P1) [Build]** No empty values: omit an optional property instead of sending an empty string or "N/A". URLs are absolute, dates are ISO 8601, and the phone number is `+919553600100`. **Check:** an automated JSON-LD lint in CI.
- **SCHEMA-15 (P1) [Build]** Only add schema that states something true and useful, or that a known consumer (Google, Bing, AI tools) reads. Do not chase schema coverage. **Check:** every type in the generator is listed in the map below.
- **SCHEMA-16 (P1) [Build]** A page that shows a public video includes one `VideoObject` in the same `@graph`, with `name`, `description`, `thumbnailUrl`, `uploadDate`, `duration`, `contentUrl`, and `transcript`, `creator` and `Clip` chapters when those exist. URLs are the Cloudflare R2/CDN addresses. The single schema generator emits the node. Hosting and the field list: [skill-video.md](../skill-video.md). **Check:** the page source contains the `VideoObject` without running JavaScript.

## Schema map by page type

Every indexable page also gets the `WebSite` node and the full organisation graph (SCHEMA-03).

| Page type | Nodes |
| --- | --- |
| Home (each published locale) | `WebPage` |
| Condition | `MedicalWebPage` + `MedicalCondition` + `BreadcrumbList`, with `reviewedBy` and `lastReviewed` |
| Programme | `WebPage` + `["Service", "MedicalTherapy"]` + `BreadcrumbList` |
| Tariff | `WebPage` + `BreadcrumbList`, and `Offer` nodes only for visible, confirmed rates |
| Experience pages | `WebPage` + `BreadcrumbList` |
| Profile page (Dr. Bahja Janu, and the founder and chairman, P.A. Kareem, at `/en/pa-kareem`, who is not a doctor) | `ProfilePage` + `BreadcrumbList`, with `mainEntity` pointing to the `Person` node |
| Our Doctors (`/en/our-doctors`) | `AboutPage` + `ItemList` + `BreadcrumbList`. The `ItemList` refers to each practising doctor's `Person` node by `@id`. The founder is not listed |
| Article, Clinical Guide, Doctor Answer | `Article` or `BlogPosting` + `BreadcrumbList`, and `MedicalWebPage` fields when medical |
| Conditions, Programmes and Journal listings | `CollectionPage` + `ItemList` + `BreadcrumbList` |
| About | `AboutPage` with `about` pointing to the organisation |
| Contact | `ContactPage` with `about` pointing to the organisation |
| Book a Consultation | `WebPage` + `BreadcrumbList` |
| Policies, terms, privacy | `WebPage` + `BreadcrumbList` |
| Form confirmation, 404, 410 | No structured data |
| Any indexable page that shows a public video | The row above, plus one `VideoObject` (SCHEMA-16) |
