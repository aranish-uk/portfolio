"use client";

import React from "react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-pink-500/30 selection:text-pink-200 overflow-hidden relative">
      <div className="mx-auto px-6 pt-32 pb-12 md:pt-42 max-w-6xl relative z-10">
        <div className="w-full">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </div>

    </div>
  );
}
