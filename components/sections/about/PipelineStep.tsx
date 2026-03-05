"use client"

import { useRef, memo } from "react"
import { motion, useInView, useTransform, type MotionValue } from "framer-motion"
import {
  ArrowRight,
  Gauge,
  ShieldCheck,
  Boxes,
  Workflow,
} from "lucide-react"
import { THINKING_PIPELINE } from "@/constants/about"

const ICON_MAP: Record<string, React.ElementType> = { Workflow, Boxes, Gauge, ShieldCheck }

export const thinkingPipeline = THINKING_PIPELINE.map((step) => ({
  ...step,
  icon: ICON_MAP[step.iconName],
}))

export const PipelineStep = memo(function PipelineStep({
  step,
  index,
  isLast,
  scrollProgress,
}: {
  step: (typeof thinkingPipeline)[0]
  index: number
  isLast: boolean
  scrollProgress: MotionValue<number>
}) {
  const Icon = step.icon
  const stepRef = useRef<HTMLDivElement>(null)
  const stepInView = useInView(stepRef, { once: true, margin: "-50px" })

  const total = thinkingPipeline.length
  const usableRange = 0.75
  const stepStart = (index / total) * usableRange
  const stepEnd = stepStart + usableRange / total
  const nextStart = ((index + 1) / total) * usableRange

  const stepOpacity = useTransform(scrollProgress, [Math.max(0, stepStart - 0.03), stepEnd], [0.3, 1])
  const stepScale = useTransform(scrollProgress, [Math.max(0, stepStart - 0.03), stepEnd], [0.95, 1])
  const lineScaleY = useTransform(scrollProgress, [stepEnd, Math.min(nextStart + 0.05, 1)], [0, 1])

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, x: -30 }}
      animate={stepInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: 0.1 + index * 0.12,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="relative"
    >
      {!isLast && (
        <motion.div
          style={{ scaleY: lineScaleY }}
          className="absolute left-[26px] sm:left-5 top-[56px] sm:top-14 w-0.5 h-4 sm:h-6 origin-top bg-gradient-to-b from-primary/60 to-accent/30"
        />
      )}

      <motion.div
        style={{ opacity: stepOpacity, scale: stepScale }}
        className="group flex items-start gap-3 sm:gap-4 py-3 px-3 sm:px-1 rounded-xl sm:rounded-none bg-card/30 dark:bg-white/[0.02] sm:bg-transparent dark:sm:bg-transparent border border-border/20 sm:border-0 hover:translate-x-1 transition-transform duration-300"
      >
        <div className="relative">
          <motion.div
            animate={stepInView ? { scale: [1, 1.2, 1] } : {}}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            className={`relative z-10 p-2.5 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-shadow duration-300`}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <motion.div
            animate={stepInView ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
            transition={{ delay: 0.3 + index * 0.2, duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.gradient}`}
          />
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-mono text-primary/50">0{index + 1}</span>
            <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{step.label}</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
        </div>

        <ArrowRight className="w-4 h-4 mt-1 text-muted-foreground/30 group-hover:text-primary/60 group-hover:translate-x-1 transition-all shrink-0" />
      </motion.div>
    </motion.div>
  )
})
