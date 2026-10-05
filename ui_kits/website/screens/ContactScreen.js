/* Contact — HeroStatement (rosette band) → address (NAP), distances and direct lines
   beside the entrance photograph → ClosingCTA (ground, Himalaya; the page has no other CTA). */

const CONTACT_DISTANCES = [
  { place: "Calicut International Airport", km: "28 km", mins: "55 min" },
  { place: "Kozhikode railway station", km: "14 km", mins: "30 min" },
];

function ContactScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, HeroStatement, SplitSection, Statement, SpecTable, TextLink, ClosingCTA, Button, Icon } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const c = window.siteContact();
  const home = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "home") : "#/en/";
  const trackContact = (method, where) => L && L.track("contact_click", { contact_method: method, page_type: "contact", cta_location: where });
  const linkStyle = { display: "inline-flex", alignItems: "center", gap: "var(--space-3)", minHeight: "var(--tap-min)", font: "var(--type-body)", fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" };
  return (
    <main>
      <P id="contact/hero">
        <HeroStatement
          tall={false}
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("Contact")]} />}
          title={t("How to reach the retreat")}
          sub={t("Address, telephone, email and WhatsApp. To book a consultation, send your details and our team will be in touch.")}
          pattern="end"
        />
      </P>

      <P id="contact/details">
        <SplitSection src={window.photoSrc("exterior-entrance-dusk-driveway")} alt={t("The entrance drive at dusk")} ground="stone" align="center">
          <Statement meta={[c.name]} sub={t("A hilltop above the Chennamangallur valley. Airport and railway transfers are included with a confirmed stay. Details follow after consultation.")}>
            {t("Chennamangallur, Kozhikode, Keralam, India - 673602")}
          </Statement>
          <SpecTable
            caption={t("Distances and transfer times")}
            columns={[
              { key: "place", label: t("From") },
              { key: "km", label: t("Distance"), accent: true, align: "end" },
              { key: "mins", label: t("Time"), align: "end" },
            ]}
            rows={CONTACT_DISTANCES.map((d) => ({ place: t(d.place), km: d.km, mins: d.mins }))}
          />
          <div>
            <Statement as="h2" size="h4">{t("Call, WhatsApp or email")}</Statement>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "var(--space-3)" }}>
              <a className="shantara-dir-ltr" style={linkStyle} href={c.tel} onClick={() => trackContact("phone", "inline")}><Icon name="phone" size={18} />{c.phone}</a>
              <a style={linkStyle} href={c.whatsapp} target="_blank" rel="noopener" onClick={() => trackContact("whatsapp", "inline")}><Icon name="message-circle" size={18} />{t("WhatsApp")} <span className="shantara-dir-ltr">{c.phone}</span></a>
              <a className="shantara-dir-ltr" style={linkStyle} href={"mailto:" + c.email} onClick={() => trackContact("email", "inline")}><Icon name="mail" size={18} />{c.email}</a>
            </div>
          </div>
          <div className="sh-actions">
            <TextLink onClick={() => onNavigate("tariffs")}>{t("View tariffs")}</TextLink>
          </div>
        </SplitSection>
      </P>

      <P id="contact/closing">
        <ClosingCTA
          variant="ground"
          ground="himalaya"
          title={t("Share your name and a number we can reach.")}
          sub={t("To book a consultation, send your details and our team will be in touch.")}
          action={<Button size="lg" onClick={() => { if (L) L.track("consultation_cta_click", { page_type: "contact", content_id: "contact", content_name: "Contact", cta_location: "closing" }); onNavigate("booking"); }}>{t("Book a Consultation")}</Button>}
        />
      </P>
    </main>
  );
}

Object.assign(window, { ContactScreen });
