/* Chapter 3 — Pair of Linear Equations in Two Variables (CBSE Class 10) */
MMX.registerChapter({
  id: "linear-equations",
  name: "Pair of Linear Equations in Two Variables",
  icon: "⚖️",
  concepts: [
    { h: "General form", p: "A pair of linear equations in two variables x and y:\n**a₁x + b₁y + c₁ = 0**\n**a₂x + b₂y + c₂ = 0**\nGeometrically each equation is a straight line; the point where the lines meet is the solution." },
    { h: "Three possible cases", p: "1. **Intersecting lines** (one solution, consistent): a₁/a₂ ≠ b₁/b₂\n2. **Coincident lines** (infinitely many solutions, consistent): a₁/a₂ = b₁/b₂ = c₁/c₂\n3. **Parallel lines** (no solution, inconsistent): a₁/a₂ = b₁/b₂ ≠ c₁/c₂" },
    { h: "Substitution method", p: "Solve one equation for one variable (say y in terms of x), substitute it into the other equation — this gives a single-variable equation. Solve it, then put the value back to find the other variable." },
    { h: "Elimination method", p: "Multiply the equations by suitable numbers so that the coefficients of one variable become equal (or negatives). Then add or subtract the equations to eliminate that variable, solve, and substitute back. This is usually the fastest Class 10 method." },
    { h: "Cross-multiplication method", p: "For a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0:\n**x / (b₁c₂ − b₂c₁) = y / (c₁a₂ − c₂a₁) = 1 / (a₁b₂ − a₂b₁)**\nUse when lines are intersecting, i.e. a₁b₂ − a₂b₁ ≠ 0." }
  ],
  formulas: [
    { id: "ch3-f1", name: "Condition for unique solution", cat: "Algebra", expr: "a₁/a₂ ≠ b₁/b₂", vars: "a₁x+b₁y+c₁=0, a₂x+b₂y+c₂=0", explain: "Lines intersect at exactly one point — consistent pair.", example: "2x+3y=7 and 3x−2y=5: 2/3 ≠ 3/(−2) → unique solution." },
    { id: "ch3-f2", name: "Condition for infinitely many solutions", cat: "Algebra", expr: "a₁/a₂ = b₁/b₂ = c₁/c₂", vars: "All three ratios equal", explain: "Lines are coincident — every point on the line is a solution.", example: "x + y = 2 and 2x + 2y = 4: 1/2 = 1/2 = 2/4 ✓." },
    { id: "ch3-f3", name: "Condition for no solution", cat: "Algebra", expr: "a₁/a₂ = b₁/b₂ ≠ c₁/c₂", vars: "First two ratios equal but third different", explain: "Lines are parallel — they never meet, so no solution.", example: "x + 2y = 3 and 2x + 4y = 5: 1/2 = 2/4 ≠ 3/5 → no solution." },
    { id: "ch3-f4", name: "Cross-multiplication formula", cat: "Algebra", expr: "x/(b₁c₂−b₂c₁) = y/(c₁a₂−c₂a₁) = 1/(a₁b₂−a₂b₁)", vars: "a₁,b₁,c₁ and a₂,b₂,c₂ are the coefficients of the two equations", explain: "Read off x and y from the first two fractions. Works only for intersecting lines.", example: "2x + 3y − 7 = 0, 3x − y − 5 = 0 gives x = 2, y = 1." },
    { id: "ch3-f5", name: "Graphical solution", cat: "Algebra", expr: "Solution = intersection point of the two lines", vars: "Plot at least two points on each line", explain: "The (x, y) coordinates of the intersection satisfy both equations.", example: "Lines x + y = 3 and x − y = 1 meet at (2, 1) → x = 2, y = 1." }
  ],
  examples: [
    {
      id: "ch3-e1", title: "Solve by elimination: x + y = 5 and 2x − 3y = 4",
      given: "Two equations:\nx + y = 5 …(i)\n2x − 3y = 4 …(ii)",
      concept: "Elimination method — make coefficients of x equal.",
      steps: [
        { t: "Step 1", x: "Multiply (i) by 2: 2x + 2y = 10 …(iii)" },
        { t: "Step 2", x: "Subtract (ii) from (iii):\n(2x + 2y) − (2x − 3y) = 10 − 4\n5y = 6 ⇒ y = 6/5" },
        { t: "Step 3", x: "Put y = 6/5 in (i): x + 6/5 = 5 ⇒ x = 5 − 6/5 = 19/5." },
        { t: "Final Answer", x: "x = 19/5, y = 6/5. Check in (ii): 2(19/5) − 3(6/5) = 38/5 − 18/5 = 20/5 = 4 ✓.", ans: true }
      ]
    },
    {
      id: "ch3-e2", title: "Check consistency of x + 2y = 4 and 3x + 6y = 15",
      given: "a₁=1, b₁=2, c₁=−4; a₂=3, b₂=6, c₂=−15.",
      concept: "Compare the ratios of coefficients.",
      steps: [
        { t: "Step 1", x: "a₁/a₂ = 1/3, b₁/b₂ = 2/6 = 1/3, c₁/c₂ = −4/−15 = 4/15." },
        { t: "Step 2", x: "Here a₁/a₂ = b₁/b₂ = 1/3 but c₁/c₂ = 4/15 ≠ 1/3." },
        { t: "Final Answer", x: "a₁/a₂ = b₁/b₂ ≠ c₁/c₂ → lines are parallel → no solution (inconsistent).", ans: true }
      ]
    },
    {
      id: "ch3-e3", title: "Word problem: ages",
      given: "Aftab tells his daughter, \"Seven years ago, I was seven times as old as you were then. Also, three years from now, I shall be three times as old as you will be.\" Find their present ages.",
      concept: "Represent as linear pair, solve by substitution/elimination.",
      steps: [
        { t: "Step 1", x: "Let Aftab's present age = x years, daughter's = y years.\nSeven years ago: (x − 7) = 7(y − 7) ⇒ x − 7y = −42 …(i)\nThree years later: (x + 3) = 3(y + 3) ⇒ x − 3y = 6 …(ii)" },
        { t: "Step 2", x: "Subtract (i) from (ii): 4y = 48 ⇒ y = 12." },
        { t: "Step 3", x: "Put y = 12 in (ii): x − 36 = 6 ⇒ x = 42." },
        { t: "Final Answer", x: "Aftab is 42 years old and his daughter is 12 years old.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch3-q1", type: "mcq", topic: "Consistency", diff: "easy", marks: 1, q: "The pair of equations x + 2y + 5 = 0 and −3x − 6y + 1 = 0 has:", options: ["a unique solution", "exactly two solutions", "infinitely many solutions", "no solution"], answer: 3, explain: "a₁/a₂ = 1/(−3); b₁/b₂ = 2/(−6) = −1/3; c₁/c₂ = 5/1. Since a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are parallel → no solution." },
    { id: "ch3-q2", type: "mcq", topic: "Consistency", diff: "easy", marks: 1, q: "The pair of equations y = 0 and y = −7 has:", options: ["one solution", "two solutions", "infinitely many solutions", "no solution"], answer: 3, explain: "Both are horizontal lines (parallel, distinct) → no solution." },
    { id: "ch3-q3", type: "mcq", topic: "Solution", diff: "easy", marks: 1, q: "Solution of x + y = 10 and x − y = 2 is:", options: ["x = 6, y = 4", "x = 4, y = 6", "x = 7, y = 3", "x = 8, y = 2"], answer: 0, explain: "Adding: 2x = 12 ⇒ x = 6; then y = 4." },
    { id: "ch3-q4", type: "mcq", topic: "Consistency", diff: "medium", marks: 1, q: "The value of k for which the lines kx + 3y = k − 3 and 12x + ky = k are coincident is:", options: ["6", "−6", "0", "3"], answer: 0, explain: "For coincidence: k/12 = 3/k = (k−3)/k. From k/12 = 3/k → k² = 36 → k = ±6. Check k = 6: 3/k = 1/2 and (k−3)/k = 3/6 = 1/2 ✓. k = −6 gives (−9)/(−6) = 3/2 ≠ −1/2 ✗. So k = 6." },
    { id: "ch3-q5", type: "mcq", topic: "Consistency", diff: "medium", marks: 1, q: "If a pair of linear equations is consistent, the lines will be:", options: ["always parallel", "always coincident", "intersecting or coincident", "always intersecting"], answer: 2, explain: "Consistent means at least one solution exists — either intersecting (one solution) or coincident (infinitely many)." },
    { id: "ch3-q6", type: "mcq", topic: "Solution", diff: "medium", marks: 1, q: "The solution of 2x + y = 6 and 2x − y = 2 is:", options: ["(2, 2)", "(1, 2)", "(2, 1)", "(1, 1)"], answer: 0, explain: "Adding: 4x = 8 ⇒ x = 2; then 2(2) − y = 2 ⇒ y = 2." },
    { id: "ch3-q7", type: "ar", topic: "Consistency", diff: "medium", marks: 1, q: "**Assertion (A):** The pair 2x + 3y + 5 = 0 and 4x + 6y + 10 = 0 has infinitely many solutions.\n**Reason (R):** Coincident lines have infinitely many solutions.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "2/4 = 3/6 = 5/10 = 1/2, so lines coincide (A true); coincident lines indeed give infinitely many solutions (R true, explains A)." },
    { id: "ch3-q8", type: "vsa", topic: "Consistency", diff: "easy", marks: 1, q: "Do the equations 5x − 3y = 8 and 10x − 6y = 9 represent coincident lines? Justify.", answer: "No — no solution (parallel)", explain: "5/10 = 3/6 = 1/2 but 8/9 ≠ 1/2. Lines are parallel, not coincident; no solution." },
    { id: "ch3-q9", type: "vsa", topic: "Solution", diff: "medium", marks: 1, q: "Solve: 3x + 2y = 11, 2x + 3y = 4.", answer: "x = 5, y = −2", explain: "Multiply first by 2: 6x + 4y = 22; second by 3: 6x + 9y = 12. Subtract: −5y = 10 ⇒ y = −2. Then 3x − 4 = 11 ⇒ x = 5." },
    { id: "ch3-q10", type: "sa", topic: "Solution", diff: "medium", marks: 2, q: "Solve by substitution: x + y = 14, x − y = 4.", answer: "x = 9, y = 5", explain: "From x − y = 4, x = y + 4. Substitute in x + y = 14: y + 4 + y = 14 ⇒ 2y = 10 ⇒ y = 5, x = 9." },
    { id: "ch3-q11", type: "sa", topic: "Consistency", diff: "medium", marks: 2, q: "For which value(s) of k does the pair 2x + ky = 1 and 3x − 5y = 7 have a unique solution?", answer: "All real k except k = −10/3", explain: "Unique solution when a₁/a₂ ≠ b₁/b₂: 2/3 ≠ k/(−5) ⇒ k ≠ −10/3." },
    { id: "ch3-q12", type: "la", topic: "Word problem", diff: "medium", marks: 3, q: "The coach of a cricket team buys 7 bats and 6 balls for ₹3800. Later she buys 3 bats and 5 balls for ₹1750. Find the cost of one bat and one ball.", answer: "Bat = ₹500, ball = ₹50", explain: "Let bat cost x, ball cost y.\n7x + 6y = 3800 …(i)\n3x + 5y = 1750 …(ii)\n(i)×5: 35x + 30y = 19000; (ii)×6: 18x + 30y = 10500.\nSubtract: 17x = 8500 ⇒ x = 500. Then 3(500) + 5y = 1750 ⇒ 5y = 250 ⇒ y = 50." },
    { id: "ch3-q13", type: "la", topic: "Word problem", diff: "hard", marks: 3, q: "A fraction becomes 9/11 if 2 is added to both numerator and denominator. If 3 is added to both, it becomes 5/6. Find the fraction.", answer: "7/9", explain: "Let fraction = x/y.\n(x+2)/(y+2) = 9/11 ⇒ 11x − 9y = −4 …(i)\n(x+3)/(y+3) = 5/6 ⇒ 6x − 5y = −3 …(ii)\n(i)×5: 55x − 45y = −20; (ii)×9: 54x − 45y = −27.\nSubtract: x = 7. From (ii): 42 − 5y = −3 ⇒ y = 9. Fraction = 7/9." },
    { id: "ch3-q14", type: "case", topic: "Word problem", diff: "medium", marks: 4, q: "A test has 15 questions. Students get +4 marks for each correct answer and −2 marks for each incorrect answer. [Practice Question]\n\n(i) If Anu attempts all and scores 24 marks with c correct answers, which equation holds?\n(ii) How many questions did she answer correctly?", options: ["(i) 4c − 2(15−c) = 24  (ii) 9", "(i) 4c + 2(15−c) = 24  (ii) 3", "(i) 4c − 2c = 24       (ii) 6", "(i) 4(15−c) − 2c = 24  (ii) 6"], answer: 0, explain: "Correct = c, incorrect = 15 − c. Marks = 4c − 2(15 − c) = 24.\n4c − 30 + 2c = 24 ⇒ 6c = 54 ⇒ c = 9 correct, 6 incorrect." },
    { id: "ch3-q15", type: "competency", topic: "Consistency", diff: "hard", marks: 2, q: "For which value of k will the pair 8x + 5y = 9 and kx + 10y = 15 have no solution?", answer: "k = 16", explain: "No solution when a₁/a₂ = b₁/b₂ ≠ c₁/c₂: 8/k = 5/10 = 1/2 ⇒ k = 16. Check 9/15 = 3/5 ≠ 1/2 ✓, so no solution." }
  ],
  revision: {
    points: [
      "Standard form: a₁x + b₁y + c₁ = 0, a₂x + b₂y + c₂ = 0.",
      "Unique solution (intersecting): a₁/a₂ ≠ b₁/b₂.",
      "Infinitely many (coincident): a₁/a₂ = b₁/b₂ = c₁/c₂.",
      "No solution (parallel): a₁/a₂ = b₁/b₂ ≠ c₁/c₂.",
      "Methods: substitution, elimination (fastest), cross-multiplication, graphical.",
      "Cross-multiplication: x/(b₁c₂−b₂c₁) = y/(c₁a₂−c₂a₁) = 1/(a₁b₂−a₂b₁)."
    ],
    mistakes: [
      "Comparing ratios without writing equations in standard form (move all terms to LHS first).",
      "Sign errors in cross-multiplication: it is b₁c₂ − b₂c₁ and c₁a₂ − c₂a₁.",
      "Forgetting that c terms are the constants with sign when they are on the RHS — move them to LHS.",
      "In word problems, not defining x and y before forming equations."
    ],
    tricks: [
      "Elimination is usually quickest: multiply to match coefficients, then add/subtract.",
      "For 'unique/no/infinite solution' questions, compare a₁/a₂ and b₁/b₂ first; check c ratio only if these two are equal."
    ]
  }
});
