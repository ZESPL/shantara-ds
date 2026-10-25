import React from "react";
import { Media } from "../editorial/Media.jsx";

/* Deck slides 4, 6, 13. A photograph on one side that runs to the edge of the screen,
   text on the other, bottom-aligned with open space above.
   ≥1000px: two columns (50/50 or 40/60 with `split`), the photo fills its column's full
   height, the text column aligns to the page container on its outer edge.
   <1000px: the photo goes first, full width at `mobileRatio`, then the text with the
   normal gutter. `bleed={false}` keeps the photo inside the container instead. */
const CSS = `
.sh-split{container-type:inline-size;position:relative}
.sh-split-grid{display:grid;grid-template-columns:minmax(0,1fr)}
.sh-split-media{position:relative;min-width:0}
.sh-split-media .sh-media{aspect-ratio:var(--_mr,var(--media-ratio))}
.sh-split-text{min-width:0;padding:var(--section-y-sm) var(--layout-gutter);display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-split[data-bleed="false"] .sh-split-grid{max-width:calc(var(--layout-max) + 2 * var(--layout-gutter));margin-inline:auto;padding-inline:var(--layout-gutter);padding-block:var(--section-y-sm)}
.sh-split[data-bleed="false"] .sh-split-text{padding-inline:0;padding-block:var(--stack-lg) 0}
@media (min-width:1000px){
  .sh-split{--_outer:max(var(--layout-gutter), (100cqw - var(--layout-max)) / 2)}
  .sh-split-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:var(--_minh,clamp(560px, 48vw, 820px))}
  .sh-split[data-split="40"] .sh-split-grid{grid-template-columns:minmax(0,2fr) minmax(0,3fr)}
  .sh-split[data-split="60"] .sh-split-grid{grid-template-columns:minmax(0,3fr) minmax(0,2fr)}
  .sh-split[data-side="end"] .sh-split-media{order:2}
  .sh-split[data-side="end"][data-split="40"] .sh-split-grid{grid-template-columns:minmax(0,3fr) minmax(0,2fr)}
  .sh-split[data-side="end"][data-split="60"] .sh-split-grid{grid-template-columns:minmax(0,2fr) minmax(0,3fr)}
  .sh-split[data-bleed="true"] .sh-split-media .sh-media{position:absolute;inset:0;aspect-ratio:auto;height:100%}
  .sh-split-text{padding-block:var(--section-y);justify-content:var(--_align,flex-end)}
  .sh-split[data-side="start"] .sh-split-text{padding-inline:calc(var(--grid-gap) * 2.5) var(--_outer)}
  .sh-split[data-side="end"] .sh-split-text{padding-inline:var(--_outer) calc(var(--grid-gap) * 2.5)}
  .sh-split[data-bleed="false"] .sh-split-grid{min-height:0;gap:calc(var(--grid-gap) * 2.5);padding-block:var(--section-y)}
  .sh-split[data-bleed="false"] .sh-split-text{padding:0}
}
/* Sticky only when the window can show the whole block (see FormSplit). */
@media (min-width:1000px) and (min-height:800px){.sh-split-sticky{position:sticky;top:calc(var(--space-12) + 16px)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-split-css")) return;
  const el = document.createElement("style");
  el.id = "sh-split-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function SplitSection({ media, src, alt = "", position, mediaSide = "start", split = "50", bleed = true, align = "end", mobileRatio = "4:3", minHeight, ground = "merino", children, style, ...rest }) {
  ensure();
  const figure = media || <Media src={src} alt={alt} position={position} />;
  const vars = { "--_mr": { "4:3": "var(--media-ratio)", "4:5": "var(--media-ratio-portrait)", "3:4": "var(--media-ratio-tall)", "16:9": "var(--media-ratio-wide)", "1:1": "1 / 1" }[mobileRatio] || mobileRatio, "--_align": align === "center" ? "center" : align === "start" ? "flex-start" : "flex-end" };
  if (minHeight) vars["--_minh"] = minHeight;
  return (
    <section data-ds-id="sections/SplitSection" className="sh-split" data-ground={ground} data-side={mediaSide} data-split={split} data-bleed={String(bleed)} style={{ ...vars, ...style }} {...rest}>
      <div className="sh-split-grid">
        <div className="sh-split-media">{figure}</div>
        <div className="sh-split-text">{children}</div>
      </div>
    </section>
  );
}
