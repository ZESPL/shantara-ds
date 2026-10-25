/* Catalog home + card viewer for index.html. The shell (sidebar, search, breadcrumbs,
   prev/next, Copy ID) is portal.js; this file renders the overview grid and frames
   non-docs cards (#/path). Docs pages are standalone: #/docs/… redirects to them. */
(() => {
  const P = window.DSPortal;
  const RTL_GROUPS = new Set(["Components", "Website", "App", "Templates"]);

  const els = {
    body: document.body,
    catalog: document.querySelector("[data-catalog]"),
    homeMeta: document.querySelector("[data-home-meta]"),
    home: document.querySelector("[data-panel=home]"),
    viewer: document.querySelector("[data-panel=viewer]"),
    empty: document.querySelector("[data-empty]"),
    viewName: document.querySelector("[data-view-name]"),
    viewSub: document.querySelector("[data-view-sub]"),
    viewMeta: document.querySelector("[data-view-meta]"),
    viewOpen: document.querySelector("[data-view-open]"),
    toolbar: document.querySelector("[data-view-toolbar]"),
    frame: document.querySelector("[data-frame]"),
  };

  let data = null;
  let query = "";
  let dir = "ltr";
  let stage = null;
  let stageKey = "";
  try { if (localStorage.getItem("shantara-dir") === "rtl") dir = "rtl"; } catch (err) { dir = "ltr"; }

  const esc = P.esc;

  function parseViewport(card) {
    const [w, h] = String(card.viewport || "960x600").split("x").map(Number);
    return { w: w || 960, h: h || 600 };
  }

  /* A family's members can sit inside sub-groups (Sections › Heroes …): count the pages. */
  function leaves(n) {
    return n.children.flatMap((c) => (c.card ? [c] : leaves(c)));
  }

  function metaFor(n) {
    const card = n.card;
    if (n.family) return `${leaves(n).length} components`;
    if (n.children.length) return `${n.children.length + 1} pages`;
    if (card.kind === "doc") return "Notes";
    const { w, h } = parseViewport(card);
    return `${w} × ${h}`;
  }

  function nodeMatches(n) {
    if (!query) return true;
    const hay = [n.label, n.card && n.card.name, n.card && n.card.subtitle, n.card && n.card.path, ...leaves(n).map((c) => c.label)].join(" ").toLowerCase();
    return query.split(/\s+/).every((t) => hay.includes(t));
  }

  function renderHome() {
    if (!data) return;
    const count = (key) => data.flat.filter((n) => n.trail[0].key === key).length;
    const comps = data.cards.filter((c) => c.component).length;
    const fams = data.groups.find((g) => g.key === "Components")?.children.length || 0;
    els.homeMeta.textContent = `${count("Start") + count("Brand") + count("Foundations")} notes and guideline cards · ${fams} component families · ${comps} components · ${count("Website") + count("App")} kit pages`;

    let shown = 0;
    els.catalog.innerHTML = data.groups.map((g) => {
      const items = g.children.filter((n) => n.card && nodeMatches(n));
      if (!items.length) return "";
      shown += items.length;
      const id = `group-${P.slug(g.key)}`;
      const tiles = items.map((n) => `<article class="cat-card">
          <div><h3><a href="${esc(P.hrefFor(n.card))}">${esc(n.label)}</a></h3><p>${esc(n.family ? (n.card.subtitle || "") : n.card.subtitle || "")}</p></div>
          <div class="cat-foot"><span class="cat-meta">${esc(metaFor(n))}</span>${P.idButton(P.refFor(n.card))}</div>
        </article>`).join("");
      return `<section class="cat-section" id="${id}" aria-labelledby="${id}-h">
          <div class="cat-head"><h2 id="${id}-h">${esc(g.label)}</h2><p>${esc(g.blurb || "")}</p></div>
          <div class="card-grid">${tiles}</div>
        </section>`;
    }).join("");
    els.empty.hidden = shown > 0;
    P.decorateHeadings(els.catalog);
  }

  /* ---------- viewer ---------- */
  function allowsRtl(card) { return !!(card && RTL_GROUPS.has(card.group)); }

  function applyDir(card) {
    const on = allowsRtl(card);
    const toggle = document.querySelector(".dir-toggle");
    toggle.hidden = !on;
    toggle.querySelectorAll("[data-dir]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.dir === dir)));
    const next = on && dir === "rtl" ? "rtl" : "ltr";
    let doc = null;
    try { doc = els.frame.contentDocument; } catch (err) { doc = null; }
    if (!doc || !doc.documentElement) return;
    doc.documentElement.dir = next;
    doc.documentElement.lang = next === "rtl" ? "ar" : "en";
    if (next === "rtl") doc.documentElement.setAttribute("data-rtl-fixture", "1");
    else doc.documentElement.removeAttribute("data-rtl-fixture");
    if (doc.body) { doc.body.dir = next; doc.body.lang = doc.documentElement.lang; }
    if (doc.defaultView) doc.defaultView.dispatchEvent(new CustomEvent("shantara:dir", { detail: { dir: next } }));
  }

  function currentCard() {
    return data ? data.cards.find((c) => c.path === hashPath()) : null;
  }

  function mountFor(card) {
    const { w, h } = parseViewport(card);
    const isKit = /^ui_kits\//.test(card.path);
    const isFamily = /^components\/[^/]+\/[^/]+\.card\.html$/.test(card.path);
    const key = `${card.path}`;
    if (stageKey === key && stage) return;
    stageKey = key;
    const opts = {
      toolbar: els.toolbar,
      frame: els.frame,
      grounds: isFamily,
      screens: isFamily || isKit,
      fitWidth: card.kind === "doc" ? 0 : w,
      fixedHeight: isKit ? h : 0,
      minHeight: card.kind === "doc" ? 600 : Math.min(h, 240),
      extra: P.idButton(P.refFor(card)),
    };
    els.toolbar.replaceWith(els.toolbar = els.toolbar.cloneNode(false));
    opts.toolbar = els.toolbar;
    stage = P.mountStage(opts);
  }

  function showHome() {
    els.body.dataset.view = "home";
    els.home.hidden = false;
    els.viewer.hidden = true;
    els.frame.removeAttribute("src");
    stageKey = "";
    document.title = "Shantara design system";
    P.setCurrent("");
    renderHome();
  }

  function showCard(card) {
    els.body.dataset.view = "viewer";
    els.home.hidden = true;
    els.viewer.hidden = false;
    els.viewName.textContent = card.name;
    els.viewSub.textContent = card.subtitle || "";
    const { w, h } = parseViewport(card);
    els.viewMeta.innerHTML = `<span>${esc(card.path)}</span><span>${card.kind === "doc" ? "Document" : `Designed at ${w} × ${h}`}</span>`;
    els.viewOpen.href = card.path;
    els.viewOpen.textContent = card.group === "Website" || card.group === "App" ? "Open kit" : "Open full page";
    els.frame.title = card.name;
    mountFor(card);
    if (els.frame.getAttribute("src") !== card.path) els.frame.src = card.path;
    else applyDir(card);
    document.title = `${card.name} · Shantara design system`;
    P.setCurrent(card.path);
  }

  function hashPath() {
    const raw = decodeURIComponent(location.hash.replace(/^#/, ""));
    return raw.startsWith("/") ? raw.slice(1).trim() : "";
  }

  function route() {
    const raw = decodeURIComponent(location.hash.replace(/^#/, ""));
    const path = hashPath();
    if (path) {
      const card = data.cards.find((c) => c.path === path);
      if (card && P.isStandalone(card)) { location.replace(P.hrefFor(card)); return; }
      if (!card && path.startsWith("docs/")) { location.replace(path); return; }
      if (card) { showCard(card); window.scrollTo(0, 0); return; }
    }
    showHome();
    if (raw && !raw.startsWith("/")) {
      const target = document.getElementById(raw);
      if (target) requestAnimationFrame(() => target.scrollIntoView());
    } else window.scrollTo(0, 0);
  }

  document.querySelectorAll("[data-dir]").forEach((btn) => {
    btn.addEventListener("click", () => {
      dir = btn.dataset.dir === "rtl" ? "rtl" : "ltr";
      try { localStorage.setItem("shantara-dir", dir); } catch (err) { /* private mode */ }
      applyDir(currentCard());
    });
  });
  els.frame.addEventListener("load", () => applyDir(currentCard()));
  document.addEventListener("dsp:query", (event) => {
    query = event.detail || "";
    if (els.body.dataset.view === "home") renderHome();
  });
  window.addEventListener("hashchange", () => data && route());

  P.ready.then((d) => {
    if (!d) {
      els.homeMeta.textContent = "The card index could not be loaded. Serve this folder over http, not as a file.";
      return;
    }
    data = d;
    route();
  });
})();
