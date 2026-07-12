# TrumpetPracticeHero

[![Featherless AI Engine](https://img.shields.io/badge/AI--Engine-Featherless.ai-orange?style=for-the-badge&logo=openai)](https://featherless.ai)
[![LLM Powered](https://img.shields.io/badge/LLM-Qwen--2.5--7B-blue?style=for-the-badge)](https://featherless.ai)

TrumpetPracticeHero is an interactive, browser-based and desktop-native trumpet tutor designed to help brass musicians master pitch intonation, sight-reading, and piston valve fingerings.

This project is powered by Featherless AI to run advanced language models locally and in the cloud for practice evaluation, personalized coaching feedback, and dynamic sheet music analysis.

---

## Technical Integration with Featherless AI

TrumpetPracticeHero integrates with the Featherless.ai serverless inference API to query open-weights models (specifically Qwen-2.5-7B-Instruct) for key educational metrics:

1. **Practice Performance Analysis**: After each session, the application compiles your notes played, cents deviation, and missed notes, sending them to the Featherless AI Coach for a natural language critique and diagnostic tips.
2. **Dynamic Sheet Music Analysis**: When you upload a custom MusicXML, MuseScore, or MIDI score, the client queries Featherless AI to analyze the complexity of the piece, classify its difficulty, and provide custom learning tips.

If no Featherless API key is configured, the application falls back to robust local rule-based evaluations, supporting offline use.

---

## Core Features

* **High-Contrast Scrolling Staff**: Thicker, high-contrast staff lines (2.0px) with dynamic ledger lines, rests, and note flags (eighth/sixteenth notes).
* **Zero-Lag Intonation Gauge**: Real-time autocorrelation pitch tracking optimized for brass frequencies (130Hz - 1200Hz) running at a throttled 22 FPS to prevent main-thread lag.
* **Late-Hit Latency Window**: A 200ms reaction buffer compensates for natural delay, ensuring late blows are still credited correctly instead of resulting in false misses.
* **Popular Practice Library**: Built-in interactive lessons for Ode to Joy, Amazing Grace, Twinkle Twinkle Little Star, Jingle Bells, and Happy Birthday.
* **Dynamic Intonation Tolerances**: Select relaxed (plus/minus 45 cents), normal (plus/minus 35 cents), or strict (plus/minus 20 cents) tuning tolerances.
* **Smart Prompt Suppression**: Displays piston valves only when playing a wrong pitch; if you are playing the correct note name but are slightly out of tune, the fingering prompt is suppressed so you can focus on centering the pitch.
* **Trailing Note History**: Expanded playhead layout keeps 3+ beats of completed notes visible on screen so you can track your accuracy history.

---

## How to Run the App (Developers)

Ensure you have Node.js installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Featherless AI Key (Optional)
Create a `.env` file in the root directory and add your API key:
```env
VITE_FEATHERLESS_API_KEY=your_featherless_api_key_here
```

### 3. Run the Web Version
```bash
npm run dev
```

### 4. Run the Windows Desktop App (Electron)
* Development Mode (with Live Reload):
  ```bash
  npm run electron:start
  ```
* Production Mode (loads local compiled code):
  ```bash
  npm run electron:build
  ```

---

## Packaging Standalone Windows Build

To compile a standalone Windows folder containing the executable binary (TrumpetPracticeHero.exe):
```bash
npm run electron:pack
```
The packaged binary will be generated under the `dist-desktop/TrumpetPracticeHero-win32-x64/` directory.

---

## File Structure

* `src/modules/audio-engine.js`: Web Audio API pitch-tracking and autocorrelation module.
* `src/modules/game-engine.js`: Staff canvas rendering, rhythmic notes, ledger lines, and game scoring loop.
* `src/modules/music-parser.js`: Parsers for MusicXML, MuseScore, and standard binary MIDI sheets.
* `src/modules/featherless-client.js`: Client connector for the Featherless.ai completions endpoint.
* `src/modules/ai-advisor.js`: Visualizes cent graphs and prepares analytics summaries.
* `electron-main.cjs`: Electron desktop container shell entry point.
