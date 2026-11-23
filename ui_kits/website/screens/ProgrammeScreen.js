/* Programme detail sample (not the production site). Structure follows shantara.life
   D-241 and D-302: a programme is a few fields plus one Markdoc body.
   HeroFullBleed (name + lead) → the body beside a panel (programme length, conditions,
   Make an Enquiry, rates) → three links → medical team → FAQ → related programmes → ClosingCTA.
   The body's headings, in order: Programme overview, Therapeutic focus, Programme stages,
   Treatments and meals (Therapeutic treatments, The daily rhythm, Therapeutic meals),
   Programme suitability (Suitable starting points, Before booking).
   The sample body below shows the outline only; real text lives in each programme's record. */

const PROGRAMME_ID = "advanced-detox-cellular-cleansing";

const SAMPLE_BODY = `
<h2 id="programme-overview">Programme overview</h2>
<p>A short opening on the area of health the programme addresses and why everyday habits matter for it.</p>
<p>A second paragraph on how an individual medical assessment shapes the daily programme.</p>
<h3 id="therapeutic-focus">Therapeutic focus</h3>
<ul>
  <li><strong>Meals.</strong> One line on the role of meals.</li>
  <li><strong>Movement.</strong> One line on physical activity suited to the guest.</li>
  <li><strong>Rest.</strong> One line on sleep and relaxation.</li>
</ul>
<h2 id="programme-stages">Programme stages</h2>
<p>One sentence on how the stages progress.</p>
<ol>
  <li><strong>Reviewing reports.</strong> A Shantara doctor reviews reports and medicines before the programme is confirmed.</li>
  <li><strong>Setting priorities.</strong> The doctor and guest agree what the programme focuses on.</li>
  <li><strong>Daily practice.</strong> Meals, therapies, movement and rest follow the plan.</li>
  <li><strong>A plan for home.</strong> A written plan for continuing at home.</li>
</ol>
<h2 id="treatments-and-meals">Treatments and meals</h2>
<h3 id="therapeutic-treatments">Therapeutic treatments</h3>
<ul><li><strong>Diet therapy.</strong> The therapy's role on this programme.</li></ul>
<h3 id="the-daily-rhythm">The daily rhythm</h3>
<ul>
  <li><strong>Morning.</strong> What the morning holds on this programme.</li>
  <li><strong>Afternoon.</strong> What the afternoon holds.</li>
  <li><strong>Evening.</strong> What the evening holds.</li>
</ul>
<h3 id="therapeutic-meals">Therapeutic meals</h3>
<p>Plant-based meals planned for the programme.</p>
<h2 id="programme-suitability">Programme suitability</h2>
<p>Who the programme is designed for.</p>
<h3 id="before-booking">Before booking</h3>
<ul>
  <li><strong>Medical assessment.</strong> Conditions that need review by a Shantara doctor before the programme is confirmed.</li>
  <li><strong>Programme scope.</strong> What falls outside the programme.</li>
</ul>
<p>Prescribed medicines and treatments continue during the programme.</p>
`;

const LINKS = [
  { label: "Explore a day at Shantara", to: "day" },
  { label: "Read about naturopathy suitability", to: "naturopathy" },
  { label: "Learn about continuity of care", to: "naturopathy" },
];

function ProgrammeScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Button, Section, HeroFullBleed, FormSplit, Prose, TextLink, Statement, PeopleRow, FaqSection, ClosingCTA, Breadcrumbs } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const C = window.ShantaraContent;
  const programme = (C.programs || []).find((p) => p.id === PROGRAMME_ID) || { name: "Advanced Detox & Cellular Cleansing", proposition: "" };
  const lead = programme.lead || programme.proposition || "";
  const length = window.nightsLabel ? window.nightsLabel((programme.durations || []).slice(0, 1)) : "";
  const conditions = (programme.conditions || []).map((id) => {
    const c = (C.conditions || []).find((x) => x.id === id);
    return c ? t(c.name) : null;
  }).filter(Boolean);
  /* Every doctor, the Medical Director first. Fixed on the page, not a programme field. */
  const doctors = (C.doctors || []).slice().sort((a, b) => (b.id === "bahja-janu") - (a.id === "bahja-janu")).map((d) => ({
    name: t(d.full_name),
    role: t(d.role),
    src: d.photo_profile ? window.photoSrc(d.photo_profile) : undefined,
  }));
  const rule = { marginTop: "var(--section-y-sm)", paddingTop: "var(--section-y-sm)", borderTop: "var(--border-width) solid var(--rule-color)" };

  return (
    <main>
      <P id="programme/hero">
        <HeroFullBleed
          src={window.photoSrc((programme.featured_image || {}).src || "water-wall")}
          alt={t((programme.featured_image || {}).alt || "Water wall at the therapy wing")}
          breadcrumbs={<Breadcrumbs items={[{ label: t("Programmes"), href: "#/en/programmes" }, t(programme.name)]} />}
          title={t(programme.name)}
          sub={lead ? t(lead) : undefined}
        />
      </P>

      <P id="programme/body">
        <Section ground="merino">
          <FormSplit
            aside={<>
              <Statement as="h2" size="h4">{t("Learn more about the programme")}</Statement>
              {length ? <p style={{ margin: 0, font: "var(--type-body-sm)" }}>{t("Programme length")}: {t(length)}</p> : null}
              {conditions.length ? (
                <ul style={{ margin: 0, paddingInlineStart: "1.2em", font: "var(--type-body-sm)" }}>{conditions.map((c) => <li key={c}>{c}</li>)}</ul>
              ) : null}
              <Button fullWidth size="lg" onClick={() => onNavigate("booking")}>{t("Make an Enquiry")}</Button>
              <Button fullWidth variant="secondary" onClick={() => onNavigate("tariffs")}>{t("Rates and inclusions")}</Button>
              <p style={{ margin: 0, font: "var(--type-caption)", color: "var(--text-secondary)" }}>{t("Programme and length are confirmed by the doctor after assessment.")}</p>
            </>}
          >
            <Prose html={SAMPLE_BODY} />
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3) var(--space-6)", margin: "var(--space-6) 0 0", padding: "var(--space-6) 0 0", listStyle: "none", borderTop: "var(--border-width) solid var(--rule-color)" }}>
              {LINKS.map((l) => <li key={l.label}><TextLink onClick={() => onNavigate(l.to)}>{t(l.label)}</TextLink></li>)}
            </ul>
            <div style={rule}>
              <PeopleRow title={t("Medical team")} people={doctors} />
            </div>
            <div style={rule}>
              <FaqSection title={t("Frequently asked questions")} items={(programme.faqs || []).map((f) => ({ question: t(f.question), answer: t(f.answer) }))} />
            </div>
          </FormSplit>
        </Section>
      </P>

      <P id="programme/closing">
        <ClosingCTA title={t("Begin your transformation with Shantara")} action={<Button size="lg" onClick={() => onNavigate("booking")}>{t("Make an Enquiry")}</Button>} />
      </P>
    </main>
  );
}

Object.assign(window, { ProgrammeScreen });
