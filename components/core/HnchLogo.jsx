import React from "react";

/* Parent-hospital mark. Resolves assets/ the same way as Logo, then the hnch/ folder. */
function resolveBase() {
  if (typeof document === "undefined") return "assets";
  const s = document.querySelector('script[src$="_ds_bundle.js"]');
  if (s) return s.getAttribute("src").replace(/_ds_bundle\.js$/, "assets");
  return "assets";
}

const FILE = { full: "logo", icon: "icon" };

export function HnchLogo({ mark = "full", tone = "dark", height, assetBase, style, ...rest }) {
  const base = assetBase || resolveBase();
  const h = height || (mark === "icon" ? 40 : 56);
  return (
    <img
      src={`${base}/hnch/${FILE[mark] || "logo"}-${tone}.svg`}
      alt="Hygiene Nature Cure"
      data-ds-id="core/HnchLogo"
      style={{ height: typeof h === "number" ? h + "px" : h, width: "auto", display: "block", ...style }}
      {...rest}
    />
  );
}
