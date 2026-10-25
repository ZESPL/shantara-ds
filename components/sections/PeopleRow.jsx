import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { PortraitFrame } from "../editorial/PortraitFrame.jsx";

/* Deck slide 7. A statement, then 2–4 doctors in the same 4:5 framing. Columns are
   auto-filled at a fixed portrait width (150→280px), so two doctors stay portrait-sized
   on a desktop instead of stretching, and two sit side by side on a 360px phone. */
const CSS = `
.sh-people{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-people-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(clamp(140px, 18vw + 70px, 280px), 1fr));gap:var(--space-8) var(--grid-gap);max-width:calc(4 * 280px + 3 * var(--grid-gap))}
.sh-people-note{margin:0;font:var(--type-body-sm);color:var(--text-secondary);max-width:var(--measure-body)}
@media (max-width:519.98px){.sh-people-grid{gap:var(--space-7) var(--space-5)}}
/* size "sm": five to eight people (the board, a wider team) at 120→180px, up to six across. */
.sh-people[data-size="sm"] .sh-people-grid{grid-template-columns:repeat(auto-fill, minmax(clamp(120px, 10vw + 72px, 180px), 1fr));max-width:calc(6 * 180px + 5 * var(--grid-gap));gap:var(--space-7) var(--grid-gap)}
.sh-people[data-size="sm"] .sh-portrait-name{font-size:var(--text-base)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-people-css")) return;
  const el = document.createElement("style");
  el.id = "sh-people-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* people: [{ name, role, src? }] — name and role only. A third line (qualification) is
   dropped: in a row of portraits it makes the captions uneven and nobody reads it there.
   Qualifications belong on the doctor's own page. */
export function PeopleRow({ title, sub, people = [], note, action, size = "md", style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="sections/PeopleRow" className="sh-people" data-size={size} style={style} {...rest}>
      {title ? <Statement sub={sub}>{title}</Statement> : null}
      <div className="sh-people-grid">
        {people.map(({ detail, ...p }) => <PortraitFrame key={p.name} {...p} />)}
      </div>
      {note ? <p className="sh-people-note">{note}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}
