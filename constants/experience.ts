/**
 * =============================================================================
 * EXPERIENCE & ENGINEERING PROCESS DATA
 * =============================================================================
 *
 * Professional experience timeline and engineering process steps.
 *
 * WHAT TO EDIT:
 *  - EXPERIENCE_SECTION → Section heading and description
 *  - EXPERIENCES        → Add/remove/reorder work-history entries
 *  - PROCESS_STEPS      → Update engineering process stages
 * =============================================================================
 */

/* ── Section copy ─────────────────────────────────────────────────────────── */

export const EXPERIENCE_SECTION = {
  /** Badge label next to the section number */
  badge: "Experience",
  /** Main heading (the highlighted word gets gradient styling) */
  headingPrefix: "Where I've",
  headingHighlight: "Worked",
  /** Subtitle beneath the heading */
  description:
    "A journey through my professional career, building products and growing as a developer.",
  /** CTA text at the bottom of the timeline */
  ctaText: "Let's work together",
} as const

/* ── Work history entries ─────────────────────────────────────────────────── */

export const EXPERIENCES = [
  {
    /** Job title */
    role: "Senior Full-Stack Developer",
    /** Company / organisation name */
    company: "TechCorp Inc.",
    /** Office location */
    location: "San Francisco, CA",
    /** Employment period */
    period: "2022 - Present",
    /** Employment type badge */
    type: "Full-time",
    /** Short role description (1–2 sentences) */
    description:
      "Leading development of enterprise-scale web applications. Architecting microservices and mentoring junior developers.",
    /** Bullet-point achievements shown in the expandable area */
    achievements: [
      "Increased system performance by 40%",
      "Led team of 5 developers",
      "Shipped 3 major products",
    ],
    /** Technology tags */
    technologies: ["React", "Node.js", "AWS", "PostgreSQL"],
    /** Accent colour (hex) used for the timeline node and card accents */
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
    achievements: [
      "Built product from 0 to 10K users",
      "Reduced deploy time by 60%",
      "Implemented real-time features",
    ],
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
    achievements: [
      "Delivered 15+ client projects",
      "Learned agile methodologies",
      "Built custom WordPress themes",
    ],
    technologies: ["JavaScript", "PHP", "WordPress", "MySQL"],
    color: "#F59E0B",
  },
] as const

/* ── Engineering process steps ────────────────────────────────────────────── */

/**
 * Steps displayed in the "Engineering Process" carousel beneath the timeline.
 *
 * `iconName` maps to a Lucide icon resolved in EngineeringProcess.tsx.
 */
export const PROCESS_STEPS = [
  {
    id: 1,
    step: 1,
    title: "Discovery & Ideation",
    subtitle: "Understanding the Vision",
    description:
      "Every great product begins with deep understanding. I dive into research, user needs analysis, and the competitive landscape to transform raw ideas into validated concepts.",
    iconName: "Lightbulb",
    color: "#F59E0B",
    highlights: ["User Research", "Market Analysis", "Problem Definition", "Opportunity Mapping"],
  },
  {
    id: 2,
    step: 2,
    title: "Architecture & Design",
    subtitle: "Blueprinting Excellence",
    description:
      "With clarity on objectives, I craft scalable architectures and intuitive designs. This phase bridges vision with technical feasibility through detailed planning.",
    iconName: "PenTool",
    color: "#8B5CF6",
    highlights: ["System Design", "UI/UX Wireframes", "Tech Stack Selection", "Database Schema"],
  },
  {
    id: 3,
    step: 3,
    title: "Development Sprint",
    subtitle: "Building with Precision",
    description:
      "Code meets creativity. I implement features iteratively, following best practices and clean code principles while maintaining constant communication on progress.",
    iconName: "Code2",
    color: "#06B6D4",
    highlights: ["Agile Development", "Code Reviews", "CI/CD Pipeline", "Performance Optimization"],
  },
  {
    id: 4,
    step: 4,
    title: "Launch & Iterate",
    subtitle: "Delivering Impact",
    description:
      "Deployment is just the beginning. I ensure smooth launches with monitoring, gather real-world feedback, and continuously iterate to maximize product value.",
    iconName: "Rocket",
    color: "#EC4899",
    highlights: ["Deployment Strategy", "Performance Monitoring", "User Feedback Loop", "Continuous Improvement"],
  },
] as const
