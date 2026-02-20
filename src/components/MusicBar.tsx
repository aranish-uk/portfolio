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
      animate={{ width: hovered ? 280 : 64 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed bottom-17 right-4 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex items-center z-50 overflow-hidden"
    >
      {/* Persistent iframe */}
      <iframe
        src="https://music.aranish.uk/miniplayer"
        title="Music Player"
        allow="autoplay"
        className={`h-full w-full rounded-full border-none transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
