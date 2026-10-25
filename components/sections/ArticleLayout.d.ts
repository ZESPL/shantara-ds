import * as React from "react";
export interface ArticleLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  toc?: { id: string; label: React.ReactNode; level?: 2 | 3 }[];
  tocTitle?: string;
  aside?: React.ReactNode;
  /** The text — usually <Prose/>. */
  children?: React.ReactNode;
}
export declare function ArticleLayout(props: ArticleLayoutProps): JSX.Element;
