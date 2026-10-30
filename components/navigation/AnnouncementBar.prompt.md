A one-line strip above the site header for one site-wide message.

```jsx
<AnnouncementBar href="/en/book-consultation" linkLabel="Book a Consultation">
  A stay is confirmed after a doctor has spoken with you.
</AnnouncementBar>
<AnnouncementBar ground="stone" dismissible storageKey="consultation-2026-10">
  A stay is confirmed after a doctor has spoken with you.
</AnnouncementBar>
```

**Placement.** The first element in `<body>`, above the site header, on every page that carries the message. Not sticky: it scrolls away and the header stays. One bar at a time; never stack two.

**Grounds.** `himalaya` (default) and `pine` re-point ink like any dark ground; `stone` is the quiet light option. Use the same ground on every page.

**Content.** One sentence, plus at most one link. Facts the visitor needs before booking or arriving: a change to how stays are booked, a closure, a new programme. Never a discount, countdown, outcome claim or marketing line. Wording follows `ui_kits/website/skill-copy.md`. Not for clinical notes or policy conditions inside a page; use `NoticeBand` there.

**Dismissing.** `dismissible` adds a close button (44px target). With `storageKey` the bar stays closed for that visitor; give each new message a new key so it shows again. Leave a message that must be read (a closure, a change to booking) not dismissible.

**Responsive.** Centred on one line from 520px; the link wraps under the message when it does not fit. Phones: start-aligned, the close button stays at the end.

**Accessibility.** An `aside` landmark named "Announcement" (change with `label`). Not a live region: it is present on load, so it is not announced as an alert.
