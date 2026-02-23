import React from "react";
import { Mail, Linkedin, ArrowRight } from "lucide-react";

export default function RecruiterContact() {
    return (
        <section id="contact" className="mb-32 relative animate-fadeIn scroll-mt-32 md:scroll-mt-40" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 p-[1px] rounded-3xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
                <div className="bg-[#0a0a0a] rounded-[23px] h-full p-8 md:p-12 border border-white/5 relative overflow-hidden group">
                    {/* Animated hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-xl">
                            <Mail className="w-6 h-6 text-pink-400" />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                            Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">great.</span>
                        </h2>

                        <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
                            Always open for new opportunities, challenging projects, and collaborative ventures. Reach out, and let's make an impact.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                            <a
                                href="mailto:aranish@asu.edu"
                                className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-300 ease-in-out bg-zinc-900 border border-zinc-700 rounded-xl hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] overflow-hidden w-full sm:w-auto"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                                <span className="relative z-10 flex items-center gap-2">
                                    Send an Email
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </a>

                            <a
                                href="https://linkedin.com/in/abhinavranish"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-zinc-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 ease-in-out w-full sm:w-auto"
                            >
                                <Linkedin className="w-4 h-4 mr-2" />
                                Connect to Network
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
