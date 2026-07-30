"use client";

import { resumeData } from "@/data/resume";

export default function Education() {
  return (
    <div className="section-inner flex flex-col items-center">
      <h2
        className="font-display text-ink mb-12 text-center"
        style={{ fontStyle: "normal" }}
      >
        The Gallery
      </h2>

      <div className="w-full max-w-[600px] flex flex-col gap-8">
        {/* Framed Certificate */}
        {resumeData.education.map((edu) => (
          <div key={edu.school} className="flex flex-col gap-6">
            {/* Main certificate frame */}
            <div
              className="relative p-2"
              style={{
                background: "linear-gradient(135deg, var(--color-accent), var(--color-paper-3) 30%, var(--color-accent) 70%, var(--color-paper-3))",
                borderRadius: "var(--radius-md)",
                boxShadow: "0 4px 20px oklch(14% 0.018 55 / 0.6)",
              }}
            >
              <div
                className="p-8 md:p-10 text-center"
                style={{
                  background: "var(--color-paper-2)",
                  borderRadius: "calc(var(--radius-md) - 4px)",
                  border: "1px solid var(--color-rule)",
                }}
              >
                {/* Decorative flourish */}
                <div
                  className="mx-auto w-16 h-px mb-4"
                  style={{ background: "var(--color-accent)" }}
                />

                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{
                    fontFamily: "var(--font-outlier)",
                    color: "var(--color-accent)",
                    letterSpacing: "0.12em",
                  }}
                >
                  Certificate of Education
                </p>

                <h3
                  className="text-2xl md:text-3xl font-display mb-2"
                  style={{
                    color: "var(--color-ink)",
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {edu.school}
                </h3>

                <p
                  className="text-sm mb-1"
                  style={{
                    color: "var(--color-ink-2)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {edu.location}
                </p>

                <div
                  className="mx-auto w-24 h-px my-4"
                  style={{ background: "var(--color-rule)" }}
                />

                <p
                  className="text-lg font-display mb-2"
                  style={{
                    color: "var(--color-ink)",
                    fontStyle: "normal",
                  }}
                >
                  {edu.degree}
                </p>

                <div className="flex items-center justify-center gap-4 mt-4">
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-outlier)",
                      color: "var(--color-accent-2)",
                    }}
                  >
                    CGPA: {edu.cgpa}
                  </span>
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-outlier)",
                      color: "var(--color-muted)",
                    }}
                  >
                    {edu.period}
                  </span>
                </div>

                {/* Decorative flourish */}
                <div
                  className="mx-auto w-16 h-px mt-4"
                  style={{ background: "var(--color-accent)" }}
                />
              </div>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
}
