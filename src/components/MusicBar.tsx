'use client'

import { motion } from 'framer-motion'
import { Music2 } from 'lucide-react'
import { useState } from 'react'

export default function MusicBar() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        width: hovered ? 420 : 64,
        height: hovered ? 100 : 64,
        borderRadius: hovered ? 24 : 32
      }}
      transition={{ duration: 0.4, ease: 'backOut' }}
      className={`fixed bottom-6 right-6 z-50 overflow-hidden flex items-center shadow-2xl transition-colors duration-300 ${hovered
        ? 'bg-transparent border-transparent'
        : 'bg-zinc-900/60 backdrop-blur-xl border border-white/10 cursor-pointer hover:bg-zinc-800/80 hover:border-pink-500/50'
        }`}
    >
      {/* Persistent iframe */}
      <iframe
        src="https://music.aranish.uk/miniplayer"
        title="Music Player"
        allow="autoplay"
        className={`absolute inset-0 h-full w-full border-none transition-opacity duration-500 ${hovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      {/* Icon always on top */}
      {!hovered && (
        <div className="absolute left-3 w-10 h-10 flex items-center justify-center text-red-300 pointer-events-none">
          <Music2 className="w-6 h-6" />
        </div>
      )}
    </motion.div>
  )
}
