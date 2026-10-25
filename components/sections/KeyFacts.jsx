import React from "react";
import { Statement } from "../editorial/Statement.jsx";

/* "At a glance" — the opening facts of a programme or condition page beside its intro: who
   it is for, typical length, what is assessed, who supervises. Facts come from content
   records only (content/programs, content/conditions); 3 to 6 of them, short values.
   Phones: intro, then the Stone panel. ≥1000px: intro 7 columns, panel 5, top-aligned. */
const CSS = `
.sh-kf{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:start}
.sh-kf-main{display:flex;flex-direction:column;gap:var(--space-5);min-width:0}
.sh-kf-body{font:var(--type-body);color:var(--text-secondary);max-width:var(--measure-body)}
.sh-kf-body>p{margin:0}.sh-kf-body>p+p{margin-top:1em}
.sh-kf-panel{min-width:0;background:var(--ground-stone);padding:clamp(24px, 2vw + 16px, 40px)}
.sh-kf-title{margin:0 0 var(--space-4);font:var(--type-label);font-size:var(--text-sm);color:var(--text-primary)}
.sh-kf-list{margin:0;display:grid;grid-template-columns:minmax(0,1fr)}
.sh-kf-row{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:var(--space-4);padding:var(--space-4) 0;border-top:var(--border-width) solid var(--rule-color)}
.sh-kf-row:last-child{padding-bottom:0}
.sh-kf-row dt{font:var(--type-body-sm);color:var(--text-secondary)}
.sh-kf-row dd{margin:0;font:var(--type-item-sm);color:var(--text-primary)}
@media (max-width:399.98px){.sh-kf-row{grid-template-columns:minmax(0,1fr);gap:var(--space-1)}}
@media (min-width:1000px){.sh-kf{grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:calc(var(--grid-gap) * 2)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-kf-css")) return;
  const el = document.createElement("style");
  el.id = "sh-kf-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* facts: [{ label, value }] · children: intro paragraphs */
export function KeyFacts({ title, sub, facts = [], panelTitle = "At a glance", action, children, headingLevel = 2, style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="sections/KeyFacts" className="sh-kf" style={style} {...rest}>
      <div className="sh-kf-main">
        {title ? <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement> : null}
        {children ? <div className="sh-kf-body">{children}</div> : null}
        {action ? <div>{action}</div> : null}
      </div>
      <aside className="sh-kf-panel" data-ground="stone" aria-label={panelTitle}>
        <p className="sh-kf-title">{panelTitle}</p>
        <dl className="sh-kf-list">
          {facts.map((f) => <div className="sh-kf-row" key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
        </dl>
      </aside>
    </div>
  );
}
