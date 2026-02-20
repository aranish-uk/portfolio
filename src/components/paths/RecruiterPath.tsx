"use client";

import React from "react";
import RecruiterHero from "@/components/recruiter/RecruiterHero";
import RecruiterSkills from "@/components/recruiter/RecruiterSkills";
import RecruiterExperience from "@/components/recruiter/RecruiterExperience";
import RecruiterProjects from "@/components/recruiter/RecruiterProjects";
import RecruiterContact from "@/components/recruiter/RecruiterContact";

export default function RecruiterPath() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-pink-500/30 selection:text-pink-200">
            <div className="mx-auto px-6 pt-24 pb-12 md:pt-32 max-w-4xl relative">
                {/* Global Subtle Noise or Glow can go here if needed, keeping it clean for now */}
                <RecruiterHero />
                <RecruiterSkills />
                <RecruiterExperience />
                <RecruiterProjects />
                <RecruiterContact />
            </div>
        </div>
    );
}
