/* Journal index — HeroStatement → category Tabs → a 3-up Tile grid →
   Pagination → ClosingCTA (compact; the page has no other CTA).
   Recipe: components/editorial/Pagination.prompt.md. Tiles open the Article view. */

const JOURNAL_PAGE_SIZE = 3;

function journalPosts() {
  const C = window.ShantaraContent;
  const fromArticles = (C.articles || [])
    .filter((a) => a.kit_journal)
    .map((a) => ({ id: a.id, t: a.title, k: a.category, photo: (a.featured_image || {}).src, read: a.read_minutes, article: true }));
  const fromAnswers = (C.doctorAnswers || [])
    .filter((a) => a.kit_journal)
    .map((a) => ({ id: a.id, t: a.question, k: a.category || "Doctor Answers", photo: (a.featured_image || {}).src, read: a.read_minutes, article: false }));
  return [...fromArticles, ...fromAnswers];
}

/* "All" first, then the categories that have posts, in a fixed order (at most six tabs). */
const JOURNAL_CATEGORY_ORDER = ["Clinical Guides", "Doctor Answers", "Food & Recipes", "Guest Stories"];

function JournalScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Tabs, Button, HeroStatement, Section, Tile, TileGrid, Pagination, ClosingCTA } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const locale = window.ShantaraI18n.currentLocaleCode();
  const posts = journalPosts();
  const cats = ["All", ...JOURNAL_CATEGORY_ORDER.filter((c) => posts.some((p) => p.k === c))];
  const [cat, setCat] = React.useState("All");
  const [page, setPage] = React.useState(1);
  const shown = cat === "All" ? posts : posts.filter((p) => p.k === cat);
  const pageCount = Math.max(1, Math.ceil(shown.length / JOURNAL_PAGE_SIZE));
  const visible = shown.slice((page - 1) * JOURNAL_PAGE_SIZE, page * JOURNAL_PAGE_SIZE);
  const onTab = (v) => { setCat(v); setPage(1); };
  const hrefFor = (p) => (p.article && L ? L.kitHash(locale, "article:" + p.id) : undefined);
  return (
    <main>
      <P id="journal/hero">
        <HeroStatement
          tall={false}
          title={t("Articles from our doctors and team")}
          sub={t("Clinical guides, meals and guest stories from Shantara.")}
        />
      </P>

      <P id="journal/index">
        <Section space="bottom">
          <Tabs items={cats.map((key) => ({ value: key, label: t(key) }))} value={cat} onChange={onTab} />
          <div key={cat + "-" + page} className="sh-page-enter" style={{ display: "flex", flexDirection: "column", gap: "var(--section-y-sm)", marginTop: "var(--stack-lg)" }}>
            <div className="sh-kit-tiles-aligned"><TileGrid layout="3">
              {visible.map((p) => (
                <Tile
                  key={p.id}
                  src={window.photoSrc(p.photo)}
                  alt=""
                  ratio="3:2"
                  title={t(p.t)}
                  meta={[t(p.k), p.read ? `${p.read} ${t("min read")}` : null].filter(Boolean)}
                  href={hrefFor(p)}
                  onClick={p.article ? () => onNavigate("article:" + p.id) : undefined}
                />
              ))}
            </TileGrid></div>
            {pageCount > 1 ? (
              <Pagination
                page={page}
                pageCount={pageCount}
                onChange={(n) => { setPage(n); const s = document.getElementById("kit-scroll"); if (s) s.scrollTop = 0; }}
                prevLabel={t("Previous")}
                nextLabel={t("Next")}
              />
            ) : null}
          </div>
        </Section>
      </P>

      <P id="journal/closing">
        <ClosingCTA
          variant="compact"
          ground="himalaya"
          title={t("Share your name and a number we can reach.")}
          sub={t("Our team will contact you to arrange a consultation.")}
          action={<Button size="lg" onClick={() => { if (L) L.track("consultation_cta_click", { page_type: "journal", content_id: "journal", content_name: "Journal", cta_location: "closing" }); onNavigate("booking"); }}>{t("Book a Consultation")}</Button>}
        />
      </P>
    </main>
  );
}

Object.assign(window, { JournalScreen, journalPosts });
