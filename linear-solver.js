/* Tool: Linear (one-variable) Equation Solver — any ax + b = c style */
MMX.toolkit.register({
  id: "linear-solver",
  render(mount) {
    const tx = MMX.tx;
    mount.innerHTML = `
      <div class="muted mb8">Enter a one-variable equation, e.g. <b>3x + 5 = 20</b> or <b>2(x − 3) = x + 4</b>. Solves linear and quadratic equations step by step.</div>
      <div class="field"><label>Equation</label><input class="input" id="leEq" value="3x + 5 = 20"></div>
      <div class="btn-row">
        <button class="btn ghost small" data-ex="2x - 7 = 9">2x − 7 = 9</button>
        <button class="btn ghost small" data-ex="5x + 3 = 2x + 12">5x + 3 = 2x + 12</button>
        <button class="btn ghost small" data-ex="x^2 - 5x + 6 = 0">x² − 5x + 6 = 0</button>
      </div>
      <button class="btn primary block mt8" id="leGo">Solve</button>
      ${MMX.tk.out("leOut")}`;
    const out = mount.querySelector("#leOut");
    const run = () => {
      const eq = mount.querySelector("#leEq").value;
      try {
        const r = tx.solveEquation(eq);
        let verdict = "ok";
        if (r.kind === "contradiction") verdict = "err";
        out.innerHTML = MMX.tk.res(
          r.kind === "linear" ? "Solution (linear)" : r.kind === "quadratic" ? "Solution (quadratic)" : "Result",
          MMX.tk.steps(r.steps.map((s, i) => i === 0 || i === 1 ? s : s.replace(/^Final Answer:/, "").trim())),
          verdict
        );
      } catch (e) {
        out.innerHTML = MMX.tk.res("Could not solve", MMX.util.esc(e.message) + ". Use the variable x, with '=' between two sides.", "err");
      }
    };
    mount.querySelector("#leGo").addEventListener("click", run);
    mount.querySelector("#leEq").addEventListener("keydown", (e) => { if (e.key === "Enter") run(); });
    mount.querySelector(".btn-row").addEventListener("click", (e) => {
      const b = e.target.closest("[data-ex]"); if (b) { mount.querySelector("#leEq").value = b.dataset.ex; run(); }
    });
    run();
  }
});
