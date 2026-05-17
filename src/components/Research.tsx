import React from "react";
import { ExternalLink, Github, RadioTower, ScanSearch, Waves } from "lucide-react";
import { getProjectByTitle } from "@/content/projects";

const wispec = getProjectByTitle("WiSpec");

const metrics = [
  { label: "Frequency bands", value: "3", icon: Waves },
  { label: "Material classes", value: "6", icon: ScanSearch },
  { label: "Hardware cost", value: "<$200", icon: RadioTower },
];

export default function Research() {
  if (!wispec) return null;

  return (
    <section id="research" className="mb-24 animate-fadeIn scroll-mt-32 md:scroll-mt-40" style={{ animationDelay: "380ms", animationFillMode: "both" }}>
      <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white">Research</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Independent technical work with a clearer research story than a
            standard project card can hold.
          </p>
        </div>
      </div>

      <article className="border border-white/10 bg-white/[0.03] transition duration-200 hover:-translate-y-1 hover:border-pink-400/40">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-h-[320px] border-b border-white/10 bg-zinc-900 lg:border-b-0 lg:border-r lg:border-white/10">
            {wispec.image ? (
              <img
                src={wispec.image}
                alt="WiSpec research preview"
                className="h-full min-h-[320px] w-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-4 inline-flex items-center gap-2 border border-pink-400/30 bg-pink-400/10 px-3 py-1 text-xs font-semibold text-pink-200">
              <RadioTower className="size-4" />
              Independent student research
            </div>

            <h3 className="mb-4 text-4xl font-semibold text-white">WiSpec</h3>
            <p className="mb-6 text-pretty text-sm leading-6 text-zinc-400 md:text-base">
              Commodity Wi-Fi spectroscopy research for material classification
              and structural reconnaissance. It combines wireless signal
              behavior, frame parsing, and machine learning to infer properties
              of indoor environments using off-the-shelf hardware.
            </p>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {metrics.map(({ label, value, icon: Icon }) => (
                <div key={label} className="border border-white/10 bg-zinc-950 p-4">
                  <Icon className="mb-3 size-5 text-pink-300" />
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="text-xs font-medium uppercase text-zinc-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-7 flex flex-wrap gap-2">
              {wispec.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="border border-white/10 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {wispec.web ? (
                <a
                  href={wispec.web}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-pink-400/40 bg-pink-400/10 px-5 py-2.5 text-sm font-medium text-pink-100 transition hover:bg-pink-400/15"
                >
                  <ExternalLink className="size-4" />
                  View research site
                </a>
              ) : null}
              {wispec.visit ? (
                <a
                  href={wispec.visit}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-white/20"
                >
                  <Github className="size-4" />
                  View repository
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
