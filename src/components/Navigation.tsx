"use client";

import { useState, useEffect, useCallback } from "react";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("entrance");
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: "entrance", label: "Home" },
    { id: "the-menu", label: "About" },
    { id: "performances", label: "Projects" },
    { id: "instruments", label: "Skills" },
    { id: "exit-lobby", label: "Contact" },
  ];

  // Show nav only after scrolling past the landing
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is in the viewport
  useEffect(() => {
    const sectionIds = sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
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
      className="fixed top-4 left-1/2 z-[100]"
      style={{
        transform: `translateX(-50%) translateY(${isVisible ? "0" : "-60px"})`,
        opacity: isVisible ? 1 : 0,
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <nav
        className="flex items-center gap-0.5 px-2 py-1 md:px-3 md:py-1.5 rounded-full"
        style={{
          background: "oklch(10% 0.015 45 / 0.65)",
          border: "1px solid oklch(35% 0.06 55 / 0.15)",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 oklch(35% 0.06 55 / 0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="relative px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: isActive ? 500 : 400,
                fontStyle: "normal",
                letterSpacing: "0.04em",
                color: isActive
                  ? "var(--color-ink)"
                  : "oklch(50% 0.02 55 / 0.7)",
                background: isActive
                  ? "oklch(18% 0.035 55 / 0.6)"
                  : "transparent",
                boxShadow: isActive
                  ? "0 0 8px oklch(50% 0.10 55 / 0.12)"
                  : "none",
                // @ts-expect-error CSS custom property
                "--tw-ring-color": "var(--color-accent)",
              }}
            >
              {section.label}
              {/* Warm underline glow for active item */}
              {isActive && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full"
                  style={{
                    width: "50%",
                    background: "var(--color-accent-2)",
                    boxShadow: "0 0 4px var(--color-accent-2)",
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
