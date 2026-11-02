import React from "react";
import { TileGrid } from "./TileGrid.jsx";
import { Tile } from "../editorial/Tile.jsx";

/* A TileGrid preset for the end of an article (and the Journal index "latest" row):
   a heading, up to three article tiles with category · read time below each title, and
   one link to the index. Two or three items, never one. */
export function RelatedArticles({ title = "Related reading", articles = [], action, layout = "3", icons = false, headingLevel = 3, style, ...rest }) {
  const shown = articles.slice(0, layout === "2" ? 2 : 3);
  return (
    <TileGrid data-ds-id="sections/RelatedArticles" title={title} action={action} layout={layout} style={style} {...rest}>
      {shown.map((a, i) => (
        <Tile key={(a.href || "") + i} src={a.src} alt={a.alt || ""} ratio={a.ratio || "3:2"} title={a.title} href={a.href} headingLevel={headingLevel}
          meta={icons
            ? [a.category ? { icon: "tag", label: a.category } : null, a.readTime ? { icon: "clock", label: a.readTime } : null, a.date ? { icon: "calendar-days", label: a.date, dateTime: a.dateTime } : null]
            : [a.category, a.readTime || a.date]}
          text={a.text} />
      ))}
    </TileGrid>
  );
}
