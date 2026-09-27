/* Regenerates samples/ with the reference renderer.
   cd templates/og-images && npm install && npm run samples && npm run check
   Headlines and supporting lines come from share-copy.mjs. Photographs come from assets/. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadOgAssets, renderOgImage } from "./og-image.mjs";
import { articleShare, doctorAnswerShare, doctorShare, FIXED_PAGES, programmeShare } from "./share-copy.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const asset = (p) => join(root, "assets", p);
const photo = (slug) => asset(`photos/${slug}.jpg`);
const record = async (p) => JSON.parse(await readFile(join(root, "content", p), "utf8"));

const assets = await loadOgAssets({
  fontLight: asset("fonts/DiodrumCyrillic-Light.ttf"),
  fontRegular: asset("fonts/DiodrumCyrillic-Regular.ttf"),
  fontArabicLight: asset("fonts/IBMPlexSansArabic-Light.ttf"),
  fontArabicRegular: asset("fonts/IBMPlexSansArabic-Regular.ttf"),
  wordmarkCream: asset("wordmark-cream.svg"),
  wordmarkDark: asset("wordmark-dark.svg"),
  patternUnit: asset("pattern-unit.png"),
});

const site = await record("site.json");
const programme = programmeShare(await record("programs/stress-management.json"));
const article = articleShare(await record("articles/how-programme-duration-is-decided.json"));
const answer = doctorAnswerShare(await record("doctor-answers/continue-medication.json"));
const shortAnswer = doctorAnswerShare(await record("doctor-answers/first-consultation.json"));
const bahja = doctorShare(await record("doctors/bahja-janu.json"));
const kareem = doctorShare(await record("doctors/pa-kareem.json"));
const fixed = (key) => FIXED_PAGES[key];

/* Arabic type-specimen pangrams, not copy. They test shaping, joining, diacritics and
   right-to-left line order before any Arabic page exists. */
const AR_TITLE = "صِف خَلقَ خَودٍ كَمِثلِ الشَمسِ إِذ بَزَغَت";
const AR_LINE = "نص حكيم له سر قاطع وذو شأن عظيم مكتوب على ثوب أخضر ومغلف بجلد أزرق";

const card = (file, page, image) => ({
  file,
  template: page.og.template,
  title: page.og.title,
  description: page.og.line === false ? undefined : page.og.description,
  photo: image,
});

const samples = [
  card("home.jpg", fixed("home"), photo("arrival-dusk")),
  card("programme.jpg", programme, photo("balcony")),
  card("doctor.jpg", bahja, photo("doctor-bahja-janu-portrait")),
  card("doctor-kareem.jpg", kareem, photo("valley")),
  card("editorial.jpg", article),
  /* Doctor Answers never carry the supporting line (og.line: false). */
  card("doctor-answer.jpg", shortAnswer),
  /* Layout fixture: a question long enough to wrap to three lines. The page's share headline is the shorter og.title. */
  { file: "long-title.jpg", template: "editorial", title: "Can I continue my existing medication during a naturopathy stay?" },
  card("therapies.jpg", fixed("therapies"), photo("arrival-dusk")),
  card("rooms.jpg", fixed("rooms"), photo("room-bedroom-forest-view-armchair")),
  card("tariff.jpg", fixed("tariff"), photo("room-premium")),
  card("faq.jpg", fixed("faq")),
  card("contact.jpg", fixed("contact")),
  /* The one committed fallback for pages that are not generated (public/og-default.jpg). */
  { file: "og-default.jpg", template: "default", title: site.business_name, photo: photo("valley") },
  /* Rendering tests for right-to-left locales. Not approved images; no Arabic page uses them. */
  { file: "rtl-test/default.jpg", template: "default", dir: "rtl", title: AR_TITLE, description: AR_LINE, photo: photo("valley") },
  { file: "rtl-test/programme.jpg", template: "programme", dir: "rtl", title: AR_TITLE, description: AR_LINE, photo: photo("balcony") },
  { file: "rtl-test/editorial.jpg", template: "editorial", dir: "rtl", title: AR_TITLE, description: AR_LINE },
];

await mkdir(join(here, "samples", "rtl-test"), { recursive: true });
for (const s of samples) {
  const jpeg = await renderOgImage({ ...s, assets });
  await writeFile(join(here, "samples", s.file), jpeg);
  const { width, height } = await sharp(jpeg).metadata();
  console.log(`${s.file.padEnd(22)} ${s.template.padEnd(10)} ${width}×${height} ${(jpeg.length / 1024).toFixed(0)} KB  "${s.title}"`);
}
