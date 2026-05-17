"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  MapPin,
  Plane,
  ShieldCheck,
  Sparkles,
  Trophy,
  Wifi,
} from "lucide-react";

type Chapter = {
  id: string;
  episode: string;
  title: string;
  location: string;
  era: string;
  scene: string;
  role: string;
  summary: string;
  quest: string;
  unlock: string;
  stat: string;
  tags: string[];
  icon: typeof Sparkles;
};

const chapters: Chapter[] = [
  {
    id: "bangalore",
    episode: "EP 01",
    title: "Spawn Point: Bangalore",
    location: "Bangalore Baptist Hospital, Bangalore",
    era: "Origin",
    scene: "scene-bangalore",
    role: "New character unlocked",
    summary:
      "The story opens in Bangalore Baptist Hospital. A tiny protagonist enters the world with no stats, no inventory, and a future questline nobody can read yet.",
    quest: "Begin the route from curiosity to systems builder.",
    unlock: "Origin memory",
    stat: "+1 Life",
    tags: ["origin", "family", "first frame"],
    icon: Sparkles,
  },
  {
    id: "qatar-flight",
    episode: "EP 02",
    title: "The Flight To Qatar",
    location: "Bangalore -> Qatar",
    era: "Early childhood",
    scene: "scene-flight",
    role: "World map expands",
    summary:
      "The baby takes a flight to Qatar, a small country in the Middle East that becomes home base for the next major arc.",
    quest: "Grow up between family, school, games, and a widening internet world.",
    unlock: "Qatar hub",
    stat: "+1 New world",
    tags: ["qatar", "migration", "home"],
    icon: Plane,
  },
  {
    id: "locked-wifi",
    episode: "EP 03",
    title: "The Router Boss Fight",
    location: "Qatar, family home",
    era: "Kid arc",
    scene: "scene-router",
    role: "Curiosity versus locked gates",
    summary:
      "His dad keeps locking down internet access out of safety concerns. The kid still wants games, friends, and the open web, so he starts treating the home network like a puzzle.",
    quest:
      "Find a way around restrictions without yet understanding that this curiosity needs ethics and discipline.",
    unlock: "Network curiosity",
    stat: "+2 Problem solving",
    tags: ["internet", "games", "networking"],
    icon: Wifi,
  },
  {
    id: "bypass-arc",
    episode: "EP 04",
    title: "Mask, Tunnel, Retry",
    location: "Qatar, after bedtime",
    era: "Tinkerer arc",
    scene: "scene-tunnel",
    role: "The first hacker feeling",
    summary:
      "He experiments with MAC-address masks, VPN tunnels, and every weird workaround a determined kid can discover. The important part is not the method; it is the mindset: systems have rules, and rules can be studied.",
    quest: "Turn rule-breaking curiosity into security thinking.",
    unlock: "Adversarial mindset",
    stat: "+3 Pattern recognition",
    tags: ["security", "systems", "curiosity"],
    icon: ShieldCheck,
  },
  {
    id: "pranks",
    episode: "EP 05",
    title: "The Prank Mail Era",
    location: "School friend group",
    era: "Mischief arc",
    scene: "scene-mail",
    role: "Trust lesson acquired",
    summary:
      "The silly prank phase arrives: fake-looking emails, social engineering jokes, and the realization that making people click is easy compared with building something people can trust.",
    quest: "Graduate from tricks to responsibility.",
    unlock: "Ethics checkpoint",
    stat: "+2 Judgment",
    tags: ["security", "trust", "growing up"],
    icon: BadgeCheck,
  },
  {
    id: "first-code",
    episode: "EP 06",
    title: "Automation Awakening",
    location: "Bedroom desk, Qatar",
    era: "Coder arc",
    scene: "scene-code",
    role: "Keyboard becomes weapon and tool",
    summary:
      "The curiosity shifts into actual coding. Scripts, small tools, and automation become the new way to bend boring tasks into something faster.",
    quest: "Build things that save time and prove skill.",
    unlock: "Builder class",
    stat: "+4 Coding",
    tags: ["coding", "automation", "tools"],
    icon: Code2,
  },
  {
    id: "toastmasters",
    episode: "EP 07",
    title: "Voice Stat: President",
    location: "Zenith Toastmasters, Qatar",
    era: "Leadership arc",
    scene: "scene-stage",
    role: "Public speaking buff",
    summary:
      "Outside the code editor, he becomes president of Zenith Toastmasters in Qatar. The quiet hacker energy picks up a new skill: explaining ideas in front of people.",
    quest: "Learn to lead, speak, and make technical ideas land.",
    unlock: "Communication buff",
    stat: "+3 Leadership",
    tags: ["toastmasters", "speaking", "leadership"],
    icon: Trophy,
  },
  {
    id: "asu",
    episode: "EP 08",
    title: "ASU Acceptance Arc",
    location: "Arizona State University",
    era: "College arc",
    scene: "scene-asu",
    role: "New region unlocked",
    summary:
      "High school wraps up, ASU opens, and the story moves from Qatar to Arizona. The skill tree expands into computer science, campus work, and bigger projects.",
    quest: "Turn curiosity into a real engineering path.",
    unlock: "ASU region",
    stat: "+5 Computer science",
    tags: ["asu", "college", "computer science"],
    icon: GraduationCap,
  },
  {
    id: "class-enroller",
    episode: "EP 09",
    title: "The Night Build",
    location: "ASU, late night",
    era: "Builder arc",
    scene: "scene-night-code",
    role: "AutoClass Enroller forged",
    summary:
      "While friends sleep, he builds his own class enroller. The tool watches for class openings and handles enrollment so he can win the scheduling grind with software.",
    quest: "Automate the annoying thing nobody wants to babysit.",
    unlock: "AutoClass Enroller",
    stat: "+5 Automation",
    tags: ["automation", "asu", "shipping"],
    icon: Code2,
  },
  {
    id: "internships",
    episode: "EP 10",
    title: "Internship Montage",
    location: "Qatar, Virginia, Phoenix",
    era: "Professional arc",
    scene: "scene-internship",
    role: "Field experience unlocked",
    summary:
      "The path branches through IT internships, then a software engineering internship in Virginia, and now an AI-native internship in Phoenix. The work gets closer to real companies, real users, and real stakes.",
    quest: "Bridge security, frontend, AI, and production execution.",
    unlock: "Professional XP",
    stat: "+6 Industry",
    tags: ["internships", "software", "ai"],
    icon: BriefcaseBusiness,
  },
  {
    id: "startup",
    episode: "EP 11",
    title: "The Builder Hero",
    location: "Current questline",
    era: "Now",
    scene: "scene-startup",
    role: "Hero form online",
    summary:
      "He builds products like the resume-to-portfolio generator and works on a startup for automating tasks people send to it. The childhood hacker energy becomes a builder mindset: automate the work, secure the system, ship the tool.",
    quest: "Build the systems that make useful work feel effortless.",
    unlock: "Founder quest",
    stat: "+7 Product instinct",
    tags: ["startup", "cvfy", "ai agents"],
    icon: Sparkles,
  },
];

function clampChapter(index: number) {
  if (index < 0) return chapters.length - 1;
  if (index >= chapters.length) return 0;
  return index;
}

function StoryStage({ chapter }: { chapter: Chapter }) {
  return (
    <div className={`journey-stage ${chapter.scene}`} aria-hidden="true">
      <div className="journey-sun" />
      <div className="journey-moon" />
      <div className="journey-cloud cloud-one" />
      <div className="journey-cloud cloud-two" />
      <div className="journey-plane" />
      <div className="journey-router">
        <span />
        <span />
        <span />
      </div>
      <div className="journey-mail">
        <span>@</span>
      </div>
      <div className="journey-laptop">
        <span />
        <span />
        <span />
      </div>
      <div className="journey-stage-spotlight" />
      <div className="journey-asu-mark">ASU</div>
      <div className="journey-city city-left" />
      <div className="journey-city city-right" />
      <div className="journey-hero">
        <div className="journey-hero-hair" />
        <div className="journey-hero-face" />
        <div className="journey-hero-body" />
        <div className="journey-hero-scarf" />
      </div>
      <div className="journey-floor" />
    </div>
  );
}

export default function JourneyExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeChapter = chapters[activeIndex];
  const progress = useMemo(
    () => Math.round(((activeIndex + 1) / chapters.length) * 100),
    [activeIndex]
  );
  const ActiveIcon = activeChapter.icon;

  return (
    <main className="journey-shell min-h-dvh text-[#f8efe4]">
      <section className="relative mx-auto grid min-h-dvh max-w-7xl gap-6 px-4 pb-8 pt-24 md:px-6 lg:grid-cols-[280px_1fr_320px] lg:pt-28">
        <aside className="journey-panel order-2 h-fit lg:order-1 lg:sticky lg:top-24">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f8efe4]/70 transition hover:text-[#f8efe4]"
          >
            <ArrowLeft className="size-4" />
            Audience switcher
          </Link>

          <div className="mb-5">
            <p className="font-mono text-xs uppercase text-[#f6c453]">
              Story mode
            </p>
            <h1 className="mt-2 text-balance text-3xl font-black leading-tight">
              Abhinav: Origin Quest
            </h1>
            <p className="mt-3 text-pretty text-sm leading-6 text-[#f8efe4]/68">
              Anime-style life map from curious kid to coder, security thinker,
              AI builder, and startup founder.
            </p>
          </div>

          <div className="mb-5">
            <div className="mb-2 flex items-center justify-between font-mono text-xs text-[#f8efe4]/60">
              <span>Completion</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 border border-[#f8efe4]/15 bg-black/30">
              <div
                className="h-full bg-[#f6c453] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid gap-2">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`journey-chapter-button ${
                  index === activeIndex ? "is-active" : ""
                }`}
              >
                <span className="font-mono text-xs">{chapter.episode}</span>
                <span>{chapter.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="order-1 lg:order-2">
          <StoryStage chapter={activeChapter} />

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div className="journey-panel">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="border border-[#f6c453]/40 bg-[#f6c453]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#f6c453]">
                  {activeChapter.episode}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-[#f8efe4]/60">
                  <MapPin className="size-4" />
                  {activeChapter.location}
                </span>
              </div>

              <h2 className="text-balance text-4xl font-black leading-tight md:text-6xl">
                {activeChapter.title}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-8 text-[#f8efe4]/78">
                {activeChapter.summary}
              </p>
            </div>

            <div className="flex gap-2 md:flex-col">
              <button
                type="button"
                onClick={() => setActiveIndex((value) => clampChapter(value - 1))}
                className="journey-nav-button"
                aria-label="Previous chapter"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((value) => clampChapter(value + 1))}
                className="journey-nav-button"
                aria-label="Next chapter"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <aside className="journey-panel order-3 h-fit lg:sticky lg:top-24">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center border border-[#f6c453]/40 bg-[#f6c453]/10 text-[#f6c453]">
              <ActiveIcon className="size-6" />
            </div>
            <div>
              <p className="font-mono text-xs uppercase text-[#f8efe4]/50">
                Current class
              </p>
              <p className="font-bold">{activeChapter.role}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="mb-2 font-mono text-xs uppercase text-[#f6c453]">
                Main quest
              </p>
              <p className="text-pretty text-sm leading-6 text-[#f8efe4]/72">
                {activeChapter.quest}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="journey-stat-card">
                <p className="font-mono text-xs uppercase text-[#f8efe4]/45">
                  Unlock
                </p>
                <p className="mt-2 text-sm font-bold">{activeChapter.unlock}</p>
              </div>
              <div className="journey-stat-card">
                <p className="font-mono text-xs uppercase text-[#f8efe4]/45">
                  Stat
                </p>
                <p className="mt-2 text-sm font-bold text-[#f6c453]">
                  {activeChapter.stat}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs uppercase text-[#f8efe4]/45">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {activeChapter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#f8efe4]/12 bg-black/25 px-2 py-1 text-xs text-[#f8efe4]/62"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-[#f8efe4]/10 pt-5">
              <p className="text-pretty text-xs leading-5 text-[#f8efe4]/45">
                The security episodes are framed as story beats, not tutorials:
                curiosity levels up into ethics, trust, and responsible systems
                thinking.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
