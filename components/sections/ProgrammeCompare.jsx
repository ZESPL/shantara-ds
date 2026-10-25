import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Icon } from "../core/Icon.jsx";

/* Programmes side by side — the Programmes index. A real <table>: programme (linked), focus,
   who it is for, typical length. From content/programs/ (`name`, `focus`, `proposition`,
   `durations`). Never a rate column: the one link under the table goes to the tariff page.
   Phones (<760px): each row becomes a card — name, then labelled lines — so nothing scrolls
   sideways. ≥760px: the table, rows ruled, the name column linked with an arrow. */
const CSS = `
.sh-pcmp{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-pcmp-table{width:100%;border-collapse:collapse;font:var(--type-body-sm);color:var(--text-secondary)}
.sh-pcmp-table caption{text-align:start;padding-bottom:var(--space-4);font:var(--type-caption);color:var(--text-muted)}
.sh-pcmp-table th,.sh-pcmp-table td{text-align:start;vertical-align:top;padding:var(--space-5) var(--space-5) var(--space-5) 0;border-top:var(--border-width) solid var(--rule-color)}
.sh-pcmp-table thead th{padding-top:0;border-top:0;font:var(--type-label);color:var(--text-primary)}
.sh-pcmp-table tbody tr:last-child>*{border-bottom:var(--border-width) solid var(--rule-color)}
.sh-pcmp-name{font:var(--type-item-sm);color:var(--text-primary)}
.sh-pcmp-name a{display:inline-flex;align-items:center;gap:var(--space-2);color:inherit;text-decoration:none;min-height:var(--tap-min)}
.sh-pcmp-name a [data-icon]{color:var(--text-brand);transition:transform var(--duration-fast) var(--ease-out)}
.sh-pcmp-name a:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-pcmp-name a:hover{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}.sh-pcmp-name a:hover [data-icon]{transform:translateX(3px)}}
@media (min-width:760px){.sh-pcmp-table th.sh-pcmp-name{width:13rem}}
.sh-pcmp-len{white-space:nowrap;color:var(--text-primary);font-variant-numeric:tabular-nums}
@media (max-width:759.98px){
  .sh-pcmp-table thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
  .sh-pcmp-table,.sh-pcmp-table tbody,.sh-pcmp-table tr,.sh-pcmp-table th,.sh-pcmp-table td{display:block;width:auto}
  .sh-pcmp-table tr{padding:var(--space-5) 0;border-top:var(--border-width) solid var(--rule-color)}
  .sh-pcmp-table tbody tr:last-child{border-bottom:var(--border-width) solid var(--rule-color)}
  .sh-pcmp-table th,.sh-pcmp-table td{border:0 !important;padding:var(--space-1) 0}
  .sh-pcmp-table td[data-label]{display:grid;grid-template-columns:7.5rem minmax(0,1fr);gap:var(--space-4)}
  .sh-pcmp-table td[data-label]::before{content:attr(data-label);font:var(--type-caption);color:var(--text-muted);padding-top:2px}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-pcmp-css")) return;
  const el = document.createElement("style");
  el.id = "sh-pcmp-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* programmes: [{ name, href?, focus, forWhom, durations }] */
export function ProgrammeCompare({ title, sub, programmes = [], caption = "Programmes compared", labels = {}, action, headingLevel = 2, style, ...rest }) {
  ensure();
  const L = { name: "Programme", focus: "Focus", forWhom: "Who it is for", durations: "Typical length", ...labels };
  return (
    <div data-ds-id="sections/ProgrammeCompare" className="sh-pcmp" style={style} {...rest}>
      {title ? <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement> : null}
      <table className="sh-pcmp-table">
        <caption>{caption}</caption>
        <thead><tr><th scope="col">{L.name}</th><th scope="col">{L.focus}</th><th scope="col">{L.forWhom}</th><th scope="col">{L.durations}</th></tr></thead>
        <tbody>
          {programmes.map((p) => (
            <tr key={p.name}>
              <th scope="row" className="sh-pcmp-name">{p.href ? <a href={p.href}>{p.name}<Icon name="arrow-right" size={16} /></a> : p.name}</th>
              <td data-label={L.focus}>{p.focus}</td>
              <td data-label={L.forWhom}>{p.forWhom}</td>
              <td data-label={L.durations} className="sh-pcmp-len">{p.durations}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
