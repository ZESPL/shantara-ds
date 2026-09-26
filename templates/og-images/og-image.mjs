/* Shantara share image renderer — reference implementation.
   The specification is ui_kits/website/skill-og-images.md. If this file and that
   document disagree, the document wins and this file is corrected.

   renderOgImage() takes the resolved page copy and returns a 1200 × 630 JPEG buffer.
   It uses satori (layout and text → SVG) and sharp (photo crop, SVG → JPEG).
   No React: the tree is plain { type, props } objects. */
import { readFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const TEMPLATES = ["default", "programme", "editorial"];

/* Brand values. Each is a design-system token resolved to a literal, because satori
   cannot read CSS custom properties. Change the token first, then this table. */
const C = {
  merino: "#F4F0E6", // --color-merino
  pine: "#2D2926", // --color-pine-tree
  stone: "#514C49", // --text-secondary (--color-stone-500)
  cottonSeed: "#C4BFB6", // --pattern-ink-light, --pattern-rule-light
};
const SCRIM_HERO = "linear-gradient(to top, rgba(45,41,38,0.86) 0%, rgba(45,41,38,0.62) 38%, rgba(45,41,38,0.22) 68%, rgba(45,41,38,0) 88%)"; // --scrim-hero
const SCRIM_HEADER = "linear-gradient(to bottom, rgba(45,41,38,0.5) 0%, rgba(45,41,38,0) 100%)"; // --scrim-header

const INSET = 64; // --space-11: the safe area on all four sides
const WORDMARK_WIDTH = 216;
const WORDMARK_HEIGHT = Math.round((WORDMARK_WIDTH * 86.07) / 664.59);
const TITLE_LEADING = 1.06; // --leading-tight
const SUB_SIZE = 24; // --text-xl
const SUB_LEADING = 1.45; // --leading-normal
const STACK = 24; // --space-7: title → supporting line
const BAND = 360; // editorial rosette band: 30% of 1200 (--pattern-band-md)
const CELL = BAND / 2; // cell = band / 2 (tokens/pattern.css rule 2)
const SPLIT_PHOTO = 480; // programme photograph: 40% (HeroSplit split="40")

/* Title steps down with length so it never needs more than three lines. */
function titleSize(title) {
  if (title.length <= 32) return 64; // --text-5xl
  if (title.length <= 60) return 56;
  return 48; // --text-4xl
}

/* Per template: width of the text column, the longest title that stays within three
   lines in it, the lines the supporting line may take, and the longest supporting line
   that fits in them. */
const LAYOUT = {
  default: { column: 760, titleMax: 90, subLines: 2, subMax: 110 },
  programme: { column: OG_WIDTH - SPLIT_PHOTO - INSET - 56, titleMax: 60, subLines: 3, subMax: 140 },
  editorial: { column: OG_WIDTH - BAND - INSET * 2, titleMax: 72, subLines: 2, subMax: 100 },
};

const el = (type, style, children) => ({ type, props: { style: { display: "flex", ...style }, children } });
const img = (src, width, height, style = {}) => ({ type: "img", props: { src, width, height, style } });
const dataUri = (buf, mime) => `data:${mime};base64,${buf.toString("base64")}`;

/**
 * @typedef {object} OgAssets
 * @property {Buffer} fontLight    DiodrumCyrillic-Light.ttf
 * @property {Buffer} fontRegular  DiodrumCyrillic-Regular.ttf
 * @property {Buffer} wordmarkCream wordmark-cream.svg (photo and dark grounds)
 * @property {Buffer} wordmarkDark  wordmark-dark.svg (Merino ground)
 * @property {Buffer} patternUnit   pattern-unit.png (530 × 530 repeat cell, black on transparent)
 */

/** Read the five brand files once. `paths` maps each key of OgAssets to a file path. */
export async function loadOgAssets(paths) {
  const entries = await Promise.all(Object.entries(paths).map(async ([k, p]) => [k, await readFile(p)]));
  return Object.fromEntries(entries);
}

async function photoLayer(photo, width, height) {
  const buf = await sharp(photo).rotate().resize(width, height, { fit: "cover", position: "centre" }).jpeg({ quality: 90 }).toBuffer();
  return img(dataUri(buf, "image/jpeg"), width, height, { position: "absolute", top: 0, right: 0 });
}

function textBlock({ title, sub, column, subLines, ink, subInk }) {
  const size = titleSize(title);
  const children = [
    {
      type: "div",
      props: {
        style: { display: "block", fontFamily: "Diodrum", fontWeight: 300, fontSize: size, lineHeight: TITLE_LEADING, color: ink, textWrap: "balance" },
        children: title,
      },
    },
  ];
  if (sub) {
    children.push({
      type: "div",
      props: {
        style: { display: "block", marginTop: STACK, fontFamily: "Diodrum", fontWeight: 400, fontSize: SUB_SIZE, lineHeight: SUB_LEADING, color: subInk, lineClamp: subLines },
        children: sub,
      },
    });
  }
  return el("div", { flexDirection: "column", width: column }, children);
}

/**
 * @param {object} input
 * @param {"default"|"programme"|"editorial"} input.template
 * @param {string} input.title        og.title ?? page title (no brand suffix)
 * @param {string} [input.description] og.description ?? page description
 * @param {string|Buffer} [input.photo] JPEG master; required by default and programme, ignored by editorial
 * @param {OgAssets} input.assets
 * @returns {Promise<Buffer>} 1200 × 630 JPEG
 */
export async function renderOgImage({ template, title, description, photo, assets }) {
  if (!TEMPLATES.includes(template)) throw new Error(`Unknown OG template "${template}"`);
  const { column, titleMax, subLines, subMax } = LAYOUT[template];
  title = String(title || "").trim();
  if (!title) throw new Error("OG title is empty");
  if (title.length > titleMax) throw new Error(`OG title is ${title.length} characters; the ${template} template allows ${titleMax}. Set a shorter og.title: "${title}"`);
  if (template !== "editorial" && !photo) throw new Error(`The ${template} OG template needs a photo: "${title}"`);

  /* The supporting line is shown only when it fits whole. It is never truncated. */
  const d = String(description || "").trim();
  const sub = d && d.length <= subMax && title.length <= 60 ? d : "";

  const onPhoto = template === "default";
  const wordmark = img(dataUri(onPhoto ? assets.wordmarkCream : assets.wordmarkDark, "image/svg+xml"), WORDMARK_WIDTH, WORDMARK_HEIGHT);
  const text = textBlock({ title, sub, column, subLines, ink: onPhoto ? C.merino : C.pine, subInk: onPhoto ? C.merino : C.stone });
  const content = el("div", { position: "absolute", left: INSET, top: INSET, bottom: INSET, flexDirection: "column", justifyContent: "space-between" }, [wordmark, text]);

  const layers = [];
  if (template === "default") {
    layers.push(await photoLayer(photo, OG_WIDTH, OG_HEIGHT));
    layers.push(el("div", { position: "absolute", left: 0, right: 0, bottom: 0, height: OG_HEIGHT, backgroundImage: SCRIM_HERO }));
    layers.push(el("div", { position: "absolute", left: 0, right: 0, top: 0, height: 180, backgroundImage: SCRIM_HEADER }));
  } else if (template === "programme") {
    layers.push(await photoLayer(photo, SPLIT_PHOTO, OG_HEIGHT));
  } else {
    /* satori writes an SVG luminance mask, so the black line art is inverted to white. */
    const cell = await sharp(assets.patternUnit).resize(CELL, CELL).negate({ alpha: false }).png().toBuffer();
    layers.push(
      el("div", { position: "absolute", top: 0, right: 0, bottom: 0, width: BAND, borderLeft: `1px solid ${C.cottonSeed}` }, [
        el("div", {
          width: "100%",
          height: "100%",
          backgroundColor: C.cottonSeed,
          opacity: 0.9, // --pattern-opacity-light
          maskImage: `url(${dataUri(cell, "image/png")})`,
          maskSize: `${CELL}px ${CELL}px`,
          maskRepeat: "repeat",
        }),
      ]),
    );
  }

  const root = el("div", { position: "relative", width: OG_WIDTH, height: OG_HEIGHT, backgroundColor: onPhoto ? C.pine : C.merino }, [...layers, content]);
  const svg = await satori(root, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: "Diodrum", data: assets.fontLight, weight: 300, style: "normal" },
      { name: "Diodrum", data: assets.fontRegular, weight: 400, style: "normal" },
    ],
  });
  return sharp(Buffer.from(svg)).jpeg({ quality: 82, progressive: true, chromaSubsampling: "4:2:0" }).toBuffer();
}
