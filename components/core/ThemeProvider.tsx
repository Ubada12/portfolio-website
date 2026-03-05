"use client"

/**
 * ThemeProvider Component
 * 
 * Wraps the application with theme context for dark/light mode support.
 * Uses next-themes for SSR-safe theme management with localStorage persistence.
 * 
 * @features
 * - System theme detection
 * - Smooth theme transitions
 * - SSR hydration safety
 * - LocalStorage persistence
 */

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"

/**
 * Theme context type definition
 */
interface ThemeContextType {
  theme: string | undefined
  setTheme: (theme: string) => void
  resolvedTheme: string | undefined
}

/**
 * ThemeProvider wrapper component
 * Configures next-themes with optimal settings for portfolio
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

/**
 * Custom useTheme hook with enhanced typing
 * Provides access to current theme and setter function
 */
export function useTheme(): ThemeContextType {
  const { theme, setTheme, resolvedTheme } = useNextTheme()
  return { theme, setTheme, resolvedTheme }
}
