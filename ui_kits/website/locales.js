/* Central locale architecture for the Shantara website and design system.
   One config. Seven planned languages, in approved marketing-localisation
   order: en, ar, de, fr, ru, hi, ml.
   English is the source and the only enabled locale until a localisation
   project publishes another. Malayalam (ml) is conditional — see docs/icp.md.
   Italian and Spanish are not current marketing-localisation priorities.

   Browser: window.ShantaraLocales
   Node (tests): module.exports
   Do not duplicate this table. Do not invent public hi/ml copy here. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (typeof root !== "undefined") root.ShantaraLocales = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SOURCE_LOCALE = "en";
  const DEFAULT_LOCALE = "en";
  const STORAGE_KEY = "shantara-locale";
  const SUGGEST_KEY = "shantara-locale-suggested";

  const LOCALES = {
    en: {
      code: "en",
      name: "English",
      nativeName: "English",
      compact: "EN",
      direction: "ltr",
      enabled: true,
      source: true,
      hreflang: "en",
      bcp47: "en",
    },
    ar: {
      code: "ar",
      name: "Arabic",
      nativeName: "العربية",
      compact: "AR",
      direction: "rtl",
      enabled: false,
      source: false,
      hreflang: "ar",
      bcp47: "ar",
    },
    de: {
      code: "de",
      name: "German",
      nativeName: "Deutsch",
      compact: "DE",
      direction: "ltr",
      enabled: false,
      source: false,
      hreflang: "de",
      bcp47: "de",
    },
    fr: {
      code: "fr",
      name: "French",
      nativeName: "Français",
      compact: "FR",
      direction: "ltr",
      enabled: false,
      source: false,
      hreflang: "fr",
      bcp47: "fr",
    },
    ru: {
      code: "ru",
      name: "Russian",
      nativeName: "Русский",
      compact: "RU",
      direction: "ltr",
      enabled: false,
      source: false,
      hreflang: "ru",
      bcp47: "ru",
    },
    hi: {
      code: "hi",
      name: "Hindi",
      nativeName: "हिन्दी",
      compact: "HI",
      direction: "ltr",
      enabled: false,
      source: false,
      hreflang: "hi",
      bcp47: "hi",
    },
    ml: {
      code: "ml",
      name: "Malayalam",
      nativeName: "മലയാളം",
      compact: "ML",
      direction: "ltr",
      enabled: false,
      source: false,
      hreflang: "ml",
      bcp47: "ml",
    },
  };

  const PLANNED_CODES = ["en", "ar", "de", "fr", "ru", "hi", "ml"];

  const TRANSLATION_STATUSES = ["draft", "translated", "review_required", "published"];

  const ANALYTICS_EVENTS = [
    "consultation_cta_click",
    "form_start",
    "generate_lead",
    "contact_click",
    "press_request_submitted",
  ];

  const OPTIONAL_ANALYTICS_EVENTS = ["video_start", "video_complete"];

  const PII_KEYS = new Set([
    "name",
    "full_name",
    "email",
    "phone",
    "mobile",
    "notes",
    "message",
    "free_text",
    "companion_name",
    "outlet",
    "profile_url",
    "audience",
    "work_links",
    "why_shantara",
    "deliverables",
    "other_guests",
    "media_kit",
    "diagnosis",
    "symptoms",
    "medication",
    "medications",
    "medical_history",
    "health",
  ]);

  const FORM_FIELD_KEYS = {
    full_name: "full_name",
    phone: "phone",
    email: "email",
    country: "country",
    notes: "notes",
  };

  const LEAD_CONTEXT_KEYS = [
    "locale",
    "source_page",
    "page_type",
    "content_id",
    "content_name",
    "landing_page",
    "referrer",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "timestamp",
  ];

  const KIT_VIEWS = {
    home: "",
    conditions: "conditions",
    programme: "programs",
    programs: "programs",
    experience: "experience",
    about: "about",
    journal: "journal",
    contact: "contact",
    booking: "book-consultation",
    consultation: "book-consultation",
    tariffs: "tariffs",
    /* Single Journal article. Navigate with "article:<slug>"; bare "article" opens the sample. */
    article: "journal/how-meals-are-planned",
  };

  const ARTICLE_PREFIX = "journal/";

  const VIEW_FROM_PATH = {
    "": "home",
    conditions: "conditions",
    programs: "programme",
    programmes: "programme",
    experience: "experience",
    about: "about",
    journal: "journal",
    contact: "contact",
    "book-consultation": "booking",
    booking: "booking",
    tariffs: "tariffs",
  };

  function localeRecord(code) {
    if (!code) return null;
    const key = String(code).toLowerCase().split("-")[0];
    return LOCALES[key] || null;
  }

  function isSupported(code) {
    return !!localeRecord(code);
  }

  function isEnabled(code) {
    const rec = localeRecord(code);
    return !!(rec && rec.enabled);
  }

  function isRtl(code) {
    const rec = localeRecord(code);
    return !!(rec && rec.direction === "rtl");
  }

  function supportedLocales() {
    return PLANNED_CODES.map((code) => LOCALES[code]);
  }

  function enabledLocales() {
    return supportedLocales().filter((rec) => rec.enabled);
  }

  function sourceLocale() {
    return LOCALES[SOURCE_LOCALE];
  }

  function normalizePathname(pathname) {
    if (!pathname || pathname === "/") return "/";
    let path = String(pathname).trim();
    if (!path.startsWith("/")) path = "/" + path;
    path = path.replace(/\/{2,}/g, "/");
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
    return path;
  }

  function localeHomePath(code) {
    return "/" + (localeRecord(code) || LOCALES[DEFAULT_LOCALE]).code + "/";
  }

  function localePath(code, path) {
    const rec = localeRecord(code) || LOCALES[DEFAULT_LOCALE];
    const rest = String(path || "").replace(/^\/+|\/+$/g, "");
    if (!rest) return localeHomePath(rec.code);
    return "/" + rec.code + "/" + rest;
  }

  function parseLocalePath(pathname) {
    const raw = String(pathname || "/");
    if (raw === "/" || raw === "") {
      return { locale: null, path: "/", rest: "", isRoot: true, isLocaleHome: false };
    }
    const parts = raw.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
    const first = parts[0];
    if (isSupported(first)) {
      const restParts = parts.slice(1);
      const rest = restParts.join("/");
      return {
        locale: first,
        path: rest ? "/" + first + "/" + rest : localeHomePath(first),
        rest,
        isRoot: false,
        isLocaleHome: restParts.length === 0,
      };
    }
    return { locale: null, path: normalizePathname(raw), rest: parts.join("/"), isRoot: false, isLocaleHome: false };
  }

  function resolveRootRedirect(options) {
    const remembered = options && options.remembered;
    if (remembered && isEnabled(remembered)) return localeHomePath(remembered);
    return localeHomePath(DEFAULT_LOCALE);
  }

  function suggestLocale(options) {
    const remembered = options && options.remembered;
    if (remembered && isEnabled(remembered)) return remembered;
    const accept = (options && options.acceptLanguage) || "";
    const tags = String(accept)
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase().split("-")[0])
      .filter(Boolean);
    for (const tag of tags) {
      if (isEnabled(tag)) return tag;
    }
    return DEFAULT_LOCALE;
  }

  function rememberLocale(code, storage) {
    const rec = localeRecord(code);
    if (!rec || !rec.enabled) return null;
    const store = storage || (typeof localStorage !== "undefined" ? localStorage : null);
    try {
      if (store) store.setItem(STORAGE_KEY, rec.code);
    } catch (err) {
      /* private mode */
    }
    return rec.code;
  }

  function readRememberedLocale(storage) {
    const store = storage || (typeof localStorage !== "undefined" ? localStorage : null);
    try {
      const value = store && store.getItem(STORAGE_KEY);
      return value && isEnabled(value) ? value : null;
    } catch (err) {
      return null;
    }
  }

  function shouldSuggestOnce(storage) {
    const store = storage || (typeof localStorage !== "undefined" ? localStorage : null);
    try {
      return !!(store && !store.getItem(STORAGE_KEY) && !store.getItem(SUGGEST_KEY));
    } catch (err) {
      return false;
    }
  }

  function markSuggested(storage) {
    const store = storage || (typeof localStorage !== "undefined" ? localStorage : null);
    try {
      if (store) store.setItem(SUGGEST_KEY, "1");
    } catch (err) {
      /* private mode */
    }
  }

  function normalizeRequest(pathname, options) {
    const parsed = parseLocalePath(pathname);
    const opts = options || {};
    const trailing = pathname && String(pathname).length > 1 && String(pathname).endsWith("/");

    if (parsed.isRoot) {
      return {
        action: "redirect",
        status: 302,
        location: resolveRootRedirect(opts),
        indexable: false,
        reason: "x-default-entry",
      };
    }

    if (!parsed.locale) {
      return {
        action: "redirect",
        status: 301,
        location: localePath(DEFAULT_LOCALE, parsed.rest),
        indexable: false,
        reason: "missing-locale-prefix",
      };
    }

    if (!isEnabled(parsed.locale)) {
      return {
        action: "redirect",
        status: 302,
        location: localePath(DEFAULT_LOCALE, parsed.rest),
        indexable: false,
        reason: "locale-not-enabled",
      };
    }

    if (parsed.isLocaleHome && !trailing && pathname !== localeHomePath(parsed.locale)) {
      return {
        action: "redirect",
        status: 301,
        location: localeHomePath(parsed.locale),
        indexable: false,
        reason: "locale-home-slash",
      };
    }

    if (!parsed.isLocaleHome && trailing) {
      return {
        action: "redirect",
        status: 301,
        location: localePath(parsed.locale, parsed.rest),
        indexable: false,
        reason: "strip-trailing-slash",
      };
    }

    return {
      action: "serve",
      status: 200,
      location: parsed.isLocaleHome ? localeHomePath(parsed.locale) : localePath(parsed.locale, parsed.rest),
      locale: parsed.locale,
      rest: parsed.rest,
      indexable: true,
      reason: "ok",
    };
  }

  function isPublishedTranslation(record) {
    if (!record) return false;
    if (record.published === false) return false;
    if (record.indexable === false) return false;
    const status = record.translation_status || record.status;
    if (status && status !== "published") return false;
    return true;
  }

  function equivalentHref(locale, pageTranslations) {
    const rec = localeRecord(locale);
    if (!rec || !rec.enabled) return null;
    const map = pageTranslations || {};
    const entry = map[rec.code];
    if (!entry) return null;
    if (!isPublishedTranslation(entry)) return null;
    if (entry.path) return localePath(rec.code, String(entry.path).replace(/^\/([a-z]{2})\//, ""));
    if (entry.slug) return localePath(rec.code, entry.slug);
    return localeHomePath(rec.code);
  }

  function languageSelectorOptions(options) {
    const opts = options || {};
    const current = localeRecord(opts.currentLocale) || LOCALES[DEFAULT_LOCALE];
    const translations = opts.pageTranslations || null;
    const enabled = enabledLocales();
    if (enabled.length <= 1) return [];
    return enabled
      .map((rec) => {
        const href = translations ? equivalentHref(rec.code, translations) : localePath(rec.code, opts.rest || "");
        const available = translations ? href != null : true;
        if (translations && !available && opts.includeUnavailable !== true) return null;
        return {
          code: rec.code,
          nativeName: rec.nativeName,
          compact: rec.compact,
          direction: rec.direction,
          current: rec.code === current.code,
          href,
          available,
        };
      })
      .filter(Boolean);
  }

  function languageSelectorVisible(options) {
    return languageSelectorOptions(options || {}).length > 1;
  }

  function hreflangAlternates(options) {
    const opts = options || {};
    const origin = String(opts.origin || "").replace(/\/$/, "");
    const translations = opts.pageTranslations || {};
    const xDefaultLocale = opts.xDefaultLocale || DEFAULT_LOCALE;
    const links = [];

    for (const rec of supportedLocales()) {
      if (!rec.enabled) continue;
      const href = equivalentHref(rec.code, translations);
      if (!href) continue;
      links.push({ hreflang: rec.hreflang, href: origin + href });
    }

    const xDefault = equivalentHref(xDefaultLocale, translations);
    if (xDefault) links.push({ hreflang: "x-default", href: origin + xDefault });

    return links;
  }

  function canonicalUrl(options) {
    const opts = options || {};
    const origin = String(opts.origin || "").replace(/\/$/, "");
    const locale = localeRecord(opts.locale) || LOCALES[DEFAULT_LOCALE];
    const path = opts.path || "";
    return origin + localePath(locale.code, path);
  }

  function sitemapEntries(options) {
    const opts = options || {};
    const origin = String(opts.origin || "").replace(/\/$/, "");
    const pages = opts.pages || [];
    const entries = [];

    for (const page of pages) {
      const translations = page.translations || {};
      const publishedLocales = PLANNED_CODES.filter((code) => isEnabled(code) && isPublishedTranslation(translations[code]));
      if (!publishedLocales.length) continue;

      for (const code of publishedLocales) {
        const rec = translations[code];
        const path = rec.path || rec.slug || page.slug || "";
        const loc = origin + localePath(code, path);
        const alternates = publishedLocales.map((alt) => ({
          hreflang: LOCALES[alt].hreflang,
          href: origin + localePath(alt, (translations[alt].path || translations[alt].slug || page.slug || "")),
        }));
        const xDefault = origin + localePath(DEFAULT_LOCALE, (translations[DEFAULT_LOCALE] && (translations[DEFAULT_LOCALE].path || translations[DEFAULT_LOCALE].slug)) || page.slug || "");
        alternates.push({ hreflang: "x-default", href: xDefault });
        entries.push({
          loc,
          lastmod: rec.lastmod || rec.last_translated_at || rec.updated_at || page.updated_at || null,
          alternates,
        });
      }
    }

    return entries;
  }

  function organizationId(origin) {
    return String(origin || "https://shantara.life").replace(/\/$/, "") + "/#organization";
  }

  function webpageSchema(options) {
    const opts = options || {};
    const locale = localeRecord(opts.locale) || LOCALES[DEFAULT_LOCALE];
    const origin = String(opts.origin || "https://shantara.life").replace(/\/$/, "");
    const url = opts.url || canonicalUrl({ origin, locale: locale.code, path: opts.path || "" });
    return {
      "@context": "https://schema.org",
      "@type": opts.type || "WebPage",
      "@id": url + "#webpage",
      url,
      inLanguage: locale.bcp47,
      name: opts.name,
      description: opts.description,
      isPartOf: { "@id": origin + "/#website" },
      about: { "@id": organizationId(origin) },
    };
  }

  /* MedicalClinic (a LocalBusiness subtype) organisation node. NAP name is always "Shantara Naturopathy Retreat"
     (copy/naming-and-nap.md); telephone is the public call number. legalName is omitted when empty (SCHEMA-14). */
  function organizationSchema(options) {
    const opts = options || {};
    const site = opts.site || {};
    const origin = String(opts.origin || "https://shantara.life").replace(/\/$/, "");
    const place = site.place || {};
    return {
      "@context": "https://schema.org",
      "@type": (site.schema_defaults && site.schema_defaults.type) || "MedicalClinic",
      "@id": organizationId(origin),
      name: site.business_name || "Shantara Naturopathy Retreat",
      legalName: site.legal_name || undefined,
      url: origin + "/",
      telephone: (site.phone && site.phone[0]) || "+91 9553 600 100",
      email: site.email || "heal@shantara.life",
      parentOrganization: site.parent_institution ? { "@type": "Organization", name: site.parent_institution } : undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: place.street || "Chennamangallur",
        addressLocality: place.locality || "Kozhikode",
        addressRegion: place.region || "Keralam",
        postalCode: place.postal_code || "673602",
        addressCountry: place.country || "IN",
      },
    };
  }

  function entityId(origin, kind, id) {
    return String(origin || "https://shantara.life").replace(/\/$/, "") + "/#" + kind + "/" + id;
  }

  function formatDate(value, locale, options) {
    const rec = localeRecord(locale) || LOCALES[DEFAULT_LOCALE];
    return new Intl.DateTimeFormat(rec.bcp47, options || { dateStyle: "medium" }).format(value instanceof Date ? value : new Date(value));
  }

  function formatNumber(value, locale, options) {
    const rec = localeRecord(locale) || LOCALES[DEFAULT_LOCALE];
    return new Intl.NumberFormat(rec.bcp47, options).format(value);
  }

  function formatList(items, locale, options) {
    const rec = localeRecord(locale) || LOCALES[DEFAULT_LOCALE];
    if (typeof Intl.ListFormat === "function") {
      return new Intl.ListFormat(rec.bcp47, options || { type: "conjunction" }).format(items);
    }
    return items.join(", ");
  }

  function formatCurrency(amount, currency, locale, options) {
    if (!currency) {
      throw new Error("Currency is not language. Pass an explicit ISO currency code; do not infer INR from English or AED from Arabic.");
    }
    const rec = localeRecord(locale) || LOCALES[DEFAULT_LOCALE];
    return new Intl.NumberFormat(rec.bcp47, { style: "currency", currency, ...(options || {}) }).format(amount);
  }

  function isolateLtr(value) {
    return String(value == null ? "" : value);
  }

  function translationRecord(fields) {
    const src = fields || {};
    return {
      locale: src.locale || SOURCE_LOCALE,
      translation_status: src.translation_status || (src.locale === SOURCE_LOCALE ? "published" : "draft"),
      source_version: src.source_version || null,
      last_translated_at: src.last_translated_at || null,
      translation_reviewed_at: src.translation_reviewed_at || null,
      translation_reviewed_by: src.translation_reviewed_by || null,
      needs_translation_review: src.needs_translation_review === true,
      source_medically_reviewed_at: src.source_medically_reviewed_at || null,
      source_medically_reviewed_by: src.source_medically_reviewed_by || null,
      localized_clinically_reviewed_at: src.localized_clinically_reviewed_at || null,
      localized_clinically_reviewed_by: src.localized_clinically_reviewed_by || null,
      language_reviewed_at: src.language_reviewed_at || null,
      language_reviewed_by: src.language_reviewed_by || null,
    };
  }

  function isStaleTranslation(sourceVersion, translation) {
    if (!translation) return true;
    if (translation.needs_translation_review) return true;
    if (sourceVersion != null && translation.source_version != null && String(sourceVersion) !== String(translation.source_version)) return true;
    return false;
  }

  function canPublishIndependently(translation) {
    if (!translation) return false;
    return TRANSLATION_STATUSES.includes(translation.translation_status);
  }

  function mayServeLocalizedPage(translation, locale) {
    const rec = localeRecord(locale);
    if (!rec || !rec.enabled) return false;
    return isPublishedTranslation(translation);
  }

  function fallbackPolicy() {
    return {
      missingTranslation: "omit-or-offer-english",
      neverMix: true,
      neverServeEnglishBodyOnLocalizedUrl: true,
      internalLinksStayInLocale: true,
      collectionsUseCurrentLocale: true,
    };
  }

  function stripPii(properties) {
    const out = {};
    const src = properties || {};
    for (const key of Object.keys(src)) {
      if (PII_KEYS.has(key)) continue;
      out[key] = src[key];
    }
    return out;
  }

  function withLocale(properties, locale) {
    const rec = localeRecord(locale) || LOCALES[DEFAULT_LOCALE];
    return { ...(properties || {}), locale: rec.code };
  }

  function track(eventName, properties, options) {
    const opts = options || {};
    const allowed = ANALYTICS_EVENTS.includes(eventName) || OPTIONAL_ANALYTICS_EVENTS.includes(eventName);
    if (!allowed) {
      return { ok: false, reason: "unknown-event", eventName };
    }
    const locale = (opts.locale && localeRecord(opts.locale)?.code) || DEFAULT_LOCALE;
    const payload = withLocale(stripPii(properties), locale);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("shantara:track", { detail: { eventName, properties: payload } }));
      if (typeof window.gtag === "function") window.gtag("event", eventName, payload);
      if (window.openpanel && typeof window.openpanel.track === "function") window.openpanel.track(eventName, payload);
    }
    return { ok: true, eventName, properties: payload };
  }

  function leadContext(fields) {
    const src = fields || {};
    const locale = localeRecord(src.locale) || LOCALES[DEFAULT_LOCALE];
    return {
      locale: locale.code,
      source_page: src.source_page || "",
      page_type: src.page_type || "",
      content_id: src.content_id || "",
      content_name: src.content_name || "",
      landing_page: src.landing_page || "",
      referrer: src.referrer || "",
      utm_source: src.utm_source || "",
      utm_medium: src.utm_medium || "",
      utm_campaign: src.utm_campaign || "",
      timestamp: src.timestamp || new Date().toISOString(),
    };
  }

  function applyDocumentLocale(code, doc) {
    const rec = localeRecord(code) || LOCALES[DEFAULT_LOCALE];
    const target = doc || (typeof document !== "undefined" ? document : null);
    if (!target || !target.documentElement) return rec;
    target.documentElement.lang = rec.bcp47;
    target.documentElement.dir = rec.direction;
    if (target.body) {
      target.body.lang = rec.bcp47;
      target.body.dir = rec.direction;
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("shantara:locale", { detail: { locale: rec.code, dir: rec.direction } }));
      window.dispatchEvent(new CustomEvent("shantara:dir", { detail: { dir: rec.direction } }));
    }
    return rec;
  }

  function kitViewPath(view, slug) {
    const v = String(view || "");
    if (v === "article" && slug) return ARTICLE_PREFIX + slug;
    if (v.indexOf("article:") === 0) return ARTICLE_PREFIX + v.slice(8);
    return KIT_VIEWS[v] != null ? KIT_VIEWS[v] : v;
  }

  /* "journal/<slug>" → the article view (slug from articleSlugFromPath). */
  function articleSlugFromPath(rest) {
    const key = String(rest || "").replace(/^\/+|\/+$/g, "");
    const m = key.match(/^journal\/([a-z0-9-]+)$/);
    return m ? m[1] : null;
  }

  function kitViewFromPath(rest) {
    const key = String(rest || "").replace(/^\/+|\/+$/g, "");
    if (articleSlugFromPath(key)) return "article";
    return VIEW_FROM_PATH[key] || (key ? null : "home");
  }

  function kitHash(locale, view, slug) {
    const rec = localeRecord(locale) || LOCALES[DEFAULT_LOCALE];
    const rest = kitViewPath(view, slug);
    return rest ? "#/" + rec.code + "/" + rest : "#/" + rec.code + "/";
  }

  function parseKitHash(hash) {
    const raw = String(hash || "").replace(/^#/, "") || "/";
    const parsed = parseLocalePath(raw);
    if (parsed.isRoot || !parsed.locale) {
      return { locale: DEFAULT_LOCALE, view: "home", redirect: kitHash(DEFAULT_LOCALE, "home") };
    }
    const slug = articleSlugFromPath(parsed.rest);
    if (!isEnabled(parsed.locale)) {
      return { locale: DEFAULT_LOCALE, view: kitViewFromPath(parsed.rest) || "home", slug, redirect: kitHash(DEFAULT_LOCALE, kitViewFromPath(parsed.rest) || "home", slug) };
    }
    const view = kitViewFromPath(parsed.rest);
    if (!view) {
      return { locale: parsed.locale, view: "home", redirect: kitHash(parsed.locale, "home") };
    }
    return { locale: parsed.locale, view, slug, redirect: null };
  }

  return {
    LOCALES,
    PLANNED_CODES,
    SOURCE_LOCALE,
    DEFAULT_LOCALE,
    STORAGE_KEY,
    TRANSLATION_STATUSES,
    ANALYTICS_EVENTS,
    FORM_FIELD_KEYS,
    LEAD_CONTEXT_KEYS,
    localeRecord,
    isSupported,
    isEnabled,
    isRtl,
    supportedLocales,
    enabledLocales,
    sourceLocale,
    normalizePathname,
    localeHomePath,
    localePath,
    parseLocalePath,
    resolveRootRedirect,
    suggestLocale,
    rememberLocale,
    readRememberedLocale,
    shouldSuggestOnce,
    markSuggested,
    normalizeRequest,
    isPublishedTranslation,
    equivalentHref,
    languageSelectorOptions,
    languageSelectorVisible,
    hreflangAlternates,
    canonicalUrl,
    sitemapEntries,
    organizationId,
    webpageSchema,
    entityId,
    formatDate,
    formatNumber,
    formatList,
    formatCurrency,
    isolateLtr,
    translationRecord,
    isStaleTranslation,
    canPublishIndependently,
    mayServeLocalizedPage,
    fallbackPolicy,
    stripPii,
    withLocale,
    track,
    leadContext,
    applyDocumentLocale,
    kitViewPath,
    kitViewFromPath,
    articleSlugFromPath,
    organizationSchema,
    kitHash,
    parseKitHash,
  };
});
