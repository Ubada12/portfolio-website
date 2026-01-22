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
 * =============================================================================
 */

import { useRef, useState, memo, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Briefcase, Github } from "lucide-react"

/** Reusable components */
import { TextReveal, SectionBadge } from "@/components/reusable"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "/images/modern-ecommerce-dashboard-dark-theme.jpg",
    tags: ["Next.js", "Stripe", "PostgreSQL", "TailwindCSS"],
    link: "#",
    github: "#",
    color: "#6366f1",
  },
  {
    id: 2,
    title: "AI Writing Assistant",
    description:
      "An AI-powered writing tool that helps users create better content with smart suggestions and grammar checks.",
    image: "/images/ai-writing-interface-dark-mode-sleek.jpg",
    tags: ["React", "OpenAI", "Node.js", "MongoDB"],
    link: "#",
    github: "#",
    color: "#ec4899",
  },
  {
    id: 3,
    title: "Fitness Tracking App",
    description: "A comprehensive fitness app with workout tracking, nutrition logging, and progress visualization.",
    image: "/images/fitness-app-dashboard-dark-theme-modern.jpg",
    tags: ["React Native", "Firebase", "Chart.js", "TypeScript"],
    link: "#",
    github: "#",
    color: "#10b981",
  },
  {
    id: 4,
    title: "Real Estate Portal",
    description: "A property listing platform with advanced search, virtual tours, and agent management system.",
    image: "/images/real-estate-property-listing-dark-theme.jpg",
    tags: ["Next.js", "Mapbox", "Prisma", "AWS"],
    link: "#",
    github: "#",
    color: "#f59e0b",
  },
]

export const Projects = memo(function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index)
  }, [])

  return (
    <section id="projects" ref={ref} data-section="projects" className="relative py-20 px-4 sm:py-32 sm:px-6 overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        <SectionBadge
          index={3}
          label="Work"
          icon={<Briefcase size={14} />}
        />
        <TextReveal>
          <h2 className="mb-10 text-3xl font-bold tracking-tight sm:mb-16 sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
        </TextReveal>

        <div className="grid gap-6 sm:gap-8 md:gap-10">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              isHovered={hoveredIndex === index}
              isAnyHovered={hoveredIndex !== null}
              onHover={handleHover}
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
}: {
  project: (typeof projects)[0]
  index: number
  isHovered: boolean
  isAnyHovered: boolean
  onHover: (index: number | null) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  
  const isReversed = index % 2 === 1
  const shouldBlur = isAnyHovered && !isHovered
  
  const slideDirection = isReversed ? 60 : -60

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: slideDirection }}
      animate={isInView ? { 
        opacity: shouldBlur ? 0.6 : 1, 
        x: 0,
        filter: shouldBlur ? "blur(3px)" : "blur(0px)",
        scale: isHovered ? 1.01 : 1,
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
          className="h-full w-full"
        >
          <img 
            src={project.image || "/placeholder.svg"} 
            alt={project.title} 
            className="h-full w-full object-cover object-center"
            loading="lazy"
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
          <motion.a
            href={project.link}
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
          </motion.a>
          <motion.a
            href={project.github}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-border/60 p-2 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:bg-primary/5 sm:p-3 backdrop-blur-sm"
          >
            <Github size={16} className="sm:h-5 sm:w-5" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
})
