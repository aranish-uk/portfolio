"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, Search } from "lucide-react";
import { getAllCategories, getProjectCategories, projects } from "@/content/projects";

const categories = getAllCategories();

type ProjectsArchiveProps = {
  developerMode: boolean;
  initialSort: string;
};

export default function ProjectsArchive({
  developerMode,
  initialSort,
}: ProjectsArchiveProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState(initialSort);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects
      .filter((project) => {
        const matchesCategory =
          category === "All" || getProjectCategories(project).includes(category);
        const searchable = [
          project.title,
          project.description,
          ...(project.technologies ?? []),
          ...getProjectCategories(project),
        ]
          .join(" ")
          .toLowerCase();

        return matchesCategory && searchable.includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sort === "developer") {
          return b.meta.developerWeight - a.meta.developerWeight;
        }
        if (sort === "complexity") {
          return b.meta.complexity.localeCompare(a.meta.complexity);
        }
        return b.meta.recruiterWeight - a.meta.recruiterWeight;
      });
  }, [category, query, sort]);

  return (
    <main
      className={`min-h-dvh ${
        developerMode
          ? "bg-zinc-950 text-zinc-100 selection:bg-pink-500/30"
          : "bg-zinc-50 text-zinc-950"
      }`}
    >
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-8">
        <div className="mb-10 max-w-3xl animate-fadeIn">
          <p
            className={`mb-3 font-mono text-sm uppercase ${
              developerMode ? "text-pink-300" : "text-zinc-500"
            }`}
          >
            Project archive
          </p>
          <h1 className="text-balance text-5xl font-semibold md:text-6xl">
            All the useful builds, experiments, and shipped tools.
          </h1>
          <p
            className={`mt-5 text-pretty text-lg leading-8 ${
              developerMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            The main portfolio views stay curated, but this archive keeps the
            deeper project catalog visible.
          </p>
        </div>

        <div
          className={`mb-8 grid gap-3 border p-4 md:grid-cols-[1fr_auto_auto] ${
            developerMode
              ? "border-white/10 bg-white/[0.03]"
              : "border-zinc-200 bg-white"
          }`}
        >
          <label
            className={`flex items-center gap-3 border px-3 ${
              developerMode
                ? "border-white/10 bg-zinc-900"
                : "border-zinc-200 bg-zinc-50"
            }`}
          >
            <Search
              className={`size-4 ${
                developerMode ? "text-pink-300" : "text-zinc-400"
              }`}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, tech, categories"
              className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={`h-11 border px-3 text-sm outline-none ${
              developerMode
                ? "border-white/10 bg-zinc-900 text-zinc-100"
                : "border-zinc-200 bg-zinc-50"
            }`}
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className={`h-11 border px-3 text-sm outline-none ${
              developerMode
                ? "border-white/10 bg-zinc-900 text-zinc-100"
                : "border-zinc-200 bg-zinc-50"
            }`}
            aria-label="Sort projects"
          >
            <option value="recruiter">Recruiter relevance</option>
            <option value="developer">Developer relevance</option>
            <option value="complexity">Complexity</option>
          </select>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            Showing {filteredProjects.length} of {projects.length}
          </p>
          <Link
            href="/developers"
            className={`text-sm font-medium transition ${
              developerMode
                ? "text-pink-300 hover:text-pink-200"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Developer view
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.title}
              className={`animate-fadeIn border p-5 transition duration-200 hover:-translate-y-1 ${
                developerMode
                  ? "border-white/10 bg-white/[0.03] hover:border-pink-400/40"
                  : "border-zinc-200 bg-white hover:border-zinc-300"
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`mb-2 font-mono text-xs uppercase ${
                      developerMode ? "text-pink-300" : "text-zinc-500"
                    }`}
                  >
                    {project.meta.impact} impact / {project.meta.complexity} complexity
                  </p>
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                </div>
                <div className="flex shrink-0 gap-2">
                  {project.visit ? (
                    <a
                      href={project.visit}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} repository`}
                      className={`border p-2 transition ${
                        developerMode
                          ? "border-white/10 text-zinc-400 hover:text-white"
                          : "border-zinc-200 text-zinc-500 hover:text-zinc-950"
                      }`}
                    >
                      <Github className="size-4" />
                    </a>
                  ) : null}
                  {project.web ? (
                    <a
                      href={project.web}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} live site`}
                      className={`border p-2 transition ${
                        developerMode
                          ? "border-white/10 text-zinc-400 hover:text-white"
                          : "border-zinc-200 text-zinc-500 hover:text-zinc-950"
                      }`}
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  ) : null}
                </div>
              </div>

              <p
                className={`line-clamp-4 text-pretty text-sm leading-6 ${
                  developerMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {getProjectCategories(project).slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className={`border px-2 py-1 text-xs ${
                      developerMode
                        ? "border-white/10 bg-zinc-900 text-zinc-400"
                        : "border-zinc-200 bg-zinc-50 text-zinc-500"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div
                className={`mt-4 flex flex-wrap gap-2 border-t pt-4 ${
                  developerMode ? "border-white/10" : "border-zinc-100"
                }`}
              >
                {project.technologies?.slice(0, 6).map((tech) => (
                  <span key={tech} className="text-xs text-zinc-500">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
