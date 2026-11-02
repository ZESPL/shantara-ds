import React from "react";

/* Spinner: three dots breathing in sequence, the brand's only loader (never a rotating
   ring). Each dot swells and brightens on a slow 1400ms wave, staggered by a third of a
   cycle, so the row reads as one calm breath travelling left to right.
   Reduced motion: the dots hold still at three quiet opacities and the label carries it. */
const CSS = `
@keyframes sh-spin-breathe{0%,100%{transform:scale(.6);opacity:.28}40%{transform:scale(1);opacity:1}70%{transform:scale(.72);opacity:.5}}
.sh-spinner{display:inline-flex;align-items:center;gap:var(--space-4);color:var(--text-brand);font:var(--type-body-sm);vertical-align:middle}
.sh-spinner-dots{display:inline-flex;align-items:center;gap:calc(var(--_d) * .7)}
.sh-spinner-dots>i{display:block;width:var(--_d);height:var(--_d);border-radius:50%;background:currentColor;transform-origin:center;animation:sh-spin-breathe 1400ms var(--ease-breath) infinite both}
.sh-spinner-dots>i:nth-child(2){animation-delay:233ms}
.sh-spinner-dots>i:nth-child(3){animation-delay:466ms}
.sh-spinner[data-size="sm"]{--_d:5px}
.sh-spinner[data-size="md"]{--_d:7px}
.sh-spinner[data-size="lg"]{--_d:10px}
.sh-spinner-label{color:var(--text-secondary)}
.sh-spinner-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
@media (prefers-reduced-motion: reduce){
  .sh-spinner-dots>i{animation:none;transform:none;opacity:.35}
  .sh-spinner-dots>i:nth-child(2){opacity:.65}
  .sh-spinner-dots>i:nth-child(3){opacity:1}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-spinner-css")) return;
  const el = document.createElement("style");
  el.id = "sh-spinner-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const SIZES = { sm: 1, md: 1, lg: 1 };

export function Spinner({ size = "md", color, label = "Loading", showLabel = false, style, ...rest }) {
  ensure();
  const named = SIZES[size] ? size : null;
  const custom = named ? null : { "--_d": (typeof size === "number" ? size + "px" : size) };
  return (
    <span className="sh-spinner" data-ds-id="feedback/Spinner" data-size={named || "custom"} role="status" aria-live="polite" style={{ ...(color ? { color } : null), ...custom, ...style }} {...rest}>
      <span className="sh-spinner-dots" aria-hidden="true"><i /><i /><i /></span>
      {showLabel ? <span className="sh-spinner-label">{label}</span> : <span className="sh-spinner-sr">{label}</span>}
    </span>
  );
}
