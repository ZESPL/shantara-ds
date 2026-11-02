import * as React from "react";

export interface StepItem { title: React.ReactNode; text?: React.ReactNode }
export interface NumberedStepsProps extends React.OlHTMLAttributes<HTMLOListElement> {
  items: StepItem[];
  /** `horizontal` (default): numbered rows/columns. `vertical`: a timeline of numbered circles joined by a 1px line, content to the right. */
  orientation?: "horizontal" | "vertical";
  /** Horizontal only: columns from 1000px (2 from 760px). */
  columns?: 1 | 2 | 3 | 4;
  start?: number;
  /** Horizontal only: hairline above each step. */
  rules?: boolean;
  headingLevel?: 3 | 4;
}
export declare function NumberedSteps(props: NumberedStepsProps): JSX.Element;
