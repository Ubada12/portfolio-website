"use client"

/**
 * HeroAnimatedBackground Component
 * 
 * SVG-based animated background with floating shapes and gradients.
 * Uses pure CSS/SVG animations for optimal performance.
 * 
 * @performance
 * - SVG animations are GPU-accelerated
 * - No JavaScript animation overhead
 * - Optimized for smooth 60fps rendering
 */

import { memo } from "react"

/**
 * HeroAnimatedBackground - Animated SVG background pattern
 */
function HeroAnimatedBackgroundComponent() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hero-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="hero-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.08" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.03" />
        </linearGradient>

        <filter id="hero-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
        </filter>
      </defs>

      <circle cx="20%" cy="30%" r="300" fill="url(#hero-gradient-1)" filter="url(#hero-blur)">
        <animate
          attributeName="cx"
          values="20%;25%;20%"
          dur="20s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="30%;35%;30%"
          dur="25s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="80%" cy="70%" r="250" fill="url(#hero-gradient-2)" filter="url(#hero-blur)">
        <animate
          attributeName="cx"
          values="80%;75%;80%"
          dur="22s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="70%;65%;70%"
          dur="18s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="60%" cy="20%" r="200" fill="url(#hero-gradient-1)" filter="url(#hero-blur)" opacity="0.5">
        <animate
          attributeName="r"
          values="200;220;200"
          dur="15s"
          repeatCount="indefinite"
        />
      </circle>

      <g opacity="0.03">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      </g>
    </svg>
  )
}

export const HeroAnimatedBackground = memo(HeroAnimatedBackgroundComponent)
