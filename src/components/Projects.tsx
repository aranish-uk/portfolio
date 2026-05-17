import React from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Github } from "lucide-react";
import { getFeaturedProjects } from "@/content/projects";

const proofByProject: Record<string, string[]> = {
  IntelliTab: [
    "Chrome extension using native tab groups and persistent workspaces",
    "Multi-provider AI support with learning from user corrections",
    "Rules engine for deterministic overrides",
  ],
  CVfy: [
    "Resume parsing into strict JSON schema",
    "Published portfolio pages with editable onboarding",
    "Next.js, Prisma, PostgreSQL, OAuth, and AI integration",
  ],
  WiSpec: [
    "Independent Wi-Fi spectroscopy research",
    "Signal processing and material classification workflow",
    "Built around commodity hardware and ML experimentation",
  ],
  FaceTagger: [
    "Offline clustering across large photo libraries",
    "CUDA, InsightFace, Streamlit, and EXIF writing",
    "Privacy-preserving local media workflow",
  ],
  ClawHub: [
    "Git Smart HTTP server with API-first repository management",
    "Agent registration and Personal Access Token authentication",
    "Fastify, Prisma, Next.js, and PostgreSQL system design",
  ],
};

export default function Projects() {
  const featuredProjects = getFeaturedProjects("developer", 4);

  return (
    <section id="projects" className="mb-24 animate-fadeIn scroll-mt-32 md:scroll-mt-40" style={{ animationDelay: "260ms", animationFillMode: "both" }}>
      <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Featured Projects</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Selected for technical depth, shipped surface area, and practical
            engineering signal.
          </p>
        </div>
        <Link
          href="/projects?audience=developer&sort=developer"
          className="text-sm font-semibold text-pink-300 transition hover:text-pink-200"
        >
          View all projects
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <article
            key={project.title}
            className="flex h-full flex-col border border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-1 hover:border-pink-400/40"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="aspect-[16/9] w-full border-b border-white/10 object-cover"
                loading="lazy"
              />
            ) : null}

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 font-mono text-xs text-pink-300">
                    {project.meta.impact} impact / {project.meta.complexity} complexity
                  </p>
                  <h3 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
                <div className="flex shrink-0 gap-2">
                  {project.visit ? (
                    <a
                      href={project.visit}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 transition hover:text-white"
                      aria-label={`${project.title} repository`}
                    >
                      <Github className="size-5" />
                    </a>
                  ) : null}
                  {project.web ? (
                    <a
                      href={project.web}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 transition hover:text-white"
                      aria-label={`${project.title} live site`}
                    >
                      <ExternalLink className="size-5" />
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="text-pretty text-sm leading-6 text-zinc-400">
                {project.description}
              </p>

              <ul className="mt-5 space-y-2">
                {(proofByProject[project.title] ?? []).map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-300">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-pink-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 border-t border-white/10 pt-4">
                {project.technologies?.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/10 bg-zinc-950 px-2 py-1 text-xs text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
