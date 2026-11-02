/* Rates and currencies are not stored in this design system. The production site reads them
   from its Keystatic Tariffs collection, one page per currency at /en/tariff/{code}
   (/en/tariff redirects to one of them); this sample shows the structure with "—" cells. */
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

/* Rooms and tariffs: HeroSplit → rate table beside the booking panel → supplements, payment
   and cancellation → room tiles. The booking panel is the page's CTA, so there is no
   ClosingCTA (#35). The tariff never shows the room count. Currencies are a row of plain links,
   one per Tariffs entry; each carries ?set=1 so the edge remembers the choice (skill-ia.md#tariff). */
function TariffScreen({ onNavigate }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Button, Breadcrumbs, HeroSplit, Section, FormSplit, SpecTable, Statement, PlainList, TileGrid, Tile, Media, TextLink } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const home = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "home") : "#/en/";
  const cancellation = L ? L.kitHash(window.ShantaraI18n.currentLocaleCode(), "cancellation") : "#/en/cancellation";
  /* Production: one link per Tariffs entry, in `order`, the current one marked aria-current.
     The sample holds no currencies, so it shows one placeholder. */
  const currencies = [{ code: "—", href: "#", current: true }];
  const rooms = tariffRooms();
  const tariff = tariffRecord();
  const book = (where) => () => { if (L) L.track("consultation_cta_click", { page_type: "tariffs", content_id: "tariffs", content_name: "Rooms and tariffs", cta_location: where }); onNavigate("booking"); };
  const note = { margin: 0, font: "var(--type-body-sm)", color: "var(--text-secondary)", maxWidth: "var(--measure-body)" };
  const stack = { display: "flex", flexDirection: "column", gap: "var(--stack-md)" };
  return (
    <main>
      <P id="tariffs/hero">
        <HeroSplit
          src={window.photoSrc("room-bedroom-desk-balcony-view")}
          alt={t("A bedroom with a desk and a balcony view")}
          breadcrumbs={<Breadcrumbs items={[{ label: t("Home"), href: home }, t("Rooms and tariffs")]} />}
          title={t("Rooms and tariffs")}
          meta={[t("Five room categories"), t("Rates per night")]}
          sub={t("Quiet rooms for resting between treatments. Reservations are confirmed after a preliminary consultation.")}
        />
      </P>

      <P id="tariffs/rates">
        <Section>
          <FormSplit
            aside={<>
              <Statement as="h2" size="h4">{t("What the nightly rate includes")}</Statement>
              <PlainList columns={1} rules items={(tariff.includes || []).map((line) => t(line))} />
              <Button fullWidth size="lg" onClick={book("inline")}>{t("Book a Consultation")}</Button>
            </>}
          >
            <nav aria-label={t("Show rates in")} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0 var(--space-5)" }}>
              <span style={{ font: "var(--type-body)", color: "var(--text-secondary)" }}>{t("Show rates in")}</span>
              {currencies.map((c) => (
                <a key={c.code} href={c.href} aria-current={c.current ? "page" : undefined} style={{ font: "var(--type-body)", minHeight: "var(--tap-min)", display: "inline-flex", alignItems: "center", color: c.current ? "var(--text-primary)" : "var(--text-link)" }}>{c.code}</a>
              ))}
            </nav>
            <SpecTable
              size="lg"
              showHeader
              caption={t("Rooms and tariffs")}
              columns={[
                { key: "name", label: t("Room") },
                { key: "single", label: t("Single / night"), accent: true, mobileLabel: true },
                { key: "double", label: t("Double / night"), mobileLabel: true },
                { key: "size", label: t("Size"), mobileLabel: true },
              ]}
              rows={rooms.map((r) => ({
                name: t(r.name),
                single: "—",
                double: "—",
                size: t(r.spec_line || r.size),
              }))}
            />
            <p style={note}>{(tariff.publicNotes || []).map((line) => t(line)).join(" ")}</p>
          </FormSplit>
        </Section>
      </P>

      <P id="tariffs/terms">
        <Section space="bottom">
          <div style={{ ...stack, gap: "var(--section-y-sm)" }}>
            <div style={stack}>
              <Statement as="h2" size="h4">{t("Supplements")}</Statement>
              <SpecTable
                showHeader
                columns={[
                  { key: "label", label: t("Supplement") },
                  { key: "basis", label: t("Charged"), mobileLabel: true },
                  { key: "amount", label: t("Rate"), mobileLabel: true },
                ]}
                rows={(tariff.supplements || []).map((s) => ({ label: t(s.label), basis: t(s.basis), amount: "—" }))}
              />
            </div>
            <div style={stack}>
              <Statement as="h2" size="h4">{t("Not included in the rate")}</Statement>
              <PlainList columns={1} rules items={(tariff.excludes || []).map((line) => t(line))} />
            </div>
            <div style={stack}>
              <Statement as="h2" size="h4">{t("Payment terms")}</Statement>
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
            <div style={stack}>
              <Statement as="h2" size="h4">{t("Cancellation and date changes")}</Statement>
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

      <P id="tariffs/rooms">
        <Section space="bottom">
          {/* Five categories: layout "2" puts the first across the full width and the other
              four in two even rows, so no row is left half empty. */}
          <TileGrid layout="2">
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
