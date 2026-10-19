/* About — HeroStatement (side photograph) → doctors → story → approach →
   editorial policy → ClosingCTA (ground, Pine Tree; the page has no other CTA).
   The practice history is stated once, in the story section.
   Copy comes from content/ (doctors) and the strings this screen already carried. */

function aboutDoctors() {
  return (window.ShantaraContent.doctors || []).filter((d) => ["pa-kareem", "bahja-janu"].includes(d.id)).map((d) => ({
    name: d.full_name,
    role: d.role,
    detail: [d.qualification, d.publications_note].filter(Boolean).join(". ") || undefined,
    src: d.photo_profile ? window.photoSrc(d.photo_profile) : undefined,
  }));
}

function AboutScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroStatement, Section, PeopleRow, SplitSection, Statement, TextLink, ClosingCTA, Button } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const home = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "home") : "#/en/";
  return (
    <main>
      <P id="about/hero">
        <HeroStatement
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("About")]} />}
          title={t("About Shantara")}
          sub={t("Shantara is a doctor-led naturopathy retreat on a hilltop above the Chennamangallur valley.")}
          src={window.photoSrc("lobby")}
          alt={t("The lobby at Shantara")}
          ratio="4:5"
        />
      </P>

      <P id="about/doctors">
        <Section>
          <PeopleRow
            title={t("A doctor plans your programme after consultation and reviews it during your stay.")}
            sub={t("Profiles include qualifications so you can see who is responsible for clinical guidance.")}
            people={aboutDoctors().map((p) => ({ ...p, role: t(p.role), detail: p.detail ? t(p.detail) : undefined }))}
            action={<TextLink onClick={() => onNavigate("doctor:pa-kareem")}>{t("P.A. Kareem")}</TextLink>}
          />
        </Section>
      </P>

      <P id="about/story">
        <SplitSection src={window.photoSrc("courtyard")} alt={t("The courtyard at Shantara")} ground="merino">
          <Statement size="title" sub={t("He has practised for more than 33 years. In 2000 he founded Hygiene Nature Cure Hospital, which has cared for more than 25,000 people.")}>
            {t("Shantara continues P.A. Kareem's naturopathy practice.")}
          </Statement>
        </SplitSection>
      </P>

      <P id="about/approach">
        <SplitSection src={window.photoSrc("library")} alt={t("The library at Shantara")} mediaSide="end" ground="merino">
          <Statement size="title" sub={t("Treatment is drug-free. Plans are reviewed during the stay and adjusted where needed.")}>
            {t("Doctors set the daily plan — treatments, meals, activity and rest.")}
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
