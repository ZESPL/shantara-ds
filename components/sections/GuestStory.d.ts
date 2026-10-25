import * as React from "react";
export interface Story { quote: React.ReactNode; name?: string; context?: string; src?: string; alt?: string }
export interface GuestStoryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** One story. */
  story?: Story;
  /** Two or three short quotes. */
  stories?: Story[];
  title?: React.ReactNode;
  sub?: React.ReactNode;
  headingLevel?: 2 | 3;
}
export declare function GuestStory(props: GuestStoryProps): JSX.Element;
