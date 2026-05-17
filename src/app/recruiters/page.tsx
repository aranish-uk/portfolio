import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { experiences } from "@/content/experience";
import { profile } from "@/content/profile";
import { getFeaturedProjects } from "@/content/projects";

const featuredProjects = getFeaturedProjects("recruiter", 4);

const skillGroups = [
  {
    label: "Languages",
    skills: ["TypeScript", "Python", "Java", "C++", "Rust", "SQL"],
  },
  {
    label: "Product",
    skills: ["React", "Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
  },
  {
    label: "Security + AI",
    skills: ["Burp Suite", "Nmap", "Ollama", "RAG", "InsightFace"],
  },
];

export default function RecruitersPage() {
  return (
    <main className="min-h-dvh bg-[#f7f5f0] text-zinc-950">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-32 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative order-2 lg:order-1">
          <div className="mx-auto flex min-h-[540px] max-w-[430px] items-end justify-center overflow-hidden border border-zinc-300 bg-[#ebe7df] px-6 pt-10 shadow-[0_18px_60px_rgba(24,24,27,0.10)] sm:min-h-[620px] lg:mx-0">
            <Image
              src={profile.recruiterImage}
              alt={profile.name}
              width={377}
              height={662}
              priority
              className="h-auto w-full max-w-[360px] object-contain object-bottom"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-4 font-mono text-sm uppercase text-zinc-500">
            Software Engineer / Cybersecurity / AI
          </p>
          <h1 className="text-balance text-6xl font-semibold leading-none text-zinc-950 md:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-xl leading-8 text-zinc-700">
            {profile.recruiterSummary}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={profile.resume}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <Download className="size-4" />
              Resume
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
            <a
              href={profile.links.email}
              className="inline-flex items-center justify-center gap-2 border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400"
            >
              <Mail className="size-4" />
              Email
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {profile.proof.map((item) => (
              <div key={item.label} className="border border-zinc-300 bg-white p-4">
                <p className="font-mono text-2xl font-semibold tabular-nums">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="recruiter-projects" className="scroll-mt-32 border-y border-zinc-200 bg-white md:scroll-mt-40">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-sm uppercase text-zinc-500">
              Selected proof
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold">
              Projects with clear business and engineering signal.
            </h2>
            <Link
              href="/projects"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 transition hover:gap-3"
            >
              View all projects
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4">
            {featuredProjects.map((project) => (
              <article
                key={project.title}
                className="border border-zinc-200 bg-[#fafafa] p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="mb-2 font-mono text-xs uppercase text-zinc-500">
                      Impact: {project.meta.impact} / Complexity:{" "}
                      {project.meta.complexity}
                    </p>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="mt-2 line-clamp-3 text-pretty text-sm leading-6 text-zinc-600">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {project.visit ? (
                      <a
                        href={project.visit}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} repository`}
                        className="border border-zinc-300 bg-white p-2 text-zinc-700 transition hover:text-zinc-950"
                      >
                        <Github className="size-4" />
                      </a>
                    ) : null}
                    {project.web ? (
                      <a
                        href={project.web}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live site`}
                        className="border border-zinc-300 bg-white p-2 text-zinc-700 transition hover:text-zinc-950"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto grid max-w-6xl scroll-mt-32 gap-10 px-6 py-16 md:scroll-mt-40 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <BriefcaseBusiness className="size-5 text-zinc-500" />
            <h2 className="text-3xl font-semibold">Experience</h2>
          </div>
          <div className="space-y-4">
            {experiences.slice(0, 4).map((experience) => (
              <article
                key={`${experience.organization}-${experience.title}`}
                className="border border-zinc-300 bg-white p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-semibold">{experience.title}</h3>
                  <p className="font-mono text-xs text-zinc-500">
                    {experience.duration}
                  </p>
                </div>
                <p className="mt-1 text-sm font-medium text-zinc-600">
                  {experience.organization}
                </p>
                <p className="mt-3 text-pretty text-sm leading-6 text-zinc-600">
                  {experience.description[0]}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-8 text-3xl font-semibold">Technical range</h2>
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="border border-zinc-300 bg-white p-5">
                <h3 className="mb-4 font-mono text-sm uppercase text-zinc-500">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-sm text-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl scroll-mt-32 px-6 pb-20 md:scroll-mt-40 md:px-8">
        <div className="border border-zinc-300 bg-white p-6">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            For roles, internships, collaborations, or technical conversations.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={profile.links.email}
              className="inline-flex items-center justify-center gap-2 bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <Mail className="size-4" />
              Email
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:border-zinc-400"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
