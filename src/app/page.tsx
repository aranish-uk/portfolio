"use client";

import React from "react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import InteractiveCursorGlow from "@/components/fun_animations/InteractiveCursorGlow";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-pink-500/30 selection:text-pink-200 overflow-hidden relative">
      <InteractiveCursorGlow />

      <div className="mx-auto px-6 pb-12 max-w-4xl relative z-10">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}
