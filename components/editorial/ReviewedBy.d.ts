import * as React from "react";

export interface ReviewedByProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Reviewer's full name, e.g. "Dr. Bahja Janu". */
  name: string;
  role?: React.ReactNode;
  /** Reviewer profile URL. */
  href?: string;
  /** Display date, e.g. "12 August 2026". */
  date?: string;
  /** ISO date for <time>, e.g. "2026-08-12". */
  dateTime?: string;
  /** Display date of the next scheduled review. */
  nextReview?: string;
  /** Default "Medically reviewed by". */
  label?: React.ReactNode;
  /** One caption line, e.g. "This article is general information, not a diagnosis." */
  note?: React.ReactNode;
  /** Stone box instead of hairlines, for the end of an article. */
  boxed?: boolean;
}
export declare function ReviewedBy(props: ReviewedByProps): JSX.Element;
