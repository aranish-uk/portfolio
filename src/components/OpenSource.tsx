import React from "react";
import { BookOpenText, CheckCircle2, ExternalLink, GitPullRequest, Github } from "lucide-react";

const contribution = {
    project: "Rust by Example",
    organization: "rust-lang",
    description:
        "Authored 7 pull requests that were merged into the official Rust by Example repository, correcting examples and clarifying documentation used by Rust learners.",
    repoUrl: "https://github.com/rust-lang/rust-by-example",
    mergedPullsUrl:
        "https://github.com/rust-lang/rust-by-example/pulls?q=is%3Apr+is%3Amerged+author%3AAbhinav-ranish",
    technologies: ["Rust", "Documentation", "Open Source", "GitHub"],
};

const highlights = [
    { label: "Merged PRs", value: "7", icon: GitPullRequest },
    { label: "Upstream Repo", value: "rust-lang", icon: Github },
    { label: "Focus", value: "Docs + examples", icon: BookOpenText },
];

export default function OpenSource() {
    return (
        <section
            id="open-source"
            className="mb-24 relative animate-fadeIn scroll-mt-32 md:scroll-mt-40"
            style={{ animationDelay: "350ms", animationFillMode: "both" }}
        >
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-white whitespace-nowrap">Open Source</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 p-6 shadow-2xl backdrop-blur-md transition duration-500 hover:border-white/20 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

                <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div>
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Accepted upstream
                            </span>
                            <span className="text-sm font-medium text-zinc-500">{contribution.organization}</span>
                        </div>

                        <h3 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
                            {contribution.project} Contributions
                        </h3>
                        <p className="max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
                            {contribution.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {contribution.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300 transition-colors group-hover:border-white/10"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-3">
                        {highlights.map(({ label, value, icon: Icon }) => (
                            <div
                                key={label}
                                className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-300">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{label}</p>
                                    <p className="truncate text-sm font-semibold text-white">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-8 flex flex-col gap-3 border-t border-white/5 pt-6 sm:flex-row">
                    <a
                        href={contribution.mergedPullsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-5 py-2.5 text-sm font-medium text-orange-200 transition hover:border-orange-400 hover:bg-orange-500/20"
                    >
                        <GitPullRequest className="h-4 w-4" />
                        View Merged PRs
                    </a>
                    <a
                        href={contribution.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Visit Repository
                    </a>
                </div>
            </div>
        </section>
    );
}
