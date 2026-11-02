import * as React from "react";

/** Hairline rule. Shantara separates with air first, a 1px warm rule second, never with heavy lines. */
export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "subtle" | "default" | "strong";
  /** CSS length applied as the cross-axis margin. */
  spacing?: string;
  /** Optional centred caption label, e.g. "or". */
  label?: string;
  orientation?: "horizontal" | "vertical";
}

export declare function Divider(props: DividerProps): JSX.Element;
