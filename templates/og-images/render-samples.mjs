/* Regenerates samples/ with the reference renderer.
   cd templates/og-images && npm install && npm run samples
   Copy comes from content/ records, so the samples show real page titles. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadOgAssets, renderOgImage } from "./og-image.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const asset = (p) => join(root, "assets", p);
const photo = (slug) => asset(`photos/${slug}.jpg`);
const record = async (p) => JSON.parse(await readFile(join(root, "content", p), "utf8"));

const assets = await loadOgAssets({
  fontLight: asset("fonts/DiodrumCyrillic-Light.ttf"),
  fontRegular: asset("fonts/DiodrumCyrillic-Regular.ttf"),
  wordmarkCream: asset("wordmark-cream.svg"),
  wordmarkDark: asset("wordmark-dark.svg"),
  patternUnit: asset("pattern-unit.png"),
});

const site = await record("site.json");
const programme = await record("programs/stress-management.json");
const article = await record("articles/how-programme-duration-is-decided.json");
const answer = await record("doctor-answers/continue-medication.json");

const samples = [
  /* Home: the HeroFullBleed title and line from ui_kits/website/screens/HomeScreen.js. */
  { file: "home.jpg", template: "default", title: "A doctor-led naturopathy retreat in Kerala", description: "Every stay begins with a doctor's consultation.", photo: photo("arrival-dusk") },
  { file: "programme.jpg", template: "programme", title: programme.name, description: programme.proposition, photo: photo(programme.featured_image.src) },
  { file: "editorial.jpg", template: "editorial", title: article.title, description: article.lead },
  { file: "long-title.jpg", template: "editorial", title: answer.question, description: answer.short_answer },
  /* The one committed fallback for pages that are not generated (public/og-default.jpg). */
  { file: "og-default.jpg", template: "default", title: site.business_name, photo: photo("valley") },
];

await mkdir(join(here, "samples"), { recursive: true });
for (const s of samples) {
  const jpeg = await renderOgImage({ ...s, assets });
  await writeFile(join(here, "samples", s.file), jpeg);
  const { width, height } = await sharp(jpeg).metadata();
  console.log(`${s.file.padEnd(16)} ${s.template.padEnd(10)} ${width}×${height} ${(jpeg.length / 1024).toFixed(0)} KB  "${s.title}"`);
}
