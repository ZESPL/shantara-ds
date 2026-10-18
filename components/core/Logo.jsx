import React from "react";

/* Resolves the brand asset folder from wherever _ds_bundle.js was loaded from,
   so <Logo /> works in cards, kits and consuming projects without configuration. */
function resolveBase() {
  if (typeof document === "undefined") return "assets";
  const s = document.querySelector('script[src$="_ds_bundle.js"]');
  if (s) return s.getAttribute("src").replace(/_ds_bundle\.js$/, "assets");
  return "assets";
}

const FILE = { wordmark: "wordmark", icon: "icon" };

export function Logo({ mark = "wordmark", tone = "dark", height, assetBase, style, ...rest }) {
  const base = assetBase || resolveBase();
  const kind = FILE[mark] ? mark : "wordmark";
  const h = height || (kind === "icon" ? 40 : 22);
  return (
    <img
      src={`${base}/${FILE[kind]}-${tone}.svg`}
      alt="Shantara"
      data-ds-id="core/Logo"
      style={{ height: typeof h === "number" ? h + "px" : h, width: "auto", display: "block", ...style }}
      {...rest}
    />
  );
}
