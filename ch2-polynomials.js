/* Chapter 2 — Polynomials (CBSE Class 10) */
MMX.registerChapter({
  id: "polynomials",
  name: "Polynomials",
  icon: "🧩",
  concepts: [
    { h: "Zeros of a polynomial", p: "A zero of a polynomial p(x) is a value x = α for which **p(α) = 0**. On the graph, the zeros are the **x-coordinates of the points where the graph cuts the x-axis**.\nA linear polynomial has 1 zero, a quadratic has at most 2 zeros and a cubic has at most 3 zeros." },
    { h: "Quadratic polynomial & its zeros", p: "For a quadratic polynomial **p(x) = ax² + bx + c**, with zeros α and β:\n• Sum of zeros: α + β = −b/a\n• Product of zeros: αβ = c/a\nThe parabola opens upward if a > 0 and downward if a < 0." },
    { h: "Cubic polynomial & its zeros", p: "For a cubic polynomial **p(x) = ax³ + bx² + cx + d**, with zeros α, β, γ:\n• α + β + γ = −b/a\n• αβ + βγ + γα = c/a\n• αβγ = −d/a" },
    { h: "Forming a polynomial from zeros", p: "Given zeros α and β, the quadratic polynomial is:\n**k[x² − (α + β)x + αβ]**, k ≠ 0\n(Usually k = 1 is taken.) For cubic zeros α, β, γ:\nk[x³ − (α+β+γ)x² + (αβ+βγ+γα)x − αβγ]." },
    { h: "Division algorithm for polynomials", p: "If p(x) and g(x) are polynomials with g(x) ≠ 0, then there exist polynomials q(x) (quotient) and r(x) (remainder) such that:\n**p(x) = g(x)·q(x) + r(x)**,\nwhere r(x) = 0 or degree of r(x) < degree of g(x). It is the polynomial version of Euclid's division lemma." }
  ],
  formulas: [
    { id: "ch2-f1", name: "Zeros of a quadratic", cat: "Algebra", expr: "α + β = −b/a ;  αβ = c/a", vars: "ax² + bx + c has zeros α, β", explain: "Sum of zeros = −(coefficient of x)/(coefficient of x²); product = constant term/coefficient of x².", example: "For x² + 7x + 12: sum = −7, product = 12; zeros are −3 and −4." },
    { id: "ch2-f2", name: "Quadratic from zeros", cat: "Algebra", expr: "p(x) = k[x² − (α+β)x + αβ]", vars: "α, β = given zeros; k = non-zero constant", explain: "Reverse the sum/product relations to build the polynomial.", example: "Zeros 2 and −3 → x² − (−1)x + (−6) = x² + x − 6." },
    { id: "ch2-f3", name: "Zeros of a cubic", cat: "Algebra", expr: "α+β+γ = −b/a, αβ+βγ+γα = c/a, αβγ = −d/a", vars: "ax³ + bx² + cx + d has zeros α, β, γ", explain: "Signs alternate: −, +, − for the three relations.", example: "For x³ − 6x² + 11x − 6: sum = 6, pair-sum = 11, product = 6 (zeros 1, 2, 3)." },
    { id: "ch2-f4", name: "Polynomial division algorithm", cat: "Algebra", expr: "p(x) = g(x)·q(x) + r(x)", vars: "p = dividend, g = divisor, q = quotient, r = remainder", explain: "r(x) is zero or has smaller degree than g(x).", example: "Dividing x² − 5x + 6 by x − 2 gives quotient x − 3 and remainder 0." },
    { id: "ch2-f5", name: "Geometrical meaning", cat: "Algebra", expr: "Number of zeros = number of x-axis intersections", vars: "Graph y = p(x)", explain: "Linear → 1 intersection; quadratic (parabola) → 0, 1 or 2; cubic → 1 or 3.", example: "If a parabola never crosses the x-axis, the quadratic has no real zeros (D < 0)." }
  ],
  examples: [
    {
      id: "ch2-e1", title: "Find zeros of x² + 7x + 12",
      given: "Quadratic polynomial p(x) = x² + 7x + 12.",
      concept: "Factorise and set each factor to zero; verify with sum/product relations.",
      steps: [
        { t: "Step 1", x: "Factorise: x² + 7x + 12 = x² + 3x + 4x + 12 = x(x+3) + 4(x+3) = (x + 3)(x + 4)." },
        { t: "Step 2", x: "Set p(x) = 0: (x + 3)(x + 4) = 0 ⇒ x = −3 or x = −4." },
        { t: "Step 3", x: "Check: sum = −3 + (−4) = −7 = −b/a ✓; product = (−3)(−4) = 12 = c/a ✓." },
        { t: "Final Answer", x: "Zeros are −3 and −4.", ans: true }
      ]
    },
    {
      id: "ch2-e2", title: "Polynomial from given zeros",
      given: "Zeros are 4 and 1. Form a quadratic polynomial.",
      concept: "Use x² − (sum)x + product.",
      steps: [
        { t: "Step 1", x: "Sum α + β = 4 + 1 = 5; product αβ = 4 × 1 = 4." },
        { t: "Step 2", x: "p(x) = x² − (α+β)x + αβ = x² − 5x + 4." },
        { t: "Step 3", x: "Verify: x² − 5x + 4 = (x − 1)(x − 4), zeros 1 and 4 ✓." },
        { t: "Final Answer", x: "x² − 5x + 4 (or any non-zero multiple of it).", ans: true }
      ]
    },
    {
      id: "ch2-e3", title: "Find zero when one zero and relations are given",
      given: "The quadratic polynomial 2x² − 8x − k has one zero 5/2... [NCERT-style] Find k and the other zero.",
      concept: "Sum of zeros = −b/a.",
      steps: [
        { t: "Step 1", x: "Here a = 2, b = −8. Sum of zeros = −(−8)/2 = 4. If α = 5/2, then β = 4 − 5/2 = 3/2." },
        { t: "Step 2", x: "Product αβ = c/a = −k/2. (5/2)(3/2) = 15/4 = −k/2 ⇒ k = −15/2." },
        { t: "Final Answer", x: "Other zero = 3/2, k = −15/2.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch2-q1", type: "mcq", topic: "Zeros", diff: "easy", marks: 1, q: "The zeros of the quadratic polynomial x² + 7x + 10 are:", options: ["−2, −5", "2, 5", "−2, 5", "2, −5"], answer: 0, explain: "x² + 7x + 10 = (x + 2)(x + 5) = 0 ⇒ x = −2, −5. (Sum −7, product 10.)" },
    { id: "ch2-q2", type: "mcq", topic: "Sum & product of zeros", diff: "easy", marks: 1, q: "If α and β are zeros of p(x) = x² − 5x + 6, then α + β is:", options: ["5", "−5", "6", "−6"], answer: 0, explain: "α + β = −b/a = −(−5)/1 = 5." },
    { id: "ch2-q3", type: "mcq", topic: "Polynomial from zeros", diff: "medium", marks: 1, q: "A quadratic polynomial whose zeros are −3 and 4 is:", options: ["x² − x − 12", "x² + x − 12", "x² − 7x − 12", "x² + x + 12"], answer: 0, explain: "Sum = 1, product = −12. Polynomial = x² − (1)x + (−12) = x² − x − 12." },
    { id: "ch2-q4", type: "mcq", topic: "Graphical meaning", diff: "medium", marks: 1, q: "The graph of a quadratic polynomial can cut the x-axis in at most:", options: ["1 point", "2 points", "3 points", "4 points"], answer: 1, explain: "A quadratic has degree 2, so at most 2 real zeros — the parabola meets the x-axis in at most 2 points." },
    { id: "ch2-q5", type: "mcq", topic: "Cubic polynomial", diff: "medium", marks: 1, q: "If α, β, γ are zeros of p(x) = x³ − 6x² + 11x − 6, then αβγ equals:", options: ["6", "−6", "11", "−11"], answer: 0, explain: "For ax³ + bx² + cx + d, αβγ = −d/a = −(−6)/1 = 6." },
    { id: "ch2-q6", type: "mcq", topic: "Degree of polynomial", diff: "easy", marks: 1, q: "The number of zeros of a cubic polynomial is at most:", options: ["1", "2", "3", "4"], answer: 2, explain: "A degree-n polynomial has at most n zeros; a cubic (degree 3) has at most 3 zeros." },
    { id: "ch2-q7", type: "mcq", topic: "Sum & product of zeros", diff: "hard", marks: 1, q: "If zeros α and β of a quadratic are such that α + β = −6 and αβ = −4, the polynomial is:", options: ["x² + 6x − 4", "x² − 6x − 4", "x² + 6x + 4", "x² − 6x + 4"], answer: 0, explain: "p(x) = x² − (α+β)x + αβ = x² − (−6)x + (−4) = x² + 6x − 4." },
    { id: "ch2-q8", type: "ar", topic: "Graphical meaning", diff: "medium", marks: 1, q: "**Assertion (A):** If the graph of a polynomial does not cross the x-axis at any point, the polynomial has no real zero.\n**Reason (R):** The x-coordinates of the points where the graph cuts the x-axis are the zeros of the polynomial.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "By definition zeros = x-intercepts; no intersection means no real zeros. R correctly explains A." },
    { id: "ch2-q9", type: "vsa", topic: "Zeros", diff: "easy", marks: 1, q: "Find the zero of the linear polynomial p(x) = 3x + 1.", answer: "x = −1/3", explain: "3x + 1 = 0 ⇒ x = −1/3." },
    { id: "ch2-q10", type: "vsa", topic: "Sum & product of zeros", diff: "medium", marks: 1, q: "For what value of k, (−4) is a zero of the polynomial x² − x − (2k + 2)?", answer: "k = 9", explain: "p(−4) = 16 + 4 − (2k+2) = 0 ⇒ 18 = 2k + 2 ⇒ 2k = 16 ⇒ k = 9." },
    { id: "ch2-q11", type: "sa", topic: "Zeros", diff: "medium", marks: 2, q: "Find the zeros of the quadratic polynomial 4u² + 8u and verify the relationship between the zeros and its coefficients.", answer: "0 and −2", explain: "4u(u + 2) = 0 ⇒ u = 0 or u = −2.\nSum = 0 + (−2) = −2 = −8/4 = −b/a ✓.\nProduct = 0 × (−2) = 0 = 0/4 = c/a ✓." },
    { id: "ch2-q12", type: "sa", topic: "Sum & product of zeros", diff: "medium", marks: 2, q: "Find a quadratic polynomial with zeros 2 + √3 and 2 − √3.", answer: "x² − 4x + 1", explain: "Sum = (2+√3)+(2−√3) = 4. Product = (2+√3)(2−√3) = 4 − 3 = 1. Polynomial = x² − 4x + 1." },
    { id: "ch2-q13", type: "la", topic: "Division algorithm", diff: "hard", marks: 3, q: "Divide 3x² − x³ − 3x + 5 by x − 1 − x² and verify the division algorithm.", answer: "Quotient x − 2, remainder 3", explain: "Write dividend as −x³ + 3x² − 3x + 5 and divisor as −x² + x − 1.\nDivide: (−x³)/(−x²) = x. Multiply divisor by x: −x³ + x² − x; subtract → 2x² − 2x + 5.\nNext: 2x²/(−x²) = −2. Multiply: 2x² − 2x + 2; subtract → remainder 3.\nSo quotient = x − 2, remainder = 3.\nCheck: (−x² + x − 1)(x − 2) + 3 = −x³ + 3x² − 3x + 2 + 3 = −x³ + 3x² − 3x + 5 ✓." },
    { id: "ch2-q14", type: "case", topic: "Graph of polynomial", diff: "medium", marks: 4, q: "A student sketches the parabola y = p(x) of a quadratic polynomial. The parabola intersects the x-axis at two points and the y-axis at one point. [Practice Question]\n\n(i) How many zeros does p(x) have?\n(ii) If the two x-intercepts are −1 and 3, write the polynomial.", options: ["(i) 2 zeros  (ii) x² − 2x − 3", "(i) 1 zero   (ii) x² + 2x − 3", "(i) 2 zeros  (ii) x² + 2x + 3", "(i) 3 zeros  (ii) x² − 2x + 3"], answer: 0, explain: "(i) Two x-intercepts → 2 real zeros.\n(ii) Zeros −1 and 3: sum = 2, product = −3 → p(x) = x² − 2x − 3." },
    { id: "ch2-q15", type: "competency", topic: "Zeros", diff: "medium", marks: 2, q: "The product of the two zeros of the quadratic polynomial kx² + 5x − 10 is −5. Find the value of k.", answer: "k = 2", explain: "Product of zeros = c/a = −10/k. Given −10/k = −5 ⇒ k = 2." }
  ],
  revision: {
    points: [
      "Zeros = x-intercepts of y = p(x); degree n polynomial has at most n zeros.",
      "Quadratic ax² + bx + c: sum of zeros = −b/a, product = c/a.",
      "Cubic ax³ + bx² + cx + d: α+β+γ = −b/a, αβ+βγ+γα = c/a, αβγ = −d/a.",
      "Quadratic from zeros: x² − (sum)x + product.",
      "Division algorithm: p(x) = g(x)·q(x) + r(x), with r = 0 or deg r < deg g.",
      "Parabola opens up for a > 0, down for a < 0."
    ],
    mistakes: [
      "Wrong signs in sum/product: sum is −b/a (note the minus), product is c/a.",
      "For the cubic product αβγ = −d/a — the minus sign is often missed.",
      "Counting the y-intercept as a 'zero' — zeros come only from x-axis crossings.",
      "Not arranging polynomial terms in descending degree before division."
    ],
    tricks: [
      "If one zero is given for a quadratic, use sum = −b/a to get the other instantly.",
      "If product of zeros is negative, the two zeros have opposite signs."
    ]
  }
});
