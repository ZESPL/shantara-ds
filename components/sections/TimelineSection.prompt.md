A day, or a stay, in order: a statement and a TimeTable beside one photograph.

```jsx
<Section>
  <TimelineSection title="A day at Shantara" rows={day} src="/assets/photos/activity-hall-yoga-studio-empty.jpg" alt="The yoga hall" />
</Section>
```

**Use** on A Day at Shantara and programme pages.

**Content.** Times and routine from handbook §12 (the daily routine table). The doctor prescribes what fills the treatment slots, so never name a treatment per hour.

**Responsive.** Phones: statement → photograph (edge to edge, 4:3) → table (time above each title). From 1000px: photograph 5 columns, sticky while the table scrolls in tall windows; statement and table 7. `mediaSide="end"` swaps them.
