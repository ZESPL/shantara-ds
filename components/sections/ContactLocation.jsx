import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Media } from "../editorial/Media.jsx";
import { Icon } from "../core/Icon.jsx";
import { TextLink } from "../editorial/TextLink.jsx";

/* How to reach Shantara: the ways to get in touch (call, WhatsApp, email), the address,
   a photograph of the arrival with an "Open in Maps" link (no embedded map — it is heavy,
   tracks visitors and is hard to use with a keyboard), and directions from the airport and
   railway station. Numbers and address from content/site.json; distances from handbook §12.
   Phones: contact → address → photograph → directions. ≥1000px: contact, address and
   directions on the left (7 columns), the photograph on the right (5), top-aligned. */
const CSS = `
.sh-loc{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:start}
.sh-loc-main{display:flex;flex-direction:column;gap:var(--stack-lg);min-width:0}
.sh-loc-ways{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);border-top:var(--border-width) solid var(--rule-color)}
.sh-loc-ways>li{border-bottom:var(--border-width) solid var(--rule-color)}
.sh-loc-way{display:grid;grid-template-columns:24px minmax(0,1fr) auto;gap:var(--space-4);align-items:center;min-height:var(--tap-min);padding:var(--space-4) 0;color:inherit;text-decoration:none}
.sh-loc-way [data-icon]{color:var(--text-brand)}
.sh-loc-way-label{display:block;font:var(--type-caption);color:var(--text-secondary)}
.sh-loc-way-value{display:block;font:var(--type-item-sm);color:var(--text-primary);overflow-wrap:anywhere}
.sh-loc-way-go{color:var(--text-muted)}
a.sh-loc-way:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){a.sh-loc-way:hover .sh-loc-way-value{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}}
.sh-loc-sub{margin:0 0 var(--space-4);font:var(--type-item-sm);color:var(--text-primary)}
.sh-loc-address{margin:0;font-style:normal;font:var(--type-body);color:var(--text-secondary)}
.sh-loc-dirs{list-style:none;margin:0;padding:0;display:grid;gap:var(--space-5)}
.sh-loc-dir{display:grid;grid-template-columns:24px minmax(0,1fr);gap:var(--space-4);align-items:start}
.sh-loc-dir [data-icon]{margin-top:2px;color:var(--text-brand)}
.sh-loc-dir-title{display:block;font:var(--type-item-sm);color:var(--text-primary)}
.sh-loc-dir-text{display:block;margin-top:var(--space-1);font:var(--type-body-sm);color:var(--text-secondary)}
.sh-loc-side{display:flex;flex-direction:column;gap:var(--space-4);min-width:0}
@media (max-width:999.98px){.sh-loc-side .sh-media{aspect-ratio:3 / 2}}
@media (min-width:760px){.sh-loc-ways{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:calc(var(--grid-gap) * 2)}}
@media (min-width:1000px){.sh-loc{grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:calc(var(--grid-gap) * 2)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-loc-css")) return;
  const el = document.createElement("style");
  el.id = "sh-loc-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ways: [{ icon, label, value, href }] · address: string[] (lines) ·
   directions: [{ icon, title, text }] · map: { href, label? } */
export function ContactLocation({ title = "How to reach us", sub, ways = [], address = [], directions = [], src, alt = "", media, map, headingLevel = 2, style, ...rest }) {
  ensure();
  const H = "h" + Math.min(6, headingLevel + 1);
  const figure = media || (src ? <Media src={src} alt={alt} ratio="4:5" mobileRatio="4:3" /> : null);
  return (
    <div data-ds-id="sections/ContactLocation" className="sh-loc" style={style} {...rest}>
      <div className="sh-loc-main">
        <Statement as={"h" + headingLevel} size="title" sub={sub}>{title}</Statement>
        {ways.length ? (
          <ul className="sh-loc-ways">
            {ways.map((w) => {
              const inner = <>
                <Icon name={w.icon || "phone"} size={20} />
                <span><span className="sh-loc-way-label">{w.label}</span><span className="sh-loc-way-value">{w.value}</span></span>
                {w.href ? <Icon name="arrow-right" size={16} className="sh-loc-way-go" /> : <span />}
              </>;
              return <li key={w.label}>{w.href ? <a className="sh-loc-way" href={w.href}>{inner}</a> : <div className="sh-loc-way">{inner}</div>}</li>;
            })}
          </ul>
        ) : null}
        {address.length ? (
          <div>
            <H className="sh-loc-sub">Address</H>
            <address className="sh-loc-address">{address.map((l, i) => <React.Fragment key={i}>{l}{i < address.length - 1 ? <br /> : null}</React.Fragment>)}</address>
          </div>
        ) : null}
        {directions.length ? (
          <div>
            <H className="sh-loc-sub">Getting here</H>
            <ul className="sh-loc-dirs">
              {directions.map((d) => (
                <li className="sh-loc-dir" key={d.title}><Icon name={d.icon || "car"} size={20} /><span><span className="sh-loc-dir-title">{d.title}</span>{d.text ? <span className="sh-loc-dir-text">{d.text}</span> : null}</span></li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {figure || map ? (
        <div className="sh-loc-side">
          {figure}
          {map && map.href ? <div><TextLink href={map.href} target="_blank" rel="noopener" arrow={false} endIcon={<Icon name="external-link" size={16} />}>{map.label || "Open in Maps"}</TextLink></div> : null}
        </div>
      ) : null}
    </div>
  );
}
