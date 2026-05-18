"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Radio,
  ShieldCheck,
  Sparkles,
  Square,
  Trophy,
  Volume2,
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
    title: "Prologue: Bangalore Baptist",
    location: "Bangalore Baptist Hospital, Bangalore",
    era: "Origin",
    scene: "scene-bangalore",
    role: "Main character unlocked",
    summary:
      "The opening shot fades in at Bangalore Baptist Hospital. A baby enters the world with no inventory, no skills, and one dangerous passive ability: curiosity that refuses to stay quiet.",
    quest: "Begin the origin story before anyone knows what class this character will choose.",
    unlock: "Origin memory",
    stat: "+1 Life",
    tags: ["origin", "bangalore", "first frame"],
    icon: Sparkles,
  },
  {
    id: "qatar-flight",
    episode: "EP 02",
    title: "Tiny Hero, Bigger World",
    location: "Bangalore -> Qatar",
    era: "Early childhood",
    scene: "scene-flight",
    role: "World map expands",
    summary:
      "The camera jumps to a flight bound for Qatar, a tiny country that becomes the first open-world map: school corridors, family rules, game lobbies, and the distant glow of the internet.",
    quest: "Grow up between a protected home base and a world that keeps getting bigger.",
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
    role: "First boss encounter",
    summary:
      "Dad locks down the internet to keep him safe. To everyone else, the router is just a blinking box. To this kid, it becomes the first boss fight between bedtime rules and the need to game, explore, and talk to friends.",
    quest:
      "Learn that every restriction has a reason, every system has rules, and curiosity needs a compass.",
    unlock: "Network curiosity",
    stat: "+2 Problem solving",
    tags: ["internet", "games", "networking"],
    icon: Wifi,
  },
  {
    id: "bypass-arc",
    episode: "EP 04",
    title: "MAC Mask, VPN Tunnel",
    location: "Qatar, after bedtime",
    era: "Tinkerer arc",
    scene: "scene-tunnel",
    role: "The first hacker feeling",
    summary:
      "Night falls, the Wi-Fi lights blink, and the experiments begin: MAC spoofing, VPN tunnels, retry loops, and the rush of realizing that locked systems still have patterns if you study them long enough.",
    quest: "Turn the thrill of getting around a wall into respect for how walls are built.",
    unlock: "Adversarial mindset",
    stat: "+3 Pattern recognition",
    tags: ["security", "systems", "curiosity"],
    icon: ShieldCheck,
  },
  {
    id: "pranks",
    episode: "EP 05",
    title: "The Prank Mail Training Arc",
    location: "School friend group",
    era: "Mischief arc",
    scene: "scene-mail",
    role: "Trust lesson acquired",
    summary:
      "The mischief arc arrives with fake-looking prank emails and social-engineering jokes among friends. It is funny for a minute, then the lesson lands: tricking people is easy. Building things people can trust is the real power-up.",
    quest: "Graduate from cheap tricks into responsibility, judgment, and security instincts.",
    unlock: "Ethics checkpoint",
    stat: "+2 Judgment",
    tags: ["security", "trust", "growing up"],
    icon: BadgeCheck,
  },
  {
    id: "first-code",
    episode: "EP 06",
    title: "Keyboard Awakening",
    location: "Bedroom desk, Qatar",
    era: "Coder arc",
    scene: "scene-code",
    role: "Builder class selected",
    summary:
      "The keyboard stops being a way to sneak around limits and becomes a weapon for building. Tiny scripts become tools, tools become workflows, and boring tasks start disappearing like defeated side quests.",
    quest: "Stop only breaking puzzles and start building answers that save time.",
    unlock: "Builder class",
    stat: "+4 Coding",
    tags: ["coding", "automation", "tools"],
    icon: Code2,
  },
  {
    id: "toastmasters",
    episode: "EP 07",
    title: "Voice Stat: President Arc",
    location: "Zenith Toastmasters, Qatar",
    era: "Leadership arc",
    scene: "scene-stage",
    role: "Public speaking buff",
    summary:
      "Away from the code editor, a new stat tree opens. He becomes president of Zenith Toastmasters in Qatar and learns that ideas need more than clever engineering. They need a voice people can follow.",
    quest: "Learn to lead, speak, and make technical work understandable in a room full of people.",
    unlock: "Communication buff",
    stat: "+3 Leadership",
    tags: ["toastmasters", "speaking", "leadership"],
    icon: Trophy,
  },
  {
    id: "asu",
    episode: "EP 08",
    title: "The ASU Portal Opens",
    location: "Arizona State University",
    era: "College arc",
    scene: "scene-asu",
    role: "New region unlocked",
    summary:
      "High school in Qatar fades out, and Arizona State University loads in like a new region. The self-taught experiments now collide with computer science, campus work, and projects with sharper stakes.",
    quest: "Turn raw curiosity into a real engineering path with deadlines, teams, and consequences.",
    unlock: "ASU region",
    stat: "+5 Computer science",
    tags: ["asu", "college", "computer science"],
    icon: GraduationCap,
  },
  {
    id: "class-enroller",
    episode: "EP 09",
    title: "The 6AM Enrollment Heist",
    location: "ASU, late night",
    era: "Builder arc",
    scene: "scene-night-code",
    role: "AutoClass Enroller forged",
    summary:
      "At ASU, class enrollment becomes a brutal 6am raid. While everyone else prepares to fight the portal half-awake, he builds an auto class enroller that watches openings, catches dropped seats, and lets him sleep through the chaos.",
    quest: "Turn registration stress and waitlist watching into an automated system that actually ships.",
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
      "Cue the montage: IT internships, a software engineering internship in Virginia, and an AI-native internship in Phoenix. The quests get less theoretical and more real: users, teammates, production bugs, and deadlines.",
    quest: "Bridge security, frontend, AI, and production execution without losing the builder instinct.",
    unlock: "Professional XP",
    stat: "+6 Industry",
    tags: ["internships", "software", "ai"],
    icon: BriefcaseBusiness,
  },
  {
    id: "startup",
    episode: "EP 11",
    title: "Hero Form: Builder Mode",
    location: "Current questline",
    era: "Now",
    scene: "scene-startup",
    role: "Hero form online",
    summary:
      "Now the arc points toward products: a resume-to-portfolio builder, AI workflows, and a startup built around automating tasks people hand off. The kid who challenged the router becomes the builder who studies systems, automates work, and ships the tool.",
    quest: "Build systems that make useful work feel effortless for other people.",
    unlock: "Founder quest",
    stat: "+7 Product instinct",
    tags: ["startup", "cvfy", "ai agents"],
    icon: Sparkles,
  },
];

const journeyMusicSrc = "/audio/tomodachi-life-mii-maker.mp3";

function clampChapter(index: number) {
  if (index < 0) return chapters.length - 1;
  if (index >= chapters.length) return 0;
  return index;
}

function StoryStage({ chapter }: { chapter: Chapter }) {
  return (
    <div className={`journey-stage ${chapter.scene}`} aria-hidden="true">
      <div className="journey-scene-card">
        <span>{chapter.episode}</span>
        <strong>{chapter.era}</strong>
      </div>
      <div className="journey-action-lines">
        <span />
        <span />
        <span />
      </div>
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
  const [isNarrating, setIsNarrating] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicAvailable, setMusicAvailable] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const narrationRequestRef = useRef(0);
  const activeChapter = chapters[activeIndex];
  const progress = useMemo(
    () => Math.round(((activeIndex + 1) / chapters.length) * 100),
    [activeIndex]
  );
  const ActiveIcon = activeChapter.icon;

  const goToPreviousChapter = useCallback(() => {
    setActiveIndex((value) => clampChapter(value - 1));
  }, []);

  const goToNextChapter = useCallback(() => {
    setActiveIndex((value) => clampChapter(value + 1));
  }, []);

  const stopNarration = useCallback(() => {
    narrationRequestRef.current += 1;

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsNarrating(false);
      return;
    }

    window.speechSynthesis.cancel();
    setIsNarrating(false);
  }, []);

  const narrateChapter = useCallback(
    (chapter: Chapter) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        setIsNarrating(false);
        return;
      }

      const requestId = narrationRequestRef.current + 1;
      narrationRequestRef.current = requestId;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(
        `${chapter.episode}. ${chapter.title}. ${chapter.summary} Turning point: ${chapter.quest}`
      );
      utterance.rate = 0.92;
      utterance.pitch = 0.95;
      utterance.volume = 0.9;
      const finishNarration = () => {
        if (narrationRequestRef.current === requestId) {
          setIsNarrating(false);
        }
      };
      utterance.onend = finishNarration;
      utterance.onerror = finishNarration;

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  const toggleNarration = () => {
    if (isNarrating) {
      stopNarration();
      return;
    }

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    setIsNarrating(true);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !musicAvailable) {
      return;
    }

    audio.volume = 0.16;
    audio.loop = true;

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPreviousChapter();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextChapter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextChapter, goToPreviousChapter]);

  useEffect(() => {
    if (isNarrating) {
      narrateChapter(activeChapter);
    }
  }, [activeChapter, isNarrating, narrateChapter]);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [stopNarration]);

  return (
    <main className="journey-shell min-h-dvh text-[#f8efe4]">
      <audio
        ref={audioRef}
        src={journeyMusicSrc}
        preload="none"
        onError={() => {
          setMusicAvailable(false);
          setIsMusicPlaying(false);
        }}
      />
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
              An episode-by-episode story mode about a curious kid, a locked
              router, and the long road from hacker energy to builder instinct.
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
          <StoryStage key={activeChapter.id} chapter={activeChapter} />

          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div
              key={`${activeChapter.id}-copy`}
              className="journey-panel journey-copy-panel order-2 md:order-none"
              aria-live="polite"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="border border-[#f6c453]/40 bg-[#f6c453]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#f6c453]">
                  {activeChapter.episode}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-[#f8efe4]/60">
                  <MapPin className="size-4" />
                  {activeChapter.location}
                </span>
              </div>

              <h2 className="text-balance text-3xl font-black leading-tight md:text-6xl">
                {activeChapter.title}
              </h2>
              <p className="mt-4 text-pretty text-lg leading-8 text-[#f8efe4]/78">
                {activeChapter.summary}
              </p>
            </div>

            <div className="order-1 flex gap-2 md:order-none md:flex-col">
              <button
                type="button"
                onClick={goToPreviousChapter}
                className="journey-nav-button"
                aria-label="Previous chapter"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={goToNextChapter}
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
                Current arc
              </p>
              <p className="font-bold">{activeChapter.role}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={toggleNarration}
                className="journey-control-button"
              >
                {isNarrating ? (
                  <Square className="size-4" />
                ) : (
                  <Radio className="size-4" />
                )}
                {isNarrating ? "Stop" : "Narrate"}
              </button>
              <button
                type="button"
                onClick={toggleMusic}
                disabled={!musicAvailable}
                className="journey-control-button disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Volume2 className="size-4" />
                {isMusicPlaying ? "Pause" : "Music"}
              </button>
            </div>

            <div>
              <p className="mb-2 font-mono text-xs uppercase text-[#f6c453]">
                Turning point
              </p>
              <p className="text-pretty text-sm leading-6 text-[#f8efe4]/72">
                {activeChapter.quest}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="journey-stat-card">
                <p className="font-mono text-xs uppercase text-[#f8efe4]/45">
                  Unlocked
                </p>
                <p className="mt-2 text-sm font-bold">{activeChapter.unlock}</p>
              </div>
              <div className="journey-stat-card">
                <p className="font-mono text-xs uppercase text-[#f8efe4]/45">
                  Power-up
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
                The security episodes are story beats, not tutorials. The point
                is the character arc: curiosity grows into ethics, trust, and
                responsible systems thinking.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
