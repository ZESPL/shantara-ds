/* About — HeroStatement (side photograph) → numerals → doctors → story → approach →
   editorial policy → ClosingCTA (ground, Pine Tree; the page has no other CTA).
   Copy comes from content/ (site, doctors) and the strings this screen already carried. */

function aboutDoctors() {
  return (window.ShantaraContent.doctors || []).map((d) => ({
    name: d.full_name,
    role: d.role,
    detail: [d.qualification, d.publications_note].filter(Boolean).join(". ") || undefined,
    src: d.photo_profile ? window.photoSrc(d.photo_profile) : undefined,
  }));
}

function aboutNumerals() {
  const stats = (window.ShantaraContent.site && window.ShantaraContent.site.stats) || [];
  // Two or three figures from site.json stats (never the room count — #8).
  return stats.slice(0, 3);
}

function AboutScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroStatement, Section, NumeralsSplit, PeopleRow, SplitSection, Statement, TextLink, ClosingCTA, Button } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const home = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "home") : "#/en/";
  return (
    <main>
      <P id="about/hero">
        <HeroStatement
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("About")]} />}
          title={t("About Shantara")}
          sub={t("Shantara is a doctor-led naturopathy retreat on a hilltop above the Chennamangallur valley. It is the evolution of Hygiene Nature Cure Hospital, which has cared for guests since 2000.")}
          src={window.photoSrc("lobby")}
          alt={t("The lobby at Shantara")}
          ratio="4:5"
        />
      </P>

      <P id="about/numerals">
        <Section ground="stone">
          <NumeralsSplit
            title={t("Shantara is the evolution of Hygiene Nature Cure Hospital, founded in 2000.")}
            numerals={aboutNumerals().map((s) => ({ value: s.value, label: t(s.label) }))}
          />
        </Section>
      </P>

      <P id="about/doctors">
        <Section>
          <PeopleRow
            title={t("A doctor plans your programme after consultation and reviews it during your stay.")}
            sub={t("Profiles include qualifications so you can see who is responsible for clinical guidance.")}
            people={aboutDoctors().map((p) => ({ ...p, role: t(p.role), detail: p.detail ? t(p.detail) : undefined }))}
          />
        </Section>
      </P>

      <P id="about/story">
        <SplitSection src={window.photoSrc("courtyard")} alt={t("The courtyard at Shantara")} ground="merino">
          <Statement size="title" sub={t("Dr. P.A. Kareem founded Hygiene Nature Cure Hospital in 2000. Its core approach is to treat the cause through ethical, drug-free naturopathy.")}>
            {t("Shantara is the evolution of Hygiene Nature Cure Hospital.")}
          </Statement>
        </SplitSection>
      </P>

      <P id="about/approach">
        <SplitSection src={window.photoSrc("library")} alt={t("The library at Shantara")} mediaSide="end" ground="merino">
          <Statement size="title" sub={t("Treatment is drug-free and planned by our doctors after consultation and assessment. Plans are reviewed during the stay and adjusted where needed.")}>
            {t("Your programme is planned after consultation and assessment.")}
          </Statement>
          <div>
            <TextLink onClick={() => onNavigate("programme")}>{t("Programmes")}</TextLink>
          </div>
        </SplitSection>
      </P>

      <P id="about/editorial-policy">
        <Section ground="stone" space="sm">
          <Statement sub={t("Health pages name who writes, who reviews, which sources are used, and how often content is reviewed.")}>
            {t("Medical Editorial Policy")}
          </Statement>
        </Section>
      </P>

      <P id="about/closing">
        <ClosingCTA
          variant="ground"
          ground="pine"
          title={t("Share your name and a number we can reach.")}
          sub={t("Our team will contact you to arrange a consultation.")}
          action={<Button size="lg" onClick={() => { if (L) L.track("consultation_cta_click", { page_type: "about", content_id: "about", content_name: "About", cta_location: "closing" }); onNavigate("booking"); }}>{t("Book a Consultation")}</Button>}
          contact={window.siteContactItems(t)}
        />
      </P>
    </main>
  );
}

Object.assign(window, { AboutScreen });
