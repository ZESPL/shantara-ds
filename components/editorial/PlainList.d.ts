import * as React from "react";

export type PlainItem = string | { title: React.ReactNode; text?: React.ReactNode };
export interface PlainListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: PlainItem[];
  columns?: 1 | 2 | 3;
  size?: "sm" | "md";
  rules?: boolean;
  /** `numeral`: one item per row, numbered 01, 02… in Light display type on hairlines. Ignores `columns`. */
  marker?: "none" | "numeral";
}
export declare function PlainList(props: PlainListProps): JSX.Element;
