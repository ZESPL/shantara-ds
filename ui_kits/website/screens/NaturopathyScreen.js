/* Naturopathy: composition sample (not the production site). shantara.life D-219, as amended
   by the redesign (D-221): the order of ideas is unchanged, and photographs carry the page.
   HeroFullBleed → principles (boxed SplitSection, then PlainList marker="numeral") → practice
   (intro, two boxed SplitSection chapters on alternate sides, one Tile) → PanoramaCaption
   (reveal) → the stay opening → BandStatement (the one accent) → SpecTable variant="contrast"
   (reveal) and the medication note → treatments (boxed SplitSection) → doctors (PeopleRow) →
   NumeralsSplit (the minimum stay) → the website's one closing CTA (photo, owner copy, no
   contact row; website D-222).
   Copy is the site's owner-approved copy (src/copy/en/naturopathy.ts); the herbal record is
   left out until the doctors sign it off. Two reveals, one full-bleed hero, one band. */

const NATUROPATHY_PRINCIPLES = [
  "Treatment that supports normal body functions, such as digestion, sleep and circulation.",
  "Looking at diet, sleep, activity and stress, as well as symptoms.",
  "The gentlest approach that is effective.",
  "Doctors explain each part of the programme, so guests understand what they are doing and why.",
  "Assessing overall health, not only the problem a guest came with.",
  "Building habits guests can keep up at home.",
];

const NATUROPATHY_COMPARE = [
  ["Healthy habits fitted around everyday life", "A daily schedule planned around the treatment"],
  ["Changes planned independently", "A programme planned by a doctor after assessment, and reviewed during the stay"],
  ["Meals planned and cooked at home", "Meals cooked for the programme"],
  ["Simple natural practices using what is at hand", "Treatments given by trained therapists in treatment rooms"],
  ["Fasting only with appropriate medical guidance", "Fasting assessed and supervised by the doctor"],
  ["Medication managed with the treating doctor", "Current medication reviewed as part of the assessment"],
];

const NATUROPATHY_TREATMENTS = [
  { label: "Mud therapy", text: "Packs and wraps of prepared mud, applied to a set method." },
  { label: "Hydrotherapy", text: "Baths, packs and compresses using water at set temperatures." },
  { label: "Fasting therapy", text: "A fast of a type and length set by the doctor." },
  { label: "Heliotherapy", text: "Timed sessions in sunlight, at hours set by the therapist." },
];

function naturopathyDoctors() {
  return (window.ShantaraContent.doctors || []).map((d) => ({
    name: d.full_name,
    role: d.role,
    src: d.photo_profile ? window.photoSrc(d.photo_profile) : undefined,
  }));
}

function NaturopathyScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Button, Section, HeroFullBleed, SplitSection, Statement, PlainList, Prose, Tile, PanoramaCaption, BandStatement, SpecTable, GroupedList, PeopleRow, NumeralsSplit, TextLink, ClosingCTA } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  return (
    <main>
      <P id="naturopathy/hero">
        <HeroFullBleed
          src={window.photoSrc("grounds-pebble-path-barefoot-walking-landscape-3x2")}
          alt={t("Bare feet on a pebble path through the grounds")}
          title={t("Naturopathy at Shantara")}
          sub={t("Naturopathy uses diet, fasting, water, mud, sunlight, exercise and rest as treatment. At Shantara, a doctor plans each guest's programme and reviews it during the stay.")}
        />
      </P>

      <P id="naturopathy/philosophy">
        <SplitSection bleed={false} mediaSide="end" split="40" src={window.photoSrc("yoga-meditation-aerial-cobblestone-circle-cross-legged-guest-landscape-3x2")} alt={t("A guest sits cross-legged at the centre of a cobblestone circle")} mobileRatio="4:5">
          <Statement sub={t("Naturopathy is one of the systems of medicine under India’s Ministry of AYUSH. At Shantara, it is practised by doctors with a BNYS degree. Their work follows six principles.")}>
            {t("Principles of naturopathy at Shantara")}
          </Statement>
        </SplitSection>
        <Section ground="merino" style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: "var(--layout-narrow)", display: "flex", flexDirection: "column", gap: "var(--stack-lg)" }}>
            <PlainList marker="numeral" items={NATUROPATHY_PRINCIPLES.map((p) => t(p))} />
            <Prose>
              <p>{t("Treatment uses natural therapies. Supplements are not part of the programme.")}</p>
              <p>{t("Naturopathy and Ayurveda are separate systems, with different training and methods.")}</p>
            </Prose>
          </div>
        </Section>
      </P>

      <P id="naturopathy/practice">
        <Section ground="stone" style={{ paddingBottom: 0 }}>
          <Statement sub={t("Each day includes meals, yoga, therapies and time to rest.")}>{t("How naturopathy is practised at Shantara")}</Statement>
        </Section>
        <SplitSection bleed={false} ground="stone" src={window.photoSrc("food-spread-five-plates-restaurant-wide-landscape-3x2")} alt={t("Five plates of food set out on a restaurant table")}>
          <Statement size="title" sub={t("Plant-based meals cooked from the farm's produce and planned around each guest's programme.")}>{t("Meals and the farm")}</Statement>
        </SplitSection>
        <SplitSection bleed={false} ground="stone" mediaSide="end" src={window.photoSrc("yoga-asana-balasana-childs-pose-studio-guest-landscape-3x2")} alt={t("A person folds forward in child's pose on a mat beside sunlit curtains")}>
          <Statement size="title" sub={t("Daily yoga, breathing exercises and walks, at a level suited to each guest.")}>{t("Yoga and movement")}</Statement>
        </SplitSection>
        <Section ground="stone" style={{ paddingTop: 0 }}>
          <Tile layout="row" src={window.photoSrc("courtyard")} alt="" title={t("A day at the retreat")} text={t("From morning yoga to evening rest, each day follows a planned routine.")} onClick={() => onNavigate("experience")} />
        </Section>
      </P>

      <P id="naturopathy/stay">
        <div data-reveal="">
        <PanoramaCaption bleed={false} src={window.photoSrc("courtyard-water-wall-golden-hour-reading-guest-landscape-3x2")} position="45% 55%" alt={t("A guest reads beside the courtyard water wall in low evening sun")} title={t("The courtyard water wall at golden hour")} />
        </div>
        <Section ground="merino">
          <div style={{ maxWidth: "var(--layout-narrow)", display: "flex", flexDirection: "column", gap: "var(--stack-lg)" }}>
            <Statement>{t("What a stay at Shantara adds")}</Statement>
            <Prose><p>{t("Much of naturopathy can be done at home: simple meals, regular sleep, time outdoors, daily exercise and breathing exercises.")}</p></Prose>
          </div>
        </Section>
      </P>

      <P id="naturopathy/stay-accent">
        <BandStatement>
          <Statement>{t("A stay adds a doctor’s assessment, treatments given by trained therapists, and a daily schedule planned for each guest.")}</Statement>
        </BandStatement>
      </P>

      <P id="naturopathy/stay-detail">
        <Section ground="merino">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--stack-lg)" }}>
            <div data-reveal="">
              <SpecTable
                variant="contrast"
                showHeader
                caption={t("Naturopathy at home and at Shantara")}
                columns={[{ key: "home", label: t("At home") }, { key: "shantara", label: t("At Shantara"), accent: true }]}
                rows={NATUROPATHY_COMPARE.map(([home, shantara]) => ({ home: t(home), shantara: t(shantara) }))}
              />
            </div>
            <Prose style={{ maxWidth: "var(--layout-narrow)" }}><p>{t("Continue any prescribed medication unless your treating doctor advises a change. Shantara's doctors work alongside each guest's treating doctor and do not replace them.")}</p></Prose>
          </div>
        </Section>
      </P>

      <P id="naturopathy/treatments">
        <SplitSection bleed={false} ground="stone" split="40" src={window.photoSrc("treatment-bath-corridor-cubicles")} alt={t("The corridor of bath cubicles in the treatment wing")}>
          <Statement size="title" sub={t("The doctor decides which treatments each guest has. Trained therapists give mud therapy, hydrotherapy and heliotherapy. The doctor supervises fasting.")}>{t("Treatments at Shantara")}</Statement>
          <GroupedList headingLevel={3} groups={[{ label: t("Treatments at Shantara"), items: NATUROPATHY_TREATMENTS.map((x) => ({ label: t(x.label), text: t(x.text) })) }]} />
        </SplitSection>
      </P>

      <P id="naturopathy/doctors">
        <Section ground="merino">
          <PeopleRow
            title={t("Every programme is planned by a doctor with a BNYS (Bachelor of Naturopathy and Yogic Sciences) degree.")}
            people={naturopathyDoctors().map((p) => ({ ...p, role: t(p.role) }))}
            action={<TextLink onClick={() => onNavigate("about")}>{t("Meet our doctors")}</TextLink>}
          />
        </Section>
      </P>

      <P id="naturopathy/rhythm">
        <Section ground="stone">
          <NumeralsSplit
            title={t("Changes to diet, sleep and exercise take time to become routine.")}
            sub={t("Programmes have a minimum length of 7 nights for this reason.")}
            numerals={[{ value: "7", label: t("nights minimum") }]}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2) var(--space-8)", marginTop: "var(--stack-lg)" }}>
            <TextLink onClick={() => onNavigate("programmes")}>{t("Explore programmes")}</TextLink>
          </div>
        </Section>
      </P>

      <P id="naturopathy/closing">
        <ClosingCTA
          variant="photo"
          bleed={false}
          src={window.photoSrc("lobby-valley")}
          alt={t("The lounge window over the valley")}
          title={t("Begin your transformation journey with Shantara")}
          sub={t("Meaningful change begins with understanding your health. Share your goals with us, and our team will help you explore how Shantara's programmes and personalised care can support your transformation.")}
          action={<Button size="lg" onClick={() => onNavigate("booking")}>{t("Make an Inquiry")}</Button>}
        />
      </P>
    </main>
  );
}

Object.assign(window, { NaturopathyScreen });
