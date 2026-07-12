// Featherless.ai API client — OpenAI-compatible inference for AI practice coaching
// Docs: https://featherless.ai/docs/quickstart-guide

const FEATHERLESS_BASE_URL = "https://api.featherless.ai/v1";
const DEFAULT_COACH_MODEL = "Qwen/Qwen2.5-7B-Instruct";

/**
 * Send a chat completion request to Featherless.ai.
 * Returns null when no API key is configured (allows offline fallback).
 * @param {Array<{role: string, content: string}>} messages
 * @param {object} options
 * @returns {Promise<string|null>}
 */
export async function chatCompletion(messages, options = {}) {
  const apiKey = import.meta.env.VITE_FEATHERLESS_API_KEY;
  if (!apiKey) {
    console.info("[Featherless] No API key configured — using local coaching fallback.");
    return null;
  }

  const response = await fetch(`${FEATHERLESS_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://github.com/trumpet-practice-hero",
      "X-Title": "TrumpetPracticeHero",
    },
    body: JSON.stringify({
      model: options.model || DEFAULT_COACH_MODEL,
      messages,
      max_tokens: options.maxTokens || 512,
      temperature: options.temperature ?? 0.7,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Featherless API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? null;
}

/**
 * Generate personalized trumpet practice coaching via Featherless LLM.
 * @param {object} sessionSummary
 * @returns {Promise<{ evaluation: string, advice: string[] }|null>}
 */
export async function generatePracticeCoachFeedback(sessionSummary) {
  const systemPrompt = `You are an expert brass instrument coach specializing in trumpet technique, 
embouchure, intonation, and valve fingerings. Provide concise, encouraging feedback after a practice session.
Respond ONLY with valid JSON in this exact shape:
{"evaluation":"2-3 sentence overall assessment","advice":["tip 1","tip 2","tip 3"]}`;

  const userPrompt = `Analyze this trumpet practice session and give coaching feedback:
- Accuracy: ${sessionSummary.accuracy}%
- Grade: ${sessionSummary.grade}
- Notes hit correctly: ${sessionSummary.correct} / ${sessionSummary.totalNotes}
- Average pitch deviation: ${sessionSummary.avgDeviation} cents
- Tendency: ${sessionSummary.tendency}
- Problem notes: ${sessionSummary.problemNotes.join(", ") || "none"}
- Song: ${sessionSummary.songTitle}`;

  const raw = await chatCompletion([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]);

  if (!raw) return null;

  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]);
    if (parsed.evaluation && Array.isArray(parsed.advice)) {
      return { evaluation: parsed.evaluation, advice: parsed.advice };
    }
  } catch (e) {
    console.warn("[Featherless] Could not parse coach response:", e);
  }

  return null;
}

/**
 * Infer difficulty label and practice tips for an imported score.
 * @param {object} songMeta
 * @returns {Promise<{ difficulty: string, tips: string[] }|null>}
 */
export async function analyzeSongDifficulty(songMeta) {
  const userPrompt = `A trumpet student imported this score:
- Title: ${songMeta.title}
- Composer: ${songMeta.composer}
- Tempo: ${songMeta.tempo} BPM
- Note count: ${songMeta.noteCount}
- Pitch range (semitones): ${songMeta.range}

Respond ONLY with valid JSON:
{"difficulty":"Easy|Medium|Hard","tips":["tip 1","tip 2"]}`;

  const raw = await chatCompletion([
    {
      role: "system",
      content: "You are a music education assistant. Classify trumpet piece difficulty and give brief practice tips. Respond only with JSON.",
    },
    { role: "user", content: userPrompt },
  ]);

  if (!raw) return null;

  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.warn("[Featherless] Could not parse difficulty analysis:", e);
    return null;
  }
}
