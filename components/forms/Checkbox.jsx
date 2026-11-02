import React from "react";

/* Checkbox: 20px box, 2px radius, 1.5px border. The tick is an inline SVG drawn on a
   20×20 grid and centred with place-items:center, so it sits dead centre at any zoom. */
const CSS = `
.sh-check{position:relative;display:flex;width:fit-content;max-width:100%;flex-direction:column;gap:var(--space-2);font-family:var(--font-body)}
.sh-check-row{display:inline-flex;align-items:flex-start;gap:var(--space-4);min-height:var(--tap-min);padding-block:10px;font:var(--weight-regular) var(--text-base)/1.4 var(--font-body);color:var(--text-primary);cursor:pointer}
.sh-check input{position:absolute;opacity:0;width:1px;height:1px;margin:0;pointer-events:none}
.sh-check-box{flex:0 0 auto;box-sizing:border-box;display:grid;place-items:center;width:20px;height:20px;margin-top:calc((1.4em - 20px) / 2);background:var(--surface-card);border:var(--border-width-strong) solid var(--border-control);border-radius:var(--radius-xs);color:var(--text-on-brand);transition:var(--transition-control)}
.sh-check-box svg{display:block;width:14px;height:14px;grid-area:1 / 1;opacity:0;transform:scale(.6);transition:opacity var(--duration-fast) var(--ease-out),transform var(--duration-fast) var(--ease-out)}
.sh-check-row:active .sh-check-box{transform:scale(var(--press-scale))}
@media (hover: hover) and (pointer: fine){
  .sh-check-row:hover input:not(:disabled) + .sh-check-box{border-color:var(--border-strong)}
}
.sh-check input:focus-visible + .sh-check-box{box-shadow:var(--ring-focus)}
.sh-check input:checked + .sh-check-box,.sh-check input:indeterminate + .sh-check-box{background:var(--surface-brand);border-color:var(--surface-brand)}
.sh-check input:checked:not(:indeterminate) + .sh-check-box .sh-check-tick,.sh-check input:indeterminate + .sh-check-box .sh-check-dash{opacity:1;transform:none}
.sh-check[data-invalid="true"] .sh-check-box{border-color:var(--status-danger)}
.sh-check input:disabled + .sh-check-box{background:var(--surface-raised);border-color:var(--border-subtle)}
.sh-check input:disabled:checked + .sh-check-box{background:color-mix(in srgb, var(--surface-brand) 45%, var(--surface-raised));border-color:transparent}
.sh-check[data-disabled="true"] .sh-check-row{cursor:not-allowed;color:var(--text-muted)}
.sh-check-text{min-width:0}
.sh-check-req{color:var(--text-brand);margin-inline-start:2px}
.sh-check-desc{display:block;margin-top:2px;color:var(--text-secondary);font-size:var(--text-sm);line-height:1.45}
.sh-check-err{display:flex;gap:var(--space-2);align-items:flex-start;margin-inline-start:calc(20px + var(--space-4));font:var(--weight-regular) var(--text-xs)/1.45 var(--font-body);color:var(--status-danger);animation:sh-enter-up var(--duration-base) var(--ease-out)}
.sh-check-err svg{flex:0 0 auto;margin-top:2px}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-check-css")) return;
  const el = document.createElement("style");
  el.id = "sh-check-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const TICK = <svg className="sh-check-tick" viewBox="0 0 14 14" aria-hidden="true"><path d="M2.75 7.25l2.75 2.75 5.75-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const DASH = <svg className="sh-check-dash" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 7h8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>;
const ALERT = <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.75v3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="11.1" r="0.9" fill="currentColor" /></svg>;

export function Checkbox({ label, description, indeterminate = false, error, required, id, className, style, ...rest }) {
  ensure();
  const ref = React.useRef(null);
  const auto = React.useId();
  const fid = id || "sh-cb" + auto.replace(/:/g, "");
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <span className={"sh-check" + (className ? " " + className : "")} data-ds-id="forms/Checkbox" data-invalid={String(Boolean(error))} data-disabled={String(Boolean(rest.disabled))} style={style}>
      <label className="sh-check-row" htmlFor={fid}>
        <input ref={ref} id={fid} type="checkbox" required={required} aria-invalid={error ? "true" : undefined} aria-describedby={error ? fid + "-err" : undefined} {...rest} />
        <span className="sh-check-box">{TICK}{DASH}</span>
        <span className="sh-check-text">
          {label}{required ? <span className="sh-check-req" aria-hidden="true">*</span> : null}
          {description ? <span className="sh-check-desc">{description}</span> : null}
        </span>
      </label>
      {error ? <span className="sh-check-err" id={fid + "-err"}>{ALERT}<span>{error}</span></span> : null}
    </span>
  );
}
