import * as React from "react";

export interface Person {
  name: string;
  role?: React.ReactNode;
  /** Portrait photograph. Omit it and the frame shows initials. */
  src?: string;
  alt?: string;
}

export interface PeopleRowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  /** Two to four people, each rendered as a <PortraitFrame/>. */
  people: Person[];
  /** One small line under the portraits. */
  note?: React.ReactNode;
  /** One <TextLink/>. */
  action?: React.ReactNode;
  /** "sm": five to eight people at smaller portraits. */
  size?: "md" | "sm";
}
export declare function PeopleRow(props: PeopleRowProps): JSX.Element;
