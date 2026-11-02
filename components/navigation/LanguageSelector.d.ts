import * as React from "react";

export interface LanguageSelectorOption {
  code: string;
  nativeName: string;
  compact: string;
  direction: "ltr" | "rtl";
  current: boolean;
  href: string | null;
  available: boolean;
  /** Planned but not yet enabled. Listed disabled with "Coming soon". */
  comingSoon?: boolean;
}

export interface LanguageSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  locale?: string;
  /** Map of locale → { path | slug, translation_status }. Missing locales are omitted. */
  pageTranslations?: Record<string, { path?: string; slug?: string; translation_status?: string; published?: boolean }>;
  /** Path after the locale prefix, used when pageTranslations is omitted. */
  rest?: string;
  onSelect?: (code: string, option: LanguageSelectorOption) => void;
  /** Compact trigger uses EN / AR / … Native names always appear in the list. No flags. */
  compact?: boolean;
  label?: string;
  /** Text beside unavailable languages. Default t("Coming soon"). */
  comingSoonLabel?: string;
  /** Start with the list open (specimens). */
  defaultOpen?: boolean;
  /** Specimen-only override. Production omits this and reads enabled locales from locales.js. */
  options?: LanguageSelectorOption[];
}

/**
 * Reusable locale control. Always renders: the current language on the trigger, every planned
 * language in the list, unavailable ones disabled with "Coming soon".
 * Never uses flags as the primary representation.
 */
export declare function LanguageSelector(props: LanguageSelectorProps): JSX.Element;
