import React from "react";

/* Native <video> only (ui_kits/website/skill-video.md): sources and poster are absolute
   R2/CDN URLs, never committed files, never a third-party player. Two modes:
   - player (default): controls, preload="none", the poster shows until play; `captions`
     (WebVTT) is required when the video has speech, `transcript` is kept for the page.
   - loop: a short muted background loop (hero, panorama). Autoplays only when the visitor
     has not asked for reduced motion, and always carries a pause / play button.
   The frame keeps `ratio` (and `mobileRatio` under 760px) like Media; `fill` covers its
   parent. No radius. Above the fold, preload the poster in the page head (it is the LCP image). */
const CSS = `
.sh-video{position:relative;display:block;margin:0;overflow:hidden;background:var(--color-pine-tree);aspect-ratio:var(--_r,16 / 9)}
.sh-video[data-ratio="fill"]{position:absolute;inset:0;aspect-ratio:auto;height:100%}
.sh-video>video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:var(--_pos,center);display:block;background:transparent}
.sh-video-toggle{position:absolute;inset-inline-end:var(--space-4);inset-block-end:var(--space-4);z-index:2;display:inline-grid;place-items:center;width:var(--tap-min);height:var(--tap-min);border:0;border-radius:var(--radius-pill);background:color-mix(in srgb, var(--color-pine-tree) 62%, transparent);color:var(--color-merino);cursor:pointer;backdrop-filter:var(--blur-glass)}
.sh-video-toggle:focus-visible{outline:none;box-shadow:var(--ring-focus-inverse)}
.sh-video-toggle svg{width:18px;height:18px}
@media (prefers-reduced-transparency: reduce){.sh-video-toggle{backdrop-filter:none;background:var(--color-pine-tree)}}
@media (max-width:759.98px){.sh-video[data-mobile-ratio]{aspect-ratio:var(--_rm)}}
`;

function ensure() {
  if (typeof document === "undefined" || document.getElementById("sh-video-css")) return;
  const el = document.createElement("style");
  el.id = "sh-video-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}

const RATIO = { "16:9": "16 / 9", "21:9": "21 / 9", "4:3": "4 / 3", "3:2": "3 / 2", "4:5": "4 / 5", "1:1": "1 / 1" };
const PAUSE = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
const PLAY = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z" fill="currentColor" /></svg>;

/* sources: [{ src, type }] */
export function Video({ src, sources, poster, title, captions, transcript, mode = "player", ratio = "16:9", mobileRatio, position, className, style, ...rest }) {
  ensure();
  const ref = React.useRef(null);
  const loop = mode === "loop";
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [playing, setPlaying] = React.useState(loop && !reduce);
  React.useEffect(() => {
    const v = ref.current;
    if (!loop || !v) return;
    if (playing) { const p = v.play(); if (p && p.catch) p.catch(() => setPlaying(false)); } else v.pause();
  }, [playing, loop]);
  const vars = { "--_r": ratio === "fill" ? undefined : RATIO[ratio] || ratio, "--_pos": position };
  if (mobileRatio) vars["--_rm"] = RATIO[mobileRatio] || mobileRatio;
  return (
    <figure data-ds-id="editorial/Video" className={"sh-video" + (className ? " " + className : "")} data-mode={loop ? "loop" : "player"} data-ratio={ratio === "fill" ? "fill" : undefined} data-mobile-ratio={mobileRatio ? "" : undefined} style={{ ...vars, ...style }} {...rest}>
      <video
        ref={ref}
        poster={poster}
        controls={!loop}
        muted={loop}
        loop={loop}
        playsInline
        autoPlay={loop && !reduce}
        preload={loop ? "metadata" : "none"}
        aria-label={title}
      >
        {sources ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />) : src ? <source src={src} type="video/mp4" /> : null}
        {captions ? <track kind="captions" src={captions} srcLang="en" label="English" default /> : null}
      </video>
      {loop ? (
        <button type="button" className="sh-video-toggle" aria-label={playing ? "Pause video" : "Play video"} aria-pressed={!playing} onClick={() => setPlaying(!playing)}>{playing ? PAUSE : PLAY}</button>
      ) : null}
      {transcript ? <figcaption className="sh-visually-hidden">{transcript}</figcaption> : null}
    </figure>
  );
}
