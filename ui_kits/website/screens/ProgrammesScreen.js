/* Programmes listing: HeroFullBleed → one IndexList row per programme (name, summary, its
   first conditions) → Find a programme by condition (an A to Z GroupedList) → how a
   programme is chosen → ClosingCTA. Composition sample, not the production site.
   There are no condition pages (shantara.life D-200): a condition links to its primary
   programme, the one that lists it earliest, then the one earlier in the list. */

function programmeListing() {
  const C = window.ShantaraContent;
  const programs = (C.programs || [])
    .filter((p) => p.status !== "draft")
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  const conditions = new Map((C.conditions || []).map((c) => [c.id, c]));
  const byCondition = new Map();
  programs.forEach((p, index) => {
    (p.conditions || []).forEach((id, position) => {
      const c = conditions.get(id);
      if (!c) return;
      const entry = byCondition.get(id) || { name: c.name, synonyms: c.synonyms || [], programmes: [] };
      entry.programmes.push({ name: p.name, rank: [position, index] });
      byCondition.set(id, entry);
    });
  });
  const az = [...byCondition.values()]
    .map((e) => ({ ...e, programmes: e.programmes.sort((a, b) => a.rank[0] - b.rank[0] || a.rank[1] - b.rank[1]) }))
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
  const letters = new Map();
  az.forEach((e) => {
    const letter = e.name.charAt(0).toUpperCase();
    letters.set(letter, [...(letters.get(letter) || []), e]);
  });
  return { programs, conditions, letters };
}

function ProgrammesScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroFullBleed, Section, IndexList, GroupedList, Statement, ClosingCTA, Button } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const locale = window.ShantaraI18n.currentLocaleCode();
  const home = L ? L.kitHash(locale, "home") : "#/en/";
  const detail = L ? L.kitHash(locale, "programme") : undefined;
  const { programs, conditions, letters } = programmeListing();
  const rows = programs.map((p) => ({
    title: t(p.name),
    text: t(p.proposition),
    meta: (p.conditions || []).slice(0, 4).map((id) => (conditions.get(id) || {}).name).filter(Boolean).map(t).join(", ") || undefined,
    href: detail,
    onClick: (e) => { e.preventDefault(); onNavigate("programme"); },
  }));
  const groups = [...letters.entries()].map(([letter, items]) => ({
    label: letter,
    items: items.map((e) => ({ label: t(e.name), text: e.programmes.map((p) => t(p.name)).join(", "), href: detail })),
  }));

  return (
    <main>
      <P id="programmes/hero">
        <HeroFullBleed
          src={window.photoSrc("lobby-double-height-valley-guest")}
          alt={t("The double-height lobby, with a guest standing at a window looking out at forested hills")}
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("Programmes")]} />}
          title={t("Programmes")}
          sub={t("Residential programmes for blood sugar, weight, pain, digestion, hormones, the heart, breathing, skin and stress.")}
          actions={<Button size="lg" onClick={() => onNavigate("booking")}>{t("Make an Inquiry")}</Button>}
        />
      </P>

      <P id="programmes/list">
        <Section>
          <IndexList columns={1} groups={[{ label: t("All programmes"), items: rows }]} />
        </Section>
      </P>

      <P id="programmes/by-condition">
        <Section ground="stone" id="by-condition">
          <Statement sub={t("Each condition leads to the programme that lists it. Where more than one programme lists a condition, the doctor recommends one after assessment.")}>
            {t("Find a programme by condition")}
          </Statement>
          <div style={{ marginTop: "var(--stack-lg)" }}>
            <GroupedList columns={3} headingLevel={3} groups={groups} />
          </div>
        </Section>
      </P>

      <P id="programmes/choose">
        <Section>
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
