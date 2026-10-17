import React from "react";
import { Media } from "./Media.jsx";

/* One framing for every doctor: 4:5, neutral ground, same crop, then name (Regular),
   role (small) and an optional qualification line. With no photograph yet it shows the
   person's initials on the same ground — never a stock face, never an empty box. */
const CSS = `
.sh-portrait{display:flex;flex-direction:column;gap:var(--space-5);min-width:0;margin:0}
.sh-portrait-empty{position:relative;aspect-ratio:var(--media-ratio-portrait);background:color-mix(in srgb, var(--color-pearl-bush) 82%, var(--color-pine-tree));display:grid;place-items:center}
.sh-portrait-initials{font:var(--weight-light) calc(clamp(40px, 2vw + 32px, 64px) * var(--text-scale))/1 var(--font-display);letter-spacing:var(--tracking-wide);color:color-mix(in srgb, var(--color-pine-tree) 55%, transparent)}
.sh-portrait .sh-media{background:color-mix(in srgb, var(--color-pearl-bush) 82%, var(--color-pine-tree))}
.sh-portrait-name{margin:0;font:var(--weight-regular) var(--text-lg)/1.3 var(--font-display);color:var(--text-primary)}
.sh-portrait-role{margin:var(--space-2) 0 0;font:var(--type-body-sm);color:var(--text-secondary)}
.sh-portrait-detail{margin:var(--space-3) 0 0;font:var(--type-caption);color:var(--text-muted);max-width:36ch}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-portrait-css")) return;
  const el = document.createElement("style");
  el.id = "sh-portrait-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* First and last initial: "P.A. Kareem" → "PK", "Dr. Bahja Janu" → "BJ". */
function initialsOf(name) {
  const parts = String(name || "")
    .replace(/^(Dr\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/i, "")
    .split(/[\s.]+/)
    .filter(Boolean);
  if (!parts.length) return "";
  const picked = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : [parts[0]];
  return picked.map((p) => p[0]).join("").toUpperCase();
}

export function PortraitFrame({ src, media, alt, name, role, detail, caption = true, headingLevel = 3, position = "center top", style, ...rest }) {
  ensure();
  const H = "h" + headingLevel;
  const frame = media || (src
    ? <Media src={src} alt={alt || name} ratio="4:5" position={position} />
    : <div className="sh-portrait-empty" role="img" aria-label={name}><span className="sh-portrait-initials" aria-hidden="true">{initialsOf(name)}</span></div>);
  return (
    <figure data-ds-id="editorial/PortraitFrame" className="sh-portrait" style={style} {...rest}>
      {frame}
      {caption ? (
        <figcaption>
          <H className="sh-portrait-name">{name}</H>
          {role ? <p className="sh-portrait-role">{role}</p> : null}
          {detail ? <p className="sh-portrait-detail">{detail}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
