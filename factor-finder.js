/* Tool: Factor Finder — all factors + prime factorisation */
MMX.toolkit.register({
  id: "factor-finder",
  render(mount) {
    const tx = MMX.tx;
    mount.innerHTML = `
      <div class="field"><label>Positive whole number</label><input class="input" id="ffN" inputmode="numeric" value="72"></div>
      <button class="btn primary block" id="ffGo">Find factors</button>
      ${MMX.tk.out("ffOut")}`;
    const run = () => {
      const out = mount.querySelector("#ffOut");
      const n = parseInt(mount.querySelector("#ffN").value, 10);
      if (!Number.isInteger(n) || n <= 0) { out.innerHTML = MMX.tk.res("Input needed", "Enter a positive whole number.", "err"); return; }
      const fs = tx.factorsOf(n);
      const pairs = [];
      for (let i = 0; i < Math.ceil(fs.length / 2); i++) pairs.push(`${fs[i]} × ${fs[fs.length - 1 - i]}`);
      out.innerHTML = MMX.tk.res(`Factors of ${n}`,
        `<b>${fs.length} factor${fs.length > 1 ? "s" : ""}:</b> ${fs.join(", ")}` +
        MMX.tk.steps([
          `Factor pairs of ${n}: ${pairs.join(" , ")}`,
          `Prime factorisation: <b>${n} = ${tx.pfString(n)}</b>`,
          `Number of factors = multiply (exponent + 1) over the prime factorisation.`
        ]), "ok");
    };
    mount.querySelector("#ffGo").addEventListener("click", run);
    mount.querySelector("#ffN").addEventListener("keydown", (e) => { if (e.key === "Enter") run(); });
    run();
  }
});
