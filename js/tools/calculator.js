/* Tool: Basic Calculator — exact/decimal + functions, with on-screen keypad */
MMX.toolkit.register({
  id: "calculator",
  render(mount) {
    const tx = MMX.tx;
    mount.innerHTML = `
      <div class="field"><label>Expression — supports + − × ÷, brackets, %, ^ (power), √, sin/cos/tan (degrees), π</label>
        <input class="input" id="calcExpr" inputmode="text" placeholder="e.g. (12 + 8) × 3 / 4  or  √144 + 2^3  or  sin(30)">
      </div>
      <div class="kpad" id="kpad">
        <button data-k="7">7</button><button data-k="8">8</button><button data-k="9">9</button><button data-k="/">÷</button><button data-k="^">^</button>
        <button data-k="4">4</button><button data-k="5">5</button><button data-k="6">6</button><button data-k="*">×</button><button data-k="sqrt(">√</button>
        <button data-k="1">1</button><button data-k="2">2</button><button data-k="3">3</button><button data-k="-">−</button><button data-k="%">%</button>
        <button data-k="0">0</button><button data-k=".">.</button><button data-k="(">(</button><button data-k=")">)</button><button data-k="+">+</button>
        <button data-k="clear" style="color:var(--red)">AC</button>
        <button data-k="back">⌫</button>
        <button class="eq" data-k="=">= Calculate</button>
      </div>
      ${MMX.tk.out("calcOut")}
      <div class="muted mt8" style="font-size:0.78rem">Examples: <b>25%</b> of a number → e.g. 80 × 25% = 20 · <b>sin(30)</b> = 0.5 · <b>π × 7^2</b> = area of circle r=7.</div>`;
    const inp = mount.querySelector("#calcExpr");
    const out = mount.querySelector("#calcOut");
    const compute = () => {
      const raw = inp.value.trim();
      if (!raw) { out.innerHTML = MMX.tk.res("Result", "Type or tap an expression.", "err"); return; }
      try {
        const v = tx.evalExpr(raw);
        const exact = Math.abs(v - Math.round(v)) < 1e-10 ? String(Math.round(v)) : v.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
        out.innerHTML = MMX.tk.res("Result", `<b>${MMX.util.esc(raw)} = ${exact}</b><br><span class="muted" style="font-size:0.8rem">Evaluated with BODMAS — brackets/roots, powers, then × ÷, then + −.</span>`, "ok");
      } catch (e) {
        out.innerHTML = MMX.tk.res("Could not evaluate", MMX.util.esc(e.message) + ". Check brackets and operators; remember angles are in degrees and tan(90) is undefined.", "err");
      }
    };
    mount.querySelector("#kpad").addEventListener("click", (e) => {
      const b = e.target.closest("button[data-k]"); if (!b) return;
      const k = b.dataset.k;
      if (k === "clear") inp.value = "";
      else if (k === "back") inp.value = inp.value.slice(0, -1);
      else if (k === "=") compute();
      else inp.value += k;
      inp.focus();
    });
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") compute(); });
  }
});
