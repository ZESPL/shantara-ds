/* Book a consultation — HeroStatement (rosette band) → the form beside a Stone panel (who
   calls, what happens next). Dialog confirm, Spinner, success state and Toast are kept.
   No ClosingCTA: the form is the page's CTA (#35). */

function ConsultationScreen({ onNavigate, locale = "en", view = "booking" }) {
  const { t, track } = window.ShantaraI18n.useLocale();
  const L = window.ShantaraLocales;
  const keys = (L && L.FORM_FIELD_KEYS) || { full_name: "full_name", phone: "phone", email: "email", country: "country", notes: "notes" };
  const { Button, Input, Select, Textarea, Dialog, Toast, Spinner, HeroStatement, Section, FormSplit, PortraitFrame, Statement, NumberedSteps, TextLink } = window.ShantaraDesignSystem_45bbe4;
  const P = window.PageSlot;
  const [started, setStarted] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [toast, setToast] = React.useState(true);

  const context = L ? L.leadContext({
    locale,
    source_page: L.localePath(locale, L.kitViewPath(view)),
    page_type: "consultation",
    content_id: "book-consultation",
    content_name: "Book a Consultation",
    landing_page: typeof location !== "undefined" ? location.hash : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
  }) : { locale };

  const markStart = () => {
    if (started) return;
    setStarted(true);
    if (track) track("form_start", { form_id: "consultation", page_type: "consultation" });
  };

  const readKeyedFields = () => {
    if (typeof document === "undefined") return {};
    const root = document.querySelector('[data-ds-id="page/booking/form"]');
    if (!root) return {};
    const fields = {};
    root.querySelectorAll("input[name], textarea[name], select[name]").forEach((el) => {
      if (el.name) fields[el.name] = el.value;
    });
    return fields;
  };

  const submit = () => {
    const fields = readKeyedFields();
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setConfirming(false);
      setDone(true);
      if (track) track("generate_lead", {
        ...fields,
        form_id: "consultation",
        page_type: "consultation",
        source_page: context.source_page,
      });
    }, 1400);
  };

  // The success view is much shorter than the form: bring it into view.
  React.useEffect(() => {
    if (!done || typeof document === "undefined") return;
    const el = document.getElementById("kit-scroll");
    if (el) el.scrollTop = 0;
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
    // The toast repeats the heading; let it go on its own so it never sits over the buttons.
    const timer = setTimeout(() => setToast(false), 4000);
    return () => clearTimeout(timer);
  }, [done]);

  const bahja = (window.ShantaraContent.doctors || []).find((d) => d.id === "bahja-janu");

  if (done) {
    return (
      <main>
        <P id="booking/done">
        <HeroStatement
          tall={false}
          pattern="end"
          meta={[t("Book a Consultation")]}
          title={t("Consultation request received")}
          sub={t("Our team will contact you to understand your requirements and guide you on the appropriate next step.")}
          actions={<>
            <Button variant="secondary" size="lg" onClick={() => onNavigate("home")}>{t("Back to home")}</Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate("contact")}>{t("Contact")}</Button>
          </>}
          style={{ paddingBlockEnd: "var(--section-y)" }}
        />
        </P>
        {toast ? <Toast fixed tone="success" title={t("Consultation request received")} message={t("Our team will contact you to understand your requirements and guide you on the appropriate next step.")} onClose={() => setToast(false)} /> : null}
      </main>
    );
  }

  const aside = (
    <>
      {bahja ? (
        <PortraitFrame
          src={bahja.photo_profile ? window.photoSrc(bahja.photo_profile) : undefined}
          alt={bahja.full_name}
          name={bahja.full_name}
          role={t(bahja.role)}
          headingLevel={2}
          style={{ maxWidth: "min(100%, 20rem)" }}
        />
      ) : null}
      <Statement size="title" as="h2">{t("We'll be in touch")}</Statement>
      <NumberedSteps
        columns={1}
        rules
        items={[
          { title: t("A member of the team will call you to understand what you need.") },
          { title: t("A doctor then reviews whether a stay is the right next step.") },
          { title: t("A stay is confirmed after a doctor has spoken with you.") },
        ]}
      />
      <div>
        <TextLink onClick={() => onNavigate("tariffs")}>{t("View tariffs")}</TextLink>
      </div>
    </>
  );

  return (
    <main>
      <P id="booking/hero">
        <HeroStatement
          tall={false}
          pattern="end"
          title={t("Book a Consultation")}
          sub={t("Share your name and a number we can reach. Our team will contact you to arrange a consultation.")}
        />
      </P>

      <P id="booking/form">
      <Section space="bottom">
        <FormSplit aside={aside}>
          <Input name={keys.full_name} autoComplete="name" label={t("Name")} required onFocus={markStart} />
          <Input name={keys.phone} autoComplete="tel" label={t("Mobile / WhatsApp number")} required onFocus={markStart} />
          <Input name={keys.email} autoComplete="email" label={t("Email")} type="email" hint={t("Optional")} onFocus={markStart} />
          <Select name={keys.country} label={t("Country")} options={[{ value: "IN", label: t("India") }, { value: "AE", label: t("United Arab Emirates") }, { value: "GB", label: t("United Kingdom") }, { value: "OTHER", label: t("Other") }]} defaultValue="IN" onFocus={markStart} />
          <Textarea name={keys.notes} label={t("Anything you'd like us to know?")} hint={t("Optional")} maxLength={400} onFocus={markStart} />
          {Object.entries(context).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value || ""} readOnly />
          ))}
          <div className="sh-actions" data-stack="mobile" style={{ marginTop: "var(--space-4)" }}>
            <Button size="lg" onClick={() => setConfirming(true)}>{t("Send your details")}</Button>
          </div>
        </FormSplit>
      </Section>
      </P>

      <Dialog open={confirming} onClose={pending ? undefined : () => setConfirming(false)}
        title={t("Send your details?")}
        description={t("We will use these details only to contact you.")}
        footer={pending ? <Spinner /> : <><Button variant="secondary" onClick={() => setConfirming(false)}>{t("Not yet")}</Button><Button onClick={submit}>{t("Yes, send")}</Button></>} />
    </main>
  );
}

Object.assign(window, { ConsultationScreen });
