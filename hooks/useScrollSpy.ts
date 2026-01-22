"use client"

import { useEffect, useState } from "react"

/**
 * useScrollSpy Hook
 * 
 * Detects which section is currently in view based on scroll position.
 * Returns the active section's data-section attribute value.
 * 
 * @param offset - Pixel offset from top to trigger section change (default: 200)
 */
export function useScrollSpy(offset = 200) {
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    )

    if (!sections.length) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // If at very top, clear active (hero section)
      if (scrollY < 100) {
        setActive("")
        return
      }

      // If reached bottom, activate last section
      if (scrollY + viewportHeight >= docHeight - 10) {
        setActive(sections[sections.length - 1].dataset.section || "")
        return
      }

      // Find the current section based on scroll position
      let currentSection = ""
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const sectionMiddle = sectionTop + rect.height / 3
        
        // Section is considered active when its top third is in the viewport
        if (scrollY + offset >= sectionTop && scrollY < sectionMiddle + rect.height) {
          currentSection = section.dataset.section || ""
        }
      }

      // Fallback: find section whose top is closest to current scroll
      if (!currentSection) {
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          const sectionTop = section.offsetTop
          
          if (scrollY + offset >= sectionTop) {
            currentSection = section.dataset.section || ""
            break
          }
        }
      }

      setActive(currentSection)
    }

    // Initial check
    onScroll()
    
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [offset])

  return active
}
