import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { getFeaturedProjects, projects } from "@/content/projects";

const featuredTitles = new Set(
  getFeaturedProjects("developer", 4).map((project) => project.title)
);

export default function MoreProjects() {
  const moreProjects = [...projects]
    .filter((project) => !featuredTitles.has(project.title))
    .sort((a, b) => b.meta.developerWeight - a.meta.developerWeight)
    .slice(0, 6);

  return (
    <section id="more-projects" className="mb-24 animate-fadeIn scroll-mt-32 md:scroll-mt-40" style={{ animationDelay: "440ms", animationFillMode: "both" }}>
      <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">More Builds</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            A few more projects from the broader archive.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-pink-300 transition hover:text-pink-200"
        >
          Open full archive
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {moreProjects.map((project) => (
          <article key={project.title} className="border border-white/10 bg-white/[0.03] p-5 transition duration-200 hover:-translate-y-1 hover:border-pink-400/40">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-xs text-zinc-500">
                  {project.meta.impact} impact
                </p>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
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

            <p className="line-clamp-3 text-pretty text-sm leading-6 text-zinc-400">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
              {project.technologies?.slice(0, 5).map((tech) => (
                <span key={tech} className="text-xs text-zinc-500">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
