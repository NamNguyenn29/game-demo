"use client";
import { useRef, useCallback } from "react";
import type { Player, Camera, Particle } from "@/types/game";
import type { GameState } from "@/types/game";
import { MAP_WIDTH, MAP_HEIGHT, SECRET_AREA, PLAYER_START } from "@/lib/mapGenerator";
import { LOVE_NOTES } from "@/lib/gameConfig";

const SPEED = 2.6;
const PLAYER_RADIUS = 16;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function useGameEngine(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  gameState: GameState,
  onOpenNote: (id: string) => void,
  onReachSecret: () => void
) {
  const keysRef = useRef<Set<string>>(new Set());
  const playerRef = useRef<Player>({
    x: PLAYER_START.x, y: PLAYER_START.y,
    vx: 0, vy: 0,
    facing: "right", moving: false,
    frame: 0, frameTimer: 0,
    hairFlow: 0, skirtFlow: 0,
  });
  const cameraRef = useRef<Camera>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const collectedNotesRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const secretTriggeredRef = useRef(false);

  const spawnParticles = useCallback((x: number, y: number, color: string, count = 8) => {
    const types: Array<Particle["type"]> = ["circle", "star", "petal", "heart", "sparkle"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 2;
      const type = types[Math.floor(Math.random() * types.length)];
      particlesRef.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        life: 70 + Math.random() * 60,
        maxLife: 130,
        color,
        size: 3 + Math.random() * 5,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
      });
    }
  }, []);

  const spawnPetals = useCallback((x: number, y: number) => {
    const petalColors = ["#fce7f3", "#f9a8d4", "#fbcfe8", "#fda4af", "#fecdd3"];
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.5;
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 40,
        y: y - Math.random() * 30,
        vx: Math.cos(angle) * speed * 0.5,
        vy: -Math.random() * 1.5 - 0.3,
        life: 100 + Math.random() * 80,
        maxLife: 180,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        size: 3 + Math.random() * 3,
        type: "petal",
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.1,
      });
    }
  }, []);

  const spawnAmbient = useCallback(() => {
    if (particlesRef.current.length >= 80) return;
    if (Math.random() > 0.07) return;

    const cam = cameraRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Determine if near sakura or secret area
    const px = playerRef.current.x;
    const py = playerRef.current.y;
    const nearSakura = px > 800 && px < 1700 && py < 700;
    const nearSecret = Math.hypot(px - SECRET_AREA.x, py - SECRET_AREA.y) < 300;

    if (nearSakura) {
      // Falling sakura petals
      particlesRef.current.push({
        x: cam.x + Math.random() * canvas.width,
        y: cam.y + Math.random() * canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 0.4 + Math.random() * 0.6,
        life: 150 + Math.random() * 100,
        maxLife: 250,
        color: ["#fce7f3", "#f9a8d4", "#fecdd3"][Math.floor(Math.random() * 3)],
        size: 3 + Math.random() * 3,
        type: "petal",
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
      });
    } else if (nearSecret) {
      // Magic sparkles
      particlesRef.current.push({
        x: cam.x + Math.random() * canvas.width,
        y: cam.y + Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        life: 80 + Math.random() * 60,
        maxLife: 140,
        color: ["#c4b5fd", "#f0abfc", "#a78bfa"][Math.floor(Math.random() * 3)],
        size: 3 + Math.random() * 3,
        type: "sparkle",
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: 0.08,
      });
    } else {
      // Default floating orbs
      const colors = ["#fda4af","#c4b5fd","#6ee7b7","#fde68a","#fbcfe8","#93c5fd"];
      particlesRef.current.push({
        x: cam.x + Math.random() * canvas.width,
        y: cam.y + Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.3 - Math.random() * 0.5,
        life: 100 + Math.random() * 80,
        maxLife: 180,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
        type: "circle",
      });
    }
  }, [canvasRef]);

  const updatePlayer = useCallback((dt: number) => {
    const p = playerRef.current;
    const keys = keysRef.current;
    let dx = 0, dy = 0;

    if (keys.has("ArrowLeft")  || keys.has("a") || keys.has("A")) dx -= 1;
    if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) dx += 1;
    if (keys.has("ArrowUp")    || keys.has("w") || keys.has("W")) dy -= 1;
    if (keys.has("ArrowDown")  || keys.has("s") || keys.has("S")) dy += 1;

    if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

    const moving = dx !== 0 || dy !== 0;
    p.moving = moving;

    if (moving) {
      if (Math.abs(dx) >= Math.abs(dy)) {
        p.facing = dx > 0 ? "right" : "left";
      } else {
        p.facing = dy > 0 ? "down" : "up";
      }
    }

    p.vx += (dx * SPEED - p.vx) * 0.22;
    p.vy += (dy * SPEED - p.vy) * 0.22;

    p.x = clamp(p.x + p.vx, PLAYER_RADIUS, MAP_WIDTH - PLAYER_RADIUS);
    p.y = clamp(p.y + p.vy, PLAYER_RADIUS, MAP_HEIGHT - PLAYER_RADIUS);

    // Hair and skirt physics
    p.hairFlow = p.hairFlow * 0.9 + (p.vx * 0.3 + (Math.random() - 0.5) * 0.2);
    p.skirtFlow = p.skirtFlow * 0.85 + p.vx * 0.4;

    // Footstep particles near sakura
    const nearSakura = p.x > 800 && p.x < 1700 && p.y < 700;
    if (moving && Math.random() < 0.12 && nearSakura) {
      spawnPetals(p.x, p.y);
    }
  }, [spawnPetals]);

  const updateCamera = useCallback((canvasW: number, canvasH: number) => {
    const p = playerRef.current;
    const cam = cameraRef.current;
    const targetX = p.x - canvasW / 2;
    const targetY = p.y - canvasH / 2;
    cam.x += (targetX - cam.x) * 0.075;
    cam.y += (targetY - cam.y) * 0.075;
    cam.x = clamp(cam.x, 0, Math.max(0, MAP_WIDTH - canvasW));
    cam.y = clamp(cam.y, 0, Math.max(0, MAP_HEIGHT - canvasH));
  }, []);

  const updateParticles = useCallback(() => {
    particlesRef.current = particlesRef.current.filter((p: Particle) => p.life > 0);
    for (const p of particlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.type === "petal" ? 0.01 : -0.008; // petals fall, others rise
      p.vx *= 0.99;
      if (p.rotation !== undefined && p.rotSpeed) p.rotation += p.rotSpeed;
      p.life -= 1;
    }
  }, []);

  const checkInteractions = useCallback(() => {
    const p = playerRef.current;

    for (const note of LOVE_NOTES) {
      if (collectedNotesRef.current.has(note.id)) continue;
      const dist = Math.hypot(p.x - note.x, p.y - note.y);
      if (dist < 45) {
        collectedNotesRef.current.add(note.id);
        spawnParticles(p.x, p.y, note.color, 16);
        // Extra hearts
        for (let i = 0; i < 5; i++) {
          const angle = Math.random() * Math.PI * 2;
          particlesRef.current.push({
            x: p.x, y: p.y,
            vx: Math.cos(angle) * 1.5,
            vy: Math.sin(angle) * 1.5 - 2,
            life: 60, maxLife: 60,
            color: note.color, size: 8,
            type: "heart",
          });
        }
        onOpenNote(note.id);
        return;
      }
    }

    const dist = Math.hypot(p.x - SECRET_AREA.x, p.y - SECRET_AREA.y);
    if (dist < SECRET_AREA.radius && !secretTriggeredRef.current) {
      secretTriggeredRef.current = true;
      spawnParticles(p.x, p.y, "#c084fc", 24);
      onReachSecret();
    }
  }, [onOpenNote, onReachSecret, spawnParticles]);

  return {
    keysRef, playerRef, cameraRef, particlesRef,
    collectedNotesRef, timeRef, lastTimeRef, rafRef,
    updatePlayer, updateCamera, updateParticles,
    checkInteractions, spawnAmbient, spawnParticles,
  };
}
