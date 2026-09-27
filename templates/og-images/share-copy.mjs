/* Share headlines and supporting lines for Shantara link previews.
   The specification is ui_kits/website/skill-og-images.md. If this file and that
   document disagree, the document wins and this file is corrected.

   Search titles stay on `title` / `meta_title`. `og.title` is the picture headline.
   `og.description` is the supporting line (and the platform text), except Doctor
   Answers, where `og.line: false` keeps the line off the image. No new content fields. */

export const LARGE_TYPE = 32;

export const SUB_MAX = { default: 110, programme: 140, editorial: 100 };
export const TITLE_MAX = { default: 90, programme: 60, editorial: 72 };

/** Hard bans for text drawn on the image. Rates never appear. Outcome words neither. */
const CLAIM_PATTERNS = [
  [/\bcures?\b/i, "cure"],
  [/\bguarantees?\b/i, "guarantee"],
  [/\bguaranteed\b/i, "guaranteed"],
  [/\brevers(?:e|al|es|ed|ing)\b/i, "reversal"],
  [/\bheal(?:s|ed|ing)?\b/i, "heal"],
  [/\bmedication[-\s]?free\b/i, "medication-free"],
  [/\beliminates?\b/i, "eliminate"],
  [/\beliminated\b/i, "eliminated"],
  [/\bpatients?\b/i, "patients"],
  [/\bwellness retreat\b/i, "wellness retreat"],
  [/\bnature cure\b/i, "nature cure"],
];

const RATE_PATTERNS = [
  [/[₹$£€]/, "currency symbol"],
  [/\b(?:INR|USD|AED|EUR|GBP)\b/, "currency code"],
  [/\bper night\b/i, "per night"],
  [/\bfrom\s+\d/i, "from + amount"],
];

const CONDITION_HEADLINES = {
  "back-pain": "Back and neck pain",
};

const RESIDENTIAL = "A doctor-supervised residential stay.";
const CONDITION_LINE = "A residential stay in Kerala, after consultation.";
const ANSWER_LINE = "A Shantara doctor answers this on the page.";

/** Picture headlines that must not be the catalogue name or the search title. */
const PROGRAMME_HEADLINES = {
  "diabetes-reversal": "A diabetes stay",
  "complete-healing": "Several conditions",
  "weekend-rejuvenation": "A short stay",
  "executive-wellness": "A stay with work",
  longevity: "A preventive stay",
  detox: "Detox with a doctor",
};

const ARTICLE_HEADLINES = {
  "understanding-insulin-resistance": "Insulin resistance",
  "how-programme-duration-is-decided": "How a stay's length is set",
  "naturopathy-assessment": "How assessment works",
  "how-meals-are-planned": "Meals on the programme",
  "twenty-six-years": "Twenty-six years",
  "managing-pcos-lifestyle": "PCOS and daily habits",
};

/** Picture headlines. The full question stays the search title. These fit one line in the editorial column. */
const ANSWER_HEADLINES = {
  "first-naturopathy-consultation": "The first consultation",
  "weight-management-program-duration": "How long is the stay?",
  "what-a-supervised-fast-actually-feels-like": "A supervised fast",
  "continue-existing-medication": "Medication during a stay",
};

/**
 * Fixed pages. `title` / `description` are search. `og.title` / `og.description` are the preview.
 * Templates follow the page hero. Medical Editorial Policy has no route yet, so it is not here.
 */
export const FIXED_PAGES = {
  home: {
    title: "A doctor-led naturopathy retreat in Kerala",
    description: "Shantara is a doctor-led naturopathy retreat in Kerala. Every stay begins with a consultation.",
    og: {
      template: "default",
      title: "A doctor-led stay in Kerala",
      description: "Every stay begins with a doctor's consultation.",
      photo: "arrival-dusk",
    },
  },
  therapies: {
    title: "Therapies during a residential stay",
    description: "Therapies at Shantara are recommended by your doctor after consultation, as part of the stay.",
    og: {
      template: "default",
      title: "Therapies during a stay",
      description: "Your doctor recommends them after consultation.",
      photo: "arrival-dusk",
    },
  },
  rooms: {
    title: "Rooms for a residential stay",
    description: "Rooms at the retreat in Kerala, for guests on a doctor-planned residential stay.",
    og: {
      template: "default",
      title: "Rooms for the stay",
      description: "Quiet rooms at the retreat in Kerala.",
      photo: "room-bedroom-forest-view-armchair",
    },
  },
  "amenities-activities": {
    title: "The grounds and shared rooms",
    description: "Shared rooms and the grounds of the retreat, for guests in residence.",
    og: {
      template: "default",
      title: "The grounds of the retreat",
      description: "Shared rooms and time on the grounds.",
      photo: "valley",
    },
  },
  "farm-dining": {
    title: "Meals during a residential stay",
    description: "Meals are planned with your doctor as part of the residential programme.",
    og: {
      template: "default",
      title: "Meals during the stay",
      description: "Your doctor plans them with the programme.",
      photo: "valley",
    },
  },
  "a-day-at-shantara": {
    title: "A day at the retreat",
    description: "An example day at Shantara. Each guest's day is planned after consultation.",
    og: {
      template: "default",
      title: "A day at the retreat",
      description: "An example day. Each stay is planned.",
      photo: "arrival-dusk",
    },
  },
  conditions: {
    title: "Conditions we commonly see",
    description: "Conditions Shantara sees during a residential stay, planned after consultation.",
    og: {
      template: "editorial",
      title: "Conditions we see",
      description: "Your doctor plans the stay after consultation.",
    },
  },
  programs: {
    title: "Programmes for a residential stay",
    description: "Residential programmes at Shantara. Each one follows a doctor's consultation.",
    og: {
      template: "editorial",
      title: "Programmes for a stay",
      description: "Each programme follows a consultation.",
    },
  },
  "our-story": {
    title: "How Shantara began",
    description: "Shantara grew from Hygiene Nature Cure Hospital, founded by Dr. P.A. Kareem in 2000.",
    og: {
      template: "editorial",
      title: "How Shantara began",
      description: "Founded from Hygiene Nature Cure Hospital.",
    },
  },
  "our-approach": {
    title: "How a stay is planned",
    description: "Enquiry, consultation, the residential stay, then going home.",
    og: {
      template: "editorial",
      title: "How a stay is planned",
      description: "Consultation, the stay, then going home.",
    },
  },
  "our-doctors": {
    title: "The doctors at Shantara",
    description: "The doctors at Shantara, with qualifications, areas of practice and how to consult.",
    og: {
      template: "editorial",
      title: "The doctors at Shantara",
      description: "Qualifications, practice and how to consult.",
    },
  },
  journal: {
    title: "Journal",
    description: "Clinical guides, doctors' answers and accounts of a stay at Shantara.",
    og: {
      template: "editorial",
      title: "Notes from the retreat",
      description: "Guides, doctors' answers and guest accounts.",
    },
  },
  tariff: {
    title: "Tariff",
    description: "Rooms, inclusions, payment and cancellation. Amounts are published on this page only.",
    og: {
      template: "programme",
      title: "The tariff card",
      description: "Rooms, inclusions, payment and cancellation.",
      photo: "room-premium",
    },
  },
  faq: {
    title: "Questions before a stay",
    description: "Answers on booking, who can stay, and what the days at the retreat are like.",
    og: {
      template: "editorial",
      title: "Questions before a stay",
      description: "Booking, who can stay, and the days here.",
    },
  },
  contact: {
    title: "Contact",
    description: "Call, WhatsApp or email Shantara Naturopathy Retreat in Kerala.",
    og: {
      template: "editorial",
      title: "Speak with the retreat",
      description: "Call, WhatsApp or email from Kerala.",
    },
  },
  "book-consultation": {
    title: "Book a consultation",
    description: "Send a few details. A doctor helps you choose the next step.",
    og: {
      template: "programme",
      title: "Book a consultation",
      description: "A doctor helps you choose the next step.",
      photo: "arrival-dusk",
    },
  },
  "resident-policies": {
    title: "During your stay",
    description: "House rules for guests in residence at Shantara.",
    og: {
      template: "editorial",
      title: "During your stay",
      description: "House rules for life at the retreat.",
    },
  },
  "cancellation-policy": {
    title: "Cancellation",
    description: "How a change or a cancellation of a stay is handled.",
    og: {
      template: "editorial",
      title: "If a stay is cancelled",
      description: "How a change or a cancellation is handled.",
    },
  },
  "privacy-policy": {
    title: "Privacy",
    description: "What Shantara collects from guests and website visitors, and why it is kept.",
    og: {
      template: "editorial",
      title: "Privacy at the retreat",
      description: "What we collect, and why we keep it.",
    },
  },
  "terms-of-service": {
    title: "Terms of service",
    description: "The terms that cover use of the Shantara website.",
    og: {
      template: "editorial",
      title: "Terms for this website",
      description: "The terms that cover using the site.",
    },
  },
};

const PLACEHOLDER = /placeholder|pending medical review|body pending|\[to confirm\]|catalogue programme/i;
const INTERNAL = /\b(icp|not a )\b/i;

function usableLine(text, title, max) {
  const line = String(text || "").trim();
  if (!line || line.length > max) return "";
  if (PLACEHOLDER.test(line) || INTERNAL.test(line)) return "";
  if (title && title.length >= 8 && line.toLowerCase().includes(title.toLowerCase())) return "";
  if (imageTextIssues(line, "").length) return "";
  if (/\d+\s*[–—-]\s*\d+\s*nights/i.test(line)) return "";
  return line;
}

export function imageTextIssues(text, path) {
  let scanned = String(text || "");
  if (String(path || "").includes("/our-story")) scanned = scanned.replaceAll("Hygiene Nature Cure Hospital", "");
  const issues = [];
  for (const [pattern, label] of CLAIM_PATTERNS) if (pattern.test(scanned)) issues.push(label);
  for (const [pattern, label] of RATE_PATTERNS) if (pattern.test(scanned)) issues.push(label);
  return issues;
}

function pageOf(path, title, description, og) {
  return { path, title, description, og };
}

export function fixedSharePage(key) {
  const page = FIXED_PAGES[key];
  if (!page) throw new Error(`No fixed share copy for "${key}"`);
  const path = key === "home" ? "/en/" : `/en/${key}`;
  return pageOf(path, page.title, page.description, page.og);
}

export function programmeShare(entry) {
  const headline = PROGRAMME_HEADLINES[entry.slug] || entry.name;
  if (!PROGRAMME_HEADLINES[entry.slug] && imageTextIssues(entry.name, "").length) {
    throw new Error(`${entry.slug}: programme name cannot be the picture headline; add it to PROGRAMME_HEADLINES`);
  }
  const line = usableLine(entry.proposition, headline, SUB_MAX.programme) || RESIDENTIAL;
  return pageOf(`/en/programs/${entry.slug}`, entry.meta_title || entry.name, entry.meta_description || entry.proposition, {
    template: "programme",
    title: headline,
    description: line,
    photo: entry.featured_image?.src,
  });
}

export function conditionShare(entry) {
  const headline = CONDITION_HEADLINES[entry.slug] || entry.name;
  if ([...headline].length > LARGE_TYPE) {
    throw new Error(`${entry.slug}: condition name exceeds ${LARGE_TYPE} characters; set og.title to a shorter picture headline`);
  }
  if (imageTextIssues(headline, "").length) {
    throw new Error(`${entry.slug}: condition name cannot be the picture headline`);
  }
  return pageOf(`/en/conditions/${entry.slug}`, entry.meta_title || entry.name, entry.meta_description || entry.summary, {
    template: "programme",
    title: headline,
    description: CONDITION_LINE,
    photo: entry.featured_image?.src,
  });
}

export function doctorShare(entry) {
  const headline = entry.full_name;
  const line = usableLine(entry.qualification, headline, SUB_MAX.programme) || usableLine(entry.role ? `${entry.role} of the retreat.` : "", headline, SUB_MAX.programme);
  if (!line) throw new Error(`${entry.slug}: doctor profile needs a qualification or role for the supporting line`);
  return pageOf(`/en/doctors/${entry.slug}`, entry.meta_title || entry.full_name, entry.meta_description || entry.qualification || entry.role, {
    template: "programme",
    title: headline,
    description: line,
    photo: entry.photo_profile || entry.featured_image?.src,
  });
}

export function articleShare(entry) {
  const headline = ARTICLE_HEADLINES[entry.slug] || entry.title;
  if (!ARTICLE_HEADLINES[entry.slug] && [...entry.title].length > LARGE_TYPE) {
    throw new Error(`${entry.slug}: article title exceeds ${LARGE_TYPE} characters; add a picture headline to ARTICLE_HEADLINES`);
  }
  const line = usableLine(entry.lead, headline, SUB_MAX.editorial) || usableLine(entry.category, headline, SUB_MAX.editorial);
  if (!line) throw new Error(`${entry.slug}: article needs a lead or category for the supporting line`);
  return pageOf(`/en/journal/${entry.slug}`, entry.meta_title || entry.title, entry.meta_description || entry.lead, {
    template: "editorial",
    title: headline,
    description: line,
  });
}

export function doctorAnswerShare(entry, doctorName) {
  const headline = ANSWER_HEADLINES[entry.slug] || entry.question;
  if (!ANSWER_HEADLINES[entry.slug] && [...entry.question].length > LARGE_TYPE) {
    throw new Error(`${entry.slug}: question exceeds ${LARGE_TYPE} characters; add a picture headline to ANSWER_HEADLINES`);
  }
  const answer = String(entry.short_answer || "").trim();
  const safeAnswer = answer && !imageTextIssues(answer, "").length && answer.length <= 140;
  const attribution = doctorName ? `Answered by ${doctorName}. The full answer is on this page.` : ANSWER_LINE;
  const description = safeAnswer && doctorName ? `Answered by ${doctorName}. ${answer}` : safeAnswer ? answer : attribution;
  return pageOf(`/en/journal/${entry.slug}`, entry.meta_title || entry.question, entry.meta_description || entry.short_answer || attribution, {
    template: "editorial",
    title: headline,
    description,
    line: false,
  });
}

/** @returns {string[]} problems with this page's share preview. Empty means it passes. */
export function auditSharePage(page) {
  const errors = [];
  const og = page.og ?? {};
  const template = og.template ?? "default";
  const rendered = String(og.title ?? page.title ?? "").trim();
  const explicit = typeof og.title === "string" && og.title.trim().length > 0;
  const doctorAnswer = og.line === false;
  const line = doctorAnswer ? "" : String(og.description ?? page.description ?? "").trim();
  const where = page.path || rendered;

  if (!rendered) errors.push(`${where}: share title is empty`);
  if ([...rendered].length > LARGE_TYPE && !explicit) {
    errors.push(`${where}: "${rendered}" is over ${LARGE_TYPE} characters without an og.title`);
  }
  if ([...rendered].length > (TITLE_MAX[template] ?? 72)) {
    errors.push(`${where}: "${rendered}" exceeds the ${template} title limit`);
  }
  if (!page.noindex && doctorAnswer && !String(og.description ?? page.description ?? "").trim()) {
    errors.push(`${where}: Doctor Answer is missing og:description`);
  }
  if (!page.noindex && !doctorAnswer) {
    if (!line) errors.push(`${where}: supporting line is missing`);
    else if ([...rendered].length > 60) errors.push(`${where}: title is over 60 characters, so the supporting line would be dropped`);
    else if ([...line].length > (SUB_MAX[template] ?? 100)) errors.push(`${where}: supporting line is too long for the ${template} template`);
    else if (rendered.length >= 8 && line.toLowerCase().includes(rendered.toLowerCase())) errors.push(`${where}: supporting line repeats the title`);
  }
  const imageText = doctorAnswer ? rendered : `${rendered}\n${line}`;
  for (const label of imageTextIssues(imageText, page.path)) errors.push(`${where}: image text contains ${label}`);
  return errors;
}
