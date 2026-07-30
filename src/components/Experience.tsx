"use client";

import { useState } from "react";
import { resumeData } from "@/data/resume";

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="section-inner">
      <h2
        className="font-display text-ink mb-2 text-center"
        style={{ fontStyle: "normal" }}
      >
        Stage History
      </h2>
      <p className="text-muted mb-12 text-center mx-auto" style={{ maxWidth: "50ch" }}>
        Every performer has a story. These are the stages I have played.
      </p>

      {/* Vintage poster grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resumeData.experience.map((exp, i) => (
          <button
            key={exp.company}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
            aria-expanded={expandedIndex === i}
            className="group text-left"
            style={{ cursor: "pointer" }}
          >
            {/* Framed vintage poster */}
            <div
              className="relative p-1 transition-transform"
              style={{
                background: "linear-gradient(135deg, var(--color-accent), var(--color-paper-3), var(--color-accent))",
                borderRadius: "var(--radius-md)",
                transitionDuration: "var(--dur-short)",
                transitionTimingFunction: "var(--ease-out)",
              }}
            >
              {/* Inner poster */}
              <div
                className="relative p-6 md:p-8 h-[320px] flex flex-col justify-between"
                style={{
                  background: "var(--color-paper-2)",
                  borderRadius: "calc(var(--radius-md) - 2px)",
                }}
              >
                {/* Warm glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-md pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, var(--color-accent-2), transparent 70%)",
                    opacity: "0",
                    transitionDuration: "var(--dur-short)",
                  }}
                />

                {/* Jazz set time */}
                <span
                  className="relative text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "var(--font-outlier)",
                    color: "var(--color-accent)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {exp.jazzTitle}
                </span>

                {/* Headliner — company */}
                <div className="relative mt-4 flex-1">
                  <h3
                    className="text-2xl md:text-3xl font-display leading-tight mb-2"
                    style={{
                      color: "var(--color-ink)",
                      fontStyle: "normal",
                      fontWeight: 700,
                    }}
                  >
                    {exp.company}
                  </h3>

                  {/* Role */}
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--color-ink-2)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                    }}
                  >
                    {exp.role}
                  </p>
                </div>

                {/* Date, location and certificate */}
                <div className="relative mt-4 flex items-center justify-between gap-2">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-outlier)",
                      color: "var(--color-muted)",
                    }}
                  >
                    {exp.period}
                  </span>

                  {"certificate" in exp && exp.certificate && (
                    <a
                      href={exp.certificate as string}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] inline-flex items-center gap-1 font-outlier uppercase tracking-wider text-accent hover:text-accent-2 transition-colors z-10 px-2 py-0.5 rounded border border-accent/30 hover:border-accent/60 bg-paper-3/40"
                      title="View Certificate PDF"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      Cert ↗
                    </a>
                  )}

                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-outlier)",
                      color: "var(--color-muted)",
                    }}
                  >
                    {exp.location}
                  </span>
                </div>

                {/* Poster wear texture */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-md"
                  style={{
                    background: "linear-gradient(180deg, transparent 60%, var(--color-paper) 200%)",
                    opacity: 0.15,
                  }}
                />
              </div>
            </div>

            {/* Expanded detail */}
            {expandedIndex === i && (
              <div
                className="mt-4 p-6 rounded-lg"
                style={{
                  background: "var(--color-paper-2)",
                  border: "1px solid var(--color-rule)",
                  animation: "reveal-in var(--dur-long) var(--ease-out) forwards",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4
                    className="text-sm uppercase tracking-wider"
                    style={{
                      fontFamily: "var(--font-outlier)",
                      color: "var(--color-accent)",
                      letterSpacing: "0.08em",
                      fontStyle: "normal",
                    }}
                  >
                    Setlist
                  </h4>
                  {"certificate" in exp && exp.certificate && (
                    <a
                      href={exp.certificate as string}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs font-outlier uppercase tracking-wider text-accent hover:text-accent-2 transition-colors px-2.5 py-1 rounded border border-accent/40 hover:bg-accent/10"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      View Certificate
                    </a>
                  )}
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--color-ink-2)" }}
                    >
                      <span
                        className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--color-accent)" }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
