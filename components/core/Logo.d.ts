import * as React from "react";

/**
 * The Shantara logo: the wordmark, or the flower as the mark. Never stack the two. Supplied as SVG in four brand colourways.
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** `wordmark` = the name, `icon` = the flower. */
  mark?: "wordmark" | "icon";
  /** Colourway: `dark` (Pine Tree), `olive` (Himalaya), `cream` (Merino), `gold` (Gold Crayola). */
  tone?: "dark" | "olive" | "cream" | "gold";
  /** Rendered height in px. Defaults: wordmark 22, icon 40. */
  height?: number | string;
  /** Override the assets folder URL (auto-derived from the loaded bundle by default). */
  assetBase?: string;
}

export declare function Logo(props: LogoProps): JSX.Element;
