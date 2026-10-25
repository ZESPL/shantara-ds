import React from "react";
import { Media } from "../editorial/Media.jsx";
import { MetaRow } from "../editorial/MetaRow.jsx";
import { Video } from "../editorial/Video.jsx";

/* The top of a single Journal article. No label above the title: breadcrumbs → h1 →
   dek (lead) → meta row (category · date · read time) → a byline on a hairline (author
   with a small portrait, and the medical reviewer) with an optional share slot → an
   optional lead photograph with caption. Left-aligned to the article column (68ch body),
   so it lines up with Prose; the photograph may run the full container width. */
const CSS = `
.sh-ahead{padding-block:calc(var(--space-12) + var(--section-y-sm)) var(--section-y-sm)}
.sh-ahead-col{display:flex;flex-direction:column;gap:var(--stack-md);max-width:52rem;min-width:0}
.sh-ahead-crumbs{margin-bottom:var(--space-5)}
.sh-ahead-title{margin:0;font:var(--type-h1);color:var(--text-primary);max-width:24ch;text-wrap:balance}
.sh-ahead-dek{margin:0;font:var(--type-lead);color:var(--text-secondary);max-width:60ch}
.sh-ahead-by{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--space-5) var(--space-8);margin-top:var(--space-4);padding-top:var(--space-5);border-top:var(--border-width) solid var(--rule-color)}
.sh-ahead-people{display:flex;align-items:center;gap:var(--space-4);min-width:0}
.sh-ahead-avatar{position:relative;flex:0 0 auto;width:48px;height:48px;overflow:hidden;background:color-mix(in srgb, var(--color-pearl-bush) 82%, var(--color-pine-tree));display:grid;place-items:center;font:var(--weight-regular) var(--text-sm)/1 var(--font-display);letter-spacing:var(--tracking-wide);color:color-mix(in srgb, var(--color-pine-tree) 60%, transparent)}
.sh-ahead-avatar img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top}
.sh-ahead-lines{display:flex;flex-direction:column;gap:var(--space-1);min-width:0;font:var(--type-body-sm);color:var(--text-secondary)}
.sh-ahead-lines strong{font-weight:var(--weight-medium);color:var(--text-primary)}
.sh-ahead-lines a{color:inherit;text-decoration:none}
.sh-ahead-lines a:hover strong{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
.sh-ahead-rev{font:var(--type-caption);color:var(--text-muted)}
.sh-ahead-upd{white-space:nowrap}
.sh-ahead-fig{margin:var(--stack-lg) 0 0}
.sh-ahead-cap{margin-top:var(--space-3);font:var(--type-caption);color:var(--text-muted);max-width:68ch}
@media (max-width:759.98px){.sh-ahead-fig{margin-inline:calc(-1 * var(--layout-gutter))}.sh-ahead-cap{padding-inline:var(--layout-gutter)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-ahead-css")) return;
  const el = document.createElement("style");
  el.id = "sh-ahead-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

function initials(name) {
  const p = String(name || "").replace(/^(Dr\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/i, "").split(/[\s.]+/).filter(Boolean);
  return (p.length > 1 ? [p[0], p[p.length - 1]] : p).map((s) => s[0]).join("").toUpperCase();
}

function Person({ p, prefix }) {
  const name = <strong>{p.name}</strong>;
  return <>{prefix}{p.href ? <a href={p.href}>{name}</a> : name}{p.role ? <>, {p.role}</> : null}</>;
}

export function ArticleHeader({ title, dek, breadcrumbs, category, date, dateTime, updated, updatedDateTime, readTime, author, reviewer, share, media, video, src, alt = "", caption, credit, ratio = "16:9", mobileRatio = "4:3", ground = "merino", titleAs = "h1", style, ...rest }) {
  ensure();
  const meta = [
    category ? (typeof category === "object" ? category : { label: category }) : null,
    date ? { label: date, dateTime } : null,
    readTime || null,
  ];
  /* `video`: a video article — the player (with captions) takes the lead photograph's place. */
  const figure = media || (video ? <Video {...video} ratio={ratio} mobileRatio={mobileRatio} /> : src ? <Media src={src} alt={alt} ratio={ratio} mobileRatio={mobileRatio} priority /> : null);
  const H = titleAs;
  return (
    <header data-ds-id="sections/ArticleHeader" className="sh-ahead" data-ground={ground} style={style} {...rest}>
      <div className="sh-container">
        <div className="sh-ahead-col">
          {breadcrumbs ? <div className="sh-ahead-crumbs">{breadcrumbs}</div> : null}
          <H className="sh-ahead-title">{title}</H>
          {dek ? <p className="sh-ahead-dek">{dek}</p> : null}
          <MetaRow items={meta} />
          {author || reviewer || share ? (
            <div className="sh-ahead-by">
              {author || reviewer ? (
                <div className="sh-ahead-people">
                  {author ? <span className="sh-ahead-avatar" aria-hidden="true">{author.src ? <img src={author.src} alt="" /> : initials(author.name)}</span> : null}
                  <div className="sh-ahead-lines">
                    {author ? <span><Person p={author} prefix="By " /></span> : null}
                    {reviewer || updated ? (
                      <span className="sh-ahead-rev">
                        {reviewer ? <Person p={reviewer} prefix="Medically reviewed by " /> : null}
                        {reviewer && updated ? " · " : null}
                        {updated ? <span className="sh-ahead-upd">Updated <time dateTime={updatedDateTime}>{updated}</time></span> : null}
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : <span />}
              {share ? <div>{share}</div> : null}
            </div>
          ) : null}
        </div>
        {figure ? (
          <figure className="sh-ahead-fig">
            {figure}
            {caption || credit ? <figcaption className="sh-ahead-cap">{caption}{caption && credit ? " " : null}{credit}</figcaption> : null}
          </figure>
        ) : null}
      </div>
    </header>
  );
}
