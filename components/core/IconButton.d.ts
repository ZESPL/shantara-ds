import * as React from "react";

/** Square-footprint circular control holding a single Lucide glyph. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "solid" | "outline" | "glass" | "inverse";
  size?: "sm" | "md" | "lg";
  /** Required accessible name, also used as the tooltip title. */
  label: string;
  children?: React.ReactNode;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
