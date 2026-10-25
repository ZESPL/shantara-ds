import * as React from "react";
export interface GalleryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  items: { src: string; alt: string; caption?: React.ReactNode; position?: string }[];
  action?: React.ReactNode;
  headingLevel?: 2 | 3;
}
export declare function GalleryGrid(props: GalleryGridProps): JSX.Element;
