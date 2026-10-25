import * as React from "react";
export interface ContactLocationProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  ways?: { icon?: string; label: string; value: React.ReactNode; href?: string }[];
  /** Address lines. */
  address?: string[];
  directions?: { icon?: string; title: string; text?: string }[];
  src?: string; alt?: string; media?: React.ReactNode;
  /** A link out to a maps app. */
  map?: { href: string; label?: string };
  headingLevel?: 2 | 3;
}
export declare function ContactLocation(props: ContactLocationProps): JSX.Element;
