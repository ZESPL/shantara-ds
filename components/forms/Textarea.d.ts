import * as React from "react";

/** Multi-line field with optional character counter. Notes stay in English: Latin letters, numbers and ordinary punctuation. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean | string;
  /** Default 4. Resizes vertically only. */
  rows?: number;
  /** Shows an `n/max` counter when the component is controlled. */
  maxLength?: number;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
