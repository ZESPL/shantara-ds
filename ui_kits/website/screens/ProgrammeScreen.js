/* Programme detail — Detox sample (not the production site).
   HeroSplit → overview beside the booking panel → what to expect → doctors.
   The booking panel is the page's CTA, so there is no ClosingCTA (#35). */

const PROGRAMME_ID = "detox";

/* Three frames that are not the hero (water-wall): therapy, meals, the grounds.
   A keyboard-scrollable region on phones and tablets; every photo keeps its alt text. */
const GALLERY = [
  { name: "treatment", alt: "Treatment room" },
  { name: "dining-restaurant-valley-window", alt: "The dining room over the valley" },
  { name: "grounds-pond-building-path", alt: "Walking path beside the pond" },
];

const DAY_TIMES = [
  { time: "Morning", text: "Vitals and a short doctor review, then yoga therapy in the hall. Movement and breathwork are adapted to what you can manage that day." },
  { time: "Midday", text: "Therapy sessions may include mud therapy, hydrotherapy, massage or acupuncture, sequenced by the clinical team." },
  { time: "Afternoon", text: "Depending on your programme, the afternoon may include controlled sunlight, walking on the grounds, or time in the library." },
  { time: "Evening", text: "A meal planned for your programme, a mind-body session and an early night." },
];

const PLANNING = [
  { title: "Naturopathy programme", nights: "Typical duration varies by programme", lines: ["Planned with you after consultation", "Two therapy sessions a day, reviewed each morning", "Meals planned as part of the programme"] },
  { title: "Medical programme", nights: "Often a longer residential stay", lines: ["Planned by a doctor after reviewing your assessment", "A fuller daily plan of treatments and review", "Meals planned as a central part of the programme"] },
];

/* Swipeable row on phones and tablets (scroll-snap), three across when they fit. */
const STRIP_CSS = `
.sh-prog-strip{display:flex;gap:var(--grid-gap);overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scrollbar-width:none;margin-inline:calc(-1 * var(--layout-gutter));padding-inline:var(--layout-gutter);scroll-padding-inline:var(--layout-gutter)}
.sh-prog-strip::-webkit-scrollbar{display:none}
.sh-prog-strip:focus-visible{outline:none;box-shadow:var(--ring-focus)}
.sh-prog-strip>*{flex:0 0 max(calc((100% - 2 * var(--grid-gap)) / 3), min(78%, 22rem));scroll-snap-align:start}
@media (min-width:1000px){.sh-prog-strip{margin-inline:0;padding-inline:0}}
.sh-prog-name{margin:0;font:var(--type-title);color:var(--text-primary)}
.sh-prog-sub{margin:0 0 var(--space-3);font:var(--type-item-sm);color:var(--text-primary)}
.sh-prog-note{margin:0 0 var(--space-5);font:var(--type-body-sm);color:var(--text-brand)}
`;

function ensureProgrammeCss() {
  if (typeof document === "undefined" || document.getElementById("sh-prog-css")) return;
  const el = document.createElement("style");
  el.id = "sh-prog-css";
  el.textContent = STRIP_CSS;
  document.head.appendChild(el);
}

function ProgrammeScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Button, Radio, Breadcrumbs, MetaRow, Media, Section, HeroSplit, FormSplit, Statement, PlainList, TimeTable, PeopleRow } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  ensureProgrammeCss();
  const C = window.ShantaraContent;
  const programme = (C.programs || []).find((p) => p.id === PROGRAMME_ID) || { name: "Detox", durations: "7–21 nights", proposition: "" };
  const doctors = (C.doctors || []).map((d) => ({
    name: t(d.full_name),
    role: t(d.role),
    detail: d.qualification ? t(d.qualification) : undefined,
    src: d.photo_profile ? window.photoSrc(d.photo_profile) : undefined,
  }));
  const [len, setLen] = React.useState("14");
  const stack = { marginTop: "var(--section-y-sm)" };

  return (
    <main>
      <P id="programme/hero">
        <HeroSplit
          src={window.photoSrc((programme.featured_image || {}).src || "water-wall")}
          alt={t("Water wall at the therapy wing")}
          breadcrumbs={<Breadcrumbs items={[{ label: t("Programmes"), href: window.ShantaraLocales ? window.ShantaraLocales.kitHash(window.ShantaraI18n.currentLocaleCode(), "programme") : "#/en/programs" }, t(programme.name)]} />}
          title={t(programme.name)}
          meta={[t("Naturopathy programme"), programme.durations ? t(programme.durations) : null].filter(Boolean)}
          sub={t(programme.proposition)}
          actions={<Button size="lg" onClick={() => onNavigate("booking")}>{t("Book a Consultation")}</Button>}
        />
      </P>

      <P id="programme/overview">
      <Section ground="merino">
        <FormSplit
          aside={<>
            <div>
              <p className="sh-prog-name">{t(programme.name)}</p>
              <MetaRow style={{ marginTop: "var(--space-3)" }} items={[t("Consultation first"), programme.durations ? t(programme.durations) : null]} />
            </div>
            <div>
              <p className="sh-prog-sub" id="sh-prog-len">{t("Typical duration")}</p>
              <div role="radiogroup" aria-labelledby="sh-prog-len" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                {[["7", "7 nights", "a shorter stay"], ["14", "14 nights", "often recommended for this programme"], ["21", "21 nights", "for a longer residential stay"]].map(([v, l, d]) => (
                  <Radio key={v} card name="len" value={v} label={t(l)} description={t(d)} checked={len === v} onChange={() => setLen(v)} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Button fullWidth size="lg" onClick={() => onNavigate("booking")}>{t("Book a Consultation")}</Button>
              <Button fullWidth variant="secondary" onClick={() => onNavigate("tariffs")}>{t("View tariffs")}</Button>
            </div>
            <p style={{ margin: 0, font: "var(--type-body-sm)", color: "var(--text-secondary)" }}>{t("Your stay is confirmed after a doctor reviews your details.")}</p>
          </>}
        >
          <Statement size="title" sub={t("Your programme is planned after consultation and assessment. A doctor reviews it each morning and adjusts it where needed. If fasting is included, it is introduced gradually and supervised throughout. Meals are planned according to your programme and dietary requirements.")}>
            {t("Doctor-guided and drug-free. Supervised fasting may be included when your doctor considers it appropriate.")}
          </Statement>

          <div style={stack}>
            <Statement size="title" style={{ marginBottom: "var(--space-6)" }}>{t("Who this programme is for")}</Statement>
            <PlainList columns={1} rules items={[
              t("Feeling persistently heavy, sluggish or fatigued"),
              t("Digestive discomfort or an irregular appetite"),
              t("Wanting a supervised stay after a long period of irregular eating, travel or sleep"),
            ]} />
          </div>

          <div style={stack}>
            <Statement size="title" style={{ marginBottom: "var(--space-6)" }}>{t("What guests commonly report")}</Statement>
            <PlainList columns={2} rules items={["Feeling lighter and more alert", "Easier digestion and clearer appetite", "Better sleep and morning energy", "Less bloating"].map((s) => t(s))} />
          </div>

          <div style={stack}>
            <Statement size="title" style={{ marginBottom: "var(--space-6)" }}>{t("How programmes are planned")}</Statement>
            {PLANNING.map((col, i) => (
              <div key={col.title} style={i ? { marginTop: "var(--space-9)" } : undefined}>
                <h3 className="sh-prog-sub">{t(col.title)}</h3>
                <p className="sh-prog-note">{t(col.nights)}</p>
                <PlainList columns={1} rules size="sm" items={col.lines.map((line) => t(line))} />
              </div>
            ))}
          </div>
        </FormSplit>
      </Section>
      </P>

      <P id="programme/expect">
      <Section ground="stone">
        <Statement>{t("What to expect during your stay")}</Statement>
        <div className="sh-prog-strip" role="region" aria-label={t("Photographs of the retreat")} tabIndex={0} style={{ marginTop: "var(--stack-lg)" }}>
          {GALLERY.map((shot) => (
            <div key={shot.name}><Media src={window.photoSrc(shot.name)} alt={t(shot.alt)} ratio="4:3" /></div>
          ))}
        </div>
        <TimeTable style={{ marginTop: "var(--stack-lg)" }} rows={DAY_TIMES.map((r) => ({ time: t(r.time), title: t(r.text) }))} />
      </Section>
      </P>

      <P id="programme/doctors">
        <Section ground="merino">
          <PeopleRow title={t("Meet our doctors")} people={doctors} />
        </Section>
      </P>

    </main>
  );
}

Object.assign(window, { ProgrammeScreen });
