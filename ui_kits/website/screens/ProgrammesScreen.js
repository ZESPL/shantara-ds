/* Programmes listing: HeroFullBleed (no button) → a full-width catalogue, one Tile row per
   programme (photograph, name, audience summary, conditions as static Tags) → how a
   programme is chosen → ClosingCTA. Conditions A to Z are on ConditionsScreen.
   Composition sample, not the production site (shantara.life D-213). */

function ProgrammesScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroFullBleed, Section, Tile, Statement, TextLink, ClosingCTA, Button } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const locale = window.ShantaraI18n.currentLocaleCode();
  const C = window.ShantaraContent;
  const home = L ? L.kitHash(locale, "home") : "#/en/";
  const detail = L ? L.kitHash(locale, "programme") : undefined;
  const conditions = new Map((C.conditions || []).map((c) => [c.id, c.name]));
  const programs = (C.programs || [])
    .filter((p) => p.status !== "draft")
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <main>
      <P id="programmes/hero">
        <HeroFullBleed
          src={window.photoSrc("lobby-double-height-valley-guest")}
          alt={t("The double-height lobby, with a guest standing at a window looking out at forested hills")}
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("Programmes")]} />}
          title={t("Programmes")}
          sub={t("Residential programmes for blood sugar, weight, pain, digestion, hormones, the heart, breathing, skin and stress.")}
        />
      </P>

      <P id="programmes/list">
        <Section>
          <p style={{ margin: "0 0 var(--stack-lg)", font: "var(--type-body)", color: "var(--text-secondary)", maxWidth: "var(--measure-body)" }}>
            {t("Each programme lists the conditions it is for.")}{" "}
            <TextLink onClick={() => onNavigate("conditions")}>{t("Find a programme by condition")}</TextLink>
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {programs.map((p) => (
              <li key={p.id} style={{ padding: "var(--space-8) 0", borderTop: "var(--border-width) solid var(--rule-color)" }}>
                <Tile
                  layout="row"
                  size="lg"
                  headingLevel={2}
                  src={window.photoSrc((p.featured_image || {}).src)}
                  alt={t((p.featured_image || {}).alt || "")}
                  title={t(p.name)}
                  text={t(p.audience || p.proposition)}
                  tags={(p.conditions || []).map((id) => conditions.get(id)).filter(Boolean).map(t)}
                  href={detail}
                  onClick={(e) => { e.preventDefault(); onNavigate("programme"); }}
                />
              </li>
            ))}
          </ul>
        </Section>
      </P>

      <P id="programmes/choose">
        <Section ground="stone">
          <Statement sub={t("After an enquiry, the team calls to arrange a consultation with a naturopathy doctor. The doctor recommends the programme and the length of stay, and confirms the plan after an assessment on arrival.")}>
            {t("How a programme is chosen")}
          </Statement>
        </Section>
      </P>

      <P id="programmes/closing">
        <ClosingCTA
          variant="photo"
          src={window.photoSrc("porch-dusk-lit-canopy")}
          alt={t("The porch at dusk")}
          title={t("Which programme fits?")}
          sub={t("Send an enquiry and the team will call to talk through which programme fits.")}
          action={<Button size="lg" onClick={() => { if (L) L.track("consultation_cta_click", { page_type: "programmes", content_id: "programmes", content_name: "Programmes", cta_location: "closing" }); onNavigate("booking"); }}>{t("Make an Inquiry")}</Button>}
          contact={window.siteContactItems(t)}
        />
      </P>
    </main>
  );
}

Object.assign(window, { ProgrammesScreen });
