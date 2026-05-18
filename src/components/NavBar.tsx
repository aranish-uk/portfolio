"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { profile } from "@/content/profile";

const developerSections = [
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

const recruiterSections = [
  { id: "experience", label: "Experience" },
  { id: "recruiter-projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const isDeveloperMode = pathname.startsWith("/developers");
  const isRecruiterMode = pathname.startsWith("/recruiters");
  const isJourneyMode = pathname.startsWith("/journey");
  const isDeveloperArchive =
    pathname.startsWith("/projects") &&
    (projectSearch.includes("audience=developer") ||
      projectSearch.includes("sort=developer"));
  const isDarkNav = isDeveloperMode || isDeveloperArchive || isJourneyMode;

  useEffect(() => {
    setProjectSearch(window.location.search);
  }, [pathname]);

  const archiveHref =
    isDeveloperMode || isDeveloperArchive
      ? "/projects?audience=developer&sort=developer"
      : "/projects";

  const sectionLinks = isDeveloperMode
    ? developerSections
    : isRecruiterMode
      ? recruiterSections
      : [];

  const navigateToSection = (id: string) => {
    setMenuOpen(false);

    if (isDeveloperMode) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (isRecruiterMode) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (isDeveloperArchive) {
      router.push(`/developers#${id}`);
      return;
    }

    router.push(`/recruiters#${id}`);
  };

  const contextualLinks =
    pathname.startsWith("/projects")
      ? [
          {
            href: isDeveloperArchive ? "/developers#projects" : "/recruiters#recruiter-projects",
            label: isDeveloperArchive ? "Developer" : "Recruiter",
          },
        ]
      : isJourneyMode
        ? []
        : [{ href: archiveHref, label: "All Projects" }];
  const showMobileMenu = sectionLinks.length > 0 || contextualLinks.length > 0;

  return (
    <nav
      className={`fixed left-1/2 top-[calc(env(safe-area-inset-top)+1rem)] z-50 w-[calc(100%-2rem)] -translate-x-1/2 border px-4 shadow-xl backdrop-blur-xl transition-[border-radius] duration-200 md:px-6 ${
        menuOpen ? "rounded-2xl" : "rounded-full"
      } ${isJourneyMode ? "max-w-3xl border-[#f6c453]/25 bg-[#17131f]/82 text-[#f8efe4] shadow-black/35" : "max-w-5xl"} ${
        !isJourneyMode && isDarkNav
          ? "border-white/10 bg-zinc-950/72 text-zinc-100 shadow-black/30"
          : !isJourneyMode
            ? "border-white/70 bg-white/72 text-zinc-950 shadow-zinc-950/10"
            : ""
      }`}
    >
      <div className="mx-auto flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/favicon.ico"
            alt=""
            width={34}
            height={34}
            className={`size-8 rounded-full border ${
              isJourneyMode
                ? "border-[#f6c453]/35 bg-black/30"
                : isDarkNav
                  ? "border-white/10"
                  : "border-zinc-200"
            }`}
          />
          <span className="text-sm font-semibold">
            {isJourneyMode ? "Back to selection" : "Selection"}
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {sectionLinks.map((section) => (
            <button
              key={section.id}
              onClick={() => navigateToSection(section.id)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isJourneyMode
                  ? "text-[#f8efe4]/58 hover:text-[#f6c453]"
                  : isDarkNav
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-500 hover:text-zinc-950"
              }`}
              type="button"
            >
              {section.label}
            </button>
          ))}

          {contextualLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isJourneyMode
                  ? "text-[#f8efe4]/58 hover:text-[#f6c453]"
                  : isDarkNav
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {showMobileMenu ? (
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className={`inline-flex size-9 items-center justify-center rounded-full border md:hidden ${
              isJourneyMode
                ? "border-[#f6c453]/25 text-[#f8efe4] hover:bg-[#f6c453]/10"
                : isDarkNav ? "border-white/10 text-zinc-200 hover:bg-white/10" : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
            }`}
            aria-label="Toggle navigation"
            type="button"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        ) : null}
      </div>

      {menuOpen ? (
        <div
          className={`mx-auto border-t py-3 md:hidden ${
            isJourneyMode
              ? "border-[#f6c453]/15"
              : isDarkNav ? "border-white/10" : "border-zinc-200/80"
          }`}
        >
          <div className="grid gap-1">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`px-2 py-3 text-sm font-medium ${
                isDarkNav ? "text-white" : "text-zinc-950"
              }`}
            >
              {isJourneyMode ? "Story Mode" : "Selection"}
            </Link>

            {sectionLinks.map((section) => (
              <button
                key={section.id}
                onClick={() => navigateToSection(section.id)}
                className={`block w-full px-2 py-3 text-left text-sm font-medium ${
                  isJourneyMode
                    ? "text-[#f8efe4]/60"
                    : isDarkNav ? "text-zinc-400" : "text-zinc-500"
                }`}
                type="button"
              >
                {section.label}
              </button>
            ))}

            {contextualLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-3 text-sm font-medium ${
                  isJourneyMode
                    ? "text-[#f6c453]"
                    : isDarkNav ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
