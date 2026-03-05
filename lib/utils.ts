/**
 * =============================================================================
 * UTILITY FUNCTIONS
 * =============================================================================
 *
 * Shared helpers used across the application.
 *
 * EXPORTS:
 *  - cn()               → Tailwind class merging (clsx + tailwind-merge)
 *  - scrollToSection()  → Animated scroll with blur transition effect
 *
 * =============================================================================
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names with conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 *
 * @example cn("px-4 py-2", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Scrolls to a target section with a smooth eased animation and a
 * blur transition on the `<main>` element during the scroll.
 *
 * BEHAVIOUR:
 *  1. Applies an 8px blur to `<main>` with a 0.3s ease-out transition
 *  2. Scrolls to the target using requestAnimationFrame with easeOutQuart easing
 *  3. Duration scales with distance (capped at 1200ms)
 *  4. On completion, removes the blur with a 300ms fade-out
 *
 * USAGE:
 *  - Navigation links (Navigation.tsx)
 *  - Hero "Let's Talk" CTA (Hero.tsx)
 *  - Experience "Let's work together" CTA (Experience.tsx)
 *
 * @param href — CSS selector for the target element (e.g. "#contact")
 */
export function scrollToSection(href: string) {
  const element = document.querySelector(href)
  if (!element) return

  const main = document.querySelector("main")
  if (main) {
    main.style.transition = "filter 0.3s ease-out"
    main.style.filter = "blur(8px)"
  }

  const targetPosition = element.getBoundingClientRect().top + window.scrollY - 80
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  const duration = Math.min(Math.abs(distance) * 0.5, 1200)
  let startTime: number | null = null

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = easeOutQuart(progress)

    window.scrollTo(0, startPosition + distance * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    } else {
      if (main) {
        main.style.filter = "blur(0px)"
        setTimeout(() => {
          main.style.transition = ""
          main.style.filter = ""
        }, 300)
      }
    }
  }

  requestAnimationFrame(animateScroll)
}
