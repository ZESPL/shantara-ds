import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Pagination } from "../editorial/Pagination.jsx";
import { TileGrid } from "./TileGrid.jsx";

/* A filterable listing — the Journal index and its categories. A heading, a row of category
   chips (one selected; "All" first), the tiles in a TileGrid, pagination, and a plain empty
   state when a category has nothing yet. Categories come from content/articles/.
   The chips filter in place when `onCategory` is given; give each category an `href`
   instead for crawlable category pages.
   Phones: chips scroll sideways in one row; tiles stack. ≥760px: chips wrap; tiles 2 across,
   3 from 1000px (TileGrid). */
const CSS = `
.sh-list{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-list-chips{display:flex;gap:var(--space-3);margin:0;padding:0 0 var(--space-1);list-style:none;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.sh-list-chips::-webkit-scrollbar{display:none}
.sh-list-chips>li{flex:0 0 auto}
/* Chips match Tag (interactive): a button that filters in place, or a link to a category page. */
.sh-list-chip{display:inline-flex;align-items:center;height:36px;padding:0 var(--space-5);border-radius:var(--radius-chip);border:var(--border-width) solid var(--border-control);background:transparent;color:var(--text-primary);font:var(--type-body-sm);white-space:nowrap;text-decoration:none;cursor:pointer;transition:var(--transition-control)}
.sh-list-chip[aria-pressed="true"],.sh-list-chip[aria-current="page"]{background:var(--surface-brand);border-color:var(--surface-brand);color:var(--text-on-brand)}
.sh-list-chip:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-list-chip:not([aria-pressed="true"]):not([aria-current="page"]):hover{background:var(--surface-sunken)}}
@media (pointer: coarse){.sh-list-chip{height:var(--tap-min)}}
.sh-list-empty{margin:0;padding:var(--stack-lg) 0;border-block:var(--border-width) solid var(--rule-color);font:var(--type-body);color:var(--text-secondary);max-width:var(--measure-body)}
.sh-list-foot{display:flex;justify-content:center}
@media (max-width:759.98px){.sh-list-chips{margin-inline:calc(-1 * var(--layout-gutter));padding-inline:var(--layout-gutter)}}
@media (min-width:760px){.sh-list-chips{flex-wrap:wrap;overflow:visible}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-list-css")) return;
  const el = document.createElement("style");
  el.id = "sh-list-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* categories: [{ id, label, href? }] · children: <Tile/>s for the current page */
export function ListingSection({ title, sub, categories = [], category = "all", onCategory, allLabel = "All", page = 1, pageCount = 1, onPage, hrefFor, empty = "There is nothing in this category yet.", layout = "3", children, style, ...rest }) {
  ensure();
  const items = React.Children.toArray(children).filter(Boolean);
  const chips = [{ id: "all", label: allLabel }, ...categories];
  return (
    <div data-ds-id="sections/ListingSection" className="sh-list" style={style} {...rest}>
      {title ? <Statement sub={sub}>{title}</Statement> : null}
      {categories.length ? (
        <ul className="sh-list-chips" aria-label="Categories">
          {chips.map((c) => {
            const on = c.id === category;
            return <li key={c.id}>{c.href
              ? <a className="sh-list-chip" href={c.href} aria-current={on ? "page" : undefined}>{c.label}</a>
              : <button type="button" className="sh-list-chip" aria-pressed={on} onClick={onCategory ? () => onCategory(c.id) : undefined}>{c.label}</button>}</li>;
          })}
        </ul>
      ) : null}
      {items.length ? <TileGrid layout={layout}>{items}</TileGrid> : <p className="sh-list-empty">{empty}</p>}
      {pageCount > 1 ? <div className="sh-list-foot"><Pagination page={page} pageCount={pageCount} onChange={onPage} hrefFor={hrefFor} /></div> : null}
    </div>
  );
}
