Location trail for deep pages (treatment detail, journal article).

```jsx
<Breadcrumbs items={[{label:"Programmes", href:"/en/programmes"}, "Detox"]} />
```

**Motion.** Ancestor links take `--text-primary` and a Cotton Seed underline on hover, 160ms. The current page does not hover.

**RTL.** The trail reads right to left. Keep the `/` separator. Do not swap it for a backslash or a flipped chevron.
