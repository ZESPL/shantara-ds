import * as React from "react";

/**
 * Single-line text field with label, hint and error slots.
 * Free text (`text`, `search`, `email`, `tel`, `url`) keeps English letters, numbers and ordinary punctuation.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Helper text below the field. Hidden while `error` is set. */
  hint?: string;
  /** Error message; also turns the border Clay and sets aria-invalid. */
  error?: string;
  /** Adds a Himalaya asterisk and the native `required`. */
  required?: boolean;
  /** Shows a muted “Optional” (or the given string) after the label. */
  optional?: boolean | string;
  /** Control height: sm 44 · md 52 (default) · lg 56. */
  size?: "sm" | "md" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export declare function Input(props: InputProps): JSX.Element;
