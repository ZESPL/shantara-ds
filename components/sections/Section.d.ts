import * as React from "react";

export type Ground = "merino" | "stone" | "himalaya" | "pine" | "photo";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** The one ground this section paints. Dark grounds (himalaya, pine, photo) re-point the ink tokens for everything inside. */
  ground?: Ground;
  /** Vertical rhythm: `md` 80→160px, `sm` 56→96px, `top` / `bottom` one side only, `none` for full-bleed children. */
  space?: "md" | "sm" | "top" | "bottom" | "none";
  /** Container width: default 1240px, `wide` 1440px, `narrow` 720px, `full` no max and no gutter. */
  width?: "default" | "wide" | "narrow" | "full";
  /** Element to render. Default `section`. */
  as?: React.ElementType;
  /** Skip the inner `.sh-container`; the children run edge to edge. */
  bleed?: boolean;
  children?: React.ReactNode;
}
export declare function Section(props: SectionProps): JSX.Element;
