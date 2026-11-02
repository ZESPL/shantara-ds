import * as React from "react";

/** Hover/focus note on a Pine Tree chip. Never put essential information here. */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The tooltip text. Preferred prop name. */
  content?: React.ReactNode;
  /** Alias of `content`, kept for older call sites. `content` wins when both are set. */
  label?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right" | "start" | "end";
  /** Controlled open state. When set, hover/focus no longer toggle it. */
  open?: boolean;
  /** Initial open state (uncontrolled), for specimens and onboarding hints. */
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
