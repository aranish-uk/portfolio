import Link from "next/link";
import { Code2, Gamepad2, UserRound } from "lucide-react";
import { audienceModes, profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#111] text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-6 py-8 md:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-red-600">
            {profile.shortName}
          </Link>
          <Link
            href="/versions"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Versions
          </Link>
        </header>

        <section className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <h1 className="text-balance text-4xl font-semibold md:text-6xl">
            Who&apos;s visiting?
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base text-zinc-400">
            Choose the version that fits what you want to see.
          </p>

          <div className="mt-12 grid w-full max-w-4xl gap-8 sm:grid-cols-3">
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
                  className="group flex flex-col items-center gap-4 text-zinc-400 transition duration-200 hover:-translate-y-1 hover:text-white"
                >
                  <div className="flex aspect-square w-full max-w-[180px] items-center justify-center border-2 border-transparent bg-zinc-800 transition duration-200 group-hover:border-white group-hover:bg-zinc-700">
                    <Icon className="size-16" />
                  </div>
                  <span className="text-xl font-medium">{mode.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
