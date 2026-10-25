import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Icon } from "../core/Icon.jsx";

/* Facilities at a glance — an icon, a short label and one line, in a grid. Only amenities
   named in the handbook amenities section (docs/handbook/property.md); never add one. The
   workstations are an exception to the device policy, not a feature — leave them out of a
   marketing grid. Icons from the curated Lucide registry (core/Icon).
   Phones: one column, icon beside the text. ≥520px: two. ≥1000px: `columns` (3 or 4). */
const CSS = `
.sh-feat{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-feat-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:0 calc(var(--grid-gap) * 1.5)}
.sh-feat-item{display:grid;grid-template-columns:28px minmax(0,1fr);gap:var(--space-4);align-items:start;padding:var(--space-5) 0;border-top:var(--border-width) solid var(--rule-color)}
.sh-feat-item [data-icon]{margin-top:1px;color:var(--text-brand)}
.sh-feat-title{margin:0;font:var(--type-item-sm);color:var(--text-primary)}
.sh-feat-text{margin:var(--space-1) 0 0;font:var(--type-body-sm);color:var(--text-secondary);max-width:40ch}
@media (min-width:520px){.sh-feat-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){
  .sh-feat-list{grid-template-columns:repeat(var(--_c,3),minmax(0,1fr))}
  .sh-feat-item{grid-template-columns:minmax(0,1fr);gap:var(--space-4);padding-top:var(--space-6)}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-feat-css")) return;
  const el = document.createElement("style");
  el.id = "sh-feat-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* items: [{ icon, title, text? }] */
export function FeatureGrid({ title, sub, items = [], columns = 3, action, headingLevel = 2, style, ...rest }) {
  ensure();
  const H = "h" + Math.min(6, headingLevel + 1);
  return (
    <div data-ds-id="sections/FeatureGrid" className="sh-feat" style={{ "--_c": String(columns === 4 ? 4 : 3), ...style }} {...rest}>
      {title ? <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement> : null}
      <ul className="sh-feat-list">
        {items.map((it) => (
          <li className="sh-feat-item" key={it.title}>
            <Icon name={it.icon || "leaf"} size={24} />
            <div><H className="sh-feat-title">{it.title}</H>{it.text ? <p className="sh-feat-text">{it.text}</p> : null}</div>
          </li>
        ))}
      </ul>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
