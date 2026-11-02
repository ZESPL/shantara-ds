import * as React from "react";

export interface SpecColumn { key: string; label: string; accent?: boolean; align?: "start" | "end"; mobileLabel?: boolean }
export interface SpecTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** The first column is the row header. */
  columns: SpecColumn[];
  rows: Record<string, React.ReactNode>[];
  caption?: string;
  showHeader?: boolean;
  rules?: boolean;
  /** `lg` sets the accent column in title size, for the tariff card. */
  size?: "md" | "lg";
}
export declare function SpecTable(props: SpecTableProps): JSX.Element;
