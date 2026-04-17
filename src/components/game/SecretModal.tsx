"use client";
import { useEffect, useState, useRef } from "react";
import { SECRET_MESSAGE } from "@/lib/gameConfig";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SecretModal({ visible, onClose }: Props) {
  const [show, setShow] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string; delay: number; size: number }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setShow(true), 80);
      setLineIndex(0);
      setParticles(
        Array.from({ length: 24 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          emoji: ["💖","✨","🌸","💫","🌙","⭐","🦋","🌷"][i % 8],
          delay: Math.random() * 4,
          size: 0.8 + Math.random() * 0.8,
        }))
      );
      let idx = 0;
      intervalRef.current = setInterval(() => {
        idx++;
        setLineIndex(idx);
        if (idx >= SECRET_MESSAGE.lines.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 280);
    } else {
      setShow(false);
      setLineIndex(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: "radial-gradient(ellipse at center, #1a0535 0%, #070214 60%, #000010 100%)",
        opacity: show ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* Floating ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute animate-bounce"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size * 20}px`,
              opacity: 0.12,
              animationDelay: `${p.delay}s`,
              animationDuration: `${3 + p.delay}s`,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #c084fc, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #f9a8d4, transparent)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center py-16 px-4">
        <div
          className="relative w-full max-w-2xl"
          style={{
            transform: show ? "scale(1) translateY(0)" : "scale(0.92) translateY(30px)",
            transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(ellipse, #c084fc, #f9a8d4, transparent)" }} />

          {/* Card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #1a0535 0%, #0d1535 50%, #1a0535 100%)",
              border: "1px solid rgba(192,132,252,0.35)",
              boxShadow: "0 0 120px rgba(192,132,252,0.1), 0 40px 100px rgba(0,0,0,0.7)",
            }}
          >
            {/* Top gradient bar */}
            <div className="h-1.5 w-full"
              style={{ background: "linear-gradient(90deg, #c084fc, #f9a8d4, #818cf8, #f9a8d4, #c084fc)" }} />

            <div className="px-10 py-12 flex flex-col items-center gap-8">
              {/* Icon */}
              <div
                style={{ fontSize: 72, filter: "drop-shadow(0 0 30px #c084fc)", animation: "pulse 2s ease-in-out infinite" }}
              >
                💖
              </div>

              {/* Title */}
              <div className="text-center">
                <p style={{ color: "rgba(192,132,252,0.8)", fontSize: 11, letterSpacing: "0.2em", fontFamily: "Quicksand", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
                  ✦ Final Chapter ✦
                </p>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(22px, 4vw, 36px)",
                    color: "#f9a8d4",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    textShadow: "0 0 30px rgba(249,168,212,0.4)",
                  }}
                >
                  {SECRET_MESSAGE.title}
                </h2>
                <p style={{ color: "rgba(196,181,253,0.6)", fontSize: 13, fontFamily: "Quicksand", marginTop: 6, fontStyle: "italic" }}>
                  {SECRET_MESSAGE.subtitle}
                </p>
              </div>

              {/* Divider */}
              <div style={{ width: 100, height: 1, background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.6), transparent)" }} />

              {/* Typewriter message */}
              <div
                style={{
                  fontFamily: "Quicksand, sans-serif",
                  fontSize: "clamp(14px, 2vw, 16px)",
                  lineHeight: 2.1,
                  color: "rgba(255,255,255,0.9)",
                  textAlign: "center",
                  minHeight: 380,
                  letterSpacing: "0.02em",
                }}
              >
                {SECRET_MESSAGE.lines.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      opacity: i < lineIndex ? 1 : 0,
                      transform: i < lineIndex ? "translateY(0)" : "translateY(10px)",
                      transition: `opacity 0.6s ease ${(i % 3) * 0.05}s, transform 0.6s ease`,
                      fontStyle: i === SECRET_MESSAGE.lines.length - 1 ? "italic" : "normal",
                      color: i === SECRET_MESSAGE.lines.length - 1
                        ? "#f9a8d4"
                        : line === ""
                        ? undefined
                        : (i >= SECRET_MESSAGE.lines.findIndex(l => l === "I love you.") && i <= SECRET_MESSAGE.lines.findIndex(l => l === "I love you.") + 2
                          ? "#c4b5fd"
                          : undefined),
                      fontSize: line.startsWith("I love you") ? "clamp(18px, 2.5vw, 22px)" : undefined,
                      fontWeight: line.startsWith("I love you") ? 700 : 400,
                      marginTop: line === "" ? "0.5em" : undefined,
                      minHeight: line === "" ? "0.8em" : undefined,
                    }}
                  >
                    {line || "\u00a0"}
                  </p>
                ))}
              </div>

              {/* Stars */}
              <div style={{ color: "rgba(192,132,252,0.5)", letterSpacing: "0.8em", fontSize: 14 }}>
                ✦ ✦ ✦
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: hovered ? "#0f0a1e" : "rgba(255,255,255,0.9)",
                  background: hovered
                    ? "linear-gradient(135deg, #f9a8d4, #c084fc)"
                    : "rgba(255,255,255,0.07)",
                  border: `1px solid ${hovered ? "transparent" : "rgba(192,132,252,0.4)"}`,
                  borderRadius: 50,
                  padding: "14px 48px",
                  cursor: "pointer",
                  transform: hovered ? "scale(1.06) translateY(-2px)" : "scale(1)",
                  transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  boxShadow: hovered ? "0 10px 35px rgba(192,132,252,0.5)" : "none",
                  letterSpacing: "0.03em",
                }}
              >
                {SECRET_MESSAGE.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
