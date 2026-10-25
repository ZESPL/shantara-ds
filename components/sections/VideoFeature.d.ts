import * as React from "react";
import { VideoProps } from "../editorial/Video";
export interface VideoFeatureProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  video: Omit<VideoProps, "mode" | "ratio">;
  layout?: "full" | "split";
  mediaSide?: "start" | "end";
  ground?: "merino" | "stone" | "himalaya" | "pine";
  /** A caption line under the full-width frame. */
  note?: React.ReactNode;
  action?: React.ReactNode;
  headingLevel?: 2 | 3;
}
export declare function VideoFeature(props: VideoFeatureProps): JSX.Element;
