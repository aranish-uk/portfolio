import React from "react";

const skillGroups = [
  {
    label: "Frontend + Languages",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Python",
      "Java",
      "C++",
      "C",
      "Rust",
      "Tailwind CSS",
      "Angular",
    ],
  },
  {
    label: "Backend + Cloud",
    skills: [
      "Node.js",
      "Docker",
      "AWS",
      "Azure",
      "GCP",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Heroku",
    ],
  },
  {
    label: "Security + Tools",
    skills: [
      "Git",
      "Linux",
      "Bash",
      "Burp Suite",
      "Metasploit",
      "Nmap",
      "Wireshark",
      "Splunk",
      "Jira",
    ],
  },
  {
    label: "AI / ML",
    skills: ["PyTorch", "Ollama", "InsightFace", "RAG", "FAISS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mb-24 animate-fadeIn scroll-mt-32 md:scroll-mt-40" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-semibold text-white">Technical Range</h2>
        <p className="hidden max-w-sm text-right text-sm text-zinc-500 md:block">
          A compact view of the stack behind the shipped work.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label} className="border border-white/10 bg-white/[0.03] p-5 transition duration-200 hover:-translate-y-1 hover:border-pink-400/40">
            <h3 className="mb-4 font-mono text-sm text-pink-300">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-white/10 bg-zinc-950 px-2.5 py-1 text-sm text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
