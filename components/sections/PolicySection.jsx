import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Accordion } from "../navigation/Accordion.jsx";
import { SpecTable } from "../editorial/SpecTable.jsx";

/* Terms a guest agrees to — payment, cancellation, companion and stay policies — as headed
   clauses that open one at a time. A clause holds plain sentences (`text`) and/or a small
   table (`columns` + `rows`, a SpecTable). Structure from content/tariff.json
   (`payment_terms`, `cancellation`) and the handbook policies; never a rate figure.
   One column at every size, capped at 52rem; the tables turn into labelled rows on phones
   (SpecTable). */
const CSS = `
.sh-policy{display:flex;flex-direction:column;gap:var(--stack-lg);max-width:52rem}
.sh-policy-body{display:flex;flex-direction:column;gap:var(--space-5);padding-bottom:var(--space-3)}
.sh-policy-body p{margin:0;font:var(--type-body);color:var(--text-secondary);max-width:var(--measure-body)}
.sh-policy-foot{margin:0;font:var(--type-caption);color:var(--text-secondary)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-policy-css")) return;
  const el = document.createElement("style");
  el.id = "sh-policy-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* clauses: [{ title, text?: string | string[], columns?, rows? }] */
export function PolicySection({ title, sub, clauses = [], footnote, defaultOpen = 0, headingLevel = 2, style, ...rest }) {
  ensure();
  const items = clauses.map((c) => ({
    title: c.title,
    content: (
      <div className="sh-policy-body">
        {[].concat(c.text || []).map((t) => <p key={t}>{t}</p>)}
        {c.rows ? <SpecTable columns={c.columns} rows={c.rows} showHeader caption={c.title} size="sm" /> : null}
      </div>
    ),
  }));
  return (
    <div data-ds-id="sections/PolicySection" className="sh-policy" style={style} {...rest}>
      {title ? <Statement as={"h" + headingLevel} size="title" sub={sub}>{title}</Statement> : null}
      <Accordion items={items} defaultOpen={defaultOpen} />
      {footnote ? <p className="sh-policy-foot">{footnote}</p> : null}
    </div>
  );
}
