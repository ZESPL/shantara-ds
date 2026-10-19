/* Real Shantara property photography from assets/photos (flat folder; see README there).
   Thin adapter over the design-system `Media` primitive: `name` is the filename without
   extension (".jpg" is assumed; pass a name ending in .jpeg/.png/.webp to use that file).
   Public profile photos are `photo_profile`: the passport headshot `doctor-*-passport.jpeg`.
   Guests are not shown close-up — the handbook's guest-privacy rules.
   Every other prop goes straight to Media: ratio ("4:3" | "16:9" | "4:5" | "3:4" | "21:9" |
   "fill"), mobileRatio, position, mobilePosition, priority, scrim ("hero" | "bottom" | …).
   Square-cut by design (--radius-media: 0). */
const PHOTO_BASE = "../../assets/photos/";

function photoSrc(name) {
  if (!name) return "";
  return PHOTO_BASE + (/\.(jpe?g|png|webp|avif)$/i.test(name) ? name : name + ".jpg");
}

function Photo({ name, ...rest }) {
  const { Media } = window.ShantaraDesignSystem_45bbe4;
  return <Media src={photoSrc(name)} {...rest} />;
}

Object.assign(window, { Photo, photoSrc });
