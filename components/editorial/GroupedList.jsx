import React from "react";

/* Groups of short items (programmes by focus, therapies by kind). Each group has a small
   Medium heading in normal case, then its items as a clean vertical list on hairlines:
   one item per line, never a middot run-on. Groups stack on phones and sit in columns
   from 760px with generous space between them. */
const CSS = `
.sh-glist{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-10) var(--grid-gap);margin:0}
.sh-glist-group{min-width:0;display:flex;flex-direction:column;gap:var(--space-4)}
.sh-glist-label{margin:0;font:var(--type-item);color:var(--text-primary)}
.sh-glist-items{margin:0;padding:0;list-style:none;display:flex;flex-direction:column}
.sh-glist-items>li{padding:var(--space-3) 0;border-top:var(--border-width) solid var(--rule-color);font:var(--type-body);color:var(--text-primary);min-width:0}
.sh-glist-items>li:last-child{border-bottom:var(--border-width) solid var(--rule-color)}
.sh-glist-items a{color:inherit;text-decoration:none;display:flex;justify-content:space-between;gap:var(--space-4);align-items:baseline}
.sh-glist-items a::after{content:"→";color:var(--text-brand);transition:transform var(--duration-fast) var(--ease-out)}
[dir="rtl"] .sh-glist-items a::after{content:"←"}
.sh-glist-text{display:block;margin-top:var(--space-1);font:var(--type-body-sm);color:var(--text-secondary);max-width:44ch}
.sh-glist[data-rules="false"] .sh-glist-items>li{border:0;padding:var(--space-2) 0}
.sh-glist-items a:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-glist-items a:hover{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}.sh-glist-items a:hover::after{transform:translateX(3px)}}
@media (min-width:760px){.sh-glist[data-columns="2"],.sh-glist[data-columns="3"]{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.sh-glist[data-columns="3"]{grid-template-columns:repeat(3,minmax(0,1fr));column-gap:calc(var(--grid-gap) * 1.5)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-glist-css")) return;
  const el = document.createElement("style");
  el.id = "sh-glist-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* groups: [{ label, items: [string | { label, text?, href?, terms? }] }]
   terms: written to data-filter-terms for a page script that filters the items. */
export function GroupedList({ groups = [], columns = 1, rules = true, headingLevel = 3, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  return (
    <div data-ds-id="editorial/GroupedList" className="sh-glist" data-columns={String(columns)} data-rules={String(rules)} style={style} {...rest}>
      {groups.map((g) => (
        <section className="sh-glist-group" key={g.label}>
          <H className="sh-glist-label">{g.label}</H>
          <ul className="sh-glist-items">
            {g.items.map((it) => {
              const o = typeof it === "string" ? { label: it } : it;
              const body = <>{o.label}{o.text ? <span className="sh-glist-text">{o.text}</span> : null}</>;
              return <li key={o.label} data-filter-terms={o.terms}>{o.href ? <a href={o.href}><span>{body}</span></a> : body}</li>;
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
