import React from "react";

/* Name, figure, attributes: no borders, the accent column in olive (deck slide 13).
   A real <table> for screen readers. Under 520px each row becomes a small block:
   the name on its own line, the other cells inline beneath it with their labels. */
const CSS = `
.sh-spec{width:100%;border-collapse:collapse;font:var(--type-body);color:var(--text-primary)}
.sh-spec th,.sh-spec td{padding:var(--space-4) 0;padding-inline-end:var(--space-7);text-align:start;vertical-align:baseline;font-weight:var(--weight-regular)}
.sh-spec th:last-child,.sh-spec td:last-child{padding-inline-end:0}
.sh-spec thead th{font:var(--type-label);color:var(--text-secondary);padding-bottom:var(--space-3)}
.sh-spec tbody th{font:var(--type-body);color:var(--text-primary)}
.sh-spec td{color:var(--text-secondary);font:var(--type-body-sm)}
.sh-spec td[data-accent="true"]{color:var(--text-brand);font:var(--type-body);font-variant-numeric:tabular-nums}
.sh-spec td[data-align="end"],.sh-spec th[data-align="end"]{text-align:end}
.sh-spec[data-rules="true"] tbody tr{border-top:var(--border-width) solid var(--rule-color)}
.sh-spec[data-size="lg"] tbody th{font:var(--type-item)}
.sh-spec[data-size="lg"] td[data-accent="true"]{font:var(--type-title);font-variant-numeric:tabular-nums}
/* variant="contrast": two sentences per row, side by side. Equal columns that wrap, one type
   size, the accent column on a raised ground under a gold rule; the other in secondary ink. */
.sh-spec[data-variant="contrast"]{table-layout:fixed}
.sh-spec[data-variant="contrast"] th,.sh-spec[data-variant="contrast"] td{white-space:normal;vertical-align:top;padding:var(--space-5) var(--space-6);font:var(--type-body)}
.sh-spec[data-variant="contrast"] thead th{font:var(--type-label);padding-block:var(--space-5) var(--space-4)}
.sh-spec[data-variant="contrast"] tbody th{color:var(--text-secondary);padding-inline-start:0}
.sh-spec[data-variant="contrast"] td[data-accent="true"]{background:var(--surface-raised);color:var(--text-primary);font:var(--type-body)}
.sh-spec[data-variant="contrast"] thead th:first-child{padding-inline-start:0}
.sh-spec[data-variant="contrast"] thead th:last-child{background:var(--surface-raised);color:var(--text-primary);border-top:3px solid var(--surface-accent)}
.sh-spec[data-variant="contrast"] tbody tr:last-child td[data-accent="true"]{padding-bottom:var(--space-7)}
@media (max-width:519.98px){
  .sh-spec thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
  .sh-spec,.sh-spec tbody,.sh-spec tr{display:block}
  .sh-spec tr{display:flex;flex-wrap:wrap;gap:var(--space-2) var(--space-5);padding:var(--space-5) 0}
  .sh-spec th,.sh-spec td{display:block;padding:0}
  .sh-spec tbody th{flex:1 0 100%}
  .sh-spec td[data-label]::before{content:attr(data-label) " ";color:var(--text-muted);font:var(--type-caption)}
  .sh-spec td[data-align="end"]{text-align:start}
  .sh-spec[data-variant="contrast"] tr{flex-direction:column;gap:0;padding:0}
  .sh-spec[data-variant="contrast"] tbody th,.sh-spec[data-variant="contrast"] td{padding:var(--space-4) var(--space-5)}
  .sh-spec[data-variant="contrast"] tbody th{padding-inline-start:0}
  .sh-spec[data-variant="contrast"] tbody tr:last-child td[data-accent="true"]{padding-bottom:var(--space-4)}
  .sh-spec[data-variant="contrast"] td[data-accent="true"]{border-inline-start:3px solid var(--surface-accent)}
  .sh-spec[data-variant="contrast"] [data-label]::before{content:attr(data-label);display:block;margin-bottom:var(--space-1);color:var(--text-muted);font:var(--type-caption)}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-spec-css")) return;
  const el = document.createElement("style");
  el.id = "sh-spec-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* columns: [{ key, label, accent?, align? }]. The first column is the row header. */
export function SpecTable({ columns = [], rows = [], caption, showHeader = false, rules = true, size = "md", variant = "default", style, ...rest }) {
  ensure();
  const [head, ...cells] = columns;
  return (
    <table data-ds-id="editorial/SpecTable" className="sh-spec" data-rules={String(rules)} data-size={size} data-variant={variant} style={style} {...rest}>
      {caption ? <caption className="sh-visually-hidden">{caption}</caption> : null}
      <thead style={showHeader ? undefined : { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        <tr>{columns.map((c) => <th key={c.key} scope="col" data-align={c.align}>{c.label}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r[head.key] || i}>
            <th scope="row" data-label={variant === "contrast" ? head.label : undefined}>{r[head.key]}</th>
            {cells.map((c) => (
              <td key={c.key} data-accent={c.accent ? "true" : undefined} data-align={c.align} data-label={c.mobileLabel || variant === "contrast" ? c.label : undefined}>{r[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
