import * as React from "react";

export interface AnnouncementBarProps extends React.HTMLAttributes<HTMLElement> {
  /** The message: one sentence. */
  children: React.ReactNode;
  /** Optional link after the message. Needs `linkLabel`. */
  href?: string;
  linkLabel?: React.ReactNode;
  /** "himalaya" (default), "pine" or "stone". */
  ground?: "himalaya" | "pine" | "stone";
  /** Show a close button (default false). */
  dismissible?: boolean;
  /** Remember the close in localStorage under this key. Change the key for a new message. */
  storageKey?: string;
  onDismiss?: () => void;
  /** Default "Close announcement". */
  closeLabel?: string;
  /** The landmark's accessible name. Default "Announcement". */
  label?: string;
}
export declare function AnnouncementBar(props: AnnouncementBarProps): JSX.Element | null;
