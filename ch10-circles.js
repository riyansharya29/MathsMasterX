/* Chapter 10 — Circles (CBSE Class 10) */
MMX.registerChapter({
  id: "circles",
  name: "Circles",
  icon: "⭕",
  concepts: [
    { h: "Tangent to a circle", p: "A **tangent** to a circle is a line that touches the circle at exactly one point (the point of contact). It is never a secant (which cuts the circle at two points)." },
    { h: "Tangent–radius theorem", p: "**The tangent at any point of a circle is perpendicular to the radius through the point of contact.**\nSo if P is the point of contact and O the centre, ∠OPT = 90° where PT is the tangent. This right angle makes Pythagoras the key tool." },
    { h: "Number of tangents from a point", p: "• From a point **on** the circle: exactly **1** tangent.\n• From a point **outside** the circle: exactly **2** tangents, and they are **equal in length**.\n• From a point **inside** the circle: **no** tangent." },
    { h: "Equal tangents", p: "**The lengths of tangents drawn from an external point to a circle are equal.**\nIf tangents from P touch the circle at T₁ and T₂, then PT₁ = PT₂. This also implies the line from P to the centre bisects the angle between the tangents." },
    { h: "Using the theorems", p: "Circle geometry problems almost always combine:\n1. Radius ⟂ tangent (right angle),\n2. Equal tangents from an external point,\n3. Pythagoras in the right triangle formed by centre, external point and contact point." }
  ],
  formulas: [
    { id: "ch10-f1", name: "Tangent–radius perpendicularity", cat: "Geometry", expr: "OP ⟂ PT at contact point P", vars: "O = centre, P = point of contact, PT = tangent", explain: "Creates a right angle → apply Pythagoras in ΔOPT.", example: "If OP = 5 cm and OT = 13 cm (external point T), tangent PT = √(13² − 5²) = 12 cm." },
    { id: "ch10-f2", name: "Tangent length", cat: "Geometry", expr: "PT = √(OT² − r²)", vars: "OT = distance of external point from centre, r = radius", explain: "From Pythagoras in the right triangle OPT.", example: "r = 3 cm, point 5 cm from centre → tangent = √(25−9) = 4 cm." },
    { id: "ch10-f3", name: "Equal tangents", cat: "Geometry", expr: "PT₁ = PT₂", vars: "Two tangents from external point P touch at T₁ and T₂", explain: "Also gives ∠OPT₁ = ∠OPT₂ and OT₁ = OT₂ = r.", example: "If one tangent from P is 7 cm, the other is also 7 cm." },
    { id: "ch10-f4", name: "Circumscribed polygon", cat: "Geometry", expr: "Tangents from each vertex are equal", vars: "Sides of a polygon circumscribing a circle", explain: "For a circumscribing quadrilateral: AB + CD = AD + BC (sums of opposite sides are equal).", example: "In a tangential quadrilateral with sides 5, 8, ?, ? pattern: pair sums match." },
    { id: "ch10-f5", name: "Angle between tangent and chord", cat: "Geometry", expr: "∠(tangent, chord) = angle in the alternate segment", vars: "Alternate Segment Theorem", explain: "The angle between a tangent and a chord equals the angle subtended by the chord in the opposite arc (extension context; Pythagoras + equal tangents cover Class 10 core).", example: "If chord PQ makes 50° with the tangent at P, the angle in the alternate segment is also 50°." }
  ],
  examples: [
    {
      id: "ch10-e1", title: "Length of a tangent",
      given: "A point P is 13 cm from the centre O of a circle of radius 5 cm. Find the length of the tangent from P to the circle.",
      concept: "Radius is perpendicular to tangent → right triangle.",
      steps: [
        { t: "Step 1", x: "Let T be the point of contact. OT = 5 cm (radius), OP = 13 cm, ∠OTP = 90°." },
        { t: "Step 2", x: "By Pythagoras: PT² = OP² − OT² = 169 − 25 = 144." },
        { t: "Final Answer", x: "PT = 12 cm.", ans: true }
      ]
    },
    {
      id: "ch10-e2", title: "Quadrilateral circumscribing a circle",
      given: "A quadrilateral ABCD is drawn to circumscribe a circle. AB = 6 cm, BC = 7 cm, CD = 4 cm. Find AD.",
      concept: "Tangents from the same external point are equal; hence AB + CD = BC + AD.",
      steps: [
        { t: "Step 1", x: "Property of a tangential quadrilateral: sums of opposite sides are equal: AB + CD = BC + AD." },
        { t: "Step 2", x: "6 + 4 = 7 + AD ⇒ 10 = 7 + AD." },
        { t: "Final Answer", x: "AD = 3 cm.", ans: true }
      ]
    },
    {
      id: "ch10-e3", title: "Angle between tangent and radius",
      given: "In figure, PQ is a chord of a circle and PT is the tangent at P such that ∠QPT = 60°. Find ∠PRQ where R is on the major arc.",
      concept: "Alternate segment idea / tangent–radius: the angle in the alternate segment equals the tangent-chord angle.",
      steps: [
        { t: "Step 1", x: "Angle between tangent PT and chord PQ = 60°." },
        { t: "Step 2", x: "By the alternate segment relation, the angle that PQ subtends in the alternate (major) segment equals 60°; the angle on the minor arc side is supplementary." },
        { t: "Final Answer", x: "∠PRQ = 120° (angle in the segment opposite to the tangent side; uses cyclic/supplementary relation).", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch10-q1", type: "mcq", topic: "Tangent properties", diff: "easy", marks: 1, q: "The number of tangents that can be drawn from a point lying on a circle is:", options: ["1", "2", "0", "infinite"], answer: 0, explain: "A point on the circle lies on exactly one tangent line at that point." },
    { id: "ch10-q2", type: "mcq", topic: "Tangent length", diff: "easy", marks: 1, q: "A point P is 25 cm from the centre of a circle of radius 7 cm. The length of the tangent from P is:", options: ["24 cm", "26 cm", "18 cm", "20 cm"], answer: 0, explain: "tangent = √(25² − 7²) = √(625 − 49) = √576 = 24 cm." },
    { id: "ch10-q3", type: "mcq", topic: "Tangent–radius", diff: "easy", marks: 1, q: "The angle between a tangent to a circle and the radius at the point of contact is:", options: ["90°", "60°", "45°", "180°"], answer: 0, explain: "The tangent is perpendicular to the radius through the point of contact." },
    { id: "ch10-q4", type: "mcq", topic: "Tangent properties", diff: "medium", marks: 1, q: "From an external point P, tangents PA and PB are drawn to a circle. If PA = 5 cm, then PB is:", options: ["5 cm", "10 cm", "2.5 cm", "cannot say"], answer: 0, explain: "Tangents from an external point are equal: PB = PA = 5 cm." },
    { id: "ch10-q5", type: "mcq", topic: "Tangent properties", diff: "medium", marks: 1, q: "In a quadrilateral ABCD circumscribing a circle, which is always true?", options: ["AB + CD = AD + BC", "AB + BC = CD + DA", "AB · CD = BC · DA", "AB = CD"], answer: 0, explain: "Tangents from each vertex are equal, giving sums of opposite sides equal: AB + CD = BC + AD." },
    { id: "ch10-q6", type: "mcq", topic: "Tangent length", diff: "medium", marks: 1, q: "If tangents PA and PB from external point P to a circle with centre O are inclined at 80°, then ∠POA is:", options: ["50°", "80°", "40°", "100°"], answer: 0, explain: "OP bisects ∠APB, so ∠OPA = 40°. In right ΔOAP (∠OAP = 90°), ∠POA = 180 − 90 − 40 = 50°." },
    { id: "ch10-q7", type: "ar", topic: "Tangent–radius", diff: "medium", marks: 1, q: "**Assertion (A):** The length of the tangent from a point P at distance 13 cm from the centre of a circle of radius 5 cm is 12 cm.\n**Reason (R):** The tangent is perpendicular to the radius at the point of contact, so Pythagoras applies.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "√(13² − 5²) = √144 = 12 cm (A true); the perpendicularity makes the triangle right-angled (R explains A)." },
    { id: "ch10-q8", type: "vsa", topic: "Tangent length", diff: "easy", marks: 1, q: "The length of a tangent from a point A at distance 5 cm from the centre is 4 cm. Find the radius.", answer: "3 cm", explain: "r = √(OA² − tangent²) = √(25 − 16) = √9 = 3 cm." },
    { id: "ch10-q9", type: "vsa", topic: "Tangent properties", diff: "medium", marks: 1, q: "Two concentric circles have radii 5 cm and 3 cm. Find the length of the chord of the larger circle which touches the smaller circle.", answer: "8 cm", explain: "The chord of the larger circle is tangent to the smaller; half-chord = √(5² − 3²) = √16 = 4 cm. Full chord = 8 cm." },
    { id: "ch10-q10", type: "sa", topic: "Tangent properties", diff: "medium", marks: 2, q: "Prove that the tangents drawn at the ends of a diameter of a circle are parallel.", answer: "The tangents are parallel", explain: "Let AB be a diameter; tangents at A and B are both perpendicular to AB (tangent ⟂ radius). Two lines both perpendicular to the same line are parallel to each other. Hence the two tangents are parallel." },
    { id: "ch10-q11", type: "sa", topic: "Tangent length", diff: "medium", marks: 2, q: "A circle has radius 8 cm. A tangent at point A on it meets a line through the centre O at point P such that OP = 17 cm. Find AP.", answer: "15 cm", explain: "ΔOAP is right at A: AP = √(OP² − OA²) = √(289 − 64) = √225 = 15 cm." },
    { id: "ch10-q12", type: "la", topic: "Tangent properties", diff: "hard", marks: 3, q: "In the figure, a triangle ABC is drawn to circumscribe a circle. The sides BC, CA and AB touch the circle at D, E and F respectively. If BC = 14 cm, BD = 5 cm and CD... AF = 5 cm... Find the side lengths: given BD = 6 cm, DC = 8 cm and AE = 4 cm, find AB and AC.", answer: "AB = 10 cm, AC = 12 cm", explain: "Tangents from the same vertex are equal: from B, BF = BD = 6 cm; from C, CE = CD = 8 cm; from A, AF = AE = 4 cm.\nAB = AF + BF = 4 + 6 = 10 cm.\nAC = AE + CE = 4 + 8 = 12 cm.\n(BC = BD + DC = 6 + 8 = 14 cm ✓.)" },
    { id: "ch10-q13", type: "la", topic: "Tangent length", diff: "medium", marks: 3, q: "From an external point P, two tangents PA and PB are drawn to a circle of centre O. If OP = 2r where r is the radius, find ∠APB.", answer: "∠APB = 60°", explain: "In right ΔOAP: sin(∠OPA) = OA/OP = r/2r = 1/2 ⇒ ∠OPA = 30°. OP bisects ∠APB, so ∠APB = 2 × 30° = 60°." },
    { id: "ch10-q14", type: "case", topic: "Tangent properties", diff: "medium", marks: 4, q: "A circular park of radius 20 m has three friends sitting at equal distances on its boundary... Two friends are at points A and B on the circle, and a third stands at an external point P with straight paths PA and PB that just touch the park (tangents). [Practice Question]\n\nIf the centre O is 40 m from P, the length of each tangent path is:\nAlso, the angle the line PO makes with PA is (given r ⟂ PA):", options: ["Tangent = 20√3 m; angle at P between PO and PA = 30°", "Tangent = 20 m; angle = 45°", "Tangent = 20√3 m; angle = 60°", "Tangent = 40 m; angle = 30°"], answer: 0, explain: "Tangent = √(OP² − r²) = √(1600 − 400) = √1200 = 20√3 m.\nIn right ΔOAP: sin(∠OPA) = OA/OP = 20/40 = 1/2 ⇒ ∠OPA = 30°." },
    { id: "ch10-q15", type: "competency", topic: "Tangent–radius", diff: "hard", marks: 2, q: "In two concentric circles, a chord of the outer circle of length 24 cm is tangent to the inner circle. The outer radius is 13 cm. Find the inner radius.", answer: "5 cm", explain: "Half the chord = 12 cm. Radius to the tangent point is perpendicular to the chord, so in the right triangle: inner r = √(13² − 12²) = √(169 − 144) = √25 = 5 cm." }
  ],
  revision: {
    points: [
      "Tangent touches the circle at exactly one point; secant cuts it at two points.",
      "Tangent is perpendicular to the radius at the contact point — right triangle with Pythagoras.",
      "Tangent length from external point P: √(OP² − r²).",
      "Tangents from an external point: exactly two, and equal in length.",
      "Tangent from a point on the circle: 1; from a point inside: none.",
      "Quadrilateral circumscribing a circle: sums of opposite sides are equal (AB + CD = BC + AD)."
    ],
    mistakes: [
      "Forgetting the right angle between radius and tangent — without it Pythagoras is wrongly applied.",
      "Using the centre-to-point distance as the tangent length (it is √(OP² − r²), not OP).",
      "In tangential quadrilaterals, writing AB + BC = CD + DA — correct is sum of opposite sides: AB + CD = AD + BC.",
      "Assuming tangents can be drawn from inside the circle (they cannot)."
    ],
    tricks: [
      "Every circle-tangent figure hides a right triangle: mark radius r, external distance d, tangent √(d²−r²).",
      "Circumscribed polygon problems → label tangent segments from each vertex equal (often set AF = AE = x, etc.).",
      "Angle questions: OP bisects the angle between the two tangents; each half is found from the right triangle."
    ]
  }
});
