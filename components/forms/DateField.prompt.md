Calendar for a single date. The field shows a readable date, such as 2 November 2026, and opens a month view.

```jsx
<DateField label="Preferred arrival" optional name="arrival" value={arrival} onChange={setArrival} min="2026-10-06" />
<DateField label="Date of birth" required name="dob" error="Enter a date." />
```

Same 52px chrome as `Input` (`sm` 44, `lg` 56). The value is an ISO date (`YYYY-MM-DD`) so a form can submit it; the field shows the long date for `locale` (default `en-GB`). `onChange` receives that ISO string, or `""` when cleared. `min` and `max` are ISO dates. Click the month name to choose a month. Click the year to open every year in range as a scrollable list — chevrons there jump twelve years — then choose one to open its months. A date of birth is a short scroll through that list. With no `min` or `max`, the list runs from 120 years ago to five years ahead.

**Keyboard.** Arrow Down opens the calendar. Arrows move the day, Home and End the week, Page Up and Page Down the month. Enter chooses the focused day. Escape closes. From the month view, Escape returns to the days. In the year list, newer years are at the top. Arrows move one year, Page Up and Page Down move twelve, Home jumps to the latest year and End to the earliest, and typing four digits jumps to that year. Enter opens that year's months. Escape returns to the view the list was opened from.

**Motion.** The panel rises 8px over 160ms (`sh-enter-up`). Days do not bounce. Hover fills a quiet raised ground. The chosen day is solid Himalaya.

**RTL.** The panel, chevrons and grid follow reading direction. Guest forms keep the default `en-GB` locale so the date reads in English. The stored value is always an ISO date. `locale="ar"` is for an RTL specimen of month and weekday names; the week starts on that locale's first day.
