import * as React from "react";

export interface PortraitFrameProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  media?: React.ReactNode;
  alt?: string;
  name: string;
  role?: React.ReactNode;
  /** Qualification or years in practice, only when confirmed in content/doctors. */
  detail?: React.ReactNode;
  /** `false` renders the framed portrait only (name kept as alt/aria-label). Used by AuthorCard. */
  caption?: boolean;
  position?: string;
  headingLevel?: 2 | 3 | 4;
}
export declare function PortraitFrame(props: PortraitFrameProps): JSX.Element;
