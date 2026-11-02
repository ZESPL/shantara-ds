import React from "react";

/* Numbered steps in two orientations.
   horizontal (default): muted 01–04 numerals in a FIXED-width column, so every title and
   description starts on the same line whatever the number's width; the number sits on
   the title's baseline. One column on phones, two from 760px, `columns` from 1000px
   (at 4 columns the number moves above the title, still on one shared left edge).
   vertical: a timeline, with numbers in a column of hairline circles joined by a 1px line,
   content to the right. Same on every width; the circles shrink on phones. */
const CSS = `
.sh-steps{--_nw:2.75rem;list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-8) var(--grid-gap)}
.sh-step{display:grid;grid-template-columns:var(--_nw) minmax(0,1fr);column-gap:var(--space-4);align-items:baseline;padding-top:var(--space-5);border-top:var(--border-width) solid var(--rule-color);min-width:0}
.sh-step-n{font:var(--weight-light) var(--text-lg)/1.3 var(--font-display);color:var(--text-brand);font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1;white-space:nowrap}
.sh-step-body{min-width:0}
.sh-step-title{margin:0;font:var(--type-item);color:var(--text-primary)}
.sh-step-text{margin:var(--space-3) 0 0;font:var(--type-body-sm);color:var(--text-secondary);max-width:52ch}
.sh-steps[data-rules="false"] .sh-step{border-top:0;padding-top:0}
@media (min-width:760px){.sh-steps[data-orientation="horizontal"][data-columns="2"],.sh-steps[data-orientation="horizontal"][data-columns="3"],.sh-steps[data-orientation="horizontal"][data-columns="4"]{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){
  .sh-steps[data-orientation="horizontal"][data-columns="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}
  .sh-steps[data-orientation="horizontal"][data-columns="4"]{grid-template-columns:repeat(4,minmax(0,1fr))}
  .sh-steps[data-orientation="horizontal"][data-columns="4"] .sh-step{grid-template-columns:minmax(0,1fr);row-gap:var(--space-4)}
}
/* vertical timeline */
.sh-steps[data-orientation="vertical"]{--_d:2.75rem;gap:0;max-width:var(--_vmax,44rem)}
.sh-steps[data-orientation="vertical"] .sh-step{position:relative;grid-template-columns:var(--_d) minmax(0,1fr);column-gap:var(--space-6);align-items:start;padding:0 0 var(--space-9);border-top:0}
.sh-steps[data-orientation="vertical"] .sh-step:last-child{padding-bottom:0}
.sh-steps[data-orientation="vertical"] .sh-step::before{content:"";position:absolute;inset-inline-start:calc(var(--_d) / 2 - 0.5px);top:calc(var(--_d) + var(--space-2));bottom:var(--space-2);width:1px;background:var(--rule-color)}
.sh-steps[data-orientation="vertical"] .sh-step:last-child::before{display:none}
.sh-steps[data-orientation="vertical"] .sh-step-n{display:grid;place-items:center;width:var(--_d);height:var(--_d);border:1px solid color-mix(in srgb, var(--text-brand) 55%, transparent);border-radius:50%;font:var(--weight-regular) var(--text-sm)/1 var(--font-display)}
.sh-steps[data-orientation="vertical"] .sh-step-body{padding-top:calc((var(--_d) - var(--text-lg) * 1.3) / 2)}
@media (max-width:519.98px){.sh-steps[data-orientation="vertical"]{--_d:2.25rem}.sh-steps[data-orientation="vertical"] .sh-step{column-gap:var(--space-5);padding-bottom:var(--space-8)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-steps-css")) return;
  const el = document.createElement("style");
  el.id = "sh-steps-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function NumberedSteps({ items = [], orientation = "horizontal", columns = 1, start = 1, rules = true, headingLevel = 3, style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  return (
    <ol data-ds-id="editorial/NumberedSteps" className="sh-steps" data-orientation={orientation} data-columns={String(columns)} data-rules={String(rules)} start={start} style={style} {...rest}>
      {items.map((item, i) => (
        <li className="sh-step" key={item.title || i}>
          <span className="sh-step-n" aria-hidden="true">{String(start + i).padStart(2, "0")}</span>
          <div className="sh-step-body">
            <H className="sh-step-title">{item.title}</H>
            {item.text ? <p className="sh-step-text">{item.text}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
