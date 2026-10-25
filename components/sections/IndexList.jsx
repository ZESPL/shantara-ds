import React from "react";
import { Icon } from "../core/Icon.jsx";

/* A text-only index for lists too long for photographs (conditions, the full programme
   list). Group label on the left (3 of 12 columns) and hairline rows on the right in one
   or two columns; each row is a title, one line and an arrow when it links somewhere.
   Phones: the label sits above its rows. */
const CSS = `
.sh-index{display:flex;flex-direction:column;gap:var(--section-y-sm)}
.sh-index-group{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-6) var(--grid-gap)}
.sh-index-label{margin:0;font:var(--type-title);color:var(--text-primary)}
.sh-index-count{margin-inline-start:var(--space-3);font:var(--type-body-sm);color:var(--text-muted);font-variant-numeric:tabular-nums}
.sh-index-link[data-anchor]{grid-template-columns:minmax(0,1fr)}
.sh-index-items{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);column-gap:var(--grid-gap)}
.sh-index-item{border-top:var(--border-width) solid var(--rule-color)}
.sh-index-link{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:var(--space-2) var(--space-5);align-items:baseline;padding:var(--space-6) 0;color:inherit;text-decoration:none;min-height:var(--tap-min)}
/* Row titles sit a clear step below the group label (24→30px), so the group still reads
   as the heading on a phone where both would otherwise be 24px. */
.sh-index-title{font:var(--weight-medium) var(--text-lg)/var(--leading-snug) var(--font-display);color:var(--text-primary)}
.sh-index-text{grid-column:1;font:var(--type-body-sm);color:var(--text-secondary);max-width:52ch}
.sh-index-arrow{grid-column:2;grid-row:1;align-self:center;display:inline-flex;color:var(--text-brand);transition:transform var(--duration-fast) var(--ease-out)}
.sh-index-link:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){
  a.sh-index-link:hover .sh-index-title{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}
  a.sh-index-link:hover .sh-index-arrow{transform:translateX(3px)}
  /* The arrow icon flips itself in RTL (tokens/rtl.css); only the nudge mirrors. */
  [dir="rtl"] a.sh-index-link:hover .sh-index-arrow{transform:translateX(-3px)}
}
@media (min-width:760px){.sh-index-items[data-columns="2"]{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.sh-index-group{grid-template-columns:minmax(0,3fr) minmax(0,9fr)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-index-css")) return;
  const el = document.createElement("style");
  el.id = "sh-index-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* groups: [{ label, items: [{ title, text?, href?, onClick? }] }] */
/* anchors: rows link to sections on the same page (it.id → #id) and show no arrow.
   counts: the number of rows beside each group label. */
export function IndexList({ groups = [], columns = 2, headingLevel = 2, anchors = false, counts = false, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  const I = "h" + Math.min(6, headingLevel + 1);
  return (
    <div data-ds-id="sections/IndexList" className="sh-index" style={style} {...rest}>
      {groups.map((g) => (
        <section className="sh-index-group" key={g.label}>
          <H className="sh-index-label">{g.label}{counts ? <span className="sh-index-count">{g.items.length}</span> : null}</H>
          <ul className="sh-index-items" data-columns={String(columns)}>
            {g.items.map((it) => {
              const href = it.href || (anchors && it.id ? "#" + it.id : undefined);
              const linked = !!(href || it.onClick);
              const Tag = linked ? "a" : "div";
              return (
                <li className="sh-index-item" key={it.title}>
                  <Tag className="sh-index-link" data-anchor={anchors ? "" : undefined} href={linked ? href || "#" : undefined} onClick={it.onClick ? (e) => { if (!href) e.preventDefault(); it.onClick(e); } : undefined}>
                    <I className="sh-index-title" style={{ margin: 0 }}>{it.title}</I>
                    {linked && !anchors ? <span className="sh-index-arrow" aria-hidden="true"><Icon name="arrow-right" size={18} /></span> : null}
                    {it.text ? <span className="sh-index-text">{it.text}</span> : null}
                  </Tag>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
