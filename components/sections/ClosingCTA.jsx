import React from "react";
import { Media } from "../editorial/Media.jsx";
import { Statement } from "../editorial/Statement.jsx";
import { Icon } from "../core/Icon.jsx";
import { Button } from "../core/Button.jsx";
import { TextLink } from "../editorial/TextLink.jsx";

/* The closing call to action (deck slide 18) — ONLY for pages that otherwise have no CTA.
   variant "photo": a full-bleed dark photograph, 72svh, statement bottom-left.
     `bleed={false}` (≥1000px only): the photograph sits inside the page container on a
     `surround` ground, so its edges line up with the header and the footer's content.
   variant "ground": the same block on a flat ground (pine / himalaya / stone), content height.
   variant "compact": a single-row band — title (+ sub) on the left, actions on the right.
   Contact items render as one aligned row (every item the same 44px inline-flex box, so a
   link and plain text share a baseline); they stack one per line under 520px. */
const CSS = `
.sh-close{position:relative;isolation:isolate}
.sh-close[data-variant="photo"]{display:flex;align-items:flex-end;min-height:clamp(520px, 72svh, 860px);overflow:hidden}
.sh-close>.sh-media{position:absolute;inset:0;z-index:-1;aspect-ratio:auto;height:100%}
.sh-close-body{width:100%;padding-block:var(--section-y)}
.sh-close[data-variant="compact"] .sh-close-body{padding-block:clamp(40px, 3vw + 28px, 72px)}
.sh-close[data-variant="compact"] .sh-stmt{gap:var(--space-3)}
.sh-close-row{display:flex;flex-direction:column;gap:var(--stack-md)}
.sh-close-actions{margin-top:var(--space-3)}
.sh-close-contact{display:flex;flex-wrap:wrap;align-items:center;gap:0 var(--space-8);margin:var(--stack-lg) 0 0;padding:var(--space-3) 0 0;list-style:none;border-top:var(--border-width) solid var(--rule-color);font:var(--type-body-sm);color:var(--text-secondary)}
.sh-close-contact>*{display:inline-flex;align-items:center;gap:var(--space-3);min-height:var(--tap-min);line-height:1.3;margin:0}
.sh-close-contact a{display:inline-flex;align-items:center;gap:var(--space-3);color:inherit;text-decoration:none;min-height:var(--tap-min)}
.sh-close-contact [data-icon]{color:var(--text-brand)}
.sh-close-contact a:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-close-contact a:hover{color:var(--text-primary);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}}
@media (min-width:1000px){
  .sh-close-box{padding:var(--section-y-sm) var(--layout-gutter)}
  .sh-close-box>.sh-close{max-width:var(--layout-max);margin-inline:auto}
}
@media (max-width:519.98px){.sh-close-contact{flex-direction:column;align-items:flex-start}}
.sh-close[data-variant="compact"] .sh-close-contact{margin-top:var(--space-6)}
@media (min-width:760px){
  .sh-close[data-variant="compact"] .sh-close-row{flex-direction:row;align-items:center;justify-content:space-between;gap:var(--grid-gap) calc(var(--grid-gap) * 2)}
  .sh-close[data-variant="compact"] .sh-close-row>.sh-stmt{flex:1 1 auto}
  .sh-close[data-variant="compact"] .sh-close-actions{flex:0 0 auto;margin-top:0}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-close-css")) return;
  const el = document.createElement("style");
  el.id = "sh-close-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

function Contact({ contact }) {
  if (!contact) return null;
  if (!Array.isArray(contact)) return <div className="sh-close-contact">{contact}</div>;
  return (
    <ul className="sh-close-contact">
      {contact.map((c, i) => {
        const o = typeof c === "string" ? { label: c } : c;
        const inner = <>{o.icon ? <Icon name={o.icon} size={16} /> : null}<span>{o.label}</span></>;
        return <li key={i}>{o.href ? <a href={o.href}>{inner}</a> : inner}</li>;
      })}
    </ul>
  );
}

/* variant "whatsapp": the ground layout with WhatsApp as the primary action and a call as
   the second (pass `whatsapp` — a wa.me URL — and `phone`, a tel: URL, from content/site.json).
   variant "tariff": a compact band that sends the reader to the tariff page (`tariffHref`):
   programme and room pages never quote a rate, so this is their commercial close. */
export function ClosingCTA({ variant, ground = "pine", src, alt = "", position, title, sub, action, secondaryAction, contact, whatsapp, phone, phoneLabel, tariffHref = "/en/tariffs", titleAs = "h2", bleed = true, surround = "merino", style, ...rest }) {
  ensure();
  const v = variant || (src ? "photo" : "ground");
  const g = v === "photo" ? "photo" : v === "tariff" && ground === "pine" ? "stone" : ground;
  let primary = action, secondary = secondaryAction, heading = title;
  if (v === "whatsapp") {
    primary = action || (whatsapp ? <Button size="lg" href={whatsapp} startIcon={<Icon name="message-circle" size={18} />}>Message us on WhatsApp</Button> : null);
    secondary = secondaryAction || (phone ? <Button size="lg" variant="secondary" href={phone} startIcon={<Icon name="phone" size={18} />}>{phoneLabel || "Call us"}</Button> : null);
  }
  if (v === "tariff") {
    heading = title || "Current rates and what a stay includes";
    primary = action || <TextLink href={tariffHref}>View the tariff</TextLink>;
  }
  const acts = primary || secondary ? <>{primary}{secondary}</> : null;
  const compact = v === "compact" || v === "tariff";
  const boxed = v === "photo" && !bleed;
  const Tag = boxed ? "div" : "section";
  const block = (
    <Tag className="sh-close" data-variant={compact ? "compact" : v === "whatsapp" ? "ground" : v} data-kind={v} data-ground={g} {...(boxed ? {} : { "data-ds-id": "sections/ClosingCTA", style, ...rest })}>
      {v === "photo" && src ? <Media src={src} alt={alt} ratio="fill" scrim="hero" position={position} /> : null}
      <div className={"sh-close-body" + (v === "photo" ? " sh-photo-text" : "")}>
        <div className="sh-container">
          <div className="sh-close-row">
            <Statement as={titleAs} size={compact ? "h3" : "statement"} sub={sub} measure={compact ? "32ch" : undefined}>{heading}</Statement>
            {acts ? <div className="sh-actions sh-close-actions" data-stack="mobile">{acts}</div> : null}
          </div>
          <Contact contact={contact} />
        </div>
      </div>
    </Tag>
  );
  if (!boxed) return block;
  return <section data-ds-id="sections/ClosingCTA" className="sh-close-box" data-bleed="false" data-ground={surround} style={style} {...rest}>{block}</section>;
}
