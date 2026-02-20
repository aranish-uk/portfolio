"use client";

import { useVibe } from "@/context/VibeContext";
import { motion } from "framer-motion";

export default function VibeToggle() {
    const { vibe, setVibe } = useVibe();

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded-full p-1 shadow-xl flex items-center">
            <button
                onClick={() => setVibe("recruiter")}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${vibe === "recruiter" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                    }`}
            >
                {vibe === "recruiter" && (
                    <motion.div
                        layoutId="vibe-active-pill"
                        className="absolute inset-0 bg-neutral-700/80 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                Recruiter
            </button>

            <button
                onClick={() => setVibe("fun")}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${vibe === "fun" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                    }`}
            >
                {vibe === "fun" && (
                    <motion.div
                        layoutId="vibe-active-pill"
                        className="absolute inset-0 bg-pink-500/80 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                Fun
            </button>
        </div>
    );
}
