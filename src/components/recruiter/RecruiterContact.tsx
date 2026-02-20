import React from "react";

export default function RecruiterContact() {
    return (
        <section className="mb-24">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Get in Touch</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Let's build something great.</h3>
                    <p className="mt-1 text-slate-600 text-sm">Always open for new opportunities and interesting projects.</p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <a href="mailto:aranish@asu.edu" className="flex-1 sm:flex-none justify-center inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-slate-900 rounded-lg shadow-sm hover:bg-slate-800 transition">
                        Email Me
                    </a>
                    <a href="https://linkedin.com/in/abhinavranish" target="_blank" className="flex-1 sm:flex-none justify-center inline-flex items-center px-6 py-3 text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition">
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    );
}
