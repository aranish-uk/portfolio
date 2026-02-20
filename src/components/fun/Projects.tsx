// app/components/Projects.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import data from "@/components/data/projects.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { div } from "framer-motion/client";

type ProjectCategory =
  | "🔥🔥"
  | "Software"
  | "Cyber"
  | "AI/LLM"
  | "ML"
  | "Websites"
  | "DSA"
  | "Scripts"
  | "Extensions"
  | "IOS"
  | "All";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  web: string;
  visit?: string;
  image: string;
  category: ProjectCategory | ProjectCategory[];
  workinprogress?: boolean;
};
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollBy = (offset: number) => {
    containerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const [filter, setFilter] = useState<ProjectCategory>("🔥🔥");

  // 🔑 replace with your `projects` array
  const projects = data as Project[];

  const visibleProjects = projects.filter((p) => {
    if (filter === "All") return true;
    if (Array.isArray(p.category)) return p.category.includes(filter);
    return p.category === filter;
  });

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full min-h-screen flex flex-col items-center justify-center snap-start bg-neutral-950 px-4"
    >
      {/* Toolbar */}
      <div className="w-full max-w-7xl relative">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            "🔥🔥",
            "Software",
            "Cyber",
            "Frontend",
            "Automation",
            "AI/LLM",
            "ML",
            "Extensions",
            "All",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as ProjectCategory)}
              className={`px-4 py-1.5 rounded-full border text-sm ${
                filter === cat
                  ? "bg-red-300 text-white border-red-400"
                  : "bg-black-800 text-gray-300 hover:bg-gray-700 border-gray-700"
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative w-full">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-8"
        >
          {visibleProjects.map((p: any, i: number) => (
            <motion.a
              key={i}
              href={p.web}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[300px] max-w-[400px] h-[340px] flex-shrink-0 snap-start bg-neutral-900 rounded-lg shadow-md hover:scale-105 transition-transform relative flex flex-col items-center justify-center text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {p.workinprogress && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 rounded-lg overflow-hidden">
                  <h4 className="w-[110%] py-1 text-center text-xs font-bold text-black bg-yellow-400 -rotate-6 shadow-md">
                    WORK IN PROGRESS
                  </h4>
                </div>
              )}

              <div className="flex items-center mb-3">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-full border border-gray-600"
                />
                <h3 className="ml-4 text-pink-300 text-lg font-semibold">
                  {p.title}
                </h3>
              </div>

              <p className="text-sm text-gray-300  leading-relaxed">
                {p.description}
              </p>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                <strong>Tech:</strong> {p.technologies?.join(", ")}
              </p>

              {p.visit && (
                <a
                  href={p.visit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-neutral-800 text-white mt-4 py-1.5 w-[95%] rounded text-center text-sm font-medium hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
                  aria-label="View on GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="inline-block"
                  >
                    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.624-5.475 5.921.43.372.823 1.104.823 2.226 0 1.606-.015 2.898-.015 3.293 0 .321.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </motion.a>
          ))}
        </div>
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scrollBy(-700)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-neutral-800/70 hover:bg-neutral-700 p-2 rounded-full shadow-lg"
          >
            <ChevronLeft size={40} className="text-white opacity-70" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scrollBy(700)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-800/70 hover:bg-neutral-700 p-2 rounded-full shadow-lg"
          >
            <ChevronRight size={40} className="text-white opacity-70" />
          </button>
        )}
      </div>
    </motion.section>
  );
}
