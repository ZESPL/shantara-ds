import * as React from "react";

export interface ShareBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Canonical URL of the article. Defaults to location.href. */
  url?: string;
  /** Article title, used for the email subject and WhatsApp text. */
  title?: string;
  /** Leading label, default "Share". Pass "" to hide. */
  label?: string;
  /** Order and choice of channels. */
  channels?: Array<"copy" | "whatsapp" | "email">;
  /** Icon-only 44px circles (labels stay for screen readers). */
  compact?: boolean;
}
export declare function ShareBar(props: ShareBarProps): JSX.Element;
