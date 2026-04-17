"use client";
import { useState, useEffect } from "react";
import { START_SCREEN, GAME_TITLE } from "@/lib/gameConfig";

interface Props { onStart: () => void; }

export default function StartMenu({ onStart }: Props) {
  const [phase, setPhase] = useState(0); // 0=hidden, 1=title, 2=full
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; icon: string; delay: number; dur: number }[]>([]);

  useEffect(() => {
    const icons = ["🌸","✨","💕","🌙","⭐","🦋","💫","🌷","💖","🌿"];
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      icon: icons[i % icons.length],
      delay: Math.random() * 5, dur: 3 + Math.random() * 4,
    })));
    setTimeout(() => setPhase(1), 100);
    setTimeout(() => setPhase(2), 600);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 40% 40%, #1a0a35 0%, #0a0a20 50%, #000510 100%)" }}>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <div key={p.id} className="absolute animate-bounce"
            style={{ left:`${p.x}%`, top:`${p.y}%`, fontSize: 18, opacity: 0.15,
              animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }}>
            {p.icon}
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-12"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-12"
          style={{ background: "radial-gradient(circle, #db2777, transparent)" }} />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-8"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)" }} />
      </div>

      {/* Decorative top constellation */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-8 opacity-30 pointer-events-none">
        {["⭐","✦","💫","✦","⭐"].map((s, i) => (
          <span key={i} style={{ color: "#c4b5fd", fontSize: i % 2 ? 10 : 14 }}>{s}</span>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-8 max-w-2xl w-full"
        style={{
          opacity: phase > 0 ? 1 : 0,
          transform: phase > 0 ? "translateY(0)" : "translateY(30px)",
          transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}>

        {/* Icon */}
        <div className="relative">
          <div style={{ fontSize: 80, filter: "drop-shadow(0 0 30px #f9a8d4)", animation: "pulse 2.5s ease-in-out infinite" }}>
            💝
          </div>
          {/* Small orbiting icons */}
          {["🌸","✨","💕"].map((icon, i) => (
            <div key={i} className="absolute"
              style={{
                fontSize: 20, opacity: 0.6,
                top: "50%", left: "50%",
                transform: `rotate(${i * 120}deg) translateY(-55px) rotate(-${i * 120}deg)`,
                animation: `spin${i} ${4 + i}s linear infinite`,
              }}>
              {icon}
            </div>
          ))}
        </div>

        {/* Title */}
        <div style={{
          opacity: phase > 0 ? 1 : 0,
          transform: phase > 0 ? "translateY(0)" : "translateY(15px)",
          transition: "all 1s ease 0.3s",
        }}>
          <p style={{ color: "rgba(196,181,253,0.7)", fontSize: 12, letterSpacing: "0.25em", fontFamily: "Quicksand", fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>
            {START_SCREEN.chapter}
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 5vw, 52px)",
            color: "#fda4af",
            textShadow: "0 0 40px rgba(253,164,175,0.45)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}>
            {GAME_TITLE}
          </h1>
          <p style={{ color: "rgba(196,181,253,0.7)", fontFamily: "Quicksand", fontSize: 15, marginTop: 10, letterSpacing: "0.03em" }}>
            {START_SCREEN.greeting}
          </p>
        </div>

        {/* Description */}
        <div style={{
          opacity: phase > 1 ? 1 : 0,
          transform: phase > 1 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s ease 0.5s",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "rgba(253,230,138,0.85)",
            fontSize: "clamp(14px, 2vw, 17px)",
            lineHeight: 2,
            whiteSpace: "pre-line",
            maxWidth: 480,
          }}>
            {START_SCREEN.description}
          </p>
        </div>

        {/* CTA */}
        <div style={{
          opacity: phase > 1 ? 1 : 0,
          transform: phase > 1 ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.8s ease 0.8s",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        }}>
          <button
            onClick={onStart}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              fontFamily: "Quicksand, sans-serif", fontWeight: 700, fontSize: 17,
              color: "#0f0a1e",
              background: hovered
                ? "linear-gradient(135deg, #fda4af, #c084fc, #f9a8d4)"
                : "linear-gradient(135deg, #f9a8d4, #a78bfa, #fda4af)",
              backgroundSize: "200% 100%",
              border: "none", borderRadius: 50,
              padding: "15px 48px",
              cursor: "pointer",
              transform: hovered ? "scale(1.07) translateY(-3px)" : "scale(1)",
              transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: hovered
                ? "0 12px 40px rgba(249,168,212,0.6), 0 0 0 4px rgba(249,168,212,0.15)"
                : "0 6px 24px rgba(249,168,212,0.4)",
              letterSpacing: "0.02em",
            }}
          >
            {START_SCREEN.buttonText}
          </button>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "Quicksand" }}>
            {START_SCREEN.hint}
          </p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 opacity-25 pointer-events-none">
        {["💌","✦","🌸","✦","💌"].map((s, i) => (
          <span key={i} style={{ color: "#fda4af", fontSize: i % 2 ? 10 : 16 }}>{s}</span>
        ))}
      </div>
    </div>
  );
}
