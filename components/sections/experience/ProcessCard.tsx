"use client"

/**
 * ProcessCard Component
 *
 * Individual card within the Engineering Process horizontal scroll.
 * Displays a process step with icon, title, description, and
 * highlight chips. Features active-state glow, border pulse, and
 * micro-animations tied to the parent scroll position.
 *
 * @performance
 * - Memoized to skip re-renders when props are unchanged
 * - Inline styles use step-specific colors for dynamic theming
 */

import { memo, useMemo } from "react"
import { motion } from "framer-motion"
import { Zap, ChevronRight, ArrowRight } from "lucide-react"
import type { ProcessStep } from "./ProcessSteps"

const PERSPECTIVE_STYLE = { perspective: "1000px" } as const
const CARD_PADDING_STYLE = { padding: "clamp(12px, 2vw, 22px)" } as const
const HEADER_MARGIN_STYLE = { marginBottom: "clamp(6px, 1.2vw, 12px)" } as const
const ICON_BOX_SIZE_STYLE = { width: "clamp(32px, 5vw, 44px)", height: "clamp(32px, 5vw, 44px)" } as const
const ICON_SIZE_STYLE = { width: "clamp(14px, 2.5vw, 22px)", height: "clamp(14px, 2.5vw, 22px)" } as const
const BADGE_SIZE_STYLE = { width: "clamp(12px, 1.8vw, 16px)", height: "clamp(12px, 1.8vw, 16px)", fontSize: "clamp(6px, 0.9vw, 9px)" } as const
const SUBTITLE_STYLE = { fontSize: "clamp(7px, 0.9vw, 9px)", letterSpacing: "0.1em", marginBottom: "clamp(1px, 0.2vw, 2px)" } as const
const TITLE_STYLE = { fontSize: "clamp(13px, 2.2vw, 20px)" } as const
const DIVIDER_MARGIN_STYLE = { marginBottom: "clamp(6px, 1.2vw, 12px)" } as const
const DESC_STYLE = { fontSize: "clamp(9px, 1.1vw, 12px)", marginBottom: "clamp(8px, 1.5vw, 14px)" } as const
const FOCUS_HEADER_STYLE = { gap: "clamp(3px, 0.6vw, 6px)", marginBottom: "clamp(4px, 0.8vw, 8px)" } as const
const ARROW_ICON_STYLE = { width: "clamp(8px, 1vw, 11px)", height: "clamp(8px, 1vw, 11px)" } as const
const FOCUS_LABEL_STYLE = { fontSize: "clamp(6px, 0.8vw, 8px)" } as const
const GRID_GAP_STYLE = { gap: "clamp(3px, 0.6vw, 6px)" } as const
const ZAP_ICON_STYLE = { width: "clamp(7px, 0.9vw, 10px)", height: "clamp(7px, 0.9vw, 10px)" } as const
const HIGHLIGHT_TEXT_STYLE = { fontSize: "clamp(7px, 0.9vw, 10px)" } as const
const SCROLL_HINT_STYLE = { bottom: "clamp(5px, 0.8vw, 10px)", right: "clamp(5px, 0.8vw, 10px)", gap: "clamp(2px, 0.3vw, 3px)", fontSize: "clamp(6px, 0.8vw, 8px)" } as const
const CHEVRON_STYLE = { width: "clamp(8px, 1vw, 12px)", height: "clamp(8px, 1vw, 12px)" } as const

interface ProcessCardProps {
  step: ProcessStep
  isActive: boolean
  index: number
}

export const ProcessCard = memo(function ProcessCard({ step, isActive, index }: ProcessCardProps) {
  const Icon = step.icon

  const colorStyles = useMemo(() => ({
    borderGradient: `linear-gradient(135deg, ${step.color}60, transparent 50%, ${step.color}30)`,
    hoverShadow: `0 20px 40px -12px ${step.color}25`,
    iconBoxBg: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`,
    iconBoxShadow: `0 0 15px ${step.color}20`,
    divider: `linear-gradient(90deg, transparent, ${step.color}50, transparent)`,
    highlightBg: `linear-gradient(135deg, ${step.color}15, ${step.color}05)`,
    highlightBorder: `1px solid ${step.color}20`,
  }), [step.color])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: index * 0.1 
      }}
      className="relative w-[clamp(260px,75vw,550px)] max-h-[calc(100vh-180px)]"
      style={PERSPECTIVE_STYLE}
    >
      <motion.div
        className="absolute -inset-1 sm:-inset-1.5 rounded-xl sm:rounded-2xl opacity-0 blur-lg sm:blur-xl transition-opacity duration-500 -z-10"
        style={{ backgroundColor: step.color }}
        animate={{ opacity: isActive ? 0.15 : 0 }}
      />

      <motion.div
        className="absolute -inset-px sm:-inset-0.5 rounded-xl sm:rounded-2xl opacity-0 -z-10"
        style={{ 
          background: colorStyles.borderGradient,
        }}
        animate={{ 
          opacity: isActive ? 1 : 0,
          rotate: isActive ? [0, 1, -1, 0] : 0 
        }}
        transition={{ rotate: { duration: 4, repeat: Infinity } }}
      />

      <motion.div
        className="relative rounded-xl sm:rounded-2xl border border-border/50 bg-background/70 dark:bg-background/50 backdrop-blur-2xl overflow-hidden shadow-xl"
        style={CARD_PADDING_STYLE}
        animate={{
          scale: isActive ? 1 : 0.95,
          y: isActive ? 0 : 10,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: colorStyles.hoverShadow
        }}
      >
        <div 
          className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 rounded-full blur-xl sm:blur-2xl opacity-20 -z-10"
          style={{ backgroundColor: step.color }}
        />
        <div 
          className="absolute bottom-0 left-0 w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 rounded-full blur-xl sm:blur-2xl opacity-10 -z-10"
          style={{ backgroundColor: step.color }}
        />

        <div 
          className="flex flex-row items-start gap-[clamp(6px,1.2vw,12px)]"
          style={HEADER_MARGIN_STYLE}
        >
          <motion.div
            className="relative flex-shrink-0"
            animate={isActive ? {
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div
              className="flex items-center justify-center rounded-lg sm:rounded-xl"
              style={{ 
                ...ICON_BOX_SIZE_STYLE,
                background: colorStyles.iconBoxBg,
                boxShadow: colorStyles.iconBoxShadow
              }}
            >
              <Icon 
                style={{ 
                  color: step.color,
                  ...ICON_SIZE_STYLE,
                }} 
              />
            </div>
            
            <motion.div
              className="absolute -inset-0.5 rounded-lg sm:rounded-xl border opacity-50"
              style={{ borderColor: step.color }}
              animate={{ 
                scale: [1, 1.15, 1], 
                opacity: [0.5, 0, 0.5] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <motion.div
              className="absolute -top-0.5 -right-0.5 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
              style={{ 
                backgroundColor: step.color,
                ...BADGE_SIZE_STYLE,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {step.step}
            </motion.div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.p
              className="uppercase font-semibold"
              style={{ 
                color: step.color,
                ...SUBTITLE_STYLE,
              }}
              animate={{ opacity: isActive ? 1 : 0.7 }}
            >
              {step.subtitle}
            </motion.p>
            <h3 
              className="font-bold text-foreground leading-tight"
              style={TITLE_STYLE}
            >
              {step.title}
            </h3>
          </div>
        </div>

        <motion.div
          className="h-px w-full"
          style={{ 
            background: colorStyles.divider,
            ...DIVIDER_MARGIN_STYLE,
          }}
          animate={{ scaleX: isActive ? 1 : 0.5, opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        />

        <motion.p 
          className="text-muted-foreground leading-relaxed"
          style={DESC_STYLE}
          animate={{ opacity: isActive ? 1 : 0.7 }}
        >
          {step.description}
        </motion.p>

        <div>
          <div 
            className="flex items-center"
            style={FOCUS_HEADER_STYLE}
          >
            <ArrowRight style={{ ...ARROW_ICON_STYLE, color: step.color }} />
            <span 
              className="uppercase tracking-wider text-muted-foreground font-medium"
              style={FOCUS_LABEL_STYLE}
            >
              Key Focus Areas
            </span>
          </div>
          
          <div 
            className="grid grid-cols-2"
            style={GRID_GAP_STYLE}
          >
            {step.highlights.map((highlight, i) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, x: 5 }}
                className="group flex items-center rounded-md transition-all duration-300 cursor-default"
                style={{
                  gap: "clamp(3px, 0.6vw, 6px)",
                  padding: "clamp(3px, 0.6vw, 6px) clamp(5px, 0.8vw, 8px)",
                  background: colorStyles.highlightBg,
                  border: colorStyles.highlightBorder,
                }}
              >
                <motion.div
                  className="flex-shrink-0"
                  animate={isActive ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                >
                  <Zap 
                    style={{ 
                      color: step.color,
                      ...ZAP_ICON_STYLE,
                    }}
                  />
                </motion.div>
                <span 
                  className="font-medium truncate"
                  style={{ 
                    color: step.color,
                    ...HIGHLIGHT_TEXT_STYLE,
                  }}
                >
                  {highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute flex items-center text-muted-foreground/50"
          style={SCROLL_HINT_STYLE}
          animate={{ x: isActive ? [0, 5, 0] : 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="hidden sm:inline">Scroll to continue</span>
          <ChevronRight style={CHEVRON_STYLE} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
})
