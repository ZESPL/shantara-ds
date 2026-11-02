import * as React from "react";

export interface QuoteFact { label: string; text: React.ReactNode }
export interface QuoteBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** The words only. Curly quotes are added. */
  quote: React.ReactNode;
  /** Who said it (Medium). */
  cite?: React.ReactNode;
  /** Their role or context, after the name (secondary). */
  role?: React.ReactNode;
  /** 1–3 labelled facts on a hairline beneath. Labels are normal-case, not overlines. */
  facts?: QuoteFact[];
  /** `lg` (statement size, default) or `md` (title size, for narrow columns). */
  size?: "lg" | "md";
}
export declare function QuoteBlock(props: QuoteBlockProps): JSX.Element;
