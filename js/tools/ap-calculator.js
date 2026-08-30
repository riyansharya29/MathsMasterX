/* Tool: Arithmetic Progression Calculator — CBSE Class 10
   an = a + (n−1)d ;  Sn = n/2 · [2a + (n−1)d] = n/2 · (a + l)
   All calculation is local and exact-form (no AI). */
MMX.toolkit.register({
  id: "ap-calculator",
  render(mount) {
    const tx = MMX.tx;
    const num = (v) => (String(v).trim() === "" ? NaN : Number(v));
    const fmt = (x) => {
      if (!isFinite(x)) return "—";
      const r = Math.round(x * 1e6) / 1e6;
      return String(r);
    };

    mount.innerHTML = `
      <div class="muted mb8">Enter the <b>first term (a)</b>, <b>common difference (d)</b> and
        <b>number of terms (n)</b>. Everything below — the nth (last) term and the sum — is
        computed with CBSE Class 10 formulas.</div>
      <div class="input-row">
        <div class="field"><label>First term, a</label><input class="input" id="apA" type="number" step="any" value="2"></div>
        <div class="field"><label>Common difference, d</label><input class="input" id="apD" type="number" step="any" value="3"></div>
        <div class="field"><label>Number of terms, n</label><input class="input" id="apN" type="number" step="1" value="10"></div>
      </div>
      <button class="btn primary block" id="apGo">Calculate AP</button>

      <div class="tool-cat-head" style="margin-top:14px">🔎 Solve for one unknown</div>
      <div class="input-row">
        <div class="field"><label>Find</label>
          <select class="input" id="apMode">
            <option value="an">nth term aₙ (need a, d, n)</option>
            <option value="a">First term a (need aₙ, d, n)</option>
            <option value="d">Common diff. d (need a, aₙ, n)</option>
            <option value="n">Number of terms n (need a, d, aₙ)</option>
          </select>
        </div>
      </div>
      <div class="input-row">
        <div class="field"><label>Value 1 (a)</label><input class="input" id="apX" type="number" step="any" placeholder="a"></div>
        <div class="field"><label>Value 2</label><input class="input" id="apY" type="number" step="any" placeholder="d / aₙ"></div>
        <div class="field"><label>Value 3 (n)</label><input class="input" id="apZ" type="number" step="1" placeholder="n"></div>
      </div>
      <button class="btn ghost block" id="apFind">Find unknown</button>
      ${MMX.tk.out("apOut")}`;

    const out = mount.querySelector("#apOut");

    const termChip = (label, val, cls) =>
      `<div class="kpad" style="display:inline-flex;flex-direction:column;align-items:center;min-width:52px;margin:3px;padding:8px 6px"><b style="font-size:1.05rem">${fmt(val)}</b><span class="muted" style="font-size:0.72rem">${label}</span></div>`;

    mount.querySelector("#apGo").addEventListener("click", () => {
      const a = num(mount.querySelector("#apA").value);
      const d = num(mount.querySelector("#apD").value);
      const n = num(mount.querySelector("#apN").value);
      if ([a, d].some((x) => isNaN(x)) || !Number.isInteger(n) || n < 1) {
        out.innerHTML = MMX.tk.res("Input needed",
          "Enter a first term and common difference (any numbers, negative d allowed) and a whole number of terms n ≥ 1.", "err");
        return;
      }
      const an = a + (n - 1) * d;               // nth / last term
      const Sn = (n / 2) * (2 * a + (n - 1) * d); // sum
      const Sn2 = (n / 2) * (a + an);            // cross-check using last term

      // Sequence visualization (show up to 12 terms)
      const maxShow = Math.min(n, 12);
      let seq = "";
      for (let k = 0; k < maxShow; k++) seq += termChip("a" + (k === 0 ? "₁" : "₍" + (k + 1) + "₎"), a + k * d, "");
      if (n > maxShow) {
        seq += `<div class="kpad" style="display:inline-flex;align-items:center;min-width:34px;margin:3px;padding:8px 4px">…</div>`;
        seq += termChip("aₙ (last)", an, "last");
      }

      let html = `<div class="muted" style="margin-bottom:6px"><b>Sequence (${n} terms):</b></div>
        <div style="line-height:1">${seq}</div>`;

      html += MMX.tk.steps([
        `<b>Given:</b> first term a = ${fmt(a)}, common difference d = ${fmt(d)}, number of terms n = ${n}`,
        `<b>Formula for nth term:</b> aₙ = a + (n − 1)d &nbsp;→&nbsp; <b>Substitution:</b> aₙ = ${fmt(a)} + (${n} − 1) × ${fmt(d)} = <b>${fmt(an)}</b>`,
        `<b>Last term l = aₙ = ${fmt(an)}</b>`,
        `<b>Formula for sum:</b> Sₙ = n/2 · [2a + (n − 1)d] &nbsp;→&nbsp; <b>Substitution:</b> Sₙ = ${n}/2 × [2(${fmt(a)}) + (${n} − 1) × ${fmt(d)}] = <b>${fmt(Sn)}</b>`,
        `<b>Check with l:</b> Sₙ = n/2 · (a + l) = ${n}/2 × (${fmt(a)} + ${fmt(an)}) = ${fmt(Sn2)} ${Math.abs(Sn - Sn2) < 1e-6 ? "✓" : "✗"}`,
        `<b>Answer:</b> last term aₙ = <b>${fmt(an)}</b>, sum of ${n} terms Sₙ = <b>${fmt(Sn)}</b>`
      ]);
      out.innerHTML = MMX.tk.res("Arithmetic Progression — complete", html, "ok");
    });

    mount.querySelector("#apFind").addEventListener("click", () => {
      const mode = mount.querySelector("#apMode").value;
      const x = num(mount.querySelector("#apX").value);
      const y = num(mount.querySelector("#apY").value);
      const z = num(mount.querySelector("#apZ").value);
      let steps, ans;
      try {
        if (mode === "an") {                 // need a, d, n
          if (isNaN(x) || isNaN(y) || !Number.isInteger(z) || z < 1) throw new Error("Need a, d and a whole n ≥ 1.");
          ans = x + (z - 1) * y;
          steps = [`Given a = ${fmt(x)}, d = ${fmt(y)}, n = ${z}`,
                   `Formula: aₙ = a + (n − 1)d`,
                   `Substitution: aₙ = ${fmt(x)} + (${z} − 1) × ${fmt(y)}`,
                   `Answer: aₙ = <b>${fmt(ans)}</b>`];
        } else if (mode === "a") {          // need an, d, n  (x = an? we read a field as a but here use as an)
          if (isNaN(x) || isNaN(y) || !Number.isInteger(z) || z < 2) throw new Error("Need aₙ, d and a whole n ≥ 2.");
          const an = x;
          ans = an - (z - 1) * y;
          steps = [`Given aₙ = ${fmt(an)}, d = ${fmt(y)}, n = ${z}`,
                   `Formula: a = aₙ − (n − 1)d`,
                   `Substitution: a = ${fmt(an)} − (${z} − 1) × ${fmt(y)}`,
                   `Answer: first term a = <b>${fmt(ans)}</b>`];
        } else if (mode === "d") {          // need a, an, n
          if (isNaN(x) || isNaN(y) || !Number.isInteger(z) || z < 2) throw new Error("Need a, aₙ and a whole n ≥ 2.");
          if (z - 1 === 0) throw new Error("With n = 1 the common difference cannot be determined.");
          ans = (y - x) / (z - 1);
          steps = [`Given a = ${fmt(x)}, aₙ = ${fmt(y)}, n = ${z}`,
                   `Formula: d = (aₙ − a) / (n − 1)`,
                   `Substitution: d = (${fmt(y)} − ${fmt(x)}) / (${z} − 1) = ${fmt(y - x)} / ${z - 1}`,
                   `Answer: common difference d = <b>${fmt(ans)}</b>`];
        } else {                             // n: need a, d, an
          if (isNaN(x) || isNaN(y) || isNaN(z)) throw new Error("Need a, d and aₙ.");
          if (y === 0) throw new Error(z === x ? "d = 0: every term equals a, so n is not uniquely determined."
                                              : "d = 0 but aₙ ≠ a — no such AP exists.");
          const nVal = (z - x) / y + 1;
          if (!Number.isInteger(nVal) || nVal < 1) throw new Error("n is not a positive whole number (" + fmt(nVal) + ") — these values do not form a valid AP term count.");
          ans = nVal;
          steps = [`Given a = ${fmt(x)}, d = ${fmt(y)}, aₙ = ${fmt(z)}`,
                   `Formula: aₙ = a + (n − 1)d  ⇒  n = (aₙ − a)/d + 1`,
                   `Substitution: n = (${fmt(z)} − ${fmt(x)}) / ${fmt(y)} + 1 = ${fmt((z - x) / y)} + 1`,
                   `Answer: number of terms n = <b>${fmt(ans)}</b>`];
        }
        out.innerHTML = MMX.tk.res("Result", MMX.tk.steps(steps), "ok");
      } catch (e) {
        out.innerHTML = MMX.tk.res("Cannot solve", MMX.util.esc(e.message), "err");
      }
    });

    mount.querySelector("#apGo").click();
  }
});
