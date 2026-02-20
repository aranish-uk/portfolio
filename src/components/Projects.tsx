import React, { useState } from "react";
import projectsData from "@/components/data/projects.json";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";

type ProjectCategory =
    | "🔥🔥"
    | "Software"
    | "Cyber"
    | "AI/LLM"
    | "ML"
    | "Websites"
    | "DSA"
    | "Scripts"
    | "Extensions"
    | "IOS"
    | "All";

export default function Projects() {
    const [filter, setFilter] = useState<ProjectCategory>("🔥🔥");
    const [isExpanded, setIsExpanded] = useState(false);

    const filteredProjects = projectsData.filter((p: any) => {
        if (filter === "All") return true;
        if (Array.isArray(p.category)) return p.category.includes(filter);
        return p.category === filter;
    });

    // If not expanded, only logic we need is to slice up to 6 projects.
    const visibleProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, 6);

    // If there are exactly or less than 4 projects, don't show the collapse/expand state
    // The user specifically wanted 6 to show, meaning the 3rd row (index 4 and 5) fades.
    const shouldShowExpansion = filteredProjects.length > 4;

    const categories = [
        "🔥🔥",
        "Software",
        "Cyber",
        "Frontend",
        "Automation",
        "AI/LLM",
        "ML",
        "Extensions",
        "All",
    ];

    return (
        <section id="projects" className="mb-24 relative animate-fadeIn" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">Featured Projects</h2>
                    <div className="h-[1px] flex-1 md:w-24 bg-gradient-to-r from-zinc-800 to-transparent"></div>
                </div>

                <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setFilter(cat as ProjectCategory);
                                setIsExpanded(false); // Reset expansion on filter change
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter === cat
                                ? "bg-pink-500/20 text-pink-300 border-pink-500/50"
                                : "bg-white/5 text-zinc-400 hover:text-white border-white/10 hover:border-white/20"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${!isExpanded && shouldShowExpansion ? 'max-h-[850px] overflow-hidden' : ''}`}>
                    {visibleProjects.map((p: any, idx) => {
                        // The user wants 6 projects to show, but the last two cut in half.
                        // If we cap `max-h-[850px]`, the 3rd row (indices 4, 5) sits at the bottom.
                        // We will overlay a gradient fade at the bottom of the grid.
                        return (
                            <div
                                key={idx}
                                className="group relative flex flex-col h-full bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-white/20 rounded-2xl p-7 shadow-2xl transition-all duration-500"
                            >
                                {/* Interactive Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-pink-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-colors duration-500 ease-out pointer-events-none rounded-2xl"></div>

                                <div className="relative z-10 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4 gap-4">
                                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-pink-300 transition-colors duration-300">
                                            {p.title}
                                        </h3>
                                        <div className="flex gap-3 shrink-0">
                                            {p.visit && (
                                                <a
                                                    href={p.visit}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                                                    aria-label="GitHub Repository"
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {p.web && (
                                                <a
                                                    href={p.web}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-zinc-400 hover:text-pink-400 transition-colors duration-300"
                                                    aria-label="Live Project"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-zinc-400 leading-relaxed mb-8 flex-grow overflow-y-auto pr-2 scrollbar-hide">
                                        {p.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                                        {p.technologies?.map((tech: string) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Fade Overlay for collapsed state */}
                {!isExpanded && shouldShowExpansion && (
                    <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent flex items-end justify-center pb-8 z-20 pointer-events-none">
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="pointer-events-auto group flex items-center gap-2 px-6 py-2.5 bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-pink-500/50 rounded-full text-sm font-medium text-white transition-all duration-300 shadow-lg hover:shadow-pink-500/20"
                        >
                            See More Projects <ChevronDown className="w-4 h-4 text-pink-500 group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                )}

                {/* Show Less button when expanded */}
                {isExpanded && shouldShowExpansion && (
                    <div className="mt-8 flex justify-center relative z-20">
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="group flex items-center gap-2 px-6 py-2.5 bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:border-pink-500/50 rounded-full text-sm font-medium text-white transition-all duration-300 shadow-lg hover:shadow-pink-500/20"
                        >
                            Show Less <ChevronUp className="w-4 h-4 text-pink-500 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
