"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Briefcase, Calendar, MapPin, ExternalLink, ChevronDown, Building2 } from "lucide-react"

import { TextReveal, SectionBadge } from "@/components/reusable"
import { scrollToSection } from "@/lib/utils"
import { EngineeringProcess } from "@/components/sections/experience/EngineeringProcess"
import { EXPERIENCES, EXPERIENCE_SECTION } from "@/constants/experience"

const experiences = [...EXPERIENCES]

function ExperienceCard({
  exp,
  index,
  isInView,
}: {
  exp: (typeof experiences)[0]
  index: number
  isInView: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-0 md:gap-8 mb-8 sm:mb-10 md:mb-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* ── Mobile timeline node (dot only, line is continuous behind) ── */}
      <div className="flex flex-col items-center mr-4 md:hidden shrink-0 w-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
          className="relative z-10 mt-1"
        >
          <div className="w-3.5 h-3.5 rounded-full border-2 border-background shadow-lg" style={{ backgroundColor: exp.color }} />
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: exp.color }}
          />
        </motion.div>
      </div>

      {/* ── Desktop: spacer to push card to one side ── */}
      <div className="hidden md:block md:w-1/2" />

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, x: isEven ? 30 : -30 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{
          delay: index * 0.15,
          duration: 0.7,
          type: "spring",
          stiffness: 80,
          damping: 18,
        }}
        className="flex-1 md:w-1/2"
      >
        <motion.div
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative cursor-pointer rounded-xl sm:rounded-2xl border border-border/50 dark:border-white/[0.08] bg-card/50 dark:bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-lg shadow-black/[0.03] dark:shadow-black/[0.2] hover:border-border dark:hover:border-white/[0.15] transition-colors duration-300"
          style={{
            boxShadow: `0 0 0 0px ${exp.color}00`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px -15px ${exp.color}25`
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0px ${exp.color}00`
          }}
        >
          {/* Top accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
            className="h-[2px] sm:h-[3px] origin-left"
            style={{ background: `linear-gradient(to right, ${exp.color}, ${exp.color}60, transparent)` }}
          />

          {/* Hover gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${exp.color}08, transparent 70%)`,
            }}
          />

          <div className="relative p-4 sm:p-5 md:p-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                {/* Period + type badges */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold"
                    style={{ backgroundColor: `${exp.color}15`, color: exp.color }}
                  >
                    <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {exp.period}
                  </span>
                  <span className="rounded-full bg-muted/60 dark:bg-white/[0.06] px-2.5 py-0.5 text-[10px] sm:text-xs font-medium text-muted-foreground">
                    {exp.type}
                  </span>
                </div>

                {/* Role title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight group-hover:text-foreground transition-colors leading-snug">
                  {exp.role}
                </h3>

                {/* Company + location */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
                  <span className="flex items-center gap-1 text-xs sm:text-sm font-medium">
                    <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" style={{ color: exp.color }} />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Expand toggle */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-full p-1.5 sm:p-2 shrink-0 mt-1 transition-colors"
                style={{ backgroundColor: `${exp.color}10` }}
              >
                <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </motion.div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mb-3 sm:mb-4">{exp.description}</p>

            {/* Expandable achievements */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden mb-3 sm:mb-4"
                >
                  <div
                    className="rounded-lg sm:rounded-xl p-3 sm:p-4 border"
                    style={{
                      backgroundColor: `${exp.color}08`,
                      borderColor: `${exp.color}20`,
                    }}
                  >
                    <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3" style={{ color: exp.color }}>
                      Key Achievements
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-start gap-2 text-[11px] sm:text-sm text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: exp.color }} />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Technology tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {exp.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.4 + i * 0.05 }}
                  className="rounded-md sm:rounded-lg border border-border/50 dark:border-white/[0.08] bg-muted/40 dark:bg-white/[0.04] px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-foreground/80 hover:border-current transition-colors cursor-default"
                  style={{ ["--tw-text-opacity" as string]: 1 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = exp.color;
                    (e.currentTarget as HTMLElement).style.color = exp.color;
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${exp.color}10`
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                    (e.currentTarget as HTMLElement).style.color = "";
                    (e.currentTarget as HTMLElement).style.backgroundColor = ""
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.3"],
  })

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <>
    <section id="experience" ref={ref} data-section="experience" className="relative px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-primary/10 blur-[80px] sm:h-64 sm:w-64 sm:blur-[100px]"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          className="absolute right-1/4 bottom-1/4 h-56 w-56 rounded-full bg-pink-500/10 blur-[80px] sm:h-72 sm:w-72 sm:blur-[100px]"
        />
        <div
          className="absolute inset-0 hidden opacity-[0.02] sm:block"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl py-20 sm:py-32">
        <div className="mb-12 text-center sm:mb-20">
          <SectionBadge
            index={4}
            label={EXPERIENCE_SECTION.badge}
            icon={<Building2 size={14} />}
          />
          <TextReveal>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              {EXPERIENCE_SECTION.headingPrefix}{" "}
              <span className="bg-gradient-to-r from-primary via-pink-500 to-primary bg-clip-text text-transparent">
                {EXPERIENCE_SECTION.headingHighlight}
              </span>
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base"
          >
            {EXPERIENCE_SECTION.description}
          </motion.p>
        </div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative">
          {/* ── Mobile: left-side scroll-driven timeline line ── */}
          <div className="absolute left-[9px] top-0 h-full w-[2px] md:hidden">
            <div className="absolute inset-0 bg-border/60 dark:bg-white/20 rounded-full" />
            <motion.div
              style={{ height: timelineHeight }}
              className="relative w-full origin-top bg-gradient-to-b from-primary via-pink-500 to-cyan-500"
            />
            <motion.div
              style={{ top: timelineHeight }}
              className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-full w-full rounded-full bg-primary/60 blur-[3px]"
              />
            </motion.div>
          </div>

          {/* ── Desktop: center timeline line ── */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 md:block">
            <div className="absolute inset-0 bg-border/60 dark:bg-white/20 rounded-full" />
            <motion.div
              style={{ height: timelineHeight }}
              className="relative w-full origin-top bg-gradient-to-b from-primary via-pink-500 to-cyan-500"
            />
            <motion.div
              style={{ top: timelineHeight }}
              className="absolute left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-full w-full rounded-full bg-primary/60 blur-sm"
              />
              <div className="absolute inset-[3px] rounded-full bg-primary border-2 border-background" />
            </motion.div>
          </div>

          {/* ── Desktop: timeline nodes per card ── */}
          {experiences.map((exp, index) => (
            <motion.div
              key={`node-${index}`}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
              className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-10"
              style={{ top: `${(index / experiences.length) * 100 + 100 / (experiences.length * 2)}%` }}
            >
              <div className="relative">
                <div className="w-4 h-4 rounded-full border-[3px] border-background shadow-lg" style={{ backgroundColor: exp.color }} />
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: exp.color }}
                />
              </div>
            </motion.div>
          ))}

          {/* ── Cards in alternating layout ── */}
          <div className="md:space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-10 text-center sm:mt-16"
        >
          <button
            type="button"
            onClick={() => scrollToSection("#contact")}
            className="group inline-flex items-center gap-2 rounded-full border border-border/50 dark:border-white/[0.1] bg-card/50 dark:bg-white/[0.04] px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 sm:px-6 sm:py-3 cursor-pointer"
          >
            <span>{EXPERIENCE_SECTION.ctaText}</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>

    <EngineeringProcess />
    </>
  )
}
