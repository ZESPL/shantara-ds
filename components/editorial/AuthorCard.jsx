import React from "react";
import { PortraitFrame } from "./PortraitFrame.jsx";

/* The author's byline card at the foot of an article: the doctor's 4:5 portrait (initials
   until a photograph exists), a short normal-case label, the name, role, an optional
   one-paragraph bio and a link to their profile. Portrait beside the text on every width;
   the portrait shrinks on phones. */
const CSS = `
.sh-author{display:grid;grid-template-columns:clamp(84px, 6vw + 60px, 128px) minmax(0,1fr);gap:var(--space-5) var(--space-7);align-items:start;padding-block:var(--space-7);border-block:var(--border-width) solid var(--rule-color);max-width:var(--measure-body);min-width:0}
.sh-author .sh-portrait{gap:0}
.sh-author-body{display:flex;flex-direction:column;gap:var(--space-2);min-width:0}
.sh-author-label{margin:0;font:var(--type-caption);color:var(--text-muted)}
.sh-author-name{margin:0;font:var(--type-item);color:var(--text-primary)}
.sh-author-name a{color:inherit;text-decoration:none}
.sh-author-role{margin:0;font:var(--type-body-sm);color:var(--text-secondary)}
.sh-author-bio{margin:var(--space-3) 0 0;font:var(--type-body-sm);color:var(--text-secondary);max-width:var(--measure-body)}
.sh-author-link{margin-top:var(--space-3)}
@media (hover: hover) and (pointer: fine){.sh-author-name a:hover{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:4px}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-author-css")) return;
  const el = document.createElement("style");
  el.id = "sh-author-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function AuthorCard({ name, role, src, label = "Written by", bio, href, action, headingLevel = 2, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  return (
    <aside data-ds-id="editorial/AuthorCard" className="sh-author" aria-label={label} style={style} {...rest}>
      <PortraitFrame src={src} name={name} caption={false} />
      <div className="sh-author-body">
        {label ? <p className="sh-author-label">{label}</p> : null}
        <H className="sh-author-name">{href ? <a href={href}>{name}</a> : name}</H>
        {role ? <p className="sh-author-role">{role}</p> : null}
        {bio ? <p className="sh-author-bio">{bio}</p> : null}
        {action ? <div className="sh-author-link">{action}</div> : null}
      </div>
    </aside>
  );
}
