/* Rates and currencies are not stored in this design system. The production site reads them
   from its Keystatic Tariffs collection, one page per currency at /en/tariff/{code}
   (/en/tariff redirects to one of them); this sample shows the structure with "—" cells.
   A money column names its currency once, in its title ("Single (INR)"); cells show the
   amount alone with two decimal places ("14,200.00") (RATE-02). */
const TARIFF_ROOM_ORDER = ["executive-suite", "junior-suite", "premium-room", "superior-room", "standard-room"];

function tariffRooms() {
  const rooms = window.ShantaraContent.rooms || [];
  return TARIFF_ROOM_ORDER.map((id) => rooms.find((r) => r.id === id)).filter(Boolean);
}

function tariffRecord() {
  return window.ShantaraContent.tariff || {};
}

/* One photograph per room on this page, and none of them the hero frame. */
const TARIFF_ROOM_PHOTOS = {
  "executive-suite": "suite-living-balcony-empty",
  "junior-suite": "room-bedroom-forest-view-armchair",
  "premium-room": "room-premium",
  "superior-room": "balcony",
  "standard-room": "room-twin",
};

/* Tariff: HeroFullBleed → rates (currency links, rate table, notes) → what the rate includes
   with a link to Therapies and treatments, then the one action → supplements and exclusions → payment →
   cancellation and date changes → room tiles. The production H1 is "All-inclusive package
   rates · {currency}", for example "· Indian rupee (INR)", with no meta row. The action
   follows the inclusions, so there is no ClosingCTA (#35). The tariff never shows the room
   count. Currencies are a row of plain links, one per Tariffs entry; each carries ?set=1 so
   the edge remembers the choice (skill-ia.md#tariff).
   Everything stacks in one reading column, one group per row: no aside, no FormSplit (it
   holds the consultation form only), no list in columns, every table in one type size
   (skill-sections.md, "One piece of information per row"). A room's size and features sit on
   its tile, not in the rate table. */
function TariffScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Button, Breadcrumbs, HeroFullBleed, Section, SpecTable, Statement, PlainList, TileGrid, Tile, Media, TextLink } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const home = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "home") : "#/en/";
  const cancellation = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "cancellation") : "#/en/cancellation";
  const therapies = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "therapies") : "#/en/therapies";
  /* Production: one link per Tariffs entry, in `order`, the current one marked aria-current.
     The sample holds no currencies, so it shows one placeholder. */
  const currencies = [{ code: "—", href: "#", current: true }];
  const rooms = tariffRooms();
  const tariff = tariffRecord();
  const book = (where) => () => { if (L) L.track("consultation_cta_click", { page_type: "tariff", content_id: "tariff", content_name: "All-inclusive package rates", cta_location: where }); onNavigate("booking"); };
  const note = { margin: 0, font: "var(--type-body)", color: "var(--text-secondary)", maxWidth: "var(--measure-body)" };
  const column = { maxWidth: "var(--layout-narrow)", display: "flex", flexDirection: "column", gap: "var(--section-y-sm)" };
  const group = { display: "flex", flexDirection: "column", gap: "var(--stack-lg)" };
  return (
    <main>
      <P id="tariff/hero">
        <HeroFullBleed
          height="tall"
          src={window.photoSrc("room-bedroom-desk-balcony-view")}
          alt={t("A bedroom with a desk and a balcony view")}
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("Tariff")]} />}
          title={t("All-inclusive package rates") + " · —"}
          sub={t("One nightly rate covers your room, meals, daily consultations and the treatments your doctor prescribes.")}
        />
      </P>

      <P id="tariff/rates">
        <Section>
          <div style={column}>
            <div style={group}>
              <nav aria-label={t("Show rates in")} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <span style={{ font: "var(--type-body)", color: "var(--text-secondary)" }}>{t("Show rates in")}</span>
                <span style={{ display: "flex", flexWrap: "wrap", gap: "0 var(--space-5)" }}>
                  {currencies.map((c) => (
                    <a key={c.code} href={c.href} aria-current={c.current ? "page" : undefined} style={{ font: "var(--type-body)", minHeight: "var(--tap-min)", display: "inline-flex", alignItems: "center", color: c.current ? "var(--text-primary)" : "var(--text-link)" }}>{c.code}</a>
                  ))}
                </span>
              </nav>
              <SpecTable
                showHeader
                caption={t("Nightly rates, per room, including all taxes")}
                columns={[
                  { key: "name", label: t("Room") },
                  { key: "single", label: t("Single") + " (—)", accent: true, align: "end", mobileLabel: true },
                  { key: "double", label: t("Double") + " (—)", accent: true, align: "end", mobileLabel: true },
                ]}
                rows={rooms.map((r) => ({ name: t(r.name), single: "—", double: "—" }))}
              />
              {(tariff.publicNotes || []).map((line, i) => <p key={i} style={note}>{t(line)}</p>)}
            </div>
          </div>
        </Section>
      </P>

      <P id="tariff/includes">
        <Section space="bottom">
          <div style={column}>
            <div style={group}>
              <Statement as="h2">{t("What the nightly rate includes")}</Statement>
              <PlainList columns={1} items={(tariff.includes || []).map((line) => t(line))} />
              {/* The therapies have their own page; the tariff links to it and never lists them. */}
              <div><TextLink href={therapies}>{t("See all therapies and treatments")}</TextLink></div>
            </div>
            <div><Button size="lg" onClick={book("inline")}>{t("Book Consultation")}</Button></div>
          </div>
        </Section>
      </P>

      <P id="tariff/charges">
        <Section space="bottom">
          <div style={column}>
            <div style={group}>
              <Statement as="h2">{t("Additional charges")}</Statement>
              <SpecTable
                showHeader
                columns={[
                  { key: "label", label: t("Charge") },
                  { key: "basis", label: t("Charged"), mobileLabel: true },
                  { key: "amount", label: t("Amount") + " (—)", accent: true, align: "end", mobileLabel: true },
                ]}
                rows={(tariff.supplements || []).map((s) => ({ label: t(s.label), basis: t(s.basis), amount: "—" }))}
              />
            </div>
            <div style={group}>
              <Statement as="h3" size="title">{t("Not included in the rate")}</Statement>
              <PlainList columns={1} items={(tariff.excludes || []).map((line) => t(line))} />
            </div>
          </div>
        </Section>
      </P>

      <P id="tariff/payment">
        <Section space="bottom">
          <div style={column}>
            <div style={group}>
              <Statement as="h2">{t("Payment")}</Statement>
              <SpecTable
                showHeader
                columns={[
                  { key: "booked", label: t("When you book") },
                  { key: "now", label: t("At confirmation"), mobileLabel: true },
                  { key: "balance", label: t("Balance"), mobileLabel: true },
                ]}
                rows={(tariff.paymentTerms || []).map((p) => ({ booked: t(p.bookedBefore), now: p.atConfirmation, balance: t(p.balance) }))}
              />
            </div>
          </div>
        </Section>
      </P>

      <P id="tariff/cancellation">
        <Section space="bottom">
          <div style={column}>
            <div style={group}>
              <Statement as="h2">{t("Cancellation and date changes")}</Statement>
              <SpecTable
                showHeader
                columns={[
                  { key: "when", label: t("When you cancel") },
                  { key: "refund", label: t("Refund"), mobileLabel: true },
                ]}
                rows={(tariff.cancellation || []).map((c) => ({ when: t(c.cancelledBefore), refund: t(c.refund) }))}
              />
              <div><TextLink href={cancellation}>{t("Read the full cancellation policy")}</TextLink></div>
            </div>
          </div>
        </Section>
      </P>

      <P id="tariff/rooms">
        <Section space="bottom">
          {/* Five categories: layout "2" puts the first across the full width and the other
              four in two even rows, so no row is left half empty. */}
          <TileGrid layout="2" title={t("The rooms")}>
            {rooms.map((r, i) => (
              <Tile key={r.id} media={<Media src={window.photoSrc(TARIFF_ROOM_PHOTOS[r.id] || "room-twin")} alt="" ratio={i === 0 && rooms.length % 2 === 1 ? "21:9" : "4:3"} mobileRatio="4:3" />} title={t(r.name)} meta={t(r.spec_line)} />
            ))}
          </TileGrid>
        </Section>
      </P>
    </main>
  );
}

Object.assign(window, { TariffScreen });
