import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Media } from "../editorial/Media.jsx";

/* Photographs of a place — Rooms, Dining, Amenities, Hosted visits. A fixed rhythm of wide
   and tall frames that repeats every five photographs, each with an optional caption. No
   carousel, no lightbox, no thumbnail strip (skill-sections: one photograph per job).
   Frames without guests; every photograph needs real alt text.
   ≥1000px (6 columns): [wide 4 + tall 2] then [three at 2] — the tall frame stretches to
   the wide frame's height. 760–999px: one wide across, then pairs. Phones: one column. */
const CSS = `
.sh-gal{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-gal-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-8) var(--grid-gap);align-items:stretch}
.sh-gal-item{display:flex;flex-direction:column;gap:var(--space-3);margin:0;min-width:0}
.sh-gal-item>.sh-media{flex:1 1 auto;aspect-ratio:4 / 3}
.sh-gal-cap{font:var(--type-caption);color:var(--text-secondary);max-width:52ch}
@media (min-width:760px){
  .sh-gal-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .sh-gal-item:nth-child(5n+1){grid-column:1/-1}
  .sh-gal-item:nth-child(5n+1)>.sh-media{aspect-ratio:16 / 9}
}
@media (min-width:1000px){
  .sh-gal-grid{grid-template-columns:repeat(6,minmax(0,1fr))}
  .sh-gal-item{grid-column:span 2}
  .sh-gal-item:nth-child(5n+1){grid-column:span 4}
  .sh-gal-item:nth-child(5n+1)>.sh-media{aspect-ratio:3 / 2}
  .sh-gal-item:nth-child(5n+2)>.sh-media{aspect-ratio:auto;min-height:240px}
  .sh-gal-item:nth-child(5n+2){grid-column:span 2}
  /* A lone last frame after a wide one would leave a gap: let it fill the row. */
  .sh-gal-item:nth-child(5n+1):last-child{grid-column:1/-1}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-gal-css")) return;
  const el = document.createElement("style");
  el.id = "sh-gal-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* items: [{ src, alt, caption?, position? }] — five or ten read best */
export function GalleryGrid({ title, sub, items = [], action, headingLevel = 2, style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="sections/GalleryGrid" className="sh-gal" style={style} {...rest}>
      {title ? <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement> : null}
      <div className="sh-gal-grid">
        {items.map((it, i) => (
          <figure className="sh-gal-item" key={it.src + i}>
            <Media src={it.src} alt={it.alt || ""} ratio="4:3" position={it.position} />
            {it.caption ? <figcaption className="sh-gal-cap">{it.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
