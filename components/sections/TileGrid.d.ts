import * as React from "react";

export interface TileGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  /** One <TextLink/>, right of the heading from 760px. */
  action?: React.ReactNode;
  /** `3` three across, `2` two across, `feature` one large tile beside a stack. */
  layout?: "3" | "2" | "feature";
  /** A small line under the grid. */
  footnote?: React.ReactNode;
  /** <Tile/> elements. Keep counts to multiples of the column count. */
  children?: React.ReactNode;
  /* layout also takes "4" (four across) and "list" (one per row, photograph beside text). */
}
export declare function TileGrid(props: TileGridProps): JSX.Element;
