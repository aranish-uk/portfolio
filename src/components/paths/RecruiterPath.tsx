"use client";

import React from "react";
import RecruiterHero from "@/components/recruiter/RecruiterHero";
import RecruiterSkills from "@/components/recruiter/RecruiterSkills";
import RecruiterExperience from "@/components/recruiter/RecruiterExperience";
import RecruiterProjects from "@/components/recruiter/RecruiterProjects";
import RecruiterContact from "@/components/recruiter/RecruiterContact";

export default function RecruiterPath() {
    return (
        <div className="min-h-screen bg-white text-slate-900 mx-auto px-6 pt-24 pb-12 md:pt-32 max-w-4xl">
            <RecruiterHero />
            <RecruiterSkills />
            <RecruiterExperience />
            <RecruiterProjects />
            <RecruiterContact />
        </div>
    );
}
