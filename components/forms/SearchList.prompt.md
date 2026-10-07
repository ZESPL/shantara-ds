Searchable single-choice list. Type to filter, then pick a row — for countries, conditions and other long lists. Shorter lists stay on `Select` or `Radio`.

```jsx
<SearchList label="Country of residence" required name="country" placeholder="Search countries" options={countries} value={country} onChange={setCountry} />
<SearchList label="Programme" optional placeholder="Search programmes" options={[{ value: "stress", label: "Stress Management", description: "A quieter first stay" }]} />
```

Same 52px chrome as `Input`. `options` are strings or `{ value, label, description }`. `onChange` receives the option value, or `""` when cleared. The closed field shows the label. Opening it selects that label so the next keystroke starts a new search; the full list stays visible until then. A match is drawn in Medium. `description` sits under the label in muted 13px type.

**Keyboard.** Arrow Down and Arrow Up move the highlight and open the list. Enter picks the highlighted row. Escape closes without changing the value. The field is a combobox (`aria-expanded`, `aria-activedescendant`).

**Pointer.** Moving onto a row highlights it and leaves the scroll position where it is. A stationary pointer does not follow rows that slide underneath it, so the list does not chase the cursor.

**Motion.** The list rises 8px over 160ms. The highlighted row uses the raised ground. The chosen row keeps a Himalaya tick. The chevron does not spin.

**English only.** The search box accepts the same characters as `Input`. Other scripts are removed, and the hint becomes “Please write in English.” Use an English `value` when the team will read the choice; the label can still be translated.

**RTL.** The icon sits at the inline start, the chevron and clear button at the inline end. Filtering ignores accents, so a typed name still matches. The query is left to right once typing starts.
