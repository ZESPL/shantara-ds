import * as React from "react";
export interface CatalogueEntry {
  /** The anchor: /en/therapies#<id>. */
  id: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  meta?: Array<string | import("../editorial/MetaRow").MetaItem> | React.ReactNode;
  src?: string; alt?: string; position?: string;
  media?: React.ReactNode;
  /** A <SpecTable/> or <PlainList/>. */
  facts?: React.ReactNode;
  action?: React.ReactNode;
}
export interface CatalogueSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: CatalogueEntry[];
  alternate?: boolean;
  /** Photograph column from 1000px: "5" (5 of 12) or "half". */
  media?: "5" | "half";
  ratio?: "4:3" | "3:2" | "4:5" | "1:1";
  headingLevel?: 2 | 3;
}
export declare function CatalogueSection(props: CatalogueSectionProps): JSX.Element;
