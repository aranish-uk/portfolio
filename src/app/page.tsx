import Link from "next/link";
import { ArrowRight, Code2, Gamepad2, UserRound } from "lucide-react";

const modes = [
  {
    href: "/recruiters",
    eyebrow: "01 / signal",
    label: "Hiring Manager",
    title: "Clean professional read.",
    description: "Experience, proof points, featured work, resume, and contact.",
    icon: UserRound,
    className: "mode-slice-hiring",
    preview: "hiring",
  },
  {
    href: "/journey",
    eyebrow: "02 / story",
    label: "Story Mode",
    title: "Animated origin arc.",
    description: "A narrated, game-like path through the moments that shaped the work.",
    icon: Gamepad2,
    className: "mode-slice-story",
    preview: "story",
  },
  {
    href: "/developers",
    eyebrow: "03 / depth",
    label: "Developer",
    title: "Technical deep dive.",
    description: "Projects, architecture, open source, research, and build details.",
    icon: Code2,
    className: "mode-slice-developer",
    preview: "developer",
  },
];

function ModePreview({ type }: { type: string }) {
  if (type === "hiring") {
    return (
      <div className="mode-preview mode-preview-hiring" aria-hidden="true">
        <div className="mode-preview-bar" />
        <div className="mode-preview-title" />
        <div className="mode-preview-line is-wide" />
        <div className="mode-preview-line" />
        <div className="mode-preview-stats">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (type === "story") {
    return (
      <div className="mode-preview mode-preview-story" aria-hidden="true">
        <div className="mode-preview-sun" />
        <div className="mode-preview-hero" />
        <div className="mode-preview-ground" />
        <div className="mode-preview-dialogue" />
      </div>
    );
  }

  return (
    <div className="mode-preview mode-preview-developer" aria-hidden="true">
      <div className="mode-preview-terminal-dot-row">
        <span />
        <span />
        <span />
      </div>
      <div className="mode-preview-code is-pink" />
      <div className="mode-preview-code is-wide" />
      <div className="mode-preview-code" />
      <div className="mode-preview-code is-gold" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="mode-switcher-shell relative min-h-dvh overflow-hidden bg-[#09090d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-pink-400/25" />
      <div className="pointer-events-none absolute left-1/2 top-8 h-72 w-[44rem] -translate-x-1/2 bg-pink-500/8 blur-3xl" />

      <section className="relative min-h-dvh">
        <div className="mode-slice-grid">
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

                  <ModePreview type={mode.preview} />

                  <div className="mode-slice-copy">
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
          className="absolute bottom-7 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-pink-300"
        >
          View legacy version
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  );
}
