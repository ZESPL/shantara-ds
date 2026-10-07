import React from "react";

/* A time column in olive, then a title and a line (deck slide 15). The time can be a
   clock range or a part of the day. Under 760px the time sits above the title. */
const CSS = `
.sh-time{list-style:none;margin:0;padding:0}
.sh-time-row{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-2);padding:var(--space-5) 0;border-top:var(--border-width) solid var(--rule-color)}
.sh-time-row:last-child{border-bottom:var(--border-width) solid var(--rule-color)}
.sh-time-when{font:var(--type-body-sm);color:var(--text-brand);font-variant-numeric:tabular-nums}
.sh-time-title{margin:0;font:var(--type-item-sm);color:var(--text-primary)}
.sh-time-text{margin:var(--space-2) 0 0;font:var(--type-body-sm);color:var(--text-secondary);max-width:56ch}
@media (min-width:760px){.sh-time-row{grid-template-columns:minmax(9rem,2fr) minmax(0,5fr);gap:var(--grid-gap);align-items:baseline}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-time-css")) return;
  const el = document.createElement("style");
  el.id = "sh-time-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function TimeTable({ rows = [], headingLevel = 3, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  return (
    <ol data-ds-id="editorial/TimeTable" className="sh-time" style={style} {...rest}>
      {rows.map((r, i) => (
        <li className="sh-time-row" key={r.time + i}>
          <span className="sh-time-when">{r.time}</span>
          <div>
            <H className="sh-time-title">{r.title}</H>
            {r.text ? <p className="sh-time-text">{r.text}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
