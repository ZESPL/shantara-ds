import React from "react";
import { Media } from "../editorial/Media.jsx";
import { MetaRow } from "../editorial/MetaRow.jsx";

/* One page, many entries — Therapies, Rooms, Farm & Dining. The IA gives each family one
   page, so a link to a single therapy or room is `/en/therapies#hijama`: every entry carries
   that `id`, and its anchor clears the sticky header plus an InPageNav.
   Entry: photograph → name (h3) → meta row → one paragraph → optional facts (SpecTable /
   PlainList) → optional link. Phones: photograph first, full width. ≥1000px: photograph and
   text side by side (5 / 7 by default), sides alternating, entries ruled apart. */
const CSS = `
.sh-cat{display:flex;flex-direction:column}
.sh-cat-entry{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-6);padding-block:var(--stack-lg);border-top:var(--border-width) solid var(--rule-color);scroll-margin-top:calc(var(--header-h, 72px) + 64px)}
.sh-cat-entry:first-child{border-top:0;padding-top:0}
.sh-cat-entry:last-child{padding-bottom:0}
.sh-cat-body{display:flex;flex-direction:column;gap:var(--space-4);min-width:0}
.sh-cat-title{margin:0;font:var(--type-title);color:var(--text-primary);text-wrap:balance}
.sh-cat-text{margin:0;font:var(--type-body);color:var(--text-secondary);max-width:var(--measure-body)}
.sh-cat-facts{margin-top:var(--space-3)}
.sh-cat-action{margin-top:var(--space-2)}
.sh-cat-entry:target .sh-cat-title{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:6px;text-decoration-color:var(--text-brand)}
@media (max-width:759.98px){.sh-cat-entry>.sh-media{margin-inline:calc(-1 * var(--layout-gutter))}}
@media (min-width:1000px){
  .sh-cat-entry{grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:calc(var(--grid-gap) * 2);align-items:center}
  .sh-cat[data-alternate="true"] .sh-cat-entry:nth-child(even)>.sh-media{order:2}
  .sh-cat[data-alternate="true"] .sh-cat-entry:nth-child(even){grid-template-columns:minmax(0,7fr) minmax(0,5fr)}
  .sh-cat[data-media="half"] .sh-cat-entry,.sh-cat[data-media="half"][data-alternate="true"] .sh-cat-entry:nth-child(even){grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-cat-css")) return;
  const el = document.createElement("style");
  el.id = "sh-cat-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* entries: [{ id, title, text?, meta?, src?, alt?, media?, position?, facts?, action? }] */
export function CatalogueSection({ entries = [], alternate = true, media = "5", ratio = "4:3", headingLevel = 3, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  return (
    <div data-ds-id="sections/CatalogueSection" className="sh-cat" data-alternate={String(alternate)} data-media={media === "half" ? "half" : "5"} style={style} {...rest}>
      {entries.map((e) => (
        <article className="sh-cat-entry" id={e.id} key={e.id || e.title}>
          {e.media || (e.src ? <Media src={e.src} alt={e.alt || ""} ratio={ratio} position={e.position} /> : null)}
          <div className="sh-cat-body">
            <H className="sh-cat-title">{e.title}</H>
            {e.meta ? (Array.isArray(e.meta) || typeof e.meta === "string" ? <MetaRow items={e.meta} /> : e.meta) : null}
            {e.text ? <p className="sh-cat-text">{e.text}</p> : null}
            {e.facts ? <div className="sh-cat-facts">{e.facts}</div> : null}
            {e.action ? <div className="sh-cat-action">{e.action}</div> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
