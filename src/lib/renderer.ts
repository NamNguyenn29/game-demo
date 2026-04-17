import type { MapObject, Player, Particle } from "@/types/game";
import type { LoveNote } from "@/lib/gameConfig";

// ─────────────────────────────────────────────────────────────
// BEAUTIFUL FEMALE CHARACTER — anime/chibi style, detailed
// ─────────────────────────────────────────────────────────────
export function drawPlayer(ctx: CanvasRenderingContext2D, player: Player, camX: number, camY: number, time: number) {
  const sx = player.x - camX;
  const sy = player.y - camY;

  const t = time * 0.016;
  const walkCycle = player.moving ? t * 6 : 0;
  const idleBob = player.moving ? 0 : Math.sin(t * 1.8) * 2;
  const breathe = Math.sin(t * 1.2) * 0.8;
  const flip = player.facing === "left";

  ctx.save();
  ctx.translate(sx, sy + idleBob);
  if (flip) ctx.scale(-1, 1);

  // ── Shadow ──
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath();
  ctx.ellipse(0, 28, 18, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // ── Legs ──
  const leftLeg = Math.sin(walkCycle) * 12;
  const rightLeg = -leftLeg;

  // Left leg + stocking
  ctx.save();
  ctx.translate(-7, 14);
  ctx.rotate((leftLeg * Math.PI) / 180);
  // Stocking
  ctx.fillStyle = "#e8d0d0";
  ctx.beginPath();
  ctx.roundRect(-4, 0, 8, 16, 2);
  ctx.fill();
  // Shoe
  ctx.fillStyle = "#c84b6e";
  ctx.beginPath();
  ctx.ellipse(1, 18, 7, 4, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#a0304f";
  ctx.fillRect(-3, 15, 10, 3);
  ctx.restore();

  // Right leg + stocking
  ctx.save();
  ctx.translate(7, 14);
  ctx.rotate((rightLeg * Math.PI) / 180);
  ctx.fillStyle = "#e8d0d0";
  ctx.beginPath();
  ctx.roundRect(-4, 0, 8, 16, 2);
  ctx.fill();
  ctx.fillStyle = "#c84b6e";
  ctx.beginPath();
  ctx.ellipse(-1, 18, 7, 4, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#a0304f";
  ctx.fillRect(-7, 15, 10, 3);
  ctx.restore();

  // ── Dress — layered skirt ──
  const skirtSway = Math.sin(walkCycle * 0.7) * 3;

  // Skirt outer layer
  ctx.save();
  ctx.rotate((skirtSway * Math.PI) / 180);
  const skirtGrad = ctx.createLinearGradient(-18, -2, 18, 16);
  skirtGrad.addColorStop(0, "#f9a8c8");
  skirtGrad.addColorStop(0.5, "#f472a0");
  skirtGrad.addColorStop(1, "#ec4899");
  ctx.fillStyle = skirtGrad;
  ctx.beginPath();
  ctx.moveTo(-14, -2);
  ctx.lineTo(14, -2);
  ctx.bezierCurveTo(20, 5, 22, 12, 20, 16);
  ctx.lineTo(-20, 16);
  ctx.bezierCurveTo(-22, 12, -20, 5, -14, -2);
  ctx.fill();
  // Skirt lace trim
  ctx.strokeStyle = "#fecdd3";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 2]);
  ctx.beginPath();
  ctx.moveTo(-19, 13);
  ctx.bezierCurveTo(-10, 17, 10, 17, 19, 13);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // ── Torso / Blouse ──
  const bodyGrad = ctx.createLinearGradient(-12, -18, 12, 0);
  bodyGrad.addColorStop(0, "#fde8f0");
  bodyGrad.addColorStop(1, "#fbd0e0");
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.roundRect(-11, -18 + breathe * 0.3, 22, 18, [4,4,2,2]);
  ctx.fill();

  // Collar / neckline detail
  ctx.strokeStyle = "#f9a8c8";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-6, -18);
  ctx.lineTo(0, -13);
  ctx.lineTo(6, -18);
  ctx.stroke();

  // Ribbon bow on chest
  ctx.fillStyle = "#fb7185";
  // Left bow wing
  ctx.beginPath();
  ctx.ellipse(-5, -10, 5, 3, -0.4, 0, Math.PI * 2);
  ctx.fill();
  // Right bow wing
  ctx.beginPath();
  ctx.ellipse(5, -10, 5, 3, 0.4, 0, Math.PI * 2);
  ctx.fill();
  // Bow center
  ctx.fillStyle = "#e11d48";
  ctx.beginPath();
  ctx.arc(0, -10, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // ── Arms ──
  const leftArm = Math.sin(walkCycle + Math.PI) * 10;
  const rightArm = -leftArm;

  // Left arm
  ctx.save();
  ctx.translate(-13, -14);
  ctx.rotate((leftArm * Math.PI) / 180);
  const armGrad = ctx.createLinearGradient(0, 0, 0, 16);
  armGrad.addColorStop(0, "#fde8f0");
  armGrad.addColorStop(1, "#f5c5d8");
  ctx.fillStyle = armGrad;
  ctx.beginPath();
  ctx.roundRect(-4, 0, 8, 16, 4);
  ctx.fill();
  // Hand
  ctx.fillStyle = "#fde8d8";
  ctx.beginPath();
  ctx.arc(0, 17, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Right arm
  ctx.save();
  ctx.translate(13, -14);
  ctx.rotate((rightArm * Math.PI) / 180);
  ctx.fillStyle = armGrad;
  ctx.beginPath();
  ctx.roundRect(-4, 0, 8, 16, 4);
  ctx.fill();
  ctx.fillStyle = "#fde8d8";
  ctx.beginPath();
  ctx.arc(0, 17, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ── Neck ──
  ctx.fillStyle = "#fde8d8";
  ctx.beginPath();
  ctx.roundRect(-4, -22, 8, 8, 3);
  ctx.fill();

  // ── Head ──
  const headBob = player.moving ? Math.sin(walkCycle) * 1 : 0;
  ctx.save();
  ctx.translate(0, headBob);

  // Head base — slightly larger than tall (chibi proportion)
  ctx.fillStyle = "#fde8d8";
  ctx.beginPath();
  ctx.ellipse(0, -34, 18, 17, 0, 0, Math.PI * 2);
  ctx.fill();

  // ── Hair — long flowing dark purple/brown ──
  const hairFlow = Math.sin(t * 1.5 + player.x * 0.01) * 3;

  // Back hair (behind head) — long
  ctx.fillStyle = "#4c1d6e";
  ctx.beginPath();
  ctx.moveTo(-16, -38);
  ctx.bezierCurveTo(-22, -20, -24 + hairFlow * 0.5, 0, -18 + hairFlow, 25);
  ctx.lineTo(-10 + hairFlow * 0.7, 30);
  ctx.bezierCurveTo(-14, 10, -18, -10, -12, -38);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(16, -38);
  ctx.bezierCurveTo(22, -20, 24 - hairFlow * 0.5, 0, 18 - hairFlow, 25);
  ctx.lineTo(10 - hairFlow * 0.7, 30);
  ctx.bezierCurveTo(14, 10, 18, -10, 12, -38);
  ctx.closePath();
  ctx.fill();

  // Top hair
  ctx.fillStyle = "#5b2480";
  ctx.beginPath();
  ctx.ellipse(0, -42, 18, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Side hair volumes
  ctx.beginPath();
  ctx.ellipse(-18, -36, 9, 13, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(18, -36, 9, 13, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Bangs — elegant swept bangs
  ctx.fillStyle = "#4c1d6e";
  ctx.beginPath();
  ctx.moveTo(-17, -42);
  ctx.bezierCurveTo(-18, -32, -14, -26, -8, -24);
  ctx.bezierCurveTo(-5, -23, -2, -24, 0, -25);
  ctx.bezierCurveTo(-2, -30, -8, -34, -17, -42);
  ctx.fill();
  // Side bang
  ctx.beginPath();
  ctx.moveTo(15, -42);
  ctx.bezierCurveTo(17, -35, 14, -28, 10, -26);
  ctx.bezierCurveTo(8, -25, 6, -26, 4, -27);
  ctx.bezierCurveTo(6, -33, 10, -38, 15, -42);
  ctx.fill();

  // Hair shine highlight
  ctx.fillStyle = "rgba(200,150,255,0.25)";
  ctx.beginPath();
  ctx.ellipse(-4, -44, 6, 4, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // Hair accessories — star pins
  ctx.fillStyle = "#fbbf24";
  drawStar(ctx, -14, -44, 4);
  ctx.fillStyle = "#f9a8d4";
  drawStar(ctx, 12, -46, 3);

  // ── Eyes — large, expressive ──
  const blink = Math.floor(time / 200) % 15 === 0;
  const eyeLookX = player.moving ? (player.facing === "right" ? 1 : -1) * 1 : 0;

  if (blink) {
    // Closed eyes (crescent)
    ctx.strokeStyle = "#1e1b4b";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(-7, -33, 4, Math.PI, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(7, -33, 4, Math.PI, 0);
    ctx.stroke();
  } else {
    // Eye whites
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(-7 + eyeLookX, -33, 5.5, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(7 + eyeLookX, -33, 5.5, 6.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iris gradient — deep purple
    const iris1 = ctx.createRadialGradient(-7+eyeLookX, -34, 0, -7+eyeLookX, -33, 5);
    iris1.addColorStop(0, "#7c3aed");
    iris1.addColorStop(0.5, "#4c1d95");
    iris1.addColorStop(1, "#1e1b4b");
    ctx.fillStyle = iris1;
    ctx.beginPath();
    ctx.ellipse(-7 + eyeLookX, -33, 4.5, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    const iris2 = ctx.createRadialGradient(7+eyeLookX, -34, 0, 7+eyeLookX, -33, 5);
    iris2.addColorStop(0, "#7c3aed");
    iris2.addColorStop(0.5, "#4c1d95");
    iris2.addColorStop(1, "#1e1b4b");
    ctx.fillStyle = iris2;
    ctx.beginPath();
    ctx.ellipse(7 + eyeLookX, -33, 4.5, 5.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = "#0f0a1e";
    ctx.beginPath();
    ctx.ellipse(-7 + eyeLookX, -33, 2.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(7 + eyeLookX, -33, 2.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Main shine (large)
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.ellipse(-8.5 + eyeLookX, -35.5, 2, 2.5, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(5.5 + eyeLookX, -35.5, 2, 2.5, -0.3, 0, Math.PI * 2);
    ctx.fill();
    // Small shine
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    ctx.arc(-5 + eyeLookX, -30.5, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(9 + eyeLookX, -30.5, 1, 0, Math.PI * 2);
    ctx.fill();

    // Eyelashes (top)
    ctx.strokeStyle = "#1e1b4b";
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    for (let i = 0; i < 5; i++) {
      const ex = -11.5 + i * 2 + eyeLookX;
      ctx.beginPath();
      ctx.moveTo(ex, -38.5);
      ctx.lineTo(ex - 0.5 + i * 0.2, -40.5 - (i===2?1.5:0));
      ctx.stroke();
    }
    for (let i = 0; i < 5; i++) {
      const ex = 2.5 + i * 2 + eyeLookX;
      ctx.beginPath();
      ctx.moveTo(ex, -38.5);
      ctx.lineTo(ex - 0.5 + i * 0.2, -40.5 - (i===2?1.5:0));
      ctx.stroke();
    }
  }

  // Eyebrows
  ctx.strokeStyle = "#3b0764";
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-12, -40.5);
  ctx.bezierCurveTo(-9, -42, -5, -42, -2, -40.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(2, -40.5);
  ctx.bezierCurveTo(5, -42, 9, -42, 12, -40.5);
  ctx.stroke();

  // Nose — subtle
  ctx.strokeStyle = "rgba(180,120,120,0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(1, -27, 2, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Mouth — cute small smile
  ctx.strokeStyle = "#e05080";
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(0, -23, 4.5, 0.25, Math.PI - 0.25);
  ctx.stroke();
  // Lip color
  ctx.fillStyle = "rgba(240,100,130,0.4)";
  ctx.beginPath();
  ctx.ellipse(0, -22.5, 4, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Blush — soft
  ctx.fillStyle = "rgba(255,150,170,0.3)";
  ctx.beginPath();
  ctx.ellipse(-12, -28, 6, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(12, -28, 6, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore(); // headBob save
  ctx.restore(); // flip save
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const ir = r * 0.4;
    if (i === 0) ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    else ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    const iAngle = ((i * 4 + 2) * Math.PI) / 5 - Math.PI / 2;
    ctx.lineTo(Math.cos(iAngle) * ir, Math.sin(iAngle) * ir);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// MAP OBJECTS
// ─────────────────────────────────────────────────────────────
export function drawMapObject(ctx: CanvasRenderingContext2D, obj: MapObject, camX: number, camY: number, time: number) {
  const sx = obj.x - camX;
  const sy = obj.y - camY;
  if (sx < -150 || sx > ctx.canvas.width + 150 || sy < -150 || sy > ctx.canvas.height + 150) return;

  ctx.save();
  ctx.translate(sx, sy);
  if (obj.scale && obj.scale !== 1) ctx.scale(obj.scale, obj.scale);

  switch (obj.type) {
    case "tree":         drawTree(ctx, obj.variant, time); break;
    case "pine":         drawPine(ctx, obj.variant, time); break;
    case "sakura":       drawSakura(ctx, obj.variant, time); break;
    case "flower":       drawFlower(ctx, obj.variant, time); break;
    case "rose":         drawRose(ctx, obj.variant, time); break;
    case "mushroom":     drawMushroom(ctx, obj.variant, time); break;
    case "rock":         drawRock(ctx, obj.variant); break;
    case "bush":         drawBush(ctx, time); break;
    case "lily":         drawLily(ctx, obj.variant, time); break;
    case "reed":         drawReed(ctx, obj.variant, time); break;
    case "lantern":      drawLantern(ctx, obj.variant, time); break;
    case "bench":        drawBench(ctx, obj.variant); break;
    case "fountain":     drawFountain(ctx, time); break;
    case "arch":         drawArch(ctx, obj.variant); break;
    case "fern":         drawFern(ctx, obj.variant, time); break;
    case "crystal":      drawCrystal(ctx, obj.variant, time); break;
    case "firefly_bush": drawFireflyBush(ctx, time); break;
  }
  ctx.restore();
}

function drawTree(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const sway = Math.sin(time * 0.002 + variant * 1.3) * 1.8;
  // Trunk
  const tg = ctx.createLinearGradient(-7, 0, 7, 30);
  tg.addColorStop(0, "#92400e"); tg.addColorStop(1, "#78350f");
  ctx.fillStyle = tg;
  ctx.beginPath();
  ctx.roundRect(-6, 0, 13, 32, 3);
  ctx.fill();

  ctx.save();
  ctx.rotate((sway * Math.PI) / 180);
  const colors = [["#15803d","#22c55e","#4ade80"],["#166534","#16a34a","#22c55e"],["#14532d","#15803d","#22c55e"]];
  const c = colors[variant % 3];
  // Three layers
  ctx.fillStyle = c[0];
  ctx.beginPath();
  ctx.ellipse(0, -20, 30, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = c[1];
  ctx.beginPath();
  ctx.ellipse(-3, -30, 22, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = c[2];
  ctx.beginPath();
  ctx.ellipse(2, -38, 15, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Ground shadow
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.beginPath();
  ctx.ellipse(0, 34, 22, 7, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawPine(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const sway = Math.sin(time * 0.0015 + variant * 2) * 1;
  // Trunk
  ctx.fillStyle = "#713f12";
  ctx.beginPath();
  ctx.roundRect(-5, 0, 10, 35, 2);
  ctx.fill();

  ctx.save();
  ctx.rotate((sway * Math.PI) / 180);
  const darkColors = ["#1a4731","#1e3a2f","#16362a"];
  const c = darkColors[variant % 3];
  // Triangle layers bottom to top
  for (let layer = 0; layer < 4; layer++) {
    const yOff = -layer * 18;
    const w2 = 28 - layer * 5;
    ctx.fillStyle = layer === 0 ? c : (layer % 2 === 0 ? "#1e4a35" : "#245c40");
    ctx.beginPath();
    ctx.moveTo(-w2, yOff);
    ctx.lineTo(w2, yOff);
    ctx.lineTo(0, yOff - 24);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Subtle snow on top (variant 2)
  if (variant === 2) {
    ctx.fillStyle = "rgba(220,240,255,0.6)";
    ctx.beginPath();
    ctx.ellipse(0, -70, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawSakura(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const sway = Math.sin(time * 0.0018 + variant * 0.9) * 2;
  // Trunk — lighter, more graceful
  const tg = ctx.createLinearGradient(-6, 0, 6, 40);
  tg.addColorStop(0, "#c084a0"); tg.addColorStop(1, "#a06080");
  ctx.fillStyle = tg;
  ctx.beginPath();
  ctx.moveTo(-5, 0);
  ctx.bezierCurveTo(-6, 15, -4, 25, -3, 40);
  ctx.lineTo(3, 40);
  ctx.bezierCurveTo(4, 25, 6, 15, 5, 0);
  ctx.closePath();
  ctx.fill();

  ctx.save();
  ctx.rotate((sway * Math.PI) / 180);
  // Main canopy — soft pink
  const cg = ctx.createRadialGradient(0, -30, 5, 0, -30, 35);
  cg.addColorStop(0, "#fce7f3");
  cg.addColorStop(0.5, "#f9a8d4");
  cg.addColorStop(1, "#ec4899");
  ctx.fillStyle = cg;
  ctx.beginPath();
  ctx.ellipse(0, -28, 34, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  // Secondary puffs
  ctx.fillStyle = "#fce7f3";
  ctx.beginPath();
  ctx.ellipse(-18, -22, 18, 16, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(18, -22, 18, 16, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, -48, 16, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Falling petals (animated) - just around the tree
  const petalColors = ["rgba(255,182,193,0.8)", "rgba(255,200,210,0.6)", "rgba(245,160,180,0.7)"];
  for (let i = 0; i < 6; i++) {
    const pAngle = (time * 0.003 + i * 1.05) % (Math.PI * 2);
    const pr = 25 + Math.sin(time * 0.004 + i) * 8;
    const px = Math.cos(pAngle) * pr;
    const py = -28 + Math.sin(pAngle * 0.7) * 15 + (time * 0.02 + i * 30) % 50 - 25;
    ctx.fillStyle = petalColors[i % 3];
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(pAngle * 2);
    ctx.beginPath();
    ctx.ellipse(0, 0, 3, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawFlower(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const sway = Math.sin(time * 0.003 + variant * 2.1) * 4;
  const palettes = [
    { petal: "#f9a8d4", center: "#fbbf24", stem: "#4ade80" },
    { petal: "#c4b5fd", center: "#fde68a", stem: "#4ade80" },
    { petal: "#6ee7b7", center: "#fb7185", stem: "#22c55e" },
    { petal: "#fca5a5", center: "#f9fafb", stem: "#4ade80" },
    { petal: "#fbcfe8", center: "#a78bfa", stem: "#34d399" },
  ];
  const p = palettes[variant % 5];
  ctx.save();
  ctx.rotate((sway * Math.PI) / 180);

  // Stem with slight curve
  ctx.strokeStyle = p.stem;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(1, -8, -1, -12, 0, -18);
  ctx.stroke();

  // Leaf
  ctx.fillStyle = p.stem;
  ctx.beginPath();
  ctx.moveTo(0, -10);
  ctx.bezierCurveTo(5, -14, 8, -8, 4, -7);
  ctx.bezierCurveTo(2, -7, 0, -8, 0, -10);
  ctx.fill();

  // Petals
  ctx.fillStyle = p.petal;
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.translate(0, -18);
    ctx.rotate((i * Math.PI * 2) / 6);
    ctx.beginPath();
    ctx.ellipse(0, -5.5, 3.5, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // Center
  const cg = ctx.createRadialGradient(0, -18, 0, 0, -18, 5);
  cg.addColorStop(0, "#fff");
  cg.addColorStop(0.4, p.center);
  cg.addColorStop(1, "#d97706");
  ctx.fillStyle = cg;
  ctx.beginPath();
  ctx.arc(0, -18, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawRose(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const sway = Math.sin(time * 0.0025 + variant * 1.7) * 3;
  const colors = [
    { outer: "#be123c", inner: "#e11d48", center: "#9f1239" },
    { outer: "#ec4899", inner: "#f9a8d4", center: "#db2777" },
    { outer: "#9333ea", inner: "#c084fc", center: "#7e22ce" },
    { outer: "#dc2626", inner: "#ef4444", center: "#b91c1c" },
  ];
  const c = colors[variant % 4];

  ctx.save();
  ctx.rotate((sway * Math.PI) / 180);

  // Stem with thorns
  ctx.strokeStyle = "#4ade80";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(2, -12, -2, -22, 0, -32);
  ctx.stroke();
  // Thorns
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-1, -12);
  ctx.lineTo(-5, -15);
  ctx.stroke();
  // Leaves
  ctx.fillStyle = "#16a34a";
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.bezierCurveTo(8, -26, 14, -18, 8, -16);
  ctx.bezierCurveTo(5, -15, 1, -17, 0, -20);
  ctx.fill();

  // Rose bloom
  ctx.translate(0, -32);
  // Outer petals
  ctx.fillStyle = c.outer;
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -7, 5, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // Middle petals
  ctx.fillStyle = c.inner;
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 4 + 0.4);
    ctx.beginPath();
    ctx.ellipse(0, -5, 4, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // Center
  ctx.fillStyle = c.center;
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = c.inner;
  ctx.beginPath();
  ctx.arc(0, -1, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawMushroom(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const bob = Math.sin(time * 0.003 + variant) * 0.5;
  const capColors = [
    { cap: "#dc2626", spot: "white" },
    { cap: "#ea580c", spot: "#fef3c7" },
    { cap: "#7c3aed", spot: "#ede9fe" },
  ];
  const c = capColors[variant % 3];

  ctx.save();
  ctx.translate(0, bob);

  // Stalk
  const sg = ctx.createLinearGradient(-6, -10, 6, 4);
  sg.addColorStop(0, "#fef9f0"); sg.addColorStop(1, "#fde8c8");
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.moveTo(-5, 4);
  ctx.bezierCurveTo(-6, -2, -5, -8, -4, -10);
  ctx.lineTo(4, -10);
  ctx.bezierCurveTo(5, -8, 6, -2, 5, 4);
  ctx.closePath();
  ctx.fill();
  // Gills
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, -10, 7, 0, Math.PI);
  ctx.stroke();

  // Cap
  const cg = ctx.createRadialGradient(-3, -18, 0, 0, -14, 15);
  cg.addColorStop(0, lighten(c.cap, 40));
  cg.addColorStop(0.6, c.cap);
  cg.addColorStop(1, darken(c.cap, 20));
  ctx.fillStyle = cg;
  ctx.beginPath();
  ctx.ellipse(0, -14, 14, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  // Spots
  ctx.fillStyle = c.spot;
  ctx.beginPath();
  ctx.arc(-5, -17, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(5, -15, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, -20, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function darken(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - amt);
  const g = Math.max(0, ((n >> 8) & 0xff) - amt);
  const b = Math.max(0, (n & 0xff) - amt);
  return `rgb(${r},${g},${b})`;
}
function lighten(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (n >> 16) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return `rgb(${r},${g},${b})`;
}

function drawRock(ctx: CanvasRenderingContext2D, variant: number) {
  const configs = [
    { w: 18, h: 12, color: "#94a3b8" },
    { w: 13, h: 9, color: "#78716c" },
    { w: 22, h: 13, color: "#64748b" },
  ];
  const c = configs[variant % 3];
  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath();
  ctx.ellipse(2, 3, c.w * 0.9, c.h * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  // Rock body
  ctx.fillStyle = c.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, c.w, c.h, 0.15, 0, Math.PI * 2);
  ctx.fill();
  // Highlight
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.ellipse(-c.w * 0.25, -c.h * 0.3, c.w * 0.35, c.h * 0.25, -0.3, 0, Math.PI * 2);
  ctx.fill();
}

function drawBush(ctx: CanvasRenderingContext2D, time: number) {
  const sway = Math.sin(time * 0.002) * 1.5;
  ctx.save();
  ctx.rotate((sway * Math.PI) / 180);
  ctx.fillStyle = "#166534";
  ctx.beginPath();
  ctx.ellipse(0, 0, 20, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#15803d";
  ctx.beginPath();
  ctx.ellipse(-9, -5, 13, 10, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(9, -5, 13, 10, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.ellipse(0, -8, 10, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawLily(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const bob = Math.sin(time * 0.0018 + variant * 1.4) * 2.5;
  ctx.save();
  ctx.translate(0, bob);

  // Pad
  const pg = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
  pg.addColorStop(0, "#4ade80");
  pg.addColorStop(0.7, "#22c55e");
  pg.addColorStop(1, "#16a34a");
  ctx.fillStyle = pg;
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.arc(0, 0, 18, -Math.PI/2 + 0.2, Math.PI * 1.5 - 0.2);
  ctx.closePath();
  ctx.fill();

  // Pad veins
  ctx.strokeStyle = "rgba(0,0,0,0.12)";
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate(i * 0.4 - 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -16);
    ctx.stroke();
    ctx.restore();
  }

  // Flower
  const flowerColors = [
    { petal: "#fce7f3", center: "#fbbf24" },
    { petal: "#fff", center: "#fde68a" },
    { petal: "#fda4af", center: "#f9fafb" },
  ];
  const f = flowerColors[variant % 3];
  ctx.fillStyle = f.petal;
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 6);
    ctx.beginPath();
    ctx.ellipse(0, -6, 2.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = f.center;
  ctx.beginPath();
  ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawReed(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const sway = Math.sin(time * 0.0022 + variant * 1.8) * 5;
  ctx.save();
  ctx.strokeStyle = "#92400e";
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  for (let i = -1; i <= 1; i++) {
    ctx.save();
    ctx.translate(i * 5, 0);
    ctx.rotate(((sway + i * 3) * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -35);
    ctx.stroke();
    // Reed head
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.ellipse(0, -38, 3, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawLantern(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const flicker = Math.sin(time * 0.05) * 0.1 + 0.9;
  // Post
  ctx.fillStyle = "#1c1917";
  ctx.beginPath();
  ctx.roundRect(-3, 0, 6, 40, 1);
  ctx.fill();

  // Lantern body
  ctx.save();
  ctx.translate(0, -50);

  // Glow
  ctx.globalAlpha = 0.3 * flicker;
  const gg = ctx.createRadialGradient(0, 0, 0, 0, 0, 40);
  gg.addColorStop(0, variant === 1 ? "rgba(200,150,255,1)" : "rgba(255,220,120,1)");
  gg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gg;
  ctx.beginPath();
  ctx.arc(0, 0, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Lantern frame
  ctx.fillStyle = "#292524";
  ctx.beginPath();
  ctx.roundRect(-10, -14, 20, 28, 3);
  ctx.fill();

  // Glass panel — warm glow
  const lg = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
  lg.addColorStop(0, variant === 1 ? "rgba(180,120,255,0.95)" : "rgba(255,200,80,0.95)");
  lg.addColorStop(1, variant === 1 ? "rgba(120,60,200,0.7)" : "rgba(200,120,30,0.7)");
  ctx.fillStyle = lg;
  ctx.beginPath();
  ctx.roundRect(-8, -12, 16, 24, 2);
  ctx.fill();

  // Cap
  ctx.fillStyle = "#1c1917";
  ctx.beginPath();
  ctx.moveTo(-12, -14);
  ctx.lineTo(12, -14);
  ctx.lineTo(8, -20);
  ctx.lineTo(-8, -20);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawBench(ctx: CanvasRenderingContext2D, variant: number) {
  const color = variant === 0 ? "#92400e" : "#78350f";
  // Legs
  ctx.fillStyle = "#57534e";
  ctx.fillRect(-22, -2, 5, 14);
  ctx.fillRect(17, -2, 5, 14);
  // Seat
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-26, -5, 52, 7, 2);
  ctx.fill();
  // Backrest
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-26, -18, 52, 5, 2);
  ctx.fill();
  ctx.fillRect(-24, -18, 4, 14);
  ctx.fillRect(20, -18, 4, 14);
  // Slats
  ctx.fillStyle = darken(color, 15);
  for (let i = -20; i < 26; i += 8) {
    ctx.fillRect(i, -5, 3, 7);
  }
}

function drawFountain(ctx: CanvasRenderingContext2D, time: number) {
  // Basin
  const bg = ctx.createRadialGradient(0, 8, 0, 0, 8, 40);
  bg.addColorStop(0, "#60a5fa");
  bg.addColorStop(0.6, "#3b82f6");
  bg.addColorStop(1, "#1d4ed8");
  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.ellipse(0, 8, 42, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.ellipse(0, 6, 38, 13, 0, 0, Math.PI * 2);
  ctx.fill();

  // Column
  ctx.fillStyle = "#94a3b8";
  ctx.beginPath();
  ctx.roundRect(-5, -20, 10, 26, 3);
  ctx.fill();
  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.ellipse(0, -20, 12, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Water arcs
  ctx.strokeStyle = "rgba(147,197,253,0.7)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI * 2) / 6 + time * 0.004;
    const phase = (time * 0.008 + i * 0.5) % 1;
    ctx.globalAlpha = 0.7 - phase * 0.7;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 2, -20 + Math.sin(angle) * 2);
    const cx = Math.cos(angle) * 20 * phase;
    const cy = -20 - 15 * Math.sin(Math.PI * phase) + 25 * phase;
    ctx.quadraticCurveTo(
      Math.cos(angle) * 12 * phase,
      -20 - 20 * phase * (1 - phase) * 2,
      cx, cy
    );
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawArch(ctx: CanvasRenderingContext2D, variant: number) {
  const color = variant === 0 ? "#c084a0" : "#86efac";
  const lc = variant === 0 ? "#f9a8d4" : "#4ade80";
  // Posts
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-30, -60, 10, 65, 3);
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(20, -60, 10, 65, 3);
  ctx.fill();
  // Top arch
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(0, -60, 30, Math.PI, 0);
  ctx.stroke();
  // Vines/flowers
  ctx.fillStyle = lc;
  for (let i = 0; i < 8; i++) {
    const a = (i / 7) * Math.PI;
    const r = 30;
    ctx.beginPath();
    ctx.arc(-Math.cos(a) * r, -60 - Math.sin(a) * r, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFern(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const sway = Math.sin(time * 0.002 + variant * 2) * 4;
  ctx.save();
  ctx.rotate((sway * Math.PI) / 180);
  const colors = ["#166534", "#15803d", "#14532d"];
  ctx.strokeStyle = colors[variant % 3];
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  // Main stems
  for (let s = -1; s <= 1; s++) {
    ctx.save();
    ctx.rotate(s * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(s * 5, -10, s * 8, -20, s * 3, -30);
    ctx.stroke();
    // Leaflets
    ctx.fillStyle = colors[variant % 3];
    for (let i = 0; i < 5; i++) {
      const t2 = i / 4;
      const lx = s * (5 * t2 + 2);
      const ly = -t2 * 30;
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(s * (0.5 + t2 * 0.5));
      ctx.beginPath();
      ctx.ellipse(0, -4, 2.5, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
  ctx.restore();
}

function drawCrystal(ctx: CanvasRenderingContext2D, variant: number, time: number) {
  const shimmer = Math.sin(time * 0.005 + variant * 2) * 0.3 + 0.7;
  const colors = [
    { main: "#a78bfa", light: "#ddd6fe", dark: "#7c3aed" },
    { main: "#67e8f9", light: "#cffafe", dark: "#0891b2" },
    { main: "#f9a8d4", light: "#fce7f3", dark: "#db2777" },
  ];
  const c = colors[variant % 3];

  ctx.save();
  ctx.globalAlpha = shimmer;

  // Crystal spire
  ctx.fillStyle = c.dark;
  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.lineTo(8, -10);
  ctx.lineTo(0, -5);
  ctx.lineTo(-8, -10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = c.main;
  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.lineTo(8, -10);
  ctx.lineTo(4, -8);
  ctx.lineTo(-2, -38);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = c.light;
  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.lineTo(-8, -10);
  ctx.lineTo(-3, -9);
  ctx.lineTo(2, -38);
  ctx.closePath();
  ctx.fill();

  // Glow
  ctx.globalAlpha = shimmer * 0.4;
  const gg = ctx.createRadialGradient(0, -20, 0, 0, -20, 25);
  gg.addColorStop(0, c.light);
  gg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gg;
  ctx.beginPath();
  ctx.arc(0, -20, 25, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawFireflyBush(ctx: CanvasRenderingContext2D, time: number) {
  // Base bush
  drawBush(ctx, time);
  // Firefly glow dots
  for (let i = 0; i < 5; i++) {
    const phase = (time * 0.004 + i * 1.2) % (Math.PI * 2);
    const fx = Math.cos(phase + i) * 25;
    const fy = Math.sin(phase * 0.7) * 15 - 20;
    const brightness = Math.sin(time * 0.01 + i * 2) * 0.5 + 0.5;
    ctx.globalAlpha = brightness * 0.8;
    const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 6);
    fg.addColorStop(0, "#fef08a");
    fg.addColorStop(0.5, "rgba(250,204,21,0.5)");
    fg.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.arc(fx, fy, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// ─────────────────────────────────────────────────────────────
// NOTE MARKERS
// ─────────────────────────────────────────────────────────────
export function drawNoteMarker(
  ctx: CanvasRenderingContext2D,
  note: LoveNote,
  camX: number, camY: number,
  collected: boolean, time: number
) {
  if (collected) {
    // Collected glow — faded
    const sx = note.x - camX, sy = note.y - camY - 30;
    if (sx < -80 || sx > ctx.canvas.width + 80 || sy < -80 || sy > ctx.canvas.height + 80) return;
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = note.color;
    ctx.beginPath();
    ctx.arc(sx, sy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    return;
  }

  const sx = note.x - camX, sy = note.y - camY;
  if (sx < -80 || sx > ctx.canvas.width + 80 || sy < -80 || sy > ctx.canvas.height + 80) return;

  const pulse = Math.sin(time * 0.004) * 0.12 + 0.88;
  const floatY = Math.sin(time * 0.003) * 5;

  ctx.save();
  ctx.translate(sx, sy - 42 + floatY);

  // Outer glow ring
  const outerG = ctx.createRadialGradient(0, 0, 0, 0, 0, 38);
  outerG.addColorStop(0, note.color + "60");
  outerG.addColorStop(0.5, note.color + "30");
  outerG.addColorStop(1, "transparent");
  ctx.fillStyle = outerG;
  ctx.beginPath();
  ctx.arc(0, 0, 38, 0, Math.PI * 2);
  ctx.fill();

  ctx.scale(pulse, pulse);

  // Main circle
  ctx.shadowBlur = 12;
  ctx.shadowColor = note.color;
  ctx.fillStyle = note.color;
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Inner ring
  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.stroke();

  // Icon
  ctx.font = "15px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(note.icon, 0, 0);

  // Chapter label
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "bold 9px Quicksand, sans-serif";
  ctx.fillText(note.chapter, 0, -26);

  ctx.restore();

  // Connecting line to ground
  ctx.save();
  ctx.translate(sx, sy);
  ctx.strokeStyle = note.color + "60";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3, 4]);
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(0, 0);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// SECRET AREA MARKER
// ─────────────────────────────────────────────────────────────
export function drawSecretMarker(ctx: CanvasRenderingContext2D, sx: number, sy: number, time: number) {
  if (sx < -300 || sx > ctx.canvas.width + 300 || sy < -300 || sy > ctx.canvas.height + 300) return;

  const pulse = Math.sin(time * 0.002) * 0.15 + 0.85;
  const rotate = time * 0.003;

  ctx.save();
  ctx.translate(sx, sy);

  // Rotating star ring
  ctx.save();
  ctx.rotate(rotate);
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI * 2) / 8;
    const r = 65;
    const starAlpha = (Math.sin(time * 0.008 + i) * 0.5 + 0.5) * 0.6;
    ctx.globalAlpha = starAlpha;
    ctx.fillStyle = i % 2 === 0 ? "#c084fc" : "#f9a8d4";
    ctx.save();
    ctx.translate(Math.cos(a) * r, Math.sin(a) * r);
    drawStar(ctx, 0, 0, 5);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // Pulsing rings
  for (let r = 50; r >= 15; r -= 12) {
    const alpha = (1 - r / 50) * 0.15 * pulse;
    ctx.fillStyle = `rgba(192,132,252,${alpha})`;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Center heart with glow
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#e879f9";
  ctx.font = "32px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("💖", 0, 0);
  ctx.shadowBlur = 0;

  ctx.restore();
}

// ─────────────────────────────────────────────────────────────
// PARTICLES
// ─────────────────────────────────────────────────────────────
export function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[], camX: number, camY: number) {
  for (const p of particles) {
    const alpha = Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = alpha;

    const sx = p.x - camX, sy = p.y - camY;

    switch (p.type) {
      case "circle":
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0, p.size * alpha), 0, Math.PI * 2);
        ctx.fill();
        break;

      case "star":
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(p.rotation || 0);
        drawStar(ctx, 0, 0, Math.max(0, p.size * alpha));
        ctx.restore();
        break;

      case "petal":
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(p.rotation || 0);
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.max(0, p.size * alpha), Math.max(0, p.size * 0.6 * alpha), 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        break;

      case "heart":
        ctx.font = `${Math.max(4, p.size * alpha * 2)}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("♥", sx, sy);
        break;

      case "sparkle":
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.5;
        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(p.rotation || 0);
        const sl = Math.max(0, p.size * alpha * 2);
        ctx.beginPath();
        ctx.moveTo(-sl, 0); ctx.lineTo(sl, 0);
        ctx.moveTo(0, -sl); ctx.lineTo(0, sl);
        ctx.stroke();
        ctx.restore();
        break;
    }
  }
  ctx.globalAlpha = 1;
}

// ─────────────────────────────────────────────────────────────
// MINIMAP
// ─────────────────────────────────────────────────────────────
export function drawMinimap(
  ctx: CanvasRenderingContext2D,
  playerX: number, playerY: number,
  mapW: number, mapH: number,
  collectedNotes: Set<string>,
  notes: LoveNote[],
  secretX: number, secretY: number,
  canvasW: number
) {
  const mw = 160, mh = 100, mx = canvasW - mw - 16, my = 16;
  const scaleX = mw / mapW, scaleY = mh / mapH;

  // Background
  ctx.fillStyle = "rgba(10,5,25,0.75)";
  ctx.strokeStyle = "rgba(192,132,252,0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(mx, my, mw, mh, 8);
  ctx.fill();
  ctx.stroke();

  // Zone tints
  const zones = [
    { x:0, y:0, w:1200, h:1000, c:"rgba(74,122,80,0.3)" },
    { x:800, y:0, w:800, h:700, c:"rgba(120,80,130,0.3)" },
    { x:1400, y:0, w:900, h:1300, c:"rgba(30,60,40,0.5)" },
    { x:400, y:750, w:600, h:600, c:"rgba(40,100,130,0.4)" },
    { x:1600, y:600, w:900, h:900, c:"rgba(100,80,60,0.3)" },
    { x:2500, y:1400, w:700, h:600, c:"rgba(80,40,120,0.5)" },
  ];
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(mx, my, mw, mh, 8);
  ctx.clip();
  for (const z of zones) {
    ctx.fillStyle = z.c;
    ctx.fillRect(mx + z.x*scaleX, my + z.y*scaleY, z.w*scaleX, z.h*scaleY);
  }

  // Secret marker
  ctx.fillStyle = "#c084fc";
  ctx.beginPath();
  ctx.arc(mx + secretX*scaleX, my + secretY*scaleY, 4, 0, Math.PI*2);
  ctx.fill();

  // Notes
  for (const note of notes) {
    ctx.fillStyle = collectedNotes.has(note.id) ? "rgba(255,255,255,0.25)" : note.color;
    ctx.beginPath();
    ctx.arc(mx + note.x*scaleX, my + note.y*scaleY, 3, 0, Math.PI*2);
    ctx.fill();
  }

  // Player
  ctx.fillStyle = "#ffffff";
  ctx.shadowColor = "#f9a8d4";
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.arc(mx + playerX*scaleX, my + playerY*scaleY, 4, 0, Math.PI*2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();

  // Label
  ctx.fillStyle = "rgba(192,132,252,0.8)";
  ctx.font = "bold 9px Quicksand, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("✦ MAP", mx + 7, my + mh - 6);

  // Note counter
  const collected = collectedNotes.size;
  const total = notes.length;
  ctx.fillStyle = "rgba(249,168,212,0.9)";
  ctx.textAlign = "right";
  ctx.fillText(`${collected}/${total}`, mx + mw - 7, my + mh - 6);
}
