/* ==========================================================================
   Maths Master X — syllabus registry, lazy chapter loader, achievements
   Chapter CONTENT lives in separate files under /data (one file per chapter)
   and is loaded on demand — never bundled into the initial page.
   ========================================================================== */
(function () {
  "use strict";

  // CBSE Class 10 Mathematics — current syllabus (NCERT, 14 chapters).
  // Categories used for Formula Master filters:
  // Algebra | Geometry | Trigonometry | Mensuration | Statistics | Probability | Numbers
  const CHAPTERS = [
    { id: "real-numbers",             num: 1,  name: "Real Numbers",                              icon: "🔢", cat: "Numbers",       file: "data/ch1-real-numbers.js" },
    { id: "polynomials",              num: 2,  name: "Polynomials",                               icon: "🧩", cat: "Algebra",       file: "data/ch2-polynomials.js" },
    { id: "linear-equations",         num: 3,  name: "Pair of Linear Equations in Two Variables", icon: "⚖️", cat: "Algebra",       file: "data/ch3-linear-equations.js" },
    { id: "quadratic-equations",      num: 4,  name: "Quadratic Equations",                       icon: "📈", cat: "Algebra",       file: "data/ch4-quadratic-equations.js" },
    { id: "arithmetic-progressions",  num: 5,  name: "Arithmetic Progressions",                   icon: "🔗", cat: "Algebra",       file: "data/ch5-arithmetic-progressions.js" },
    { id: "triangles",                num: 6,  name: "Triangles",                                 icon: "📐", cat: "Geometry",      file: "data/ch6-triangles.js" },
    { id: "coordinate-geometry",      num: 7,  name: "Coordinate Geometry",                       icon: "🎯", cat: "Geometry",      file: "data/ch7-coordinate-geometry.js" },
    { id: "trigonometry",             num: 8,  name: "Introduction to Trigonometry",              icon: "📏", cat: "Trigonometry",  file: "data/ch8-trigonometry.js" },
    { id: "applications-trigonometry",num: 9,  name: "Some Applications of Trigonometry",        icon: "🗼", cat: "Trigonometry",  file: "data/ch9-applications-trigonometry.js" },
    { id: "circles",                  num: 10, name: "Circles",                                   icon: "⭕", cat: "Geometry",      file: "data/ch10-circles.js" },
    { id: "areas-circles",            num: 11, name: "Areas Related to Circles",                  icon: "◔", cat: "Mensuration",   file: "data/ch11-areas-circles.js" },
    { id: "surface-volumes",          num: 12, name: "Surface Areas and Volumes",                icon: "🧊", cat: "Mensuration",   file: "data/ch12-surface-volumes.js" },
    { id: "statistics",               num: 13, name: "Statistics",                                icon: "📊", cat: "Statistics",    file: "data/ch13-statistics.js" },
    { id: "probability",              num: 14, name: "Probability",                               icon: "🎲", cat: "Probability",   file: "data/ch14-probability.js" }
  ];

  const CATEGORIES = ["All", "Algebra", "Geometry", "Trigonometry", "Mensuration", "Statistics", "Probability", "Numbers"];

  // ---- chapter content cache + lazy loader ----
  const cache = {};
  const inflight = {};

  window.MMX = window.MMX || {};
  MMX.chapters = CHAPTERS;
  MMX.categories = CATEGORIES;
  MMX.chapterData = cache;

  // Called by each data/ch*.js file when it finishes loading
  MMX.registerChapter = function (obj) {
    cache[obj.id] = obj;
    if (inflight[obj.id]) { inflight[obj.id].forEach((cb) => cb(obj)); delete inflight[obj.id]; }
  };

  MMX.getChapterMeta = (id) => CHAPTERS.find((c) => c.id === id);

  MMX.loadChapter = function (id) {
    if (cache[id]) return Promise.resolve(cache[id]);
    if (inflight[id]) return new Promise((res) => inflight[id].push(res));
    const meta = CHAPTERS.find((c) => c.id === id);
    if (!meta) return Promise.reject(new Error("Unknown chapter " + id));
    return new Promise((resolve, reject) => {
      inflight[id] = [resolve];
      const s = document.createElement("script");
      s.src = meta.file;
      s.async = true;
      s.onerror = () => { delete inflight[id]; reject(new Error("Failed to load " + meta.file)); };
      document.head.appendChild(s);
    });
  };

  MMX.loadAllChapters = function (onProgress) {
    let done = 0;
    return Promise.all(
      CHAPTERS.map((c) =>
        MMX.loadChapter(c.id).then((ch) => {
          done++;
          if (onProgress) onProgress(done, CHAPTERS.length);
          return ch;
        })
      )
    );
  };

  // Find a question object anywhere by id (requires that chapter loaded; pass loaded set)
  MMX.findQuestion = function (qid) {
    for (const id in cache) {
      const ch = cache[id];
      const q = (ch.questions || []).find((x) => x.id === qid);
      if (q) return { q, chap: ch };
    }
    return null;
  };

  MMX.qidParts = function (qid) {
    // qid format: "ch4-q3"
    const m = /^(ch\d+)-q(\d+)$/.exec(qid);
    if (!m) return null;
    const meta = CHAPTERS.find((c) => c.file.startsWith("data/" + m[1] + "-"));
    return meta ? { chapId: meta.id, index: parseInt(m[2], 10) } : null;
  };

  // ---- Achievements (unlocked by REAL activity; checked after each action) ----
  MMX.achievementsDefs = [
    { id: "first-practice", ico: "🏆", name: "First Practice",        desc: "Complete your first practice session", test: (s) => s.progress.sessions >= 1 },
    { id: "streak-3",       ico: "🔥", name: "3-Day Streak",           desc: "Study 3 days in a row",               test: (s) => s.progress.streak >= 3 },
    { id: "streak-7",       ico: "⚡", name: "Week Warrior",           desc: "Study 7 days in a row",               test: (s) => s.progress.streak >= 7 },
    { id: "acc-90",         ico: "🎯", name: "90% Accuracy",           desc: "90%+ accuracy on 20+ attempts",       test: (s) => s.progress.questionsAttempted >= 20 && (s.progress.questionsCorrect / s.progress.questionsAttempted) >= 0.9 },
    { id: "chapters-5",     ico: "📚", name: "5 Chapters Completed",   desc: "Complete 5 chapters (80%+ progress)", test: (s) => completedChapters(s) >= 5 },
    { id: "algebra-master", ico: "🧮", name: "Algebra Master",         desc: "30+ correct answers in Algebra",      test: (s) => correctInCat(s, "Algebra") >= 30 },
    { id: "geometry-master",ico: "📐", name: "Geometry Master",        desc: "25+ correct answers in Geometry",     test: (s) => correctInCat(s, "Geometry") >= 25 },
    { id: "stats-pro",      ico: "📊", name: "Statistics Pro",         desc: "15+ correct in Statistics/Probability", test: (s) => correctInCat(s, "Statistics") + correctInCat(s, "Probability") >= 15 },
    { id: "trig-expert",    ico: "📈", name: "Trigonometry Expert",    desc: "20+ correct answers in Trigonometry", test: (s) => correctInCat(s, "Trigonometry") >= 20 },
    { id: "number-ninja",   ico: "🔢", name: "Number Ninja",           desc: "10+ correct answers in Real Numbers", test: (s) => correctInCat(s, "Numbers") >= 10 },
    { id: "formula-fan",    ico: "📐", name: "Formula Fan",            desc: "Bookmark 5 formulas",                 test: (s) => s.bookmarks.f.length >= 5 },
    { id: "mistake-fixer",  ico: "📕", name: "Mistake Fixer",          desc: "Clear your mistake book after retrying", test: (s) => s._wasMistakes && s.mistakes.length === 0 },
    { id: "daily-3",        ico: "🗓️", name: "Daily Devotee",          desc: "3-day daily challenge streak",        test: (s) => s.daily.streak >= 3 },
    { id: "revisionist",    ico: "🧠", name: "Revisionist",            desc: "Complete 5 revision sessions",        test: (s) => Object.values(s.progress.revisedModes).reduce((a, b) => a + b, 0) >= 5 },
    { id: "centurion",      ico: "💯", name: "Centurion",              desc: "Attempt 100 questions",               test: (s) => s.progress.questionsAttempted >= 100 },
    { id: "maths-master",   ico: "👑", name: "Maths Master",           desc: "All 14 chapters at 80%+ progress",    test: (s) => completedChapters(s) >= 14 }
  ];

  function completedChapters(s) {
    let n = 0;
    for (const ch of CHAPTERS) {
      const cp = s.progress.chapters[ch.id];
      if (cp && MMX.store.chapterPct(ch, cp) >= 80) n++;
    }
    return n;
  }
  function correctInCat(s, cat) {
    let n = 0;
    for (const ch of CHAPTERS) {
      if (ch.cat !== cat) continue;
      const cp = s.progress.chapters[ch.id];
      if (cp) n += cp.correct || 0;
    }
    return n;
  }

  // Track that mistakes existed (for Mistake Fixer achievement)
  const _origRecord = MMX.store.recordAttempt;
  MMX.store.recordAttempt = function (qid, chapId, correct, answer, topic) {
    const hadMistakes = MMX.store.state.mistakes.length > 0;
    _origRecord(qid, chapId, correct, answer, topic);
    if (hadMistakes) MMX.store.state._wasMistakes = true;
  };

  MMX.achievements = {
    check() {
      const s = MMX.store.state;
      const newly = [];
      for (const def of MMX.achievementsDefs) {
        if (!s.achievements[def.id]) {
          let ok = false;
          try { ok = def.test(s); } catch (e) { ok = false; }
          if (ok) {
            s.achievements[def.id] = { date: MMX.store.todayStr() };
            newly.push(def);
          }
        }
      }
      if (newly.length) {
        MMX.store.save();
        if (MMX.ui && MMX.ui.celebrateAchievements) MMX.ui.celebrateAchievements(newly);
      }
      return newly;
    }
  };

  MMX.util = {
    shuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    fmtTime(sec) {
      sec = Math.max(0, Math.round(sec));
      const m = Math.floor(sec / 60), s = sec % 60;
      return m + ":" + String(s).padStart(2, "0");
    },
    fmtClock(sec) {
      const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
      if (h) return h + "h " + m + "m";
      if (m) return m + " min";
      return sec + " sec";
    },
    esc(str) {
      return String(str == null ? "" : str)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    },
    // light-weight **bold** and \n rendering inside text
    rich(str) {
      let h = MMX.util.esc(str);
      h = h.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
      return h;
    },
    pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  };
})();
