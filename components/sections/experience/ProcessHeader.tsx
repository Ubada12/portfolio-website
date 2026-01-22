"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { processSteps } from "./ProcessSteps"

interface ProcessHeaderProps {
  activeStep: number
  totalSteps: number
}

export function ProcessHeader({ activeStep, totalSteps }: ProcessHeaderProps) {
  const currentStep = processSteps[activeStep]
  const color = currentStep?.color || "#8B5CF6"

  return (
    <div className="relative z-10 px-3 sm:px-4 py-1.5 sm:py-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div 
                className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-border/50 bg-background/80 backdrop-blur-xl px-2 sm:px-3 py-1 sm:py-1.5 shadow-md"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={10} className="sm:w-3 sm:h-3" style={{ color }} />
                </motion.div>
                <span className="text-[9px] sm:text-[10px] font-medium tracking-wider uppercase text-foreground/80">
                  Process
                </span>
              </div>
              
              <motion.div
                className="absolute -inset-0.5 rounded-full opacity-50 blur-sm -z-10"
                style={{ backgroundColor: `${color}30` }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.h2
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="text-sm sm:text-base md:text-lg font-bold"
              >
                <span className="text-foreground/60 hidden xs:inline">Step {activeStep + 1}: </span>
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${color}, ${color}99)` 
                  }}
                >
                  {currentStep?.title}
                </span>
              </motion.h2>
            </AnimatePresence>
          </div>

          <StepCounter activeStep={activeStep} totalSteps={totalSteps} color={color} />
        </div>

        <motion.div
          className="mt-2 sm:mt-3 h-0.5 bg-border/30 rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ 
              background: `linear-gradient(90deg, ${color}, ${color}80)`,
              boxShadow: `0 0 15px ${color}60`
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  )
}

function StepCounter({ activeStep, totalSteps, color }: { activeStep: number; totalSteps: number; color: string }) {
  return (
    <motion.div 
      className="flex items-center gap-1.5 sm:gap-2 bg-background/80 backdrop-blur-xl rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 border border-border/50 shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-0.5">
        {[...Array(totalSteps)].map((_, i) => (
          <motion.div
            key={i}
            className="relative"
            animate={{
              scale: i === activeStep ? 1.3 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full border transition-all duration-300"
              style={{
                borderColor: i <= activeStep ? color : 'hsl(var(--border))',
                backgroundColor: i < activeStep ? color : i === activeStep ? `${color}40` : 'transparent',
              }}
            />
            {i === activeStep && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="w-px h-2 sm:h-3 bg-border/50" />
      
      <div className="flex items-baseline gap-0.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeStep}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-sm sm:text-lg font-bold tabular-nums"
            style={{ color }}
          >
            {String(activeStep + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        <span className="text-muted-foreground text-[10px] sm:text-xs">/ {String(totalSteps).padStart(2, '0')}</span>
      </div>
    </motion.div>
  )
}
