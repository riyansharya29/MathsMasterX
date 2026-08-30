/* Tool: Fraction Calculator — exact arithmetic, simplification */
MMX.toolkit.register({
  id: "fractions",
  render(mount) {
    const tx = MMX.tx;
    // parse "a/b", "a b/c" (mixed), integer, or decimal
    const parseFrac = (s) => {
      s = String(s).trim();
      if (s.includes(".")) { const d = tx.decimalToFraction(s); const [n, dd] = d.frac.split(/[ /]/); return d.frac.includes("/") ? (d.frac.includes(" ") ? (() => { const [w, rest] = d.frac.split(" "); const [rn, rd] = rest.split("/"); return tx.F((w[0] === "-" ? -1 : 1) * (Math.abs(+w) * +rd + +rn), +rd); })() : tx.F(+n, +dd)) : tx.F(+n); }
      const mixed = s.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
      if (mixed) { const w = +mixed[1], n = +mixed[2], d = +mixed[3]; return tx.F((w < 0 ? -1 : 1) * (Math.abs(w) * d + n), d); }
      const m = s.match(/^(-?\d+)\/(\d+)$/);
      if (m) return tx.F(+m[1], +m[2]);
      if (/^-?\d+$/.test(s)) return tx.F(+s, 1);
      throw new Error("Use forms like 3/4, 2 1/3, 5, or 0.75");
    };
    mount.innerHTML = `
      <div class="muted mb8">Enter fractions like <b>3/4</b>, mixed <b>1 1/2</b>, integers or decimals. Results are shown simplified (in lowest terms).</div>
      <div class="input-row">
        <div class="field"><label>Fraction A</label><input class="input" id="fa" value="2/3"></div>
        <div class="field"><label>Fraction B</label><input class="input" id="fb" value="1/4"></div>
      </div>
      <div class="btn-row">
        <button class="btn primary small" data-op="fadd">A + B</button>
        <button class="btn primary small" data-op="fsub">A − B</button>
        <button class="btn ghost small" data-op="fmul">A × B</button>
        <button class="btn ghost small" data-op="fdiv">A ÷ B</button>
        <button class="btn ghost small" data-op="simp">Simplify A</button>
      </div>
      ${MMX.tk.out("frOut")}`;
    const out = mount.querySelector("#frOut");
    const decStr = (f) => { const v = tx.fdec(f); return Math.abs(v - Math.round(v)) < 1e-10 ? String(Math.round(v)) : v.toFixed(6).replace(/0+$/, "").replace(/\.$/, ""); };
    const show = (title, resF, detail) => out.innerHTML = MMX.tk.res(title,
      `<b style="font-size:1.1rem">${title.includes("=") ? "" : "= "}${tx.fstr(resF)}</b><br><span class="muted">decimal: ${decStr(resF)}</span>${detail ? "<br><span class='muted' style='font-size:0.8rem'>" + detail + "</span>" : ""}`, "ok");
    mount.querySelector(".btn-row").addEventListener("click", (e) => {
      const b = e.target.closest("[data-op]"); if (!b) return;
      try {
        const A = parseFrac(mount.querySelector("#fa").value);
        const B = parseFrac(mount.querySelector("#fb").value);
        const op = b.dataset.op;
        let res, sym, detail = "";
        if (op === "fadd") { res = tx.fadd(A, B); sym = "+"; detail = `Common denominator: LCM(${A.d}, ${B.d}) = ${tx.lcm2(A.d, B.d)}`; }
        if (op === "fsub") { res = tx.fsub(A, B); sym = "−"; detail = `Common denominator: LCM(${A.d}, ${B.d}) = ${tx.lcm2(A.d, B.d)}`; }
        if (op === "fmul") { res = tx.fmul(A, B); sym = "×"; detail = "Multiply numerators and denominators, then simplify."; }
        if (op === "fdiv") { res = tx.fdiv(A, B); sym = "÷"; detail = "Multiply by the reciprocal of B."; }
        if (op === "simp") { res = A; sym = ""; detail = `GCD of ${A.n} and ${A.d} is ${tx.gcd(Math.abs(A.n), A.d)}.`; show("Simplified", tx.fstr(res), detail); return; }
        show(`${tx.fstr(A)} ${sym} ${tx.fstr(B)} = ` + tx.fstr(res), res, detail);
      } catch (err) { out.innerHTML = MMX.tk.res("Invalid input", MMX.util.esc(err.message), "err"); }
    });
  }
});
