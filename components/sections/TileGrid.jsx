import React from "react";
import { Statement } from "../editorial/Statement.jsx";

/* Deck slide 11. A heading row (statement + one text link on the right), then tiles.
   layout "3": three across from 1000px. layout "feature": one large tile (7 columns) and
   the rest stacked beside it (5 columns). layout "2": two across.
   Never an uneven last row: on tablets (760–999px) an odd count makes the first tile span
   both columns; on phones tiles stack. Keep counts to multiples of the column count. */
const CSS = `
.sh-tgrid{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-tgrid-head{display:flex;flex-direction:column;gap:var(--space-5)}
.sh-tgrid-items{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-10) var(--grid-gap)}
.sh-tgrid-foot{margin:0;font:var(--type-body-sm);color:var(--text-secondary);max-width:var(--measure-body)}
@media (min-width:760px){
  .sh-tgrid-head{flex-direction:row;align-items:flex-end;justify-content:space-between;gap:var(--grid-gap)}
  .sh-tgrid-head>:last-child:not(:first-child){flex:0 0 auto}
  .sh-tgrid-items{grid-template-columns:repeat(2,minmax(0,1fr))}
  .sh-tgrid-items[data-odd="true"]>:first-child{grid-column:1/-1}
  /* Uniform tiles: tiles in a row share the rows photograph, title, meta, text — so a
     two-line title or a longer description never pushes its neighbours' text out of line.
     Each part is placed in its own row, so a tile without meta or text keeps the others. */
  /* The parent's row gap would sit between a tile's own rows, so it is zero here and each
     tile carries a fifth spacer row that makes the gap between rows of tiles. */
  .sh-tgrid-items:not([data-layout="feature"]){row-gap:0;margin-bottom:calc(var(--space-10) * -1)}
  .sh-tgrid-items:not([data-layout="feature"])>.sh-tile[data-layout="stack"]{display:grid;grid-template-rows:subgrid;grid-row:span 5;row-gap:0;align-content:start}
  .sh-tgrid-items:not([data-layout="feature"])>.sh-tile[data-layout="stack"]::after{content:"";grid-row:5;height:var(--space-10)}
  .sh-tgrid-items:not([data-layout="feature"])>.sh-tile[data-layout="stack"]>.sh-tile-body{display:contents}
  .sh-tgrid-items:not([data-layout="feature"])>.sh-tile[data-layout="stack"]>.sh-media{grid-row:1}
  .sh-tgrid-items:not([data-layout="feature"])>.sh-tile[data-layout="stack"] .sh-tile-title{grid-row:2;align-self:start;margin-top:var(--space-5)}
  .sh-tgrid-items:not([data-layout="feature"])>.sh-tile[data-layout="stack"] .sh-tile-body>.sh-meta,
  .sh-tgrid-items:not([data-layout="feature"])>.sh-tile[data-layout="stack"] .sh-tile-meta{grid-row:3;align-self:start;margin-top:var(--space-2)}
  .sh-tgrid-items:not([data-layout="feature"])>.sh-tile[data-layout="stack"] .sh-tile-text{grid-row:4;align-self:start;margin-top:var(--space-3)}
}
@media (min-width:1000px){
  .sh-tgrid-items[data-layout="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}
  .sh-tgrid-items[data-layout="3"][data-odd="true"]>:first-child{grid-column:auto}
  .sh-tgrid-items[data-layout="2"][data-odd="true"]>:first-child{grid-column:1/-1}
  .sh-tgrid-items[data-layout="feature"]{grid-template-columns:minmax(0,7fr) minmax(0,5fr);grid-auto-flow:dense}
  .sh-tgrid-items[data-layout="feature"]>:first-child{grid-column:1;grid-row:1 / span var(--_rest,2)}
  .sh-tgrid-items[data-layout="feature"]>:not(:first-child){grid-column:2}
  .sh-tgrid-items[data-layout="feature"][data-odd="true"]>:first-child{grid-column:1}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-tgrid-css")) return;
  const el = document.createElement("style");
  el.id = "sh-tgrid-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function TileGrid({ title, sub, action, layout = "3", footnote, children, style, ...rest }) {
  ensure();
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <div data-ds-id="sections/TileGrid" className="sh-tgrid" style={style} {...rest}>
      {title || action ? (
        <div className="sh-tgrid-head">
          {title ? <Statement sub={sub}>{title}</Statement> : <span />}
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
      <div className="sh-tgrid-items" data-layout={layout} data-odd={String(items.length % 2 === 1)} style={{ "--_rest": String(Math.max(1, items.length - 1)) }}>
        {items}
      </div>
      {footnote ? <p className="sh-tgrid-foot">{footnote}</p> : null}
    </div>
  );
}
