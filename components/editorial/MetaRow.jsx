import React from "react";
import { Icon } from "../core/Icon.jsx";

/* The one place category, duration, date and read time are shown: a caption-size row
   BELOW a title, in normal case. Never above a heading (the system has no eyebrows).
   items: strings, or { label, icon?, href?, dateTime? }. Without icons the items are
   separated by a middot; with icons each item leads with its 14px glyph instead. */
const CSS = `
.sh-meta{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-2) 0;margin:0;padding:0;list-style:none;font:var(--type-caption);color:var(--text-muted);font-variant-numeric:tabular-nums}
.sh-meta>li{display:inline-flex;align-items:center;gap:0.4em;min-width:0}
.sh-meta:not([data-icons="true"])>li:not(:last-child)::after{content:"·";margin-inline:0.55em;color:var(--text-muted)}
.sh-meta[data-icons="true"]{gap:var(--space-2) var(--space-6)}
.sh-meta [data-icon]{opacity:0.85}
.sh-meta a{color:inherit;text-decoration:underline;text-decoration-color:color-mix(in srgb, currentColor 35%, transparent);text-underline-offset:3px}
.sh-meta[data-size="sm"]{font:var(--type-body-sm);color:var(--text-secondary)}
@media (hover: hover) and (pointer: fine){.sh-meta a:hover{color:var(--text-primary)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-meta-css")) return;
  const el = document.createElement("style");
  el.id = "sh-meta-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

function norm(item) {
  if (item == null || item === false || item === "") return null;
  if (typeof item === "object" && !React.isValidElement(item)) return item;
  return { label: item };
}

export function MetaRow({ items = [], size = "caption", className, style, ...rest }) {
  ensure();
  const list = (Array.isArray(items) ? items : [items]).map(norm).filter(Boolean);
  if (!list.length) return null;
  const icons = list.some((m) => m.icon);
  return (
    <ul data-ds-id="editorial/MetaRow" className={"sh-meta" + (className ? " " + className : "")} data-icons={icons ? "true" : undefined} data-size={size === "sm" ? "sm" : undefined} style={style} {...rest}>
      {list.map((m, i) => {
        const label = m.dateTime ? <time dateTime={m.dateTime}>{m.label}</time> : m.label;
        return (
          <li key={i}>
            {m.icon ? <Icon name={m.icon} size={14} /> : null}
            {m.href ? <a href={m.href}>{label}</a> : <span>{label}</span>}
          </li>
        );
      })}
    </ul>
  );
}
