import * as React from "react";
export interface CredentialStripProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  items: { name: string; issuer?: string; holder?: string; number?: string }[];
  headingLevel?: 2 | 3;
}
export declare function CredentialStrip(props: CredentialStripProps): JSX.Element;
