# Maths Master X 🧮

**A premium CBSE Class 10 Mathematics learning, practice & revision app.**
Founder & Developer: **RIYANSH**

A mobile-first, iPhone-inspired **Liquid Glass** study app — no build step, no
frameworks, runs from any static host (or just open it). All progress is stored
locally (`localStorage`); the built-in **Maths AI** genuinely solves Class 10
maths in the browser, so it works fully offline with **no API key at all**.

## Run it

```bash
# any static server works, e.g.
python3 -m http.server 8080
# then open http://localhost:8080
```

Opening `index.html` directly via `file://` also works (chapter files are
loaded with dynamic `<script>` tags).

## What's inside

| Area | Features |
|---|---|
| 🏠 Home | Greeting, streak, accuracy, course progress, 8 quick actions, toolkit |
| 📚 Learn | All **14 CBSE Class 10 chapters**, each with Learn · Concepts · Formulas · Solved Examples · Questions · Practice |
| 📐 Formula Master | 71 formulas, chapter-wise, with search, bookmark, copy-ready cards, category filters (Algebra/Geometry/Trigonometry/Mensuration/Statistics/Probability/Numbers) |
| ✏️ Solved Examples | 42 step-by-step solutions (Given → Formula/Concept → Steps → Final Answer) |
| 📝 Question Bank | **217 questions** — MCQ, Assertion & Reason, VSA, SA, LA, Case-Based, Competency — with detailed explanations, marks, difficulty & topic; filters for difficulty / unattempted / incorrect / bookmarked / important |
| ⚡ Quick Practice | 10 / 20 / 30 timed mixed questions; results show score, accuracy, time, weak topics, recommendations |
| 🔥 Daily Challenge | 5 deterministic questions per day; streak, personal best, history |
| 📕 Mistake Book | Auto-saved wrong answers with retry / remove / practice-all |
| 🧰 Toolkit | Basic+trig calculator, quadratic solver, linear-system solver, coordinate lab (plot/distance/midpoint/section), geometry visualiser, trigonometry heights & distances helper |
| 🧠 Quick Revision | 5-minute / 15-minute / 30-minute / One-Day / Exam-Tomorrow modes |
| 🤖 Maths AI | Tutor chat that *actually solves*: quadratics, linear pairs, single-variable equations, AP terms & sums, trig values, distance/midpoint, mean/median/mode, HCF/LCM, arithmetic — with Given → Formula → Substitution → Calculation → Final Answer |
| 🏆 Achievements | 16 functional achievements unlocked by real activity |
| 🔍 Search | Global search across chapters, concepts, formulas, examples, questions, revision |
| 🔖 Bookmarks | Bookmarks for formulas, examples, questions |
| ⚙️ Settings | Light / Dark / System theme, font size, daily goal, reset/clear data |

## Project structure

```
index.html
css/styles.css           # Liquid Glass design system
js/store.js              # localStorage state: progress, bookmarks, mistakes, settings, streaks
js/data.js               # syllabus registry (14 chapters), lazy loader, achievements
js/ai.js                 # local math-solving tutor engine + optional secure Worker hook
js/app.js                # router + all views + practice engine + tools + SVG diagrams
data/ch1-…-ch14-….js     # one file per chapter (concepts, formulas, examples, questions, revision)
worker/worker.js         # OPTIONAL Cloudflare Worker proxy for a cloud LLM (key stays secret)
tools/validate.js        # content validator: node tools/validate.js
```

Chapters are loaded **on demand** (`js/data.js` injects the matching
`data/chN-*.js` only when opened), so the initial page never ships hundreds of
questions.

## Optional cloud AI (safe-by-default)

The app ships no API keys. To add a cloud tutor, deploy `worker/worker.js` to
Cloudflare Workers, set the `OPENAI_API_KEY` secret with `wrangler secret put`,
and set the endpoint before `js/ai.js` loads:

```html
<script>window.MMX_AI_ENDPOINT = "https://<your-worker>.workers.dev/";</script>
```

If the endpoint is absent or fails, the app transparently uses the local solver
engine — there are **no fake AI responses**.

## Content integrity

- Syllabus = current CBSE Class 10 Mathematics (14 NCERT chapters).
- All practice questions are labelled **"Practice Question"**; no invented
  questions are presented as real PYQs.
- All auto-graded questions were validated (`node tools/validate.js`) and
  every solver verified by automated tests (quadratics, linear systems, APs,
  trig values, statistics, HCF/LCM, coordinate formulas).
