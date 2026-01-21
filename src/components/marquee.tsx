"use client"

import { motion } from "motion/react"

interface MarqueeProps {
  text: string
  duration?: number
  className?: string
}

export function Marquee({ text, duration = 12, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        <span className="text-4xl md:text-4xl font-bold uppercase tracking-wider mx-8">{text}</span>
        <span className="text-4xl md:text-4xl font-bold uppercase tracking-wider mx-8">{text}</span>
      </motion.div>
    </div>
  )
}
