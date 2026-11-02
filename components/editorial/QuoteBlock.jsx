import React from "react";

/* A large Light quote, left-aligned, closed by an attribution line (a short rule, the
   speaker in Medium, their role in secondary type) and optional labelled facts beneath
   on a hairline (deck slides 16–17). Only real, consented words or the organisation's
   own statements go here, never a composed testimonial. */
const CSS = `
.sh-quote{margin:0;display:flex;flex-direction:column;gap:var(--space-7);min-width:0}
.sh-quote-text{margin:0;font:var(--type-statement);color:var(--text-primary);max-width:var(--measure-statement);text-wrap:pretty}
.sh-quote[data-size="md"] .sh-quote-text{font:var(--type-title)}
.sh-quote-text>p{margin:0;text-indent:-0.42em}
.sh-quote-text>p::before{content:"\\201C"}
.sh-quote-text>p::after{content:"\\201D"}
.sh-quote-cite{display:flex;align-items:center;flex-wrap:wrap;gap:var(--space-2) var(--space-4);font:var(--type-body-sm);color:var(--text-secondary)}
.sh-quote-cite::before{content:"";flex:0 0 auto;width:32px;height:1px;background:var(--text-brand)}
.sh-quote-name{font-weight:var(--weight-medium);color:var(--text-primary);font-style:normal}
.sh-quote-facts{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--space-6) var(--grid-gap);margin:var(--space-3) 0 0;padding-top:var(--space-6);border-top:var(--border-width) solid var(--rule-color)}
.sh-quote-facts dt{margin:0 0 var(--space-2);font:var(--type-label);color:var(--text-primary)}
.sh-quote-facts dd{margin:0;font:var(--type-body-sm);color:var(--text-secondary);max-width:44ch}
@media (min-width:760px){.sh-quote-facts{grid-template-columns:repeat(var(--_fc,2),minmax(0,1fr))}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-quote-css")) return;
  const el = document.createElement("style");
  el.id = "sh-quote-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function QuoteBlock({ quote, cite, role, facts = [], size = "lg", style, ...rest }) {
  ensure();
  const fc = Math.min(3, Math.max(1, facts.length));
  return (
    <figure data-ds-id="editorial/QuoteBlock" className="sh-quote" data-size={size} style={{ "--_fc": String(fc), ...style }} {...rest}>
      <blockquote className="sh-quote-text"><p>{quote}</p></blockquote>
      {cite || role ? (
        <figcaption className="sh-quote-cite">
          {cite ? <cite className="sh-quote-name">{cite}</cite> : null}
          {role ? <span>{role}</span> : null}
        </figcaption>
      ) : null}
      {facts.length ? (
        <dl className="sh-quote-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </figure>
  );
}
