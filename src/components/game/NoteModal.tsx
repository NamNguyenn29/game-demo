"use client";
import { useEffect, useState } from "react";
import { LOVE_NOTES } from "@/lib/gameConfig";

interface Props {
  noteId: string | null;
  onClose: () => void;
}

export default function NoteModal({ noteId, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const note = LOVE_NOTES.find(n => n.id === noteId);

  useEffect(() => {
    if (noteId) {
      setTimeout(() => setVisible(true), 20);
      setTimeout(() => setTextVisible(true), 300);
    } else {
      setVisible(false);
      setTextVisible(false);
    }
  }, [noteId]);

  if (!noteId || !note) return null;

  const noteIndex = LOVE_NOTES.findIndex(n => n.id === noteId);
  const totalNotes = LOVE_NOTES.length;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{
        background: "rgba(5,2,18,0.82)",
        backdropFilter: "blur(12px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.45s ease",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg"
        style={{
          transform: visible ? "scale(1) translateY(0)" : "scale(0.88) translateY(24px)",
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${note.color}, ${note.accent}, transparent)` }} />

        {/* Card */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #13091f, #0e1628, #130920)",
            border: `1px solid ${note.color}55`,
            boxShadow: `0 0 80px ${note.color}18, 0 25px 80px rgba(0,0,0,0.6)`,
          }}
        >
          {/* Top color stripe */}
          <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${note.color}, ${note.accent}, ${note.color})` }} />

          <div className="px-10 py-8 flex flex-col items-center gap-5 text-center">
            {/* Chapter & position */}
            <div className="flex items-center gap-3 w-full justify-between">
              <span style={{ color: `${note.color}`, fontSize: 11, fontFamily: "Quicksand", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {note.chapter} — A Letter For You
              </span>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "Quicksand" }}>
                {noteIndex + 1} / {totalNotes}
              </span>
            </div>

            {/* Icon */}
            <div
              className="text-5xl"
              style={{
                filter: `drop-shadow(0 0 18px ${note.color})`,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              {note.icon}
            </div>

            {/* Title */}
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  color: "#fff",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {note.title}
              </h2>
            </div>

            {/* Divider */}
            <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${note.color}, transparent)` }} />

            {/* Message */}
            <p
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: 16,
                color: textVisible ? "rgba(255,255,255,0.88)" : "transparent",
                lineHeight: 2,
                whiteSpace: "pre-line",
                transition: "color 0.8s ease",
                letterSpacing: "0.01em",
              }}
            >
              {note.message}
            </p>

            {/* Divider */}
            <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${note.accent}80, transparent)` }} />

            {/* Close button */}
            <button
              onClick={onClose}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                fontFamily: "Quicksand, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: hovered ? "#0f0a1e" : "rgba(255,255,255,0.9)",
                background: hovered
                  ? `linear-gradient(135deg, ${note.color}, ${note.accent})`
                  : "rgba(255,255,255,0.07)",
                border: `1px solid ${hovered ? "transparent" : note.color + "50"}`,
                borderRadius: 50,
                padding: "10px 32px",
                cursor: "pointer",
                transform: hovered ? "scale(1.05) translateY(-1px)" : "scale(1)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                boxShadow: hovered ? `0 6px 24px ${note.color}60` : "none",
                letterSpacing: "0.04em",
              }}
            >
              Keep exploring →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
