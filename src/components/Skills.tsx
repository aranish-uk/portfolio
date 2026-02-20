import React from "react";

const mainSkills = [
    "React", "Next.js", "TypeScript", "Python", "Java", "C++", "C", "Rust",
    "HTML5", "JavaScript", "Tailwind CSS", "Angular"
];

const backendAndCloud = [
    "Node.js", "Docker", "AWS", "Azure", "GCP", "PostgreSQL", "MongoDB", "Supabase", "Heroku"
];

const securityAndTools = [
    "Git", "Linux", "Bash", "Burp Suite", "Metasploit", "Nmap", "Wireshark", "Splunk", "Jira"
];

const aiAndMl = [
    "PyTorch", "Ollama", "InsightFace"
];

export default function RecruiterSkills() {
    return (
        <section className="mb-24 relative animate-fadeIn" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-white">Technical Arsenal</h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Frontend & Languages Bento */}
                <div className="group relative border border-white/10 rounded-2xl p-6 bg-zinc-900/30 backdrop-blur-sm shadow-xl hover:bg-zinc-900/50 transition duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <h3 className="relative z-10 font-mono text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                        Frontend & Languages
                    </h3>
                    <div className="relative z-10 flex flex-wrap gap-2.5">
                        {mainSkills.map(s => (
                            <span key={s} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-medium rounded-lg border border-white/5 hover:border-purple-500/50 hover:text-white transition cursor-default">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Backend & Cloud Bento */}
                <div className="group relative border border-white/10 rounded-2xl p-6 bg-zinc-900/30 backdrop-blur-sm shadow-xl hover:bg-zinc-900/50 transition duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <h3 className="relative z-10 font-mono text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Backend & Cloud
                    </h3>
                    <div className="relative z-10 flex flex-wrap gap-2.5">
                        {backendAndCloud.map(s => (
                            <span key={s} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-medium rounded-lg border border-white/5 hover:border-blue-500/50 hover:text-white transition cursor-default">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Security & Tools Bento */}
                <div className="group relative border border-white/10 rounded-2xl p-6 bg-zinc-900/30 backdrop-blur-sm shadow-xl hover:bg-zinc-900/50 transition duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <h3 className="relative z-10 font-mono text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Security & Tools
                    </h3>
                    <div className="relative z-10 flex flex-wrap gap-2.5">
                        {securityAndTools.map(s => (
                            <span key={s} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-medium rounded-lg border border-white/5 hover:border-emerald-500/50 hover:text-white transition cursor-default">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* AI / ML Bento */}
                <div className="group relative border border-white/10 rounded-2xl p-6 bg-zinc-900/30 backdrop-blur-sm shadow-xl hover:bg-zinc-900/50 transition duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <h3 className="relative z-10 font-mono text-xs font-semibold text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                        AI / ML
                    </h3>
                    <div className="relative z-10 flex flex-wrap gap-2.5">
                        {aiAndMl.map(s => (
                            <span key={s} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-medium rounded-lg border border-white/5 hover:border-pink-500/50 hover:text-white transition cursor-default">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
