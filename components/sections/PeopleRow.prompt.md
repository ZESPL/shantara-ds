A statement, then two to four doctors in the same 4:5 portrait framing (deck slide 7).

```jsx
<PeopleRow
  title="Your programme is planned by our doctors."
  people={[
    { name: "P.A. Kareem", role: "Founder, Chairman & Chief Naturopathy Consultant", src: "/assets/photos/doctor-pa-kareem-passport.jpeg" },
    { name: "Dr. Bahja Janu", role: "Medical Director", src: "/assets/photos/doctor-bahja-janu-portrait-cropped.jpeg" },
  ]}
  action={<TextLink href="/en/about">About Shantara</TextLink>}
/>
```

**Content.** Name and role only, both from `content/doctors/`. There is no third line: a qualification or detail passed as `detail` is ignored here (qualifications belong on the doctor's own page, from the record, never `[TO CONFIRM]`). Never a years-in-practice figure or a biography. A doctor without a photograph shows initials; never a stock face.

**Responsive.** Portraits auto-fill at a fixed width (about 150px on a 360px phone, growing to 280px), so two doctors sit side by side on a phone and stay portrait-sized on a desktop instead of stretching; three or four wrap onto a second row only when the screen is too narrow. The row caps at four portraits wide. The statement sits above at every size.
