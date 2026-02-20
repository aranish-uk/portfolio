import React from "react";
import projectsData from "@/components/data/projects.json";

export default function RecruiterProjects() {
    // Take the top 4 projects for recruiters (they represent the most impactful ones)
    const topProjects = projectsData.slice(0, 4);

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topProjects.map((p, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm flex flex-col h-full hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                            {p.web ? (
                                <a href={p.web} target="_blank" className="text-slate-500 hover:text-slate-900 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                            ) : null}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">{p.description}</p>
                        <div className="mt-auto">
                            <div className="flex justify-between items-end">
                                <div className="flex flex-wrap gap-2 truncate">
                                    {p.technologies?.slice(0, 4).map(tech => (
                                        <span key={tech} className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                    {(p.technologies?.length || 0) > 4 && (
                                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                                            +{(p.technologies?.length || 0) - 4}
                                        </span>
                                    )}
                                </div>
                                {p.visit && (
                                    <a href={p.visit} target="_blank" className="ml-4 shrink-0 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800 transition">
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center">
                <a href="https://github.com/Abhinav-ranish" target="_blank" className="text-sm font-medium text-slate-600 hover:text-slate-900 inline-flex items-center group">
                    View all 20+ projects on GitHub
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </a>
            </div>
        </section>
    );
}
