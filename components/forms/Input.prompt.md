Text field for all single-line entry.

```jsx
<Input label="Email" type="email" placeholder="you@example.com" required hint="We only email about your booking." />
<Input label="Guests" error="Maximum 6 guests per suite." defaultValue="8" />
<Input label="Search treatments" startIcon={<Icon name="search" size={16} />} />
```

**Field contract (Input, Textarea, Select).** 52px control (`--control-lg`; `sm` 44, `lg` 56), 2px radius (`--radius-input`), 1px `--border-control`, white on Merino, 17px text. Label 15px Medium sentence case, 8px above the control; hint/error 13px, 8px below. `required` adds a Himalaya `*` (and the native `required`); `optional` adds a muted “Optional”. Error: Clay border + Clay halo on focus, message with an alert icon, `aria-invalid` and `aria-describedby`. Disabled: Pearl Bush fill, subtle border, muted text, `not-allowed`. Hints stay one short line.

**Motion.** Hover darkens the hairline to `--border-strong`. Focus is Himalaya plus a 3px `--surface-brand-soft` halo, 160ms. An error message rises 8px (`sh-enter-up`) over 240ms — it does not shake.

**English only.** Free text is for an answer the team will read. The field keeps Latin letters (accents in a name stay), numbers and ordinary punctuation. Other scripts are removed, and the hint becomes “Please write in English.” The control is `lang="en"` and left to right, including inside an RTL page. `password` and `number` are left as typed.

**RTL.** `startIcon` / `endIcon` follow reading direction. Search belongs in `startIcon` in both LTR and RTL. The typed value stays left to right.
