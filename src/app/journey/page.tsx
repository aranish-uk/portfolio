import Link from "next/link";
import { ArrowLeft, Hammer, Map, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";

const chapters = [
  "Origin",
  "First code",
  "Cybersecurity",
  "ASU",
  "Internships",
  "AI projects",
  "What comes next",
];

export default function JourneyPage() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-100">
      <section className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center px-6 py-32">
        <Link
          href="/"
          className="mb-12 inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Audience switcher
        </Link>

        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-200">
            <Hammer className="size-4" />
            Under construction
          </div>
          <h1 className="text-balance text-5xl font-semibold leading-tight md:text-7xl">
            The animated story mode is coming later.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-8 text-zinc-400">
            {profile.journeySummary} This version deserves its own animation,
            game design, scene planning, and asset pipeline, so it is staying as
            a placeholder until that work can be done properly.
          </p>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {chapters.map((chapter, index) => (
            <div
              key={chapter}
              className="border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="mb-8 flex items-center justify-between text-zinc-500">
                <Map className="size-4" />
                <span className="font-mono text-xs tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="font-medium text-zinc-100">{chapter}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 inline-flex w-fit items-center gap-2 text-sm text-zinc-500">
          <Sparkles className="size-4" />
          Planned as a fully animated, gamified life-story experience.
        </div>
      </section>
    </main>
  );
}
