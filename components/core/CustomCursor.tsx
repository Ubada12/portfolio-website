"use client"

/**
 * CustomCursor Component
 * 
 * A high-performance custom cursor with magnetic hover effects.
 * Uses optimized spring physics for ultra-smooth cursor tracking.
 * Only renders on desktop devices (min-width: 768px).
 * 
 * @performance
 * - Uses RAF-optimized motion values for 60fps tracking
 * - Leverages GPU-accelerated transforms via Framer Motion
 * - Minimal re-renders through motion value subscriptions
 * - Event delegation for efficient hover state management
 */

import { useEffect, useState, useCallback, memo } from "react"
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion"
import { useTheme } from "@/components/core/ThemeProvider"

/**
 * Spring configuration for cursor movement
 * Higher stiffness = faster response, higher damping = less overshoot
 */
const SPRING_CONFIG = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
} as const

/**
 * Spring configuration for hover state transitions
 */
const HOVER_SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
}

/**
 * Cursor size constants
 */
const CURSOR_SIZES = {
  default: 24,
  hover: 60,
  dot: 8,
} as const

/**
 * Inner cursor dot component - follows mouse directly without spring
 * Separated for performance optimization
 */
const CursorDot = memo(function CursorDot({
  x,
  y,
  isVisible,
  color,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  isVisible: boolean
  color: string
}) {
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        className="relative -left-1 -top-1 rounded-full"
        style={{
          width: CURSOR_SIZES.dot,
          height: CURSOR_SIZES.dot,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          backgroundColor: color,
        }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  )
})

/**
 * Main cursor ring component - follows with spring physics
 * Expands on interactive element hover
 */
const CursorRing = memo(function CursorRing({
  x,
  y,
  isVisible,
  isHovering,
  color,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  isVisible: boolean
  isHovering: boolean
  color: string
}) {
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        className="relative -left-3 -top-3 rounded-full mix-blend-difference"
        animate={{
          width: isHovering ? CURSOR_SIZES.hover : CURSOR_SIZES.default,
          height: isHovering ? CURSOR_SIZES.hover : CURSOR_SIZES.default,
          opacity: isVisible ? 0.8 : 0,
          backgroundColor: color,
        }}
        transition={HOVER_SPRING_CONFIG}
      />
    </motion.div>
  )
})

/**
 * CustomCursor - Main exported component
 * Renders a custom cursor that replaces the default system cursor
 */
function CustomCursorComponent() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const cursorXSpring = useSpring(cursorX, SPRING_CONFIG)
  const cursorYSpring = useSpring(cursorY, SPRING_CONFIG)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    },
    [cursorX, cursorY, isVisible]
  )

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const interactiveSelector = "a, button, [data-cursor-hover], input, textarea, [role='button']"
    
    const setupHoverListeners = () => {
      const elements = document.querySelectorAll(interactiveSelector)
      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
      return elements
    }

    const elements = setupHoverListeners()

    const observer = new MutationObserver(() => {
      setupHoverListeners()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      observer.disconnect()
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave])

  const cursorColor = theme === "light" ? "#000000" : "#a855f7"
  const dotColor = theme === "light" ? "#ffffff" : "#ffffff"

  return (
    <>
      <CursorRing
        x={cursorXSpring}
        y={cursorYSpring}
        isVisible={isVisible}
        isHovering={isHovering}
        color={cursorColor}
      />
      <CursorDot
        x={cursorX}
        y={cursorY}
        isVisible={isVisible}
        color={dotColor}
      />
    </>
  )
}

export const CustomCursor = memo(CustomCursorComponent)
