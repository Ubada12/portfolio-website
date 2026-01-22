"use client"

import { motion, MotionValue } from "framer-motion"
import { processSteps } from "./ProcessSteps"
import { Check } from "lucide-react"

interface ProgressIndicatorsProps {
  activeStep: number
  scrollProgress: MotionValue<number>
}

export function ProgressIndicators({ activeStep, scrollProgress }: ProgressIndicatorsProps) {
  return (
    <div className="relative z-10 px-2 sm:px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 lg:gap-4">
          {processSteps.map((step, i) => (
            <StepIndicator 
              key={step.id}
              step={step}
              index={i}
              isActive={i === activeStep}
              isCompleted={i < activeStep}
              totalSteps={processSteps.length}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-2 sm:mt-3 text-center hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.p 
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[10px] sm:text-xs text-muted-foreground max-w-sm mx-auto"
          >
            {processSteps[activeStep]?.description.slice(0, 50)}...
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

interface StepIndicatorProps {
  step: typeof processSteps[0]
  index: number
  isActive: boolean
  isCompleted: boolean
  totalSteps: number
}

function StepIndicator({ step, index, isActive, isCompleted, totalSteps }: StepIndicatorProps) {
  const Icon = step.icon

  return (
    <div className="flex items-center">
      <motion.div
        className="relative flex flex-col items-center"
        animate={{
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-500"
          style={{
            borderColor: isActive || isCompleted ? step.color : 'hsl(var(--border))',
            backgroundColor: isCompleted 
              ? step.color 
              : isActive 
                ? `${step.color}20` 
                : 'hsl(var(--background))',
            boxShadow: isActive ? `0 0 15px ${step.color}40` : 'none'
          }}
        >
          <motion.div
            initial={false}
            animate={{
              scale: isActive ? [1, 1.2, 1] : 1,
              rotate: isCompleted ? 360 : 0
            }}
            transition={{ 
              scale: { duration: 1.5, repeat: isActive ? Infinity : 0 },
              rotate: { duration: 0.5 }
            }}
          >
            {isCompleted ? (
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" />
            ) : (
              <Icon 
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4"
                style={{ color: isActive ? step.color : 'hsl(var(--muted-foreground))' }}
              />
            )}
          </motion.div>

          {isActive && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: step.color }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: step.color }}
                animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </>
          )}
        </motion.div>

        <motion.span
          className="mt-1 text-[7px] sm:text-[9px] md:text-[10px] font-medium text-center max-w-[35px] sm:max-w-[50px] md:max-w-[65px] truncate hidden sm:block"
          style={{ color: isActive ? step.color : 'hsl(var(--muted-foreground))' }}
          animate={{ opacity: isActive ? 1 : 0.6 }}
        >
          {step.title.split(' ')[0]}
        </motion.span>

        <motion.span
          className="mt-0.5 text-[6px] sm:text-[7px] md:text-[8px] text-muted-foreground/60 hidden md:block"
        >
          Step {step.step}
        </motion.span>
      </motion.div>

      {index < totalSteps - 1 && (
        <div className="relative w-3 sm:w-6 md:w-10 lg:w-16 h-0.5 mx-0.5 sm:mx-1">
          <div className="absolute inset-0 rounded-full bg-border/30" />
          
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ 
              backgroundColor: step.color,
              boxShadow: `0 0 8px ${step.color}60`
            }}
            initial={{ width: "0%" }}
            animate={{ 
              width: isCompleted ? "100%" : isActive ? "50%" : "0%"
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {isActive && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
              style={{ backgroundColor: step.color }}
              animate={{ 
                left: ["0%", "100%"],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}
