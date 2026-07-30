"use client";

import { useState } from "react";
import { resumeData } from "@/data/resume";

export default function Resume() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="section-inner">
      <h2
        className="font-display text-ink mb-2 text-center"
        style={{ fontStyle: "normal" }}
      >
        The Menu
      </h2>
      <p
        className="text-muted mb-12 text-center mx-auto"
        style={{ maxWidth: "50ch" }}
      >
        Get to know the performer, then take a look at the full offerings.
      </p>

      {/* Two-column: About Me (left) + Flip Card (right) */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-stretch">
        {/* ── LEFT: About Me ────────────────────────────────── */}
        <div
          className="flex-1 rounded-xl p-8 md:p-10 flex flex-col"
          style={{
            background: "var(--color-paper-2)",
            border: "1px solid var(--color-rule)",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 oklch(40% 0.06 55 / 0.08)",
          }}
        >
          <span className="font-outlier text-accent text-xs tracking-widest uppercase block mb-6">
            About the Performer
          </span>

          <h3
            className="font-display text-2xl md:text-3xl text-ink mb-4"
            style={{ fontStyle: "normal", fontWeight: 600 }}
          >
            {resumeData.name}
          </h3>

          <p
            className="text-ink-2 mb-6 leading-relaxed"
            style={{ maxWidth: "45ch" }}
          >
            I'm a software developer who enjoys learning by building. I enjoy tackling challenging problems, experimenting with different technologies, and creating software that's both useful and reliable. For me, the best part of development is the constant opportunity to learn and improve with every project.
          </p>

          {/* Education */}
          <div className="mb-6">
            <span className="font-outlier text-accent text-[10px] tracking-widest uppercase block mb-2">
              Education
            </span>
            {resumeData.education.map((edu) => (
              <div key={edu.school}>
                <p
                  className="font-display text-ink text-sm"
                  style={{ fontStyle: "normal" }}
                >
                  {edu.degree}
                </p>
                <p className="text-muted text-xs">
                  {edu.school}, {edu.location} · {edu.period}
                </p>
                <p className="text-accent-2 text-xs mt-1">CGPA: {edu.cgpa}</p>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 mt-auto">
            <a
              href={`mailto:${resumeData.email}`}
              className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent-2 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              {resumeData.email}
            </a>
            <a
              href={resumeData.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent-2 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {resumeData.githubHandle}
            </a>
          </div>
        </div>

        {/* ── RIGHT: 3D Flip Card ──────────────────────────── */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="relative w-full max-w-[340px] aspect-[3/4]"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative w-full h-full transition-all duration-700 cursor-pointer rounded-xl"
              style={{
                transformStyle: "preserve-3d",
                transform: isOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
              }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Front Cover */}
              <div
                className="absolute inset-0 rounded-xl flex flex-col items-center justify-center p-8 text-center"
                style={{
                  backfaceVisibility: "hidden",
                  background:
                    "linear-gradient(145deg, var(--color-paper-2), var(--color-paper-3))",
                  border: "1px solid var(--color-accent)",
                  boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
                }}
              >
                {/* Elegant Border */}
                <div className="absolute inset-4 border border-accent/30 rounded-lg pointer-events-none" />
                <div className="absolute inset-5 border border-accent/10 rounded-lg pointer-events-none" />

                <span className="font-outlier text-accent text-xs tracking-[0.25em] uppercase mb-6 block">
                  The Performer
                </span>
                <h3 className="font-display text-4xl text-ink font-bold tracking-wider mb-2">
                  RESUME
                </h3>
                <span className="text-muted text-sm font-display italic mb-8 block">
                  {resumeData.name}
                </span>

                <div className="w-12 h-[1px] bg-accent/50 mb-8" />

                <span className="font-outlier text-ink-2 text-[10px] tracking-widest uppercase flex items-center gap-2 animate-pulse">
                  Flip to see Resume
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              {/* Back (Inside) */}
              <div
                className="absolute inset-0 rounded-xl flex flex-col items-center justify-center p-8 text-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "var(--color-paper)",
                  backgroundImage:
                    "radial-gradient(circle, var(--color-paper-2) 0%, var(--color-paper) 100%)",
                  border: "1px solid var(--color-rule)",
                }}
              >
                <h4 className="font-display text-2xl text-ink mb-2">
                  Yoganand S
                </h4>
                <p className="font-outlier text-accent text-[10px] tracking-widest uppercase mb-6">
                  Computer Science &amp; Engineering
                </p>

                <p className="text-ink-2 text-sm mb-8 font-display leading-relaxed">
                  A comprehensive list of skills, experiences, and technical
                  capabilities, prepared for your perusal.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mb-8 pb-8 border-b border-rule">
                  <div className="text-center border-r border-rule">
                    <p className="font-display text-xl text-accent-2 font-bold">
                      {resumeData.projects.length}
                    </p>
                    <p className="text-muted text-[9px] font-outlier uppercase tracking-wider">
                      Projects
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-xl text-accent-2 font-bold">
                      {resumeData.experience.length}
                    </p>
                    <p className="text-muted text-[9px] font-outlier uppercase tracking-wider">
                      Internships
                    </p>
                  </div>
                </div>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 inline-block"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </a>

                <button
                  className="mt-6 text-[10px] font-outlier text-muted uppercase tracking-widest hover:text-accent transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  Flip Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
