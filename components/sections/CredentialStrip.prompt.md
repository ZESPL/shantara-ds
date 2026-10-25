Credentials spelled out — name, issuer, holder, number — never a bare logo.

```jsx
<Section>
  <CredentialStrip title="Registrations and qualifications" items={[
    { name: "BNYS", issuer: "Rajiv Gandhi University of Health Sciences", holder: "Dr. Bahja Janu" },
    { name: "Medical licence", issuer: "Travancore-Cochin Medical Council (TCMC), Kerala", holder: "Dr. Bahja Janu" },
  ]} />
</Section>
```

**Use** on About and doctor profiles.

**Content.** Only entries on the verified credentials list in `docs/handbook/glossary.md`. An entry whose issuer or proof is still "[…]" there is left out until it is filled. Never remove or question a listed credential.

**Responsive.** Phones: one column. From 760px: two. From 1000px: three.
