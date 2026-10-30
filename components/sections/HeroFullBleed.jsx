import React from "react";
import { Media } from "../editorial/Media.jsx";
import { Statement } from "../editorial/Statement.jsx";
import { MetaRow } from "../editorial/MetaRow.jsx";

/* Deck slide 1. A photograph fills the screen (100svh, floor 560px), the transparent
   header sits over it, and the text block sits bottom-left inside a scrim that covers
   all of it (the frame's --scrim-hero plus the block's own --scrim-text, which follows the
   block when it wraps tall on a phone). Merino type, Light headline, one Gold primary button. No label above the headline. `height="tall"` is
   the 72svh inner-page version with an h1-size headline.
   Breadcrumbs: every page except the home page passes `breadcrumbs`; the Statement places
   them above its title, opening the text block (inside its scrim, so they read on any photograph) rather than floating at the top
   of the frame where the scrim has faded. */
const CSS = `
.sh-hero{position:relative;display:flex;align-items:flex-end;min-height:clamp(560px, 100svh, 1080px);overflow:hidden;isolation:isolate}
.sh-hero[data-height="tall"]{min-height:clamp(480px, 72svh, 820px)}
.sh-hero[data-height="short"]{min-height:clamp(400px, 56svh, 620px)}
.sh-hero>.sh-media{position:absolute;inset:0;z-index:-1;aspect-ratio:auto;height:100%}
.sh-hero-body{width:100%;padding-block:calc(var(--space-12) + 24px) var(--section-y-sm)}
.sh-hero-body .sh-stmt{max-width:min(100%, 44rem)}
.sh-hero-meta{margin-top:var(--stack-md);font:var(--type-caption);color:var(--text-secondary)}
.sh-hero-body .sh-meta{margin-top:var(--stack-md);color:var(--text-secondary)}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-hero-css")) return;
  const el = document.createElement("style");
  el.id = "sh-hero-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

export function HeroFullBleed({ media, src, alt = "", position, mobilePosition, title, sub, actions, meta, breadcrumbs, height = "full", titleAs = "h1", style, ...rest }) {
  ensure();
  const figure = media || <Media src={src} alt={alt} ratio="fill" scrim="hero" priority position={position} mobilePosition={mobilePosition} />;
  return (
    <section data-ds-id="sections/HeroFullBleed" className="sh-hero" data-ground="photo" data-height={height} style={style} {...rest}>
      {figure}
      <div className="sh-hero-body sh-photo-text">
        <div className="sh-container">
          <Statement as={titleAs} size={height === "full" ? "display" : "h1"} sub={sub} actions={actions} breadcrumbs={breadcrumbs} measure="24ch">{title}</Statement>
          {meta ? (Array.isArray(meta) ? <MetaRow items={meta} /> : <p className="sh-hero-meta">{meta}</p>) : null}
        </div>
      </div>
    </section>
  );
}
