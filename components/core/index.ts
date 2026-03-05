/**
 * Core Components Barrel Export
 * 
 * Core components are foundational infrastructure components that:
 * - Provide app-wide functionality (themes, scrolling, cursor)
 * - Are used throughout the entire application
 * - Handle global state or context
 * 
 * @module core
 */

export { CustomCursor } from "./CustomCursor"
export { ThemeProvider, useTheme } from "./ThemeProvider"
export { ThemeToggle } from "./ThemeToggle"
export { SmoothScroll } from "./SmoothScroll"
