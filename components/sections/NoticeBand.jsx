import React from "react";
import { Icon } from "../core/Icon.jsx";

/* A note the reader must not miss — a clinical note, a caution, a policy, a booking
   condition. Sparing: one per screen at most, never an outcome claim, never marketing.
   tone "note" (info) or "caution" (alert). layout "inline" sits in the flow of text with a
   brand rule on its leading edge; "band" spans the container between hairlines.
   Every size: icon beside the text; the link wraps under the text on phones. */
const CSS = `
.sh-note{display:grid;grid-template-columns:24px minmax(0,1fr);gap:var(--space-4);align-items:start;min-width:0}
.sh-note[data-layout="inline"]{padding:var(--space-5) var(--space-5) var(--space-5) var(--space-5);border-inline-start:2px solid var(--text-brand);background:color-mix(in srgb, var(--text-primary) 4%, transparent);max-width:calc(var(--measure-body) + 4rem)}
.sh-note[data-layout="band"]{padding:var(--space-6) 0;border-block:var(--border-width) solid var(--rule-color)}
.sh-note>[data-icon]{margin-top:2px;color:var(--text-brand)}
.sh-note-body{display:flex;flex-direction:column;gap:var(--space-2);min-width:0}
.sh-note-title{margin:0;font:var(--type-item-sm);color:var(--text-primary)}
.sh-note-text{margin:0;font:var(--type-body-sm);color:var(--text-secondary);max-width:var(--measure-body)}
.sh-note-action{margin-top:var(--space-2)}
.sh-note>.sh-note-action{grid-column:2}
@media (min-width:760px){
  .sh-note[data-layout="band"]{grid-template-columns:24px minmax(0,1fr) auto;align-items:center;column-gap:var(--space-5)}
  .sh-note[data-layout="band"] .sh-note-action{margin-top:0;grid-column:3}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-note-css")) return;
  const el = document.createElement("style");
  el.id = "sh-note-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function NoticeBand({ title, children, tone = "note", layout = "inline", action, headingLevel = 3, role, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  return (
    <aside data-ds-id="sections/NoticeBand" className="sh-note" data-layout={layout} data-tone={tone} role={role} aria-label={typeof title === "string" ? title : undefined} style={style} {...rest}>
      <Icon name={tone === "caution" ? "alert-circle" : "info"} size={22} />
      <div className="sh-note-body">
        {title ? <H className="sh-note-title">{title}</H> : null}
        {children ? <p className="sh-note-text">{children}</p> : null}
        {action && layout !== "band" ? <div className="sh-note-action">{action}</div> : null}
      </div>
      {action && layout === "band" ? <div className="sh-note-action">{action}</div> : null}
    </aside>
  );
}
