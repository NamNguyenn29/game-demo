// ============================================================
// 💌 CUSTOMIZE YOUR MESSAGES HERE
// ============================================================

export const PLAYER_NAME = "My Love";
export const GAME_TITLE = "A Little World For You";

export const START_SCREEN = {
  greeting: "Hello, Bui Nguyen Hai Ngan🌸",
  chapter: "Chapter 1: Our Little Universe",
  description: "Somewhere between code and dreams,\nI built a world only you could fill.\nWalk through it. I left pieces of us everywhere.",
  buttonText: "Begin Our Story →",
  hint: "WASD / Arrow Keys to move • Walk near glowing spots",
};

// ============================================================
// 💬 LOVE NOTES — 7 notes across the map
// ============================================================
export const LOVE_NOTES: LoveNote[] = [
  {
    id: "note1", x: 480, y: 320,
    icon: "🌿", title: "Where It Began",
    chapter: "I.",
    message: "It started with something small.\nA glance. A smile that felt like a whole conversation.\nI didn't know then that I was already falling —\nbut looking back, I think some part of me knew.",
    color: "#86efac", accent: "#4ade80",
    zone: "meadow",
  },
  {
    id: "note2", x: 950, y: 280,
    icon: "🌸", title: "The Way You Laugh",
    chapter: "II.",
    message: "Your laugh is my favorite sound in the world.\nNot the polite one — the real one,\nwhen something catches you off guard\nand you forget to hold it back.\nThat one. I'd do anything to hear that one.",
    color: "#fda4af", accent: "#fb7185",
    zone: "sakura",
  },
  {
    id: "note3", x: 1500, y: 380,
    icon: "🍃", title: "The Forest Knows",
    chapter: "III.",
    message: "There are days I get lost in my thoughts —\nand somehow you always find me there.\nYou don't even have to say anything.\nYou just sit with me, and suddenly\nthe world feels like somewhere I belong.",
    color: "#6ee7b7", accent: "#34d399",
    zone: "forest",
  },
  {
    id: "note4", x: 720, y: 900,
    icon: "💧", title: "Still Water",
    chapter: "IV.",
    message: "I love the quiet moments most.\nUsually, silence feels empty —\nbut with you, it's full of everything unsaid,\neverything already understood.\nYou are the first person who made silence feel like home.",
    color: "#93c5fd", accent: "#60a5fa",
    zone: "pond",
  },
  {
    id: "note5", x: 1850, y: 750,
    icon: "🌹", title: "The Garden I Keep",
    chapter: "V.",
    message: "I've been tending this garden for a while now —\nlearning which flowers need space to breathe,\nwhich ones bloom best when they're held gently.\nI think I've been practicing without knowing it.\nPracticing for someone like you.",
    color: "#f9a8d4", accent: "#ec4899",
    zone: "garden",
  },
  {
    id: "note6", x: 1200, y: 1100,
    icon: "✨", title: "Bright Things",
    chapter: "VI.",
    message: "You are brilliant — and I don't mean that lightly.\nThe way your mind moves through problems,\nthe way you build things from nothing,\nthe care you put into your craft —\nit takes my breath away every single time.",
    color: "#fde68a", accent: "#fbbf24",
    zone: "garden",
  },
  {
    id: "note7", x: 400, y: 1300,
    icon: "🌙", title: "Every Night",
    chapter: "VII.",
    message: "Every night before I sleep\nI think about how lucky I am —\nnot in a general way, but specifically:\nlucky that it was you, in this life,\nat this exact moment.\nOf all the ways things could have gone,\nthey went toward you.",
    color: "#c4b5fd", accent: "#a78bfa",
    zone: "meadow",
  },
];

// ============================================================
// 💖 SECRET ENDING
// ============================================================
export const SECRET_MESSAGE = {
  title: "You Found the Secret Garden 💖",
  subtitle: "— The Final Chapter —",
  lines: [
    "If you're reading this, you walked the whole world I made for you.",
    "Every flower, every path, every note — all of it was a way",
    "of saying the things that get stuck somewhere between my heart and my mouth.",
    "",
    "So here, at the end, let me just say it plainly:",
    "",
    "I love you.",
    "",
    "I love the way you think, the way you care,",
    "the way you show up — for your work, for the people you love,",
    "and somehow, impossibly, for me.",
    "",
    "You make ordinary days feel like something worth remembering.",
    "You make me want to be better at everything I do.",
    "",
    "This little world will always be here.",
    "And so will I. 🌸",
    "",
    "— Made with love, for you alone 💌",
  ],
  buttonText: "I love you too 💕",
};

// ============================================================
export interface LoveNote {
  id: string; x: number; y: number;
  icon: string; title: string; chapter: string;
  message: string; color: string; accent: string;
  zone: string;
}
