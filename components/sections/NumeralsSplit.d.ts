import * as React from "react";

export interface NumeralsSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  sub?: React.ReactNode;
  /** One to three figures from content/site.json (today only `therapies_count`). A fourth is dropped. */
  numerals: { value: React.ReactNode; label: React.ReactNode }[];
  /** A small source or context line across the full width. */
  footnote?: React.ReactNode;
}
export declare function NumeralsSplit(props: NumeralsSplitProps): JSX.Element;
