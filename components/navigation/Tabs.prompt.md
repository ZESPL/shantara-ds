Switches between sibling views. The active underline is a 1.5px Himalaya rule, never a filled block.

```jsx
<Tabs items={["Overview", "Therapies", "Rooms", "Journal"]} onChange={setView} />
<Tabs variant="pill" items={[{value:"all",label:"All",count:13},{value:"diet",label:"Diet"}]} />
```

**Motion.** The underline grows `scaleX(0→1)` from the inline start over 240ms. Pill tabs cross-fade the selected fill and pick up `--shadow-sm`. Press is `scale(var(--press-scale))` (`0.96`). Arrow keys move and select; that keyboard path does not add extra motion.

**RTL.** Tabs reverse. The underline grows from the right. ArrowLeft selects the next tab; ArrowRight the previous. Counts stay after the label in reading order.
