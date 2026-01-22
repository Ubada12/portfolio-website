"use client"

/**
 * Navigation Component
 * 
 * Fixed header navigation with scroll spy, theme toggle, and mobile menu.
 * Features animated active states and smooth section scrolling.
 * 
 * @performance
 * - Debounced scroll listener for scroll state
 * - Memoized nav items to prevent re-renders
 * - Passive scroll event listener
 * - Optimized layout animations
 */

import { useState, useEffect, useCallback, memo, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download, Sparkles } from "lucide-react"

/* helpers */
import { ThemeToggle } from "@/components/core/ThemeToggle"
import { useScrollSpy } from "@/hooks/useScrollSpy"

/**
 * Navigation items configuration
 */
const NAV_ITEMS = [
  { name: "About", href: "#about", num: "01" },
  { name: "Stack", href: "#stack", num: "02" },
  { name: "Work", href: "#projects", num: "03" },
  { name: "Experience", href: "#experience", num: "04" },
  { name: "Contact", href: "#contact", num: "05" },
] as const

/**
 * NavLink - Individual navigation link with active state
 */
const NavLink = memo(function NavLink({
  item,
  index,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number]
  index: number
  isActive: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative"
    >
      <button onClick={onClick} className="relative px-4 py-2 text-sm font-medium transition-colors">
        {(isActive || isHovered) && (
          <motion.div
            layoutId="nav-pill"
            className={`absolute inset-0 rounded-full ${isActive ? "bg-primary/15" : "bg-muted/50"}`}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}

        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
              boxShadow: [
                "0 0 10px 0px hsl(var(--primary) / 0.3)",
                "0 0 20px 2px hsl(var(--primary) / 0.4)",
                "0 0 10px 0px hsl(var(--primary) / 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <span className="relative z-10 flex items-center gap-1.5">
          <motion.span
            className={`text-[10px] font-mono transition-colors ${isActive ? "text-primary" : "text-muted-foreground/50"}`}
            animate={{ opacity: isHovered || isActive ? 1 : 0.5, scale: isActive ? 1.1 : 1 }}
          >
            {item.num}
          </motion.span>
          <span className={`transition-colors ${isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
            {item.name}
          </span>
        </span>

        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center"
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="h-[2px] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <motion.div
              className="absolute h-1.5 w-1.5 rounded-full bg-primary"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 4px 1px hsl(var(--primary) / 0.6)",
                  "0 0 8px 2px hsl(var(--primary) / 0.8)",
                  "0 0 4px 1px hsl(var(--primary) / 0.6)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </button>
    </motion.li>
  )
})

/**
 * Navigation - Main navigation component
 */
function NavigationComponent() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeSection = useScrollSpy()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isResumeHovered, setIsResumeHovered] = useState(false)

  const scrollToSection = useCallback((href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (!element) return

    // Add blur effect to main content during scroll
    const main = document.querySelector("main")
    if (main) {
      main.style.transition = "filter 0.3s ease-out"
      main.style.filter = "blur(8px)"
    }

    // Smooth scroll with custom timing
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 80
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    const duration = Math.min(Math.abs(distance) * 0.5, 1200) // Dynamic duration based on distance
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
        // Remove blur when scroll complete
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
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => (
        <NavLink
          key={item.name}
          item={item}
          index={index}
          isActive={activeSection === item.href.slice(1)}
          isHovered={hoveredItem === item.name}
          onHover={() => setHoveredItem(item.name)}
          onLeave={() => setHoveredItem(null)}
          onClick={() => scrollToSection(item.href)}
        />
      )),
    [activeSection, hoveredItem, scrollToSection]
  )

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 h-[72px] sm:h-[80px] transition-all duration-500 sm:px-6 sm:py-4 ${
          isScrolled ? "bg-background/60 backdrop-blur-xl border-b border-border/50" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <motion.a href="#" className="relative group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.div className="text-xl font-bold tracking-tighter relative z-10 sm:text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                {"<JD />"}
              </span>
            </motion.div>
            <motion.div className="absolute -inset-2 rounded-lg bg-primary/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
          </motion.a>

          <ul className="hidden items-center gap-1 lg:flex bg-card/30 backdrop-blur-sm rounded-full px-2 py-2 border border-border/30">
            {navItems}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            <motion.a
              href="/resume.pdf"
              className="relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onMouseEnter={() => setIsResumeHovered(true)}
              onMouseLeave={() => setIsResumeHovered(false)}
            >
              <motion.div
                animate={{
                  boxShadow: isResumeHovered
                    ? ["0 0 20px rgba(139,92,246,0.4)", "0 0 40px rgba(236,72,153,0.4)", "0 0 20px rgba(139,92,246,0.4)"]
                    : "0 0 0px rgba(139,92,246,0)",
                }}
                transition={{ duration: 1, repeat: isResumeHovered ? Infinity : 0 }}
                className="absolute -inset-1 rounded-full blur-sm"
              />

              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "linear-gradient(90deg, var(--primary), var(--accent), #06B6D4, var(--primary))", backgroundSize: "300% 100%" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              <span className="relative z-10 flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium transition-all">
                <AnimatePresence>
                  {isResumeHovered && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0, x: -10 }}
                          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], x: [0, (i - 1) * 20], y: [0, (i - 1) * -10] }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="absolute left-4"
                        >
                          <Sparkles className="h-3 w-3 text-primary" />
                        </motion.span>
                      ))}
                    </>
                  )}
                </AnimatePresence>

                <motion.span className="relative flex h-2 w-2">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </motion.span>

                <span className="bg-gradient-to-r from-foreground to-foreground bg-clip-text transition-all group-hover:from-primary group-hover:to-accent group-hover:text-transparent">
                  Resume
                </span>

                <motion.span animate={isResumeHovered ? { y: [0, 2, 0] } : {}} transition={{ duration: 0.5, repeat: isResumeHovered ? Infinity : 0 }}>
                  <Download className="h-4 w-4 transition-colors group-hover:text-primary" />
                </motion.span>
              </span>
            </motion.a>
          </div>

          <motion.button
            className="relative z-50 lg:hidden p-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <nav className="relative flex flex-col items-center gap-6">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: 0.05 }} className="mb-4">
                <ThemeToggle />
              </motion.div>

              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.href.slice(1)

                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.1 + 0.1, type: "spring", stiffness: 100 }}
                    onClick={() => scrollToSection(item.href)}
                    className="group relative flex items-center gap-4"
                  >
                    {isActive && (
                      <motion.div layoutId="mobile-active-indicator" className="absolute -left-6 flex items-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4 }}>
                        <motion.div
                          className="h-2 w-2 rounded-full bg-primary"
                          animate={{ boxShadow: ["0 0 4px 2px hsl(var(--primary) / 0.4)", "0 0 8px 4px hsl(var(--primary) / 0.6)", "0 0 4px 2px hsl(var(--primary) / 0.4)"] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    )}

                    <span className={`text-sm font-mono transition-colors ${isActive ? "text-primary" : "text-primary/50 group-hover:text-primary"}`}>{item.num}</span>
                    <span className={`text-2xl font-bold tracking-tight transition-colors sm:text-4xl ${isActive ? "text-primary" : "group-hover:text-primary"}`}>{item.name}</span>

                    <motion.span
                      className={`absolute -bottom-2 left-0 h-0.5 rounded-full ${isActive ? "bg-gradient-to-r from-primary via-accent to-primary" : "bg-gradient-to-r from-primary to-accent"}`}
                      initial={{ width: isActive ? "100%" : 0 }}
                      animate={{ width: isActive ? "100%" : 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )
              })}

              <motion.a
                href="/resume.pdf"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const Navigation = memo(NavigationComponent)
