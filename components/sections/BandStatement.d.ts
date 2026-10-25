import * as React from "react";

export interface BandStatementProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which edge carries the rosette band (30% of the surface). `end` follows reading direction. */
  edge?: "start" | "end" | "left" | "right";
  /** Solid dark ground. `himalaya` (default) or `pine`. */
  ground?: "himalaya" | "pine";
  /** Usually a <Statement/> and an optional <PlainList/>. */
  children?: React.ReactNode;
  /** The accent as a quote — QuoteBlock props. */
  quote?: { quote: React.ReactNode; cite?: React.ReactNode; role?: React.ReactNode };
}
export declare function BandStatement(props: BandStatementProps): JSX.Element;
