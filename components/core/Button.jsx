import React from "react";

/* Three variants, one shape. Colour follows the ground (tokens/layout.css):
   on Merino/Stone the primary is Himalaya olive; inside a himalaya, pine or photo
   ground it becomes Gold with Pine ink, the brand deck's closing-slide button.
   `accent`, `ghost` and `inverse` survive as aliases for the app kit only. */
const CSS = `
.sh-btn{--_bg:var(--btn-primary-bg);--_fg:var(--btn-primary-fg);--_bd:transparent;display:inline-flex;align-items:center;justify-content:center;gap:var(--space-3);max-width:100%;font-family:var(--font-body);font-weight:var(--weight-medium);letter-spacing:var(--tracking-wide);line-height:1.2;text-align:center;text-decoration:none;white-space:nowrap;border:var(--border-width) solid var(--_bd);border-radius:var(--radius-control);background:var(--_bg);color:var(--_fg);cursor:pointer;transition:var(--transition-control)}
.sh-btn>span{min-width:0}
.sh-btn:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-btn:active:not(:disabled){transform:scale(var(--press-scale))}
.sh-btn:disabled{opacity:.42;cursor:not-allowed}
.sh-btn[data-size="sm"]{min-height:var(--control-sm);padding:0 var(--space-5);font-size:var(--text-xs)}
.sh-btn[data-size="md"]{min-height:var(--control-md);padding:0 var(--space-6);font-size:var(--text-sm)}
.sh-btn[data-size="lg"]{min-height:var(--control-lg);padding:0 var(--space-8);font-size:var(--text-base)}
.sh-btn[data-full="true"]{width:100%}
/* Touch: every size reaches the 44px target; long labels may wrap on narrow phones. */
@media (pointer: coarse){.sh-btn[data-size="sm"]{min-height:var(--tap-min)}}
@media (max-width:519.98px){.sh-btn{white-space:normal;padding-block:var(--space-3)}.sh-btn[data-size="lg"]{padding-inline:var(--space-7)}}
.sh-btn[data-variant="secondary"]{--_bg:transparent;--_fg:var(--text-primary);--_bd:var(--border-control)}
/* link: text with a hairline and an arrow; zero inline padding so it sits on the grid. */
.sh-btn[data-variant="link"],.sh-btn[data-variant="ghost"]{--_bg:transparent;--_fg:var(--text-link);padding-inline:0!important;min-height:var(--tap-min);border:0;gap:var(--space-3);letter-spacing:var(--tracking-wide)}
.sh-btn[data-variant="link"]>span,.sh-btn[data-variant="ghost"]>span{background:linear-gradient(currentColor,currentColor) 0 100% / 100% 1px no-repeat;padding-bottom:3px}
.sh-btn[data-variant="link"] [data-icon],.sh-btn[data-variant="ghost"] [data-icon]{transition:transform var(--duration-fast) var(--ease-out)}
.sh-btn[data-variant="link"]:active:not(:disabled),.sh-btn[data-variant="ghost"]:active:not(:disabled){transform:none}
.sh-btn[data-variant="accent"]{--_bg:var(--surface-accent);--_fg:var(--text-on-accent)}
.sh-btn[data-variant="inverse"]{--_bg:var(--color-merino);--_fg:var(--color-pine-tree)}
.sh-btn[data-variant="inverse"]:focus-visible{box-shadow:var(--ring-focus-inverse)}
@media (hover: hover) and (pointer: fine){
  .sh-btn[data-variant="primary"]:hover:not(:disabled){--_bg:var(--btn-primary-bg-hover)}
  .sh-btn[data-variant="accent"]:hover:not(:disabled){--_bg:var(--color-gold-200)}
  .sh-btn[data-variant="secondary"]:hover:not(:disabled){--_bd:var(--text-primary);--_bg:color-mix(in srgb, var(--text-primary) 6%, transparent)}
  .sh-btn[data-variant="link"]:hover:not(:disabled),.sh-btn[data-variant="ghost"]:hover:not(:disabled){--_fg:var(--text-link-hover)}
  .sh-btn[data-variant="link"]:hover:not(:disabled) [data-icon],.sh-btn[data-variant="ghost"]:hover:not(:disabled) [data-icon]{transform:translateX(3px)}
  [dir="rtl"] .sh-btn[data-variant="link"]:hover:not(:disabled) [data-icon]{transform:translateX(-3px) scaleX(-1)}
  .sh-btn[data-variant="inverse"]:hover:not(:disabled){--_bg:var(--color-white)}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-btn-css")) return;
  const el = document.createElement("style");
  el.id = "sh-btn-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function Button({ variant = "primary", size = "md", fullWidth = false, startIcon, endIcon, as, children, style, ...rest }) {
  ensure();
  const Tag = as || (rest.href ? "a" : "button");
  const type = Tag === "button" && !rest.type ? "button" : rest.type;
  return (
    <Tag className="sh-btn" data-ds-id="core/Button" data-variant={variant} data-size={size} data-full={String(fullWidth)} style={style} {...rest} type={type}>
      {startIcon}
      {children ? <span>{children}</span> : null}
      {endIcon}
    </Tag>
  );
}
