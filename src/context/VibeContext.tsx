"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Vibe = "recruiter" | "fun";

interface VibeContextType {
  vibe: Vibe;
  setVibe: (vibe: Vibe) => void;
}

const VibeContext = createContext<VibeContextType | undefined>(undefined);

export function VibeProvider({ children }: { children: React.ReactNode }) {
  const [vibe, setVibeState] = useState<Vibe>("recruiter");

  useEffect(() => {
    // Load preference from window.localStorage on mount
    const savedVibe = window.localStorage.getItem("portfolio-vibe") as Vibe;
    if (savedVibe && (savedVibe === "recruiter" || savedVibe === "fun")) {
      setVibeState(savedVibe);
    }
  }, []);

  const setVibe = (newVibe: Vibe) => {
    setVibeState(newVibe);
    window.localStorage.setItem("portfolio-vibe", newVibe);
  };



  return (
    <VibeContext.Provider value={{ vibe, setVibe }}>
      {children}
    </VibeContext.Provider>
  );
}

export function useVibe() {
  const context = useContext(VibeContext);
  if (context === undefined) {
    throw new Error("useVibe must be used within a VibeProvider");
  }
  return context;
}
