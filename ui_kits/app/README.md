# Shantara — in-stay guest companion

A companion app for guests **during** their stay, in a 390×844 frame. **Extrapolation**, not a recreation — no app design was supplied with the brand package. Content follows the Shantara Property Handbook: prescribed schedules, doctor-written protocols, diet therapy, escalation rules.

Open `index.html`. The tab bar switches Today / Programme / Notes / You; tapping any scheduled item or prescribed therapy opens the therapy sheet.

| File | Surface |
| --- | --- |
| `chrome/Shell.js` | Phone frame, status bar, glass tab bar (44px minimum targets) + `Photo` wrapper over `assets/photos` |
| `screens/TodayScreen.js` | Today: day-of-programme greeting, current session on Himalaya, the doctor-set day timeline, open facilities rail, escalation card — plus the protocol screen (therapies / diet tabs) |
| `screens/TherapySheet.js` | Full-screen therapy sheet with pre-session guidance and escalation notes — plus Notes (vitals + journal) and You |

Design decisions specific to this surface: nothing is bookable or cancellable by the guest, because therapies are prescribed rather than ordered; the primary action on a session is only "I'll be there". Each screen follows the [rule of one](../../docs/rule-of-one.md): one task, one current item in focus, one primary action. Display type drops to 30px Light, cards keep the 8px radius, the tab bar uses `--glass-fill` + `--blur-glass` and press scale on pointer-down. The therapy sheet enters from `translateY(100%)` over 420ms `--ease-drawer`. Tab panels enter with `sh-enter-up`.

**Confirm before any real use:** whether guests get an app at all (the handbook does not mention one), whether vitals should be visible to guests, and the escalation contact route shown on the Today screen.
