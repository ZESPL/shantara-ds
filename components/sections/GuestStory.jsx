import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Media } from "../editorial/Media.jsx";

/* A guest's own words. Only real stories with written consent (content/guest-stories,
   content/testimonials — both empty today, so nothing ships until they are not). A name only
   when the guest agreed to it; otherwise a first initial and the context of the stay. Never
   a health result or a claim the clinical team would not make; never a face in therapy.
   `story` — one story: a large quote, the attribution and the context of the stay, with an
   optional photograph of the place (not the guest) beside it from 1000px.
   `stories` — two or three short quotes side by side from 1000px, stacked below. No carousel. */
const CSS = `
.sh-story{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:center}
.sh-story-quote{margin:0;display:flex;flex-direction:column;gap:var(--space-6);min-width:0}
.sh-story-text{margin:0;font:var(--type-statement);color:var(--text-primary);max-width:var(--measure-statement);text-wrap:pretty}
.sh-story-text::before{content:"\\201C"}.sh-story-text::after{content:"\\201D"}
.sh-story-cite{display:flex;flex-direction:column;gap:var(--space-1);font:var(--type-body-sm);color:var(--text-secondary);font-style:normal}
.sh-story-name{font-weight:var(--weight-medium);color:var(--text-primary)}
.sh-story-cite::before{content:"";width:32px;height:1px;margin-bottom:var(--space-3);background:var(--text-brand)}
.sh-story[data-has-media="true"]{align-items:end}
@media (max-width:999.98px){.sh-story .sh-media{aspect-ratio:4 / 3}}
@media (min-width:1000px){.sh-story[data-has-media="true"]{grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:calc(var(--grid-gap) * 2)}}
.sh-stories{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-stories-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg) calc(var(--grid-gap) * 2)}
.sh-stories-list .sh-story-text{font:var(--type-title)}
.sh-stories-list>li{padding-top:var(--space-6);border-top:var(--border-width) solid var(--rule-color)}
@media (min-width:1000px){.sh-stories-list{grid-template-columns:repeat(var(--_n,3),minmax(0,1fr))}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-story-css")) return;
  const el = document.createElement("style");
  el.id = "sh-story-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

function Quote({ s }) {
  return (
    <blockquote className="sh-story-quote">
      <p className="sh-story-text">{s.quote}</p>
      <footer className="sh-story-cite">
        {s.name ? <span className="sh-story-name">{s.name}</span> : null}
        {s.context ? <span>{s.context}</span> : null}
      </footer>
    </blockquote>
  );
}

/* story / stories: { quote, name?, context?, src?, alt? } */
export function GuestStory({ story, stories, title, sub, headingLevel = 2, style, ...rest }) {
  ensure();
  if (stories) {
    const shown = stories.slice(0, 3);
    return (
      <div data-ds-id="sections/GuestStory" className="sh-stories" style={{ "--_n": String(shown.length), ...style }} {...rest}>
        {title ? <Statement as={"h" + headingLevel} sub={sub}>{title}</Statement> : null}
        <ul className="sh-stories-list">{shown.map((s, i) => <li key={i}><Quote s={s} /></li>)}</ul>
      </div>
    );
  }
  const s = story || {};
  const figure = s.src ? <Media src={s.src} alt={s.alt || ""} ratio="4:5" mobileRatio="4:3" /> : null;
  return (
    <div data-ds-id="sections/GuestStory" className="sh-story" data-has-media={String(!!figure)} style={style} {...rest}>
      <Quote s={s} />
      {figure}
    </div>
  );
}
