"use client";

import React from "react";
import RecruiterHero from "@/components/recruiter/RecruiterHero";
import RecruiterSkills from "@/components/recruiter/RecruiterSkills";
import RecruiterExperience from "@/components/recruiter/RecruiterExperience";
import RecruiterProjects from "@/components/recruiter/RecruiterProjects";
import RecruiterContact from "@/components/recruiter/RecruiterContact";

// New Fun Animations
import InteractiveCursorGlow from "@/components/fun_animations/InteractiveCursorGlow";
import { RunningKid } from "@/components/fun_animations/RunningKid";

export default function RecruiterPath() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-pink-500/30 selection:text-pink-200 overflow-hidden relative">
            <InteractiveCursorGlow />
            <RunningKid />

            <div className="mx-auto px-6 pt-24 pb-12 md:pt-32 max-w-4xl relative z-10">
                <RecruiterHero />
                <RecruiterSkills />
                <RecruiterExperience />
                <RecruiterProjects />
                <RecruiterContact />
            </div>
        </div>
    );
}
