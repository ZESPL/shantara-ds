import * as React from "react";
export interface ListingSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  categories?: { id: string; label: string; href?: string }[];
  /** Selected category id; "all" for All. */
  category?: string;
  onCategory?: (id: string) => void;
  allLabel?: string;
  page?: number; pageCount?: number;
  onPage?: (n: number) => void;
  hrefFor?: (n: number) => string;
  empty?: React.ReactNode;
  layout?: "2" | "3" | "list";
  /** <Tile/>s for the current page. */
  children?: React.ReactNode;
}
export declare function ListingSection(props: ListingSectionProps): JSX.Element;
