/* ==========================================================================
   Maths Master X — Toolkit math engine (tx)
   Exact fractions, safe expression parser (no eval), equation & polynomial
   solvers, coordinate geometry, statistics, trig table, mensuration,
   probability. All deterministic and offline.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Fractions (exact rational arithmetic) ---------- */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
  function lcm2(a, b) { return Math.abs(a * b) / gcd(a, b); }
  function F(n, d) {
    d = d === undefined ? 1 : d;
    if (d === 0) throw new Error("Division by zero");
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(Math.abs(n), Math.abs(d));
    return { n: n / g, d: d / g };
  }
  const fadd = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
  const fsub = (a, b) => F(a.n * b.d - b.n * a.d, a.d * b.d);
  const fmul = (a, b) => F(a.n * b.n, a.d * b.d);
  const fdiv = (a, b) => F(a.n * b.d, a.d * b.n);
  function fstr(x) {
    if (x.d === 1) return String(x.n);
    const whole = Math.floor(Math.abs(x.n) / x.d);
    if (whole > 0) return (x.n < 0 ? "-" : "") + whole + " " + (Math.abs(x.n) % x.d) + "/" + x.d;
    return x.n + "/" + x.d;
  }
  const fdec = (x) => x.n / x.d;

  /* ---------- number theory ---------- */
  function primeFactors(n) {
    n = Math.abs(Math.round(n));
    const out = {};
    for (let p = 2; p * p <= n; p++) while (n % p === 0) { out[p] = (out[p] || 0) + 1; n /= p; }
    if (n > 1) out[n] = (out[n] || 0) + 1;
    return out;
  }
  const factorsOf = (n) => {
    n = Math.abs(Math.round(n)); const fs = [];
    for (let i = 1; i * i <= n; i++) if (n % i === 0) { fs.push(i); if (i !== n / i) fs.push(n / i); }
    return fs.sort((a, b) => a - b);
  };
  const isPrime = (n) => { n = Math.round(n); if (n < 2) return false; if (n % 2 === 0) return n === 2; for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false; return true; };
  function hcf(nums) { return nums.reduce((a, b) => gcd(a, b), 0); }
  function lcm(nums) { return nums.reduce((a, b) => lcm2(a, b), 1); }
  // Euclid's division algorithm steps
  function euclidSteps(a, b) {
    const steps = []; let x = Math.max(a, b), y = Math.min(a, b);
    while (y !== 0) { const q = Math.floor(x / y), r = x - q * y; steps.push({ a: x, b: y, q, r }); x = y; y = r; }
    return { hcf: x, steps };
  }
  function pfString(n) {
    const f = primeFactors(n);
    return Object.keys(f).map((p) => f[p] === 1 ? p : p + "^" + f[p]).join(" × ");
  }
  function hcfLcm(nums) {
    const fact = nums.map(primeFactors);
    const primes = new Set(); fact.forEach((m) => Object.keys(m).forEach((p) => primes.add(+p)));
    let H = 1, L = 1;
    primes.forEach((p) => {
      const pow = fact.map((m) => m[p] || 0);
      H *= Math.pow(p, Math.min(...pow));
      L *= Math.pow(p, Math.max(...pow));
    });
    return { hcf: H, lcm: L };
  }

  /* ---------- decimals <-> fractions ---------- */
  function decimalToFraction(str) {
    str = String(str).trim();
    const neg = str.startsWith("-"); if (neg) str = str.slice(1);
    if (!str.includes(".")) str = str + ".0";
    const [intPart, decPart] = str.split(".");
    let num = parseInt((intPart || "0") + decPart, 10) || 0;
    let den = Math.pow(10, decPart.length);
    if (neg) num = -num;
    const f = F(num, den);
    return { frac: fstr(f), dec: fdec(f) };
  }

  /* ---------- safe expression parser (shunting-yard) ---------- */
  const OPS = { "+": { p: 2, fn: (a, b) => a + b }, "-": { p: 2, fn: (a, b) => a - b }, "*": { p: 3, fn: (a, b) => a * b }, "/": { p: 3, fn: (a, b) => a / b }, "^": { p: 4, fn: (a, b) => Math.pow(a, b) }, "%": { p: 3, fn: (a, b) => (b === undefined ? a / 100 : (a * b) / 100) } };
  const FUNCS = {
    sin: (x) => Math.sin(x * Math.PI / 180), cos: (x) => Math.cos(x * Math.PI / 180), tan: (x) => Math.tan(x * Math.PI / 180),
    sqrt: (x) => Math.sqrt(x), sqr: (x) => x * x, abs: (x) => Math.abs(x), log: (x) => Math.log10(x), ln: (x) => Math.log(x),
    round: Math.round, floor: Math.floor, ceil: Math.ceil,
    cosec: (x) => 1 / Math.sin(x * Math.PI / 180), sec: (x) => 1 / Math.cos(x * Math.PI / 180), cot: (x) => 1 / Math.tan(x * Math.PI / 180)
  };
  const CONSTS = { pi: Math.PI, "π": Math.PI, e: Math.E };
  function tokenize(expr) {
    const out = []; let i = 0; const s = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/√/g, "sqrt").replace(/−/g, "-").replace(/\s+/g, "");
    while (i < s.length) {
      const c = s[i];
      if (/[0-9.]/.test(c)) { let n = ""; while (i < s.length && /[0-9.]/.test(s[i])) n += s[i++]; out.push({ t: "num", v: parseFloat(n) }); continue; }
      if (/[a-zA-Zπ]/.test(c)) { let w = ""; while (i < s.length && /[a-zA-Zπ]/.test(s[i])) w += s[i++]; out.push(CONSTS[w] !== undefined ? { t: "num", v: CONSTS[w] } : { t: "id", v: w }); continue; }
      if ("+-*/^%()".includes(c)) { out.push({ t: c }); i++; continue; }
      throw new Error("Unexpected symbol: " + c);
    }
    return out;
  }
  function evalExpr(expr) {
    const toks = tokenize(expr);
    const out = [], ops = [], arity = [];
    const apply = () => {
      const o = ops.pop();
      if (!o) return;
      if (o.t === "(") throw new Error("Mismatched brackets — check your parentheses");
      if (o.t === "u-") { const a = out.pop(); if (typeof a !== "number") throw new Error("Unexpected sign"); out.push(-a); return; }
      if (o.t === "id") {
        const fn = FUNCS[o.v];
        if (!fn) throw new Error("Unknown function '" + o.v + "'");
        const a = out.pop();
        if (typeof a !== "number") throw new Error("Function '" + o.v + "' needs an argument");
        out.push(fn(a));
        return;
      }
      const b = out.pop(), a = out.pop();
      if (typeof a !== "number" || typeof b !== "number") throw new Error("Malformed expression near '" + o.t + "'");
      out.push(OPS[o.t].fn(a, b));
    };
    for (let i = 0; i < toks.length; i++) {
      const tk = toks[i];
      if (tk.t === "num") {
        out.push(tk.v);
        // bracketless prefix function: "√144" or "sin 30" → apply immediately.
        // Only when the function has NO open bracket (bracketed calls apply on ")").
        if (ops.length && ops[ops.length - 1].t === "id" &&
            !ops.some((o) => o.t === "(") && (!toks[i + 1] || toks[i + 1].t !== "(")) apply();
      }
      else if (tk.t === "(") { ops.push(tk); }
      else if (tk.t === ")") {
        while (ops.length && ops[ops.length - 1].t !== "(") apply();
        if (!ops.length) throw new Error("Mismatched brackets");
        ops.pop();                       // the "("
        if (ops.length && ops[ops.length - 1].t === "id") apply();  // apply function
      }
      else if (tk.t === "id") {
        if (!FUNCS[tk.v]) throw new Error("Unknown function or symbol: " + tk.v);
        ops.push({ t: "id", v: tk.v });
      }
      else {
        if (tk.t === "-" && (i === 0 || ["(", "+", "-", "*", "/", "^", "%"].includes(toks[i - 1].t))) { ops.push({ t: "u-" }); continue; }
        if (tk.t === "%") {
          // Postfix percent: the immediately preceding value ÷ 100 (e.g. 80 × 25% = 20)
          const x = out.pop();
          if (typeof x !== "number") throw new Error("'%' must follow a number (e.g. 25%)");
          out.push(x / 100);
          continue;
        }
        const o1 = tk;
        while (ops.length) {
          const top = ops[ops.length - 1];
          if (top.t === "(" || top.t === "id") break;
          if (top.t === "u-") { if (OPS[o1.t].p < 4) { apply(); } break; }
          if (OPS[top.t].p >= OPS[o1.t].p && !(o1.t === "^" && top.t === "^")) apply(); else break;
        }
        ops.push(o1);
      }
    }
    while (ops.length) apply();
    if (out.length !== 1) throw new Error("Could not evaluate expression");
    const v = out[0];
    if (typeof v !== "number" || !isFinite(v)) throw new Error("Result is not a valid number (check for division by zero / tan 90)");
    return v;
  }

  /* ---------- polynomials (single variable x) ---------- */
  // returns array of coefficients indexed by degree: [c0, c1, c2, ...]
  function parsePoly(str) {
    let s = String(str).toLowerCase().replace(/\s+/g, "").replace(/\^/g, "p");
    if (!s) throw new Error("Empty polynomial");
    const terms = s.match(/[+-]?[^+-]+/g) || [];
    const coef = {};
    let maxDeg = 0;
    for (let term of terms) {
      if (!term) continue;
      let sign = 1;
      if (term[0] === "-") { sign = -1; term = term.slice(1); }
      else if (term[0] === "+") term = term.slice(1);
      let deg = 0, c;
      const m = term.match(/^([0-9.]*)x(?:p(\d+))?$/) || term.match(/^x(?:p(\d+))?$/);
      if (term.includes("x")) {
        const mp = term.match(/^([0-9.]*)x(?:p(\d+))?$/);
        c = mp[1] === "" || mp[1] === undefined ? 1 : parseFloat(mp[1]);
        deg = mp[2] !== undefined ? parseInt(mp[2], 10) : 1;
      } else {
        c = parseFloat(term); deg = 0;
        if (isNaN(c)) throw new Error("Cannot read term: " + term);
      }
      coef[deg] = (coef[deg] || 0) + sign * c;
      maxDeg = Math.max(maxDeg, deg);
    }
    const arr = [];
    for (let i = 0; i <= maxDeg; i++) arr.push(coef[i] || 0);
    return arr;
  }
  function polyOp(a, b, op) {
    const len = Math.max(a.length, b.length); const r = [];
    for (let i = 0; i < len; i++) {
      const x = a[i] || 0, y = b[i] || 0;
      r.push(op === "add" ? x + y : op === "sub" ? x - y : 0);
    }
    if (op === "mul") {
      const res = new Array(a.length + b.length - 1).fill(0);
      a.forEach((x, i) => b.forEach((y, j) => { res[i + j] += x * y; }));
      return trimPoly(res);
    }
    return trimPoly(r);
  }
  const trimPoly = (r) => { while (r.length > 1 && Math.abs(r[r.length - 1]) < 1e-12) r.pop(); return r; };
  function polyStr(coef) {
    const parts = [];
    for (let d = coef.length - 1; d >= 0; d--) {
      let c = coef[d]; if (Math.abs(c) < 1e-12) continue;
      c = Math.round(c * 10000) / 10000;
      const sign = c < 0 ? "− " : parts.length ? "+ " : "";
      const ac = Math.abs(c);
      let term;
      if (d === 0) term = ac;
      else if (d === 1) term = (ac === 1 ? "" : ac) + "x";
      else term = (ac === 1 ? "" : ac) + "x^" + d;
      parts.push(sign + term);
    }
    return parts.join(" ") || "0";
  }
  // factorise integer quadratic a x^2 + b x + c (GCF of coefficients + bracket factorisation)
  function factorQuadratic(coef) {
    const [c0, c1, c2] = [coef[0] || 0, coef[1] || 0, coef[2] || 0];
    const g = gcd(gcd(Math.round(c0 * 1000) || 0, Math.round(c1 * 1000) || 0), Math.round(c2 * 1000) || 0) / 1000 || 1;
    const steps = [];
    if (coef.length <= 2) {
      const gcf = gcd(Math.round((coef[0] || 0) * 1000), Math.round((coef[1] || 0) * 1000)) / 1000;
      return { factors: (gcf > 1 ? gcf + " × (" + polyStr(polyOp(coef, [gcf], "div")) + ")" : polyStr(coef)), steps: ["Linear expression: common factor = " + gcf] };
    }
    const a = c2, b = c1, c = c0;
    const disc = b * b - 4 * a * c;
    if (disc < 0) return { factors: polyStr(coef), steps: ["Discriminant D = " + disc + " < 0 — no real linear factors over real numbers."] };
    const sqrtD = Math.sqrt(disc);
    const r1 = (-b + sqrtD) / (2 * a), r2 = (-b - sqrtD) / (2 * a);
    const intish = (x) => Math.abs(x - Math.round(x)) < 1e-9;
    steps.push("Quadratic: " + polyStr([c, b, a]) + " = 0");
    steps.push("Discriminant D = (" + b + ")^2 − 4(" + a + ")(" + c + ") = " + disc);
    if (!intish(r1) || !intish(r2)) {
      steps.push("Roots are x = " + (+r1.toFixed(4)) + " and x = " + (+r2.toFixed(4)) + " (not integers — no simple integer factorisation).");
      return { factors: polyStr(coef), steps };
    }
    const R1 = Math.round(r1), R2 = Math.round(r2);
    steps.push("Roots: x = " + R1 + " and x = " + R2);
    const A = Math.round(a);
    const f1 = "x " + (R1 >= 0 ? "− " + R1 : "+ " + (-R1));
    const f2 = "x " + (R2 >= 0 ? "− " + R2 : "+ " + (-R2));
    const factors = (A === 1 ? "" : A + " × ") + "(" + f1 + ")(" + f2 + ")";
    steps.push("Therefore " + polyStr([c, b, a]) + " = " + factors);
    return { factors, steps };
  }

  /* ---------- equations ---------- */
  // solve a text equation in x. Returns {kind, steps[], ...}
  function solveEquation(eq) {
    const sides = eq.split("=");
    if (sides.length !== 2) throw new Error("Enter an equation with one '=' sign, e.g. 2x + 3 = 11");
    const L = parsePoly(sides[0]), R = parsePoly(sides[1]);
    const len = Math.max(L.length, R.length);
    const d = [];
    for (let i = 0; i < len; i++) d.push((L[i] || 0) - (R[i] || 0));
    trimPoly(d);
    const steps = ["Given: " + polyStr(L) + " = " + polyStr(R),
      "Bring all terms to one side: " + polyStr(d) + " = 0"];
    const deg = d.length - 1;
    if (deg === 0 && Math.abs(d[0]) < 1e-12) return { kind: "identity", steps: steps.concat(["Both sides are identical — true for every value of x (infinitely many solutions)."]) };
    if (deg === 0) return { kind: "contradiction", steps: steps.concat([d[0] + " = 0 is false — no solution."]) };
    if (deg === 1) {
      const b = d[1], c = d[0];
      const x = F(-c, b);
      steps.push("This is linear: (" + b + ")x + (" + c + ") = 0");
      steps.push(b + "x = " + (-c));
      steps.push("x = " + (-c) + " / " + b + " = " + fstr(x) + (x.d === 1 ? "" : " ≈ " + (+fdec(x).toFixed(4))));
      steps.push("Final Answer: x = " + fstr(x));
      return { kind: "linear", x: fdec(x), xStr: fstr(x), steps };
    }
    if (deg === 2) {
      const a = d[2], b = d[1] || 0, c = d[0] || 0;
      const disc = b * b - 4 * a * c;
      steps.push("This is quadratic. a = " + a + ", b = " + b + ", c = " + c);
      steps.push("Discriminant D = b^2 − 4ac = " + disc);
      if (disc < 0) { steps.push("D < 0 — no real roots."); return { kind: "quadratic", disc, roots: [], steps }; }
      const sD = Math.sqrt(disc);
      const r1 = F(-b + sD, 2 * a), r2 = F(-b - sD, 2 * a);
      steps.push(disc === 0 ? "D = 0 — two equal real roots." : "D > 0 — two distinct real roots.");
      steps.push("Formula: x = [−b ± √D] / 2a = [" + (-b) + " ± " + (+sD.toFixed(4)) + "] / " + 2 * a);
      steps.push("Final Answer: x = " + fstr(r1) + "  and  x = " + fstr(r2));
      return { kind: "quadratic", disc, roots: [fdec(r1), fdec(r2)], rootStrs: [fstr(r1), fstr(r2)], steps };
    }
    steps.push("This toolkit solves linear and quadratic equations (degree " + deg + " given).");
    return { kind: "higher", steps };
  }

  // solve two linear equations a1 x + b1 y = c1  (coefficients arrays)
  function solveLinearPair(a1, b1, c1, a2, b2, c2) {
    const det = a1 * b2 - a2 * b1;
    const steps = [
      "Given: (" + a1 + ")x + (" + b1 + ")y = " + c1,
      "       (" + a2 + ")x + (" + b2 + ")y = " + c2,
      "Determinant Δ = a1 b2 − a2 b1 = (" + a1 + ")(" + b2 + ") − (" + a2 + ")(" + b1 + ") = " + det
    ];
    if (det === 0) {
      const r1 = a2 / a1, consistent = Math.abs(b2 - b1 * r1) < 1e-9 && Math.abs(c2 - c1 * r1) < 1e-9;
      steps.push(consistent
        ? "Δ = 0 and the equations are proportional → coincident lines → infinitely many solutions."
        : "Δ = 0 but the equations are not proportional → parallel lines → no solution.");
      return { kind: consistent ? "infinite" : "none", steps };
    }
    const dx = c1 * b2 - c2 * b1, dy = a1 * c2 - a2 * c1;
    const x = F(dx, det), y = F(dy, det);
    steps.push("Δx = c1 b2 − c2 b1 = " + dx + " ;  Δy = a1 c2 − a2 c1 = " + dy);
    steps.push("x = Δx / Δ = " + fstr(x) + " ;  y = Δy / Δ = " + fstr(y));
    steps.push("Final Answer: x = " + fstr(x) + ", y = " + fstr(y) + "  (one unique solution)");
    return { kind: "one", x: fdec(x), y: fdec(y), xStr: fstr(x), yStr: fstr(y), steps };
  }

  /* ---------- coordinate geometry ---------- */
  const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
  const midpt = (x1, y1, x2, y2) => [(x1 + x2) / 2, (y1 + y2) / 2];
  function section(x1, y1, x2, y2, m, n, external) {
    if (external) return [(m * x2 - n * x1) / (m - n), (m * y2 - n * y1) / (m - n)];
    return [(m * x2 + n * x1) / (m + n), (m * y2 + n * y1) / (m + n)];
  }
  const slope = (x1, y1, x2, y2) => (Math.abs(x2 - x1) < 1e-12 ? null : (y2 - y1) / (x2 - x1));
  function slopeKind(m) {
    if (m === null) return "undefined (vertical line)";
    if (m === 0) return "zero (horizontal line)";
    return m > 0 ? "positive (line rises left→right)" : "negative (line falls left→right)";
  }

  /* ---------- statistics ---------- */
  function statsUngrouped(nums) {
    const n = nums.length;
    const mean = nums.reduce((s, x) => s + x, 0) / n;
    const sorted = nums.slice().sort((a, b) => a - b);
    const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    const freq = {}; nums.forEach((x) => (freq[x] = (freq[x] || 0) + 1));
    let mode = sorted[0], mf = 0, tie = false;
    Object.keys(freq).forEach((k) => { if (freq[k] > mf) { mf = freq[k]; mode = +k; tie = false; } else if (freq[k] === mf) tie = true; });
    const steps = [
      "Given data: " + nums.join(", ") + "  (n = " + n + ")",
      "Mean = Σx / n = " + nums.reduce((s, x) => s + x, 0) + " / " + n + " = " + (+mean.toFixed(4)),
      "Median (middle of sorted data " + sorted.join(",") + "): " + median,
      tie || mf === 1 ? "Mode: all values appear equally (no unique mode)" : "Mode (most frequent): " + mode + " (appears " + mf + " times)",
      "Range = max − min = " + sorted[n - 1] + " − " + sorted[0] + " = " + (sorted[n - 1] - sorted[0])
    ];
    return { mean, median, mode: tie ? null : mode, range: sorted[n - 1] - sorted[0], steps };
  }
  // grouped frequency table: rows [{lo, hi, f}] (equal width classes)
  function statsGrouped(rows) {
    const n = rows.reduce((s, r) => s + r.f, 0);
    const withX = rows.map((r) => ({ ...r, x: (r.lo + r.hi) / 2, fx: r.f * (r.lo + r.hi) / 2 }));
    const sumFx = withX.reduce((s, r) => s + r.fx, 0);
    const mean = sumFx / n;
    // mode
    let mi = 0; rows.forEach((r, i) => { if (r.f > rows[mi].f) mi = i; });
    const l = rows[mi].lo, h = rows[mi].hi - rows[mi].lo, f1 = rows[mi].f;
    const f0 = mi > 0 ? rows[mi - 1].f : 0, f2 = mi < rows.length - 1 ? rows[mi + 1].f : 0;
    const mode = l + ((f1 - f0) / (2 * f1 - f0 - f2)) * h;
    // median
    let cf = 0, medIdx = 0, cumBefore = 0;
    const target = n / 2;
    for (let i = 0; i < rows.length; i++) { if (cf + rows[i].f >= target) { medIdx = i; cumBefore = cf; break; } cf += rows[i].f; }
    const lm = rows[medIdx].lo, hm = rows[medIdx].hi - rows[medIdx].lo, fm = rows[medIdx].f;
    const median = lm + ((n / 2 - cumBefore) / fm) * hm;
    const steps = [
      "n = Σf = " + n + "; class marks xᵢ = (lower+upper)/2",
      "Mean (direct) = Σfᵢxᵢ / Σfᵢ = " + Math.round(sumFx * 100) / 100 + " / " + n + " = " + (+mean.toFixed(3)),
      "Modal class = " + rows[mi].lo + "–" + rows[mi].hi + " (f₁=" + f1 + ", f₀=" + f0 + ", f₂=" + f2 + ")",
      "Mode = l + [(f₁−f₀)/(2f₁−f₀−f₂)]×h = " + (+mode.toFixed(3)),
      "Median class = " + rows[medIdx].lo + "–" + rows[medIdx].hi + " (cf before = " + cumBefore + ", f = " + fm + ")",
      "Median = l + [(n/2−cf)/f]×h = " + (+median.toFixed(3))
    ];
    return { mean, mode, median, steps };
  }

  /* ---------- trig exact table ---------- */
  const TRIG = {
    sin: { 0: "0", 30: "1/2", 45: "1/√2", 60: "√3/2", 90: "1" },
    cos: { 0: "1", 30: "√3/2", 45: "1/√2", 60: "1/2", 90: "0" },
    tan: { 0: "0", 30: "1/√3", 45: "1", 60: "√3", 90: "not defined" }
  };
  function trigVal(fn, deg) {
    const exact = (TRIG[fn] || {})[String(Math.round(deg))];
    const rad = deg * Math.PI / 180;
    let numeric;
    try { numeric = { sin: Math.sin, cos: Math.cos, tan: Math.tan }[fn](rad); if (!isFinite(numeric)) numeric = null; } catch (e) { numeric = null; }
    return { exact: exact !== undefined ? exact : (numeric !== null ? +numeric.toFixed(5) : "not defined"), numeric };
  }

  /* ---------- mensuration ---------- */
  const PI = Math.PI;
  const SOLIDS = {
    cube: { name: "Cube", inputs: [["a", "edge a"]], fns: { LSA: (a) => 4 * a * a, TSA: (a) => 6 * a * a, Volume: (a) => a ** 3 } },
    cuboid: { name: "Cuboid", inputs: [["l", "length l"], ["b", "breadth b"], ["h", "height h"]], fns: { LSA: (l, b, h) => 2 * h * (l + b), TSA: (l, b, h) => 2 * (l * b + b * h + l * h), Volume: (l, b, h) => l * b * h } },
    cylinder: { name: "Cylinder", inputs: [["r", "radius r"], ["h", "height h"]], fns: { CSA: (r, h) => 2 * PI * r * h, TSA: (r, h) => 2 * PI * r * (r + h), Volume: (r, h) => PI * r * r * h } },
    cone: { name: "Cone", inputs: [["r", "radius r"], ["h", "height h"]], fns: { "Slant l": (r, h) => Math.hypot(r, h), CSA: (r, h) => PI * r * Math.hypot(r, h), TSA: (r, h) => PI * r * (r + Math.hypot(r, h)), Volume: (r, h) => (1 / 3) * PI * r * r * h } },
    sphere: { name: "Sphere", inputs: [["r", "radius r"]], fns: { "Surface Area": (r) => 4 * PI * r * r, Volume: (r) => (4 / 3) * PI * r ** 3 } },
    hemisphere: { name: "Hemisphere", inputs: [["r", "radius r"]], fns: { CSA: (r) => 2 * PI * r * r, TSA: (r) => 3 * PI * r * r, Volume: (r) => (2 / 3) * PI * r ** 3 } }
  };

  /* ---------- unit conversion ---------- */
  const UNITS = {
    Length: { base: "m", table: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048, yard: 0.9144, mile: 1609.344 } },
    Area: { base: "m²", table: { "mm²": 1e-6, "cm²": 1e-4, "m²": 1, "km²": 1e6, hectare: 1e4, acre: 4046.86, "ft²": 0.092903, "inch²": 0.00064516 } },
    Volume: { base: "L", table: { mL: 0.001, "cm³": 0.001, L: 1, "m³": 1000, "ft³": 28.3168, gallon: 4.54609, quart: 1.13652, pint: 0.56826 } },
    Mass: { base: "g", table: { mg: 0.001, g: 1, kg: 1000, tonne: 1e6, pound: 453.592, ounce: 28.3495 } },
    Time: { base: "s", table: { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2629746, year: 31556952 } }
  };

  /* ---------- probability ---------- */
  function nCr(n, r) { if (r < 0 || r > n) return 0; let res = 1; for (let i = 1; i <= r; i++) res = res * (n - r + i) / i; return res; }
  function binom(n, k, p) { return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); }
  function frac(n, d) { return fstr(F(Math.round(n), Math.round(d))); }

  window.MMX = window.MMX || {};
  MMX.tx = {
    gcd, lcm2, lcm, hcf, F, fadd, fsub, fmul, fdiv, fstr, fdec,
    primeFactors, factorsOf, isPrime, euclidSteps, pfString, hcfLcm, decimalToFraction,
    evalExpr, tokenize,
    parsePoly, polyOp, polyStr, factorQuadratic,
    solveEquation, solveLinearPair,
    dist, midpt, section, slope, slopeKind,
    statsUngrouped, statsGrouped,
    TRIG, trigVal,
    SOLIDS, UNITS,
    nCr, binom, frac
  };
})();
