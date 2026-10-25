import * as React from "react";
export interface NoticeBandProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  /** One or two sentences. */
  children?: React.ReactNode;
  tone?: "note" | "caution";
  layout?: "inline" | "band";
  action?: React.ReactNode;
  headingLevel?: 2 | 3 | 4;
}
export declare function NoticeBand(props: NoticeBandProps): JSX.Element;
