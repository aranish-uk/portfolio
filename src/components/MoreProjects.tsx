import React, { useState } from "react";
import projectsData from "@/components/data/projects.json";
import { ChevronDown, ChevronUp, ExternalLink, Github } from "lucide-react";

type Project = {
    title: string;
    description: string;
    technologies?: string[];
    visit?: string;
    web?: string;
    category?: string | string[];
    workinprogress?: boolean;
    collaboration?: boolean;
};

const featuredProjects = ["IntelliTab", "CVfy", "Readflow", "Stock AI Analyzer", "FaceTagger", "Contract Generator RAG"];
const standaloneProjects = ["WiSpec"];

const categories = [
    "All",
    "🔥🔥",
    "Full Stack",
    "Frontend",
    "AI/LLM",
    "Cyber",
    "Automation",
    "Software",
    "ML",
    "Extensions",
    "IOS",
    "Game",
] as const;

type ProjectCategory = (typeof categories)[number];

const getCategories = (project: Project) =>
    Array.isArray(project.category) ? project.category : project.category ? [project.category] : [];

export default function MoreProjects() {
    const [filter, setFilter] = useState<ProjectCategory>("All");
    const [isExpanded, setIsExpanded] = useState(false);

    const projects = (projectsData as Project[]).filter(
        (project) => !featuredProjects.includes(project.title) && !standaloneProjects.includes(project.title)
    );

    const filteredProjects = projects.filter((project) => {
        if (filter === "All") return true;
        return getCategories(project).includes(filter);
    });

    const visibleProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, 6);
    const shouldShowExpansion = filteredProjects.length > 6;
    const hiddenProjectCount = filteredProjects.length - visibleProjects.length;

    return (
        <section
            id="more-projects"
            className="mb-24 relative animate-fadeIn scroll-mt-32 md:scroll-mt-40"
            style={{ animationDelay: "340ms", animationFillMode: "both" }}
        >
            <div className="flex flex-col gap-4 mb-12 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">More Projects</h2>
                    <div className="h-[1px] flex-1 md:w-24 bg-gradient-to-r from-zinc-800 to-transparent"></div>
                </div>

                <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setFilter(category);
                                setIsExpanded(false);
                            }}
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filter === category
                                ? "border-pink-500/50 bg-pink-500/20 text-pink-300"
                                : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative">
                <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${!isExpanded && shouldShowExpansion ? "max-h-[850px] overflow-hidden" : ""}`}>
                    {visibleProjects.map((project) => (
                        <article
                            key={project.title}
                            className="group relative flex h-full flex-col rounded-2xl border border-white/5 bg-zinc-900/40 p-7 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-white/20"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-blue-500/0 transition-colors duration-500 ease-out pointer-events-none group-hover:from-pink-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5"></div>

                            <div className="relative z-10 flex flex-grow flex-col">
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-pink-300">
                                                {project.title}
                                            </h3>
                                            {project.workinprogress && (
                                                <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-0.5 text-[11px] font-medium text-yellow-300">
                                                    WIP
                                                </span>
                                            )}
                                            {project.collaboration && (
                                                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-300">
                                                    Collaboration
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {getCategories(project).slice(0, 3).map((category) => (
                                                <span key={category} className="text-xs font-medium text-zinc-600">
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 gap-3">
                                        {project.visit && (
                                            <a
                                                href={project.visit}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-zinc-400 transition-colors duration-300 hover:text-white"
                                                aria-label={`${project.title} repository`}
                                            >
                                                <Github className="h-5 w-5" />
                                            </a>
                                        )}
                                        {project.web && (
                                            <a
                                                href={project.web}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-zinc-400 transition-colors duration-300 hover:text-pink-400"
                                                aria-label={`${project.title} live site`}
                                            >
                                                <ExternalLink className="h-5 w-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="mb-8 flex-grow overflow-y-auto pr-2 text-sm leading-relaxed text-zinc-400 scrollbar-hide">
                                    {project.description}
                                </p>

                                <div className="mt-auto flex flex-wrap gap-2 border-t border-white/5 pt-4">
                                    {project.technologies?.map((tech) => (
                                        <span
                                            key={tech}
                                            className="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors group-hover:border-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {!isExpanded && shouldShowExpansion && (
                    <div className="absolute bottom-0 left-0 right-0 z-20 flex h-[250px] items-end justify-center bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pb-8 pointer-events-none">
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="pointer-events-auto group flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-6 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-pink-500/50 hover:shadow-pink-500/20"
                        >
                            See More Projects {hiddenProjectCount > 0 ? `(${hiddenProjectCount} more)` : ""}
                            <ChevronDown className="h-4 w-4 text-pink-500 transition-transform group-hover:translate-y-0.5" />
                        </button>
                    </div>
                )}

                {isExpanded && shouldShowExpansion && (
                    <div className="relative z-20 mt-8 flex justify-center">
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="group flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-6 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-pink-500/50 hover:shadow-pink-500/20"
                        >
                            Show Less
                            <ChevronUp className="h-4 w-4 text-pink-500 transition-transform group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
