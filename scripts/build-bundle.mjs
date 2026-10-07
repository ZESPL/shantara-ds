/**
 * Rebuild _ds_bundle.js from components/**\/*.jsx (components only — never kit screens).
 *
 *   node scripts/build-bundle.mjs
 *
 * Needs @babel/standalone once, outside the repo (no package.json here):
 *   npm i --no-save --prefix /tmp/sh-babel @babel/standalone@7.29.0
 *   BABEL_STANDALONE=/tmp/sh-babel/node_modules/@babel/standalone node scripts/build-bundle.mjs
 *
 * Each file becomes an isolated IIFE on window.ShantaraDesignSystem_45bbe4. Local imports
 * between components (`import { Media } from "../editorial/Media.jsx"`) are resolved by
 * ordering files so dependencies come first and reading them from the shared scope.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const NS = "ShantaraDesignSystem_45bbe4";
const FAMILIES = ["core", "feedback", "forms", "navigation", "editorial", "sections"];

let Babel;
try {
  Babel = require(process.env.BABEL_STANDALONE || "@babel/standalone");
} catch {
  console.error("build-bundle: @babel/standalone not found. See the header of this script.");
  process.exit(1);
}

const files = FAMILIES.flatMap((family) => {
  const dir = path.join(root, "components", family);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".jsx")).sort().map((f) => `components/${family}/${f}`);
});

const parsed = files.map((rel) => {
  const src = fs.readFileSync(path.join(root, rel), "utf8");
  const deps = [];
  const locals = [];
  const body = src
    .replace(/^import\s+React(?:\s*,\s*\{[^}]*\})?\s+from\s+["']react["'];?\s*$/gm, "")
    .replace(/^import\s+\{([^}]+)\}\s+from\s+["'](\.{1,2}\/[^"']+\.jsx)["'];?\s*$/gm, (_, names, spec) => {
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(rel), spec));
      deps.push(target);
      locals.push(...names.split(",").map((n) => n.trim()).filter(Boolean));
      return "";
    })
    .replace(/^import\s+\{([^}]+)\}\s+from\s+["'](\.{1,2}\/[^"']+\.mjs)["'];?\s*$/gm, (_, _names, spec) => {
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(rel), spec));
      const abs = path.join(root, target);
      if (!fs.existsSync(abs)) throw new Error(`build-bundle: ${rel} imports missing ${target}`);
      return fs.readFileSync(abs, "utf8").replace(/^export\s+(function|const|class)\s+/gm, "$1 ") + "\n";
    });
  const exported = [...body.matchAll(/^export\s+(?:function|const)\s+([A-Z]\w*)/gm)].map((m) => m[1]);
  const code = body.replace(/^export\s+(function|const)\s+/gm, "$1 ");
  return { rel, src, deps, locals, exported, code };
});

// Topological order: dependencies first, otherwise family order then name.
const byRel = new Map(parsed.map((p) => [p.rel, p]));
const ordered = [];
const seen = new Set();
function visit(p, stack = []) {
  if (seen.has(p.rel)) return;
  if (stack.includes(p.rel)) throw new Error("build-bundle: import cycle " + [...stack, p.rel].join(" → "));
  for (const d of p.deps) {
    const dep = byRel.get(d);
    if (!dep) throw new Error(`build-bundle: ${p.rel} imports missing ${d}`);
    visit(dep, [...stack, p.rel]);
  }
  seen.add(p.rel);
  ordered.push(p);
}
parsed.forEach((p) => visit(p));

const blocks = ordered.map((p) => {
  const out = Babel.transform(p.code, { presets: [["react", { runtime: "classic" }]], filename: p.rel, compact: false, comments: true }).code;
  const pre = p.locals.length ? `const { ${p.locals.join(", ")} } = __ds_scope;\n` : "";
  return `// ${p.rel}
try { (() => {
${pre}${out}
Object.assign(__ds_scope, { ${p.exported.join(", ")} });
})(); } catch (e) { __ds_ns.__errors.push({ path: "${p.rel}", error: String((e && e.message) || e) }); }
`;
});

const components = ordered.flatMap((p) => p.exported.map((name) => ({ name, sourcePath: p.rel })));
const sourceHashes = Object.fromEntries(ordered.map((p) => [p.rel, crypto.createHash("sha256").update(p.src).digest("hex").slice(0, 12)]));
const header = { format: 4, namespace: NS, components, sourceHashes, inlinedExternals: [], unexposedExports: [] };

const bundle = `/* @ds-bundle: ${JSON.stringify(header)} */

(() => {

const __ds_ns = (window.${NS} = window.${NS} || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

${blocks.join("\n")}
${components.map((c) => `__ds_ns.${c.name} = __ds_scope.${c.name};`).join("\n")}

})();
`;

fs.writeFileSync(path.join(root, "_ds_bundle.js"), bundle);
console.log(`build-bundle: ${components.length} components from ${ordered.length} files → _ds_bundle.js`);
