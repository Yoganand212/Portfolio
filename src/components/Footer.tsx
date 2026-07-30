"use client";

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 text-center border-t border-rule bg-paper">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Subtle decorative element */}
        <div className="flex gap-2 opacity-50 mb-8">
          <div className="w-1 h-1 rounded-full bg-accent" />
          <div className="w-1 h-1 rounded-full bg-accent" />
          <div className="w-1 h-1 rounded-full bg-accent" />
        </div>

        {/* Ft5 Statement */}
        <p className="font-display text-2xl md:text-3xl text-ink font-medium" style={{ fontStyle: "normal" }}>
          Thanks for visiting.
        </p>

      </div>
    </footer>
  );
}
