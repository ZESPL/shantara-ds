import * as React from "react";
export interface ProgrammeCompareProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  programmes: { name: string; href?: string; focus?: React.ReactNode; forWhom?: React.ReactNode; durations?: React.ReactNode }[];
  caption?: string;
  labels?: { name?: string; focus?: string; forWhom?: string; durations?: string };
  action?: React.ReactNode;
  headingLevel?: 2 | 3;
}
export declare function ProgrammeCompare(props: ProgrammeCompareProps): JSX.Element;
