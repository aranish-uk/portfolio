"use client";
import { motion } from "framer-motion";
import { Award, Download, ExternalLink } from "lucide-react";


const semesters = [
  { label: "Fall 2022", file: "/deanslist/fall-2022.pdf" },
  { label: "Spring 2023", file: "/deanslist/spring-2023.pdf" },
  { label: "Fall 2023", file: "/deanslist/fall-2023.pdf" },
  { label: "Fall 2024", file: "/deanslist/fall-2024.pdf" },
  { label: "Spring 2025", file: "/deanslist/spring-2025.pdf" },
  { label: "Fall 2025", file: "/deanslist/fall-2025.pdf" },
];

export default function DeansListPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* ASU-themed ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8C1D40] rounded-full blur-[180px] opacity-[0.07]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFC627] rounded-full blur-[180px] opacity-[0.06]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-36 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-[#8C1D40]/20 border border-[#8C1D40]/30">
              <Award size={28} className="text-[#FFC627]" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#FFC627] via-[#FFD75E] to-[#FFC627] bg-clip-text text-transparent">
              Dean&apos;s List
            </span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
            Ira A. Fulton Schools of Engineering
          </p>
          <p className="text-zinc-500 text-sm mt-1">
            Arizona State University
          </p>

          {/* ASU-colored divider */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#8C1D40]" />
            <div className="h-2 w-2 rounded-full bg-[#FFC627]" />
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#8C1D40]" />
          </div>
        </motion.div>

        {/* Semester count badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8C1D40]/15 border border-[#8C1D40]/25 text-sm">
            <span className="text-[#FFC627] font-semibold">{semesters.length}x</span>
            <span className="text-zinc-400">Dean&apos;s List Honoree</span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {semesters.map((sem, i) => {
            const isFall = sem.label.startsWith("Fall");
            return (
              <motion.div
                key={sem.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i, duration: 0.5, ease: "easeOut" }}
              >
                <div
                  className={`
                    group relative rounded-2xl overflow-hidden
                    bg-white/[0.03] border transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg
                    ${isFall
                      ? "border-[#8C1D40]/20 hover:border-[#8C1D40]/50 hover:shadow-[#8C1D40]/10"
                      : "border-[#FFC627]/15 hover:border-[#FFC627]/40 hover:shadow-[#FFC627]/10"
                    }
                  `}
                >
                  {/* Top accent bar */}
                  <div
                    className={`h-1 w-full ${
                      isFall
                        ? "bg-gradient-to-r from-[#8C1D40] to-[#A02050]"
                        : "bg-gradient-to-r from-[#FFC627] to-[#FFD75E]"
                    }`}
                  />

                  <div className="p-6">
                    {/* Season tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-semibold tracking-widest uppercase ${
                          isFall ? "text-[#8C1D40]" : "text-[#FFC627]"
                        }`}
                      >
                        {isFall ? "Fall" : "Spring"}
                      </span>
                      <span className="text-zinc-500 text-xs font-mono">
                        {sem.label.split(" ")[1]}
                      </span>
                    </div>

                    {/* Semester name */}
                    <h2 className="text-xl font-bold text-white mb-1 tracking-tight">
                      {sem.label}
                    </h2>
                    <p className="text-zinc-500 text-sm mb-5">
                      Dean&apos;s List &mdash; Fulton Engineering
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <a
                        href={sem.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                          transition-all duration-200
                          ${isFall
                            ? "bg-[#8C1D40]/15 text-[#E8A0B8] hover:bg-[#8C1D40]/30 border border-[#8C1D40]/20"
                            : "bg-[#FFC627]/10 text-[#FFC627] hover:bg-[#FFC627]/20 border border-[#FFC627]/15"
                          }
                        `}
                      >
                        <ExternalLink size={14} />
                        View
                      </a>
                      <a
                        href={sem.file}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                          bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white
                          border border-white/10 transition-all duration-200"
                      >
                        <Download size={14} />
                        PDF
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center text-zinc-600 text-sm mt-16"
        >
          Awarded to students with a semester GPA of 3.50 or higher
        </motion.p>
      </div>

    </div>
  );
}
