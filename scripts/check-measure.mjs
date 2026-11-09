/**
 * Fail when text width or wrapping is set anywhere but the tokens.
 *
 *   node scripts/check-measure.mjs
 *
 * 1. A max-width, `--_measure` or `--_m` in ch must read a measure token
 *    (`--measure-title`, `--measure-heading`, `--measure-body`, `--measure-narrow`),
 *    and a Statement `measure` prop takes a token name, never "22ch".
 *    The tokens are defined once, in tokens/typography.css.
 * 2. `text-wrap: balance` is for short centred UI text only: Tooltip, Dialog and
 *    AnnouncementBar. Headings use `pretty` from tokens/base.css.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["components", "tokens", "ui_kits/website/screens"];
const EXT = /\.(jsx|js|css|html)$/;
const BALANCE_OK = ["Tooltip", "Dialog", "AnnouncementBar"];
const TOKENS_FILE = path.join("tokens", "typography.css");

const LITERAL = [
  /(max-width|--_measure|--_m)\s*:\s*[^;}"'`]*\b\d+(\.\d+)?ch\b/g,
  /maxWidth\s*:\s*["'`][^"'`]*\b\d+(\.\d+)?ch\b/g,
  /measure\s*[=:]\s*\{?\s*["'`]\d+(\.\d+)?ch["'`]/g,
];
const BALANCE = /text-?[wW]rap\s*:\s*["']?balance/g;

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (EXT.test(entry.name)) acc.push(full);
  }
  return acc;
}

const errors = [];
for (const file of DIRS.flatMap((d) => walk(path.join(root, d)))) {
  const rel = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");
  const line = (index) => text.slice(0, index).split("\n").length;
  if (rel !== TOKENS_FILE) {
    for (const re of LITERAL) {
      for (const m of text.matchAll(re)) errors.push(`${rel}:${line(m.index)}: "${m[0]}" — use a --measure-* token.`);
    }
  }
  if (!BALANCE_OK.some((name) => path.basename(file).startsWith(name))) {
    for (const m of text.matchAll(BALANCE)) errors.push(`${rel}:${line(m.index)}: text-wrap: balance — headings use pretty (tokens/base.css).`);
  }
}

if (errors.length) {
  console.error(`check-measure: ${errors.length} problem(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("check-measure: ok (every text width reads a --measure-* token)");
