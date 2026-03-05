/**
 * =============================================================================
 * PROJECT DOCUMENT TYPE
 * =============================================================================
 *
 * Defines the complete data contract for every project in the portfolio.
 * Each project file in this directory must export a single `ProjectDoc` object.
 *
 * FIELD CATEGORIES:
 *  - CORE      → Required on ALL projects. Used by homepage cards + detail page.
 *  - IDENTITY  → Required on ALL projects. Metadata shown in the detail header.
 *  - ROLE      → Required on ALL projects. Your role and responsibilities.
 *  - STORY     → `overview` is required; `problem`, `solution`, `outcome` are optional.
 *  - MEDIA     → Optional. Video demo and screenshot gallery.
 *  - RICH      → Optional arrays. Metrics, highlights, challenges, tech deep-dive.
 *  - DOCS      → Optional. Path to an HTML doc file in public/docs/.
 *  - NAV       → Optional. Slug strings for prev/next project navigation.
 *
 * ICON CONVENTION (highlights):
 *  - Use Lucide icon names as strings (e.g. "Zap", "Shield", "Brain").
 *  - The detail page component resolves them via a local icon map.
 *
 * =============================================================================
 */

/* ── Core ──────────────────────────────────────────────────────────────────── */

export type ProjectDoc = {
  /** Unique numeric identifier */
  id: number
  /** URL-safe slug — used for /projects/[slug] routing */
  slug: string
  /** Display title */
  title: string
  /** Short description (1–2 sentences) — shown on homepage cards */
  description: string
  /** Hero image path relative to /public (e.g. "/images/project.jpg") */
  image: string
  /** Technology tags rendered as pills */
  tags: string[]
  /** Live site URL — use "#" if not available */
  link: string
  /** GitHub repository URL — use "#" if not available */
  github: string
  /** Whether the GitHub repo is private — triggers dialog instead of link */
  githubPrivate?: boolean
  /** Hex accent colour for hover effects and highlights */
  color: string

  /* ── Identity ──────────────────────────────────────────────────────────── */

  /** Punchy one-liner displayed under the title on the detail page */
  tagline: string
  /** Current project status */
  status: "Live" | "In Development" | "Archived" | "Client Work"
  /** Year the project was built (e.g. "2024") */
  year: string
  /** Approximate build duration (e.g. "3 months") */
  duration: string
  /** Project category (e.g. "Computer Vision", "Full Stack") */
  category: string

  /* ── Role ───────────────────────────────────────────────────────────────── */

  /** Your role on the project */
  role: {
    /** Role title (e.g. "Lead Developer") */
    title: string
    /** List of key responsibilities */
    responsibilities: string[]
  }

  /* ── Story ──────────────────────────────────────────────────────────────── */

  /** Project overview paragraph — always shown */
  overview: string
  /** The problem this project solves */
  problem?: string
  /** How the project addresses the problem */
  solution?: string
  /** Results or impact of the project */
  outcome?: string

  /* ── Media ──────────────────────────────────────────────────────────────── */

  /** Demo video — renders in a browser-frame embed */
  demoVideo?: {
    type: "youtube" | "vimeo" | "direct"
    url: string
  }

  /** Screenshot gallery — layout adapts to item count */
  gallery?: {
    src: string
    alt: string
    caption?: string
  }[]

  /* ── Rich Content ───────────────────────────────────────────────────────── */

  /** Key metrics displayed in a horizontal bar */
  metrics?: {
    label: string
    value: string
    suffix?: string
    prefix?: string
  }[]

  /** Feature highlights shown in a grid with icons */
  highlights?: {
    title: string
    description: string
    /** Lucide icon name (e.g. "Zap", "Shield") */
    icon: string
  }[]

  /** Challenges faced during development — rendered as an accordion */
  challenges?: {
    title: string
    description: string
  }[]

  /** Technical deep-dive section */
  techDetails?: {
    summary: string
    stack: {
      name: string
      reason: string
    }[]
  }

  /* ── Docs ────────────────────────────────────────────────────────────────── */

  /**
   * Path to an HTML documentation file (e.g. "/docs/goat-detection.html").
   * Validated server-side — the button is only rendered if the file actually
   * exists in public/docs/.
   */
  docsHtml?: string

  /* ── Navigation ─────────────────────────────────────────────────────────── */

  /** Slug of the previous project (for prev/next navigation) */
  prevProject?: string
  /** Slug of the next project (for prev/next navigation) */
  nextProject?: string
}
