"use client";
import { useEffect, useState } from "react";

interface Props { onComplete: () => void; }

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      delay: Math.random() * 4, dur: 2 + Math.random() * 3,
    }))
  );

  const messages = [
    "Planting cherry blossoms...",
    "Filling the pond with moonlight...",
    "Writing love letters...",
    "Lighting the lanterns...",
    "Hiding secrets in the garden...",
    "Almost ready, my love... 💕",
  ];

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 14 + 4;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(onComplete, 700); }
      setProgress(p);
      setMsgIdx(Math.min(Math.floor((p / 100) * messages.length), messages.length - 1));
    }, 220);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "radial-gradient(ellipse at center, #150820 0%, #080515 60%, #000008 100%)" }}>

      {/* Star field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map(s => (
          <div key={s.id} className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: s.size, height: s.size,
              left: `${s.x}%`, top: `${s.y}%`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
            }} />
        ))}
      </div>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Animated heart */}
        <div className="relative" style={{ fontSize: 80 }}>
          <div style={{ animation: "heartbeat 1.4s ease-in-out infinite", display: "block" }}>💖</div>
          <div className="absolute inset-0 flex items-center justify-center blur-xl scale-150 opacity-30" style={{ fontSize: 80 }}>💖</div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 42px)", color: "#fda4af", textShadow: "0 0 30px rgba(253,164,175,0.5)" }}>
            A Little World For You
          </h1>
          <p style={{ color: "rgba(196,181,253,0.65)", fontFamily: "Quicksand, sans-serif", fontSize: 14, marginTop: 8, letterSpacing: "0.05em" }}>
            Preparing something special...
          </p>
        </div>

        {/* Progress */}
        <div className="w-72 flex flex-col items-center gap-3">
          {/* Bar */}
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #f9a8d4, #c084fc, #818cf8)",
                boxShadow: "0 0 10px rgba(192,132,252,0.6)",
              }} />
          </div>
          {/* Dots */}
          <div className="flex gap-2">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{ background: (i / 6) * 100 <= progress ? "#c084fc" : "rgba(255,255,255,0.15)" }} />
            ))}
          </div>
          <p className="text-center text-sm" style={{ color: "rgba(253,164,175,0.7)", fontFamily: "Quicksand", minHeight: 20 }}>
            {messages[msgIdx]}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.08); }
          60% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
