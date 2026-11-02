import * as React from "react";

/**
 * Label or selectable chip. The look follows behaviour.
 * With `onClick`: interactive chip (pill outline, 36px / 44px on touch, hover, press, aria-pressed).
 * Without `onClick`: flat static label (24px, 2px radius, tint, no border) that never reads as a button.
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
  /** Renders a remove (×) control at the inline end. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Accessible name of the remove control. Default "Remove". */
  removeLabel?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Tag(props: TagProps): JSX.Element;
