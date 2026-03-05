/**
 * =============================================================================
 * ABOUT SECTION CONTENT
 * =============================================================================
 *
 * Everything displayed in the "About" section: philosophy text, capability
 * cards, differentiator traits, learning topics, and the thinking pipeline.
 *
 * WHAT TO EDIT:
 *  - ABOUT_SECTION   → Section heading and intro paragraphs
 *  - WHAT_I_BUILD    → Capability cards (name + short description)
 *  - WHAT_SETS_APART → Personal differentiators
 *  - CURRENTLY_EXPLORING → Topics you're currently learning
 *  - THINKING_PIPELINE   → Steps in the "How I Think" pipeline
 *  - ABOUT_PHILOSOPHY    → Engineering philosophy block
 *  - ABOUT_CLOSING       → Closing statement and tagline
 * =============================================================================
 */

/* ── Section header ───────────────────────────────────────────────────────── */

export const ABOUT_SECTION = {
  /** Badge label next to the section number */
  badge: "About",
  /** Main heading (the highlighted word gets gradient styling) */
  headingPrefix: "Crafting Digital",
  headingHighlight: "Excellence",
  /** First intro paragraph */
  introPrimary:
    "Full-stack engineer with a strong architectural mindset, transforming complex systems into elegant, scalable, and resilient digital experiences.",
  /** Second intro paragraph */
  introSecondary:
    "I approach software engineering as a systems problem, not a feature checklist — focusing on architectures that stay clear, scalable, and dependable long after the first version ships.",
} as const

/* ── Engineering philosophy block ─────────────────────────────────────────── */

export const ABOUT_PHILOSOPHY = {
  title: "Engineering Philosophy",
  /** First paragraph */
  bodyPrimary:
    "I design and build systems that are fast, maintainable, and resilient — not just visually polished. My work focuses on long-term scalability, performance, and clarity.",
  /** Second paragraph */
  bodySecondary:
    "I care deeply about engineering decisions that age well — clean abstractions, predictable behavior, and developer experience that supports teams instead of slowing them down.",
  /** Tagline beneath the paragraphs */
  tagline: "Systems that evolve gracefully",
} as const

/* ── Capability cards ─────────────────────────────────────────────────────── */

/**
 * Each card in the "What I Build" grid.
 *
 * `iconName` must match a Lucide icon display-name so the component can
 * resolve the correct icon dynamically (see About.tsx).
 *
 * `color` is a Tailwind gradient class pair (from-X to-Y).
 */
export const WHAT_I_BUILD = [
  { name: "Full-Stack Web Applications", iconName: "Globe", color: "from-cyan-500 to-blue-500", desc: "End-to-end apps from database to deployment" },
  { name: "RESTful & GraphQL APIs", iconName: "Database", color: "from-indigo-500 to-purple-500", desc: "Scalable backends with clean architecture" },
  { name: "Responsive UI Systems", iconName: "Layers", color: "from-pink-500 to-rose-500", desc: "Pixel-perfect interfaces that work everywhere" },
  { name: "Database Design & Modeling", iconName: "Boxes", color: "from-green-500 to-emerald-500", desc: "Normalized schemas, migrations, and query optimization" },
  { name: "Auth & Security Flows", iconName: "ShieldCheck", color: "from-orange-500 to-amber-500", desc: "JWT, OAuth, role-based access control" },
  { name: "CI/CD & Deployment Pipelines", iconName: "Rocket", color: "from-teal-500 to-cyan-500", desc: "Automated testing, builds, and cloud deployments" },
] as const

/* ── Differentiators ──────────────────────────────────────────────────────── */

export const WHAT_SETS_APART = [
  { name: "Systems Thinker", iconName: "Workflow", desc: "I don't just code features — I design how pieces fit together" },
  { name: "Fast Learner", iconName: "Zap", desc: "Picked up new stacks and shipped production code within weeks" },
  { name: "Clean Code Advocate", iconName: "Braces", desc: "Readable, testable, maintainable — code that teams can trust" },
  { name: "Problem Solver", iconName: "Target", desc: "I break down complex requirements into clear, buildable steps" },
] as const

/* ── Currently exploring ──────────────────────────────────────────────────── */

export const CURRENTLY_EXPLORING = [
  { label: "Rust", gradient: "from-orange-500 to-red-500" },
  { label: "System Design", gradient: "from-blue-500 to-indigo-500" },
  { label: "AWS", gradient: "from-amber-500 to-orange-500" },
  { label: "WebAssembly", gradient: "from-purple-500 to-pink-500" }
] as const

/* ── Thinking pipeline ────────────────────────────────────────────────────── */

/**
 * Steps displayed in the "How I Think" scroll-animated pipeline.
 *
 * `iconName` maps to a Lucide icon resolved in PipelineStep.tsx.
 */
export const THINKING_PIPELINE = [
  { iconName: "Workflow", label: "Understand Domain", desc: "Clarify business + technical constraints", gradient: "from-blue-500 to-cyan-500" },
  { iconName: "Boxes", label: "Model the System", desc: "Data flow, boundaries, responsibilities", gradient: "from-purple-500 to-pink-500" },
  { iconName: "Gauge", label: "Optimize Performance", desc: "Speed, scalability, reliability", gradient: "from-orange-500 to-red-500" },
  { iconName: "ShieldCheck", label: "Engineer for Scale", desc: "Maintainability & DX first", gradient: "from-green-500 to-emerald-500" },
] as const

/* ── Closing statement ────────────────────────────────────────────────────── */

export const ABOUT_CLOSING = {
  statement:
    "I enjoy working on problems where thoughtful engineering decisions matter — and where systems are built to evolve, not break.",
  tagline: "Long-term thinking • Clean systems • Real impact",
} as const
