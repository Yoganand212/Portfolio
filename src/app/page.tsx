"use client";

import { useEffect, useRef, useState } from "react";
import Landing from "@/components/Landing";
import RecordPlayer from "@/components/RecordPlayer";
import Resume from "@/components/Resume";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AmbientParticles from "@/components/AmbientParticles";
import SideDecor from "@/components/SideDecor";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // Small delay to let DOM settle
    const timer = setTimeout(() => {
      const sections = mainRef.current?.querySelectorAll(".jazz-section");
      sections?.forEach((section) => {
        observer.observe(section);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navigation />
      <SideDecor />

      <div ref={mainRef} style={{ position: "relative" }}>
        {/* Global floating particles — across entire page */}
        <AmbientParticles />

        <main style={{ position: "relative", zIndex: 2 }}>
          {/* ═══ THE ENTRANCE ═══ */}
          <section id="entrance" aria-label="Welcome to the Jazz Lounge">
            <Landing onEnter={() => setHasEntered(true)} />
          </section>

          {/* ═══ THE RECORD PLAYER — interactive centrepiece ═══ */}
          <section
            id="record-player"
            className="jazz-section section"
            aria-label="Record Player"
          >
            <RecordPlayer />
          </section>



          {/* ═══ THE MENU — Resume (moved up per user request) ═══ */}
          <section
            id="the-menu"
            className="jazz-section section"
            aria-label="The Menu"
          >
            <Resume />
          </section>



          {/* ═══ TONIGHT'S PERFORMANCES — Projects ═══ */}
          <section
            id="performances"
            className="jazz-section section"
            aria-label="Tonight's Performances"
          >
            <Projects />
          </section>



          {/* ═══ THE INSTRUMENTS — Skills ═══ */}
          <section
            id="instruments"
            className="jazz-section section"
            aria-label="The Instruments"
          >
            <Skills />
          </section>



          {/* ═══ STAGE HISTORY — Experience ═══ */}
          <section
            id="wall-of-fame"
            className="jazz-section section"
            aria-label="Stage History"
          >
            <Experience />
          </section>



          {/* ═══ THE GALLERY — Education ═══ */}
          <section
            id="gallery"
            className="jazz-section section"
            aria-label="The Gallery"
          >
            <Education />
          </section>



          {/* ═══ TROPHY CABINET — Achievements ═══ */}
          <section
            id="trophy-cabinet"
            className="jazz-section section"
            aria-label="Trophy Cabinet"
          >
            <Achievements />
          </section>



          {/* ═══ THE EXIT LOBBY — Contact ═══ */}
          <section
            id="exit-lobby"
            className="jazz-section section"
            aria-label="The Exit Lobby"
          >
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
