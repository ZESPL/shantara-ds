import * as React from "react";

export interface ArticlePerson {
  /** As in content/doctors, e.g. "Dr. Bahja Janu". */
  name: string;
  role?: React.ReactNode;
  /** Profile URL. */
  href?: string;
  /** Author only: small square portrait; initials when omitted. */
  src?: string;
}

export interface ArticleHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** The article title (h1). No label above it. */
  title: React.ReactNode;
  /** One or two sentences under the title (lead size). */
  dek?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  /** First item of the meta row; object form links to the category page. */
  category?: string | { label: string; href?: string };
  /** Display date, e.g. "12 August 2026", with ISO `dateTime`. */
  date?: string;
  dateTime?: string;
  /** "Updated …" in the byline's second line. */
  updated?: string;
  updatedDateTime?: string;
  /** e.g. "6 min read". */
  readTime?: string;
  author?: ArticlePerson;
  /** Medical reviewer — clinical articles only, real reviewer only. */
  reviewer?: ArticlePerson;
  /** Right end of the byline row — usually <ShareBar compact label="" />. */
  share?: React.ReactNode;
  /** Lead photograph: `src` + `alt`, or a ready node in `media`. */
  src?: string;
  alt?: string;
  media?: React.ReactNode;
  caption?: React.ReactNode;
  credit?: React.ReactNode;
  /** Default "16:9"; "4:3" under 760px. */
  ratio?: string;
  mobileRatio?: string;
  ground?: "merino" | "stone";
  titleAs?: "h1" | "h2";
  /** A player in the lead photograph's place — editorial/Video props. */
  video?: import("../editorial/Video").VideoProps;
}
export declare function ArticleHeader(props: ArticleHeaderProps): JSX.Element;
