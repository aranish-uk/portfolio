"use client";
import { motion } from "framer-motion";
import { ExternalLink, Info } from "lucide-react";

const versions = [
  {
    version: "V5",
    period: "2026",
    url: "https://aranish.uk",
    description:
      "Current. Audience-specific portfolio modes for recruiters, developers, and the animated journey experience.",
    active: true,
  },
  {
    version: "V4",
    period: "2026",
    url: "",
    description: "Previous portfolio direction. Archive link coming later.",
    active: false,
  },
  {
    version: "V3",
    period: "Late 2025",
    url: "https://8285153a.portfolio-2025-adr.pages.dev/",
    description: "A study in pink.",
    active: false,
  },
  {
    version: "V2",
    period: "Early 2025",
    url: "https://9c5d9aea.portfolio-27c.pages.dev/",
    description: "Refined design with improved layout and components.",
    active: false,
  },
  {
    version: "V1",
    period: "Early 2024",
    url: "https://3a09416c.portfolio-27c.pages.dev/",
    description: "The first iteration. Where it all started.",
    active: false,
  },
];

export default function VersionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-pink-500 rounded-full blur-[200px] opacity-[0.04]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[200px] opacity-[0.04]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 pt-36 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-zinc-500 mb-3">
            Archive
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Versions
          </h1>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12 flex gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
        >
          <Info size={16} className="text-zinc-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-500 leading-relaxed">
            Archived versions are static snapshots. Features like the AI chatbot
            and visit counter require server-side APIs and won&apos;t function in
            older versions.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

          <div className="space-y-1">
            {versions.map((v, i) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <div
                  className={`group flex items-start gap-5 rounded-xl py-5 pl-0 transition-colors ${
                    v.url ? "hover:bg-white/[0.02]" : "cursor-default opacity-75"
                  }`}
                >
                  {/* Dot */}
                  <div className="relative mt-2 flex-shrink-0">
                    <div
                      className={`w-[15px] h-[15px] rounded-full border-2 transition-colors ${
                        v.active
                          ? "bg-pink-500 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.4)]"
                          : "bg-transparent border-white/20 group-hover:border-white/50"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg font-semibold text-white">
                        {v.version}
                      </span>
                      {v.active && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20">
                          Live
                        </span>
                      )}
                      {!v.url && (
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                          Link later
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-zinc-500 mb-2">{v.period}</p>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {v.description}
                    </p>
                  </div>

                  {v.url ? (
                    <a
                      href={v.url}
                      target={v.active ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={`Open ${v.version}`}
                      className="mt-2 flex-shrink-0 text-zinc-600 transition-colors group-hover:text-zinc-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <span className="mt-2 flex-shrink-0 text-zinc-700">
                      <ExternalLink size={16} />
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
