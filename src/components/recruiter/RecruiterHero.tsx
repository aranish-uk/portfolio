import React from "react";
import Image from "next/image";

export default function RecruiterHero() {
    return (
        <header className="mb-20 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="shrink-0">
                <Image
                    src="/me.png"
                    alt="Abhinav Ranish"
                    width={160}
                    height={160}
                    className="rounded-full object-cover border border-slate-200 shadow-md h-40 w-40"
                    priority
                />
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Abhinav Ranish</h1>
                <p className="mt-4 text-lg text-slate-600 font-medium">Software Engineer • Cybersecurity • AI/ML</p>
                <p className="mt-3 text-slate-500 max-w-2xl leading-relaxed">
                    Building secure, intelligent systems with speed, scale, and creativity. Passionate about applying modern technologies to complex, real-world problems.
                </p>
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                    <a href="/Resume.pdf" target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition">
                        Resume (PDF)
                    </a>
                    <a href="https://github.com/abhinavranish" target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition">
                        GitHub
                    </a>
                    <a href="https://linkedin.com/in/abhinavranish" target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition">
                        LinkedIn
                    </a>
                    <a href="mailto:aranish@asu.edu" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition">
                        Email
                    </a>
                </div>
            </div>
        </header>
    );
}
