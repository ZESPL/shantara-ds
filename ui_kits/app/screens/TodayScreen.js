const SCHEDULE = [
  { time: "06:30", title: "Yoga therapy", where: "Yoga hall", kind: "Movement", state: "done" },
  { time: "08:00", title: "Prescribed breakfast", where: "Dining hall", kind: "Diet therapy", state: "done" },
  { time: "09:15", title: "Doctor consultation", where: "Consultation room 2", kind: "Clinical", state: "now", who: "Dr. Bahja Janu" },
  { time: "10:30", title: "Mud therapy", where: "Therapy wing, lower level", kind: "Therapy", state: "next" },
  { time: "12:30", title: "Prescribed lunch", where: "Dining hall", kind: "Diet therapy", state: "later" },
  { time: "16:00", title: "Hydrotherapy", where: "Therapy wing", kind: "Therapy", state: "later" },
  { time: "18:30", title: "Mind-body session", where: "Library terrace", kind: "Movement", state: "later" },
];

const STATE_TONE = { done: "var(--color-cotton-seed)", now: "var(--surface-brand)", next: "var(--color-gold-crayola)", later: "var(--color-pearl-bush)" };

function TodayScreen({ onTab, onOpen }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Logo, Card, Badge, Button, Icon, IconButton, Divider } = window.ShantaraDesignSystem_45bbe4;
  const now = SCHEDULE.find((s) => s.state === "now");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "var(--space-4)" }}>
        <Logo mark="icon" tone="olive" height={30} assetBase="../../assets" />
        <IconButton label={t("Messages from the care team")}><Icon name="bell" size={19} /></IconButton>
      </div>
      <div>
        <span className="shantara-eyebrow">{t("Day 6 of 14 · Detox")}</span>
        <h1 style={{ font: "var(--weight-light) var(--text-3xl)/1.1 var(--font-display)", margin: "var(--space-4) 0 0" }}>{t("Good morning,")}<br />Anjali</h1>
      </div>

      <Card padding="md" tone="brand" style={{ color: "var(--text-on-brand)" }}>
        <span className="shantara-eyebrow" style={{ color: "var(--color-gold-crayola)" }}>{t("Now · 09:15").replace("09:15", now.time)}</span>
        <h3 style={{ font: "var(--type-h4)", fontSize: "var(--text-lg)", color: "var(--text-on-brand)", margin: "var(--space-3) 0 var(--space-2)" }}>{t(now.title)}</h3>
        <p style={{ font: "var(--type-body-sm)", color: "color-mix(in srgb, var(--color-merino) 78%, transparent)", margin: 0 }}>{now.who} · {t(now.where)}</p>
        <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-5)" }}>
          <Button size="sm" variant="inverse">{t("Directions")}</Button>
          <Button size="sm" variant="accent" onClick={() => onTab("Programme")}>{t("My protocol")}</Button>
        </div>
      </Card>

      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
          <h2 style={{ font: "var(--type-h4)", fontSize: "var(--text-lg)" }}>{t("Today")}</h2>
          <span style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{t("Set by your doctor")}</span>
        </div>
        <Card padding="md" tone="raised">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SCHEDULE.map((s, i) => (
              <button key={s.time} type="button" onClick={onOpen} style={{ display: "flex", gap: "var(--space-5)", alignItems: "flex-start", textAlign: "start", border: 0, background: "transparent", cursor: "pointer", padding: "var(--space-4) 0", borderBottom: i < SCHEDULE.length - 1 ? "1px solid var(--border-subtle)" : "none", fontFamily: "var(--font-body)", minHeight: 44 }}>
                <span style={{ fontSize: "var(--text-sm)", fontVariantNumeric: "tabular-nums", color: s.state === "done" ? "var(--text-muted)" : "var(--text-primary)", width: 44, flex: "0 0 44px" }}>{s.time}</span>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: STATE_TONE[s.state], marginTop: 6, flex: "0 0 8px" }} />
                <span style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: s.state === "done" ? "var(--text-muted)" : "var(--text-primary)" }}>{t(s.title)}</span>
                  <span style={{ display: "block", fontSize: "var(--text-3xs)", color: "var(--text-muted)", marginTop: 2 }}>{t(s.kind)} · {t(s.where)}</span>
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 style={{ font: "var(--type-h4)", fontSize: "var(--text-lg)", marginBottom: "var(--space-4)" }}>{t("Open to you today")}</h2>
        <div style={{ display: "flex", gap: "var(--space-4)", overflowX: "auto", paddingBottom: 4 }}>
          {[["Hydrotherapy", "hydrotherapy-waiting", "Waiting area"], ["Walking trails", "grounds", "Cooler after 5pm"], ["Courtyard", "courtyard", "Heliotherapy 7–9am"]].map(([n, ph, m]) => (
            <div key={n} style={{ flex: "0 0 168px" }}>
              <Photo name={ph} alt={t(n)} height={120} radius="var(--radius-sm)" />
              <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", marginTop: "var(--space-3)" }}>{t(n)}</div>
              <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{t(m)}</div>
            </div>
          ))}
        </div>
      </div>

      <Card padding="md">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <Icon name="stethoscope" size={22} color="var(--text-brand)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)" }}>{t("Feeling unwell or unsure?")}</div>
            <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{t("Any symptom during a therapy goes to a doctor")}</div>
          </div>
          <Badge tone="info">{t("Call")}</Badge>
        </div>
      </Card>
    </div>
  );
}

function ProtocolScreen({ onOpen }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Tabs, Card, Badge, Icon, Divider } = window.ShantaraDesignSystem_45bbe4;
  const [view, setView] = React.useState("Therapies");
  const therapies = [
    ["Mud therapy", "Daily, 10:30", "treatment"],
    ["Hydrotherapy", "Daily, 16:00", "water-wall"],
    ["Yoga therapy", "Daily, 06:30", "courtyard"],
    ["Fasting therapy", "Days 8–10, supervised", "grounds"],
    ["Massage therapy", "Alternate days", "treatment"],
  ];
  const diet = [
    ["06:00", "Warm water with lime"], ["08:00", "Steamed millet, seasonal fruit"],
    ["11:00", "Tender coconut water"], ["12:30", "Brown rice, greens, buttermilk"],
    ["16:00", "Herbal infusion"], ["19:00", "Vegetable broth, sprouts"],
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", paddingTop: "var(--space-5)" }}>
      <h1 style={{ font: "var(--weight-light) var(--text-2xl)/1.1 var(--font-display)" }}>{t("Your protocol")}</h1>
      <Card padding="md" tone="sunken">
        <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
          {[["Detox", "programme"], ["14", "nights"], ["Day 6", "today"]].map(([n, l]) => (
            <div key={l}><div style={{ font: "var(--weight-light) var(--text-lg)/1 var(--font-display)" }}>{t(n)}</div><div className="shantara-eyebrow" style={{ marginTop: 6 }}>{t(l)}</div></div>
          ))}
        </div>
        <Divider spacing="var(--space-5)" />
        <p style={{ font: "var(--type-body-sm)", color: "var(--text-secondary)", margin: 0 }}>{t("Written by Dr. Bahja Janu after your consultation, reviewed every morning. Nothing here is chosen from a list.")}</p>
      </Card>
      <Tabs variant="pill" items={[{ value: "Therapies", label: t("Therapies") }, { value: "Diet", label: t("Diet") }]} value={view} onChange={setView} />
      <div key={view} className="sh-page-enter">
      {view === "Therapies" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {therapies.map(([n, when, ph]) => (
            <Card key={n} padding="sm" interactive onClick={onOpen}>
              <div style={{ display: "flex", gap: "var(--space-5)", alignItems: "center" }}>
                <Photo name={ph} alt="" height={76} radius="var(--radius-sm)" style={{ width: 76, flex: "0 0 76px" }} />
                <div style={{ flex: 1 }}>
                  <Badge tone="outline">{t("Prescribed")}</Badge>
                  <div style={{ fontSize: "var(--text-base)", fontWeight: "var(--weight-medium)", margin: "var(--space-2) 0 2px" }}>{t(n)}</div>
                  <div style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)" }}>{t(when)}</div>
                </div>
                <Icon name="chevron-right" size={18} color="var(--text-muted)" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card padding="md">
          {diet.map(([t, d], i) => (
            <div key={t} style={{ display: "flex", gap: "var(--space-5)", padding: "var(--space-4) 0", borderBottom: i < diet.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <span style={{ fontSize: "var(--text-sm)", fontVariantNumeric: "tabular-nums", color: "var(--text-muted)", width: 44, flex: "0 0 44px" }}>{t}</span>
              <span style={{ fontSize: "var(--text-sm)" }}>{t(d)}</span>
            </div>
          ))}
          <p style={{ fontSize: "var(--text-2xs)", color: "var(--text-muted)", margin: "var(--space-5) 0 0" }}>{t("Meals are part of the treatment. Please do not request substitutions or outside food.")}</p>
        </Card>
      )}
      </div>
    </div>
  );
}

Object.assign(window, { TodayScreen, ProtocolScreen, SCHEDULE });
