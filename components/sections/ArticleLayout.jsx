import React from "react";
import { TableOfContents } from "../editorial/TableOfContents.jsx";

/* The body of a long read — a Journal article, a legal page, the editorial policy. The
   article recipe as one section: the text (children, usually <Prose>) in 8 of 12 columns
   and a sticky "On this page" list in the last 3. `toc` comes from the article's h2s (each
   needs an id); `aside` adds a block under the list (ReviewedBy, ShareBar).
   Phones and tablets: the list collapses into one row above the text; `aside` follows the
   text. ≥1000px: text at the start, list and aside at the end, sticky in tall windows. */
const CSS = `
.sh-alay{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:start}
.sh-alay-body{min-width:0}
.sh-alay-body [id]{scroll-margin-top:calc(var(--header-h, 72px) + 24px)}
.sh-alay-side{display:flex;flex-direction:column;gap:var(--stack-lg);min-width:0}
.sh-alay-aside{min-width:0}
@media (max-width:999.98px){.sh-alay-side{display:contents}.sh-alay-aside{order:3}}
@media (min-width:1000px){
  .sh-alay{grid-template-columns:minmax(0,8fr) minmax(0,1fr) minmax(0,3fr);gap:var(--grid-gap)}
  .sh-alay-body{grid-column:1;grid-row:1}
  .sh-alay-side{grid-column:3;grid-row:1}
}
@media (min-width:1000px) and (min-height:720px){
  .sh-alay-side{position:sticky;top:calc(var(--header-h, 72px) + 24px)}
  .sh-alay-side .sh-toc[data-sticky="true"]{position:static}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-alay-css")) return;
  const el = document.createElement("style");
  el.id = "sh-alay-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* toc: [{ id, label, level? }] */
export function ArticleLayout({ toc = [], tocTitle = "On this page", aside, children, style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="sections/ArticleLayout" className="sh-alay" style={style} {...rest}>
      <div className="sh-alay-side">
        {toc.length ? <TableOfContents items={toc} title={tocTitle} /> : null}
        {aside ? <div className="sh-alay-aside">{aside}</div> : null}
      </div>
      <div className="sh-alay-body">{children}</div>
    </div>
  );
}
