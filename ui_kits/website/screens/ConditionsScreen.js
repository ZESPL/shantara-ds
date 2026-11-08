/* Conditions A to Z: HeroStatement (side image, no button) → every condition a programme
   lists, as an A to Z GroupedList; each links to its primary programme (the one that lists
   it earliest, then the one earlier in the list) and names every programme that lists it →
   how a programme is chosen → ClosingCTA. No condition detail pages.
   Composition sample, not the production site (shantara.life D-214). */

function conditionLetters() {
  const C = window.ShantaraContent;
  const programs = (C.programs || [])
    .filter((p) => p.status !== "draft")
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const names = new Map((C.conditions || []).map((c) => [c.id, c.name]));
  const byCondition = new Map();
  programs.forEach((p, index) => {
    (p.conditions || []).forEach((id, position) => {
      if (!names.has(id)) return;
      const entry = byCondition.get(id) || { name: names.get(id), programmes: [] };
      entry.programmes.push({ name: p.name, rank: [position, index] });
      byCondition.set(id, entry);
    });
  });
  const letters = new Map();
  [...byCondition.values()]
    .map((e) => ({ ...e, programmes: e.programmes.sort((a, b) => a.rank[0] - b.rank[0] || a.rank[1] - b.rank[1]) }))
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
    .forEach((e) => {
      const letter = e.name.charAt(0).toUpperCase();
      letters.set(letter, [...(letters.get(letter) || []), e]);
    });
  return [...letters.entries()];
}

function ConditionsScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroStatement, Section, GroupedList, Statement, TextLink, ClosingCTA, Button } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const locale = window.ShantaraI18n.currentLocaleCode();
  const home = L ? L.kitHash(locale, "home") : "#/en/";
  const detail = L ? L.kitHash(locale, "programme") : undefined;
  const groups = conditionLetters().map(([letter, items]) => ({
    label: letter,
    items: items.map((e) => ({ label: t(e.name), text: e.programmes.map((p) => t(p.name)).join(", "), href: detail })),
  }));

  return (
    <main>
      <P id="conditions/hero">
        <HeroStatement
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("Conditions")]} />}
          title={t("Conditions")}
          sub={t("Each condition leads to the programme that lists it. Where more than one programme lists a condition, the doctor recommends one after assessment.")}
          src={window.photoSrc("lobby-valley-view-seated-guest")}
          alt={t("A guest sits on a curved sofa in the lobby, looking out at misty hills")}
        />
      </P>

      <P id="conditions/index">
        <Section>
          <GroupedList columns={3} headingLevel={3} groups={groups} />
          <p style={{ margin: "var(--stack-lg) 0 0" }}>
            <TextLink onClick={() => onNavigate("programmes")}>{t("See all programmes")}</TextLink>
          </p>
        </Section>
      </P>

      <P id="conditions/choose">
        <Section ground="stone">
          <Statement sub={t("After an enquiry, the team calls to arrange a consultation with a naturopathy doctor. The doctor recommends the programme and the length of stay, and confirms the plan after an assessment on arrival.")}>
            {t("How a programme is chosen")}
          </Statement>
        </Section>
      </P>

      <P id="conditions/closing">
        <ClosingCTA
          variant="ground"
          title={t("Not sure which programme fits?")}
          sub={t("Send an enquiry and the team will call to talk it through.")}
          action={<Button size="lg" onClick={() => { if (L) L.track("consultation_cta_click", { page_type: "conditions", content_id: "conditions", content_name: "Conditions", cta_location: "closing" }); onNavigate("booking"); }}>{t("Make an Inquiry")}</Button>}
          contact={window.siteContactItems(t)}
        />
      </P>
    </main>
  );
}

Object.assign(window, { ConditionsScreen });
