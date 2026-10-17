import * as React from "react";

/**
 * The Hygiene Nature Cure mark. One single-colour artwork in placement tones.
 * Not the Shantara lockup — use Logo for Shantara.
 */
export interface HnchLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** `full` = wordmark lockup, `icon` = the mark that stands in for the letter I. */
  mark?: "full" | "icon";
  /**
   * Placement tone. `dark` is #1C1A1D for light grounds. `light` is the published white.
   * `green` is the hospital secondary #0A481E. `current` inherits CSS color only when the
   * SVG is inlined; an img tag does not inherit it.
   */
  tone?: "dark" | "light" | "green" | "current";
  /** Rendered height in px. Defaults: full 56, icon 40. */
  height?: number | string;
  /** Assets folder URL. The component appends /hnch/. */
  assetBase?: string;
}

export declare function HnchLogo(props: HnchLogoProps): JSX.Element;
