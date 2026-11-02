A photograph or diagram inside an article, with a one-line caption and an optional credit beneath (caption type, muted).

```jsx
<ArticleFigure src="/photos/dining.jpg" alt="The dining room by the valley window"
  caption="Meals are served in the dining room, planned for each guest's programme." credit="Photograph: Shantara" />
```

**Use** inside `Prose` or directly in an article column. `width="wide"` for landscape photographs that deserve more room (breaks out from 1000px); `full` only for a panorama at the top of a section.

**Content.** Captions say what the picture shows, in a sentence. Never use a guest's face without consent. Alt text describes the image; the caption adds context. Do not repeat one in the other.

**Responsive.** Always full width of its column on phones; `mobileRatio` swaps the crop under 760px.
