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
        <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Frontend & Languages</h3>
                    <div className="flex flex-wrap gap-2">
                        {mainSkills.map(s => (
                            <span key={s} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md border border-slate-200">{s}</span>
                        ))}
                    </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Backend & Cloud</h3>
                    <div className="flex flex-wrap gap-2">
                        {backendAndCloud.map(s => (
                            <span key={s} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md border border-slate-200">{s}</span>
                        ))}
                    </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Security & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                        {securityAndTools.map(s => (
                            <span key={s} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md border border-slate-200">{s}</span>
                        ))}
                    </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">AI / ML</h3>
                    <div className="flex flex-wrap gap-2">
                        {aiAndMl.map(s => (
                            <span key={s} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-md border border-slate-200">{s}</span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
