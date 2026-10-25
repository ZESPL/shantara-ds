import * as React from "react";

export interface FormSplitProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  /** The form: fields, consent and one primary button (`type="submit"`). Rendered inside a real <form>. Always first. */
  children?: React.ReactNode;
  /** The Stone panel copy — what happens next, under the photograph. Sticky from 1000px when the window is at least 800px tall. */
  aside?: React.ReactNode;
  /** Photograph of the place across the top of the panel (4:3). */
  src?: string;
  alt?: string;
  position?: string;
  media?: React.ReactNode;
  /** The form without the panel, capped at 44rem. */
  compact?: boolean;
  /** Submit handler on the <form>. Enter in a field and the submit button both call it. */
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  action?: string;
  method?: string;
  /** Turn off the browser's own `required` / type checks when the page validates itself. */
  noValidate?: boolean;
  /** Accessible name for the form, when no visible heading names it. */
  formLabel?: string;
  /** Any other attributes for the <form> element (id, name, autoComplete…). */
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}
export declare function FormSplit(props: FormSplitProps): JSX.Element;
