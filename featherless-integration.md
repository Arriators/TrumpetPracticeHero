# Featherless.ai Integration

TrumpetPracticeHero uses [Featherless.ai](https://featherless.ai) as its LLM inference provider for AI-powered practice coaching and score analysis.

## Setup

1. Create an account at [featherless.ai](https://featherless.ai)
2. Generate an API key from [Account → API Keys](https://featherless.ai/account/api-keys)
3. Copy `.env.example` to `.env` and paste your key:

```bash
cp .env.example .env
```

4. Start the dev server — Vite loads `VITE_FEATHERLESS_API_KEY` automatically:

```bash
npm run dev
```

## Architecture

```
Practice Session End
        │
        ▼
  ai-advisor.js  ──►  featherless-client.js  ──►  api.featherless.ai/v1/chat/completions
        │                        │
        │                        └── Model: Qwen/Qwen2.5-7B-Instruct
        │
        └── Fallback: rule-based coaching when no API key is set
```

## Modules

| File | Purpose |
|------|---------|
| `src/modules/featherless-client.js` | OpenAI-compatible API wrapper |
| `src/modules/ai-advisor.js` | Session analysis + Featherless coach enrichment |
| `scripts/test-featherless.mjs` | Smoke test for API connectivity |

## API Usage

The client sends chat completion requests with application headers (`HTTP-Referer`, `X-Title`) as recommended by Featherless docs.

When the API key is missing or the request fails, the app falls back to built-in rule-based feedback so practice sessions always complete.

## Models Used

- **Practice Coach**: `Qwen/Qwen2.5-7B-Instruct` — post-session evaluation and tips
- **Score Analysis**: `Qwen/Qwen2.5-7B-Instruct` — difficulty classification for imported files

See the [Featherless model catalog](https://featherless.ai/models) for alternatives.
