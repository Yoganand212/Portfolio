"use client";

import { useState, useEffect, useRef } from "react";

/* ── Landing Component ──────────────────────────────────────── */

const TITLE = "YOGANAND";
const ROLES = [
  "Software Developer",
  "AI & ML Engineer",
  "Data Analyst",
  "Full-Stack Developer"
];

export default function Landing({ onEnter }: { onEnter: () => void }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Compute per-letter styles based on cursor proximity
  const getLetterStyle = (index: number): React.CSSProperties => {
    if (!titleRef.current) return {};

    const spans = titleRef.current.querySelectorAll<HTMLSpanElement>("[data-letter]");
    if (index >= spans.length) return {};

    const rect = spans[index].getBoundingClientRect();
    const letterCenterX = rect.left + rect.width / 2;
    const letterCenterY = rect.top + rect.height / 2;

    const dx = mousePos.x - letterCenterX;
    const dy = mousePos.y - letterCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxRange = 180; // px range of influence
    if (distance > maxRange) {
      return {
        letterSpacing: "0.02em",
        fontWeight: 700,
        transition: "letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1), font-weight 0.4s ease",
      };
    }

    // Closer = more expansion. Normalize 0 (far) to 1 (touching)
    const proximity = 1 - distance / maxRange;
    const eased = proximity * proximity; // quadratic ease for smoother feel

    const spacingEm = 0.02 + eased * 0.35; // 0.02em → 0.37em
    const weight = 700 + eased * 200; // 700 → 900

    return {
      letterSpacing: `${spacingEm}em`,
      fontWeight: Math.round(weight),
      transition: "letter-spacing 0.15s cubic-bezier(0.16, 1, 0.3, 1), font-weight 0.15s ease",
    };
  };

  const handleEnter = () => {
    onEnter();
    const target = document.getElementById("record-player");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Warm radial blooms — atmospheric backdrop */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 40%, oklch(24% 0.070 45 / 0.55), transparent),
            radial-gradient(ellipse 50% 60% at 80% 60%, oklch(20% 0.050 350 / 0.4), transparent)
          `,
        }}
      />

      {/* Torch spotlight — follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, oklch(35% 0.12 55 / 0.12), transparent 80%)`,
          transition: "background 0.15s ease-out",
        }}
      />

      {/* Main Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4"
        style={{ marginTop: "-4vh" }}
      >
        {/* Intro */}
        <p className="font-display text-muted text-lg md:text-xl italic mb-2 tracking-wide" style={{ fontWeight: 300 }}>
          Hi, I&apos;m
        </p>

        {/* Neon Sign — with per-letter magnetic expansion */}
        <h1
          ref={titleRef}
          className="font-outlier mb-4 flex"
          style={{
            color: "var(--color-ink)",
            fontSize: "var(--text-neon)",
            textShadow:
              "0 0 5px var(--color-neon), 0 0 20px var(--color-neon), 0 0 40px var(--color-accent-2), 0 0 80px var(--color-accent-2)",
            animation: "flicker 4s infinite",
          }}
        >
          {TITLE.split("").map((char, i) => (
            <span
              key={i}
              data-letter
              className="inline-block"
              style={getLetterStyle(i)}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <h2
          className="font-display text-2xl md:text-3xl transition-opacity duration-500"
          style={{
            color: "var(--color-ink-2)",
            fontWeight: 300,
            fontStyle: "normal",
          }}
          key={roleIndex} // forces re-render/animation if needed, but css transition on key works best with absolute pos, let's keep it simple
        >
          {ROLES[roleIndex]}
        </h2>
      </div>

      {/* Enter prompt */}
      <div className="absolute bottom-8 md:bottom-10 z-20 flex flex-col items-center">
        <button
          onClick={handleEnter}
          className="group flex flex-col items-center gap-2 rounded-lg p-3"
          aria-label="Enter the lounge"
          style={{ outline: "none" }}
        >
          <span
            className="font-display text-sm tracking-widest uppercase"
            style={{
              color: "var(--color-muted)",
              fontWeight: 300,
              animation: "pulse-opacity 3s ease-in-out infinite",
            }}
          >
            Step inside
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-y-1"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
