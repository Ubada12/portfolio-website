/**
 * =============================================================================
 * PROJECT: Real Estate Portal
 * =============================================================================
 *
 * Property listing platform with advanced search, virtual tours,
 * and agent management.
 *
 * STATUS: Placeholder — update fields with real project data when ready.
 *
 * =============================================================================
 */

import type { ProjectDoc } from "./_template"

export const realEstatePortal: ProjectDoc = {
  /* ── Core ──────────────────────────────────────────────────────────────── */
  id: 4,
  slug: "real-estate-portal",
  title: "Real Estate Portal",
  description:
    "A property listing platform with advanced search, virtual tours, and agent management system.",
  image: "/images/real-estate-property-listing-dark-theme.jpg",
  tags: ["Next.js", "Mapbox", "Prisma", "AWS"],
  link: "#",
  github: "#",
  githubPrivate: true,
  color: "#f59e0b",

  /* ── Identity ──────────────────────────────────────────────────────────── */
  tagline: "Find your next home, effortlessly",
  status: "In Development",
  year: "2024",
  duration: "3 months",
  category: "Full Stack",

  /* ── Role ───────────────────────────────────────────────────────────────── */
  role: {
    title: "Full Stack Developer",
    responsibilities: [
      "Designed the property search and filtering engine",
      "Integrated Mapbox for interactive map-based property browsing",
      "Built the agent dashboard and listing management system",
      "Implemented image optimisation and virtual-tour embedding",
    ],
  },

  /* ── Story ──────────────────────────────────────────────────────────────── */
  overview:
    "A modern property listing platform that connects buyers, sellers, and agents through an intuitive search experience. Features include interactive map browsing, advanced filtering, virtual tour integration, and a comprehensive agent management dashboard.",

  /* ── Navigation ─────────────────────────────────────────────────────────── */
  prevProject: "fitness-tracking-app",
  nextProject: "goat-detection",
}
