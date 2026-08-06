"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  vy: number;
  phase: number;
  phaseSpeed: number;
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let animId: number;
    let particles: Particle[] = [];
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // Cap at 30fps

    const createParticle = (w: number, h: number, randomY = true): Particle => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + Math.random() * 100,
      radius: Math.random() * 2.5 + 0.6,
      opacity: Math.random() * 0.28 + 0.10,
      vy: -(Math.random() * 0.25 + 0.06),
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.006 + 0.002,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = "100%";
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Bubbly lights — ~1 per 18000px², min 20, max 75
      const count = Math.max(20, Math.min(75, Math.floor((w * h) / 18000)));
      particles = Array.from({ length: count }, () => createParticle(w, h));
    };

    window.addEventListener("resize", resize);
    resize();

    // Warm amber color
    const r = 214, g = 179, b = 127;

    const render = (timestamp: number) => {
      animId = requestAnimationFrame(render);

      // Throttle to 30fps
      if (timestamp - lastTime < FRAME_INTERVAL) return;
      lastTime = timestamp;

      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.phase += p.phaseSpeed;
        p.x += Math.sin(p.phase) * 0.12;
        p.y += p.vy;

        // Respawn if off screen
        if (p.y < -20) {
          Object.assign(p, createParticle(w, h, false));
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // Simple glow — single filled circle (no expensive radialGradient)
        ctx.globalAlpha = p.opacity * 0.35;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    animId = requestAnimationFrame(render);

    // Re-measure on scroll-height changes
    const ro = new ResizeObserver(() => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
        willChange: "transform",
      }}
    />
  );
}
