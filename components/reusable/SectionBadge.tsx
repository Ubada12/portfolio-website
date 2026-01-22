"use client"

/**
 * SectionBadge Component
 * 
 * A styled badge for section headers with index number and icon.
 * Used consistently across all page sections for visual hierarchy.
 * 
 * @performance
 * - Memoized for efficient re-renders
 * - Uses CSS transitions instead of JS animations for simple effects
 */

import { memo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionBadgeProps {
  index: number
  label: string
  icon: React.ReactNode
  className?: string
}

/**
 * SectionBadge - Numbered badge for section headers
 */
function SectionBadgeComponent({ index, label, icon, className }: SectionBadgeProps) {
  const formattedIndex = index.toString().padStart(2, "0")

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={cn("flex justify-center mb-6", className)}
    >
      <div
        className="
          group flex items-center gap-2 px-4 py-1.5 rounded-full
          border border-purple-500/30 bg-purple-500/5
          backdrop-blur shadow-[0_0_0_0_rgba(168,85,247,0.0)]
          transition-all duration-300
          dark:border-purple-400/30 dark:bg-purple-400/5
          hover:shadow-[0_0_20px_-6px_rgba(168,85,247,0.45)]
        "
      >
        <span
          className="
            flex items-center justify-center w-6 h-6 rounded-full
            border border-purple-500/40 text-purple-500
            dark:border-purple-400/40 dark:text-purple-400
          "
        >
          {icon}
        </span>

        <span
          className="
            text-[11px] font-medium tracking-[0.35em] uppercase
            text-purple-600 dark:text-purple-300
          "
        >
          {formattedIndex} · {label}
        </span>
      </div>
    </motion.div>
  )
}

export const SectionBadge = memo(SectionBadgeComponent)
