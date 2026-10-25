import * as React from "react";
export interface InPageNavProps extends React.HTMLAttributes<HTMLElement> {
  items: { id: string; label: React.ReactNode }[];
  /** Accessible name and visible label from 760px. */
  label?: string;
  sticky?: boolean;
  /** Force the current link; otherwise it follows the section in view. */
  activeId?: string;
}
export declare function InPageNav(props: InPageNavProps): JSX.Element;
