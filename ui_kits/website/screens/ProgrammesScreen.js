/* Programmes listing: HeroFullBleed (no button) → a full-width catalogue, one Tile row per
   programme (small thumbnail, name, audience summary, conditions as static Tags) → a centred
   "Explore all conditions" link. Nothing follows. The production page adds a centred condition
   search above the catalogue. Composition sample, not the production site (shantara.life D-217). */

function ProgrammesScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroFullBleed, Section, Tile, TextLink } = window.ShantaraDesignSystem_45bbe4;
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
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {programs.map((p) => (
              <li key={p.id} style={{ padding: "var(--space-6) 0", borderTop: "var(--border-width) solid var(--rule-color)" }}>
                <Tile
                  layout="thumb"
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
          <p style={{ margin: "var(--stack-lg) 0 0", textAlign: "center", maxWidth: "none" }}>
            <TextLink onClick={() => onNavigate("conditions")}>{t("Explore all conditions")}</TextLink>
          </p>
        </Section>
      </P>

    </main>
  );
}

Object.assign(window, { ProgrammesScreen });
