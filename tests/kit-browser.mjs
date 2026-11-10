/* Optional smoke: node tests/kit-browser.mjs
   Requires Playwright + a browser channel (chrome). Skips if unavailable. */
import { createRequire } from "node:module";

let chromium;
try {
  const require = createRequire(import.meta.url);
  ({ chromium } = require("playwright"));
} catch {
  console.log("skip: playwright not installed in this repo");
  process.exit(0);
}

const base = "http://localhost:4173/ui_kits/website/index.html";
let browser;
try {
  browser = await chromium.launch({ headless: true, channel: "chrome" });
} catch (err) {
  console.log("skip: no chrome channel —", err.message.split("\n")[0]);
  process.exit(0);
}

const errors = [];

async function run(name, width, url) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const consoleErrors = [];
  page.on("pageerror", (err) => consoleErrors.push(String(err)));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const state = await page.evaluate(() => ({
    hash: location.hash,
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    /* Visible selector only: under 1000px it lives in the menu sheet, hidden in the header. */
    selector: [...document.querySelectorAll(".sh-lang-btn")].some((el) => el.getClientRects().length > 0),
    fixture: !!document.querySelector(".sh-rtl-fixture") || document.documentElement.getAttribute("data-rtl-fixture") === "1",
    nav: [...document.querySelectorAll("header nav a")].map((a) => a.getAttribute("href")),
    navCount: document.querySelectorAll("header nav a").length,
  }));
  console.log(name, JSON.stringify(state));
  if (consoleErrors.length) errors.push(name + " console: " + consoleErrors.join(" | "));
  await page.close();
  return state;
}

try {
  const en = await run("en-desktop", 1280, base);
  if (en.hash !== "#/en/") errors.push("root did not become #/en/");
  if (en.lang !== "en" || en.dir !== "ltr") errors.push("en lang/dir wrong");
  /* The selector always renders (unavailable languages are listed disabled, "Coming soon"). */
  if (!en.nav.every((h) => h && h.startsWith("#/en/"))) errors.push("nav hrefs not locale-prefixed");
  if (en.navCount > 5) errors.push("header nav has more than five items");
  if (!en.selector) errors.push("language selector not visible in the desktop header");

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(base + "#/en/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.getByRole("link", { name: "Conditions" }).first().click();
  await page.waitForTimeout(400);
  const afterNav = await page.evaluate(() => location.hash);
  if (afterNav !== "#/en/conditions") errors.push("conditions hash " + afterNav);
  await page.getByRole("button", { name: "Make an Inquiry" }).first().click();
  await page.waitForTimeout(500);
  const form = await page.evaluate(() => ({
    hash: location.hash,
    names: [...document.querySelectorAll("input[name], select[name], textarea[name]")].map((el) => el.name),
    locale: document.querySelector('input[name="locale"]')?.value,
  }));
  console.log("form", form);
  for (const key of ["full_name", "phone", "email", "country", "notes", "locale"]) {
    if (!form.names.includes(key)) errors.push("missing field " + key);
  }
  if (form.hash !== "#/en/make-an-inquiry") errors.push("booking hash " + form.hash);
  await page.goto(base + "#/en/journal/how-meals-are-planned", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const art = await page.evaluate(() => ({ hash: location.hash, h1: document.querySelector("h1")?.textContent }));
  if (art.hash !== "#/en/journal/how-meals-are-planned" || !art.h1) errors.push("article route " + JSON.stringify(art));
  await page.close();

  const rtl = await run("rtl-fixture", 390, "http://localhost:4173/ui_kits/website/?fixture=rtl#/en/");
  if (rtl.dir !== "rtl") errors.push("rtl fixture dir " + rtl.dir);
  if (rtl.selector) errors.push("selector shown in rtl fixture");
  if (rtl.hash !== "#/en/") errors.push("rtl fixture must stay on /en/ not a fake /ar/ page");

  if (errors.length) {
    console.error("FAIL\n" + errors.join("\n"));
    process.exit(1);
  }
  console.log("browser checks ok");
} finally {
  if (browser) await browser.close();
}
