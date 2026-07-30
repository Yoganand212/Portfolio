"use client";

/**
 * SideDecor — Ambient side-channel decorations that fill the empty
 * margins on wide viewports. Vertical brass border lines + warm ambient glows.
 * Hidden on mobile (<1024px).
 */
export default function SideDecor() {
  return (
    <div
      className="hidden lg:block pointer-events-none"
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "clamp(40px, 6vw, 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 0",
        }}
      >
        {/* Vertical brass line */}
        <div
          style={{
            width: "1px",
            height: "100%",
            background:
              "linear-gradient(180deg, transparent 0%, var(--color-accent) 15%, var(--color-accent) 85%, transparent 100%)",
            opacity: 0.2,
          }}
        />
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "clamp(40px, 6vw, 120px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 0",
        }}
      >
        {/* Vertical brass line */}
        <div
          style={{
            width: "1px",
            height: "100%",
            background:
              "linear-gradient(180deg, transparent 0%, var(--color-accent) 15%, var(--color-accent) 85%, transparent 100%)",
            opacity: 0.2,
          }}
        />
      </div>

      {/* Warm ambient glows on the edges */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-5%",
          width: "200px",
          height: "400px",
          background:
            "radial-gradient(ellipse, oklch(22% 0.060 45 / 0.3), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "-5%",
          width: "200px",
          height: "400px",
          background:
            "radial-gradient(ellipse, oklch(20% 0.040 350 / 0.2), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "75%",
          left: "-3%",
          width: "180px",
          height: "350px",
          background:
            "radial-gradient(ellipse, oklch(20% 0.050 55 / 0.2), transparent 70%)",
        }}
      />
    </div>
  );
}
