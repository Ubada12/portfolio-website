/**
 * =============================================================================
 * PROJECT: Fitness Tracking App
 * =============================================================================
 *
 * Comprehensive fitness app with workout tracking, nutrition logging,
 * and progress visualisation.
 *
 * STATUS: Placeholder — update fields with real project data when ready.
 *
 * =============================================================================
 */

import type { ProjectDoc } from "./_template"

export const fitnessTrackingApp: ProjectDoc = {
  /* ── Core ──────────────────────────────────────────────────────────────── */
  id: 3,
  slug: "fitness-tracking-app",
  title: "Fitness Tracking App",
  description:
    "A comprehensive fitness app with workout tracking, nutrition logging, and progress visualization.",
  image: "/images/fitness-app-dashboard-dark-theme-modern.jpg",
  tags: ["React Native", "Firebase", "Chart.js", "TypeScript"],
  link: "#",
  github: "#",
  githubPrivate: true,
  color: "#10b981",

  /* ── Identity ──────────────────────────────────────────────────────────── */
  tagline: "Your personal fitness command centre",
  status: "In Development",
  year: "2024",
  duration: "3 months",
  category: "Mobile App",

  /* ── Role ───────────────────────────────────────────────────────────────── */
  role: {
    title: "Full Stack Developer",
    responsibilities: [
      "Built the cross-platform mobile app with React Native",
      "Integrated Firebase for real-time data sync and authentication",
      "Developed interactive progress charts with Chart.js",
      "Designed the nutrition logging and macro-tracking system",
    ],
  },

  /* ── Story ──────────────────────────────────────────────────────────────── */
  overview:
    "A mobile-first fitness companion that combines workout programming, nutrition tracking, and data-driven progress visualisation into a single streamlined experience. Built for athletes and casual gym-goers alike who want meaningful insights from their training data.",

  /* ── Navigation ─────────────────────────────────────────────────────────── */
  prevProject: "ai-writing-assistant",
  nextProject: "real-estate-portal",
}
