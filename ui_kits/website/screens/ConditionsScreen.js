/* Conditions — HeroStatement → text index of conditions by group → a quiet
   panorama → the rest of the index → ClosingCTA (photo; the page has no other CTA).
   No photographs in the list: a condition is not a room or a meal. */

function conditionListingGroups() {
  const items = (window.ShantaraContent.conditions || []).filter((c) => c.category && c.summary);
  const order = ["Metabolic", "Hormonal", "Musculoskeletal"];
  return order
    .map((name) => ({
      name,
      items: items
        .filter((c) => c.category === name)
        .map((c) => ({ name: c.name, copy: c.summary })),
    }))
    .filter((g) => g.items.length);
}

function ConditionsScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroStatement, Section, IndexList, PanoramaCaption, ClosingCTA, Button } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const home = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "home") : "#/en/";
  const programmeHref = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "programme") : undefined;
  const groups = conditionListingGroups().map((g) => ({
    label: t(g.name),
    items: g.items.map((item) => ({ title: t(item.name), text: t(item.copy), href: programmeHref, onClick: (e) => { e.preventDefault(); onNavigate("programme"); } })),
  }));
  return (
    <main>
      <P id="conditions/hero">
        <HeroStatement
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("Conditions")]} />}
          title={t("Conditions we commonly see")}
          sub={t("Our doctors see guests with a range of long-standing conditions. Programmes are planned after consultation and assessment.")}
        />
      </P>

      {/* The panorama sits midway through the index as a pause; the list itself has no photographs. */}
      <P id="conditions/index">
        <Section space="bottom">
          <IndexList groups={groups.slice(0, 1)} columns={1} />
        </Section>
      </P>

      {groups.length > 1 ? (
        <>
          <P id="conditions/panorama">
            <PanoramaCaption src={window.photoSrc("grounds-pond-building-path")} alt={t("A path past the pond on the grounds at Shantara")} />
          </P>
          <P id="conditions/index-more">
            <Section>
              <IndexList groups={groups.slice(1)} columns={1} />
            </Section>
          </P>
        </>
      ) : null}

      <P id="conditions/closing">
        <ClosingCTA
          variant="photo"
          src={window.photoSrc("exterior-entrance-dusk-lit-canopy")}
          alt={t("The entrance canopy at dusk")}
          title={t("Share your name and a number we can reach.")}
          sub={t("Our team will contact you to arrange a consultation.")}
          action={<Button size="lg" onClick={() => { if (L) L.track("consultation_cta_click", { page_type: "conditions", content_id: "conditions", content_name: "Conditions", cta_location: "closing" }); onNavigate("booking"); }}>{t("Book a Consultation")}</Button>}
          contact={window.siteContactItems(t)}
        />
      </P>
    </main>
  );
}

Object.assign(window, { ConditionsScreen });
