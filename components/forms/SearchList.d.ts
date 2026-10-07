import * as React from "react";

export type SearchListOption =
  | string
  | {
      value: string;
      label: string;
      /** Quiet second line under the label. */
      description?: string;
    };

/**
 * Searchable single-choice list in Input's chrome.
 * `onChange` receives the option value, or "" when cleared.
 */
export interface SearchListProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "defaultValue" | "onChange" | "children"> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean | string;
  /** Control height: sm 44 · md 52 (default) · lg 56. */
  size?: "sm" | "md" | "lg";
  options?: SearchListOption[];
  /** Shown when the filter matches nothing. */
  emptyLabel?: string;
  clearLabel?: string;
  /** Option value, or "" when empty. */
  value?: string;
  defaultValue?: string;
  /** Called with the next option value, or "" when cleared. */
  onChange?: (value: string) => void;
}

export declare function SearchList(props: SearchListProps): JSX.Element;
