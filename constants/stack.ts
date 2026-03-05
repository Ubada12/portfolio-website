/**
 * =============================================================================
 * TECH STACK DATA
 * =============================================================================
 *
 * Technologies, proficiency levels, and section copy for the Tech Stack section.
 *
 * WHAT TO EDIT:
 *  - TECH_STACK        → Add/remove/reorder technologies
 *  - STACK_CATEGORIES  → Filter tabs (should match categories used in TECH_STACK)
 *  - STACK_SECTION     → Section heading and description text
 *
 * NOTE: Each tech entry has an `iconKey` string. The TechStack component maps
 * these keys to their corresponding SVG icon components. If you add a new
 * technology, you also need to register its icon in the component's icon map.
 * =============================================================================
 */

/* ── Section copy ─────────────────────────────────────────────────────────── */

export const STACK_SECTION = {
  /** Badge label next to the section number */
  badge: "Tech Stack",
  /** Main heading (the highlighted word gets gradient styling) */
  headingPrefix: "Technologies I",
  headingHighlight: "Master",
  /** Subtitle beneath the heading */
  description:
    "A comprehensive toolkit spanning frontend, backend, and DevOps technologies",
} as const

/* ── Filter categories ────────────────────────────────────────────────────── */

export const STACK_CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Language",
  "DevOps",
  "Design",
] as const

/* ── Technology entries ───────────────────────────────────────────────────── */

/**
 * Each entry represents a single technology in the stack grid / marquee.
 *
 * Fields:
 *  - name        → Display name
 *  - category    → Must match one of STACK_CATEGORIES (excluding "All")
 *  - color       → Hex colour used for the icon tint and chip accents
 *  - description → Short one-line description
 *  - iconKey     → Key used to look up the SVG icon component in TechStack.tsx
 *  - proficiency → 0–100 percentage (controls Expert/Advanced/Intermediate label)
 *  - yearsUsed   → Number shown as "{n}y+" in the chip
 */
export const TECH_STACK = [
  { name: "React", category: "Frontend", color: "#61DAFB", description: "UI library for building interactive interfaces", iconKey: "React", proficiency: 95, yearsUsed: 5 },
  { name: "Next.js", category: "Frontend", color: "#8B5CF6", description: "React framework for production apps", iconKey: "NextJs", proficiency: 92, yearsUsed: 4 },
  { name: "Tailwind CSS", category: "Frontend", color: "#06B6D4", description: "Utility-first CSS framework", iconKey: "Tailwind", proficiency: 94, yearsUsed: 3 },
  { name: "Node.js", category: "Backend", color: "#22C55E", description: "JavaScript runtime for server-side", iconKey: "NodeJs", proficiency: 88, yearsUsed: 5 },
  { name: "PostgreSQL", category: "Backend", color: "#3B82F6", description: "Powerful relational database", iconKey: "PostgreSQL", proficiency: 82, yearsUsed: 4 },
  { name: "GraphQL", category: "Backend", color: "#EC4899", description: "Query language for APIs", iconKey: "GraphQL", proficiency: 80, yearsUsed: 3 },
  { name: "MongoDB", category: "Backend", color: "#22C55E", description: "NoSQL document database", iconKey: "MongoDB", proficiency: 83, yearsUsed: 4 },
  { name: "TypeScript", category: "Language", color: "#3178C6", description: "Typed superset of JavaScript", iconKey: "TypeScript", proficiency: 90, yearsUsed: 4 },
  { name: "Python", category: "Language", color: "#FACC15", description: "Versatile programming language", iconKey: "Python", proficiency: 75, yearsUsed: 3 },
  { name: "Docker", category: "DevOps", color: "#0EA5E9", description: "Container platform for apps", iconKey: "Docker", proficiency: 78, yearsUsed: 3 },
  { name: "AWS", category: "DevOps", color: "#FB923C", description: "Cloud computing platform", iconKey: "AWS", proficiency: 72, yearsUsed: 3 },
  { name: "Figma", category: "Design", color: "#F43F5E", description: "Collaborative design tool", iconKey: "Figma", proficiency: 85, yearsUsed: 4 },
] as const
