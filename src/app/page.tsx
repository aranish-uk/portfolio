import Link from "next/link";
import { ArrowRight, Code2, Gamepad2, UserRound } from "lucide-react";
import { audienceModes, profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#0b0b0f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-pink-400/30" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-[42rem] -translate-x-1/2 bg-pink-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-6 md:px-8">
        <section className="flex flex-1 flex-col justify-center py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-pink-300">
              {profile.shortName} / portfolio modes
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Pick the version that fits the visit.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-7 text-zinc-400">
              Same work, three different reads: professional signal, technical
              depth, or the animated story arc.
            </p>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-5xl gap-3 md:grid-cols-3">
            {audienceModes.map((mode) => {
              const Icon =
                mode.label === "Recruiters"
                  ? UserRound
                  : mode.label === "Developers"
                    ? Code2
                    : Gamepad2;

              return (
                <Link
                  key={mode.href}
                  href={mode.href}
                  className="group flex min-h-40 flex-col justify-between border border-white/10 bg-zinc-950/55 p-5 text-left shadow-xl shadow-black/20 backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-pink-400/45 hover:bg-zinc-900/70"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center border border-white/10 bg-black/40 text-zinc-400 transition-colors group-hover:text-pink-300">
                      <Icon className="size-5" />
                    </div>
                    <ArrowRight className="size-4 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-pink-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-100">
                      {mode.label}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {mode.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            href="/versions"
            className="mx-auto mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-pink-300"
          >
            View legacy version
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </main>
  );
}
