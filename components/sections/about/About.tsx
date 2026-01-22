/**
 * =============================================================================
 * ABOUT SECTION COMPONENT
 * =============================================================================
 *
 * Displays personal information, skills, stats, and problem-solving approach.
 * Features animated cards, floating particles, and interactive skill badges.
 *
 * DATA SOURCES:
 * - Skills: lib/constants/about.ts (SKILLS)
 * - Stats: lib/constants/about.ts (STATS)
 * - Pipeline: lib/constants/about.ts (THINKING_PIPELINE)
 *
 * CUSTOMIZATION:
 * - Update skills/stats in lib/constants/about.ts
 * - Modify animation timings in component
 * - Adjust colors via Tailwind classes
 *
 * @file components/about.tsx
 * =============================================================================
 */

"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  Sparkles,
  Code2,
  Layers,
  Cpu,
  Zap,
  ArrowRight,
  Gauge,
  ShieldCheck,
  Boxes,
  Workflow,
  Terminal,
  Braces,
  Database,
  Globe,
  Rocket,
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react"

/** Reusable components */
import { SectionBadge, TextReveal } from "@/components/reusable"

// ============================================================================
// Data Configuration
// Update these arrays to customize the About section content
// ============================================================================

/**
 * Skills grid data
 * To add a skill: add entry here and ensure icon is imported above
 */
const skills = [
  { name: "React / Next.js", icon: Braces, color: "from-cyan-500 to-blue-500" },
  { name: "TypeScript", icon: Code2, color: "from-blue-500 to-indigo-500" },
  { name: "Node.js", icon: Terminal, color: "from-green-500 to-emerald-500" },
  { name: "PostgreSQL", icon: Database, color: "from-indigo-500 to-purple-500" },
  { name: "MongoDB", icon: Layers, color: "from-green-600 to-teal-500" },
  { name: "GraphQL", icon: Globe, color: "from-pink-500 to-rose-500" },
  { name: "AWS", icon: Cpu, color: "from-orange-500 to-amber-500" },
  { name: "TailwindCSS", icon: Zap, color: "from-teal-500 to-cyan-500" },
]

/**
 * Problem-solving approach pipeline
 * Displayed as vertical timeline with animated connectors
 */
const thinkingPipeline = [
  {
    icon: Workflow,
    label: "Understand Domain",
    desc: "Clarify business + technical constraints",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Boxes,
    label: "Model the System",
    desc: "Data flow, boundaries, responsibilities",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Gauge,
    label: "Optimize Performance",
    desc: "Speed, scalability, reliability",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: ShieldCheck,
    label: "Engineer for Scale",
    desc: "Maintainability & DX first",
    gradient: "from-green-500 to-emerald-500",
  },
]

/**
 * Focus areas badges
 */
const focusAreas = [
  { name: "Frontend Architecture", icon: Layers },
  { name: "System Design", icon: Boxes },
  { name: "Performance", icon: Rocket },
  { name: "Design Systems", icon: Target },
  { name: "API Integration", icon: Globe },
]

/**
 * Statistics with animated counters
 * @property value - Number to count up to
 * @property suffix - Text after number ("+", "K", etc.)
 */
const stats = [
  { value: 5, suffix: "+", label: "Years Experience", icon: TrendingUp },
  { value: 50, suffix: "+", label: "Projects Delivered", icon: CheckCircle2 },
  { value: 30, suffix: "+", label: "Happy Clients", icon: Sparkles },
]

// ============================================================================
// Sub-Components
// ============================================================================

/**
 * Animated counter that counts up when in view
 */
function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

/**
 * Floating particles background effect
 */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, "-20%", "120%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

/**
 * Animated grid background
 */
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}

/**
 * Interactive skill card with 3D tilt effect
 */
function SkillCard({
  skill,
  index,
  isInView,
}: {
  skill: (typeof skills)[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const Icon = skill.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.6 + index * 0.08, duration: 0.5, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <div
        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"
        style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
      />
      <div
        className={`
        relative overflow-hidden rounded-xl border border-border/50
        bg-card/80 backdrop-blur-sm p-4
        transition-all duration-300
        group-hover:border-primary/50
        group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]
      `}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />
        <div className="relative flex items-center gap-3">
          <div
            className={`relative p-2 rounded-lg bg-gradient-to-br ${skill.color} shadow-lg group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-shadow duration-300`}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="relative text-sm font-medium tracking-wide group-hover:text-primary transition-colors">
            {skill.name}
          </span>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Pipeline step with animated connector
 */
function PipelineStep({
  step,
  index,
  isInView,
  isLast,
}: {
  step: (typeof thinkingPipeline)[0]
  index: number
  isInView: boolean
  isLast: boolean
}) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ 
        delay: 0.5 + index * 0.12, 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="relative"
    >
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.6 + index * 0.15, duration: 0.4 }}
          className="absolute left-5 top-14 w-0.5 h-8 origin-top bg-gradient-to-b from-primary/50 to-transparent"
        />
      )}

      <div className="group flex items-start gap-4 p-4 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 transition-all duration-300">
        <div className="relative">
          <motion.div
            animate={isInView ? { scale: [1, 1.2, 1] } : {}}
            transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
            className={`relative z-10 p-2.5 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-shadow duration-300`}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <motion.div
            animate={isInView ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
            transition={{ delay: 1 + index * 0.2, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.gradient}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-primary/70">0{index + 1}</span>
            <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{step.label}</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
        </div>

        <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  )
}

/**
 * Animated stat card
 */
function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: (typeof stats)[0]
  index: number
  isInView: boolean
}) {
  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      <div className="relative p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center overflow-hidden group-hover:border-primary/50 transition-all duration-300">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at center, var(--primary) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <motion.div
          animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
          className="inline-flex p-2 rounded-xl bg-primary/10 mb-3"
        >
          <Icon className="w-5 h-5 text-primary" />
        </motion.div>

        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all">
          <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
        </div>

        <div className="text-xs text-muted-foreground font-medium tracking-wide">{stat.label}</div>

        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </motion.div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} data-section="about" className="relative py-24 sm:py-36 overflow-x-clip">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl"
        />
      </div>

      <AnimatedGrid />
      <FloatingParticles />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge index={1} label="About" icon={<Sparkles size={14} />} />

          <TextReveal>
            <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading">
              Crafting Digital{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                  Excellence
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left rounded-full"
                />
              </span>
            </h2>
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Full-stack engineer with an architectural mindset, transforming complex systems into
            <span className="text-primary font-medium"> elegant</span>,
            <span className="text-accent font-medium"> scalable</span>, and
            <span className="text-foreground font-medium"> resilient</span> experiences.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-2">
          {/* LEFT - Engineering Approach - Slides in from LEFT */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              delay: 0.2, 
              duration: 0.8, 
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="space-y-8"
          >
            {/* Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                delay: 0.4, 
                duration: 0.7,
                type: "spring",
                stiffness: 120,
                damping: 18
              }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-50 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

              <div className="relative p-6 sm:p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32">
                  <div className="absolute top-4 right-4 w-20 h-20 border border-primary/20 rounded-full" />
                  <div className="absolute top-8 right-8 w-12 h-12 border border-accent/20 rounded-full" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading">Engineering Philosophy</h3>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  I design and build systems that are fast, maintainable, and resilient — not just visually polished. My
                  work focuses on long-term scalability, performance, and clarity.
                </p>

                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Systems that evolve gracefully
                </div>
              </div>
            </motion.div>

            {/* Thinking Pipeline */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Problem-Solving Approach
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              </motion.div>

              <div className="space-y-3">
                {thinkingPipeline.map((step, i) => (
                  <PipelineStep
                    key={step.label}
                    step={step}
                    index={i}
                    isInView={isInView}
                    isLast={i === thinkingPipeline.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT - Skills & Stats Showcase - Slides in from RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              delay: 0.3, 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="relative"
          >
            <div className="absolute -inset-3 sm:-inset-2 rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-50 blur-2xl sm:blur-3xl" />

            <div className="relative rounded-2xl sm:rounded-[2rem] border border-border/50 bg-gradient-to-br from-card/90 via-card/70 to-card/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 overflow-hidden shadow-2xl shadow-primary/10">
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, hsl(var(--primary) / 0.25) 10%, transparent 20%)",
                  }}
                />
              </div>

              <div className="relative space-y-5 sm:space-y-6 md:space-y-8">
                {/* Terminal Header - Enhanced */}
                <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                    <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                    <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 ml-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-muted/30 text-[10px] sm:text-xs">
                    <Terminal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                    <span className="text-muted-foreground font-mono hidden sm:inline">skills.config.ts</span>
                    <span className="text-muted-foreground font-mono sm:hidden">config.ts</span>
                  </div>
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="ml-auto flex items-center gap-1 text-[9px] sm:text-[10px] text-green-500 font-mono"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500" />
                    LIVE
                  </motion.div>
                </div>

                {/* Skills Section - Responsive grid */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="text-primary font-mono text-[10px] sm:text-xs">01.</span>
                    <span>Core Technologies</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2 sm:gap-3">
                    {skills.map((skill, index) => (
                      <SkillCard key={skill.name} skill={skill} index={index} isInView={isInView} />
                    ))}
                  </div>
                </div>

                {/* Focus Areas - Responsive wrap */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="text-primary font-mono text-[10px] sm:text-xs">02.</span>
                    <span>Focus Areas</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {focusAreas.map((area, index) => {
                      const Icon = area.icon
                      return (
                        <motion.div
                          key={area.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.8 + index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -1 }}
                          className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border/50 bg-muted/30 text-[10px] sm:text-xs font-medium hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default whitespace-nowrap"
                        >
                          <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary flex-shrink-0" />
                          <span className="hidden sm:inline">{area.name}</span>
                          <span className="sm:hidden">{area.name.split(" ")[0]}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Stats - Responsive grid */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="text-primary font-mono text-[10px] sm:text-xs">03.</span>
                    <span>By the Numbers</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {stats.map((stat, index) => (
                      <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
