import React from "react";
import { BookOpenText, CheckCircle2, ExternalLink, GitPullRequest, Github } from "lucide-react";

const contribution = {
  project: "Rust by Example",
  organization: "rust-lang",
  description:
    "Authored 7 pull requests merged into the official Rust by Example repository, correcting examples and clarifying documentation used by Rust learners.",
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
    <section id="open-source" className="mb-24 scroll-mt-32 md:scroll-mt-40">
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-semibold text-white">Open Source</h2>
        <p className="hidden max-w-sm text-right text-sm text-zinc-500 md:block">
          Small upstream changes, merged into a real developer education repo.
        </p>
      </div>

      <article className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              <CheckCircle2 className="size-4" />
              Accepted upstream
            </div>

            <h3 className="mb-4 text-3xl font-semibold text-white">
              {contribution.project} Contributions
            </h3>
            <p className="max-w-3xl text-pretty text-sm leading-6 text-zinc-400 md:text-base">
              {contribution.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {contribution.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-white/10 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {highlights.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4 border border-white/10 bg-zinc-950 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center border border-white/10 text-cyan-300">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase text-zinc-500">{label}</p>
                  <p className="truncate text-sm font-semibold text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <a
            href={contribution.mergedPullsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-cyan-400/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/15"
          >
            <GitPullRequest className="size-4" />
            View merged PRs
          </a>
          <a
            href={contribution.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/20"
          >
            <ExternalLink className="size-4" />
            Visit repository
          </a>
        </div>
      </article>
    </section>
  );
}
