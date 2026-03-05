/**
 * =============================================================================
 * NAVIGATION ITEMS
 * =============================================================================
 *
 * Defines the links shown in the desktop and mobile navigation menus.
 *
 * WHAT TO EDIT:
 *  - name → Visible link label
 *  - href → Anchor id of the target section (must match the section's `id`)
 *  - num  → Decorative numbering shown beside each link
 *
 * NOTE: Adding or removing entries here will automatically update both
 * desktop and mobile menus.
 * =============================================================================
 */

export const NAV_ITEMS = [
  { name: "About", href: "#about", num: "01" },
  { name: "Stack", href: "#stack", num: "02" },
  { name: "Work", href: "#projects", num: "03" },
  { name: "Experience", href: "#experience", num: "04" },
  { name: "Contact", href: "#contact", num: "05" },
] as const
