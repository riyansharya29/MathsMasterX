/* Tool: Probability Calculator — CBSE Class 10 (local, no AI)
   P(E) = favourable outcomes / total outcomes ; P(not E) = 1 − P(E).
   Presets for dice, coin and cards, plus fully custom values. */
MMX.toolkit.register({
  id: "probability-calculator",
  render(mount) {
    const tx = MMX.tx;
    const esc = MMX.util.esc;

    // Preset: [label, total, eventChips[]]  chip = [text, favourable]
    const PRESETS = {
      dice: {
        icon: "🎲", label: "A fair die (6 outcomes)", total: 6,
        events: [
          ["A specific number (say 3)", 1], ["An even number (2,4,6)", 3],
          ["An odd number (1,3,5)", 3], ["A multiple of 3 (3,6)", 2],
          ["Number greater than 4 (5,6)", 2], ["A prime (2,3,5)", 3],
          ["Number not less than 2", 5]
        ]
      },
      coin: {
        icon: "🪙", label: "A fair coin (2 outcomes)", total: 2,
        events: [["Heads", 1], ["Tails", 1]]
      },
      cards: {
        icon: "🃏", label: "A standard deck (52 cards)", total: 52,
        events: [
          ["A red card", 26], ["A black card", 26], ["A heart (♥)", 13], ["A spade (♠)", 13],
          ["A king", 4], ["A queen", 4], ["An ace", 4],
          ["A face card (J/Q/K)", 12], ["A card of number 5", 4], ["A non-face card", 40]
        ]
      },
      custom: { icon: "✏️", label: "Custom experiment", total: "", events: [] }
    };

    mount.innerHTML = `
      <div class="btn-row" id="pbPreset">
        <button class="btn ghost small" data-p="dice">🎲 Dice</button>
        <button class="btn ghost small" data-p="coin">🪙 Coin</button>
        <button class="btn ghost small" data-p="cards">🃏 Cards</button>
        <button class="btn ghost small" data-p="custom">✏️ Custom</button>
      </div>
      <div class="field"><label>Event / experiment</label><input class="input" id="pbEvent" placeholder="e.g. rolling an even number"></div>
      <div class="input-row">
        <div class="field"><label>Favourable outcomes</label><input class="input" id="pbFav" type="number" step="1" min="0"></div>
        <div class="field"><label>Total outcomes</label><input class="input" id="pbTot" type="number" step="1" min="1"></div>
      </div>
      <div id="pbChips" class="btn-row" style="flex-wrap:wrap"></div>
      <button class="btn primary block" id="pbGo">Calculate probability</button>
      ${MMX.tk.out("pbOut")}`;

    const out = mount.querySelector("#pbOut");
    const chips = mount.querySelector("#pbChips");

    function loadPreset(key) {
      const p = PRESETS[key];
      mount.querySelector("#pbEvent").value = p.label === "Custom experiment" ? "" : p.label;
      mount.querySelector("#pbTot").value = p.total;
      mount.querySelector("#pbFav").value = "";
      chips.innerHTML = "";
      p.events.forEach(([txt, fav]) => {
        const b = document.createElement("button");
        b.className = "btn ghost small";
        b.textContent = txt;
        b.addEventListener("click", () => {
          mount.querySelector("#pbEvent").value = p.icon + " " + txt;
          mount.querySelector("#pbFav").value = fav;
        });
        chips.appendChild(b);
      });
      mount.querySelectorAll("#pbPreset .btn").forEach((b) =>
        b.classList.toggle("primary", b.dataset.p === key));
    }
    mount.querySelector("#pbPreset").addEventListener("click", (e) => {
      const b = e.target.closest("[data-p]"); if (!b) return;
      loadPreset(b.dataset.p);
    });

    mount.querySelector("#pbGo").addEventListener("click", () => {
      const fav = Number(mount.querySelector("#pbFav").value);
      const tot = Number(mount.querySelector("#pbTot").value);
      const ev = mount.querySelector("#pbEvent").value.trim();
      if (!Number.isInteger(fav) || !Number.isInteger(tot)) {
        out.innerHTML = MMX.tk.res("Input needed", "Favourable and total outcomes must be whole numbers.", "err"); return;
      }
      if (tot <= 0) {
        out.innerHTML = MMX.tk.res("Invalid input", "Total outcomes must be greater than 0 (cannot divide by zero).", "err"); return;
      }
      if (fav < 0) {
        out.innerHTML = MMX.tk.res("Invalid input", "Favourable outcomes cannot be negative.", "err"); return;
      }
      if (fav > tot) {
        out.innerHTML = MMX.tk.res("Invalid input", "Favourable outcomes (" + fav + ") cannot exceed total outcomes (" + tot + ").", "err"); return;
      }
      const g = tx.gcd(fav, tot);
      const fN = fav / g, fD = tot / g;
      const p = fav / tot;
      const q = 1 - p;
      const qf = tx.fstr(tx.F(tot - fav, tot));
      const pct = (p * 100).toFixed(2).replace(/\.?0+$/, "");
      const certain = fav === tot, impossible = fav === 0;

      const verdict = certain ? "This event is <b>certain</b> (P = 1)."
                    : impossible ? "This event is <b>impossible</b> (P = 0)."
                    : "This event is <b>possible but not certain</b> (0 &lt; P &lt; 1).";

      const steps = [
        (ev ? "Event: <b>" + esc(ev) + "</b><br>" : "") + "Favourable outcomes = <b>" + fav + "</b>, total outcomes = <b>" + tot + "</b>",
        "Formula: P(E) = favourable outcomes / total outcomes",
        "Substitution: P(E) = " + fav + " / " + tot + (g > 1 ? " = <b>" + fN + "/" + fD + "</b>" : ""),
        "P(E) = <b>" + (fN + "/" + fD) + "</b> &nbsp;≈&nbsp; " + (+p.toFixed(4)) + " &nbsp;(" + pct + "%)",
        "Complementary probability: P(not E) = 1 − P(E) = (" + tot + " − " + fav + ")/" + tot + " = <b>" + qf + "</b> ≈ " + (+q.toFixed(4)),
        verdict
      ];
      out.innerHTML = MMX.tk.res("Probability result",
        `<div class="kpad" style="margin-bottom:8px;font-size:1.05rem">P(E) = <b>${fN}/${fD}</b> &nbsp;·&nbsp; P(not E) = <b>${qf}</b></div>`
        + MMX.tk.steps(steps), "ok");
    });

    loadPreset("dice");
  }
});
