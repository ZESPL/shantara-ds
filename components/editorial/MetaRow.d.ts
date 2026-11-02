import * as React from "react";

export interface MetaItem {
  label: React.ReactNode;
  /** Lucide name via core Icon, e.g. "clock", "calendar-days", "tag", "stethoscope". */
  icon?: string;
  href?: string;
  /** ISO date. Wraps the label in <time dateTime>. */
  dateTime?: string;
}

export interface MetaRowProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Strings or MetaItem objects. Falsy entries are skipped. */
  items: Array<string | MetaItem | null | undefined | false> | string;
  /** `caption` (default, muted) or `sm` (body-sm, secondary). */
  size?: "caption" | "sm";
}
export declare function MetaRow(props: MetaRowProps): JSX.Element | null;
