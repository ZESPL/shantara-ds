import React from "react";
import { ReviewedBy } from "../editorial/ReviewedBy.jsx";

/* The sources under a clinical article or condition page, and the medical-review line.
   Numbered so the text can cite [1] with a link to #ref-1; each reference names the work,
   its publisher or journal and year, and links to the source itself. Every reference must
   support something the page says — never decorative. `reviewer` takes ReviewedBy props
   and follows the doctor naming rules in docs/handbook/glossary.md.
   One column at every size, capped at the body measure; long URLs wrap. */
const CSS = `
.sh-refs{display:flex;flex-direction:column;gap:var(--space-6);max-width:calc(var(--measure-body) + 2rem)}
.sh-refs-title{margin:0;font:var(--type-item-sm);color:var(--text-primary)}
.sh-refs-list{margin:0;padding:0;list-style:none;counter-reset:sh-ref;display:flex;flex-direction:column}
.sh-refs-item{display:grid;grid-template-columns:2rem minmax(0,1fr);gap:var(--space-3);padding:var(--space-4) 0;border-top:var(--border-width) solid var(--rule-color);counter-increment:sh-ref;font:var(--type-body-sm);color:var(--text-secondary);scroll-margin-top:calc(var(--header-h, 72px) + 24px)}
.sh-refs-item:last-child{border-bottom:var(--border-width) solid var(--rule-color)}
.sh-refs-item::before{content:counter(sh-ref) ".";color:var(--text-muted);font-variant-numeric:tabular-nums}
.sh-refs-item:target{background:color-mix(in srgb, var(--text-brand) 8%, transparent)}
.sh-refs-work{color:var(--text-primary)}
.sh-refs-item a{color:var(--text-link);overflow-wrap:anywhere;text-underline-offset:3px}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-refs-css")) return;
  const el = document.createElement("style");
  el.id = "sh-refs-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* items: [{ work, source?, year?, href? }] */
export function ReferencesSection({ title = "References", items = [], reviewer, idPrefix = "ref-", headingLevel = 2, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  return (
    <section data-ds-id="sections/ReferencesSection" className="sh-refs" aria-label={title} style={style} {...rest}>
      <H className="sh-refs-title">{title}</H>
      <ol className="sh-refs-list">
        {items.map((r, i) => (
          <li className="sh-refs-item" id={idPrefix + (i + 1)} key={r.work + i}>
            <span>
              <span className="sh-refs-work">{r.work}</span>
              {r.source ? <>. {r.source}</> : null}
              {r.year ? <>, {r.year}</> : null}
              {r.href ? <>. <a href={r.href} rel="noopener" target="_blank">{r.href.replace(/^https?:\/\//, "")}</a></> : null}
            </span>
          </li>
        ))}
      </ol>
      {reviewer ? <ReviewedBy {...reviewer} /> : null}
    </section>
  );
}
