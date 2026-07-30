"use client";

import { useState } from "react";
import { resumeData } from "@/data/resume";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate network request since this is currently visual-only
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <div className="section-inner">
      <h2 className="font-display text-ink mb-2 text-center" style={{ fontStyle: "normal" }}>
        The Exit Lobby
      </h2>
      <p className="text-muted mb-12 text-center mx-auto" style={{ maxWidth: "50ch" }}>
        Before you leave into the rain, drop a card or sign the guest book.
      </p>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        {/* Left: Business Cards */}
        <div className="flex-1 w-full max-w-md">
          <h3 className="font-outlier text-accent text-xs tracking-widest uppercase mb-6">Cards on the table</h3>
          
          <div className="flex flex-col gap-6 relative">
            {/* Card 1 - Email */}
            <a 
              href={`mailto:${resumeData.email}`}
              className="group relative bg-paper-2 border border-rule p-6 rounded shadow-lg transform transition-transform hover:-translate-y-2 hover:rotate-1"
              style={{ zIndex: 3 }}
            >
              <div className="flex flex-col gap-4">
                <span className="font-display text-xl text-ink font-semibold">{resumeData.name}</span>
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <span className="font-body text-sm text-ink-2">{resumeData.email}</span>
                </div>
              </div>
            </a>

            {/* Card 2 - Phone */}
            <div 
              className="group relative bg-paper-2 border border-rule p-6 rounded shadow-lg transform transition-transform hover:-translate-y-2 hover:-rotate-1 -mt-4 ml-4"
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center gap-3 mt-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span className="font-body text-sm text-ink-2">{resumeData.phone}</span>
              </div>
            </div>

            {/* Card 3 - GitHub */}
            <a 
              href={resumeData.github}
              target="_blank"
              rel="noreferrer"
              className="group relative bg-paper-2 border border-rule p-6 rounded shadow-lg transform transition-transform hover:-translate-y-2 hover:rotate-2 -mt-4 ml-8"
              style={{ zIndex: 1 }}
            >
              <div className="flex items-center gap-3 mt-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span className="font-body text-sm text-ink-2">{resumeData.githubHandle}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right: Guest Book */}
        <div className="flex-1 w-full max-w-lg">
          <h3 className="font-outlier text-accent text-xs tracking-widest uppercase mb-6">Guest Book</h3>
          
          <div className="bg-ink p-8 rounded shadow-2xl relative" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, var(--color-rule) 31px, var(--color-rule) 32px)", backgroundPositionY: "8px" }}>
            {/* Book spine visual */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-paper-3 border-r border-rule/20" />
            
            {formState === "success" ? (
              <div className="pl-6 h-64 flex items-center justify-center text-center">
                <p className="font-display text-2xl text-paper font-semibold italic transform -rotate-2">
                  "Thanks for stopping by."
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pl-6 flex flex-col gap-6 relative z-10">
                
                <div className="flex flex-col">
                  <label htmlFor="name" className="sr-only">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your Name" 
                    required
                    disabled={formState === "submitting"}
                    className="w-full bg-transparent border-none focus:ring-0 text-paper font-display text-lg placeholder:text-paper-3/60 h-8 disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="message" className="sr-only">Your Message</label>
                  <textarea 
                    id="message" 
                    placeholder="Leave a message..." 
                    rows={4}
                    required
                    disabled={formState === "submitting"}
                    className="w-full bg-transparent border-none focus:ring-0 text-paper font-display text-lg placeholder:text-paper-3/60 resize-none leading-8 disabled:opacity-50"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit" 
                    disabled={formState === "submitting"}
                    className="font-outlier text-xs uppercase tracking-widest text-paper bg-paper-2 px-6 py-3 rounded-sm hover:bg-accent transition-colors disabled:opacity-50"
                  >
                    {formState === "submitting" ? "Signing..." : "Sign Book"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
