import React from "react";

/* Radio: 20px ring, 1.5px border; the 8px dot is a grid child centred with
   place-items:center (no offsets), so it stays centred at every zoom level. */
const CSS = `
.sh-radio{position:relative;display:flex;width:fit-content;max-width:100%;box-sizing:border-box;align-items:flex-start;gap:var(--space-4);min-height:var(--tap-min);padding-block:10px;font:var(--weight-regular) var(--text-base)/1.4 var(--font-body);color:var(--text-primary);cursor:pointer}
.sh-radio input{position:absolute;opacity:0;width:1px;height:1px;margin:0;pointer-events:none}
.sh-radio-dot{flex:0 0 auto;box-sizing:border-box;display:grid;place-items:center;width:20px;height:20px;margin-top:calc((1.4em - 20px) / 2);background:var(--surface-card);border:var(--border-width-strong) solid var(--border-control);border-radius:50%;transition:var(--transition-control)}
.sh-radio-dot::after{content:"";width:8px;height:8px;border-radius:50%;background:var(--surface-brand);opacity:0;transform:scale(.4);transition:transform var(--duration-fast) var(--ease-out),opacity var(--duration-fast) var(--ease-out)}
.sh-radio input:focus-visible + .sh-radio-dot{box-shadow:var(--ring-focus)}
.sh-radio input:checked + .sh-radio-dot{border-color:var(--surface-brand)}
.sh-radio input:checked + .sh-radio-dot::after{opacity:1;transform:none}
.sh-radio:active .sh-radio-dot{transform:scale(var(--press-scale))}
.sh-radio input:disabled + .sh-radio-dot{background:var(--surface-raised);border-color:var(--border-subtle)}
.sh-radio input:disabled + .sh-radio-dot::after{background:var(--text-muted)}
.sh-radio[data-disabled="true"]{cursor:not-allowed;color:var(--text-muted)}
.sh-radio[data-invalid="true"] .sh-radio-dot{border-color:var(--status-danger)}
.sh-radio-desc{display:block;margin-top:2px;color:var(--text-secondary);font-size:var(--text-sm);line-height:1.45}
.sh-radio-card{width:100%;padding:var(--space-5);border:var(--border-width) solid var(--border-control);border-radius:var(--radius-input);background:var(--surface-card)}
.sh-radio-card:has(input:checked){border-color:var(--surface-brand);box-shadow:inset 0 0 0 1px var(--surface-brand)}
.sh-radio-card:has(input:focus-visible){box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){
  .sh-radio:hover input:not(:disabled):not(:checked) + .sh-radio-dot{border-color:var(--border-strong)}
  .sh-radio-card:hover:not(:has(input:checked)):not([data-disabled="true"]){border-color:var(--border-strong)}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-radio-css")) return;
  const el = document.createElement("style");
  el.id = "sh-radio-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function Radio({ label, description, card = false, invalid = false, className, style, ...rest }) {
  ensure();
  return (
    <label className={"sh-radio" + (card ? " sh-radio-card" : "") + (className ? " " + className : "")} data-ds-id="forms/Radio" data-disabled={String(Boolean(rest.disabled))} data-invalid={String(Boolean(invalid))} style={style}>
      <input type="radio" aria-invalid={invalid ? "true" : undefined} {...rest} />
      <span className="sh-radio-dot" />
      <span>{label}{description ? <span className="sh-radio-desc">{description}</span> : null}</span>
    </label>
  );
}
