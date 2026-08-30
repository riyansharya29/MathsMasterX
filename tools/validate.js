/* Validation harness for chapter data — run with: node tools/validate.js */
const fs = require("fs");
const path = require("path");

global.MMX = { registerChapter: (c) => chapters.push(c) };
const chapters = [];

const dir = path.join(__dirname, "..", "data");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js")).sort();
let errors = [];
let warnings = [];

for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), "utf8");
  try {
    // eslint-disable-next-line no-new-func
    new Function("MMX", src + "\n//# sourceURL=" + f)(global.MMX);
  } catch (e) {
    errors.push(`${f}: SYNTAX ERROR — ${e.message}`);
    continue;
  }
}

const ids = new Set();
let totalQ = 0, totalF = 0, totalE = 0;
const types = {};
const diffs = {};
const qids = new Set();

for (const ch of chapters) {
  const tag = `[${ch.id}]`;
  if (!ch.name || !ch.icon) errors.push(`${tag} missing name/icon`);
  if (ids.has(ch.id)) errors.push(`${tag} duplicate chapter id`);
  ids.add(ch.id);
  ["concepts", "formulas", "examples", "questions", "revision"].forEach((k) => {
    if (!Array.isArray(ch[k]) && k !== "revision") errors.push(`${tag} missing array ${k}`);
  });
  if (!ch.revision || !Array.isArray(ch.revision.points) || !Array.isArray(ch.revision.mistakes) || !Array.isArray(ch.revision.tricks))
    errors.push(`${tag} revision block incomplete`);
  if ((ch.concepts || []).length < 4) warnings.push(`${tag} only ${(ch.concepts||[]).length} concepts`);

  (ch.formulas || []).forEach((fm, i) => {
    totalF++;
    ["id", "name", "cat", "expr", "vars", "explain", "example"].forEach((k) => {
      if (!fm[k]) errors.push(`${tag} formula #${i} (${fm.id || "?"}) missing ${k}`);
    });
    if (fm.id && ids.has(fm.id)) errors.push(`${tag} duplicate formula id ${fm.id}`);
    if (fm.id) ids.add(fm.id);
  });

  (ch.examples || []).forEach((ex, i) => {
    totalE++;
    ["id", "title", "given", "concept", "steps"].forEach((k) => {
      if (!ex[k]) errors.push(`${tag} example #${i} (${ex.id || "?"}) missing ${k}`);
    });
    const hasAns = (ex.steps || []).some((s) => s.ans);
    if (!hasAns) errors.push(`${tag} example ${ex.id} has no Final Answer step`);
  });

  (ch.questions || []).forEach((q, i) => {
    totalQ++;
    types[q.type] = (types[q.type] || 0) + 1;
    diffs[q.diff] = (diffs[q.diff] || 0) + 1;
    ["id", "type", "topic", "diff", "marks", "q", "explain"].forEach((k) => {
      if (q[k] === undefined || q[k] === null || q[k] === "")
        errors.push(`${tag} question #${i} (${q.id || "?"}) missing ${k}`);
    });
    if (qids.has(q.id)) errors.push(`${tag} DUPLICATE QUESTION ID ${q.id}`);
    qids.add(q.id);
    if (!["easy", "medium", "hard"].includes(q.diff)) errors.push(`${tag} ${q.id} bad diff ${q.diff}`);
    const hasOptions = Array.isArray(q.options) && q.options.length === 4;
    if (hasOptions) {
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer > 3)
        errors.push(`${tag} ${q.id} option question answer must be 0..3`);
    } else if (q.type !== "mcq" && q.type !== "ar") {
      if (typeof q.answer !== "string" || q.answer.length < 1)
        errors.push(`${tag} ${q.id} non-mcq needs string answer`);
    } else {
      errors.push(`${tag} ${q.id} ${q.type} must have 4 options`);
    }
    if (q.explain && q.explain.length < 20) warnings.push(`${tag} ${q.id} explanation very short`);
    // leftover scratch markers
    if (/Recheck|matches option|closest option|TODO|FIXME|\?\s*—|\buse clean values\b/i.test(q.q + " " + q.explain + " " + (q.answer||""))) {
      errors.push(`${tag} ${q.id} contains scratch/uncertain text`);
    }
  });
}

console.log(`Chapters loaded: ${chapters.length}`);
console.log(`Questions: ${totalQ} | Formulas: ${totalF} | Examples: ${totalE}`);
console.log("Types:", JSON.stringify(types));
console.log("Difficulties:", JSON.stringify(diffs));
// per-chapter counts
for (const ch of chapters) {
  console.log(`  ${ch.icon} ${ch.name.padEnd(52)} Q:${ch.questions.length} F:${ch.formulas.length} E:${ch.examples.length} C:${ch.concepts.length}`);
}
if (warnings.length) { console.log("\n--- WARNINGS ---"); warnings.forEach((w) => console.log("W: " + w)); }
if (errors.length) { console.log("\n--- ERRORS ---"); errors.forEach((e) => console.log("E: " + e)); process.exit(1); }
console.log("\n✅ All chapter data validated.");
