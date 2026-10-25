import * as React from "react";
export interface NotFoundSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  searchAction?: string;
  searchLabel?: string;
  links?: { label: string; href: string }[];
  headingLevel?: 1 | 2;
}
export declare function NotFoundSection(props: NotFoundSectionProps): JSX.Element;
