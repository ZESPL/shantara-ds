/* Experience — composition sample (not the production site).
   HeroFullBleed → what a day may include → a typical day → the setting → parts of a stay →
   ClosingCTA (photo; the page has no other CTA). */

const EXPERIENCES = [
  { title: "Treatments and therapies", copy: "Your doctor may recommend therapies based on your assessment and programme.", photo: "treatment", alt: "Treatment room", view: "programme" },
  { title: "Accommodation", copy: "Five room categories, from quiet valley rooms to suites with balcony access.", photo: "room-premium", alt: "A room with a balcony over the valley", view: "tariffs" },
  { title: "Meals during your stay", copy: "Meals are planned as part of your programme, taking into account your doctor's recommendations and dietary requirements.", photo: "dining", alt: "The dining room", view: "booking" },
  { title: "Daily schedule", copy: "Morning review, therapies, meals, walking or quiet time, then an early night.", photo: "grounds-pond-building-path", alt: "A path beside the pond on the grounds", view: "programme" },
];

const DAY_STEPS = [
  { title: "Morning", text: "Vitals and a doctor review before the day begins" },
  { title: "Midday", text: "Therapies sequenced for your programme" },
  { title: "Evening", text: "Programme meals, quiet time, and an early night" },
];

/* Day rhythm for this page — shorter leads than the programme detail timetable. */
const DAY_TIMES = [
  { time: "Morning", text: "Vitals, a short doctor review, then movement in the yoga hall adapted to that day." },
  { time: "Midday", text: "Mud, hydrotherapy, massage or acupuncture when your doctor has planned them." },
  { time: "Afternoon", text: "Sunlight, a walk on the grounds, or quiet time in the library — as your plan allows." },
  { time: "Evening", text: "A programme meal, a mind-body session when scheduled, then rest." },
];

function ExperienceScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Button, Breadcrumbs, Section, HeroFullBleed, Statement, NumberedSteps, SplitSection, TimeTable, PanoramaCaption, TileGrid, Tile, ClosingCTA } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  return (
    <main>
      <P id="experience/hero">
        <HeroFullBleed
          height="tall"
          src={window.photoSrc("courtyard")}
          position="center 80%"
          mobilePosition="center"
          alt={t("The planted courtyard")}
          title={t("A day at Shantara")}
          sub={t("Consultations, therapies, meals, movement and rest — reviewed each morning by your doctor.")}
        />
      </P>

      <P id="experience/day">
        <Section ground="merino" style={{ paddingTop: "var(--section-y-sm)" }}>
          <Breadcrumbs style={{ marginBottom: "var(--stack-lg)" }} items={[{ label: t("Home"), href: window.ShantaraLocales ? window.ShantaraLocales.kitHash(window.ShantaraI18n.currentLocaleCode(), "home") : "#/en/" }, t("Experience")]} />
          <Statement sub={t("A typical day is planned by your doctor and reviewed each morning. It may include a consultation, therapies, meals, movement, rest and personal time.")}>
            {t("What a day may include")}
          </Statement>
          <NumberedSteps style={{ marginTop: "var(--stack-lg)" }} columns={1} items={DAY_STEPS.map((s) => ({ title: t(s.title), text: t(s.text) }))} />
        </Section>
      </P>

      <P id="experience/timetable">
        <SplitSection ground="stone" mediaSide="end" src={window.photoSrc("activity-hall-yoga-studio-empty")} alt={t("The yoga hall")}>
          <Statement size="title">{t("A typical day")}</Statement>
          <TimeTable rows={DAY_TIMES.map((r) => ({ time: t(r.time), title: t(r.text) }))} />
        </SplitSection>
      </P>

      <P id="experience/setting">
        <PanoramaCaption
          src={window.photoSrc("valley")}
          alt={t("The lounge window over the valley")}
          title={t("Overlooking the Chennamangallur valley")}
        />
      </P>

      <P id="experience/stay">
        <Section ground="merino">
          <TileGrid layout="2">
            {EXPERIENCES.map((item) => (
              <Tile key={item.title} src={window.photoSrc(item.photo)} alt={t(item.alt)} title={t(item.title)} text={t(item.copy)} onClick={() => onNavigate(item.view)} />
            ))}
          </TileGrid>
        </Section>
      </P>

      <P id="experience/closing">
        <ClosingCTA
          variant="photo"
          src={window.photoSrc("terrace-cafe-wave-ceiling-valley")}
          alt={t("The terrace café over the valley")}
          title={t("Share your name and a number we can reach.")}
          sub={t("Our team will contact you to arrange a consultation.")}
          action={<Button size="lg" onClick={() => onNavigate("booking")}>{t("Book a Consultation")}</Button>}
          contact={window.siteContactItems(t)}
        />
      </P>
    </main>
  );
}

Object.assign(window, { ExperienceScreen });
