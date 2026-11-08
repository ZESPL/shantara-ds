/* Conditions index: a compact HeroStatement (no image, no button) → every condition a
   programme lists as an A to Z GroupedList, each one link to its primary programme (the one
   that lists it earliest, then the one earlier in the list). Nothing follows the list.
   No condition detail pages. Linked from the footer, not the nav.
   Composition sample, not the production site (shantara.life D-216). */

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

function ConditionsScreen() {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroStatement, Section, GroupedList } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const locale = window.ShantaraI18n.currentLocaleCode();
  const home = L ? L.kitHash(locale, "home") : "#/en/";
  const detail = L ? L.kitHash(locale, "programme") : undefined;
  const groups = conditionLetters().map(([letter, items]) => ({
    label: letter,
    items: items.map((e) => ({ label: t(e.name), href: detail })),
  }));

  return (
    <main>
      <P id="conditions/hero">
        <HeroStatement
          tall={false}
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("Conditions")]} />}
          title={t("Conditions")}
          sub={t("Each condition leads to the programme that lists it. Where more than one programme lists a condition, the doctor recommends one after assessment.")}
        />
      </P>

      <P id="conditions/index">
        <Section space="bottom">
          <GroupedList columns={3} headingLevel={2} groups={groups} />
        </Section>
      </P>
    </main>
  );
}

Object.assign(window, { ConditionsScreen });
