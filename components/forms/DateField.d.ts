import * as React from "react";

/**
 * Single-date calendar in Input's chrome.
 * The stored value is an ISO date (`YYYY-MM-DD`); the field shows a long date.
 */
export interface DateFieldProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean | string;
  /** Control height: sm 44 · md 52 (default) · lg 56. */
  size?: "sm" | "md" | "lg";
  /** Shown when no date is chosen. */
  placeholder?: string;
  /** ISO date, or "" when empty. */
  value?: string;
  defaultValue?: string;
  /** Called with the next ISO date, or "" when cleared. */
  onChange?: (value: string) => void;
  /** Earliest ISO date that can be chosen. */
  min?: string;
  /** Latest ISO date that can be chosen. */
  max?: string;
  /** Submitted with the form as an ISO date. */
  name?: string;
  id?: string;
  /** Display locale for the long date, months and weekdays. Week start follows the locale. */
  locale?: string;
  todayLabel?: string;
  clearLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  prevYearLabel?: string;
  nextYearLabel?: string;
  /** Year-list chevrons, which jump twelve years. */
  prevYearsLabel?: string;
  nextYearsLabel?: string;
  /** Accessible name for the month-name button in the day view. */
  chooseMonthLabel?: string;
  /** Accessible name for the year button, and the year list. */
  chooseYearLabel?: string;
  dialogLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export declare function DateField(props: DateFieldProps): JSX.Element;
