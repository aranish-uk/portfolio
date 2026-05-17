"use client";

import { usePathname } from "next/navigation";
import { AIChat } from "@/components/AIChat";
import MusicBar from "@/components/MusicBar";
import NavBar from "@/components/NavBar";

export default function SiteChrome() {
  const pathname = usePathname();
  const isAudienceSwitcher = pathname === "/";
  const isDeveloperMode = pathname.startsWith("/developers");

  return (
    <>
      {!isAudienceSwitcher ? <NavBar /> : null}

      {isDeveloperMode ? (
        <>
          <MusicBar />
          <div className="fixed bottom-6 left-6 z-50">
            <AIChat />
          </div>
        </>
      ) : null}
    </>
  );
}
