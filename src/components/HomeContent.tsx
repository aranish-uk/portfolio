"use client";

import React from "react";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import MoreProjects from "@/components/MoreProjects";
import OpenSource from "@/components/OpenSource";
import Contact from "@/components/Contact";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-cyan-400/20 selection:text-cyan-100">
      <div className="mx-auto px-6 pt-32 pb-12 md:pt-42 max-w-6xl relative z-10">
        <div className="w-full">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <OpenSource />
          <Research />
          <MoreProjects />
          <Contact />
        </div>
      </div>

    </div>
  );
}
