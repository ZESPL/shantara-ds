# `assets/videos/` — agent index

Guest films filed in this design system. Read this instead of opening the files. Logos, lockups and the rosette are in [`../README.md`](../README.md). Photographs are in [`../photos/README.md`](../photos/README.md).

## How to use this index

1. Pick from the [Index](#index). One row per film.
2. These files are **not** testimonial records. `content/testimonials/` stays empty until a film has `consent_status` `recorded`, a transcript that does not state a clinical result, a poster, a WebVTT caption file, and a Cloudflare R2 URL. Do not invent the quote, the name, the country, the stay date or the consent.
3. The filename is a working label from the drop in `temp/Testimonials` on 7 November 2026. It is not the title, not the guest’s words, and not a medical claim. Several filenames say “wellness retreat” or state an outcome. Do not copy either onto a page, a deck, a schema description or a testimonial record.
4. The mp4 files sit in `testimonials/` beside this index and are gitignored (`.gitignore`). A clone does not contain them. Do not commit them, and do not point a component at the local path. Hosting, the player, VideoObject and the video sitemap: [`ui_kits/website/skill-video.md`](../../ui_kits/website/skill-video.md).

## Not ready to publish

Every film is **Check**. An identifiable guest is on camera. No consent record is in this repo. Do not put one on a page, in a deck, in a share image, or in the video sitemap.

None of them is on Cloudflare R2. There is no WebM, no poster, and no separate caption file. English subtitles are burned into the picture, which does not satisfy the `captions` prop (that prop is a WebVTT URL). Four films also burn the SHANTARA wordmark into the picture, sometimes across the guest. They are finished cuts, not clean masters.

Speech is present in every film, so a published cut still needs a transcript in the first HTML and a WebVTT file. Do not lift burned-in lines that state a clinical result, a medication change, or a cure. Testimonials may describe the stay, the food, the service and how the guest felt. They are not proof of efficacy ([MED-04](../../ui_kits/website/search-visibility/medical.md)).

A line in one film calls Shantara a premium naturopathy retreat. That phrasing stays off public pages (handbook §15). Another film says the guest was “admitted”. Do not copy hospital words onto a page.

`uploadDate` is unknown. The file dates are when the files were copied into `temp/`, not a publication date. Do not invent one.

## Index

| File | Length | Frame | Who is on camera | What the sampled frames show | Public use |
| --- | --- | --- | --- | --- | --- |
| `testimonials/diabetes-reversal-bp-control-naturopathy-guest-story-shantara.mp4` | 5:00 | 1024×576 | A man in a light hat and dark glasses. No name in the frames checked | Seated on a bench among plants, plus a shot beside the pool. Burned-in subtitles. No wordmark in the frames checked. One subtitle states a medication change. Others mention rooms, meals and an inauguration. Do not quote those lines, and do not treat the filename as the subject | **Check** |
| `testimonials/executive-stress-relief-full-body-naturopathy-detox-shantara.mp4` | 1:44 | 960×720 | A woman in a black hijab with white spots. No name in the frames checked | Garden shot with the wordmark across the figure, then a seated interview. She talks about work and the stay. “Detox” is in the filename only, in the frames checked | **Check** |
| `testimonials/lifestyle-disease-treatment-holistic-wellness-retreat-shantara.mp4` | 0:50 | 960×720 | Lower third: **Mirsana**, Kasaragod | Seated interview, then the same guest reading on a sofa. She says she came for weight loss and speaks about hospitality. One burned-in line uses the handbook §15 phrasing. Do not repeat it. The filename’s “lifestyle disease” is not what the frames show | **Check** |
| `testimonials/luxury-nature-wellness-retreat-guest-experience-shantara.mp4` | 0:34 | 720×1280 portrait | A man with a white beard and dark glasses, seated in a planted courtyard. He says he is from Mangalore. No name in the frames checked | One seated setup. He talks about facilities and the staff, and says they came a few days earlier. Wordmark in the corner. Do not use “wellness retreat” from the filename | **Check** |
| `testimonials/medicine-free-healthy-living-lifestyle-modification-shantara.mp4` | 0:48 | 960×720 | A woman in a light blue shirt. No name, and no wordmark, in the frames checked | Walking the grounds, seated at a table with a drink and fruit, then at a glass door. Subtitles are about food and daily life. “Medicine-free” is in the filename only, in the frames checked | **Check** |
| `testimonials/post-viral-joint-pain-relief-barefoot-walk-therapy-shantara.mp4` | 1:54 | 1276×718 | Lower third: **Ms Tasneem Fatima**, interior designer, Hyderabad. A subtitle spells the name Thasneem Fathima. Use neither spelling as a published name until Shantara confirms it | Seated interview by a window, plus a balcony shot. Subtitles mention a viral fever and a change in her body. Do not quote the outcome. Joint pain and barefoot walking are in the filename only, in the frames checked | **Check** |

## Technical

Probe of the files as filed. Re-encode before any R2 upload: WebM plus MP4, `-movflags +faststart`, a poster that is a real frame, and a WebVTT file that is not burned in. Targets are in [skill-video.md](../../ui_kits/website/skill-video.md).

| File | Size | Bitrate | Video | Audio | ISO 8601 | Sitemap seconds |
| --- | --- | --- | --- | --- | --- | --- |
| `diabetes-reversal-bp-control-naturopathy-guest-story-shantara.mp4` | 25.8 MB | 721 kb/s | H.264 Baseline, 1024×576, 25 fps | AAC-LC, 62 kb/s | `PT5M0.32S` | 300 |
| `executive-stress-relief-full-body-naturopathy-detox-shantara.mp4` | 9.75 MB | 790 kb/s | H.264 High, 960×720, 25 fps | HE-AAC, 50 kb/s | `PT1M43.56S` | 104 |
| `lifestyle-disease-treatment-holistic-wellness-retreat-shantara.mp4` | 4.87 MB | 818 kb/s | H.264 High, 960×720, 25 fps | HE-AAC, 62 kb/s | `PT49.99S` | 50 |
| `luxury-nature-wellness-retreat-guest-experience-shantara.mp4` | 3.87 MB | 963 kb/s | H.264 High, 720×1280, 25 fps | HE-AAC, 61 kb/s | `PT33.71S` | 34 |
| `medicine-free-healthy-living-lifestyle-modification-shantara.mp4` | 3.80 MB | 663 kb/s | H.264 High, 960×720, 25 fps | HE-AAC, 51 kb/s | `PT48.13S` | 48 |
| `post-viral-joint-pain-relief-barefoot-walk-therapy-shantara.mp4` | 5.82 MB | 429 kb/s | H.264 High, 1276×718, 25 fps | HE-AAC, 60 kb/s | `PT1M53.73S` | 114 |

Sitemap seconds are the probe duration rounded to the nearest second. Use them only after the film is actually published. `contentUrl` will be the R2 MP4, not this folder.
