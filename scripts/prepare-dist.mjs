import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const check = spawnSync(process.execPath, [join(root, "scripts", "check-bundle.mjs")], {
  cwd: root,
  stdio: "inherit",
});
if (check.status !== 0) {
  process.exit(check.status || 1);
}

const files = [
  "index.html",
  "catalog.css",
  "chrome.css",
  "catalog.js",
  "portal.js",
  "styles.css",
  "_ds_manifest.json",
  "_ds_bundle.js",
  "readme.md",
  "SKILL.md",
  "AGENTS.md",
  "i18n.js",
  "locales.js",
];

const dirs = ["assets", "tokens", "guidelines", "components", "docs", "ui_kits", "templates", "content"];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

for (const file of files) {
  const src = join(root, file);
  if (!existsSync(src)) continue;
  cpSync(src, join(dist, file));
}

for (const dir of dirs) {
  const src = join(root, dir);
  if (!existsSync(src)) continue;
  cpSync(src, join(dist, dir), { recursive: true, filter: (p) => !/[\\/]node_modules([\\/]|$)/.test(p) });
}

writeFileSync(
  join(dist, "404.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=/"><title>Not found</title></head><body><p>That page is not in the design system. <a href="/">Back to the index</a>.</p></body></html>\n`,
);

writeFileSync(
  join(dist, "netlify.toml"),
  `[build]\n  publish = "."\n\n[[headers]]\n  for = "/assets/fonts/*"\n  [headers.values]\n    Cache-Control = "public, max-age=31536000, immutable"\n\n[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Content-Type-Options = "nosniff"\n    Referrer-Policy = "strict-origin-when-cross-origin"\n`,
);

console.log("Prepared dist/ for Netlify (notes included; scraps and raw uploads left out).");
