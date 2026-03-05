/**
 * =============================================================================
 * PROJECT: E-Commerce Platform
 * =============================================================================
 *
 * Full-stack e-commerce solution with real-time inventory, payment processing,
 * and admin dashboard.
 *
 * STATUS: Placeholder — update fields with real project data when ready.
 *
 * =============================================================================
 */

import type { ProjectDoc } from "./_template"

export const eCommercePlatform: ProjectDoc = {
  /* ── Core ──────────────────────────────────────────────────────────────── */
  id: 1,
  slug: "e-commerce-platform",
  title: "E-Commerce Platform",
  description:
    "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
  image: "/images/modern-ecommerce-dashboard-dark-theme.jpg",
  tags: ["Next.js", "Stripe", "PostgreSQL", "TailwindCSS"],
  link: "#",
  github: "#",
  githubPrivate: true,
  color: "#6366f1",

  /* ── Identity ──────────────────────────────────────────────────────────── */
  tagline: "Modern commerce, built from the ground up",
  status: "In Development",
  year: "2024",
  duration: "3 months",
  category: "Full Stack",

  /* ── Role ───────────────────────────────────────────────────────────────── */
  role: {
    title: "Full Stack Developer",
    responsibilities: [
      "Designed and implemented the full application architecture",
      "Built a responsive storefront with Next.js and Tailwind CSS",
      "Integrated Stripe payment processing and webhook handling",
      "Developed a real-time inventory management system with PostgreSQL",
    ],
  },

  /* ── Story ──────────────────────────────────────────────────────────────── */
  overview:
    "A comprehensive e-commerce platform designed to handle the full lifecycle of online retail — from product browsing and cart management to secure checkout and order fulfillment. The admin dashboard provides real-time insights into inventory levels, sales trends, and customer behaviour.",

  /* ── Navigation ─────────────────────────────────────────────────────────── */
  prevProject: "goat-detection",
  nextProject: "ai-writing-assistant",
}
