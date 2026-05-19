"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(window.location.search);
  }, [pathname]);

  if (pathname === "/") {
    return null;
  }

  const isRecruiterTheme =
    pathname.startsWith("/recruiters") ||
    (pathname.startsWith("/projects") && !search.includes("audience=developer"));
  const isJourneyTheme = pathname.startsWith("/journey");
  const isVersionsTheme = pathname.startsWith("/versions");

  const themeClass = isRecruiterTheme
    ? "site-footer-recruiter"
    : isJourneyTheme
      ? "site-footer-journey"
      : isVersionsTheme
        ? "site-footer-versions"
        : "site-footer-dark";

  return (
    <footer className={`border-t px-6 py-5 text-center text-sm ${themeClass}`}>
      © {new Date().getFullYear()} Abhinav Ranish. All rights reserved.
    </footer>
  );
}
