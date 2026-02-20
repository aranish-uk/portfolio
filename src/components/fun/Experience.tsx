"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import experiences from "@/components/data/experience.json"
import { ChevronDown, ChevronUp } from "lucide-react"

type Experience = {
  title: string
  organization: string
  duration: string
  description: string[]
  image: string
}

export default function Experience() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll
    ? (experiences as Experience[])
    : (experiences as Experience[]).slice(0, 3)

  return (
    <div className="min-h-screen px-6 py-16 bg-neutral-900 text-gray-100">
      <div className="max-w-5xl mx-auto relative">
        {/* Center timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-400 via-gray-700 to-pink-400 transform -translate-x-1/2" />

        {visible.map((e, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={i}
              className={`mb-16 flex items-center justify-between w-full ${
                isLeft ? "flex-row" : "flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-neutral-800 p-6 rounded-xl shadow-md hover:shadow-pink-500/20 transition-all duration-300 w-[45%] group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={e.image}
                      alt={e.title}
                      fill
                      className="rounded-full object-cover border border-gray-600"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pink-300">{e.title}</h3>
                    <p className="text-gray-300">{e.organization}</p>
                    <p className="text-sm text-gray-400">{e.duration}</p>
                  </div>
                </div>

                {/* Description – preview by default, expand on hover */}
                <ul
                  className="
                    text-gray-300 text-sm leading-relaxed 
                    max-h-[24px] overflow-hidden group-hover:max-h-[500px] 
                    transition-[max-height] duration-500 ease-in-out space-y-2
                  "
                >
                  {e.description.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </motion.div>

              {/* Connector dot */}
              <div className="w-8 h-8 rounded-full bg-pink-400 border-4 border-gray-900 shadow-lg z-10" />

              {/* Opposite empty side */}
              <div className="w-[45%]" />
            </motion.div>
          )
        })}

        {/* Toggle Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-gray-200"
          >
            {showAll ? (
              <>
                <ChevronUp size={18} /> Show Less
              </>
            ) : (
              <>
                <ChevronDown size={18} /> Show More
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
