import * as React from "react";

export interface AuthorCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Full name as in content/doctors, e.g. "Dr. Bahja Janu". */
  name: string;
  role?: React.ReactNode;
  /** Portrait; omitted → initials on the neutral ground. */
  src?: string;
  /** Small normal-case line above the name inside the card. Default "Written by". */
  label?: React.ReactNode;
  /** One short paragraph, only confirmed facts from content/doctors. */
  bio?: React.ReactNode;
  /** Profile URL; makes the name a link. */
  href?: string;
  /** Usually a TextLink ("About our doctors"). */
  action?: React.ReactNode;
  headingLevel?: 2 | 3 | 4;
}
export declare function AuthorCard(props: AuthorCardProps): JSX.Element;
