"use client";

import { useState, useEffect, useCallback } from "react";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("entrance");

  const sections = [
    { id: "entrance", label: "Home" },
    { id: "the-menu", label: "About" },
    { id: "performances", label: "Projects" },
    { id: "instruments", label: "Skills" },
    { id: "exit-lobby", label: "Contact" },
  ];

  // Track which section is in the viewport
  useEffect(() => {
    const sectionIds = sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-80px 0px -40% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      className="fixed top-5 left-1/2 z-[100]"
      style={{ transform: "translateX(-50%)" }}
    >
      <nav
        className="flex items-center gap-0.5 px-2 py-1.5 md:px-3 md:py-2 rounded-full"
        style={{
          background: "oklch(12% 0.02 45 / 0.9)",
          border: "1px solid oklch(40% 0.08 55 / 0.25)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 oklch(40% 0.08 55 / 0.08)",
          backdropFilter: "blur(16px)",
        }}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="relative px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: isActive ? 500 : 400,
                fontStyle: "normal",
                letterSpacing: "0.04em",
                color: isActive
                  ? "var(--color-ink)"
                  : "oklch(55% 0.02 55)",
                background: isActive
                  ? "oklch(20% 0.04 55 / 0.8)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 0 12px oklch(50% 0.12 55 / 0.2), inset 0 0 8px oklch(40% 0.08 55 / 0.1)"
                  : "none",
                // @ts-expect-error CSS custom property
                "--tw-ring-color": "var(--color-accent)",
              }}
            >
              {section.label}
              {/* Warm underline glow for active item */}
              {isActive && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                  style={{
                    width: "60%",
                    background: "var(--color-accent-2)",
                    boxShadow: "0 0 6px var(--color-accent-2)",
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
