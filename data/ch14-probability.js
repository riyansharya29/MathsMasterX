/* Chapter 14 — Probability (CBSE Class 10) */
MMX.registerChapter({
  id: "probability",
  name: "Probability",
  icon: "🎲",
  concepts: [
    { h: "Theoretical probability", p: "For an experiment with equally likely outcomes:\n**P(E) = Number of outcomes favourable to E / Total number of possible outcomes**\nThe sample space S lists every possible outcome, so P(E) = n(E)/n(S)." },
    { h: "Range of probability", p: "• **0 ≤ P(E) ≤ 1** always.\n• A **sure (certain) event** has P(E) = 1.\n• An **impossible event** has P(E) = 0.\n• Probabilities are never negative and never exceed 1." },
    { h: "Complementary events", p: "The event 'E does NOT happen' is written Ē (not E).\n**P(E) + P(Ē) = 1**, so **P(Ē) = 1 − P(E)**.\nUse this when counting 'none of…' outcomes is easier." },
    { h: "Standard experiments", p: "• **Coin**: n(S) = 2 (H, T); a fair coin gives P(H) = P(T) = 1/2.\n• **Die** (faces 1-6): n(S) = 6.\n• **Two coins / two dice**: n(S) = 4 (HH, HT, TH, TT) and n(S) = 36 respectively (ordered outcomes).\n• **Cards**: 52 cards in 4 suits (13 each): spades♠, clubs♣ (black), hearts♥, diamonds♦ (red). Each suit has A, 2-10, J, Q, K.\n• **Bag of balls**: total outcomes = total balls; favourable = balls of the asked colour." },
    { h: "Solving approach", p: "1. Identify/describe the sample space and count total outcomes n(S).\n2. Count favourable outcomes n(E) carefully (list for small cases).\n3. Simplify the fraction. 'At least one' type questions → often use 1 − P(none)." }
  ],
  formulas: [
    { id: "ch14-f1", name: "Probability of an event", cat: "Probability", expr: "P(E) = n(E)/n(S)", vars: "n(E) = favourable outcomes, n(S) = total equally likely outcomes", explain: "Core classical definition.", example: "Rolling a die: P(even) = 3/6 = 1/2." },
    { id: "ch14-f2", name: "Complement", cat: "Probability", expr: "P(Ē) = 1 − P(E)", vars: "Ē = event E not happening", explain: "Handy for 'at least one' and 'none' questions.", example: "If P(rain) = 0.3, P(no rain) = 0.7." },
    { id: "ch14-f3", name: "Certain & impossible events", cat: "Probability", expr: "P(sure event) = 1 ;  P(impossible event) = 0", vars: "Bounds: 0 ≤ P(E) ≤ 1", explain: "Any probability outside [0,1] means a counting error.", example: "P(sun rises in the east) = 1; P(7 on a standard die) = 0." },
    { id: "ch14-f4", name: "Cards count", cat: "Probability", expr: "52 cards = 4 suits × 13", vars: "26 red (♥, ♦) + 26 black (♠, ♣); 12 face cards (J, Q, K × 4)", explain: "Aces are 4; number cards 2-10 total 36.", example: "P(king) = 4/52 = 1/13; P(red card) = 26/52 = 1/2." },
    { id: "ch14-f5", name: "Two dice table", cat: "Probability", expr: "n(S) = 36 for two dice", vars: "Ordered pairs (1,1)…(6,6); sums range 2-12", explain: "Number of pairs for sums: 2→1, 3→2, 4→3, 5→4, 6→5, 7→6, 8→5, 9→4, 10→3, 11→2, 12→1.", example: "P(sum = 7) = 6/36 = 1/6." }
  ],
  examples: [
    {
      id: "ch14-e1", title: "One die roll",
      given: "A fair die is rolled once. Find the probability of getting (i) an even number, (ii) a number greater than 4.",
      concept: "P(E) = favourable/total; n(S) = 6.",
      steps: [
        { t: "Step 1", x: "Sample space = {1,2,3,4,5,6}." },
        { t: "Step 2", x: "(i) Even: {2,4,6} → 3 outcomes → P = 3/6 = 1/2." },
        { t: "Step 3", x: "(ii) >4: {5,6} → 2 outcomes → P = 2/6 = 1/3." },
        { t: "Final Answer", x: "(i) 1/2  (ii) 1/3.", ans: true }
      ]
    },
    {
      id: "ch14-e2", title: "Card from a pack",
      given: "One card is drawn from a well-shuffled deck of 52 cards. Find the probability of getting (i) a king, (ii) a red face card.",
      concept: "Count favourable cards out of 52.",
      steps: [
        { t: "Step 1", x: "(i) Kings = 4 → P = 4/52 = 1/13." },
        { t: "Step 2", x: "(ii) Face cards per suit = J, Q, K (3); red suits = 2 → 3 × 2 = 6 red face cards." },
        { t: "Final Answer", x: "(i) 1/13  (ii) 6/52 = 3/26.", ans: true }
      ]
    },
    {
      id: "ch14-e3", title: "Using the complement",
      given: "Two dice are thrown. Find the probability that the numbers shown do NOT add up to 8.",
      concept: "P(not 8) = 1 − P(sum 8).",
      steps: [
        { t: "Step 1", x: "Total outcomes = 36. Pairs with sum 8: (2,6),(3,5),(4,4),(5,3),(6,2) = 5." },
        { t: "Step 2", x: "P(sum 8) = 5/36." },
        { t: "Step 3", x: "P(not 8) = 1 − 5/36 = 31/36." },
        { t: "Final Answer", x: "31/36.", ans: true }
      ]
    }
  ],
  questions: [
    { id: "ch14-q1", type: "mcq", topic: "Basic", diff: "easy", marks: 1, q: "The probability of an impossible event is:", options: ["1", "0", "1/2", "not defined"], answer: 1, explain: "An impossible event has no favourable outcomes → P = 0." },
    { id: "ch14-q2", type: "mcq", topic: "Coin", diff: "easy", marks: 1, q: "Two coins are tossed together. The probability of getting at least one head is:", options: ["3/4", "1/2", "1/4", "1"], answer: 0, explain: "S = {HH, HT, TH, TT}; at least one head = {HH, HT, TH} = 3 → 3/4." },
    { id: "ch14-q3", type: "mcq", topic: "Die", diff: "easy", marks: 1, q: "A die is thrown once. The probability of getting a prime number is:", options: ["1/2", "1/3", "2/3", "1/6"], answer: 0, explain: "Primes on a die: 2, 3, 5 → 3 outcomes out of 6 → 1/2." },
    { id: "ch14-q4", type: "mcq", topic: "Cards", diff: "medium", marks: 1, q: "A card is drawn from 52 cards. The probability of drawing an ace is:", options: ["1/13", "1/26", "1/52", "4/13"], answer: 0, explain: "4 aces out of 52 → 4/52 = 1/13." },
    { id: "ch14-q5", type: "mcq", topic: "Two dice", diff: "medium", marks: 1, q: "Two dice are thrown. The probability of getting a doublet (same numbers) is:", options: ["1/6", "1/3", "5/36", "1/12"], answer: 0, explain: "Doublets: (1,1)…(6,6) = 6 outcomes → 6/36 = 1/6." },
    { id: "ch14-q6", type: "mcq", topic: "Complement", diff: "medium", marks: 1, q: "If P(E) = 0.05, then P(not E) is:", options: ["0.95", "0.5", "0.05", "1"], answer: 0, explain: "P(Ē) = 1 − P(E) = 1 − 0.05 = 0.95." },
    { id: "ch14-q7", type: "mcq", topic: "Balls", diff: "easy", marks: 1, q: "A bag contains 3 red and 5 black balls. One ball is drawn at random. Probability it is NOT red is:", options: ["5/8", "3/8", "1/2", "3/5"], answer: 0, explain: "Non-red (black) = 5 out of 8 → 5/8." },
    { id: "ch14-q8", type: "ar", topic: "Range", diff: "easy", marks: 1, q: "**Assertion (A):** A probability of 1.2 for some event shows a calculation mistake.\n**Reason (R):** The probability of any event lies between 0 and 1, inclusive.", options: ["Both A and R are true and R is the correct explanation of A", "Both A and R are true but R is not the correct explanation of A", "A is true but R is false", "A is false but R is true"], answer: 0, explain: "P(E) ∈ [0, 1] always; 1.2 is impossible — R explains A." },
    { id: "ch14-q9", type: "vsa", topic: "Basic", diff: "easy", marks: 1, q: "A letter of the English alphabet is chosen at random. What is the probability it is a vowel?", answer: "5/26", explain: "26 letters; vowels A, E, I, O, U = 5 → 5/26." },
    { id: "ch14-q10", type: "vsa", topic: "Two dice", diff: "medium", marks: 1, q: "Two dice are rolled. Find the probability that the sum is 10.", answer: "1/12", explain: "Pairs with sum 10: (4,6),(5,5),(6,4) = 3 → 3/36 = 1/12." },
    { id: "ch14-q11", type: "sa", topic: "Cards", diff: "medium", marks: 2, q: "A card is drawn at random from a well-shuffled deck. Find the probability that the card is (i) red, (ii) a face card.", answer: "(i) 1/2  (ii) 3/13", explain: "(i) Red cards = 26 → 26/52 = 1/2.\n(ii) Face cards = J, Q, K in each of 4 suits = 12 → 12/52 = 3/13." },
    { id: "ch14-q12", type: "sa", topic: "Balls", diff: "medium", marks: 2, q: "A bag contains 5 white, 7 red and 8 black balls. A ball is drawn at random. Find the probability it is (i) white or red, (ii) not black.", answer: "(i) 3/5  (ii) 3/5", explain: "Total = 20 balls.\n(i) White or red = 5 + 7 = 12 → 12/20 = 3/5.\n(ii) Not black = 20 − 8 = 12 → 12/20 = 3/5." },
    { id: "ch14-q13", type: "la", topic: "Two dice", diff: "medium", marks: 3, q: "Two dice are thrown simultaneously. Find the probability of getting (i) a sum of 7, (ii) a sum greater than 9, (iii) an even number on the first die.", answer: "(i) 1/6  (ii) 1/6  (iii) 1/2", explain: "Total outcomes = 36.\n(i) Sum 7 pairs: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 → 6/36 = 1/6.\n(ii) Sum >9: sum 10 (3), 11 (2), 12 (1) = 6 → 6/36 = 1/6.\n(iii) First die even (2,4,6): 3 choices with any second die → 3 × 6 = 18 → 18/36 = 1/2." },
    { id: "ch14-q14", type: "case", topic: "Cards", diff: "medium", marks: 4, q: "In a card game, one card is drawn at random from a standard deck of 52. [Practice Question]\n\n(i) Probability of drawing a black king is:\n(ii) Probability of drawing neither a spade nor a club (i.e., a red card) is:", options: ["(i) 1/26  (ii) 1/2", "(i) 1/13  (ii) 1/2", "(i) 1/26  (ii) 1/4", "(i) 2/13  (ii) 3/4"], answer: 0, explain: "(i) Black kings: king of spades + king of clubs = 2 → 2/52 = 1/26.\n(ii) Red cards = 26 → 26/52 = 1/2." },
    { id: "ch14-q15", type: "case", topic: "Balls", diff: "medium", marks: 4, q: "A box contains 90 discs numbered 1 to 90. One disc is drawn at random. [Practice Question]\n\n(i) Probability it bears a two-digit number is:\n(ii) Probability it bears a perfect square is:", options: ["(i) 9/10  (ii) 1/10", "(i) 81/90  (ii) 9/90", "(i) 89/90  (ii) 1/10", "(i) 9/10  (ii) 9/90"], answer: 0, explain: "(i) Two-digit numbers: 10 to 90 = 81 discs → 81/90 = 9/10.\n(ii) Perfect squares ≤ 90: 1, 4, 9, 16, 25, 36, 49, 64, 81 = 9 → 9/90 = 1/10." },
    { id: "ch14-q16", type: "competency", topic: "Complement", diff: "hard", marks: 3, q: "A lot of 24 electric bulbs contains 6 defective ones. One bulb is drawn at random. (i) Find P(defective). (ii) If the bulb drawn in (i) is good and is not replaced, then a second bulb is drawn; find P(this one is good too).", answer: "(i) 1/4  (ii) 17/23", explain: "(i) P(defective) = 6/24 = 1/4.\n(ii) After one good bulb is removed: 23 bulbs remain, of which good = 24 − 6 − 1 = 17. P(good) = 17/23." }
  ],
  revision: {
    points: [
      "P(E) = favourable outcomes / total equally likely outcomes = n(E)/n(S).",
      "0 ≤ P(E) ≤ 1; sure event = 1, impossible event = 0.",
      "Complementary events: P(E) + P(Ē) = 1; P(Ē) = 1 − P(E).",
      "One coin: 2 outcomes; two coins: 4; one die: 6; two dice: 36 ordered pairs.",
      "Cards: 52 = 4 suits × 13; red 26, black 26; 4 aces; 12 face cards.",
      "'At least one' / 'not' phrasing → use the complement rule."
    ],
    mistakes: [
      "Counting two-dice outcomes as 21 (unordered) instead of 36 equally likely ordered outcomes.",
      "Treating face cards as including the ace (face cards are only J, Q, K).",
      "Forgetting to remove the drawn item in 'not replaced' (without replacement) problems.",
      "Reporting probability > 1 or negative — a sure sign of a counting error."
    ],
    tricks: [
      "For 'at least one head' with two coins: 1 − P(TT) = 1 − 1/4 = 3/4.",
      "Two-dice sum counts follow a pattern 1,2,3,4,5,6,5,4,3,2,1 for sums 2 through 12.",
      "Always simplify the final fraction (e.g. 12/20 → 3/5)."
    ]
  }
});
