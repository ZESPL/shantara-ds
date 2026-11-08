import React from "react";
import { Media } from "./Media.jsx";
import { MetaRow } from "./MetaRow.jsx";
import { Tag } from "../core/Tag.jsx";

/* Replaces the white card on linen. Photograph and text sit directly on the ground,
   with no border, shadow or radius. Order: photograph → title → meta row → text. Category and
   duration live in the meta row BELOW the title, never above it. Hover: the photograph
   scales to 1.02 inside its frame and the title takes a hairline underline. */
const CSS = `
.sh-tile{display:flex;flex-direction:column;gap:var(--space-5);min-width:0;color:inherit;text-decoration:none}
.sh-tile[data-href]{cursor:pointer}
.sh-tile .sh-media>img{transition:transform var(--duration-reveal) var(--ease-out)}
.sh-tile-body{display:flex;flex-direction:column;gap:var(--space-3);min-width:0}
.sh-tile-title{margin:0;font:var(--type-item);color:var(--text-primary);text-wrap:balance}
.sh-tile-title>span{background:linear-gradient(currentColor,currentColor) 0 100% / 0 1px no-repeat;transition:background-size var(--duration-base) var(--ease-out);padding-bottom:2px}
.sh-tile-body>.sh-meta{margin-top:calc(var(--space-1) * -1)}
.sh-tile-text{margin:var(--space-1) 0 0;font:var(--type-body-sm);color:var(--text-secondary);max-width:48ch}
.sh-tile-meta{margin:0;font:var(--type-caption);color:var(--text-muted);font-variant-numeric:tabular-nums}
.sh-tile[data-size="lg"] .sh-tile-title{font:var(--type-title)}
.sh-tile[data-size="lg"] .sh-tile-text{font:var(--type-body);max-width:56ch}
.sh-tile-tags{display:flex;flex-wrap:wrap;gap:var(--space-2);margin:var(--space-2) 0 0;padding:0;list-style:none}
.sh-tile:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){
  .sh-tile[data-href]:hover .sh-media>img{transform:scale(var(--tile-media-scale))}
  .sh-tile[data-href]:hover .sh-tile-title>span{background-size:100% 1px}
}
/* layout="row": photograph beside text from 760px, for lists of articles or rooms. */
@media (min-width:760px){
  .sh-tile[data-layout="row"]{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:var(--grid-gap);align-items:center}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-tile-css")) return;
  const el = document.createElement("style");
  el.id = "sh-tile-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* tags: static Tags under the text, e.g. the conditions a programme is for (catalogue rows). */
export function Tile({ media, src, alt = "", ratio = "4:3", title, text, meta, tags, href, onClick, size = "md", layout = "stack", headingLevel = 3, style, ...rest }) {
  ensure();
  const interactive = !!(href || onClick);
  const El = interactive ? "a" : "div";
  const H = "h" + headingLevel;
  const figure = media || (src ? <Media src={src} alt={alt} ratio={ratio} /> : null);
  const metaNode = meta == null || meta === false ? null
    : Array.isArray(meta) || typeof meta === "string" ? <MetaRow items={meta} />
    : <div className="sh-tile-meta">{meta}</div>;
  return (
    <El
      data-ds-id="editorial/Tile"
      className="sh-tile"
      data-size={size}
      data-layout={layout}
      data-href={interactive ? "" : undefined}
      href={interactive ? href || "#" : undefined}
      onClick={onClick ? (e) => { if (!href) e.preventDefault(); onClick(e); } : undefined}
      style={style}
      {...rest}
    >
      {figure}
      <div className="sh-tile-body">
        <H className="sh-tile-title"><span>{title}</span></H>
        {metaNode}
        {text ? <p className="sh-tile-text">{text}</p> : null}
        {tags && tags.length ? <ul className="sh-tile-tags">{tags.map((tag) => <li key={tag}><Tag>{tag}</Tag></li>)}</ul> : null}
      </div>
    </El>
  );
}
