import React from "react";
import { Icon } from "../core/Icon.jsx";

/* A one-line strip above the site header for one site-wide message: a change to how stays
   are booked, a closure, a new programme. One message, at most one link, never a promotion.
   ground "himalaya" (default) or "pine" re-point ink like any dark ground; "stone" is light.
   Not sticky — it scrolls away with the page. dismissible adds a close button; storageKey
   keeps it closed for that visitor until the key changes (use a new key for a new message). */
const CSS = `
.sh-announce{font:var(--type-body-sm);color:var(--text-primary)}
.sh-announce-inner{display:grid;grid-template-columns:minmax(0,1fr);align-items:center;column-gap:var(--space-4);min-height:var(--tap-min);padding-block:var(--space-3)}
.sh-announce[data-dismissible="true"] .sh-announce-inner{grid-template-columns:minmax(0,1fr) auto;padding-inline-end:calc(var(--layout-gutter) - 12px)}
.sh-announce-msg{margin:0;display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline;column-gap:var(--space-5);row-gap:var(--space-1);text-align:center;text-wrap:balance}
.sh-announce-link{display:inline-flex;align-items:center;gap:var(--space-2);color:var(--text-primary);font-weight:var(--weight-medium);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;white-space:nowrap}
.sh-announce-link [data-icon]{transition:transform var(--duration-fast) var(--ease-out)}
.sh-announce-link:focus-visible{outline:none;box-shadow:var(--ring-focus);border-radius:var(--radius-xs)}
[dir="rtl"] .sh-announce-link [data-icon]{transform:scaleX(-1)}
.sh-announce-x{display:grid;place-items:center;width:var(--tap-min);height:var(--tap-min);margin-block:calc(var(--space-3) * -1);padding:0;border:0;border-radius:var(--radius-xs);background:transparent;color:inherit;opacity:.72;cursor:pointer;transition:opacity var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)}
.sh-announce-x:focus-visible{outline:none;opacity:1;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){
  .sh-announce-link:hover{color:var(--text-link-hover)}
  .sh-announce-link:hover [data-icon]{transform:translateX(3px)}
  [dir="rtl"] .sh-announce-link:hover [data-icon]{transform:translateX(-3px) scaleX(-1)}
  .sh-announce-x:hover{opacity:1;background:color-mix(in srgb, currentColor 12%, transparent)}
}
@media (max-width:519.98px){.sh-announce-msg{justify-content:flex-start;text-align:start}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-announce-css")) return;
  const el = document.createElement("style");
  el.id = "sh-announce-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

function readClosed(key) {
  if (!key) return false;
  try { return window.localStorage.getItem("sh-announce:" + key) === "closed"; } catch (err) { return false; }
}

export function AnnouncementBar({ children, href, linkLabel, ground = "himalaya", dismissible = false, storageKey, onDismiss, closeLabel = "Close announcement", label = "Announcement", style, ...rest }) {
  ensure();
  const [closed, setClosed] = React.useState(false);
  React.useEffect(() => { if (readClosed(storageKey)) setClosed(true); }, [storageKey]);
  if (closed) return null;

  const close = () => {
    setClosed(true);
    if (storageKey) { try { window.localStorage.setItem("sh-announce:" + storageKey, "closed"); } catch (err) { /* private mode */ } }
    if (onDismiss) onDismiss();
  };

  return (
    <aside data-ds-id="navigation/AnnouncementBar" className="sh-announce" data-ground={ground} data-dismissible={String(dismissible)} aria-label={label} style={style} {...rest}>
      <div className="sh-container sh-announce-inner">
        <p className="sh-announce-msg">
          <span>{children}</span>
          {href && linkLabel ? <a className="sh-announce-link" href={href}>{linkLabel}<Icon name="arrow-right" size={14} /></a> : null}
        </p>
        {dismissible ? <button type="button" className="sh-announce-x" aria-label={closeLabel} onClick={close}><Icon name="x" size={18} /></button> : null}
      </div>
    </aside>
  );
}
