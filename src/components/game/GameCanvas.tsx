"use client";
import { useEffect, useRef, useCallback } from "react";
import type { GameState } from "@/types/game";
import { useGameEngine } from "@/hooks/useGameEngine";
import { generateMapObjects, drawGround, MAP_WIDTH, MAP_HEIGHT, SECRET_AREA } from "@/lib/mapGenerator";
import { drawPlayer, drawMapObject, drawNoteMarker, drawSecretMarker, drawParticles, drawMinimap } from "@/lib/renderer";
import { LOVE_NOTES } from "@/lib/gameConfig";

interface Props {
  gameState: GameState;
  onOpenNote: (id: string) => void;
  onReachSecret: () => void;
}

const mapObjects = generateMapObjects();

export default function GameCanvas({ gameState, onOpenNote, onReachSecret }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useGameEngine(canvasRef, gameState, onOpenNote, onReachSecret);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
      engine.keysRef.current.add(e.key);
    };
    const onUp = (e: KeyboardEvent) => engine.keysRef.current.delete(e.key);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => { window.removeEventListener("keydown", onDown); window.removeEventListener("keyup", onUp); };
  }, [engine.keysRef]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const gameLoop = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dt = Math.min(timestamp - (engine.lastTimeRef.current || timestamp), 50);
    engine.lastTimeRef.current = timestamp;
    engine.timeRef.current += 1;
    const time = engine.timeRef.current;

    if (isPlayingRef.current) {
      engine.updatePlayer(dt);
      engine.updateCamera(canvas.width, canvas.height);
      engine.updateParticles();
      engine.spawnAmbient();
      engine.checkInteractions();
    }

    const cam = engine.cameraRef.current;
    const player = engine.playerRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ground with biomes
    drawGround(ctx, cam.x, cam.y, canvas.width, canvas.height, time);

    // Sort by Y for depth ordering (painter's algorithm)
    const visibleObjects = mapObjects.filter(obj => {
      const sx = obj.x - cam.x, sy = obj.y - cam.y;
      return sx > -150 && sx < canvas.width+150 && sy > -150 && sy < canvas.height+150;
    });
    visibleObjects.sort((a, b) => a.y - b.y);

    for (const obj of visibleObjects) {
      drawMapObject(ctx, obj, cam.x, cam.y, time);
    }

    // Note markers (behind player)
    for (const note of LOVE_NOTES) {
      if (note.y <= player.y) {
        drawNoteMarker(ctx, note, cam.x, cam.y, engine.collectedNotesRef.current.has(note.id), time);
      }
    }

    // Secret area
    drawSecretMarker(ctx, SECRET_AREA.x - cam.x, SECRET_AREA.y - cam.y, time);

    // Particles (behind player)
    drawParticles(ctx, engine.particlesRef.current.filter(p => p.y <= player.y), cam.x, cam.y);

    // Player
    drawPlayer(ctx, player, cam.x, cam.y, time);

    // Note markers (in front of player)
    for (const note of LOVE_NOTES) {
      if (note.y > player.y) {
        drawNoteMarker(ctx, note, cam.x, cam.y, engine.collectedNotesRef.current.has(note.id), time);
      }
    }

    // Particles (in front of player)
    drawParticles(ctx, engine.particlesRef.current.filter(p => p.y > player.y), cam.x, cam.y);

    // HUD
    if (isPlayingRef.current) {
      drawHUD(ctx, canvas.width, canvas.height, engine.collectedNotesRef.current.size, LOVE_NOTES.length, time);
      drawMinimap(ctx, player.x, player.y, MAP_WIDTH, MAP_HEIGHT,
        engine.collectedNotesRef.current, LOVE_NOTES, SECRET_AREA.x, SECRET_AREA.y, canvas.width);
    }

    engine.rafRef.current = requestAnimationFrame(gameLoop);
  }, [engine]);

  useEffect(() => {
    isPlayingRef.current = gameState === "playing";
  }, [gameState]);

  useEffect(() => {
    engine.rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(engine.rafRef.current);
  }, [gameLoop]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0" />
  );
}

function drawHUD(ctx: CanvasRenderingContext2D, w: number, h: number, collected: number, total: number, time: number) {
  // Letter counter — bottom left
  const bx = 16, by = h - 64;
  ctx.fillStyle = "rgba(10,5,25,0.65)";
  ctx.strokeStyle = "rgba(192,132,252,0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(bx, by, 200, 48, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f9a8d4";
  ctx.font = "bold 13px Quicksand, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`💌 Letters found: ${collected} / ${total}`, bx + 14, by + 20);

  // Progress bar
  const barW = 172, barH = 5;
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.beginPath();
  ctx.roundRect(bx + 14, by + 30, barW, barH, 3);
  ctx.fill();
  ctx.fillStyle = collected === total
    ? "#c084fc"
    : `hsl(${320 + collected * 10}, 80%, 72%)`;
  ctx.beginPath();
  ctx.roundRect(bx + 14, by + 30, Math.max(0, (collected / total) * barW), barH, 3);
  ctx.fill();

  // Controls hint (fades after 5 seconds)
  const hint = Math.max(0, 1 - time / 300);
  if (hint > 0) {
    ctx.globalAlpha = hint;
    ctx.fillStyle = "rgba(10,5,25,0.6)";
    ctx.beginPath();
    ctx.roundRect(w/2 - 130, h - 50, 260, 34, 20);
    ctx.fill();
    ctx.fillStyle = "rgba(253,230,138,0.9)";
    ctx.font = "12px Quicksand, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Walk near glowing markers to read letters ✦", w/2, h - 28);
    ctx.globalAlpha = 1;
  }
}
