import * as React from "react";
export interface PolicyClause {
  title: string;
  text?: string | string[];
  /** SpecTable columns + rows. */
  columns?: { key: string; label: string; accent?: boolean; mobileLabel?: boolean }[];
  rows?: Record<string, React.ReactNode>[];
}
export interface PolicySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  clauses: PolicyClause[];
  footnote?: React.ReactNode;
  defaultOpen?: number | null;
  headingLevel?: 2 | 3;
}
export declare function PolicySection(props: PolicySectionProps): JSX.Element;
