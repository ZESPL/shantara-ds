import * as React from "react";
export interface VideoProps extends React.HTMLAttributes<HTMLElement> {
  /** One MP4 URL on R2/CDN, or `sources`. */
  src?: string;
  sources?: { src: string; type: string }[];
  poster?: string;
  /** Accessible name of the video. */
  title?: string;
  /** WebVTT URL — required when the video has speech. */
  captions?: string;
  transcript?: string;
  mode?: "player" | "loop";
  ratio?: "16:9" | "21:9" | "4:3" | "3:2" | "4:5" | "1:1" | "fill" | string;
  mobileRatio?: "16:9" | "4:3" | "4:5" | "1:1" | string;
  position?: string;
}
export declare function Video(props: VideoProps): JSX.Element;
