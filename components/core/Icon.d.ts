import * as React from "react";

/** The curated Shantara icon registry, grouped by job. */
export declare const ICON_GROUPS: {
  contact: string[]; stay: string[]; care: string[]; nature: string[];
  content: string[]; status: string[]; direction: string[]; social: string[];
};

/** Every registered slug, flat (see ICON_GROUPS). Lucide, except the Simple Icons `social` group. */
export declare const ICON_NAMES: readonly string[];

export type ShantaraIconName =
  | "phone" | "message-circle" | "mail" | "map-pin" | "globe" | "languages" | "share-2" | "external-link"
  | "calendar-days" | "clock" | "bed-double" | "utensils" | "wifi" | "car" | "plane" | "train-front"
  | "stethoscope" | "heart-pulse" | "user-round" | "users" | "shield-check" | "award" | "leaf" | "sprout"
  | "sun" | "moon" | "droplets" | "wind" | "mountain"
  | "book-open" | "file-text" | "quote" | "bookmark" | "download" | "filter" | "sliders-horizontal" | "search"
  | "info" | "alert-circle" | "check-circle-2" | "check" | "x"
  | "arrow-right" | "arrow-left" | "arrow-up" | "arrow-down"
  | "chevron-right" | "chevron-left" | "chevron-up" | "chevron-down" | "plus" | "minus" | "menu"
  | "instagram" | "facebook" | "linkedin" | "youtube" | "x-social";

/**
 * Lucide glyph wrapper — intentional addition (the brand package ships no icon set).
 * Renders the glyph as a CSS mask so it takes `currentColor`.
 */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** A registered slug (ICON_NAMES). Other Lucide slugs render but should be registered first. */
  name: ShantaraIconName | (string & {});
  /** Box size in px (default 20). */
  size?: number | string;
  /** Ignored — kept for API parity; Lucide masks carry their own stroke. */
  strokeWidth?: number;
  color?: string;
  /** Accessible name. Omit for decorative icons (aria-hidden). */
  label?: string;
}

export declare function Icon(props: IconProps): JSX.Element;
