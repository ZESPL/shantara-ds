import React from "react";
import { Media } from "./Media.jsx";

/* A photograph or diagram inside an article, with a caption and an optional credit.
   width "prose" keeps the 68ch measure; "wide" breaks out to ~68ch + 16rem from 1000px
   (inside Prose); "full" fills the container. */
const CSS = `
.sh-afig{margin:2em 0;min-width:0}
.sh-afig[data-width="prose"]{max-width:var(--measure-body)}
.sh-afig-cap{display:flex;flex-wrap:wrap;gap:var(--space-1) var(--space-4);margin-top:var(--space-3);font:var(--type-caption);color:var(--text-muted);max-width:var(--measure-body)}
.sh-afig-cap>span:first-child{color:var(--text-secondary)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-afig-css")) return;
  const el = document.createElement("style");
  el.id = "sh-afig-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function ArticleFigure({ src, alt = "", media, ratio = "3:2", mobileRatio, caption, credit, width = "prose", style, ...rest }) {
  ensure();
  return (
    <figure data-ds-id="editorial/ArticleFigure" className="sh-afig" data-width={width} style={style} {...rest}>
      {media || <Media src={src} alt={alt} ratio={ratio} mobileRatio={mobileRatio} />}
      {caption || credit ? (
        <figcaption className="sh-afig-cap">
          {caption ? <span>{caption}</span> : null}
          {credit ? <span>{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
