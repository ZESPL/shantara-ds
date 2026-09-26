/* Shantara design-system portal — one shared shell for index.html and every docs page.
   Top bar (search), left sidebar (IA from _ds_manifest.json), breadcrumbs, page ID,
   prev/next, heading Copy-ID buttons, and the preview stage (ground + screen toggles).

   Load with <script src="[../]portal.js"></script> before page scripts.
   data-mode="catalog"  → index.html (catalog.js sets the current page from the hash)
   data-mode="specimen" → components/_specimen.html (hover outline + copy chip for [data-ds-id])
   Vanilla JS, no dependencies. */
(() => {
  "use strict";

  const script = document.currentScript;
  const MODE = (script && script.dataset.mode) || "page";
  const ROOT = ((script && script.getAttribute("src")) || "portal.js").replace(/portal\.js(?:[?#].*)?$/, "");
  const HOME = MODE === "catalog" ? "" : (ROOT || "./");

  /* ---------- small helpers ---------- */
  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem("dsp:" + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (err) {
        return fallback;
      }
    },
    set(key, value) {
      try { localStorage.setItem("dsp:" + key, JSON.stringify(value)); } catch (err) { /* private mode */ }
    },
  };

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const slug = (value) => String(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const ICON = {
    chevron: '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" focusable="false"><path d="M5 5l10 10M15 5 5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    search: '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  };

  /* ---------- Copy ID ---------- */
  let live = null;
  function announce(message) {
    if (!live) {
      live = document.createElement("div");
      live.className = "dsp-vh";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      document.body.appendChild(live);
    }
    live.textContent = "";
    setTimeout(() => { live.textContent = message; }, 30);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      area.remove();
      return ok;
    }
  }

  function idButton(ref, { label = "Copy ID", cls = "" } = {}) {
    return `<button type="button" class="dsp-id ${cls}" data-ds-ref="${esc(ref)}" data-label="${esc(label)}" title="Copy ${esc(ref)}" aria-label="Copy ID ${esc(ref)}"><span class="dsp-id-label">${esc(label)}</span></button>`;
  }

  document.addEventListener("click", async (event) => {
    const btn = event.target.closest && event.target.closest("button[data-ds-ref]");
    if (!btn) return;
    event.preventDefault();
    event.stopPropagation();
    const ref = btn.dataset.dsRef;
    const ok = await copyText(ref);
    const label = btn.querySelector(".dsp-id-label") || btn;
    label.textContent = ok ? "Copied" : "Press Ctrl+C";
    btn.classList.add("is-copied");
    announce(ok ? `Copied ${ref}` : `Could not copy ${ref}`);
    clearTimeout(btn._dspTimer);
    btn._dspTimer = setTimeout(() => {
      label.textContent = btn.dataset.label || "Copy ID";
      btn.classList.remove("is-copied");
    }, 1600);
  }, true);

  /* data-ds-id="editorial/Tile" → ds:components/editorial/Tile; "page/home/hero" → ds:page/home/hero */
  function dsIdRef(id) {
    return /^(page|components|docs)\//.test(id) ? `ds:${id}` : `ds:components/${id}`;
  }

  /* ---------- specimen mode: outline + chip over any [data-ds-id] ---------- */
  function installIdOverlay() {
    const box = document.createElement("div");
    box.className = "dsp-idbox";
    box.hidden = true;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "dsp-id dsp-idchip";
    chip.hidden = true;
    chip.innerHTML = '<span class="dsp-id-label"></span>';
    document.body.append(box, chip);
    let current = null;

    function show(el) {
      current = el;
      const r = el.getBoundingClientRect();
      const ref = dsIdRef(el.dataset.dsId);
      box.style.cssText = `top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px`;
      box.hidden = false;
      chip.dataset.dsRef = ref;
      chip.dataset.label = ref;
      chip.title = `Copy ${ref}`;
      chip.setAttribute("aria-label", `Copy ID ${ref}`);
      if (!chip.classList.contains("is-copied")) chip.querySelector(".dsp-id-label").textContent = ref;
      chip.hidden = false;
      const left = Math.max(2, Math.min(r.left, window.innerWidth - chip.offsetWidth - 2));
      chip.style.top = `${Math.max(2, r.top)}px`;
      chip.style.left = `${left}px`;
    }
    function hide() {
      current = null;
      box.hidden = true;
      chip.hidden = true;
    }
    document.addEventListener("mouseover", (event) => {
      if (chip.contains(event.target)) return;
      const el = event.target.closest && event.target.closest("[data-ds-id]");
      if (!el) { hide(); return; }
      if (el !== current) show(el);
    });
    document.addEventListener("focusin", (event) => {
      if (event.target === chip) return;
      const el = event.target.closest && event.target.closest("[data-ds-id]");
      if (el) show(el);
    });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("scroll", () => { if (current) show(current); }, { passive: true });
    window.addEventListener("resize", () => { if (current) show(current); });
  }

  if (MODE === "specimen") {
    const start = () => installIdOverlay();
    if (document.body) start();
    else document.addEventListener("DOMContentLoaded", start);
    window.DSPortal = { copyText, idButton, dsIdRef };
    return;
  }

  /* When a docs page is framed (e.g. inside the catalog viewer) keep it bare. */
  let framed = false;
  try { framed = window.self !== window.top; } catch (err) { framed = true; }
  if (framed) {
    document.documentElement.classList.add("is-framed");
    window.DSPortal = { framed: true, copyText, idButton, dsIdRef, ready: Promise.resolve(null), decorateHeadings() {}, mountStage: null };
    return;
  }

  /* ---------- information architecture ---------- */
  const FAMILY_ORDER = ["Core", "Forms", "Navigation", "Feedback", "Editorial", "Sections"];
  const GROUPS = [
    { key: "Start", label: "Start", blurb: "How to browse this folder, how to drop it into another repo, the agent skill and the ID scheme",
      order: ["docs/use.html", "docs/skill.html", "docs/readme.html", "docs/copy-ids.html"] },
    { key: "Brand", label: "Brand", blurb: "Colour, type, logo, pattern, imagery and print",
      order: ["guidelines/colors.html", "guidelines/type.html", "guidelines/logo.html", "guidelines/brand-pattern.html", "guidelines/brand-imagery.html", "guidelines/brand-protection.html", "guidelines/brand-applications.html"] },
    { key: "Foundations", label: "Foundations", blurb: "Scale, rhythm, radius, borders, elevation, motion and accessibility",
      order: ["guidelines/spacing-scale.html", "guidelines/spacing-inuse.html", "guidelines/radius.html", "guidelines/borders.html", "guidelines/elevation.html", "guidelines/motion.html", "guidelines/accessibility.html"] },
    { key: "Components", label: "Components", blurb: "Core, forms, navigation, feedback, editorial and sections — family overviews and one page per component", families: true },
    { key: "Website", label: "Website kit", blurb: "Sample site, builder skill, IA, sections, copy, ICP, stack and QA",
      order: [
        "ui_kits/website/index.html", "docs/website-kit.html", "docs/website-skill.html", "docs/website-ia.html",
        "docs/website-sections.html", "docs/website-content.html",
        { path: "docs/website-copy.html", prefix: "docs/website-copy-", children: [
          "docs/website-copy-voice.html", "docs/website-copy-naming.html", "docs/website-copy-claims.html",
          "docs/website-copy-patterns.html", "docs/website-copy-words.html", "docs/website-copy-localisation.html",
        ] },
        { path: "docs/icp.html", prefix: "docs/icp-", children: [
          "docs/icp-messaging-map.html", "docs/icp-profile-template.html", "docs/icp-weight-metabolic.html",
          "docs/icp-pain-mobility.html", "docs/icp-stress-sleep-burnout.html", "docs/icp-digestive-inflammatory.html",
          "docs/icp-hormonal-vitality.html", "docs/icp-healthy-ageing-longevity.html", "docs/icp-short-health-reset.html",
          "docs/icp-overlays.html", "docs/icp-operating-guide.html", "docs/icp-claim-governance.html",
          "docs/icp-research-and-sources.html",
        ] },
        "docs/website-technical.html",
        { path: "docs/website-search-visibility.html", prefix: "docs/website-search-visibility-", children: [
          "docs/website-search-visibility-data.html", "docs/website-search-visibility-rendering.html", "docs/website-search-visibility-crawling.html",
          "docs/website-search-visibility-languages.html", "docs/website-search-visibility-urls.html", "docs/website-search-visibility-redirects.html",
          "docs/website-search-visibility-migration.html", "docs/website-search-visibility-pages.html", "docs/website-search-visibility-medical.html",
          "docs/website-search-visibility-rates.html", "docs/website-search-visibility-schema.html", "docs/website-search-visibility-social.html",
          "docs/website-search-visibility-images.html", "docs/website-search-visibility-files.html", "docs/website-search-visibility-accessibility.html",
          "docs/website-search-visibility-performance.html", "docs/website-search-visibility-security.html", "docs/website-search-visibility-ai.html",
          "docs/website-search-visibility-measurement.html", "docs/website-search-visibility-do-not.html",
        ] },
        "docs/website-stack.html", "docs/website-structure.html", "docs/website-images.html", "docs/website-og-images.html", "docs/website-premium.html", "docs/website-qa.html",
      ] },
    { key: "App", label: "App kit", blurb: "In-stay guest companion — schedule, protocol, notes",
      order: ["ui_kits/app/index.html", "docs/app-kit.html"] },
    { key: "Templates", label: "Templates", blurb: "Brand deck layouts and the presentation skill",
      order: ["templates/brand-deck/BrandDeck.dc.html", "docs/presentations-skill.html"] },
    { key: "Content", label: "Content & sources", blurb: "Property handbook and the original source files",
      order: ["docs/handbook.html", "docs/sources.html"] },
  ];
  const LABELS = {
    "ui_kits/website/index.html": "Sample site",
    "ui_kits/app/index.html": "Sample app",
    "docs/website-kit.html": "Kit notes",
    "docs/app-kit.html": "Kit notes",
    "docs/website-skill.html": "Website skill",
    "docs/website-copy.html": "Voice & copywriting",
    "docs/icp.html": "ICP and audience",
    "docs/presentations-skill.html": "Presentation skill",
    "templates/brand-deck/BrandDeck.dc.html": "Brand deck",
  };

  function childLabel(card) {
    const name = card.name.replace(/^ICP\s+/, "");
    return LABELS[card.path] || name.charAt(0).toUpperCase() + name.slice(1);
  }

  function collectCards(manifest) {
    const cards = (manifest.cards || []).map((card) => ({
      path: card.path,
      group: card.group,
      name: card.name,
      subtitle: card.subtitle || "",
      viewport: card.viewport,
      kind: card.kind || (card.viewport === "doc" ? "doc" : "card"),
      family: card.family || "",
      folder: card.folder || "",
      source: card.source || "",
      component: !!card.family,
    }));
    for (const tpl of manifest.templates || []) {
      cards.push({ path: tpl.entryPath, group: "Templates", name: tpl.name, subtitle: tpl.description, viewport: "1280x720", kind: "card", family: "", component: false });
    }
    return cards;
  }

  function buildTree(cards) {
    const byPath = new Map(cards.map((c) => [c.path, c]));
    const used = new Set();
    const prefixNodes = [];
    const node = (card, label) => {
      used.add(card.path);
      return { card, label: label || LABELS[card.path] || card.name, children: [] };
    };
    const groups = GROUPS.map((g) => ({ key: g.key, label: g.label, blurb: g.blurb, children: [] }));

    GROUPS.forEach((g, gi) => {
      const target = groups[gi];
      for (const item of g.order || []) {
        if (typeof item === "string") {
          const card = byPath.get(item);
          if (card) target.children.push(node(card));
          continue;
        }
        const card = byPath.get(item.path);
        if (!card) continue;
        const branch = node(card);
        branch.prefix = item.prefix;
        for (const childPath of item.children || []) {
          const child = byPath.get(childPath);
          if (child) branch.children.push(node(child, childLabel(child)));
        }
        prefixNodes.push(branch);
        target.children.push(branch);
      }
    });

    const comps = groups.find((g) => g.key === "Components");
    const families = [...FAMILY_ORDER];
    cards.forEach((c) => { if (c.component && !families.includes(c.family)) families.push(c.family); });
    for (const family of families) {
      const folder = family.toLowerCase();
      const overview = cards.find((c) => c.path === `components/${folder}/${folder}.card.html`)
        || cards.find((c) => new RegExp(`^components/${folder}/[^/]+\\.card\\.html$`).test(c.path));
      const members = cards.filter((c) => c.component && c.family === family).sort((a, b) => a.name.localeCompare(b.name));
      if (!overview && !members.length) continue;
      const fam = overview ? node(overview, family) : { label: family, children: [] };
      fam.family = family;
      fam.children = members.map((c) => node(c));
      comps.children.push(fam);
    }

    const leftovers = cards.filter((c) => !used.has(c.path)).sort((a, b) => a.name.localeCompare(b.name));
    for (const card of leftovers) {
      const branch = prefixNodes.find((n) => n.prefix && card.path.startsWith(n.prefix));
      if (branch) { branch.children.push(node(card, childLabel(card))); continue; }
      let group = groups.find((g) => g.key === card.group);
      if (!group) {
        group = { key: card.group, label: card.group, blurb: "", children: [] };
        groups.push(group);
      }
      group.children.push(node(card));
    }

    const flat = [];
    const walk = (list, trail) => list.forEach((n) => {
      n.trail = trail;
      if (n.card) flat.push(n);
      walk(n.children, [...trail, n]);
    });
    groups.forEach((g) => walk(g.children, [g]));
    return { groups: groups.filter((g) => g.children.length), flat, byPath };
  }

  function isStandalone(card) {
    return card.path.startsWith("docs/");
  }

  function hrefFor(card) {
    if (isStandalone(card)) return ROOT + card.path;
    return `${HOME}#/${card.path}`;
  }

  function refFor(card) {
    if (!card) return "ds:index";
    if (card.component) return `ds:components/${card.folder || card.family.toLowerCase()}/${card.name}`;
    const fam = /^components\/([^/]+)\/[^/]+\.card\.html$/.exec(card.path);
    if (fam) return `ds:components/${fam[1]}`;
    if (/^ui_kits\/[^/]+\/index\.html$/.test(card.path)) return `ds:${card.path.replace(/\/index\.html$/, "")}`;
    if (card.path.startsWith("templates/")) return `ds:${card.path.split("/").slice(0, 2).join("/")}`;
    return `ds:${card.path.replace(/\.html$/, "")}`;
  }

  function pathRef(path) {
    if (!path) return "ds:index";
    const comp = /^docs\/component(?:\.html)?\?c=(.+)$/.exec(path);
    if (comp) return `ds:components/${comp[1]}`;
    return `ds:${path.replace(/\.html$/, "")}`;
  }

  function detectCurrent() {
    if (MODE === "catalog") return "";
    const parts = decodeURIComponent(location.pathname).split("/").filter(Boolean);
    let file = parts.pop() || "index.html";
    if (!/\.html$/.test(file)) file += ".html";
    const dir = parts.pop() || "";
    let path = dir ? `${dir}/${file}` : file;
    if (file === "component.html") path += `?c=${new URLSearchParams(location.search).get("c") || "Button"}`;
    return path;
  }

  /* ---------- shell ---------- */
  const els = {};
  let data = null;
  let current = detectCurrent();

  function buildShell() {
    const body = document.body;
    body.classList.add("dsp");
    const skip = body.querySelector(":scope > .ds-skip, :scope > .skip");
    const content = document.createElement("div");
    content.className = "dsp-content";
    [...body.childNodes].forEach((n) => {
      if (n === skip || (n.nodeType === 1 && n.tagName === "SCRIPT")) return;
      content.appendChild(n);
    });

    const top = document.createElement("header");
    top.className = "dsp-top";
    top.innerHTML = `
      <button class="dsp-menu" type="button" aria-controls="dsp-side" aria-expanded="false" aria-label="Open navigation" data-dsp-menu>${ICON.menu}</button>
      <a class="dsp-brand" href="${HOME || "./"}">
        <img src="${ROOT}assets/wordmark-dark.svg" alt="Shantara" width="104" height="16">
        <span class="dsp-brand-rule" aria-hidden="true"></span>
        <span class="dsp-brand-label">Design system</span>
      </a>
      <div class="dsp-search" role="search">
        <label class="dsp-vh" for="dsp-q">Search pages and components</label>
        <span class="dsp-search-icon">${ICON.search}</span>
        <input id="dsp-q" type="search" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="dsp-results"
          placeholder="Search pages and components" autocomplete="off" spellcheck="false">
        <kbd class="dsp-kbd" aria-hidden="true">/</kbd>
        <ul id="dsp-results" class="dsp-results" role="listbox" aria-label="Search results" hidden></ul>
      </div>`;

    const backdrop = document.createElement("div");
    backdrop.className = "dsp-backdrop";
    backdrop.hidden = true;

    const layout = document.createElement("div");
    layout.className = "dsp-layout";
    const side = document.createElement("aside");
    side.className = "dsp-side";
    side.id = "dsp-side";
    side.setAttribute("aria-label", "Design system navigation");
    side.innerHTML = `<div class="dsp-side-head"><span>Contents</span><button type="button" class="dsp-side-close" aria-label="Close navigation" data-dsp-close>${ICON.close}</button></div><nav class="dsp-nav" aria-label="Design system"><p class="dsp-nav-loading">Loading contents…</p></nav>`;

    const main = document.createElement("main");
    main.className = "dsp-main";
    main.id = "dsp-main";
    main.innerHTML = `<div class="dsp-bar"><nav class="dsp-crumbs" aria-label="Breadcrumb"><ol></ol></nav><div class="dsp-pageid"></div></div>`;
    main.appendChild(content);
    const pager = document.createElement("nav");
    pager.className = "dsp-pager";
    pager.setAttribute("aria-label", "Previous and next page");
    main.appendChild(pager);
    layout.append(side, main);

    const firstScript = body.querySelector(":scope > script");
    body.insertBefore(top, firstScript);
    body.insertBefore(backdrop, firstScript);
    body.insertBefore(layout, firstScript);
    if (skip) body.insertBefore(skip, top);
    else {
      const link = document.createElement("a");
      link.className = "ds-skip";
      link.href = "#dsp-main";
      link.textContent = "Skip to content";
      body.insertBefore(link, top);
    }

    const narrow = window.matchMedia("(max-width: 640px)");
    const input = top.querySelector("#dsp-q");
    const syncPlaceholder = () => { input.placeholder = narrow.matches ? "Search" : "Search pages and components"; };
    syncPlaceholder();
    narrow.addEventListener("change", syncPlaceholder);

    Object.assign(els, {
      top, side, nav: side.querySelector(".dsp-nav"), main, content, pager, backdrop,
      crumbs: main.querySelector(".dsp-crumbs ol"), pageid: main.querySelector(".dsp-pageid"),
      menu: top.querySelector("[data-dsp-menu]"), q: top.querySelector("#dsp-q"), results: top.querySelector("#dsp-results"),
    });
  }

  /* ---------- drawer ---------- */
  const drawerQuery = window.matchMedia("(max-width: 999px)");
  function openDrawer() {
    document.body.classList.add("dsp-nav-open");
    els.menu.setAttribute("aria-expanded", "true");
    els.backdrop.hidden = false;
    const target = els.nav.querySelector("[aria-current='page']") || els.side.querySelector("[data-dsp-close]");
    requestAnimationFrame(() => target && target.focus({ preventScroll: false }));
  }
  function closeDrawer(returnFocus) {
    if (!document.body.classList.contains("dsp-nav-open")) return;
    document.body.classList.remove("dsp-nav-open");
    els.menu.setAttribute("aria-expanded", "false");
    els.backdrop.hidden = true;
    if (returnFocus) els.menu.focus();
  }

  /* ---------- sidebar ---------- */
  function contains(n, path) {
    if (n.card && n.card.path === path) return true;
    return n.children.some((c) => contains(c, path));
  }
  function isOpen(id, fallback) {
    const map = store.get("nav", {});
    return id in map ? !!map[id] : fallback;
  }
  function setOpen(id, value) {
    const map = store.get("nav", {});
    map[id] = value;
    store.set("nav", map);
  }

  function renderItem(n) {
    const cur = n.card && n.card.path === current;
    const link = n.card
      ? `<a class="dsp-link" href="${esc(hrefFor(n.card))}"${cur ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`
      : `<span class="dsp-link">${esc(n.label)}</span>`;
    if (!n.children.length) return `<li>${link}</li>`;
    const id = "n-" + slug(n.family || (n.card && n.card.path) || n.label);
    const open = contains(n, current) || isOpen(id, false);
    return `<li class="dsp-branch">
      <div class="dsp-branch-row">${link}<button type="button" class="dsp-twisty" aria-expanded="${open}" aria-controls="dsp-${id}" aria-label="Show pages in ${esc(n.label)}" data-dsp-toggle="${id}">${ICON.chevron}</button></div>
      <ul class="dsp-list dsp-sub" id="dsp-${id}"${open ? "" : " hidden"}>${n.children.map(renderItem).join("")}</ul>
    </li>`;
  }

  function renderNav() {
    if (!data) return;
    const home = MODE === "catalog" && !current;
    const groups = data.groups.map((g) => {
      const id = "g-" + slug(g.key);
      const open = g.children.some((n) => contains(n, current)) || isOpen(id, true);
      return `<div class="dsp-group">
        <button type="button" class="dsp-group-btn" aria-expanded="${open}" aria-controls="dsp-${id}" data-dsp-toggle="${id}"><span>${esc(g.label)}</span>${ICON.chevron}</button>
        <ul class="dsp-list" id="dsp-${id}"${open ? "" : " hidden"}>${g.children.map(renderItem).join("")}</ul>
      </div>`;
    }).join("");
    els.nav.innerHTML = `<a class="dsp-link dsp-home-link" href="${HOME || "./"}"${home ? ' aria-current="page"' : ""}>Overview</a>${groups}`;
    const active = els.nav.querySelector("[aria-current='page']");
    if (active) {
      const sideRect = els.side.getBoundingClientRect();
      const r = active.getBoundingClientRect();
      if (r.top < sideRect.top || r.bottom > sideRect.bottom) {
        els.side.scrollTop += r.top - sideRect.top - sideRect.height / 3;
      }
    }
  }

  function onNavClick(event) {
    const toggle = event.target.closest("[data-dsp-toggle]");
    if (toggle) {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      const list = document.getElementById(toggle.getAttribute("aria-controls"));
      if (list) list.hidden = !open;
      setOpen(toggle.dataset.dspToggle, open);
      return;
    }
    if (event.target.closest("a")) closeDrawer(false);
  }

  /* ---------- breadcrumbs, page ID, pager ---------- */
  function currentNode() {
    return data && current ? data.flat.find((n) => n.card.path === current) : null;
  }

  function renderChrome() {
    const n = currentNode();
    const crumbs = [`<li><a href="${HOME || "./"}">Design system</a></li>`];
    if (n) {
      n.trail.forEach((t, i) => {
        if (i === 0) crumbs.push(`<li><a href="${HOME}#group-${slug(t.key)}">${esc(t.label)}</a></li>`);
        else crumbs.push(`<li>${t.card ? `<a href="${esc(hrefFor(t.card))}">${esc(t.label)}</a>` : esc(t.label)}</li>`);
      });
      crumbs.push(`<li><span aria-current="page">${esc(n.label)}</span></li>`);
    } else if (current) {
      crumbs.push(`<li><span aria-current="page">${esc(document.title.split(/[·|]/)[0].trim())}</span></li>`);
    } else {
      crumbs[0] = `<li><span aria-current="page">Design system</span></li>`;
    }
    els.crumbs.innerHTML = crumbs.join("");

    const ref = n ? refFor(n.card) : pathRef(current);
    els.pageid.innerHTML = `<code class="dsp-ref">${esc(ref)}</code>${idButton(ref)}`;
    document.documentElement.dataset.dsPage = ref;

    if (!n) {
      const first = data && data.flat[0];
      els.pager.innerHTML = !current && first
        ? `<span></span><a class="dsp-pager-next" rel="next" href="${esc(hrefFor(first.card))}"><span class="dsp-pager-dir">Next</span><span class="dsp-pager-title">${esc(first.label)}</span></a>`
        : "";
      return;
    }
    const i = data.flat.indexOf(n);
    const prev = data.flat[i - 1];
    const next = data.flat[i + 1];
    const link = (m, dir) => m
      ? `<a class="dsp-pager-${dir}" rel="${dir}" href="${esc(hrefFor(m.card))}"><span class="dsp-pager-dir">${dir === "prev" ? "Previous" : "Next"}</span><span class="dsp-pager-title">${esc(m.label)}</span></a>`
      : "<span></span>";
    els.pager.innerHTML = link(prev, "prev") + link(next, "next");
  }

  /* ---------- heading Copy IDs ---------- */
  function decorateHeadings(root) {
    if (!root) return;
    const base = document.documentElement.dataset.dsPage || pathRef(current);
    root.querySelectorAll("h2[id], h3[id]").forEach((h) => {
      if (h.closest(".dsp-top, .dsp-side, .dsp-pager, [data-no-ds-ref]")) return;
      const ref = `${base}#${h.id}`;
      const existing = h.querySelector(":scope > .dsp-id");
      if (existing) {
        existing.dataset.dsRef = ref;
        existing.title = `Copy ${ref}`;
        existing.setAttribute("aria-label", `Copy ID ${ref}`);
        return;
      }
      h.classList.add("dsp-has-id");
      h.insertAdjacentHTML("beforeend", idButton(ref, { cls: "dsp-id-h" }));
    });
  }

  /* ---------- search ---------- */
  let hits = [];
  let active = -1;

  function searchIndex() {
    return data.flat.map((n) => {
      const g = n.trail[0];
      const where = n.trail.slice(1).map((t) => t.label);
      return {
        n,
        where: [g.label, ...where].join(" › "),
        name: n.label.toLowerCase(),
        hay: [n.label, n.card.name, n.card.subtitle, g.label, ...where, n.card.path].join(" ").toLowerCase(),
      };
    });
  }

  function runSearch(q) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !data) return [];
    return searchIndex()
      .filter((e) => terms.every((t) => e.hay.includes(t)))
      .map((e) => {
        const first = terms[0];
        const score = e.name === q.toLowerCase() ? 0 : e.name.startsWith(first) ? 1 : e.name.includes(first) ? 2 : 3;
        return { ...e, score };
      })
      .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name))
      .slice(0, 12);
  }

  function renderResults() {
    const q = els.q.value.trim();
    hits = runSearch(q);
    active = hits.length ? 0 : -1;
    if (!q) {
      els.results.hidden = true;
      els.q.setAttribute("aria-expanded", "false");
      els.q.removeAttribute("aria-activedescendant");
      return;
    }
    els.results.innerHTML = hits.length
      ? hits.map((h, i) => `<li role="option" id="dsp-r-${i}" aria-selected="${i === active}"><a href="${esc(hrefFor(h.n.card))}" tabindex="-1"><span class="dsp-r-name">${esc(h.n.label)}</span><span class="dsp-r-where">${esc(h.where)}</span></a></li>`).join("")
      : `<li class="dsp-r-empty" role="option" aria-disabled="true">Nothing matches “${esc(q)}”</li>`;
    els.results.hidden = false;
    els.q.setAttribute("aria-expanded", "true");
    syncActive();
  }

  function syncActive() {
    els.results.querySelectorAll("[role=option]").forEach((li, i) => li.setAttribute("aria-selected", String(i === active)));
    if (active >= 0) {
      els.q.setAttribute("aria-activedescendant", `dsp-r-${active}`);
      const li = document.getElementById(`dsp-r-${active}`);
      if (li) li.scrollIntoView({ block: "nearest" });
    } else els.q.removeAttribute("aria-activedescendant");
  }

  function closeResults() {
    els.results.hidden = true;
    els.q.setAttribute("aria-expanded", "false");
  }

  function go(href) {
    closeResults();
    els.q.blur();
    if (href.startsWith("#")) location.hash = href.slice(1);
    else location.href = href;
  }

  function bindSearch() {
    els.q.addEventListener("input", () => {
      renderResults();
      document.dispatchEvent(new CustomEvent("dsp:query", { detail: els.q.value.trim().toLowerCase() }));
    });
    els.q.addEventListener("focus", () => { if (els.q.value.trim()) renderResults(); });
    els.q.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" && hits.length) { event.preventDefault(); active = (active + 1) % hits.length; syncActive(); }
      else if (event.key === "ArrowUp" && hits.length) { event.preventDefault(); active = (active - 1 + hits.length) % hits.length; syncActive(); }
      else if (event.key === "Enter" && active >= 0 && hits[active]) { event.preventDefault(); go(hrefFor(hits[active].n.card)); }
      else if (event.key === "Escape") {
        if (!els.results.hidden) closeResults();
        else { els.q.value = ""; document.dispatchEvent(new CustomEvent("dsp:query", { detail: "" })); }
      }
    });
    els.results.addEventListener("mousedown", (event) => event.preventDefault());
    els.results.addEventListener("click", (event) => {
      const a = event.target.closest("a");
      if (!a) return;
      event.preventDefault();
      go(a.getAttribute("href"));
    });
    els.q.addEventListener("blur", () => setTimeout(closeResults, 120));
  }

  document.addEventListener("keydown", (event) => {
    if (!els.q) return;
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName) || (document.activeElement && document.activeElement.isContentEditable);
    if ((event.key === "/" && !typing) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
      event.preventDefault();
      els.q.focus();
      els.q.select();
    } else if (event.key === "Escape" && document.body.classList.contains("dsp-nav-open")) {
      closeDrawer(true);
    }
  });

  /* ---------- preview stage: ground + screen toggles ---------- */
  const SCREENS = [["phone", 390, "Phone"], ["tablet", 768, "Tablet"], ["desktop", 1440, "Desktop"], ["fit", 0, "Fit"]];
  const GROUNDS = [["light", "", "Light"], ["dark", "pine", "Dark"], ["olive", "himalaya", "Olive"]];

  function mountStage(opts) {
    const {
      toolbar, frame, grounds = true, screens = true, applyGround = null,
      fitWidth = 0, fixedHeight = 0, minHeight = 240, maxHeight = 12000, extra = "",
    } = opts;
    const state = {
      screen: screens ? store.get("stage-screen", "fit") : "fit",
      ground: grounds ? store.get("stage-ground", "light") : "light",
    };
    if (!SCREENS.some(([k]) => k === state.screen)) state.screen = "fit";
    if (!GROUNDS.some(([k]) => k === state.ground)) state.ground = "light";

    let stage = frame.closest(".dsp-stage");
    let sizer = frame.parentElement;
    if (!stage) {
      stage = document.createElement("div");
      stage.className = "dsp-stage";
      sizer = document.createElement("div");
      sizer.className = "dsp-stage-sizer";
      frame.parentNode.insertBefore(stage, frame);
      stage.appendChild(sizer);
      sizer.appendChild(frame);
    }
    frame.setAttribute("allow", "clipboard-write");
    if (frame._dspAbort) frame._dspAbort.abort();
    const ac = new AbortController();
    frame._dspAbort = ac;
    const sig = { signal: ac.signal };

    const seg = (label, list, key) => `<div class="dsp-seg" role="group" aria-label="${label}">${list.map(([k, v, text]) => `<button type="button" data-${key}="${k}" aria-pressed="${state[key] === k}">${text}${key === "screen" && v ? ` <span class="dsp-seg-n">${v}</span>` : ""}</button>`).join("")}</div>`;
    toolbar.classList.add("dsp-toolbar");
    toolbar.setAttribute("role", "toolbar");
    toolbar.setAttribute("aria-label", "Preview");
    toolbar.innerHTML = `${grounds ? seg("Ground", GROUNDS, "ground") : ""}${screens ? seg("Screen width", SCREENS, "screen") : ""}<span class="dsp-scale" aria-live="polite"></span><span class="dsp-toolbar-end">${extra}</span>`;
    const scaleEl = toolbar.querySelector(".dsp-scale");

    let contentH = 0;
    function measure() {
      if (fixedHeight) return fixedHeight;
      try {
        const doc = frame.contentDocument;
        if (!doc || !doc.body) return contentH || minHeight;
        const b = doc.body;
        return Math.max(b.scrollHeight, b.offsetHeight, b.getBoundingClientRect().height);
      } catch (err) {
        return contentH || 600;
      }
    }

    function layout(remeasure) {
      const avail = Math.max(280, stage.clientWidth);
      const preset = SCREENS.find(([k]) => k === state.screen);
      const W = state.screen === "fit" ? (fitWidth || avail) : preset[1];
      const s = W > avail ? avail / W : 1;
      frame.style.width = `${W}px`;
      if (remeasure || !contentH) contentH = Math.min(maxHeight, Math.max(minHeight, Math.ceil(measure())));
      frame.style.height = `${contentH}px`;
      sizer.style.width = `${W}px`;
      sizer.style.height = `${contentH}px`;
      sizer.style.transform = s < 1 ? `scale(${s})` : "none";
      stage.style.height = `${Math.ceil(contentH * s)}px`;
      stage.dataset.scaled = s < 1 ? "true" : "false";
      scaleEl.textContent = s < 1 ? `${W} px · shown at ${Math.round(s * 100)}%` : `${W} px`;
    }

    let timers = [];
    function settle() {
      timers.forEach(clearTimeout);
      layout(true);
      timers = [120, 450, 1200, 2600].map((ms) => setTimeout(() => layout(true), ms));
    }

    function setGround(key) {
      state.ground = key;
      store.set("stage-ground", key);
      stage.dataset.ground = key;
      const value = (GROUNDS.find(([k]) => k === key) || GROUNDS[0])[1];
      if (applyGround) applyGround(value);
      else {
        try {
          const b = frame.contentDocument && frame.contentDocument.body;
          if (b) { if (value) b.dataset.ground = value; else delete b.dataset.ground; }
        } catch (err) { /* cross-origin */ }
      }
      toolbar.querySelectorAll("[data-ground]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ground === key)));
    }

    toolbar.addEventListener("click", (event) => {
      const g = event.target.closest("[data-ground]");
      const sc = event.target.closest("[data-screen]");
      if (g) setGround(g.dataset.ground);
      if (sc) {
        state.screen = sc.dataset.screen;
        store.set("stage-screen", state.screen);
        toolbar.querySelectorAll("[data-screen]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.screen === state.screen)));
        settle();
      }
    });
    frame.addEventListener("load", () => {
      if (grounds && !applyGround) setGround(state.ground);
      contentH = 0;
      settle();
    }, sig);
    let raf = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => layout(state.screen === "fit" && !fitWidth));
    }, sig);
    if (grounds) setGround(state.ground);
    layout(false);
    return { layout: settle, state, setGround };
  }

  /* ---------- public API ---------- */
  let resolveReady;
  const ready = new Promise((resolve) => { resolveReady = resolve; });

  function setCurrent(path) {
    current = path || "";
    renderNav();
    renderChrome();
  }

  window.DSPortal = {
    ROOT, MODE, ready, copyText, idButton, dsIdRef, refFor, hrefFor, isStandalone, pathRef,
    decorateHeadings, mountStage, setCurrent, store, esc, slug,
    get current() { return current; },
  };

  /* ---------- boot ---------- */
  buildShell();
  els.menu.addEventListener("click", () => {
    if (document.body.classList.contains("dsp-nav-open")) closeDrawer(true);
    else openDrawer();
  });
  els.side.querySelector("[data-dsp-close]").addEventListener("click", () => closeDrawer(true));
  els.backdrop.addEventListener("click", () => closeDrawer(true));
  drawerQuery.addEventListener("change", () => { if (!drawerQuery.matches) closeDrawer(false); });
  els.nav.addEventListener("click", onNavClick);
  bindSearch();
  renderChrome();

  document.addEventListener("ds:rendered", (event) => decorateHeadings(event.target && event.target.nodeType === 1 ? event.target : els.content));
  document.addEventListener("DOMContentLoaded", () => decorateHeadings(els.content));

  fetch(ROOT + "_ds_manifest.json")
    .then((res) => {
      if (!res.ok) throw new Error("Could not read the design-system index");
      return res.json();
    })
    .then((manifest) => {
      const cards = collectCards(manifest);
      data = { cards, ...buildTree(cards) };
      renderNav();
      renderChrome();
      decorateHeadings(els.content);
      resolveReady(data);
    })
    .catch((err) => {
      els.nav.innerHTML = `<p class="dsp-nav-loading">${esc(err.message)}. Serve this folder over http.</p>`;
      resolveReady(null);
    });
})();
