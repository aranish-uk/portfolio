import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Construction, FileText } from "lucide-react";
import { audienceModes, profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="min-h-dvh bg-stone-50 text-zinc-950">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-6 py-8 md:px-8">
        <header className="flex items-center justify-between border-b border-zinc-200 pb-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/favicon.ico"
              alt=""
              width={34}
              height={34}
              className="size-8 rounded-full border border-zinc-200"
            />
            <span className="text-sm font-semibold">{profile.name}</span>
          </Link>
          <Link
            href="/versions"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950"
          >
            Versions
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-zinc-500">
              Choose your view
            </p>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-tight text-zinc-950 md:text-7xl">
              One portfolio, three ways to read it.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-zinc-600">
              {profile.headline} Pick the version that matches what you want to
              learn first.
            </p>
          </div>

          <div className="grid gap-4">
            {audienceModes.map((mode) => {
              const Icon =
                mode.label === "Recruiters"
                  ? FileText
                  : mode.label === "Developers"
                    ? Code2
                    : Construction;

              return (
                <Link
                  key={mode.href}
                  href={mode.href}
                  className="group border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center border border-zinc-200 bg-zinc-50 text-zinc-700">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-semibold text-zinc-950">
                            {mode.label}
                          </h2>
                          {"status" in mode && mode.status ? (
                            <span className="border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
                              {mode.status}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-sm font-medium text-zinc-700">
                          {mode.title}
                        </p>
                        <p className="mt-2 text-pretty text-sm leading-6 text-zinc-500">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="mt-1 size-5 shrink-0 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-zinc-950" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
