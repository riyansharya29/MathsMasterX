/* Chapter 4 — Quadratic Equations (CBSE Class 10) */
MMX.registerChapter({
  id: "quadratic-equations",
  name: "Quadratic Equations",
  icon: "📈",
  concepts: [
    { h: "Standard form", p: "A quadratic equation in variable x is of the form\n**ax² + bx + c = 0**,  a ≠ 0,\nwhere a, b, c are real numbers. It has degree 2 and at most two real roots." },
    { h: "Solving by factorisation", p: "Split the middle term so that the quadratic factors into two linear terms:\n**(x − α)(x − β) = 0**\nBy the zero-product rule, x = α or x = β." },
    { h: "Completing the square", p: "Rewrite ax² + bx + c = 0 as a perfect square:\nx² + (b/a)x = −c/a\nAdd (b/2a)² to both sides → (x + b/2a)² = b²/4a² − c/a = (b² − 4ac)/4a².\nThis leads to the quadratic formula." },
    { h: "Quadratic formula", p: "**x = [−b ± √(b² − 4ac)] / 2a**\nThe term **D = b² − 4ac** is called the discriminant." },
    { h: "Nature of roots", p: "• D > 0: two distinct real roots\n• D = 0: two equal real roots (a repeated root x = −b/2a)\n• D < 0: no real roots (roots are non-real/complex)." }
  ],
  formulas: [
    { id: "ch4-f1", name: "Standard form", cat: "Algebra", expr: "ax² + bx + c = 0,  a ≠ 0", vars: "a = coefficient of x², b = coefficient of x, c = constant", explain: "If a = 0 the equation becomes linear, not quadratic.", example: "2x² − 5x + 3 = 0 has a = 2, b = −5, c = 3." },
    { id: "ch4-f2", name: "Quadratic formula", cat: "Algebra", expr: "x = [−b ± √(b² − 4ac)] / 2a", vars: "± gives the two roots", explain: "Works for every quadratic, even when factorisation is hard.", example: "2x² − 5x + 3 = 0: x = (5 ± √25−24)/4 = (5 ± 1)/4 → x = 3/2 or 1." },
    { id: "ch4-f3", name: "Discriminant", cat: "Algebra", expr: "D = b² − 4ac", vars: "D decides the nature of roots", explain: "D > 0 distinct real roots; D = 0 equal real roots; D < 0 no real roots.", example: "For x² + x + 1 = 0, D = 1 − 4 = −3 < 0 → no real roots." },
    { id: "ch4-f4", name: "Sum and product of roots", cat: "Algebra", expr: "α + β = −b/a ;  αβ = c/a", vars: "α, β are the roots of ax²+bx+c = 0", explain: "Same relations as for the zeros of a quadratic polynomial.", example: "For 3x² − 7x + 4 = 0: sum = 7/3, product = 4/3." },
    { id: "ch4-f5", name: "Forming equation from roots", cat: "Algebra", expr: "x² − (α+β)x + αβ = 0", vars: "α, β = given roots", explain: "Useful to reconstruct an equation or to verify roots.", example: "Roots 2 and 3 → x² − 5x + 6 = 0." }
  ],
  examples: [
    {
      id: "ch4-e1", title: "Solve 2x² − 5x + 3 = 0 by factorisation",
      given: "2x² − 5x + 3 = 0.",
      concept: "Split the middle term: two numbers multiplying to 2×3 = 6 and adding to −5 are −2 and −3.",
      steps: [
        { t: "Step 1", x: "2x² − 2x − 3x + 3 = 0 ⇒ 2x(x − 1) − 3(x − 1) = 0." },
        { t: "Step 2", x: "(2x − 3)(x − 1) = 0." },
        { t: "Step 3", x: "x = 3/2  or  x = 1." },
        { t: "Final Answer", x: "Roots: x = 1 and x = 3/2.", ans: true }
      ]
    },
    {
      id: "ch4-e2", title: "Word problem: two numbers",
      given: "The difference of two numbers is 3 and their product is 504. Find the numbers.",
      concept: "Form a quadratic: x(x − 3) = 504.",
      steps: [
        { t: "Step 1", x: "Let the numbers be x and x − 3. Then x(x − 3) = 504 ⇒ x² − 3x − 504 = 0." },
        { t: "Step 2", x: "Factorise: two numbers multiplying to −504 and adding to −3 are −24 and 21.\nx² − 24x + 21x − 504 = 0 ⇒ (x − 24)(x + 21) = 0." },
        { t: "Step 3", x: "x = 24 (positive context) ⇒ other number = 21. (−21 discarded as the pair 24, 21 fits: product 504, difference 3.)" },
        { t: "Final Answer", x: "The numbers are 24 and 21.", ans: true }
      ]
    },
    {
      id: "ch4-e3", title: "Nature of roots",
      given: "Find the nature of roots of 2x² − 4x + 3 = 0.",
      concept: "Evaluate discriminant D = b² − 4ac.",
      steps: [
        { t: "Step 1", x: "a = 2, b = −4, c = 3." },
        { t: "Step 2", x: "D = (−4)² − 4(2)(3) = 16 − 24 = −8." },
        { t: "Step 3", x: "Since D = −8 < 0, the equation has no real roots." },
        { t: "Final Answer", x: "No real roots (roots are non-real).", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch4-q1", type: "mcq", topic: "Roots", diff: "easy", marks: 1, q: "The roots of x² − 3x − 10 = 0 are:", options: ["5 and −2", "−5 and 2", "5 and 2", "−5 and −2"], answer: 0, explain: "x² − 5x + 2x − 10 = (x − 5)(x + 2) = 0 ⇒ x = 5, −2." },
    { id: "ch4-q2", type: "mcq", topic: "Nature of roots", diff: "easy", marks: 1, q: "The discriminant of 4x² − 4x + 1 = 0 is:", options: ["0", "1", "−1", "16"], answer: 0, explain: "D = (−4)² − 4(4)(1) = 16 − 16 = 0 → two equal real roots (x = 1/2)."},
    { id: "ch4-q3", type: "mcq", topic: "Standard form", diff: "easy", marks: 1, q: "Which is a quadratic equation?", options: ["x² + 2x + 1 = (4 − x)² + 3", "x(x + 1) + 8 = (x + 2)(x − 2)", "(x + 2)³ = x³ − 4", "x³ − 4x² − x + 1 = (x − 2)³"], answer: 2, explain: "Simplify each: (x+2)³ = x³ − 4 ⇒ x³+6x²+12x+8 = x³−4 ⇒ 6x²+12x+12 = 0, which is quadratic. The others reduce to linear or quartic terms cancel." },
    { id: "ch4-q4", type: "mcq", topic: "Nature of roots", diff: "medium", marks: 1, q: "The equation x² + x + 1 = 0 has:", options: ["two equal real roots", "two distinct real roots", "no real roots", "one real root"], answer: 2, explain: "D = 1 − 4 = −3 < 0 → no real roots." },
    { id: "ch4-q5", type: "mcq", topic: "Roots", diff: "medium", marks: 1, q: "The roots of 3x² − 4√3 x + 4 = 0 are:", options: ["2/√3, 2/√3", "√3, √3", "2√3, 2√3", "4/√3, 0"], answer: 0, explain: "D = (4√3)² − 4·3·4 = 48 − 48 = 0 → equal roots; x = 4√3/6 = 2√3/3 = 2/√3 (twice)." },
    { id: "ch4-q6", type: "mcq", topic: "Quadratic from roots", diff: "easy", marks: 1, q: "A quadratic equation with roots 3 and −4 is:", options: ["x² + x − 12 = 0", "x² − x − 12 = 0", "x² + 7x + 12 = 0", "x² − 7x − 12 = 0"], answer: 0, explain: "Sum = −1, product = −12 → x² − (−1)x + (−12) = x² + x − 12 = 0." },
    { id: "ch4-q7", type: "mcq", topic: "Nature of roots", diff: "hard", marks: 1, q: "For what value of k does 2x² + kx + 3 = 0 have equal roots?", options: ["±2√6", "±√6", "±2√3", "±6"], answer: 0, explain: "Equal roots ⇒ D = 0: k² − 4·2·3 = 0 ⇒ k² = 24 ⇒ k = ±2√6." },
    { id: "ch4-q8", type: "ar", topic: "Nature of roots", diff: "medium", marks: 1, q: "**Assertion (A):** The equation (x² + 5x − 3) = 0 has two distinct real roots.\n**Reason (R):** A quadratic equation with D > 0 has two distinct real roots.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "D = 25 + 12 = 37 > 0, so A is true; R states the correct rule and explains A." },
    { id: "ch4-q9", type: "vsa", topic: "Roots", diff: "easy", marks: 1, q: "Find the roots of x² − 7x + 12 = 0.", answer: "3 and 4", explain: "(x − 3)(x − 4) = 0 ⇒ x = 3, 4." },
    { id: "ch4-q10", type: "vsa", topic: "Nature of roots", diff: "medium", marks: 1, q: "Find the value of k for which x² − 2kx − 6 = 0 has x = 3 as one root.", answer: "k = 1/2", explain: "Put x = 3: 9 − 6k − 6 = 0 ⇒ 3 = 6k ⇒ k = 1/2." },
    { id: "ch4-q11", type: "sa", topic: "Quadratic formula", diff: "medium", marks: 2, q: "Solve 2x² − 7x + 3 = 0 using the quadratic formula.", answer: "x = 3 or x = 1/2", explain: "a=2, b=−7, c=3; D = 49 − 24 = 25.\nx = (7 ± 5)/4 → x = 12/4 = 3 or x = 2/4 = 1/2." },
    { id: "ch4-q12", type: "sa", topic: "Completing the square", diff: "hard", marks: 2, q: "Solve 2x² − 5x + 3 = 0 by the method of completing the square.", answer: "x = 1 or x = 3/2", explain: "Divide by 2: x² − (5/2)x + 3/2 = 0.\nx² − (5/2)x = −3/2. Add (5/4)² = 25/16 to both sides:\n(x − 5/4)² = 25/16 − 24/16 = 1/16.\nSo x − 5/4 = ±1/4 → x = 6/4 = 3/2 or x = 4/4 = 1." },
    { id: "ch4-q13", type: "la", topic: "Word problem", diff: "medium", marks: 3, q: "Find two consecutive positive integers, the sum of whose squares is 365.", answer: "13 and 14", explain: "Numbers x and x+1: x² + (x+1)² = 365 ⇒ 2x² + 2x − 364 = 0 ⇒ x² + x − 182 = 0.\nFactor: x² + 14x − 13x − 182 = (x + 14)(x − 13) = 0 → x = 13 (positive). Numbers: 13, 14. Check: 169 + 196 = 365 ✓." },
    { id: "ch4-q14", type: "la", topic: "Word problem", diff: "hard", marks: 3, q: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.", answer: "40 km/h", explain: "Let speed = x km/h; time = 360/x hours.\nAt speed x+5, time = 360/(x+5).\n360/x − 360/(x+5) = 1 ⇒ 360·5 = x(x+5) ⇒ x² + 5x − 1800 = 0.\nD = 25 + 7200 = 7225 = 85². x = (−5 + 85)/2 = 40 (positive). Speed = 40 km/h." },
    { id: "ch4-q15", type: "case", topic: "Word problem", diff: "medium", marks: 4, q: "A cottage industry produces a certain number of pottery articles in a day. The cost of production of each article (in ₹) was 3 more than twice the number of articles produced that day, and the total cost was ₹90. [Practice Question]\n\nIf x articles are produced, the cost per article is (2x + 3). Find x.", options: ["6", "5", "8", "10"], answer: 0, explain: "Total cost = x(2x + 3) = 90 ⇒ 2x² + 3x − 90 = 0.\n2x² + 15x − 12x − 90 = 0 ⇒ (x − 6)(2x + 15) = 0 → x = 6 (positive). Cost per article = ₹15; check 6 × 15 = 90 ✓." },
    { id: "ch4-q16", type: "case", topic: "Word problem", diff: "medium", marks: 4, q: "The length of a rectangular plot is 2 m more than its breadth. Its area is 48 m². [Practice Question]\n\nFind its breadth and length.", options: ["Breadth 6 m, length 8 m", "Breadth 8 m, length 10 m", "Breadth 4 m, length 6 m", "Breadth 6 m, length 6 m"], answer: 0, explain: "Let breadth = x, length = x + 2. x(x + 2) = 48 ⇒ x² + 2x − 48 = 0 ⇒ (x + 8)(x − 6) = 0 → x = 6. Breadth 6 m, length 8 m; area 48 m² ✓." },
    { id: "ch4-q17", type: "competency", topic: "Nature of roots", diff: "hard", marks: 2, q: "Determine the condition for the equation (1 + m²)x² + 2mcx + (c² − a²) = 0 to have equal roots. (Express in terms of m, c, a.)", answer: "c² = a²(1 + m²)", explain: "Equal roots ⇒ D = 0:\n(2mc)² − 4(1+m²)(c²−a²) = 0\n4m²c² − 4[(1+m²)c² − (1+m²)a²] = 0\nm²c² − c² − m²c² + (1+m²)a² = 0 ⇒ −c² + a²(1+m²) = 0 ⇒ c² = a²(1 + m²)." }
  ],
  revision: {
    points: [
      "Standard form ax² + bx + c = 0, a ≠ 0; at most two real roots.",
      "Methods: factorisation (zero-product rule), completing the square, quadratic formula.",
      "Quadratic formula: x = [−b ± √(b² − 4ac)] / 2a.",
      "Discriminant D = b² − 4ac: D>0 distinct real roots; D=0 equal roots; D<0 no real roots.",
      "Sum of roots = −b/a, product = c/a.",
      "In word problems, form the equation carefully, solve, and keep only solutions valid in context (speed, length, number of objects are positive)."
    ],
    mistakes: [
      "Sign errors: in the formula it is −b (negative of the coefficient of x).",
      "Not dividing throughout by a before completing the square.",
      "Forgetting to check whether roots are valid in the word problem (negative length/speed rejected).",
      "Treating ax² + bx + c = 0 with a = 0 as quadratic — it is then linear."
    ],
    tricks: [
      "Try factorisation first (split middle term); if it fails quickly, use the formula.",
      "Questions asking 'equal roots' always mean set D = 0; 'distinct real roots' mean D > 0; 'no real roots' mean D < 0."
    ]
  }
});
