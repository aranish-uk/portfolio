"use client";

import dynamic from "next/dynamic";
import { useVibe } from "@/context/VibeContext";
const VibeToggle = dynamic(() => import("@/components/VibeToggle"), { ssr: false });
const FunPath = dynamic(() => import("@/components/paths/FunPath"), { ssr: false });
const RecruiterPath = dynamic(() => import("@/components/paths/RecruiterPath"), { ssr: false });

export default function HomePage() {
  const { vibe } = useVibe();

  return (
    <>
      <VibeToggle />
      {vibe === "recruiter" ? <RecruiterPath /> : <FunPath />}
    </>
  );
}
