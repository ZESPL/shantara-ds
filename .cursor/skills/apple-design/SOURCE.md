# Source

Vendored from <https://github.com/dickwu/apple-design-skill> at commit
`914b6a377c22755597e4405e54911b996de822d7` (15 October 2026).

Copied: `SKILL.md`, `README.md`, `references/`, `scripts/`. Left out: the upstream `AGENTS.md`,
`GEMINI.md`, `.cursorrules` and `.github/`, which are install instructions for that repository.

The HIG pages under `references/hig/` are Apple's text, reproduced for design review (see
`README.md` › Origin and license). This folder is not copied to `dist/` and is not published.

## Using it here

Shantara is a website, so the skill's web scope applies: the eight principles and the
foundations (accessibility, colour, typography, layout, writing), not Apple's iOS or macOS
platform conventions. Where the HIG and this design system disagree, the design system's own
rules win (root `SKILL.md`, `guidelines/accessibility.html`, `ui_kits/website/skill-copy.md`).

## Updating

Clone the upstream repository again and replace these files, or run
`node scripts/pull-hig.mjs` from this folder to refresh `references/` from Apple's site.
Update the commit above.
