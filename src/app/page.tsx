import Link from "next/link";
import { Code2, Gamepad2, UserRound } from "lucide-react";
import { audienceModes, profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="min-h-dvh overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[70vw] -translate-x-1/2 bg-pink-400/35" />
        <div className="absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-pink-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-6 py-6 md:px-8">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 shadow-xl shadow-black/20 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-pink-400" />
            <span className="text-sm font-semibold text-zinc-100">
              {profile.name}
            </span>
          </Link>
          <Link
            href="/versions"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-100"
          >
            Versions
          </Link>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <p className="mb-4 font-mono text-xs uppercase text-pink-300">
            Portfolio mode
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Choose your view.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base text-zinc-400">
            Same work, tuned for the way you want to read it.
          </p>

          <div className="mt-12 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
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
                  className="group border border-white/10 bg-white/[0.035] p-5 text-left shadow-lg shadow-black/15 backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-pink-400/40 hover:bg-white/[0.055]"
                >
                  <div className="mb-10 flex size-12 items-center justify-center border border-white/10 bg-zinc-950 text-zinc-400 transition-colors group-hover:text-pink-300">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-zinc-100">
                    {mode.label}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {mode.title}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
