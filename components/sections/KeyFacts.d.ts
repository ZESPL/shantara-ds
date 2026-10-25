import * as React from "react";
export interface KeyFactsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  facts: { label: React.ReactNode; value: React.ReactNode }[];
  panelTitle?: string;
  action?: React.ReactNode;
  /** Intro paragraphs. */
  children?: React.ReactNode;
  headingLevel?: 2 | 3;
}
export declare function KeyFacts(props: KeyFactsProps): JSX.Element;
