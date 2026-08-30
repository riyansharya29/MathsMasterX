/* Chapter 5 — Arithmetic Progressions (CBSE Class 10) */
MMX.registerChapter({
  id: "arithmetic-progressions",
  name: "Arithmetic Progressions",
  icon: "🔗",
  concepts: [
    { h: "What is an AP?", p: "An arithmetic progression (AP) is a list of numbers in which each term after the first is obtained by **adding a fixed number** d, called the common difference.\n\na, a+d, a+2d, a+3d, …\nThe difference d can be positive, negative or zero." },
    { h: "nth term", p: "The nth term of an AP with first term a and common difference d is:\n**aₙ = a + (n − 1)d**\nIt is also called the general term." },
    { h: "Sum of first n terms", p: "**Sₙ = n/2 [2a + (n − 1)d]**\nEquivalently, using the last term l:\n**Sₙ = n/2 (a + l)**" },
    { h: "Key properties", p: "• aₙ = Sₙ − Sₙ₋₁ (nth term from sums)\n• Three consecutive terms in AP: a − d, a, a + d\n• Four consecutive terms: a − 3d, a − d, a + d, a + 3d (common difference 2d)" },
    { h: "Recognising an AP", p: "A sequence is an AP if the difference between consecutive terms is constant:\na₂ − a₁ = a₃ − a₂ = a₄ − a₃ = … = d." }
  ],
  formulas: [
    { id: "ch5-f1", name: "nth term of an AP", cat: "Algebra", expr: "aₙ = a + (n − 1)d", vars: "a = first term, d = common difference, n = term number", explain: "Gives any term directly without listing the AP.", example: "AP 3, 7, 11,…: a₁₀ = 3 + 9×4 = 39." },
    { id: "ch5-f2", name: "Sum of n terms (form 1)", cat: "Algebra", expr: "Sₙ = n/2 [2a + (n−1)d]", vars: "Use when first term a and difference d are known", explain: "Most commonly used sum formula.", example: "Sum of first 20 terms of 1, 4, 7,…: S₂₀ = 20/2 [2 + 19×3] = 10 × 59 = 590." },
    { id: "ch5-f3", name: "Sum of n terms (form 2)", cat: "Algebra", expr: "Sₙ = n/2 (a + l)", vars: "l = last term", explain: "Handy when the last term is known or asked.", example: "Sum 5 + 10 + … + 50: n = 10 terms (l = 50, a = 5) → S = 10/2 (5 + 50) = 275." },
    { id: "ch5-f4", name: "Term from sums", cat: "Algebra", expr: "aₙ = Sₙ − Sₙ₋₁", vars: "Sₙ = sum of first n terms", explain: "Recovers the nth term if only the sum formula is given.", example: "If Sₙ = n², then a₁₀ = 100 − 81 = 19." },
    { id: "ch5-f5", name: "Terms count between limits", cat: "Algebra", expr: "n = (l − a)/d + 1", vars: "Number of terms from a to l (AP with difference d)", explain: "Derived from a + (n−1)d = l.", example: "Number of multiples of 5 from 5 to 100: (100−5)/5 + 1 = 20." }
  ],
  examples: [
    {
      id: "ch5-e1", title: "Find the 30th term of the AP 10, 7, 4, …",
      given: "AP: 10, 7, 4, …",
      concept: "aₙ = a + (n − 1)d.",
      steps: [
        { t: "Step 1", x: "a = 10, d = 7 − 10 = −3, n = 30." },
        { t: "Step 2", x: "a₃₀ = 10 + (30 − 1)(−3) = 10 − 87." },
        { t: "Final Answer", x: "a₃₀ = −77.", ans: true }
      ]
    },
    {
      id: "ch5-e2", title: "How many terms give a required sum?",
      given: "How many terms of the AP 24, 21, 18, … must be taken so that their sum is 78?",
      concept: "Set Sₙ = n/2[2a + (n−1)d] equal to the required sum; solve the quadratic and keep valid n.",
      steps: [
        { t: "Step 1", x: "a = 24, d = 21 − 24 = −3." },
        { t: "Step 2", x: "Sₙ = n/2[2(24) + (n−1)(−3)] = n/2[48 − 3n + 3] = n/2(51 − 3n).\nSet equal to 78: n(51 − 3n) = 156 ⇒ 3n² − 51n + 156 = 0 ⇒ n² − 17n + 52 = 0." },
        { t: "Step 3", x: "Factorise: n² − 13n − 4n + 52 = (n − 13)(n − 4) = 0 ⇒ n = 4 or n = 13.\nBoth are valid: S₄ = 4/2(51 − 12) = 2 × 39 = 78 ✓ and S₁₃ = 13/2(51 − 39) = 13/2 × 12 = 78 ✓ (the 5th to 13th terms add to zero, so both answers exist)." },
        { t: "Final Answer", x: "n = 4 terms or n = 13 terms.", ans: true }
      ]
    },
    {
      id: "ch5-e3", title: "Sum of first n positive integers",
      given: "Find 1 + 2 + 3 + … + 100.",
      concept: "AP with a = 1, d = 1, l = 100.",
      steps: [
        { t: "Step 1", x: "This is an AP with a = 1, l = 100, n = 100." },
        { t: "Step 2", x: "S₁₀₀ = 100/2 (1 + 100) = 50 × 101." },
        { t: "Final Answer", x: "S = 5050.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch5-q1", type: "mcq", topic: "Common difference", diff: "easy", marks: 1, q: "The common difference of the AP 1/p, (1−p)/p, (1−2p)/p, … is:", options: ["p", "−p", "−1", "1"], answer: 2, explain: "d = (1−p)/p − 1/p = (1−p−1)/p = −p/p = −1." },
    { id: "ch5-q2", type: "mcq", topic: "nth term", diff: "easy", marks: 1, q: "The 10th term of the AP 5, 8, 11, 14, … is:", options: ["32", "35", "38", "30"], answer: 0, explain: "a₁₀ = 5 + 9 × 3 = 32." },
    { id: "ch5-q3", type: "mcq", topic: "nth term", diff: "medium", marks: 1, q: "In an AP if a = 7 and d = 3, the 8th term is:", options: ["28", "21", "18", "31"], answer: 0, explain: "Using aₙ = a + (n−1)d with n = 8: a₈ = 7 + (8−1)×3 = 7 + 21 = 28." },
    { id: "ch5-q4", type: "mcq", topic: "Sum", diff: "medium", marks: 1, q: "The sum of first 20 natural numbers is:", options: ["210", "200", "420", "190"], answer: 0, explain: "S = n(n+1)/2 = 20 × 21/2 = 210." },
    { id: "ch5-q5", type: "mcq", topic: "Sum", diff: "medium", marks: 1, q: "The sum of first 16 terms of the AP 10, 6, 2, … is:", options: ["−320", "320", "−352", "−400"], answer: 0, explain: "a = 10, d = −4. S₁₆ = 16/2 [20 + 15(−4)] = 8 [20 − 60] = 8(−40) = −320." },
    { id: "ch5-q6", type: "mcq", topic: "nth term", diff: "easy", marks: 1, q: "Which term of the AP 21, 18, 15, … is −81?", options: ["35th", "34th", "36th", "33rd"], answer: 0, explain: "a + (n−1)d = −81 ⇒ 21 + (n−1)(−3) = −81 ⇒ −3(n−1) = −102 ⇒ n − 1 = 34 ⇒ n = 35." },
    { id: "ch5-q7", type: "ar", topic: "Sum", diff: "medium", marks: 1, q: "**Assertion (A):** The sum of the first n even natural numbers is n(n + 1).\n**Reason (R):** The even natural numbers 2, 4, 6, … form an AP with a = 2, d = 2, and Sₙ = n/2[2a + (n−1)d].", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "Sₙ = n/2[4 + (n−1)·2] = n/2(2n + 2) = n(n + 1). So A is true and R directly gives it." },
    { id: "ch5-q8", type: "vsa", topic: "Common difference", diff: "easy", marks: 1, q: "Find the common difference of the AP 1/3, (1−3b)/3, (1−6b)/3, …", answer: "−b", explain: "d = (1−3b)/3 − 1/3 = −3b/3 = −b." },
    { id: "ch5-q9", type: "vsa", topic: "nth term", diff: "medium", marks: 1, q: "Find the number of terms in the AP 18, 15½, 13, …, −47.", answer: "27 terms", explain: "d = −5/2. a + (n−1)d = −47 ⇒ 18 + (n−1)(−5/2) = −47 ⇒ (n−1)(−5/2) = −65 ⇒ n−1 = 26 ⇒ n = 27." },
    { id: "ch5-q10", type: "sa", topic: "nth term", diff: "medium", marks: 2, q: "Which term of the AP 3, 8, 13, 18, … is 78?", answer: "16th term", explain: "a = 3, d = 5. 3 + (n−1)5 = 78 ⇒ 5(n−1) = 75 ⇒ n−1 = 15 ⇒ n = 16." },
    { id: "ch5-q11", type: "sa", topic: "Sum", diff: "medium", marks: 2, q: "Find the sum of first 25 terms of an AP where a = 7 and d = 3.", answer: "1075", explain: "S₂₅ = 25/2 [2(7) + 24×3] = 25/2 [14 + 72] = 25/2 × 86 = 25 × 43 = 1075." },
    { id: "ch5-q12", type: "sa", topic: "nth term", diff: "medium", marks: 2, q: "Find the 20th term from the last of the AP 3, 8, 13, …, 253.", answer: "158", explain: "Reverse the AP: 253, 248, … with d = −5. 20th term = 253 + 19(−5) = 253 − 95 = 158." },
    { id: "ch5-q13", type: "la", topic: "Sum", diff: "medium", marks: 3, q: "How many terms of the AP 24, 21, 18, … must be taken so that their sum is 78?", answer: "n = 4 or n = 13", explain: "a = 24, d = −3.\nSₙ = n/2[48 + (n−1)(−3)] = 78 ⇒ n(51 − 3n) = 156 ⇒ 3n² − 51n + 156 = 0 ⇒ n² − 17n + 52 = 0 ⇒ (n−4)(n−13) = 0.\nBoth n = 4 and n = 13 are valid: the sum of terms 5 to 13 is 0, so adding them doesn't change the total. Check S₄ = 4/2(48−9) = 2×39 = 78 ✓; S₁₃ = 13/2(48−36) = 13/2×12 = 78 ✓." },
    { id: "ch5-q14", type: "la", topic: "Word problem", diff: "hard", marks: 3, q: "In an AP, the 17th term is 7 more than the 10th term. Find the common difference.", answer: "d = 1", explain: "a₁₇ = a + 16d; a₁₀ = a + 9d.\nGiven a₁₇ − a₁₀ = 7 ⇒ 7d = 7 ⇒ d = 1." },
    { id: "ch5-q15", type: "case", topic: "Word problem", diff: "medium", marks: 4, q: "200 logs are stacked so that the bottom row has 20 logs, the row above has 19, then 18, and so on. [Practice Question]\n\n(i) Number of logs in the top row and number of rows, so that all 200 logs are used, are:\n(ii) How many logs are in the top row?", options: ["16 rows; 5 logs in top row", "15 rows; 6 logs in top row", "16 rows; 6 logs in top row", "20 rows; 1 log in top row"], answer: 0, explain: "Logs: 20, 19, 18, … (AP a = 20, d = −1).\nSₙ = n/2[40 − (n−1)] = 200 ⇒ n(41 − n) = 400 ⇒ n² − 41n + 400 = 0 ⇒ (n − 16)(n − 25) = 0.\nn = 25 would need terms going to 20 + 24(−1) = −4 (impossible), so n = 16. Top row = a₁₆ = 20 + 15(−1) = 5 logs." },
    { id: "ch5-q16", type: "case", topic: "Word problem", diff: "medium", marks: 4, q: "A TV manufacturer produced 600 TVs in the 3rd year and 700 TVs in the 7th year. Production increases by a fixed number each year (AP). [Practice Question]\n\n(i) Production in the 1st year is:\n(ii) Production in the 10th year is:", options: ["(i) 550  (ii) 775", "(i) 600  (ii) 750", "(i) 500  (ii) 800", "(i) 550  (ii) 800"], answer: 0, explain: "a₃ = a + 2d = 600; a₇ = a + 6d = 700. Subtract: 4d = 100 ⇒ d = 25. Then a = 600 − 50 = 550.\na₁₀ = 550 + 9×25 = 550 + 225 = 775." },
    { id: "ch5-q17", type: "competency", topic: "Sum", diff: "hard", marks: 2, q: "If Sₙ of an AP is 4n − n², find (i) the first term, (ii) the sum of first two terms, (iii) the second term.", answer: "a₁ = 3, S₂ = 4, a₂ = 1", explain: "S₁ = 4(1) − 1 = 3 → a₁ = 3. S₂ = 8 − 4 = 4. a₂ = S₂ − S₁ = 4 − 3 = 1. (d = −2; AP: 3, 1, −1, …)" }
  ],
  revision: {
    points: [
      "AP: a, a+d, a+2d, … — constant difference between consecutive terms.",
      "nth term: aₙ = a + (n−1)d.",
      "Sum: Sₙ = n/2[2a + (n−1)d] = n/2(a + l).",
      "aₙ = Sₙ − Sₙ₋₁.",
      "Number of terms from a to l: n = (l − a)/d + 1.",
      "Three consecutive AP terms: a−d, a, a+d; four: a−3d, a−d, a+d, a+3d."
    ],
    mistakes: [
      "Using n instead of (n − 1) in aₙ = a + (n−1)d — most common error.",
      "Sign mistakes when d is negative (e.g. decreasing APs).",
      "Forgetting to reject non-positive/non-integer values of n in sum word problems (like log stacking).",
      "Confusing the two sum forms: n/2(a + l) needs the LAST term l."
    ],
    tricks: [
      "'nth term from the last' → reverse the AP and use d with opposite sign.",
      "When sum of consecutive terms is given with no starting term, assume three terms as a−d, a, a+d to simplify (d cancels in the sum)."
    ]
  }
});
