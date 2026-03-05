/**
 * =============================================================================
 * FOOTER SECTION CONTENT
 * =============================================================================
 *
 * All user-facing text for the footer: CTA headline, typewriter words,
 * availability badge, conversation actions, and copyright.
 *
 * WHAT TO EDIT:
 *  - FOOTER_CONTENT        → Headline, subtext, availability badge, copyright
 *  - TYPEWRITER_WORDS      → Words that cycle in the animated headline
 *  - CONVERSATION_ACTIONS  → Options in the "Start a conversation" modal
 * =============================================================================
 */

/* ── Typewriter words ─────────────────────────────────────────────────────── */

/** Words that rotate in the footer headline: "Let's build something ___" */
export const TYPEWRITER_WORDS = [
  "innovative",
  "scalable",
  "beautiful",
  "impactful",
] as const

/* ── Footer copy ──────────────────────────────────────────────────────────── */

export const FOOTER_CONTENT = {
  /** Availability badge text */
  availabilityBadge: "Available for new opportunities",
  /** Headline parts — the typewriter word is inserted between them */
  headlinePrefix: "Let's build something",
  headlineSuffix: "together.",
  /** Emotional paragraph beneath the headline */
  subtext:
    "I don't just write code — I craft digital experiences that solve real problems and leave lasting impressions. Your vision deserves someone who cares as much as you do.",
  /** Primary CTA button label */
  ctaText: "Start a conversation",
  /** Copyright line (year is injected automatically) */
  copyright: "All rights reserved.",
  /** Tagline beneath the copyright */
  tagline: "Designed & built with passion",
} as const

/* ── Conversation launcher modal ──────────────────────────────────────────── */

export const CONVERSATION_MODAL = {
  /** Modal heading */
  title: "Start a conversation",
  /** Modal subtitle */
  subtitle: "Choose how you'd like to connect",
  /** Footer hint text */
  footerHint: "No pressure — you're just starting the conversation.",
} as const

/**
 * Action options shown in the conversation launcher modal.
 *
 * `id` is a unique key; `label` and `description` are user-visible text.
 * The actual behaviour (navigation, mailto, etc.) is wired in ConversationActions.tsx.
 */
export const CONVERSATION_ACTIONS = [
  { id: "project", label: "Send a project message", description: "Tell me about your idea or requirement" },
  { id: "email", label: "Email me directly", description: "Open your email client" },
  { id: "explore", label: "Just exploring", description: "No pressure — browse freely" },
] as const
