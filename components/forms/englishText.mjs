/* Free-text answers are read by an English-speaking team.
   Keep Latin letters (accents included), ASCII, and punctuation people paste. */

const NON_TEXT = new Set([
  "password", "number", "range", "date", "time", "datetime-local",
  "month", "week", "color", "file", "checkbox", "radio", "hidden",
  "button", "submit", "reset", "image",
]);

const FANCY_SPACE = /[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g;
const INVISIBLE = /[\u200B-\u200D\uFEFF]/g;
const DROP = /[^\p{Script=Latin}\p{M}\t\n\r\x20-\x7E\u2013\u2014\u2018\u2019\u201C\u201D\u2026\u2022\u00B0\u00A3\u20AC\u00B7]/gu;
const ORPHAN_MARKS = /(^|[^\p{Script=Latin}])\p{M}+/gu;

export const ENGLISH_HINT = "Please write in English.";

export function acceptsEnglish(type) {
  return !NON_TEXT.has(String(type || "").toLowerCase());
}

export function keepEnglish(value) {
  return String(value ?? "")
    .replace(INVISIBLE, "")
    .replace(FANCY_SPACE, " ")
    .replace(DROP, "")
    .replace(ORPHAN_MARKS, "$1");
}

/* True when the insertion was not English. A fully foreign insert is cancelled. */
export function rejectForeignInsert(event) {
  const data = event.data;
  if (typeof data !== "string" || data === "") return false;
  const next = keepEnglish(data);
  if (next === data) return false;
  if (next === "") event.preventDefault();
  return true;
}

/* Writes the English portion back onto the control. True when characters were removed. */
export function stripForeignInput(event) {
  const raw = event.target.value;
  const next = keepEnglish(raw);
  if (next === raw) return false;
  event.target.value = next;
  return true;
}
