import React from "react";

/* Long-form article text. Styles the plain HTML a CMS or Markdown renderer produces —
   h2/h3/h4, p, ul/ol, blockquote, figure + figcaption, table, hr, links, strong/em, code —
   at a 68ch measure with the body rhythm. Wide children (figure[data-width="wide"],
   tables) may break out of the measure up to the container. */
const CSS = `
.sh-prose{--_measure:68ch;max-width:var(--_measure);font:var(--type-body);color:var(--text-primary);min-width:0;overflow-wrap:break-word}
.sh-prose[data-size="lg"]{font:var(--type-lead)}
.sh-prose>*{margin-block:0}
.sh-prose>*+*{margin-top:1.1em}
.sh-prose>:first-child{margin-top:0}
.sh-prose h2{font:var(--type-h3);color:var(--text-primary);margin-top:2.2em;text-wrap:balance;scroll-margin-top:calc(var(--space-12) + 24px)}
.sh-prose h3{font:var(--type-h4);color:var(--text-primary);margin-top:1.9em;text-wrap:balance;scroll-margin-top:calc(var(--space-12) + 24px)}
.sh-prose h4{font:var(--type-item-sm);margin-top:1.6em}
.sh-prose h2+*,.sh-prose h3+*,.sh-prose h4+*{margin-top:0.6em}
.sh-prose p{text-wrap:pretty}
.sh-prose>p:first-child[data-lead],.sh-prose .lead{font:var(--type-lead);color:var(--text-secondary)}
.sh-prose a{color:var(--text-link);text-decoration:underline;text-decoration-thickness:1px;text-decoration-color:color-mix(in srgb, var(--text-link) 45%, transparent);text-underline-offset:3px}
.sh-prose a:hover{color:var(--text-link-hover);text-decoration-color:currentColor}
.sh-prose strong{font-weight:var(--weight-semibold)}
.sh-prose ul,.sh-prose ol{padding-inline-start:1.4em}
.sh-prose li+li{margin-top:0.45em}
.sh-prose li::marker{color:var(--text-brand)}
.sh-prose ol>li::marker{font-variant-numeric:tabular-nums}
.sh-prose blockquote{margin-inline:0;padding-inline-start:var(--space-6);border-inline-start:1px solid var(--text-brand);font:var(--type-lead);font-weight:var(--weight-light);color:var(--text-primary)}
.sh-prose blockquote p{margin:0}
.sh-prose blockquote footer,.sh-prose blockquote cite{display:block;margin-top:var(--space-3);font:var(--type-body-sm);font-style:normal;color:var(--text-secondary)}
.sh-prose figure{margin-inline:0;margin-block:2em}
.sh-prose figure img{display:block;width:100%;height:auto}
.sh-prose figcaption{margin-top:var(--space-3);font:var(--type-caption);color:var(--text-muted);max-width:60ch}
.sh-prose hr{border:0;height:1px;background:var(--rule-color);margin-block:2.4em}
.sh-prose table{width:100%;border-collapse:collapse;font:var(--type-body-sm);font-variant-numeric:tabular-nums}
@media (max-width:759.98px){.sh-prose table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}}
.sh-prose thead th{font:var(--type-label);color:var(--text-primary);text-align:start;padding:var(--space-3) var(--space-5) var(--space-3) 0;border-bottom:1px solid var(--text-primary);white-space:nowrap}
.sh-prose td{padding:var(--space-3) var(--space-5) var(--space-3) 0;border-bottom:var(--border-width) solid var(--rule-color);vertical-align:top;color:var(--text-secondary)}
.sh-prose caption{caption-side:bottom;text-align:start;padding-top:var(--space-3);font:var(--type-caption);color:var(--text-muted)}
.sh-prose code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:0.9em;background:color-mix(in srgb, var(--text-primary) 6%, transparent);padding:0.1em 0.3em}
@media (min-width:1000px){
  .sh-prose [data-width="wide"]{width:min(100cqw, calc(var(--_measure) + 16rem));max-width:none}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-prose-css")) return;
  const el = document.createElement("style");
  el.id = "sh-prose-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function Prose({ html, size = "md", as: Tag = "div", children, className, style, ...rest }) {
  ensure();
  const props = { "data-ds-id": "editorial/Prose", className: "sh-prose" + (className ? " " + className : ""), "data-size": size, style, ...rest };
  return html != null ? <Tag {...props} dangerouslySetInnerHTML={{ __html: html }} /> : <Tag {...props}>{children}</Tag>;
}
