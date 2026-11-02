import React from "react";

/* Shared field chrome: identical in Input, Textarea and Select (one <style id="sh-field-css">). */
const FIELD_CSS = `
.sh-field{display:flex;flex-direction:column;gap:var(--space-3);min-width:0;font-family:var(--font-body)}
.sh-field-label{display:flex;align-items:baseline;gap:var(--space-2);font:var(--weight-medium) var(--text-sm)/1.3 var(--font-body);color:var(--text-primary)}
.sh-field-req{color:var(--text-brand);font-weight:var(--weight-regular)}
.sh-field-opt{color:var(--text-muted);font-weight:var(--weight-regular);font-size:var(--text-xs)}
.sh-field-msg{display:flex;align-items:flex-start;gap:var(--space-2);font:var(--weight-regular) var(--text-xs)/1.45 var(--font-body);color:var(--text-secondary)}
.sh-field-msg[data-kind="error"]{color:var(--status-danger);animation:sh-enter-up var(--duration-base) var(--ease-out)}
.sh-field-msg svg{flex:0 0 auto;margin-top:2px}
.sh-field-foot{display:flex;justify-content:space-between;align-items:flex-start;gap:var(--space-4)}
.sh-field-count{margin-inline-start:auto;font:var(--weight-regular) var(--text-xs)/1.45 var(--font-body);color:var(--text-muted);font-variant-numeric:tabular-nums}
.sh-ctl{--_bd:var(--border-control);--_ring:var(--surface-brand-soft);width:100%;min-width:0;background:var(--surface-card);border:var(--border-width) solid var(--_bd);border-radius:var(--radius-input);color:var(--text-primary);font:var(--weight-regular) var(--text-base)/1.4 var(--font-body);transition:var(--transition-control)}
.sh-ctl[data-invalid="true"]{--_bd:var(--status-danger);--_ring:var(--status-danger-soft)}
@media (hover: hover) and (pointer: fine){
  .sh-ctl:not([data-disabled="true"]):not([data-invalid="true"]):hover{--_bd:var(--border-strong)}
}
.sh-ctl:focus-within,.sh-ctl:focus{outline:none;--_bd:var(--border-focus);box-shadow:0 0 0 3px var(--_ring)}
.sh-ctl[data-invalid="true"]:focus-within,.sh-ctl[data-invalid="true"]:focus{--_bd:var(--status-danger)}
.sh-ctl[data-disabled="true"],.sh-ctl:disabled{background:var(--surface-raised);--_bd:var(--border-subtle);color:var(--text-muted);cursor:not-allowed}
.sh-ctl ::placeholder,.sh-ctl::placeholder{color:var(--text-muted);opacity:1}
`;

function ensureField() {
  if (typeof document === "undefined" || document.getElementById("sh-field-css")) return;
  const el = document.createElement("style");
  el.id = "sh-field-css";
  el.textContent = FIELD_CSS;
  document.head.appendChild(el);
}

const ALERT = (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.75v3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="11.1" r="0.9" fill="currentColor" /></svg>
);

function FieldLabel({ htmlFor, label, required, optional }) {
  if (!label) return null;
  return (
    <label className="sh-field-label" htmlFor={htmlFor}>
      <span>{label}</span>
      {required ? <span className="sh-field-req" aria-hidden="true">*</span> : null}
      {!required && optional ? <span className="sh-field-opt">{typeof optional === "string" ? optional : "Optional"}</span> : null}
    </label>
  );
}

function FieldMessage({ id, error, hint }) {
  if (error) return <span className="sh-field-msg" data-kind="error" id={id}>{ALERT}<span>{error}</span></span>;
  if (hint) return <span className="sh-field-msg" id={id}>{hint}</span>;
  return null;
}

/* Select: native <select> (best on phones) in Input's chrome, with a 16px chevron centred
   on the field's midline at the inline end. */
const CSS = `
.sh-sel-box{position:relative;display:block}
.sh-sel{appearance:none;-webkit-appearance:none;display:block;height:var(--control-lg);padding-block:0;padding-inline:var(--space-5) calc(var(--space-5) + 16px + var(--space-3));cursor:pointer;text-overflow:ellipsis}
.sh-sel[data-size="sm"]{height:var(--control-md)}
.sh-sel[data-size="lg"]{height:var(--control-xl)}
.sh-sel[data-placeholder="true"]{color:var(--text-muted)}
.sh-sel option{color:var(--text-primary)}
.sh-sel-caret{position:absolute;top:50%;inset-inline-end:var(--space-5);width:16px;height:16px;margin-top:-8px;color:var(--text-secondary);pointer-events:none;transition:color var(--duration-fast) var(--ease-standard)}
.sh-sel-box:focus-within .sh-sel-caret{color:var(--text-brand)}
.sh-sel:disabled + .sh-sel-caret{color:var(--text-muted)}
`;

function ensure() {
  ensureField();
  if (typeof document === "undefined" || document.getElementById("sh-sel-css")) return;
  const el = document.createElement("style");
  el.id = "sh-sel-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const CHEVRON = (
  <svg className="sh-sel-caret" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export function Select({ label, hint, error, required, optional, size = "md", options = [], placeholder, children, id, className, style, value, defaultValue, onChange, ...rest }) {
  ensure();
  const auto = React.useId();
  const fid = id || "sh-sel" + auto.replace(/:/g, "");
  const mid = fid + "-msg";
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue !== undefined ? defaultValue : "");
  const current = controlled ? value : inner;
  const isPlaceholder = Boolean(placeholder) && (current === "" || current == null);
  return (
    <div className={"sh-field" + (className ? " " + className : "")} data-ds-id="forms/Select" style={style}>
      <FieldLabel htmlFor={fid} label={label} required={required} optional={optional} />
      <span className="sh-sel-box">
        <select
          id={fid}
          className="sh-ctl sh-sel"
          data-size={size}
          data-invalid={String(Boolean(error))}
          data-placeholder={String(isPlaceholder)}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error || hint ? mid : undefined}
          value={controlled ? value : undefined}
          defaultValue={controlled ? undefined : (defaultValue !== undefined ? defaultValue : placeholder ? "" : undefined)}
          onChange={(e) => { if (!controlled) setInner(e.target.value); if (onChange) onChange(e); }}
          {...rest}
        >
          {placeholder ? <option value="" disabled={required}>{placeholder}</option> : null}
          {options.map((o) => {
            const v = typeof o === "string" ? o : o.value;
            const l = typeof o === "string" ? o : o.label;
            return <option key={v} value={v}>{l}</option>;
          })}
          {children}
        </select>
        {CHEVRON}
      </span>
      <FieldMessage id={mid} error={error} hint={hint} />
    </div>
  );
}
