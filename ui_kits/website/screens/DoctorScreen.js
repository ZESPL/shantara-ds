/* Profiles. Doctor — route #/<locale>/doctors/<slug> (view "doctor"), from content/doctors/.
   Founder — route #/<locale>/pa-kareem (view "founder"), from content/leadership/. The founder
   and chairman is not a doctor: never list him with the doctors or give him a clinical role.
   Portrait, biography, then the media register on the record:
   press, talks, videos, social posts. Every item is an outbound link.
   Never an embedded player. */

function doctorMediaDate(value, locale) {
  const L = window.ShantaraLocales;
  if (!value || !L) return "";
  const day = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value + "T12:00:00Z" : value;
  return L.formatDate(day, locale);
}

function doctorLink(label, meta, url) {
  return { label, text: meta || undefined, href: url };
}

function ProfileScreen({ onNavigate, d, pageType }) {
  const { t } = window.ShantaraI18n.useLocale();
  const { Breadcrumbs, Section, PortraitFrame, PlainList, GroupedList, ClosingCTA, Button } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const L = window.ShantaraLocales;
  const locale = window.ShantaraI18n.currentLocaleCode();
  const home = L ? L.kitHash(locale, "home") : "#/en/";
  const about = L ? L.kitHash(locale, "about") : "#/en/about";
  const when = (value) => doctorMediaDate(value, locale);
  const groups = d ? [
    (d.press || []).length && {
      label: t("Press"),
      items: d.press.map((item) => doctorLink(item.title, [item.outlet, when(item.date)].filter(Boolean).join(" · "), item.url)),
    },
    (d.talks || []).length && {
      label: t("Recordings"),
      items: d.talks.map((item) => doctorLink(item.title, [item.publisher, when(item.date)].filter(Boolean).join(" · "), item.url)),
    },
    (d.videos || []).length && {
      label: t("Other videos"),
      items: d.videos.map((item) => doctorLink(item.title, [item.publisher, when(item.date)].filter(Boolean).join(" · "), item.url)),
    },
    (d.social_posts || []).length && {
      label: t("Social posts"),
      items: d.social_posts.map((item) => doctorLink(item.source, when(item.date), item.url)),
    },
  ].filter(Boolean) : [];

  if (!d) return null;

  return (
    <main>
      <P id={pageType + "/profile"}>
        <Section>
          <Breadcrumbs items={[{ label: t("Home"), href: home }, { label: t("About"), href: about }, d.full_name]} />
          <PortraitFrame
            src={d.photo_profile ? window.photoSrc(d.photo_profile) : undefined}
            name={d.full_name}
            role={t(d.role)}
            detail={[d.qualification, d.years_practice ? d.years_practice + " " + t("years in practice") : ""].filter(Boolean).join(" · ")}
          />
          {d.biography ? <p style={{ margin: "var(--stack-md) 0 0", maxWidth: "var(--measure-body)", font: "var(--type-body)", color: "var(--text-primary)" }}>{d.biography}</p> : null}
          {(d.areas_of_practice || []).length ? <PlainList items={d.areas_of_practice.map((a) => t(a))} /> : null}
        </Section>
      </P>

      {groups.length ? (
        <P id={pageType + "/media">
          <Section ground="stone">
            <GroupedList groups={groups} columns={1} />
          </Section>
        </P>
      ) : null}

      <P id={pageType + "/closing"}>
        <ClosingCTA
          variant="ground"
          ground="pine"
          title={t("Share your name and a number we can reach.")}
          sub={t("Our team will contact you to arrange a consultation.")}
          action={<Button size="lg" onClick={() => { if (L) L.track("consultation_cta_click", { page_type: pageType, content_id: d.id, content_name: d.full_name, cta_location: "closing" }); onNavigate("booking"); }}>{t("Book a Consultation")}</Button>}
          contact={window.siteContactItems(t)}
        />
      </P>
    </main>
  );
}

function DoctorScreen({ onNavigate, slug }) {
  const doctors = (window.ShantaraContent && window.ShantaraContent.doctors) || [];
  const d = doctors.find((x) => x.id === slug || x.slug === slug) || doctors.find((x) => x.id === "bahja-janu");
  return <ProfileScreen onNavigate={onNavigate} d={d} pageType="doctor" />;
}

function FounderScreen({ onNavigate }) {
  const leadership = (window.ShantaraContent && window.ShantaraContent.leadership) || [];
  const d = leadership.find((x) => x.id === "pa-kareem");
  return <ProfileScreen onNavigate={onNavigate} d={d} pageType="founder" />;
}

Object.assign(window, { DoctorScreen, FounderScreen });
