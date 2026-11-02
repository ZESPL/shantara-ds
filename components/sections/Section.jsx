import React from "react";

/* The shell every website section sits in: one ground, the fluid section rhythm and the
   centred container with a fluid 20→48px gutter. Nothing on a page paints its own
   background or side padding; it chooses a Section. */
export function Section({ ground = "merino", space = "md", width = "default", as: Tag = "section", bleed = false, children, className, style, ...rest }) {
  return (
    <Tag data-ds-id="sections/Section" className={"sh-section" + (className ? " " + className : "")} data-ground={ground} data-space={space === "md" ? undefined : space} style={style} {...rest}>
      {bleed ? children : <div className="sh-container" data-width={width === "default" ? undefined : width}>{children}</div>}
    </Tag>
  );
}
