/**
 * =============================================================================
 * PERSONAL INFORMATION & SOCIAL LINKS
 * =============================================================================
 *
 * Central source of truth for all personal details displayed on the portfolio.
 * Update these values to customise the site for a different person.
 *
 * WHAT TO EDIT:
 *  - name          → Your full name (appears in nav, footer, metadata, code editor)
 *  - role          → Your professional title
 *  - email         → Contact email (also used in the footer mailto link)
 *  - phone         → Phone number shown on the contact page
 *  - location      → City / region label
 *  - SOCIAL_LINKS  → Add, remove, or re-order social profiles
 *  - RESUME_PATH   → Path to your downloadable résumé (place the file in /public)
 *  - LOGO_TEXT     → The logo string rendered in the navbar and loading screen
 * =============================================================================
 */

import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react"

/* ── Core identity ────────────────────────────────────────────────────────── */

export const PERSONAL_INFO = {
  /** Full display name */
  name: "John Doe",
  /** Professional title / tagline */
  role: "Full-Stack Developer & Designer",
  /** Primary contact email */
  email: "hello@johndoe.dev",
  /** Phone number (visible on the contact section) */
  phone: "+1 (555) 123-4567",
  /** Location label */
  location: "San Francisco, CA",
} as const

/* ── Social links ─────────────────────────────────────────────────────────── */

export const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
] as const

/** Social links + email — used in the footer */
export const SOCIAL_LINKS_WITH_EMAIL = [
  ...SOCIAL_LINKS,
  { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: "Email" },
] as const

/* ── Contact info cards ───────────────────────────────────────────────────── */

export const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: PERSONAL_INFO.email },
  { icon: Phone, label: "Phone", value: PERSONAL_INFO.phone },
  { icon: MapPin, label: "Location", value: PERSONAL_INFO.location },
] as const

/* ── Misc ─────────────────────────────────────────────────────────────────── */

/** Path to the downloadable résumé file (relative to /public) */
export const RESUME_PATH = "/resume.pdf"

/** Logo text displayed in the navbar and loading screen */
export const LOGO_TEXT = "<JD />"
