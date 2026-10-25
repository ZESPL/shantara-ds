import * as React from "react";

export interface SplitSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** A ready <Media/> node. Otherwise pass `src` + `alt` + `position`. */
  media?: React.ReactNode;
  src?: string;
  alt?: string;
  position?: string;
  /** Which side the photograph takes from 1000px. `start` = left in LTR. On smaller screens it always comes first. */
  mediaSide?: "start" | "end";
  /** Width of the photograph column from 1000px: `50` (half), `40` or `60`. */
  split?: "50" | "40" | "60";
  /** `true` (default): the photo runs to the screen edge and fills the column height. `false`: the photo stays inside the container. */
  bleed?: boolean;
  /** Vertical alignment of the text column from 1000px. Default `end` — open space above. */
  align?: "start" | "center" | "end";
  /** Photo ratio under 1000px. Default `4:3`. */
  mobileRatio?: "4:3" | "4:5" | "3:4" | "16:9" | "1:1" | string;
  /** Row min-height from 1000px. Default clamp(560px, 48vw, 820px). */
  minHeight?: string;
  ground?: "merino" | "stone" | "himalaya" | "pine";
  /** The text column — usually a <Statement/> and one list or link. */
  /** A player in the photograph's place — editorial/Video props. */
  video?: import("../editorial/Video").VideoProps;
  /** Text above the photograph at every width. */
  stack?: boolean;
  children?: React.ReactNode;
}
export declare function SplitSection(props: SplitSectionProps): JSX.Element;
