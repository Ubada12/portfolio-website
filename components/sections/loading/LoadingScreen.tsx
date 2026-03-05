"use client"

/**
 * LoadingScreen Component
 *
 * Minimal logo reveal splash screen. The JD logo fades in from blur,
 * a gradient line traces beneath it, and everything exits upward.
 * Total duration ~1.5 s — no percentage indicator, no terminal.
 *
 * Theme-aware: uses CSS custom properties for colors.
 * Responsive: scales logo and spacing across breakpoints.
 */

import { useEffect, memo } from "react"
import { motion } from "framer-motion"
import { LOGO_TEXT } from "@/constants/personal"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

function LoadingScreenComponent({ onLoadingComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onLoadingComplete, 1500)
    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/[0.04] dark:bg-primary/[0.08] blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.2] }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 scale-150 rounded-3xl bg-primary/20 blur-3xl"
          />

          <span className="relative z-10 font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
            {LOGO_TEXT}
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 sm:mt-5 h-[1.5px] w-16 sm:w-20 origin-center rounded-full bg-gradient-to-r from-primary via-accent to-primary"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="mt-4 sm:mt-5 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium text-muted-foreground/60 dark:text-foreground/70 dark:font-semibold"
        >
          Portfolio
        </motion.p>
      </div>
    </motion.div>
  )
}

export const LoadingScreen = memo(LoadingScreenComponent)
