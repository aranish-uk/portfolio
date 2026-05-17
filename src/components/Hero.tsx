import React from "react";
import Image from "next/image";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";

export default function Hero() {
  return (
    <header id="hero" className="mb-28 scroll-mt-32 md:scroll-mt-40">
      <div className="grid gap-10 border-b border-white/10 pb-16 md:grid-cols-[180px_1fr] md:items-center">
        <Image
          src={profile.image}
          alt={profile.name}
          width={180}
          height={180}
          className="size-[180px] border border-white/10 object-cover"
          priority
        />

        <div>
          <p className="mb-3 font-mono text-sm uppercase text-cyan-300">
            Software Engineer / Cybersecurity / AI
          </p>
          <h1 className="text-balance text-5xl font-semibold leading-tight text-white sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-zinc-400">
            {profile.developerSummary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.resume}
              target="_blank"
              className="inline-flex items-center gap-2 border border-cyan-400/40 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
            >
              <Download className="size-4" />
              Resume
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
            <a
              href={profile.links.email}
              className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
            >
              <Mail className="size-4" />
              Email
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
