import React, { useState } from "react";
import experiences from "@/components/data/experience.json";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Experience() {
    const [isExpanded, setIsExpanded] = useState(false);

    // Determine which items to show
    const visibleExperiences = isExpanded ? experiences : experiences.slice(0, 2);

    return (
        <section className="mb-24 relative animate-fadeIn" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white">Experience</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            </div>

            <div className={`space-y-12 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent ${!isExpanded && experiences.length > 2 ? 'pb-8' : ''}`}>
                {visibleExperiences.map((exp, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Timeline Core Icon/Dot */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#0a0a0a] bg-zinc-700 group-hover:bg-pink-500 shadow-[0_0_0_2px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300 z-10"></div>

                        {/* Experience Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] group-hover:-translate-y-1 transition-transform duration-300">
                            <div className="relative p-6 bg-zinc-900/40 backdrop-blur-sm border border-white/5 group-hover:border-white/10 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
                                {/* Subtle Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                                        <h3 className="text-xl font-bold text-white tracking-tight">{exp.title}</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-zinc-400 border border-white/10 group-hover:text-pink-300 group-hover:border-pink-500/30 transition-colors duration-300 whitespace-nowrap">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p className="text-pink-500 font-semibold text-sm tracking-wide uppercase mb-4">{exp.organization}</p>
                                    <ul className="space-y-2 text-sm text-zinc-400">
                                        {exp.description.map((desc, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-pink-500 mt-1 flex-shrink-0">&bull;</span>
                                                <span className="leading-relaxed">{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {experiences.length > 2 && (
                <div className="mt-8 flex justify-center relative z-20">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group flex items-center gap-2 px-6 py-2.5 bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-pink-500/50 rounded-full text-sm font-medium text-white transition-all duration-300 shadow-lg hover:shadow-pink-500/20"
                    >
                        {isExpanded ? (
                            <>
                                Show Less <ChevronUp className="w-4 h-4 text-pink-500 group-hover:-translate-y-0.5 transition-transform" />
                            </>
                        ) : (
                            <>
                                See All Experience ({experiences.length}) <ChevronDown className="w-4 h-4 text-pink-500 group-hover:translate-y-0.5 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </section>
    );
}
