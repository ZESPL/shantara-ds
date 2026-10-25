import * as React from "react";

export interface ContactItem {
  label: React.ReactNode;
  href?: string;
  /** Optional core Icon name: "phone", "message-circle", "mail", "map-pin". */
  icon?: string;
}

export interface ClosingCTAProps extends React.HTMLAttributes<HTMLElement> {
  /** "photo" (default when `src`): full-bleed dark photograph, 72svh.
   *  "ground" (default without `src`): same block on a flat ground, content height.
   *  "compact": one row band — title (+ sub) left, actions right. */
  variant?: "photo" | "ground" | "compact";
  /** Ground for "ground" / "compact". Default "pine". */
  ground?: "pine" | "himalaya" | "stone";
  /** Photograph for variant "photo". */
  src?: string;
  alt?: string;
  position?: string;
  /** One sentence. No label above it. */
  title: React.ReactNode;
  /** Optional one supporting line. */
  sub?: React.ReactNode;
  /** ONE primary Button. */
  action?: React.ReactNode;
  /** Optional second action — a secondary Button or TextLink, never a second primary. */
  secondaryAction?: React.ReactNode;
  /** Optional contact row: items (aligned, 44px each, stack under 520px) or a node. */
  contact?: Array<string | ContactItem> | React.ReactNode;
  titleAs?: "h2" | "h3";
  /** variant also takes "whatsapp" and "tariff". */
  whatsapp?: string;
  phone?: string;
  phoneLabel?: string;
  tariffHref?: string;
}
export declare function ClosingCTA(props: ClosingCTAProps): JSX.Element;
