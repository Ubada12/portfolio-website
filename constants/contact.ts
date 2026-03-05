/**
 * =============================================================================
 * CONTACT SECTION CONTENT
 * =============================================================================
 *
 * All user-facing text for the Contact section: headings, descriptions,
 * form labels, placeholders, and feedback messages.
 *
 * WHAT TO EDIT:
 *  - CONTACT_SECTION → Section heading and description
 *  - CONTACT_FORM    → Form labels, placeholders, and button text
 *  - CONTACT_MESSAGES → Success, error, and disclaimer copy
 * =============================================================================
 */

/* ── Section copy ─────────────────────────────────────────────────────────── */

export const CONTACT_SECTION = {
  /** Badge label next to the section number */
  badge: "Contact",
  /** Main heading */
  heading: "Let's work together",
  /** Subtitle / intro paragraph */
  description:
    "Have a project in mind? Let's create something amazing together. Feel free to reach out and I'll get back to you as soon as possible.",
} as const

/* ── Form configuration ───────────────────────────────────────────────────── */

export const CONTACT_FORM = {
  /** Heading inside the form card */
  title: "Send a message",
  /** Subtitle inside the form card */
  subtitle: "Fill out the form below and I'll respond within 24 hours.",
  /** Input fields (name & email) */
  fields: [
    { id: "name", label: "Name", type: "text", placeholder: "Your name" },
    { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
  ] as const,
  /** Textarea label */
  messageLabel: "Message",
  /** Submit button text */
  submitText: "Send Message",
  /** Submit button text while sending */
  submittingText: "Sending...",
} as const

/* ── Feedback messages ────────────────────────────────────────────────────── */

export const CONTACT_MESSAGES = {
  /** Heading shown after successful submission */
  successTitle: "Message Sent!",
  /** Body text after successful submission */
  successBody: "Thank you for reaching out. I'll get back to you soon.",
  /** Error message shown on submission failure */
  errorText: "Something went wrong. Please try again later.",
  /** Privacy disclaimer beneath the form */
  disclaimer: "Your information is secure and will never be shared.",
} as const
