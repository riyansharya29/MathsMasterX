/* Chapter 9 — Some Applications of Trigonometry (CBSE Class 10) */
MMX.registerChapter({
  id: "applications-trigonometry",
  name: "Some Applications of Trigonometry",
  icon: "🗼",
  concepts: [
    { h: "Angle of elevation", p: "The **angle of elevation** is the angle between the horizontal line from the observer and the line of sight to an object **above** the horizontal level.\nHere height = opposite side and horizontal distance = adjacent side." },
    { h: "Angle of depression", p: "The **angle of depression** is the angle between the horizontal line from the observer (at height) and the line of sight to an object **below**. By alternate interior angles, angle of depression = angle of elevation from the object back to the observer." },
    { h: "Solving strategy", p: "1. Draw the right triangle: vertical leg = height/difference of heights, horizontal leg = distance.\n2. Mark the known angle and known side.\n3. Use **tan θ = height/distance** when height and distance are involved; **sin/cos** when the line of sight (hypotenuse) is involved.\n4. Use √3 ≈ 1.732 when a decimal answer is required." },
    { h: "Two-angle problems", p: "When the same object is viewed from two points (angles θ₁, θ₂), write two tan equations:\nh = d₁ tan θ₁ = d₂ tan θ₂.\nRelate the two distances (often d₂ = d₁ + x where x is the distance between observation points) and solve the pair." }
  ],
  formulas: [
    { id: "ch9-f1", name: "Height from angle of elevation", cat: "Trigonometry", expr: "tan θ = h/d  ⇒  h = d tan θ", vars: "h = height of object, d = distance of observer from base, θ = angle of elevation", explain: "Most-used relation in heights and distances.", example: "At d = 100 m with θ = 45°: h = 100 × 1 = 100 m." },
    { id: "ch9-f2", name: "Distance from height", cat: "Trigonometry", expr: "d = h / tan θ = h cot θ", vars: "Known height h and angle θ", explain: "Use when the tower/building height is given.", example: "From a 50 m tower with angle of depression 45°, the boat is 50 m away." },
    { id: "ch9-f3", name: "Line of sight (hypotenuse)", cat: "Trigonometry", expr: "line of sight = h / sin θ = d / cos θ", vars: "Use when the slant distance is asked", explain: "sin θ = h/(line of sight); cos θ = d/(line of sight).", example: "A kite string at 30° with height 60 m: string = 60/sin30 = 120 m." },
    { id: "ch9-f4", name: "Angle of depression relation", cat: "Trigonometry", expr: "angle of depression = angle of elevation", vars: "Alternate interior angles with the horizontal", explain: "Let you work with the angle at the ground object instead of the top.", example: "Looking down at 60° from a tower means the ground object looks up at 60°." },
    { id: "ch9-f5", name: "Two positions", cat: "Trigonometry", expr: "h = x /(cot θ₁ − cot θ₂)", vars: "x = distance between the two observation points; θ₁ nearer, θ₂ farther... object height h", explain: "Derived from d + x and d equations; keeps the solution to one step.", example: "Angles 60° and 30° from points 20 m apart: h = 20/(1/√3 − √3) → 10√3 m." }
  ],
  examples: [
    {
      id: "ch9-e1", title: "Height of a tower from elevation",
      given: "The angle of elevation of the top of a tower from a point 30 m from its foot is 60°. Find the tower's height.",
      concept: "tan θ = height/distance.",
      steps: [
        { t: "Step 1", x: "d = 30 m, θ = 60°, tan 60° = √3." },
        { t: "Step 2", x: "h = d tan 60° = 30 × √3 = 30√3 m." },
        { t: "Final Answer", x: "Height = 30√3 m ≈ 51.96 m.", ans: true }
      ]
    },
    {
      id: "ch9-e2", title: "Angle of depression from a lighthouse",
      given: "From the top of a 75 m lighthouse, the angle of depression of a ship is 45°. Find the ship's distance from the lighthouse.",
      concept: "Angle of depression = angle of elevation (alternate angles); d = h cot θ.",
      steps: [
        { t: "Step 1", x: "h = 75 m; angle of elevation from ship = 45°; cot 45° = 1." },
        { t: "Step 2", x: "d = h cot 45° = 75 × 1 = 75 m." },
        { t: "Final Answer", x: "The ship is 75 m from the lighthouse.", ans: true }
      ]
    },
    {
      id: "ch9-e3", title: "Two angles of elevation",
      given: "From a point on the ground the angle of elevation to a tower is 30°. On walking 20 m towards the tower it becomes 60°. Find the tower height.",
      concept: "Write h = x tan60 and h = (x + 20) tan30 for near distance x.",
      steps: [
        { t: "Step 1", x: "Let the nearer point be x m from the tower. h = x√3 …(i); from the farther point: h = (x + 20)(1/√3) …(ii)." },
        { t: "Step 2", x: "Equate: x√3 = (x + 20)/√3 ⇒ 3x = x + 20 ⇒ 2x = 20 ⇒ x = 10 m." },
        { t: "Step 3", x: "h = 10√3 m." },
        { t: "Final Answer", x: "Height = 10√3 m ≈ 17.32 m.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch9-q1", type: "mcq", topic: "Angle of elevation", diff: "easy", marks: 1, q: "At a distance of 100 m from the foot of a tower, the angle of elevation of its top is 45°. The tower's height is:", options: ["100 m", "100√3 m", "100/√3 m", "50 m"], answer: 0, explain: "h = 100 × tan 45° = 100 × 1 = 100 m." },
    { id: "ch9-q2", type: "mcq", topic: "Line of sight", diff: "medium", marks: 1, q: "A kite is flying at a height of 60 m. The string makes an angle of 30° with the ground. Assuming no slack, the length of the string is:", options: ["120 m", "60√3 m", "120√3 m", "90 m"], answer: 0, explain: "sin 30° = h/string ⇒ 1/2 = 60/string ⇒ string = 120 m." },
    { id: "ch9-q3", type: "mcq", topic: "Angle of depression", diff: "easy", marks: 1, q: "If a pole 6 m high casts a shadow 2√3 m long on the ground, the sun's elevation is:", options: ["60°", "30°", "45°", "90°"], answer: 0, explain: "tan θ = 6/(2√3) = 3/√3 = √3 ⇒ θ = 60°." },
    { id: "ch9-q4", type: "mcq", topic: "Angle of elevation", diff: "medium", marks: 1, q: "The ratio of the length of a vertical rod to its shadow is 1 : √3. The angle of elevation of the sun is:", options: ["30°", "60°", "45°", "90°"], answer: 0, explain: "tan θ = rod/shadow = 1/√3 ⇒ θ = 30°." },
    { id: "ch9-q5", type: "mcq", topic: "Two positions", diff: "hard", marks: 1, q: "As the observer moves towards a tower, the angle of elevation of its top:", options: ["increases", "decreases", "remains the same", "becomes zero"], answer: 0, explain: "Distance decreases and height is fixed, so tan θ = h/d increases → the angle of elevation increases." },
    { id: "ch9-q6", type: "ar", topic: "Angle of depression", diff: "medium", marks: 1, q: "**Assertion (A):** The angle of depression from the top of a tower to an object equals the angle of elevation of the tower's top from the object.\n**Reason (R):** The two angles are alternate interior angles formed by a transversal cutting parallel horizontal lines.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "The horizontals at the top and ground are parallel, and the line of sight is the transversal → alternate angles equal. R explains A." },
    { id: "ch9-q7", type: "vsa", topic: "Angle of elevation", diff: "easy", marks: 1, q: "Find the angle of elevation of the top of a 100√3 m tall pole from a point 100 m away from its foot.", answer: "60°", explain: "tan θ = 100√3/100 = √3 ⇒ θ = 60°." },
    { id: "ch9-q8", type: "sa", topic: "Angle of elevation", diff: "medium", marks: 2, q: "A circus artist climbs a 20 m rope stretched from the top of a vertical pole to the ground. If the rope makes 30° with the ground, find the height of the pole.", answer: "10 m", explain: "The rope is the hypotenuse: sin 30° = h/20 ⇒ h = 20 × 1/2 = 10 m." },
    { id: "ch9-q9", type: "la", topic: "Two positions", diff: "medium", marks: 3, q: "From a point P on the ground, the angle of elevation of the top of a 10 m tall building is 30°. A flagstaff is fixed on the building and the angle of elevation of the top of the flagstaff from P is 45°. Find the flagstaff's length. (√3 = 1.732)", answer: "7.32 m", explain: "Distance of P from building: tan 30° = 10/d ⇒ d = 10√3 m.\nLet flagstaff length = f. Total height = 10 + f; tan 45° = (10 + f)/d = 1 ⇒ 10 + f = d = 10√3.\nf = 10√3 − 10 = 10(1.732 − 1) = 10 × 0.732 = 7.32 m." },
    { id: "ch9-q10", type: "la", topic: "Two buildings", diff: "hard", marks: 3, q: "The angles of depression of the top and bottom of an 8 m tall building from the top of a multi-storeyed building are 30° and 45° respectively. Find the height of the multi-storeyed building.", answer: "4(3 + √3) m ≈ 18.93 m", explain: "Let the tall building height = H and the buildings be d apart.\nFrom top to bottom (45°): tan 45 = H/d ⇒ d = H.\nFrom top to top of small building (30°): vertical gap = H − 8; tan 30 = (H − 8)/d = (H − 8)/H.\nSo 1/√3 = (H − 8)/H ⇒ H = √3 H − 8√3 ⇒ H(√3 − 1) = 8√3 ⇒ H = 8√3/(√3 − 1).\nRationalise: 8√3(√3 + 1)/(3 − 1) = 4√3(√3 + 1) = 4(3 + √3) ≈ 4 × 4.732 = 18.93 m." },
    { id: "ch9-q11", type: "case", topic: "Angle of elevation", diff: "medium", marks: 4, q: "A group of students on a river bank observes a temple on the opposite bank. From their point A, the angle of elevation of the temple top is 30°. They then walk 40 m along the bank... find the temple height: [Practice Question] From point X the angle is 30°, and after walking 40 m directly towards the temple to point Y, the angle is 60°.\n\n(i) The temple's height is:\n(ii) Distance of the temple from point Y is:", options: ["(i) 20√3 m  (ii) 20 m", "(i) 20 m  (ii) 20√3 m", "(i) 40√3 m  (ii) 40 m", "(i) 30 m  (ii) 30√3 m"], answer: 0, explain: "Let distance YT = x, height h. h = x tan 60 = x√3; h = (x + 40) tan 30 = (x + 40)/√3.\n3x = x + 40 ⇒ x = 20 m. h = 20√3 m ≈ 34.64 m." },
    { id: "ch9-q12", type: "competency", topic: "Two positions", diff: "hard", marks: 3, q: "A 1.5 m tall boy stands at some distance from a 30 m tall building. The angle of elevation from his eyes to the top of the building increases from 30° to 60° as he walks towards the building. Find the distance he walked.", answer: "19√3 m ≈ 32.9 m", explain: "Height above eyes = 30 − 1.5 = 28.5 m = 57/2 m.\nNearer distance d₁ = (57/2) cot 60 = (57/2)(1/√3) = 19√3/2 m.\nFarther distance d₂ = (57/2) cot 30 = (57/2)√3 = 57√3/2 m.\nDistance walked = d₂ − d₁ = (57√3/2 − 19√3/2) = 38√3/2 = 19√3 m ≈ 32.91 m." }
  ],
  revision: {
    points: [
      "Angle of elevation: looking up from the horizontal; angle of depression: looking down.",
      "Angle of depression = angle of elevation (alternate interior angles between parallel horizontals).",
      "tan θ = height/distance; sin θ = height/line-of-sight; cos θ = distance/line-of-sight.",
      "For two observation points: h = d₁ tan θ₁ = d₂ tan θ₂, with d₂ = d₁ + walking distance.",
      "Include the observer's height for elevation problems: use height above eye level.",
      "Answers in √3 form are exact; use √3 ≈ 1.732 only when a decimal is asked."
    ],
    mistakes: [
      "Forgetting to subtract the boy/observer height in elevation problems (use vertical gap, not full height).",
      "Using sin/cos when height and horizontal distance are the knowns — tan is the right ratio then.",
      "Treating angle of depression as measured from the vertical (it is from the HORIZONTAL).",
      "Mixing which distance is d₁ and d₂ in two-position problems; the nearer point always gives the larger angle."
    ],
    tricks: [
      "Draw the figure FIRST: right triangle with vertical h and horizontal d; mark angle at the ground point.",
      "Special angles give quick answers: 45° ⇒ h = d; 30° ⇒ d = √3 h; 60° ⇒ h = √3 d.",
      "In two-position problems with angles 30° and 60°, the walking distance equals twice the nearer distance."
    ]
  }
});
