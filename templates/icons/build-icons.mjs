// Builds the website's icon set from the design-system frangipani mark.
// Standard: ui_kits/website/skill-icons.md. Output: public/ (copy into the website's public/)
// and samples/preview.png (the small-size review sheet).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const out = join(here, "public");
const samples = join(here, "samples");
mkdirSync(out, { recursive: true });
mkdirSync(samples, { recursive: true });

// Colours come from the tokens so the icons follow any palette change.
const tokens = readFileSync(join(root, "tokens/colors.css"), "utf8");
const token = (name) => {
  const m = new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{6})`).exec(tokens);
  if (!m) throw new Error(`Missing --color-${name} in tokens/colors.css`);
  return m[1].toUpperCase();
};
// Browser tab: a transparent Himalaya mark, switching to Merino on dark tabs, where Himalaya has too little contrast.
// Home-screen and install icons: a Gold Crayola mark on solid Himalaya.
const GROUND = token("himalaya");
const MARK = token("gold-crayola");
// Merino is the site's page colour and the tab mark's dark-mode colour.
const PAGE = token("merino");

// The mark: path data only. The C2PA metadata and editor ids in the source file are dropped.
const source = readFileSync(join(root, "assets/icon-current.svg"), "utf8");
const [vx, vy, vw, vh] = /viewBox="([^"]+)"/.exec(source)[1].split(/[\s,]+/).map(Number);
const paths = [...source.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
if (!paths.length) throw new Error("No paths found in assets/icon-current.svg");

// Square viewBox with the mark centred, so browsers do not stretch it.
const side = Math.max(vw, vh);
const box = [vx - (side - vw) / 2, vy - (side - vh) / 2, side, side].map((n) => +n.toFixed(2)).join(" ");
const pathTags = paths.map((d) => `<path d="${d}"/>`).join("");

// Tab icon: the bare mark on a transparent background, Himalaya on light tabs and Merino on dark tabs.
const faviconSvg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}">` +
  `<style>path{fill:${GROUND}}@media (prefers-color-scheme:dark){path{fill:${PAGE}}}</style>` +
  `${pathTags}</svg>\n`;
writeFileSync(join(out, "favicon.svg"), faviconSvg);


const markSvg = (fill) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}"><g fill="${fill}">${pathTags}</g></svg>`);

// Transparent mark, rendered at its final size so small sizes are sampled from vectors.
const mark = (size, fill) => sharp(markSvg(fill), { density: 72 * Math.ceil((size * 4) / side) }).resize(size, size).png().toBuffer();

// Raster of the tab icon for a light or a dark tab, for favicon.ico and the review sheet.
const tab = (size, dark = false) => mark(size, dark ? PAGE : GROUND);

// Gold mark on a solid Himalaya square. `scale` is the mark's share of the canvas width.
async function tile(size, scale) {
  const m = Math.round(size * scale);
  const offset = Math.round((size - m) / 2);
  return sharp({ create: { width: size, height: size, channels: 4, background: GROUND } })
    .composite([{ input: await mark(m, MARK), left: offset, top: offset }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Home-screen and install icons. iOS and Android round the corners themselves.
writeFileSync(join(out, "apple-touch-icon.png"), await tile(180, 0.64));
writeFileSync(join(out, "icon-192.png"), await tile(192, 0.64));
writeFileSync(join(out, "icon-512.png"), await tile(512, 0.64));
// Maskable: the mark stays inside the central circle (80% of the width) that every Android mask keeps.
writeFileSync(join(out, "icon-mask.png"), await tile(512, 0.54));

// favicon.ico: one 32 × 32 PNG inside an ICO container (supported by every browser that reads ICO).
const png32 = await tab(32);
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); // reserved
ico.writeUInt16LE(1, 2); // type: icon
ico.writeUInt16LE(1, 4); // one image
ico.writeUInt8(32, 6); // width
ico.writeUInt8(32, 7); // height
ico.writeUInt8(0, 8); // palette
ico.writeUInt8(0, 9); // reserved
ico.writeUInt16LE(1, 10); // colour planes
ico.writeUInt16LE(32, 12); // bits per pixel
ico.writeUInt32LE(png32.length, 14);
ico.writeUInt32LE(22, 18); // offset of the PNG
writeFileSync(join(out, "favicon.ico"), Buffer.concat([ico, png32]));

const manifest = {
  name: "Shantara",
  short_name: "Shantara",
  start_url: "/en/",
  scope: "/",
  display: "browser",
  background_color: GROUND,
  theme_color: PAGE,
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    { src: "/icon-mask.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
};
writeFileSync(join(out, "manifest.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");

// Review sheet: the tab icon at 16, 24 and 32 px on light and dark browser chrome, shown at 1× and enlarged 4×,
// then the touch icon and the maskable icon under a circle mask.
const W = 800, H = 300, pad = 24;
const layers = [];
const swatch = (left, top, w, h, color) => ({
  input: { create: { width: w, height: h, channels: 4, background: color } }, left, top,
});
layers.push(swatch(0, 0, W - 300, 150, "#FFFFFF"), swatch(0, 150, W - 300, 150, "#202124"));
let x = pad;
for (const size of [16, 24, 32]) {
  for (const row of [0, 150]) {
    const one = await tab(size, row === 150);
    const big = await sharp(one).resize(size * 4, size * 4, { kernel: "nearest" }).png().toBuffer();
    layers.push({ input: one, left: x, top: row + pad });
    layers.push({ input: big, left: x + size + 12, top: row + pad });
  }
  x += size * 5 + 36;
}
const touch = await sharp(await tile(180, 0.64)).resize(120, 120).png().toBuffer();
const circle = Buffer.from(`<svg width="120" height="120"><circle cx="60" cy="60" r="60"/></svg>`);
const masked = await sharp(await sharp(await tile(512, 0.54)).resize(120, 120).png().toBuffer())
  .composite([{ input: circle, blend: "dest-in" }]).png().toBuffer();
layers.push({ input: touch, left: W - 280, top: 90 }, { input: masked, left: W - 140, top: 90 });
await sharp({ create: { width: W, height: H, channels: 4, background: "#F4F4F4" } })
  .composite(layers).png().toFile(join(samples, "preview.png"));

console.log(`Built 7 files in templates/icons/public/ and samples/preview.png`);
