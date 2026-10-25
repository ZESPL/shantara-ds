import React from "react";

/* "On this page" — a sticky bar of jump links for long pages (programme detail, Therapies,
   Rooms, legal). It sits under the site header, marks the section in view, and scrolls
   sideways on phones instead of wrapping. Each target needs an `id`; CatalogueSection and
   SplitSection (`id`) already reserve the header offset on their anchors. */
const CSS = `
.sh-ipn{position:sticky;top:var(--header-h, 72px);z-index:20;background:var(--surface-page);border-block:var(--border-width) solid var(--rule-color)}
.sh-ipn[data-sticky="false"]{position:relative;top:auto}
.sh-ipn-inner{display:flex;align-items:center;gap:var(--space-6)}
.sh-ipn-label{flex:0 0 auto;font:var(--type-label);font-size:var(--text-xs);color:var(--text-muted)}
.sh-ipn-list{display:flex;gap:var(--space-2);margin:0;padding:0;list-style:none;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;mask-image:linear-gradient(to right, #000 calc(100% - 32px), transparent)}
.sh-ipn-list::-webkit-scrollbar{display:none}
.sh-ipn-list>li{flex:0 0 auto;scroll-snap-align:start}
.sh-ipn-link{display:inline-flex;align-items:center;min-height:var(--tap-min);padding:0 var(--space-3);font:var(--type-body-sm);color:var(--text-secondary);text-decoration:none;white-space:nowrap;box-shadow:inset 0 -2px 0 transparent;transition:color var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)}
.sh-ipn-link[aria-current="true"]{color:var(--text-primary);box-shadow:inset 0 -2px 0 var(--text-brand)}
.sh-ipn-link:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-ipn-link:hover{color:var(--text-primary)}}
@media (max-width:759.98px){.sh-ipn-label{display:none}}
@media (min-width:1000px){.sh-ipn-list{mask-image:none;flex-wrap:wrap;overflow:visible}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-ipn-css")) return;
  const el = document.createElement("style");
  el.id = "sh-ipn-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* items: [{ id, label }] */
export function InPageNav({ items = [], label = "On this page", sticky = true, activeId, style, ...rest }) {
  ensure();
  const [seen, setSeen] = React.useState(items[0] && items[0].id);
  const listRef = React.useRef(null);
  React.useEffect(() => {
    if (activeId || typeof IntersectionObserver === "undefined") return undefined;
    const els = items.map((it) => document.getElementById(it.id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setSeen(vis[0].target.id);
    }, { rootMargin: "-20% 0px -65% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeId, items.map((i) => i.id).join("|")]);
  const current = activeId || seen;
  /* Keep the current link visible in the sideways-scrolling row. */
  React.useEffect(() => {
    const list = listRef.current;
    const link = list && list.querySelector('[aria-current="true"]');
    if (!link || list.scrollWidth <= list.clientWidth) return;
    const l = link.offsetLeft, r = l + link.offsetWidth;
    if (l < list.scrollLeft || r > list.scrollLeft + list.clientWidth) list.scrollTo({ left: l - 16, behavior: "smooth" });
  }, [current]);
  return (
    <nav data-ds-id="sections/InPageNav" className="sh-ipn" aria-label={label} data-sticky={String(sticky)} style={style} {...rest}>
      <div className="sh-container sh-ipn-inner">
        <span className="sh-ipn-label" aria-hidden="true">{label}</span>
        <ul className="sh-ipn-list" ref={listRef}>
          {items.map((it) => (
            <li key={it.id}>
              <a className="sh-ipn-link" href={"#" + it.id} aria-current={current === it.id ? "true" : undefined} onClick={() => setSeen(it.id)}>{it.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
