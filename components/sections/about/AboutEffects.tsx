"use client"

/**
 * AboutEffects - Decorative visual effect components for the About section.
 *
 * Contains floating particles, animated grid background, and the
 * rotating border trace glow used on the profile card.
 *
 * @module about
 */

import { memo } from "react"
import { motion } from "framer-motion"

export const FloatingParticles = memo(function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, "-20%", "120%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
})

export const AnimatedGrid = memo(function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
})

export const BorderTraceGlow = memo(function BorderTraceGlow() {
  return (
    <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-[-1px]"
        style={{
          background: "conic-gradient(from 0deg, transparent 0%, transparent 70%, hsl(var(--primary) / 0.7) 75%, hsl(var(--accent) / 0.5) 80%, transparent 85%, transparent 100%)",
          borderRadius: "inherit",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[1px] rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-card/90 via-card/70 to-card/80 dark:from-[hsl(var(--card)/0.95)] dark:via-[hsl(var(--card)/0.85)] dark:to-[hsl(var(--card)/0.9)]" />
    </div>
  )
})
