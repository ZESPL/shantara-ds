import * as React from "react";
export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  items: { icon?: string; title: React.ReactNode; text?: React.ReactNode }[];
  columns?: 3 | 4;
  action?: React.ReactNode;
  headingLevel?: 2 | 3;
}
export declare function FeatureGrid(props: FeatureGridProps): JSX.Element;
