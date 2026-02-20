// app/components/Hero.tsx
"use client"

import Image from "next/image"
import { AIChat } from "./AIChat"

export function Hero() {
  return (
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
      {/* Left: photo + name + intro */}
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
      {/* Profile photo with gradient backdrop and hover ring effect */}
      <div className="relative w-40 h-40 mb-6 group">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 blur-lg opacity-60"></div>
        <Image
        src="/me.png" // replace with your photo in /public
        alt="Abhinav Ranish"
        fill
        className="rounded-full object-cover border-1 border-pink-500 shadow-lg ring-4 ring-pink-400 group-hover:ring-pink-300 transition duration-300"
        priority
        />
      </div>

        {/* Name + tagline */}
        <h1 className="text-4xl md:text-6xl font-bold">Abhinav Ranish</h1>
        <p className="mt-4 text-lg text-neutral-400">
          Software Engineer • Cybersecurity • AI/ML
        </p>
      </div>

      {/* Right: AI chat */}
      <div className="flex-1">
        <AIChat />
      </div>
    </div>
  )
}
