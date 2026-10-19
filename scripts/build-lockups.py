"""Builds the Shantara x Hygiene Nature Cure lockups in assets/lockups/.

The lockups are composed from the approved artwork only: assets/wordmark-*.svg for
Shantara and assets/hnch/*.svg for Hygiene Nature Cure in the co-brand. The endorsed
lockups name Hygiene Nature Cure in type, not artwork. The endorsement line is outlined
from Diodrum Semibold, so every file renders the same without the font.

    python scripts/build-lockups.py          (needs fontTools)
"""
import re
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "lockups"
FONT = ROOT / "assets" / "fonts" / "DiodrumCyrillic-Semibold.ttf"
ENDORSEMENT = "A SISTER CONCERN OF HYGIENE NATURE CURE"
# The horizontal lockup wraps the line here; the stacked lockup keeps it on one line.
WRAPPED = ("A SISTER CONCERN OF", "HYGIENE NATURE CURE")
LEADING = 2.0         # baseline to baseline, in endorsement cap heights

# Shantara wordmark box is 664.59 x 86.07; its capitals run from y 12.2 to the baseline at 85.
WM_W, WM_H, CAP = 664.59, 86.07, 73.0
# Hygiene Nature Cure lockup without the Nature Cure line: 1946 x 454.
HN_W, HN_H = 1946.0, 454.0

# One tone per Shantara wordmark colourway. Endorsed lockups are that one colour throughout.
# The co-brand keeps the supplied Hygiene tone beside Shantara and has no gold version.
TONES = {
    "dark": dict(wordmark="dark", shantara="#2D2926", hnch="dark", hygiene="#1C1A1D", ink="#2D2926"),
    "olive": dict(wordmark="olive", shantara="#495213", hnch="dark", hygiene="#1C1A1D", ink="#495213"),
    "cream": dict(wordmark="cream", shantara="#F4F0E6", hnch="light", hygiene="#FFFFFF", ink="#F4F0E6"),
    "gold": dict(wordmark="gold", shantara="#DFC985", hnch="light", hygiene=None, ink="#DFC985"),
    "current": dict(wordmark="current", shantara="currentColor", hnch="current", hygiene="currentColor", ink="currentColor"),
}
RULE_W = 2.5          # hairline between the two names, in wordmark units
RULE_OPACITY = 0.45


def inner(path):
    """The drawing inside an SVG file, without metadata, titles or ids."""
    text = Path(path).read_text(encoding="utf-8")
    body = re.search(r"<svg[^>]*>(.*)</svg>", text, re.S).group(1)
    body = re.sub(r"<metadata>.*?</metadata>|<title>.*?</title>|<defs>\s*</defs>", "", body, flags=re.S)
    body = re.sub(r'\s(id|fill)="[^"]*"', "", body)
    return body.strip()


def place(body, fill, x, y, w, h, vw, vh):
    return (f'<svg x="{x:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" '
            f'viewBox="0 0 {vw} {vh}"><g fill="{fill}">{body}</g></svg>')


def outline(text, cap_h, tracking=0.18):
    """Text as one path, top of the capitals at y 0. Returns (path d, width)."""
    font = TTFont(FONT)
    glyphs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
    upm, cap = font["head"].unitsPerEm, font["OS/2"].sCapHeight
    s = cap_h / cap
    pen = SVGPathPen(glyphs)
    x = 0.0
    for i, ch in enumerate(text):
        name = cmap[ord(ch)]
        glyphs[name].draw(TransformPen(pen, (s, 0, 0, -s, x, cap_h)))
        x += hmtx[name][0] * s
        if i < len(text) - 1:
            x += tracking * upm * s
    return pen.getCommands(), x


def rule(x, y, h, color):
    return f'<rect x="{x - RULE_W / 2:.2f}" y="{y:.2f}" width="{RULE_W}" height="{h:.2f}" fill="{color}" opacity="{RULE_OPACITY}"/>'


def svg(title, parts, x0, y0, x1, y1):
    w, h = x1 - x0, y1 - y0
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.2f} {y0:.2f} {w:.2f} {h:.2f}" role="img">\n'
            f"  <title>{title}</title>\n  " + "\n  ".join(parts) + "\n</svg>\n")


def endorsement(t, eb_cap, x, baseline):
    """A SISTER CONCERN OF HYGIENE NATURE CURE, one line of type, for the stacked lockup.
    Returns (parts, width, top, bottom)."""
    d, w = outline(ENDORSEMENT, eb_cap)
    parts = [f'<path transform="translate({x:.2f} {baseline - eb_cap:.2f})" fill="{t["ink"]}" d="{d}"/>']
    return parts, w, baseline - eb_cap, baseline


def build(tone, t):
    wm = inner(ROOT / "assets" / f"wordmark-{t['wordmark']}.svg")
    hn = inner(ROOT / "assets" / "hnch" / f"hygiene-{t['hnch']}.svg")
    shantara = place(wm, t["shantara"], 0, 0, WM_W, WM_H, WM_W, WM_H)
    files = {}

    # Endorsed, horizontal: Shantara | the endorsement on two left-aligned lines, the block
    # centred on the Shantara capitals.
    eb_cap = 0.27 * CAP
    rx = WM_W + 0.85 * CAP
    bx = rx + 0.85 * CAP
    block = (1 + LEADING) * eb_cap
    top = (85.0 - CAP / 2) - block / 2
    parts, w = [], 0.0
    for i, line in enumerate(WRAPPED):
        d, lw = outline(line, eb_cap)
        parts.append(f'<path transform="translate({bx:.2f} {top + i * LEADING * eb_cap:.2f})" fill="{t["ink"]}" d="{d}"/>')
        w = max(w, lw)
    y0, y1 = top, top + block
    files["endorsed-horizontal"] = svg(
        "Shantara, a sister concern of Hygiene Nature Cure",
        [shantara, rule(rx, 85.0 - CAP, CAP, t["ink"])] + parts,
        0, min(0, y0), bx + w, max(WM_H, y1))

    # Endorsed, stacked: Shantara over the endorsement line, centred.
    eb_cap = 0.21 * CAP
    _, w, y0, _ = endorsement(t, eb_cap, 0, 0)
    base = WM_H + 0.7 * CAP - y0               # top of the line's ink sits 0.7 cap below Shantara
    parts, w, y0, y1 = endorsement(t, eb_cap, (WM_W - w) / 2, base)
    files["endorsed-stacked"] = svg(
        "Shantara, a sister concern of Hygiene Nature Cure",
        [shantara] + parts,
        min(0, (WM_W - w) / 2), 0, max(WM_W, (WM_W + w) / 2), y1)

    # Co-brand: one line, Hygiene centred on the Shantara capitals. Joint material, never documents.
    if t["hygiene"] is None:
        return write(tone, files)
    s = 0.8 * CAP / 265.0                        # HYGIENE capitals are 265 units tall
    hn_w, hn_h = HN_W * s, HN_H * s
    hy = (85.0 - CAP / 2) - hn_h / 2             # wordmark centre on the Shantara cap middle
    rx = WM_W + 0.9 * CAP
    hx = rx + 0.9 * CAP
    files["cobrand"] = svg(
        "Shantara and Hygiene",
        [shantara,
         rule(rx, 85.0 - CAP, CAP, t["ink"]),
         place(hn, t["hygiene"], hx, hy, hn_w, hn_h, HN_W, HN_H)],
        0, min(0, hy), hx + hn_w, max(WM_H, hy + hn_h))
    write(tone, files)


def write(tone, files):
    for name, text in files.items():
        (OUT / f"{name}-{tone}.svg").write_text(text, encoding="utf-8")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for tone, t in TONES.items():
        build(tone, t)
    print(f"Wrote {len(list(OUT.glob('*.svg')))} lockups to {OUT.relative_to(ROOT)}")
