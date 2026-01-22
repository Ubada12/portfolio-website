import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/core/ThemeProvider"
import "./globals.css"

// ============================================================================
// Font Configuration
// ============================================================================

/**
 * Inter - Primary body font
 * Clean, modern sans-serif for readability
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

/**
 * Space Grotesk - Heading font
 * Geometric sans-serif for impactful headlines
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

/**
 * Geist Mono - Code font
 * Monospace font for code blocks and terminal text
 */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// ============================================================================
// Metadata Configuration
// ============================================================================

/**
 * Site metadata for SEO
 * Update these values in lib/constants/site.ts
 */
export const metadata: Metadata = {
  title: "John Doe | Creative Developer & Designer",
  description:
    "Full-stack developer and designer crafting exceptional digital experiences. Specializing in React, Next.js, and modern web technologies.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icons/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icons/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icons/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icons/apple-icon.png",
  },
}

// ============================================================================
// Root Layout Component
// ============================================================================

/**
 * Root Layout
 *
 * Wraps all pages with necessary providers and global styles.
 * The suppressHydrationWarning is needed for next-themes to work properly.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable} 
          ${spaceGrotesk.variable} 
          ${geistMono.variable} 
          font-sans antialiased
        `}
      >
        {/* Theme provider enables dark/light mode switching */}
        <ThemeProvider>{children}</ThemeProvider>

        {/* Vercel Analytics for page views tracking */}
        <Analytics />
      </body>
    </html>
  )
}
