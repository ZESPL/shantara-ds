import * as React from "react";
export interface FaqItem { question: string; answer: React.ReactNode }
export interface FaqSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  /** One <TextLink/>, e.g. to the full FAQ. */
  action?: React.ReactNode;
  /** A single list. */
  items?: FaqItem[];
  /** Named groups — content/faq.json `categories`. */
  groups?: { name: string; faqs: FaqItem[] }[];
  /** Emit FAQPage JSON-LD from the plain-text answers. */
  schema?: boolean;
  headingLevel?: 2 | 3;
  /** Index of the question open on load; null = all closed. */
  defaultOpen?: number | null;
}
export declare function FaqSection(props: FaqSectionProps): JSX.Element;
