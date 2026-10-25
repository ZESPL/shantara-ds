import React from "react";
import { Statement } from "../editorial/Statement.jsx";

/* "How a stay works" — the guest's own path in 3 to 5 steps: number, title, one line. Only
   steps the guest takes or sees; never internal process ("we log your details…") and never
   a response time that is not confirmed.
   Phones: one column, number beside the text. ≥760px: two columns. ≥1000px: one row of
   equal columns (as many as there are steps), numbers above a hairline. */
const CSS = `
.sh-proc{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-proc-head{display:flex;flex-direction:column;gap:var(--space-5)}
.sh-proc-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:0 calc(var(--grid-gap) * 1.5);counter-reset:sh-proc var(--_start,0)}
.sh-proc-step{display:grid;grid-template-columns:3.25rem minmax(0,1fr);gap:var(--space-4);align-items:baseline;padding:var(--space-6) 0;border-top:var(--border-width) solid var(--rule-color);counter-increment:sh-proc}
.sh-proc-step::before{content:counter(sh-proc, decimal-leading-zero);font:var(--weight-light) var(--text-2xl)/1 var(--font-display);color:var(--text-brand);font-variant-numeric:tabular-nums}
.sh-proc-title{margin:0;font:var(--type-item-sm);color:var(--text-primary)}
.sh-proc-text{margin:var(--space-2) 0 0;font:var(--type-body-sm);color:var(--text-secondary);max-width:40ch}
@media (min-width:760px){.sh-proc-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){
  .sh-proc-list{grid-template-columns:repeat(var(--_n,4),minmax(0,1fr))}
  .sh-proc-step{grid-template-columns:minmax(0,1fr);gap:var(--space-5);padding-top:var(--space-5)}
  .sh-proc-step::before{font-size:var(--text-3xl)}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-proc-css")) return;
  const el = document.createElement("style");
  el.id = "sh-proc-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* steps: [{ title, text? }] — three to five */
export function ProcessSection({ title, sub, steps = [], action, headingLevel = 2, style, ...rest }) {
  ensure();
  const H = "h" + Math.min(6, headingLevel + 1);
  const shown = steps.slice(0, 5);
  return (
    <div data-ds-id="sections/ProcessSection" className="sh-proc" style={{ "--_n": String(Math.max(2, shown.length)), ...style }} {...rest}>
      {title || action ? (
        <div className="sh-proc-head">
          {title ? <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement> : null}
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
      <ol className="sh-proc-list">
        {shown.map((s) => (
          <li className="sh-proc-step" key={s.title}>
            <div><H className="sh-proc-title">{s.title}</H>{s.text ? <p className="sh-proc-text">{s.text}</p> : null}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
