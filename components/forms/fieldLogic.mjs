/* Pure helpers for DateField and SearchList.
   Inlined into those components by scripts/build-bundle.mjs (the catalog has no module loader). */

export function parseIso(iso) {
  if (typeof iso !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const y = Number(iso.slice(0, 4));
  const m = Number(iso.slice(5, 7));
  const d = Number(iso.slice(8, 10));
  if (m < 1 || m > 12 || d < 1) return null;
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return { y, m, d };
}

export function toIso(y, m, d) {
  return y + "-" + String(m).padStart(2, "0") + "-" + String(d).padStart(2, "0");
}

export function todayIso(now = new Date()) {
  return toIso(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function daysInMonth(y, m) {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/* Intl weekInfo.firstDay: 1 Monday … 7 Sunday. English (en-GB) is Monday. */
export function weekStart(locale = "en-GB") {
  try {
    const info = new Intl.Locale(locale).weekInfo;
    if (info && info.firstDay >= 1 && info.firstDay <= 7) return info.firstDay;
  } catch {
    /* Locale or weekInfo missing — Monday. */
  }
  return 1;
}

export function weekdayLabels(locale = "en-GB", firstDay = 1) {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  const monday = Date.UTC(2024, 0, 1);
  const fromMonday = firstDay === 7 ? 6 : firstDay - 1;
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(monday + (fromMonday + i) * 86400000)));
}

export function monthNames(locale = "en-GB") {
  const fmt = new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" });
  return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(Date.UTC(2024, i, 1))));
}

export function formatLong(iso, locale = "en-GB") {
  const p = parseIso(iso);
  if (!p) return "";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(p.y, p.m - 1, p.d)));
}

export function buildGrid(y, m, firstDay = 1) {
  const jsFirst = firstDay === 7 ? 0 : firstDay;
  const lead = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() - jsFirst + 7) % 7;
  const count = daysInMonth(y, m);
  const cells = [];
  const pm = m === 1 ? 12 : m - 1;
  const py = m === 1 ? y - 1 : y;
  const prevCount = daysInMonth(py, pm);
  for (let i = 0; i < lead; i++) {
    const day = prevCount - lead + 1 + i;
    cells.push({ iso: toIso(py, pm, day), inMonth: false, day });
  }
  for (let d = 1; d <= count; d++) cells.push({ iso: toIso(y, m, d), inMonth: true, day: d });
  const nm = m === 12 ? 1 : m + 1;
  const ny = m === 12 ? y + 1 : y;
  let next = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ iso: toIso(ny, nm, next), inMonth: false, day: next });
    next += 1;
  }
  return cells;
}

export function addDays(iso, n) {
  const p = parseIso(iso);
  if (!p) return "";
  const dt = new Date(Date.UTC(p.y, p.m - 1, p.d + n));
  return toIso(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

export function shiftMonth(y, m, delta) {
  const dt = new Date(Date.UTC(y, m - 1 + delta, 1));
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1 };
}

export function addMonths(iso, n) {
  const p = parseIso(iso);
  if (!p) return "";
  const shifted = shiftMonth(p.y, p.m, n);
  return toIso(shifted.y, shifted.m, Math.min(p.d, daysInMonth(shifted.y, shifted.m)));
}

export function startOfWeek(iso, firstDay = 1) {
  const p = parseIso(iso);
  if (!p) return "";
  const jsFirst = firstDay === 7 ? 0 : firstDay;
  const back = (new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay() - jsFirst + 7) % 7;
  return addDays(iso, -back);
}

export function inRange(iso, min, max) {
  if (!parseIso(iso)) return false;
  if (min && iso < min) return false;
  if (max && iso > max) return false;
  return true;
}

export function monthIntersects(y, m, min, max) {
  const start = toIso(y, m, 1);
  const end = toIso(y, m, daysInMonth(y, m));
  if (max && start > max) return false;
  if (min && end < min) return false;
  return true;
}

export function yearBounds(min, max, nowY = new Date().getFullYear()) {
  const minY = parseIso(min || "") ? parseIso(min).y : nowY - 120;
  const maxY = parseIso(max || "") ? parseIso(max).y : nowY + 5;
  return [Math.min(minY, maxY), Math.max(minY, maxY)];
}

export function fold(value) {
  return String(value ?? "").normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function normalizeOptions(options) {
  return (options || []).map((option) => {
    if (option == null) return null;
    if (typeof option === "string" || typeof option === "number") {
      const label = String(option);
      return { value: label, label, description: "" };
    }
    const value = option.value == null ? "" : String(option.value);
    return {
      value,
      label: option.label == null ? value : String(option.label),
      description: option.description ? String(option.description) : "",
    };
  }).filter(Boolean);
}

export function filterOptions(options, query) {
  const q = fold(query).trim();
  if (!q) return options;
  return options.filter((option) => fold(option.label).includes(q) || (option.description && fold(option.description).includes(q)));
}

export function highlightParts(label, query) {
  const text = String(label ?? "");
  const q = String(query ?? "").trim();
  if (!q) return [{ text, hit: false }];
  const at = text.toLowerCase().indexOf(q.toLowerCase());
  if (at < 0) return [{ text, hit: false }];
  return [
    { text: text.slice(0, at), hit: false },
    { text: text.slice(at, at + q.length), hit: true },
    { text: text.slice(at + q.length), hit: false },
  ].filter((part) => part.text);
}
