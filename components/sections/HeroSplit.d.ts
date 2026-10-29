import * as React from "react";
import type { MetaItem } from "../editorial/MetaRow";

export interface HeroSplitProps extends React.HTMLAttributes<HTMLElement> {
  /** A ready <Media/> node, or pass `src` + `alt` (loaded with priority — it is the LCP image). */
  media?: React.ReactNode;
  src?: string;
  alt?: string;
  /** object-position; `mobilePosition` overrides it under 760px. */
  position?: string;
  mobilePosition?: string;
  /** The page title (h1). No label above it. */
  /** A short muted loop in place of the photograph — editorial/Video props (R2 URLs only). */
  video?: import("../editorial/Video").VideoProps;
  title: React.ReactNode;
  /** Caption facts directly under the title, e.g. ["Metabolic", "7–21 nights"] or icon items. */
  meta?: Array<string | MetaItem> | React.ReactNode;
  /** One supporting line (lead size). */
  sub?: React.ReactNode;
  /** One primary Button, optionally one TextLink. Stack full width under 520px. */
  actions?: React.ReactNode;
  /** A <Breadcrumbs/> node at the top of the text column. */
  breadcrumbs?: React.ReactNode;
  /** Optional short facts under the actions on a hairline — a PlainList of 2–4 items. */
  facts?: React.ReactNode;
  /** Side the photograph sits on from 1000px. Default "end". */
  mediaSide?: "start" | "end";
  /** Text : photo from 1000px. "50" (default), "40" (photo 40%), "60" (photo 60%). */
  split?: "50" | "40" | "60";
  ground?: "merino" | "stone" | "himalaya" | "pine";
  /** Photo crop under 1000px. Default "4:3". */
  mobileRatio?: "4:3" | "4:5" | "3:2" | "16:9" | "1:1";
  /** Phones/tablets: photo above the text instead of below. */
  mobileMediaFirst?: boolean;
  /** false: from 1000px the photograph stays inside the page container, below the header,
   *  instead of running to the screen edge. Under 1000px nothing changes. Default true. */
  bleed?: boolean;
  /** Desktop min-height. Default clamp(600px, 88svh, 920px). */
  minHeight?: string;
  size?: "display" | "h1" | "statement";
  titleAs?: "h1" | "h2";
  /** Headline measure. Default 18ch. */
  measure?: string;
}
export declare function HeroSplit(props: HeroSplitProps): JSX.Element;
