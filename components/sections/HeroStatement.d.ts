import * as React from "react";
import type { MetaItem } from "../editorial/MetaRow";

export interface HeroStatementProps extends React.HTMLAttributes<HTMLElement> {
  /** The page title as a full sentence. No label above it. */
  /** "utility": short, no image — legal pages, 404, confirmation. */
  variant?: "editorial" | "utility";
  title: React.ReactNode;
  /** One supporting line (lead size). */
  sub?: React.ReactNode;
  actions?: React.ReactNode;
  /** A <Breadcrumbs/> node, top of the hero. */
  breadcrumbs?: React.ReactNode;
  /** Caption row under the closing hairline, e.g. ["Reviewed by Dr. Bahja Janu", "Updated 12 August 2026"]. */
  meta?: Array<string | MetaItem> | React.ReactNode;
  /** Closing hairline across the container (default true). */
  rule?: boolean;
  /** Small image in the side column (≥1000px: 4 of 11 columns; stacks on phones). Or pass `media`. */
  src?: string;
  alt?: string;
  /** Ratio of the side image, default "4:5". */
  ratio?: "4:5" | "4:3" | "1:1" | "3:4";
  media?: React.ReactNode;
  /** Side-column content — a short fact list or a link; renders under the image if both. */
  aside?: React.ReactNode;
  /** Light grounds only. */
  ground?: "merino" | "stone";
  /** `true` (default): 440–760px floor with the statement placed low. `false`: content height. */
  tall?: boolean;
  /** Headline size. Default `h1`. */
  size?: "display" | "h1" | "statement";
  titleAs?: "h1" | "h2";
  /** Headline line length. Default `22ch`. */
  measure?: string;
}
export declare function HeroStatement(props: HeroStatementProps): JSX.Element;
