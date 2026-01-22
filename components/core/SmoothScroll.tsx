"use client"

/**
 * SmoothScroll Component
 * 
 * Provides buttery-smooth scrolling experience using Lenis library.
 * Optimized for 60fps performance with proper cleanup and RAF management.
 * 
 * @performance
 * - Uses requestAnimationFrame for smooth updates
 * - Proper cleanup prevents memory leaks
 * - Configurable easing for natural feel
 * - Integrates with Framer Motion scroll animations
 */

import { useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"

/**
 * Lenis configuration for optimal smooth scrolling
 * - duration: Time for scroll animation (lower = snappier)
 * - easing: Custom easing curve for natural deceleration
 * - smoothWheel: Enable smooth wheel scrolling
 * - wheelMultiplier: Scroll speed multiplier
 */
const LENIS_CONFIG = {
  duration: 1.0,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
} as const

interface SmoothScrollProps {
  children: ReactNode
}

/**
 * SmoothScroll wrapper component
 * Initializes Lenis and manages RAF loop for smooth scrolling
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const lenis = new Lenis(LENIS_CONFIG)
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
