import * as React from "react";

export interface HeroFullBleedProps extends React.HTMLAttributes<HTMLElement> {
  /** A ready <Media ratio="fill"/> node. Otherwise pass `src` + `alt`. */
  media?: React.ReactNode;
  src?: string;
  /** Describe the scene. */
  alt?: string;
  /** object-position of the photograph; `mobilePosition` overrides it under 760px. */
  position?: string;
  mobilePosition?: string;
  /** One full sentence, Diodrum Light. Display size when `height="full"`, h1 size otherwise. */
  title: React.ReactNode;
  /** One supporting line. */
  sub?: React.ReactNode;
  /** One primary button (Gold on photography), optionally one link. Stacks full width under 520px. */
  actions?: React.ReactNode;
  /** Caption-size facts under the actions, e.g. ["Kozhikode, Keralam", "Since 2000"] (MetaRow items) or a node. */
  meta?: Array<string | import("../editorial/MetaRow").MetaItem> | React.ReactNode;
  /** `full` 100svh (560–1080px) for the home page; `tall` 72svh for inner pages; `short` 56svh. */
  height?: "full" | "tall" | "short";
  /** Heading element. Default `h1` — a page has exactly one. */
  titleAs?: "h1" | "h2";
}
export declare function HeroFullBleed(props: HeroFullBleedProps): JSX.Element;
