import * as React from "react";
export interface ProcessSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  /** Three to five. */
  steps: { title: React.ReactNode; text?: React.ReactNode }[];
  action?: React.ReactNode;
  headingLevel?: 2 | 3;
}
export declare function ProcessSection(props: ProcessSectionProps): JSX.Element;
