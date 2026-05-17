"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { profile } from "@/content/profile";

const mainLinks = [
  { href: "/recruiters", label: "Recruiters" },
  { href: "/developers", label: "Developers" },
  { href: "/projects", label: "Projects" },
  { href: "/journey", label: "Journey" },
];

const developerSections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Featured" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDeveloperMode = pathname.startsWith("/developers");

  const scrollToDeveloperSection = (id: string) => {
    setMenuOpen(false);

    if (!isDeveloperMode) {
      router.push(`/developers#${id}`);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isCurrent = (href: string) =>
    href === "/developers"
      ? pathname.startsWith("/developers")
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200/80 bg-white/90 px-4 pt-[env(safe-area-inset-top)] text-zinc-950 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
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

        <div className="hidden items-center gap-1 md:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isCurrent(link.href)
                  ? "text-zinc-950"
                  : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isDeveloperMode ? (
            <div className="ml-3 flex items-center gap-1 border-l border-zinc-200 pl-3">
              {developerSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToDeveloperSection(section.id)}
                  className="px-2 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-950"
                >
                  {section.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center border border-zinc-200 text-zinc-700 md:hidden"
          aria-label="Toggle navigation"
          type="button"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="mx-auto max-w-6xl border-t border-zinc-200 py-3 md:hidden">
          <div className="grid gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-3 text-sm font-medium ${
                  isCurrent(link.href) ? "text-zinc-950" : "text-zinc-500"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isDeveloperMode ? (
              <div className="mt-2 border-t border-zinc-200 pt-2">
                {developerSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToDeveloperSection(section.id)}
                    className="block w-full px-2 py-3 text-left text-sm font-medium text-zinc-500"
                    type="button"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
