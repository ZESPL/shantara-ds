import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { MetaRow } from "../editorial/MetaRow.jsx";
import { Media } from "../editorial/Media.jsx";
import { PatternPanel } from "../core/PatternPanel.jsx";

/* The EDITORIAL hero (deck slide 2). Words lead; no full photograph. A Merino or Stone
   ground, breadcrumbs, a large Light h1 placed low with open space above, one supporting
   line and actions — closed by a hairline with an optional meta row beneath it
   ("Reviewed by … · Updated …"). Presence without a label above the title:
   - pattern: the rosette band on one edge (30% of the surface) — drops under 880px of
     hero width, and the text re-aligns to the page container on the other side;
   - src / aside: a small 4:5 image or a short fact list in a 4-column side column (≥760px).
   Stacks on phones: crumbs → title → sub → actions → image/aside → rule → meta. */
const CSS = `
.sh-hstmt{position:relative;display:flex;flex-direction:column}
.sh-hstmt[data-tall="true"]{min-height:clamp(440px, 64svh, 760px)}
/* variant "utility": legal pages, 404, confirmation — short, no band, no image, no rule. */
.sh-hstmt[data-variant="utility"] .sh-hstmt-inner{padding-block:calc(var(--header-h, 72px) + var(--space-10)) var(--space-8)}
.sh-hstmt>.sh-pp{flex:1 1 auto;display:flex;flex-direction:column}
.sh-hstmt .sh-pp-body{flex:1 1 auto;display:flex;flex-direction:column}
.sh-hstmt-inner{flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-end;padding-block:calc(var(--space-12) + var(--section-y-sm)) var(--section-y-sm)}
.sh-hstmt-inner>.sh-container{width:100%;flex:1 1 auto;display:flex;flex-direction:column;justify-content:flex-end}
.sh-hstmt-crumbs{margin-bottom:auto;padding-bottom:var(--stack-lg)}
.sh-hstmt[data-tall="false"] .sh-hstmt-crumbs{margin-bottom:0}
.sh-hstmt-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:end}
.sh-hstmt-side{display:flex;flex-direction:column;gap:var(--space-6);min-width:0}
.sh-hstmt-side>.sh-media{max-width:min(100%, 360px)}
.sh-hstmt-foot{margin-top:var(--stack-lg);padding-top:var(--space-4);border-top:var(--border-width) solid var(--rule-color);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-3) var(--space-6)}
.sh-hstmt-foot:empty{padding-top:0}
@media (max-width:759.98px){.sh-hstmt-side>.sh-media{max-width:none}}
/* From tablet the side column sits beside the title (7/4) rather than as a small image
   stranded on the left under it. */
@media (min-width:760px){
  .sh-hstmt-grid[data-aside="true"]{grid-template-columns:minmax(0,7fr) minmax(0,4fr);gap:var(--grid-gap) calc(var(--grid-gap) * 2)}
  .sh-hstmt-side>.sh-media{max-width:none}
}
@container (min-width:880px){
  .sh-hstmt[data-pattern="end"] .sh-hstmt-inner>.sh-container{max-width:calc(56rem + 2 * var(--layout-gutter));margin-inline:max(0px, (100cqw - var(--layout-max)) / 2 - var(--layout-gutter)) 0}
  .sh-hstmt[data-pattern="start"] .sh-hstmt-inner>.sh-container{max-width:calc(56rem + 2 * var(--layout-gutter));margin-inline:0 max(0px, (100cqw - var(--layout-max)) / 2 - var(--layout-gutter))}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-hstmt-css")) return;
  const el = document.createElement("style");
  el.id = "sh-hstmt-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function HeroStatement({ variant = "editorial", title, sub, actions, breadcrumbs, meta, rule = true, aside, media, src, alt = "", ratio = "4:5", pattern = false, ground = "merino", tall = true, size = "h1", titleAs = "h1", measure = "22ch", style, ...rest }) {
  ensure();
  const utility = variant === "utility";
  if (utility) { pattern = false; tall = false; rule = !!meta; }
  const edge = pattern === true ? "end" : pattern || null;
  const figure = media || (src ? <Media src={src} alt={alt} ratio={ratio} priority /> : null);
  const hasSide = !!(figure || aside);
  const metaNode = meta ? (Array.isArray(meta) || typeof meta === "string" ? <MetaRow items={meta} /> : meta) : null;
  const inner = (
    <div className="sh-hstmt-inner">
      <div className="sh-container">
        {breadcrumbs ? <div className="sh-hstmt-crumbs">{breadcrumbs}</div> : null}
        <div className="sh-hstmt-grid" data-aside={hasSide ? "true" : "false"}>
          <Statement as={titleAs} size={size} sub={sub} actions={actions} measure={measure}>{title}</Statement>
          {hasSide ? <div className="sh-hstmt-side">{figure}{aside}</div> : null}
        </div>
        {rule || metaNode ? <div className="sh-hstmt-foot" style={rule ? undefined : { borderTop: 0 }}>{metaNode}</div> : null}
      </div>
    </div>
  );
  return (
    <section data-ds-id="sections/HeroStatement" className="sh-hstmt" data-ground={ground} data-tall={String(tall)} data-variant={utility ? "utility" : undefined} data-pattern={edge || undefined} style={style} {...rest}>
      {edge ? (
        <PatternPanel tone={ground === "stone" ? "pearl" : "merino"} edge={edge} band="30%" scale="15cqw" data-ds-id="core/PatternPanel">{inner}</PatternPanel>
      ) : inner}
    </section>
  );
}
