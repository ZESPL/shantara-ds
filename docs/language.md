# Shantara language

Mandatory for every visitor-facing word: pages, headings, buttons, forms, errors, alt text, share images, emails and policies. No exceptions. This file replaces the earlier voice and tone rules and the words-to-avoid list.

## Position

Shantara is a doctor-led naturopathy retreat on a hilltop above the Chennamangallur valley in Keralam. The language carries that standing: composed, certain, quietly premium. It describes a place of serious care and rare calm, never a spa and never a hospital.

## Five rules

1. **No first or second person.** No I, me, my, we, us, our, you, your. The subject is Shantara, the guest, the doctor, the body, the stay, the place.
2. **Premium positioning.** Elevated, sensory, precise. Rich nouns, active verbs. Restraint signals confidence; superlatives signal doubt.
3. **Positive framing.** State what is present, provided and possible. A limit is written as what applies, not as what is absent.
4. **Assertive when it matters.** Clinical method, inclusions, requirements and policies are stated as fact. No "may", "might", "can help" or "aims to" where the fact is known.
5. **No AI slop.** No filler openers, no signposting, no narration of the page itself.

Samples show sentence shape only. Every fact, number, duration and time comes from `content/` and the handbook.

## Pronoun-free patterns

| Instead of | Write |
| --- | --- |
| Your doctor will assess you. | Every stay begins with a doctor's assessment. |
| We provide all meals. | All meals are included. |
| You will leave feeling renewed. | Guests leave lighter, clearer and renewed. |
| Enter your email | Email address |
| We could not send your message. | Message not sent. Please try again. |
| You should pack comfortable clothing. | Pack comfortable clothing. |
| We retain your records. | Shantara retains guest records for the period set by law. |

An imperative with no pronoun is allowed: "Pack comfortable clothing", "Arrive before noon", "Make an Inquiry".

## Positive framing

| Instead of | Write |
| --- | --- |
| There is no lift. | Ground-floor rooms suit guests with limited mobility. |
| Not every programme suits pregnancy. | Programmes during pregnancy are planned after a doctor's review. |
| No visitors after 8 pm. | Visiting hours close at 8 pm. |
| Stays shorter than 7 nights are not accepted. | Stays begin at 7 nights. |

Policy and safety text keeps its meaning exactly. Positive framing changes the shape of a sentence, never the commitment.

## Assertive register

- Method, inclusions and requirements: present tense, no hedge. "Each programme is planned by a BNYS doctor."
- Effects of a programme: confident, sensory, specific to the body. "Digestion strengthens, energy steadies, sleep deepens."
- Claims: effects and renewal are described freely. Never "cure", "guarantee", "permanent reversal" or "100%".

## Banned: AI slop

Never open, link or close with:

- "This page details / explains / covers…", "Here you will find…", "Below is…", "See…", "Learn more", "Read on", "Discover how…", "Find out…"
- "In today's fast-paced world", "Whether you are… or…", "It's important to note", "Simply put", "When it comes to"
- "Not just X, but Y", "More than a…, it is…", "X isn't about Y. It's about Z."
- Triplets added for rhythm with no new fact
- "delve", "tapestry", "testament", "realm", "embark", "unlock", "elevate", "seamless", "game-changer", figurative "navigate", "in conclusion"
- Em-dash chains, rhetorical questions as headings, exclamation marks

A link label names its destination: "Rates and inclusions", never "See rates" or "Click here".

## Vocabulary

Encouraged: stay, retreat, programme, guest, doctor-led, restoration, renewal, rhythm, stillness, vitality, clarity, hilltop, valley, the intelligence of the body, foundational, personalised, root-cause, journey, sanctuary.

Fixed product nouns: **guest** (never patient, client or customer), **programme**, and **Shantara Naturopathy Retreat** in NAP. Naming, NAP, doctor credentials and nursing terms follow [naming and NAP](../ui_kits/website/copy/naming-and-nap.md) and `docs/handbook/glossary.md`.

## Register by surface

| Surface | Register | Sample |
| --- | --- | --- |
| Hero / H1 | Evocative, short | Stillness, prescribed. |
| Lead | One sensory sentence, one clinical fact | Above the Chennamangallur valley, every stay is planned around the body's own rhythm and a doctor's assessment. |
| Programme intro | Mechanism, then renewal | When metabolism slows, energy falls and inflammation settles in. The Metabolic Reversal programme restores that rhythm through fasting, therapeutic meals and daily treatment, until energy returns and clarity follows. |
| Category tile | Name and one line of purpose with audience | **Pain Rehabilitation.** Root-cause care for chronic pain, for those ready to move freely again. |
| Inclusions | Assertive, footnotes for conditions | Foundational inclusions. Every stay includes the elements that prepare for arrival, guide each day on the hilltop and support life after departure. |
| Footnotes | Plain, exact | \*Based on symptoms and clinical assessment. \*\*Initial consultation forms part of the assessment; further consultations form part of daily sessions. |
| Call to action | Verb and object, no pronoun | Make an Inquiry · Plan a stay · Speak to a doctor |
| Forms and errors | Noun labels, positive recovery | Full name · Message received. A doctor replies shortly. |
| Policy | Formal, third person, exact | Shantara retains guest records for the period set by law. Cancellation terms follow the published cancellation policy. |
| Closing | Quiet, certain | The hilltop holds a rhythm older than the day. Guests leave lighter, clearer and renewed. |

## Reference lines

- Under the guidance of Shantara's doctors, the body returns to its natural rhythm. Digestion strengthens, energy steadies and inflammation subsides. As the stay deepens, the mind quiets and vitality returns.
- Every programme is personal: built on a full assessment, the guest's history and the goals that brought them to the hilltop.
- Healing at Shantara follows four stages, each one shaped by the doctor as the body responds.
- Rooted in Keralam. Over three decades of nature cure practice, carried into a retreat above the valley.

## Before publishing

Every line passes: no pronoun, no negative opener, no hedge on a known fact, no slop phrase, one idea per sentence. On shantara.life, `npm run check:copy` enforces the mechanical parts and fails CI on a new violation.
