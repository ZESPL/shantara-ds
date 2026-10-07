/* Home — composition sample (not the production site). Content from window.ShantaraContent. */

/* The three programmes shown with photographs; the rest go in the text index below them. */
const HOME_TILE_PROGRAMMES = ["detox", "diabetes-reversal", "stress-management"];
/* Kit-journal articles on the home page (photos chosen so none repeats another frame on this page). */
const HOME_ARTICLES = ["how-programme-duration-is-decided", "how-meals-are-planned", "week-of-monsoon-light"];

function firstSentence(text) {
  const m = String(text || "").match(/^.*?[.!?](\s|$)/);
  return m ? m[0].trim() : String(text || "");
}

function homeDoctors(t) {
  return (window.ShantaraContent.doctors || []).map((d) => ({
    name: t(d.full_name),
    role: t(d.role),
    detail: d.qualification ? t(d.qualification) : undefined,
    src: d.photo_profile ? window.photoSrc(d.photo_profile) : undefined,
  }));
}

function siteFaqs() {
  return ((window.ShantaraContent.faq || {}).categories || []).flatMap((c) => c.faqs).map((f) => ({ title: f.question, content: f.answer }));
}

function HomeScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const DS = window.ShantaraDesignSystem_45bbe4;
  const { Button, Accordion, Section, HeroFullBleed, Statement, BandStatement, PeopleRow, TileGrid, Tile, IndexList, SplitSection, PlainList, PanoramaCaption, SpecTable, TextLink } = DS;
  const P = window.PageSlot;
  const C = window.ShantaraContent;
  const programs = (C.programs || []).filter((p) => p.status !== "draft");
  const tiles = HOME_TILE_PROGRAMMES.map((id) => programs.find((p) => p.id === id)).filter(Boolean);
  const rest = programs.filter((p) => !HOME_TILE_PROGRAMMES.includes(p.id));
  const therapies = (C.therapies || []).filter((x) => x.featured);
  const rooms = C.rooms || [];
  const articles = HOME_ARTICLES.map((id) => (C.articles || []).find((a) => a.id === id)).filter(Boolean);

  /* The hero carries the page's call to action, so there is no ClosingCTA here (#35). */
  return (
    <main>
      <P id="home/hero">
        <HeroFullBleed
          height="full"
          src={window.photoSrc("arrival-dusk")}
          alt={t("The entrance to Shantara at dusk")}
          title={t("A doctor-led naturopathy retreat in Keralam")}
          sub={t("Every stay begins with a doctor's consultation.")}
          actions={<Button size="lg" onClick={() => onNavigate("booking")}>{t("Book a Consultation")}</Button>}
          meta={[t("Kozhikode, Keralam"), t("Since 2000")]}
        />
      </P>

      <P id="home/approach">
        <Section ground="merino">
          <Statement sub={t("Naturopathy treats the causes of a condition through diet, activity, therapies and rest rather than through medication.")}>
            {t("How our doctors plan your programme")}
          </Statement>
          <p style={{ margin: "var(--stack-md) 0 0", font: "var(--type-body)", color: "var(--text-secondary)", maxWidth: "var(--measure-body)" }}>
            {t("Your programme begins with a consultation and assessment. Our doctors consider your medical history, current health, lifestyle and goals. They then plan your treatments, meals, activity and rest. The plan is reviewed during your stay and adjusted where necessary.")}
          </p>
        </Section>
      </P>

      <P id="home/band">
        <BandStatement>
          <Statement>{t("Your programme is planned after consultation and assessment.")}</Statement>
          <div><TextLink onClick={() => onNavigate("about")}>{t("Our approach")}</TextLink></div>
        </BandStatement>
      </P>

      <P id="home/doctors">
        <Section ground="merino">
          <PeopleRow
            title={t("Meet our doctors")}
            people={homeDoctors(t)}
            action={<TextLink onClick={() => onNavigate("about")}>{t("About Shantara")}</TextLink>}
          />
        </Section>
      </P>

      <P id="home/programmes">
        <Section ground="stone">
          <TileGrid
            title={t("Naturopathy programmes")}
            action={<TextLink onClick={() => onNavigate("programme")}>{t("View programmes")}</TextLink>}
            layout="3"
          >
            {tiles.map((p) => (
              <Tile
                key={p.id}
                src={window.photoSrc((p.featured_image || {}).src)}
                alt=""
                ratio="4:3"
                title={t(p.name)}
                meta={[t(p.focus), p.durations ? t(p.durations) : null].filter(Boolean)}
                text={t(p.proposition)}
                onClick={() => onNavigate("programme")}
              />
            ))}
          </TileGrid>
          {/* One column up to 1280px, two from there, with roomier rows (kit CSS in SiteChrome). */}
          <div className="sh-kit-index-roomy" style={{ marginTop: "var(--section-y)" }}>
          <IndexList
            columns={2}
            groups={[{ label: t("All programmes"), items: rest.map((p) => ({ title: t(p.name), text: t(firstSentence(p.proposition)), onClick: () => onNavigate("programme") })) }]}
          />
          </div>
          <div className="sh-kit-index-after">
            <p style={{ margin: 0, font: "var(--type-body-sm)", color: "var(--text-secondary)", maxWidth: "var(--measure-body)" }}>
              {t("Alongside these, Shantara runs condition-specific medical programmes across eleven categories, from metabolic and renal health to hormonal conditions. Every guest in a medical programme is under a doctor's direct care.")}
            </p>
            <div><TextLink onClick={() => onNavigate("conditions")}>{t("View conditions")}</TextLink></div>
          </div>
        </Section>
      </P>

      <P id="home/therapies">
        <SplitSection mediaSide="end" src={window.photoSrc("treatment-bath-corridor-cubicles")} alt={t("Bath corridor in the therapy wing")}>
          <Statement size="title" sub={t("Your doctor may recommend specific therapies based on your assessment and programme.")}>
            {t("Naturopathy treatments and therapies")}
          </Statement>
          <PlainList columns={2} rules items={therapies.map((x) => ({ title: t(x.name), text: t(x.description) }))} />
        </SplitSection>
      </P>

      <P id="home/grounds">
        <PanoramaCaption
          src={window.photoSrc("grounds")}
          alt={t("The grounds and accommodation wing")}
          title={t("A hilltop above the Chennamangallur valley")}
        />
      </P>

      <P id="home/rooms">
        <SplitSection ground="stone" mediaSide="start" src={window.photoSrc("room-bedroom-balcony-open-book")} alt={t("A bedroom with a balcony over the valley")}>
          <Statement size="title" sub={t("Every room category is designed for a comfortable residential stay.")}>
            {t("Rooms for resting between treatments")}
          </Statement>
          <SpecTable
            caption={t("Room categories")}
            columns={[
              { key: "name", label: t("Room") },
              { key: "size", label: t("Size"), accent: true },
              { key: "occupancy", label: t("Occupancy") },
            ]}
            rows={rooms.map((r) => ({ name: t(r.name), size: t(r.size), occupancy: t(r.occupancy) }))}
          />
          <div><TextLink onClick={() => onNavigate("tariffs")}>{t("View tariffs")}</TextLink></div>
        </SplitSection>
      </P>

      <P id="home/journal">
        <Section ground="merino">
          {/* Three equal tiles: same image ratio, titles on one line start, meta aligned. */}
          <div className="sh-kit-tiles-aligned">
          <TileGrid
            title={t("Articles from our doctors and team")}
            action={<TextLink onClick={() => onNavigate("journal")}>{t("View all articles")}</TextLink>}
            layout="3"
          >
            {articles.map((a) => (
              <Tile
                key={a.id}
                src={window.photoSrc((a.featured_image || {}).src)}
                alt=""
                ratio="3:2"
                title={t(a.title)}
                meta={[t(a.category), a.read_minutes ? t(a.read_minutes + " min read") : null].filter(Boolean)}
                href={window.ShantaraLocales ? window.ShantaraLocales.kitHash(window.ShantaraI18n.currentLocaleCode(), "article:" + a.id) : undefined}
                onClick={() => onNavigate("article:" + a.id)}
              />
            ))}
          </TileGrid>
          </div>
        </Section>
      </P>

      <P id="home/faq">
        <Section ground="stone" width="narrow">
          <Statement>{t("Preparing for your stay")}</Statement>
          <Accordion style={{ marginTop: "var(--stack-lg)" }} items={siteFaqs().map((item) => ({ title: t(item.title), content: t(item.content) }))} />
        </Section>
      </P>
    </main>
  );
}

Object.assign(window, { HomeScreen });
