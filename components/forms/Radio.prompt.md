Single choice among a small visible set. Group with a `role="radiogroup"` wrapper and a shared `name`.

```jsx
<Radio name="nights" label="7 nights" description="a shorter stay" card defaultChecked />
<Radio name="nights" label="14 nights" description="a common length for this programme" card />
```

20px ring, 1.5px border, 8px Himalaya dot centred with `place-items:center`. 44px row, 17px text. `card` wraps the row in a 2px-radius bordered panel that takes a Himalaya 2px edge when checked. `invalid` turns the ring Clay (put the group error message under the group).

**Motion.** The inner dot scales from `0.4` with opacity over 160ms `--ease-out` — never from `scale(0)`. `card` rows cross-fade their Himalaya fill and hairline at 160ms.

**RTL.** The dot stays before the label in reading order, same contract as `Checkbox`.
