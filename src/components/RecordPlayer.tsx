"use client";

import { useState, useRef, useEffect, useCallback, PointerEvent } from "react";

/* ─── Types & Data ────────────────────────────────────────────────── */

type VinylMood = {
  name: string;
  songTitle: string;
  artist: string;
  color: string;
  sleeveColor: string;
  accent: string;
  audioSrc: string;
};

const moods: VinylMood[] = [
  { name: "Groovy", songTitle: "deep in it", artist: "Berlioz", color: "#181818", sleeveColor: "var(--color-paper)", accent: "#D97A3A", audioSrc: "/music/deep-in-it.mp3" },
  { name: "Yearning", songTitle: "I Fall in Love Too Easily", artist: "Chet Baker", color: "#181818", sleeveColor: "oklch(20% 0.04 250)", accent: "#5B7FA6", audioSrc: "/music/i-fall-in-love-too-easily.mp3" },
  { name: "Freedom", songTitle: "The Girl from Ipanema", artist: "Stan Getz", color: "#181818", sleeveColor: "var(--color-velvet)", accent: "#7B5FBF", audioSrc: "/music/the-girl-from-ipanema.mp3" },
  { name: "Bliss", songTitle: "Brazilian Skies", artist: "Masayoshi Takanaka", color: "#181818", sleeveColor: "var(--color-paper-2)", accent: "#E5B85C", audioSrc: "/music/brazilian-skies.mp3" },
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function RecordPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState<VinylMood>(moods[0]);
  const [armAngle, setArmAngle] = useState(-15); // -15 = rest (off vinyl), 18 = playing (on vinyl)
  const armRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reduced motion check
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Sync audio source when mood changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = currentMood.audioSrc;
      if (isPlaying || wasPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentMood]); // Only re-run when currentMood changes, isPlaying is handled elsewhere

  /** Start audio playback. */
  const startAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.error("Audio playback failed:", e);
        setIsPlaying(false);
        setArmAngle(-15);
      });
    }
  }, []);

  /** Stop audio playback. */
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  /* ── Interaction handlers ──────────────────────────────────────── */

  const handlePointerDown = (e: PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!e.buttons || !armRef.current) return;

    const rect = armRef.current.getBoundingClientRect();
    const pivotX = rect.right;
    const dx = e.clientX - pivotX;

    if (dx < -50) {
      if (!isPlaying) {
        setArmAngle(10);
        setIsPlaying(true);
        startAudio();
      }
    } else if (dx > -10) {
      if (isPlaying) {
        setArmAngle(-15);
        setIsPlaying(false);
        stopAudio();
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setArmAngle(-15);
      setIsPlaying(false);
      stopAudio();
    } else {
      setArmAngle(10);
      setIsPlaying(true);
      startAudio();
    }
  };

  const handleMoodChange = (mood: VinylMood) => {
    setCurrentMood(mood);
    if (!isPlaying) {
      setArmAngle(10);
      setIsPlaying(true);
      // startAudio will be triggered by the useEffect when currentMood changes, 
      // but to be safe we can let the useEffect handle it since we set isPlaying=true.
    } else {
      // If already playing, just play the new one. The useEffect handles the src change.
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
      }, 50);
    }
  };

  /* ── Render ────────────────────────────────────────────────────── */

  const shouldAnimate = isPlaying && !prefersReducedMotion.current;

  return (
    <div className="section-inner flex flex-col items-center">
      <audio ref={audioRef} loop preload="none">
        <source src={currentMood.audioSrc} type="audio/mpeg" />
      </audio>

      {/* Turntable Base */}
      <div
        className="relative w-full max-w-[400px] md:max-w-[600px] aspect-[4/3] rounded-xl shadow-2xl p-3 md:p-8 flex items-center justify-center"
        style={{
          background: "var(--color-paper-2)",
          border: "1px solid var(--color-accent)",
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, oklch(14% 0.018 55 / 0.05) 10px, oklch(14% 0.018 55 / 0.05) 20px)",
        }}
      >
        {/* Record Platter */}
        <div
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? "Pause the record" : "Play the record"}
          className="relative w-[180px] h-[180px] md:w-[360px] md:h-[360px] rounded-full flex items-center justify-center cursor-pointer shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          onClick={togglePlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              togglePlay();
            }
          }}
          style={{
            background: currentMood.color,
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)",
            animation: shouldAnimate ? "spin 2s linear infinite" : "none",
            transformOrigin: "center center",
            // focus-visible ring color
            // @ts-expect-error CSS custom property
            "--tw-ring-color": "var(--color-accent)",
          }}
          title={isPlaying ? "Click to pause" : "Click to play"}
        >
          {/* Grooves */}
          <div
            className="absolute inset-2 rounded-full pointer-events-none"
            style={{
              background:
                "repeating-radial-gradient(circle, transparent, transparent 4px, rgba(255,255,255,0.03) 5px, transparent 6px)",
            }}
          />

          {/* Center Label */}
          <div
            className="relative w-[60px] h-[60px] md:w-[120px] md:h-[120px] rounded-full flex items-center justify-center text-center shadow-inner"
            style={{ background: currentMood.accent }}
          >
            {/* Retro label design */}
            <div className="absolute inset-1 md:inset-2 rounded-full border border-black/20 flex flex-col items-center justify-between py-2 md:py-4 pointer-events-none" style={{ transform: "rotate(-15deg)" }}>
              <span className="font-outlier text-[7px] md:text-[9px] text-black/90 font-bold uppercase tracking-wider leading-tight w-[60px] md:w-[90px] line-clamp-2">
                {currentMood.songTitle}
              </span>
              
              <span className="font-body text-[6px] md:text-[8px] text-black/70 tracking-widest uppercase truncate w-full px-2">
                {currentMood.artist}
              </span>
            </div>
            
            {/* Spindle Hole */}
            <div className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] bg-black rounded-full shadow-inner z-10" />
          </div>

          {/* Play/pause indicator overlay */}
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <span className="text-white text-3xl" aria-hidden="true">
              {isPlaying ? "❚❚" : "▶"}
            </span>
          </div>
        </div>

        {/* Tonearm */}
        <div
          ref={armRef}
          role="slider"
          aria-label="Tonearm — drag left to play, right to stop"
          aria-valuemin={0}
          aria-valuemax={30}
          aria-valuenow={armAngle}
          tabIndex={0}
          className="absolute top-6 right-6 md:top-16 md:right-16 w-[90px] h-[150px] md:w-[160px] md:h-[260px] cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
          style={{
            transformOrigin: "top right",
            transform: `rotate(${armAngle}deg)`,
            transition: "transform 0.5s var(--ease-out)",
            zIndex: 10,
            // @ts-expect-error CSS custom property
            "--tw-ring-color": "var(--color-accent)",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              if (!isPlaying) {
                setArmAngle(10);
                setIsPlaying(true);
                startAudio();
              }
            } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              if (isPlaying) {
                setArmAngle(-15);
                setIsPlaying(false);
                stopAudio();
              }
            }
          }}
          title="Drag Tonearm"
        >
          <svg
            viewBox="0 0 100 200"
            fill="none"
            className="w-full h-full drop-shadow-lg pointer-events-none"
          >
            {/* Pivot */}
            <circle
              cx="90"
              cy="10"
              r="10"
              fill="var(--color-paper-3)"
              stroke="var(--color-accent)"
              strokeWidth="2"
            />
            <circle cx="90" cy="10" r="4" fill="var(--color-accent)" />
            {/* Arm */}
            <path
              d="M90 20 C90 100, 30 140, 20 180"
              stroke="var(--color-accent)"
              strokeWidth="4"
              fill="none"
            />
            {/* Headshell */}
            <path
              d="M12 178 L28 182 L26 195 L10 190 Z"
              fill="var(--color-paper)"
              stroke="var(--color-accent)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Speed / Controls Decor */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div
            className="w-4 h-4 rounded-full border border-accent flex items-center justify-center bg-paper-3 shadow-md"
            aria-hidden="true"
          />
          <div
            className="w-4 h-4 rounded-full border border-accent flex items-center justify-center bg-paper-3 shadow-md"
            aria-hidden="true"
          />
        </div>

        {/* Playing status indicator */}
        {isPlaying && (
          <div
            className="absolute bottom-4 right-4 flex items-center gap-1.5"
            aria-live="polite"
          >
            <span
              className="block w-2 h-2 rounded-full"
              style={{
                background: "var(--color-accent-2)",
                animation: shouldAnimate ? "pulse-dot 1.5s ease-in-out infinite" : "none",
              }}
            />
            <span
              className="font-body text-[10px] uppercase tracking-wider"
              style={{ color: "var(--color-muted)" }}
            >
              Playing
            </span>
          </div>
        )}
      </div>

      {/* Vinyl Collection */}
      <div className="mt-8 md:mt-12 w-full max-w-[600px]">
        <h3 className="font-outlier text-sm uppercase tracking-widest text-muted mb-6 text-center">
          What&apos;s your vibe today?
        </h3>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodChange(mood)}
              aria-label={`Select mood: ${mood.name}`}
              aria-pressed={currentMood.name === mood.name}
              className="group flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded p-2"
              style={{
                // @ts-expect-error CSS custom property
                "--tw-ring-color": "var(--color-accent)",
              }}
            >
              {/* Sleeve */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 shadow-md transition-transform group-hover:-translate-y-2 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: mood.sleeveColor,
                  border:
                    currentMood.name === mood.name
                      ? "2px solid var(--color-accent)"
                      : "1px solid var(--color-rule)",
                }}
              >
                {/* Sleeve graphic */}
                <div
                  className="w-10 h-10 rounded-full"
                  style={{ background: mood.accent, opacity: 0.8 }}
                />
                <div className="absolute inset-0 border-[4px] border-black/20" />
              </div>
              <span
                className="text-xs font-body transition-colors"
                style={{
                  color:
                    currentMood.name === mood.name
                      ? "var(--color-ink)"
                      : "var(--color-muted)",
                }}
              >
                {mood.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* pulse-dot keyframe for the playing indicator */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse-dot {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(0.8); }
            }
          `,
        }}
      />
    </div>
  );
}
