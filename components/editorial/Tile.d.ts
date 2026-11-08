import * as React from "react";
import type { MetaItem } from "./MetaRow";

export interface TileProps extends React.HTMLAttributes<HTMLElement> {
  /** A <Media/> node, or pass `src` + `alt` + `ratio`. */
  media?: React.ReactNode;
  src?: string;
  alt?: string;
  ratio?: string;
  title: React.ReactNode;
  /**
   * The meta row BELOW the title (caption type, normal case).
   * - string or string[] → "Metabolic · 7–21 nights"
   * - MetaItem[] with `icon` → icon-led items, e.g. [{ icon: "clock", label: "7–21 nights" }]
   * - any other node → rendered as-is in caption type
   */
  meta?: string | Array<string | MetaItem> | React.ReactNode;
  text?: React.ReactNode;
  /** Static Tags under the text, such as the conditions a programme is for. */
  tags?: string[];
  href?: string;
  onClick?: React.MouseEventHandler;
  /** `lg` for the featured tile in a TileGrid. */
  size?: "md" | "lg";
  /** `row` puts the photograph beside the text from 760px. */
  layout?: "stack" | "row";
  headingLevel?: 2 | 3 | 4;
}
export declare function Tile(props: TileProps): JSX.Element;
