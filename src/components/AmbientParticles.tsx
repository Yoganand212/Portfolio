"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  vy: number;
  vx: number;
  phase: number;        // for sinusoidal sway
  phaseSpeed: number;
  glowRadius: number;
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let animId: number;
    let particles: Particle[] = [];

    const createParticle = (w: number, h: number, randomY = true): Particle => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + Math.random() * 100,
      radius: Math.random() * 2.5 + 0.8,
      baseOpacity: Math.random() * 0.30 + 0.10,
      opacity: 0,
      vy: -(Math.random() * 0.35 + 0.08),
      vx: 0,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.008 + 0.003,
      glowRadius: Math.random() * 10 + 5,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = document.documentElement.scrollHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      ctx.scale(dpr, dpr);

      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;

      // ~1 particle per 12000px² of area, minimum 30, max 120
      const count = Math.max(30, Math.min(120, Math.floor((w * h) / 12000)));
      particles = Array.from({ length: count }, () => createParticle(w, h));
    };

    window.addEventListener("resize", resize);
    resize();

    // Warm amber RGB values (approximating oklch(62% 0.120 45))
    const r = 214, g = 179, b = 127;

    const render = () => {
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Horizontal sway
        p.phase += p.phaseSpeed;
        p.vx = Math.sin(p.phase) * 0.15;

        p.x += p.vx;
        p.y += p.vy;

        // Fade in from bottom, fade out near top
        const fadeInZone = h * 0.95;
        const fadeOutZone = h * 0.02;
        if (p.y > fadeInZone) {
          p.opacity = p.baseOpacity * ((h - p.y) / (h - fadeInZone));
        } else if (p.y < fadeOutZone) {
          p.opacity = p.baseOpacity * (p.y / fadeOutZone);
        } else {
          p.opacity = p.baseOpacity;
        }

        // Respawn if off screen
        if (p.y < -20) {
          Object.assign(p, createParticle(w, h, false));
        }
        // Wrap horizontally
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.glowRadius
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Re-measure on scroll-height changes (e.g. sections revealing)
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const newH = document.documentElement.scrollHeight;
      if (Math.abs(canvas.height / dpr - newH) > 100) {
        canvas.height = newH * dpr;
        canvas.style.height = `${newH}px`;
      }
    });
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
