import * as React from "react";
export interface TimelineSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  rows: { time: React.ReactNode; title: React.ReactNode; text?: React.ReactNode }[];
  src?: string; alt?: string; media?: React.ReactNode;
  ratio?: "4:5" | "3:4" | "4:3";
  mobileRatio?: "4:3" | "4:5" | "16:9";
  mediaSide?: "start" | "end";
  headingLevel?: 2 | 3;
}
export declare function TimelineSection(props: TimelineSectionProps): JSX.Element;
