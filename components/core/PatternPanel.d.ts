import * as React from "react";

/**
 * Surface carrying the brand's rosette as a BAND flush to one edge, never a
 * wash across the whole surface, never a field behind type. One band per
 * surface, ruled with a 1px hairline on its inner side. The cell is square
 * (native 530px), `scale` applies to both axes, and its default is proportional:
 * half the band, so two rosettes read across it.
 */
export interface PatternPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ground under the band. `none` = transparent, for a band laid over photography. */
  tone?: "merino" | "pearl" | "sand" | "olive" | "pine" | "gold" | "none";
  /** Which edge the band bleeds off. */
  edge?: "right" | "left" | "top" | "bottom" | "start" | "end";
  /** Band footprint: width for left/right, height for top/bottom. Defaults to
   *  `--pattern-band-md` (30%) vertically, `--pattern-strip` (14%) horizontally. */
  band?: string;
  /** Square cell edge. Defaults to half the band when `band` is an absolute
   *  length; pass it explicitly for a percentage band. Keep it between band/1.5
   *  and band/3, and never below 130px (so: no band on a surface under ~880px). */
  scale?: string;
  /** Line opacity override. Defaults: 0.9 on light grounds, 0.4 on dark, 0.5 over photography. */
  intensity?: number;
  /** Line colour. Defaults to Cotton Seed on light grounds, Merino on dark. */
  ink?: string;
  /** Colour of the 1px hairline on the band's inner edge. */
  rule?: string;
  /** Pad the content clear of the band. Default true. Turn off only when the
   *  children are already positioned away from that edge. */
  reserve?: boolean;
  radius?: string;
  children?: React.ReactNode;
}

export declare function PatternPanel(props: PatternPanelProps): JSX.Element;
