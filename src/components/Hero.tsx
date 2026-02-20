import React from "react";
import Image from "next/image";

export default function RecruiterHero() {
    return (
        <header className="mb-20 relative animate-fadeIn">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center md:items-start md:flex-row gap-16">
                <div className="shrink-0 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                    <Image
                        src="/me.png"
                        alt="Abhinav Ranish"
                        width={180}
                        height={180}
                        className="relative rounded-full object-cover border-2 border-white/10 shadow-2xl h-[180px] w-[180px]"
                        priority
                    />
                </div>

                <div className="text-center md:text-left flex flex-col justify-center">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 animate-pulse">
                        Abhinav Ranish 🚀
                    </h1>
                    <p className="mt-4 text-xl font-medium text-pink-400 tracking-wide">
                        Code Magician &bull; Cyber Ninja &bull; AI Whisperer
                    </p>
                    <p className="mt-4 text-zinc-300 max-w-4xl leading-relaxed text-lg font-light">
                        Welcome to the playground! I build crazy fast, highly secure, and ridiculously intelligent systems. Click around, catch the balloon kid, and let's make some magic. ✨
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                        <a
                            href="/Resume.pdf"
                            target="_blank"
                            className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out bg-zinc-900 border border-zinc-700 rounded-xl hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Resume (PDF)
                            </span>
                        </a>

                        {[
                            { name: "GitHub", url: "https://github.com/abhinavranish", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg> },
                            { name: "LinkedIn", url: "https://linkedin.com/in/abhinavranish", icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg> },
                            { name: "Email", url: "mailto:aranish@asu.edu", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> }
                        ].map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target={link.name !== "Email" ? "_blank" : undefined}
                                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-zinc-300 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:text-white hover:border-zinc-600 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 ease-in-out"
                            >
                                {link.icon}
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
