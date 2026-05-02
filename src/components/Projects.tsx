"use client";

import React, { useEffect, useState } from "react";
import projectsData from "@/components/data/projects.json";
import { CheckCircle2, ChevronsDown, ExternalLink, Github, Mouse } from "lucide-react";

type Project = {
    title: string;
    description: string;
    technologies?: string[];
    visit?: string;
    web?: string;
    image?: string;
    category?: string | string[];
    workinprogress?: boolean;
    collaboration?: boolean;
};

const featuredConfig: Record<
    string,
    {
        label: string;
        signal: string;
        proof: string[];
    }
> = {
    IntelliTab: {
        label: "AI browser extension",
        signal: "Shows product thinking, extension architecture, and multi-provider AI integration.",
        proof: [
            "Organizes tabs into native Chromium tab groups",
            "Learns user corrections and persistent preferences",
            "Supports Groq, OpenAI, Gemini, Claude, and OpenRouter",
        ],
    },
    CVfy: {
        label: "Full-stack AI SaaS",
        signal: "Shows auth, database modeling, strict AI parsing, uploads, and published user pages.",
        proof: [
            "Turns resumes into editable portfolio sites",
            "Uses Prisma, PostgreSQL, OAuth, Zod, and AI resume parsing",
            "Ships five themes with slug-based publishing",
        ],
    },
    Readflow: {
        label: "Production web app",
        signal: "Shows polished frontend execution, persistence, sharing, and Cloudflare storage.",
        proof: [
            "Markdown editor with split-pane live preview",
            "Generates shareable read-only links",
            "Uses Cloudflare D1 with local draft persistence",
        ],
    },
    "Stock AI Analyzer": {
        label: "AI market intelligence",
        signal: "Shows data aggregation, sentiment analysis, financial APIs, and AI-assisted decision tooling.",
        proof: [
            "Combines trends, news sentiment, and market data",
            "Uses Python, Ollama, yfinance, and external APIs",
            "Ships with a live frontend for analysis workflows",
        ],
    },
    FaceTagger: {
        label: "Offline computer vision",
        signal: "Shows large-scale local ML processing, face clustering, and practical media-library automation.",
        proof: [
            "Clusters faces across 1TB+ photo libraries",
            "Runs offline with CUDA, InsightFace, and Streamlit",
            "Writes tags back into EXIF and JSON metadata",
        ],
    },
    "Contract Generator RAG": {
        label: "Legal AI automation",
        signal: "Shows document parsing, RAG workflows, contract blueprinting, and generated document output.",
        proof: [
            "Extracts conditions from uploaded DOCX contracts",
            "Builds searchable context for contract queries",
            "Generates new agreements from reusable blueprints",
        ],
    },
};

const featuredCandidates = [
    { title: "IntelliTab", weight: 30 },
    { title: "CVfy", weight: 60 },
    { title: "Readflow", weight: 40 },
    { title: "Stock AI Analyzer", weight: 60 },
    { title: "FaceTagger", weight: 60 },
    { title: "Contract Generator RAG", weight: 30 },
];

const pickWeightedProjects = (projects: Project[]) => {
    const remaining = featuredCandidates
        .map((candidate) => ({
            ...candidate,
            project: projects.find((project) => project.title === candidate.title),
        }))
        .filter((candidate): candidate is { title: string; weight: number; project: Project } => Boolean(candidate.project));

    const selected: Project[] = [];

    while (selected.length < 3 && remaining.length > 0) {
        const totalWeight = remaining.reduce((total, candidate) => total + candidate.weight, 0);
        let cursor = Math.random() * totalWeight;
        const selectedIndex = remaining.findIndex((candidate) => {
            cursor -= candidate.weight;
            return cursor <= 0;
        });
        const [candidate] = remaining.splice(selectedIndex === -1 ? remaining.length - 1 : selectedIndex, 1);
        selected.push(candidate.project);
    }

    return selected;
};

export default function Projects() {
    const projects = projectsData as Project[];
    const fallbackFeaturedProjects = featuredCandidates
        .map((candidate) => projects.find((project) => project.title === candidate.title))
        .filter(Boolean) as Project[];
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>(fallbackFeaturedProjects.slice(0, 3));

    useEffect(() => {
        setFeaturedProjects(pickWeightedProjects(projects));
    }, [projects]);

    return (
        <section id="projects" className="mb-24 relative animate-fadeIn scroll-mt-32 md:scroll-mt-40" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
            <div className="flex flex-col gap-3 mb-10 md:flex-row md:items-end md:justify-between">
                <div className="flex items-center gap-4 w-full">
                    <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">Featured Projects</h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
                </div>
                <p className="text-sm text-zinc-500 md:max-w-xs md:text-right">
                    Three selected builds that best show product scope, systems thinking, and engineering range.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredProjects.map((project, index) => {
                    const config = featuredConfig[project.title];

                    return (
                        <article
                            key={project.title}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-2xl transition duration-500 hover:-translate-y-1 hover:border-white/20"
                        >
                            <div className="aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-950">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                        loading={index < 2 ? "eager" : "lazy"}
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                                        {project.title}
                                    </div>
                                )}
                            </div>

                            <div className="relative p-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-orange-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div>
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-pink-300">
                                                {config.label}
                                            </p>
                                            <h3 className="text-2xl font-bold tracking-tight text-white">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <div className="flex shrink-0 gap-3">
                                            {project.visit && (
                                                <a
                                                    href={project.visit}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-zinc-400 transition-colors hover:text-white"
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
                                                    className="text-zinc-400 transition-colors hover:text-pink-300"
                                                    aria-label={`${project.title} live site`}
                                                >
                                                    <ExternalLink className="h-5 w-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                                        {config.signal}
                                    </p>

                                    <ul className="mb-6 space-y-2">
                                        {config.proof.map((item) => (
                                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
                                        {project.technologies?.slice(0, 5).map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-10 flex justify-center">
                <a
                    href="#more-projects"
                    className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900/80 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:border-pink-500/50 hover:shadow-pink-500/20"
                >
                    <Mouse className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-pink-300" />
                    View More Projects
                    <ChevronsDown className="h-4 w-4 text-pink-500 transition-transform group-hover:translate-y-0.5" />
                </a>
            </div>
        </section>
    );
}
