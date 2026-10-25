import * as React from "react";
export interface ReferencesSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  items: { work: React.ReactNode; source?: React.ReactNode; year?: React.ReactNode; href?: string }[];
  /** ReviewedBy props. */
  reviewer?: { name: string; role?: string; href?: string; date?: string; dateTime?: string };
  /** Anchor prefix: #ref-1, #ref-2… */
  idPrefix?: string;
  headingLevel?: 2 | 3;
}
export declare function ReferencesSection(props: ReferencesSectionProps): JSX.Element;
