import React from "react";
import {
  addDays,
  addMonths,
  buildGrid,
  formatLong,
  inRange,
  monthIntersects,
  monthNames,
  parseIso,
  shiftMonth,
  startOfWeek,
  todayIso,
  pushYearDigit,
  weekStart,
  weekdayLabels,
  yearBounds,
  yearIntersects,
} from "./fieldLogic.mjs";

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
.sh-date-anchor{position:relative}
.sh-date-btnwrap{position:relative;display:flex;align-items:center;height:var(--control-lg)}
.sh-date-btnwrap[data-size="sm"]{height:var(--control-md)}
.sh-date-btnwrap[data-size="lg"]{height:var(--control-xl)}
.sh-date-hit{flex:1;min-width:0;height:100%;padding-inline:var(--space-5) calc(var(--space-5) + 16px + var(--space-3));border:0;background:transparent;color:inherit;font:inherit;text-align:start;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sh-date-hit[data-empty="true"]{color:var(--text-muted)}
.sh-date-hit:disabled{cursor:not-allowed}
.sh-date-hit:focus,.sh-date-hit:focus-visible{outline:none}
.sh-date-icon{position:absolute;top:50%;inset-inline-end:var(--space-5);width:16px;height:16px;margin-top:-8px;color:var(--text-secondary);pointer-events:none}
.sh-date-anchor:focus-within .sh-date-icon{color:var(--text-brand)}
.sh-date-btnwrap[data-disabled="true"] .sh-date-icon{color:var(--text-muted)}
.sh-date-pop{position:absolute;z-index:40;inset-inline-start:0;inset-block-start:calc(100% + var(--space-2));width:max(100%, 18.5rem);max-width:calc(100vw - 24px);padding-block:var(--space-2);background:var(--surface-card);border:var(--border-width) solid var(--border-subtle);border-radius:var(--radius-card);box-shadow:var(--shadow-md);animation:sh-enter-up var(--duration-fast) var(--ease-out)}
.sh-date-pop[data-flip="true"]{inset-block-start:auto;inset-block-end:calc(100% + var(--space-2))}
.sh-date-pop[data-pin="end"]{inset-inline-start:auto;inset-inline-end:0}
.sh-date-head{display:flex;align-items:center;gap:var(--space-1);padding-inline:var(--space-2)}
.sh-date-nav{width:var(--tap-min);height:var(--tap-min);display:grid;place-items:center;padding:0;border:0;border-radius:var(--radius-xs);background:transparent;color:var(--text-secondary);cursor:pointer}
.sh-date-nav:disabled{color:var(--text-muted);cursor:not-allowed}
.sh-date-nav svg{display:block;width:16px;height:16px}
.sh-date-chev-next{transform:scaleX(-1)}
[dir="rtl"] .sh-date-chev-prev{transform:scaleX(-1)}
[dir="rtl"] .sh-date-chev-next{transform:scaleX(1)}
.sh-date-titles{flex:1;min-width:0;display:flex;align-items:center;justify-content:center;gap:var(--space-1)}
.sh-date-title{flex:0 1 auto;min-width:0;max-width:100%;min-height:var(--tap-min);padding:0 var(--space-2);border:0;border-radius:var(--radius-xs);background:transparent;color:var(--text-primary);font:var(--weight-medium) var(--text-sm)/1.2 var(--font-body);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:2px}
.sh-date-title[data-part="year"]{flex:none}
.sh-date-title[data-static="true"]{cursor:default}
.sh-date-title-text{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sh-date-title-chev{width:12px;height:12px;flex:none}
.sh-date-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:2px;padding:var(--space-2) var(--space-3) var(--space-3)}
.sh-date-dow{display:grid;place-items:center;min-height:28px;font:var(--weight-medium) var(--text-2xs)/1 var(--font-body);color:var(--text-muted)}
.sh-date-day{appearance:none;min-height:40px;padding:0;border:0;border-radius:var(--radius-xs);background:transparent;color:var(--text-primary);font:var(--weight-regular) var(--text-sm)/1 var(--font-body);font-variant-numeric:tabular-nums;cursor:pointer}
.sh-date-day[data-out="true"]{color:var(--text-muted)}
.sh-date-day[data-today="true"]:not([aria-selected="true"]){box-shadow:inset 0 0 0 1px var(--border-brand)}
.sh-date-day[aria-selected="true"]{background:var(--surface-brand);color:var(--text-on-brand)}
.sh-date-day[aria-disabled="true"]{color:var(--text-muted);cursor:not-allowed;background:transparent;box-shadow:none}
.sh-date-day:focus-visible,.sh-date-nav:focus-visible,.sh-date-title:focus-visible,.sh-date-text:focus-visible,.sh-date-month:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-date-months{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-2);padding:var(--space-2) var(--space-3) var(--space-3)}
.sh-date-month{min-height:var(--tap-min);padding:0 var(--space-2);border:0;border-radius:var(--radius-xs);background:transparent;color:var(--text-primary);font:var(--weight-regular) var(--text-sm)/1.2 var(--font-body);cursor:pointer}
.sh-date-month[aria-selected="true"]{background:var(--surface-brand);color:var(--text-on-brand);font-weight:var(--weight-medium)}
.sh-date-month[aria-disabled="true"]{color:var(--text-muted);cursor:not-allowed}
.sh-date-years{max-height:calc(4.5 * var(--tap-min) + 4 * var(--space-2) + var(--space-2) + var(--space-3));padding:var(--space-2) var(--space-3) var(--space-3);overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable}
.sh-date-year-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-2)}
.sh-date-year-row + .sh-date-year-row{margin-top:var(--space-2)}
.sh-date-year{font-variant-numeric:tabular-nums}
.sh-date-foot{display:flex;justify-content:space-between;gap:var(--space-3);padding:var(--space-2) var(--space-3) var(--space-2);border-top:var(--border-width) solid var(--border-subtle)}
.sh-date-text{min-height:var(--tap-min);padding:0 var(--space-3);border:0;border-radius:var(--radius-xs);background:transparent;color:var(--text-brand);font:var(--weight-medium) var(--text-sm)/1 var(--font-body);cursor:pointer}
.sh-date-text[data-quiet="true"]{color:var(--text-secondary);font-weight:var(--weight-regular)}
.sh-date-text:disabled{color:var(--text-muted);cursor:not-allowed}
@media (hover: hover) and (pointer: fine){
  .sh-date-nav:not(:disabled):hover,.sh-date-title:not([data-static="true"]):hover,.sh-date-text:not(:disabled):hover,.sh-date-month:not([aria-disabled="true"]):not([aria-selected="true"]):hover,.sh-date-day:not([aria-disabled="true"]):not([aria-selected="true"]):hover{background:var(--surface-raised)}
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
  if (typeof document === "undefined" || document.getElementById("sh-date-css")) return;
  const el = document.createElement("style");
  el.id = "sh-date-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const ALERT = (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.75v3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="11.1" r="0.9" fill="currentColor" /></svg>
);

const CAL = (
  <svg className="sh-date-icon" viewBox="0 0 16 16" aria-hidden="true"><rect x="2.25" y="3.25" width="11.5" height="10.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M2.25 6.5h11.5M5.25 2v2.5M10.75 2v2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
);

const CHEV_PREV = (
  <svg className="sh-date-chev-prev" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 4L6 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const CHEV_DOWN = (
  <svg className="sh-date-title-chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const YEAR_STEP = 12;

function revealYear(node, center) {
  const scroller = node.closest(".sh-date-years");
  if (!scroller || scroller.clientHeight === 0) return false;
  const style = getComputedStyle(scroller);
  const padTop = parseFloat(style.paddingTop) || 0;
  const padBottom = parseFloat(style.paddingBottom) || 0;
  const nodeRect = node.getBoundingClientRect();
  const box = scroller.getBoundingClientRect();
  const viewTop = box.top + padTop;
  const viewBottom = box.bottom - padBottom;
  let delta = 0;
  if (center) delta = nodeRect.top - viewTop - (viewBottom - viewTop - nodeRect.height) / 2;
  else if (nodeRect.top < viewTop) delta = nodeRect.top - viewTop;
  else if (nodeRect.bottom > viewBottom) delta = nodeRect.bottom - viewBottom;
  if (delta) scroller.scrollTop += delta;
  return true;
}

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

function chunk(list, size) {
  const rows = [];
  for (let i = 0; i < list.length; i += size) rows.push(list.slice(i, i + size));
  return rows;
}

export function DateField({
  label,
  hint,
  error,
  required,
  optional,
  size = "md",
  placeholder = "Choose a date",
  value,
  defaultValue,
  onChange,
  min,
  max,
  name,
  id,
  locale = "en-GB",
  todayLabel = "Today",
  clearLabel = "Clear",
  prevLabel = "Previous month",
  nextLabel = "Next month",
  prevYearLabel = "Previous year",
  nextYearLabel = "Next year",
  prevYearsLabel = "Previous years",
  nextYearsLabel = "Next years",
  chooseMonthLabel = "Choose a month",
  chooseYearLabel = "Choose a year",
  dialogLabel = "Choose a date",
  className,
  style,
  disabled,
}) {
  ensure();
  const auto = React.useId();
  const fid = id || "sh-date" + auto.replace(/:/g, "");
  const mid = fid + "-msg";
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue || "");
  const current = controlled ? (value || "") : inner;
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState("days");
  const [flip, setFlip] = React.useState(false);
  const rootRef = React.useRef(null);
  const anchorRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const queueFocus = React.useRef(false);
  const yearFrom = React.useRef("days");
  const enteredYears = React.useRef(false);
  const yearDigits = React.useRef("");
  const yearDigitTimer = React.useRef(0);

  const first = weekStart(locale);
  const months = React.useMemo(() => monthNames(locale), [locale]);
  const weekdays = React.useMemo(() => weekdayLabels(locale, first), [locale, first]);
  const [minY, maxY] = yearBounds(min, max);
  const years = React.useMemo(() => {
    const list = [];
    for (let y = maxY; y >= minY; y -= 1) {
      if (yearIntersects(y, min, max)) list.push(y);
    }
    return list;
  }, [minY, maxY, min, max]);
  const seed = parseIso(current) || parseIso(todayIso());
  const [shown, setShown] = React.useState({ y: seed.y, m: seed.m });
  const [cursor, setCursor] = React.useState(current || todayIso());

  function emit(next) {
    if (!controlled) setInner(next);
    if (onChange) onChange(next);
  }

  function close(focusTrigger) {
    setOpen(false);
    setView("days");
    if (focusTrigger && triggerRef.current) triggerRef.current.focus();
  }

  function openCal() {
    if (disabled) return;
    const base = parseIso(current) || parseIso(todayIso());
    setShown({ y: base.y, m: base.m });
    setCursor(parseIso(current) ? current : todayIso());
    setView("days");
    queueFocus.current = true;
    setOpen(true);
  }

  function monthInYear(y, month) {
    if (monthIntersects(y, month, min, max)) return month;
    for (let m = 1; m <= 12; m += 1) {
      if (monthIntersects(y, m, min, max)) return m;
    }
    return month;
  }

  function openYears() {
    yearFrom.current = view === "months" ? "months" : "days";
    if (years.length && !years.includes(shown.y)) {
      const y = shown.y > years[0] ? years[0] : years[years.length - 1];
      setShown({ y, m: monthInYear(y, shown.m) });
    }
    setView("years");
    queueFocus.current = true;
  }

  function moveYear(y, focus) {
    if (y == null) return;
    if (y !== shown.y) setShown({ y, m: monthInYear(y, shown.m) });
    if (focus) queueFocus.current = true;
  }

  function chooseYear(y) {
    setShown({ y, m: monthInYear(y, shown.m) });
    setView("months");
    queueFocus.current = true;
  }

  function onYearDigit(digit) {
    window.clearTimeout(yearDigitTimer.current);
    const result = pushYearDigit(yearDigits.current, digit, minY, maxY);
    yearDigits.current = result.buffer;
    if (result.year == null) {
      if (result.buffer) yearDigitTimer.current = window.setTimeout(() => { yearDigits.current = ""; }, 1000);
      return;
    }
    moveYear(result.year, true);
  }

  function commit(iso) {
    if (!inRange(iso, min, max)) return;
    emit(iso);
    close(true);
  }

  function isRtl() {
    return rootRef.current ? getComputedStyle(rootRef.current).direction === "rtl" : false;
  }

  function onPanelKey(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (view === "years") {
        setView(yearFrom.current === "months" ? "months" : "days");
        queueFocus.current = true;
      } else if (view === "months") {
        setView("days");
        queueFocus.current = true;
      } else close(true);
      return;
    }
    if (view === "years" && /^\d$/.test(e.key)) {
      e.preventDefault();
      onYearDigit(e.key);
      return;
    }
    const onDay = e.target.classList && e.target.classList.contains("sh-date-day");
    const onMonth = e.target.classList && e.target.classList.contains("sh-date-month");
    const onYear = e.target.classList && e.target.classList.contains("sh-date-year");
    if (view === "years" && onYear) {
      const index = years.indexOf(shown.y);
      const rtl = isRtl();
      const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, ArrowDown: 3, ArrowUp: -3 }[e.key];
      if (step && index >= 0) {
        e.preventDefault();
        moveYear(years[index + step], true);
        return;
      }
      if ((e.key === "Home" || e.key === "End") && years.length) {
        e.preventDefault();
        moveYear(e.key === "Home" ? years[0] : years[years.length - 1], true);
        return;
      }
      if ((e.key === "PageUp" || e.key === "PageDown") && index >= 0) {
        e.preventDefault();
        const delta = e.key === "PageUp" ? -YEAR_STEP : YEAR_STEP;
        moveYear(years[Math.min(years.length - 1, Math.max(0, index + delta))], true);
        return;
      }
      if ((e.key === "Enter" || e.key === " ") && years.includes(shown.y)) {
        e.preventDefault();
        chooseYear(shown.y);
      }
      return;
    }
    if (view === "months" && onMonth) {
      const rtl = isRtl();
      const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, ArrowDown: 3, ArrowUp: -3 }[e.key];
      if (step) {
        e.preventDefault();
        const next = shown.m - 1 + step;
        if (next >= 0 && next <= 11) {
          setShown({ y: shown.y, m: next + 1 });
          queueFocus.current = true;
        }
        return;
      }
      if ((e.key === "Enter" || e.key === " ") && monthIntersects(shown.y, shown.m, min, max)) {
        e.preventDefault();
        setView("days");
        queueFocus.current = true;
      }
      return;
    }
    if (view !== "days" || !onDay) return;
    const rtl = isRtl();
    const dayStep = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, ArrowDown: 7, ArrowUp: -7 }[e.key];
    if (dayStep) {
      e.preventDefault();
      const next = addDays(cursor, dayStep);
      const p = parseIso(next);
      if (!p) return;
      setCursor(next);
      setShown({ y: p.y, m: p.m });
      queueFocus.current = true;
      return;
    }
    if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const next = e.key === "Home" ? startOfWeek(cursor, first) : addDays(startOfWeek(cursor, first), 6);
      const p = parseIso(next);
      if (!p) return;
      setCursor(next);
      setShown({ y: p.y, m: p.m });
      queueFocus.current = true;
      return;
    }
    if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      const next = addMonths(cursor, e.key === "PageUp" ? -1 : 1);
      const p = parseIso(next);
      if (!p) return;
      setCursor(next);
      setShown({ y: p.y, m: p.m });
      queueFocus.current = true;
      return;
    }
    if ((e.key === "Enter" || e.key === " ") && inRange(cursor, min, max)) {
      e.preventDefault();
      commit(cursor);
    }
  }

  React.useEffect(() => () => window.clearTimeout(yearDigitTimer.current), []);

  React.useEffect(() => {
    if (view !== "years") yearDigits.current = "";
  }, [view]);

  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) close(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  React.useLayoutEffect(() => {
    if (!open || !queueFocus.current || !panelRef.current) return;
    queueFocus.current = false;
    const sel = view === "days" ? "[data-cursor='true']" : view === "months" ? "[data-month-current='true']" : "[data-year-current='true']";
    const node = panelRef.current.querySelector(sel);
    if (node) node.focus(view === "years" ? { preventScroll: true } : undefined);
  });

  React.useLayoutEffect(() => {
    if (!open || view !== "years") {
      enteredYears.current = false;
      return;
    }
    const node = panelRef.current && panelRef.current.querySelector("[data-year-current='true']");
    if (!node) return;
    if (revealYear(node, !enteredYears.current)) enteredYears.current = true;
  }, [open, view, shown.y]);

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
  }, [open, view, shown.y, shown.m, flip]);

  const grid = buildGrid(shown.y, shown.m, first);
  const today = todayIso();
  const prevMonth = shiftMonth(shown.y, shown.m, -1);
  const nextMonth = shiftMonth(shown.y, shown.m, 1);
  const yearIndex = years.indexOf(shown.y);
  const display = formatLong(current, locale);
  const described = error || hint ? mid : undefined;

  return (
    <div ref={rootRef} className={"sh-field" + (className ? " " + className : "")} data-ds-id="forms/DateField" style={style}>
      <FieldLabel htmlFor={fid} label={label} required={required} optional={optional} />
      <div className="sh-date-anchor" ref={anchorRef}>
        <span className="sh-ctl sh-date-btnwrap" data-size={size} data-invalid={String(Boolean(error))} data-disabled={String(Boolean(disabled))}>
          <button
            ref={triggerRef}
            id={fid}
            type="button"
            className="sh-date-hit"
            data-empty={String(!display)}
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? fid + "-dialog" : undefined}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={described}
            aria-required={required || undefined}
            onClick={() => (open ? close(false) : openCal())}
            onKeyDown={(e) => {
              if (disabled) return;
              if (e.key === "ArrowDown") { e.preventDefault(); openCal(); }
            }}
          >
            {display || placeholder}
          </button>
          {CAL}
        </span>
        {open ? (
          <div
            ref={panelRef}
            id={fid + "-dialog"}
            className="sh-date-pop"
            role="dialog"
            aria-modal="false"
            aria-label={dialogLabel}
            data-flip={flip ? "true" : "false"}
            onKeyDown={onPanelKey}
          >
            <div className="sh-date-head">
              <button
                type="button"
                className="sh-date-nav"
                aria-label={view === "years" ? prevYearsLabel : view === "months" ? prevYearLabel : prevLabel}
                disabled={view === "years" ? yearIndex < 0 || yearIndex >= years.length - 1 : view === "months" ? shown.y <= minY : !monthIntersects(prevMonth.y, prevMonth.m, min, max)}
                onClick={() => {
                  if (view === "years") moveYear(years[Math.min(years.length - 1, yearIndex + YEAR_STEP)], false);
                  else setShown(view === "months" ? { y: shown.y - 1, m: shown.m } : prevMonth);
                }}
              >
                {CHEV_PREV}
              </button>
              <div className="sh-date-titles" id={fid + "-title"} aria-live={view === "years" ? "off" : "polite"}>
                {view === "days" ? (
                  <button type="button" className="sh-date-title" data-part="month" aria-label={chooseMonthLabel + ", " + months[shown.m - 1]} onClick={() => { setView("months"); queueFocus.current = true; }}>
                    <span className="sh-date-title-text">{months[shown.m - 1]}</span>
                    {CHEV_DOWN}
                  </button>
                ) : null}
                {view === "years" ? (
                  <span className="sh-date-title" data-static="true">{shown.y}</span>
                ) : (
                  <button type="button" className="sh-date-title" data-part="year" aria-label={chooseYearLabel + ", " + shown.y} onClick={openYears}>
                    <span className="sh-date-title-text">{shown.y}</span>
                    {CHEV_DOWN}
                  </button>
                )}
              </div>
              <button
                type="button"
                className="sh-date-nav"
                aria-label={view === "years" ? nextYearsLabel : view === "months" ? nextYearLabel : nextLabel}
                disabled={view === "years" ? yearIndex <= 0 : view === "months" ? shown.y >= maxY : !monthIntersects(nextMonth.y, nextMonth.m, min, max)}
                onClick={() => {
                  if (view === "years") moveYear(years[Math.max(0, yearIndex - YEAR_STEP)], false);
                  else setShown(view === "months" ? { y: shown.y + 1, m: shown.m } : nextMonth);
                }}
              >
                <svg className="sh-date-chev-next" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 4L6 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            {view === "days" ? (
              <div role="grid" aria-labelledby={fid + "-title"}>
                <div role="row" className="sh-date-grid" style={{ paddingBottom: 0 }}>
                  {weekdays.map((day, index) => <div key={index} role="columnheader" className="sh-date-dow">{day}</div>)}
                </div>
                {chunk(grid, 7).map((week) => (
                  <div key={week[0].iso} role="row" className="sh-date-grid" style={{ paddingTop: 0, paddingBottom: 0 }}>
                    {week.map((cell) => {
                      const parts = parseIso(cell.iso);
                      const off = !inRange(cell.iso, min, max);
                      const selected = cell.iso === current;
                      return (
                        <button
                          key={cell.iso}
                          type="button"
                          role="gridcell"
                          className="sh-date-day"
                          data-out={String(!cell.inMonth)}
                          data-today={String(cell.iso === today)}
                          data-cursor={cell.iso === cursor ? "true" : undefined}
                          tabIndex={cell.iso === cursor ? 0 : -1}
                          aria-selected={selected}
                          aria-disabled={off || undefined}
                          aria-current={cell.iso === today ? "date" : undefined}
                          aria-label={formatLong(cell.iso, locale)}
                          onClick={() => { if (!off) commit(cell.iso); }}
                        >
                          {parts ? parts.d : cell.day}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : view === "months" ? (
              <div className="sh-date-months">
                {months.map((name, index) => {
                  const m = index + 1;
                  const off = !monthIntersects(shown.y, m, min, max);
                  return (
                    <button
                      key={name}
                      type="button"
                      className="sh-date-month"
                      data-month-current={m === shown.m ? "true" : undefined}
                      aria-selected={m === shown.m}
                      aria-disabled={off || undefined}
                      onClick={() => { if (!off) { setShown({ y: shown.y, m }); setView("days"); queueFocus.current = true; } }}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="sh-date-years" role="group" aria-label={chooseYearLabel}>
                {chunk(years, 3).map((row) => (
                  <div key={row[0]} className="sh-date-year-row">
                    {row.map((y) => (
                      <button
                        key={y}
                        type="button"
                        className="sh-date-month sh-date-year"
                        data-year-current={y === shown.y ? "true" : undefined}
                        tabIndex={y === shown.y ? 0 : -1}
                        aria-selected={y === shown.y}
                        onClick={() => chooseYear(y)}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
            <div className="sh-date-foot">
              <button type="button" className="sh-date-text" disabled={!inRange(today, min, max)} onClick={() => commit(today)}>{todayLabel}</button>
              <button type="button" className="sh-date-text" data-quiet="true" disabled={!current} onClick={() => { emit(""); close(true); }}>{clearLabel}</button>
            </div>
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
          if (triggerRef.current) triggerRef.current.focus();
        }}
        aria-hidden="true"
      />
      <FieldMessage id={mid} error={error} hint={hint} />
    </div>
  );
}
