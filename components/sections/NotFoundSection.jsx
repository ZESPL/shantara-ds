import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Input } from "../forms/Input.jsx";
import { Button } from "../core/Button.jsx";
import { Icon } from "../core/Icon.jsx";

/* The 404 page body: a plain title, one line, a search field that posts to the site search,
   and three or four useful links (Programmes, Conditions, Book a Consultation, Contact).
   Plain words, no jokes, no illustration. The page itself still returns HTTP 404.
   One column at every width, held to a 36rem measure: statement, search, links one per row.
   The field and the button sit in one row and share the 52px control height (Input md, Button lg). */
const CSS = `
.sh-404{display:flex;flex-direction:column;gap:var(--stack-lg);max-width:36rem;min-width:0}
.sh-404-search{display:flex;align-items:flex-end;gap:var(--space-3);margin:0}
.sh-404-search>.sh-field{flex:1 1 auto}
.sh-404-search>.sh-btn{flex:0 0 auto;height:var(--control-lg);padding-block:0}
.sh-404-links{list-style:none;margin:0;padding:0;border-top:var(--border-width) solid var(--rule-color)}
.sh-404-links a{display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);min-height:var(--tap-min);padding:var(--space-4) 0;border-bottom:var(--border-width) solid var(--rule-color);font:var(--type-item-sm);color:var(--text-primary);text-decoration:none}
.sh-404-links a [data-icon]{color:var(--text-brand);transition:transform var(--duration-fast) var(--ease-out)}
.sh-404-links a:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-404-links a:hover [data-icon]{transform:translateX(3px)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-404-css")) return;
  const el = document.createElement("style");
  el.id = "sh-404-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* links: [{ label, href }] */
export function NotFoundSection({ title = "We couldn't find that page", sub = "The page may have moved. Search the site, or start from one of these pages.", searchAction = "/en/search", searchLabel = "Search the site", links = [], headingLevel = 1, style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="sections/NotFoundSection" className="sh-404" style={style} {...rest}>
      <Statement as={"h" + headingLevel} size="h1" sub={sub} measure="20ch">{title}</Statement>
      <form className="sh-404-search" role="search" action={searchAction} method="get">
        <Input label={searchLabel} name="q" type="search" startIcon={<Icon name="search" size={18} />} />
        <Button type="submit" variant="secondary" size="lg">Search</Button>
      </form>
      {links.length ? (
        <nav aria-label="Useful pages">
          <ul className="sh-404-links">{links.map((l) => <li key={l.href}><a href={l.href}>{l.label}<Icon name="arrow-right" size={18} /></a></li>)}</ul>
        </nav>
      ) : null}
    </div>
  );
}
