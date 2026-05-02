"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, Sun } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isOldUI = pathname.startsWith("/old");

  const scrollToId = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const getHeading = () => {
    switch (pathname) {
      case "/projects": return "Personal Projects";
      case "/contact": return "Send Fan Mail";
      case "/experience": return "Experience";
      default: return "Abhinav Ranish";
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`
        fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-50
        w-[90%] md:w-[70%] max-w-5xl
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        px-6 py-4
        ${menuOpen ? "rounded-3xl" : "rounded-full"}
      `}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-white/5 to-transparent opacity-50 blur-md -z-10 pointer-events-none" />

      {/* Desktop & Mobile Header Content */}
      <div className="flex items-center justify-between">

        {/* Left Side: Logo & Header */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
            <Image
              src="/favicon.ico"
              alt="logo"
              width={36}
              height={36}
              className="relative rounded-full ring-2 ring-white/10"
            />
          </Link>

          <button
            className="font-semibold text-lg tracking-tight text-white hover:text-pink-300 transition-colors"
            onClick={() => !isOldUI && scrollToId("hero")}
            aria-label="Scroll to Hero"
          >
            {getHeading()}
          </button>
        </div>

        {/* Desktop Links (Hidden on small screens) */}
        <div className="hidden md:flex space-x-8 items-center">
          {!isOldUI ? (
            <>
              {["experience", "projects", "research", "contact"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors capitalize tracking-wide group relative"
                >
                  {id === "contact" ? "Connect" : id.replace("-", " ")}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 transition-all group-hover:w-full"></span>
                </button>
              ))}
            </>
          ) : (
            <>
              {["projects", "experience", "contact", "qa"].map((path) => (
                <Link
                  key={path}
                  href={`/old/${path}`}
                  scroll={false}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition-colors capitalize tracking-wide group relative"
                >
                  {path === "contact" ? "Connect" : path === "qa" ? "Mr Robot" : path}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 transition-all group-hover:w-full"></span>
                </Link>
              ))}
              <Link
                href="/"
                scroll={false}
                className="ml-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 text-sm font-medium flex items-center gap-2 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
              >
                <Sun size={16} /> New UI
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-300 p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Links Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-6 overflow-hidden border-t border-white/10"
          >
            <div className="flex flex-col space-y-4 py-6 px-2 text-left">
              {!isOldUI ? (
                <>
                  {["experience", "projects", "research", "contact"].map((id) => (
                    <button
                      key={id}
                      onClick={() => { scrollToId(id); setMenuOpen(false); }}
                      className="text-lg font-medium text-zinc-300 hover:text-white transition-colors capitalize tracking-wide w-full text-left"
                    >
                      {id === "contact" ? "Connect" : id}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <Link href="/old" className="text-lg font-medium text-zinc-300 hover:text-white transition-colors w-full" onClick={() => setMenuOpen(false)}>Home</Link>
                  <Link href="/old/projects" className="text-lg font-medium text-zinc-300 hover:text-white transition-colors w-full" onClick={() => setMenuOpen(false)}>Projects</Link>
                  <Link href="/old/experience" className="text-lg font-medium text-zinc-300 hover:text-white transition-colors w-full" onClick={() => setMenuOpen(false)}>Experience</Link>
                  <Link href="/old/contact" className="text-lg font-medium text-zinc-300 hover:text-white transition-colors w-full" onClick={() => setMenuOpen(false)}>Connect</Link>
                  <Link href="/old/qa" className="text-lg font-medium text-zinc-300 hover:text-white transition-colors w-full" onClick={() => setMenuOpen(false)}>Mr Robot</Link>
                  <Link href="/" className="mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg" onClick={() => setMenuOpen(false)}>
                    <Sun size={20} /> New UI
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
