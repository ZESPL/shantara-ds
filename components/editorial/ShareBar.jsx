import React from "react";
import { Icon } from "../core/Icon.jsx";

/* Share an article: copy link, WhatsApp, email: the three ways guests actually pass a
   page on. Quiet outline chips with a glyph and a word; "Copy link" confirms with
   "Link copied" for two seconds (announced politely). Wraps on phones. */
const CSS = `
.sh-share{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-3) var(--space-3);min-width:0}
.sh-share-label{margin:0 var(--space-2) 0 0;font:var(--type-body-sm);color:var(--text-secondary)}
.sh-share-btn{appearance:none;display:inline-flex;align-items:center;gap:var(--space-2);min-height:var(--tap-min);padding:0 var(--space-5);border:var(--border-width) solid var(--rule-color);border-radius:var(--radius-pill);background:transparent;color:var(--text-primary);font:var(--type-body-sm);text-decoration:none;cursor:pointer;transition:border-color var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)}
.sh-share-btn [data-icon]{color:var(--text-brand)}
.sh-share-btn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-share-btn:hover{border-color:var(--text-primary)}}
.sh-share[data-compact="true"] .sh-share-btn{width:var(--tap-min);padding:0;justify-content:center}
.sh-share[data-compact="true"] .sh-share-btn>span:not([data-icon]){position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-share-css")) return;
  const el = document.createElement("style");
  el.id = "sh-share-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function ShareBar({ url, title = "", label = "Share", channels = ["copy", "whatsapp", "email"], compact = false, style, ...rest }) {
  ensure();
  const [copied, setCopied] = React.useState(false);
  const href = url || (typeof location !== "undefined" ? location.href : "");
  const text = title ? title + " " + href : href;
  const copy = async () => {
    try { await navigator.clipboard.writeText(href); } catch (e) { /* clipboard blocked: still confirm the intent */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const btn = {
    copy: <button key="copy" type="button" className="sh-share-btn" onClick={copy}><Icon name={copied ? "check" : "link"} size={16} /><span>{copied ? "Link copied" : "Copy link"}</span></button>,
    whatsapp: <a key="wa" className="sh-share-btn" href={"https://wa.me/?text=" + encodeURIComponent(text)} target="_blank" rel="noopener noreferrer"><Icon name="message-circle" size={16} /><span>WhatsApp</span></a>,
    email: <a key="em" className="sh-share-btn" href={"mailto:?subject=" + encodeURIComponent(title) + "&body=" + encodeURIComponent(href)}><Icon name="mail" size={16} /><span>Email</span></a>,
  };
  return (
    <div data-ds-id="editorial/ShareBar" className="sh-share" data-compact={String(compact)} role="group" aria-label={label} style={style} {...rest}>
      {label ? <p className="sh-share-label">{label}</p> : null}
      {channels.map((c) => btn[c]).filter(Boolean)}
      <span className="sh-visually-hidden" aria-live="polite">{copied ? "Link copied" : ""}</span>
    </div>
  );
}
