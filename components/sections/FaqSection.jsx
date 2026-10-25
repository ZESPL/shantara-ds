import React from "react";
import { Statement } from "../editorial/Statement.jsx";
import { Accordion } from "../navigation/Accordion.jsx";

/* Questions and answers: a statement (and one optional link) on the left, the questions on
   the right as an Accordion. Pass `items` for one list, or `groups` for named groups
   (content/faq.json `categories`). `schema` emits FAQPage JSON-LD from the plain-text
   answers, so the page ships the same questions to search.
   <1000px: statement above the questions. ≥1000px: 4 / 8 columns, the statement sticky
   while the questions scroll (tall windows only). */
const CSS = `
.sh-faq{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg);align-items:start}
.sh-faq-head{display:flex;flex-direction:column;gap:var(--space-5);min-width:0}
.sh-faq-list{display:flex;flex-direction:column;gap:var(--stack-lg);min-width:0}
.sh-faq-group{display:flex;flex-direction:column;gap:var(--space-3)}
.sh-faq-group-title{margin:0;font:var(--type-label);font-size:var(--text-sm);color:var(--text-secondary)}
.sh-faq-answer{margin:0;font:var(--type-body);color:var(--text-secondary);max-width:var(--measure-body)}
@media (min-width:1000px){
  .sh-faq{grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:calc(var(--grid-gap) * 2)}
}
@media (min-width:1000px) and (min-height:800px){
  .sh-faq-head{position:sticky;top:calc(var(--header-h, 72px) + var(--space-6))}
}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-faq-css")) return;
  const el = document.createElement("style");
  el.id = "sh-faq-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const toItems = (faqs) => faqs.map((f) => ({
  title: f.question,
  content: typeof f.answer === "string" ? <p className="sh-faq-answer">{f.answer}</p> : f.answer,
}));

/* items: [{ question, answer }] · groups: [{ name, faqs: [{ question, answer }] }] */
export function FaqSection({ title = "Questions guests ask", sub, action, items, groups, schema = false, headingLevel = 2, defaultOpen = null, style, ...rest }) {
  ensure();
  const H = "h" + Math.min(6, headingLevel + 1);
  const all = groups ? groups.flatMap((g) => g.faqs || []) : items || [];
  const ld = schema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.filter((f) => typeof f.answer === "string").map((f) => ({
      "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;
  return (
    <div data-ds-id="sections/FaqSection" className="sh-faq" style={style} {...rest}>
      <div className="sh-faq-head">
        <Statement as={"h" + headingLevel} size="title" sub={sub}>{title}</Statement>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="sh-faq-list">
        {groups
          ? groups.map((g) => (
            <section className="sh-faq-group" key={g.name}>
              <H className="sh-faq-group-title">{g.name}</H>
              <Accordion items={toItems(g.faqs || [])} defaultOpen={defaultOpen} />
            </section>
          ))
          : <Accordion items={toItems(all)} defaultOpen={defaultOpen} />}
      </div>
      {ld ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /> : null}
    </div>
  );
}
