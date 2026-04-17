export type GameState = "loading" | "menu" | "playing" | "note" | "secret" | "end";

export interface Vector2 { x: number; y: number; }

export interface Player {
  x: number; y: number;
  vx: number; vy: number;
  facing: "left" | "right" | "up" | "down";
  moving: boolean;
  frame: number; frameTimer: number;
  hairFlow: number; // for flowing hair animation
  skirtFlow: number; // for skirt animation
}

export interface Camera { x: number; y: number; }

export type MapZone = "meadow" | "forest" | "pond" | "garden" | "secret_garden";

export interface MapObject {
  x: number; y: number;
  type: "tree" | "pine" | "sakura" | "flower" | "rose" | "mushroom" | "rock"
      | "bush" | "lily" | "reed" | "lantern" | "bench" | "fountain" | "arch"
      | "fern" | "crystal" | "firefly_bush";
  variant: number;
  zone: MapZone;
  scale?: number;
}

export interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  color: string; size: number;
  type: "circle" | "star" | "petal" | "heart" | "sparkle";
  rotation?: number; rotSpeed?: number;
}

export interface FireflyParticle {
  x: number; y: number;
  vx: number; vy: number;
  phase: number; brightness: number;
}
