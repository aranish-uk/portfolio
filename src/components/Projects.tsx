import React from "react";
import projectsData from "@/components/data/projects.json";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

export default function RecruiterProjects() {
    return (
        <section className="mb-24 relative animate-fadeIn" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white">Featured Projects</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsData.map((p, idx) => (
                    <div
                        key={idx}
                        className="group relative flex flex-col h-full bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-white/20 rounded-2xl p-7 shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                        {/* Interactive Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-pink-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-colors duration-500 ease-out pointer-events-none"></div>

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

                            <p className="text-sm text-zinc-400 leading-relaxed mb-8 flex-grow">
                                {p.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                                {p.technologies?.map((tech) => (
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
                ))}
            </div>
        </section>
    );
}
