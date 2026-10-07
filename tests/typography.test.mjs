import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "tokens", "typography.css"), "utf8");

function fluid(name) {
  const m = css.match(new RegExp(`--text-heading-${name}:calc\\(clamp\\(([\\d.]+)px, ([\\d.]+)vw \\+ ([\\d.]+)px, ([\\d.]+)px\\)`));
  assert.ok(m, `--text-heading-${name} is a clamp()`);
  const [min, vw, px, max] = m.slice(1).map(Number);
  return (width) => Math.min(max, Math.max(min, (vw * width) / 100 + px));
}

function fixed(name) {
  const m = css.match(new RegExp(`--text-${name}:calc\\(([\\d.]+)px`));
  assert.ok(m, `--text-${name} is set in px`);
  return () => Number(m[1]);
}

test("each heading level is larger than the next at every viewport width", () => {
  const levels = [["display", fluid("display")], ["h1", fluid("h1")], ["h2", fluid("h2")], ["h3", fluid("h3")], ["h4", fixed("xl")]];
  for (let width = 320; width <= 1920; width += 10) {
    for (let i = 0; i < levels.length - 1; i++) {
      const [upper, a] = levels[i];
      const [lower, b] = levels[i + 1];
      assert.ok(a(width) >= b(width), `${upper} (${a(width)}px) < ${lower} (${b(width)}px) at ${width}px`);
    }
  }
});

test("title, statement and item roles point at the heading levels", () => {
  assert.match(css, /--type-h3:[^;]*var\(--text-heading-h3\)/);
  assert.match(css, /--type-statement:var\(--type-h2\)/);
  assert.match(css, /--type-title:var\(--type-h3\)/);
  assert.match(css, /--type-item-sm:var\(--weight-medium\) var\(--text-base\)/);
});
