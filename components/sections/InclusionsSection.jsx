import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Icon } from "../core/Icon.jsx";

/* What a stay includes — read from the structure in content/tariff.json: `includes`,
   `excludes` and `supplements` (label + basis). Never a figure, currency or "from" price:
   the one link goes to the tariff page, where the rates live.
   Phones: one column. ≥760px: Included beside Not included; supplements under both.
   ≥1000px: statement on the left (4 columns), the lists on the right (8). */
const CSS = `
.sh-incl{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:start}
.sh-incl-head{display:flex;flex-direction:column;gap:var(--space-5);min-width:0}
.sh-incl-cols{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg) calc(var(--grid-gap) * 2);min-width:0}
.sh-incl-col{display:flex;flex-direction:column;gap:var(--space-4);min-width:0}
.sh-incl-col[data-span="all"]{grid-column:1/-1}
.sh-incl-title{margin:0;padding-bottom:var(--space-3);border-bottom:var(--border-width) solid var(--rule-color);font:var(--type-item-sm);color:var(--text-primary)}
.sh-incl-list{list-style:none;margin:0;padding:0;display:grid;gap:var(--space-3)}
.sh-incl-list li{display:grid;grid-template-columns:20px minmax(0,1fr);gap:var(--space-3);align-items:start;font:var(--type-body-sm);color:var(--text-primary)}
.sh-incl-list li [data-icon]{margin-top:2px;color:var(--text-brand)}
.sh-incl-list[data-kind="excludes"] li [data-icon]{color:var(--text-muted)}
.sh-incl-basis{display:block;margin-top:var(--space-1);font:var(--type-caption);color:var(--text-secondary)}
.sh-incl-notes{margin:0;padding:0;list-style:none;display:grid;gap:var(--space-2);font:var(--type-caption);color:var(--text-secondary);max-width:var(--measure-body)}
@media (min-width:760px){
  .sh-incl-cols{grid-template-columns:repeat(2,minmax(0,1fr))}
  .sh-incl-col[data-kind="supplements"] .sh-incl-list{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:calc(var(--grid-gap) * 2)}
}
@media (min-width:1000px){.sh-incl{grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:calc(var(--grid-gap) * 2)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-incl-css")) return;
  const el = document.createElement("style");
  el.id = "sh-incl-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* includes / excludes: string[] · supplements: [{ label, basis }] · notes: string[] */
export function InclusionsSection({ title = "What your stay includes", sub, includes = [], excludes = [], supplements = [], notes = [], action, labels = {}, headingLevel = 2, style, ...rest }) {
  ensure();
  const H = "h" + Math.min(6, headingLevel + 1);
  const L = { includes: "Included", excludes: "Not included", supplements: "Supplements", ...labels };
  return (
    <div data-ds-id="sections/InclusionsSection" className="sh-incl" style={style} {...rest}>
      <div className="sh-incl-head">
        <Statement as={"h" + headingLevel} size="title" sub={sub}>{title}</Statement>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="sh-incl-cols">
        {includes.length ? (
          <div className="sh-incl-col" data-kind="includes">
            <H className="sh-incl-title">{L.includes}</H>
            <ul className="sh-incl-list" data-kind="includes">{includes.map((t) => <li key={t}><Icon name="check" size={18} />{t}</li>)}</ul>
          </div>
        ) : null}
        {excludes.length ? (
          <div className="sh-incl-col" data-kind="excludes">
            <H className="sh-incl-title">{L.excludes}</H>
            <ul className="sh-incl-list" data-kind="excludes">{excludes.map((t) => <li key={t}><Icon name="minus" size={18} />{t}</li>)}</ul>
          </div>
        ) : null}
        {supplements.length ? (
          <div className="sh-incl-col" data-kind="supplements" data-span="all">
            <H className="sh-incl-title">{L.supplements}</H>
            <ul className="sh-incl-list" data-kind="supplements">{supplements.map((s) => <li key={s.label}><Icon name="plus" size={18} /><span>{s.label}{s.basis ? <span className="sh-incl-basis">{s.basis}</span> : null}</span></li>)}</ul>
          </div>
        ) : null}
        {notes.length ? <ul className="sh-incl-notes sh-incl-col" data-span="all">{notes.map((n) => <li key={n}>{n}</li>)}</ul> : null}
      </div>
    </div>
  );
}
