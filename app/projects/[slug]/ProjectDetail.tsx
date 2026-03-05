"use client"

/**
 * =============================================================================
 * PROJECT DETAIL — ENHANCED RICH TEMPLATE
 * =============================================================================
 *
 * A production-grade, fully responsive project detail page with scroll-triggered
 * animations, glassmorphism cards, and polished micro-interactions.
 *
 * ARCHITECTURE:
 *  - Every section uses `useInView` for viewport-triggered entrance animations
 *  - Staggered children create a cascading reveal as the user scrolls
 *  - Project accent `color` is threaded through all sections for visual cohesion
 *  - All sections gracefully hide when their data is absent or empty
 *  - `useReducedMotion` respects prefers-reduced-motion for accessibility
 *  - Accordion uses proper ARIA attributes for screen reader support
 *
 * SECTION RENDER LOGIC:
 *  Hero                   → always
 *  Metrics Bar            → metrics?.length > 0
 *  Role + Overview        → always (overview is required)
 *  Demo Video             → demoVideo exists AND url is non-empty
 *  Highlights Grid        → highlights?.length > 0
 *  Screenshot Gallery     → gallery?.length > 0
 *  Story Section          → problem OR solution OR outcome exists
 *  Challenges Accordion   → challenges?.length > 0
 *  Tech Deep-Dive         → techDetails exists
 *  Docs CTA Banner        → docsAvailable === true
 *  Prev / Next Nav        → prevProject OR nextProject exists
 *
 * PROPS:
 *  project        — ProjectDoc object from constants
 *  docsAvailable  — server-validated boolean (true only if file exists)
 *
 * =============================================================================
 */

import { useState, useRef, useId } from "react"
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Zap,
  Database,
  Bell,
  Cpu,
  Shield,
  Brain,
  Eye,
  Target,
  Layers,
  Code,
  Globe,
  Rocket,
  Settings,
  Users,
  BarChart3,
  Lock,
  Sparkles,
  Wrench,
  Play,
  type LucideIcon,
} from "lucide-react"
import type { ProjectDoc } from "@/constants/projects/_template"

/* ── Icon map — resolves string names from constants to Lucide components ── */

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Database,
  Bell,
  Cpu,
  Shield,
  Brain,
  Eye,
  Target,
  Layers,
  Code,
  Globe,
  Rocket,
  Settings,
  Users,
  BarChart3,
  Lock,
  Sparkles,
  Wrench,
}

/* ── Shared animation utilities ────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1] as const

function getFadeUp(reduced: boolean) {
  return reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

function getStaggerContainer(reduced: boolean) {
  return reduced
    ? { hidden: {}, visible: { transition: { staggerChildren: 0, delayChildren: 0 } } }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
}

function getTransition(reduced: boolean, duration = 0.5) {
  return reduced ? { duration: 0.15, ease: "easeOut" as const } : { duration, ease: EASE }
}

/* ── Reusable hook for section viewport detection ──────────────────────── */

function useSectionInView(threshold = 0.15) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return { ref, isInView }
}

/* ── Section heading component — consistent styling across all sections ── */

function SectionHeading({
  children,
  color,
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      {color && (
        <div
          className="h-6 w-1 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
        {children}
      </h2>
    </div>
  )
}

/* ── Main component ────────────────────────────────────────────────────── */

export function ProjectDetail({
  project,
  docsAvailable,
}: {
  project: ProjectDoc
  docsAvailable: boolean
}) {
  const prefersReducedMotion = useReducedMotion()
  const rm = !!prefersReducedMotion

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Ambient background glow keyed to project accent colour */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${project.color}, transparent)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 md:px-8 md:py-16 lg:py-20">
        <BackLink rm={rm} />
        <HeroSection project={project} docsAvailable={docsAvailable} rm={rm} />
        <MetricsBar metrics={project.metrics} color={project.color} rm={rm} />
        <RoleOverview project={project} rm={rm} />
        <DemoVideo demoVideo={project.demoVideo} color={project.color} projectTitle={project.title} rm={rm} />
        <HighlightsGrid highlights={project.highlights} color={project.color} rm={rm} />
        <ScreenshotGallery gallery={project.gallery} color={project.color} rm={rm} />
        <StorySection project={project} color={project.color} rm={rm} />
        <ChallengesAccordion challenges={project.challenges} color={project.color} rm={rm} />
        <TechDeepDive techDetails={project.techDetails} color={project.color} rm={rm} />
        <DocsBanner docsAvailable={docsAvailable} docsHtml={project.docsHtml} color={project.color} rm={rm} />
        <PrevNextNav
          prevProject={project.prevProject}
          nextProject={project.nextProject}
          color={project.color}
          rm={rm}
        />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  BACK LINK                                                                */
/*  Animated breadcrumb-style return link with hover translation effect      */
/* ═══════════════════════════════════════════════════════════════════════════ */

function BackLink({ rm }: { rm: boolean }) {
  return (
    <motion.div
      initial={rm ? { opacity: 0 } : { opacity: 0, x: -20 }}
      animate={rm ? { opacity: 1 } : { opacity: 1, x: 0 }}
      transition={getTransition(rm)}
    >
      <Link
        href="/#projects"
        className="group inline-flex items-center gap-2.5 rounded-full border border-border/40 bg-card/30 backdrop-blur-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-card/60 transition-all duration-300 mb-8 sm:mb-12"
      >
        <ArrowLeft
          size={14}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        Back to Projects
      </Link>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  HERO SECTION                                                             */
/*  Full-bleed image hero with gradient overlays, staggered text reveal,     */
/*  status badge, tech tags, and action buttons                              */
/* ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection({
  project,
  docsAvailable,
  rm,
}: {
  project: ProjectDoc
  docsAvailable: boolean
  rm: boolean
}) {
  const statusStyles: Record<string, string> = {
    Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10",
    "In Development": "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-amber-500/10",
    Archived: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30 shadow-zinc-500/10",
    "Client Work": "bg-blue-500/15 text-blue-400 border-blue-500/30 shadow-blue-500/10",
  }

  const t = getTransition(rm, 0.7)

  return (
    <motion.div
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
      animate={rm ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={t}
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/30 mb-10 sm:mb-14 md:mb-16 shadow-2xl shadow-black/20"
    >
      {/* Hero image with layered gradient overlays */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[2.2/1]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
          className="object-cover object-center"
        />
        {/* Bottom-to-top gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        {/* Accent colour radial glow at the bottom */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${project.color}50, transparent 70%)`,
          }}
        />
        {/* Subtle vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content overlay positioned at the bottom of the hero image */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 lg:p-12">
        {/* Status badge and metadata row */}
        <motion.div
          initial={rm ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={rm ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={rm ? getTransition(rm) : { delay: 0.2, ...getTransition(rm) }}
          className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4"
        >
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold border shadow-sm ${statusStyles[project.status] ?? statusStyles["In Development"]}`}
          >
            {project.status === "Live" && (
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            )}
            {project.status}
          </span>
          <span className="text-[10px] sm:text-xs text-white/60 font-medium">
            {project.year} · {project.duration} · {project.category}
          </span>
        </motion.div>

        {/* Project title with tracking adjustment for large text */}
        <motion.h1
          initial={rm ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={rm ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={rm ? getTransition(rm) : { delay: 0.25, ...getTransition(rm, 0.6) }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 sm:mb-3 leading-[1.1]"
        >
          {project.title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={rm ? getTransition(rm) : { delay: 0.3, ...getTransition(rm) }}
          className="text-sm sm:text-base md:text-lg text-white/70 mb-4 sm:mb-5 max-w-2xl leading-relaxed"
        >
          {project.tagline}
        </motion.p>

        {/* Technology tags rendered as accent-coloured pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={rm ? getTransition(rm) : { delay: 0.35, ...getTransition(rm) }}
          className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold border backdrop-blur-md transition-colors duration-200"
              style={{
                backgroundColor: `${project.color}12`,
                borderColor: `${project.color}30`,
                color: project.color,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Action buttons — Live Site, GitHub, Docs */}
        <motion.div
          initial={rm ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={rm ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={rm ? getTransition(rm) : { delay: 0.4, ...getTransition(rm) }}
          className="flex flex-wrap gap-2.5 sm:gap-3"
        >
          {project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.03] hover:shadow-lg active:scale-[0.97]"
              style={{
                backgroundColor: project.color,
                boxShadow: `0 4px 20px ${project.color}40`,
              }}
            >
              Visit Live Site
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Github size={14} />
              View Source
            </a>
          )}
          {docsAvailable && project.docsHtml && (
            <a
              href={project.docsHtml}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-[1.03] active:scale-[0.97]"
            >
              <FileText size={14} />
              View Docs
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  METRICS BAR                                                              */
/*  Responsive grid of key project metrics with accent-coloured values,      */
/*  glassmorphism cards, and staggered scroll-triggered entrance              */
/* ═══════════════════════════════════════════════════════════════════════════ */

function MetricsBar({
  metrics,
  color,
  rm,
}: {
  metrics?: ProjectDoc["metrics"]
  color: string
  rm: boolean
}) {
  const { ref, isInView } = useSectionInView(0.2)

  if (!metrics || metrics.length === 0) return null

  return (
    <motion.div
      ref={ref}
      variants={getStaggerContainer(rm)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16 md:mb-20"
    >
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          variants={getFadeUp(rm)}
          transition={getTransition(rm)}
          className="group relative rounded-2xl border border-border/30 bg-card/40 backdrop-blur-md p-4 sm:p-5 md:p-6 text-center overflow-hidden transition-all duration-300 hover:border-border/60 hover:bg-card/60"
        >
          {/* Subtle accent glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 100%, ${color}08, transparent 70%)`,
            }}
          />
          <div className="relative">
            <div
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
              style={{ color }}
            >
              {metric.prefix}
              {metric.value}
              {metric.suffix}
            </div>
            <div className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-1.5 font-medium">
              {metric.label}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  ROLE + OVERVIEW                                                          */
/*  Two-column layout: project overview on the left, role card on the right  */
/*  with accent-coloured role title and responsibility list                  */
/* ═══════════════════════════════════════════════════════════════════════════ */

function RoleOverview({ project, rm }: { project: ProjectDoc; rm: boolean }) {
  const { ref, isInView } = useSectionInView()

  return (
    <motion.div
      ref={ref}
      variants={getStaggerContainer(rm)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid gap-6 sm:gap-8 md:grid-cols-5 mb-12 sm:mb-16 md:mb-20"
    >
      {/* Overview — takes 3/5 of the grid on desktop */}
      <motion.div
        variants={getFadeUp(rm)}
        transition={getTransition(rm)}
        className="md:col-span-3"
      >
        <SectionHeading color={project.color}>Project Overview</SectionHeading>
        <div className="rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md p-5 sm:p-6 md:p-8">
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
            {project.overview}
          </p>
        </div>
      </motion.div>

      {/* Role card — takes 2/5 of the grid on desktop */}
      <motion.div
        variants={getFadeUp(rm)}
        transition={getTransition(rm)}
        className="md:col-span-2"
      >
        <SectionHeading color={project.color}>My Role</SectionHeading>
        <div className="rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md p-5 sm:p-6 md:p-8 h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)]">
          <p
            className="text-sm sm:text-base font-bold mb-4"
            style={{ color: project.color }}
          >
            {project.role.title}
          </p>
          <ul className="space-y-2.5">
            {project.role.responsibilities.map((item, i) => (
              <li
                key={i}
                className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2.5"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  DEMO VIDEO                                                               */
/*  Browser-chrome framed video embed with accent-coloured shadow.           */
/*  Supports YouTube, Vimeo, and direct video URLs.                          */
/*  Uses project title in iframe title for screen reader accessibility       */
/* ═══════════════════════════════════════════════════════════════════════════ */

function DemoVideo({
  demoVideo,
  color,
  projectTitle,
  rm,
}: {
  demoVideo?: ProjectDoc["demoVideo"]
  color: string
  projectTitle: string
  rm: boolean
}) {
  const { ref, isInView } = useSectionInView()

  if (!demoVideo || !demoVideo.url) return null

  const embedUrl =
    demoVideo.type === "youtube"
      ? demoVideo.url.replace("watch?v=", "embed/")
      : demoVideo.type === "vimeo"
        ? demoVideo.url.replace("vimeo.com/", "player.vimeo.com/video/")
        : null

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getFadeUp(rm)}
      transition={getTransition(rm, 0.6)}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <SectionHeading color={color}>Demo</SectionHeading>
      <div
        className="rounded-2xl border border-border/30 overflow-hidden shadow-xl"
        style={{ boxShadow: `0 8px 40px ${color}12` }}
      >
        {/* Browser chrome header with traffic light dots */}
        <div className="flex items-center gap-2 px-4 py-3 bg-card/60 backdrop-blur-md border-b border-border/30">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1.5 rounded-md bg-background/50 px-3 py-1 text-[10px] text-muted-foreground">
              <Play size={10} />
              <span className="hidden sm:inline">Demo Preview</span>
            </div>
          </div>
        </div>
        {demoVideo.type === "direct" ? (
          <video
            src={demoVideo.url}
            controls
            aria-label={`${projectTitle} demo video`}
            className="w-full aspect-video bg-black"
          />
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            title={`${projectTitle} — demo video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
        ) : null}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  HIGHLIGHTS GRID                                                          */
/*  Feature highlight cards in a responsive 1/2/3 column grid with           */
/*  icon badges, glassmorphism, and accent-coloured hover borders            */
/* ═══════════════════════════════════════════════════════════════════════════ */

function HighlightsGrid({
  highlights,
  color,
  rm,
}: {
  highlights?: ProjectDoc["highlights"]
  color: string
  rm: boolean
}) {
  const { ref, isInView } = useSectionInView()

  if (!highlights || highlights.length === 0) return null

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getStaggerContainer(rm)}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <motion.div variants={fadeIn}>
        <SectionHeading color={color}>Key Highlights</SectionHeading>
      </motion.div>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, i) => {
          const Icon = ICON_MAP[item.icon] ?? Zap
          return (
            <motion.div
              key={i}
              variants={getFadeUp(rm)}
              transition={getTransition(rm)}
              className="group relative rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:border-border/60 hover:bg-card/50 hover:shadow-lg"
            >
              {/* Accent glow on hover */}
              <div
                className="absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                style={{ backgroundColor: `${color}15` }}
              />
              <div className="relative">
                <div
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}12`, color }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  SCREENSHOT GALLERY                                                       */
/*  Adaptive grid layout (1/2/3 cols based on item count) with rounded       */
/*  borders, captions, and scale-up hover effect                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ScreenshotGallery({
  gallery,
  color,
  rm,
}: {
  gallery?: ProjectDoc["gallery"]
  color?: string
  rm: boolean
}) {
  const { ref, isInView } = useSectionInView()

  if (!gallery || gallery.length === 0) return null

  const gridClass =
    gallery.length === 1
      ? "grid-cols-1 max-w-3xl mx-auto"
      : gallery.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getStaggerContainer(rm)}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <motion.div variants={fadeIn}>
        <SectionHeading color={color}>Screenshots</SectionHeading>
      </motion.div>
      <div className={`grid gap-3 sm:gap-4 ${gridClass}`}>
        {gallery.map((img, i) => (
          <motion.div
            key={i}
            variants={getFadeUp(rm)}
            transition={getTransition(rm)}
            className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card/20 transition-all duration-300 hover:border-border/60 hover:shadow-xl"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle overlay on hover for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {img.caption && (
              <div className="px-4 py-2.5 sm:py-3 bg-card/60 backdrop-blur-md border-t border-border/20">
                <p className="text-[11px] sm:text-xs text-muted-foreground text-center font-medium">
                  {img.caption}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  STORY SECTION                                                            */
/*  Vertical timeline-style layout with accent-coloured connector line,      */
/*  numbered step indicators, and staggered card reveals                     */
/* ═══════════════════════════════════════════════════════════════════════════ */

function StorySection({
  project,
  color,
  rm,
}: {
  project: ProjectDoc
  color: string
  rm: boolean
}) {
  const { ref, isInView } = useSectionInView()

  const parts: { label: string; content: string }[] = []
  if (project.problem) parts.push({ label: "The Problem", content: project.problem })
  if (project.solution) parts.push({ label: "The Solution", content: project.solution })
  if (project.outcome) parts.push({ label: "The Outcome", content: project.outcome })

  if (parts.length === 0) return null

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getStaggerContainer(rm)}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <motion.div variants={fadeIn}>
        <SectionHeading color={color}>The Story</SectionHeading>
      </motion.div>
      <div className="space-y-4 sm:space-y-5">
        {parts.map((part, i) => (
          <motion.div
            key={i}
            variants={getFadeUp(rm)}
            transition={getTransition(rm)}
            className="group relative flex gap-4 sm:gap-5"
          >
            {/* Timeline connector — vertical line and numbered dot */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 4px 12px ${color}30`,
                }}
              >
                {i + 1}
              </div>
              {i < parts.length - 1 && (
                <div
                  className="w-px flex-1 mt-2"
                  style={{ backgroundColor: `${color}25` }}
                />
              )}
            </div>

            {/* Story card */}
            <div className="flex-1 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md p-5 sm:p-6 mb-0 transition-all duration-300 group-hover:border-border/50 group-hover:bg-card/50">
              <h3
                className="text-sm sm:text-base font-bold mb-2 sm:mb-3"
                style={{ color }}
              >
                {part.label}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {part.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  CHALLENGES ACCORDION                                                     */
/*  Expandable accordion items with smooth height animation, accent-coloured */
/*  chevron indicator, glassmorphism card styling, and full ARIA support     */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ChallengesAccordion({
  challenges,
  color,
  rm,
}: {
  challenges?: ProjectDoc["challenges"]
  color: string
  rm: boolean
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, isInView } = useSectionInView()
  const baseId = useId()

  if (!challenges || challenges.length === 0) return null

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getStaggerContainer(rm)}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <motion.div variants={fadeIn}>
        <SectionHeading color={color}>Challenges & Solutions</SectionHeading>
      </motion.div>
      <div className="space-y-3">
        {challenges.map((challenge, i) => {
          const isOpen = openIndex === i
          const triggerId = `${baseId}-trigger-${i}`
          const panelId = `${baseId}-panel-${i}`
          return (
            <motion.div
              key={i}
              variants={getFadeUp(rm)}
              transition={getTransition(rm)}
              className="rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-border/50"
              style={isOpen ? { borderColor: `${color}30` } : {}}
            >
              <button
                id={triggerId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left text-sm sm:text-base font-bold transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold shrink-0"
                    style={{ backgroundColor: `${color}25`, color }}
                  >
                    {i + 1}
                  </span>
                  {challenge.title}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 ml-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  style={{ color }}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={rm ? { duration: 0.15 } : { duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <div
                        className="h-px w-full mb-4"
                        style={{ backgroundColor: `${color}15` }}
                      />
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-9">
                        {challenge.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  TECH DEEP-DIVE                                                           */
/*  Summary paragraph followed by a structured tech stack list with          */
/*  accent-coloured names and glassmorphism card container                   */
/* ═══════════════════════════════════════════════════════════════════════════ */

function TechDeepDive({
  techDetails,
  color,
  rm,
}: {
  techDetails?: ProjectDoc["techDetails"]
  color: string
  rm: boolean
}) {
  const { ref, isInView } = useSectionInView()

  if (!techDetails) return null

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getStaggerContainer(rm)}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <motion.div variants={fadeIn}>
        <SectionHeading color={color}>Technical Deep-Dive</SectionHeading>
      </motion.div>
      <motion.div
        variants={getFadeUp(rm)}
        transition={getTransition(rm)}
        className="rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md p-5 sm:p-6 md:p-8 overflow-hidden"
      >
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
          {techDetails.summary}
        </p>
        <div className="space-y-3 sm:space-y-4">
          {techDetails.stack.map((tech, i) => (
            <motion.div
              key={i}
              variants={getFadeUp(rm)}
              transition={getTransition(rm, 0.4)}
              className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-5 p-3 sm:p-4 rounded-xl bg-background/30 border border-border/20 transition-colors duration-200 hover:bg-background/50"
            >
              <span
                className="text-sm sm:text-base font-bold shrink-0 sm:w-36 md:w-40"
                style={{ color }}
              >
                {tech.name}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {tech.reason}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  DOCS CTA BANNER                                                          */
/*  Gradient-bordered call-to-action banner encouraging users to read the    */
/*  full project documentation. Only renders if docs file exists             */
/* ═══════════════════════════════════════════════════════════════════════════ */

function DocsBanner({
  docsAvailable,
  docsHtml,
  color,
  rm,
}: {
  docsAvailable: boolean
  docsHtml?: string
  color: string
  rm: boolean
}) {
  const { ref, isInView } = useSectionInView()

  if (!docsAvailable || !docsHtml) return null

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getFadeUp(rm)}
      transition={getTransition(rm, 0.6)}
      className="mb-12 sm:mb-16 md:mb-20"
    >
      <div
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center border"
        style={{
          borderColor: `${color}20`,
        }}
      >
        {/* Background gradient glow */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${color}, transparent 70%)`,
          }}
        />
        <div className="relative">
          <div
            className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto mb-4 sm:mb-5"
            style={{ backgroundColor: `${color}12` }}
          >
            <FileText size={28} style={{ color }} />
          </div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
            Full Documentation Available
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-6 max-w-lg mx-auto leading-relaxed">
            Dive deeper into the technical implementation, architecture decisions,
            and methodology behind this project.
          </p>
          <a
            href={docsHtml}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 sm:px-8 sm:py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.03] hover:shadow-lg active:scale-[0.97]"
            style={{
              backgroundColor: color,
              boxShadow: `0 4px 20px ${color}30`,
            }}
          >
            Read Full Documentation
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PREV / NEXT NAVIGATION                                                   */
/*  Bottom navigation cards for browsing between projects. Features          */
/*  directional arrows, formatted slug names, and hover effects              */
/* ═══════════════════════════════════════════════════════════════════════════ */

function PrevNextNav({
  prevProject,
  nextProject,
  color,
  rm,
}: {
  prevProject?: string
  nextProject?: string
  color: string
  rm: boolean
}) {
  const { ref, isInView } = useSectionInView(0.3)

  if (!prevProject && !nextProject) return null

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getStaggerContainer(rm)}
      className="pt-8 sm:pt-10 border-t border-border/30"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {prevProject ? (
          <motion.div variants={getFadeUp(rm)} transition={getTransition(rm)}>
            <Link
              href={`/projects/${prevProject}`}
              className="group flex items-center gap-3 sm:gap-4 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md p-4 sm:p-5 md:p-6 transition-all duration-300 hover:border-border/60 hover:bg-card/50 hover:shadow-lg h-full"
            >
              <div
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
                style={{ backgroundColor: `${color}10` }}
              >
                <ChevronLeft
                  size={18}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium mb-0.5">
                  Previous
                </div>
                <div className="text-sm sm:text-base font-bold truncate">
                  {formatSlug(prevProject)}
                </div>
              </div>
            </Link>
          </motion.div>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextProject ? (
          <motion.div variants={getFadeUp(rm)} transition={getTransition(rm)}>
            <Link
              href={`/projects/${nextProject}`}
              className="group flex items-center justify-end gap-3 sm:gap-4 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-md p-4 sm:p-5 md:p-6 text-right transition-all duration-300 hover:border-border/60 hover:bg-card/50 hover:shadow-lg h-full"
            >
              <div className="min-w-0">
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-medium mb-0.5">
                  Next
                </div>
                <div className="text-sm sm:text-base font-bold truncate">
                  {formatSlug(nextProject)}
                </div>
              </div>
              <div
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                style={{ backgroundColor: `${color}10` }}
              >
                <ChevronRight
                  size={18}
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </div>
            </Link>
          </motion.div>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>
    </motion.div>
  )
}

/* ── Utilities ────────────────────────────────────────────────────────────── */

/**
 * Converts a URL slug into a human-readable title.
 * Example: "goat-detection" → "Goat Detection"
 */
function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}
