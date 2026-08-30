/* Chapter 11 — Areas Related to Circles (CBSE Class 10) */
MMX.registerChapter({
  id: "areas-circles",
  name: "Areas Related to Circles",
  icon: "◔",
  concepts: [
    { h: "Circumference and area", p: "For a circle of radius r:\n**Circumference = 2πr**\n**Area = πr²**\nA semicircle has area ½πr² and perimeter (curved + diameter) = πr + 2r." },
    { h: "Sector of a circle", p: "A sector is the region bounded by two radii and the corresponding arc. For sector angle θ (in degrees):\n**Length of arc = θ/360 × 2πr**\n**Area of sector = θ/360 × πr²**\nSector with θ > 180° is the major sector." },
    { h: "Segment of a circle", p: "A segment is the region between a chord and an arc.\n**Area of minor segment = area of minor sector − area of the triangle formed by the two radii and the chord**\n= r²[ πθ/360 − (sin θ)/2 ]\nArea of major segment = πr² − minor segment area." },
    { h: "Combinations of figures", p: "For designs made with circles/shapes (flower beds, tracks, wheel spokes, etc.):\n• **Area between two concentric circles (annulus/ring)** = π(R² − r²).\n• A circular track's running area = outer circle area − inner circle area.\n• Shade regions: break the figure into sectors/segments and known polygons, then add or subtract." },
    { h: "Rotation problems", p: "When a wheel rotates, distance covered in one revolution = circumference. Number of revolutions = total distance ÷ circumference. A minute hand sweeps a full circle (360°) in 60 minutes." }
  ],
  formulas: [
    { id: "ch11-f1", name: "Circumference", cat: "Mensuration", expr: "C = 2πr", vars: "r = radius", explain: "Distance around the circle; distance per wheel revolution.", example: "r = 7 cm ⇒ C = 14π ≈ 44 cm (using π = 22/7)." },
    { id: "ch11-f2", name: "Area of circle", cat: "Mensuration", expr: "A = πr²", vars: "r = radius", explain: "Area enclosed by the circle.", example: "r = 7 cm ⇒ A = 49π ≈ 154 cm²." },
    { id: "ch11-f3", name: "Arc length", cat: "Mensuration", expr: "l = (θ/360)·2πr", vars: "θ = sector angle in degrees", explain: "Fraction θ/360 of the full circumference.", example: "θ = 60°, r = 6 cm: l = (1/6)(12π) = 2π cm." },
    { id: "ch11-f4", name: "Area of sector", cat: "Mensuration", expr: "A_sector = (θ/360)·πr²", vars: "θ in degrees", explain: "Fraction θ/360 of the full circle's area.", example: "θ = 90°, r = 4 cm: A = (1/4)(16π) = 4π cm²." },
    { id: "ch11-f5", name: "Area of segment", cat: "Mensuration", expr: "A_segment = r²[πθ/360 − (sin θ)/2]", vars: "Minor segment with angle θ and chord", explain: "Sector area minus the isosceles triangle area (½ r² sin θ).", example: "θ = 60°, r = 6: segment = 36(π/6 − √3/4) = 6π − 9√3 cm²." },
    { id: "ch11-f6", name: "Ring / annulus", cat: "Mensuration", expr: "A_ring = π(R² − r²)", vars: "R = outer radius, r = inner radius", explain: "Area between two concentric circles — used for circular tracks.", example: "R = 14, r = 7: π(196 − 49) = 147π cm²." }
  ],
  examples: [
    {
      id: "ch11-e1", title: "Area of a sector",
      given: "Find the area of a sector of angle 120° in a circle of radius 21 cm (π = 22/7).",
      concept: "A = θ/360 × πr².",
      steps: [
        { t: "Step 1", x: "θ = 120, r = 21; fraction = 120/360 = 1/3." },
        { t: "Step 2", x: "A = (1/3) × (22/7) × 21 × 21 = (1/3) × (22/7) × 441 = (1/3) × 1386." },
        { t: "Final Answer", x: "Area = 462 cm².", ans: true }
      ]
    },
    {
      id: "ch11-e2", title: "Area of the minor segment",
      given: "Find the area of the segment cut off by a chord of length equal to the radius in a circle of radius 10 cm... Use chord subtending 90°: radius r = 10, sector angle 90°.",
      concept: "Segment = sector − triangle.",
      steps: [
        { t: "Step 1", x: "Sector area (θ = 90°): (1/4) × π × 100 = 25π cm²." },
        { t: "Step 2", x: "Triangle (right isosceles, legs = r = 10): ½ × 10 × 10 = 50 cm²." },
        { t: "Final Answer", x: "Segment area = (25π − 50) cm² ≈ 28.54 cm².", ans: true }
      ]
    },
    {
      id: "ch11-e3", title: "Circular track",
      given: "Two concentric circles have radii 7 m and 14 m. Find the area of the circular ring (track).",
      concept: "Ring area = π(R² − r²).",
      steps: [
        { t: "Step 1", x: "R = 14, r = 7: R² − r² = 196 − 49 = 147." },
        { t: "Step 2", x: "A = π × 147 = (22/7) × 147 = 22 × 21." },
        { t: "Final Answer", x: "Area = 462 m².", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch11-q1", type: "mcq", topic: "Area & perimeter", diff: "easy", marks: 1, q: "If the area of a circle is 154 cm² (π = 22/7), its circumference is:", options: ["44 cm", "22 cm", "154 cm", "88 cm"], answer: 0, explain: "πr² = 154 ⇒ (22/7)r² = 154 ⇒ r² = 49 ⇒ r = 7. C = 2πr = 44 cm." },
    { id: "ch11-q2", type: "mcq", topic: "Sector", diff: "easy", marks: 1, q: "The area of a sector of angle 60° of a circle of radius 7 cm is:", options: ["77/3 cm²", "77 cm²", "154/6 cm²... equals 77/3", "49/6 cm²"], answer: 0, explain: "A = (60/360)·(22/7)·49 = (1/6)·154 = 77/3 cm²." },
    { id: "ch11-q3", type: "mcq", topic: "Ring area", diff: "medium", marks: 1, q: "The area of the ring between circles of radii 23 cm and 15 cm is:", options: ["304π cm²", "484π cm²", "8π cm²", "152π cm²"], answer: 0, explain: "π(23² − 15²) = π(529 − 225) = 304π cm²." },
    { id: "ch11-q4", type: "mcq", topic: "Arc length", diff: "medium", marks: 1, q: "The length of the arc of a sector of angle 45° in a circle of radius 14 cm is:", options: ["11 cm", "5.5 cm", "22 cm", "7 cm"], answer: 0, explain: "l = (45/360)·2π·14 = (1/8)·2·(22/7)·14 = (1/8)·88 = 11 cm." },
    { id: "ch11-q5", type: "mcq", topic: "Segment", diff: "medium", marks: 1, q: "The area of the minor segment of a circle of radius 14 cm when the sector angle is 60° is:", options: ["(308/3 − 49√3) cm²", "(308/3) cm²", "49√3 cm²", "(154 − 49√3) cm²"], answer: 0, explain: "Segment = sector − triangle.\nSector = (60/360)πr² = (1/6)(22/7)(196) = 308/3 cm².\nTriangle (equilateral since radii with 60°): (√3/4)(14)² = 49√3 cm².\nSegment = 308/3 − 49√3." },
    { id: "ch11-q6", type: "mcq", topic: "Circumference", diff: "easy", marks: 1, q: "The perimeter of a semicircular protractor whose radius is 7 cm is:", options: ["36 cm", "22 cm", "14 cm", "44 cm"], answer: 0, explain: "Perimeter of semicircle = curved arc + diameter = πr + 2r = (22/7)(7) + 14 = 22 + 14 = 36 cm." },
    { id: "ch11-q7", type: "ar", topic: "Sector", diff: "medium", marks: 1, q: "**Assertion (A):** If the radius of a circle is doubled, the area of its sectors becomes four times.\n**Reason (R):** Area depends on r², so doubling r multiplies area by 4.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "Area scales with r²; sector area does the same. R directly explains A." },
    { id: "ch11-q8", type: "vsa", topic: "Area & perimeter", diff: "easy", marks: 1, q: "Find the area of a circle whose circumference is 44 cm.", answer: "154 cm²", explain: "2πr = 44 ⇒ r = 7 cm; area = πr² = (22/7)(49) = 154 cm²." },
    { id: "ch11-q9", type: "vsa", topic: "Revolutions", diff: "medium", marks: 1, q: "A wheel of radius 0.25 m completes how many revolutions to travel 11 km? (π = 22/7)", answer: "7000 revolutions", explain: "Circumference = 2(22/7)(0.25) = 11/7 m. Revolutions = 11000/(11/7) = 7000." },
    { id: "ch11-q10", type: "sa", topic: "Segment", diff: "medium", marks: 2, q: "Find the area of the minor segment of a circle of radius 42 cm, if the length of the corresponding arc is 44 cm.", answer: "(924 − 441√3) cm²", explain: "Arc l = θ/360 × 2πr ⇒ 44 = θ/360 × 264 ⇒ θ = 60°.\nSector area = (60/360)πr² = (1/6)(22/7)(1764) = 924 cm².\nTriangle (equilateral side 42): (√3/4)(42²) = 441√3 cm².\nSegment = 924 − 441√3 cm²." },
    { id: "ch11-q11", type: "la", topic: "Combinations", diff: "hard", marks: 3, q: "In a square lawn of side 70 m, two circular flower beds... A square of side 28 cm has four circles of radius 7 cm cut out from it as shown at corners (quarter circles). Find the area of the remaining (shaded) portion.", answer: "(784 − 49π) cm² ≈ 629.86 cm²... with π=22/7: 630 cm²", explain: "Square area = 28² = 784 cm².\nFour quarter-circles of radius 7 make one full circle: area = π(7²) = 49π = (22/7)(49) = 154 cm².\nRemaining = 784 − 154 = 630 cm²." },
    { id: "ch11-q12", type: "la", topic: "Combinations", diff: "medium", marks: 3, q: "A circular track has inner circumference 352 m and outer circumference 396 m. Find the width of the track and its area. (π = 22/7)", answer: "Width 7 m; area 2618 m²", explain: "Inner radius r: 2πr = 352 ⇒ r = 56 m. Outer radius R: 2πR = 396 ⇒ R = 63 m. Width = 7 m.\nTrack area = π(R² − r²) = (22/7)(63² − 56²) = (22/7)(3969 − 3136) = (22/7)(833) = 22 × 119 = 2618 m²." },
    { id: "ch11-q13", type: "case", topic: "Combinations", diff: "medium", marks: 4, q: "A school ground is a rectangle of length 80 m and breadth 42 m. At the two shorter ends (width sides), semicircular flower regions are developed with diameters equal to the breadth. [Practice Question]\n\nThe area of the two semicircular flower regions together is:", options: ["1386 m²", "693 m²", "2772 m²", "346.5 m²"], answer: 0, explain: "Two semicircles with diameter 42 m (r = 21 m) make one full circle.\nArea = πr² = (22/7)(21²) = (22/7)(441) = 22 × 63 = 1386 m²." },
    { id: "ch11-q14", type: "competency", topic: "Segment", diff: "hard", marks: 3, q: "A chord of a circle of radius 10 cm subtends a right angle at the centre. Find the areas of (i) the minor segment and (ii) the major sector. (π = 3.14)", answer: "(i) 28.5 cm² (ii) 235.5 cm²", explain: "(i) Minor sector (90°): (1/4)×3.14×100 = 78.5 cm². Triangle: ½×10×10 = 50 cm². Minor segment = 78.5 − 50 = 28.5 cm².\n(ii) Major sector angle = 270°: (270/360)×3.14×100 = 0.75 × 314 = 235.5 cm²." }
  ],
  revision: {
    points: [
      "Circumference = 2πr; area = πr²; semicircle perimeter = πr + 2r (include diameter!).",
      "Arc length = θ/360 × 2πr; sector area = θ/360 × πr².",
      "Minor segment = sector − triangle = r²(πθ/360 − sinθ/2).",
      "Ring (annulus/track) area = π(R² − r²).",
      "Wheel revolutions = distance ÷ circumference.",
      "Break combination figures into full circle/semicircle/sector + polygon pieces; add or subtract."
    ],
    mistakes: [
      "Semicircle perimeter given as πr only — the diameter 2r must be added.",
      "Using radians or wrong angle fractions: θ/360 for degrees (Class 10).",
      "Segment ≠ sector: subtract the triangle.",
      "Square of difference vs difference computed wrongly: R² − r² = (R−r)(R+r)."
    ],
    tricks: [
      "Four quarter-circles = one full circle; two semicircles = one full circle — common in shaded-region questions.",
      "60° central angle with equal radii → equilateral triangle, area = (√3/4)r².",
      "Use π = 22/7 when radius is a multiple of 7; use 3.14 when the question specifies."
    ]
  }
});
