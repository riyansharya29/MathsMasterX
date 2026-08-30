/* Chapter 1 — Real Numbers (CBSE Class 10) */
MMX.registerChapter({
  id: "real-numbers",
  name: "Real Numbers",
  icon: "🔢",
  concepts: [
    { h: "Euclid's Division Lemma", p: "For any two positive integers a (dividend) and b (divisor), there exist unique whole numbers q and r such that:\n**a = bq + r,  0 ≤ r < b**\nEuclid's Division Algorithm repeats this lemma to find the HCF of two numbers: divide, replace (a,b) by (b,r), until r = 0. The last divisor is the HCF." },
    { h: "Fundamental Theorem of Arithmetic", p: "Every composite number can be expressed (factorised) as a product of primes, and this factorisation is **unique**, apart from the order in which the prime factors occur.\n\n• HCF = product of the **smallest** power of each common prime factor.\n• LCM = product of the **greatest** power of every prime factor appearing in either number." },
    { h: "HCF × LCM Relation", p: "For any two positive integers a and b:\n**HCF(a,b) × LCM(a,b) = a × b**\nSo LCM(a,b) = (a × b) ÷ HCF(a,b). This relation works for two numbers; for three or more numbers use prime factorisation directly." },
    { h: "Irrational Numbers", p: "A number is irrational if it cannot be written as p/q (p,q integers, q ≠ 0). \n**Theorem:** If a prime p divides a², then p divides a. Using this and contradiction we prove √2, √3, √5, √p are irrational for every prime p.\nSums/products like 2 + √3, 5 − √7, 3√2 are also irrational." },
    { h: "Where Euclid's algorithm is used", p: "HCF-based real-life problems: arranging items in the maximum equal number of rows/columns, finding the largest number that divides given numbers leaving fixed remainders, minimum distance covered in complete steps (= LCM), and so on." }
  ],
  formulas: [
    { id: "ch1-f1", name: "Euclid's Division Lemma", cat: "Numbers", expr: "a = bq + r,   0 ≤ r < b", vars: "a = dividend, b = divisor, q = quotient, r = remainder", explain: "The remainder is always smaller than the divisor. Repeated use gives the HCF (Division Algorithm).", example: "Divide 225 by 135: 225 = 135×1 + 90, then 135 = 90×1 + 45, then 90 = 45×2 + 0 → HCF = 45." },
    { id: "ch1-f2", name: "Prime Factorisation for HCF", cat: "Numbers", expr: "HCF = product of lowest powers of common primes", vars: "e.g. 12 = 2²·3, 18 = 2·3² → common lowest powers: 2¹·3¹", explain: "Take each prime that appears in BOTH numbers and use its smaller exponent.", example: "HCF(12, 18) = 2 × 3 = 6." },
    { id: "ch1-f3", name: "Prime Factorisation for LCM", cat: "Numbers", expr: "LCM = product of highest powers of all primes", vars: "Take every prime appearing in either factorisation with its larger exponent.", explain: "The LCM is the smallest number divisible by both numbers.", example: "12 = 2²·3, 18 = 2·3² → LCM = 2²·3² = 36." },
    { id: "ch1-f4", name: "HCF–LCM Product Relation", cat: "Numbers", expr: "HCF(a,b) × LCM(a,b) = a × b", vars: "a, b are two positive integers", explain: "Lets you find the LCM instantly when HCF is known (or vice versa).", example: "HCF(26, 91) = 13, so LCM = (26 × 91)/13 = 2 × 91 = 182." },
    { id: "ch1-f5", name: "Irrationality of √p", cat: "Numbers", expr: "√p is irrational for every prime p", vars: "p = prime number (2, 3, 5, 7, …)", explain: "Proved by contradiction: assume √p = a/b in lowest terms; then p divides a², hence p divides a; writing a = pc leads to p dividing b too — contradiction.", example: "√2, √3 and √5 are all irrational; √4 = 2 is rational because 4 is a perfect square, not prime." }
  ],
  examples: [
    {
      id: "ch1-e1", title: "HCF of 867 and 255 by Euclid's algorithm",
      given: "Two numbers 867 and 255. Find their HCF.",
      concept: "Euclid's Division Algorithm: keep dividing divisor by remainder until remainder is 0.",
      steps: [
        { t: "Step 1", x: "867 = 255 × 3 + 102   (remainder 102 ≠ 0)" },
        { t: "Step 2", x: "255 = 102 × 2 + 51   (remainder 51 ≠ 0)" },
        { t: "Step 3", x: "102 = 51 × 2 + 0   (remainder 0 → stop)" },
        { t: "Final Answer", x: "HCF (867, 255) = 51 (the last non-zero divisor).", ans: true }
      ]
    },
    {
      id: "ch1-e2", title: "HCF and LCM of 12, 15 and 21",
      given: "Three numbers: 12, 15, 21.",
      concept: "Fundamental Theorem of Arithmetic — prime factorisation.",
      steps: [
        { t: "Step 1", x: "12 = 2² × 3\n15 = 3 × 5\n21 = 3 × 7" },
        { t: "Step 2", x: "HCF = product of common primes with lowest power = 3¹ = 3." },
        { t: "Step 3", x: "LCM = product of highest powers of all primes = 2² × 3 × 5 × 7 = 420." },
        { t: "Final Answer", x: "HCF = 3,  LCM = 420.", ans: true }
      ]
    },
    {
      id: "ch1-e3", title: "Prove that √2 is irrational",
      given: "Assume √2 is rational.",
      concept: "Proof by contradiction + theorem: if prime p divides a² then p divides a.",
      steps: [
        { t: "Step 1", x: "Assume √2 = a/b where a, b are coprime positive integers, b ≠ 0. Squaring: 2 = a²/b²  ⇒  a² = 2b². So 2 divides a², hence 2 divides a." },
        { t: "Step 2", x: "Write a = 2c. Then (2c)² = 2b² ⇒ 4c² = 2b² ⇒ b² = 2c². So 2 divides b², hence 2 divides b." },
        { t: "Step 3", x: "Thus 2 divides both a and b — contradicting that a and b are coprime. The assumption is false." },
        { t: "Final Answer", x: "√2 is irrational.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch1-q1", type: "mcq", topic: "HCF by Euclid", diff: "easy", marks: 1, q: "The HCF of 96 and 404 is:", options: ["4", "6", "8", "12"], answer: 0, explain: "96 = 2⁵ × 3 and 404 = 2² × 101. HCF = 2² = 4. (Euclid: 404 = 96×4 + 20; 96 = 20×4 + 16; 20 = 16×1 + 4; 16 = 4×4 + 0.)" },
    { id: "ch1-q2", type: "mcq", topic: "HCF–LCM relation", diff: "easy", marks: 1, q: "If HCF (90, 144) = 18, then LCM (90, 144) is:", options: ["720", "360", "1440", "540"], answer: 0, explain: "LCM = (90 × 144)/18 = 12960/18 = 720." },
    { id: "ch1-q3", type: "mcq", topic: "Divisibility", diff: "medium", marks: 1, q: "n² − 1 is divisible by 8 when n is:", options: ["an odd integer", "an even integer", "a prime number", "any natural number"], answer: 0, explain: "Let n = 2k+1 (odd). Then n² − 1 = (2k+1)² − 1 = 4k(k+1). Since k and k+1 are consecutive, k(k+1) is even, so 4 × even = multiple of 8." },
    { id: "ch1-q4", type: "mcq", topic: "LCM", diff: "easy", marks: 1, q: "The LCM of the smallest prime number and the smallest composite number is:", options: ["2", "4", "6", "8"], answer: 1, explain: "Smallest prime = 2; smallest composite = 4. LCM(2, 4) = 4." },
    { id: "ch1-q5", type: "mcq", topic: "Prime factorisation", diff: "medium", marks: 1, q: "The number 156 expressed as a product of primes is:", options: ["2² × 3 × 13", "2 × 3² × 13", "2² × 39", "4 × 3 × 13"], answer: 0, explain: "156 = 2 × 78 = 2 × 2 × 39 = 2² × 3 × 13. (Option 4 is not a prime factorisation since 4 is composite.)" },
    { id: "ch1-q6", type: "mcq", topic: "Irrational numbers", diff: "easy", marks: 1, q: "Which of the following is irrational?", options: ["√49", "√(9/16)", "√12", "0.25"], answer: 2, explain: "√49 = 7 (rational); √(9/16) = 3/4 (rational); 0.25 = 1/4 (rational). √12 = 2√3 and √3 is irrational, so √12 is irrational." },
    { id: "ch1-q7", type: "mcq", topic: "HCF–LCM relation", diff: "medium", marks: 1, q: "If HCF of two numbers is 4 and their product is 9600, their LCM is:", options: ["2400", "960", "4800", "3200"], answer: 0, explain: "HCF × LCM = product ⇒ LCM = 9600/4 = 2400." },
    { id: "ch1-q8", type: "ar", topic: "Irrational numbers", diff: "medium", marks: 1, q: "**Assertion (A):** √5 is an irrational number.\n**Reason (R):** The square root of every prime number is irrational.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "5 is prime and √p is irrational for every prime p (proved by contradiction). So R is true and it directly explains A." },
    { id: "ch1-q9", type: "ar", topic: "LCM", diff: "easy", marks: 1, q: "**Assertion (A):** LCM of two distinct prime numbers p and q is pq.\n**Reason (R):** Two distinct primes have HCF 1.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "Primes share no common factor, so HCF(p,q) = 1 and LCM = pq/1 = pq. R explains A." },
    { id: "ch1-q10", type: "vsa", topic: "Euclid's algorithm", diff: "easy", marks: 1, q: "Find the HCF of 135 and 225 using Euclid's division algorithm.", answer: "45", explain: "225 = 135×1 + 90; 135 = 90×1 + 45; 90 = 45×2 + 0. HCF = 45." },
    { id: "ch1-q11", type: "vsa", topic: "HCF–LCM relation", diff: "easy", marks: 1, q: "Given HCF (306, 657) = 9, find LCM (306, 657).", answer: "22338", explain: "LCM = (306 × 657)/9 = 201042/9 = 22338." },
    { id: "ch1-q12", type: "vsa", topic: "Fundamental theorem", diff: "easy", marks: 1, q: "Find the largest number which on dividing 70 and 125 leaves remainders 5 and 8 respectively.", answer: "13", explain: "The number divides (70 − 5) = 65 and (125 − 8) = 117 exactly. HCF(65, 117): 117 = 65×1 + 52; 65 = 52×1 + 13; 52 = 13×4 + 0 ⇒ HCF = 13." },
    { id: "ch1-q13", type: "sa", topic: "Irrational numbers", diff: "medium", marks: 2, q: "Prove that 2 + √3 is irrational.", answer: "2 + √3 is irrational", explain: "Assume 2 + √3 = a/b (rational). Then √3 = a/b − 2 = (a − 2b)/b, which is rational (difference/quotient of integers). But √3 is irrational — contradiction. Hence 2 + √3 is irrational." },
    { id: "ch1-q14", type: "sa", topic: "HCF & LCM", diff: "medium", marks: 2, q: "Find HCF and LCM of 26 and 91 and verify that HCF × LCM = product of the numbers.", answer: "HCF = 13, LCM = 182", explain: "26 = 2 × 13; 91 = 7 × 13. HCF = 13; LCM = 2 × 7 × 13 = 182. Check: 13 × 182 = 2366 and 26 × 91 = 2366. ✓" },
    { id: "ch1-q15", type: "sa", topic: "Fundamental theorem", diff: "medium", marks: 2, q: "Check whether 4ⁿ can end with the digit 0 for any natural number n.", answer: "No, 4ⁿ can never end in 0", explain: "If 4ⁿ ended in 0 it would be divisible by 5, so its prime factorisation would contain 5. But 4ⁿ = (2²)ⁿ = 2²ⁿ, which contains no factor 5. Hence 4ⁿ never ends in 0." },
    { id: "ch1-q16", type: "la", topic: "Euclid's algorithm", diff: "medium", marks: 3, q: "An army contingent of 616 members is to march behind an army band of 32 members in a parade. The two groups are to march in the same number of columns. What is the maximum number of columns in which they can march?", answer: "8 columns", explain: "Maximum columns = HCF(616, 32).\n616 = 32 × 19 + 8\n32 = 8 × 4 + 0\nHCF = 8. So they can march in at most 8 columns." },
    { id: "ch1-q17", type: "case", topic: "LCM application", diff: "medium", marks: 4, q: "Three persons A, B and C start jogging together. Their steps measure 30 cm, 36 cm and 40 cm respectively. Each one wants to cover the same distance in complete steps. [Practice Question]\n\nWhat is the minimum distance each should jog so that all can cover the distance in complete steps?", options: ["360 cm", "720 cm", "180 cm", "1200 cm"], answer: 0, explain: "Minimum distance = LCM(30, 36, 40).\n30 = 2×3×5; 36 = 2²×3²; 40 = 2³×5.\nLCM = 2³ × 3² × 5 = 8 × 9 × 5 = 360 cm." },
    { id: "ch1-q18", type: "case", topic: "HCF application", diff: "medium", marks: 4, q: "A sweet seller has 420 kaju barfis and 130 badam barfis. She wants to stack them so that each stack has the same number of barfis of one kind, and they take up the least area of the tray. [Practice Question]\n\nWhat is the number of barfis each stack can hold?", options: ["10", "13", "20", "30"], answer: 0, explain: "Number per stack = HCF(420, 130).\n420 = 130×3 + 30; 130 = 30×4 + 10; 30 = 10×3 + 0.\nHCF = 10. Each stack holds 10 barfis (42 stacks of kaju, 13 stacks of badam)." }
  ],
  revision: {
    points: [
      "Euclid's division lemma: a = bq + r, 0 ≤ r < b; HCF found by repeating it (last non-zero remainder).",
      "Fundamental Theorem of Arithmetic: prime factorisation of every composite number is unique.",
      "HCF = smallest powers of common primes; LCM = highest powers of all primes.",
      "HCF(a,b) × LCM(a,b) = a × b (valid for TWO numbers).",
      "√p is irrational for every prime p; hence 2 + √3, 5√2, etc. are irrational.",
      "HCF problems: maximum equal stacks/columns, largest divisor with remainders. LCM problems: minimum distance in complete steps, simultaneous events."
    ],
    mistakes: [
      "Forgetting that the remainder must satisfy r < b at every step.",
      "Using HCF × LCM = product for three numbers — it is not valid for 3+ numbers; use prime factorisation.",
      "Claiming √9 is irrational — √9 = 3 is rational; only square roots of non-perfect squares (or primes) are irrational.",
      "Mixing up HCF (lowest powers) with LCM (highest powers)."
    ],
    tricks: [
      "HCF of two numbers never exceeds the smaller number; LCM is never smaller than the larger number.",
      "If 'maximum/largest/greatest' appears in an arrangement problem, think HCF. If 'minimum/smallest distance or time so events coincide' appears, think LCM."
    ]
  }
});
