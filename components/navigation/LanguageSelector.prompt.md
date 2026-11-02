Locale switcher for the public website header and mobile nav. Catalog documentation for this control is English.

```jsx
<LanguageSelector locale="en" rest="programs" onSelect={(code) => navigate(code)} />
```

Do not use flags. The trigger shows a globe, the compact code (`EN`) and a small chevron. The list shows every planned language by its native name: the current one ticked, enabled ones as links, and languages not yet published listed disabled with “Coming soon”. The control always renders. It never hides itself while only English is enabled.

Locale policy (planned languages, enabled vs published, page-level availability) lives in `ui_kits/website/SKILL.md` §15, not in this catalog.

**Motion.** The list rises 8px over 160ms (`sh-enter-up`); the chevron turns 180°. Reduced motion keeps the fade only.

**Accessibility.** The button name is “Language: English” (or the current native name). The list is a `listbox`. Escape and outside click close it. Visible focus uses `--ring-focus`.
