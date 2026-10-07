/* Website chrome — header, phone dropdown, menu sheet, footer, and two helpers the screens
   share (PageSlot, siteContactItems). Composition sample, not the production site. */

/* Five items, no more (owner decision #6). Contact lives in the phone dropdown and the footer. */
const NAV = [
  { label: "Programmes", view: "programme" },
  { label: "Conditions", view: "conditions" },
  { label: "Experience", view: "experience" },
  { label: "About", view: "about" },
  { label: "Journal", view: "journal" },
];

/* Views that open on HeroFullBleed: the header starts transparent with Merino type over a
   scrim, then turns solid Merino once the page scrolls. */
const PHOTO_HERO_VIEWS = ["home", "experience"];
/* Views that open on HeroSplit: the photograph runs to the top edge on one side, so the
   header is solid from the start rather than dark type over a photograph. */
const SOLID_HEADER_VIEWS = ["programme", "tariffs"];

const TEXT_SIZE_KEY = "shantara-text-size";
const TEXT_SIZES = [
  { id: "md", label: "Default" },
  { id: "lg", label: "Large" },
  { id: "xl", label: "Larger" },
];

function applyTextSize(size) {
  const next = TEXT_SIZES.some((s) => s.id === size) ? size : "md";
  if (typeof document !== "undefined") document.documentElement.setAttribute("data-text-size", next);
  try { localStorage.setItem(TEXT_SIZE_KEY, next); } catch (_) {}
  return next;
}

function readStoredTextSize() {
  try {
    const stored = localStorage.getItem(TEXT_SIZE_KEY);
    if (TEXT_SIZES.some((s) => s.id === stored)) return stored;
  } catch (_) {}
  return "md";
}

/* Call number (`phone[0]`) and WhatsApp number (`whatsapp`), one email (copy/naming-and-nap.md). */
function siteContact() {
  const site = (window.ShantaraContent && window.ShantaraContent.site) || {};
  const phone = (site.phone && site.phone[0]) || "+91 9553 600 100";
  const digits = String(site.whatsapp || phone).replace(/[^\d]/g, "");
  return {
    name: site.business_name || "Shantara Naturopathy Retreat",
    legalName: site.legal_name || "Metropolis Forward LLP",
    email: site.email || "heal@shantara.life",
    phone,
    tel: "tel:" + String(phone).replace(/[^\d+]/g, ""),
    whatsapp: "https://wa.me/" + digits,
    social: Array.isArray(site.social_links) ? site.social_links.filter((s) => s && s.platform && s.url) : [],
  };
}

/* Footer social profiles: platform → icon slug and visible platform name. */
const SOCIAL_PLATFORMS = {
  facebook: { icon: "facebook", label: "Facebook" },
  instagram: { icon: "instagram", label: "Instagram" },
  linkedin: { icon: "linkedin", label: "LinkedIn" },
  youtube: { icon: "youtube", label: "YouTube" },
};

/* ClosingCTA `contact` items: call, WhatsApp, email. */
function siteContactItems(t) {
  const c = siteContact();
  return [
    { label: c.phone, href: c.tel, icon: "phone" },
    { label: t("WhatsApp"), href: c.whatsapp, icon: "message-circle" },
    { label: c.email, href: "mailto:" + c.email, icon: "mail" },
  ];
}

function kitHref(locale, view) {
  return window.ShantaraLocales ? window.ShantaraLocales.kitHash(locale, view) : "#/en/";
}

/* Each page section is wrapped in a slot carrying data-ds-id="page/<view>/<slot>" so a section
   can be named to an AI ("page/home/programmes"). display:contents keeps layout untouched. */
function PageSlot({ id, children }) {
  return <div data-ds-id={"page/" + id} style={{ display: "contents" }}>{children}</div>;
}

/* The header is a size container, so its breakpoints follow the width it actually lays out
   at — with html zoom (text size lg/xl) a 390px phone lays out at 347 / 312px, which media
   queries would not see. The header overlays every page (negative bottom margin); heroes
   pad their tops for it. */
const CHROME_CSS = `
:root{--header-h:64px}
@media (min-width:1000px){:root{--header-h:72px}}
.sh-hdr{position:sticky;top:0;z-index:30;height:var(--header-h);margin-bottom:calc(-1 * var(--header-h));container:sh-hdr / inline-size;background:transparent;border-bottom:var(--border-width) solid transparent;transition:background-color var(--duration-base) var(--ease-standard),border-color var(--duration-base) var(--ease-standard)}
.sh-hdr[data-ground="photo"]{background:transparent;isolation:isolate}
.sh-hdr[data-ground="photo"]::before{content:"";position:absolute;inset:0 0 auto 0;height:calc(var(--header-h) * 2);background:var(--scrim-header);pointer-events:none;z-index:-1}
.sh-hdr[data-solid="true"]{background:var(--ground-merino);border-bottom-color:var(--border-subtle)}
.sh-hdr[data-scrolled="true"]{background:color-mix(in srgb, var(--color-merino) 88%, transparent);-webkit-backdrop-filter:var(--blur-glass);backdrop-filter:var(--blur-glass);border-bottom-color:var(--border-subtle)}
.sh-hdr-row{height:100%;display:flex;align-items:center;gap:var(--space-3)}
.sh-hdr-logo{display:flex;align-items:center;min-height:var(--tap-min);flex:0 0 auto;border-radius:var(--radius-xs)}
.sh-hdr-logo:focus-visible,.sh-hdr-nav a:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-hdr-logo-icon{display:none}
.sh-hdr-nav{display:none;align-items:center;justify-content:center;gap:clamp(20px, 2.4vw - 4px, 40px)}
.sh-hdr-nav a{display:inline-flex;align-items:center;min-height:var(--tap-min);font-size:var(--text-sm);letter-spacing:var(--tracking-wide);white-space:nowrap;text-decoration:none;color:var(--text-secondary);transition:color var(--duration-fast) var(--ease-standard)}
.sh-hdr-nav a[aria-current="page"]{color:var(--text-primary);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px}
.sh-hdr-end{margin-inline-start:auto;display:flex;align-items:center;justify-content:flex-end;gap:var(--space-2);min-width:0}
.sh-hdr-lang,.sh-hdr-book-full{display:none}
.sh-hdr-end .sh-ibtn{color:var(--text-primary)}
@media (hover: hover) and (pointer: fine){.sh-hdr-nav a:hover{color:var(--text-primary)}}
/* Narrow layouts (390 at text size lg, or any phone under 420): a shorter wordmark. */
@container sh-hdr (max-width:419.98px){.sh-hdr-logo-word img{height:18px!important}}
/* 390 at text size xl lays out at 312px: the frangipani mark alone. */
@container sh-hdr (max-width:339.98px){.sh-hdr-logo-word{display:none}.sh-hdr-logo-icon{display:block}}
@container sh-hdr (min-width:1000px){
  .sh-hdr-row{display:grid;grid-template-columns:minmax(max-content,1fr) auto minmax(max-content,1fr);gap:var(--space-7)}
  .sh-hdr-nav{display:flex}
  .sh-hdr-end{margin-inline-start:0;gap:var(--space-3)}
  .sh-hdr-lang,.sh-hdr-book-full{display:block}
  .sh-hdr-book-short,.sh-hdr-menu{display:none}
}

/* Phone dropdown: a disclosure (button + list of links), not an ARIA menu. */
.sh-call{position:relative;display:flex}
.sh-call-panel{position:absolute;inset-block-start:calc(100% + var(--space-2));inset-inline-end:0;z-index:40;width:max-content;min-width:15rem;max-width:calc(100cqw - 2 * var(--layout-gutter));margin:0;padding:var(--space-2);list-style:none;background:var(--surface-card);border:var(--border-width) solid var(--border-subtle);border-radius:var(--radius-card);box-shadow:var(--shadow-md);animation:sh-enter-up var(--duration-fast) var(--ease-out);
  --text-primary:var(--color-pine-tree);--text-secondary:var(--color-stone-500);--text-brand:var(--color-himalaya);--border-subtle:var(--color-stone-200, rgba(0,0,0,.12));--ring-focus:0 0 0 2px var(--color-white), 0 0 0 4px var(--color-himalaya);color:var(--text-primary)}
.sh-call-panel a{display:flex;align-items:center;gap:var(--space-4);min-height:var(--tap-min);padding:var(--space-3) var(--space-4);border-radius:var(--radius-xs);color:var(--text-primary);text-decoration:none;font:var(--type-body-sm)}
.sh-call-panel a>[data-icon]{flex:0 0 auto;color:var(--text-brand)}
.sh-call-panel a span{display:flex;flex-direction:column;min-width:0}
.sh-call-panel a small{font:var(--type-caption);color:var(--text-secondary)}
.sh-call-panel a:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-call-panel a:hover{background:var(--surface-raised)}}

.sh-menu{position:fixed;inset:0;z-index:60;display:flex;flex-direction:column;overflow-y:auto;overscroll-behavior:contain;animation:sh-menu-in var(--duration-base) var(--ease-out) both}
@keyframes sh-menu-in{from{opacity:0}to{opacity:1}}
.sh-menu-top{flex:0 0 auto;height:var(--header-h);display:flex;align-items:center;justify-content:space-between;gap:var(--space-5)}
.sh-menu-body{flex:1 0 auto;display:flex;flex-direction:column;gap:var(--stack-lg);padding-block:var(--space-8) var(--section-y-sm)}
.sh-menu-nav{list-style:none;margin:0;padding:0;display:flex;flex-direction:column}
.sh-menu-nav li{border-top:var(--border-width) solid var(--rule-color)}
.sh-menu-nav li:last-child{border-bottom:var(--border-width) solid var(--rule-color)}
/* Change-1 look: Light, 22px on phones growing to 30px, set here so later type-token changes do not restyle the menu. */
.sh-menu-nav a{display:flex;align-items:center;min-height:var(--tap-min);padding-block:var(--space-4);font:var(--weight-light) clamp(22px, 0.75vw + 19px, 30px)/1.24 var(--font-display);color:var(--text-primary);text-decoration:none}
.sh-menu-nav a[aria-current="page"]{color:var(--text-brand)}
.sh-menu-nav a:focus-visible,.sh-menu-contact a:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-menu-contact{display:flex;flex-direction:column;gap:var(--space-2);font:var(--type-body-sm);color:var(--text-secondary)}
.sh-menu-contact a{display:inline-flex;align-items:center;gap:var(--space-3);min-height:var(--tap-min);color:inherit;text-decoration:none}
.sh-menu-lang{display:flex;align-items:center;justify-content:space-between;gap:var(--space-5);padding-top:var(--space-5);border-top:var(--border-width) solid var(--rule-color);font:var(--type-body-sm);color:var(--text-secondary)}

/* FOOTER — Pine Tree ground, a rosette strip across the top, cream wordmark + three link
   columns, bottom bar with the text-size control. A size container like the header. */
.sh-foot{position:relative;container:sh-foot / inline-size;overflow:hidden;--foot-band:clamp(132px, 20vw, 264px)}
.sh-foot-band{position:absolute;inset:0 0 auto 0;height:var(--foot-band);border-bottom:var(--border-width) solid var(--pattern-rule-dark);pointer-events:none}
.sh-foot-band::before{content:"";position:absolute;inset:0;background-color:var(--pattern-ink-dark);-webkit-mask-image:url(../../assets/pattern-unit.png);mask-image:url(../../assets/pattern-unit.png);-webkit-mask-repeat:repeat;mask-repeat:repeat;-webkit-mask-size:132px 132px;mask-size:132px 132px;opacity:var(--pattern-opacity-dark)}
.sh-foot-main{position:relative;padding-block:calc(var(--foot-band) + var(--section-y-sm)) var(--space-9)}
.sh-foot-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-9) var(--grid-gap)}
.sh-foot-brand{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-6);min-width:0}
.sh-foot-blurb{margin:0;font:var(--type-body-sm);line-height:var(--leading-relaxed);color:var(--text-secondary);max-width:34ch}
.sh-foot-nap{display:flex;flex-direction:column;font:var(--type-body-sm);font-style:normal;color:var(--text-secondary)}
.sh-foot-nap strong{font-weight:var(--weight-medium);color:var(--text-primary);margin-bottom:var(--space-2)}
.sh-foot-social{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:var(--space-2)}
.sh-foot-social a{justify-content:center;min-width:var(--tap-min);min-height:var(--tap-min)}
.sh-foot-col{min-width:0}
.sh-foot-h{margin:0 0 var(--space-4);font-family:var(--font-body);font-size:var(--text-base);font-weight:var(--weight-medium);line-height:1.3;letter-spacing:0;text-transform:none;color:var(--color-gold-crayola)}
.sh-foot-links{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--space-1)}
.sh-foot a{display:inline-flex;align-items:center;gap:var(--space-3);min-height:var(--control-sm);font:var(--type-body-sm);color:var(--text-secondary);text-decoration:none;transition:color var(--duration-fast) var(--ease-standard)}
.sh-foot a:focus-visible,.sh-foot button:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-foot-bar{position:relative;display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-4) var(--space-7);padding-block:var(--space-6) var(--space-9);border-top:var(--border-width) solid var(--rule-color);font:var(--type-caption);color:var(--text-muted)}
.sh-foot-size{display:inline-flex;flex-wrap:wrap;align-items:center;gap:var(--space-3)}
.sh-foot-size button{appearance:none;display:inline-flex;align-items:center;min-height:var(--control-sm);padding:0 var(--space-4);border:var(--border-width) solid color-mix(in srgb, var(--color-merino) 28%, transparent);border-radius:var(--radius-sm);background:transparent;color:var(--color-merino);font:var(--type-label);letter-spacing:var(--tracking-wide);cursor:pointer;transition:var(--transition-control)}
.sh-foot-size button[aria-pressed="true"]{border-color:var(--color-merino);background:color-mix(in srgb, var(--color-merino) 14%, transparent)}
/* Phones: each link column is a disclosure; the heading holds the toggle button. */
.sh-foot-toggle{appearance:none;display:flex;align-items:center;justify-content:space-between;gap:var(--space-5);width:100%;min-height:var(--tap-min);padding:var(--space-4) 0;border:0;background:transparent;color:inherit;font:inherit;text-align:start;cursor:pointer}
.sh-foot-toggle>[data-icon]{flex:0 0 auto;transition:transform var(--duration-fast) var(--ease-out)}
.sh-foot-toggle[aria-expanded="true"]>[data-icon]{transform:rotate(180deg)}
.sh-foot-grid[data-narrow="true"] .sh-foot-cols{border-top:var(--border-width) solid var(--rule-color)}
.sh-foot-grid[data-narrow="true"] .sh-foot-col{border-bottom:var(--border-width) solid var(--rule-color)}
.sh-foot-grid[data-narrow="true"] .sh-foot-h{margin:0}
.sh-foot-grid[data-narrow="true"] .sh-foot-links{padding-bottom:var(--space-5)}
.sh-foot-grid[data-narrow="true"] .sh-foot-links[hidden]{display:none}
.sh-foot-cols{display:grid;grid-template-columns:minmax(0,1fr);gap:0 var(--grid-gap);min-width:0}
@media (pointer: coarse){.sh-foot a,.sh-foot-size button{min-height:var(--tap-min)}}
@media (hover: hover) and (pointer: fine){.sh-foot a:hover{color:var(--color-merino)}.sh-foot-size button:hover{border-color:var(--color-merino)}}
@container sh-foot (min-width:760px){
  .sh-foot-cols{grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-9) var(--grid-gap)}
  .sh-foot-size{margin-inline-start:auto}
}
@container sh-foot (min-width:1100px){
  .sh-foot-grid{grid-template-columns:minmax(0,1.4fr) minmax(0,3fr)}
}

/* KIT HELPERS shared by the screens (page-level composition, not components). */
/* Tile rows that line up: from 760px each title reserves two lines, so every meta row and
   every first line of text starts at the same height across the row. */
@media (min-width:760px){.sh-kit-tiles-aligned .sh-tile-title{min-height:2lh}}
/* The home "All programmes" index: one column (label above) up to 1280px, label beside two
   columns from 1280px, and roomier rows either way. */
.sh-kit-index-roomy .sh-index-link{padding-block:var(--space-7)}
.sh-kit-index-roomy .sh-index-items[data-columns="2"]{grid-template-columns:minmax(0,1fr)}
.sh-kit-index-roomy .sh-index-group{grid-template-columns:minmax(0,1fr)}
@media (min-width:1280px){
  .sh-kit-index-roomy .sh-index-group{grid-template-columns:minmax(0,3fr) minmax(0,9fr)}
  .sh-kit-index-roomy .sh-index-items[data-columns="2"]{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:calc(var(--grid-gap) * 2)}
}
.sh-kit-index-after{display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-4);margin-top:var(--stack-lg)}
@media (min-width:1280px){.sh-kit-index-after{margin-inline-start:calc(25% + var(--grid-gap) / 4)}}
`;

function ensureChromeCss() {
  if (typeof document === "undefined" || document.getElementById("sh-chrome-css")) return;
  const el = document.createElement("style");
  el.id = "sh-chrome-css";
  el.textContent = CHROME_CSS;
  document.head.appendChild(el);
}

/* Current laid-out width of an element in its own CSS pixels (follows html zoom). */
function useLayoutWidth(ref) {
  const [w, setW] = React.useState(1280);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return w;
}

/* Phone button → Call / WhatsApp / Email. Escape and click-outside close it; focus moves into
   the list on open and back to the button on Escape; arrow keys move between the links. */
function CallMenu({ view }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { IconButton, Icon } = window.ShantaraDesignSystem_45bbe4;
  const [open, setOpen] = React.useState(false);
  const root = React.useRef(null);
  const c = siteContact();
  const L = window.ShantaraLocales;

  const focusButton = () => { const b = root.current && root.current.querySelector("button"); if (b) b.focus(); };

  React.useEffect(() => {
    if (!open) return undefined;
    const links = () => [...root.current.querySelectorAll(".sh-call-panel a")];
    const first = links()[0];
    if (first) first.focus();
    const onDoc = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); focusButton(); return; }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const items = links();
        const i = items.indexOf(document.activeElement);
        if (i === -1) return;
        e.preventDefault();
        items[(i + (e.key === "ArrowDown" ? 1 : items.length - 1)) % items.length].focus();
      }
    };
    const onFocus = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc, { passive: true });
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  const track = (method) => { if (L) L.track("contact_click", { contact_method: method, page_type: view, cta_location: "header" }); setOpen(false); };
  const items = [
    { method: "phone", icon: "phone", label: t("Call"), detail: c.phone, href: c.tel },
    { method: "whatsapp", icon: "message-circle", label: t("WhatsApp"), detail: c.phone, href: c.whatsapp, external: true },
    { method: "email", icon: "mail", label: t("Email"), detail: c.email, href: "mailto:" + c.email },
  ];

  return (
    <div className="sh-call" ref={root}>
      <IconButton label={t("Call, WhatsApp or email")} aria-expanded={open} aria-controls="sh-call-panel" onClick={() => setOpen((o) => !o)}>
        <Icon name="phone" size={20} />
      </IconButton>
      {open ? (
        <ul id="sh-call-panel" className="sh-call-panel">
          {items.map((it) => (
            <li key={it.method}>
              <a href={it.href} onClick={() => track(it.method)} target={it.external ? "_blank" : undefined} rel={it.external ? "noopener" : undefined}>
                <Icon name={it.icon} size={18} />
                <span>{it.label}<small className="shantara-dir-ltr" style={{ fontVariantNumeric: "tabular-nums" }}>{it.detail}</small></span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MenuSheet({ view, locale, onNavigate, onClose, onBook, onLocaleChange }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Button, IconButton, Icon, Logo, LanguageSelector } = window.ShantaraDesignSystem_45bbe4;
  const ref = React.useRef(null);
  const c = siteContact();

  React.useEffect(() => {
    const root = ref.current;
    const first = root && root.querySelector("[data-autofocus]");
    if (first) first.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { if (root && root.querySelector('.sh-lang-btn[aria-expanded="true"]')) return; e.preventDefault(); onClose(true); return; }
      if (e.key !== "Tab" || !root) return;
      const items = [...root.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!items.length) return;
      const a = items[0];
      const z = items[items.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (v) => { onClose(false); onNavigate(v); };
  const current = view === "article" ? "journal" : view;

  return ReactDOM.createPortal(
    <div ref={ref} id="sh-site-menu" className="sh-menu" data-ground="merino" role="dialog" aria-modal="true" aria-label={t("Menu")}>
      <div className="sh-container sh-menu-top">
        <a className="sh-hdr-logo" href={kitHref(locale, "home")} onClick={(e) => { e.preventDefault(); go("home"); }}><Logo mark="wordmark" tone="dark" height={22} assetBase="../../assets" /></a>
        <IconButton label={t("Close menu")} onClick={() => onClose(true)} data-autofocus=""><Icon name="x" size={22} /></IconButton>
      </div>
      <div className="sh-container sh-menu-body">
        <nav aria-label={t("Main")}>
          <ul className="sh-menu-nav">
            {NAV.map((n) => (
              <li key={n.view}>
                <a href={kitHref(locale, n.view)} aria-current={current === n.view ? "page" : undefined} onClick={(e) => { e.preventDefault(); go(n.view); }}>{t(n.label)}</a>
              </li>
            ))}
          </ul>
        </nav>
        <Button size="lg" fullWidth onClick={() => { onClose(false); onBook("menu"); }}>{t("Book a Consultation")}</Button>
        <div className="sh-menu-contact">
          <a className="shantara-dir-ltr" href={c.tel} style={{ fontVariantNumeric: "tabular-nums" }}><Icon name="phone" size={18} />{c.phone}</a>
          <a href={c.whatsapp} target="_blank" rel="noopener"><Icon name="message-circle" size={18} />{t("WhatsApp")}</a>
          <a className="shantara-dir-ltr" href={"mailto:" + c.email}><Icon name="mail" size={18} />{c.email}</a>
        </div>
        {LanguageSelector ? (
          <div className="sh-menu-lang">
            <span>{t("Language")}</span>
            <LanguageSelector locale={locale} rest={window.ShantaraLocales ? window.ShantaraLocales.kitViewPath(view) : ""} onSelect={onLocaleChange} />
          </div>
        ) : null}
      </div>
    </div>,
    document.body
  );
}

function SiteHeader({ view, onNavigate, locale = "en", onLocaleChange }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Button, IconButton, Icon, Logo, LanguageSelector } = window.ShantaraDesignSystem_45bbe4;
  ensureChromeCss();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const menuBtn = React.useRef(null);

  React.useEffect(() => {
    const el = document.getElementById("kit-scroll");
    const read = () => setScrolled((el ? el.scrollTop : 0) > 8 || window.scrollY > 8);
    read();
    if (el) el.addEventListener("scroll", read, { passive: true });
    window.addEventListener("scroll", read, { passive: true });
    return () => {
      if (el) el.removeEventListener("scroll", read);
      window.removeEventListener("scroll", read);
    };
  }, [view]);

  /* Lock the page scroller while the menu sheet is open; close it if the viewport grows
     past the breakpoint where the full navigation shows. */
  React.useEffect(() => {
    if (!open) return undefined;
    const el = document.getElementById("kit-scroll");
    const prev = el ? el.style.overflow : "";
    if (el) el.style.overflow = "hidden";
    const onResize = () => {
      const hdr = document.querySelector(".sh-hdr-menu");
      if (hdr && getComputedStyle(hdr).display === "none") setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (el) el.style.overflow = prev;
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const closeMenu = (returnFocus) => {
    setOpen(false);
    if (returnFocus && menuBtn.current) setTimeout(() => { const b = menuBtn.current && menuBtn.current.querySelector("button"); if (b) b.focus(); }, 0);
  };

  const book = (where) => {
    if (window.ShantaraLocales) window.ShantaraLocales.track("consultation_cta_click", { page_type: view, content_id: view, content_name: view, cta_location: where }, { locale });
    onNavigate("booking");
  };

  const overPhoto = PHOTO_HERO_VIEWS.includes(view) && !scrolled;
  const solid = SOLID_HEADER_VIEWS.includes(view) && !scrolled;
  const current = view === "article" ? "journal" : view;
  const tone = overPhoto ? "cream" : "dark";

  return (
    <header className="sh-hdr" data-scrolled={String(scrolled)} data-solid={solid ? "true" : undefined} data-ground={overPhoto ? "photo" : undefined}>
      <div className="sh-container sh-hdr-row">
        <a className="sh-hdr-logo" href={kitHref(locale, "home")} aria-label={t("Shantara home")} onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>
          <span className="sh-hdr-logo-word"><Logo mark="wordmark" tone={tone} height={22} alt="" assetBase="../../assets" /></span>
          <span className="sh-hdr-logo-icon"><Logo mark="icon" tone={tone} height={32} alt="" assetBase="../../assets" /></span>
        </a>
        <nav className="sh-hdr-nav" aria-label={t("Main")}>
          {NAV.map((n) => (
            <a key={n.view} href={kitHref(locale, n.view)} onClick={(e) => { e.preventDefault(); onNavigate(n.view); }} aria-current={current === n.view ? "page" : undefined}>{t(n.label)}</a>
          ))}
        </nav>
        <div className="sh-hdr-end">
          {LanguageSelector ? <span className="sh-hdr-lang"><LanguageSelector locale={locale} rest={window.ShantaraLocales ? window.ShantaraLocales.kitViewPath(view) : ""} onSelect={onLocaleChange} /></span> : null}
          <CallMenu view={view} />
          <span className="sh-hdr-book-full"><Button size="md" onClick={() => book("header")}>{t("Book a Consultation")}</Button></span>
          <span className="sh-hdr-book-short"><Button size="md" onClick={() => book("header")}>{t("Book")}</Button></span>
          <span className="sh-hdr-menu" ref={menuBtn}>
            <IconButton label={t("Open menu")} aria-expanded={open} aria-controls="sh-site-menu" aria-haspopup="dialog" onClick={() => setOpen(true)}><Icon name="menu" size={22} /></IconButton>
          </span>
        </div>
      </div>
      {open ? <MenuSheet view={view} locale={locale} onNavigate={onNavigate} onClose={closeMenu} onBook={book} onLocaleChange={onLocaleChange} /> : null}
    </header>
  );
}

const FOOTER_COLS = [
  { title: "Explore", links: [
    { label: "Programmes", view: "programme" },
    { label: "Conditions", view: "conditions" },
    { label: "Experience", view: "experience" },
    { label: "Journal", view: "journal" },
  ] },
  { title: "About", links: [
    { label: "Our story", view: "about" },
    { label: "Our approach", view: "about" },
    { label: "Meet our doctors", view: "about" },
    { label: "Medical Editorial Policy", view: "about" },
  ] },
  { title: "Visit", links: [
    { label: "Contact", view: "contact" },
    { label: "Rooms and tariffs", view: "tariffs" },
    { label: "Book a Consultation", view: "booking" },
    { label: "Cancellation policy", view: "contact" },
  ] },
];

function FooterColumn({ col, narrow, locale, onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Icon } = window.ShantaraDesignSystem_45bbe4;
  const [open, setOpen] = React.useState(false);
  const id = "sh-foot-" + col.title.toLowerCase();
  const links = (
    <ul className="sh-foot-links" id={id} hidden={narrow && !open ? true : undefined}>
      {col.links.map((l) => (
        <li key={l.label}>
          <a href={kitHref(locale, l.view)} onClick={(e) => { e.preventDefault(); if (l.view && onNavigate) onNavigate(l.view); }}>{t(l.label)}</a>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="sh-foot-col">
      <h2 className="sh-foot-h">
        {narrow ? (
          <button type="button" className="sh-foot-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
            {t(col.title)}<Icon name="chevron-down" size={18} />
          </button>
        ) : t(col.title)}
      </h2>
      {links}
    </div>
  );
}

function SiteFooter({ onNavigate, locale = "en" }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Logo, Icon } = window.ShantaraDesignSystem_45bbe4;
  ensureChromeCss();
  const [textSize, setTextSize] = React.useState(() => readStoredTextSize());
  React.useEffect(() => { applyTextSize(textSize); }, [textSize]);
  const ref = React.useRef(null);
  const narrow = useLayoutWidth(ref) < 760;
  const c = siteContact();
  return (
    <footer ref={ref} className="sh-foot" data-ground="pine" data-ds-id="page/chrome/footer">
      <span className="sh-foot-band" aria-hidden="true" />
      <div className="sh-container sh-foot-main">
        <div className="sh-foot-grid" data-narrow={String(narrow)}>
          <div className="sh-foot-brand">
            <Logo mark="wordmark" tone="cream" height={22} assetBase="../../assets" />
            <p className="sh-foot-blurb">{t("A naturopathy retreat on a hilltop above the Chennamangallur valley, Kozhikode. An evolution of Hygiene Nature Cure Hospital, caring for guests since 2000.")}</p>
            <address className="sh-foot-nap">
              <strong>{t(c.name)}</strong>
              <span>{t("Chennamangallur, Kozhikode, Keralam, India - 673602")}</span>
              <a className="shantara-dir-ltr" href={c.tel} style={{ fontVariantNumeric: "tabular-nums" }}><Icon name="phone" size={16} />{c.phone}</a>
              <a href={c.whatsapp} target="_blank" rel="noopener"><Icon name="message-circle" size={16} />{t("WhatsApp")}</a>
              <a className="shantara-dir-ltr" href={"mailto:" + c.email}><Icon name="mail" size={16} />{c.email}</a>
            </address>
            {c.social.length > 0 && (
              <ul className="sh-foot-social" aria-label={t("Shantara on social media")}>
                {c.social.map((s) => {
                  const p = SOCIAL_PLATFORMS[s.platform] || { icon: "external-link", label: s.platform };
                  const label = t(p.label) + " " + t("(opens in a new tab)");
                  return (
                    <li key={s.platform}>
                      <a href={s.url} target="_blank" rel="noopener" aria-label={label} title={label}><Icon name={p.icon} size={20} /></a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="sh-foot-cols">
            {FOOTER_COLS.map((col) => <FooterColumn key={col.title} col={col} narrow={narrow} locale={locale} onNavigate={onNavigate} />)}
          </div>
        </div>
      </div>
      <div className="sh-container">
        <div className="sh-foot-bar">
          <span>{"© 2026 " + c.legalName}</span>
          <span>{t("Privacy")}</span>
          <span>{t("Terms")}</span>
          <span>{t("Kozhikode · Keralam · India")}</span>
          <div className="sh-foot-size" role="group" aria-label={t("Text size")}>
            <span>{t("Text size")}</span>
            {TEXT_SIZES.map((s) => (
              <button key={s.id} type="button" aria-pressed={textSize === s.id} onClick={() => setTextSize(applyTextSize(s.id))}>{t(s.label)}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteHeader, SiteFooter, PageSlot, siteContact, siteContactItems, applyTextSize, readStoredTextSize });
