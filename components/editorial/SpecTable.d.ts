import * as React from "react";

export interface SpecColumn { key: string; label: string; accent?: boolean; align?: "start" | "end"; mobileLabel?: boolean }
export interface SpecTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** The first column is the row header. */
  columns: SpecColumn[];
  rows: Record<string, React.ReactNode>[];
  caption?: string;
  showHeader?: boolean;
  rules?: boolean;
  /** `contrast`: two sentences per row in equal, wrapping columns; the accent column on a raised ground under a gold rule. Use with `showHeader`. */
  variant?: "default" | "contrast";
}
export declare function SpecTable(props: SpecTableProps): JSX.Element;
