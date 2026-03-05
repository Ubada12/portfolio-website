"use client"

/**
 * TextReveal Component
 * 
 * Animated text reveal with staggered character or word appearance.
 * Supports both `text` prop (for character animation) and `children` (for simple fade-in).
 * 
 * @performance
 * - Memoized character spans to prevent re-creation
 * - Uses CSS transforms for GPU acceleration
 * - Optimized stagger timing for 60fps
 */

import { memo, useMemo, ReactNode, useRef } from "react"
import { motion, type Variants, useInView } from "framer-motion"

/**
 * Animation variants for individual characters
 */
const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export interface TextRevealProps {
  /** Text content to animate (character-by-character) */
  text?: string
  /** Children to animate (simple fade-in) */
  children?: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Animation delay in seconds */
  delay?: number
  /** Custom stagger duration between characters */
  staggerDuration?: number
}

/**
 * TextReveal - Reveals text with animation
 * 
 * If `text` prop is provided: character-by-character reveal
 * If `children` prop is provided: simple fade-in animation
 */
function TextRevealComponent({
  text,
  children,
  className = "",
  delay = 0,
  staggerDuration = 0.02,
}: TextRevealProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  const divInView = useInView(divRef, { once: true, margin: "-50px" })
  const spanInView = useInView(spanRef, { once: true, margin: "-50px" })

  // Character-by-character animation for text prop
  const characters = useMemo(() => (text || "").split(""), [text])

  const customContainerVariants: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDuration,
          delayChildren: delay,
        },
      },
    }),
    [staggerDuration, delay]
  )

  // If children are provided (not a text string), render with simple animation
  if (children && !text) {
    return (
      <motion.div
        ref={divRef}
        initial={{ opacity: 0, y: 20 }}
        animate={divInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.span
      ref={spanRef}
      className={`inline-block ${className}`}
      variants={customContainerVariants}
      initial="hidden"
      animate={spanInView ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={characterVariants}
          className="inline-block"
          style={{
            display: char === " " ? "inline" : "inline-block",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export const TextReveal = memo(TextRevealComponent)
