/* Journal article: route #/<locale>/journal/<slug> (view "article").
   ArticleHeader → TableOfContents (collapsed above the text on phones, sticky beside it from
   1000px) + Prose → ReviewedBy → ShareBar → AuthorCard → RelatedArticles →
   ClosingCTA (compact; the article has no other CTA).
   Recipe: components/sections/ArticleHeader.prompt.md. Title, dek, category, photo and read
   time come from content/articles/<slug>.json. */

const ARTICLE_DEFAULT_SLUG = "how-meals-are-planned";

const ARTICLE_CSS = `
.sh-art-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--stack-lg)}
.sh-art-end{display:flex;flex-direction:column;gap:var(--stack-lg);margin-top:var(--section-y-sm);max-width:52rem}
@media (min-width:1000px){
  .sh-art-grid{grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--grid-gap)}
  .sh-art-body{grid-column:1 / span 8;grid-row:1}
  .sh-art-toc{grid-column:10 / span 3;grid-row:1}
}
`;

function ensureArticleCss() {
  if (typeof document === "undefined" || document.getElementById("sh-art-css")) return;
  const el = document.createElement("style");
  el.id = "sh-art-css";
  el.textContent = ARTICLE_CSS;
  document.head.appendChild(el);
}

/* SAMPLE BODY, kit only. content/articles has no `body` for the kit samples (body: null),
   so the mockup shows this short, neutral block to demonstrate Prose + TableOfContents.
   Every sentence restates copy already used elsewhere on the site; it makes no medical claim.
   Production renders the article's own body (Keystatic Markdown → Prose html). */
const SAMPLE_SECTIONS = [
  { id: "planned-with-your-programme", label: "Planned with your programme", paras: [
    "Meals are planned as part of your programme, taking into account your doctor's recommendations and dietary requirements.",
    "Your programme begins with a consultation and assessment. The plan is reviewed during your stay and adjusted where necessary.",
  ] },
  { id: "during-your-stay", label: "During your stay", paras: [
    "A typical day may include a consultation, therapies, meals, physical activity, rest and personal time.",
  ] },
  { id: "before-you-arrive", label: "Before you arrive", paras: [
    "Share your name and a number we can reach. Our team will contact you to arrange a consultation.",
  ] },
];

/* SAMPLE ATTRIBUTION, kit only. The article records have author: null and
   medical_reviewer: null. The mockup names the clinical team as author and the Medical
   Director (content/doctors) as reviewer to show where ReviewedBy and AuthorCard sit.
   Production shows ReviewedBy only when the record names a reviewer. */
function articleReviewer(a) {
  const doctors = window.ShantaraContent.doctors || [];
  const id = a.medical_reviewer || "bahja-janu";
  return doctors.find((d) => d.id === id) || null;
}

function ArticleScreen({ onNavigate, slug }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, ArticleHeader, Section, Prose, TableOfContents, ReviewedBy, ShareBar, AuthorCard, RelatedArticles, ClosingCTA, Button, TextLink } = window.ShantaraDesignSystem_45bbe4;
  ensureArticleCss();
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const locale = window.ShantaraI18n.currentLocaleCode();
  const all = window.ShantaraContent.articles || [];
  const a = all.find((x) => x.id === slug || x.slug === slug) || all.find((x) => x.id === ARTICLE_DEFAULT_SLUG) || all[0];
  const href = (v) => (L ? L.kitHash(locale, v) : "#/en/");
  const reviewer = articleReviewer(a);
  const readTime = a.read_minutes ? `${a.read_minutes} ${t("min read")}` : undefined;
  const related = all
    .filter((x) => x.kit_journal && x.id !== a.id)
    .sort((x, y) => (y.category === a.category) - (x.category === a.category))
    .slice(0, 3)
    .map((x) => ({
      title: t(x.title),
      href: href("article:" + x.id),
      src: window.photoSrc((x.featured_image || {}).src),
      alt: "",
      category: t(x.category),
      readTime: x.read_minutes ? `${x.read_minutes} ${t("min read")}` : undefined,
    }));
  const toc = SAMPLE_SECTIONS.map((s) => ({ id: s.id, label: t(s.label) }));
  const scrollTo = (id, e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <P id="article/header">
        <ArticleHeader
          breadcrumbs={<Breadcrumbs items={[{ label: t("Journal"), href: href("journal") }, t(a.category)]} />}
          title={t(a.title)}
          dek={a.lead ? t(a.lead) : undefined}
          category={{ label: t(a.category), href: href("journal") }}
          readTime={readTime}
          share={<ShareBar compact label="" title={t(a.title)} />}
          src={window.photoSrc((a.featured_image || {}).src)}
          alt=""
        />
      </P>

      <P id="article/body">
        <Section space="bottom">
          <div className="sh-art-grid">
            <div className="sh-art-toc">
              <TableOfContents items={toc} title={t("On this page")} onNavigate={scrollTo} />
            </div>
            <div className="sh-art-body">
              <Prose as="article">
                {SAMPLE_SECTIONS.map((s) => (
                  <React.Fragment key={s.id}>
                    <h2 id={s.id}>{t(s.label)}</h2>
                    {s.paras.map((line) => <p key={line}>{t(line)}</p>)}
                  </React.Fragment>
                ))}
              </Prose>
              <div className="sh-art-end">
                {reviewer ? (
                  <ReviewedBy
                    boxed
                    name={reviewer.full_name}
                    role={t(reviewer.role)}
                    href={href("about")}
                    note={t("This article is general information, not a diagnosis.")}
                  />
                ) : null}
                <ShareBar title={t(a.title)} />
                <AuthorCard
                  name={t("Shantara clinical team")}
                  role={t("Doctors and therapists at Shantara")}
                  action={<TextLink href={href("about")} onClick={(e) => { e.preventDefault(); onNavigate("about"); }}>{t("Meet our doctors")}</TextLink>}
                />
              </div>
            </div>
          </div>
        </Section>
      </P>

      {related.length >= 2 ? (
        <P id="article/related">
          <Section ground="stone">
            <RelatedArticles
              articles={related}
              action={<TextLink href={href("journal")} onClick={(e) => { e.preventDefault(); onNavigate("journal"); }}>{t("All articles")}</TextLink>}
            />
          </Section>
        </P>
      ) : null}

      <P id="article/closing">
        <ClosingCTA
          variant="compact"
          ground="pine"
          title={t("Share your name and a number we can reach.")}
          sub={t("Our team will contact you to arrange a consultation.")}
          action={<Button size="lg" onClick={() => { if (L) L.track("consultation_cta_click", { page_type: "article", content_id: a.id, content_name: a.title, cta_location: "closing" }); onNavigate("booking"); }}>{t("Book a Consultation")}</Button>}
        />
      </P>
    </main>
  );
}

Object.assign(window, { ArticleScreen });
