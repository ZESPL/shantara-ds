import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Icon } from "../core/Icon.jsx";
import { Tile } from "../editorial/Tile.jsx";
import { TileGrid } from "./TileGrid.jsx";

/* What a visitor sees after sending a form: that it arrived, what happens next in plain
   sentences, how to reach the team meanwhile (call, WhatsApp, email), a way back, and then
   up to three cards to keep exploring. Which form decides the copy and the links — the
   standard is in ui_kits/website/skill-content.md#confirmation-screens. Never a promised
   response time that is not confirmed, never internal process. Rendered in place of the
   form — focus moves to the title so a screen reader announces it (`autoFocus`), and the
   page scrolls to it.
   The message is one column capped at 44rem; the cards below it use the full container,
   three across from 1000px (TileGrid). Phones: actions stack full width; contact one per
   line; cards stack. */
const CSS = `
.sh-conf{display:flex;flex-direction:column;gap:var(--section-y-sm)}
.sh-conf-main{display:flex;flex-direction:column;gap:var(--stack-lg);max-width:44rem}
.sh-conf-explore{display:flex;flex-direction:column;gap:var(--stack-lg);padding-top:var(--section-y-sm);border-top:var(--border-width) solid var(--rule-color)}
.sh-conf-mark{display:inline-grid;place-items:center;width:48px;height:48px;border-radius:var(--radius-pill);background:var(--surface-brand-soft);color:var(--text-brand)}
.sh-conf [tabindex="-1"]:focus{outline:none}
.sh-conf-next{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;border-top:var(--border-width) solid var(--rule-color)}
.sh-conf-next>li{padding:var(--space-4) 0;border-bottom:var(--border-width) solid var(--rule-color);font:var(--type-body);color:var(--text-primary)}
.sh-conf-label{margin:0 0 var(--space-3);font:var(--type-label);font-size:var(--text-sm);color:var(--text-secondary)}
.sh-conf-ways{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:0 var(--space-8);font:var(--type-body-sm);color:var(--text-secondary)}
.sh-conf-ways a,.sh-conf-ways span{display:inline-flex;align-items:center;gap:var(--space-3);min-height:var(--tap-min);color:inherit;text-decoration:none}
.sh-conf-ways [data-icon]{color:var(--text-brand)}
.sh-conf-ways a:focus-visible{outline:none;box-shadow:var(--ring-focus)}
@media (hover: hover) and (pointer: fine){.sh-conf-ways a:hover{color:var(--text-primary);text-decoration:underline;text-underline-offset:4px}}
@media (max-width:519.98px){.sh-conf-ways{flex-direction:column}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-conf-css")) return;
  const el = document.createElement("style");
  el.id = "sh-conf-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* next: string[] · contact: [{ icon, label, href? }] ·
   explore: [{ title, text?, meta?, src?, alt?, href }] — three cards (only the first three render).
   An http(s) href opens in a new tab. */
export function ConfirmationSection({ title = "Consultation request received", sub, next = [], nextLabel = "What happens next", contact = [], contactLabel = "If you need us sooner", explore = [], exploreLabel = "Keep exploring", exploreLayout = "3", actions, autoFocus = true, headingLevel = 1, style, ...rest }) {
  ensure();
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = ref.current && ref.current.querySelector(".sh-stmt-title");
    if (!autoFocus || !h) return;
    h.setAttribute("tabindex", "-1");
    h.focus({ preventScroll: true });
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [autoFocus]);
  return (
    <div data-ds-id="sections/ConfirmationSection" className="sh-conf" ref={ref} style={style} {...rest}>
      <div className="sh-conf-main" role="status">
        <span className="sh-conf-mark" aria-hidden="true"><Icon name="check" size={24} /></span>
        <Statement as={"h" + headingLevel} size="h1" sub={sub} actions={actions} measure="22ch">{title}</Statement>
        {next.length ? (
          <div>
            <p className="sh-conf-label">{nextLabel}</p>
            <ul className="sh-conf-next">{next.map((n) => <li key={n}>{n}</li>)}</ul>
          </div>
        ) : null}
        {contact.length ? (
          <div>
            <p className="sh-conf-label">{contactLabel}</p>
            <ul className="sh-conf-ways">
              {contact.map((c) => { const inner = <>{c.icon ? <Icon name={c.icon} size={16} /> : null}{c.label}</>; return <li key={c.label}>{c.href ? <a href={c.href}>{inner}</a> : <span>{inner}</span>}</li>; })}
            </ul>
          </div>
        ) : null}
      </div>
      {explore.length ? (
        <div className="sh-conf-explore">
          <Statement as={"h" + (headingLevel + 1)}>{exploreLabel}</Statement>
          <TileGrid layout={exploreLayout}>
            {explore.slice(0, 3).map((x) => {
              const external = /^https?:/.test(x.href);
              return <Tile key={x.href} src={x.src} alt={x.alt} ratio="3:2" title={x.title} meta={x.meta} text={x.text} href={x.href} headingLevel={headingLevel + 2}
                {...(external ? { target: "_blank", rel: "noopener" } : {})} />;
            })}
          </TileGrid>
        </div>
      ) : null}
    </div>
  );
}
