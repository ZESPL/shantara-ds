import React from "react";

/* Two looks, decided by behaviour, never by prop choice alone:
   · Interactive (onClick): a selectable chip with pill outline, 36px, hover, press, focus ring.
   · Static (no onClick): a flat label like Badge, with no border, no pill, no hover,
     so it never reads as a button. `onRemove` adds a 24px remove control to either. */
const CSS = `
.sh-tag{display:inline-flex;align-items:center;gap:var(--space-3);font-family:var(--font-body);white-space:nowrap;vertical-align:middle}
.sh-tag[data-static="true"]{height:24px;padding:0 var(--space-3);border-radius:var(--radius-xs);background:color-mix(in srgb, var(--text-primary) 7%, transparent);color:var(--text-secondary);font-size:var(--text-xs);font-weight:var(--weight-regular);cursor:default}
.sh-tag[data-static="true"][data-selected="true"]{background:var(--surface-brand-soft);color:var(--text-primary)}
.sh-tag[data-static="true"][data-removable="true"]{padding-inline-end:0}
.sh-tag[data-static="false"]{height:36px;padding:0 var(--space-5);border-radius:var(--radius-chip);border:var(--border-width) solid var(--border-control);background:transparent;color:var(--text-primary);font-size:var(--text-sm);font-weight:var(--weight-regular);cursor:pointer;transition:var(--transition-control)}
.sh-tag[data-static="false"]:active{transform:scale(var(--press-scale))}
.sh-tag[data-static="false"]:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-tag[data-static="false"][data-selected="true"]{background:var(--surface-brand);border-color:var(--surface-brand);color:var(--text-on-brand)}
.sh-tag-check{display:inline-grid;place-items:center;width:14px;height:14px;margin-inline-start:-2px}
.sh-tag-x{display:inline-grid;place-items:center;width:24px;height:24px;margin:0;border:0;border-radius:var(--radius-xs);background:transparent;color:inherit;opacity:.6;cursor:pointer;padding:0;transition:opacity var(--duration-fast) var(--ease-standard),box-shadow var(--duration-fast) var(--ease-standard)}
.sh-tag[data-static="false"] .sh-tag-x{margin-inline:-4px -8px;border-radius:var(--radius-pill)}
.sh-tag-x:focus-visible{outline:none;box-shadow:var(--ring-focus);opacity:1}
@media (pointer: coarse){.sh-tag[data-static="false"]{height:var(--tap-min)}}
@media (hover: hover) and (pointer: fine){
  .sh-tag[data-static="false"]:hover{border-color:var(--text-primary);background:color-mix(in srgb, var(--text-primary) 5%, transparent)}
  .sh-tag[data-static="false"][data-selected="true"]:hover{background:var(--color-himalaya-800);border-color:var(--color-himalaya-800)}
  .sh-tag-x:hover{opacity:1}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-tag-css")) return;
  const el = document.createElement("style");
  el.id = "sh-tag-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const X = (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>
);
const TICK = (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7.4l2.6 2.6L11 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
);

export function Tag({ selected = false, onRemove, icon, children, onClick, onKeyDown, removeLabel = "Remove", ...rest }) {
  ensure();
  const interactive = Boolean(onClick);
  const activate = onClick
    ? (e) => {
        if (onKeyDown) onKeyDown(e);
        if (e.defaultPrevented) return;
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); onClick(e); }
      }
    : onKeyDown;
  return (
    <span
      className="sh-tag"
      data-ds-id="core/Tag"
      data-selected={String(selected)}
      data-static={String(!interactive)}
      data-removable={String(Boolean(onRemove))}
      role={interactive ? "button" : undefined}
      aria-pressed={interactive ? selected : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={activate}
      {...rest}
    >
      {interactive && selected && !icon ? <span className="sh-tag-check">{TICK}</span> : icon}
      {children}
      {onRemove ? (
        <button type="button" className="sh-tag-x" aria-label={removeLabel} onClick={(e) => { e.stopPropagation(); onRemove(e); }}>{X}</button>
      ) : null}
    </span>
  );
}
