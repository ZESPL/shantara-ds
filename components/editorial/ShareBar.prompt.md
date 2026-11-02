Share an article: **Copy link**, **WhatsApp**, **Email**, as outline chips with a core Icon (`link`, `message-circle`, `mail`) and a word.

```jsx
<ShareBar url="https://shantara.life/en/journal/how-meals-are-planned" title="How meals are planned during a stay" />
```

**Use** once per article, at the end of the body (before `AuthorCard`). `compact` for the header area or a narrow side column. No social-network buttons, share counts or trackers.

**Behaviour.** Copy uses the Clipboard API and confirms "Link copied" for two seconds (also announced to screen readers). WhatsApp opens `wa.me` with title + URL; Email opens a `mailto:` with the title as subject.

**Responsive.** Wraps; every target is 44px tall.
