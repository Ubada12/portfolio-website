"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Briefcase, Calendar, MapPin, ExternalLink, ChevronRight, Building2 } from "lucide-react"

/** Reusable components */
import { TextReveal, SectionBadge } from "@/components/reusable"
import { EngineeringProcess } from "@/components/sections/experience/EngineeringProcess"

const experiences = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    type: "Full-time",
    description:
      "Leading development of enterprise-scale web applications. Architecting microservices and mentoring junior developers.",
    achievements: ["Increased system performance by 40%", "Led team of 5 developers", "Shipped 3 major products"],
    technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
    color: "#8B5CF6",
  },
  {
    role: "Full-Stack Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    period: "2020 - 2022",
    type: "Full-time",
    description:
      "Built and shipped multiple products from scratch. Implemented CI/CD pipelines and improved deployment processes.",
    achievements: ["Built product from 0 to 10K users", "Reduced deploy time by 60%", "Implemented real-time features"],
    technologies: ["Vue.js", "Python", "Docker", "MongoDB"],
    color: "#EC4899",
  },
  {
    role: "Frontend Developer",
    company: "DesignStudio",
    location: "Austin, TX",
    period: "2019 - 2020",
    type: "Full-time",
    description:
      "Created responsive, accessible web interfaces. Collaborated closely with designers to implement pixel-perfect designs.",
    achievements: [
      "Improved accessibility score to 98",
      "Created reusable component library",
      "Reduced bundle size by 35%",
    ],
    technologies: ["React", "TypeScript", "Sass", "Figma"],
    color: "#06B6D4",
  },
  {
    role: "Junior Developer",
    company: "WebAgency",
    location: "Remote",
    period: "2018 - 2019",
    type: "Contract",
    description:
      "Developed client websites and learned modern web development practices. Gained experience with various CMS platforms.",
    achievements: ["Delivered 15+ client projects", "Learned agile methodologies", "Built custom WordPress themes"],
    technologies: ["JavaScript", "PHP", "WordPress", "MySQL"],
    color: "#F59E0B",
  },
]

function ExperienceCard({
  exp,
  index,
  isInView,
}: {
  exp: (typeof experiences)[0]
  index: number
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="relative mb-8 md:mb-16 md:w-[calc(50%-40px)] md:odd:mr-auto md:even:ml-auto"
    >
      {/* Connecting line to timeline - hidden on mobile */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
        className={`absolute top-8 hidden h-px w-10 md:block ${
          index % 2 === 0 ? "right-0 origin-left translate-x-full" : "left-0 origin-right -translate-x-full"
        }`}
        style={{
          background: `linear-gradient(${index % 2 === 0 ? "to right" : "to left"}, ${exp.color}, transparent)`,
        }}
      />

      {/* Timeline node - hidden on mobile */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ delay: index * 0.2 + 0.4, type: "spring", stiffness: 200 }}
        className={`absolute top-6 z-10 hidden md:block ${
          index % 2 === 0 ? "right-0 translate-x-[calc(100%+40px)]" : "left-0 -translate-x-[calc(100%+40px)]"
        }`}
      >
        <div className="relative flex h-6 w-6 items-center justify-center" style={{ color: exp.color }}>
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.3,
            }}
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: exp.color }}
          />
          <div
            className="relative h-4 w-4 rounded-full border-2 border-background"
            style={{ backgroundColor: exp.color }}
          />
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ y: -5 }}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-xl transition-colors hover:border-border md:rounded-2xl"
        style={{
          boxShadow: isHovered ? `0 20px 40px -20px ${exp.color}40` : "none",
        }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 md:rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${exp.color}30, transparent, ${exp.color}30)`,
            padding: "1px",
          }}
        />

        {/* Glowing orb that follows hover */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${isHovered ? "50%" : "0%"} 50%, ${exp.color}15, transparent 40%)`,
          }}
        />

        {/* Top accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
          className="h-1 origin-left"
          style={{ background: `linear-gradient(to right, ${exp.color}, ${exp.color}50, transparent)` }}
        />

        <div className="relative p-4 sm:p-6">
          {/* Header */}
          <div className="mb-3 flex items-start justify-between gap-3 sm:mb-4 sm:gap-4">
            <div className="flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-3 sm:py-1 sm:text-xs"
                  style={{ backgroundColor: `${exp.color}20`, color: exp.color }}
                >
                  <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {exp.period}
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:px-3 sm:py-1 sm:text-xs">
                  {exp.type}
                </span>
              </div>
              <motion.h3
                className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl"
                style={{ color: isHovered ? exp.color : undefined }}
              >
                {exp.role}
              </motion.h3>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-muted-foreground sm:gap-3">
                <span className="flex items-center gap-1 text-sm font-medium sm:text-base">
                  <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: exp.color }} />
                  {exp.company}
                </span>
                <span className="flex items-center gap-1 text-xs sm:text-sm">
                  <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              className="rounded-full p-1.5 transition-colors sm:p-2"
              style={{ backgroundColor: isHovered ? `${exp.color}20` : "transparent" }}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: isHovered ? exp.color : undefined }} />
            </motion.div>
          </div>

          {/* Description */}
          <p className="mb-3 text-xs leading-relaxed text-muted-foreground sm:mb-4 sm:text-sm">{exp.description}</p>

          {/* Expandable achievements */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-3 overflow-hidden sm:mb-4"
              >
                <div className="rounded-lg p-3 sm:rounded-xl sm:p-4" style={{ backgroundColor: `${exp.color}10` }}>
                  <h4 className="mb-2 text-xs font-semibold sm:mb-3 sm:text-sm" style={{ color: exp.color }}>
                    Key Achievements
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                          className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
                          style={{ backgroundColor: exp.color }}
                        />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technologies - Responsive sizing */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {exp.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2 + 0.6 + i * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: exp.color,
                  color: "#000",
                }}
                className="rounded-md border border-border/50 bg-muted/50 px-2 py-1 text-[10px] font-medium transition-colors sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-xs"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bottom gradient line on hover */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          className="h-px origin-left"
          style={{ background: `linear-gradient(to right, transparent, ${exp.color}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  )
}

export function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="experience" ref={ref} data-section="experience" className="relative px-4 sm:px-6">
      {/* Background effects */}
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

        {/* Grid pattern - hidden on mobile */}
        <div
          className="absolute inset-0 hidden opacity-[0.02] sm:block"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* 🔑 CONTENT WRAPPER (THIS HOLDS THE PADDING) */}
      <div className="relative mx-auto max-w-5xl py-20 sm:py-32">
        {/* Section header */}
        <div className="mb-12 text-center sm:mb-20">
          <SectionBadge
            index={4}
            label="Experience"
            icon={<Building2 size={14} />}
          />
          <TextReveal>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
              {"Where I've"}{" "}
              <span className="bg-gradient-to-r from-primary via-pink-500 to-primary bg-clip-text text-transparent">
                Worked
              </span>
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base"
          >
            A journey through my professional career, building products and growing as a developer.
          </motion.p>
        </div>

        {/* Experience timeline and cards */}
        <div className="relative">
          {/* Animated timeline line - hidden on mobile */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border/30 md:left-1/2 md:block md:-translate-x-1/2">
            <motion.div
              style={{ height: timelineHeight }}
              className="w-full origin-top bg-gradient-to-b from-primary via-pink-500 to-cyan-500"
            />
            <motion.div
              style={{ top: timelineHeight }}
              className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="h-full w-full rounded-full bg-primary blur-sm"
              />
            </motion.div>
          </div>

          {/* Experience cards */}
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-10 text-center sm:mt-16"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 sm:px-6 sm:py-3"
          >
            <span>{"Let's work together"}</span>
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.span>
          </a>
        </motion.div>
      </div>

      {/* Engineering Process Section */}
      <EngineeringProcess/>
    </section>
  )
}
