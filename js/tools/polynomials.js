/* Tool: Polynomial Calculator — add, subtract, multiply polynomials in x */
MMX.toolkit.register({
  id: "polynomials",
  render(mount) {
    const tx = MMX.tx;
    const tryParse = (s) => { try { return tx.parsePoly(s); } catch (e) { return null; } };
    mount.innerHTML = `
      <div class="muted mb8">Enter polynomials in x, e.g. <b>3x^2 + 2x − 5</b>. Use <b>^</b> for powers.</div>
      <div class="field"><label>Polynomial A</label><input class="input" id="pA" value="2x^2 + 3x - 5"></div>
      <div class="field"><label>Polynomial B</label><input class="input" id="pB" value="x^2 - 2x + 1"></div>
      <div class="btn-row">
        <button class="btn primary small" data-op="add">A + B</button>
        <button class="btn primary small" data-op="sub">A − B</button>
        <button class="btn ghost small" data-op="mul">A × B</button>
      </div>
      ${MMX.tk.out("pOut")}`;
    const out = mount.querySelector("#pOut");
    mount.querySelector(".btn-row").addEventListener("click", (e) => {
      const b = e.target.closest("[data-op]"); if (!b) return;
      const A = tryParse(mount.querySelector("#pA").value);
      const B = tryParse(mount.querySelector("#pB").value);
      if (!A || !B) { out.innerHTML = MMX.tk.res("Invalid polynomial", "Write terms as numbers times x, e.g. 2x^2 − 3x + 1 (no brackets).", "err"); return; }
      const op = b.dataset.op;
      const res = tx.polyOp(A, B, op);
      const sym = { add: "+", sub: "−", mul: "×" }[op];
      const steps = op === "mul"
        ? [
            `A = ${tx.polyStr(A)}  (degree ${A.length - 1})`,
            `B = ${tx.polyStr(B)}  (degree ${B.length - 1})`,
            `Multiply each term of A by each term of B and collect like powers of x.`,
            `Result degree = ${(A.length - 1) + (B.length - 1)}.`
          ]
        : [`A = ${tx.polyStr(A)}`, `B = ${tx.polyStr(B)}`, `Combine (${op === "add" ? "add" : "subtract"}) coefficients for like powers of x.`];
      out.innerHTML = MMX.tk.res(`${tx.polyStr(A)} ${sym} ${tx.polyStr(B)}`,
        `<b style="font-size:1.05rem">= ${tx.polyStr(res)}</b>` + MMX.tk.steps(steps), "ok");
    });
    mount.querySelector("[data-op='add']").click();
  }
});
