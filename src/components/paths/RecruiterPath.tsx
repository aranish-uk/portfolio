"use client";

import React from "react";

export default function RecruiterPath() {
    return (
        <div className="min-h-screen bg-white text-slate-900 mx-auto px-6 py-12 md:py-24 max-w-4xl">
            <header className="mb-16">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Abhinav Ranish</h1>
                <p className="mt-4 text-lg text-slate-600 font-medium">Software Engineer • Cybersecurity • AI/ML</p>
                <div className="mt-6 flex flex-wrap gap-4">
                    <a href="/Resume.pdf" target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition">
                        Resume (PDF)
                    </a>
                    <a href="https://github.com/abhinavranish" target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
                        GitHub
                    </a>
                    <a href="https://linkedin.com/in/abhinavranish" target="_blank" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
                        LinkedIn
                    </a>
                    <a href="mailto:aranish@asu.edu" className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg hover:bg-slate-200 transition">
                        Email
                    </a>
                </div>
            </header>

            {/* Sections will be added here */}
            <section className="mb-16">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Experience</h2>
                <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 text-slate-500">
                    Experience section placeholder
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Projects</h2>
                <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 text-slate-500">
                    Projects section placeholder
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Skills</h2>
                <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 text-slate-500">
                    Skills section placeholder
                </div>
            </section>
        </div>
    );
}
