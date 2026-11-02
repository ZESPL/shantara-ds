import * as React from "react";

/** Progressive-disclosure list: FAQs, itinerary days, treatment details. */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{ title: string; content: React.ReactNode }>;
  /** Index open on mount; pass `null` for all closed. */
  defaultOpen?: number | null;
  allowMultiple?: boolean;
}

export declare function Accordion(props: AccordionProps): JSX.Element;
