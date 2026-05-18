import Link from "next/link";
import { ArrowRight, Code2, Gamepad2, UserRound } from "lucide-react";
import { profile } from "@/content/profile";

const modes = [
  {
    href: "/recruiters",
    eyebrow: "01 / signal",
    label: "Hiring Manager",
    title: "Clean professional read.",
    description: "Experience, proof points, featured work, resume, and contact.",
    icon: UserRound,
    className: "mode-slice-hiring",
  },
  {
    href: "/journey",
    eyebrow: "02 / story",
    label: "Story Mode",
    title: "Animated origin arc.",
    description: "A narrated, game-like path through the moments that shaped the work.",
    icon: Gamepad2,
    className: "mode-slice-story",
  },
  {
    href: "/developers",
    eyebrow: "03 / depth",
    label: "Developer",
    title: "Technical deep dive.",
    description: "Projects, architecture, open source, research, and build details.",
    icon: Code2,
    className: "mode-slice-developer",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#09090d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-pink-400/25" />
      <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-[44rem] -translate-x-1/2 bg-pink-500/8 blur-3xl" />

      <section className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 pb-8 pt-20 md:px-8 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-pink-300">
              {profile.shortName} / portfolio modes
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Pick the version that fits the visit.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-400">
            Same work, split into the read that makes sense right now.
          </p>
        </div>

        <div className="mode-slice-grid mt-9">
          {modes.map((mode) => {
            const Icon = mode.icon;

            return (
              <Link
                key={mode.href}
                href={mode.href}
                className={`mode-slice group ${mode.className}`}
              >
                <div className="mode-slice-inner">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black uppercase tracking-[0.18em] text-white/45 transition-colors group-hover:text-pink-200">
                      {mode.eyebrow}
                    </span>
                    <ArrowRight className="size-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-pink-200" />
                  </div>

                  <div className="flex size-12 items-center justify-center border border-white/10 bg-black/35 text-zinc-400 transition-colors group-hover:border-pink-300/45 group-hover:text-pink-200">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                      {mode.label}
                    </h2>
                    <p className="mt-3 text-base font-semibold text-zinc-300">
                      {mode.title}
                    </p>
                    <p className="mt-3 max-w-xs text-pretty text-sm leading-6 text-zinc-500">
                      {mode.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/versions"
          className="mx-auto mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-pink-300"
        >
          View legacy version
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  );
}
