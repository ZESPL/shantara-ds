import * as React from "react";

export type MediaRatio = "1:1" | "4:3" | "3:2" | "16:9" | "4:5" | "3:4" | "21:9" | "fill";
export interface MediaProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  /** Describe the scene. Empty string only when the image is decorative. */
  alt?: string;
  /** Aspect ratio token. `fill` covers a positioned parent (heroes, bleeding split halves). */
  ratio?: MediaRatio | string;
  /** Ratio under 760px, e.g. a 21:9 panorama becomes 4:3 on phones. */
  mobileRatio?: MediaRatio | string;
  /** object-position; `mobilePosition` overrides it under 760px. */
  position?: string;
  mobilePosition?: string;
  /** LCP image: eager + fetchpriority high. Only the hero sets this. */
  priority?: boolean;
  srcSet?: string;
  sizes?: string;
  /** Protection gradient for type on top: `hero` covers the full text block. */
  scrim?: "hero" | "bottom" | "top" | "full" | string;
  /** Overlay content, positioned over the image (use with a scrim). */
  children?: React.ReactNode;
}
export declare function Media(props: MediaProps): JSX.Element;
