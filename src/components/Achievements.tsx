"use client";

import { useState } from "react";
import { resumeData } from "@/data/resume";

export default function Achievements() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="section-inner">
      <h2
        className="font-display text-ink mb-2 text-center"
        style={{ fontStyle: "normal" }}
      >
        The Trophy Cabinet
      </h2>
      <p className="text-muted mb-12 text-center mx-auto" style={{ maxWidth: "50ch" }}>
        Behind the glass, the milestones that mark the journey.
      </p>

      {/* Wooden cabinet */}
      <div
        className="relative p-2 rounded-xl"
        style={{
          background: "linear-gradient(180deg, var(--color-paper-3), var(--color-paper-2) 30%, var(--color-paper-3))",
          boxShadow: "inset 0 0 30px oklch(14% 0.018 55 / 0.5), 0 8px 32px oklch(14% 0.018 55 / 0.6)",
        }}
      >
        {/* Glass front */}
        <div
          className="relative p-6 md:p-8 rounded-lg"
          style={{
            background: "oklch(14% 0.018 55 / 0.7)",
            border: "1px solid var(--color-rule)",
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Cabinet shelves */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resumeData.achievements.map((achievement, i) => (
              <button
                key={achievement.title}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="group text-left"
                style={{ cursor: "pointer" }}
              >
                <div
                  className="relative flex flex-col items-center text-center p-6 rounded-lg transition-all"
                  style={{
                    background: openIndex === i ? "var(--color-paper-3)" : "transparent",
                    border: `1px solid ${openIndex === i ? "var(--color-accent)" : "transparent"}`,
                    transitionDuration: "var(--dur-short)",
                    transitionTimingFunction: "var(--ease-out)",
                  }}
                >


                  {/* Title */}
                  <h3
                    className="text-sm font-medium mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "normal",
                      color: openIndex === i ? "var(--color-accent-2)" : "var(--color-ink)",
                      fontWeight: 600,
                    }}
                  >
                    {achievement.title}
                  </h3>

                  {/* Description — visible when open */}
                  {openIndex === i && (
                    <p
                      className="text-sm mt-2"
                      style={{
                        color: "var(--color-ink-2)",
                        fontFamily: "var(--font-body)",
                        lineHeight: 1.6,
                        animation: "reveal-in var(--dur-long) var(--ease-out) forwards",
                      }}
                    >
                      {achievement.description}
                    </p>
                  )}

                  {/* Tap hint */}
                  {openIndex !== i && (
                    <span
                      className="text-xs mt-2"
                      style={{
                        color: "var(--color-muted)",
                        fontFamily: "var(--font-outlier)",
                      }}
                    >
                      tap to view
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Cabinet shelf dividers */}
          <div
            className="absolute bottom-0 left-4 right-4 h-px"
            style={{ background: "var(--color-rule)" }}
          />
        </div>

        {/* Brass handle */}
        <div className="flex justify-center mt-2">
          <div
            className="w-12 h-1.5 rounded-full"
            style={{ background: "var(--color-accent)" }}
          />
        </div>
      </div>
    </div>
  );
}
