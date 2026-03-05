/**
 * =============================================================================
 * HERO SECTION CONTENT
 * =============================================================================
 *
 * All user-facing text and configurable data for the hero section.
 *
 * WHAT TO EDIT:
 *  - HERO_CONTENT       → Headlines, badge text, description, CTA labels
 *  - CODE_EDITOR_CONTENT → The fake code snippet shown in the desktop editor
 * =============================================================================
 */

/* ── Main hero copy ───────────────────────────────────────────────────────── */

export const HERO_CONTENT = {
  /** Badge text above the main headline */
  badge: "Available for opportunities",
  /** Three headline words displayed on separate lines */
  titleLines: ["Creative", "Developer", "Designer"] as const,
  /** Paragraph beneath the headline (plain-text portion) */
  descriptionPrefix: "I craft exceptional digital experiences that blend",
  /** Highlighted phrase inside the description */
  descriptionHighlight: "stunning design",
  /** Remainder of the description paragraph */
  descriptionSuffix:
    "with flawless functionality. Currently focused on building accessible, human-centered products.",
  /** Primary call-to-action button label */
  ctaText: "Let's Talk",
  /** Resume button label (mobile) */
  resumeLabel: "Resume",
  /** Scroll indicator text at bottom of viewport */
  scrollText: "Scroll to Explore",
} as const

/* ── Code editor widget ───────────────────────────────────────────────────── */

export const CODE_EDITOR_CONTENT = {
  /** File-name tab label in the mock editor window */
  fileName: "developer.ts",
  /**
   * Lines displayed in the code editor.
   * Each entry: { text: string; color: TailwindTextColor }
   *
   * TIP: Keep the code short (≤ 10 lines) to avoid overflow on smaller screens.
   */
  lines: [
    { text: 'const developer = {', color: "text-violet-400" },
    { text: '  name: "John Doe",', color: "text-emerald-400" },
    { text: '  role: "Full-Stack Dev",', color: "text-emerald-400" },
    { text: "  skills: [", color: "text-violet-400" },
    { text: '    "React", "Next.js",', color: "text-cyan-400" },
    { text: '    "TypeScript", "Node"', color: "text-cyan-400" },
    { text: "  ],", color: "text-violet-400" },
    { text: "  passion: true,", color: "text-pink-400" },
    { text: "  coffee: Infinity", color: "text-pink-400" },
    { text: "};", color: "text-violet-400" },
    { text: "Love coding!", color: "text-green-400" },
  ],
} as const
