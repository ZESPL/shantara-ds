import React from "react";
import { Icon } from "../core/Icon.jsx";

/* The medical-review strip: who reviewed an article and when. A stethoscope glyph in the
   brand colour, "Medically reviewed by <name>, <role>" and a caption line with the review
   date (and the next review, if scheduled). Sits under the ArticleHeader byline or at the
   end of the article body. Inline on a hairline by default; `boxed` puts it on Stone. */
const CSS = `
.sh-reviewed{display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-1) var(--space-4);align-items:start;padding-block:var(--space-4);border-block:var(--border-width) solid var(--rule-color);max-width:var(--measure-body);min-width:0}
.sh-reviewed[data-boxed="true"]{border:0;background:var(--ground-stone);padding:var(--space-5) var(--space-6)}
.sh-reviewed-icon{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:color-mix(in srgb, var(--text-brand) 12%, transparent);color:var(--text-brand);grid-row:span 2}
.sh-reviewed-who{margin:0;font:var(--type-body-sm);color:var(--text-secondary);padding-top:5px}
.sh-reviewed-who strong{font-weight:var(--weight-medium);color:var(--text-primary)}
.sh-reviewed-who a{color:inherit;text-decoration:underline;text-decoration-color:color-mix(in srgb, currentColor 35%, transparent);text-underline-offset:3px}
.sh-reviewed-when{margin:0;font:var(--type-caption);color:var(--text-muted);font-variant-numeric:tabular-nums}
.sh-reviewed-note{grid-column:2;margin:var(--space-2) 0 0;font:var(--type-caption);color:var(--text-muted);max-width:var(--measure-body)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-reviewed-css")) return;
  const el = document.createElement("style");
  el.id = "sh-reviewed-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function ReviewedBy({ name, role, href, date, dateTime, nextReview, label = "Medically reviewed by", note, boxed = false, style, ...rest }) {
  ensure();
  const who = href ? <a href={href}><strong>{name}</strong></a> : <strong>{name}</strong>;
  return (
    <div data-ds-id="editorial/ReviewedBy" className="sh-reviewed" data-boxed={String(boxed)} style={style} {...rest}>
      <span className="sh-reviewed-icon"><Icon name="stethoscope" size={16} /></span>
      <p className="sh-reviewed-who">{label} {who}{role ? <>, {role}</> : null}</p>
      {date || nextReview ? (
        <p className="sh-reviewed-when">
          {date ? <>Reviewed <time dateTime={dateTime}>{date}</time></> : null}
          {date && nextReview ? " · " : null}
          {nextReview ? <>Next review {nextReview}</> : null}
        </p>
      ) : null}
      {note ? <p className="sh-reviewed-note">{note}</p> : null}
    </div>
  );
}
