# 4. Languages (LANG)

Part of the [search and AI visibility rules](overview.md). Priorities, owner tags and recorded decisions are in the overview.

These rules make [SKILL.md §15](../SKILL.md#section-15) checkable.

- **LANG-01 (P0) [Build]** Every published URL has a locale prefix, including English (`/en/…`). The root `/` is not an indexable page. It redirects to `/en`: a 301 while English is the only enabled locale, and a 302 once the target depends on a remembered locale. **Check:** `curl -I /` shows the redirect. `/en` returns 200 with a self-referencing canonical.
- **LANG-02 (P0) [Build]** hreflang links connect only published equivalents, include the page itself, are reciprocal, and add `x-default` pointing to `/`. **Check:** an automated test confirms every hreflang target returns 200 and links back.
- **LANG-03 (P0) [Build]** Disabled locales publish nothing. While Arabic is disabled, `/ar/` and every `/ar/…` path return 404. No page ever shows an English body under another locale's prefix. **Check:** request `/ar/` and `/ar/programs`. Both return 404.
- **LANG-04 (P0) [Build]** Each translation has its own self-referencing canonical and never points its canonical to English. `html lang`, `dir`, `og:locale` and JSON-LD `inLanguage` match the locale. **Check:** an automated test per enabled locale.
- **LANG-05 (P1) [Clinical]** A translated medical page names who reviewed the translation. JSON-LD `reviewedBy` on a translation names only the people who reviewed that translation, never the English reviewer by default. **Check:** content review of every translated medical page before it publishes.
