import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Numeral } from "../editorial/Numeral.jsx";

/* Deck slide 8. A statement beside one to three large numerals, each standing on a
   hairline. Content currently supplies one figure (content/site.json therapies_count), so
   one is a first-class layout, not a gap: statement 7 columns, figure 5 from 1000px. Two or
   three figures: statement 5, figures 7. Stacked on phones, figures side by side while
   they fit. */
const CSS = `
.sh-nsplit{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:end}
/* Equal columns while the figures fit; a figure never shrinks below its own width, so a
   long value wraps to the next row instead of running into its neighbour. */
.sh-nsplit-nums{display:flex;flex-wrap:wrap;gap:var(--space-8) calc(var(--grid-gap) * 2)}
.sh-nsplit-nums>.sh-num{flex:1 1 0;min-width:max-content;padding-top:var(--space-5);border-top:var(--border-width) solid var(--rule-color)}
.sh-nsplit-nums[data-count="1"]>.sh-num{max-width:22rem}
.sh-nsplit .sh-num-label{font:var(--type-body)}
@media (min-width:1000px){
  .sh-nsplit{grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:calc(var(--grid-gap) * 2)}
  .sh-nsplit[data-count="1"]{grid-template-columns:minmax(0,7fr) minmax(0,5fr)}
  /* One or two figures carry the section: the top of the type scale (84px). */
  .sh-nsplit-nums:not([data-count="3"]) .sh-num-value{font-size:var(--text-6xl)}
}
.sh-nsplit-foot{grid-column:1/-1;margin:0;font:var(--type-body-sm);color:var(--text-secondary);max-width:var(--measure-body)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-nsplit-css")) return;
  const el = document.createElement("style");
  el.id = "sh-nsplit-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* numerals: [{ value, label }] — one to three. */
export function NumeralsSplit({ title, sub, numerals = [], footnote, style, ...rest }) {
  ensure();
  const shown = numerals.slice(0, 3);
  return (
    <div data-ds-id="sections/NumeralsSplit" className="sh-nsplit" data-count={String(shown.length)} style={style} {...rest}>
      <Statement sub={sub}>{title}</Statement>
      <div className="sh-nsplit-nums" data-count={String(shown.length)}>
        {shown.map((n) => <Numeral key={n.label} value={n.value} label={n.label} />)}
      </div>
      {footnote ? <p className="sh-nsplit-foot">{footnote}</p> : null}
    </div>
  );
}
