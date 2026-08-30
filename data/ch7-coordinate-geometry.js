/* Chapter 7 — Coordinate Geometry (CBSE Class 10) */
MMX.registerChapter({
  id: "coordinate-geometry",
  name: "Coordinate Geometry",
  icon: "🎯",
  concepts: [
    { h: "Coordinate plane basics", p: "Every point is written as (x, y): the **x-coordinate (abscissa)** is the horizontal distance from the y-axis, the **y-coordinate (ordinate)** is the vertical distance from the x-axis.\nThe axes divide the plane into four quadrants; the origin is (0, 0)." },
    { h: "Distance formula", p: "The distance between two points A(x₁, y₁) and B(x₂, y₂) is:\n**AB = √[(x₂ − x₁)² + (y₂ − y₁)²]**\nDistance of a point P(x, y) from the origin: **OP = √(x² + y²)**." },
    { h: "Section formula", p: "The point P(x, y) that divides the join of A(x₁, y₁) and B(x₂, y₂) **internally in the ratio m : n** is:\n**P = ( (mx₂ + nx₁)/(m + n), (my₂ + ny₁)/(m + n) )**\nThe **midpoint** (ratio 1:1) is: **( (x₁+x₂)/2, (y₁+y₂)/2 )**." },
    { h: "Area of a triangle", p: "Area of triangle with vertices A(x₁, y₁), B(x₂, y₂), C(x₃, y₃):\n**Area = ½ |x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|**\nIf this area is 0, the three points are **collinear**." },
    { h: "Using the formulas", p: "• To prove a triangle is right/isosceles: compare side lengths using the distance formula.\n• To prove points form a parallelogram: diagonals bisect each other (same midpoint).\n• To find trisection points: use ratios 1:2 and 2:1 in the section formula." }
  ],
  formulas: [
    { id: "ch7-f1", name: "Distance formula", cat: "Geometry", expr: "AB = √[(x₂−x₁)² + (y₂−y₁)²]", vars: "A(x₁,y₁), B(x₂,y₂)", explain: "Comes from Pythagoras: the horizontal and vertical differences are the legs.", example: "Distance between (2, 3) and (5, 7): √(3² + 4²) = 5 units." },
    { id: "ch7-f2", name: "Distance from origin", cat: "Geometry", expr: "OP = √(x² + y²)", vars: "P(x, y); origin O(0,0)", explain: "Special case of the distance formula with x₁ = y₁ = 0.", example: "Distance of (−6, 8) from origin = √(36+64) = 10." },
    { id: "ch7-f3", name: "Section formula", cat: "Geometry", expr: "P = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))", vars: "P divides AB internally in ratio m:n", explain: "Note m multiplies the coordinates of the END point toward which the ratio is measured (B).", example: "Point dividing (1, 2) and (7, 8) in ratio 1:2 → ((1·7+2·1)/3, (1·8+2·2)/3) = (3, 4)." },
    { id: "ch7-f4", name: "Midpoint formula", cat: "Geometry", expr: "M = ((x₁+x₂)/2, (y₁+y₂)/2)", vars: "M is the midpoint of AB", explain: "Section formula with m = n = 1.", example: "Midpoint of (2, −5) and (4, 9) = (3, 2)." },
    { id: "ch7-f5", name: "Area of triangle / collinearity", cat: "Geometry", expr: "A = ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|", vars: "Vertices (x₁,y₁), (x₂,y₂), (x₃,y₃)", explain: "Area = 0 means the points are collinear. Keep the modulus for a positive area.", example: "Vertices (0,0), (4,0), (0,3): area = ½|0 + 4(3−0) + 0| = 6 sq. units." }
  ],
  examples: [
    {
      id: "ch7-e1", title: "Distance between two points",
      given: "Find the distance between A(2, 3) and B(−6, 9).",
      concept: "Distance formula.",
      steps: [
        { t: "Step 1", x: "Δx = −6 − 2 = −8; Δy = 9 − 3 = 6." },
        { t: "Step 2", x: "AB = √[(−8)² + 6²] = √(64 + 36) = √100." },
        { t: "Final Answer", x: "AB = 10 units.", ans: true }
      ]
    },
    {
      id: "ch7-e2", title: "Trisection by section formula",
      given: "Find the points of trisection of the segment joining A(2, −2) and B(−7, 4).",
      concept: "Trisection points divide in ratios 1:2 and 2:1.",
      steps: [
        { t: "Step 1", x: "Point P (ratio 1:2): P = ((1·(−7) + 2·2)/3, (1·4 + 2·(−2))/3) = ((−7+4)/3, (4−4)/3) = (−1, 0)." },
        { t: "Step 2", x: "Point Q (ratio 2:1): Q = ((2·(−7) + 1·2)/3, (2·4 + 1·(−2))/3) = ((−14+2)/3, (8−2)/3) = (−4, 2)." },
        { t: "Final Answer", x: "Trisection points are (−1, 0) and (−4, 2).", ans: true }
      ]
    },
    {
      id: "ch7-e3", title: "Check collinearity",
      given: "Are the points (1, −1), (5, 2) and (9, 5) collinear?",
      concept: "Area of the triangle formed must be 0.",
      steps: [
        { t: "Step 1", x: "Area = ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|\n= ½|1(2−5) + 5(5−(−1)) + 9(−1−2)|\n= ½|−3 + 30 − 27| = ½|0| = 0." },
        { t: "Final Answer", x: "Area is 0 → the points are collinear.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch7-q1", type: "mcq", topic: "Distance formula", diff: "easy", marks: 1, q: "The distance between the points (0, 0) and (6, 8) is:", options: ["14 units", "10 units", "√14 units", "2 units"], answer: 1, explain: "√(6² + 8²) = √100 = 10 units." },
    { id: "ch7-q2", type: "mcq", topic: "Midpoint", diff: "easy", marks: 1, q: "The midpoint of the segment joining (−4, 6) and (4, −6) is:", options: ["(0, 0)", "(4, 6)", "(−4, −6)", "(2, 3)"], answer: 0, explain: "Midpoint = ((−4+4)/2, (6+(−6))/2) = (0, 0)." },
    { id: "ch7-q3", type: "mcq", topic: "Section formula", diff: "medium", marks: 1, q: "A point divides (2, −3) and (−4, 6) internally in the ratio 1 : 2. Its coordinates are:", options: ["(0, 0)", "(−2, 3)", "(0, 3)", "(−1, 1)"], answer: 0, explain: "P = ((1·(−4)+2·2)/3, (1·6+2·(−3))/3) = ((−4+4)/3, (6−6)/3) = (0, 0)." },
    { id: "ch7-q4", type: "mcq", topic: "Collinearity", diff: "medium", marks: 1, q: "The points (1, 2), (3, 4) and (5, 6) are:", options: ["collinear", "vertices of an equilateral triangle", "vertices of a right triangle", "none of these"], answer: 0, explain: "Area = ½|1(4−6) + 3(6−2) + 5(2−4)| = ½|−2 + 12 − 10| = 0 → collinear (they lie on y = x + 1)." },
    { id: "ch7-q5", type: "mcq", topic: "Area", diff: "medium", marks: 1, q: "The area of the triangle with vertices (0, 0), (2, 0) and (0, 4) is:", options: ["8 sq units", "4 sq units", "6 sq units", "2 sq units"], answer: 1, explain: "Area = ½|0 + 2(4−0) + 0| = ½ × 8 = 4 sq units." },
    { id: "ch7-q6", type: "mcq", topic: "Distance formula", diff: "medium", marks: 1, q: "The value of p, if the distance between (4, p) and (1, 0) is 5 units, is:", options: ["±4", "4 only", "−4 only", "±3"], answer: 0, explain: "√((4−1)² + (p−0)²) = 5 ⇒ 9 + p² = 25 ⇒ p² = 16 ⇒ p = ±4." },
    { id: "ch7-q7", type: "ar", topic: "Section formula", diff: "medium", marks: 1, q: "**Assertion (A):** The midpoint of the line segment joining points A(−10, 4) and B(−2, 0) is (−6, 2).\n**Reason (R):** The midpoint formula is ((x₁+x₂)/2, (y₁+y₂)/2).", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "Midpoint = ((−10−2)/2, (4+0)/2) = (−6, 2). A follows directly from R." },
    { id: "ch7-q8", type: "vsa", topic: "Distance formula", diff: "easy", marks: 1, q: "Find the distance of the point (−6, 8) from the origin.", answer: "10 units", explain: "√((−6)² + 8²) = √(36+64) = √100 = 10." },
    { id: "ch7-q9", type: "vsa", topic: "Section formula", diff: "medium", marks: 1, q: "Find the coordinates of the point which divides the join of (−1, 7) and (4, −3) in the ratio 2 : 3.", answer: "(1, 3)", explain: "P = ((2·4 + 3·(−1))/5, (2·(−3) + 3·7)/5) = ((8−3)/5, (−6+21)/5) = (1, 3)." },
    { id: "ch7-q10", type: "sa", topic: "Section formula", diff: "medium", marks: 2, q: "Find the ratio in which the line segment joining A(1, −5) and B(−4, 5) is divided by the x-axis. Also find the point of division.", answer: "Ratio 1:1; point (−3/2, 0)", explain: "On the x-axis y = 0. Let ratio be k:1; then y = (k·5 + 1·(−5))/(k+1) = 0 ⇒ 5k − 5 = 0 ⇒ k = 1. Ratio 1:1 (midpoint). x = (1·(−4)+1·1)/2 = −3/2. Point = (−3/2, 0)." },
    { id: "ch7-q11", type: "sa", topic: "Distance formula", diff: "medium", marks: 2, q: "Show that the points A(1, 7), B(4, 2), C(−1, −1) and D(−4, 4) are the vertices of a square.", answer: "All four sides = √34 and diagonals = √68 (equal) — hence a square", explain: "AB = √(3²+(−5)²) = √34; BC = √((−5)²+(−3)²) = √34; CD = √((−3)²+5²) = √34; DA = √(5²+3²) = √34. All four sides equal.\nDiagonals: AC = √((−2)²+(−8)²) = √68 = 2√17; BD = √((−8)²+2²) = √68. Diagonals also equal.\nA quadrilateral with all sides equal and equal diagonals is a square ✓." },
    { id: "ch7-q12", type: "sa", topic: "Area", diff: "medium", marks: 2, q: "Find the area of the triangle with vertices A(1, 2), B(3, 5) and C(−2, 2).", answer: "9/2 = 4.5 sq units", explain: "Area = ½|1(5−2) + 3(2−2) + (−2)(2−5)| = ½|3 + 0 + 6| = 9/2 = 4.5 sq units." },
    { id: "ch7-q13", type: "la", topic: "Median / centroid", diff: "hard", marks: 3, q: "The vertices of ΔABC are A(4, 2), B(6, 5) and C(1, 4). Find the coordinates of the centroid and show that the median from A meets BC at its midpoint.", answer: "Centroid (11/3, 11/3); midpoint of BC = (7/2, 9/2)", explain: "Centroid (average of vertices): G = ((4+6+1)/3, (2+5+4)/3) = (11/3, 11/3).\nMidpoint of BC = ((6+1)/2, (5+4)/2) = (7/2, 9/2). The median from A passes through this midpoint by definition; G also lies on the median (centroid divides every median in 2:1)." },
    { id: "ch7-q14", type: "case", topic: "Section formula", diff: "medium", marks: 4, q: "On a school map drawn on a coordinate grid, the library is at A(2, 5) and the canteen is at B(8, 11). A water cooler is placed at the point that divides AB internally in the ratio 1 : 1. [Practice Question]\n\n(i) Where is the water cooler located?\n(ii) What is its distance from the origin (rounded)?", options: ["(i) (5, 8)  (ii) √89 ≈ 9.4 units", "(i) (6, 8)  (ii) 10 units", "(i) (5, 8)  (ii) 13 units", "(i) (10, 16) (ii) √356 units"], answer: 0, explain: "Ratio 1:1 = midpoint = ((2+8)/2, (5+11)/2) = (5, 8).\nDistance from origin = √(25 + 64) = √89 ≈ 9.43 units." },
    { id: "ch7-q15", type: "competency", topic: "Collinearity", diff: "hard", marks: 2, q: "If the points A(6, 1), B(8, 2), C(9, 4) and D(p, 3) are the vertices of a parallelogram taken in order, find the value of p.", answer: "p = 7", explain: "In a parallelogram the diagonals bisect each other, so diagonals AC and BD share the same midpoint.\nMidpoint of AC = ((6+9)/2, (1+4)/2) = (15/2, 5/2).\nMidpoint of BD = ((8+p)/2, (2+3)/2) = ((8+p)/2, 5/2).\nEquating x-coordinates: (8 + p)/2 = 15/2 ⇒ 8 + p = 15 ⇒ p = 7." }
  ],
  revision: {
    points: [
      "Point notation (x, y): x = abscissa (horizontal), y = ordinate (vertical).",
      "Distance: √[(x₂−x₁)² + (y₂−y₁)²]; from origin √(x²+y²).",
      "Section formula (ratio m:n): ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)).",
      "Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2).",
      "Triangle area: ½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|; area 0 → collinear.",
      "Parallelogram check: diagonals share the same midpoint; centroid = average of the three vertices."
    ],
    mistakes: [
      "Swapping m and n in the section formula: the coefficient m goes with the END point B (ratio measured from A).",
      "Forgetting the modulus in the area formula (area cannot be negative).",
      "Confusing 'trisection ratio 1:2 and 2:1' with 1:3.",
      "Distance formula: using (x₂+x₁) instead of (x₂−x₁)."
    ],
    tricks: [
      "Points on the x-axis have y = 0; points on the y-axis have x = 0 — use this in ratio problems.",
      "To verify shapes: compute all six distances (4 sides + 2 diagonals); equal sides alone do not prove a square (diagonals must match).",
      "Centroid coordinates are the plain average of the vertices' coordinates."
    ]
  }
});
