/**
 * =============================================================================
 * HOME PAGE
 * =============================================================================
 *
 * Main entry point for the portfolio website.
 * Orchestrates the loading screen and all main sections.
 *
 * SECTION ORDER:
 * 1. Hero - Introduction and CTA
 * 2. About - Skills and approach
 * 3. TechStack - Technologies and proficiency
 * 4. Projects - Portfolio showcase
 * 5. Experience - Work history
 * 6. Contact - Contact form
 * 7. Footer - CTA and links
 *
 * @file app/page.tsx
 * =============================================================================
 */

"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

// ============================================================================
// Core Infrastructure Components
// ============================================================================
import { CustomCursor, SmoothScroll } from "@/components/core"

// ============================================================================
// Layout Components
// ============================================================================
import { Navigation } from "@/components/layout/Navigation"

// ============================================================================
// Page Section Components
// ============================================================================
import {
  LoadingScreen,
  Hero,
  About,
  TechStack,
  Projects,
  Experience,
  Contact,
  Footer,
} from "@/components/sections"


/**
 * Home Page Component
 *
 * Handles the initial loading state and renders all sections
 * after loading is complete.
 */
export default function Home() {
  // Track loading state - shows loading screen initially
  const [isLoading, setIsLoading] = useState(true)

  // -------------------------------------------------------------------------
  // Skip Loading Handler
  // Allow users to skip loading with Enter key
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        setIsLoading(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <>
      {/* Loading Screen with exit animation */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Content - only rendered after loading */}
      {!isLoading && (
        <SmoothScroll>
          {/* Custom cursor - hidden on mobile */}
          <CustomCursor />

          {/* Fixed navigation header */}
          <Navigation />

          {/* Main content area - pt accounts for fixed navbar */}
          <main className="bg-background text-foreground pt-[72px] sm:pt-[80px]">
            {/* BEFORE EXPERIENCE */}
            <Hero />
            <About />
            <TechStack />
            <Projects />

            {/* EXPERIENCE + PROCESS */}
            <Experience />

            <Contact />
            <Footer />
          </main>
        </SmoothScroll>
      )}
    </>
  )
}
