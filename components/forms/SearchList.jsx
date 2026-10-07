import React from "react";
import { filterOptions, highlightParts, normalizeOptions, pointerMovesHighlight } from "./fieldLogic.mjs";
import { ENGLISH_HINT, rejectForeignInsert, stripForeignInput } from "./englishText.mjs";

/* Shared field chrome — same rules and style id as Input, Textarea and Select. */
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
.sh-field-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0}
`;

const CSS = `
.sh-search-anchor{position:relative}
.sh-search-wrap{display:flex;align-items:center;gap:var(--space-3);height:var(--control-lg);padding-inline:var(--space-5)}
.sh-search-wrap[data-size="sm"]{height:var(--control-md)}
.sh-search-wrap[data-size="lg"]{height:var(--control-xl)}
.sh-search-icon,.sh-search-chev{flex:0 0 auto;width:16px;height:16px;color:var(--text-secondary);pointer-events:none}
.sh-search-anchor:focus-within .sh-search-icon,.sh-search-anchor:focus-within .sh-search-chev{color:var(--text-brand)}
.sh-search-wrap[data-disabled="true"] .sh-search-icon,.sh-search-wrap[data-disabled="true"] .sh-search-chev{color:var(--text-muted)}
.sh-search-input{flex:1;min-width:0;height:100%;padding:0;border:0;background:transparent;color:inherit;font:inherit;outline:none}
.sh-search-input:disabled{cursor:not-allowed}
.sh-search-input:focus-visible{box-shadow:none}
.sh-search-clear{flex:0 0 auto;width:28px;height:28px;display:grid;place-items:center;padding:0;border:0;border-radius:var(--radius-xs);background:transparent;color:var(--text-secondary);cursor:pointer}
.sh-search-clear svg{display:block;width:14px;height:14px}
.sh-search-clear:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-search-clear:disabled{color:var(--text-muted);cursor:not-allowed}
.sh-search-pop{position:absolute;z-index:40;inset-inline-start:0;inset-block-start:calc(100% + var(--space-2));width:100%;max-width:calc(100vw - 24px);background:var(--surface-card);border:var(--border-width) solid var(--border-subtle);border-radius:var(--radius-card);box-shadow:var(--shadow-md);animation:sh-enter-up var(--duration-fast) var(--ease-out)}
.sh-search-pop[data-flip="true"]{inset-block-start:auto;inset-block-end:calc(100% + var(--space-2))}
.sh-search-pop[data-pin="end"]{inset-inline-start:auto;inset-inline-end:0}
.sh-search-list{list-style:none;margin:0;max-height:280px;overflow:auto;padding:var(--space-2)}
.sh-search-opt{display:flex;align-items:center;justify-content:space-between;gap:var(--space-3);width:100%;min-height:var(--tap-min);padding:var(--space-3) var(--space-4);border-radius:var(--radius-xs);color:var(--text-primary);text-align:start;cursor:pointer}
.sh-search-opt[data-active="true"]{background:var(--surface-raised)}
.sh-search-opt[aria-selected="true"] .sh-search-label{font-weight:var(--weight-medium)}
.sh-search-copy{display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-width:0}
.sh-search-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:var(--weight-regular) var(--text-base)/1.3 var(--font-body)}
.sh-search-desc{font:var(--weight-regular) var(--text-xs)/1.3 var(--font-body);color:var(--text-muted)}
.sh-search-mark{background:none;color:inherit;font-weight:var(--weight-medium)}
.sh-search-tick{flex:0 0 auto;width:16px;height:16px;color:var(--text-brand)}
.sh-search-empty{padding:var(--space-5);color:var(--text-muted);font:var(--weight-regular) var(--text-sm)/1.4 var(--font-body)}
@media (hover: hover) and (pointer: fine){
  .sh-search-clear:not(:disabled):hover{background:var(--surface-raised);color:var(--text-primary)}
  .sh-search-opt:hover{background:var(--surface-raised)}
}
`;

function ensureField() {
  if (typeof document === "undefined" || document.getElementById("sh-field-css")) return;
  const el = document.createElement("style");
  el.id = "sh-field-css";
  el.textContent = FIELD_CSS;
  document.head.appendChild(el);
}

function ensure() {
  ensureField();
  if (typeof document === "undefined" || document.getElementById("sh-search-css")) return;
  const el = document.createElement("style");
  el.id = "sh-search-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const ALERT = (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.75v3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="11.1" r="0.9" fill="currentColor" /></svg>
);

const SEARCH = (
  <svg className="sh-search-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M10.25 10.25L13.5 13.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
);

const CHEVRON = (
  <svg className="sh-search-chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const TICK = (
  <svg className="sh-search-tick" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.25l3 3 6-6.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

function FieldMessage({ id, error, hint, live }) {
  if (error) return <span className="sh-field-msg" data-kind="error" id={id}>{ALERT}<span>{error}</span></span>;
  if (hint) return <span className="sh-field-msg" id={id} aria-live={live ? "polite" : undefined}>{hint}</span>;
  return null;
}

function Mark({ label, query, typed }) {
  if (!typed) return label;
  return highlightParts(label, query).map((part, index) => (
    part.hit ? <mark key={index} className="sh-search-mark">{part.text}</mark> : <span key={index}>{part.text}</span>
  ));
}

export function SearchList({
  label,
  hint,
  error,
  required,
  optional,
  size = "md",
  options: optionsProp = [],
  placeholder = "Search",
  emptyLabel = "No matches",
  clearLabel = "Clear",
  value,
  defaultValue,
  onChange,
  name,
  id,
  className,
  style,
  disabled,
  lang,
  onBeforeInput,
  ...rest
}) {
  ensure();
  const auto = React.useId();
  const fid = id || "sh-search" + auto.replace(/:/g, "");
  const mid = fid + "-msg";
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue != null ? String(defaultValue) : "");
  const current = controlled ? (value == null ? "" : String(value)) : inner;
  const options = React.useMemo(() => normalizeOptions(optionsProp), [optionsProp]);
  const selected = options.find((option) => option.value === current) || null;
  const [open, setOpen] = React.useState(false);
  const [typed, setTyped] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [flip, setFlip] = React.useState(false);
  const [englishNote, setEnglishNote] = React.useState(false);
  const rootRef = React.useRef(null);
  const anchorRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const highlightFrom = React.useRef("keys");
  const revealLock = React.useRef(0);

  const filtered = React.useMemo(
    () => filterOptions(options, open && typed ? query : ""),
    [options, open, typed, query],
  );
  const activeSafe = filtered.length ? Math.min(active, filtered.length - 1) : 0;
  const shown = open && typed ? query : (selected ? selected.label : "");
  const note = englishNote && !error;
  const shownHint = note ? ENGLISH_HINT : hint;
  const described = [error || shownHint ? mid : null, open && filtered.length === 0 ? fid + "-empty" : null].filter(Boolean).join(" ") || undefined;

  function emit(next) {
    if (!controlled) setInner(next);
    if (onChange) onChange(next);
  }

  function commit(next) {
    emit(next);
    setTyped(false);
    setQuery("");
    setEnglishNote(false);
    setOpen(false);
    if (inputRef.current) inputRef.current.focus();
  }

  function move(delta) {
    const list = typed ? filterOptions(options, query) : options;
    if (!list.length) { setOpen(true); return; }
    highlightFrom.current = "keys";
    setOpen(true);
    setActive((index) => {
      const currentIndex = list.findIndex((option) => option.value === current);
      const from = open ? index : (currentIndex >= 0 ? currentIndex : (delta > 0 ? -1 : list.length));
      return Math.max(0, Math.min(list.length - 1, from + delta));
    });
  }

  function onKeyDown(e) {
    if (disabled) return;
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); move(-1); return; }
    if (e.key === "Enter" && open && filtered[activeSafe]) {
      e.preventDefault();
      commit(filtered[activeSafe].value);
      return;
    }
    if (e.key === "Escape" && open) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      setTyped(false);
      setQuery("");
      setEnglishNote(false);
    }
  }

  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
        setTyped(false);
        setQuery("");
        setEnglishNote(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  React.useEffect(() => {
    if (!open || !panelRef.current || highlightFrom.current === "pointer") return undefined;
    const list = panelRef.current.querySelector(".sh-search-list");
    const el = panelRef.current.querySelector("[data-active='true']");
    if (!list || !el) return undefined;
    const item = el.getBoundingClientRect();
    const box = list.getBoundingClientRect();
    let delta = 0;
    if (item.top < box.top) delta = item.top - box.top;
    else if (item.bottom > box.bottom) delta = item.bottom - box.bottom;
    if (!delta) return undefined;
    const lock = revealLock.current + 1;
    revealLock.current = lock;
    list.scrollTop += delta;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (revealLock.current === lock) revealLock.current = 0;
      });
    });
    return undefined;
  }, [open, activeSafe, filtered.length]);

  React.useLayoutEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const anchor = anchorRef.current;
      const panel = panelRef.current;
      if (!anchor || !panel) return;
      const box = anchor.getBoundingClientRect();
      const height = panel.offsetHeight;
      const below = window.innerHeight - box.bottom;
      const nextFlip = below < height + 8 && box.top > below;
      setFlip((prev) => (prev === nextFlip ? prev : nextFlip));
      const rect = panel.getBoundingClientRect();
      const overflowEnd = rect.right > window.innerWidth - 8;
      const overflowStart = rect.left < 8;
      panel.dataset.pin = overflowEnd && !overflowStart ? "end" : "start";
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, filtered.length, flip]);

  return (
    <div ref={rootRef} className={"sh-field" + (className ? " " + className : "")} data-ds-id="forms/SearchList" style={style}>
      <FieldLabel htmlFor={fid} label={label} required={required} optional={optional} />
      <div className="sh-search-anchor" ref={anchorRef}>
        <span className="sh-ctl sh-search-wrap" data-size={size} data-invalid={String(Boolean(error))} data-disabled={String(Boolean(disabled))}>
          {SEARCH}
          <input
            {...rest}
            ref={inputRef}
            id={fid}
            className="sh-search-input"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={open && filtered.length ? fid + "-list" : undefined}
            aria-activedescendant={open && filtered[activeSafe] ? fid + "-opt-" + activeSafe : undefined}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={described}
            aria-required={required || undefined}
            placeholder={placeholder}
            value={shown}
            disabled={disabled}
            lang={lang || "en"}
            dir="auto"
            autoComplete="off"
            onBeforeInput={(e) => {
              if (onBeforeInput) onBeforeInput(e);
              if (e.defaultPrevented) return;
              if (rejectForeignInsert(e)) setEnglishNote(true);
            }}
            onChange={(e) => {
              setEnglishNote(stripForeignInput(e));
              highlightFrom.current = "keys";
              setTyped(true);
              setQuery(e.target.value);
              setActive(0);
              setOpen(true);
            }}
            onFocus={(e) => {
              if (disabled) return;
              highlightFrom.current = "keys";
              setOpen(true);
              setTyped(false);
              const index = options.findIndex((option) => option.value === current);
              setActive(index >= 0 ? index : 0);
              requestAnimationFrame(() => e.target.select());
            }}
            onBlur={() => {
              setTimeout(() => {
                if (rootRef.current && rootRef.current.contains(document.activeElement)) return;
                setOpen(false);
                setTyped(false);
                setQuery("");
                setEnglishNote(false);
              }, 0);
            }}
            onKeyDown={onKeyDown}
          />
          {current ? (
            <button
              type="button"
              className="sh-search-clear"
              aria-label={clearLabel}
              disabled={disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => commit("")}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
          ) : null}
          {CHEVRON}
        </span>
        {open ? (
          <div ref={panelRef} className="sh-search-pop" data-flip={flip ? "true" : "false"}>
            {filtered.length === 0 ? (
              <div className="sh-search-empty" id={fid + "-empty"}>{emptyLabel}</div>
            ) : (
              <ul role="listbox" id={fid + "-list"} className="sh-search-list">
                {filtered.map((option, index) => (
                  <li
                    key={option.value}
                    id={fid + "-opt-" + index}
                    role="option"
                    aria-selected={option.value === current}
                    data-active={index === activeSafe ? "true" : "false"}
                    className="sh-search-opt"
                    onMouseDown={(e) => e.preventDefault()}
                    onPointerMove={(e) => {
                      if (revealLock.current || !pointerMovesHighlight(e)) return;
                      highlightFrom.current = "pointer";
                      if (index !== activeSafe) setActive(index);
                    }}
                    onClick={() => commit(option.value)}
                  >
                    <span className="sh-search-copy">
                      <span className="sh-search-label"><Mark label={option.label} query={query} typed={typed} /></span>
                      {option.description ? <span className="sh-search-desc">{option.description}</span> : null}
                    </span>
                    {option.value === current ? TICK : null}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>
      <input
        className="sh-field-sr"
        tabIndex={-1}
        name={name}
        value={current}
        required={required || undefined}
        disabled={disabled || undefined}
        onChange={() => {}}
        onInvalid={(e) => {
          e.preventDefault();
          if (inputRef.current) inputRef.current.focus();
        }}
        aria-hidden="true"
      />
      <FieldMessage id={mid} error={error} hint={shownHint} live={note} />
    </div>
  );
}
