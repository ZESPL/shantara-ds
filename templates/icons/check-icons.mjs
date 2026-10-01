// Checks an icon set against ui_kits/website/skill-icons.md.
// Usage: node check-icons.mjs [folder]   (default: ./public; the website runs it on its own public/)
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const dir = resolve(process.argv[2] || join(here, "public"));
const errors = [];
const fail = (msg) => errors.push(msg);
const file = (name) => join(dir, name);

const PNGS = { "apple-touch-icon.png": 180, "icon-192.png": 192, "icon-512.png": 512, "icon-mask.png": 512 };
for (const name of ["favicon.ico", "favicon.svg", "manifest.webmanifest", ...Object.keys(PNGS)]) {
  if (!existsSync(file(name))) fail(`${name}: missing`);
}

if (existsSync(file("favicon.svg"))) {
  const svg = readFileSync(file("favicon.svg"), "utf8");
  if (statSync(file("favicon.svg")).size > 3 * 1024) fail("favicon.svg: over 3 KB — strip metadata and editor markup");
  if (/<metadata|c2pa|<\?xml|id="Layer/.test(svg)) fail("favicon.svg: contains metadata or editor markup");
  if (!/prefers-color-scheme:\s*dark/.test(svg)) fail("favicon.svg: no dark-mode colour");
  const vb = /viewBox="([^"]+)"/.exec(svg)?.[1].split(/\s+/).map(Number);
  if (!vb || vb[2] !== vb[3]) fail("favicon.svg: viewBox is not square");
}

if (existsSync(file("favicon.ico"))) {
  const ico = readFileSync(file("favicon.ico"));
  const count = ico.readUInt16LE(4);
  const sizes = Array.from({ length: count }, (_, i) => ico.readUInt8(6 + i * 16) || 256);
  if (ico.readUInt16LE(2) !== 1 || !sizes.includes(32)) fail("favicon.ico: not an ICO with a 32 × 32 image");
}

for (const [name, size] of Object.entries(PNGS)) {
  if (!existsSync(file(name))) continue;
  const { width, height, format } = await sharp(file(name)).metadata();
  if (format !== "png" || width !== size || height !== size) fail(`${name}: expected ${size} × ${size} PNG, got ${width} × ${height} ${format}`);
  const { isOpaque } = await sharp(file(name)).stats();
  if (!isOpaque) fail(`${name}: has transparent pixels — iOS and Android fill them with black or white`);
}

// Maskable safe zone: everything outside the central circle (radius 40% of the width) is plain background.
if (existsSync(file("icon-mask.png"))) {
  const { data, info } = await sharp(file("icon-mask.png")).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const c = info.width / 2, r = info.width * 0.4;
  const bg = [data[0], data[1], data[2]];
  let stray = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if ((x + 0.5 - c) ** 2 + (y + 0.5 - c) ** 2 <= r * r) continue;
      const i = (y * info.width + x) * 3;
      if (Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]) > 12) stray++;
    }
  }
  if (stray) fail(`icon-mask.png: ${stray} pixels of the mark sit outside the maskable safe zone`);
}

if (existsSync(file("manifest.webmanifest"))) {
  let m;
  try {
    m = JSON.parse(readFileSync(file("manifest.webmanifest"), "utf8"));
  } catch (err) {
    fail(`manifest.webmanifest: invalid JSON (${err.message})`);
  }
  if (m) {
    for (const key of ["name", "short_name", "start_url", "display", "background_color", "theme_color", "icons"]) {
      if (!(key in m)) fail(`manifest.webmanifest: missing "${key}"`);
    }
    const icons = m.icons || [];
    for (const icon of icons) {
      if (!existsSync(file(icon.src.replace(/^\//, "")))) fail(`manifest.webmanifest: ${icon.src} does not exist`);
      if (/any\s+maskable|maskable\s+any/.test(icon.purpose || "")) fail(`manifest.webmanifest: ${icon.src} combines "any maskable" — use separate entries`);
    }
    for (const size of ["192x192", "512x512"]) {
      if (!icons.some((i) => i.sizes === size && !i.purpose)) fail(`manifest.webmanifest: no ${size} icon`);
    }
    if (!icons.some((i) => i.purpose === "maskable")) fail("manifest.webmanifest: no maskable icon");
  }
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ Icon set in ${dir} passes`);
