"use client"

/**
 * MagneticButton Component
 * 
 * Creates a magnetic hover effect where the element follows the cursor
 * when hovering near it. Uses optimized spring physics for smooth motion.
 * 
 * @performance
 * - Memoized to prevent unnecessary re-renders
 * - Uses RAF-friendly motion values
 * - Optimized spring configuration for 60fps
 * 
 * @usage
 * <MagneticButton>
 *   <button>Click me</button>
 * </MagneticButton>
 */

import { useRef, useState, useCallback, memo, type ReactNode, type MouseEvent } from "react"
import { motion } from "framer-motion"

/**
 * Spring physics configuration for magnetic effect
 * - stiffness: How quickly it snaps back (higher = faster)
 * - damping: How much it resists motion (higher = less bounce)
 * - mass: Affects momentum (lower = more responsive)
 */
const MAGNETIC_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 350,
  damping: 15,
  mass: 0.5,
} as const

/**
 * Magnetic strength multiplier
 * Lower values = subtle effect, higher = stronger pull
 */
const MAGNETIC_STRENGTH = 0.3

interface MagneticButtonProps {
  children: ReactNode
  /** Optional className for the wrapper */
  className?: string
  /** Magnetic strength multiplier (default: 0.3) */
  strength?: number
  /** Whether the effect is disabled */
  disabled?: boolean
}

/**
 * MagneticButton - Adds magnetic cursor-following effect to children
 */
function MagneticButtonComponent({
  children,
  className = "",
  strength = MAGNETIC_STRENGTH,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return

      const { clientX, clientY } = e
      const { height, width, left, top } = ref.current.getBoundingClientRect()
      
      const centerX = left + width / 2
      const centerY = top + height / 2
      
      const deltaX = (clientX - centerX) * strength
      const deltaY = (clientY - centerY) * strength
      
      setPosition({ x: deltaX, y: deltaY })
    },
    [disabled, strength]
  )

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={MAGNETIC_SPRING_CONFIG}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

export const MagneticButton = memo(MagneticButtonComponent)
