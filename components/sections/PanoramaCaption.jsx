import React from "react";
import { Media } from "../editorial/Media.jsx";

/* Deck slide 5. A full-width photograph with a short caption bottom-left and no button —
   the pause between dense sections. 21:9 on desktop, 4:5 on phones so the frame keeps
   its height; the caption always sits inside a bottom scrim.
   The photograph and the caption share one grid cell: the frame keeps its ratio, and a
   caption that wraps taller than the frame (narrow tablet, large text) grows the frame
   instead of being clipped. */
const CSS = `
.sh-pano{position:relative;display:grid;isolation:isolate}
.sh-pano>*{grid-area:1/1;min-width:0}
.sh-pano>.sh-media{align-self:stretch;z-index:-1}
.sh-pano-cap{align-self:end;width:100%;padding-block:var(--section-y-sm)}
.sh-pano-cap .sh-container{display:flex;flex-direction:column;gap:var(--space-4)}
.sh-pano-title{margin:0;font:var(--type-title);color:var(--text-primary);max-width:26ch}
.sh-pano-sub{margin:0;font:var(--type-body-sm);color:var(--text-secondary);max-width:52ch}
@media (min-width:1000px){.sh-pano-title{font:var(--type-statement);max-width:24ch}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-pano-css")) return;
  const el = document.createElement("style");
  el.id = "sh-pano-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function PanoramaCaption({ src, alt = "", position, mobilePosition, title, sub, ratio = "21:9", mobileRatio = "4:5", headingLevel = 2, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  return (
    <section data-ds-id="sections/PanoramaCaption" className="sh-pano" data-ground="photo" style={style} {...rest}>
      <Media src={src} alt={alt} ratio={ratio} mobileRatio={mobileRatio} position={position} mobilePosition={mobilePosition} scrim="hero" />
      {title || sub ? (
        <div className="sh-pano-cap sh-photo-text">
          <div className="sh-container">
            {title ? <H className="sh-pano-title">{title}</H> : null}
            {sub ? <p className="sh-pano-sub">{sub}</p> : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
