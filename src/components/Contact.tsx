import React from "react";
import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";

export default function Contact() {
  return (
    <section id="contact" className="mb-24 animate-fadeIn scroll-mt-32 md:scroll-mt-40" style={{ animationDelay: "500ms", animationFillMode: "both" }}>
      <div className="border border-white/10 bg-white/[0.03] p-8 transition duration-200 hover:border-pink-400/40 md:p-10">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center justify-center border border-white/10 bg-zinc-950 p-3">
            <Mail className="size-6 text-pink-300" />
          </div>

          <h2 className="text-balance text-4xl font-semibold text-white md:text-5xl">
            Let&apos;s build something useful.
          </h2>

          <p className="mt-5 text-pretty text-lg leading-8 text-zinc-400">
            Open to software engineering, cybersecurity, and AI opportunities
            where practical systems and clear execution matter.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={profile.links.email}
              className="inline-flex items-center justify-center gap-2 border border-pink-400/40 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-100 transition hover:bg-pink-400/15"
            >
              Send an email
              <ArrowRight className="size-4" />
            </a>

            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/20"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
