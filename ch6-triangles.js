/* Chapter 6 — Triangles (CBSE Class 10) */
MMX.registerChapter({
  id: "triangles",
  name: "Triangles",
  icon: "📐",
  concepts: [
    { h: "Similar figures", p: "Two figures are **similar** if they have the same shape (not necessarily the same size). All congruent figures are similar, but similar figures need not be congruent." },
    { h: "Similar triangles", p: "Two triangles are similar if (i) their corresponding angles are equal (AA/AAA), and (ii) corresponding sides are in proportion (the ratio is the scale factor k)." },
    { h: "Similarity criteria", p: "• **AAA / AA**: two angles equal → similar.\n• **SSS**: sides of one triangle are proportional to the sides of the other → similar.\n• **SAS**: one angle equal and the sides containing it proportional → similar." },
    { h: "Basic Proportionality Theorem (Thales)", p: "**If a line is drawn parallel to one side of a triangle to intersect the other two sides, it divides those two sides in the same ratio.**\nIn ΔABC with DE ∥ BC (D on AB, E on AC): AD/DB = AE/EC.\nConverse: if a line divides two sides in the same ratio, it is parallel to the third side." },
    { h: "Pythagoras theorem", p: "**In a right triangle, the square of the hypotenuse = sum of squares of the other two sides:**\n**c² = a² + b²**\nConverse: if a² + b² = c² in a triangle, the angle opposite side c is a right angle." },
    { h: "Area of similar triangles", p: "The ratio of the areas of two similar triangles is equal to the **square of the ratio of their corresponding sides** (and also squares of corresponding altitudes, medians or angle bisectors)." }
  ],
  formulas: [
    { id: "ch6-f1", name: "Thales / BPT", cat: "Geometry", expr: "AD/DB = AE/EC  (when DE ∥ BC)", vars: "Line DE parallel to BC cuts AB at D and AC at E", explain: "Parallel line divides the other two sides proportionally.", example: "If AD/DB = 3/2 and AE = 6, then EC = 4 (since 3/2 = 6/4)." },
    { id: "ch6-f2", name: "Similarity ratio → sides", cat: "Geometry", expr: "AB/PQ = BC/QR = CA/RP = k", vars: "ΔABC ~ ΔPQR; k = scale factor", explain: "Corresponding sides are proportional; order of letters gives correspondence.", example: "k = 2 means every side of ΔABC is twice the matching side of ΔPQR." },
    { id: "ch6-f3", name: "Areas of similar triangles", cat: "Geometry", expr: "ar(ABC)/ar(PQR) = (AB/PQ)²", vars: "Ratio of areas = square of the scale factor", explain: "Also equals (altitude ratio)², (median ratio)².", example: "If sides are in ratio 3:5, areas are in ratio 9:25." },
    { id: "ch6-f4", name: "Pythagoras theorem", cat: "Geometry", expr: "h² = p² + b²", vars: "h = hypotenuse, p, b = perpendicular sides of a right triangle", explain: "Holds only for right-angled triangles.", example: "Sides 3, 4 → hypotenuse = √(9+16) = 5." },
    { id: "ch6-f5", name: "Altitude-on-hypotenuse relations", cat: "Geometry", expr: "p² = a·m ,  b² = a·n ,  h² = m·n", vars: "In right ΔABC (right angle at C), altitude CD from C to AB; AD = m, DB = n, AC = p, BC = b, AB = a", explain: "Each leg squared equals hypotenuse × adjacent segment; altitude squared = product of the two segments.", example: "If AD = 4 cm and DB = 9 cm, then CD² = 4 × 9 = 36 → CD = 6 cm." }
  ],
  examples: [
    {
      id: "ch6-e1", title: "Using Thales' theorem",
      given: "In ΔABC, DE ∥ BC, AD = 3 cm, DB = 2 cm, AE = 6 cm. Find EC.",
      concept: "AD/DB = AE/EC.",
      steps: [
        { t: "Step 1", x: "By Thales: AD/DB = AE/EC ⇒ 3/2 = 6/EC." },
        { t: "Step 2", x: "3·EC = 12 ⇒ EC = 4 cm." },
        { t: "Final Answer", x: "EC = 4 cm.", ans: true }
      ]
    },
    {
      id: "ch6-e2", title: "Similar triangles — find a side",
      given: "ΔABC ~ ΔPQR with scale factor AB/PQ = 2/3. If BC = 6 cm, find QR.",
      concept: "Corresponding sides of similar triangles are proportional.",
      steps: [
        { t: "Step 1", x: "BC/QR = AB/PQ = 2/3." },
        { t: "Step 2", x: "6/QR = 2/3 ⇒ QR = 6 × 3/2 = 9 cm." },
        { t: "Final Answer", x: "QR = 9 cm.", ans: true }
      ]
    },
    {
      id: "ch6-e3", title: "Altitude in an equilateral triangle",
      given: "Find the altitude of an equilateral triangle of side 2a.",
      concept: "The altitude bisects the base, forming two congruent right triangles; apply Pythagoras.",
      steps: [
        { t: "Step 1", x: "Altitude h splits the base into two parts of length a." },
        { t: "Step 2", x: "In the right triangle: h² + a² = (2a)² = 4a²." },
        { t: "Step 3", x: "h² = 3a² ⇒ h = √3·a." },
        { t: "Final Answer", x: "Altitude = √3 a (e.g. side 10 cm → altitude ≈ 8.66 cm).", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch6-q1", type: "mcq", topic: "Similarity", diff: "easy", marks: 1, q: "If ΔABC ~ ΔDEF and AB/DE = 3/4, then ar(ABC) : ar(DEF) is:", options: ["9 : 16", "3 : 4", "16 : 9", "√3 : 2"], answer: 0, explain: "Area ratio = (side ratio)² = (3/4)² = 9/16." },
    { id: "ch6-q2", type: "mcq", topic: "Thales theorem", diff: "easy", marks: 1, q: "In ΔABC, DE ∥ BC. If AD = 1.5 cm, DB = 3 cm and AE = 1 cm, then EC is:", options: ["2 cm", "2.5 cm", "3 cm", "4.5 cm"], answer: 0, explain: "AD/DB = AE/EC ⇒ 1.5/3 = 1/EC ⇒ EC = 2 cm." },
    { id: "ch6-q3", type: "mcq", topic: "Pythagoras", diff: "easy", marks: 1, q: "The hypotenuse of a right triangle with legs 6 cm and 8 cm is:", options: ["10 cm", "14 cm", "√14 cm", "12 cm"], answer: 0, explain: "h = √(6² + 8²) = √100 = 10 cm." },
    { id: "ch6-q4", type: "mcq", topic: "Pythagoras converse", diff: "medium", marks: 1, q: "A triangle with sides 7 cm, 24 cm and 25 cm is:", options: ["right angled", "acute angled", "obtuse angled", "not possible"], answer: 0, explain: "7² + 24² = 49 + 576 = 625 = 25². By converse of Pythagoras, it is right angled (right angle opposite the 25 cm side)." },
    { id: "ch6-q5", type: "mcq", topic: "Similarity", diff: "medium", marks: 1, q: "In similar triangles, the ratio of corresponding sides is 2 : 5. The ratio of their medians is:", options: ["2 : 5", "4 : 25", "√2 : √5", "5 : 2"], answer: 0, explain: "In similar triangles, medians (like altitudes and angle bisectors) are in the same ratio as sides = 2 : 5. (Areas would be 4 : 25.)" },
    { id: "ch6-q6", type: "mcq", topic: "Pythagoras", diff: "medium", marks: 1, q: "The length of the altitude of an equilateral triangle of side 10 cm is:", options: ["5√3 cm", "5 cm", "10√3 cm", "10 cm"], answer: 0, explain: "h = √3/2 × side = √3/2 × 10 = 5√3 cm ≈ 8.66 cm." },
    { id: "ch6-q7", type: "mcq", topic: "Altitude relations", diff: "hard", marks: 1, q: "In right ΔABC, altitude CD from C meets hypotenuse AB at D. If AD = 4 cm and DB = 9 cm, then CD equals:", options: ["6 cm", "6.5 cm", "13 cm", "36 cm"], answer: 0, explain: "CD² = AD × DB = 4 × 9 = 36 ⇒ CD = 6 cm." },
    { id: "ch6-q8", type: "ar", topic: "Similarity", diff: "medium", marks: 1, q: "**Assertion (A):** If the sides of two similar triangles are in ratio 4 : 9, their areas are in ratio 16 : 81.\n**Reason (R):** The ratio of areas of similar triangles equals the square of the ratio of their corresponding sides.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "(4/9)² = 16/81. R states exactly the theorem used, so it explains A." },
    { id: "ch6-q9", type: "vsa", topic: "Thales theorem", diff: "medium", marks: 1, q: "In ΔABC, DE ∥ BC; if AD/DB = 2/3 and AC = 15 cm, find AE.", answer: "AE = 6 cm", explain: "AD/DB = AE/EC = 2/3, so AE:EC = 2:3 and AE + EC = 15 ⇒ AE = 2/5 × 15 = 6 cm." },
    { id: "ch6-q10", type: "vsa", topic: "Pythagoras", diff: "easy", marks: 1, q: "A ladder 10 m long reaches a window 8 m above the ground. Find the distance of the foot of the ladder from the wall.", answer: "6 m", explain: "Right triangle: distance = √(10² − 8²) = √(100 − 64) = √36 = 6 m." },
    { id: "ch6-q11", type: "sa", topic: "Similarity", diff: "medium", marks: 2, q: "ΔABC ~ ΔQRP, ar(ABC)/ar(PQR) = 9/4 and BC = 15 cm. Find PR.", answer: "PR = 10 cm", explain: "Area ratio = (BC/PR)² ⇒ 9/4 = (15/PR)² ⇒ 15/PR = 3/2 ⇒ PR = 10 cm. (Correspondence: C ↔ R, so BC ↔ PR.)" },
    { id: "ch6-q12", type: "sa", topic: "Pythagoras", diff: "medium", marks: 2, q: "Two poles of heights 6 m and 11 m stand on level ground. The distance between their feet is 12 m. Find the distance between their tops.", answer: "13 m", explain: "Height difference = 11 − 6 = 5 m; horizontal distance = 12 m. Distance between tops = √(12² + 5²) = √(144 + 25) = √169 = 13 m." },
    { id: "ch6-q13", type: "la", topic: "Similarity application", diff: "medium", marks: 3, q: "A girl of height 90 cm is walking away from the base of a lamp-post at 1.2 m/s. The lamp is 3.6 m above the ground. Find the length of her shadow after 4 seconds.", answer: "Shadow = 1.6 m", explain: "After 4 s she is 1.2 × 4 = 4.8 m from the post. Let shadow length = x. The two triangles (lamp-post–shadow-tip and girl–shadow-tip) are similar (AA):\n3.6/0.9 = (4.8 + x)/x ⇒ 4 = (4.8 + x)/x ⇒ 4x = 4.8 + x ⇒ 3x = 4.8 ⇒ x = 1.6 m." },
    { id: "ch6-q14", type: "la", topic: "Pythagoras", diff: "hard", marks: 3, q: "Prove that in a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides (Pythagoras theorem), using similar triangles.", answer: "c² = a² + b²", explain: "In right ΔABC (right angle at C), draw altitude CD to hypotenuse AB.\nΔABC ~ ΔACD (AA: ∠A common, right angles) ⇒ AC² = AB × AD.\nΔABC ~ ΔBCD ⇒ BC² = AB × BD.\nAdding: AC² + BC² = AB(AD + BD) = AB × AB = AB².\nHence hypotenuse² = sum of squares of the two sides." },
    { id: "ch6-q15", type: "case", topic: "Similar triangles", diff: "medium", marks: 4, q: "While practising, a student holds a ruler vertically and finds that a 15 cm long ruler held at arm's length (60 cm from the eye) exactly covers a building that is 60 m away. [Practice Question]\n\nWhat is the height of the building?", options: ["15 m", "6 m", "9 m", "60 m"], answer: 0, explain: "The triangles formed by the eye–ruler and eye–building are similar:\nheight of building / length of ruler = distance of building / distance of ruler\nh / 0.15 = 60 / 0.6 = 100 ⇒ h = 0.15 × 100 = 15 m." },
    { id: "ch6-q16", type: "competency", topic: "Thales converse", diff: "hard", marks: 2, q: "In ΔABC, D lies on AB and E lies on AC with DE ∥ BC. If AD = 4 cm, DB = (x − 1) cm, AE = 8 cm and EC = (x + 1) cm, find x.", answer: "x = 3", explain: "By Thales: AD/DB = AE/EC ⇒ 4/(x−1) = 8/(x+1).\nCross-multiply: 4(x + 1) = 8(x − 1) ⇒ 4x + 4 = 8x − 8 ⇒ 12 = 4x ⇒ x = 3.\nCheck: DB = 2 cm and EC = 4 cm, both positive; 4/2 = 8/4 = 2 ✓." }
  ],
  revision: {
    points: [
      "Similar: same shape, sizes may differ; congruent ⇒ similar but similar ⇏ congruent.",
      "Criteria: AA (or AAA), SSS (sides proportional), SAS (one angle equal + including sides proportional).",
      "Thales (BPT): DE ∥ BC ⇒ AD/DB = AE/EC; converse also true.",
      "Similar triangles: sides proportional; ratio of areas = square of ratio of sides (also altitudes/medians).",
      "Pythagoras: h² = p² + b² in a right triangle; converse identifies right triangles.",
      "Altitude to hypotenuse: CD² = AD·DB, AC² = AB·AD, BC² = AB·DB."
    ],
    mistakes: [
      "Writing area ratio equal to side ratio (it is the SQUARE).",
      "Mismatching corresponding vertices — order of letters in ΔABC ~ ΔPQR fixes correspondence.",
      "Applying Pythagoras to non-right triangles.",
      "Not unit-matching in shadow/pole problems (cm vs m)."
    ],
    tricks: [
      "Seeing parallel lines in a triangle → instantly write Thales proportions.",
      "Shadow/ladder/pole problems are always right-triangle problems — draw the vertical + horizontal + slant line.",
      "For area questions, square the scale factor; for side questions, take the square root of area ratio."
    ]
  }
});
