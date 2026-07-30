"use client";

import { useState } from "react";
import { resumeData } from "@/data/resume";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <div className="section-inner relative">
      <h2 className="font-display text-ink mb-2 text-center" style={{ fontStyle: "normal" }}>
        Tonight's Performances
      </h2>
      <p className="text-muted mb-8 text-center mx-auto" style={{ maxWidth: "50ch" }}>
        The main sets. A showcase of the technical projects and systems I have built.
      </p>

      {/* Performance Board */}
      <div 
        className="relative rounded-lg p-6 md:p-12 overflow-hidden transition-all duration-500"
        style={{
          background: "var(--color-paper-2)",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.05) 40px, rgba(0,0,0,0.05) 80px)",
          border: "2px solid var(--color-accent)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.8)"
        }}
      >
        {/* Brass corner pins */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-accent shadow-sm" />
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-accent shadow-sm" />
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-accent shadow-sm" />
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-accent shadow-sm" />

        {/* View 1: Schedule List */}
        <div 
          className="flex flex-col gap-4 transition-opacity duration-300"
          style={{ 
            opacity: selectedProject === null ? 1 : 0,
            pointerEvents: selectedProject === null ? "auto" : "none",
            display: selectedProject === null ? "flex" : "none",
          }}
        >
          {resumeData.projects.map((project, i) => (
            <button
              key={project.name}
              onClick={() => setSelectedProject(i)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 rounded border border-rule/30 bg-paper-2/50 hover:bg-paper-3/80 transition-colors text-left gap-4"
              aria-expanded={selectedProject === i}
            >
              <div className="flex flex-col">
                <span className="font-outlier text-accent text-xs tracking-widest uppercase mb-1">Set {i + 1}</span>
                <span className="font-display text-xl text-ink font-semibold group-hover:text-accent-2 transition-colors">
                  {project.performanceTitle}
                </span>
                <span className="text-muted text-sm">{project.name}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 md:max-w-[40%] justify-start md:justify-end">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-1 border border-accent/40 rounded text-xs text-ink-2 font-outlier">
                    {t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* View 2: Stage Reveal */}
        <div
          className="transition-opacity duration-500 flex flex-col items-center justify-center"
          style={{
            opacity: selectedProject !== null ? 1 : 0,
            pointerEvents: selectedProject !== null ? "auto" : "none",
            display: selectedProject !== null ? "flex" : "none",
            padding: "var(--space-xl)"
          }}
        >
          {selectedProject !== null && (
            <>
              {/* Spotlight effect */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, var(--color-spotlight) 0%, transparent 60%)",
                  opacity: 0.1
                }}
              />
              
              <div className="relative z-10 w-full max-w-2xl text-center">
                <span className="font-outlier text-accent text-xs tracking-widest uppercase mb-4 block">
                  Now Performing
                </span>
                <h3 className="font-display text-3xl md:text-4xl text-ink font-bold mb-2">
                  {resumeData.projects[selectedProject].performanceTitle}
                </h3>
                <p className="text-ink-2 mb-8">{resumeData.projects[selectedProject].name}</p>

                <p className="text-muted font-display text-lg italic mb-6">
                  "{resumeData.projects[selectedProject].description}"
                </p>

                <ul className="text-left mb-8 space-y-2 max-w-xl mx-auto">
                  {resumeData.projects[selectedProject].highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-ink-2 text-sm">
                      <span className="text-accent">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {resumeData.projects[selectedProject].github && (
                    <a 
                      href={resumeData.projects[selectedProject].github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 border border-dashed border-accent bg-paper text-accent font-outlier text-sm hover:bg-accent hover:text-paper transition-colors uppercase tracking-widest flex items-center gap-2"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      View Source
                    </a>
                  )}
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-muted font-outlier text-xs tracking-widest uppercase hover:text-accent transition-colors flex items-center gap-2 mx-auto"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back to schedule
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
