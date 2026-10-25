import React from "react";

/* The consultation form on Merino with square fields, beside a Stone panel that shows who
   will call (a doctor portrait) and what happens next. The form comes first on phones.
   The left column is a real <form>: Enter submits, `required` fields are checked by the
   browser, and assistive technology announces a form. Give the button type="submit" and
   handle onSubmit.
   ≥1000px: form 7 columns, panel 5 columns, the panel sticky while the form scrolls — only
   when the window is tall enough to show the whole panel (short laptop windows and large
   text keep it in the flow so its lower half is never hidden). */
const CSS = `
.sh-fsplit{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:start}
.sh-fsplit-form{min-width:0;display:flex;flex-direction:column;gap:var(--space-6);margin:0}
.sh-fsplit-aside{min-width:0;background:var(--ground-stone);padding:clamp(24px, 2.2vw + 16px, 48px);display:flex;flex-direction:column;gap:var(--space-7)}
/* Who will call: a fixed 4:5 thumbnail beside the name and role — the same size at every
   width, so the panel never becomes a full-height portrait (phone) or a small frame
   stranded in a wide panel (desktop). */
.sh-fsplit-aside>.sh-portrait{display:grid;grid-template-columns:clamp(88px, 3vw + 64px, 120px) minmax(0,1fr);align-items:end;gap:var(--space-5)}
.sh-fsplit-aside>.sh-portrait figcaption{padding-bottom:var(--space-1)}
.sh-fsplit-aside>.sh-portrait .sh-portrait-initials{font-size:var(--text-2xl)}
@media (min-width:1000px){
  .sh-fsplit{grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:calc(var(--grid-gap) * 2.5)}
}
@media (min-width:1000px) and (min-height:800px){
  .sh-fsplit-aside{position:sticky;top:calc(var(--space-12) + 16px)}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-fsplit-css")) return;
  const el = document.createElement("style");
  el.id = "sh-fsplit-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function FormSplit({ children, aside, onSubmit, action, method, noValidate, formLabel, formProps, style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="sections/FormSplit" className="sh-fsplit" style={style} {...rest}>
      <form className="sh-fsplit-form" onSubmit={onSubmit} action={action} method={method} noValidate={noValidate} aria-label={formLabel} {...formProps}>{children}</form>
      {aside ? <aside className="sh-fsplit-aside" data-ground="stone">{aside}</aside> : null}
    </div>
  );
}
