"use client"

/**
 * HeroCodeEditor - Code editor sub-components for the Hero section.
 *
 * Contains the floating tech icons and syntax-highlighted code lines
 * used in the desktop code editor showcase.
 *
 * @module hero
 */

import { memo } from "react"
import { motion } from "framer-motion"
import { Code2, Terminal, Braces, Database, Sparkles } from "lucide-react"

import { CODE_EDITOR_CONTENT } from "@/constants/hero"

export const CODE_LINES = CODE_EDITOR_CONTENT.lines

export const FLOATING_ICONS = [
  { Icon: Code2, delay: 0, x: -20, y: -40 },
  { Icon: Terminal, delay: 0.2, x: 280, y: -20 },
  { Icon: Braces, delay: 0.4, x: 300, y: 200 },
  { Icon: Database, delay: 0.6, x: -30, y: 180 },
  { Icon: Sparkles, delay: 0.8, x: 140, y: -50 },
] as const

export const FloatingIcon = memo(function FloatingIcon({
  Icon,
  delay,
  x,
  y,
  index,
}: {
  Icon: typeof Code2
  delay: number
  x: number
  y: number
  index: number
}) {
  return (
    <motion.div
      className="absolute z-20"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ delay: delay + 1.2, type: "spring", damping: 12 }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 8, -8, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3.5 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-2xl border-2 p-4 shadow-2xl shadow-violet-500/30 backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05))",
          borderColor: "rgba(139, 92, 246, 0.3)",
        }}
      >
        <Icon className="h-6 w-6 text-violet-400 drop-shadow-lg" />
      </motion.div>
    </motion.div>
  )
})

export const CodeLine = memo(function CodeLine({
  line,
  index,
}: {
  line: (typeof CODE_LINES)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 + index * 0.08, type: "spring" }}
      className="flex items-center group"
    >
      <span className="mr-4 w-6 text-right text-muted-foreground/40 select-none group-hover:text-violet-400/60 transition-colors">
        {String(index + 1).padStart(2, "0")}
      </span>
      <motion.span
        className={`${line.color} font-semibold`}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 2.5, delay: index * 0.2, repeat: Infinity }}
      >
        {line.text}
      </motion.span>
    </motion.div>
  )
})
