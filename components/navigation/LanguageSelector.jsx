import React from "react";

const CSS_ID = "sh-lang-css";

function localesApi() {
  return (typeof window !== "undefined" && window.ShantaraLocales) || null;
}

function i18n() {
  return (typeof window !== "undefined" && window.ShantaraI18n) || { t: (s) => s };
}

const CSS = `
.sh-lang{position:relative;display:inline-flex;align-items:center;font-family:var(--font-body)}
.sh-lang-btn{appearance:none;display:inline-flex;align-items:center;gap:6px;min-height:var(--tap-min);min-width:var(--tap-min);padding:0 var(--space-3);border:0;border-radius:var(--radius-xs);background:transparent;color:var(--text-secondary);font:var(--weight-medium) var(--text-xs)/1 var(--font-body);letter-spacing:var(--tracking-wide);cursor:pointer;transition:var(--transition-control)}
.sh-lang-btn svg{flex:0 0 auto;display:block}
.sh-lang-chev{transition:transform var(--duration-fast) var(--ease-out)}
.sh-lang-btn[aria-expanded="true"] .sh-lang-chev{transform:rotate(180deg)}
.sh-lang-btn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-lang-btn[aria-expanded="true"]{color:var(--text-primary)}
.sh-lang-list{position:absolute;inset-block-start:100%;inset-inline-end:0;z-index:40;margin:var(--space-2) 0 0;min-width:15rem;padding:var(--space-2);background:var(--surface-card);border:var(--border-width) solid var(--border-subtle);border-radius:var(--radius-card);box-shadow:var(--shadow-md);list-style:none;animation:sh-enter-up var(--duration-fast) var(--ease-out);
  --text-primary:var(--color-pine-tree);--text-muted:var(--color-stone-500);--text-brand:var(--color-himalaya);--border-subtle:color-mix(in srgb, var(--color-pine-tree) 10%, transparent);--ring-focus:0 0 0 2px var(--color-white), 0 0 0 4px var(--color-himalaya);color:var(--text-primary)}
.sh-lang-opt{display:flex;align-items:center;justify-content:space-between;gap:var(--space-5);width:100%;min-height:var(--tap-min);padding:var(--space-3) var(--space-4);appearance:none;border:0;border-radius:var(--radius-xs);background:transparent;color:var(--text-primary);text-align:start;text-decoration:none;font:var(--weight-regular) var(--text-sm)/1.3 var(--font-body);letter-spacing:0;cursor:pointer}
.sh-lang-opt[aria-selected="true"]{font-weight:var(--weight-medium);background:var(--surface-raised)}
.sh-lang-opt:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-lang-opt[aria-disabled="true"]{color:var(--text-muted);cursor:not-allowed}
.sh-lang-note{flex:0 0 auto;font:var(--weight-regular) var(--text-2xs)/1.2 var(--font-body);color:var(--text-muted)}
.sh-lang-tick{flex:0 0 auto;color:var(--text-brand)}
@media (hover: hover) and (pointer: fine){
  .sh-lang-btn:hover{color:var(--text-primary);background:color-mix(in srgb, var(--text-primary) 5%, transparent)}
  .sh-lang-opt:not([aria-disabled="true"]):hover{background:var(--surface-raised)}
}
[data-ground="himalaya"] .sh-lang-btn,[data-ground="pine"] .sh-lang-btn,[data-ground="photo"] .sh-lang-btn{color:var(--text-primary)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById(CSS_ID)) return;
  const el = document.createElement("style");
  el.id = CSS_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* Planned site languages (ui_kits/website/locales.js). Used only when locales.js is not
   loaded (e.g. in the catalog), so the control can always be seen. */
const PLANNED = [
  { code: "en", nativeName: "English", compact: "EN", direction: "ltr", enabled: true },
  { code: "ar", nativeName: "العربية", compact: "AR", direction: "rtl", enabled: false },
  { code: "de", nativeName: "Deutsch", compact: "DE", direction: "ltr", enabled: false },
  { code: "fr", nativeName: "Français", compact: "FR", direction: "ltr", enabled: false },
  { code: "ru", nativeName: "Русский", compact: "RU", direction: "ltr", enabled: false },
  { code: "hi", nativeName: "हिन्दी", compact: "HI", direction: "ltr", enabled: false },
  { code: "ml", nativeName: "മലയാളം", compact: "ML", direction: "ltr", enabled: false },
];

/* Every planned language, always: enabled ones link to the equivalent page, the rest are
   listed disabled with "Coming soon". The control never hides itself. */
function buildOptions(api, current, pageTranslations, rest) {
  const records = api && api.supportedLocales ? api.supportedLocales() : PLANNED;
  const live = api ? api.languageSelectorOptions({ currentLocale: current.code, pageTranslations, rest, includeUnavailable: true }) : [];
  return records.map((rec) => {
    const hit = live.find((o) => o.code === rec.code);
    if (hit) return hit;
    const enabled = rec.enabled !== false;
    const isCurrent = rec.code === current.code;
    const href = enabled && api && api.localePath ? api.localePath(rec.code, rest || "") : null;
    return {
      code: rec.code,
      nativeName: rec.nativeName,
      compact: rec.compact,
      direction: rec.direction,
      current: isCurrent,
      href,
      available: isCurrent || enabled,
      comingSoon: !enabled,
    };
  });
}

const GLOBE = <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.25" /><path d="M1.75 8h12.5M8 1.75c1.8 1.9 2.6 4 2.6 6.25S9.8 12.35 8 14.25C6.2 12.35 5.4 10.25 5.4 8S6.2 3.65 8 1.75z" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" /></svg>;
const CHEV = <svg className="sh-lang-chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const TICK = <svg className="sh-lang-tick" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.25l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function LanguageSelector({
  locale,
  pageTranslations,
  rest = "",
  onSelect,
  compact = true,
  label,
  comingSoonLabel,
  defaultOpen = false,
  options: optionsProp,
  style,
  ...restProps
}) {
  ensure();
  const api = localesApi();
  const { t } = i18n();
  const fallback = PLANNED.find((p) => p.code === locale) || PLANNED[0];
  const current = (api && api.localeRecord(locale)) || fallback;
  const options = optionsProp || buildOptions(api, current, pageTranslations, rest);
  const [open, setOpen] = React.useState(defaultOpen);
  const root = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (event) => {
      if (root.current && !root.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const accessibleName = label || t("Language");
  const triggerLabel = compact ? current.compact : current.nativeName;

  return (
    <div ref={root} className="sh-lang" data-ds-id="navigation/LanguageSelector" style={style} {...restProps}>
      <button
        type="button"
        className="sh-lang-btn"
        aria-label={`${accessibleName}: ${current.nativeName}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {GLOBE}
        <span>{triggerLabel}</span>
        {CHEV}
      </button>
      {open ? (
        <ul className="sh-lang-list" role="listbox" aria-label={t("Choose language")}>
          {options.map((opt) => {
            const selected = opt.current;
            const disabled = !selected && (opt.available === false || opt.comingSoon === true);
            const Tag = opt.href && !disabled && !onSelect ? "a" : "button";
            return (
              <li key={opt.code} role="none">
                <Tag
                  className="sh-lang-opt"
                  role="option"
                  lang={opt.code}
                  href={Tag === "a" ? opt.href : undefined}
                  hrefLang={Tag === "a" ? opt.code : undefined}
                  aria-selected={selected}
                  aria-current={selected ? "true" : undefined}
                  aria-disabled={disabled || undefined}
                  disabled={Tag === "button" ? disabled : undefined}
                  type={Tag === "button" ? "button" : undefined}
                  onClick={(event) => {
                    if (disabled) {
                      event.preventDefault();
                      return;
                    }
                    setOpen(false);
                    if (onSelect) {
                      event.preventDefault();
                      onSelect(opt.code, opt);
                    }
                  }}
                >
                  <span>{opt.nativeName}</span>
                  {selected ? TICK : disabled ? <span className="sh-lang-note">{comingSoonLabel || t("Coming soon")}</span> : null}
                </Tag>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

if (typeof window !== "undefined") {
  const ns = window.ShantaraDesignSystem_45bbe4 || (window.ShantaraDesignSystem_45bbe4 = {});
  ns.LanguageSelector = LanguageSelector;
}
