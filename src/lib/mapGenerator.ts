import type { MapObject } from "@/types/game";

export const MAP_WIDTH = 3200;
export const MAP_HEIGHT = 2000;
export const SECRET_AREA = { x: 2900, y: 1700, radius: 90 };
export const PLAYER_START = { x: 240, y: 300 };

// Zone definitions — different biomes on the map
export const ZONES = {
  meadow: { x: 0, y: 0, w: 1200, h: 1000, baseColor: "#5a8f5a", accent: "#6aaf6a" },
  sakura: { x: 800, y: 0, w: 800, h: 700, baseColor: "#7a6080", accent: "#9a7a9a" },
  forest: { x: 1400, y: 0, w: 900, h: 1200, baseColor: "#2d5a3a", accent: "#3d7a4a" },
  pond: { x: 400, y: 750, w: 700, h: 700, baseColor: "#3a6a7a", accent: "#4a8a9a" },
  garden: { x: 1600, y: 600, w: 900, h: 900, baseColor: "#6a5a4a", accent: "#8a7a5a" },
  secret: { x: 2500, y: 1400, w: 700, h: 600, baseColor: "#5a3a6a", accent: "#7a5a9a" },
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateMapObjects(): MapObject[] {
  const rand = seededRandom(77);
  const objects: MapObject[] = [];

  // ── MEADOW: grassy open area with wildflowers ──
  const meadowTrees = [
    [120, 180], [80, 500], [180, 750], [350, 120], [280, 450],
    [450, 700], [600, 150], [80, 950], [530, 900],
  ];
  meadowTrees.forEach(([x, y]) => objects.push({ x, y, type: "tree", variant: Math.floor(rand() * 3), zone: "meadow" }));
  for (let i = 0; i < 60; i++) objects.push({ x: 30 + rand() * 900, y: 30 + rand() * 950, type: "flower", variant: Math.floor(rand() * 5), zone: "meadow" });
  for (let i = 0; i < 10; i++) objects.push({ x: 80 + rand() * 800, y: 80 + rand() * 900, type: "mushroom", variant: Math.floor(rand() * 3), zone: "meadow" });
  for (let i = 0; i < 8; i++) objects.push({ x: 100 + rand() * 800, y: 100 + rand() * 800, type: "rock", variant: Math.floor(rand() * 3), zone: "meadow" });

  // ── SAKURA GROVE: cherry blossom trees ──
  const sakuraPos = [[900, 60], [1050, 120], [920, 280], [1100, 300], [1200, 80], [1350, 180], [980, 450], [1150, 520], [1050, 600]];
  sakuraPos.forEach(([x, y]) => objects.push({ x, y, type: "sakura", variant: Math.floor(rand() * 2), zone: "sakura", scale: 1 + rand() * 0.4 }));
  for (let i = 0; i < 25; i++) objects.push({ x: 850 + rand() * 550, y: 30 + rand() * 650, type: "flower", variant: 3 + Math.floor(rand() * 2), zone: "sakura" });

  // Arch at sakura entrance
  objects.push({ x: 880, y: 350, type: "arch", variant: 0, zone: "sakura" });

  // ── FOREST: dense dark trees ──
  const forestTrees = [
    [1500, 60], [1600, 200], [1750, 80], [1900, 160], [2050, 60], [2200, 180],
    [1480, 350], [1700, 400], [1950, 320], [2100, 420], [2280, 300],
    [1550, 600], [1800, 700], [2000, 580], [2200, 650], [2350, 500],
    [1500, 900], [1650, 1000], [1900, 950], [2150, 1050], [2300, 900],
    [1480, 1150], [1700, 1200], [2000, 1150], [2250, 1200], [1600, 800],
  ];
  forestTrees.forEach(([x, y]) => objects.push({ x, y, type: "pine", variant: Math.floor(rand() * 3), zone: "forest", scale: 0.9 + rand() * 0.6 }));
  for (let i = 0; i < 40; i++) objects.push({ x: 1450 + rand() * 900, y: 30 + rand() * 1200, type: "fern", variant: Math.floor(rand() * 3), zone: "forest" });
  for (let i = 0; i < 20; i++) objects.push({ x: 1460 + rand() * 880, y: 40 + rand() * 1180, type: "mushroom", variant: Math.floor(rand() * 3), zone: "forest" });
  // Crystal formations deep in forest
  for (let i = 0; i < 6; i++) objects.push({ x: 2100 + rand() * 200, y: 600 + rand() * 500, type: "crystal", variant: Math.floor(rand() * 3), zone: "forest" });

  // Lanterns along forest path
  [[1600, 300], [1750, 500], [1900, 700], [2000, 900], [2100, 1100]].forEach(([x, y]) =>
    objects.push({ x, y, type: "lantern", variant: 0, zone: "forest" })
  );

  // ── POND AREA ──
  const pondLilies = [];
  for (let i = 0; i < 30; i++) pondLilies.push([450 + rand() * 500, 800 + rand() * 500]);
  pondLilies.forEach(([x, y]) => objects.push({ x, y, type: "lily", variant: Math.floor(rand() * 3), zone: "pond" }));
  for (let i = 0; i < 20; i++) objects.push({ x: 380 + rand() * 600, y: 760 + rand() * 570, type: "reed", variant: Math.floor(rand() * 2), zone: "pond" });
  // Firefly bushes near pond
  for (let i = 0; i < 5; i++) objects.push({ x: 400 + rand() * 550, y: 800 + rand() * 500, type: "firefly_bush", variant: 0, zone: "pond" });

  // ── GARDEN ──
  const gardenRoses = [];
  for (let i = 0; i < 25; i++) gardenRoses.push([1650 + rand() * 800, 650 + rand() * 800]);
  gardenRoses.forEach(([x, y]) => objects.push({ x, y, type: "rose", variant: Math.floor(rand() * 4), zone: "garden" }));
  objects.push({ x: 2050, y: 900, type: "fountain", variant: 0, zone: "garden" });
  objects.push({ x: 1750, y: 800, type: "bench", variant: 0, zone: "garden" });
  objects.push({ x: 2300, y: 800, type: "bench", variant: 1, zone: "garden" });
  // Garden arches
  objects.push({ x: 1700, y: 680, type: "arch", variant: 1, zone: "garden" });
  objects.push({ x: 2400, y: 680, type: "arch", variant: 1, zone: "garden" });
  for (let i = 0; i < 30; i++) objects.push({ x: 1650 + rand() * 850, y: 650 + rand() * 850, type: "flower", variant: Math.floor(rand() * 5), zone: "garden" });
  for (let i = 0; i < 10; i++) objects.push({ x: 1660 + rand() * 830, y: 660 + rand() * 830, type: "bush", variant: 0, zone: "garden" });

  // ── SECRET GARDEN ──
  const secretPos = [[2600, 1500], [2700, 1450], [2800, 1520], [2900, 1460], [3000, 1530], [2650, 1650], [2750, 1600], [2850, 1680], [2980, 1620], [3050, 1700]];
  secretPos.forEach(([x, y]) => objects.push({ x, y, type: "sakura", variant: 1, zone: "secret_garden", scale: 1.2 + rand() * 0.5 }));
  for (let i = 0; i < 20; i++) objects.push({ x: 2580 + rand() * 500, y: 1430 + rand() * 430, type: "flower", variant: 4, zone: "secret_garden" });
  for (let i = 0; i < 8; i++) objects.push({ x: 2600 + rand() * 450, y: 1440 + rand() * 420, type: "crystal", variant: Math.floor(rand() * 3), zone: "secret_garden" });
  // Lanterns encircling secret area
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    objects.push({ x: SECRET_AREA.x + Math.cos(angle) * 160, y: SECRET_AREA.y + Math.sin(angle) * 140, type: "lantern", variant: 1, zone: "secret_garden" });
  }

  return objects;
}

// ── BIOME-AWARE GROUND RENDERER ──────────────────────────────
export function drawGround(ctx: CanvasRenderingContext2D, camX: number, camY: number, w: number, h: number, time: number) {
  // Base fill
  ctx.fillStyle = "#4a7a50";
  ctx.fillRect(0, 0, w, h);

  drawBiomeLayer(ctx, camX, camY, w, h, time);
  drawPondWater(ctx, camX, camY, w, h, time);
  drawPaths(ctx, camX, camY, time);
  drawSecretGlow(ctx, camX, camY, time);
}

function drawBiomeLayer(ctx: CanvasRenderingContext2D, camX: number, camY: number, w: number, h: number, time: number) {
  const TILE = 48;
  const startCol = Math.floor(camX / TILE) - 1;
  const startRow = Math.floor(camY / TILE) - 1;
  const endCol = startCol + Math.ceil(w / TILE) + 2;
  const endRow = startRow + Math.ceil(h / TILE) + 2;

  for (let row = startRow; row < endRow; row++) {
    for (let col = startCol; col < endCol; col++) {
      const wx = col * TILE;
      const wy = row * TILE;
      const sx = wx - camX;
      const sy = wy - camY;

      const rng = seededRandom(row * 3001 + col * 7)();

      // Determine zone color
      let baseColor = "#4a7a50";
      let detail = false;

      // Sakura zone — purple-pink haze
      if (wx > 800 && wx < 1650 && wy < 700) {
        const blend = Math.min(1, (wx - 800) / 300);
        baseColor = blendHex("#4a7a50", "#6a5a70", blend * 0.6 + rng * 0.15);
        detail = rng < 0.3;
      }
      // Forest — very dark green
      if (wx > 1400 && wx < 2400 && wy < 1300) {
        const depth = Math.min(1, (wx - 1400) / 300);
        baseColor = blendHex("#4a7a50", "#1e3d28", depth * 0.8 + rng * 0.1);
        detail = rng < 0.5;
      }
      // Pond — teal
      if (wx > 400 && wx < 950 && wy > 800 && wy < 1350) {
        baseColor = "#3a6878";
      }
      // Garden — warm earth
      if (wx > 1600 && wx < 2550 && wy > 600 && wy < 1500) {
        const blend = Math.min(1, (wx - 1600) / 200) * Math.min(1, (wy - 600) / 200);
        baseColor = blendHex("#4a7a50", "#6a5a3a", blend * 0.5 + rng * 0.1);
        detail = rng < 0.25;
      }
      // Secret garden
      if (wx > 2550 && wy > 1400) {
        baseColor = blendHex("#4a7a50", "#4a2a6a", 0.7 + rng * 0.2);
        detail = rng < 0.4;
      }

      ctx.fillStyle = baseColor;
      ctx.fillRect(sx, sy, TILE + 1, TILE + 1);

      // Subtle variation
      if (rng < 0.12) {
        ctx.fillStyle = "rgba(0,0,0,0.06)";
        ctx.fillRect(sx, sy, TILE, TILE);
      }

      // Grass detail
      if (detail && rng > 0.05) {
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fillRect(sx + rng * TILE, sy + rng * TILE, 2, 5);
        ctx.fillRect(sx + rng * TILE + 6, sy + rng * TILE + 2, 2, 4);
      }
    }
  }
}

function drawPondWater(ctx: CanvasRenderingContext2D, camX: number, camY: number, w: number, h: number, time: number) {
  // Oval pond shape
  const cx = 680 - camX, cy = 1060 - camY;
  const rx = 280, ry = 200;
  if (cx + rx < 0 || cx - rx > w || cy + ry < 0 || cy - ry > h) return;

  ctx.save();

  // Water base
  const wg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
  wg.addColorStop(0, "rgba(50,120,160,0.92)");
  wg.addColorStop(0.6, "rgba(30,90,130,0.95)");
  wg.addColorStop(1, "rgba(20,60,100,0.5)");
  ctx.fillStyle = wg;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();

  // Animated ripples
  ctx.strokeStyle = "rgba(150,220,255,0.15)";
  ctx.lineWidth = 1.5;
  for (let r = 1; r < 5; r++) {
    const phase = (time * 0.004 + r * 0.8) % 1;
    const rr = phase * rx * 0.9;
    ctx.globalAlpha = (1 - phase) * 0.4;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rr, rr * ry / rx, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Shimmer highlights
  for (let i = 0; i < 8; i++) {
    const sx2 = cx + Math.cos(i * 1.1 + time * 0.002) * rx * 0.5;
    const sy2 = cy + Math.sin(i * 0.9 + time * 0.002) * ry * 0.5;
    const shimAlpha = (Math.sin(time * 0.008 + i) * 0.5 + 0.5) * 0.3;
    ctx.fillStyle = `rgba(200,240,255,${shimAlpha})`;
    ctx.beginPath();
    ctx.ellipse(sx2, sy2, 8, 3, i, 0, Math.PI * 2);
    ctx.fill();
  }

  // Shore edge glow
  const sg = ctx.createRadialGradient(cx, cy, rx * 0.7, cx, cy, rx * 1.1);
  sg.addColorStop(0, "rgba(0,0,0,0)");
  sg.addColorStop(1, "rgba(20,60,80,0.4)");
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx * 1.1, ry * 1.1, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawPaths(ctx: CanvasRenderingContext2D, camX: number, camY: number, time: number) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Main winding path
  ctx.strokeStyle = "rgba(220,200,160,0.2)";
  ctx.lineWidth = 28;
  ctx.setLineDash([50, 35]);
  ctx.beginPath();
  ctx.moveTo(PLAYER_START.x - camX, PLAYER_START.y - camY);
  ctx.bezierCurveTo(700 - camX, 200 - camY, 1200 - camX, 400 - camY, 1600 - camX, 300 - camY);
  ctx.bezierCurveTo(2000 - camX, 200 - camY, 2400 - camX, 700 - camY, 2900 - camX, 1700 - camY);
  ctx.stroke();

  // Sub-path to pond
  ctx.strokeStyle = "rgba(150,200,220,0.15)";
  ctx.lineWidth = 20;
  ctx.setLineDash([30, 25]);
  ctx.beginPath();
  ctx.moveTo(400 - camX, 500 - camY);
  ctx.bezierCurveTo(500 - camX, 700 - camY, 600 - camX, 900 - camY, 680 - camX, 1060 - camY);
  ctx.stroke();

  // Sub-path to garden
  ctx.strokeStyle = "rgba(200,160,180,0.15)";
  ctx.setLineDash([30, 20]);
  ctx.beginPath();
  ctx.moveTo(1500 - camX, 500 - camY);
  ctx.bezierCurveTo(1700 - camX, 600 - camY, 1900 - camX, 700 - camY, 2050 - camX, 900 - camY);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.restore();
}

function drawSecretGlow(ctx: CanvasRenderingContext2D, camX: number, camY: number, time: number) {
  const sx = SECRET_AREA.x - camX;
  const sy = SECRET_AREA.y - camY;
  if (sx < -300 || sx > ctx.canvas.width + 300 || sy < -300 || sy > ctx.canvas.height + 300) return;

  const pulse = Math.sin(time * 0.002) * 0.3 + 0.7;
  ctx.save();
  ctx.globalAlpha = pulse;

  const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 200);
  g.addColorStop(0, "rgba(200,150,255,0.4)");
  g.addColorStop(0.4, "rgba(255,150,200,0.25)");
  g.addColorStop(0.7, "rgba(150,100,220,0.1)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(sx, sy, 200, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.restore();
}

// Hex color blend helper
function blendHex(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16), ag = parseInt(a.slice(3, 5), 16), ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16), bg = parseInt(b.slice(3, 5), 16), bb = parseInt(b.slice(5, 7), 16);
  const rr = Math.round(ar + (br - ar) * t), rg = Math.round(ag + (bg - ag) * t), rb2 = Math.round(ab + (bb - ab) * t);
  return `rgb(${rr},${rg},${rb2})`;
}
