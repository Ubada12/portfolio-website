"use client"

/**
 * =============================================================================
 * PROJECTS SECTION COMPONENT
 * =============================================================================
 * 
 * Displays featured projects in an alternating layout with hover blur effects.
 * 
 * IMAGE REQUIREMENTS:
 * - Recommended size: 800x500px (16:10 aspect ratio)
 * - Minimum size: 600x400px
 * - Format: JPG, PNG, or WebP
 * - Images will be cropped to fit if not matching aspect ratio
 * 
 * FEATURES:
 * - Alternating layout (image left/right)
 * - Blur effect on non-hovered cards
 * - Scroll-triggered fade animations (left/right)
 * - Responsive design for all devices
 * 
 * GITHUB ICON BEHAVIOUR:
 * - Always visible on every project card
 * - githubPrivate: true  → shows amber lock badge, opens PrivateRepoDialog
 * - githubPrivate: false  → opens github URL in new tab
 * 
 * PRIVATE REPO DIALOG:
 * - Full-screen blocking overlay (rendered via createPortal on document.body)
 * - Accessible: role="dialog", aria-modal, aria-labelledby, auto-focus
 * - "Request Source Code" → generates message template with project data,
 *   dispatches "prefill-contact" CustomEvent, scrolls to message textarea
 * - "Close" → dismisses dialog
 * - Escape key also dismisses
 * - Body scroll locked while open
 * 
 * =============================================================================
 */

import { useRef, useState, memo, useCallback, useEffect, useMemo } from "react"
import { createPortal } from "react-dom"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Briefcase, Github, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

/** Reusable components */
import { TextReveal, SectionBadge } from "@/components/reusable"

/** Content constants */
import { PROJECTS, PROJECTS_SECTION } from "@/constants/projects"

export const Projects = memo(function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)")
    setIsDesktop(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index)
  }, [])

  return (
    <section id="projects" ref={ref} data-section="projects" className="relative py-20 px-4 sm:py-32 sm:px-6 overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        <SectionBadge
          index={3}
          label={PROJECTS_SECTION.badge}
          icon={<Briefcase size={14} />}
        />
        <TextReveal>
          <h2 className="mb-10 text-3xl font-bold tracking-tight sm:mb-16 sm:text-4xl md:text-5xl">
            {PROJECTS_SECTION.heading}
          </h2>
        </TextReveal>

        <div className="grid gap-6 sm:gap-8 md:gap-10">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isHovered={hoveredIndex === index}
              isAnyHovered={hoveredIndex !== null}
              onHover={handleHover}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  )
})

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  isHovered,
  isAnyHovered,
  onHover,
  isDesktop,
}: {
  project: (typeof PROJECTS)[number]
  index: number
  isHovered: boolean
  isAnyHovered: boolean
  onHover: (index: number | null) => void
  isDesktop: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const [showPrivateDialog, setShowPrivateDialog] = useState(false)
  
  const isReversed = index % 2 === 1
  const shouldBlur = isDesktop && isAnyHovered && !isHovered
  
  const slideDirection = isReversed ? 60 : -60

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: slideDirection }}
      animate={isInView ? { 
        opacity: shouldBlur ? 0.6 : 1, 
        x: 0,
        filter: shouldBlur ? "blur(3px)" : "blur(0px)",
        scale: isDesktop && isHovered ? 1.01 : 1,
      } : { opacity: 0, x: slideDirection }}
      transition={{ 
        opacity: { duration: 0.3 },
        x: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        filter: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className={`
        group relative grid gap-4 overflow-hidden rounded-2xl border border-border/50 
        bg-gradient-to-br from-card/80 to-card/40 p-4 backdrop-blur-md 
        sm:gap-6 sm:rounded-3xl sm:p-6 md:grid-cols-2 md:gap-8 md:p-8 
        transition-colors duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10
      `}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl sm:rounded-3xl"
        style={{
          background: `radial-gradient(800px circle at 50% 50%, ${project.color}15, transparent 50%)`,
        }}
      />

      {/* 
        Image Container - Fixed height, object-cover ensures proper fit
        Recommended image: 800x500px (16:10), min 600x400px
      */}
      <div className={`
        relative overflow-hidden rounded-lg sm:rounded-2xl 
        h-48 sm:h-56 md:h-64
        ${isReversed ? "md:order-2" : "md:order-1"}
      `}>
        <motion.div 
          animate={{ scale: isHovered ? 1.05 : 1 }} 
          transition={{ duration: 0.4, ease: "easeOut" }} 
          className="relative h-full w-full"
        >
          <Image 
            src={project.image || "/placeholder.svg"} 
            alt={project.title} 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </motion.div>
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"
        />
        <motion.div
          animate={{ opacity: isHovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 border-2 border-primary/30 rounded-lg sm:rounded-2xl"
        />
      </div>

      {/* Content */}
      <div className={`
        relative flex flex-col justify-center py-2 sm:py-0
        ${isReversed ? "md:order-1" : "md:order-2"}
      `}>
        <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gradient-to-r from-primary/20 to-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary sm:px-3.5 sm:py-1.5 sm:text-xs border border-primary/20 transition-all hover:border-primary/50 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-2xl md:text-3xl text-balance leading-tight">
          {project.title}
        </h3>
        
        <p className="mb-4 text-xs sm:mb-6 sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
          {project.description}
        </p>

        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <Link href={`/projects/${project.slug}`}>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
            >
              View Project
              <motion.span
                animate={{ x: isHovered ? 2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={14} className="sm:h-4 sm:w-4" />
              </motion.span>
            </motion.div>
          </Link>
          <motion.button
            type="button"
            aria-label={
              project.githubPrivate
                ? `${project.title} — private repository`
                : `View ${project.title} on GitHub`
            }
            onClick={() => {
              if (project.githubPrivate) {
                setShowPrivateDialog(true)
              } else {
                window.open(project.github, "_blank", "noopener,noreferrer")
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-border/60 p-2 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:bg-primary/5 sm:p-3 backdrop-blur-sm cursor-pointer relative"
          >
            <Github size={16} className="sm:h-5 sm:w-5" />
            {project.githubPrivate && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 ring-2 ring-background">
                <Lock size={7} className="text-white" />
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {showPrivateDialog &&
        createPortal(
          <AnimatePresence>
            <PrivateRepoDialog
              project={project}
              onClose={() => setShowPrivateDialog(false)}
            />
          </AnimatePresence>,
          document.body
        )}
    </motion.div>
  )
})

function PrivateRepoDialog({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[number]
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    dialogRef.current?.focus()
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const handleRequestCode = () => {
    const message = [
      `Hi, I'm interested in viewing the source code for your project "${project.title}".`,
      "",
      `Project: ${project.title}`,
      `Category: ${project.category}`,
      `Tech Stack: ${project.tags.join(", ")}`,
      "",
      "Could you share access or a walkthrough of the codebase? Thanks!",
    ].join("\n")

    window.dispatchEvent(
      new CustomEvent("prefill-contact", { detail: { message } })
    )
    onClose()
    setTimeout(() => {
      const messageField = document.getElementById("message")
      if (messageField) {
        messageField.scrollIntoView({ behavior: "smooth", block: "center" })
        setTimeout(() => messageField.focus(), 600)
      } else {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="private-repo-title"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden outline-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20">
              <Lock size={24} className="text-amber-500" />
            </div>

            <h3 id="private-repo-title" className="text-lg font-semibold mb-1">Private Repository</h3>
            <p className="text-primary font-medium text-sm mb-3">{project.title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              This project&apos;s source code is in a private repository. You can request access by sending a message through the contact form.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <motion.button
                type="button"
                onClick={handleRequestCode}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
              >
                Request Source Code
              </motion.button>
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors cursor-pointer"
              >
                Close
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
