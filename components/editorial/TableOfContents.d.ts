import * as React from "react";

export interface TocItem {
  /** The heading's id in the article body. */
  id: string;
  label: React.ReactNode;
  /** 2 (default) or 3 for a sub-heading. */
  level?: 2 | 3;
}
export interface TableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
  items: TocItem[];
  /** Default "On this page". */
  title?: string;
  /** "rail" (default): hairline rail, brand bar on the current section.
   *  "numbered": two-digit numerals, entries divided by rules.
   *  "panel": a raised box, entries divided by rules. */
  variant?: "rail" | "numbered" | "panel";
  /** Controlled current section id. Omit to let `track` follow the scroll. */
  activeId?: string;
  /** Mark the section in view with IntersectionObserver (default true). */
  track?: boolean;
  /** Sticky in the side column from 1000px (default true). */
  sticky?: boolean;
  /** Phones/tablets: start expanded (default false — collapsed). */
  defaultOpen?: boolean;
  onNavigate?: (id: string, e: React.MouseEvent) => void;
}
export declare function TableOfContents(props: TableOfContentsProps): JSX.Element;
