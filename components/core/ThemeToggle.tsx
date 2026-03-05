"use client"

/**
 * ThemeToggle Component
 * 
 * Enhanced animated toggle button for switching between dark and light themes.
 * Features ultra-smooth icon transitions, glow effects, and particle animations.
 * 
 * @accessibility
 * - Keyboard accessible
 * - Screen reader friendly with aria-label
 * - Focus visible states
 */

import { memo, useCallback, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Sparkles } from "lucide-react"
import { useTheme as useNextTheme } from "next-themes"

/**
 * Animation variants for icon transitions
 */
const iconVariants = {
  initial: { 
    scale: 0, 
    rotate: -180, 
    opacity: 0,
    y: 10,
  },
  animate: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    y: 0,
  },
  exit: { 
    scale: 0, 
    rotate: 180, 
    opacity: 0,
    y: -10,
  },
}

/**
 * Spring transition configuration
 */
const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
}

/**
 * Sparkle particle component for theme switch effect
 */
const ThemeSparkle = memo(function ThemeSparkle({ 
  delay, 
  x, 
  y 
}: { 
  delay: number
  x: number
  y: number 
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
      animate={{ 
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        x: x,
        y: y,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
    >
      <Sparkles className="h-3 w-3 text-primary" />
    </motion.div>
  )
})

/**
 * ThemeToggle - Enhanced animated theme switcher button
 */
function ThemeToggleComponent() {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setIsAnimating(true)
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 600)
  }, [resolvedTheme, setTheme])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-secondary/50 animate-pulse" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-full 
                 overflow-hidden
                 bg-gradient-to-br from-secondary/60 to-secondary/40
                 backdrop-blur-md border border-primary/20
                 shadow-lg shadow-primary/10
                 transition-all duration-300
                 hover:border-primary/40 hover:shadow-primary/20
                 focus-visible:outline-none focus-visible:ring-2 
                 focus-visible:ring-primary focus-visible:ring-offset-2"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark 
            ? "radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Rotating ring animation on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          background: "linear-gradient(135deg, transparent 40%, rgba(var(--primary), 0.3) 50%, transparent 60%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />

      {/* Sparkle particles on theme switch */}
      <AnimatePresence>
        {isAnimating && (
          <>
            <ThemeSparkle delay={0} x={-15} y={-15} />
            <ThemeSparkle delay={0.1} x={15} y={-10} />
            <ThemeSparkle delay={0.15} x={-10} y={15} />
            <ThemeSparkle delay={0.2} x={12} y={12} />
          </>
        )}
      </AnimatePresence>

      {/* Icon container with animations */}
      <div className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={springTransition}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sun className="h-5 w-5 text-yellow-400 drop-shadow-lg" />
              </motion.div>
              
              {/* Sun rays animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-1 bg-yellow-400/50 rounded-full"
                    style={{
                      transform: `rotate(${i * 60}deg) translateY(-12px)`,
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      height: ["4px", "6px", "4px"],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={springTransition}
              className="flex items-center justify-center"
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Moon className="h-5 w-5 text-violet-400 drop-shadow-lg" />
              </motion.div>
              
              {/* Stars animation around moon */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-violet-400 rounded-full"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${70 + (i % 2) * 15}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pulse ring on click */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export const ThemeToggle = memo(ThemeToggleComponent)
