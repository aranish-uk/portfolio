import React from "react";
import experiences from "@/components/data/experience.json";

export default function RecruiterExperience() {
    return (
        <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Experience</h2>
            <div className="space-y-8">
                {experiences.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                        {/* Timeline Dot */}
                        <div className="absolute w-3 h-3 bg-slate-900 rounded-full -left-[7px] top-2 ring-4 ring-white" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                            <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                            <span className="text-sm font-medium text-slate-500">{exp.duration}</span>
                        </div>
                        <p className="text-base font-medium text-slate-700 mb-3">{exp.organization}</p>
                        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600">
                            {exp.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
