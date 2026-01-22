"use client"

/**
 * MarqueeText Component
 * 
 * Creates an infinite scrolling text marquee effect.
 * Uses CSS animations for optimal performance.
 * 
 * @performance
 * - CSS-based animation (no JS overhead)
 * - GPU-accelerated transforms
 * - Duplicated content for seamless loop
 */

import { memo, type ReactNode } from "react"
import { motion } from "framer-motion"

interface MarqueeTextProps {
  /** Content to display in marquee */
  children: ReactNode
  /** Animation duration in seconds */
  duration?: number
  /** Direction: left (default) or right */
  direction?: "left" | "right"
  /** Additional CSS classes */
  className?: string
  /** Pause on hover */
  pauseOnHover?: boolean
}

/**
 * MarqueeText - Infinite horizontal scrolling text
 */
function MarqueeTextComponent({
  children,
  duration = 20,
  direction = "left",
  className = "",
  pauseOnHover = true,
}: MarqueeTextProps) {
  const translateDirection = direction === "left" ? "-50%" : "0%"
  const translateReset = direction === "left" ? "0%" : "-50%"

  return (
    <div 
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <motion.div
        className={`inline-flex ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        animate={{ x: [translateReset, translateDirection] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
      </motion.div>
    </div>
  )
}

export const MarqueeText = memo(MarqueeTextComponent)
