import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Icon } from "../core/Icon.jsx";

/* Credentials, spelled out — About and doctor profiles. Each item is the credential's exact
   name, who issued it, the number where appropriate and whose it is. Only entries on the
   verified credentials list in docs/handbook/glossary.md, and never one shown as a bare
   logo. An entry whose issuer or proof is still "[…]" in that list is left out until it
   is filled.
   Phones: one column. ≥760px: two. ≥1000px: three. */
const CSS = `
.sh-cred{display:flex;flex-direction:column;gap:var(--stack-lg)}
.sh-cred-list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:minmax(0,1fr);gap:0 calc(var(--grid-gap) * 1.5)}
.sh-cred-item{display:grid;grid-template-columns:24px minmax(0,1fr);gap:var(--space-4);align-items:start;padding:var(--space-5) 0;border-top:var(--border-width) solid var(--rule-color)}
.sh-cred-item [data-icon]{margin-top:2px;color:var(--text-brand)}
.sh-cred-name{display:block;font:var(--type-item-sm);color:var(--text-primary)}
.sh-cred-issuer{display:block;margin-top:var(--space-1);font:var(--type-body-sm);color:var(--text-secondary)}
.sh-cred-meta{display:block;margin-top:var(--space-2);font:var(--type-caption);color:var(--text-muted)}
@media (min-width:760px){.sh-cred-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1000px){.sh-cred-list{grid-template-columns:repeat(3,minmax(0,1fr))}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-cred-css")) return;
  const el = document.createElement("style");
  el.id = "sh-cred-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* items: [{ name, issuer, holder?, number? }] */
export function CredentialStrip({ title, sub, items = [], headingLevel = 2, style, ...rest }) {
  ensure();
  return (
    <div data-ds-id="sections/CredentialStrip" className="sh-cred" style={style} {...rest}>
      {title ? <Statement as={"h" + headingLevel} size="title" sub={sub}>{title}</Statement> : null}
      <ul className="sh-cred-list">
        {items.map((c, i) => (
          <li className="sh-cred-item" key={c.name + i}>
            <Icon name="award" size={22} />
            <span>
              <span className="sh-cred-name">{c.name}</span>
              {c.issuer ? <span className="sh-cred-issuer">{c.issuer}</span> : null}
              {c.holder || c.number ? <span className="sh-cred-meta">{[c.holder, c.number ? "No. " + c.number : null].filter(Boolean).join(" · ")}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
