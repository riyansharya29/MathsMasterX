/* ==========================================================================
   Maths Master X — persistent state store (localStorage)
   All progress, settings, bookmarks, mistakes, achievements live here.
   ========================================================================== */
(function () {
  "use strict";
  const KEY = "mathsMasterX_v1";

  const todayStr = () => {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  };
  const dateAdd = (s, days) => {
    const d = new Date(s + "T00:00:00");
    d.setDate(d.getDate() + days);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  };

  const DEFAULTS = {
    settings: { theme: "dark", font: "medium", goal: 20, reducedMotion: false },
    progress: {
      // per chapter: {learn:false, concepts:false, formulas:false, examples:false, attempted:0, correct:0, practiceDone:false}
      chapters: {},
      questionsAttempted: 0,
      questionsCorrect: 0,
      totalTimeSec: 0,
      sessions: 0,
      lastStudyDate: null,
      streak: 0,
      weakTopics: {},   // topic -> wrong count
      revisedModes: {}, // mode id -> count
      revisionPoints: 0
    },
    bookmarks: { q: [], f: [], e: [], r: [] }, // questions, formulas, examples, revision
    mistakes: [],        // {qid, chapId, answer, correct, date}
    important: [],       // qids starred
    attempts: {},        // qid -> {correct:bool, answer:any, date}
    achievements: {},    // id -> {date}
    daily: { lastDate: null, streak: 0, best: 0, history: {} }, // history date -> {score,total}
    chatHistory: []
  };

  const clone = (o) => JSON.parse(JSON.stringify(o));
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(DEFAULTS);
      const parsed = JSON.parse(raw);
      // deep merge to survive new fields
      return merge(clone(DEFAULTS), parsed);
    } catch (e) {
      console.warn("State load failed, resetting", e);
      return clone(DEFAULTS);
    }
  }
  function merge(base, over) {
    for (const k in over) {
      if (over[k] && typeof over[k] === "object" && !Array.isArray(over[k]) && base[k] && typeof base[k] === "object") {
        merge(base[k], over[k]);
      } else base[k] = over[k];
    }
    return base;
  }
  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn("Save failed", e); }
    }, 120);
  }

  // ---- Streaks (study streak) ----
  function touchStudy() {
    const p = state.progress;
    const t = todayStr();
    if (p.lastStudyDate === t) return;
    if (p.lastStudyDate && dateAdd(p.lastStudyDate, 1) === t) p.streak += 1;
    else p.streak = 1;
    p.lastStudyDate = t;
    p.sessions += 1;
    save();
  }
  function addStudyTime(sec) {
    state.progress.totalTimeSec += Math.max(0, Math.round(sec));
    save();
  }

  // ---- Questions / attempts ----
  function recordAttempt(qid, chapId, correct, answer, topic) {
    const p = state.progress;
    const prev = state.attempts[qid];
    p.questionsAttempted += 1;
    if (correct) p.questionsCorrect += 1;
    state.attempts[qid] = { correct: !!correct, answer: answer, date: todayStr() };

    const cp = (p.chapters[chapId] = p.chapters[chapId] || { attempted: 0, correct: 0 });
    cp.attempted += 1;
    if (correct) cp.correct += 1;

    if (!correct) {
      p.weakTopics[topic || "General"] = (p.weakTopics[topic || "General"] || 0) + 1;
      // mistake book: keep one entry per question (update if re-attempted wrong)
      const existing = state.mistakes.find((m) => m.qid === qid);
      if (existing) { existing.answer = answer; existing.date = todayStr(); }
      else state.mistakes.push({ qid, chapId, answer: answer, date: todayStr() });
    } else {
      // correct now -> remove from mistake book
      state.mistakes = state.mistakes.filter((m) => m.qid !== qid);
      if (p.weakTopics[topic] && prev && !prev.correct) {
        p.weakTopics[topic] = Math.max(0, p.weakTopics[topic] - 1);
      }
    }
    touchStudy();
    save();
    MMX.achievements.check();
  }

  function removeMistake(qid) {
    state.mistakes = state.mistakes.filter((m) => m.qid !== qid);
    save();
  }

  // ---- Bookmarks ----
  function toggleBookmark(type, id) {
    const arr = state.bookmarks[type];
    const i = arr.indexOf(id);
    if (i >= 0) { arr.splice(i, 1); save(); return false; }
    arr.push(id); save(); return true;
  }
  function isBookmarked(type, id) { return state.bookmarks[type].includes(id); }

  function toggleImportant(qid) {
    const i = state.important.indexOf(qid);
    if (i >= 0) { state.important.splice(i, 1); save(); return false; }
    state.important.push(qid); save(); return true;
  }

  // ---- Chapter content flags ----
  function markSection(chapId, section) {
    const cp = (state.progress.chapters[chapId] = state.progress.chapters[chapId] || { attempted: 0, correct: 0 });
    if (!cp[section]) { cp[section] = true; touchStudy(); MMX.achievements.check(); }
    save();
  }
  function chapterPct(chap, cp) {
    if (!cp) return 0;
    let done = 0, total = 4; // learn, concepts, formulas, examples
    ["learn", "concepts", "formulas", "examples"].forEach((s) => { if (cp[s]) done++; });
    // questions: up to 60% weight after content sections
    const qRatio = Math.min(1, (cp.attempted || 0) / Math.min(10, (chap.questions || []).length || 10));
    const contentScore = done / total;
    return Math.round(contentScore * 55 + qRatio * 45);
  }

  // ---- Daily challenge ----
  function dailyDoneToday() { return state.daily.lastDate === todayStr(); }
  function recordDaily(score, total) {
    const t = todayStr();
    const d = state.daily;
    if (d.lastDate && dateAdd(d.lastDate, 1) === t) d.streak += 1;
    else if (d.lastDate !== t) d.streak = 1;
    d.lastDate = t;
    d.history[t] = { score, total };
    const pct = total ? (score / total) * 100 : 0;
    if (pct > (d.best || 0)) d.best = Math.round(pct);
    touchStudy();
    save();
    MMX.achievements.check();
  }

  function recordRevision(modeId) {
    state.progress.revisedModes[modeId] = (state.progress.revisedModes[modeId] || 0) + 1;
    state.progress.revisionPoints += 1;
    touchStudy();
    save();
    MMX.achievements.check();
  }

  // ---- Reset helpers ----
  function resetProgress() {
    state.progress = clone(DEFAULTS.progress);
    state.attempts = {};
    state.mistakes = [];
    state.achievements = {};
    state.daily = clone(DEFAULTS.daily);
    save();
  }
  function clearMistakes() { state.mistakes = []; save(); }
  function clearBookmarks() { state.bookmarks = { q: [], f: [], e: [], r: [] }; save(); }

  function setSetting(key, val) {
    state.settings[key] = val;
    save();
    applySettings();
  }
  function applySettings() {
    const s = state.settings;
    let theme = s.theme;
    if (theme === "system") {
      theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-font", s.font || "medium");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#eef4fc" : "#07101f");
  }

  window.MMX = window.MMX || {};
  MMX.store = {
    state,
    save,
    todayStr,
    touchStudy,
    addStudyTime,
    recordAttempt,
    removeMistake,
    toggleBookmark,
    isBookmarked,
    toggleImportant,
    markSection,
    chapterPct,
    dailyDoneToday,
    recordDaily,
    recordRevision,
    resetProgress,
    clearMistakes,
    clearBookmarks,
    setSetting,
    applySettings
  };
})();
