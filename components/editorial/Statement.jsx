import React from "react";
import { MetaRow } from "./MetaRow.jsx";

/* Optional breadcrumbs → full-sentence headline → optional meta row → one quiet supporting
   line → actions. The deck's heading block, with no label above it: the heading leads.
   Heroes pass their breadcrumbs here, so the trail sits the same --stack-lg above the title
   on every page. Sizes are fluid
   (tokens/typography.css) so the same block never overflows a phone. */
const SIZE = {
  display: "var(--type-display)",
  h1: "var(--type-h1)",
  statement: "var(--type-statement)",
  h2: "var(--type-h2)",
  title: "var(--type-title)",
  h3: "var(--type-h3)",
  h4: "var(--type-h4)",
};

const CSS = `
.sh-stmt{display:flex;flex-direction:column;gap:var(--stack-md);min-width:0}
.sh-stmt-crumbs{margin-bottom:calc(var(--stack-lg) - var(--stack-md))}
.sh-stmt-title{margin:0;max-width:var(--_m,var(--measure-statement));color:var(--text-primary);text-wrap:balance}
.sh-stmt-sub{margin:0;max-width:var(--measure-body);font:var(--type-body);color:var(--text-secondary)}
.sh-stmt[data-size="display"] .sh-stmt-sub,.sh-stmt[data-size="h1"] .sh-stmt-sub{font:var(--type-lead)}
.sh-stmt-actions{margin-top:var(--space-3)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-stmt-css")) return;
  const el = document.createElement("style");
  el.id = "sh-stmt-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function Statement({ children, breadcrumbs, meta, sub, actions, as: Tag = "h2", size = "statement", measure, className, style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="editorial/Statement" className={"sh-stmt" + (className ? " " + className : "")} data-size={size} style={style} {...rest}>
      {breadcrumbs ? <div className="sh-stmt-crumbs">{breadcrumbs}</div> : null}
      <Tag className="sh-stmt-title" style={{ font: SIZE[size] || SIZE.statement, ...(measure ? { "--_m": measure } : null) }}>{children}</Tag>
      {meta ? (Array.isArray(meta) ? <MetaRow items={meta} /> : <div>{meta}</div>) : null}
      {sub ? <p className="sh-stmt-sub">{sub}</p> : null}
      {actions ? <div className="sh-actions sh-stmt-actions" data-stack="mobile">{actions}</div> : null}
    </div>
  );
}
