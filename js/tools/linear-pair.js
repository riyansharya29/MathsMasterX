/* Tool: Pair of Linear Equations in two variables */
MMX.toolkit.register({
  id: "linear-pair",
  render(mount) {
    const tx = MMX.tx;
    mount.innerHTML = `
      <div class="muted mb8">Solve <b>a₁x + b₁y = c₁</b> and <b>a₂x + b₂y = c₂</b>:</div>
      <div class="field"><label>Equation 1</label><div class="input-row-3">
        <input class="input" id="a1" inputmode="numeric" value="2" style="text-align:center"><span class="center">x +</span>
        <input class="input" id="b1" inputmode="numeric" value="3" style="text-align:center"><span class="center">y =</span>
        <input class="input" id="c1" inputmode="numeric" value="11" style="text-align:center">
      </div></div>
      <div class="field"><label>Equation 2</label><div class="input-row-3">
        <input class="input" id="a2" inputmode="numeric" value="2" style="text-align:center"><span class="center">x −</span>
        <input class="input" id="b2" inputmode="numeric" value="-3" style="text-align:center"><span class="center">y =</span>
        <input class="input" id="c2" inputmode="numeric" value="5" style="text-align:center">
      </div></div>
      <button class="btn primary block" id="lpGo">Solve system</button>
      ${MMX.tk.out("lpOut")}`;
    const run = () => {
      const out = mount.querySelector("#lpOut");
      const v = ["a1", "b1", "c1", "a2", "b2", "c2"].map((i) => parseFloat(mount.querySelector("#" + i).value));
      if (v.some(isNaN)) { out.innerHTML = MMX.tk.res("Input needed", "Fill all six coefficient boxes.", "err"); return; }
      const [a1, b1, c1, a2, b2, c2] = v;
      const r = tx.solveLinearPair(a1, b1, c1, a2, b2, c2);
      let headline;
      if (r.kind === "one") headline = `<b>One unique solution: x = ${r.xStr}, y = ${r.yStr}</b>`;
      else if (r.kind === "none") headline = `<b>No solution</b> — the lines are parallel.`;
      else headline = `<b>Infinitely many solutions</b> — the lines are coincident.`;
      const extra = r.kind === "one"
        ? [`Check: substitute back → (${a1})(${r.x}) + (${b1})(${r.y}) = ${Math.round((a1 * r.x + b1 * r.y) * 100) / 100} = c₁ ✓`]
        : r.kind === "none"
          ? ["Condition a₁/a₂ = b₁/b₂ ≠ c₁/c₂ holds → parallel lines."]
          : ["Condition a₁/a₂ = b₁/b₂ = c₁/c₂ holds → coincident lines."];
      out.innerHTML = MMX.tk.res("Result", headline + MMX.tk.steps(r.steps.slice(2).concat(extra)), r.kind === "none" ? "err" : "ok");
    };
    mount.querySelector("#lpGo").addEventListener("click", run);
    mount.querySelectorAll("input").forEach((i) => i.addEventListener("keydown", (e) => { if (e.key === "Enter") run(); }));
    run();
  }
});
