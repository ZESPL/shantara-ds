# Hosted visits

Back to [Special pages](../special-pages.md).

Writers, editors and creators request a hosted visit here. The page is quiet first, then selective, then the form.

## Publishing

- URL: `/en/hosted-stays`. Later locales reuse the slug (`/ar/hosted-stays` when Arabic is published).
- Page type: `contact`. Schema: `WebPage` only.
- Indexable. Include it in the sitemap for each published locale. `robots` is `index, follow`.
- Do not link it from the navigation, the footer, or any guest page. There is no kit sample and no mockup.
- Do not put a tariff on this page, and do not link to the tariff card. Do not add Book a Consultation in the page body.
- This is not a guest lead. Submit through Web3Forms to the sales and partnerships inbox. Fire `press_request_submitted` only after a confirmed send, with `form_id` `press`, `page_type` `contact`, `source_page`, `visit_type` (`hosted` or `press`), and the form's keyed fields. Never fire `generate_lead`. OpenPanel receives those keys and identifies a profile. Do not send name, email, phone, or the written answers to GA4.
- English is the source. Every visitor-facing string goes through `t()`. Do not translate the page in this kit.
- Hero: `HeroStatement`, the same editorial family as Contact. No eyebrow. The title is the only heading in the opening.

## Opening

**Hosted visits**

We welcome a small number of writers, editors and creators to experience Shantara and understand the way we approach naturopathy, food and everyday living.

If you are considering a story, editorial feature or other work about Shantara, tell us about yourself, your audience and what you would like to create.

A hosted stay is 7 nights in a Premium Room, with one companion. A press visit is a shorter stay, up to 3 nights in a Premium Room, with one companion.

Please submit your request at least 30 days before you hope to arrive. We read each request and reply when we can host the visit.

## Terms

If you cancel, you may ask for another date later. If you leave before the nights you agreed, other than because a doctor advises it, that visit ends. You are welcome to ask again later.

We read a draft before anything is published. Other guests are not filmed. The visit follows the same resident policies as any guest.

## Before the form

Please complete the form in full. Where a question does not apply, write N/A.

## Form

One form. The two visit lengths are choices in it, not two pages.

**Which visit are you requesting?**

- Hosted stay — 7 nights in a Premium Room, with one companion.
- Press visit — Up to 3 nights in a Premium Room, with one companion.

**About you**

- Name
- Email
- Mobile / WhatsApp number
- Country of residence
- Role — journalist, editor, creator, photographer, or other
- Outlet or channel
- Link to your main profile or publication
- Where your audience is, and its approximate size
- Links to two or three relevant pieces
- Link to a media kit — optional

**The visit**

- Arrival date — at least 30 days ahead; an earlier date cannot be sent
- Companion’s name — write N/A if travelling alone
- Anyone else travelling — optional
- Why Shantara
- What you would like to create, where it will appear, and when
- May Shantara reuse your photographs of the property? — yes or no

**Before you send**

- I will send the draft before anything is published.
- A doctor assesses the stay first. I will not film other guests. Resident policies apply.
- Shantara may store this request and use it to reply.

The button is **Send your request**.

Stable field keys, not translated: `visit_type`, `full_name`, `email`, `phone`, `country`, `role`, `outlet`, `profile_url`, `audience`, `work_links`, `media_kit`, `arrival_date`, `companion_name`, `other_guests`, `why_shantara`, `deliverables`, `image_reuse`, `draft_review`, `policies`, `privacy`.

## Beside the form

Our sales and partnerships team will write to you. If we can host the visit, an admission advisor will help with the pre-consultation and the arrangements that follow. A doctor speaks with you before the visit is confirmed.

## After it is sent

**Request received**

Our sales and partnerships team will write to you if we can host this visit. A request is not an acceptance.
