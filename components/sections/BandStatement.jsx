import React from "react";
import { PatternPanel } from "../core/PatternPanel.jsx";
import { QuoteBlock } from "../editorial/QuoteBlock.jsx";

/* Deck slide 3. Solid Himalaya with the rosette band on one edge (30% of the surface,
   cell = 15cqw so it is always band/2 and never under 130px). Merino Light statement
   (no label above it), optional plain list. One per page at most — it is the page's accent.
   Under 880px the band disappears (PatternPanel's container query). */
const CSS = `
.sh-band-body{padding-block:var(--section-y)}
/* Align the text with the page container's left edge (100cqw = the panel's width). */
.sh-band-body>.sh-container{display:flex;flex-direction:column;gap:var(--stack-lg);max-width:calc(52rem + 2 * var(--layout-gutter));margin-inline:max(0px, (100cqw - var(--layout-max)) / 2 - var(--layout-gutter)) 0}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-band-css")) return;
  const el = document.createElement("style");
  el.id = "sh-band-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* `quote`: the page's one accent can be a doctor's or the founder's own words instead of a
   statement — { quote, cite, role }. Real words only (QuoteBlock rules). */
export function BandStatement({ edge = "end", ground = "himalaya", quote, children, style, ...rest }) {
  ensure();
  return (
    <PatternPanel data-ds-id="sections/BandStatement" tone={ground === "pine" ? "pine" : "olive"} edge={edge} band="30%" scale="15cqw" data-ground={ground} style={style} {...rest}>
      <div className="sh-band-body">
        <div className="sh-container">{quote ? <QuoteBlock quote={quote.quote} cite={quote.cite} role={quote.role} /> : null}{children}</div>
      </div>
    </PatternPanel>
  );
}
