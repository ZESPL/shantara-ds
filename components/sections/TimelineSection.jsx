import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { TimeTable } from "../editorial/TimeTable.jsx";
import { Media } from "../editorial/Media.jsx";

/* A day, or a stay, in order — A Day at Shantara, a programme's daily rhythm. A statement
   and a TimeTable beside one photograph. Times come from the handbook day schedule (§12);
   the doctor fills the treatment slots, so the copy never names a treatment per hour.
   Phones: statement → photograph → table. ≥1000px: photograph 5 columns (sticky while the
   table scrolls, tall windows only), statement and table 7; `mediaSide` swaps them. */
const CSS = `
.sh-tl{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:start}
.sh-tl-main{display:flex;flex-direction:column;gap:var(--stack-lg);min-width:0}
.sh-tl-media{min-width:0}
@media (max-width:999.98px){.sh-tl{display:flex;flex-direction:column;align-items:stretch}.sh-tl-main{display:contents}.sh-tl-main>.sh-stmt{order:1}.sh-tl-media{order:2}.sh-tl-main>.sh-time{order:3}}
@media (max-width:999.98px){.sh-tl-media .sh-media{aspect-ratio:4 / 3}}
@media (max-width:759.98px){.sh-tl-media{margin-inline:calc(-1 * var(--layout-gutter))}}
@media (min-width:1000px){
  .sh-tl{grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:calc(var(--grid-gap) * 2)}
  .sh-tl[data-side="end"]{grid-template-columns:minmax(0,7fr) minmax(0,5fr)}
  .sh-tl[data-side="end"] .sh-tl-media{order:2}
}
@media (min-width:1000px) and (min-height:800px){.sh-tl-media{position:sticky;top:calc(var(--header-h, 72px) + 24px)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-tl-css")) return;
  const el = document.createElement("style");
  el.id = "sh-tl-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* rows: TimeTable rows — [{ time, title, text? }] */
export function TimelineSection({ title, sub, rows = [], src, alt = "", media, ratio = "4:5", mobileRatio = "4:3", mediaSide = "start", headingLevel = 2, style, ...rest }) {
  ensure();
  const figure = media || (src ? <Media src={src} alt={alt} ratio={ratio} mobileRatio={mobileRatio} /> : null);
  return (
    <div data-ds-id="sections/TimelineSection" className="sh-tl" data-side={mediaSide} style={style} {...rest}>
      {figure ? <div className="sh-tl-media">{figure}</div> : null}
      <div className="sh-tl-main">
        {title ? <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement> : null}
        <TimeTable rows={rows} headingLevel={Math.min(6, headingLevel + 1)} />
      </div>
    </div>
  );
}
