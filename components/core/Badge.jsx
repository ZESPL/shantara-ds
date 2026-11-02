import React from "react";

/* A Badge is a label, never a control. Small, flat, square-cornered, sentence case:
   a 2px-radius tint at 20px (half a control's height) with no border and no pill,
   so it can never be mistaken for a button. `outline` is a dot plus text with no box. */
const CSS = `
.sh-badge{display:inline-flex;align-items:center;gap:6px;height:20px;padding:0 6px;border:0;border-radius:var(--radius-xs);font-family:var(--font-body);font-size:var(--text-2xs);font-weight:var(--weight-medium);line-height:1;letter-spacing:0.01em;text-transform:none;background:color-mix(in srgb, var(--text-primary) 7%, transparent);color:var(--text-secondary);white-space:nowrap;vertical-align:middle;cursor:default;user-select:none;transition:background-color var(--duration-fast) var(--ease-standard),color var(--duration-fast) var(--ease-standard)}
.sh-badge [data-icon]{width:12px!important;height:12px!important}
.sh-badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex:0 0 auto}
.sh-badge[data-tone="brand"]{background:var(--surface-brand-soft);color:var(--color-himalaya-800, var(--text-brand))}
.sh-badge[data-tone="accent"]{background:color-mix(in srgb, var(--color-gold-crayola) 30%, transparent);color:var(--color-pine-tree)}
.sh-badge[data-tone="success"]{background:var(--status-success-soft);color:var(--status-success)}
.sh-badge[data-tone="info"]{background:var(--status-info-soft);color:var(--color-pine-tree)}
.sh-badge[data-tone="warning"]{background:var(--status-warning-soft);color:var(--status-warning)}
.sh-badge[data-tone="danger"]{background:var(--status-danger-soft);color:var(--status-danger)}
.sh-badge[data-tone="outline"]{background:transparent;padding:0;color:var(--text-secondary)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-badge-css")) return;
  const el = document.createElement("style");
  el.id = "sh-badge-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function Badge({ tone = "neutral", icon, dot, children, ...rest }) {
  ensure();
  const showDot = dot != null ? dot : tone === "outline" && !icon;
  return (
    <span className="sh-badge" data-ds-id="core/Badge" data-tone={tone} {...rest}>
      {showDot ? <span className="sh-badge-dot" aria-hidden="true" /> : null}
      {icon}
      {children}
    </span>
  );
}
