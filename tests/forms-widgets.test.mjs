import { test } from "node:test";
import assert from "node:assert/strict";
import { acceptsEnglish, keepEnglish } from "../components/forms/englishText.mjs";
import {
  addMonths,
  buildGrid,
  filterOptions,
  fold,
  formatLong,
  highlightParts,
  inRange,
  monthIntersects,
  normalizeOptions,
  parseIso,
  pushYearDigit,
  shiftMonth,
  yearIntersects,
  startOfWeek,
  weekStart,
  weekdayLabels,
} from "../components/forms/fieldLogic.mjs";

test("ISO dates reject impossible days and format in day-month-year", () => {
  assert.equal(parseIso("2026-02-31"), null);
  assert.equal(parseIso("2026-13-01"), null);
  assert.equal(parseIso("06-10-2026"), null);
  assert.deepEqual(parseIso("2024-02-29"), { y: 2024, m: 2, d: 29 });
  const formatted = formatLong("2026-10-06", "en-GB");
  assert.match(formatted, /6/);
  assert.match(formatted, /October/);
  assert.match(formatted, /2026/);
});

test("month grid is full weeks and keeps the first of the month", () => {
  const october = buildGrid(2026, 10, 1);
  assert.equal(october.length % 7, 0);
  const first = october.find((cell) => cell.iso === "2026-10-01");
  assert.equal(first.inMonth, true);
  assert.equal(first.day, 1);
  const leap = buildGrid(2024, 2, 1);
  assert.ok(leap.some((cell) => cell.iso === "2024-02-29" && cell.inMonth));
  assert.equal(leap.some((cell) => cell.iso === "2024-02-30"), false);
});

test("month and week steps clamp short months and cross years", () => {
  assert.equal(addMonths("2026-01-31", 1), "2026-02-28");
  assert.equal(addMonths("2024-01-31", 1), "2024-02-29");
  assert.deepEqual(shiftMonth(2026, 1, -1), { y: 2025, m: 12 });
  assert.equal(startOfWeek("2026-10-06", 1), "2026-10-05");
  assert.equal(inRange("2026-10-06", "2026-10-06", "2026-12-01"), true);
  assert.equal(inRange("2026-10-05", "2026-10-06", "2026-12-01"), false);
  assert.equal(monthIntersects(2026, 9, "2026-10-06", "2026-12-01"), false);
  assert.equal(monthIntersects(2026, 10, "2026-10-06", "2026-12-01"), true);
});

test("a year is selectable when any day of it falls in range", () => {
  assert.equal(yearIntersects(2026, "2026-10-06", "2026-12-01"), true);
  assert.equal(yearIntersects(2025, "2026-10-06", "2026-12-01"), false);
  assert.equal(yearIntersects(2027, "2026-10-06", "2026-12-01"), false);
  assert.equal(yearIntersects(1976, "", ""), true);
});

test("a typed year resolves on the fourth digit", () => {
  assert.deepEqual(pushYearDigit("", "1", 1906, 2031), { buffer: "1", year: null });
  assert.deepEqual(pushYearDigit("197", "6", 1906, 2031), { buffer: "", year: 1976 });
  assert.deepEqual(pushYearDigit("189", "0", 1906, 2031), { buffer: "", year: null });
  assert.deepEqual(pushYearDigit("19", "x", 1906, 2031), { buffer: "19", year: null });
});

test("week labels follow the locale start day", () => {
  assert.equal(weekStart("en-GB"), 1);
  assert.equal(weekdayLabels("en-GB", 1).length, 7);
  assert.match(weekdayLabels("en-GB", 1)[0], /Mon/);
  const arabic = weekStart("ar");
  assert.ok(arabic >= 1 && arabic <= 7);
  assert.equal(weekdayLabels("ar", arabic).length, 7);
});

test("free text keeps English and drops other scripts", () => {
  assert.equal(keepEnglish("Anya Raman"), "Anya Raman");
  assert.equal(keepEnglish("José O'Brien"), "José O'Brien");
  assert.equal(keepEnglish("you@example.com"), "you@example.com");
  assert.equal(keepEnglish("+91 98765 43210"), "+91 98765 43210");
  assert.equal(keepEnglish("Line one\nLine two"), "Line one\nLine two");
  assert.equal(keepEnglish("“quoted” — yes"), "“quoted” — yes");
  assert.equal(keepEnglish("Cafe\u0301"), "Cafe\u0301");
  assert.equal(keepEnglish("Hello\u00A0there"), "Hello there");
  assert.equal(keepEnglish("Hello مرحبا"), "Hello ");
  assert.equal(keepEnglish("नमस्ते"), "");
  assert.equal(keepEnglish("你好"), "");
  assert.equal(keepEnglish("Привет"), "");
  assert.equal(keepEnglish("Hello 🌿"), "Hello ");
  assert.equal(keepEnglish("١٢٣"), "");
  assert.equal(keepEnglish("\u0301"), "");
  assert.equal(acceptsEnglish(undefined), true);
  assert.equal(acceptsEnglish("email"), true);
  assert.equal(acceptsEnglish("tel"), true);
  assert.equal(acceptsEnglish("password"), false);
  assert.equal(acceptsEnglish("number"), false);
});

test("search matches accents and highlights the typed span", () => {
  assert.equal(fold("Café"), "cafe");
  const options = normalizeOptions([
    "India",
    { value: "uk", label: "United Kingdom", description: "Includes Scotland" },
    { value: "ae", label: "United Arab Emirates" },
  ]);
  const united = filterOptions(options, "uni").map((option) => option.value);
  assert.deepEqual(united, ["uk", "ae"]);
  const byDescription = filterOptions(options, "scotland").map((option) => option.value);
  assert.deepEqual(byDescription, ["uk"]);
  const parts = highlightParts("United Kingdom", "king");
  assert.equal(parts.find((part) => part.hit).text, "King");
  assert.deepEqual(filterOptions(options, "zzz"), []);
});
