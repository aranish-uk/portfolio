import React from "react";
import projectsData from "@/components/data/projects.json";
import { ExternalLink, Github, RadioTower, ScanSearch, Waves } from "lucide-react";

type Project = {
    title: string;
    description: string;
    technologies?: string[];
    visit?: string;
    web?: string;
    image?: string;
};

const wispec = (projectsData as Project[]).find((project) => project.title === "WiSpec");

const metrics = [
    { label: "Frequency bands", value: "3", icon: Waves },
    { label: "Material classes", value: "6", icon: ScanSearch },
    { label: "Hardware cost", value: "<$200", icon: RadioTower },
];

export default function Research() {
    if (!wispec) return null;

    return (
        <section
            id="research"
            className="mb-24 relative animate-fadeIn scroll-mt-32 md:scroll-mt-40"
            style={{ animationDelay: "325ms", animationFillMode: "both" }}
        >
            <div className="flex flex-col gap-3 mb-10 md:flex-row md:items-end md:justify-between">
                <div className="flex items-center gap-4 w-full">
                    <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">Research</h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
                </div>
                <p className="text-sm text-zinc-500 md:max-w-sm md:text-right">
                    Independent technical work with a clearer research story than a standard project card can hold.
                </p>
            </div>

            <article className="group relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-zinc-900/35 shadow-2xl backdrop-blur-md transition duration-500 hover:border-cyan-300/30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(34,197,94,0.08),transparent_30%)] opacity-80 pointer-events-none"></div>

                <div className="relative z-10 grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="relative min-h-[320px] overflow-hidden border-b border-white/10 bg-zinc-950 lg:border-b-0 lg:border-r">
                        {wispec.image && (
                            <img
                                src={wispec.image}
                                alt="WiSpec research preview"
                                className="h-full min-h-[320px] w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.03]"
                                loading="lazy"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-zinc-950/40"></div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
                            <RadioTower className="h-3.5 w-3.5" />
                            Independent student research
                        </div>

                        <h3 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                            WiSpec
                        </h3>
                        <p className="mb-6 text-sm leading-relaxed text-zinc-400 md:text-base">
                            Commodity Wi-Fi spectroscopy research for material classification and structural reconnaissance. It combines wireless signal behavior, frame parsing, and machine learning to infer properties of indoor environments using off-the-shelf hardware.
                        </p>

                        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {metrics.map(({ label, value, icon: Icon }) => (
                                <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                                    <Icon className="mb-3 h-5 w-5 text-cyan-300" />
                                    <p className="text-2xl font-bold text-white">{value}</p>
                                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mb-7 flex flex-wrap gap-2">
                            {wispec.technologies?.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            {wispec.web && (
                                <a
                                    href={wispec.web}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/20"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    View Research Site
                                </a>
                            )}
                            {wispec.visit && (
                                <a
                                    href={wispec.visit}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
                                >
                                    <Github className="h-4 w-4" />
                                    View Repository
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}
