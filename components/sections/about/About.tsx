"use client"

import { useRef } from "react"
import { motion, useInView, useScroll } from "framer-motion"
import {
  Sparkles,
  Code2,
  Layers,
  Zap,
  ShieldCheck,
  Boxes,
  Workflow,
  Terminal,
  Braces,
  Database,
  Globe,
  Rocket,
  Target,
  FlaskConical,
} from "lucide-react"

import { SectionBadge, TextReveal } from "@/components/reusable"
import { FloatingParticles, AnimatedGrid, BorderTraceGlow } from "./AboutEffects"
import { PipelineStep, thinkingPipeline } from "./PipelineStep"
import {
  ABOUT_SECTION,
  ABOUT_PHILOSOPHY,
  WHAT_I_BUILD,
  WHAT_SETS_APART,
  CURRENTLY_EXPLORING,
  ABOUT_CLOSING,
} from "@/constants/about"

const ICON_MAP: Record<string, React.ElementType> = { Globe, Database, Layers, Boxes, ShieldCheck, Rocket, Workflow, Zap, Braces, Target }

const whatIBuild = WHAT_I_BUILD.map((item) => ({
  ...item,
  icon: ICON_MAP[item.iconName],
}))

const whatSetsApart = WHAT_SETS_APART.map((item) => ({
  ...item,
  icon: ICON_MAP[item.iconName],
}))

const iconAnimations: Record<string, { animate: Record<string, unknown>; transition: Record<string, unknown> }> = {
  Globe: { animate: { rotate: [0, 360] }, transition: { duration: 20, repeat: Infinity, ease: "linear" } },
  Database: { animate: { y: [0, -2, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 } },
  Layers: { animate: { scale: [1, 1.15, 1] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 } },
  Boxes: { animate: { rotate: [0, 8, -8, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 } },
  ShieldCheck: { animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.2 } },
  Rocket: { animate: { y: [0, -3, 0], x: [0, 1, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 } },
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const pipelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: pipelineScrollProgress } = useScroll({
    target: pipelineRef,
    offset: ["start 0.85", "end 0.4"],
  })

  return (
    <section id="about" ref={ref} data-section="about" className="relative py-24 sm:py-36 overflow-x-clip">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <SectionBadge index={1} label={ABOUT_SECTION.badge} icon={<Sparkles size={14} />} />

          <TextReveal>
            <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-heading">
              {ABOUT_SECTION.headingPrefix}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                  {ABOUT_SECTION.headingHighlight}
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
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            Full-stack engineer with a strong
            <span className="text-foreground font-medium"> architectural mindset</span>, transforming
            complex systems into
            <span className="text-primary font-semibold"> elegant</span>,
            <span className="text-accent font-semibold"> scalable</span>, and
            <span className="text-foreground font-semibold"> resilient</span> digital experiences.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-4 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-muted-foreground"
          >
            I approach software engineering as a
            <span className="text-foreground font-medium"> systems problem</span>,
            not a feature checklist {"\u2014"} focusing on architectures that stay
            <span className="text-primary font-medium"> clear</span>,
            <span className="text-accent font-medium"> scalable</span>, and
            <span className="text-foreground font-medium"> dependable </span>
            long after the first version ships.
          </motion.p>
        </motion.div>

        <div className="grid gap-10 sm:gap-14 lg:gap-24 lg:grid-cols-2">

          {/* ══════ LEFT COLUMN ══════ */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="space-y-8 sm:space-y-10 lg:space-y-12"
          >
            {/* ── Philosophy block ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative rounded-2xl lg:rounded-none p-5 sm:p-6 lg:p-0 border border-border/30 lg:border-0 bg-card/40 dark:bg-white/[0.03] lg:bg-transparent dark:lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none"
            >
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
              <div className="lg:hidden absolute left-4 right-4 top-0 h-[2px] rounded-full bg-gradient-to-r from-primary/60 via-accent/40 to-transparent" />

              <div className="lg:pl-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-heading">{ABOUT_PHILOSOPHY.title}</h3>
                </div>

                <p className="text-sm sm:text-[15px] font-medium text-foreground/80 leading-[1.8] tracking-[0.01em] mb-3 sm:mb-4">
                  I design and build systems that are fast, maintainable, and resilient {"\u2014"}{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                    not just visually polished
                  </span>.
                  My work focuses on long-term scalability, performance, and clarity.
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground leading-[1.75] tracking-[0.015em] mb-4 sm:mb-5">
                  I care deeply about engineering decisions that{" "}
                  <span className="bg-gradient-to-r from-foreground/90 to-foreground/60 dark:from-white/90 dark:to-white/60 bg-clip-text text-transparent font-semibold">
                    age well
                  </span> {"\u2014"}
                  clean abstractions, predictable behavior, and developer experience
                  that supports teams instead of slowing them down.
                </p>

                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary animate-[pulse_3s_ease-in-out_infinite]" />
                  Systems that{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                    {ABOUT_PHILOSOPHY.tagline.replace("Systems that ", "")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Pipeline with scroll-activated progress ── */}
            <div ref={pipelineRef}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mb-5 sm:mb-6"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase">
                  How I Think
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              </motion.div>

              <div className="space-y-2 sm:space-y-1">
                {thinkingPipeline.map((step, i) => (
                  <PipelineStep
                    key={step.label}
                    step={step}
                    index={i}
                    isLast={i === thinkingPipeline.length - 1}
                    scrollProgress={pipelineScrollProgress}
                  />
                ))}
              </div>
            </div>

            {/* ── Currently Exploring strip ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="relative rounded-2xl lg:rounded-xl p-4 sm:p-5 border border-border/50 dark:border-white/[0.08] bg-muted/40 dark:bg-white/[0.02] backdrop-blur-sm shadow-sm dark:shadow-none"
            >
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold text-foreground">Currently Exploring</span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-3">
                {CURRENTLY_EXPLORING.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300`} />
                    <div className="relative flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/60 dark:border-white/[0.1] bg-background/80 dark:bg-white/[0.04] backdrop-blur-sm shadow-sm dark:shadow-none">
                      <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${item.gradient}`} />
                      <span className="text-[11px] sm:text-xs font-medium text-foreground">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[10px] sm:text-[11px] text-muted-foreground dark:text-muted-foreground/80 italic"
              >
                always learning...
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ══════ RIGHT COLUMN ══════ */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="relative"
          >
            <div className="absolute -inset-3 sm:-inset-2 rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-50 blur-2xl sm:blur-3xl" />

            <div className="relative rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-card/90 via-card/70 to-card/80 dark:from-white/[0.04] dark:via-white/[0.02] dark:to-white/[0.03] backdrop-blur-xl p-4 sm:p-7 md:p-9 overflow-hidden shadow-2xl shadow-primary/10">
              <BorderTraceGlow />

              <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, hsl(var(--primary) / 0.15) 10%, transparent 20%)",
                  }}
                />
              </div>

              <div className="relative space-y-6 sm:space-y-10 md:space-y-12">
                <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-border/30 dark:border-white/[0.08]">
                  <div className="flex gap-1.5">
                    <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                    <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                    <motion.div whileHover={{ scale: 1.2 }} className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 ml-2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-muted/30 dark:bg-white/[0.05] text-[10px] sm:text-xs">
                    <Terminal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
                    <span className="text-muted-foreground font-mono hidden sm:inline">profile.config.ts</span>
                    <span className="text-muted-foreground font-mono sm:hidden">profile.ts</span>
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

                {/* ── 01. What I Build — with icon micro-animations ── */}
                <div>
                  <h4 className="text-sm sm:text-base font-bold mb-4 sm:mb-5 flex items-center gap-2">
                    <span className="text-primary/40 font-mono text-[10px] sm:text-xs">01.</span>
                    <span>What I Build</span>
                  </h4>
                  <div className="space-y-0.5 sm:space-y-1">
                    {whatIBuild.map((item, index) => {
                      const Icon = item.icon
                      const anim = iconAnimations[item.iconName]
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.6 + index * 0.08, duration: 0.5, ease: "easeOut" }}
                          className="group relative flex items-start gap-3 py-2.5 sm:py-3 px-2.5 sm:px-4 rounded-lg hover:bg-card/40 dark:hover:bg-white/[0.03] transition-all duration-300"
                        >
                          <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300" />

                          <div className={`relative p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${item.color} shadow-md shrink-0`}>
                            <motion.div
                              animate={anim?.animate}
                              transition={anim?.transition}
                            >
                              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                            </motion.div>
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <span className="text-[13px] sm:text-sm font-medium group-hover:text-primary transition-colors block leading-snug">{item.name}</span>
                            <span className="text-[11px] sm:text-xs text-muted-foreground/70 leading-relaxed">{item.desc}</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <div className="my-6 sm:my-8 h-px bg-gradient-to-r from-transparent via-border dark:via-white/30 to-transparent" />

                {/* ── 02. What Sets Me Apart ── */}
                <div>
                  <h4 className="text-sm sm:text-base font-bold mb-4 sm:mb-5 flex items-center gap-2">
                    <span className="text-primary/40 font-mono text-[10px] sm:text-xs">02.</span>
                    <span>What Sets Me Apart</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5">
                    {whatSetsApart.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 15 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                          className="group py-1 px-2 sm:px-0 rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                            <Icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors shrink-0" />
                            <span className="text-[13px] sm:text-sm font-semibold group-hover:text-primary transition-colors">{item.name}</span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-muted-foreground/70 leading-relaxed pl-6">{item.desc}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-20 px-4 sm:px-6 md:px-0 pb-12 sm:pb-16 flex flex-col items-center gap-4"
      >
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <p className="max-w-xl text-center text-sm sm:text-base font-medium leading-relaxed tracking-[0.01em] text-foreground/80">
          I enjoy working on problems where
          <span className="text-foreground font-semibold"> thoughtful engineering decisions</span> matter {"\u2014"}
          and where systems are built to{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
            evolve
          </span>, not break.
        </p>

        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {ABOUT_CLOSING.tagline}
        </span>
      </motion.div>
    </section>
  )
}
