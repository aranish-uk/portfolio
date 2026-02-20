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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load preference from localStorage on mount
    const savedVibe = localStorage.getItem("portfolio-vibe") as Vibe;
    if (savedVibe && (savedVibe === "recruiter" || savedVibe === "fun")) {
      setVibeState(savedVibe);
    }
    setIsLoaded(true);
  }, []);

  const setVibe = (newVibe: Vibe) => {
    setVibeState(newVibe);
    localStorage.setItem("portfolio-vibe", newVibe);
  };

  // Prevent hydration mismatch by not rendering until we know the client preference
  if (!isLoaded) return null;

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
