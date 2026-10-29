import * as React from "react";

export interface PanoramaCaptionProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  /** Describe the scene. */
  alt?: string;
  position?: string;
  /** object-position under 760px — choose the part of the panorama that survives a 4:5 crop. */
  mobilePosition?: string;
  /** A short caption, not a headline. No button. */
  title?: React.ReactNode;
  /** Optional one short line under the caption. */
  sub?: React.ReactNode;
  /** Desktop ratio. Default `21:9`. */
  ratio?: string;
  /** Ratio under 760px. Default `4:5`. */
  mobileRatio?: string;
  headingLevel?: 2 | 3;
  /** false: from 1000px the frame sits inside the page container (1240px) instead of
   *  running to the screen edge. Under 1000px nothing changes. Default true. */
  bleed?: boolean;
  /** Ground around the boxed frame (`bleed={false}` only). Default "merino". */
  surround?: "merino" | "stone";
  /** A muted loop in place of the photograph — editorial/Video props. */
  video?: import("../editorial/Video").VideoProps;
}
export declare function PanoramaCaption(props: PanoramaCaptionProps): JSX.Element;
