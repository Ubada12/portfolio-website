"use client"

/**
 * Hero Component
 * 
 * The main hero section featuring:
 * - Animated gradient background with mouse tracking
 * - Code editor showcase with syntax highlighting
 * - Floating tech icons with parallax effects
 * - Social links and CTA button
 * 
 * @performance
 * - Memoized sub-components for efficient re-renders
 * - Passive event listeners for scroll/mouse tracking
 * - GPU-accelerated transforms via Framer Motion
 * - Optimized spring physics for smooth animations
 */

import { useRef, useState, useEffect, useCallback, memo, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { ArrowDown, Code2, Zap, Download } from "lucide-react"

/** Reusable components */
import { scrollToSection } from "@/lib/utils"
import { MagneticButton } from "@/components/reusable/MagneticButton"
import { HeroAnimatedBackground } from "@/components/sections/hero/HeroAnimatedBackground"
import { FloatingIcon, CodeLine, CODE_LINES, FLOATING_ICONS } from "@/components/sections/hero/HeroCodeEditor"
import { SOCIAL_LINKS, RESUME_PATH } from "@/constants/personal"
import { HERO_CONTENT } from "@/constants/hero"

/**
 * Animation variants for staggered content
 */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

/**
 * SocialLink - Animated social media link button
 */
const SocialLink = memo(function SocialLink({
  social,
  index,
}: {
  social: (typeof SOCIAL_LINKS)[number]
  index: number
}) {
  const Icon = social.icon
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border-2 border-violet-500/30 p-3 sm:p-3.5 text-foreground/60 backdrop-blur-xl bg-violet-500/5 transition-all duration-300 group hover:border-violet-400/60 hover:bg-violet-500/15 hover:text-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
      initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{ delay: 1.2 + index * 0.12, type: "spring", damping: 12 }}
      whileHover={{ scale: 1.2, rotateZ: 10 }}
      whileTap={{ scale: 0.92 }}
    >
      <Icon size={20} className="group-hover:animate-bounce" />
    </motion.a>
  )
})

/**
 * Hero - Main hero section component
 */
function HeroComponent() {
  const containerRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "center start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 1, 0])
  const smoothOpacity = useSpring(opacity, { stiffness: 80, damping: 25 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const floatingIcons = useMemo(
    () =>
      FLOATING_ICONS.map((icon, index) => (
        <FloatingIcon key={index} {...icon} index={index} />
      )),
    []
  )

  const codeLines = useMemo(
    () =>
      CODE_LINES.map((line, index) => (
        <CodeLine key={index} line={line} index={index} />
      )),
    []
  )

  const socialLinks = useMemo(
    () =>
      SOCIAL_LINKS.map((social, index) => (
        <SocialLink key={social.label} social={social} index={index} />
      )),
    []
  )

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] overflow-x-clip px-3 sm:px-6 md:px-8"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <HeroAnimatedBackground />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
          }}
        />

        <motion.div
          className="absolute -top-32 -right-32 h-40 w-40 sm:h-64 sm:w-64 lg:h-96 lg:w-96 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/10 blur-3xl sm:blur-[100px]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-40 w-40 sm:h-64 sm:w-64 lg:h-96 lg:w-96 rounded-full bg-gradient-to-tl from-cyan-500/20 to-blue-500/10 blur-3xl sm:blur-[100px]"
          animate={{ scale: [1.4, 1, 1.4], opacity: [0.6, 0.3, 0.6], x: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 hidden lg:block h-80 w-80 rounded-full bg-gradient-to-l from-pink-500/15 to-rose-500/10 blur-3xl"
          animate={{ scale: [1, 1.5, 1], x: [0, 80, 0], y: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main hero content - centered in viewport with top breathing room */}
      <div className="min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] flex items-center py-8 sm:py-12 md:py-16">
        <motion.div
          style={{ y, opacity: smoothOpacity }}
          className="relative mx-auto grid w-full max-w-7xl gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 px-0 z-10"
        >
          <motion.div
            className="text-center lg:text-left space-y-6 sm:space-y-8 md:space-y-10"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", damping: 15 }}
              className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-violet-500/30 bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-cyan-500/10 px-4 py-2 sm:px-5 sm:py-2.5 backdrop-blur-xl shadow-lg shadow-violet-500/10 lg:mx-0 group hover:border-violet-400/60 transition-all duration-300"
            >
              <motion.span
                className="relative flex h-2 w-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
              </motion.span>
              <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {HERO_CONTENT.badge}
              </span>
            </motion.div>

            <div className="space-y-3 sm:space-y-4 overflow-hidden">
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="leading-tight">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading">
                  <motion.span className="block leading-tight">{HERO_CONTENT.titleLines[0]}</motion.span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="leading-tight"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    {HERO_CONTENT.titleLines[1]}
                  </span>
                  <span className="text-foreground"> &</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="leading-tight"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter font-heading bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {HERO_CONTENT.titleLines[2]}
                </h1>
              </motion.div>
            </div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="hidden lg:block h-1 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mx-auto text-sm sm:text-base md:text-lg leading-relaxed lg:mx-0 max-w-lg text-foreground/70 font-medium"
            >
              {HERO_CONTENT.descriptionPrefix}{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-bold">
                {HERO_CONTENT.descriptionHighlight}
              </span>{" "}
              {HERO_CONTENT.descriptionSuffix}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col items-center gap-4 sm:gap-6 lg:justify-start pt-2"
            >
              <div className="flex items-center gap-3">
                <MagneticButton>
                  <motion.button
                    type="button"
                    onClick={() => scrollToSection("#contact")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-6 sm:px-8 py-3 sm:py-4 font-bold text-white shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-all duration-300 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative flex items-center gap-2">
                      <Zap size={18} className="group-hover:animate-pulse" />
                      {HERO_CONTENT.ctaText}
                      <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </MagneticButton>

                <motion.a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Resume"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group lg:hidden"
                >
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--primary), var(--accent), #06B6D4, var(--primary))", backgroundSize: "300% 100%" }}
                  />

                  <span className="relative z-10 flex items-center gap-2 rounded-full bg-background px-5 sm:px-6 py-3 sm:py-4 font-bold text-sm transition-all">
                    <motion.span className="relative flex h-2 w-2">
                      <motion.span
                        animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                      />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </motion.span>

                    <span className="bg-gradient-to-r from-foreground to-foreground bg-clip-text transition-all group-hover:from-primary group-hover:to-accent group-hover:text-transparent">
                      {HERO_CONTENT.resumeLabel}
                    </span>

                    <motion.span animate={{ y: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <Download className="h-4 w-4 transition-colors group-hover:text-primary" />
                    </motion.span>
                  </span>
                </motion.a>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">{socialLinks}</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.7, duration: 0.9, type: "spring", damping: 15 }}
            className="relative hidden lg:flex lg:items-center lg:justify-center"
          >
            {floatingIcons}

            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 shadow-2xl shadow-violet-500/25 backdrop-blur-2xl"
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(139, 92, 246, 0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                background: "linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(20, 20, 40, 0.85))",
                borderColor: "rgba(139, 92, 246, 0.4)",
              }}
            >
              <div className="flex items-center justify-between border-b border-violet-500/20 bg-gradient-to-r from-violet-500/10 to-cyan-500/5 px-6 py-4">
                <div className="flex gap-3">
                  <motion.div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" whileHover={{ scale: 1.3, rotate: 180 }} />
                  <motion.div className="h-3 w-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" whileHover={{ scale: 1.3, rotate: 180 }} />
                  <motion.div className="h-3 w-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" whileHover={{ scale: 1.3, rotate: 180 }} />
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-violet-500/10 px-4 py-1.5 border border-violet-500/20">
                  <Code2 className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-xs font-semibold text-violet-300">developer.ts</span>
                </div>
              </div>

              <div className="space-y-0.5 p-6 font-mono text-xs sm:text-sm">
                {codeLines}

                <motion.div className="mt-3 flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
                  <span className="mr-4 w-6 text-right text-muted-foreground/40 select-none">11</span>
                  <motion.span
                    className="inline-block h-6 w-2.5 rounded-sm bg-gradient-to-b from-violet-400 to-cyan-400 shadow-lg shadow-violet-500/50"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-violet-500/5 via-transparent to-cyan-500/5"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent"
              animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -top-12 -left-12 h-40 w-40 rounded-full border-2 border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent"
              animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0], opacity: [0.6, 0.3, 0.6] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <motion.span
            className="text-xs font-semibold text-foreground/50 group-hover:text-violet-400 transition-colors"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {HERO_CONTENT.scrollText}
          </motion.span>
          <motion.div
            className="p-2 rounded-full border-2 border-violet-500/30 bg-violet-500/10 group-hover:border-violet-400/60 group-hover:bg-violet-500/20 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowDown size={20} className="text-violet-400 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="h-[40vh]" />
    </section>
  )
}

export const Hero = memo(HeroComponent)
