/* ==========================================================================
   Maths Master X — Maths AI tutor
   --------------------------------------------------------------------------
   SECURITY: No API keys are stored anywhere in the frontend. If you have a
   Cloudflare Worker (or any server proxy) already configured, put its URL in
   window.MMX_AI_ENDPOINT (or set it below) — requests are sent POST {message}
   and the key stays SECRET inside the Worker.
   If no endpoint responds, the app uses a fully LOCAL tutor engine that
   actually parses and SOLVES Class 10 maths (real computations, never fake).
   ========================================================================== */
(function () {
  "use strict";

  // Optional secure endpoint: a Cloudflare Worker you control (key lives there).
  const AI_ENDPOINT = (typeof window !== "undefined" && window.MMX_AI_ENDPOINT) || "";

  // ---------- numeric / parsing helpers ----------
  const frac = (n, d) => {
    if (d === undefined) return Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : String(+n.toFixed(4));
    const g = gcd2(Math.abs(Math.round(n * 10000)), Math.abs(Math.round(d * 10000))) || 1;
    const num = Math.round(n * 10000) / g, den = Math.round(d * 10000) / g;
    return den === 1 ? String(num) : `${num}/${den}`;
  };
  function gcd2(a, b) { return b ? gcd2(b, a % b) : a; }
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);
  const rootFmt = (x) => (Number.isInteger(x) ? String(x) : (+x.toFixed(4)).toString());

  // Evaluate a plain arithmetic expression safely (no eval).
  function safeArith(text) {
    const expr = text.replace(/[×x]/g, "*").replace(/÷/g, "/").replace(/\^/g, "**")
      .replace(/√\s*(\d+(\.\d+)?)/g, "Math.sqrt($1)")
      .replace(/\d+(\.\d+)?%/g, (m) => (parseFloat(m) / 100).toString())
      .replace(/pi|π/g, "Math.PI")
      .replace(/sqrt\(/g, "Math.sqrt(")
      .replace(/sin\(/g, "Math.sin(").replace(/cos\(/g, "Math.cos(").replace(/tan\(/g, "Math.tan(");
    if (!/^[0-9+\-*/().\sMathPI.sqrtincosta<>=&|!?:,]*$/.test(expr.replace(/Math\.\w+/g, ""))) return null;
    try {
      const val = Function('"use strict";return (' + expr.replace(/\*\*/g, "^POW^").replace(/\^POW\^/g, "**") + ")")();
      if (typeof val === "number" && isFinite(val)) return val;
    } catch (e) { return null; }
    return null;
  }

  // ---------- solvers ----------
  // ax^2 + bx + c = 0
  function solveQuadratic(a, b, c) {
    const D = b * b - 4 * a * c;
    const out = [`Given: a = ${a}, b = ${b}, c = ${c} (from ax² + bx + c = 0)`,
      `Required: the roots of ${fmtPoly(a, b, c)} = 0`,
      `Formula: x = [−b ± √(b² − 4ac)] / 2a`,
      `Discriminant: D = (${b})² − 4(${a})(${c}) = ${b * b} − ${4 * a * c} = ${D}`];
    if (D < 0) {
      out.push(`Since D < 0, there are NO real roots (the roots are non-real).`);
      return { text: out.join("\n") };
    }
    const s = Math.sqrt(D);
    const x1 = (-b + s) / (2 * a), x2 = (-b - s) / (2 * a);
    const nature = D === 0 ? "two equal real roots" : "two distinct real roots";
    out.push(`Substitution: x = [${-b} ± ${rootFmt(s)}] / ${2 * a}`);
    out.push(`Calculation: x₁ = ${rootFmt(x1)},  x₂ = ${rootFmt(x2)}`);
    out.push(`Final Answer: x = ${rootFmt(x1)} and x = ${rootFmt(x2)} (${nature}).`);
    return { text: out.join("\n") };
  }
  function fmtPoly(a, b, c) {
    const t = (v, s) => (v === 0 ? "" : `${v < 0 ? " − " : " + "}${Math.abs(v)}${s || ""}`);
    return `${a}x²${t(b, "x")}${t(c, "")}`.replace("+ ", "").trim();
  }

  // system of two linear equations
  function solveLinear2(a1, b1, c1, a2, b2, c2) {
    // a1 x + b1 y = c1 ; a2 x + b2 y = c2
    const det = a1 * b2 - a2 * b1;
    const out = [`Given: (1) ${a1}x + ${b1}y = ${c1}`, `       (2) ${a2}x + ${b2}y = ${c2}`,
      `Formula: determinant Δ = a₁b₂ − a₂b₁ = ${a1}×${b2} − ${a2}×${b1} = ${det}`];
    if (det === 0) {
      const ratio = a2 / a1;
      if (Math.abs(b2 - b1 * ratio) < 1e-9 && Math.abs(c2 - c1 * ratio) < 1e-9)
        out.push("The lines are coincident → infinitely many solutions.");
      else out.push("The lines are parallel (a₁/a₂ = b₁/b₂ ≠ c₁/c₂) → no solution.");
      return { text: out.join("\n") };
    }
    const dx = c1 * b2 - c2 * b1, dy = a1 * c2 - a2 * c1;
    const x = dx / det, y = dy / det;
    out.push(`Substitution (Cramer's rule): Δx = c₁b₂ − c₂b₁ = ${dx}; Δy = a₁c₂ − a₂c₁ = ${dy}`);
    out.push(`Calculation: x = Δx/Δ = ${frac(dx, det)}, y = Δy/Δ = ${frac(dy, det)}`);
    out.push(`Final Answer: x = ${rootFmt(x)}, y = ${rootFmt(y)}.`);
    return { text: out.join("\n") };
  }

  // single linear: ax + b = c
  function solveLinear1(a, b, c) {
    const out = [`Given: ${a}x ${b >= 0 ? "+" : "−"} ${Math.abs(b)} = ${c}`,
      `Required: x`,
      `Formula: ax = c − b`,
      `Substitution: ${a}x = ${c} − ${b} = ${c - b}`,
      `Calculation: x = ${c - b} ÷ ${a} = ${frac(c - b, a)}`,
      `Final Answer: x = ${rootFmt((c - b) / a)}.`];
    return { text: out.join("\n") };
  }

  // AP tools
  function apTerm(a, d, n) {
    const v = a + (n - 1) * d;
    return { text: [`Given: first term a = ${a}, common difference d = ${d}, n = ${n}`,
      `Formula: aₙ = a + (n − 1)d`,
      `Substitution: aₙ = ${a} + (${n} − 1)×${d} = ${a} + ${(n - 1) * d}`,
      `Final Answer: the ${n}th term = ${v}.`].join("\n") };
  }
  function apSum(a, d, n) {
    const S = (n / 2) * (2 * a + (n - 1) * d);
    const l = a + (n - 1) * d;
    return { text: [`Given: a = ${a}, d = ${d}, n = ${n}`,
      `Formula: Sₙ = n/2[2a + (n−1)d] = n/2(a + l)`,
      `Substitution: S = ${n}/2 [2×${a} + (${n}−1)×${d}] = ${n}/2 [${2 * a} + ${(n - 1) * d}] = ${n}/2 × ${2 * a + (n - 1) * d}`,
      `(Last term l = ${l}.)`,
      `Final Answer: S${n} = ${S}.`].join("\n") };
  }

  // stats
  function stats(numbers) {
    const n = numbers.length;
    const mean = numbers.reduce((s, x) => s + x, 0) / n;
    const sorted = numbers.slice().sort((p, q) => p - q);
    const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    const freq = {};
    numbers.forEach((x) => (freq[x] = (freq[x] || 0) + 1));
    let mode = numbers[0], mf = 0;
    for (const k in freq) if (freq[k] > mf) { mf = freq[k]; mode = +k; }
    const range = sorted[n - 1] - sorted[0];
    const variance = numbers.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
    return {
      text: [`Given data: ${numbers.join(", ")} (n = ${n})`,
        `Mean = (${numbers.join(" + ")})/${n} = ${+mean.toFixed(4)}`,
        `Median (middle of sorted list ${sorted.join(",")}): ${median}`,
        `Mode (most frequent value): ${mode} (occurs ${mf} times)`,
        `Range = max − min = ${sorted[n - 1]} − ${sorted[0]} = ${range}`,
        `Final Answer: Mean ≈ ${+mean.toFixed(3)}, Median = ${median}, Mode = ${mode}, Range = ${range}.`].join("\n")
    };
  }

  // coordinate distance
  function distance(x1, y1, x2, y2) {
    const d2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    const d = Math.sqrt(d2);
    return { text: [`Given: A(${x1}, ${y1}) and B(${x2}, ${y2})`,
      `Formula: AB = √[(x₂−x₁)² + (y₂−y₁)²]`,
      `Substitution: AB = √[(${x2}−${x1})² + (${y2}−${y1})²] = √[${(x2 - x1) ** 2} + ${(y2 - y1) ** 2}] = √${d2}`,
      `Final Answer: AB = ${Number.isInteger(d) ? d : "√" + d2 + " ≈ " + d.toFixed(3)} units.`].join("\n") };
  }
  function midpoint(x1, y1, x2, y2) {
    return { text: [`Given: A(${x1}, ${y1}), B(${x2}, ${y2})`,
      `Formula: midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2)`,
      `Substitution: M = ((${x1}+${x2})/2, (${y1}+${y2})/2)`,
      `Final Answer: M = (${(x1 + x2) / 2}, ${(y1 + y2) / 2}).`].join("\n") };
  }

  // trig eval
  const TRIG = {
    sin: { "0": "0", "30": "1/2", "45": "1/√2", "60": "√3/2", "90": "1" },
    cos: { "0": "1", "30": "√3/2", "45": "1/√2", "60": "1/2", "90": "0" },
    tan: { "0": "0", "30": "1/√3", "45": "1", "60": "√3", "90": "not defined" }
  };
  function trigVal(fn, deg) {
    const table = TRIG[fn];
    if (table && table[String(deg)] !== undefined) {
      const numeric = safeArith(`${fn}(${deg} deg)`);
    const exact = table[deg];
    return { text: [`Given: ${fn} ${deg}°`,
      `Concept: standard-angle trigonometric value (Class 10 table).`,
      `Final Answer: ${fn} ${deg}° = ${exact}${numeric !== null && isFinite(numeric) && Number.isInteger(numeric) === false ? "  (= " + (+numeric.toFixed(4)) + ")" : ""}.`].join("\n") };
    }
    const rad = (deg * Math.PI) / 180;
    const v = Math[fn](rad);
    return { text: [`Given: ${fn} ${deg}°`,
      `Formula: ${fn} ${deg}° (convert: ${deg}° = ${rad.toFixed(4)} radians)`,
      `Calculation: ${fn} ${deg}° ≈ ${v.toFixed(5)}`,
      `Final Answer: ${fn} ${deg}° ≈ ${v.toFixed(4)}.\n(For Class 10, standard angles 0,30,45,60,90 give exact fractions.)`].join("\n") };
  }

  // ---------- input parsing ----------
  function nums(s) { const m = s.match(/-?\d+(\.\d+)?/g); return m ? m.map(Number) : []; }

  // parse a quadratic LHS into [a, b, c] or null
  function parseQuadratic(eq) {
    const side = eq.split("=")[0].replace(/\^2|²/g, "@@@").replace(/\*\*/g, "@@@");
    if (!/x@@@/.test(side)) return null;
    let a = null, b = null, c = null;
    // ax^2 term: coefficient immediately before x^2
    const ma = side.match(/([+-]?\s*\d+(?:\.\d+)?)\s*x@@@/);
    if (ma) a = parseFloat(ma[1].replace(/\s/g, ""));
    else if (/(?<![\w.])x@@@/.test(side)) a = 1;
    else if (/-\s*x@@@/.test(side)) a = -1;
    if (a === null) return null;
    // bx term: x NOT followed by @@@, with optional signed coefficient
    const mb = side.match(/([+-]?\s*\d+(?:\.\d+)?)\s*x(?!@@@)(?![\w.])/);
    if (mb) b = parseFloat(mb[1].replace(/\s/g, ""));
    else {
      const mb2 = side.match(/([+-])\s*x(?!@@@)(?![\w.])/);
      if (mb2) b = mb2[1] === "-" ? -1 : 1;
      else b = 0;
    }
    // constant: signed number not adjacent to x
    const rest = side.replace(/[+-]?\s*\d+(?:\.\d+)?\s*x@@@/g, " ").replace(/[+-]?\s*\d+(?:\.\d+)?\s*x(?!@@@)(?![\w.])/g, " ").replace(/[+-]\s*x(?!@@@)(?![\w.])/g, " ");
    const mc = rest.match(/[+-]?\s*\d+(?:\.\d+)?/);
    c = mc ? parseFloat(mc[0].replace(/\s/g, "")) : 0;
    return [a, b, c];
  }

  // coefficient of variable v in an LHS expression (handles bare "-y", "+x", "2x", "-3y")
  function coeff(lhs, v) {
    const re = new RegExp("(?<![\\w.0-9])([+-]?)(\\d+(?:\\.\\d+)?)?\\s*" + v + "(?![\\w.])");
    const m = lhs.match(re);
    if (!m) return null;
    const sign = m[1] === "-" ? -1 : 1;
    return sign * (m[2] !== undefined ? parseFloat(m[2]) : 1);
  }

  function localSolve(message) {
    const m = message.toLowerCase();

    // quadratic (detected by x^2 / x²)
    if (/x\s*(?:\^|\*\*)?\s*2|x²/.test(message) && /=\s*0/.test(message)) {
      const q = parseQuadratic(message);
      if (q && q[0] !== 0) return solveQuadratic(q[0], q[1], q[2]);
    }

    // linear pair: equations containing both x and y, split on "and", comma, semicolon, newline
    const eqParts = message.split(/\band\b|,|;|\n/).map((s) => s.trim()).filter((s) => /x/.test(s) && /y/.test(s) && /=/.test(s));
    if (eqParts.length >= 2) {
      const parsed = eqParts.slice(0, 2).map((eq) => {
        const lhs = eq.split("=")[0];
        const rhs = parseFloat((eq.split("=")[1].match(/-?\d+(\.\d+)?/) || [])[0]) || 0;
        const a = coeff(lhs, "x") || 0;
        const b = coeff(lhs, "y") || 0;
        return [a, b, rhs];
      });
      if (parsed[0][0] && parsed[1][0]) {
        return solveLinear2(parsed[0][0], parsed[0][1], parsed[0][2], parsed[1][0], parsed[1][1], parsed[1][2]);
      }
    }

    // single linear: 3x + 5 = 20
    let lm = message.match(/(-?\d+(?:\.\d+)?)\s*x\s*([+-]\s*\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)/);
    if (lm) return solveLinear1(parseFloat(lm[1]), parseFloat(lm[2].replace(/\s/g, "")), parseFloat(lm[3]));
    lm = message.match(/(-?\d+(?:\.\d+)?)\s*x\s*=\s*(-?\d+(?:\.\d+)?)/);
    if (lm && !/y/.test(m)) return solveLinear1(parseFloat(lm[1]), 0, parseFloat(lm[2]));

    // AP nth term / sum
    const mmAp = m.match(/(?:ap|arithmetic|a\.p\.)/);
    if (mmAp) {
      const n = nums(message);
      if (/sum|s[ₙn]|total/.test(m)) return apSum(n[0] || 1, n[1] || 0, n[2] || 10);
      if (n.length >= 3) return apTerm(n[0], n[1], n[2]);
    }

    // distance / midpoint: (x1,y1) (x2,y2)
    const pts = [...message.matchAll(/\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g)];
    if (pts.length >= 2) {
      const p = pts.map((mt) => [parseFloat(mt[1]), parseFloat(mt[2])]);
      if (/mid\s?point|midpoint/.test(m)) return midpoint(p[0][0], p[0][1], p[1][0], p[1][1]);
      if (/distance|how far/.test(m)) return distance(p[0][0], p[0][1], p[1][0], p[1][1]);
    }

    // trig
    const mmTrig = message.match(/\b(sin|cos|tan)\b[\s(]*(\d+(?:\.\d+)?)/);
    if (mmTrig) return trigVal(mmTrig[1], parseFloat(mmTrig[2]));

    // statistics: mean of list
    if (/\b(mean|median|mode|average)\b/.test(m) && /\d/.test(message)) {
      const list = nums(message);
      if (list.length >= 3) return stats(list);
    }

    // gcd / lcm / hcf
    if (/\b(hcf|gcd)\b/.test(m) || /\b(lcm)\b/.test(m)) {
      const list = nums(message);
      if (list.length >= 2) {
        let g = list[0], L = list[0];
        for (let i = 1; i < list.length; i++) { g = gcd(g, list[i]); L = lcm(L, list[i]); }
        return { text: [`Given numbers: ${list.join(", ")}`,
          `Method: prime factorisation (or Euclid's algorithm for HCF).`,
          `Final Answer: HCF (GCD) = ${g}; LCM = ${L}.`,
          `Check: HCF × LCM of first two = ${gcd(list[0], list[1])} × ${lcm(list[0], list[1])} = ${list[0] * list[1]} = product ✓.`].join("\n") };
      }
    }

    // pure arithmetic expression
    const arith = message.replace(/calculate|evaluate|solve|what is|=|please/gi, "").trim();
    if (/^[0-9+\-*/().\s×÷√^%πpi]+$/.test(arith) && /\d/.test(arith)) {
      const v = safeArith(arith);
      if (v !== null) {
        return { text: [`Given: ${arith}`,
          `Calculation (following BODMAS): brackets/roots first, then × ÷, then + −.`,
          `Final Answer: = ${v}.`].join("\n") };
      }
    }

    // chapter / concept help
    const conceptHelp = [
      { keys: ["real number", "hcf", "lcm", "euclid", "irrational", "prime"], t:
`**Real Numbers — quick recap:**
• Euclid's division lemma: a = bq + r (0 ≤ r < b); repeating it gives HCF.
• HCF = lowest powers of common primes; LCM = highest powers of all primes.
• HCF × LCM = a × b (for two numbers).
• √p is irrational for every prime p.
Tip: "maximum stacks/columns" → HCF; "minimum common distance/time" → LCM.
Ask me: "find HCF and LCM of 12 15 21" or "is √2 irrational?"` },
      { keys: ["polynomial", "zero", "quadratic polynomial", "cubic"], t:
`**Polynomials — key relations:**
For ax² + bx + c with zeros α, β: sum α+β = −b/a, product αβ = c/a.
For cubic ax³+bx²+cx+d: α+β+γ = −b/a, αβ+βγ+γα = c/a, αβγ = −d/a.
Polynomial from zeros: x² − (sum)x + product.
Zeros = x-axis intercepts of the graph.
Ask me: "solve 2x^2−5x+3=0" for a step-by-step.` },
      { keys: ["linear equation", "pair of", "two variables", "elimination", "substitution"], t:
`**Pair of Linear Equations:**
a₁x+b₁y+c₁=0, a₂x+b₂y+c₂=0.
• Unique solution if a₁/a₂ ≠ b₁/b₂ (intersecting lines).
• Infinitely many if a₁/a₂ = b₁/b₂ = c₁/c₂ (coincident).
• No solution if a₁/a₂ = b₁/b₂ ≠ c₁/c₂ (parallel).
Easiest Class 10 method: elimination. Try asking: "x + y = 5 and 2x − 3y = 4".` },
      { keys: ["quadratic", "root", "discriminant", "factoris"], t:
`**Quadratic Equations:**
Standard form ax² + bx + c = 0.
Quadratic formula: x = [−b ± √(b²−4ac)] / 2a.
Discriminant D = b²−4ac: D>0 distinct real roots, D=0 equal roots, D<0 no real roots.
Try: "solve x^2 − 5x + 6 = 0" and I'll work Given → Formula → Answer.` },
      { keys: ["arithmetic progression", " ap ", " a.p", "common difference", "nth term", "arithmetic"], t:
`**Arithmetic Progression (AP):**
nth term: aₙ = a + (n−1)d.
Sum: Sₙ = n/2[2a + (n−1)d] = n/2(a + l).
Try: "ap first term 2 difference 3 find 10th term" or "sum of ap a=1 d=2 n=20".` },
      { keys: ["triangle", "similar", "pythagor", "thales", "bpt"], t:
`**Triangles:**
• Similar triangles: sides proportional, angles equal; area ratio = (side ratio)².
• Thales (BPT): DE ∥ BC ⇒ AD/DB = AE/EC.
• Pythagoras: h² = p² + b² in a right triangle.
• Criteria: AA, SSS, SAS similarity.
Ask me for a proof or an example — e.g. "hypotenuse of 6 and 8".` },
      { keys: ["coordinate", "distance formula", "section formula", "midpoint"], t:
`**Coordinate Geometry:**
Distance: √[(x₂−x₁)² + (y₂−y₁)²]; from origin: √(x²+y²).
Section (ratio m:n): ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)).
Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2).
Area of triangle: ½|x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)|; 0 ⇒ collinear.
Try: "distance between (2,3) and (5,7)" or "midpoint of (-4,6) and (4,-6)".` },
      { keys: ["trigonometr", "sin", "cos", "tan", "identity", "identities", "angle of elevation"], t:
`**Trigonometry:**
Ratios: sin=opp/hyp, cos=adj/hyp, tan=opp/adj = sin/cos.
Values: sin30=1/2, sin45=1/√2, sin60=√3/2 (cos is the reverse); tan45=1.
Identities: sin²+cos²=1; 1+tan²=sec²; 1+cot²=cosec².
Complementary: sin(90−θ)=cos θ, tan(90−θ)=cot θ.
Heights: h = d tan θ (elevation). Try "tan 60" or "sin 45".` },
      { keys: ["circle", "tangent", "secant"], t:
`**Circles:**
• Tangent ⟂ radius at the point of contact.
• Tangents from an external point are equal; tangent length = √(OP² − r²).
• Circumscribed quadrilateral: AB + CD = AD + BC.
Most problems become a right triangle → Pythagoras.` },
      { keys: ["area", "sector", "segment", "arc", "mensuration", "surface", "volume", "frustum", "cylinder", "cone", "sphere", "hemisphere"], t:
`**Mensuration quick formulas:**
Circle: C = 2πr, area = πr²; sector area = θ/360·πr²; arc = θ/360·2πr.
Cylinder: V = πr²h, CSA = 2πrh.
Cone: V = ⅓πr²h, l = √(r²+h²), CSA = πrl.
Sphere: V = 4/3πr³, SA = 4πr²; hemisphere TSA = 3πr².
Frustum: V = ⅓πh(R²+Rr+r²), CSA = π(R+r)l, l = √(h²+(R−r)²).
Melting problems: volume stays the same.` },
      { keys: ["statistic", "mean", "median", "mode", "ogive", "frequency"], t:
`**Statistics (grouped data):**
Mean: x̄ = Σfx/Σf (direct) or step-deviation a + h·Σfu/Σf.
Mode: l + [(f₁−f₀)/(2f₁−f₀−f₂)]h.
Median: l + [(n/2 − cf)/f]h.
Empirical: 3 Median = Mode + 2 Mean.
Ogive intersection x-coordinate = median.
Try: "mean of 10 20 30 40 50".` },
      { keys: ["probabilit", "dice", "coin", "card", "ball"], t:
`**Probability:**
P(E) = favourable outcomes / total outcomes; 0 ≤ P(E) ≤ 1.
P(not E) = 1 − P(E).
Two dice → 36 outcomes; two coins → 4; cards → 52 (26 red, 4 aces, 12 face cards).
Try: "probability sum of two dice is 7" or "probability of ace".` },
      { keys: ["revision", "exam", "tomorrow", "important"], t:
`**Exam strategy for Class 10 Maths:**
1. Revise formulas first → open 📐 Formula Master.
2. Do a ⚡ Quick Practice (10 questions) timed.
3. Check your 📕 Mistake Book and retry every wrong question.
4. Use 🧠 Quick Revision → "Exam Tomorrow" mode.
Highest weightage: Algebra (20), Geometry (15), Trigonometry (12).
Want me to explain a specific chapter? Just type its name!` },
      { keys: ["probability", "two dice", "dice"], t: "Two dice: 36 equally likely outcomes." }
    ];
    for (const c of conceptHelp) {
      if (c.keys.some((k) => m.includes(k))) return { text: c.t };
    }

    // fallthrough
    return {
      text: `I can solve Class 10 maths step by step. Try these:\n\n• Solve an equation: "solve 2x^2 − 5x + 3 = 0" or "x + y = 10 and x − y = 2"\n• Trigonometry: "sin 60", "tan 45", "cos 30"\n• Coordinate geometry: "distance between (2,3) and (-6,9)" or "midpoint of (1,2) and (5,6)"\n• Arithmetic progression: "ap a=3 d=4 n=10" or "sum ap a=1 d=2 n=20"\n• Statistics: "mean of 12 15 18 20 25"\n• Number systems: "HCF and LCM of 96 404"\n• Calculator: "evaluate (25 + 15) × 3 / 8"\n• Or type a chapter name: trigonometry, triangles, probability, circles… for a concept recap.\n\nI show Given → Formula → Substitution → Calculation → Final Answer so you can see every step.`
    };
  }

  // ---------- public API ----------
  async function ask(message) {
    if (AI_ENDPOINT) {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 9000);
        const res = await fetch(AI_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, history: (MMX.store.state.chatHistory || []).slice(-6) }),
          signal: ctrl.signal
        });
        clearTimeout(t);
        if (res.ok) {
          const data = await res.json();
          if (data && (data.reply || data.text || data.message)) return { text: data.reply || data.text || data.message, remote: true };
        }
      } catch (e) { /* fall through to local engine */ }
    }
    // small delay to feel like thinking
    await new Promise((r) => setTimeout(r, 350 + Math.random() * 450));
    return localSolve(message);
  }

  MMX.ai = { ask, hasEndpoint: () => !!AI_ENDPOINT };
})();
