import React from "react";

/* Switch: 44×26 track, 20px knob travelling 18px over 240ms. Label at the same
   17px as Checkbox/Radio; whole row is a 44px target. */
const CSS = `
.sh-switch{position:relative;display:flex;width:fit-content;max-width:100%;align-items:center;gap:var(--space-4);min-height:var(--tap-min);font:var(--weight-regular) var(--text-base)/1.4 var(--font-body);color:var(--text-primary);cursor:pointer}
.sh-switch input{position:absolute;opacity:0;width:1px;height:1px;margin:0;pointer-events:none}
.sh-switch-track{position:relative;flex:0 0 auto;width:44px;height:26px;border-radius:var(--radius-pill);background:var(--color-cotton-seed);box-shadow:inset 0 0 0 1px color-mix(in srgb, var(--color-pine-tree) 8%, transparent);transition:background-color var(--duration-base) var(--ease-out),box-shadow var(--duration-base) var(--ease-out)}
.sh-switch-knob{position:absolute;inset-block-start:3px;inset-inline-start:3px;width:20px;height:20px;border-radius:50%;background:var(--color-white);box-shadow:var(--shadow-sm);transition:transform var(--duration-base) var(--ease-out)}
.sh-switch input:checked + .sh-switch-track{background:var(--surface-brand);box-shadow:none}
@media (hover: hover) and (pointer: fine){
  .sh-switch:hover input:not(:checked):not(:disabled) + .sh-switch-track{background:var(--color-line-600)}
}
.sh-switch input:checked + .sh-switch-track .sh-switch-knob{transform:translateX(18px)}
[dir="rtl"] .sh-switch input:checked + .sh-switch-track .sh-switch-knob{transform:translateX(-18px)}
.sh-switch input:focus-visible + .sh-switch-track{box-shadow:var(--ring-focus)}
.sh-switch input:disabled + .sh-switch-track{opacity:.45}
.sh-switch[data-disabled="true"]{cursor:not-allowed;color:var(--text-muted)}
.sh-switch[data-reverse="true"]{flex-direction:row-reverse;justify-content:space-between;width:100%}
.sh-switch-desc{display:block;margin-top:2px;color:var(--text-secondary);font-size:var(--text-sm);line-height:1.45}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-switch-css")) return;
  const el = document.createElement("style");
  el.id = "sh-switch-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function Switch({ label, description, labelFirst = false, className, style, ...rest }) {
  ensure();
  return (
    <label className={"sh-switch" + (className ? " " + className : "")} data-ds-id="forms/Switch" data-reverse={String(labelFirst)} data-disabled={String(Boolean(rest.disabled))} style={style}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="sh-switch-track"><span className="sh-switch-knob" /></span>
      {label ? <span>{label}{description ? <span className="sh-switch-desc">{description}</span> : null}</span> : null}
    </label>
  );
}
