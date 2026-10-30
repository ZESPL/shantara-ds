import * as React from "react";
import type { MetaItem } from "./MetaRow";

export interface StatementProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The headline — one full sentence. The heading leads: there is no label above it. */
  children: React.ReactNode;
  /** A <Breadcrumbs/> node, above the headline. Heroes pass theirs here. */
  breadcrumbs?: React.ReactNode;
  /** Caption facts BELOW the headline (MetaRow items), or any small node. */
  meta?: Array<string | MetaItem> | React.ReactNode;
  /** One quiet supporting line in body size (lead size for display/h1). */
  sub?: React.ReactNode;
  /** Buttons, laid out in `.sh-actions` and stacked full width on phones. */
  actions?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  /** Maps onto the type roles: display, h1, statement/h2, title/h3, h4 — fluid, never overflow. */
  size?: "display" | "h1" | "statement" | "h2" | "title" | "h3" | "h4";
  /** Line length for the headline. Default `--measure-statement` (30ch). */
  measure?: string;
}
export declare function Statement(props: StatementProps): JSX.Element;
