import React from "react";

/* Plain text in columns, with no bullets, no icons, no ticks (the deck's list style).
   Items are strings, or { title, text } pairs. One column under 520px.
   marker="numeral": one item per row, each led by its two-digit number in Light display
   type on a hairline, for a short fixed set read in order (the six principles). */
const CSS = `
.sh-plist{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-5) var(--grid-gap)}
.sh-plist>li{min-width:0;font:var(--type-body);color:var(--text-primary)}
.sh-plist[data-size="sm"]>li{font:var(--type-body-sm)}
.sh-plist[data-rules="true"]>li{padding-top:var(--space-4);border-top:var(--border-width) solid var(--rule-color)}
.sh-plist-title{display:block;font:var(--type-item-sm);color:var(--text-primary)}
.sh-plist-text{display:block;margin-top:var(--space-2);font:var(--type-body-sm);color:var(--text-secondary);max-width:44ch}
.sh-plist[data-marker="numeral"]{grid-template-columns:minmax(0,1fr);gap:0;counter-reset:sh-plist}
.sh-plist[data-marker="numeral"]>li{counter-increment:sh-plist;display:grid;grid-template-columns:3.5rem minmax(0,1fr);gap:var(--space-5);align-items:baseline;padding-block:var(--space-6);border-top:var(--border-width) solid var(--rule-color);font:var(--type-item);max-width:none}
.sh-plist[data-marker="numeral"]>li:last-child{border-bottom:var(--border-width) solid var(--rule-color)}
.sh-plist[data-marker="numeral"]>li::before{content:counter(sh-plist, decimal-leading-zero);font:var(--weight-light) var(--text-2xl)/1 var(--font-display);color:var(--text-brand);font-variant-numeric:tabular-nums}
.sh-plist[data-marker="numeral"]>li>span{grid-column:2}
@media (min-width:1000px){.sh-plist[data-marker="numeral"]>li{grid-template-columns:7rem minmax(0,1fr);padding-block:var(--space-7)}.sh-plist[data-marker="numeral"]>li::before{font-size:var(--text-3xl)}}
@media (min-width:520px){.sh-plist[data-columns="2"],.sh-plist[data-columns="3"]{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.sh-plist[data-columns="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-plist-css")) return;
  const el = document.createElement("style");
  el.id = "sh-plist-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function PlainList({ items = [], columns = 2, size = "md", rules = false, marker = "none", style, ...rest }) {
  ensure();
  return (
    <ul data-ds-id="editorial/PlainList" className="sh-plist" data-columns={marker === "numeral" ? "1" : String(columns)} data-size={size} data-rules={String(rules)} data-marker={marker} style={style} {...rest}>
      {items.map((item, i) => (
        <li key={typeof item === "string" ? item : item.title || i}>
          {typeof item === "string" ? item : (
            <>
              <span className="sh-plist-title">{item.title}</span>
              {item.text ? <span className="sh-plist-text">{item.text}</span> : null}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
