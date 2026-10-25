import * as React from "react";
export interface InclusionsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  includes?: string[];
  excludes?: string[];
  /** Label and basis only — never an amount. */
  supplements?: { label: string; basis?: string }[];
  /** Small notes under the lists (tariff.json public_notes, without figures). */
  notes?: string[];
  /** One <TextLink/> to the tariff page. */
  action?: React.ReactNode;
  labels?: { includes?: string; excludes?: string; supplements?: string };
  headingLevel?: 2 | 3;
}
export declare function InclusionsSection(props: InclusionsSectionProps): JSX.Element;
