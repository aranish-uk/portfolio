"use client";

import { useVibe } from "@/context/VibeContext";
import VibeToggle from "@/components/VibeToggle";
import FunPath from "@/components/paths/FunPath";
import RecruiterPath from "@/components/paths/RecruiterPath";

export default function Home() {
  const { vibe } = useVibe();

  // The user wants to swap:
  // - The new "Masterpiece" design (RecruiterPath) becomes the "Fun" Path
  // - The old "Playful" horizontal scrolling design (FunPath) becomes the "Professional" Path

  return (
    <>
      <VibeToggle />
      {vibe === "fun" ? <RecruiterPath /> : <FunPath />}
    </>
  );
}
