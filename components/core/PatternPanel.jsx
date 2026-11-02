import React from "react";

/* Responsive floor (tokens/pattern.css): the cell cannot go under 130px, so a SURFACE under
   ~880px (a container query, not the viewport) loses its band and the space it reserved goes back to the content. */
const CSS = `.sh-pp{container-type:inline-size}
@container (max-width:879.98px){.sh-pp-band{display:none}.sh-pp-body[data-pattern-reserve]{padding:0!important}}`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-pp-css")) return;
  const el = document.createElement("style");
  el.id = "sh-pp-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

function resolveBase() {
  if (typeof document === "undefined") return "assets";
  const s = document.querySelector('script[src$="_ds_bundle.js"]');
  if (s) return s.getAttribute("src").replace(/_ds_bundle\.js$/, "assets");
  return "assets";
}

const BG = {
  merino: "var(--color-merino)",
  pearl: "var(--color-pearl-bush)",
  sand: "var(--color-sand)",
  olive: "var(--color-himalaya)",
  pine: "var(--color-pine-tree)",
  gold: "var(--color-gold-crayola)",
  none: "transparent",
};

/* The rosette never washes a whole surface. It is a BAND flush to one edge,
   bleeding off on three sides, ruled with a hairline on its inner side, with the
   content kept clear of it. `scale` sets one square cell edge (applied to both
   axes, so the geometry can never be stretched) and is PROPORTIONAL to the band:
   half the band's width by default, so two rosettes read across it. */
export function PatternPanel({
  tone = "merino",
  edge = "right",
  band,
  scale,
  intensity,
  ink,
  rule,
  reserve = true,
  radius = "0px",
  children,
  style,
  ...rest
}) {
  ensure();
  const base = resolveBase();
  const vertical = edge === "right" || edge === "left" || edge === "start" || edge === "end";
  const dark = tone === "olive" || tone === "pine" || tone === "none";
  const size = band || (vertical ? "var(--pattern-band-md)" : "var(--pattern-strip)");
  /* cell = band / 2. Only computable when the band is an absolute length; a
     percentage band must pass `scale` itself (see PatternPanel.prompt.md). */
  const cell = scale || (/^[\d.]+(px|rem|em|pt|in|mm|cm)$/.test(String(size).trim()) ? `calc(${size} / 2)` : "var(--pattern-scale-2xs)");
  const op = intensity != null ? intensity : tone === "none" ? 0.5 : dark ? 0.4 : 0.9;
  const tint = ink || (dark ? "var(--pattern-ink-dark)" : "var(--pattern-ink-light)");
  const line = rule || (dark ? "var(--pattern-rule-dark)" : "var(--pattern-rule-light)");
  const pad = reserve
    ? {
        right: { paddingRight: size },
        left: { paddingLeft: size },
        top: { paddingTop: size },
        bottom: { paddingBottom: size },
        start: { paddingInlineStart: size },
        end: { paddingInlineEnd: size },
      }[edge]
    : null;
  const bandBox = {
    right: { top: 0, bottom: 0, right: 0, width: size, borderLeft: `1px solid ${line}` },
    left: { top: 0, bottom: 0, left: 0, width: size, borderRight: `1px solid ${line}` },
    top: { left: 0, right: 0, top: 0, height: size, borderBottom: `1px solid ${line}` },
    bottom: { left: 0, right: 0, bottom: 0, height: size, borderTop: `1px solid ${line}` },
    start: { top: 0, bottom: 0, insetInlineStart: 0, width: size, borderInlineEnd: `1px solid ${line}` },
    end: { top: 0, bottom: 0, insetInlineEnd: 0, width: size, borderInlineStart: `1px solid ${line}` },
  }[edge] || { top: 0, bottom: 0, right: 0, width: size, borderLeft: `1px solid ${line}` };
  return (
    <div className="sh-pp" data-ds-id="core/PatternPanel" style={{ position: "relative", isolation: "isolate", background: BG[tone] || tone, color: dark && tone !== "none" ? "var(--text-on-inverse)" : "var(--text-primary)", borderRadius: radius, overflow: "hidden", ...style }} {...rest}>
      <span
        aria-hidden="true"
        className="sh-pp-band"
        style={{
          position: "absolute",
          boxSizing: "border-box",
          pointerEvents: "none",
          zIndex: 0,
          ...bandBox,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: tint,
            WebkitMaskImage: `url(${base}/pattern-unit.png)`,
            maskImage: `url(${base}/pattern-unit.png)`,
            WebkitMaskRepeat: "repeat",
            maskRepeat: "repeat",
            WebkitMaskSize: `${cell} ${cell}`,
            maskSize: `${cell} ${cell}`,
            opacity: op,
          }}
        />
      </span>
      <div className="sh-pp-body" data-pattern-reserve={pad ? "" : undefined} style={{ position: "relative", zIndex: 1, ...pad }}>{children}</div>
    </div>
  );
}
