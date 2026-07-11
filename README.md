# 🎺 TrumpetPracticeHero

TrumpetPracticeHero is an interactive, browser-based and desktop-native trumpet tutor designed to help brass musicians master pitch intonation, sight-reading, and piston valve fingerings. Using real-time, zero-lag monophonic pitch detection, it evaluates notes as you play and guides you through popular melodies.

---

## 🎨 Key Features

* **🎼 High-Contrast Scrolling Staff**: Thicker, high-contrast staff lines (`2.0px`) with dynamic ledger lines, rests, and note flags (eighth/sixteenth notes).
* **🎯 Zero-Lag Intonation Gauge**: Real-time autocorrelation pitch tracking optimized for brass frequencies (130Hz - 1200Hz) running at a throttled 22 FPS to prevent main-thread lag.
* **🛡️ Late-Hit Latency Window**: A 200ms reaction buffer compensates for natural delay, ensuring late blows are still credited correctly instead of resulting in false misses.
* **🍿 Popular Practice Library**: Built-in interactive lessons for:
  1. *Ode to Joy* (Beethoven)
  2. *Amazing Grace* (Traditional)
  3. *Twinkle Twinkle Little Star* (Traditional)
  4. *Jingle Bells* (James Pierpont)
  5. *Happy Birthday* (Traditional)
* **🎛️ Dynamic Intonation Tolerances**: Select relaxed (±45¢), normal (±35¢), or strict (±20¢) tuning tolerances.
* **⚡ Smart Prompt Suppression**: Displays piston valves only when playing a wrong pitch; if you are playing the correct note name but are slightly out of tune, the fingering prompt is suppressed so you can focus on centering the pitch.
* **🕳️ Trailing Note History**: Expanded playhead layout with a shrunken clef panel keeps 3+ beats of completed notes visible on screen so you can track your accuracy history.

---

## 🚀 How to Run the App (Developers)

Ensure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Web Version
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser!

### 3. Run the Windows Desktop App (Electron)
* **Development Mode** (with Live Reload):
  ```bash
  npm run electron:start
  ```
* **Production Mode** (loads local compiled code):
  ```bash
  npm run electron:build
  ```

---

## 📦 Packaging Standalone Windows Build

To compile a standalone Windows folder containing the executable binary (`TrumpetPracticeHero.exe`):
```bash
npm run electron:pack
```
The packaged binary will be generated under the `dist-desktop/TrumpetPracticeHero-win32-x64/` directory. You can compress this directory into a `.zip` file for easy distribution!

---

## 📝 File Structure

* `src/modules/audio-engine.js`: Web Audio API pitch-tracking and autocorrelation module.
* `src/modules/game-engine.js`: Staff canvas rendering, rhythmic notes, ledger lines, and game scoring loop.
* `src/modules/music-parser.js`: Parsers for MusicXML, MuseScore (.mscx), and standard binary MIDI sheets.
* `src/modules/fingerings.js`: Written-pitch-to-piston valve mapping catalog.
* `electron-main.cjs`: Electron desktop container shell entry point.
