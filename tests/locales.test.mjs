import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const L = require("../locales.js");

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

test("seven planned locales; only English enabled and source", () => {
  assert.deepEqual(L.PLANNED_CODES, ["en", "ar", "de", "fr", "ru", "hi", "ml"]);
  assert.equal(L.enabledLocales().length, 1);
  assert.equal(L.enabledLocales()[0].code, "en");
  assert.equal(L.sourceLocale().code, "en");
  assert.equal(L.isEnabled("en"), true);
  assert.equal(L.isEnabled("ar"), false);
  assert.equal(L.isRtl("ar"), true);
  assert.equal(L.isRtl("en"), false);
  assert.equal(L.isRtl("hi"), false);
  assert.equal(L.isRtl("ml"), false);
  assert.equal(L.LOCALES.ar.nativeName, "العربية");
  assert.equal(L.LOCALES.de.nativeName, "Deutsch");
  assert.equal(L.LOCALES.fr.nativeName, "Français");
  assert.equal(L.LOCALES.ru.nativeName, "Русский");
  assert.equal(L.LOCALES.hi.nativeName, "हिन्दी");
  assert.equal(L.LOCALES.ml.nativeName, "മലയാളം");
  assert.equal(L.isSupported("it"), false);
  assert.equal(L.isSupported("es"), false);
});

test("/ is x-default and redirects to /en/; /en/ is the English home", () => {
  const rootReq = L.normalizeRequest("/");
  assert.equal(rootReq.action, "redirect");
  assert.equal(rootReq.location, "/en/");
  assert.equal(rootReq.indexable, false);

  const enHome = L.normalizeRequest("/en/");
  assert.equal(enHome.action, "serve");
  assert.equal(enHome.locale, "en");
  assert.equal(enHome.indexable, true);

  const enBare = L.normalizeRequest("/en");
  assert.equal(enBare.action, "redirect");
  assert.equal(enBare.location, "/en/");

  const remembered = L.normalizeRequest("/", { remembered: "en" });
  assert.equal(remembered.location, "/en/");
});

test("locale persist is remembered and browser language only suggests enabled locales", () => {
  const store = new Map();
  const storage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, v),
  };
  assert.equal(L.rememberLocale("ar", storage), null);
  assert.equal(L.rememberLocale("en", storage), "en");
  assert.equal(L.readRememberedLocale(storage), "en");
  assert.equal(L.suggestLocale({ acceptLanguage: "ar,fr;q=0.8", remembered: "en" }), "en");
  assert.equal(L.suggestLocale({ acceptLanguage: "ar-AE,fr" }), "en");
});

test("internal links stay in the current locale", () => {
  assert.equal(L.localePath("en", "programs"), "/en/programs");
  assert.equal(L.localePath("en", "/conditions/diabetes"), "/en/conditions/diabetes");
  assert.equal(L.kitHash("en", "programme"), "#/en/programs");
  assert.equal(L.kitHash("en", "home"), "#/en/");
  assert.equal(L.parseKitHash("#/en/conditions").view, "conditions");
  assert.equal(L.parseKitHash("#/").redirect, "#/en/");
  assert.equal(L.parseKitHash("#/ar/programs").redirect, "#/en/programs");
});

test("lang and dir come from locale architecture", () => {
  assert.equal(L.localeRecord("en").bcp47, "en");
  assert.equal(L.localeRecord("en").direction, "ltr");
  assert.equal(L.localeRecord("ar").bcp47, "ar");
  assert.equal(L.localeRecord("ar").direction, "rtl");
});

test("disabled locales are hidden; no fake localized pages", () => {
  assert.equal(L.languageSelectorVisible({ currentLocale: "en" }), false);
  assert.deepEqual(L.languageSelectorOptions({ currentLocale: "en" }), []);
  const disabled = L.normalizeRequest("/ar/programs");
  assert.equal(disabled.action, "redirect");
  assert.equal(disabled.location, "/en/programs");
  assert.equal(disabled.indexable, false);
  assert.equal(L.equivalentHref("ar", { ar: { path: "programs", translation_status: "draft" } }), null);
  assert.equal(L.equivalentHref("de", { de: { path: "programs", translation_status: "published" } }), null);
});

test("canonical is self-referencing; translations do not canonicalize to English", () => {
  assert.equal(L.canonicalUrl({ origin: "https://shantara.life", locale: "en", path: "programs" }), "https://shantara.life/en/programs");
  assert.equal(L.canonicalUrl({ origin: "https://shantara.life", locale: "ar", path: "programs" }), "https://shantara.life/ar/programs");
});

test("hreflang is reciprocal and only emitted for published equivalents", () => {
  const onlyEn = L.hreflangAlternates({
    origin: "https://shantara.life",
    pageTranslations: { en: { path: "programs", translation_status: "published" } },
  });
  assert.deepEqual(onlyEn.map((l) => l.hreflang), ["en", "x-default"]);
  assert.ok(onlyEn.every((l) => l.href.endsWith("/en/programs")));

  const withDraftAr = L.hreflangAlternates({
    origin: "https://shantara.life",
    pageTranslations: {
      en: { path: "programs", translation_status: "published" },
      ar: { path: "programs", translation_status: "draft" },
    },
  });
  assert.equal(withDraftAr.some((l) => l.hreflang === "ar"), false);
});

test("sitemap lists only published localized pages", () => {
  const entries = L.sitemapEntries({
    origin: "https://shantara.life",
    pages: [
      {
        slug: "programs",
        translations: {
          en: { path: "programs", translation_status: "published", lastmod: "2026-09-01" },
          ar: { path: "programs", translation_status: "draft" },
        },
      },
      { slug: "ghost", translations: { de: { translation_status: "published" } } },
    ],
  });
  assert.equal(entries.length, 1);
  assert.equal(entries[0].loc, "https://shantara.life/en/programs");
  assert.equal(entries[0].lastmod, "2026-09-01");
  assert.ok(entries[0].alternates.some((a) => a.hreflang === "x-default"));
});

test("OpenPanel receives keyed fields and a profile; GA4 omits name, email and phone", () => {
  const calls = [];
  const previousWindow = globalThis.window;
  globalThis.window = {
    gtag(command, eventName, properties) {
      calls.push({ dest: "ga4", command, eventName, properties });
    },
    openpanel: {
      identify(profile) { calls.push({ dest: "identify", profile }); },
      track(eventName, properties) { calls.push({ dest: "openpanel", eventName, properties }); },
    },
    dispatchEvent() {},
  };

  try {
    const lead = L.track("generate_lead", {
      form_id: "consultation",
      full_name: "Ada Lovelace",
      name: "Ada",
      email: "ada@example.com",
      phone: "+910000000000",
      country: "IN",
      notes: "A note",
      diagnosis: "secret",
      question: "Will this help?",
      page_type: "consultation",
    }, { locale: "en" });
    assert.equal(lead.ok, true);
    assert.equal(lead.eventName, "generate_lead");
    assert.equal(lead.properties.locale, "en");
    assert.equal(lead.properties.page_type, "consultation");
    assert.equal(lead.properties.country, "IN");
    assert.equal(lead.properties.name, undefined);
    assert.equal(lead.properties.full_name, undefined);
    assert.equal(lead.properties.email, undefined);
    assert.equal(lead.properties.phone, undefined);
    assert.equal(lead.properties.notes, undefined);
    assert.equal(lead.properties.diagnosis, undefined);
    assert.equal(lead.properties.question, undefined);

    assert.equal(lead.openpanel.full_name, "Ada Lovelace");
    assert.equal(lead.openpanel.name, "Ada");
    assert.equal(lead.openpanel.email, "ada@example.com");
    assert.equal(lead.openpanel.phone, "+910000000000");
    assert.equal(lead.openpanel.country, "IN");
    assert.equal(lead.openpanel.notes, "A note");
    assert.equal(lead.openpanel.locale, "en");
    assert.equal(lead.openpanel.diagnosis, undefined);
    assert.equal(lead.openpanel.question, undefined);

    assert.equal(lead.profile.profileId, "ada@example.com");
    assert.equal(lead.profile.firstName, "Ada Lovelace");
    assert.equal(lead.profile.email, "ada@example.com");
    assert.equal(lead.profile.phone, "+910000000000");
    assert.equal(lead.profile.properties.full_name, "Ada Lovelace");
    assert.equal(lead.profile.properties.notes, "A note");
    assert.equal(lead.profile.properties.country, "IN");
    assert.equal(lead.profile.properties.diagnosis, undefined);
    assert.equal(lead.profile.properties.question, undefined);

    assert.equal(calls.find((call) => call.dest === "ga4").properties.email, undefined);
    assert.equal(calls.find((call) => call.dest === "ga4").properties.phone, undefined);
    assert.equal(calls.find((call) => call.dest === "openpanel").properties.email, "ada@example.com");
    assert.equal(calls.find((call) => call.dest === "identify").profile.profileId, "ada@example.com");
    assert.ok(calls.findIndex((call) => call.dest === "identify") < calls.findIndex((call) => call.dest === "openpanel"));

    const phoneOnly = L.track("generate_lead", { form_id: "consultation", phone: "+91111", page_type: "consultation" }, { locale: "en" });
    assert.equal(phoneOnly.profile.profileId, "+91111");
    assert.equal(phoneOnly.profile.email, undefined);
    assert.equal(phoneOnly.properties.phone, undefined);
    assert.equal(phoneOnly.openpanel.phone, "+91111");

    const namedOnly = L.track("generate_lead", { form_id: "consultation", full_name: "Ada", page_type: "consultation" }, { locale: "en" });
    assert.equal(namedOnly.profile, null);
    assert.equal(namedOnly.openpanel.full_name, "Ada");
    assert.equal(namedOnly.properties.full_name, undefined);

    assert.equal(L.track("consultation_cta_click_ar", {}).ok, false);
    const press = L.track("press_request_submitted", {
      form_id: "press",
      visit_type: "hosted",
      email: "ada@example.com",
      companion_name: "Ada",
      why_shantara: "A story",
    }, { locale: "en" });
    assert.equal(press.ok, true);
    assert.equal(press.properties.visit_type, "hosted");
    assert.equal(press.properties.companion_name, undefined);
    assert.equal(press.properties.why_shantara, undefined);
    assert.equal(press.properties.email, undefined);
    assert.equal(press.openpanel.companion_name, "Ada");
    assert.equal(press.openpanel.why_shantara, "A story");
    assert.equal(press.openpanel.email, "ada@example.com");
    assert.equal(press.profile.profileId, "ada@example.com");
    assert.equal(press.profile.properties.why_shantara, "A story");
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
});

test("form field keys are stable English identifiers", () => {
  assert.deepEqual(L.FORM_FIELD_KEYS, {
    full_name: "full_name",
    phone: "phone",
    email: "email",
    country: "country",
    notes: "notes",
  });
  const ctx = L.leadContext({ locale: "en", source_page: "/en/conditions", page_type: "condition" });
  assert.equal(ctx.locale, "en");
  assert.ok(L.LEAD_CONTEXT_KEYS.every((key) => Object.prototype.hasOwnProperty.call(ctx, key)));
});

test("schema URLs are locale-specific; organization @id is stable", () => {
  const page = L.webpageSchema({ origin: "https://shantara.life", locale: "en", path: "about", name: "About" });
  assert.equal(page.url, "https://shantara.life/en/about");
  assert.equal(page.inLanguage, "en");
  assert.equal(page.about["@id"], "https://shantara.life/#organization");
  assert.equal(L.entityId("https://shantara.life", "doctor", "kareem"), "https://shantara.life/#doctor/kareem");
});

test("currency is not inferred from language", () => {
  assert.throws(() => L.formatCurrency(16000, null, "en"));
  assert.match(L.formatCurrency(16000, "INR", "en", { maximumFractionDigits: 0 }), /16/);
});

test("stale translations and independent publish statuses", () => {
  const rec = L.translationRecord({ locale: "ar", translation_status: "translated", source_version: "1" });
  assert.equal(L.isStaleTranslation("2", rec), true);
  assert.equal(L.canPublishIndependently(rec), true);
  assert.equal(L.mayServeLocalizedPage(rec, "ar"), false);
  assert.equal(L.mayServeLocalizedPage({ translation_status: "published" }, "en"), true);
  assert.equal(L.fallbackPolicy().neverServeEnglishBodyOnLocalizedUrl, true);
});

test("kit and docs do not invent published Arabic pages", () => {
  const kit = readFileSync(join(root, "ui_kits/website/index.html"), "utf8");
  assert.match(kit, /locales\.js/);
  assert.match(kit, /lang="en"/);
  assert.match(kit, /fixtureRtl/);
  assert.doesNotMatch(kit, /#\/ar\/home/);
  const skill = readFileSync(join(root, "ui_kits/website/SKILL.md"), "utf8");
  assert.match(skill, /Multilingual Architecture/);
  assert.match(skill, /العربية/);
  assert.match(skill, /`hi`/);
  assert.match(skill, /`ml`/);
  assert.doesNotMatch(skill, /Italiano/);
  assert.doesNotMatch(skill, /Español/);
});
