import * as React from "react";

export interface GroupedItem {
  label: React.ReactNode;
  text?: React.ReactNode;
  href?: string;
  /** Written to `data-filter-terms` (pipe-separated) for a page script that filters items. */
  terms?: string;
}
export interface Group { label: string; items: Array<string | GroupedItem> }
export interface GroupedListProps extends React.HTMLAttributes<HTMLDivElement> {
  groups: Group[];
  /** Columns from 760px (2) / 1000px (3). */
  columns?: 1 | 2 | 3;
  /** Hairline between items (default true). `false` gives a plain spaced list. */
  rules?: boolean;
  /** Level of the group heading. */
  headingLevel?: 3 | 4;
}
export declare function GroupedList(props: GroupedListProps): JSX.Element;
