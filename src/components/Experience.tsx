import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { experiences } from "@/content/experience";

// Hidden from the public site. experience.json is read by this component, by
// AIChat.tsx, and by the Groq system prompt, so the entry was pulled from the
// JSON rather than filtered here. To restore, paste it back into
// experience.json directly after the Ampcus entry:
//
// {
//   "title": "AI / SWE Intern",
//   "organization": "TRANZYD",
//   "duration": "Dec 2024 - May 2025",
//   "image": "/work/tranzyd.jpg",
//   "description": [
//     "Architected end-to-end AI contract intelligence platform processing ~25 legal contracts: built automated clause extraction, semantic comparison (FAISS + sentence-transformers), and draft generation—cutting manual review by ~40%.",
//     "Joined to support AI contract automation; quickly took on core feature development responsibilities.",
//     "Integrated backend logic using Python, SQLite, and python-docx for contract storage and document generation.",
//     "Designed clause-matching workflows for OLD/NEW comparisons with checkbox-driven contract generation UI.",
//     "Prototyped an AI stock analyzer using RAG pipelines, FAISS, and sentiment models to explore LLM-based tools."
//   ]
// }

export default function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleExperiences = isExpanded ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="mb-24 animate-fadeIn scroll-mt-32 md:scroll-mt-40" style={{ animationDelay: "180ms", animationFillMode: "both" }}>
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-semibold text-white">Experience</h2>
        <p className="hidden max-w-sm text-right text-sm text-zinc-500 md:block">
          Internship and support work across software, security, AI, and IT.
        </p>
      </div>

      <div className="space-y-4">
        {visibleExperiences.map((experience) => (
          <article
            key={`${experience.organization}-${experience.title}`}
            className="border border-white/10 bg-white/[0.03] p-5 transition duration-200 hover:-translate-y-1 hover:border-pink-400/40"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {experience.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-pink-300">
                  {experience.organization}
                </p>
              </div>
              <span className="font-mono text-sm text-zinc-500">
                {experience.duration}
              </span>
            </div>

            <ul className="mt-5 space-y-3">
              {experience.description.slice(0, isExpanded ? undefined : 2).map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400">
                  <span className="mt-2 size-1.5 shrink-0 bg-pink-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {experiences.length > 3 ? (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsExpanded((value) => !value)}
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/20"
            type="button"
          >
            {isExpanded ? (
              <>
                Show less
                <ChevronUp className="size-4 text-pink-300" />
              </>
            ) : (
              <>
                See all experience
                <ChevronDown className="size-4 text-pink-300" />
              </>
            )}
          </button>
        </div>
      ) : null}
    </section>
  );
}
