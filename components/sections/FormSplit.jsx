import React from "react";
import { Media } from "../editorial/Media.jsx";

/* The consultation form on Merino with square fields, beside a Stone panel that says what
   happens next. The panel opens with a photograph of the place — `src`/`alt` (or `media`) —
   running edge to edge across its top at 4:3; reception.jpg by default in the demos. Not a
   doctor thumbnail: the panel copy says a member of the team calls first.
   The left column is a real <form>: Enter submits, `required` fields are checked by the
   browser, and assistive technology announces a form. Give the button type="submit" and
   handle onSubmit.
   Phones: form first, then the panel (photograph on top). ≥1000px: form 7 columns, panel 5,
   sticky while the form scrolls in windows at least 800px tall.
   `compact`: the same form without the panel, capped at 44rem; name and phone fields sit
   side by side from 760px — for Hosted visits or the end of a condition page. */
const CSS = `
.sh-fsplit{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:start}
.sh-fsplit-form{min-width:0;display:flex;flex-direction:column;gap:var(--space-6);margin:0}
.sh-fsplit-aside{--_pad:clamp(24px, 2.2vw + 16px, 48px);min-width:0;background:var(--ground-stone);padding:var(--_pad);display:flex;flex-direction:column;gap:var(--space-6)}
.sh-fsplit-photo{margin:calc(-1 * var(--_pad)) calc(-1 * var(--_pad)) var(--space-2)}
.sh-fsplit-photo>.sh-media{aspect-ratio:4 / 3}
@media (min-width:1000px){
  .sh-fsplit{grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:calc(var(--grid-gap) * 2.5)}
  .sh-fsplit[data-compact="true"]{grid-template-columns:minmax(0,1fr)}
}
@media (min-width:1000px) and (min-height:800px){
  .sh-fsplit-aside{position:sticky;top:calc(var(--header-h, 72px) + 24px)}
}
.sh-fsplit[data-compact="true"] .sh-fsplit-form{max-width:44rem}
@media (min-width:760px){
  .sh-fsplit[data-compact="true"] .sh-fsplit-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-6) var(--grid-gap)}
  .sh-fsplit[data-compact="true"] .sh-fsplit-form>*{grid-column:1/-1}
  .sh-fsplit[data-compact="true"] .sh-fsplit-form>[data-ds-id="forms/Input"],
  .sh-fsplit[data-compact="true"] .sh-fsplit-form>[data-ds-id="forms/Select"]{grid-column:auto}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-fsplit-css")) return;
  const el = document.createElement("style");
  el.id = "sh-fsplit-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function FormSplit({ children, aside, src, alt = "", position, media, compact = false, onSubmit, action, method, noValidate, formLabel, formProps, style, ...rest }) {
  ensure();
  const photo = media || (src ? <Media src={src} alt={alt} ratio="4:3" position={position} /> : null);
  const panel = !compact && (aside || photo);
  return (
    <div data-ds-id="sections/FormSplit" className="sh-fsplit" data-compact={String(compact)} style={style} {...rest}>
      <form className="sh-fsplit-form" onSubmit={onSubmit} action={action} method={method} noValidate={noValidate} aria-label={formLabel} {...formProps}>{children}</form>
      {panel ? (
        <aside className="sh-fsplit-aside" data-ground="stone">
          {photo ? <div className="sh-fsplit-photo">{photo}</div> : null}
          {aside}
        </aside>
      ) : null}
    </div>
  );
}
