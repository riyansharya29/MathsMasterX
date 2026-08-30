/* Tool: LCM & HCF Calculator with prime-factorisation + Euclid steps */
MMX.toolkit.register({
  id: "lcm-hcf",
  render(mount) {
    const tx = MMX.tx;
    mount.innerHTML = `
      <div class="field"><label>Numbers (comma or space separated) — two or more</label>
        <input class="input" id="lhNums" value="24, 36, 60"></div>
      <button class="btn primary block" id="lhGo">Calculate HCF & LCM</button>
      ${MMX.tk.out("lhOut")}`;
    mount.querySelector("#lhGo").addEventListener("click", () => {
      const out = mount.querySelector("#lhOut");
      const nums = (mount.querySelector("#lhNums").value.match(/-?\d+/g) || []).map(Number).filter((n) => n > 0);
      if (nums.length < 2 || nums.some((n) => !Number.isInteger(n) || n <= 0)) {
        out.innerHTML = MMX.tk.res("Input needed", "Enter at least two positive whole numbers (e.g. 24, 36, 60).", "err"); return;
      }
      const r = tx.hcfLcm(nums);
      const r2 = tx.hcfLcm([nums[0], nums[1]]);
      let html = `<b>HCF (GCD) = ${r.hcf}</b> &nbsp;·&nbsp; <b>LCM = ${r.lcm}</b>`;
      html += MMX.tk.steps([
        `Prime factorisation: ${nums.map((n) => n + " = " + tx.pfString(n)).join(" ; ")}`,
        `HCF = product of the lowest powers of common prime factors = <b>${r.hcf}</b>`,
        `LCM = product of the highest powers of every prime factor = <b>${r.lcm}</b>`,
        `Check for first two numbers: HCF × LCM = ${r2.hcf} × ${r2.lcm} = ${r2.hcf * r2.lcm} = ${nums[0]} × ${nums[1]} = ${nums[0] * nums[1]} ✓`
      ]);
      if (nums.length === 2) {
        const eu = tx.euclidSteps(nums[0], nums[1]);
        html += `<div class="result-box" style="margin-top:10px"><div class="rb-title">Euclid's division algorithm</div>` +
          eu.steps.map((s) => `${s.a} = ${s.b} × ${s.q} + ${s.r}`).join("<br>") +
          `<br><b>HCF = ${eu.hcf} (last non-zero remainder)</b></div>`;
      }
      out.innerHTML = MMX.tk.res("Result", html, "ok");
    });
    mount.querySelector("#lhGo").click();
  }
});
