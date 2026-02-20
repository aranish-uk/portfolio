"use client";

import { Hero } from "@/components/fun/Hero";
import Experience from "@/components/fun/Experience";
import Projects from "@/components/fun/Projects";
import Contact from "@/components/fun/Contact";
import { RunningBoyPlayer } from "@/components/fun/remotion/RunningBoyPlayer";

export default function FunPath() {
    return (
        <div className="fun-path-container">
            {/* Hero with AI Chat */}
            <section
                id="hero"
                className="h-screen w-full flex flex-col justify-center snap-start"
            >
                <Hero />
            </section>

            {/* Work Experience Timeline */}
            <section
                id="experience"
                className="w-full min-h-screen py-20 snap-start"
            >
                <Experience />
            </section>

            {/* Spotlight Projects */}
            <section id="projects" className="h-screen w-full snap-start">
                <Projects />
            </section>

            {/* Contact */}
            <section id="contact" className="min-h-screen w-full snap-start relative">
                <Contact />

                {/* Remotion Running Boy (Visible at the very bottom) */}
                <div className="absolute bottom-0 w-full z-10 pointer-events-none overflow-hidden h-40">
                    <RunningBoyPlayer />
                </div>
            </section>
        </div>
    );
}
