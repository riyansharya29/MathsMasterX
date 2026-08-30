/* ==========================================================================
   Maths Master X — OPTIONAL secure AI proxy (Cloudflare Worker)
   --------------------------------------------------------------------------
   The app works fully offline without this (its built-in tutor genuinely
   solves Class 10 maths). If you want a cloud LLM tutor as well:

   1. Deploy this file as a Cloudflare Worker.
   2. Set secrets in the Worker:  wrangler secret put OPENAI_API_KEY
      (and optionally OPENAI_MODEL, e.g. gpt-4o-mini)
   3. Publish the Worker and put its public URL in:
         window.MMX_AI_ENDPOINT = "https://<your-worker>.workers.dev/";
      Add that line BEFORE js/ai.js is loaded, e.g. in index.html.

   The API key NEVER appears in any frontend file — it lives only in the
   Worker's secret store. The app calls the Worker with { message, history }
   and expects { reply: "..." }.
   ========================================================================== */

const SYS_PROMPT = `You are Maths AI, a patient CBSE Class 10 Mathematics tutor.
You help with concept doubts, numericals, step-by-step solutions, formula
selection, graphs, geometry, trigonometry, statistics and probability.
For numerical answers always show: Given, Required, Formula, Substitution,
Calculation, Final Answer. Do not skip steps. If multiple methods exist,
explain the easiest Class 10 method first. Use exact values (fractions/surds)
alongside decimals. Keep answers concise and correct — never invent formulas
or chapters. The CBSE Class 10 chapters are: Real Numbers; Polynomials; Pair
of Linear Equations in Two Variables; Quadratic Equations; Arithmetic
Progressions; Triangles; Coordinate Geometry; Introduction to Trigonometry;
Some Applications of Trigonometry; Circles; Areas Related to Circles; Surface
Areas and Volumes; Statistics; Probability.`;

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "POST only" }), { status: 405, headers: { "Content-Type": "application/json", ...cors } });
    }
    try {
      const { message, history } = await request.json();
      if (!message || typeof message !== "string" || message.length > 1500) {
        return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers: { "Content-Type": "application/json", ...cors } });
      }
      const model = env.OPENAI_MODEL || "gpt-4o-mini";
      const messages = [
        { role: "system", content: SYS_PROMPT },
        ...((history || []).slice(-6).map((m) => ({ role: m.who === "user" ? "user" : "assistant", content: String(m.text).slice(0, 2000) }))),
        { role: "user", content: message }
      ];
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.OPENAI_API_KEY}` },
        body: JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 1200 })
      });
      if (!r.ok) {
        return new Response(JSON.stringify({ error: "Upstream AI error" }), { status: 502, headers: { "Content-Type": "application/json", ...cors } });
      }
      const data = await r.json();
      const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      if (!reply) return new Response(JSON.stringify({ error: "Empty reply" }), { status: 502, headers: { "Content-Type": "application/json", ...cors } });
      return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json", ...cors } });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json", ...cors } });
    }
  }
};
