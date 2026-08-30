/* Tool: Quadratic Equation Solver — ax^2 + bx + c = 0 with full steps */
MMX.toolkit.register({
  id: "quadratic",
  render(mount) {
    const tx = MMX.tx;
    mount.innerHTML = `
      <div class="muted mb8">Solve <b>ax² + bx + c = 0</b>. Enter coefficients (use minus for negative):</div>
      <div class="input-row-3">
        <div class="field"><label>a</label><input class="input" id="qa" inputmode="numeric" value="2"></div>
        <div class="field"><label>b</label><input class="input" id="qb" inputmode="numeric" value="-5"></div>
        <div class="field"><label>c</label><input class="input" id="qc" inputmode="numeric" value="3"></div>
      </div>
      <button class="btn primary block" id="qGo">Solve quadratic</button>
      ${MMX.tk.out("qOut")}`;
    const run = () => {
      const out = mount.querySelector("#qOut");
      const a = parseFloat(mount.querySelector("#qa").value);
      const b = parseFloat(mount.querySelector("#qb").value);
      const c = parseFloat(mount.querySelector("#qc").value);
      if ([a, b, c].some(isNaN)) { out.innerHTML = MMX.tk.res("Input needed", "Fill a, b and c with numbers.", "err"); return; }
      if (a === 0) { out.innerHTML = MMX.tk.res("Not quadratic", "When a = 0 the equation is linear (bx + c = 0). Use the Linear Equation Solver.", "err"); return; }
      const D = b * b - 4 * a * c;
      const sD = Math.sqrt(Math.abs(D));
      let roots;
      if (D < 0) roots = "no real roots (roots are non-real/complex)";
      else if (D === 0) { const x = -b / (2 * a); roots = `one repeated real root: x = ${tx.fstr(tx.F(Math.round(-b * 10000) / 10000, 2 * a))} = ${+x.toFixed(4)}`; }
      else {
        const r1 = tx.F(-b + sD, 2 * a), r2 = tx.F(-b - sD, 2 * a);
        roots = `two distinct real roots: <b>x = ${tx.fstr(r1)}</b> and <b>x = ${tx.fstr(r2)}</b>`;
      }
      out.innerHTML = MMX.tk.res("Solution",
        `<b>${a}x² ${b >= 0 ? "+ " + b : "− " + Math.abs(b)}x ${c >= 0 ? "+ " + c : "− " + Math.abs(c)} = 0</b>` +
        MMX.tk.steps([
          `Formula: x = [−b ± √(b² − 4ac)] / 2a`,
          `Discriminant D = b² − 4ac = (${b})² − 4(${a})(${c}) = ${b * b} − ${4 * a * c} = <b>${D}</b>`,
          D > 0 ? `D > 0 → two distinct real roots; √D = ${+sD.toFixed(4)}` : D === 0 ? "D = 0 → two equal real roots" : "D < 0 → no real roots",
          `Final Answer: ${roots}`
        ]), D >= 0 ? "ok" : "err");
    };
    mount.querySelector("#qGo").addEventListener("click", run);
    ["qa", "qb", "qc"].forEach((i) => mount.querySelector("#" + i).addEventListener("keydown", (e) => { if (e.key === "Enter") run(); }));
    run();
  }
});
