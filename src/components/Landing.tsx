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
  const [roleVisible, setRoleVisible] = useState(true);

  // Cycle roles with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setRoleVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse (throttled for performance)
  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
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

    const maxRange = 180;
    if (distance > maxRange) {
      return {
        letterSpacing: "0.02em",
        fontWeight: 700,
        transition: "letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1), font-weight 0.4s ease",
      };
    }

    const proximity = 1 - distance / maxRange;
    const eased = proximity * proximity;

    const spacingEm = 0.02 + eased * 0.35;
    const weight = 700 + eased * 200;

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
      {/* Atmospheric backdrop — richer, warmer blooms */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 25% 35%, oklch(28% 0.090 45 / 0.7), transparent),
            radial-gradient(ellipse 55% 65% at 75% 65%, oklch(24% 0.070 350 / 0.5), transparent),
            radial-gradient(ellipse 40% 40% at 50% 50%, oklch(22% 0.060 55 / 0.4), transparent)
          `,
        }}
      />

      {/* Slow animated ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 45%, oklch(30% 0.10 50 / 0.25), transparent 70%)",
          animation: "ambient-breathe 6s ease-in-out infinite",
        }}
      />

      {/* Torch spotlight — follows cursor (brighter) */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, oklch(40% 0.14 55 / 0.18), transparent 80%)`,
          transition: "background 0.15s ease-out",
        }}
      />

      {/* Main Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-4"
        style={{ marginTop: "-4vh" }}
      >
        {/* Intro */}
        <p
          className="font-display text-lg md:text-xl italic mb-3 tracking-wide"
          style={{
            fontWeight: 300,
            color: "var(--color-ink-2)",
            opacity: 0.8,
          }}
        >
          Hi, I&apos;m
        </p>

        {/* Neon Sign — with per-letter magnetic expansion */}
        <h1
          ref={titleRef}
          className="font-outlier mb-5 flex"
          style={{
            color: "var(--color-ink)",
            fontSize: "var(--text-neon)",
            textShadow:
              "0 0 8px var(--color-neon), 0 0 25px var(--color-neon), 0 0 50px var(--color-accent-2), 0 0 100px var(--color-accent-2), 0 0 150px oklch(60% 0.12 55 / 0.3)",
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

        {/* Decorative line */}
        <div
          className="mb-5"
          style={{
            width: "60px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
          }}
        />

        {/* Subtitle — with fade transition */}
        <h2
          className="font-display text-2xl md:text-3xl"
          style={{
            color: "var(--color-accent-2)",
            fontWeight: 400,
            fontStyle: "normal",
            letterSpacing: "0.02em",
            opacity: roleVisible ? 1 : 0,
            transform: roleVisible ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
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
              color: "var(--color-ink-2)",
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
            stroke="var(--color-ink-2)"
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
