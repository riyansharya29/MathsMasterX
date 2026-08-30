/* Chapter 13 — Statistics (CBSE Class 10) */
MMX.registerChapter({
  id: "statistics",
  name: "Statistics",
  icon: "📊",
  concepts: [
    { h: "Mean of grouped data", p: "For grouped frequency distributions (class intervals with frequencies fᵢ):\n• **Direct method**: x̄ = Σ(fᵢxᵢ)/Σfᵢ, where xᵢ = class mark = (lower + upper)/2.\n• **Assumed-mean method**: x̄ = a + Σ(fᵢdᵢ)/Σfᵢ, dᵢ = xᵢ − a.\n• **Step-deviation method**: x̄ = a + h·Σ(fᵢuᵢ)/Σfᵢ, uᵢ = (xᵢ − a)/h. (Use when class size h is equal.)" },
    { h: "Mode of grouped data", p: "The modal class is the class with the maximum frequency:\n**Mode = l + [(f₁ − f₀)/(2f₁ − f₀ − f₂)] × h**\nl = lower limit of modal class, h = class size, f₁ = modal class frequency, f₀ = frequency of preceding class, f₂ = frequency of succeeding class." },
    { h: "Median of grouped data", p: "The median class is the class containing the (n/2)th observation (cumulative frequency crosses n/2):\n**Median = l + [(n/2 − cf)/f] × h**\nwhere cf = cumulative frequency before the median class, f = median class frequency." },
    { h: "Empirical relation", p: "**3 Median = Mode + 2 Mean**\nUsed to estimate one measure when the other two are known." },
    { h: "Cumulative frequency & ogive", p: "Cumulative frequency distributions are drawn as ogives:\n• 'Less than' ogive: plot upper limits vs cumulative frequency (rising curve).\n• 'More than' ogive: plot lower limits vs cumulative frequency (falling curve).\nThe **median is read from the x-coordinate where the two ogives intersect** (at cumulative frequency n/2)." }
  ],
  formulas: [
    { id: "ch13-f1", name: "Mean — direct method", cat: "Statistics", expr: "x̄ = Σ(fᵢxᵢ)/Σfᵢ", vars: "xᵢ = class mark = (lower+upper)/2", explain: "Simplest when fᵢxᵢ products are small.", example: "Classes 0-10,10-20 with f 3,5: xᵢ = 5,15; mean = (15+75)/8 = 11.25." },
    { id: "ch13-f2", name: "Mean — step deviation", cat: "Statistics", expr: "x̄ = a + h·[Σfᵢuᵢ/Σfᵢ],  uᵢ = (xᵢ−a)/h", vars: "a = assumed mean, h = common class width", explain: "Keeps numbers small; best for many equal-width classes.", example: "Choose a near the middle class, u values …, −2,−1,0,1,2,…" },
    { id: "ch13-f3", name: "Mode (grouped)", cat: "Statistics", expr: "Mode = l + [(f₁−f₀)/(2f₁−f₀−f₂)]·h", vars: "Modal class: f₁; previous f₀; next f₂", explain: "The modal class simply has the highest frequency; the formula locates the mode inside it.", example: "l=20, h=10, f₁=18, f₀=7, f₂=10 → Mode = 20 + (11/19)×10 ≈ 25.79." },
    { id: "ch13-f4", name: "Median (grouped)", cat: "Statistics", expr: "Median = l + [(n/2 − cf)/f]·h", vars: "cf = cumulative frequency before median class; f = its frequency", explain: "Find n/2 first, then the class whose cumulative frequency first reaches it.", example: "n = 50 → n/2 = 25; the class where cf crosses 25 is the median class." },
    { id: "ch13-f5", name: "Empirical relation", cat: "Statistics", expr: "3 Median = Mode + 2 Mean", vars: "Holds approximately for moderately skewed data", explain: "Quick conversion between the three measures.", example: "Mean = 50, Mode = 41 → Median = (41 + 100)/3 = 47." }
  ],
  examples: [
    {
      id: "ch13-e1", title: "Mean by direct method",
      given: "Find the mean for: marks 0-10 (f=3), 10-20 (f=5), 20-30 (f=7), 30-40 (f=5).",
      concept: "Use class marks xᵢ = 5, 15, 25, 35.",
      steps: [
        { t: "Step 1", x: "Σfᵢ = 3+5+7+5 = 20." },
        { t: "Step 2", x: "fᵢxᵢ = 3×5, 5×15, 7×25, 5×35 = 15, 75, 175, 175; Σfᵢxᵢ = 440." },
        { t: "Final Answer", x: "Mean = 440/20 = 22 marks.", ans: true }
      ]
    },
    {
      id: "ch13-e2", title: "Mode of grouped data",
      given: "Class 20-30 has the highest frequency 18; preceding class frequency 7; succeeding 10. Find mode.",
      concept: "Mode = l + [(f₁−f₀)/(2f₁−f₀−f₂)]h.",
      steps: [
        { t: "Step 1", x: "l = 20, h = 10, f₁ = 18, f₀ = 7, f₂ = 10." },
        { t: "Step 2", x: "Mode = 20 + [(18−7)/(36−7−10)] × 10 = 20 + (11/19) × 10 = 20 + 110/19." },
        { t: "Final Answer", x: "Mode = 20 + 5.79 = 25.79.", ans: true }
      ]
    },
    {
      id: "ch13-e3", title: "Median of grouped data",
      given: "n = 60; median class 20-30 with f = 24 and cf before it = 17. Find median.",
      concept: "Median = l + [(n/2 − cf)/f]h.",
      steps: [
        { t: "Step 1", x: "n/2 = 30; l = 20, h = 10, cf = 17, f = 24." },
        { t: "Step 2", x: "Median = 20 + [(30 − 17)/24] × 10 = 20 + (13/24) × 10 = 20 + 65/12." },
        { t: "Final Answer", x: "Median ≈ 20 + 5.42 = 25.42.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch13-q1", type: "mcq", topic: "Mean", diff: "easy", marks: 1, q: "The mean of 10, 20, 30, 40, 50 is:", options: ["30", "25", "35", "20"], answer: 0, explain: "(10+20+30+40+50)/5 = 150/5 = 30." },
    { id: "ch13-q2", type: "mcq", topic: "Mode formula", diff: "medium", marks: 1, q: "In the mode formula, f₁ represents:", options: ["frequency of the modal class", "frequency before modal class", "frequency after modal class", "total frequency"], answer: 0, explain: "f₁ = frequency of the modal class; f₀ = class before, f₂ = class after." },
    { id: "ch13-q3", type: "mcq", topic: "Median class", diff: "medium", marks: 1, q: "For n = 100, the median class is the class whose cumulative frequency first exceeds:", options: ["50", "100", "25", "75"], answer: 0, explain: "Median position = n/2 = 50; the class where cf first crosses 50 is the median class." },
    { id: "ch13-q4", type: "mcq", topic: "Empirical relation", diff: "easy", marks: 1, q: "If mean = 50 and mode = 38, the median (using 3 Median = Mode + 2 Mean) is:", options: ["46", "44", "50", "48"], answer: 0, explain: "3 Median = 38 + 100 = 138 → Median = 46." },
    { id: "ch13-q5", type: "mcq", topic: "Ogive", diff: "medium", marks: 1, q: "The x-coordinate of the intersection of the 'less than' and 'more than' ogives gives:", options: ["median", "mean", "mode", "range"], answer: 0, explain: "The ogives meet at height n/2; the corresponding x value is the median." },
    { id: "ch13-q6", type: "mcq", topic: "Class mark", diff: "easy", marks: 1, q: "The class mark of the interval 35-55 is:", options: ["45", "20", "90", "55"], answer: 0, explain: "Class mark = (35 + 55)/2 = 45." },
    { id: "ch13-q7", type: "mcq", topic: "Median", diff: "hard", marks: 1, q: "If median class 10-20 has f = 20, cf = 8 and n = 40, the median is:", options: ["16", "14", "15", "12"], answer: 0, explain: "Median = 10 + [(20 − 8)/20]×10 = 10 + 6 = 16." },
    { id: "ch13-q8", type: "ar", topic: "Mean", diff: "medium", marks: 1, q: "**Assertion (A):** The step-deviation method gives the same mean as the direct method.\n**Reason (R):** It is an algebraic rearrangement of the same weighted mean with equal class width h.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "x̄ = a + hΣ(fu)/Σf expands to exactly Σ(fx)/Σf; R explains A." },
    { id: "ch13-q9", type: "vsa", topic: "Mean", diff: "easy", marks: 1, q: "If Σfᵢ = 25 and Σfᵢxᵢ = 100 + 20p... If Σfᵢ = 20 and the mean is 25, find Σfᵢxᵢ.", answer: "500", explain: "Σfᵢxᵢ = mean × Σfᵢ = 25 × 20 = 500." },
    { id: "ch13-q10", type: "vsa", topic: "Empirical relation", diff: "medium", marks: 1, q: "For a distribution, Mean = 14 and Median = 15. Find Mode using the empirical relation.", answer: "Mode = 17", explain: "Mode = 3 Median − 2 Mean = 45 − 28 = 17." },
    { id: "ch13-q11", type: "sa", topic: "Mean", diff: "medium", marks: 2, q: "Find the mean: class 0-20 (f=6), 20-40 (f=8), 40-60 (f=10), 60-80 (f=12), 80-100 (f=4).", answer: "50", explain: "Class marks: 10, 30, 50, 70, 90. Σf = 40.\nfᵢxᵢ = 60, 240, 500, 840, 360 → Σ = 2000.\nMean = 2000/40 = 50." },
    { id: "ch13-q12", type: "sa", topic: "Mode", diff: "medium", marks: 2, q: "Find the mode: classes 10-20 (f=8), 20-30 (f=16), 30-40 (f=36), 40-50 (f=34), 50-60 (f=6).", answer: "≈ 39.09", explain: "Modal class = 30-40 (highest frequency f₁ = 36); l = 30, h = 10, f₀ = 16, f₂ = 34.\nMode = 30 + [(36−16)/(2×36−16−34)]×10 = 30 + [20/(72−50)]×10 = 30 + (20/22)×10 = 30 + 9.09 ≈ 39.09." },
    { id: "ch13-q13", type: "la", topic: "Median", diff: "hard", marks: 3, q: "Find the median: classes 0-10 (f=5), 10-20 (f=8), 20-30 (f=20), 30-40 (f=15), 40-50 (f=7), 50-60 (f=5).", answer: "28.5", explain: "n = 60; n/2 = 30.\nCumulative frequencies: 5, 13, 33, 48, 55, 60. Median class = 20-30 (cf first exceeds 30).\nl = 20, cf = 13, f = 20, h = 10.\nMedian = 20 + [(30 − 13)/20]×10 = 20 + 17/2 = 20 + 8.5 = 28.5." },
    { id: "ch13-q14", type: "case", topic: "Ogive", diff: "medium", marks: 4, q: "A class records weekly study hours of 50 students: hours 0-4 (f=10), 4-8 (f=15), 8-12 (f=20), 12-16 (f=5). [Practice Question]\n\n(i) The cumulative frequency up to the 8-12 class is:\n(ii) The median class is:", options: ["(i) 45  (ii) 4-8", "(i) 45  (ii) 8-12", "(i) 25  (ii) 4-8", "(i) 50  (ii) 8-12"], answer: 1, explain: "cf: up to 0-4 → 10; up to 4-8 → 25; up to 8-12 → 45; up to 12-16 → 50.\nn/2 = 25; the class where cf first exceeds 25 is 8-12 (cf = 45). So median class = 8-12." },
    { id: "ch13-q15", type: "competency", topic: "Mean", diff: "hard", marks: 3, q: "If the mean of the following data is 25, find the missing frequency p: class 0-10 (f=8), 10-20 (f=p), 20-30 (f=20), 30-40 (f=10), 40-50 (f=6).", answer: "p = 6", explain: "Class marks: 5, 15, 25, 35, 45.\nΣf = 44 + p. Σfx = 8×5 + 15p + 20×25 + 10×35 + 6×45 = 40 + 15p + 500 + 350 + 270 = 1160 + 15p.\nMean = 25 ⇒ 1160 + 15p = 25(44 + p) = 1100 + 25p ⇒ 60 = 10p ⇒ p = 6." }
  ],
  revision: {
    points: [
      "Class mark xᵢ = (lower + upper)/2.",
      "Mean: direct Σfx/Σf; assumed mean a + Σfd/Σf; step deviation a + hΣfu/Σf.",
      "Mode (grouped): l + [(f₁−f₀)/(2f₁−f₀−f₂)]h with modal class = highest frequency class.",
      "Median: l + [(n/2 − cf)/f]h with median class where cf first crosses n/2.",
      "Empirical: 3 Median = Mode + 2 Mean.",
      "Ogive: 'less than' (upper limits) rises; 'more than' (lower limits) falls; their intersection's x-coordinate = median."
    ],
    mistakes: [
      "Using n instead of n/2 to locate the median class.",
      "Confusing f₀/f₁/f₂ order in the mode formula (f₁ is the modal class).",
      "Forgetting to multiply the bracket fraction by class width h.",
      "Step-deviation uᵢ = (xᵢ − a)/h must use the common class width; using unequal widths invalidates it."
    ],
    tricks: [
      "Pick a as the class mark of the middle class for step-deviation — keeps u values small and symmetric.",
      "Modal class is simply the highest-frequency class — find it before applying the formula.",
      "Median mode/mean relation can verify answers: mean ≈ mode ≈ median for symmetric data; mean drifts farthest in skewed data."
    ]
  }
});
