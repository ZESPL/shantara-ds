import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Video } from "../editorial/Video.jsx";
import { SplitSection } from "./SplitSection.jsx";

/* A film with its context — a walk through the property, a day, a therapy explained. Native
   <video> from R2 through editorial/Video (skill-video.md): a player with controls and
   captions, never autoplaying with sound, never YouTube, Vimeo or Stream.
   layout "full": statement above, the frame across the container at 16:9 (4:5 on phones).
   layout "split": the frame beside the statement at 16:9, as a SplitSection (photo side rules). */
const CSS = `
.sh-vfeat{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-vfeat-head{display:flex;flex-direction:column;gap:var(--space-5)}
.sh-vfeat-note{margin:0;font:var(--type-caption);color:var(--text-secondary);max-width:var(--measure-body)}
@media (min-width:760px){.sh-vfeat-head{flex-direction:row;align-items:flex-end;justify-content:space-between;gap:var(--grid-gap)}.sh-vfeat-head>:last-child:not(:first-child){flex:0 0 auto}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-vfeat-css")) return;
  const el = document.createElement("style");
  el.id = "sh-vfeat-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* video: { src | sources, poster, title, captions?, transcript? } */
export function VideoFeature({ title, sub, video = {}, layout = "full", mediaSide = "start", ground = "merino", note, action, headingLevel = 2, style, ...rest }) {
  ensure();
  const player = <Video {...video} ratio="16:9" mobileRatio={layout === "split" ? "16:9" : "4:5"} />;
  if (layout === "split") {
    return (
      <SplitSection data-ds-id="sections/VideoFeature" media={player} mediaSide={mediaSide} bleed={false} mobileRatio="16:9" ground={ground} align="center" style={style} {...rest}>
        <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement>
        {action ? <div>{action}</div> : null}
      </SplitSection>
    );
  }
  return (
    <div data-ds-id="sections/VideoFeature" className="sh-vfeat" style={style} {...rest}>
      {title || action ? (
        <div className="sh-vfeat-head">
          {title ? <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement> : <span />}
          {action ? <div>{action}</div> : null}
        </div>
      ) : null}
      {player}
      {note ? <p className="sh-vfeat-note">{note}</p> : null}
    </div>
  );
}
