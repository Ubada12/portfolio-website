/**
 * =============================================================================
 * PROJECTS — BARREL EXPORT & HELPERS
 * =============================================================================
 *
 * Aggregates all individual project files into a single PROJECTS array and
 * provides helper functions for lookups and server-side docs validation.
 *
 * EXPORTS:
 *  - ProjectDoc         → Type re-export for convenience
 *  - PROJECTS_SECTION   → Section heading and badge label
 *  - PROJECTS           → Ordered array of all projects
 *  - getProjectBySlug() → Lookup a single project by its URL slug
 *
 * NOTE: getAvailableDocs() lives in app/projects/[slug]/page.tsx because it
 * uses Node.js `fs` which can't be bundled into client components that also
 * import from this file.
 *
 * ADDING A NEW PROJECT:
 *  1. Create a new file in this directory (e.g. my-project.ts)
 *  2. Export a ProjectDoc object from it
 *  3. Import it below and add it to the PROJECTS array
 *  4. Update prevProject / nextProject on adjacent entries
 *
 * =============================================================================
 */

import type { ProjectDoc } from "./_template"
import { goatDetection } from "./goat-detection"
import { eCommercePlatform } from "./e-commerce-platform"
import { aiWritingAssistant } from "./ai-writing-assistant"
import { fitnessTrackingApp } from "./fitness-tracking-app"
import { realEstatePortal } from "./real-estate-portal"

/* ── Re-export the type ──────────────────────────────────────────────────── */

export type { ProjectDoc } from "./_template"

/* ── Section copy ────────────────────────────────────────────────────────── */

export const PROJECTS_SECTION = {
  /** Badge label next to the section number */
  badge: "Work",
  /** Main heading displayed above the project cards */
  heading: "Featured Projects",
} as const

/* ── Ordered project list ────────────────────────────────────────────────── */

export const PROJECTS: ProjectDoc[] = [
  eCommercePlatform,
  aiWritingAssistant,
  fitnessTrackingApp,
  realEstatePortal,
  goatDetection,
]

/* ── Helpers ──────────────────────────────────────────────────────────────── */

export function getProjectBySlug(slug: string): ProjectDoc | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
