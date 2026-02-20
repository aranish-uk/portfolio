"use client";

import { useVibe } from "@/context/VibeContext";
import VibeToggle from "@/components/VibeToggle";
import FunPath from "@/components/paths/FunPath";
import RecruiterPath from "@/components/paths/RecruiterPath";

export default function HomePage() {
  const { vibe } = useVibe();

  return (
    <>
      <VibeToggle />
      {vibe === "recruiter" ? <RecruiterPath /> : <FunPath />}
    </>
  );
}
