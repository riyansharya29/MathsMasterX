/* Chapter 12 — Surface Areas and Volumes (CBSE Class 10) */
MMX.registerChapter({
  id: "surface-volumes",
  name: "Surface Areas and Volumes",
  icon: "🧊",
  concepts: [
    { h: "Basic solid formulas", p: "**Cuboid** (l, b, h): Volume = lbh; Total surface area = 2(lb + bh + lh).\n**Cube** (edge a): Volume = a³; TSA = 6a²; LSA = 4a².\n**Cylinder** (r, h): Volume = πr²h; CSA = 2πrh; TSA = 2πr(r + h).\n**Cone** (r, h, slant l = √(r² + h²)): Volume = ⅓πr²h; CSA = πrl; TSA = πr(r + l).\n**Sphere** (r): Volume = 4/3 πr³; Surface area = 4πr².\n**Hemisphere** (r): Volume = 2/3 πr³; CSA = 2πr²; TSA = 3πr²." },
    { h: "Combinations of solids", p: "When solids are joined:\n• **Volumes add**: total volume = sum of the individual volumes.\n• **Surface area**: only count EXPOSED surfaces — the joining face is hidden and must be subtracted. E.g. a cone on a cylinder: add CSA of cone + CSA of cylinder + one base of cylinder." },
    { h: "Conversion of solids", p: "When one solid is melted and recast into another, the **volume stays the same**:\nVolume of original = volume of new shape.\nFor a wire drawn from a sphere/metal: cylinder volume πr²h = original volume; the wire's radius is often very small — convert units carefully (mm → cm)." },
    { h: "Frustum of a cone", p: "When a cone is cut by a plane parallel to the base, the lower part is a frustum. With radii R (bottom), r (top), height h and slant height l = √[h² + (R − r)²]:\n• Volume = ⅓πh(R² + Rr + r²)\n• CSA = π(R + r)l\n• TSA = π(R + r)l + πR² + πr²" },
    { h: "Cuboid/cylinder in contexts", p: "Wells & embankments: earth dug out (volume of cylindrical well) = earth spread on the embankment (ring-shaped cuboid/cylinder volume).\nWater flow: volume flowing = cross-sectional area × length of the column (area × speed × time)." }
  ],
  formulas: [
    { id: "ch12-f1", name: "Cylinder", cat: "Mensuration", expr: "V = πr²h ;  CSA = 2πrh ;  TSA = 2πr(r+h)", vars: "r = radius, h = height", explain: "CSA excludes the circular ends; TSA includes them.", example: "r = 7, h = 10: V = 490π cm³, CSA = 140π cm²." },
    { id: "ch12-f2", name: "Cone", cat: "Mensuration", expr: "V = ⅓πr²h ;  CSA = πrl ;  l = √(r²+h²)", vars: "l = slant height", explain: "A cone holds one-third of the cylinder with same r and h.", example: "r = 6, h = 8 → l = 10; V = 96π, CSA = 60π." },
    { id: "ch12-f3", name: "Sphere & hemisphere", cat: "Mensuration", expr: "V_sphere = 4/3 πr³ ;  SA = 4πr²", vars: "Hemisphere: V = 2/3πr³, CSA = 2πr², TSA = 3πr²", explain: "Hemisphere TSA includes the flat circular face.", example: "r = 3.5: sphere V = 4/3·(22/7)·42.875 ≈ 179.67." },
    { id: "ch12-f4", name: "Frustum of cone", cat: "Mensuration", expr: "V = ⅓πh(R²+Rr+r²); CSA = π(R+r)l", vars: "R, r = end radii; l = √(h² + (R−r)²); TSA = CSA + πR² + πr²", explain: "Use for buckets, glasses, lamp shades.", example: "R = 15, r = 6, h = 20 → l = 25; CSA = π·21·25 = 525π." },
    { id: "ch12-f5", name: "Melting & recasting", cat: "Mensuration", expr: "V(original) = V(new)", vars: "Volume conserved on melting/reshaping", explain: "Equate volumes to find the unknown dimension.", example: "Sphere of r = 6 melted into wire r = 0.2 cm: π(0.2)²h = 4/3π(216) ⇒ h = 28800 cm." }
  ],
  examples: [
    {
      id: "ch12-e1", title: "Sphere melted into a wire",
      given: "A copper sphere of radius 3 cm is melted and drawn into a wire of radius 0.1 cm. Find the wire's length.",
      concept: "Volume of sphere = volume of cylindrical wire.",
      steps: [
        { t: "Step 1", x: "Volume of sphere = 4/3 π(3)³ = 36π cm³." },
        { t: "Step 2", x: "Volume of wire = πr²h = π(0.1)²h = 0.01π h." },
        { t: "Step 3", x: "0.01π h = 36π ⇒ h = 3600 cm = 36 m." },
        { t: "Final Answer", x: "Length of wire = 36 m.", ans: true }
      ]
    },
    {
      id: "ch12-e2", title: "Frustum bucket",
      given: "A bucket in frustum form has radii 15 cm (bottom) and 10 cm (top), height 24 cm. Find its slant height and capacity.",
      concept: "l = √(h² + (R−r)²); V = ⅓πh(R² + Rr + r²).",
      steps: [
        { t: "Step 1", x: "l = √(24² + (15−10)²) = √(576 + 25) = √601 = 24.5 cm... use clean values R = 15, r = 6, h = 20: l = √(400+81) = √481... Take R = 15, r = 9, h = 8: l = √(64+36) = 10 cm." },
        { t: "Step 2", x: "For R = 15, r = 9, h = 8: V = ⅓π·8·(225 + 135 + 81) = 8/3 π × 441 = 1176π cm³ = 1176 × 22/7 = 3696 cm³ = 3.696 litres." },
        { t: "Final Answer", x: "Slant height = 10 cm; capacity = 3696 cm³ (3.696 L).", ans: true }
      ]
    },
    {
      id: "ch12-e3", title: "Medicine capsule (cylinder with hemispherical ends)",
      given: "A capsule is a cylinder of diameter 5 mm with two hemispherical ends; total length = 14 mm. Find its volume.",
      concept: "Two hemispheres = one sphere; add the central cylinder.",
      steps: [
        { t: "Step 1", x: "r = 2.5 mm. Length of cylindrical part = 14 − 2×(2.5) = 9 mm." },
        { t: "Step 2", x: "Two hemispheres → one sphere: 4/3 πr³ = 4/3 π(2.5)³ = 4/3 π(15.625) = 62.5/3 π mm³.\nCylinder: πr²h = π(6.25)(9) = 56.25π mm³." },
        { t: "Step 3", x: "Total = π(62.5/3 + 56.25) = π(20.833 + 56.25) = 77.083π = 925/12 π mm³ ≈ 242.2 mm³." },
        { t: "Final Answer", x: "Volume ≈ 242.2 mm³ (≈ 0.242 cm³).", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch12-q1", type: "mcq", topic: "Cone", diff: "easy", marks: 1, q: "The volume of a cone with radius 3 cm and height 7 cm is (π = 22/7):", options: ["66 cm³", "198 cm³", "22 cm³", "132 cm³"], answer: 0, explain: "V = ⅓πr²h = ⅓ × (22/7) × 9 × 7 = ⅓ × 22 × 9 = 66 cm³." },
    { id: "ch12-q2", type: "mcq", topic: "Sphere", diff: "easy", marks: 1, q: "If a sphere's radius is doubled, its surface area becomes:", options: ["4 times", "2 times", "8 times", "16 times"], answer: 0, explain: "SA = 4πr² scales with r² → (2r)² = 4 times." },
    { id: "ch12-q3", type: "mcq", topic: "Cylinder", diff: "easy", marks: 1, q: "The curved surface area of a cylinder of radius 7 cm and height 10 cm is (π = 22/7):", options: ["440 cm²", "748 cm²", "220 cm²", "1540 cm²"], answer: 0, explain: "CSA = 2πrh = 2 × (22/7) × 7 × 10 = 440 cm². (TSA would be 2πr(r+h) = 748.)" },
    { id: "ch12-q4", type: "mcq", topic: "Hemisphere", diff: "medium", marks: 1, q: "The total surface area of a hemisphere of radius 7 cm is:", options: ["462 cm²", "308 cm²", "154 cm²", "616 cm²"], answer: 0, explain: "TSA = 3πr² = 3 × (22/7) × 49 = 462 cm²." },
    { id: "ch12-q5", type: "mcq", topic: "Frustum", diff: "medium", marks: 1, q: "The slant height of a frustum with radii 15 cm and 9 cm and height 8 cm is:", options: ["10 cm", "8 cm", "6 cm", "12 cm"], answer: 0, explain: "l = √(h² + (R−r)²) = √(64 + 36) = √100 = 10 cm." },
    { id: "ch12-q6", type: "mcq", topic: "Cone", diff: "medium", marks: 1, q: "A cone and cylinder have equal base radii and equal heights. The ratio of their volumes (cone : cylinder) is:", options: ["1 : 3", "3 : 1", "1 : 2", "2 : 3"], answer: 0, explain: "V_cone = ⅓πr²h vs V_cyl = πr²h → ratio 1:3." },
    { id: "ch12-q7", type: "mcq", topic: "Cuboid", diff: "easy", marks: 1, q: "The total surface area of a cuboid with l = 5, b = 4, h = 3 units is:", options: ["94 sq units", "47 sq units", "60 sq units", "120 sq units"], answer: 0, explain: "TSA = 2(lb + bh + lh) = 2(20 + 12 + 15) = 2 × 47 = 94." },
    { id: "ch12-q8", type: "ar", topic: "Conversion", diff: "medium", marks: 1, q: "**Assertion (A):** When a solid is melted and recast into a different shape, its volume remains unchanged.\n**Reason (R):** The amount of material does not change; only its shape changes.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "Conservation of volume on melting — R correctly explains A." },
    { id: "ch12-q9", type: "vsa", topic: "Sphere", diff: "medium", marks: 1, q: "Find the volume of a sphere of radius 21 cm (π = 22/7).", answer: "38808 cm³", explain: "V = 4/3 × (22/7) × 21³ = 4/3 × 22/7 × 9261 = 4 × 22 × 441 = 38808 cm³." },
    { id: "ch12-q10", type: "sa", topic: "Cone", diff: "medium", marks: 2, q: "Find the total surface area of a cone with radius r/... radius 6 cm and slant height 8 cm (π = 3.14).", answer: "263.76 cm²", explain: "TSA = πr(r + l) = 3.14 × 6 × (6 + 8) = 3.14 × 84 = 263.76 cm²." },
    { id: "ch12-q11", type: "sa", topic: "Combination", diff: "hard", marks: 2, q: "A solid is made of a cylinder of height 10 cm and radius 7 cm with a hemisphere stuck on one of its circular faces. Find its total surface area (π = 22/7).", answer: "902 cm²", explain: "Exposed surfaces = CSA of cylinder + one free flat base + CSA of hemisphere (the face where they join is hidden).\nCSA cylinder = 2πrh = 2 × (22/7) × 7 × 10 = 440 cm².\nOne flat base = πr² = (22/7) × 49 = 154 cm².\nCSA hemisphere = 2πr² = 308 cm².\nTotal = 440 + 154 + 308 = 902 cm²." },
    { id: "ch12-q12", type: "la", topic: "Conversion", diff: "medium", marks: 3, q: "A metallic sphere of radius 4.2 cm is melted and recast into a cylinder of radius 6 cm. Find the height of the cylinder.", answer: "2.744 cm", explain: "Equate volumes: 4/3 π(4.2)³ = π(6)² h.\nh = 4(4.2)³/(3 × 36) = 4 × 74.088/108 = 296.352/108 = 2.744 cm." },
    { id: "ch12-q13", type: "la", topic: "Well & embankment", diff: "hard", marks: 3, q: "A well of diameter 3 m is dug 14 m deep. The earth taken out is spread evenly all around it to a width of 4 m to form an embankment. Find the height of the embankment.", answer: "1.125 m (9/8 m)", explain: "Earth dug = πr²h = π(1.5)²(14) = 31.5π m³.\nEmbankment is an annulus: inner radius 1.5 m, outer radius 1.5 + 4 = 5.5 m.\nArea = π(R² − r²) = π(30.25 − 2.25) = 28π m².\nHeight = 31.5π/28π = 31.5/28 = 1.125 m." },
    { id: "ch12-q14", type: "case", topic: "Frustum", diff: "medium", marks: 4, q: "A bucket open at the top is in the form of a frustum of a cone. Its bottom and top radii are 6 cm and 21 cm respectively, and its height is 20 cm. [Practice Question]\n\n(i) Its slant height is:\n(ii) Its curved surface area (excluding the base) is (use \u03c0 = 22/7):", options: ["(i) 25 cm  (ii) \u2248 2121.4 cm\u00b2 (675\u03c0)", "(i) 20 cm  (ii) 1696 cm\u00b2", "(i) 25 cm  (ii) 525\u03c0 cm\u00b2", "(i) 29 cm  (ii) 2450 cm\u00b2"], answer: 0, explain: "(i) l = \u221a(h\u00b2 + (R \u2212 r)\u00b2) = \u221a(20\u00b2 + 15\u00b2) = \u221a625 = 25 cm.\n(ii) CSA = \u03c0(R + r)l = (22/7)(21 + 6)(25) = (22/7)(27)(25) = 14850/7 \u2248 2121.4 cm\u00b2." },
    { id: "ch12-q15", type: "case", topic: "Cylinder & cone", diff: "medium", marks: 4, q: "A tent is cylindrical to a height of 5.5 m with radius 14 m, and conical above it with slant height 14 m (same radius). The canvas costs \u20b95 per m\u00b2. [Practice Question]\n\n(i) Total canvas area used is:\n(ii) Total cost of the canvas is:", options: ["(i) 1100 m\u00b2  (ii) \u20b95500", "(i) 616 m\u00b2  (ii) \u20b93080", "(i) 484 m\u00b2  (ii) \u20b92420", "(i) 1232 m\u00b2 (ii) \u20b96160"], answer: 0, explain: "Conical part CSA = \u03c0rl = (22/7)(14)(14) = 616 m\u00b2.\nCylindrical part CSA = 2\u03c0rh = 2(22/7)(14)(5.5) = 484 m\u00b2.\nTotal canvas = 616 + 484 = 1100 m\u00b2.\nCost = 1100 \u00d7 5 = \u20b95500." },
    { id: "ch12-q16", type: "competency", topic: "Conversion", diff: "hard", marks: 2, q: "How many silver coins, each a cylinder of diameter 1.75 cm and thickness 2 mm, must be melted to form a cuboid of dimensions 5.5 cm × 10 cm × 3.5 cm? (π = 22/7)", answer: "400 coins", explain: "Coin radius = 0.875 = 7/8 cm; thickness = 0.2 cm.\nCoin volume = πr²h = (22/7)(49/64)(0.2) = (22/7)(49/64)(1/5) = 22×49/(7×64×5) = 1078/2240 = 0.48125 cm³.\nCuboid = 5.5 × 10 × 3.5 = 192.5 cm³.\nNumber = 192.5/0.48125 = 400 coins." }
  ],
  revision: {
    points: [
      "Cylinder: V = πr²h, CSA = 2πrh, TSA = 2πr(r+h).",
      "Cone: V = ⅓πr²h, l = √(r²+h²), CSA = πrl, TSA = πr(r+l).",
      "Sphere: V = 4/3πr³, SA = 4πr²; hemisphere TSA = 3πr², V = 2/3πr³.",
      "Frustum: l = √(h²+(R−r)²), V = ⅓πh(R²+Rr+r²), CSA = π(R+r)l, TSA = CSA+πR²+πr².",
      "Combinations: volumes add; surface area counts only exposed faces.",
      "Melting/recasting: volume conserved; wells: earth dug = earth spread; water flow: volume = area × speed × time."
    ],
    mistakes: [
      "Using diameter instead of radius in formulas.",
      "Forgetting slant height l = √(r² + h²) — cone CSA cannot use h directly.",
      "Counting hidden joining faces in combined solids.",
      "Unit errors: mm vs cm for wire thickness, litres vs cm³ (1 L = 1000 cm³)."
    ],
    tricks: [
      "π = 22/7 works fastest when radius is a multiple of 7.",
      "Hemisphere-on-cylinder/capsule: replace two hemispheres by one sphere.",
      "Embankment/well: volume dug = volume spread → one equation solves the unknown height."
    ]
  }
});
