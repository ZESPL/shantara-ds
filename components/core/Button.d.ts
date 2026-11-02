import * as React from "react";

/**
 * Action control. Near-square (2px), Diodrum Medium. Colour follows the section ground.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primary`: Himalaya on light grounds, Gold with Pine ink on himalaya/pine/photo grounds.
   * `secondary`: 1px outline in the same shape.
   * `link`: text, hairline underline and arrow; zero inline padding so it aligns to the grid.
   * `accent`, `ghost`, `inverse`: deprecated aliases kept for the app kit. Do not use on the website.
   */
  variant?: "primary" | "secondary" | "link" | "accent" | "ghost" | "inverse";
  /** 36 / 44 / 52px. `sm` grows to 44px on touch screens. Website uses `md` and `lg` only. */
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  /** Render as another element/component. Pass `href` to get an anchor automatically. */
  as?: React.ElementType;
  href?: string;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
