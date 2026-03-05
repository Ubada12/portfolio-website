"use client"

/**
 * useScrollSpy Hook
 *
 * Tracks which page section is most visible in the viewport and returns
 * its `data-section` value. Used by the navigation bar to highlight
 * the active section link.
 *
 * Algorithm: measures pixel overlap of every `[data-section]` element
 * with the viewport and picks the one with the largest visible area.
 *
 * @param offset - Fallback pixel offset used when no section overlaps the viewport
 * @returns The `data-section` string of the currently active section, or "" at the top of the page
 */

import { useEffect, useState } from "react"

export function useScrollSpy(offset = 200) {
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    )

    if (!sections.length) return

    let rafId: number | null = null
    let ticking = false

    const updateActiveSection = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      if (scrollY < 100) {
        setActive("")
        ticking = false
        return
      }

      if (scrollY + viewportHeight >= docHeight - 10) {
        setActive(sections[sections.length - 1].dataset.section || "")
        ticking = false
        return
      }

      let bestSection = ""
      let bestOverlap = 0

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const visibleTop = Math.max(0, rect.top)
        const visibleBottom = Math.min(viewportHeight, rect.bottom)
        const overlap = Math.max(0, visibleBottom - visibleTop)

        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestSection = section.dataset.section || ""
        }
      }

      if (!bestSection) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          if (scrollY + offset >= section.offsetTop) {
            bestSection = section.dataset.section || ""
            break
          }
        }
      }

      setActive(bestSection)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(updateActiveSection)
      }
    }

    updateActiveSection()

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [offset])

  return active
}
