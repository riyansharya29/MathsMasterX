/* Tool: Statistics Calculator — CBSE Class 10 (local, no AI)
   Ungrouped list: mean / median / mode / range.
   Frequency table (discrete value/frequency): n, Σfx, mean, median (cumulative
   frequency), modal value and range. All arithmetic is done locally. */
MMX.toolkit.register({
  id: "statistics-calculator",
  render(mount) {
    const tx = MMX.tx;
    const esc = MMX.util.esc;
    const num = (v) => { const s = String(v).trim(); return s === "" ? NaN : Number(s); };
    const fmt = (x) => { const r = Math.round(x * 1e6) / 1e6; return String(r); };

    mount.innerHTML = `
      <div class="btn-row" id="stTabs">
        <button class="btn primary small" data-tab="raw">📋 Data list</button>
        <button class="btn ghost small" data-tab="freq">📊 Frequency table</button>
      </div>

      <div id="stRaw">
        <div class="field"><label>Values (comma or space separated)</label>
          <input class="input" id="stList" value="12, 15, 14, 10, 15, 18, 15, 14, 16, 15"></div>
        <button class="btn primary block" id="stRawGo">Calculate statistics</button>
      </div>

      <div id="stFreq" style="display:none">
        <div class="muted mb8">Enter each <b>value</b> with its <b>frequency</b>, then press
          <b>Calculate</b>. Rows may be added or removed.</div>
        <table class="tt-table" id="stFT" style="width:100%">
          <thead><tr><th style="width:44%"></th><th style="width:40%"></th><th></th></tr></thead><tbody></tbody>
        </table>
        <div class="btn-row">
          <button class="btn ghost small" id="stAddRow">＋ Add row</button>
          <button class="btn primary small" id="stFreqGo">Calculate statistics</button>
        </div>
      </div>
      ${MMX.tk.out("stOut")}`;

    const out = mount.querySelector("#stOut");
    const tbody = mount.querySelector("#stFT tbody");

    const addRow = (v, f) => {
      const tr = document.createElement("tr");
      tr.className = "dyn-row";
      tr.innerHTML = `<td><input class="input stV" type="number" step="any" placeholder="Value" value="${v === undefined ? "" : v}"></td>
        <td><input class="input stF" type="number" step="1" min="0" placeholder="Frequency" value="${f === undefined ? "" : f}"></td>
        <td><button class="icon-btn stDel" title="Remove row" style="width:34px;height:34px">✕</button></td>`;
      tbody.appendChild(tr);
      tr.querySelector(".stDel").addEventListener("click", () => { tr.remove(); });
    };
    [[2, 3], [4, 5], [6, 8], [8, 4], [10, 2]].forEach(([v, f]) => addRow(v, f));

    // ---- tabs
    mount.querySelector("#stTabs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-tab]"); if (!b) return;
      const tab = b.dataset.tab;
      mount.querySelector("#stRaw").style.display = tab === "raw" ? "" : "none";
      mount.querySelector("#stFreq").style.display = tab === "freq" ? "" : "none";
      out.innerHTML = "";
      mount.querySelectorAll("#stTabs .btn").forEach((x) => x.classList.replace(tab === x.dataset.tab ? "ghost" : "primary", tab === x.dataset.tab ? "primary" : "ghost"));
    });

    mount.querySelector("#stAddRow").addEventListener("click", () => addRow());

    // ---- raw list
    mount.querySelector("#stRawGo").addEventListener("click", () => {
      const vals = (mount.querySelector("#stList").value.match(/-?\d+(\.\d+)?/g) || []).map(Number);
      if (!vals.length) { out.innerHTML = MMX.tk.res("Input needed", "Enter at least one number.", "err"); return; }
      const s = tx.statsUngrouped(vals);
      const html = `<div class="kpad" style="margin-bottom:8px">
          Mean <b>${fmt(s.mean)}</b> · Median <b>${fmt(s.median)}</b> ·
          Mode <b>${s.mode === null ? "none (all equal)" : fmt(s.mode)}</b> · Range <b>${fmt(s.range)}</b></div>`
        + MMX.tk.steps(s.steps);
      out.innerHTML = MMX.tk.res("Ungrouped data (n = " + vals.length + ")", html, "ok");
    });

    // ---- frequency table
    mount.querySelector("#stFreqGo").addEventListener("click", () => {
      const rows = [];
      tbody.querySelectorAll("tr").forEach((tr) => {
        const vEl = tr.querySelector(".stV"), fEl = tr.querySelector(".stF");
        if (!vEl || !fEl) return;                 // skip any row without input cells
        const v = num(vEl.value), f = num(fEl.value);
        if (!isNaN(v) && !isNaN(f)) rows.push({ v, f });
      });
      if (!rows.length) { out.innerHTML = MMX.tk.res("Input needed", "Add at least one value/frequency row.", "err"); return; }
      if (rows.some((r) => !Number.isInteger(r.f) || r.f < 0) || rows.every((r) => r.f === 0)) {
        out.innerHTML = MMX.tk.res("Invalid frequency", "Each frequency must be a non-negative whole number and at least one must be greater than 0.", "err");
        return;
      }
      // sort by value, build cumulative table
      rows.sort((a, b) => a.v - b.v);
      const n = rows.reduce((s, r) => s + r.f, 0);
      let cf = 0;
      const data = rows.map((r) => { const c = cf + r.f; cf = c; return { ...r, fx: r.f * r.v, cf: c }; });
      const sumFx = data.reduce((s, r) => s + r.fx, 0);
      const mean = sumFx / n;
      // median: value whose cumulative frequency first reaches (n+1)/2 (discrete)
      const medPos = (n + 1) / 2;
      let medRow = data[0];
      for (const r of data) { if (r.cf >= medPos) { medRow = r; break; } }
      // mode: max frequency
      let modeRow = data[0];
      data.forEach((r) => { if (r.f > modeRow.f) modeRow = r; });
      const tied = data.filter((r) => r.f === modeRow.f);
      const range = data[data.length - 1].v - data[0].v;

      let table = `<table class="tt-table" style="width:100%;margin:6px 0">
        <thead><tr><th>Value (xᵢ)</th><th>Frequency (fᵢ)</th><th>fᵢxᵢ</th><th>Cumulative (cf)</th></tr></thead><tbody>`;
      data.forEach((r) => {
        table += `<tr${r === medRow ? ' class="verdict-ok"' : ""}><td>${fmt(r.v)}</td><td>${r.f}</td><td>${fmt(r.fx)}</td><td>${r.cf}</td></tr>`;
      });
      table += `<tr style="font-weight:700"><td>Σ</td><td>n = ${n}</td><td>Σfx = ${fmt(sumFx)}</td><td></td></tr></tbody></table>`;

      const steps = [
        "n = Σfᵢ = " + n + " and Σfᵢxᵢ = " + fmt(sumFx),
        "Mean = Σfᵢxᵢ / Σfᵢ = " + fmt(sumFx) + " / " + n + " = <b>" + fmt(mean) + "</b>",
        "Median: position (n+1)/2 = " + fmt(medPos) + " → first cumulative frequency reaching it is cf = " + medRow.cf + ", so median = <b>" + fmt(medRow.v) + "</b>",
        tied.length > 1 ? "Mode: values " + tied.map((r) => fmt(r.v)).join(", ") + " all have the highest frequency (" + modeRow.f + ") — multiple modes"
                        : "Mode: highest frequency f = " + modeRow.f + " occurs at x = <b>" + fmt(modeRow.v) + "</b>",
        "Range = largest value − smallest value = " + fmt(data[data.length - 1].v) + " − " + fmt(data[0].v) + " = <b>" + fmt(range) + "</b>"
      ];

      const html = `<div class="kpad" style="margin-bottom:8px">
          Mean <b>${fmt(mean)}</b> · Median <b>${fmt(medRow.v)}</b> ·
          Mode <b>${tied.length > 1 ? tied.map((r) => fmt(r.v)).join(", ") : fmt(modeRow.v)}</b> · Range <b>${fmt(range)}</b></div>`
        + table + MMX.tk.steps(steps);
      out.innerHTML = MMX.tk.res("Frequency distribution (n = " + n + ")", html, "ok");
    });

    mount.querySelector("#stRawGo").click();
  }
});
