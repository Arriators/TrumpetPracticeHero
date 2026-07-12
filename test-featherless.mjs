/**
 * Smoke test for Featherless.ai API connectivity.
 * Usage: node scripts/test-featherless.mjs
 *
 * Requires FEATHERLESS_API_KEY env var (or VITE_FEATHERLESS_API_KEY).
 */

const API_KEY = process.env.FEATHERLESS_API_KEY || process.env.VITE_FEATHERLESS_API_KEY;

if (!API_KEY) {
  console.error("Set FEATHERLESS_API_KEY or VITE_FEATHERLESS_API_KEY to run this test.");
  process.exit(1);
}

const response = await fetch("https://api.featherless.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
    "HTTP-Referer": "https://github.com/trumpet-practice-hero",
    "X-Title": "TrumpetPracticeHero",
  },
  body: JSON.stringify({
    model: "Qwen/Qwen2.5-7B-Instruct",
    messages: [
      { role: "system", content: "You are a helpful trumpet coach." },
      { role: "user", content: "Give one sentence of encouragement for a beginner trumpeter." },
    ],
    max_tokens: 100,
  }),
});

if (!response.ok) {
  console.error("Featherless API test failed:", response.status, await response.text());
  process.exit(1);
}

const data = await response.json();
console.log("Featherless API test passed!");
console.log("Response:", data.choices[0].message.content);
