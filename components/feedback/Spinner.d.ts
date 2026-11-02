import * as React from "react";

/** Three breathing dots, the brand's only loading indicator. No rotating rings. */
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** sm 5px · md 7px (default) · lg 10px dots. A number sets a custom dot diameter in px. */
  size?: "sm" | "md" | "lg" | number;
  /** Dot colour. Default Himalaya (`--text-brand`); use `var(--color-merino)` on dark grounds. */
  color?: string;
  /** Announced to assistive tech (role="status"). Default "Loading". */
  label?: string;
  /** Show the label as visible text beside the dots. */
  showLabel?: boolean;
}

export declare function Spinner(props: SpinnerProps): JSX.Element;
