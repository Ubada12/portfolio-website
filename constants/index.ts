/**
 * =============================================================================
 * CONSTANTS — BARREL EXPORT
 * =============================================================================
 *
 * Re-exports every constant module so consumers can import from a single path:
 *
 *   import { PERSONAL_INFO, PROJECTS } from "@/constants"
 *
 * Individual files can also be imported directly for tree-shaking:
 *
 *   import { PERSONAL_INFO } from "@/constants/personal"
 * =============================================================================
 */

export * from "./personal"
export * from "./metadata"
export * from "./navigation"
export * from "./hero"
export * from "./about"
export * from "./stack"
export * from "./projects"
export * from "./experience"
export * from "./contact"
export * from "./footer"
