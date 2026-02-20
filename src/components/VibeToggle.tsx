"use client";

import { useVibe } from "@/context/VibeContext";
import { motion } from "framer-motion";

export default function VibeToggle() {
    const { vibe, setVibe } = useVibe();

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex items-center p-1.5"
        >
            {/* Outer Glassmorphic Container with animated gradient border simulation */}
            <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                {/* Subtle inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-50 blur-md -z-10" />

                <button
                    onClick={() => setVibe("recruiter")}
                    className={`relative px-6 py-2.5 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 ${vibe === "recruiter"
                            ? "text-white shadow-lg"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                        }`}
                >
                    {vibe === "recruiter" && (
                        <motion.div
                            layoutId="vibe-active-pill"
                            className="absolute inset-0 bg-neutral-800 rounded-full -z-10 border border-neutral-700/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">Recruiter</span>
                </button>

                <button
                    onClick={() => setVibe("fun")}
                    className={`relative px-6 py-2.5 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 ${vibe === "fun"
                            ? "text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                        }`}
                >
                    {vibe === "fun" && (
                        <motion.div
                            layoutId="vibe-active-pill"
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">Fun</span>
                </button>
            </div>
        </motion.div>
    );
}
