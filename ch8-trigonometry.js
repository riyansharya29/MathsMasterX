/* Chapter 8 — Introduction to Trigonometry (CBSE Class 10) */
MMX.registerChapter({
  id: "trigonometry",
  name: "Introduction to Trigonometry",
  icon: "📏",
  concepts: [
    { h: "Trigonometric ratios", p: "In a right triangle, for angle θ:\n**sin θ = opposite/hypotenuse**\n**cos θ = adjacent/hypotenuse**\n**tan θ = opposite/adjacent = sin θ / cos θ**\n**cosec θ = 1/sin θ,  sec θ = 1/cos θ,  cot θ = 1/tan θ**\nThe side names are relative to the angle being considered." },
    { h: "Ratios of standard angles", p: "Learn the table (0°, 30°, 45°, 60°, 90°):\n• sin: 0, 1/2, 1/√2, √3/2, 1\n• cos: 1, √3/2, 1/√2, 1/2, 0\n• tan: 0, 1/√3, 1, √3, ∞ (not defined at 90°)\nMemory trick: sin values run √0/2, √1/2, √2/2, √3/2, √4/2; cos is the reverse." },
    { h: "Complementary angle identities", p: "Since acute angles of a right triangle add to 90°:\n**sin(90° − θ) = cos θ**\n**cos(90° − θ) = sin θ**\n**tan(90° − θ) = cot θ**\n**cot(90° − θ) = tan θ**\n**sec(90° − θ) = cosec θ**\n**cosec(90° − θ) = sec θ**" },
    { h: "Trigonometric identities", p: "For all angles where the ratios are defined:\n**sin²θ + cos²θ = 1**\n**1 + tan²θ = sec²θ**\n**1 + cot²θ = cosec²θ**\nThese are obtained from Pythagoras' theorem and are used to simplify and prove expressions." },
    { h: "Using trigonometry", p: "• Evaluate expressions by substituting standard values.\n• Prove identities: convert everything to sin and cos, simplify, use the three identities.\n• Find missing sides of a right triangle once an acute angle and a side are known." }
  ],
  formulas: [
    { id: "ch8-f1", name: "Three basic ratios", cat: "Trigonometry", expr: "sin = opp/hyp,  cos = adj/hyp,  tan = opp/adj", vars: "opp = side opposite θ, adj = side next to θ, hyp = hypotenuse", explain: "SOH–CAH–TOA rule; the hypotenuse is always the side opposite the right angle.", example: "In a 3-4-5 triangle, for the angle opposite side 3: sin θ = 3/5, cos θ = 4/5, tan θ = 3/4." },
    { id: "ch8-f2", name: "Reciprocal relations", cat: "Trigonometry", expr: "cosec = 1/sin, sec = 1/cos, cot = 1/tan", vars: "Also tan θ = sin θ/cos θ", explain: "cosecant goes with sine, secant with cosine — note the pairing.", example: "If sin θ = 5/13 then cosec θ = 13/5." },
    { id: "ch8-f3", name: "Identity 1", cat: "Trigonometry", expr: "sin²θ + cos²θ = 1", vars: "Derived from (opp² + adj² = hyp²)", explain: "Divide Pythagoras by hyp².", example: "If cos θ = 3/5, sin θ = √(1 − 9/25) = 4/5 (acute θ)." },
    { id: "ch8-f4", name: "Identities 2 and 3", cat: "Trigonometry", expr: "1 + tan²θ = sec²θ ;  1 + cot²θ = cosec²θ", vars: "Divide Pythagoras by adj² and by opp²", explain: "Useful when an expression contains tan/sec or cot/cosec.", example: "sec²30° = 1 + tan²30° = 1 + 1/3 = 4/3 → sec 30° = 2/√3." },
    { id: "ch8-f5", name: "Complementary angles", cat: "Trigonometry", expr: "sin(90°−θ) = cos θ,  tan(90°−θ) = cot θ,  sec(90°−θ) = cosec θ", vars: "Valid for acute θ", explain: "Pairs: sin↔cos, tan↔cot, sec↔cosec under 90°−θ.", example: "sin 60° = cos 30° = √3/2; tan 45° = cot 45° = 1." }
  ],
  examples: [
    {
      id: "ch8-e1", title: "Evaluate a standard-angle expression",
      given: "Evaluate 2 sin 30° + 3 cos 60° − 3 tan 45°.",
      concept: "Substitute standard values.",
      steps: [
        { t: "Step 1", x: "sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1." },
        { t: "Step 2", x: "2(1/2) + 3(1/2) − 3(1) = 1 + 3/2 − 3." },
        { t: "Final Answer", x: "= 5/2 − 3 = −1/2.", ans: true }
      ]
    },
    {
      id: "ch8-e2", title: "Find a ratio from another ratio",
      given: "In a right triangle, acute angle A has tan A = 3/4. Find sin A and cos A.",
      concept: "Build the triangle from the ratio and use Pythagoras.",
      steps: [
        { t: "Step 1", x: "tan A = opp/adj = 3/4 → take opposite side 3k, adjacent side 4k." },
        { t: "Step 2", x: "Hypotenuse = √((3k)² + (4k)²) = 5k." },
        { t: "Step 3", x: "sin A = 3k/5k = 3/5; cos A = 4k/5k = 4/5." },
        { t: "Final Answer", x: "sin A = 3/5, cos A = 4/5.", ans: true }
      ]
    },
    {
      id: "ch8-e3", title: "Prove an identity",
      given: "Prove: (1 − cos θ)(1 + cos θ) = sin²θ... prove (sin θ − cosec θ)(tan θ + cot θ)... Simplify: (1 + tan²θ)(1 − sin θ)(1 + sin θ).",
      concept: "Use 1 + tan²θ = sec²θ and sin² + cos² = 1.",
      steps: [
        { t: "Step 1", x: "(1 − sin θ)(1 + sin θ) = 1 − sin²θ = cos²θ." },
        { t: "Step 2", x: "(1 + tan²θ) = sec²θ = 1/cos²θ." },
        { t: "Step 3", x: "Product = sec²θ × cos²θ = (1/cos²θ)·cos²θ = 1." },
        { t: "Final Answer", x: "The expression equals 1.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch8-q1", type: "mcq", topic: "Standard values", diff: "easy", marks: 1, q: "The value of sin 60° cos 30° + sin 30° cos 60° is:", options: ["1", "0", "2", "1/2"], answer: 0, explain: "(√3/2)(√3/2) + (1/2)(1/2) = 3/4 + 1/4 = 1. (This is also sin(60+30) = sin 90° = 1.)" },
    { id: "ch8-q2", type: "mcq", topic: "Standard values", diff: "easy", marks: 1, q: "If tan A = 1, then the value of 2 sin A cos A is:", options: ["1", "2", "1/2", "0"], answer: 0, explain: "tan A = 1 ⇒ A = 45°. 2 sin45 cos45 = 2 × (1/√2)(1/√2) = 2 × 1/2 = 1. (Also 2 sin A cos A = sin 2A = sin 90° = 1.)" },
    { id: "ch8-q3", type: "mcq", topic: "Ratios", diff: "easy", marks: 1, q: "In right ΔABC, right angled at B, if AB = 5, BC = 12, AC = 13, then sin C is:", options: ["5/13", "12/13", "5/12", "12/5"], answer: 0, explain: "For angle C, opposite side = AB = 5, hypotenuse = AC = 13. sin C = 5/13." },
    { id: "ch8-q4", type: "mcq", topic: "Complementary angles", diff: "medium", marks: 1, q: "The value of tan 5° · tan 25° · tan 45° · tan 65° · tan 85° is:", options: ["1", "0", "√3", "1/√3"], answer: 0, explain: "tan 85° = cot 5° and tan 65° = cot 25°. So tan5·cot5 × tan25·cot25 × tan45 = 1 × 1 × 1 = 1." },
    { id: "ch8-q5", type: "mcq", topic: "Identities", diff: "medium", marks: 1, q: "If cos A = 4/5 (A acute), then sin A is:", options: ["3/5", "5/3", "2/5", "1/5"], answer: 0, explain: "sin A = √(1 − 16/25) = √(9/25) = 3/5 (positive as A is acute)." },
    { id: "ch8-q6", type: "mcq", topic: "Ratios", diff: "medium", marks: 1, q: "If sin θ = a/b, then cos θ equals:", options: ["√(b² − a²)/b", "a/√(b² − a²)", "b/a", "(b² − a²)/b"], answer: 0, explain: "cos θ = √(1 − a²/b²) = √((b² − a²)/b²) = √(b²−a²)/b." },
    { id: "ch8-q7", type: "mcq", topic: "Standard values", diff: "easy", marks: 1, q: "The value of (1 − tan²45°)/(1 + tan²45°) is:", options: ["0", "1", "2", "1/2"], answer: 0, explain: "tan 45° = 1 ⇒ (1 − 1)/(1 + 1) = 0/2 = 0." },
    { id: "ch8-q8", type: "mcq", topic: "Identities", diff: "hard", marks: 1, q: "If 4 tan θ = 3, then (4 sin θ − cos θ)/(4 sin θ + cos θ) equals:", options: ["1/2", "2/3", "1/3", "3/4"], answer: 0, explain: "tan θ = 3/4 ⇒ divide numerator and denominator by cos θ: (4 tan θ − 1)/(4 tan θ + 1) = (3 − 1)/(3 + 1) = 2/4 = 1/2." },
    { id: "ch8-q9", type: "ar", topic: "Identities", diff: "medium", marks: 1, q: "**Assertion (A):** The value of sin θ + cos θ is always greater than 1 for acute θ.\n**Reason (R):** sin²θ + cos²θ = 1, so (sin θ + cos θ)² = 1 + 2 sin θ cos θ > 1 for acute θ.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "For 0 < θ < 90°, sin θ cos θ > 0, so (sin+cos)² = 1 + positive > 1, hence sin+cos > 1. R proves A." },
    { id: "ch8-q10", type: "vsa", topic: "Standard values", diff: "easy", marks: 1, q: "Evaluate: sin 25°/cos 65°.", answer: "1", explain: "cos 65° = cos(90° − 25°) = sin 25°. So sin 25°/sin 25° = 1." },
    { id: "ch8-q11", type: "vsa", topic: "Ratios", diff: "medium", marks: 1, q: "In ΔPQR, right angled at Q, PR + QR = 25 cm and PQ = 5 cm. Find sin P.", answer: "sin P = 12/13", explain: "Let QR = x, PR = 25 − x. By Pythagoras: x² + 5² = (25 − x)² ⇒ x² + 25 = 625 − 50x + x² ⇒ 50x = 600 ⇒ x = 12. So QR = 12, PR = 13. For angle P, opposite = QR = 12 → sin P = 12/13." },
    { id: "ch8-q12", type: "sa", topic: "Standard values", diff: "medium", marks: 2, q: "If tan(A + B) = √3 and tan(A − B) = 1/√3, 0° < A + B ≤ 90°, A > B, find A and B.", answer: "A = 45°, B = 15°", explain: "tan 60° = √3 ⇒ A + B = 60°. tan 30° = 1/√3 ⇒ A − B = 30°. Adding: 2A = 90° ⇒ A = 45°; then B = 15°." },
    { id: "ch8-q13", type: "sa", topic: "Identities", diff: "medium", marks: 2, q: "Prove: (cosec θ − cot θ)² = (1 − cos θ)/(1 + cos θ).", answer: "Identity proved", explain: "LHS = (1/sin θ − cos θ/sin θ)² = (1 − cos θ)²/sin²θ\nsin²θ = 1 − cos²θ = (1 − cos θ)(1 + cos θ).\nSo LHS = (1 − cos θ)² / [(1 − cos θ)(1 + cos θ)] = (1 − cos θ)/(1 + cos θ) = RHS ✓." },
    { id: "ch8-q14", type: "la", topic: "Identities", diff: "hard", marks: 3, q: "Prove that (sec⁴θ − sec²θ) = tan²θ + tan⁴θ.", answer: "Identity proved", explain: "LHS = sec²θ(sec²θ − 1) = sec²θ·tan²θ (using sec²θ − 1 = tan²θ).\n= (1 + tan²θ)·tan²θ = tan²θ + tan⁴θ = RHS ✓." },
    { id: "ch8-q15", type: "la", topic: "Standard values", diff: "medium", marks: 3, q: "Evaluate: (5 cos²60° + 4 sec²30° − tan²45°)/(sin²30° + cos²30°).", answer: "67/12", explain: "Numerator: 5(1/2)² + 4(2/√3)² − 1² = 5/4 + 4×4/3 − 1 = 5/4 + 16/3 − 1 = (15 + 64 − 12)/12 = 67/12.\nDenominator: sin²30 + cos²30 = 1 (identity).\nResult = 67/12." },
    { id: "ch8-q16", type: "competency", topic: "Ratios", diff: "hard", marks: 2, q: "If sin θ + cos θ = √2 cos θ (θ ≠ 90°), find the value of tan θ.", answer: "tan θ = √2 − 1", explain: "sin θ = (√2 − 1) cos θ ⇒ tan θ = √2 − 1." }
  ],
  revision: {
    points: [
      "sin = opp/hyp, cos = adj/hyp, tan = opp/adj; cosec = 1/sin, sec = 1/cos, cot = 1/tan.",
      "tan θ = sin θ/cos θ; hypotenuse is fixed — 'opposite' and 'adjacent' swap with the angle.",
      "Standard values: sin row 0, 1/2, 1/√2, √3/2, 1; cos row is its reverse; tan 30=1/√3, 45=1, 60=√3.",
      "Identities: sin² + cos² = 1; 1 + tan² = sec²; 1 + cot² = cosec².",
      "Complementary pairs: sin↔cos, tan↔cot, sec↔cosec at (90° − θ).",
      "To prove identities: express everything in sin and cos, then use the identities."
    ],
    mistakes: [
      "Mixing sec with sin: sec ↔ cos and cosec ↔ sin.",
      "Using sin² + cos² = 1 on angles in degrees without checking the identity applies to any angle — it does, but ratios at 90° for tan/sec are NOT defined.",
      "Wrong standard values: tan 30° = 1/√3 and tan 60° = √3 (don't swap).",
      "Forgetting that lengths give positive ratios for acute angles (take positive square roots)."
    ],
    tricks: [
      "Products like tan5·tan85 = 1 pair complementary angles — first regroup, then cancel.",
      "Expressions with (4 sin θ − cos θ) style and tan given → divide through by cos θ to turn everything into tan.",
      "Factor forms (1−sin)(1+sin) = cos² appear often — expand/factorise before computing."
    ]
  }
});
