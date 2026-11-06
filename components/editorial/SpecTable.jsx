import React from "react";

/* Name, figure, attributes: no borders, the accent column in olive (deck slide 13).
   A real <table> for screen readers. One type size: header, names, values and figures are
   all body; the accent column changes colour, never size. From 520px a value cell keeps to
   one line and the name column wraps. Under 520px each row becomes a block: the name, then
   each other cell on its own line with its label (one piece of information per line). */
const CSS = `
.sh-spec{width:100%;border-collapse:collapse;font:var(--type-body);color:var(--text-primary)}
.sh-spec th,.sh-spec td{padding:var(--space-4) 0;padding-inline-end:var(--space-7);text-align:start;vertical-align:baseline;font-weight:var(--weight-regular)}
.sh-spec th:last-child,.sh-spec td:last-child{padding-inline-end:0}
.sh-spec thead th{font:var(--type-body);color:var(--text-secondary);padding-bottom:var(--space-3)}
.sh-spec tbody th{font:var(--type-body);color:var(--text-primary)}
.sh-spec td{color:var(--text-secondary);font:var(--type-body)}
@media (min-width:520px){.sh-spec td,.sh-spec thead th:not(:first-child){white-space:nowrap}}
.sh-spec td[data-accent="true"]{color:var(--text-brand);font:var(--type-body);font-variant-numeric:tabular-nums}
.sh-spec td[data-align="end"],.sh-spec th[data-align="end"]{text-align:end}
.sh-spec[data-rules="true"] tbody tr{border-top:var(--border-width) solid var(--rule-color)}
@media (max-width:519.98px){
  .sh-spec thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
  .sh-spec,.sh-spec tbody,.sh-spec tr{display:block}
  .sh-spec tr{display:flex;flex-direction:column;gap:var(--space-2);padding:var(--space-5) 0}
  .sh-spec th,.sh-spec td{display:block;padding:0}
  .sh-spec td[data-label]::before{content:attr(data-label) " ";color:var(--text-muted);font:var(--type-body)}
  .sh-spec td[data-align="end"]{text-align:start}
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
export function SpecTable({ columns = [], rows = [], caption, showHeader = false, rules = true, style, ...rest }) {
  ensure();
  const [head, ...cells] = columns;
  return (
    <table data-ds-id="editorial/SpecTable" className="sh-spec" data-rules={String(rules)} style={style} {...rest}>
      {caption ? <caption className="sh-visually-hidden">{caption}</caption> : null}
      <thead style={showHeader ? undefined : { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        <tr>{columns.map((c) => <th key={c.key} scope="col" data-align={c.align}>{c.label}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r[head.key] || i}>
            <th scope="row">{r[head.key]}</th>
            {cells.map((c) => (
              <td key={c.key} data-accent={c.accent ? "true" : undefined} data-align={c.align} data-label={c.mobileLabel ? c.label : undefined}>{r[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
