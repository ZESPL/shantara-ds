import React from "react";

/* One large Light figure with a small caption. Two or three per row, never four.
   Tabular figures so a row of numbers lines up. */
const CSS = `
.sh-num{display:flex;flex-direction:column;gap:var(--space-4);min-width:0}
.sh-num-value{font:var(--type-numeral);font-variant-numeric:tabular-nums;font-feature-settings:"tnum" 1;color:var(--text-primary);letter-spacing:-0.01em}
.sh-num-label{font:var(--type-body-sm);color:var(--text-secondary);max-width:var(--measure-narrow)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-num-css")) return;
  const el = document.createElement("style");
  el.id = "sh-num-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function Numeral({ value, label, style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="editorial/Numeral" className="sh-num" style={style} {...rest}>
      <span className="sh-num-value">{value}</span>
      {label ? <span className="sh-num-label">{label}</span> : null}
    </div>
  );
}
