/* ==========================================================================
   Maths Master X — app shell, router, views
   ========================================================================== */
(function () {
  "use strict";
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const U = () => MMX.util;
  const esc = (s) => U().esc(s);
  const rich = (s) => U().rich(s);

  // ---------- toast ----------
  let toastT = null;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove("show"), 2200);
  }
  MMX.toast = toast;

  // ---------- confetti / achievements ----------
  function celebrateAchievements(defs) {
    const body = document.body;
    const c = document.createElement("div");
    c.className = "confetti";
    const ico = ["🏆", "⭐", "🎉", "✨", "🔥", "💯"];
    for (let i = 0; i < 28; i++) {
      const s = document.createElement("i");
      s.textContent = ico[Math.floor(Math.random() * ico.length)];
      s.style.left = Math.random() * 100 + "vw";
      s.style.animationDelay = Math.random() * 0.8 + "s";
      s.style.fontSize = 0.9 + Math.random() * 1.1 + "rem";
      c.appendChild(s);
    }
    body.appendChild(c);
    setTimeout(() => c.remove(), 3200);
    defs.slice(0, 2).forEach((d, i) => setTimeout(() => toast(`${d.ico} Achievement unlocked: ${d.name}!`), 500 + i * 900));
  }
  MMX.ui = { celebrateAchievements };

  // ---------- progress ring (shared SVG) ----------
  function ringSVG(pct, size = 108) {
    const r = 46, c = 2 * Math.PI * r;
    const off = c * (1 - Math.min(100, pct) / 100);
    return `<div class="ring" style="width:${size}px;height:${size}px">
      <svg viewBox="0 0 108 108">
        <defs><linearGradient id="gradStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0a84ff"/><stop offset="100%" stop-color="#22d3ee"/>
        </linearGradient></defs>
        <circle class="track-c" cx="54" cy="54" r="${r}" fill="none" stroke-width="9"/>
        <circle class="prog-c" cx="54" cy="54" r="${r}" fill="none" stroke-width="9"
          stroke-dasharray="${c}" stroke-dashoffset="${off}"/>
      </svg>
      <div class="ring-txt"><div><span class="p">${pct}%</span><div class="l">Complete</div></div></div>
    </div>`;
  }

  // ---------- type / difficulty labels ----------
  const TYPE_LABEL = { mcq: "MCQ", ar: "Assertion & Reason", vsa: "Very Short Answer", sa: "Short Answer", la: "Long Answer", case: "Case-Based", competency: "Competency" };

  // ========================================================================
  // QUESTION CARD — shared by question bank, practice, daily, mistakes
  // opts: {showActions, revealKey}
  // ========================================================================
  function questionCard(q, chap, opts) {
    opts = opts || {};
    const st = MMX.store.state;
    const attempt = st.attempts[q.id];
    const bm = st.bookmarks.q.includes(q.id);
    const imp = st.important.includes(q.id);
    const typeBadge = `<span class="badge type">${TYPE_LABEL[q.type] || q.type}</span>`;
    const diffBadge = `<span class="badge ${q.diff}">${q.diff[0].toUpperCase() + q.diff.slice(1)}</span>`;
    const marksBadge = `<span class="badge marks">${q.marks} mark${q.marks > 1 ? "s" : ""}</span>`;
    const topicBadge = `<span class="badge topic">${esc(q.topic)}</span>`;

    const auto = Array.isArray(q.options);
    let body = "";
    body += `<div class="q-text">${rich(q.q)}</div>`;
    if (q.source) body += `<div class="q-source">${esc(q.source)}</div>`;

    if (auto) {
      body += `<div class="opts" data-qid="${q.id}">` + q.options.map((o, i) =>
        `<button class="opt" data-i="${i}"><span class="key">${"ABCD"[i]}</span><span>${rich(o)}</span></button>`).join("") + `</div>`;
    } else {
      body += `<div class="self-check" data-qid="${q.id}">
        <div class="q-label">Sample answer</div>
        <div class="result-box" style="display:none" id="ans-${q.id}">${rich(q.answer)}</div>
        <div class="btn-row mt8">
          <button class="btn small ghost" data-self="show">👁 Show answer</button>
          <button class="btn small" data-self="correct" style="display:none">✅ I got it right</button>
          <button class="btn small danger" data-self="wrong" style="display:none">❌ I got it wrong</button>
        </div>
      </div>`;
    }

    body += `<div class="explain" id="ex-${q.id}"><b>Explanation:</b>\n${rich(q.explain)}</div>`;

    const actions = opts.hideActions ? "" : `<div class="q-actions">
      <button class="icon-btn ${bm ? "on" : ""}" data-act="bookmark" title="Bookmark">🔖</button>
      <button class="icon-btn ${imp ? "marked" : ""}" data-act="important" title="Important">⭐</button>
      <button class="icon-btn" data-act="explain" title="Explanation">💡</button>
    </div>`;

    const el = document.createElement("div");
    el.className = "glass card q-card";
    el.dataset.qid = q.id;
    el.innerHTML = `<div class="q-top">${typeBadge}${diffBadge}${marksBadge}${topicBadge}${q.source ? "" : ""}</div>${body}${actions}`;

    // events
    el.addEventListener("click", (ev) => {
      const optBtn = ev.target.closest(".opt");
      if (optBtn) {
        if (el.dataset.done) return;
        const i = +optBtn.dataset.i;
        const correct = i === q.answer;
        el.dataset.done = "1";
        $$(".opt", el).forEach((b, bi) => {
          b.classList.add("disabled");
          if (bi === q.answer) b.classList.add("correct");
          if (bi === i && !correct) b.classList.add("wrong");
        });
        $("#ex-" + q.id, el).classList.add("show");
        MMX.store.recordAttempt(q.id, chap.id, correct, q.options[i], q.topic);
        if (opts.onAnswered) opts.onAnswered(correct, q);
        return;
      }
      const self = ev.target.closest("[data-self]");
      if (self) {
        const act = self.dataset.self;
        const ansBox = $("#ans-" + q.id, el);
        if (act === "show") {
          ansBox.style.display = "block";
          $('[data-self="show"]', el).style.display = "none";
          $('[data-self="correct"]', el).style.display = "";
          $('[data-self="wrong"]', el).style.display = "";
          $("#ex-" + q.id, el).classList.add("show");
        } else {
          const correct = act === "correct";
          el.dataset.done = "1";
          $('[data-self="correct"]', el).disabled = true;
          $('[data-self="wrong"]', el).disabled = true;
          MMX.store.recordAttempt(q.id, chap.id, correct, q.answer, q.topic);
          toast(correct ? "✅ Marked correct — keep it up!" : "📕 Saved to your Mistake Book");
          if (opts.onAnswered) opts.onAnswered(correct, q);
        }
        return;
      }
      const actBtn = ev.target.closest("[data-act]");
      if (actBtn) {
        const act = actBtn.dataset.act;
        if (act === "bookmark") {
          const on = MMX.store.toggleBookmark("q", q.id);
          actBtn.classList.toggle("on", on);
          toast(on ? "🔖 Bookmarked" : "Bookmark removed");
        } else if (act === "important") {
          const on = MMX.store.toggleImportant(q.id);
          actBtn.classList.toggle("marked", on);
          toast(on ? "⭐ Marked important" : "Removed star");
        } else if (act === "explain") {
          $("#ex-" + q.id, el).classList.toggle("show");
        }
      }
    });

    // previously attempted state (question bank browsing)
    if (attempt && auto) {
      el.dataset.done = "1";
      $$(".opt", el).forEach((b, bi) => {
        b.classList.add("disabled");
        if (bi === q.answer) b.classList.add("correct");
      });
    }
    return el;
  }
  MMX.questionCard = questionCard;

  // ========================================================================
  // ROUTER
  // ========================================================================
  const routes = {};
  function route(path, handler) { routes[path] = handler; }

  function navigate() {
    const hash = location.hash.replace(/^#/, "") || "/home";
    const parts = hash.split("/").filter(Boolean);
    const root = "/" + (parts[0] || "home");
    // mark nav
    $$(".nav-item").forEach((a) => {
      const n = a.dataset.nav;
      const map = { home: "home", learn: "learn", chapter: "learn", formulas: "learn", questions: "learn", examples: "learn", revision: "home", practice: "practice", daily: "practice", mistakes: "practice", ai: "ai", tools: "home", geometry: "home", trigmaster: "home", coordtool: "home", profile: "profile", achievements: "profile", bookmarks: "profile", settings: "profile", search: "home", questionbank: "learn" };
      a.classList.toggle("active", map[parts[0]] === n || (n === "home" && ["home", "tools", "geometry", "trigmaster", "coordtool", "search", "revision"].includes(parts[0])));
    });
    window.scrollTo(0, 0);
    const handler = routes[root] || routes["/home"];
    const app = $("#app");
    app.style.opacity = "0";
    setTimeout(() => {
      app.innerHTML = "";
      handler(app, parts.slice(1));
      app.style.opacity = "1";
    }, 90);
  }
  window.addEventListener("hashchange", navigate);

  function pageTop(title, back) {
    return `<div class="page-top">
      <a class="icon-btn back-btn" href="${back || "#/home"}">←</a>
      <h2>${title}</h2>
      <a class="icon-btn" href="#/search" title="Search">🔍</a>
    </div>`;
  }

  // ========================================================================
  // HOME
  // ========================================================================
  route("/home", (app) => {
    MMX.store.touchStudy();
    const st = MMX.store.state;
    const p = st.progress;
    const acc = p.questionsAttempted ? Math.round((p.questionsCorrect / p.questionsAttempted) * 100) : 0;
    const overall = overallPct();
    const hour = new Date().getHours();
    const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    const actions = [
      ["📚", "Continue Learning", "#/learn"],
      ["⚡", "Quick Practice", "#/practice"],
      ["🧠", "Revision", "#/revision"],
      ["🤖", "Maths AI", "#/ai"],
      ["📐", "Formula Sheet", "#/formulas"],
      ["📝", "Question Bank", "#/questionbank"],
      ["📊", "Progress", "#/profile"],
      ["🏆", "Achievements", "#/achievements"]
    ];

    app.innerHTML = `
      <header class="app-header">
        <div class="logo-badge">∫</div>
        <div>
          <h1>Maths Master X</h1>
          <div class="sub">CBSE Class 10 Mathematics</div>
        </div>
        <div class="header-spacer"></div>
        <a class="icon-btn" href="#/search" title="Search">🔍</a>
        <a class="icon-btn" href="#/settings" title="Settings">⚙️</a>
      </header>

      <section class="glass card hero">
        <div class="eyebrow">${greet}</div>
        <h2>Ready to master Mathematics? 🧮</h2>
        <p>Your daily maths gym — learn, practice and revise the complete CBSE Class 10 course.</p>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">${p.streak}🔥</div><div class="lbl">Day streak</div></div>
          <div class="hero-stat"><div class="num">${acc}%</div><div class="lbl">Accuracy</div></div>
          <div class="hero-stat"><div class="num">${overall}%</div><div class="lbl">Course</div></div>
        </div>
        <div class="btn-row mt16">
          <a class="btn primary grow center" href="#/daily">🔥 Daily Challenge</a>
          <a class="btn ghost" href="#/practice">⚡ Practice</a>
        </div>
      </section>

      <div class="section-head"><h3>Study Hub</h3></div>
      <div class="action-grid">
        ${actions.map(([e, t, h]) => `<a class="action-tile" href="${h}"><span class="emoji">${e}</span><span class="t">${t}</span></a>`).join("")}
      </div>

      <div class="section-head"><h3>🧰 Maths Toolkit</h3><a class="link" href="#/toolkit">All tools →</a></div>
      <div class="tool-grid">
        <a class="glass card tool-tile" href="#/tools/calc"><span class="te">🧮</span><div class="tt">Calculator</div><div class="td">Basic & trig</div></a>
        <a class="glass card tool-tile" href="#/tools/quadratic"><span class="te">📈</span><div class="tt">Quadratic Solver</div><div class="td">Roots + nature</div></a>
        <a class="glass card tool-tile" href="#/tools/linear"><span class="te">🔢</span><div class="tt">Linear Solver</div><div class="td">2 equations</div></a>
        <a class="glass card tool-tile" href="#/coordtool"><span class="te">🎯</span><div class="tt">Coordinate Lab</div><div class="td">Distance & plots</div></a>
        <a class="glass card tool-tile" href="#/geometry"><span class="te">📐</span><div class="tt">Geometry Master</div><div class="td">Visual diagrams</div></a>
        <a class="glass card tool-tile" href="#/trigmaster"><span class="te">📏</span><div class="tt">Trig Master</div><div class="td">Ratios & heights</div></a>
        <a class="glass card tool-tile" href="#/tool/fraction-calculator"><span class="te">➗</span><div class="tt">Fraction Calc</div><div class="td">Add/sub/mul/div</div></a>
        <a class="glass card tool-tile" href="#/tool/hcf-lcm"><span class="te">🔢</span><div class="tt">HCF & LCM</div><div class="td">Factors + Euclid</div></a>
        <a class="glass card tool-tile" href="#/tool/ap-calculator"><span class="te">📊</span><div class="tt">AP Calculator</div><div class="td">nth term & sum</div></a>
        <a class="glass card tool-tile" href="#/tool/statistics-calculator"><span class="te">📈</span><div class="tt">Statistics</div><div class="td">Mean/median/mode</div></a>
        <a class="glass card tool-tile" href="#/tool/probability-calculator"><span class="te">🎲</span><div class="tt">Probability</div><div class="td">Dice/coin/cards</div></a>
      </div>
      <div class="btn-row" style="margin:4px 0 2px">
        <a class="btn ghost small" href="#/toolkit">🧰 Open the full Maths Toolkit (search all tools)</a>
      </div>

      <div class="section-head"><h3>📚 Continue Learning</h3><a class="link" href="#/learn">All chapters →</a></div>
      <div class="chap-list" id="homeChaps"></div>

      <div class="section-head"><h3>Your space</h3></div>
      <div class="stat-grid">
        <a class="glass card stat-box" href="#/mistakes" style="text-decoration:none;color:inherit"><div class="v">📕 ${st.mistakes.length}</div><div class="k">Mistake Book</div></a>
        <a class="glass card stat-box" href="#/bookmarks" style="text-decoration:none;color:inherit"><div class="v">🔖 ${st.bookmarks.q.length + st.bookmarks.f.length + st.bookmarks.e.length + st.bookmarks.r.length}</div><div class="k">Bookmarks</div></a>
        <a class="glass card stat-box" href="#/achievements" style="text-decoration:none;color:inherit"><div class="v">🏆 ${Object.keys(st.achievements).length}</div><div class="k">Achievements</div></a>
        <a class="glass card stat-box" href="#/revision" style="text-decoration:none;color:inherit"><div class="v">🧠</div><div class="k">Quick Revision</div></a>
      </div>
    `;
    const list = $("#homeChaps");
    MMX.chapters.slice(0, 4).forEach((c) => list.appendChild(chapRow(c)));
  });

  function overallPct() {
    const st = MMX.store.state;
    let sum = 0;
    MMX.chapters.forEach((c) => {
      sum += MMX.store.chapterPct(c, st.progress.chapters[c.id]);
    });
    return Math.round(sum / MMX.chapters.length);
  }
  MMX.overallPct = overallPct;

  function chapRow(c) {
    const st = MMX.store.state;
    const cp = st.progress.chapters[c.id];
    const pct = MMX.store.chapterPct(c, cp);
    const a = document.createElement("a");
    a.className = "glass card chap-row press";
    a.href = "#/chapter/" + c.id;
    a.innerHTML = `
      <div class="chap-ico">${c.icon}</div>
      <div class="chap-meta">
        <div class="no">CHAPTER ${c.num}</div>
        <div class="nm">${esc(c.name)}</div>
      </div>
      <div class="chap-prog-wrap">
        <span class="pct">${pct}%</span>
        <div class="mini-bar"><i style="width:${pct}%"></i></div>
      </div>
      <div class="chev">›</div>`;
    return a;
  }

  // ========================================================================
  // LEARN — chapter list
  // ========================================================================
  route("/learn", (app) => {
    app.innerHTML = pageTop("📚 Learn — 14 Chapters", "#/home") + `
      <div class="glass card" style="padding:14px 16px">
        <div class="muted">Complete CBSE Class 10 Mathematics syllabus. Tap any chapter to open Learn, Concepts, Formulas, Examples, Questions and Practice.</div>
      </div>
      <div class="chap-list" id="chapList"></div>`;
    const list = $("#chapList", app);
    MMX.chapters.forEach((c) => list.appendChild(chapRow(c)));
  });

  // ========================================================================
  // CHAPTER HUB
  // ========================================================================
  route("/chapter", async (app, parts) => {
    const id = parts[0];
    const meta = MMX.getChapterMeta(id);
    if (!meta) { location.hash = "#/learn"; return; }
    app.innerHTML = pageTop(meta.icon + " " + meta.name, "#/learn") + `<div id="chapBody"><div class="glass card center" style="padding:30px">Loading chapter…</div></div>`;
    try {
      const ch = await MMX.loadChapter(id);
      if (parts[1] === "quickfire") {
        startPractice({ chapters: [id], n: 5, title: "🔥 Quick Practice — " + ch.name, back: "#/chapter/" + id, mount: app });
        return;
      }
      renderChapter(app, ch, meta, parts[1] || "learn");
    } catch (catchErr) {
      $("#chapBody", app).innerHTML = `<div class="glass card empty">Could not load this chapter. ${esc(e.message || "")}</div>`;
    }
  });

  const CHAP_TABS = [
    ["learn", "📖", "Learn"], ["concepts", "🧠", "Concepts"], ["formulas", "📐", "Formulas"],
    ["examples", "✏️", "Solved Examples"], ["questions", "❓", "Questions"], ["practice", "🎯", "Practice"]
  ];

  function renderChapter(app, ch, meta, tab) {
    MMX.store.markSection(meta.id, tab === "learn" ? "learn" : tab);
    const st = MMX.store.state;
    const pct = MMX.store.chapterPct(meta, st.progress.chapters[meta.id]);
    const body = $("#chapBody", app);

    let content = "";
    if (tab === "learn" || tab === "concepts") {
      content = ch.concepts.map((c) =>
        `<div class="glass card learn-block"><h4>${esc(c.h)}</h4><p>${rich(c.p)}</p></div>`).join("");
      if (tab === "learn") {
        content += `<div class="glass card learn-block"><h4>📌 What's in this chapter</h4>
          <ul>
            <li><b>Formulas:</b> ${ch.formulas.length} formula cards with variables, explanation and examples</li>
            <li><b>Solved examples:</b> ${ch.examples.length} step-by-step exam solutions</li>
            <li><b>Questions:</b> ${ch.questions.length} questions — MCQ, A&R, VSA, SA, LA, case & competency</li>
          </ul>
          <div class="btn-row mt8">
            <a class="btn primary small" href="#/chapter/${meta.id}/formulas">📐 See formulas</a>
            <a class="btn ghost small" href="#/chapter/${meta.id}/practice">🎯 Practice now</a>
          </div></div>`;
      }
    } else if (tab === "formulas") {
      content = `<div id="formulaMount"></div>`;
    } else if (tab === "examples") {
      content = `<div id="exampleMount"></div>`;
    } else if (tab === "questions") {
      content = `<div class="chip-row" id="qFilters">
        ${["all", "easy", "medium", "hard", "unattempted", "incorrect", "bookmarked", "important"].map((f, i) =>
          `<button class="chip ${i === 0 ? "active" : ""}" data-f="${f}">${f[0].toUpperCase() + f.slice(1)}</button>`).join("")}
      </div><div id="qList"></div>`;
    } else if (tab === "practice") {
      content = `
        <div class="glass card pad-lg center">
          <div style="font-size:2.4rem">⚡</div>
          <h3 style="margin:8px 0">Chapter Practice</h3>
          <p class="muted">Mixed questions from <b>${esc(ch.name)}</b> with a timer. Pick a session length:</p>
          <div class="btn-row" style="justify-content:center;margin-top:10px">
            <button class="btn primary" data-start="10">10 Qs</button>
            <button class="btn primary" data-start="20">20 Qs</button>
            <button class="btn ghost" data-start="0">All (${ch.questions.length})</button>
          </div>
          <hr class="divider"/>
          <a class="btn ghost block" href="#/chapter/${meta.id}/quickfire">🔥 Chapter Quick Practice (5 fast Qs)</a>
        </div>`;
    }

    body.innerHTML = `
      <div class="glass card">
        <div class="flex">
          <div class="grow">
            <div class="muted" style="font-size:0.72rem;font-weight:800">CHAPTER ${meta.num} · ${esc(meta.cat)}</div>
            <div style="font-weight:800;font-size:1.05rem;margin-top:2px">${esc(ch.name)}</div>
          </div>
          <div style="text-align:right"><b style="font-size:1.2rem">${pct}%</b>
            <div class="mini-bar" style="width:90px;margin-top:4px"><i style="width:${pct}%"></i></div></div>
        </div>
        <div class="tab-grid">
          ${CHAP_TABS.map(([t, e, l]) =>
            `<button class="tab-btn ${tab === t ? "active" : ""}" onclick="location.hash='#/chapter/${meta.id}/${t}'"><span class="te">${e}</span>${l}</button>`).join("")}
        </div>
      </div>
      <div id="tabContent">${content}</div>`;

    // mount DOM-card tabs
    if (tab === "formulas") {
      const fm = $("#formulaMount", body);
      ch.formulas.forEach((f) => fm.appendChild(formulaCard(f, meta, true)));
    }
    if (tab === "examples") {
      const em = $("#exampleMount", body);
      ch.examples.forEach((e) => em.appendChild(exampleCard(e, meta, true)));
    }

    if (tab === "questions") {
      const renderQs = (filter) => {
        const st2 = MMX.store.state;
        let qs = ch.questions.slice();
        if (filter === "easy" || filter === "medium" || filter === "hard") qs = qs.filter((q) => q.diff === filter);
        else if (filter === "unattempted") qs = qs.filter((q) => !st2.attempts[q.id]);
        else if (filter === "incorrect") qs = qs.filter((q) => st2.attempts[q.id] && !st2.attempts[q.id].correct);
        else if (filter === "bookmarked") qs = qs.filter((q) => st2.bookmarks.q.includes(q.id));
        else if (filter === "important") qs = qs.filter((q) => st2.important.includes(q.id));
        const wrap = $("#qList", body);
        wrap.innerHTML = "";
        if (!qs.length) wrap.innerHTML = `<div class="glass card empty"><div class="e-ico">🎉</div><p>No questions match this filter here.</p></div>`;
        qs.forEach((q) => wrap.appendChild(questionCard(q, meta)));
      };
      $$("#qFilters .chip", body).forEach((b) => b.addEventListener("click", () => {
        $$("#qFilters .chip", body).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        renderQs(b.dataset.f);
      }));
      renderQs("all");
    }
    if (tab === "practice") {
      $$("[data-start]", body).forEach((b) => b.addEventListener("click", () => {
        const n = +b.dataset.start;
        startPractice({ chapters: [meta.id], n: n || ch.questions.length, title: meta.name + " Practice", back: "#/chapter/" + meta.id });
      }));
    }
  }

  // quick fire
  route("/quickfire", (app, parts) => {
    const chapId = parts[0];
    MMX.loadChapter(chapId).then((ch) => {
      const meta = MMX.getChapterMeta(chapId);
      startPractice({ chapters: [chapId], n: 5, title: "🔥 Quick Practice — " + ch.name, back: "#/chapter/" + chapId, quick: true, mount: app });
    });
  });

  // ---------- formula / example cards ----------
  function formulaCard(f, chap, showChap) {
    const st = MMX.store.state;
    const bm = st.bookmarks.f.includes(f.id);
    const el = document.createElement("div");
    el.className = "glass card formula-card";
    el.innerHTML = `
      <div class="flex-between">
        <h4>${esc(f.name)}</h4>
        <button class="icon-btn ${bm ? "on" : ""}" data-fbm="${f.id}" style="width:36px;height:36px">🔖</button>
      </div>
      <div class="f-expr">${esc(f.expr)}</div>
      <div class="f-row"><b>Variables:</b> ${esc(f.vars)}</div>
      <div class="f-row"><b>Explanation:</b> ${rich(f.explain)}</div>
      <div class="f-row"><b>Example:</b> ${rich(f.example)}</div>
      ${showChap && chap ? `<div class="f-row" style="margin-top:8px"><span class="badge topic">${esc(chap.name)}</span> <span class="badge type">${esc(f.cat)}</span></div>` : ""}`;
    el.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-fbm]");
      if (b) {
        const on = MMX.store.toggleBookmark("f", f.id);
        b.classList.toggle("on", on);
        toast(on ? "🔖 Formula bookmarked" : "Bookmark removed");
      }
    });
    return el;
  }
  MMX.formulaCard = formulaCard;

  function exampleCard(e, chap, showChap) {
    const st = MMX.store.state;
    const bm = st.bookmarks.e.includes(e.id);
    const el = document.createElement("div");
    el.className = "glass card example-card";
    el.innerHTML = `
      <div class="flex-between">
        <h4>✏️ ${esc(e.title)}</h4>
        <button class="icon-btn ${bm ? "on" : ""}" data-ebm="${e.id}" style="width:36px;height:36px">🔖</button>
      </div>
      <div class="step"><span class="st">Given</span>${rich(e.given)}</div>
      <div class="step"><span class="st">Concept</span>${rich(e.concept)}</div>
      ${e.steps.map((s) => s.ans
        ? `<div class="final-ans">${rich(s.x)}</div>`
        : `<div class="step"><span class="st">${esc(s.t)}</span>${rich(s.x)}</div>`).join("")}
      ${showChap && chap ? `<div class="mt8"><span class="badge topic">${esc(chap.name)}</span></div>` : ""}`;
    el.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-ebm]");
      if (b) {
        const on = MMX.store.toggleBookmark("e", e.id);
        b.classList.toggle("on", on);
        toast(on ? "🔖 Example bookmarked" : "Bookmark removed");
      }
    });
    return el;
  }
  MMX.exampleCard = exampleCard;

  // ========================================================================
  // FORMULA MASTER
  // ========================================================================
  route("/formulas", async (app) => {
    app.innerHTML = pageTop("📐 Formula Master", "#/home") + `
      <div class="glass card search-bar">
        <span>🔍</span><input id="fSearch" placeholder="Search formulas (e.g. tangent, mean, distance)…">
      </div>
      <div class="chip-row" id="fCats"></div>
      <div id="fLoading"><div class="glass card center" style="padding:26px">Loading formula sheet…</div></div>
      <div id="fResults"></div>`;
    const catRow = $("#fCats", app);
    MMX.categories.forEach((c, i) => {
      const b = document.createElement("button");
      b.className = "chip" + (i === 0 ? " active" : "");
      b.textContent = c;
      b.dataset.cat = c;
      catRow.appendChild(b);
    });
    let cat = "All", q = "";
    const loaded = await MMX.loadAllChapters((d, t) => {
      const lf = $("#fLoading", app);
      if (lf && lf.firstElementChild) lf.firstElementChild.textContent = `Loading formulas… ${d}/${t}`;
    });
    const fLoadingAfter = $("#fLoading", app);
    if (fLoadingAfter) fLoadingAfter.innerHTML = "";
    if (!$("#fSearch", app)) return; // navigated away during load
    const render = () => {
      const wrap = $("#fResults", app);
      wrap.innerHTML = "";
      let count = 0;
      loaded.forEach((ch) => {
        const meta = MMX.getChapterMeta(ch.id);
        ch.formulas.forEach((f) => {
          if (cat !== "All" && f.cat !== cat) return;
          if (q && !(f.name + f.expr + f.explain + f.vars + ch.name).toLowerCase().includes(q)) return;
          wrap.appendChild(formulaCard(f, meta, true));
          count++;
        });
      });
      if (!count) wrap.innerHTML = `<div class="glass card empty"><div class="e-ico">🔍</div><p>No formulas match.</p></div>`;
    };
    catRow.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      $$(".chip", catRow).forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      cat = b.dataset.cat;
      render();
    });
    $("#fSearch", app).addEventListener("input", (e) => { q = e.target.value.toLowerCase().trim(); render(); });
    render();
    // re-run search with any text typed during initial load
    const typed = $("#fSearch", app).value.trim();
    if (typed) { q = typed.toLowerCase(); render(); }
  });

  // ========================================================================
  // QUESTION BANK (global)
  // ========================================================================
  route("/questionbank", async (app) => {
    app.innerHTML = pageTop("📝 Question Bank", "#/home") + `
      <div class="glass card search-bar"><span>🔍</span><input id="qbSearch" placeholder="Search questions by topic or keyword…"></div>
      <div class="chip-row" id="qbChips"></div>
      <div class="glass card" style="padding:12px 16px">
        <div class="flex-between"><span class="muted" id="qbCount">Loading…</span>
        <select class="input" id="qbChap" style="width:auto;padding:8px 12px;font-size:0.82rem">
          <option value="">All chapters</option>
          ${MMX.chapters.map((c) => `<option value="${c.id}">${c.num}. ${esc(c.name)}</option>`).join("")}
        </select></div>
      </div>
      <div id="qbList"></div>`;
    const filters = ["all", "easy", "medium", "hard", "unattempted", "incorrect", "bookmarked", "important"];
    const chipRow = $("#qbChips", app);
    filters.forEach((f, i) => {
      const b = document.createElement("button");
      b.className = "chip" + (i === 0 ? " active" : "");
      b.textContent = f[0].toUpperCase() + f.slice(1);
      b.dataset.f = f;
      chipRow.appendChild(b);
    });
    await MMX.loadAllChapters();
    if (!$("#qbList", app)) return; // navigated away during load
    let filter = "all", chapId = "", query = "";
    const render = () => {
      const st = MMX.store.state;
      let pool = [];
      MMX.chapters.forEach((c) => {
        const ch = MMX.chapterData[c.id];
        if (!ch) return;
        if (chapId && c.id !== chapId) return;
        ch.questions.forEach((q) => pool.push({ q, chap: c }));
      });
      let n0 = pool.length;
      pool = pool.filter(({ q }) => {
        if (filter === "easy" || filter === "medium" || filter === "hard") return q.diff === filter;
        if (filter === "unattempted") return !st.attempts[q.id];
        if (filter === "incorrect") return st.attempts[q.id] && !st.attempts[q.id].correct;
        if (filter === "bookmarked") return st.bookmarks.q.includes(q.id);
        if (filter === "important") return st.important.includes(q.id);
        return true;
      });
      if (query) pool = pool.filter(({ q }) => (q.q + " " + q.topic + " " + q.explain).toLowerCase().includes(query));
      // cap rendered for perf
      const shown = pool.slice(0, 60);
      const wrap = $("#qbList", app);
      wrap.innerHTML = "";
      shown.forEach(({ q, chap }) => wrap.appendChild(questionCard(q, chap)));
      $("#qbCount", app).textContent = `${pool.length} questions match${pool.length > 60 ? " — showing first 60" : ""} (${n0} in view)`;
      if (!pool.length) wrap.innerHTML = `<div class="glass card empty"><div class="e-ico">🎉</div><p>Nothing matches these filters.</p></div>`;
    };
    chipRow.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      $$(".chip", chipRow).forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      filter = b.dataset.f;
      render();
    });
    $("#qbChap", app).addEventListener("change", (e) => { chapId = e.target.value; render(); });
    $("#qbSearch", app).addEventListener("input", (e) => { query = e.target.value.toLowerCase().trim(); render(); });
    render();
  });

  // ========================================================================
  // PRACTICE SETUP + RUNNER
  // ========================================================================
  route("/practice", (app) => {
    app.innerHTML = pageTop("⚡ Quick Practice", "#/home") + `
      <div class="glass card pad-lg center">
        <div style="font-size:2.6rem">⚡</div>
        <h3 style="margin:6px 0">Timed mixed practice</h3>
        <p class="muted">Questions are drawn from across the question bank — MCQs and case questions are auto-graded instantly. Written questions let you self-check against the sample answer.</p>
        <div class="btn-row mt16" style="justify-content:center">
          <button class="btn primary" data-n="10">10 Questions</button>
          <button class="btn primary" data-n="20">20 Questions</button>
          <button class="btn ghost" data-n="30">30 Questions</button>
        </div>
      </div>
      <div class="section-head"><h3>Or practice by chapter</h3></div>
      <div class="chap-list" id="pChaps"></div>`;
    $$("[data-n]", app).forEach((b) => b.addEventListener("click", () =>
      startPractice({ chapters: "all", n: +b.dataset.n, title: "Quick Practice — " + b.dataset.n + " Questions", back: "#/practice" })));
    const list = $("#pChaps", app);
    MMX.chapters.forEach((c) => {
      const a = document.createElement("a");
      a.className = "glass card chap-row press";
      a.href = "#/chapter/" + c.id + "/practice";
      a.innerHTML = `<div class="chap-ico">${c.icon}</div><div class="chap-meta"><div class="nm">${esc(c.name)}</div></div><div class="chev">›</div>`;
      list.appendChild(a);
    });
  });

  let practiceState = null;
  async function startPractice(cfg) {
    const target = cfg.mount || $("#app");
    target.innerHTML = `<div class="glass card center" style="padding:30px">Preparing questions…</div>`;
    let chaps = cfg.chapters;
    if (chaps === "all" || !chaps) {
      await MMX.loadAllChapters();
      chaps = MMX.chapters.map((c) => c.id);
    } else {
      for (const id of chaps) await MMX.loadChapter(id);
    }
    let pool = [];
    chaps.forEach((id) => {
      const ch = MMX.chapterData[id];
      const meta = MMX.getChapterMeta(id);
      ch.questions.forEach((q) => pool.push({ q, chap: meta }));
    });
    pool = U().shuffle(pool).slice(0, cfg.n);
    practiceState = {
      cfg,
      pool,
      idx: 0,
      correct: 0,
      wrong: 0,
      answered: 0,
      startTs: Date.now(),
      results: [],
      timer: null,
      byTopic: {}
    };
    location.hash = cfg.mount ? location.hash : "#/runner";
    if (cfg.mount) renderRunner(target);
  }
  MMX.startPractice = startPractice;

  route("/runner", (app) => {
    if (!practiceState) { location.hash = "#/practice"; return; }
    renderRunner(app);
  });

  function renderRunner(app) {
    const ps = practiceState;
    const total = ps.pool.length;
    const draw = () => {
      const elapsed = (Date.now() - ps.startTs) / 1000;
      app.innerHTML = `
        <div class="runner-head">
          <div class="glass card runner-bar">
            <a class="icon-btn" href="${ps.cfg.back || "#/home"}" style="width:36px;height:36px;font-size:0.9rem">✕</a>
            <div class="runner-progress"><i style="width:${(ps.idx / total) * 100}%"></i></div>
            <span class="qcount">${Math.min(ps.idx + 1, total)}/${total}</span>
            <span class="timer" id="timer">${U().fmtTime(elapsed)}</span>
          </div>
        </div>
        <div id="runnerQ"></div>`;
      clearInterval(ps.timer);
      ps.timer = setInterval(() => {
        const t = $("#timer");
        if (t) t.textContent = U().fmtTime((Date.now() - ps.startTs) / 1000);
      }, 1000);
      if (ps.idx >= total) { clearInterval(ps.timer); return finishPractice(app); }
      const { q, chap } = ps.pool[ps.idx];
      const card = questionCard(q, chap, {
        hideActions: true,
        onAnswered: (correct, qq) => {
          ps.answered++;
          if (correct) ps.correct++; else {
            ps.wrong++;
            ps.byTopic[qq.topic] = (ps.byTopic[qq.topic] || 0) + 1;
          }
          ps.results.push({ id: qq.id, correct, topic: qq.topic, chapId: chap.id });
          MMX.store.addStudyTime((Date.now() - (ps.lastTs || ps.startTs)) / 1000);
          ps.lastTs = Date.now();
          setTimeout(() => { ps.idx++; draw(); }, cfgDelay(qq));
        }
      });
      $("#runnerQ", app).appendChild(card);
      ps.lastTs = Date.now();
    };
    function cfgDelay(qq) { return Array.isArray(qq.options) ? 1100 : 600; }
    draw();
  }

  function finishPractice(app) {
    const ps = practiceState;
    const secs = (Date.now() - ps.startTs) / 1000;
    MMX.store.addStudyTime(secs);
    const total = ps.pool.length;
    const acc = Math.round((ps.correct / Math.max(1, ps.answered)) * 100);
    const weak = Object.entries(ps.byTopic).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const msg = acc >= 90 ? "Outstanding! 👑" : acc >= 70 ? "Great work! 🎯" : acc >= 40 ? "Good effort — review weak topics 💪" : "Keep practising — mistakes teach most 📕";
    app.innerHTML = `
      <div class="glass card result-hero">
        <div class="score-big">${ps.correct}/${total}</div>
        <div class="score-lbl">correct answers</div>
        <h3 style="margin:12px 0 4px">${msg}</h3>
      </div>
      <div class="glass card">
        <div class="stat-grid">
          <div class="stat-box"><div class="v">${acc}%</div><div class="k">Accuracy</div></div>
          <div class="stat-box"><div class="v">${U().fmtTime(secs)}</div><div class="k">Time taken</div></div>
          <div class="stat-box"><div class="v" style="color:var(--green)">${ps.correct} ✅</div><div class="k">Correct</div></div>
          <div class="stat-box"><div class="v" style="color:var(--red)">${ps.wrong} ❌</div><div class="k">Incorrect</div></div>
        </div>
        <hr class="divider"/>
        <h4 style="margin:0 0 8px">📊 Weak topics</h4>
        ${weak.length ? weak.map(([t, n]) => `<span class="weak-chip">${esc(t)} · ${n} wrong</span>`).join("") : `<div class="muted">None — perfect topic coverage! 🎉</div>`}
        <hr class="divider"/>
        <h4 style="margin:0 0 8px">💡 Recommended next step</h4>
        <div class="muted">${weak.length
          ? `Revise <b>${esc(weak[0][0])}</b> in the chapter, then retry your <a href="#/mistakes">Mistake Book</a>.`
          : `Try a longer session or the 🔥 Daily Challenge.`}</div>
        <div class="btn-row mt16">
          <a class="btn primary" href="#/practice">⚡ Practice again</a>
          <a class="btn ghost" href="#/mistakes">📕 Mistake Book</a>
          <a class="btn ghost" href="${ps.cfg.back || "#/home"}">← Back</a>
        </div>
      </div>`;
    if (ps.cfg.daily) {
      MMX.store.recordDaily(ps.correct, total);
    }
    practiceState = null;
  }

  // ========================================================================
  // DAILY CHALLENGE
  // ========================================================================
  route("/daily", async (app) => {
    await MMX.loadAllChapters();
    const d = MMX.store.state.daily;
    const done = MMX.store.dailyDoneToday();
    app.innerHTML = pageTop("🔥 Daily Maths Challenge", "#/home") + `
      <div class="glass card pad-lg center">
        <div style="font-size:2.8rem">🔥</div>
        <h3 style="margin:6px 0">5 fresh questions every day</h3>
        <p class="muted">Build your streak. Questions come from the verified question bank — never invented on the spot.</p>
        <div class="hero-stats mt16">
          <div class="hero-stat"><div class="num">${d.streak}🔥</div><div class="lbl">Challenge streak</div></div>
          <div class="hero-stat"><div class="num">${d.best}%</div><div class="lbl">Personal best</div></div>
          <div class="hero-stat"><div class="num">${Object.keys(d.history).length}</div><div class="lbl">Days played</div></div>
        </div>
        <div class="btn-row mt16" style="justify-content:center">
          ${done
            ? `<div class="muted" style="width:100%">✅ Today's challenge is done — come back tomorrow! Last score: ${d.history[MMX.store.todayStr()].score}/${d.history[MMX.store.todayStr()].total}</div>
               <a class="btn ghost" href="#/practice">⚡ Practice instead</a>`
            : `<button class="btn primary" id="startDaily" style="font-size:1.05rem">Start today's challenge</button>`}
        </div>
      </div>`;
    if (!done) $("#startDaily", app).addEventListener("click", () => {
      // seeded shuffle by date so the day's set is stable
      const seedStr = MMX.store.todayStr();
      let seed = 0;
      for (const ch of seedStr) seed += ch.charCodeAt(0);
      let pool = [];
      MMX.chapters.forEach((c) => {
        MMX.chapterData[c.id].questions.forEach((q) => { if (Array.isArray(q.options)) pool.push({ q, chap: c }); });
      });
      let s = seed;
      const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      pool = pool.slice(0, 5);
      practiceState = {
        cfg: { n: 5, title: "Daily Challenge", back: "#/daily", daily: true },
        pool, idx: 0, correct: 0, wrong: 0, answered: 0, startTs: Date.now(), results: [], timer: null, byTopic: {}
      };
      location.hash = "#/runner";
    });
  });

  // patch finishPractice for daily
  const _finish = finishPractice;
  // (daily score recording handled via wrapper)
  const origStartPractice = startPractice;

  // ========================================================================
  // MISTAKE BOOK
  // ========================================================================
  route("/mistakes", async (app) => {
    app.innerHTML = pageTop("📕 Maths Mistake Book", "#/home") + `
      <div class="glass card">
        <div class="flex-between">
          <div><b>Mistakes are your best teachers.</b><div class="muted" style="font-size:0.8rem;margin-top:2px">Wrong answers land here automatically. Retry them to clear the book.</div></div>
        </div>
        <div class="btn-row mt8">
          <button class="btn primary small" id="retryAll">🔁 Practice all mistakes</button>
          <button class="btn danger small" id="clearMistakes">🗑 Clear all</button>
        </div>
      </div>
      <div id="mistakeList"></div>`;
    const ids = MMX.store.state.mistakes.map((m) => m.qid);
    if (ids.length) await MMX.loadAllChapters();
    const wrap = $("#mistakeList", app);
    if (!wrap) return;
    const items = MMX.store.state.mistakes.slice().reverse();
    if (!items.length) {
      wrap.innerHTML = `<div class="glass card empty"><div class="e-ico">🌟</div><p>Your mistake book is empty.<br>Do a practice session — any wrong answer will show up here so you can fix it.</p></div>`;
    } else {
      for (const m of items) {
        const found = MMX.findQuestion(m.qid);
        if (!found) continue;
        const { q, chap } = found;
        const card = questionCard(q, chap, {});
        const bar = document.createElement("div");
        bar.className = "glass card";
        bar.style.padding = "10px 14px";
        bar.innerHTML = `<div class="flex-between">
          <span class="muted" style="font-size:0.8rem">Your answer: <b style="color:var(--red)">${esc(String(m.answer).slice(0, 60))}</b> · ${esc(chap.name)}</span>
          <button class="btn danger small" data-rm="${q.id}">Remove</button></div>`;
        bar.addEventListener("click", (e) => {
          if (e.target.closest("[data-rm]")) {
            MMX.store.removeMistake(q.id);
            toast("Removed from mistake book");
            navigate();
          }
        });
        wrap.appendChild(bar);
        wrap.appendChild(card);
      }
    }
    $("#retryAll", app).addEventListener("click", async () => {
      const items2 = MMX.store.state.mistakes;
      if (!items2.length) return toast("Nothing to retry 🎉");
      await MMX.loadAllChapters();
      const pool = [];
      items2.forEach((m) => {
        const f = MMX.findQuestion(m.qid);
        if (f) pool.push(f);
      });
      practiceState = { cfg: { n: pool.length, title: "Mistake Retry", back: "#/mistakes" }, pool: U().shuffle(pool), idx: 0, correct: 0, wrong: 0, answered: 0, startTs: Date.now(), results: [], timer: null, byTopic: {} };
      location.hash = "#/runner";
    });
    $("#clearMistakes", app).addEventListener("click", () => {
      if (confirm("Clear all mistakes? This cannot be undone.")) { MMX.store.clearMistakes(); toast("Mistake book cleared"); navigate(); }
    });
  });

  // ========================================================================
  // REVISION
  // ========================================================================
  const REV_MODES = [
    { id: "5min", e: "⚡", t: "5-Minute Revision", d: "Ultra-fast formula & concept scan" },
    { id: "15min", e: "🧩", t: "15-Minute Revision", d: "Formulas + key concepts + common mistakes" },
    { id: "30min", e: "📖", t: "30-Minute Revision", d: "Full sweep with solved examples" },
    { id: "1day", e: "📚", t: "One-Day Revision", d: "Everything, chapter by chapter" },
    { id: "exam", e: "🎓", t: "Exam Tomorrow", d: "High-yield formulas, mistakes & tricks" }
  ];
  route("/revision", async (app) => {
    app.innerHTML = pageTop("🧠 Quick Revision", "#/home") + `
      <div class="glass card" style="padding:14px 16px"><div class="muted">Pick a revision sprint. Content is pulled straight from the verified chapter data — formulas, concepts, common mistakes and valid short tricks only.</div></div>
      <div class="mode-grid" id="revModes"></div>`;
    const wrap = $("#revModes", app);
    REV_MODES.forEach((m) => {
      const el = document.createElement("div");
      el.className = "glass card mode-tile press";
      el.innerHTML = `<span class="me">${m.e}</span><div class="grow"><div class="mn">${m.t}</div><div class="md">${m.d}</div></div><span class="chev">›</span>`;
      el.addEventListener("click", () => { location.hash = "#/revise/" + m.id; });
      wrap.appendChild(el);
    });
  });

  route("/revise", async (app, parts) => {
    const mode = REV_MODES.find((m) => m.id === parts[0]) || REV_MODES[0];
    app.innerHTML = pageTop(mode.e + " " + mode.t, "#/revision") + `<div id="revBody"><div class="glass card center" style="padding:30px">Loading revision…</div></div>`;
    const chaps = await MMX.loadAllChapters();
    MMX.store.recordRevision(mode.id);
    const body = $("#revBody", app);
    if (!body) return; // navigated away
    let html = `<div class="glass card center" style="padding:16px"><b>✅ Revision session started</b><div class="muted" style="font-size:0.82rem;margin-top:4px">Work top to bottom; bookmark anything you want to revisit.</div></div>`;
    const wantExamples = mode.id === "30min" || mode.id === "1day";
    const full = mode.id === "1day";
    chaps.forEach((ch) => {
      const meta = MMX.getChapterMeta(ch.id);
      const pts = full ? ch.revision.points : ch.revision.points.slice(0, mode.id === "5min" ? 2 : mode.id === "exam" ? 3 : 4);
      const mistakes = mode.id === "5min" ? [] : ch.revision.mistakes.slice(0, mode.id === "15min" ? 2 : 3);
      const tricks = mode.id === "exam" || full ? ch.revision.tricks : [];
      html += `<div class="glass card revision-block">
        <h4>${meta.icon} ${esc(ch.name)}</h4>
        <ul>${pts.map((p) => `<li>${rich(p)}</li>`).join("")}</ul>
        ${mistakes.length ? `<hr class="divider"><b style="color:var(--red);font-size:0.82rem">⚠️ Common mistakes</b><ul>${mistakes.map((p) => `<li class="mistake">${rich(p)}</li>`).join("")}</ul>` : ""}
        ${tricks.length ? `<hr class="divider"><b style="color:var(--green);font-size:0.82rem">💡 Valid tricks</b><ul>${tricks.map((p) => `<li>${rich(p)}</li>`).join("")}</ul>` : ""}
        <div class="btn-row mt8">
          <a class="btn small ghost" href="#/chapter/${ch.id}/formulas">📐 Formulas</a>
          ${wantExamples ? `<a class="btn small ghost" href="#/chapter/${ch.id}/examples">✏️ Examples</a>` : ""}
        </div>
      </div>`;
    });
    html += `<div class="glass card center pad-lg"><b>Revision complete! 🎉</b>
      <p class="muted">Now test yourself with a timed practice.</p>
      <div class="btn-row" style="justify-content:center"><a class="btn primary" href="#/practice">⚡ Quick Practice</a><a class="btn ghost" href="#/daily">🔥 Daily Challenge</a></div></div>`;
    body.innerHTML = html;
  });

  // ========================================================================
  // BOOKMARKS
  // ========================================================================
  route("/bookmarks", async (app) => {
    app.innerHTML = pageTop("🔖 Bookmarks", "#/home") + `<div id="bmBody"></div>`;
    const st = MMX.store.state;
    const any = st.bookmarks.q.length + st.bookmarks.f.length + st.bookmarks.e.length + st.bookmarks.r.length;
    if (any) await MMX.loadAllChapters();
    const body = $("#bmBody", app);
    if (!body) return;
    if (!any) {
      body.innerHTML = `<div class="glass card empty"><div class="e-ico">🔖</div><p>No bookmarks yet.<br>Tap the 🔖 on any question, formula or solved example to save it here.</p></div>`;
      return;
    }
    // formulas
    if (st.bookmarks.f.length) {
      body.innerHTML += `<div class="section-head"><h3>📐 Formulas</h3></div>`;
      MMX.chapters.forEach((c) => {
        const ch = MMX.chapterData[c.id];
        ch.formulas.filter((f) => st.bookmarks.f.includes(f.id)).forEach((f) => body.appendChild(formulaCard(f, c, true)));
      });
    }
    if (st.bookmarks.e.length) {
      body.innerHTML += `<div class="section-head"><h3>✏️ Solved Examples</h3></div>`;
      MMX.chapters.forEach((c) => {
        const ch = MMX.chapterData[c.id];
        ch.examples.filter((e) => st.bookmarks.e.includes(e.id)).forEach((e) => body.appendChild(exampleCard(e, c, true)));
      });
    }
    if (st.bookmarks.q.length) {
      body.innerHTML += `<div class="section-head"><h3>❓ Questions</h3></div>`;
      st.bookmarks.q.forEach((qid) => {
        const f = MMX.findQuestion(qid);
        if (f) body.appendChild(questionCard(f.q, f.chap));
      });
    }
    body.innerHTML += `<div class="mt16 center"><button class="btn danger" id="clearBm">🗑 Clear all bookmarks</button></div>`;
    $("#clearBm", body).addEventListener("click", () => {
      if (confirm("Clear all bookmarks?")) { MMX.store.clearBookmarks(); toast("Bookmarks cleared"); navigate(); }
    });
  });

  // ========================================================================
  // ACHIEVEMENTS
  // ========================================================================
  route("/achievements", (app) => {
    const st = MMX.store.state;
    app.innerHTML = pageTop("🏆 Achievements", "#/home") + `
      <div class="glass card center" style="padding:18px">
        <div style="font-size:2rem">🏆</div>
        <b>${Object.keys(st.achievements).length} / ${MMX.achievementsDefs.length} unlocked</b>
        <div class="mini-bar mt8"><i style="width:${Math.round(Object.keys(st.achievements).length / MMX.achievementsDefs.length * 100)}%"></i></div>
      </div>
      <div class="ach-grid" id="achGrid"></div>`;
    const grid = $("#achGrid", app);
    MMX.achievementsDefs.forEach((d) => {
      const got = st.achievements[d.id];
      const el = document.createElement("div");
      el.className = "glass ach " + (got ? "unlocked" : "locked");
      el.innerHTML = `<div class="aico">${got ? d.ico : "🔒"}</div><div class="anm">${esc(d.name)}</div><div class="ads">${esc(d.desc)}</div>${got ? `<div class="muted" style="font-size:0.66rem;margin-top:4px">${got.date}</div>` : ""}`;
      grid.appendChild(el);
    });
  });

  // ========================================================================
  // PROFILE / PROGRESS
  // ========================================================================
  route("/profile", (app) => {
    const st = MMX.store.state;
    const p = st.progress;
    const acc = p.questionsAttempted ? Math.round((p.questionsCorrect / p.questionsAttempted) * 100) : 0;
    const overall = overallPct();
    const completed = MMX.chapters.filter((c) => MMX.store.chapterPct(c, p.chapters[c.id]) >= 80).length;
    const weak = Object.entries(p.weakTopics).sort((a, b) => b[1] - a[1]).slice(0, 5);
    app.innerHTML = pageTop("👤 Your Progress", "#/home") + `
      <div class="glass card">
        <div class="ring-wrap">
          ${ringSVG(overall, 120)}
          <div style="flex:1">
            <div class="muted" style="font-size:0.78rem;font-weight:700">OVERALL COURSE PROGRESS</div>
            <div style="font-size:0.92rem;margin-top:6px">📚 <b>${completed}/14</b> chapters completed (80%+)</div>
            <div style="font-size:0.92rem;margin-top:4px">🔥 <b>${p.streak}</b> day study streak</div>
            <div style="font-size:0.92rem;margin-top:4px">⏱ <b>${U().fmtClock(p.totalTimeSec)}</b> practice time</div>
          </div>
        </div>
      </div>
      <div class="stat-grid">
        <div class="glass card stat-box"><div class="v">${p.questionsAttempted}</div><div class="k">Questions attempted</div></div>
        <div class="glass card stat-box"><div class="v">${p.questionsCorrect}</div><div class="k">Correct answers</div></div>
        <div class="glass card stat-box"><div class="v">${acc}%</div><div class="k">Accuracy</div></div>
        <div class="glass card stat-box"><div class="v">${st.daily.streak}🔥</div><div class="k">Daily streak</div></div>
      </div>
      <div class="section-head"><h3>📊 Chapter progress</h3></div>
      <div id="chapBars"></div>
      <div class="section-head"><h3>⚠️ Weak topics</h3></div>
      <div class="glass card">${weak.length ? weak.map(([t, n]) =>
        `<div class="bar-stat"><div class="row"><span>${esc(t)}</span><b>${n} wrong</b></div><div class="bar"><i style="width:${Math.min(100, n * 20)}%"></i></div></div>`).join("")
        : `<div class="muted">No weak topics yet — answer some questions to build insights.</div>`}</div>
      <div class="section-head"><h3>⚙️ Settings & data</h3></div>
      <div class="btn-row">
        <a class="btn ghost" href="#/settings">⚙️ Settings</a>
        <a class="btn ghost" href="#/achievements">🏆 Achievements</a>
        <a class="btn ghost" href="#/bookmarks">🔖 Bookmarks</a>
        <a class="btn ghost" href="#/mistakes">📕 Mistake Book</a>
      </div>`;
    const cb = $("#chapBars", app);
    MMX.chapters.forEach((c) => {
      const cp = p.chapters[c.id];
      const pct = MMX.store.chapterPct(c, cp);
      const el = document.createElement("a");
      el.className = "glass card bar-stat";
      el.href = "#/chapter/" + c.id;
      el.style.textDecoration = "none";
      el.style.color = "inherit";
      el.style.display = "block";
      el.innerHTML = `<div class="row"><span>${c.icon} ${esc(c.name)}</span><b>${pct}%</b></div><div class="bar"><i style="width:${pct}%"></i></div>`;
      cb.appendChild(el);
    });
  });

  // ========================================================================
  // SETTINGS
  // ========================================================================
  route("/settings", (app) => {
    const s = MMX.store.state.settings;
    app.innerHTML = pageTop("⚙️ Settings", "#/home") + `
      <div class="glass card">
        <div class="set-row">
          <div class="s-info"><div class="s-t">🎨 Theme</div><div class="s-d">Light, dark or follow system</div></div>
          <div class="seg" id="segTheme">
            ${["light", "dark", "system"].map((t) => `<button data-v="${t}" class="${s.theme === t ? "active" : ""}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}
          </div>
        </div>
        <div class="set-row">
          <div class="s-info"><div class="s-t">🔠 Font size</div><div class="s-d">Small / Medium / Large</div></div>
          <div class="seg" id="segFont">
            ${["small", "medium", "large"].map((t) => `<button data-v="${t}" class="${s.font === t ? "active" : ""}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}
          </div>
        </div>
        <div class="set-row">
          <div class="s-info"><div class="s-t">🎯 Daily study goal</div><div class="s-d">Questions per day target</div></div>
          <div class="seg" id="segGoal">
            ${[10, 20, 30].map((g) => `<button data-v="${g}" class="${s.goal === g ? "active" : ""}">${g}</button>`).join("")}
          </div>
        </div>
      </div>

      <div class="glass card">
        <div class="set-row" style="border:none">
          <div class="s-info"><div class="s-t">🗂 Clear mistake book</div><div class="s-d">Removes all saved mistakes</div></div>
          <button class="btn danger small" id="setClearMistakes">Clear</button>
        </div>
        <div class="set-row" style="border:none">
          <div class="s-info"><div class="s-t">🔖 Clear bookmarks</div><div class="s-d">Removes all saved bookmarks</div></div>
          <button class="btn danger small" id="setClearBm">Clear</button>
        </div>
        <div class="set-row" style="border:none">
          <div class="s-info"><div class="s-t">♻️ Reset all progress</div><div class="s-d">Progress, streaks & achievements — everything</div></div>
          <button class="btn danger small" id="setReset">Reset</button>
        </div>
      </div>

      <div class="glass card center" style="padding:20px">
        <div class="logo-badge" style="margin:0 auto 10px">∫</div>
        <b>Maths Master X</b>
        <div class="muted" style="font-size:0.8rem;margin-top:4px">Premium CBSE Class 10 Mathematics learning, practice & revision.<br>Founder & Developer: <b>RIYANSH</b></div>
        <div class="muted" style="font-size:0.72rem;margin-top:8px">All progress is stored locally on this device (localStorage). No account needed.</div>
      </div>`;
    const seg = (id, key, num) => {
      $("#" + id, app).addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        $$("#" + id + " button", app).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        MMX.store.setSetting(key, num ? +b.dataset.v : b.dataset.v);
        toast("Saved ✓");
      });
    };
    seg("segTheme", "theme");
    seg("segFont", "font");
    seg("segGoal", "goal", true);
    $("#setClearMistakes", app).addEventListener("click", () => { if (confirm("Clear mistake book?")) { MMX.store.clearMistakes(); toast("Mistake book cleared"); } });
    $("#setClearBm", app).addEventListener("click", () => { if (confirm("Clear all bookmarks?")) { MMX.store.clearBookmarks(); toast("Bookmarks cleared"); } });
    $("#setReset", app).addEventListener("click", () => {
      if (confirm("Reset ALL progress? This cannot be undone.")) { MMX.store.resetProgress(); toast("Progress reset"); navigate(); }
    });
  });

  // ========================================================================
  // GLOBAL SEARCH
  // ========================================================================
  route("/search", async (app) => {
    app.innerHTML = pageTop("🔍 Search", "#/home") + `
      <div class="glass card search-bar"><span>🔍</span><input id="gSearch" placeholder="Chapters, formulas, questions, examples, concepts…" autofocus></div>
      <div id="sResults"><div class="glass card center" style="padding:26px" class="muted">Type to search across the whole course…</div></div>`;
    const inp = $("#gSearch", app);
    inp.focus();
    let loaded = false;
    inp.addEventListener("input", async () => {
      const q = inp.value.toLowerCase().trim();
      const res = $("#sResults", app);
      if (q.length < 2) { res.innerHTML = `<div class="glass card center muted" style="padding:26px">Type at least 2 characters…</div>`; return; }
      if (!loaded) { res.innerHTML = `<div class="glass card center" style="padding:26px">Indexing course content…</div>`; await MMX.loadAllChapters(); loaded = true; }
      const hits = [];
      MMX.chapters.forEach((c) => {
        const ch = MMX.chapterData[c.id];
        if (c.name.toLowerCase().includes(q)) hits.push({ type: "Chapter", chap: c.name, text: c.icon + " " + c.name, hash: "#/chapter/" + c.id });
        ch.concepts.forEach((cn) => { if ((cn.h + " " + cn.p).toLowerCase().includes(q)) hits.push({ type: "Concept", chap: c.name, text: cn.h, hash: "#/chapter/" + c.id + "/concepts" }); });
        ch.formulas.forEach((f) => { if ((f.name + " " + f.expr + " " + f.explain).toLowerCase().includes(q)) hits.push({ type: "Formula", chap: c.name, text: f.name + " — " + f.expr, hash: "#/formulas" }); });
        ch.examples.forEach((ex) => { if ((ex.title + " " + ex.given).toLowerCase().includes(q)) hits.push({ type: "Solved Example", chap: c.name, text: ex.title, hash: "#/chapter/" + c.id + "/examples" }); });
        ch.questions.forEach((qq) => { if ((qq.q + " " + qq.topic).toLowerCase().includes(q)) hits.push({ type: "Question", chap: c.name, text: qq.q.replace(/\n/g, " ").slice(0, 120), hash: "#/chapter/" + c.id + "/questions", qid: qq.id }); });
        ch.revision.points.forEach((r2) => { if (r2.toLowerCase().includes(q)) hits.push({ type: "Revision point", chap: c.name, text: r2.slice(0, 120), hash: "#/revise/exam" }); });
      });
      res.innerHTML = hits.length
        ? `<div class="muted" style="margin:0 4px 10px;font-size:0.8rem">${hits.length} results</div>` + hits.slice(0, 40).map((h) => `
          <a class="glass card search-result" href="${h.hash}" style="text-decoration:none;color:inherit;display:block">
            <div class="sr-type">${h.type} · <span class="sr-chap">${esc(h.chap)}</span></div>
            <div class="sr-txt">${highlight(h.text, q)}</div>
          </a>`).join("")
        : `<div class="glass card empty"><div class="e-ico">🔍</div><p>No results for “${esc(inp.value)}”.</p></div>`;
    });
  });
  function highlight(text, q) {
    const t = esc(text);
    const qi = esc(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return t.replace(new RegExp("(" + qi.split(" ").filter(Boolean).join("|") + ")", "ig"), "<mark>$1</mark>");
  }

  // ========================================================================
  // TOOLS
  // ========================================================================
  route("/tools", (app, parts) => renderTool(app, parts[0] || "calc"));

  function toolShell(title, back) {
    return pageTop(title, back || "#/home");
  }
  function resultBox(title, text, err) {
    return `<div class="result-box ${err ? "err" : ""}"><div class="rb-title">${title}</div>${rich(text)}</div>`;
  }

  function renderTool(app, which) {
    if (which === "calc") {
      app.innerHTML = toolShell("🧮 Basic & Trig Calculator") + `
      <div class="glass card">
        <div class="field"><label>Expression (supports + − × ÷, √, ^, %, sin/cos/tan in degrees, π)</label>
          <input class="input" id="calcIn" placeholder="e.g. 2 + 3 × 4   or   sin(30) + cos(60)   or   √144 + 2^5">
        </div>
        <button class="btn primary block" id="calcGo">Calculate</button>
        <div id="calcOut" class="mt16"></div>
        <hr class="divider">
        <div class="muted" style="font-size:0.8rem">Examples: <b>sin(30)</b>, <b>√(169)</b>, <b>tan(45) × 6</b>, <b>π × 7^2</b> (area of r=7 circle).</div>
      </div>`;
      const trigWrap = (expr) => expr
        .replace(/sin\(\s*(-?\d+(?:\.\d+)?)\s*\)/g, (m, a) => "Math.sin(" + (parseFloat(a) * Math.PI / 180) + ")")
        .replace(/cos\(\s*(-?\d+(?:\.\d+)?)\s*\)/g, (m, a) => "Math.cos(" + (parseFloat(a) * Math.PI / 180) + ")")
        .replace(/tan\(\s*(-?\d+(?:\.\d+)?)\s*\)/g, (m, a) => "Math.tan(" + (parseFloat(a) * Math.PI / 180) + ")")
        .replace(/√\s*(\d+(\.\d+)?)/g, "Math.sqrt($1)")
        .replace(/(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g, "($1 ** $2)")
        .replace(/×|x(?=\s*\d)/g, "*").replace(/÷/g, "/").replace(/π/g, "Math.PI")
        .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
      const run = () => {
        const raw = $("#calcIn", app).value;
        const out = $("#calcOut", app);
        if (!raw.trim()) { out.innerHTML = resultBox("Result", "Enter an expression.", true); return; }
        try {
          const expr = trigWrap(raw);
          if (!/^[0-9+\-*/().\sMathPI\.\w<>!&|?:,]+$/.test(expr.replace(/Math\.\w+/g, ""))) throw new Error("invalid chars");
          // eslint-disable-next-line no-new-func
          const v = Function('"use strict";return (' + expr + ")")();
          if (typeof v !== "number" || !isFinite(v)) throw new Error("not a real number (check e.g. tan 90° is undefined)");
          out.innerHTML = resultBox("Result", `${esc(raw)} = <b>${+v.toFixed(6)}</b>`);
        } catch (e) {
          out.innerHTML = resultBox("Could not evaluate", "I couldn't evaluate that — check the expression. Use numbers, + − * /, √ (as √49 or sqrt()), ^ for powers, sin()/cos()/tan() with angles in degrees, and π.", true);
        }
      };
      $("#calcGo", app).addEventListener("click", run);
      $("#calcIn", app).addEventListener("keydown", (e) => { if (e.key === "Enter") run(); });
    }

    if (which === "quadratic") {
      app.innerHTML = toolShell("📈 Quadratic Solver", "#/tools/calc") + `
      <div class="glass card">
        <p class="muted">Solves <b>ax² + bx + c = 0</b> with full steps and nature of roots.</p>
        <div class="input-row-3 mt8">
          <div class="field"><label>a</label><input class="input" id="qa" inputmode="numeric" placeholder="2"></div>
          <div class="field"><label>b</label><input class="input" id="qb" inputmode="numeric" placeholder="−5"></div>
          <div class="field"><label>c</label><input class="input" id="qc" inputmode="numeric" placeholder="3"></div>
        </div>
        <button class="btn primary block" id="qGo">Solve</button>
        <div id="qOut" class="mt16"></div>
      </div>`;
      $("#qGo", app).addEventListener("click", () => {
        const a = parseFloat($("#qa", app).value), b = parseFloat($("#qb", app).value), c = parseFloat($("#qc", app).value);
        const out = $("#qOut", app);
        if ([a, b, c].some(isNaN)) { out.innerHTML = resultBox("Missing input", "Enter numbers for a, b and c.", true); return; }
        if (a === 0) { out.innerHTML = resultBox("Not quadratic", "a = 0 makes this a linear equation (bx + c = 0) — use the Linear Solver instead.", true); return; }
        out.innerHTML = resultBox("Solution", MMX.ai ? "" : "");
        const res = solveQ(a, b, c);
        out.querySelector(".result-box").innerHTML = `<div class="rb-title">Solution</div>${rich(res)}`;
      });
    }

    if (which === "linear") {
      app.innerHTML = toolShell("🔢 Linear Equation Solver", "#/tools/calc") + `
      <div class="glass card">
        <p class="muted">Solves a system:<br><b>a₁x + b₁y = c₁</b><br><b>a₂x + b₂y = c₂</b></p>
        <div class="field"><label>Equation 1</label><div class="input-row-3">
          <input class="input" id="a1" inputmode="numeric" placeholder="a₁ (x)">
          <input class="input" id="b1" inputmode="numeric" placeholder="b₁ (y)">
          <input class="input" id="c1" inputmode="numeric" placeholder="= c₁">
        </div></div>
        <div class="field"><label>Equation 2</label><div class="input-row-3">
          <input class="input" id="a2" inputmode="numeric" placeholder="a₂ (x)">
          <input class="input" id="b2" inputmode="numeric" placeholder="b₂ (y)">
          <input class="input" id="c2" inputmode="numeric" placeholder="= c₂">
        </div></div>
        <button class="btn primary block" id="lGo">Solve system</button>
        <div id="lOut" class="mt16"></div>
      </div>`;
      $("#lGo", app).addEventListener("click", () => {
        const v = ["a1", "b1", "c1", "a2", "b2", "c2"].map((i) => parseFloat($("#" + i, app).value));
        const out = $("#lOut", app);
        if (v.some(isNaN)) { out.innerHTML = resultBox("Missing input", "Fill all six coefficient boxes.", true); return; }
        const det = v[0] * v[4] - v[3] * v[1];
        let txt;
        if (det === 0) {
          txt = "Determinant Δ = 0. The lines are either parallel (no solution) or coincident (infinitely many solutions) — check whether a₁/a₂ = b₁/b₂ ≠ c₁/c₂ (no solution) or = c₁/c₂ (infinitely many).";
        } else {
          const x = (v[2] * v[4] - v[5] * v[1]) / det;
          const y = (v[0] * v[5] - v[3] * v[2]) / det;
          txt = `Given: ${v[0]}x + ${v[1]}y = ${v[2]};  ${v[3]}x + ${v[4]}y = ${v[5]}\nFormula: Δ = a₁b₂ − a₂b₁ = ${det}\nCalculation: x = Δx/Δ = ${+x.toFixed(4)}, y = Δy/Δ = ${+y.toFixed(4)}\nFinal Answer: <b>x = ${+x.toFixed(4)}, y = ${+y.toFixed(4)}</b>`;
        }
        out.innerHTML = resultBox(det === 0 ? "No unique solution" : "Solution", txt, det === 0);
      });
    }
  }

  function solveQ(a, b, c) {
    const D = b * b - 4 * a * c;
    let s = `Given: ${a}x² + (${b})x + (${c}) = 0\nRequired: roots\nFormula: x = [−b ± √D]/2a, D = b² − 4ac\nDiscriminant: D = (${b})² − 4(${a})(${c}) = ${b * b} − ${4 * a * c} = ${D}\n`;
    if (D < 0) return s + "Since D < 0, there are no real roots (both roots are non-real/complex).";
    const sD = Math.sqrt(D);
    const x1 = (-b + sD) / (2 * a), x2 = (-b - sD) / (2 * a);
    s += `Nature: ${D === 0 ? "D = 0 → two equal real roots" : "D > 0 → two distinct real roots"}\nSubstitution: x = [${-b} ± ${+sD.toFixed(4)}] / ${2 * a}\nFinal Answer: <b>x = ${+x1.toFixed(4)} and x = ${+x2.toFixed(4)}</b>`;
    return s;
  }

  // ========================================================================
  // COORDINATE LAB
  // ========================================================================
  route("/coordtool", (app) => {
    app.innerHTML = pageTop("🎯 Coordinate Geometry Lab", "#/home") + `
      <div class="glass card">
        <svg class="diagram" id="coordSvg" viewBox="0 0 320 320" style="background:transparent"></svg>
        <div class="input-row">
          <div class="field"><label>Point A — x</label><input class="input" id="ax" inputmode="numeric" value="2"></div>
          <div class="field"><label>Point A — y</label><input class="input" id="ay" inputmode="numeric" value="3"></div>
        </div>
        <div class="input-row">
          <div class="field"><label>Point B — x</label><input class="input" id="bx" inputmode="numeric" value="-4"></div>
          <div class="field"><label>Point B — y</label><input class="input" id="by" inputmode="numeric" value="-2"></div>
        </div>
        <div class="input-row">
          <div class="field"><label>Ratio m : n (section)</label>
            <div class="input-row"><input class="input" id="m" inputmode="numeric" value="1"><input class="input" id="n" inputmode="numeric" value="1"></div></div>
        </div>
        <div id="coordOut" class="mt16"></div>
      </div>`;
    const compute = () => {
      const x1 = +$("#ax", app).value, y1 = +$("#ay", app).value, x2 = +$("#bx", app).value, y2 = +$("#by", app).value;
      const m = +$("#m", app).value || 1, n = +$("#n", app).value || 1;
      const d = Math.hypot(x2 - x1, y2 - y1);
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const sx = (m * x2 + n * x1) / (m + n), sy = (m * y2 + n * y1) / (m + n);
      $("#coordOut", app).innerHTML = resultBox("Results",
        `Given: A(${x1}, ${y1}), B(${x2}, ${y2})\nDistance: AB = √[(${x2}−${x1})² + (${y2}−${y1})²] = √${Math.round((x2 - x1) ** 2 + (y2 - y1) ** 2)} ≈ <b>${+d.toFixed(3)} units</b>\nMidpoint: <b>(${+mx.toFixed(3)}, ${+my.toFixed(3)})</b>\nSection point (ratio ${m}:${n}): <b>(${+sx.toFixed(3)}, ${+sy.toFixed(3)})</b>`);
      drawCoord(app, [[x1, y1, "A"], [x2, y2, "B"], [mx, my, "M"], [sx, sy, "S"]], d);
    };
    $$("input", app).forEach((i) => i.addEventListener("input", compute));
    compute();
  });

  function drawCoord(app, pts, dist) {
    const svg = $("#coordSvg", app);
    const W = 320, pad = 30, scale = 16;
    // fit to data
    const allx = pts.map((p) => p[0]), ally = pts.map((p) => p[1]);
    let cx = 0, cy = 0;
    const toX = (x) => W / 2 + x * scale;
    const toY = (y) => W / 2 - y * scale;
    let g = "";
    for (let i = -8; i <= 8; i++) {
      g += `<line class="grid-l" x1="${toX(i)}" y1="0" x2="${toX(i)}" y2="${W}"/>`;
      g += `<line class="grid-l" x1="0" y1="${toY(i)}" x2="${W}" y2="${toY(i)}"/>`;
    }
    g += `<line class="axis" x1="0" y1="${W / 2}" x2="${W}" y2="${W / 2}"/>`;
    g += `<line class="axis" x1="${W / 2}" y1="0" x2="${W / 2}" y2="${W}"/>`;
    g += `<text x="${W - 14}" y="${W / 2 - 6}" class="lbl2">x</text><text x="${W / 2 + 6}" y="14" class="lbl2">y</text>`;
    // segment AB
    g += `<line class="dim" x1="${toX(pts[0][0])}" y1="${toY(pts[0][1])}" x2="${toX(pts[1][0])}" y2="${toY(pts[1][1])}"/>`;
    pts.forEach(([x, y, l]) => {
      g += `<circle class="pt" cx="${toX(x)}" cy="${toY(y)}" r="5"/>`;
      g += `<text x="${toX(x) + 8}" y="${toY(y) - 8}">${l}(${x},${y})</text>`;
    });
    svg.innerHTML = g;
  }

  // ========================================================================
  // GEOMETRY MASTER
  // ========================================================================
  route("/geometry", (app) => {
    app.innerHTML = pageTop("📐 Geometry Master", "#/home") + `
      <div class="glass card learn-block"><h4>🔺 Similar triangles & Thales</h4>
        <svg class="diagram" viewBox="0 0 320 200">
          <polygon class="shape" points="40,170 150,30 260,170"/>
          <line class="dim" x1="95" y1="100" x2="205" y2="100"/>
          <text x="70" y="120">D</text><text x="212" y="120">E</text>
          <text x="30" y="185">B</text><text x="146" y="24">A</text><text x="264" y="185">C</text>
        </svg>
        <p><b>Thales' theorem (BPT):</b> if DE ∥ BC then AD/DB = AE/EC. Similar triangles have proportional sides; ratio of areas = square of side ratio.</p>
      </div>
      <div class="glass card learn-block"><h4>📏 Pythagoras' theorem</h4>
        <svg class="diagram" viewBox="0 0 320 200">
          <polygon class="shape" points="60,170 60,50 220,170"/>
          <rect x="60" y="158" width="12" height="12" class="shape-2"/>
          <text x="34" y="115">a</text><text x="135" y="185">b</text><text x="145" y="100">h</text>
        </svg>
        <p><b>h² = a² + b²</b> in a right triangle. Converse: if sides satisfy a² + b² = c², the triangle is right angled. Equilateral triangle altitude = (√3/2)×side.</p>
      </div>
      <div class="glass card learn-block"><h4>⭕ Circles & tangents</h4>
        <svg class="diagram" viewBox="0 0 320 200">
          <circle class="shape" cx="140" cy="110" r="60"/>
          <line class="dim" x1="140" y1="110" x2="140" y2="50"/>
          <line class="dim" x1="140" y1="50" x2="250" y2="50"/>
          <line class="dim" x1="140" y1="110" x2="250" y2="50"/>
          <text x="118" y="85">r</text><text x="190" y="44">tangent</text><text x="252" y="56">T</text><text x="126" y="126">O</text>
        </svg>
        <p>Radius ⟂ tangent at contact → ΔOPT is right angled, so tangent length = √(OP² − r²). Tangents from an external point are equal.</p>
      </div>
      <div class="glass card learn-block"><h4>◔ Sectors & segments</h4>
        <svg class="diagram" viewBox="0 0 320 200">
          <circle class="shape" cx="160" cy="120" r="65"/>
          <line class="dim" x1="160" y1="120" x2="160" y2="55"/>
          <line class="dim" x1="160" y1="120" x2="222" y2="146"/>
          <text x="176" y="90">θ</text>
        </svg>
        <p>Sector area = θ/360 × πr²; arc length = θ/360 × 2πr. Segment = sector − triangle. Ring area = π(R² − r²).</p>
      </div>
      <div class="glass card learn-block"><h4>🧊 Surface area & volume quick card</h4>
        <p><b>Cylinder:</b> V = πr²h, CSA = 2πrh. <b>Cone:</b> V = ⅓πr²h, slant l = √(r²+h²), CSA = πrl. <b>Sphere:</b> V = 4/3πr³, SA = 4πr². <b>Frustum:</b> l = √(h²+(R−r)²), V = ⅓πh(R²+Rr+r²), CSA = π(R+r)l. Melting/recasting conserves volume.</p>
        <a class="btn small ghost mt8" href="#/chapter/surface-volumes/formulas">📐 Open full formula list</a>
      </div>`;
  });

  // ========================================================================
  // TRIG MASTER
  // ========================================================================
  route("/trigmaster", (app) => {
    const rows = [["0°", "0", "1", "0"], ["30°", "1/2", "√3/2", "1/√3"], ["45°", "1/√2", "1/√2", "1"], ["60°", "√3/2", "1/2", "√3"], ["90°", "1", "0", "∞"]];
    app.innerHTML = pageTop("📏 Trigonometry Master", "#/home") + `
      <div class="glass card">
        <h4 style="margin:0 0 8px">📊 Standard angles</h4>
        <table class="data-tbl">
          <tr><th>Angle</th><th>sin</th><th>cos</th><th>tan</th></tr>
          ${rows.map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join("")}
        </table>
        <hr class="divider">
        <p class="muted" style="font-size:0.84rem"><b>Identities:</b> sin²θ + cos²θ = 1 · 1 + tan²θ = sec²θ · 1 + cot²θ = cosec²θ<br><b>Complementary:</b> sin(90−θ)=cos θ · tan(90−θ)=cot θ</p>
      </div>
      <div class="glass card learn-block"><h4>🗼 Heights & distances helper</h4>
        <svg class="diagram" viewBox="0 0 320 200">
          <line class="axis" x1="30" y1="170" x2="290" y2="170"/>
          <line class="shape" x1="30" y1="170" x2="30" y2="70" stroke-width="3"/>
          <line class="dim" x1="290" y1="170" x2="30" y2="70"/>
          <text x="10" y="120">h</text><text x="140" y="190">distance d</text><text x="200" y="150">θ</text>
        </svg>
        <p class="muted">Given angle of elevation θ and distance d: <b>h = d tan θ</b>. Given height and angle: <b>d = h cot θ</b>.</p>
        <div class="input-row mt8">
          <div class="field"><label>Angle θ (degrees)</label><input class="input" id="tgAng" inputmode="numeric" value="60"></div>
          <div class="field"><label>Distance d</label><input class="input" id="tgDist" inputmode="numeric" value="100"></div>
        </div>
        <button class="btn primary block" id="tgGo">Calculate height h</button>
        <div id="tgOut" class="mt16"></div>
      </div>`;
    $("#tgGo", app).addEventListener("click", () => {
      const ang = parseFloat($("#tgAng", app).value), d = parseFloat($("#tgDist", app).value);
      const out = $("#tgOut", app);
      if (isNaN(ang) || isNaN(d)) { out.innerHTML = resultBox("Input needed", "Enter angle and distance.", true); return; }
      const rad = ang * Math.PI / 180;
      const h = d * Math.tan(rad);
      if (!isFinite(h)) { out.innerHTML = resultBox("Undefined", `tan ${ang}° is not defined (or too large). Use an angle other than 90°.`, true); return; }
      out.innerHTML = resultBox("Height calculation",
        `Given: θ = ${ang}°, distance d = ${d} units\nFormula: h = d tan θ\nSubstitution: h = ${d} × tan(${ang}°) = ${d} × ${+Math.tan(rad).toFixed(4)}\nFinal Answer: <b>h ≈ ${+h.toFixed(2)} units</b>`);
    });
  });

  // ========================================================================
  // MATH AI CHAT
  // ========================================================================
  route("/ai", (app) => {
    const st = MMX.store.state;
    app.innerHTML = pageTop("🤖 Maths AI Tutor", "#/home") + `
      <div class="chat-page-pad">
        <div class="glass card" style="padding:14px 16px">
          <div class="flex">
            <div style="font-size:1.6rem">🤖</div>
            <div><b>Your CBSE Class 10 maths tutor</b>
              <div class="muted" style="font-size:0.76rem">Solves equations, trig, AP, statistics, coordinate geometry & more with full steps.</div>
            </div>
          </div>
        </div>
        <div class="chat-wrap" id="chatWrap"></div>
      </div>
      <div class="chat-input-bar">
        <input class="input" id="chatIn" placeholder="Ask a maths question…  e.g. solve 2x^2−5x+3=0">
        <button class="btn primary" id="chatSend" style="padding:13px 16px">➤</button>
      </div>`;
    const wrap = $("#chatWrap", app);
    const suggestions = ["solve x^2 − 5x + 6 = 0", "sin 60", "distance between (2,3) and (5,7)", "x + y = 10 and x − y = 2", "mean of 12 15 18 20 25", "HCF and LCM of 96 404"];
    const addMsg = (text, who) => {
      const el = document.createElement("div");
      el.className = "msg " + who;
      el.innerHTML = rich(text);
      wrap.appendChild(el);
      if (el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "end" });
      return el;
    };
    const showSuggestions = () => {
      const row = document.createElement("div");
      row.className = "chat-suggestions";
      row.innerHTML = suggestions.map((s) => `<button class="chip">${esc(s)}</button>`).join("");
      row.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (b) { $("#chatIn", app).value = b.textContent; send(b.textContent); row.remove(); }
      });
      wrap.appendChild(row);
    };
    if (!st.chatHistory.length) {
      addMsg("Hi! I'm your Maths AI tutor for CBSE Class 10. 👋\n\nI can solve and explain with full steps — Given → Formula → Substitution → Calculation → Final Answer. I can do quadratic & linear equations, trigonometric values, AP terms and sums, coordinate distance/midpoint, statistics (mean/median/mode), HCF/LCM, and plain calculations — plus concept revision for any chapter.\n\nTry one of the chips below, or type your question:", "bot");
      showSuggestions();
    } else {
      st.chatHistory.slice(-20).forEach((m) => addMsg(m.text, m.who));
    }
    const send = async (text) => {
      text = (text || $("#chatIn", app).value).trim();
      if (!text) return;
      addMsg(text, "user");
      st.chatHistory.push({ who: "user", text });
      $("#chatIn", app).value = "";
      const typing = addMsg('<span class="typing-dots"><i></i><i></i><i></i></span>', "bot");
      try {
        const res = await MMX.ai.ask(text);
        typing.innerHTML = rich(res.text);
        st.chatHistory.push({ who: "bot", text: res.text });
      } catch (e) {
        typing.innerHTML = "Sorry — I couldn't process that. Try rephrasing, e.g. \"solve 2x^2 + 3x − 2 = 0\" or \"tan 45\".";
      }
      MMX.store.save();
    };
    $("#chatSend", app).addEventListener("click", () => send());
    $("#chatIn", app).addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
  });

  // ========================================================================
  // Maths Toolkit (hub + modular tools)
  // ========================================================================
  route("/toolkit", (app) => MMX.toolkit.renderHub(app));
  route("/tool", (app, parts) => MMX.toolkit.renderTool(app, parts[0]));

  // ========================================================================
  // Boot
  // ========================================================================
  MMX.store.applySettings();
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (MMX.store.state.settings.theme === "system") MMX.store.applySettings();
    });
  }
  if (!location.hash) location.hash = "#/home";
  navigate();
  MMX.achievements.check();
})();
