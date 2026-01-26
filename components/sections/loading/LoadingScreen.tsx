"use client"

/**
 * LoadingScreen Component
 * 
 * A cinematic boot sequence loading screen with stunning visual effects.
 * Features scanning line, matrix code rain, and impressive animations.
 */

import { useState, useEffect, useCallback, memo, useMemo } from "react"
import { motion, AnimatePresence, delay } from "framer-motion"

const LOADING_PHRASES = [
  { text: "npm install awesomeness", prefix: "$" },
  { text: "Compiling components...", prefix: ">" },
  { text: "Building optimized bundle", prefix: ">" },
  { text: "Initializing creative engine", prefix: ">" },
  { text: "Loading developer superpowers", prefix: "$" },
  { text: "Ready to deploy magic", prefix: "$" },
] as const

const BOOT_SEQUENCE = [
  { text: "Booting JD-OS v2.0.25", type: "info", delay: 400 },
  { text: "Checking system memory", type: "process", delay: 600 },
  { text: "32GB DDR5 detected", type: "success", delay: 300 },
  { text: "Mounting virtual filesystem", type: "process", delay: 500 },
  { text: "Initializing rendering engine", type: "process", delay: 700 },
  { text: "GPU acceleration enabled", type: "success", delay: 300 },
  { text: "Portfolio services online", type: "success", delay: 400 },
] as const


const CODE_CHARS = "01アイウエオカキクケコサシスセソタチツテト</>{}[];=+-*&|!?"

const CodeRainDrop = memo(function CodeRainDrop({ index }: { index: number }) {
  const seededRandom = (seed: number, n: number) => ((seed * n * 9301 + 49297) % 233280) / 233280
  
  const styles = useMemo(() => ({
    left: `${(index * 3.5) % 100}%`,
  }), [index])
  
  const animationConfig = useMemo(() => ({
    duration: 2.5 + seededRandom(index, 1) * 3,
    delay: seededRandom(index, 2) * 2,
  }), [index])

  const chars = useMemo(() => {
    const length = 8 + Math.floor(seededRandom(index, 3) * 10)
    return Array.from(
      { length },
      (_, i) => CODE_CHARS[Math.floor(seededRandom(index + i, 4) * CODE_CHARS.length)]
    )
  }, [index])

  return (
    <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: "100vh", opacity: [0, 0.8, 0.8, 0] }}
      transition={{
        duration: animationConfig.duration,
        delay: animationConfig.delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute top-0 font-mono text-[10px] sm:text-xs"
      style={styles}
    >
      <div className="flex flex-col items-center">
        {chars.map((char, i) => (
          <span
            key={i}
            className={i === 0 
              ? "text-primary font-bold drop-shadow-[0_0_8px_hsl(var(--primary))]" 
              : "text-primary/30 dark:text-primary/40"
            }
            style={{ opacity: 1 - i * 0.1 }}
          >
            {char}
          </span>
        ))}
      </div>
    </motion.div>
  )
})

const FloatingParticle = memo(function FloatingParticle({ index }: { index: number }) {
  const config = useMemo(() => {
    const seed = index * 17 + 7
    const seededRandom = (n: number) => ((seed * n * 9301 + 49297) % 233280) / 233280
    return {
      size: 2 + seededRandom(1) * 4,
      initialX: seededRandom(2) * 100,
      initialY: seededRandom(3) * 100,
      duration: 12 + seededRandom(4) * 15,
    }
  }, [index])

  return (
    <motion.div
      className="absolute rounded-full bg-primary/40 dark:bg-primary/60 shadow-[0_0_6px_hsl(var(--primary))]"
      style={{
        width: config.size,
        height: config.size,
        left: `${config.initialX}%`,
        top: `${config.initialY}%`,
      }}
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 25, 0],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        delay: index * 0.3,
        ease: "easeInOut",
      }}
    />
  )
})

const CircularProgress = memo(function CircularProgress({ progress }: { progress: number }) {
  const radius = 85
  const stroke = 3
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <svg height={radius * 2} width={radius * 2} className="absolute -rotate-90">
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="text-primary/10 dark:text-primary/20"
      />
      <motion.circle
        stroke="url(#progressGradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ strokeDasharray: circumference, strokeDashoffset }}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="drop-shadow-[0_0_10px_hsl(var(--primary))]"
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="50%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
      </defs>
    </svg>
  )
})

const HexGrid = memo(function HexGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.06]">
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="hexagons"
            width="50"
            height="43.4"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <polygon
              points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  )
})

const TerminalScanner = memo(function TerminalScanner() {
  return (
    <motion.div
      initial={{ top: "-10%" }}
      animate={{ top: "110%" }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }}
      className="
        pointer-events-none
        absolute left-0 right-0
        h-[2px]
        z-10
      "
    >
      {/* Core scan line */}
      <div
        className="
          h-full w-full
          bg-gradient-to-r
          from-transparent
          via-primary/70
          to-transparent
        "
      />

      {/* Glow trail */}
      <div
        className="
          absolute inset-0
          blur-md
          bg-gradient-to-r
          from-transparent
          via-primary/40
          to-transparent
        "
      />

      {/* Dark-mode depth */}
      <div
        className="
          absolute inset-0
          opacity-0 dark:opacity-100
          blur-xl
          bg-primary/30
        "
      />
    </motion.div>
  )
})




interface LoadingScreenProps {
  onLoadingComplete: () => void
}

function LoadingScreenComponent({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [bootStep, setBootStep] = useState(0)
  const [showMainContent, setShowMainContent] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [bootComplete, setBootComplete] = useState(false)


  const handleSkip = useCallback(() => {
    setProgress(100)
    setTimeout(onLoadingComplete, 300)
  }, [onLoadingComplete])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleSkip()
    }
    window.addEventListener("keypress", handleKeyPress)
    return () => window.removeEventListener("keypress", handleKeyPress)
  }, [handleSkip])

  useEffect(() => {
    if (bootStep < BOOT_SEQUENCE.length) {
      const timer = setTimeout(() => {
        setBootStep(prev => prev + 1)
      }, BOOT_SEQUENCE[bootStep].delay)

      return () => clearTimeout(timer)
    }

    // 🔥 BOOT COMPLETED
    setTimeout(() => {
      setBootComplete(true)
    }, 1000)

    // 👇 IMPORTANT: delay BEFORE switching screens
    const finalize = setTimeout(() => {
      setShowMainContent(true)
    }, 2000) // human pause after last OK

    return () => clearTimeout(finalize)
  }, [bootStep])


  useEffect(() => {
    if (!showMainContent) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onLoadingComplete, 200)
          return 100
        }
        return prev + Math.max(1, Math.round((100 - prev) / 12))

      })
    }, 25)

    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length)
      setTypedText("")
    }, 2200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(phraseInterval)
    }
  }, [onLoadingComplete, showMainContent])

  useEffect(() => {
    if (!showMainContent) return
    const currentPhrase = LOADING_PHRASES[phraseIndex].text
    if (typedText.length < currentPhrase.length) {
      const timer = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1))
      }, typedText.length % 6 === 0 ? 120 : 35)
      return () => clearTimeout(timer)
    }
  }, [typedText, phraseIndex, showMainContent])

  const codeRainDrops = useMemo(
    () => Array.from({ length: 28 }, (_, i) => <CodeRainDrop key={i} index={i} />),
    []
  )

  const floatingParticles = useMemo(
    () => Array.from({ length: 16 }, (_, i) => <FloatingParticle key={i} index={i} />),
    []
  )

  const STATUS_LABEL = {
    info: "[INFO]",
    process: "[....]",
    success: "[OK]",
  } as const

  const STATUS_COLOR = {
    info: "text-primary",
    process: "text-yellow-500",
    success: "text-emerald-500",
  } as const


  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <HexGrid />
      <TerminalScanner />


      <div className="absolute inset-0 overflow-hidden pointer-events-none">{codeRainDrops}</div>

      {floatingParticles}

      {/* Animated ambient gradients */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-primary/15 dark:from-primary/25 to-transparent blur-[100px]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-accent/10 dark:from-accent/20 to-transparent blur-[100px]"
      />

      <AnimatePresence mode="wait">
        {!showMainContent ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="
              relative z-10
              w-full
              max-w-md sm:max-w-lg lg:max-w-xl
              px-4 sm:px-6
            "

          >
            {/* Terminal card with enhanced styling */}
            <motion.div
              initial={false}
              animate={
                bootComplete
                  ? {
                      rotateX: [0, 8, -4, 0],
                      y: [0, 6, -2, 0],
                      scale: [1, 1.01, 1],
                    }
                  : {}
              }
              transition={{
                duration: 0.9,
                ease: "easeOut",
                times: [0, 0.4, 0.7, 1],
              }}
              style={{
                transformOrigin: "top center",
                perspective: 1200,
              }}
              className="relative overflow-hidden rounded-2xl border border-primary/20 dark:border-primary/30 bg-card/80 dark:bg-[#0a0f1a]/90 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-primary/10 p-5 sm:p-6 lg:p-7 font-mono text-xs sm:text-sm"
            >

              {/* 🔥 MICRO FLASH – ADD THIS BLOCK */}
              {bootComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.15, 0] }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 z-20 bg-white dark:bg-primary pointer-events-none"
                />
              )}

              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10 dark:ring-primary/20" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              
              {/* Inner glow for dark mode */}
              <div className="absolute inset-0 rounded-2xl opacity-0 dark:opacity-100 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

              <div className="relative z-10 mb-4 flex items-center justify-between">
                {/* LEFT — Traffic lights */}
                <div className="flex items-center gap-2">
                  {[
                    { color: "bg-red-500", glow: "shadow-red-500/60" },
                    { color: "bg-yellow-500", glow: "shadow-yellow-500/60" },
                    { color: "bg-green-500", glow: "shadow-green-500/60" },
                  ].map((dot, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.15 }}
                      className={`
                        h-2.5 w-2.5 sm:h-3 sm:w-3
                        rounded-full
                        ${dot.color}
                        shadow-[0_0_6px]
                        ${dot.glow}
                      `}
                    />
                  ))}

                  {/* Terminal title */}
                  <div
                    className="
                      ml-2 flex items-center gap-2
                      rounded-md px-2 py-0.5
                      bg-muted/40 dark:bg-muted/30
                      border border-border/40
                      backdrop-blur
                    "
                  >
                    <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                      system_boot.sh
                    </span>

                    {/* subtle scan shimmer */}
                    <motion.span
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-1 w-1 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary))]"
                    />
                  </div>
                </div>

                {/* RIGHT — Status */}
                <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono">
                  <motion.span
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      boxShadow: [
                        "0 0 4px hsl(var(--primary))",
                        "0 0 10px hsl(var(--primary))",
                        "0 0 4px hsl(var(--primary))",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                  />
                  <span className="tracking-wide text-muted-foreground">READY</span>
                </div>
              </div>


              <div className="relative z-10 space-y-3 sm:space-y-3.5">

                {BOOT_SEQUENCE.slice(0, bootStep).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.06,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-2 py-0.5"

                  >
                    <span
                      className={`
                        font-semibold font-mono
                        ${STATUS_COLOR[line.type]}
                        drop-shadow-[0_0_6px_currentColor]
                      `}
                    >
                      {STATUS_LABEL[line.type]}
                    </span>
                    <span className="text-foreground/80">
                      {line.type === "process" ? `${line.text}…` : line.text}
                    </span>

                  </motion.div>
                ))}

                {bootStep < BOOT_SEQUENCE.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="inline-block h-4 w-0.5 bg-primary rounded-full
                              shadow-[0_0_10px_hsl(var(--primary))]"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 flex flex-col items-center px-4 sm:px-6"
          >
            {/* Logo with circular progress - enhanced */}
            <div className="relative mb-6 sm:mb-8">
              <CircularProgress progress={progress} />

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative flex h-[170px] w-[170px] items-center justify-center"
              >
                {/* Pulsing glow behind logo */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-8 rounded-2xl bg-primary/30 blur-2xl"
                />

                {/* Logo container with rotating border */}
                <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border border-primary/30 dark:border-primary/40 bg-card/90 dark:bg-[#0a0f1a]/90 backdrop-blur-xl shadow-2xl shadow-primary/10">
                  {/* Rotating conic gradient border */}
                  <div className="absolute -inset-[1px] overflow-hidden rounded-2xl">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                      style={{
                        background: "conic-gradient(from 0deg, transparent 0%, hsl(var(--primary)) 25%, transparent 50%, hsl(var(--accent)) 75%, transparent 100%)",
                      }}
                    />
                  </div>
                  <div className="absolute inset-[1px] rounded-2xl bg-card dark:bg-[#0a0f1a]" />

                  {/* Logo text with glow */}
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 10px hsl(var(--primary))",
                        "0 0 30px hsl(var(--primary)), 0 0 50px hsl(var(--primary)/0.5)",
                        "0 0 10px hsl(var(--primary))",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10 font-heading text-2xl sm:text-3xl font-bold text-primary"
                  >
                    {"<JD/>"}
                  </motion.span>
                </div>

                {/* Orbiting particles */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${i * 120}deg)` }}
                  >
                    <motion.div
                      className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)),0_0_20px_hsl(var(--primary)/0.5)]"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </motion.div>
                ))}

                {/* Outer ring pulse */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-primary/50"
                />
              </motion.div>
            </div>

            {/* Terminal command - enhanced */}
            <div className="mb-5 sm:mb-6 w-full max-w-xs sm:max-w-sm">
              <div className="relative rounded-xl border border-primary/20 dark:border-primary/30 bg-card/90 dark:bg-[#0a0f1a]/90 backdrop-blur-xl shadow-xl shadow-primary/5">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
                <div className="relative z-10 flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 font-mono text-xs sm:text-sm">
                  <span className="font-semibold text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]">
                    {LOADING_PHRASES[phraseIndex].prefix}
                  </span>
                  <span className="text-foreground/80 truncate">{typedText}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block h-3.5 w-0.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))] flex-shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* Progress bar - enhanced with glow */}
            <div className="w-60 sm:w-80">
              <div className="relative h-1.5 overflow-hidden rounded-full bg-primary/10 dark:bg-primary/20">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_15px_hsl(var(--primary))]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.div>
                {/* Glow underneath */}
                <div 
                  className="absolute top-0 h-full rounded-full bg-primary/40 blur-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-1">
                <motion.span
                  key={Math.round(progress)}
                  initial={{ y: 8, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15, type: "spring", stiffness: 300 }}
                  className="font-mono text-3xl sm:text-4xl font-bold text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                >
                  {Math.round(progress)}
                </motion.span>
                <span className="text-xl sm:text-2xl text-muted-foreground">%</span>
              </div>
            </div>

            {/* Status indicators - enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5 sm:mt-6 flex items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs"
            >
              {["CPU", "Memory", "Network"].map((label, i) => (
                <div key={label} className="flex items-center gap-1.5">
                  <motion.div
                    animate={{
                      backgroundColor: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary))"],
                      boxShadow: [
                        "0 0 5px hsl(var(--primary))",
                        "0 0 10px hsl(var(--accent))",
                        "0 0 5px hsl(var(--primary))",
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="h-1.5 w-1.5 rounded-full"
                  />
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-mono text-foreground/70">OK</span>
                </div>
              ))}
            </motion.div>

            {/* Skip hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: progress > 30 ? 0.6 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 sm:mt-8 flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground"
            >
              <span>Press</span>
              <kbd className="rounded border border-border bg-muted/50 px-1.5 sm:px-2 py-0.5 font-mono text-[9px] sm:text-[10px]">
                Enter
              </kbd>
              <span>to skip</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decorations with glow */}
      <div className="pointer-events-none absolute inset-4 sm:inset-6 md:inset-8">
        {[
          "left-0 top-0 border-l-2 border-t-2",
          "right-0 top-0 border-r-2 border-t-2",
          "bottom-0 left-0 border-b-2 border-l-2",
          "bottom-0 right-0 border-b-2 border-r-2",
        ].map((pos, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`absolute h-12 w-12 sm:h-16 sm:w-16 ${pos} border-primary/30 dark:border-primary/40`}
          />
        ))}
      </div>

      {/* Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 font-mono text-[9px] sm:text-[10px] text-muted-foreground"
      >
        v2.0.25
      </motion.div>
    </motion.div>
  )
}

export const LoadingScreen = memo(LoadingScreenComponent)
