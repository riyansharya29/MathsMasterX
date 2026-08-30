/* Tool: Prime Number Checker */
MMX.toolkit.register({
  id: "prime-check",
  render(mount) {
    const tx = MMX.tx;
    mount.innerHTML = `
      <div class="field"><label>Whole number to test</label><input class="input" id="pcN" inputmode="numeric" value="97"></div>
      <button class="btn primary block" id="pcGo">Check prime</button>
      ${MMX.tk.out("pcOut")}`;
    const run = () => {
      const out = mount.querySelector("#pcOut");
      const n = parseInt(mount.querySelector("#pcN").value, 10);
      if (!Number.isInteger(n) || n <= 0) { out.innerHTML = MMX.tk.res("Input needed", "Enter a positive whole number.", "err"); return; }
      const prime = tx.isPrime(n);
      const fs = tx.factorsOf(n);
      let steps;
      if (n === 1) steps = ["1 is neither prime nor composite (it has no prime factors)."];
      else if (prime) steps = [`Test divisors up to √${n} ≈ ${Math.sqrt(n).toFixed(2)}: none divide ${n} (except 1 and itself).`, `${n} <b>is prime</b> — its only factors are 1 and ${n}.`];
      else steps = [`Prime factorisation: ${n} = ${tx.pfString(n)}`, `${n} <b>is composite</b>. It has ${fs.length} factors.`];
      out.innerHTML = MMX.tk.res(prime ? "✅ Prime" : "❌ Not prime",
        `<b>${n} is ${prime ? "a prime number" : "composite (not prime)"}.</b>` + MMX.tk.steps(steps) +
        `<div class="mt8">Factors of ${n}: <b>${fs.join(", ")}</b></div>`, prime ? "ok" : "err");
    };
    mount.querySelector("#pcGo").addEventListener("click", run);
    mount.querySelector("#pcN").addEventListener("keydown", (e) => { if (e.key === "Enter") run(); });
    run();
  }
});
