import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Numeral } from "../editorial/Numeral.jsx";

/* Deck slide 8. A statement beside two (at most three) large numerals. Stacked on
   phones with the numerals side by side while they fit; 5/7 columns from 1000px. */
const CSS = `
.sh-nsplit{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:end}
/* Equal columns while the figures fit; a figure never shrinks below its own width, so a
   long value wraps to the next row instead of running into its neighbour. */
.sh-nsplit-nums{display:flex;flex-wrap:wrap;gap:var(--space-8) calc(var(--grid-gap) * 2)}
.sh-nsplit-nums>.sh-num{flex:1 1 0;min-width:max-content}
@media (min-width:1000px){.sh-nsplit{grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:calc(var(--grid-gap) * 2)}}
.sh-nsplit-foot{grid-column:1/-1;margin:0;font:var(--type-body-sm);color:var(--text-secondary);max-width:var(--measure-body)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-nsplit-css")) return;
  const el = document.createElement("style");
  el.id = "sh-nsplit-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* numerals: [{ value, label }] — two or three. */
export function NumeralsSplit({ title, sub, numerals = [], footnote, style, ...rest }) {
  ensure();
  const shown = numerals.slice(0, 3);
  return (
    <div data-ds-id="sections/NumeralsSplit" className="sh-nsplit" style={style} {...rest}>
      <Statement sub={sub}>{title}</Statement>
      <div className="sh-nsplit-nums" data-count={String(shown.length)}>
        {shown.map((n) => <Numeral key={n.label} value={n.value} label={n.label} />)}
      </div>
      {footnote ? <p className="sh-nsplit-foot">{footnote}</p> : null}
    </div>
  );
}
