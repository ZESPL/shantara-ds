/* Share-image checks. Specification: ui_kits/website/skill-og-images.md.
   Copy this file to the website as scripts/check-og.mjs.

   node check-og.mjs --samples   design system: audit catalogue copy and samples/*.jpg
   node check-og.mjs             website: after astro build, audit dist/ HTML and JPEGs
   The image route also imports auditSharePage and runs it at build time. Finished HTML
   does not record whether og.title was an override, or whether a Doctor Answer drew a line. */
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  auditSharePage,
  articleShare,
  conditionShare,
  doctorAnswerShare,
  doctorShare,
  FIXED_PAGES,
  fixedSharePage,
  imageTextIssues,
  programmeShare,
} from "./share-copy.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function records(dir) {
  const names = await readdir(join(root, "content", dir));
  const out = [];
  for (const name of names) {
    if (!name.endsWith(".json")) continue;
    out.push(await readJson(join(root, "content", dir, name)));
  }
  return out;
}

export async function designSystemPages() {
  const doctors = await records("doctors");
  const byId = new Map(doctors.map((d) => [d.id, d.full_name]));
  const pages = Object.keys(FIXED_PAGES).map((key) => fixedSharePage(key));
  for (const entry of await records("programs")) pages.push(programmeShare(entry));
  for (const entry of await records("conditions")) pages.push(conditionShare(entry));
  for (const entry of doctors.filter((d) => d.slug === "pa-kareem" || d.slug === "bahja-janu")) pages.push(doctorShare(entry));
  for (const entry of await records("articles")) pages.push(articleShare(entry));
  for (const entry of await records("doctor-answers")) pages.push(doctorAnswerShare(entry, byId.get(entry.doctor_id)));
  pages.push({ path: "/en/journal/2", title: "Journal", description: "Page 2", noindex: true, og: { template: "editorial", title: "Notes from the retreat" } });
  return pages;
}

function selfTest() {
  const long = auditSharePage({
    path: "/en/example",
    title: "A search title that is deliberately too long for large type",
    description: "Search description.",
    og: { template: "editorial" },
  });
  if (!long.some((e) => e.includes("32"))) throw new Error("32-character check did not fire");

  const overridden = auditSharePage({
    path: "/en/example",
    title: "A search title that is deliberately too long for large type",
    description: "Search description.",
    og: { template: "editorial", title: "A short share headline", description: "A line that adds a fact about the stay." },
  });
  if (overridden.length) throw new Error(`explicit og.title was rejected: ${overridden.join("; ")}`);

  const claim = auditSharePage({
    path: "/en/example",
    title: "A short title",
    og: { template: "editorial", title: "A short title", description: "We guarantee a cure." },
  });
  if (!claim.some((e) => /guarantee|cure/.test(e))) throw new Error("claim check did not fire");

  const rate = auditSharePage({
    path: "/en/example",
    title: "The tariff card",
    og: { template: "programme", title: "The tariff card", description: "Rooms from ₹12 per night." },
  });
  if (!rate.some((e) => /currency|per night|from/.test(e))) throw new Error("rate check did not fire");

  const missing = auditSharePage({
    path: "/en/example",
    title: "Rooms for the stay",
    og: { template: "default", title: "Rooms for the stay" },
  });
  if (!missing.some((e) => e.includes("supporting line"))) throw new Error("missing-line check did not fire");

  const answer = auditSharePage({
    path: "/en/journal/example",
    title: "What happens in the first naturopathy consultation?",
    description: "Search description.",
    og: { template: "editorial", title: "The first consultation", description: "A Shantara doctor answers this on the page.", line: false },
  });
  if (answer.length) throw new Error(`Doctor Answer was rejected: ${answer.join("; ")}`);

  const repeat = auditSharePage({
    path: "/en/example",
    title: "Rooms for the stay",
    og: { template: "default", title: "Rooms for the stay", description: "Rooms for the stay, with a view." },
  });
  if (!repeat.some((e) => e.includes("repeats"))) throw new Error("repeat check did not fire");

  if (imageTextIssues("Founded from Hygiene Nature Cure Hospital.", "/en/our-story").length) {
    throw new Error("our-story was not allowed to name Hygiene Nature Cure Hospital");
  }
}

export async function auditSamples() {
  selfTest();
  const pages = await designSystemPages();
  const errors = pages.flatMap((page) => auditSharePage(page));
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.log(`Share copy OK on ${pages.length} pages (fixed, catalogue, one noindex).`);
  return pages;
}

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

const meta = (doc, key) => doc.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`))?.[1];

/** After astro build. Dimensions, format, weight, and banned words in the platform text. */
export async function auditDist(dist = "dist") {
  const SITE = "https://shantara.life";
  const MAX_BYTES = 300 * 1024;
  const REQUIRED = ["og:title", "og:description", "og:url", "og:locale", "og:image", "og:image:alt", "twitter:card", "twitter:image"];
  const errors = [];
  const checked = new Map();
  let pages = 0;

  for await (const file of htmlFiles(dist)) {
    const doc = await readFile(file, "utf8");
    if (/<meta name="robots" content="[^"]*noindex/.test(doc) || file.endsWith("404.html")) continue;
    pages += 1;
    for (const key of REQUIRED) if (!meta(doc, key)) errors.push(`${file}: missing ${key}`);
    if (meta(doc, "twitter:card") !== "summary_large_image") errors.push(`${file}: twitter:card is not summary_large_image`);
    const title = meta(doc, "og:title") ?? "";
    const description = meta(doc, "og:description") ?? "";
    for (const label of imageTextIssues(`${title}\n${description}`, meta(doc, "og:url") ?? "")) {
      errors.push(`${file}: share text contains ${label}`);
    }
    const url = meta(doc, "og:image");
    if (!url) continue;
    if (!url.startsWith(`${SITE}/`)) {
      errors.push(`${file}: og:image is not an absolute ${SITE} URL: ${url}`);
      continue;
    }
    if (meta(doc, "twitter:image") !== url) errors.push(`${file}: twitter:image differs from og:image`);
    if (checked.has(url)) continue;
    const img = join(dist, decodeURIComponent(new URL(url).pathname));
    errors.push(...(await jpegErrors(img)));
    checked.set(url, true);
  }

  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.log(`Share tags OK on ${pages} indexable pages, ${checked.size} images checked.`);
}

async function jpegErrors(file) {
  const MAX_BYTES = 300 * 1024;
  try {
    const [{ size }, { width, height, format }] = await Promise.all([stat(file), sharp(file).metadata()]);
    const errors = [];
    if (width !== 1200 || height !== 630) errors.push(`${file}: ${width}×${height}, expected 1200×630`);
    if (format !== "jpeg") errors.push(`${file}: ${format}, expected jpeg`);
    if (size > MAX_BYTES) errors.push(`${file}: ${(size / 1024).toFixed(0)} KB, max 300 KB`);
    return errors;
  } catch {
    return [`${file}: missing or unreadable`];
  }
}

export async function auditSampleJpegs() {
  const dir = join(here, "samples");
  const errors = [];
  const files = [];
  for (const entry of await readdir(dir, { recursive: true })) {
    if (String(entry).endsWith(".jpg")) files.push(join(dir, entry));
  }
  for (const file of files) errors.push(...(await jpegErrors(file)));
  if (!files.length) errors.push("no sample JPEGs");
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.log(`Sample JPEGs OK: ${files.length} files, 1200×630, under 300 KB.`);
}

const samples = process.argv.includes("--samples");
if (samples) {
  await auditSamples();
  await auditSampleJpegs();
} else if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await auditDist();
}
