import * as React from "react";
export interface ConfirmationSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  next?: string[];
  nextLabel?: string;
  contact?: { icon?: string; label: string; href?: string }[];
  contactLabel?: string;
  /** Three cards to keep exploring, chosen by form and source page (see skill-content.md#confirmation-screens). Only the first three render. An http(s) href opens in a new tab. */
  explore?: { title: string; text?: string; meta?: (string | { icon: string; label: string })[]; src?: string; alt?: string; href: string }[];
  /** Heading above the cards. Default "Keep exploring". */
  exploreLabel?: string;
  /** TileGrid layout for the cards: "3" (default, three across) or "list" (rows, for a modal or drawer). */
  exploreLayout?: "3" | "list";
  actions?: React.ReactNode;
  /** Move focus to the title and scroll to it on mount. */
  autoFocus?: boolean;
  headingLevel?: 1 | 2;
}
export declare function ConfirmationSection(props: ConfirmationSectionProps): JSX.Element;
