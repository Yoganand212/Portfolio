"use client";

import React, { useState } from "react";
import { resumeData } from "@/data/resume";

const instrumentSVGs: Record<string, React.ReactNode> = {
  Piano: (
    <svg viewBox="0 0 120 80" fill="none" className="w-full h-full">
      <rect x="10" y="20" width="100" height="50" rx="4" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1"/>
      <rect x="15" y="25" width="12" height="35" rx="1" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="0.5"/>
      <rect x="29" y="25" width="12" height="35" rx="1" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="0.5"/>
      <rect x="43" y="25" width="12" height="35" rx="1" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="0.5"/>
      <rect x="57" y="25" width="12" height="35" rx="1" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="0.5"/>
      <rect x="71" y="25" width="12" height="35" rx="1" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="0.5"/>
      <rect x="85" y="25" width="12" height="35" rx="1" fill="var(--color-ink)" stroke="var(--color-accent)" strokeWidth="0.5"/>
      {/* Black keys */}
      <rect x="23" y="25" width="8" height="22" rx="1" fill="var(--color-paper)"/>
      <rect x="37" y="25" width="8" height="22" rx="1" fill="var(--color-paper)"/>
      <rect x="65" y="25" width="8" height="22" rx="1" fill="var(--color-paper)"/>
      <rect x="79" y="25" width="8" height="22" rx="1" fill="var(--color-paper)"/>
    </svg>
  ),
  Saxophone: (
    <svg viewBox="0 0 80 120" fill="none" className="w-full h-full">
      <path d="M40 10 C40 10 55 30 55 50 C55 70 65 80 60 100 C58 106 48 110 42 108 C36 106 30 98 35 85 C38 76 30 65 30 50 C30 35 40 10 40 10Z" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1.5"/>
      <circle cx="40" cy="40" r="3" fill="var(--color-accent)"/>
      <circle cx="44" cy="52" r="3" fill="var(--color-accent)"/>
      <circle cx="46" cy="64" r="3" fill="var(--color-accent)"/>
      <ellipse cx="48" cy="100" rx="14" ry="10" fill="var(--color-paper-3)" stroke="var(--color-accent)" strokeWidth="1"/>
    </svg>
  ),
  Trumpet: (
    <svg viewBox="0 0 140 60" fill="none" className="w-full h-full">
      <path d="M10 30 L80 30" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round"/>
      <path d="M80 15 C90 15 100 20 100 30 C100 40 90 45 80 45 L80 15Z" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1.5"/>
      <ellipse cx="108" cy="30" rx="18" ry="20" fill="var(--color-paper-3)" stroke="var(--color-accent)" strokeWidth="1.5"/>
      <circle cx="30" cy="22" r="5" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1"/>
      <circle cx="45" cy="22" r="5" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1"/>
      <circle cx="60" cy="22" r="5" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1"/>
    </svg>
  ),
  "Double Bass": (
    <svg viewBox="0 0 60 140" fill="none" className="w-full h-full">
      <ellipse cx="30" cy="90" rx="22" ry="35" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1.5"/>
      <ellipse cx="30" cy="50" rx="16" ry="25" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1.5"/>
      <line x1="30" y1="15" x2="30" y2="25" stroke="var(--color-accent)" strokeWidth="3"/>
      <line x1="24" y1="50" x2="24" y2="110" stroke="var(--color-accent)" strokeWidth="0.8"/>
      <line x1="30" y1="50" x2="30" y2="110" stroke="var(--color-accent)" strokeWidth="0.8"/>
      <line x1="36" y1="50" x2="36" y2="110" stroke="var(--color-accent)" strokeWidth="0.8"/>
      {/* F-holes */}
      <path d="M22 82 C20 78 20 72 24 70" stroke="var(--color-accent)" strokeWidth="1" fill="none"/>
      <path d="M38 82 C40 78 40 72 36 70" stroke="var(--color-accent)" strokeWidth="1" fill="none"/>
    </svg>
  ),
  Drums: (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      {/* Snare */}
      <ellipse cx="60" cy="55" rx="30" ry="10" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1.5"/>
      <rect x="30" y="55" width="60" height="25" rx="2" fill="var(--color-paper-3)" stroke="var(--color-accent)" strokeWidth="1"/>
      <ellipse cx="60" cy="80" rx="30" ry="10" fill="var(--color-paper-2)" stroke="var(--color-accent)" strokeWidth="1.5"/>
      {/* Hi-hat */}
      <ellipse cx="15" cy="35" rx="12" ry="4" fill="var(--color-accent)" opacity="0.6"/>
      <line x1="15" y1="35" x2="15" y2="85" stroke="var(--color-accent)" strokeWidth="1.5"/>
      {/* Cymbal */}
      <ellipse cx="105" cy="30" rx="14" ry="4" fill="var(--color-accent)" opacity="0.6"/>
      <line x1="105" y1="30" x2="105" y2="85" stroke="var(--color-accent)" strokeWidth="1.5"/>
      {/* Sticks */}
      <line x1="40" y1="20" x2="65" y2="50" stroke="var(--color-ink-2)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="80" y1="20" x2="55" y2="50" stroke="var(--color-ink-2)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

export default function Skills() {
  const [selectedInstrument, setSelectedInstrument] = useState<number | null>(null);

  return (
    <div className="section-inner">
      <h2
        className="font-display text-ink mb-2 text-center"
        style={{ fontStyle: "normal" }}
      >
        The Instruments
      </h2>
      <p className="text-muted mb-12 text-center mx-auto" style={{ maxWidth: "50ch" }}>
        Every musician needs their instruments. These are the tools I play.
      </p>

      {/* Instrument grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {resumeData.skills.map((skill, i) => (
          <button
            key={skill.instrument}
            onClick={() =>
              setSelectedInstrument(selectedInstrument === i ? null : i)
            }
            aria-expanded={selectedInstrument === i}
            aria-label={`${skill.instrument} — ${skill.category}`}
            className="group relative flex flex-col items-center gap-3 p-6 rounded-lg transition-all"
            style={{
              background: selectedInstrument === i ? "var(--color-paper-3)" : "var(--color-paper-2)",
              border: `1px solid ${selectedInstrument === i ? "var(--color-accent)" : "var(--color-rule)"}`,
              cursor: "pointer",
              transitionDuration: "var(--dur-short)",
              transitionTimingFunction: "var(--ease-out)",
            }}
          >
            {/* Instrument SVG */}
            <div
              className="w-16 h-16 md:w-20 md:h-20 transition-transform"
              style={{
                filter: selectedInstrument === i
                  ? "drop-shadow(0 0 12px var(--color-accent-2))"
                  : "none",
                transitionDuration: "var(--dur-short)",
              }}
            >
              {instrumentSVGs[skill.instrument]}
            </div>

            {/* Label */}
            <span
              className="text-sm font-medium text-center"
              style={{
                fontFamily: "var(--font-body)",
                color: selectedInstrument === i ? "var(--color-accent-2)" : "var(--color-ink-2)",
              }}
            >
              {skill.category}
            </span>
          </button>
        ))}
      </div>

      {/* Skill detail panel */}
      {selectedInstrument !== null && (
        <div
          className="mt-8 p-8 rounded-lg"
          style={{
            background: "var(--color-paper-2)",
            border: "1px solid var(--color-accent)",
            animation: "reveal-in var(--dur-long) var(--ease-out) forwards",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Left — instrument info */}
            <div className="flex-1">
              <h3
                className="font-display text-xl mb-1"
                style={{ color: "var(--color-accent-2)", fontStyle: "normal" }}
              >
                {resumeData.skills[selectedInstrument].instrument}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--color-muted)", fontFamily: "var(--font-display)" }}
              >
                {resumeData.skills[selectedInstrument].description}
              </p>

              {/* Skill items as VU meter bars */}
              <div className="space-y-3">
                {resumeData.skills[selectedInstrument].items.map((item, j) => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      className="text-sm w-28 shrink-0"
                      style={{
                        fontFamily: "var(--font-outlier)",
                        color: "var(--color-ink-2)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      {item}
                    </span>
                    {/* VU meter bar */}
                    <div
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ background: "var(--color-paper)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, var(--color-accent), var(--color-accent-2))`,
                          width: `${90 - j * 12}%`,
                          transition: `width var(--dur-long) var(--ease-out)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
