import React from "react";
import { Media } from "../editorial/Media.jsx";
import { Statement } from "../editorial/Statement.jsx";
import { MetaRow } from "../editorial/MetaRow.jsx";
import { Video } from "../editorial/Video.jsx";

/* The OFFER hero, for programme and other detail pages. Always boxed: the header and the
   page are boxed, so the photograph never runs to the screen edge. ≥1000px: the photograph
   and, on a flat ground, the Statement (breadcrumbs just above the h1), meta row (category ·
   duration), one supporting line, actions and optional facts sit side by side inside the
   page container (1240px), below the header, both columns on the logo's and controls' lines
   (50/50, or 40/60 with split), the text vertically centred. <1000px: text first (clears the
   header), then the photograph full width at `mobileRatio`; `mobileMediaFirst` reverses that. */
const CSS = `
.sh-hsplit{container-type:inline-size;position:relative}
.sh-hsplit-grid{display:grid;grid-template-columns:minmax(0,1fr)}
.sh-hsplit-media{position:relative;min-width:0}
.sh-hsplit-media>.sh-media,.sh-hsplit-media>.sh-video{aspect-ratio:var(--_mr,var(--media-ratio))}
.sh-hsplit-text{min-width:0;display:flex;flex-direction:column;gap:var(--stack-lg);padding:calc(var(--space-12) + var(--section-y-sm)) var(--layout-gutter) var(--section-y-sm)}
.sh-hsplit-main{display:flex;flex-direction:column;gap:var(--stack-lg);margin-block:auto}
.sh-hsplit[data-mobile-first="true"] .sh-hsplit-media{order:-1}
.sh-hsplit[data-mobile-first="true"] .sh-hsplit-text{padding-top:var(--section-y-sm)}
.sh-hsplit-facts{container-type:inline-size;padding-top:var(--space-5);border-top:var(--border-width) solid var(--rule-color)}
/* A two-column fact list only while each column keeps a readable line (about 15ch+). */
@container (max-width:480px){.sh-hsplit-facts .sh-plist[data-columns]{grid-template-columns:minmax(0,1fr)}}
@media (min-width:1000px){
  .sh-hsplit-grid{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:calc(var(--grid-gap) * 2.5);box-sizing:border-box;max-width:calc(var(--layout-max) + 2 * var(--layout-gutter));min-height:var(--_minh,clamp(600px, 88svh, 920px));margin-inline:auto;padding:calc(var(--space-12) + var(--section-y-sm)) var(--layout-gutter) var(--section-y-sm)}
  .sh-hsplit[data-split="40"] .sh-hsplit-grid{grid-template-columns:minmax(0,3fr) minmax(0,2fr)}
  .sh-hsplit[data-split="60"] .sh-hsplit-grid{grid-template-columns:minmax(0,2fr) minmax(0,3fr)}
  .sh-hsplit[data-side="start"][data-split="40"] .sh-hsplit-grid{grid-template-columns:minmax(0,2fr) minmax(0,3fr)}
  .sh-hsplit[data-side="start"][data-split="60"] .sh-hsplit-grid{grid-template-columns:minmax(0,3fr) minmax(0,2fr)}
  .sh-hsplit-media,.sh-hsplit[data-mobile-first="true"] .sh-hsplit-media{order:2}
  .sh-hsplit[data-side="start"] .sh-hsplit-media{order:-1}
  .sh-hsplit-media>.sh-media,.sh-hsplit-media>.sh-video{position:absolute;inset:0;aspect-ratio:auto;height:100%}
  .sh-hsplit-text,.sh-hsplit[data-mobile-first="true"] .sh-hsplit-text{padding:0}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-hsplit-css")) return;
  const el = document.createElement("style");
  el.id = "sh-hsplit-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const MR = { "4:3": "var(--media-ratio)", "4:5": "var(--media-ratio-portrait)", "3:2": "3 / 2", "16:9": "var(--media-ratio-wide)", "1:1": "1 / 1" };

export function HeroSplit({ media, video, src, alt = "", position, mobilePosition, title, sub, actions, meta, breadcrumbs, facts, mediaSide = "end", split = "50", ground = "merino", mobileRatio = "4:3", mobileMediaFirst = false, minHeight, size = "h1", titleAs = "h1", measure = "title", style, ...rest }) {
  ensure();
  /* `video`: a short muted loop in place of the photograph (editorial/Video, R2 only). */
  const figure = media || (video ? <Video {...video} mode="loop" ratio="4:3" /> : <Media src={src} alt={alt} ratio="4:3" position={position} mobilePosition={mobilePosition} priority />);
  const vars = { "--_mr": MR[mobileRatio] || mobileRatio };
  if (minHeight) vars["--_minh"] = minHeight;
  const metaNode = meta ? (Array.isArray(meta) || typeof meta === "string" ? <MetaRow items={meta} /> : meta) : null;
  return (
    <section data-ds-id="sections/HeroSplit" className="sh-hsplit" data-ground={ground} data-side={mediaSide} data-split={split} data-mobile-first={String(mobileMediaFirst)} style={{ ...vars, ...style }} {...rest}>
      <div className="sh-hsplit-grid">
        <div className="sh-hsplit-text">
          <div className="sh-hsplit-main">
            <Statement as={titleAs} size={size} meta={metaNode} sub={sub} actions={actions} breadcrumbs={breadcrumbs} measure={measure}>{title}</Statement>
            {facts ? <div className="sh-hsplit-facts">{facts}</div> : null}
          </div>
        </div>
        <div className="sh-hsplit-media">{figure}</div>
      </div>
    </section>
  );
}
