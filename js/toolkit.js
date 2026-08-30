/* ==========================================================================
   Maths Master X — Toolkit hub, registry & lazy per-tool loader
   Each tool lives in its own file js/tools/<id>.js and registers itself via
   MMX.toolkit.register(meta). Tools are fetched only when opened (fast).
   ========================================================================== */
(function () {
  "use strict";
  const esc = (s) => MMX.util.esc(s);
  const U = () => MMX.util;

  // Tool metadata (icon, title, category). Implementation loads lazily.
  // - New modular tools: id + file (lazy-loaded js/tools/<id>.js).
  // - The six existing tools keep their live routes via `href` (never changed);
  //   clicking a card navigates there instead of loading a tool module.
  // - `hidden: true` entries are internal alias/implementation modules with no card.
  const TOOLS = [
    // ── The six existing tools (unchanged — cards link to their live routes) ──
    { id: "legacy-calc", icon: "🧮", name: "Calculator", cat: "Basic Tools", desc: "Add, subtract, multiply, divide, %, powers, brackets, decimals, √ and trig.", href: "#/tools/calc", popular: true },
    { id: "legacy-quad", icon: "📈", name: "Quadratic Solver", cat: "Algebra", desc: "ax² + bx + c = 0 with discriminant, roots and full steps.", href: "#/tools/quadratic", popular: true },
    { id: "legacy-lin", icon: "🔢", name: "Linear Solver", cat: "Algebra", desc: "Solve linear equations with working.", href: "#/tools/linear", popular: true },
    { id: "legacy-coord", icon: "🎯", name: "Coordinate Lab", cat: "Coordinate Geometry", desc: "Plot points; distance & coordinate geometry with a live grid.", href: "#/coordtool", popular: true },
    { id: "legacy-geo", icon: "📐", name: "Geometry Master", cat: "Geometry", desc: "Areas and diagrams for shapes, circles and more.", href: "#/geometry", popular: true },
    { id: "legacy-trig", icon: "📏", name: "Trig Master", cat: "Trigonometry", desc: "Trigonometric ratios, values and heights & distances.", href: "#/trigmaster", popular: true },
    // ── New modular tools ──
    { id: "fraction-calculator", icon: "➗", name: "Fraction Calculator", cat: "Basic Tools", desc: "Add, subtract, multiply, divide & simplify fractions (mixed numbers too) with steps.", file: "js/tools/fraction-calculator.js", popular: true },
    { id: "hcf-lcm", icon: "🔢", name: "HCF & LCM Calculator", cat: "Basic Tools", desc: "Two or more numbers — HCF, LCM, prime factors & Euclid's algorithm with steps.", file: "js/tools/hcf-lcm.js", popular: true },
    { id: "ap-calculator", icon: "📊", name: "AP Calculator", cat: "Arithmetic Progression", desc: "nth term, first term, common difference, number of terms & sum — with sequence view.", file: "js/tools/ap-calculator.js" },
    { id: "statistics-calculator", icon: "📈", name: "Statistics Calculator", cat: "Statistics", desc: "Mean, median, mode, range for raw data and value/frequency tables.", file: "js/tools/statistics-calculator.js", popular: true },
    { id: "probability-calculator", icon: "🎲", name: "Probability Calculator", cat: "Probability", desc: "Dice, coin, cards & custom — P(E) and complementary probability, simplified.", file: "js/tools/probability-calculator.js", popular: true },
    // ── Internal implementation modules (no card; aliased above) ──
    { id: "fractions", icon: "", name: "fractions-impl", cat: "Basic Tools", desc: "", file: "js/tools/fractions.js", hidden: true },
    { id: "lcm-hcf", icon: "", name: "lcm-hcf-impl", cat: "Basic Tools", desc: "", file: "js/tools/lcm-hcf.js", hidden: true }
  ];

  const CATS = ["Basic Tools", "Algebra", "Arithmetic Progression", "Coordinate Geometry", "Geometry", "Trigonometry", "Statistics", "Probability"];
  const POPULAR = ["legacy-calc", "fraction-calculator", "hcf-lcm", "legacy-quad", "legacy-lin", "legacy-coord", "statistics-calculator", "probability-calculator"];

  const impls = {};
  const loading = {};

  // UI helpers for tools
  MMX.tk = {
    mk(html) { const d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; },
    res(title, body, kind) {
      return `<div class="result-box ${kind === "err" ? "err" : kind === "ok" ? "verdict-ok" : ""}"><div class="rb-title">${esc(title)}</div>${body}</div>`;
    },
    steps(arr) {
      return `<ol class="step-list">${arr.map((s, i) => `<li><b>Step ${i + 1}:</b> ${s}</li>`).join("")}</ol>`;
    },
    out(id) { return `<div class="tt-result" id="${id}"></div>`;
    },
    val(mount, id) { const e = mount.querySelector("#" + id); return e ? e.value : ""; }
  };

  window.MMX = window.MMX || {};
  MMX.toolkit = {
    tools: TOOLS,
    cats: CATS,
    popular: POPULAR,
    get: (id) => TOOLS.find((t) => t.id === id),
    register(meta) { impls[meta.id] = meta; if (loading[meta.id]) { loading[meta.id].forEach((cb) => cb(meta)); delete loading[meta.id]; } },
    load(id) {
      if (impls[id]) return Promise.resolve(impls[id]);
      if (loading[id]) return new Promise((res) => loading[id].push(res));
      const meta = TOOLS.find((t) => t.id === id);
      if (!meta) return Promise.reject(new Error("Unknown tool"));
      if (!meta.file) return Promise.reject(new Error("Tool '" + id + "' is bundled differently"));
      return new Promise((resolve, reject) => {
        loading[id] = [resolve];
        const s = document.createElement("script");
        s.src = meta.file; s.async = true;
        s.onerror = () => { delete loading[id]; reject(new Error("Could not load tool " + id)); };
        document.head.appendChild(s);
      });
    }
  };

  // Hub view
  MMX.toolkit.renderHub = function (app) {
    app.innerHTML = `
      <div class="page-top">
        <a class="icon-btn back-btn" href="#/home">←</a>
        <h2>🧰 Maths Toolkit</h2>
        <span style="width:42px"></span>
      </div>
      <div class="glass card search-bar"><span>🔍</span><input id="tkSearch" placeholder="Search tools — try “area”, “mean”, “distance”, “quadratic”…"></div>
      <div id="tkBody"></div>`;
    const body = $("#tkBody", app);
    const draw = (q) => {
      q = (q || "").toLowerCase().trim();
      const card = (t) => `<a class="glass card tool-card" href="${t.href ? t.href : "#/tool/" + t.id}">
          <div class="tic">${t.icon}</div>
          <div class="tcm"><div class="tnm">${esc(t.name)}</div><div class="tds">${esc(t.desc)}</div></div>
          <div class="chev">›</div></a>`;
      const visible = TOOLS.filter((t) => !t.hidden);
      if (q) {
        const hits = visible.filter((t) => (t.name + " " + t.desc + " " + t.cat).toLowerCase().includes(q));
        body.innerHTML = hits.length
          ? `<div class="section-head"><h3>${hits.length} tool${hits.length > 1 ? "s" : ""} found</h3></div>` + hits.map(card).join("")
          : `<div class="glass card empty"><div class="e-ico">🔍</div><p>No tool matches “${esc(q)}”.</p></div>`;
        return;
      }
      let html = `<div class="section-head"><h3>⭐ Popular</h3></div><div class="tool-grid" style="display:flex;flex-direction:column;gap:10px">`;
      POPULAR.map((id) => visible.find((t) => t.id === id)).filter(Boolean).forEach((t) => (html += card(t)));
      html += `</div>`;
      CATS.forEach((cat) => {
        const ts = visible.filter((t) => t.cat === cat);
        if (!ts.length) return;
        html += `<div class="tool-cat-head"><span class="tci">${catIcon(cat)}</span>${esc(cat)}</div><div style="display:flex;flex-direction:column;gap:10px">`;
        ts.forEach((t) => (html += card(t)));
        html += `</div>`;
      });
      body.innerHTML = html;
    };
    draw("");
    $("#tkSearch", app).addEventListener("input", (e) => draw(e.target.value));
  };
  function catIcon(c) {
    return { "Basic Tools": "🧮", "Algebra": "📈", "Arithmetic Progression": "📊", Geometry: "📐", "Coordinate Geometry": "🗺️", Trigonometry: "📐", Mensuration: "📦", Statistics: "📊", Probability: "🎲", "Number System": "🔢", "Unit Converter": "📏", "Study Aids": "🧠" }[c] || "🧰";
  }

  // Tool page
  MMX.toolkit.renderTool = async function (app, id) {
    const meta = TOOLS.find((t) => t.id === id);
    if (!meta || meta.hidden) { location.hash = "#/toolkit"; return; }
    if (meta.href) { location.hash = meta.href.replace(/^#/, ""); return; }
    app.innerHTML = `<div class="page-top">
        <a class="icon-btn back-btn" href="#/toolkit">←</a>
        <h2>${meta.icon} ${esc(meta.name)}</h2>
        <span style="width:42px"></span>
      </div>
      <div id="toolMount"><div class="glass card center" style="padding:30px">Loading tool…</div></div>`;
    try {
      const impl = await MMX.toolkit.load(id);
      const mount = $("#toolMount", app);
      mount.innerHTML = `<div class="glass card tt-body" id="ttBody"></div>`;
      impl.render($("#ttBody", mount));
    } catch (e) {
      $("#toolMount", app).innerHTML = `<div class="glass card empty"><div class="e-ico">⚠️</div><p>${esc(e.message || "Tool failed to load")}</p></div>`;
    }
  };

  function $(s, el) { return (el || document).querySelector(s); }
})();
