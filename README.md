# 💌 A Little World For You — Love Game

A cute 2D exploration game built with Next.js 14, TypeScript, TailwindCSS, and HTML5 Canvas.
Made as a romantic gift — fully customizable, deployable to Vercel in minutes.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💌 Personalizing the Game

**All messages live in one file:**

```
src/lib/gameConfig.ts
```

Edit these fields:

| Field | What it changes |
|-------|----------------|
| `PLAYER_NAME` | Her nickname (displayed in HUD) |
| `GAME_TITLE` | The title on the start screen |
| `START_SCREEN` | Greeting, description, button text |
| `LOVE_NOTES[]` | The 5 love notes scattered on the map |
| `SECRET_MESSAGE` | The final message at the secret area |

Each `LOVE_NOTES` entry has:
- `x`, `y` — map position (map is 2400×1600px)
- `icon` — emoji shown as the marker
- `title` — bold heading on the note card
- `message` — body text (use `\n` for line breaks)
- `color` — hex color for the note card accent

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| `W` / `↑` | Move up |
| `S` / `↓` | Move down |
| `A` / `←` | Move left |
| `D` / `→` | Move right |

Walk up to glowing markers to read love notes.
Find the 💖 secret area in the bottom-right corner for the final message.

---

## 📦 Deploy to Vercel

```bash
npx vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deploys.

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + fonts
│   ├── page.tsx            # Main game orchestrator
│   └── globals.css         # Global styles
├── components/game/
│   ├── GameCanvas.tsx      # Canvas game loop + rendering
│   ├── LoadingScreen.tsx   # Animated loading screen
│   ├── StartMenu.tsx       # Title / start screen
│   ├── NoteModal.tsx       # Love note popup card
│   └── SecretModal.tsx     # Final secret ending screen
├── hooks/
│   └── useGameEngine.ts    # Player movement, physics, interactions
├── lib/
│   ├── gameConfig.ts       # ✏️  ALL EDITABLE CONTENT LIVES HERE
│   ├── mapGenerator.ts     # Map layout, ground drawing, object placement
│   └── renderer.ts         # Canvas drawing: character, trees, flowers, HUD
└── types/
    └── game.ts             # TypeScript interfaces
```

---

## ✨ Features

- 🗺 Large scrolling 2D map (2400×1600) with camera follow
- 🧝 Animated chibi character with walk cycle, blinking, bobbing
- 🌸 Procedural map: trees, flowers, mushrooms, rocks, lily pads
- 💌 5 collectible love notes with glowing markers
- 💖 Secret area with final animated message reveal
- 🗺 Mini-map HUD
- ✨ Ambient particle effects
- 📱 Loading screen with animated progress
- 🎨 Pastel dark aesthetic, Google Fonts (Playfair Display + Quicksand)
- 🚀 Zero dependencies beyond Next.js — pure Canvas rendering
