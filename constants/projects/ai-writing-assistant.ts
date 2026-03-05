/**
 * =============================================================================
 * PROJECT: AI Writing Assistant
 * =============================================================================
 *
 * An AI-powered writing tool with smart suggestions and grammar checks.
 *
 * STATUS: Placeholder — update fields with real project data when ready.
 *
 * =============================================================================
 */

import type { ProjectDoc } from "./_template"

export const aiWritingAssistant: ProjectDoc = {
  /* ── Core ──────────────────────────────────────────────────────────────── */
  id: 2,
  slug: "ai-writing-assistant",
  title: "AI Writing Assistant",
  description:
    "An AI-powered writing tool that helps users create better content with smart suggestions and grammar checks.",
  image: "/images/ai-writing-interface-dark-mode-sleek.jpg",
  tags: ["React", "OpenAI", "Node.js", "MongoDB"],
  link: "#",
  github: "#",
  githubPrivate: true,
  color: "#ec4899",

  /* ── Identity ──────────────────────────────────────────────────────────── */
  tagline: "Write smarter, not harder",
  status: "In Development",
  year: "2024",
  duration: "3 months",
  category: "AI / Machine Learning",

  /* ── Role ───────────────────────────────────────────────────────────────── */
  role: {
    title: "Full Stack Developer",
    responsibilities: [
      "Architected the real-time text analysis pipeline",
      "Integrated OpenAI API for content generation and grammar checking",
      "Built a responsive editor interface with React",
      "Designed the MongoDB schema for user documents and suggestions",
    ],
  },

  /* ── Story ──────────────────────────────────────────────────────────────── */
  overview:
    "An intelligent writing companion that leverages large language models to provide context-aware suggestions, grammar corrections, and tone adjustments in real time. Designed for content creators who want to elevate their writing without sacrificing their voice.",

  /* ── Navigation ─────────────────────────────────────────────────────────── */
  prevProject: "e-commerce-platform",
  nextProject: "fitness-tracking-app",
}
